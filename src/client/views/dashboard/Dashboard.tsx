import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  CCard,
  CCardBody,
  CCardSubtitle,
  CCardTitle,
  CCol,
  CRow,
} from '@coreui/react-pro'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cilPeople,
  cilArrowBottom,
} from '@coreui/icons'

import { MPJ } from '../../api'
import { Pondok, REGIONAL_CODE } from '../../../types'

const Dashboard = () => {
  const { t } = useTranslation()
  const chartBartRef = useRef<any>(null)
  const chartLineRef = useRef<any>(null)
  const [data, setData] = useState<Pondok[]>([])
  useEffect(() => {
    MPJ().then(data => setData(data))
  }, [])

  const mainChartLabel = (date: Date) => {
    return t('date', {
      date,
      formatParams: { date: { month: 'short' } },
    })
  }

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (chartBartRef.current) {
        setTimeout(() => {
          chartBartRef.current.options.scales.x.grid.color = getStyle(
            '--cui-border-color-translucent',
          )
          chartBartRef.current.options.scales.x.ticks.color = getStyle('--cui-body-color')
          chartBartRef.current.options.scales.y.grid.color = getStyle(
            '--cui-border-color-translucent',
          )
          chartBartRef.current.options.scales.y.ticks.color = getStyle('--cui-body-color')
          chartBartRef.current.update()
        })
      }

      if (chartLineRef.current) {
        setTimeout(() => {
          chartLineRef.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
          chartLineRef.current.update()
        })
      }
    })
  }, [chartBartRef, chartLineRef])

  const years = data.reduce((prev, curr) => {
    let key = new Date(curr.regDate || 0).getFullYear()
    let value = (prev[key] || 0) + 1
    return { ...prev, [key]: value }
  }, {})
  const totalY = Object.values(years).map((_, i, o) =>
    // @ts-ignore
    o.slice(0, i + 1).reduce((prev, curr) => prev + curr, 0),
  )
  const pondoks = data.reduce((prev, curr) => {
    let key = REGIONAL_CODE[curr.regionalCode]
    let value = (prev[key] || 0) + 1
    return { ...prev, [key]: value }
  }, {})
  const Pondok = Object.fromEntries(Object.keys(years).map((year) => [
    year,
    Object.keys(REGIONAL_CODE).filter(name => Number.isNaN(parseInt(name))).map(region => data.filter(pondok => pondok.regionalCode === REGIONAL_CODE[region] && new Date(pondok.regDate || 0).getFullYear().toString() === year))
    // (region) => countByColumn(region, 'TAHUN', formatYear)[year] || 0),
  ]))
  return (
    <>
      <CRow>
        <CCol xl={4}>
          <CRow>
            <CCol lg={12}>
              <CCard className="overflow-hidden mb-4">
                <CCardBody className="p-4">
                  <CRow>
                    <CCol>
                      <CCardTitle className="fs-4 fw-semibold">{t('total')} {t('pondok')}</CCardTitle>
                    </CCol>
                    <CCol className="text-end text-primary fs-4 fw-semibold">{data.length}</CCol>
                  </CRow>
                  <CCardSubtitle className="fw-normal text-body-secondary">
                    {Math.min(...Object.keys(years).map(Number))} - {Math.max(...Object.keys(years).map(Number))}
                  </CCardSubtitle>
                </CCardBody>
                <CChartLine
                  className="mt-3"
                  style={{ height: '150px' }}
                  data={{
                    labels: Object.keys(years),
                    datasets: [
                      // {
                      //   label: 'Jumlah',
                      //   backgroundColor: `rgba(${getStyle('--cui-primary-rgb')}, .1)`,
                      //   borderColor: getStyle('--cui-primary'),
                      //   borderWidth: 3,
                      //   data: dataY,
                      //   fill: true,
                      // },
                      {
                        label: 'Peningkatan',
                        backgroundColor: `rgba(${getStyle('--cui-primary-rgb')}, .1)`,
                        borderColor: getStyle('--cui-secondary'),
                        borderWidth: 3,
                        data: Object.values(years),
                        fill: true,
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        display: false,
                      },
                      y: {
                        beginAtZero: true,
                        display: false,
                      },
                    },
                    elements: {
                      line: {
                        borderWidth: 2,
                        tension: 0.4,
                      },
                      point: {
                        radius: 0,
                        hitRadius: 10,
                        hoverRadius: 4,
                      },
                    },
                  }}
                />
              </CCard>
            </CCol>
            <CCol lg={12}>
              <CCard className="mb-4">
                <CCardBody>
                  <div className="d-flex justify-content-between">
                    <CCardTitle as="h6" className="text-body-secondary text-truncate">
                      {'Jumlah Anggota'}
                    </CCardTitle>
                    <div className="bg-primary bg-opacity-25 text-primary rounded p-2 ms-2">
                      <CIcon icon={cilPeople} size="xl" />
                    </div>
                  </div>
                  <div className="fs-4 fw-semibold pb-3">±{data.map(v => isNaN(v.memberCount || 0) ? 0 : parseInt(v.memberCount as unknown as string)).reduce((prev, curr) => prev + curr, 0)}</div>
                  <small className="text-danger">
                    (-12.4% <CIcon icon={cilArrowBottom} />)
                  </small>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCol>
        <CCol xl={8}>
          <CCard className="mb-4">
            <CCardBody className="p-4">
              <CCardTitle className="fs-4 fw-semibold">{t('pondok')}</CCardTitle>
              <CCardSubtitle
                className="fw-normal text-body-secondary"
                style={{ marginBottom: '40px' }}
              >
                {t('eastjava')}
              </CCardSubtitle>
              <CChartBar
                ref={chartBartRef}
                data={{
                  labels: Object.keys(pondoks),
                  datasets: [
                    {
                      label: 'Pondok Pesantren',
                      backgroundColor: getStyle('--cui-primary'),
                      borderRadius: 6,
                      borderSkipped: false,
                      data: Object.values(pondoks),
                      barPercentage: 0.6,
                      categoryPercentage: 0.5,
                    },
                    // ...Object.entries(Pondok).map(([label, data]) => {
                    //   return {
                    //     label,
                    //     backgroundColor: getStyle('--cui-primary'),
                    //     borderRadius: 6,
                    //     borderSkipped: false,
                    //     data,
                    //     barPercentage: 0.6,
                    //     categoryPercentage: 0.5,
                    //   }
                    // })
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      border: {
                        display: false,
                      },
                      grid: {
                        color: getStyle('--cui-border-color-translucent'),
                        display: false,
                        drawTicks: false,
                      },
                      ticks: {
                        color: getStyle('--cui-body-color'),
                        font: {
                          size: 14,
                        },
                        padding: 16,
                      },
                    },
                    y: {
                      beginAtZero: true,
                      border: {
                        dash: [2, 4],
                        display: false,
                      },
                      grid: {
                        color: getStyle('--cui-border-color-translucent'),
                      },
                      ticks: {
                        color: getStyle('--cui-body-color'),
                        font: {
                          size: 14,
                        },
                        maxTicksLimit: 5,
                        padding: 16,
                        stepSize: Math.ceil(100 / 4),
                      },
                    },
                  },
                }}
                style={{ height: '300px' }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {/* <CRow>
        <CCol xl={9}>
          <CCard className="mb-4">
            <CCardBody className="p-4">
              <CRow>
                <CCol>
                  <CCardTitle className="fs-4 fw-semibold">{t('users')}</CCardTitle>
                  <CCardSubtitle className="fw-normal text-body-secondary mb-4">
                    {t('registeredUsersCounter', {
                      counter: '1.232.15',
                    })}
                  </CCardSubtitle>
                </CCol>
                <CCol xs="auto" className="ms-auto">
                  <CButton color="secondary">
                    <CIcon icon={cilUserPlus} className="me-2" />
                    {t('addNewUser')}
                  </CButton>
                </CCol>
              </CRow>
              <CTable align="middle" className="mb-0" hover responsive>
                <CTableHead className="fw-semibold text-body-secondary">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>{t('user')}</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">{t('country')}</CTableHeaderCell>
                    <CTableHeaderCell>{t('usage')}</CTableHeaderCell>
                    <CTableHeaderCell>{t('activity')}</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableExample.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.user.name}</div>
                        <div className="small text-body-secondary text-nowrap">
                          <span>{item.user.new ? t('new') : t('recurring')}</span> |{' '}
                          {t('registered')}
                          {item.user.registered}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="d-flex justify-content-between align-items-baseline mb-1">
                          <div className="fw-semibold">{item.usage.value}%</div>
                          <div className="small text-body-secondary text-nowrap ms-3">
                            {item.usage.period}
                          </div>
                        </div>
                        <CProgress
                          thin
                          color={`${item.usage.color}-gradient`}
                          value={item.usage.value}
                        />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="small text-body-secondary">{t('lastLogin')}</div>
                        <div className="fw-semibold text-nowrap">{item.activity}</div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xl={3}>
          <CRow>
            <CCol md={4} xl={12}>
              <CWidgetStatsA
                className="mb-4"
                color="primary-gradient"
                value={
                  <>
                    26K{' '}
                    <span className="fs-6 fw-normal">
                      (-12.4% <CIcon icon={cilArrowBottom} />)
                    </span>
                  </>
                }
                title={t('users')}
                action={
                  <CDropdown alignment="end">
                    <CDropdownToggle color="transparent" caret={false} className="p-0">
                      <CIcon icon={cilOptions} className="text-white" />
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem>{t('action')}</CDropdownItem>
                      <CDropdownItem>{t('anotherAction')}</CDropdownItem>
                      <CDropdownItem>{t('somethingElseHere')}</CDropdownItem>
                      <CDropdownItem disabled>{t('disabledAction')}</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                }
                chart={
                  <CChartLine
                    className="mt-3 mx-3"
                    style={{ height: '85px' }}
                    data={{
                      labels: [
                        t('january'),
                        t('february'),
                        t('march'),
                        t('april'),
                        t('may'),
                        t('june'),
                        t('july'),
                      ],
                      datasets: [
                        {
                          label: 'My First dataset',
                          backgroundColor: 'transparent',
                          borderColor: 'rgba(255,255,255,.55)',
                          pointBackgroundColor: getStyle('--cui-primary'),
                          data: [65, 59, 84, 84, 51, 55, 40],
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                      maintainAspectRatio: false,
                      scales: {
                        x: {
                          border: {
                            display: false,
                          },
                          grid: {
                            display: false,
                          },
                          ticks: {
                            display: false,
                          },
                        },
                        y: {
                          min: 30,
                          max: 89,
                          display: false,
                          grid: {
                            display: false,
                          },
                          ticks: {
                            display: false,
                          },
                        },
                      },
                      elements: {
                        line: {
                          borderWidth: 1,
                          tension: 0.4,
                        },
                        point: {
                          radius: 4,
                          hitRadius: 10,
                          hoverRadius: 4,
                        },
                      },
                    }}
                  />
                }
              />
            </CCol>
            <CCol md={4} xl={12}>
              <CWidgetStatsA
                className="mb-4"
                color="warning-gradient"
                value={
                  <>
                    2.49%{' '}
                    <span className="fs-6 fw-normal">
                      (84.7% <CIcon icon={cilArrowTop} />)
                    </span>
                  </>
                }
                title={t('conversionRate')}
                action={
                  <CDropdown alignment="end">
                    <CDropdownToggle color="transparent" caret={false} className="p-0">
                      <CIcon icon={cilOptions} className="text-white" />
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem>{t('action')}</CDropdownItem>
                      <CDropdownItem>{t('anotherAction')}</CDropdownItem>
                      <CDropdownItem>{t('somethingElseHere')}</CDropdownItem>
                      <CDropdownItem disabled>{t('disabledAction')}</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                }
                chart={
                  <CChartLine
                    className="mt-3"
                    style={{ height: '85px' }}
                    data={{
                      labels: [
                        t('january'),
                        t('february'),
                        t('march'),
                        t('april'),
                        t('may'),
                        t('june'),
                        t('july'),
                      ],
                      datasets: [
                        {
                          label: 'My First dataset',
                          backgroundColor: 'rgba(255,255,255,.2)',
                          borderColor: 'rgba(255,255,255,.55)',
                          data: [78, 81, 80, 45, 34, 12, 40],
                          fill: true,
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                      maintainAspectRatio: false,
                      scales: {
                        x: {
                          display: false,
                        },
                        y: {
                          display: false,
                        },
                      },
                      elements: {
                        line: {
                          borderWidth: 2,
                          tension: 0.4,
                        },
                        point: {
                          radius: 0,
                          hitRadius: 10,
                          hoverRadius: 4,
                        },
                      },
                    }}
                  />
                }
              />
            </CCol>
            <CCol md={4} xl={12}>
              <CWidgetStatsA
                className="mb-4"
                color="danger-gradient"
                value={
                  <>
                    44K{' '}
                    <span className="fs-6 fw-normal">
                      (-23.6% <CIcon icon={cilArrowBottom} />)
                    </span>
                  </>
                }
                title={t('sessions')}
                action={
                  <CDropdown alignment="end">
                    <CDropdownToggle color="transparent" caret={false} className="p-0">
                      <CIcon icon={cilOptions} className="text-white" />
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem>{t('action')}</CDropdownItem>
                      <CDropdownItem>{t('anotherAction')}</CDropdownItem>
                      <CDropdownItem>{t('somethingElseHere')}</CDropdownItem>
                      <CDropdownItem disabled>{t('disabledAction')}</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                }
                chart={
                  <CChartBar
                    className="mt-3 mx-3"
                    style={{ height: '85px' }}
                    data={{
                      labels: [
                        t('january'),
                        t('february'),
                        t('march'),
                        t('april'),
                        t('may'),
                        t('june'),
                        t('july'),
                        t('august'),
                        t('september'),
                        t('october'),
                        t('november'),
                        t('december'),
                        t('january'),
                        t('february'),
                        t('march'),
                        t('april'),
                      ],
                      datasets: [
                        {
                          label: 'My First dataset',
                          backgroundColor: 'rgba(255,255,255,.2)',
                          borderColor: 'rgba(255,255,255,.55)',
                          data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
                          barPercentage: 0.6,
                        },
                      ],
                    }}
                    options={{
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                      scales: {
                        x: {
                          grid: {
                            display: false,
                            drawTicks: false,
                          },
                          ticks: {
                            display: false,
                          },
                        },
                        y: {
                          border: {
                            display: false,
                          },
                          grid: {
                            display: false,
                            drawTicks: false,
                          },
                          ticks: {
                            display: false,
                          },
                        },
                      },
                    }}
                  />
                }
              />
            </CCol>
          </CRow>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardBody className="p-4">
              <CCardTitle className="fs-4 fw-semibold">Traffic</CCardTitle>
              <CCardSubtitle className="fw-normal text-body-secondary border-bottom mb-3 pb-4">
                Last Week
              </CCardSubtitle>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">
                          {t('newClients')}
                        </div>
                        <div className="fs-5 fw-semibold">9,123</div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">
                          {t('recurringClients')}
                        </div>
                        <div className="fs-5 fw-semibold">22,643</div>
                      </div>
                    </CCol>
                  </CRow>
                  <div className="border-top mb-4" />
                  {progressGroupExample1.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-prepend">
                        <span className="text-body-secondary small">{item.title}</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="info-gradient" value={item.value1} />
                        <CProgress thin color="danger-gradient" value={item.value2} />
                      </div>
                    </div>
                  ))}
                </CCol>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">
                          {t('pageviews')}
                        </div>
                        <div className="fs-5 fw-semibold">78,623</div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">
                          {t('organic')}
                        </div>
                        <div className="fs-5 fw-semibold">49,123</div>
                      </div>
                    </CCol>
                  </CRow>
                  <div className="border-top mb-4" />
                  {progressGroupExample2.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">{item.value}%</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="warning-gradient" value={item.value} />
                      </div>
                    </div>
                  ))}

                  <div className="mb-5"></div>

                  {progressGroupExample3.map((item, index) => (
                    <div className="progress-group" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">
                          {item.value}{' '}
                          <span className="text-body-secondary small">({item.percent}%)</span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="success-gradient" value={item.percent} />
                      </div>
                    </div>
                  ))}
                </CCol>
              </CRow>
              <br />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow> */}
    </>
  )
}

export default Dashboard
