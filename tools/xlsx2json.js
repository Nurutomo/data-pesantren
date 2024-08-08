import ExcelJS from 'exceljs'
import { writeFileSync } from 'fs'
import { join } from 'path'
import { parsePhoneNumber } from 'libphonenumber-js'

const { Workbook } = ExcelJS

const __dirname = import.meta.dirname

async function read() {
  const workbook = new Workbook()
  await workbook.xlsx.readFile(join(__dirname, '../../DATA ANGGOTA MPJ - 2024 Full.xlsx'))
  const json = {}
  const sheetLength = workbook.worksheets.length
  const Keys = new Set()
  for (let sheet = 0; sheet < sheetLength; sheet++) {
    const worksheet = workbook.worksheets[sheet]
    const sheetName = worksheet.name

    if (/REKAP|Metadata/i.test(sheetName)) continue

    const keys = worksheet.getRow(1).values
    const columnLength = keys.length
    const rowLength = worksheet.getColumn(1).values.length - 1

    json[sheetName] = []
    for (let i = 1; i < rowLength; i++) {
      const row = worksheet.getRow(i + 1).values
      const obj = {}
      for (let j = 0; j < columnLength; j++) {
        let key = keys[j.toString()]
        let value = row[j]
        if (key) {
          if ('Jumlah anggota' === key) key = 'Jumlah Anggota'
          obj[key] = (typeof value === 'object' ? value.hyperlink : value) || value
          if (/nomor hp/i.test(key))
            obj[key] =
              (typeof value === 'object'
                ? value.sharedFormula
                  ? value.result
                  : value.formula
                : typeof value === 'number'
                  ? '0' + value
                  : typeof value === 'boolean'
                    ? value
                    : value || '').toString() || value
          if ('Nomor HP Admin 1' === key && /dan|tele|\n/i.test(obj[key])) {
            ;[obj[key], obj['Nomor HP Admin 2']] = obj[key].split(/dan|tele|\n/i).map((v) => v.trim())
            if (obj[key] == obj['Nomor HP Admin 2']) delete obj['Nomor HP Admin 2']
          }
          if ('Nomor HP Admin 2' === key && /tele/i.test(obj[key])) obj[key] = obj[key].split(/tele/i)[0].trim()
          Keys.add(key)
        }
      }
      json[sheetName].push(obj)
    }
  }
  for (const sheetName in json) {
    for (const index in json[sheetName])
      for (let key of [...Keys]) json[sheetName][index][key] = json[sheetName][index][key] || ''
  }
  return json
}

// wait
// setInterval(() => {}, 1000)
const KEYS_NEW = {
  "TAHUN": 'regDate',
  "KODE REGIONAL": 'regionalCode',
  "Nama Pesantren": "name",
  "Alamat Pesantren": "address",
  "Kota/Kabupaten": 'city',
  "Nama Pengasuh": 'principal',
  "Nama Lengkap Admin 1": "admins.0.name",
  "Nama Lengkap Admin 2": "admins.1.name",
  "Nomor HP Admin 1": "admins.0.phoneNumber",
  "Nomor HP Admin 2": "admins.1.phoneNumber",
  "Link Map Pondok": "linkMap",
  "Email Pondok": 'email',
  "Jumlah Anggota": 'memberCount'
}

const buildObjWithValue = (path, value = '') => {
  const paths = path.split('.');
  return paths.reduceRight((acc, item, index) => ({
    [item]: index === paths.length - 1
      ? value
      : acc
  }), {});
}

read().then((json) => {
  json = [].concat(...Object.values(json)).map(pondok => {
    let pondokNew = {}
    for (const key in pondok) {
      if (!key in KEYS_NEW) continue
      const keyNew = KEYS_NEW[key]
      if (!keyNew) continue
      let value = pondok[key]
      if (!value) continue
      if (keyNew === 'regDate') {
        let d = new Date
        d.setFullYear(2000 + parseInt(value))
        value = d.toISOString()
      }
      if (keyNew === 'regionalCode') value = parseInt(value)
      if (keyNew.endsWith('phoneNumber')) {
        try {
          value = parsePhoneNumber(value, 'ID').formatInternational()
        } catch (e) {
          console.error('Invalid Phone Number: ' + value)
          value = undefined
        }
      }
      if (/[0-9]/.test(keyNew)) {
        const [KEY, index, ...CHILD] = keyNew.split('.')
        pondokNew[KEY] = pondokNew[KEY] || []
        pondokNew[KEY][index] = { ...pondokNew[KEY][index], ...buildObjWithValue(CHILD.join('.'), value) }
      } else pondokNew[keyNew] = value
    }
    return pondokNew
  })
  writeFileSync(join(__dirname, '../src/client/assets/mpj.json'), JSON.stringify(json, null, 2))
  // console.log(json)
})
