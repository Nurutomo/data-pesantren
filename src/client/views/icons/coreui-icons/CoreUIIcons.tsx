import React from 'react'
import { CCard, CCardBody, CCardHeader, CRow } from '@coreui/react-pro'
import { freeSet } from '@coreui/icons'
import { DocsCallout } from 'src/client/components'

import { getIconsView } from 'src/client/views/icons/IconView'

const CoreUIIcons = () => {
  return (
    <>
      <DocsCallout name="CoreUI Icons" href="components/chart">
        CoreUI Icons. CoreUI Icons package is delivered with more than 1500 icons in multiple
        formats SVG, PNG, and Webfonts. CoreUI Icons are beautifully crafted symbols for common
        actions and items. You can use them in your digital products for web or mobile app.
      </DocsCallout>
      <CCard className="mb-4">
        <CCardHeader>Free Icons</CCardHeader>
        <CCardBody>
          <CRow className="text-center">{getIconsView(freeSet)}</CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default CoreUIIcons
