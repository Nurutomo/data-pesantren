import React, { useState } from 'react'
import { CBadge, CButton, CCardBody, CCollapse, CSmartTable } from '@coreui/react-pro'

import type { Item } from '@coreui/react-pro/src/components/smart-table/types'

import data from './_data.js'

const SmartTableBasicExample = () => {
  const [details, setDetails] = useState<number[]>([])
  const columns = [
    {
      key: 'name',
      _style: { width: '40%' },
    },
    'registered',
    { key: 'role', _style: { width: '20%' } },
    { key: 'status', _style: { width: '20%' } },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sorter: false,
    },
  ]
  const getBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return 'success'
      case 'Inactive':
        return 'secondary'
      case 'Pending':
        return 'warning'
      case 'Banned':
        return 'danger'
      default:
        return 'primary'
    }
  }
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

  return (
    <CSmartTable
      sorterValue={{ column: 'name', state: 'asc' }}
      clickableRows
      tableProps={{
        striped: true,
        hover: true,
      }}
      activePage={3}
      footer
      items={data}
      columns={columns}
      columnFilter
      tableFilter
      cleaner
      itemsPerPageSelect
      itemsPerPage={5}
      columnSorter
      pagination
      scopedColumns={{
        status: (item: Item) => (
          <td>
            <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
          </td>
        ),
        show_details: (item: Item) => {
          return (
            <td className="py-2">
              <CButton
                color="primary"
                variant="outline"
                shape="square"
                size="sm"
                onClick={() => {
                  toggleDetails(item.id)
                }}
              >
                {details.includes(item.id) ? 'Hide' : 'Show'}
              </CButton>
            </td>
          )
        },
        details: (item: Item) => {
          return (
            <CCollapse visible={details.includes(item.id)}>
              <CCardBody>
                <h4>{item.username}</h4>
                <p className="text-muted">User since: {item.registered}</p>
                <CButton size="sm" color="info">
                  User Settings
                </CButton>
                <CButton size="sm" color="danger" className="ml-1">
                  Delete
                </CButton>
              </CCardBody>
            </CCollapse>
          )
        },
      }}
    />
  )
}

export default SmartTableBasicExample
