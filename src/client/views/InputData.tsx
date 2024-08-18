import React, { useEffect, useState } from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CRow,
} from '@coreui/react-pro'
import { API, MPJ } from '../api'
import { AdminPondok, Pondok, REGIONAL_CODE } from '../../types'
import MailChecker from 'mailchecker'

const naming = {
  regionalCode: 'Kode Regional',
  name: 'Nama Pesantren',
  address: 'Alamat Pesantren',
  city: 'Kota/Kabupaten',
  principal: 'Pengasuh Pesantren',
  email: 'E-Mail Pesantren',
  admins: true,
  linkMap: 'Link Map Pesantren',
  memberCount: 'Jumlah Anggota',
}

const typing = {
  regionalCode: REGIONAL_CODE,
  name: 'text',
  address: 'text',
  city: 'text',
  principal: 'text',
  email: 'email',
  linkMap: 'text',
  memberCount: 'number',
}


const checker = {
  email(value) {
    return MailChecker.isValid(value)
  },
  linkMap(value) {
    return MailChecker.isValid('a@' + value)
  }
}

const InputData = () => {
  const [input, setInput] = useState<Partial<Pondok>>({})
  const [err, setErr] = useState<string>('')
  const [isOk, setOk] = useState<string>('')
  let getData
  useEffect(() => {
    getData = () => MPJ({ me: true }).then(data => {
      if (!data) setErr('Data tidak ditemukan!')
      setInput(data as Pondok)
    }).catch(err => console.error(err))
    getData()
  }, [getData])

  const watchInput = (e: React.SyntheticEvent<HTMLInputElement | HTMLSelectElement>) => {
    const el = e.currentTarget
    const val = el.type === 'number' ? parseFloat(el.value) : el.value
    if (el.name.startsWith('admins')) {
      let [child, name, index] = el.name.split('-').map(v => typeof v !== 'string' ? v : isNaN(parseInt(v)) ? v : parseInt(v)) as [string, string, number]
      const clone = JSON.parse(JSON.stringify(input[child])) as AdminPondok[]
      clone.splice(index, 1, {
        ...input[child][index],
        [name]: val
      })
      return setInput({
        ...input,
        admins: clone
      })
    }
    setInput({
      ...input,
      [el.name]: val
    })
  }

  const submit = async () => {
    try {
      const res = await API.fetch('/data', 'POST', input)
      setOk(res.message)
      setTimeout(() => setOk(''), 5000)
      setInput(res.json as Pondok)
      // location.reload()
      // const res = await API.register(input.email, input.password)
      // location.pathname = '/login'
    } catch (e) {
      setErr(e.toString())
    }
  }

  const createData = async () => {
    try {
      const res = await API.fetch('/data', 'POST', {
        regionalCode: 1,
        name: '',
        address: '',
        city: '',
        principal: '',
        email: '',
        admins: [],
        linkMap: '',
        memberCount: 0,
      } as Pondok)
      setInput(res.json as Pondok)
    } catch (e) {
      setErr(e.toString())
    }
  }

  return (
    <CForm>
      <h1>Data Pesantren</h1>
      {input && <>
        {Object.entries(input).filter(([k]) => naming[k]).map(([key, value]) => {
          if (key === 'admins' && Array.isArray(value)) {
            return <>
              {value.map(({ name, phoneNumber }, i) => {
                const placeholderNama = `Nama Admin ${1 + i}`
                const placeholderNomor = `Nomor Admin ${1 + i}`
                return (
                  <CInputGroup>
                    <CFormInput
                      className='my-1'
                      name={`${key}-name-${i}`}
                      type={'text'}
                      placeholder={placeholderNama}
                      floatingLabel={placeholderNama}
                      autoComplete='name'
                      onChange={watchInput}
                      feedbackValid={'Terisi'}
                      value={name.toString()} />
                    <CFormInput
                      className='my-1'
                      name={`${key}-phoneNumber-${i}`}
                      type={'text'}
                      placeholder={placeholderNomor}
                      floatingLabel={placeholderNomor}
                      autoComplete='tel'
                      onChange={watchInput}
                      feedbackValid={'Terisi'}
                      value={phoneNumber.toString()} />
                    <CButton type="button" color="danger" onClick={() => {
                      const clone = JSON.parse(JSON.stringify(input.admins)) as AdminPondok[]
                      clone.splice(i, 1)
                      setInput({
                        ...input,
                        admins: clone
                      })
                    }}>Remove Admin</CButton >
                  </CInputGroup>
                )
              })}
              <CButton color="success" onClick={() => {
                setInput({
                  ...input, admins: [...(input.admins || []), {
                    name: '', phoneNumber: ''
                  }]
                })
              }}>Add admin</CButton >
            </>
          }
          if (key === 'regionalCode') {
            return <CFormSelect
              aria-label={key}
              name={key}
              floatingLabel={naming[key]}
              onChange={watchInput}>
              {Array.from(new Array(14), (_, i) => {
                const SelectVal = REGIONAL_CODE[i + 1]
                const v = value as REGIONAL_CODE
                return <option value={SelectVal} selected={(typeof v === 'number' ? REGIONAL_CODE[v] : v) === SelectVal}>{SelectVal}</option>
              })}
            </CFormSelect>
          }
          return typeof naming[key] !== 'boolean' && <CFormInput
            className='my-1'
            name={key}
            type={Array.isArray(typing[key]) ? 'text' : typing[key]}
            placeholder={naming[key]}
            floatingLabel={naming[key]}
            autoComplete={key}
            onChange={watchInput}
            feedbackInvalid={'Harap diisi dengan benar'}
            feedbackValid={'Terisi'}
            value={value.toString()}
            min={0}
          // {...({
          //   [valid.email]: true
          // })}
          />
        })}
        <div className="d-grid">
          <CButton color="success" onClick={submit}>Submit</CButton>
          <CButton color="danger" onClick={createData}>Reset/Clear Data</CButton>
        </div>
      </>
      }
      {err && <CAlert color="danger" className='my-2'>{err}</CAlert>}
      {isOk && <CAlert color="success" className='my-2'>{isOk}</CAlert>}
      {
        !input &&
        <div className="d-grid">
          <CButton color="success" onClick={createData}>Buat data?</CButton>
        </div>
      }
    </CForm >
  )
}

export default InputData
// function setData(data: import("../../types").Pondok[]): any {
//   throw new Error('Function not implemented.')
// }
