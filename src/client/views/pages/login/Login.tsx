import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CRow,
} from '@coreui/react-pro'
import { API } from '../../../api'

type Forms = {
  email: string
  password: string
}
const Login = () => {
  const [input, setInput] = useState<Partial<Forms>>({})
  const [valid, setValid] = useState<{
    [P in keyof Forms]: 'valid' | 'invalid' | ''
  }>({
    email: '',
    password: ''
  })
  const [err, setErr] = useState<string>('')

  const watchInput = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const el = e.currentTarget
    setInput({ ...input, [el.name]: el.value })
    setValid({ ...valid, [el.name]: el.value ? 'valid' : 'invalid'})
  }

  const login = async () => {
    try {
      const res = await API.login(input.email, input.password)
      location.pathname = '/dashboard'
    } catch (e) {
      setErr(e.toString())
      setValid({
        email: 'invalid',
        password: 'invalid'
      })
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Masuk</h1>
                    <p className="text-body-secondary">Masuk ke Akun Anda</p>
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
                    <CRow className='my-1'>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={login}>
                          Masuk
                        </CButton>
                      </CCol>
                      {/* <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Lupa Kata Sandi?
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Daftar</h2>
                    <p>
                      Belum punya akun?
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Daftar
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
