import React, { useState } from 'react'
import { CBadge, CCardBody, CFormCheck, CFormLabel, CSmartTable } from '@coreui/react-pro'

import type { Item } from '@coreui/react-pro/src/components/smart-table/types'

import data from './_data.js'

const SmartTableSelectableExample = () => {
  const [selected, setSelected] = useState<number[]>([2, 3])
  const usersData = data.map((item: Item, id: number) => {
    const _selected = selected.includes(id)
    return {
      ...item,
      id,
      _selected,
      _classes: [item._classes, _selected && 'table-selected'],
    }
  })

  const check = (event: React.FormEvent<HTMLInputElement>, id: number) => {
    if ((event.target as HTMLInputElement).checked) {
      setSelected([...selected, id])
    } else {
      setSelected(selected.filter((itemId) => itemId !== id))
    }
  }

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

  return (
    <CCardBody>
      Selected: {JSON.stringify(selected)}
      <CSmartTable
        items={usersData}
        columns={[
          { key: 'select', label: '', filter: false, sorter: false },
          'name',
          'registered',
          'role',
          'status',
        ]}
        itemsPerPage={5}
        columnFilter
        columnSorter
        pagination
        scopedColumns={{
          select: (item: Item) => {
            return (
              <td>
                <CFormCheck
                  id={`checkbox${item.id}`}
                  checked={item._selected}
                  onChange={(e: React.FormEvent<HTMLInputElement>) => check(e, item.id)}
                />
                <CFormLabel htmlFor={`checkbox${item.id}`} />
              </td>
            )
          },
          status: (item: Item) => (
            <td>
              <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
            </td>
          ),
        }}
        tableProps={{
          hover: true,
        }}
      />
    </CCardBody>
  )
}

export default SmartTableSelectableExample
