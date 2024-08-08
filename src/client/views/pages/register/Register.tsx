import React, { useState } from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { API } from '../../../api'
import { redirect } from 'react-router-dom'

type Forms = {
  email: string
  password: string
  repeatPassword: string
}
const Register = () => {
  const [input, setInput] = useState<Partial<Forms>>({})
  const [valid, setValid] = useState<{
    [P in keyof Forms]: 'valid' | 'invalid' | ''
  }>({
    email: '',
    password: '',
    repeatPassword: ''
  })
  const [err, setErr] = useState<string>('')

  const watchInput = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const el = e.currentTarget
    setInput({ ...input, [el.name]: el.value })
    setValid({
      ...valid,
      'repeatPassword': el.value && el.name !== 'password' ? valid.repeatPassword : el.value === input.repeatPassword ? 'valid' : 'invalid',
      [el.name]: (el.value && el.name !== 'repeatPassword') || el.value === input.password ? 'valid' : 'invalid'
    })
  }

  const register = async () => {
    try {
      const res = await API.register(input.email, input.password)
      redirect('/login')
    } catch (e) {
      setErr(e.toString())
      setValid({
        email: 'invalid',
        password: 'invalid',
        repeatPassword: 'invalid'
      })
    }
  }
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Daftar</h1>
                  <p className="text-body-secondary">Daftarkan akun pesantren anda</p>
                  {err && <CAlert color="danger">{err}</CAlert>}
                  <CFormInput
                    className='my-1'
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    floatingLabel="E-mail"
                    autoComplete="email"
                    onChange={watchInput}
                    feedbackInvalid={'Harap diisi dengan benar'}
                    feedbackValid={'Terisi'}
                    {...({
                      [valid.email]: true
                    })}
                  />
                  <CFormInput
                    className='my-1'
                    name="password"
                    type="password"
                    placeholder="Password"
                    floatingLabel="Password"
                    autoComplete="current-password"
                    onChange={watchInput}
                    feedbackInvalid={'Harap diisi dengan benar'}
                    feedbackValid={'Terisi'}
                    {...({
                      [valid.password]: true
                    })}
                  />
                  <CFormInput
                    className='my-1'
                    name="repeatPassword"
                    type="password"
                    placeholder="Repeat Password"
                    floatingLabel="Repeat Password"
                    autoComplete="current-password"
                    onChange={watchInput}
                    feedbackInvalid={'Harap cocokkan password dengan benar'}
                    feedbackValid={'Cocok'}
                    {...({
                      [valid.repeatPassword]: true
                    })}
                  />
                  <div className="d-grid">
                    <CButton color="success" onClick={register}>Daftar</CButton>
                  </div>
                  <CCol xs={6} className="text-right">
                    <CButton color="link" className="px-0" href='/login'>
                      Sudah Punya Akun?
                    </CButton>
                  </CCol>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
