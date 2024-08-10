import React, { useEffect, useState } from 'react'
import {
  CButton,
  CTableDataCell,
  CSmartTable,
  CCollapse,
  CCardBody,
  CListGroupItem,
  CBadge,
  CListGroup,
} from '@coreui/react-pro'
import parsePhoneNumber, { PhoneNumber } from 'libphonenumber-js'
import { Pondok, REGIONAL_CODE } from '../../../types'
import { MPJ } from '../../api'
import { Item } from '@coreui/react-pro/dist/esm/components/smart-table/types'
import CIcon from '@coreui/icons-react'
import { cibWhatsapp } from '@coreui/icons'

const Regionals: React.FC<{
  region?: REGIONAL_CODE
}> = ({ region }) => {
  const [details, setDetails] = useState<number[]>([])
  const [data, setData] = useState<Pondok[]>([])
  useEffect(() => {
    MPJ({ region }).then(data => setData(data))
  }, [region])
  const toggleDetails = (index: number) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }
  const normalCell = (columnName: keyof Pondok, className = "text-center") => (item: Pondok) => {
    return <CTableDataCell className={className}>{item[columnName]?.toString() || ''}</CTableDataCell>
  }
  return (
    <CSmartTable
      columns={[
        'no',
        'name',
        'address',
        'principal', {
          key: 'show_details',
          label: '',
          _style: { width: '1%' },
          filter: false,
          sorter: false,
        }]}
      // items={MPJ[region]}
      items={data}
      scopedColumns={
        {
          no: (_: any, index: number) => {
            return <CTableDataCell>{index + 1}</CTableDataCell>
          },
          name: normalCell('name'),
          address: normalCell('address', ''),
          principal: normalCell('principal'),
          show_details: (_item: Pondok, index: number) => {
            return (
              <td className="py-2">
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={() => {
                    toggleDetails(index)
                  }}
                >
                  {details.includes(index) ? 'Hide' : 'Show'}
                </CButton>
              </td>
            )
          },
          details: (item: Item, index: number) => {
            const admins = item.admins?.map(value => {
              return {
                name: value.name,
                phoneNumber: typeof value.phoneNumber === 'string' && parsePhoneNumber(value.phoneNumber, 'ID')
              }
            })

            return (
              <CCollapse visible={details.includes(index)}>
                <CCardBody className="p-3">
                  <h4 className='text-center'>{item.name} {item.regDate && `(${new Date(item.regDate).getFullYear()})`}</h4>
                  {item.memberCount && <p>{item.memberCount} Anggota</p>}
                  <p>{item.city}</p>
                  <p><a href={`mailto:${item.email}`}>{item.email}</a></p>
                  {item.linkMap && <p><a href={`${item.linkMap}`}>{item.linkMap}</a></p>}
                  <CListGroup>
                    {admins && admins.map(admin =>
                      <CListGroupItem
                        className="d-flex justify-content-between align-items-center"
                        as="a"
                        {...(admin.phoneNumber ? { href: admin.phoneNumber.getURI() } : {})}
                      >
                        {admin.name}
                        {admin.phoneNumber && (<>
                          <CIcon icon={cibWhatsapp}></CIcon>
                          <CBadge color="primary" shape="rounded-pill">
                            {admin.phoneNumber.formatInternational()}
                          </CBadge>
                        </>
                        )}
                      </CListGroupItem>
                    )}
                  </CListGroup>
                </CCardBody>
              </CCollapse>
            )
          },
          // 'Link Map Pondok': (item) => (
          //   <CTableDataCell className="text-center">
          //     <CButton
          //       color="primary"
          //       className="float-end"
          //       href={item['Link Map Pondok'].toString()}
          //       target="_blank"
          //     >
          //       Open Map <CIcon icon={cilMap} />
          //     </CButton>
          //   </CTableDataCell>
          // ),
          // 'Email Pondok': (item, i) => (
          //   <CTableDataCell className="text-center">
          //     <a href={`mailto:${item['Email Pondok']}`}>{item['Email Pondok']}</a>
          //   </CTableDataCell>
          // ),
          // 'Nomor HP Admin 1': (item) => {
          //   const number = parsePhoneNumber(item['Nomor HP Admin 1'].toString(), 'ID')
          //   return (
          //     (number && (
          //       <CTableDataCell className="text-center">
          //         <a href={`${number.getURI()}`}>{number.formatInternational()}</a>
          //       </CTableDataCell>
          //     )) || <CTableDataCell />
          //   )
          // },
          //   'Nomor HP Admin 2': (item) => {
          //     const number = parsePhoneNumber(item['Nomor HP Admin 2'].toString(), 'ID')
          //     return (
          //       (number && (
          //         <CTableDataCell className="text-center">
          //           <a href={`${number.getURI()}`}>{number.formatInternational()}</a>
          //         </CTableDataCell>
          //       )) || <CTableDataCell />
          //     )
          //   },
          // } as Partial<Record<(typeof DataKeys)[number], (item: Required<DataPondok>, i: any) => any>>
        }
      }
      // .map((pondok) =>
      //   Object.fromEntries(
      //     Object.entries(pondok).map(([key, value]) => {
      //       let content
      //       if (value) {
      //         switch (key) {
      //           case 'Link Map Pondok':
      //             content = (
      //               <CButton
      //                 color="primary"
      //                 className="float-end"
      //                 href={value.toString()}
      //                 target="_blank"
      //               >
      //                 Open Map <CIcon icon={cilMap} />
      //               </CButton>
      //             )
      //             break
      //           case 'Email Pondok':
      //             content = <a href={`mailto:${value}`}>{value}</a>
      //             break
      //           default:
      //             let number
      //             if (
      //               /Nomor HP/i.test(key) &&
      //               (number = parsePhoneNumber(value.toString(), 'ID'))
      //             ) {
      //               content = <a href={`${number.getURI()}`}>{number.formatInternational()}</a>
      //             }
      //             break
      //         }
      //       }
      //       return [key, content]
      //     }),
      //   ),
      // )}
      columnFilter
      columnSorter
      pagination
      tableProps={{
        hover: true,
      }}
    />
  )
  // return (
  //   <>
  //     <CTable align="middle" className="mb-0 border" hover responsive>
  //       <CTableHead className="text-nowrap">
  //         <CTableRow>
  //           {DataKeys.map((key) => (
  //             <CTableHeaderCell className="bg-body-tertiary text-center">{key}</CTableHeaderCell>
  //           ))}
  //         </CTableRow>
  //       </CTableHead>
  //       <CTableBody>
  //         {MPJ[region].map((item, index) => {
  //           return (
  //             <CTableRow v-for="item in tableItems" key={index}>
  //               {toKeyEntries(item).map((value, i) => {
  //                 const key = DataKeys[i]
  //                 let content: any = value
  //                 if (value) {
  //                   switch (key) {
  //                     case 'Link Map Pondok':
  //                       content = (
  //                         <CButton
  //                           color="primary"
  //                           className="float-end"
  //                           href={value.toString()}
  //                           target="_blank"
  //                         >
  //                           Open Map <CIcon icon={cilMap} />
  //                         </CButton>
  //                       )
  //                       break
  //                     case 'Email Pondok':
  //                       content = <a href={`mailto:${value}`}>{value}</a>
  //                       break
  //                     default:
  //                       let number
  //                       if (/Nomor HP/i.test(key) && (number = parsePhoneNumber(value.toString(), 'ID'))) {
  //                         content = (
  //                           <a href={`${number.getURI()}`}>{number.formatInternational()}</a>
  //                         )
  //                       }
  //                       break
  //                   }
  //                 }
  //                 return <CTableDataCell className="text-center">{content}</CTableDataCell>
  //               })}
  //             </CTableRow>
  //           )
  //         })}
  //       </CTableBody>
  //     </CTable>
  //   </>
  // )
}

export default Regionals
