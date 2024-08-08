import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CSpinner } from '@coreui/react-pro'

import { Compose, Inbox, Message, Template } from './index'

const TheEmailApp = () => {
  return (
    <Template>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          <Route path="inbox" element={<Inbox />} />
          <Route path="compose" element={<Compose />} />
          <Route path="message" element={<Message />} />
          <Route index element={<Navigate to="/apps/email/inbox" />} />
        </Routes>
      </Suspense>
    </Template>
  )
}

export default TheEmailApp
