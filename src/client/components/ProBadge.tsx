import React, { ReactNode } from 'react'
import { CBadge, CLink } from '@coreui/react-pro'
import PropTypes from 'prop-types'

const ProBadge = (props: { children: ReactNode }) => {
  const { children } = props
  return (
    <CLink
      as={CBadge}
      href="https://coreui.io/pro/react/"
      color="danger-gradient"
      target="_blank"
      rel="noreferrer noopener"
    >
      {children ? children : 'CoreUI PRO Plugin'}
    </CLink>
  )
}

ProBadge.propTypes = {
  children: PropTypes.node,
}

export default ProBadge
