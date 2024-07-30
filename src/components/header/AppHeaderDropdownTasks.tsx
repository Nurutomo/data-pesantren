import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  CBadge,
  CButton,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilListRich } from '@coreui/icons'

const AppHeaderDropdownTasks = () => {
  const { t } = useTranslation()
  const itemsCount = 5
  return (
    <CDropdown variant="nav-item" alignment="end">
      <CDropdownToggle caret={false}>
        <span className="d-inline-block my-1 mx-2 position-relative">
          <CIcon icon={cilListRich} size="lg" />
          <CBadge color="danger" position="top-end" shape="rounded-circle" className="p-1">
            <span className="visually-hidden">{itemsCount} new alerts</span>
          </CBadge>
        </span>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0">
        <CDropdownHeader className="bg-body-secondary text-body-secondary fw-semibold rounded-top mb-2">
          {t('taskCounter', { counter: itemsCount })}
        </CDropdownHeader>
        <CDropdownItem className="d-block py-2">
          <div className="d-flex justify-content-between mb-1">
            <div className="small">Upgrade NPM</div>
            <div className="fw-semibold">0%</div>
          </div>
          <CProgress thin color="info-gradient" value={0} />
        </CDropdownItem>
        <CDropdownItem className="d-block py-2">
          <div className="d-flex justify-content-between mb-1">
            <div className="small">ReactJS Version</div>
            <div className="fw-semibold">25%</div>
          </div>
          <CProgress thin color="danger-gradient" value={25} />
        </CDropdownItem>
        <CDropdownItem className="d-block py-2">
          <div className="d-flex justify-content-between mb-1">
            <div className="small">VueJS Version</div>
            <div className="fw-semibold">50%</div>
          </div>
          <CProgress thin color="warning-gradient" value={50} />
        </CDropdownItem>
        <CDropdownItem className="d-block py-2">
          <div className="d-flex justify-content-between mb-1">
            <div className="small">Add new layouts</div>
            <div className="fw-semibold">75%</div>
          </div>
          <CProgress thin color="info-gradient" value={75} />
        </CDropdownItem>
        <CDropdownItem className="d-block py-2">
          <div className="d-flex justify-content-between mb-1">
            <div className="small">Angular Version</div>
            <div className="fw-semibold">100%</div>
          </div>
          <CProgress thin color="success-gradient" value={100} />
        </CDropdownItem>
        <div className="p-2">
          <CButton color="primary" variant="outline" className="w-100">
            {t('viewAllTasks')}
          </CButton>
        </div>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdownTasks
