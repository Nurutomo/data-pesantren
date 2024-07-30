import React from 'react'
import CIcon from '@coreui/icons-react'
import { CCol } from '@coreui/react-pro'

const toKebabCase = (str: string) => {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
}

export type Icon = {
  [key: string]: string[]
}

export const getIconsView = (iconset: Icon) => {
  return Object.entries(iconset).map(([name, value]) => (
    <CCol className="mb-5" xs={6} sm={4} md={3} xl={2} key={name}>
      <CIcon icon={value} size="xxl" />
      <div>{toKebabCase(name)}</div>
    </CCol>
  ))
}
