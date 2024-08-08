import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react-pro'
import {
  cilUser,
  cilAccountLogout,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const AppHeaderDropdown = () => {
  const { t } = useTranslation()
  
  return (
    <CDropdown variant="nav-item" alignment="end">
      <CDropdownToggle className="py-0" caret={false}>
        <CAvatar src='/avatar/me' size="md" status="success" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0">
        <CDropdownHeader className="bg-body-secondary text-body-secondary fw-semibold rounded-top mb-2">
          {t('account')}
        </CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          {t('profile')}
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem href="/logout">
          <CIcon icon={cilAccountLogout} className="me-2"/>
          {t('logout')}
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
