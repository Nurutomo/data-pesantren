import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import { CWidgetStatsD, CRow, CCol } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cibFacebook, cibLinkedin, cibTwitter, cilCalendar } from '@coreui/icons'
import { CChart } from '@coreui/react-chartjs'

const WidgetsBrand = (props: { className?: string; withCharts?: boolean }) => {
  const { t } = useTranslation()

  const chartOptions = {
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  }

  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsD
          {...(props.withCharts && {
            chart: (
              <CChart
                className="position-absolute w-100 h-100"
                type="line"
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      backgroundColor: 'rgba(255,255,255,.1)',
                      borderColor: 'rgba(255,255,255,.55)',
                      pointHoverBackgroundColor: '#fff',
                      borderWidth: 2,
                      data: [65, 59, 84, 84, 51, 55, 40],
                      fill: true,
                    },
                  ],
                }}
                options={chartOptions}
              />
            ),
          })}
          icon={<CIcon icon={cibFacebook} height={52} className="my-4 text-white" />}
          values={[
            { title: t('friends'), value: '89K' },
            { title: t('feeds'), value: '459' },
          ]}
          style={
            {
              '--cui-card-cap-bg': '#3b5998',
            } as React.CSSProperties
          }
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsD
          {...(props.withCharts && {
            chart: (
              <CChart
                className="position-absolute w-100 h-100"
                type="line"
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      backgroundColor: 'rgba(255,255,255,.1)',
                      borderColor: 'rgba(255,255,255,.55)',
                      pointHoverBackgroundColor: '#fff',
                      borderWidth: 2,
                      data: [1, 13, 9, 17, 34, 41, 38],
                      fill: true,
                    },
                  ],
                }}
                options={chartOptions}
              />
            ),
          })}
          icon={<CIcon icon={cibTwitter} height={52} className="my-4 text-white" />}
          values={[
            { title: t('followers'), value: '973k' },
            { title: t('tweets'), value: '1.792' },
          ]}
          style={
            {
              '--cui-card-cap-bg': '#00aced',
            } as React.CSSProperties
          }
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsD
          {...(props.withCharts && {
            chart: (
              <CChart
                className="position-absolute w-100 h-100"
                type="line"
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      backgroundColor: 'rgba(255,255,255,.1)',
                      borderColor: 'rgba(255,255,255,.55)',
                      pointHoverBackgroundColor: '#fff',
                      borderWidth: 2,
                      data: [78, 81, 80, 45, 34, 12, 40],
                      fill: true,
                    },
                  ],
                }}
                options={chartOptions}
              />
            ),
          })}
          icon={<CIcon icon={cibLinkedin} height={52} className="my-4 text-white" />}
          values={[
            { title: t('contacts'), value: '500' },
            { title: t('feeds'), value: '1.292' },
          ]}
          style={
            {
              '--cui-card-cap-bg': '#4875b4',
            } as React.CSSProperties
          }
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsD
          color="warning"
          {...(props.withCharts && {
            chart: (
              <CChart
                className="position-absolute w-100 h-100"
                type="line"
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      backgroundColor: 'rgba(255,255,255,.1)',
                      borderColor: 'rgba(255,255,255,.55)',
                      pointHoverBackgroundColor: '#fff',
                      borderWidth: 2,
                      data: [35, 23, 56, 22, 97, 23, 64],
                      fill: true,
                    },
                  ],
                }}
                options={chartOptions}
              />
            ),
          })}
          icon={<CIcon icon={cilCalendar} height={52} className="my-4 text-white" />}
          values={[
            { title: t('events'), value: '12+' },
            { title: t('meetings'), value: '4' },
          ]}
        />
      </CCol>
    </CRow>
  )
}

WidgetsBrand.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsBrand
