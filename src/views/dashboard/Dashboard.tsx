import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCardSubtitle,
  CCardTitle,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CWidgetStatsA,
} from '@coreui/react-pro'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilPeople,
  cilUser,
  cilUserFemale,
  cilArrowBottom,
  cilCart,
  cilArrowTop,
  cilUserPlus,
  cilOptions,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

const Dashboard = () => {
  const { t } = useTranslation()
  const chartBartRef = useRef<any>(null)
  const chartLineRef = useRef<any>(null)

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

  const progressGroupExample1 = [
    { title: t('monday'), value1: 34, value2: 78 },
    { title: t('tuesday'), value1: 56, value2: 94 },
    { title: t('wednesday'), value1: 12, value2: 67 },
    { title: t('thursday'), value1: 43, value2: 91 },
    { title: t('friday'), value1: 22, value2: 73 },
    { title: t('saturday'), value1: 53, value2: 82 },
    { title: t('sunday'), value1: 9, value2: 69 },
  ]

  const progressGroupExample2 = [
    { title: t('male'), icon: cilUser, value: 53 },
    { title: t('female'), icon: cilUserFemale, value: 43 },
  ]

  const progressGroupExample3 = [
    { title: t('organicSearch'), icon: cibGoogle, percent: 56, value: '191,235' },
    { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
    { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
    { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
  ]

  const tableExampleUsagePeriod = (dateStart: Date, dateEnd: Date) => {
    const formatParams = { date: { year: 'numeric', month: 'short', day: 'numeric' } }
    return `${t('date', {
      date: dateStart,
      formatParams,
    })} - ${t('date', {
      date: dateEnd,
      formatParams,
    })}`
  }

  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: t('date', {
          date: new Date(2023, 0, 10),
          formatParams: { date: { year: 'numeric', month: 'short', day: 'numeric' } },
        }),
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: tableExampleUsagePeriod(new Date(2023, 5, 11), new Date(2023, 6, 10)),
        color: 'success',
      },
      activity: t('relativeTime', { val: -10, range: 'seconds' }),
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Avram Tarasios',
        new: false,
        registered: t('date', {
          date: new Date(2023, 0, 10),
          formatParams: { date: { year: 'numeric', month: 'short', day: 'numeric' } },
        }),
      },
      country: { name: 'Brazil', flag: cifBr },
      usage: {
        value: 22,
        period: tableExampleUsagePeriod(new Date(2023, 5, 11), new Date(2023, 6, 10)),
        color: 'info',
      },
      activity: t('relativeTime', { val: -5, range: 'minutes' }),
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: {
        name: 'Quintin Ed',
        new: true,
        registered: t('date', {
          date: new Date(2023, 0, 10),
          formatParams: { date: { year: 'numeric', month: 'short', day: 'numeric' } },
        }),
      },
      country: { name: 'India', flag: cifIn },
      usage: {
        value: 74,
        period: tableExampleUsagePeriod(new Date(2023, 5, 11), new Date(2023, 6, 10)),
        color: 'warning',
      },
      activity: t('relativeTime', { val: -1, range: 'hours' }),
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      user: {
        name: 'Enéas Kwadwo',
        new: true,
        registered: t('date', {
          date: new Date(2023, 0, 10),
          formatParams: { date: { year: 'numeric', month: 'short', day: 'numeric' } },
        }),
      },
      country: { name: 'France', flag: cifFr },
      usage: {
        value: 98,
        period: tableExampleUsagePeriod(new Date(2023, 5, 11), new Date(2023, 6, 10)),
        color: 'danger',
      },
      activity: t('relativeTime', { val: -1, range: 'weeks' }),
    },
    {
      avatar: { src: avatar5, status: 'success' },
      user: {
        name: 'Agapetus Tadeáš',
        new: true,
        registered: t('date', {
          date: new Date(2023, 0, 10),
          formatParams: { date: { year: 'numeric', month: 'short', day: 'numeric' } },
        }),
      },
      country: { name: 'Spain', flag: cifEs },
      usage: {
        value: 22,
        period: tableExampleUsagePeriod(new Date(2023, 5, 11), new Date(2023, 6, 10)),
        color: 'primary',
      },
      activity: t('relativeTime', { val: -3, range: 'months' }),
    },
    {
      avatar: { src: avatar6, status: 'danger' },
      user: {
        name: 'Friderik Dávid',
        new: true,
        registered: t('date', {
          date: new Date(2023, 0, 10),
          formatParams: { date: { year: 'numeric', month: 'short', day: 'numeric' } },
        }),
      },
      country: { name: 'Poland', flag: cifPl },
      usage: {
        value: 43,
        period: tableExampleUsagePeriod(new Date(2023, 5, 11), new Date(2023, 6, 10)),
        color: 'success',
      },
      activity: t('relativeTime', { val: -1, range: 'years' }),
    },
  ]

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
                      <CCardTitle className="fs-4 fw-semibold">{t('sale')}</CCardTitle>
                    </CCol>
                    <CCol className="text-end text-primary fs-4 fw-semibold">$613.200</CCol>
                  </CRow>
                  <CCardSubtitle className="fw-normal text-body-secondary">
                    {t('date', {
                      date: new Date(2023, 0, 1),
                      formatParams: {
                        date: {
                          month: 'long',
                        },
                      },
                    })}{' '}
                    -{' '}
                    {t('date', {
                      date: new Date(2023, 6, 1),
                      formatParams: {
                        date: {
                          year: 'numeric',
                          month: 'long',
                        },
                      },
                    })}
                  </CCardSubtitle>
                </CCardBody>
                <CChartLine
                  className="mt-3"
                  style={{ height: '150px' }}
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
                        backgroundColor: `rgba(${getStyle('--cui-primary-rgb')}, .1)`,
                        borderColor: getStyle('--cui-primary'),
                        borderWidth: 3,
                        data: [78, 81, 80, 45, 34, 22, 40],
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
            <CCol sm={6}>
              <CCard className="mb-4">
                <CCardBody>
                  <div className="d-flex justify-content-between">
                    <CCardTitle as="h6" className="text-body-secondary text-truncate">
                      {t('customers')}
                    </CCardTitle>
                    <div className="bg-primary bg-opacity-25 text-primary rounded p-2 ms-2">
                      <CIcon icon={cilPeople} size="xl" />
                    </div>
                  </div>
                  <div className="fs-4 fw-semibold pb-3">44.725</div>
                  <small className="text-danger">
                    (-12.4% <CIcon icon={cilArrowBottom} />)
                  </small>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol sm={6}>
              <CCard className="mb-4">
                <CCardBody>
                  <div className="d-flex justify-content-between">
                    <CCardTitle as="h6" className="text-body-secondary text-truncate">
                      {t('orders')}
                    </CCardTitle>
                    <div className="bg-primary bg-opacity-25 text-primary rounded p-2 ms-2">
                      <CIcon icon={cilCart} size="xl" />
                    </div>
                  </div>
                  <div className="fs-4 fw-semibold pb-3">385</div>
                  <small className="text-success">
                    (17.2% <CIcon icon={cilArrowTop} />)
                  </small>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCol>
        <CCol xl={8}>
          <CCard className="mb-4">
            <CCardBody className="p-4">
              <CCardTitle className="fs-4 fw-semibold">{t('traffic')}</CCardTitle>
              <CCardSubtitle
                className="fw-normal text-body-secondary"
                style={{ marginBottom: '40px' }}
              >
                {t('date', {
                  date: new Date(2022, 0, 1),
                  formatParams: {
                    date: { year: 'numeric', month: 'long', day: 'numeric' },
                  },
                })}{' '}
                -{' '}
                {t('date', {
                  date: new Date(2022, 11, 31),
                  formatParams: {
                    date: { year: 'numeric', month: 'long', day: 'numeric' },
                  },
                })}
              </CCardSubtitle>
              <CChartBar
                ref={chartBartRef}
                data={{
                  labels: [
                    mainChartLabel(new Date(Date.UTC(2022, 0, 1))),
                    mainChartLabel(new Date(Date.UTC(2022, 1, 1))),
                    mainChartLabel(new Date(Date.UTC(2022, 2, 1))),
                    mainChartLabel(new Date(Date.UTC(2022, 3, 1))),
                    mainChartLabel(new Date(Date.UTC(2022, 4, 1))),
                    mainChartLabel(new Date(Date.UTC(2022, 5, 1))),
                    mainChartLabel(new Date(Date.UTC(2022, 6, 1))),
                    mainChartLabel(new Date(Date.UTC(2022, 7, 1))),
                    mainChartLabel(new Date(Date.UTC(2022, 8, 1))),
                    mainChartLabel(new Date(Date.UTC(2022, 9, 1))),
                    mainChartLabel(new Date(Date.UTC(2022, 10, 1))),
                    mainChartLabel(new Date(Date.UTC(2022, 11, 1))),
                  ],
                  datasets: [
                    {
                      label: 'Users',
                      backgroundColor: getStyle('--cui-primary'),
                      borderRadius: 6,
                      borderSkipped: false,
                      data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
                      barPercentage: 0.6,
                      categoryPercentage: 0.5,
                    },
                    {
                      label: 'New users',
                      backgroundColor: getStyle('--cui-gray-200'),
                      borderRadius: 6,
                      borderSkipped: false,
                      data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
                      barPercentage: 0.6,
                      categoryPercentage: 0.5,
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
      <CRow>
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
      </CRow>
    </>
  )
}

export default Dashboard
