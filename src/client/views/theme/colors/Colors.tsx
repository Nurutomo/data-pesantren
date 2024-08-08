import React, { useEffect, useState, createRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react-pro'
import { getStyle, rgbToHex } from '@coreui/utils'

const ThemeView = () => {
  const [color, setColor] = useState('rgb(255, 255, 255)')
  const ref = createRef<HTMLTableElement>()

  useEffect(() => {
    const el =
      ref.current &&
      ref.current.parentNode &&
      (ref.current.parentNode.firstElementChild as HTMLElement)

    if (el) {
      const varColor = getStyle('background-color', el)
      varColor && setColor(varColor)
    }
  }, [ref])

  return (
    <table className="table w-100" ref={ref}>
      <tbody>
        <tr>
          <td className="text-medium-emphasis">HEX:</td>
          <td className="font-weight-bold">{rgbToHex(color)}</td>
        </tr>
        <tr>
          <td className="text-medium-emphasis">RGB:</td>
          <td className="font-weight-bold">{color}</td>
        </tr>
      </tbody>
    </table>
  )
}

const ThemeColor = ({ className, children }: { className: string; children: React.ReactNode }) => {
  const classes = classNames(className, 'theme-color w-75 rounded mb-3')
  return (
    <CCol xs={12} sm={6} md={4} xl={2} className="mb-4">
      <div className={classes} style={{ paddingTop: '75%' }}></div>
      {children}
      <ThemeView />
    </CCol>
  )
}

ThemeColor.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

const Colors = () => {
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Theme colors</CCardHeader>
        <CCardBody>
          <CRow>
            <ThemeColor className="bg-primary">
              <h6>Brand Primary Color</h6>
            </ThemeColor>
            <ThemeColor className="bg-secondary">
              <h6>Brand Secondary Color</h6>
            </ThemeColor>
            <ThemeColor className="bg-success">
              <h6>Brand Success Color</h6>
            </ThemeColor>
            <ThemeColor className="bg-danger">
              <h6>Brand Danger Color</h6>
            </ThemeColor>
            <ThemeColor className="bg-warning">
              <h6>Brand Warning Color</h6>
            </ThemeColor>
            <ThemeColor className="bg-info">
              <h6>Brand Info Color</h6>
            </ThemeColor>
            <ThemeColor className="bg-light">
              <h6>Brand Light Color</h6>
            </ThemeColor>
            <ThemeColor className="bg-dark">
              <h6>Brand Dark Color</h6>
            </ThemeColor>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Colors
