import React, { ElementType } from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilCalendar,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilEnvelopeOpen,
  cilGrid,
  cilLayers,
  cilMap,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilSpreadsheet,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react-pro'
import { Translation } from 'react-i18next'

export type Badge = {
  color: string
  text: string
}

export type NavItem = {
  badge?: Badge
  component: string | ElementType
  href?: string
  icon?: string | JSX.Element
  items?: NavItem[]
  name: string | JSX.Element
  to?: string
}

const _nav: NavItem[] = [
  {
    component: CNavItem,
    name: <Translation>{(t) => t('dashboard')}</Translation>,
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info-gradient',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: <Translation>{(t) => t('theme')}</Translation>,
  },
  {
    component: CNavItem,
    name: <Translation>{(t) => t('colors')}</Translation>,
    to: '/theme/colors',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: <Translation>{(t) => t('typography')}</Translation>,
    to: '/theme/typography',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: <Translation>{(t) => t('components')}</Translation>,
  },
  {
    component: CNavGroup,
    name: <Translation>{(t) => t('base')}</Translation>,
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Accordion',
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: 'Breadcrumb',
        to: '/base/breadcrumbs',
      },
      {
        component: CNavItem,
        name: 'Cards',
        to: '/base/cards',
      },
      {
        component: CNavItem,
        name: 'Carousel',
        to: '/base/carousels',
      },
      {
        component: CNavItem,
        name: 'Collapse',
        to: '/base/collapses',
      },
      {
        component: CNavItem,
        name: 'List group',
        to: '/base/list-groups',
      },
      {
        component: CNavItem,
        name: 'Navs & Tabs',
        to: '/base/navs',
      },
      {
        component: CNavItem,
        name: 'Pagination',
        to: '/base/paginations',
      },
      {
        component: CNavItem,
        name: 'Placeholders',
        to: '/base/placeholders',
      },
      {
        component: CNavItem,
        name: 'Popovers',
        to: '/base/popovers',
      },
      {
        component: CNavItem,
        name: 'Progress',
        to: '/base/progress',
      },
      {
        component: CNavItem,
        name: 'Spinners',
        to: '/base/spinners',
      },
      {
        component: CNavItem,
        name: 'Tables',
        to: '/base/tables',
      },
      {
        component: CNavItem,
        name: 'Tabs',
        to: '/base/tabs',
      },
      {
        component: CNavItem,
        name: 'Tooltips',
        to: '/base/tooltips',
      },
    ],
  },
  {
    component: CNavGroup,
    name: <Translation>{(t) => t('buttons')}</Translation>,
    to: '/buttons',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Buttons',
        to: '/buttons/buttons',
      },
      {
        component: CNavItem,
        name: 'Buttons groups',
        to: '/buttons/button-groups',
      },
      {
        component: CNavItem,
        name: 'Dropdowns',
        to: '/buttons/dropdowns',
      },
      {
        component: CNavItem,
        name: 'Loading Buttons',
        to: '/buttons/loading-buttons',
        badge: {
          color: 'danger-gradient',
          text: 'PRO',
        },
      },
    ],
  },
  {
    component: CNavGroup,
    name: <Translation>{(t) => t('forms')}</Translation>,
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Form Control',
        to: '/forms/form-control',
      },
      {
        component: CNavItem,
        name: 'Select',
        to: '/forms/select',
      },
      {
        component: CNavItem,
        name: 'Multi Select',
        to: '/forms/multi-select',
        badge: {
          color: 'danger-gradient',
          text: 'PRO',
        },
      },
      {
        component: CNavItem,
        name: 'Checks & Radios',
        to: '/forms/checks-radios',
      },
      {
        component: CNavItem,
        name: 'Range',
        to: '/forms/range',
      },
      {
        component: CNavItem,
        name: 'Input Group',
        to: '/forms/input-group',
      },
      {
        component: CNavItem,
        name: 'Floating Labels',
        to: '/forms/floating-labels',
      },
      {
        component: CNavItem,
        name: 'Date Picker',
        to: '/forms/date-picker',
        badge: {
          color: 'danger-gradient',
          text: 'PRO',
        },
      },
      {
        component: CNavItem,
        name: 'Date Range Picker',
        to: '/forms/date-range-picker',
        badge: {
          color: 'danger-gradient',
          text: 'PRO',
        },
      },
      {
        component: CNavItem,
        name: 'Time Picker',
        to: '/forms/time-picker',
        badge: {
          color: 'danger-gradient',
          text: 'PRO',
        },
      },
      {
        component: CNavItem,
        name: 'Layout',
        to: '/forms/layout',
      },
      {
        component: CNavItem,
        name: 'Validation',
        to: '/forms/validation',
      },
    ],
  },
  {
    component: CNavGroup,
    name: <Translation>{(t) => t('icons')}</Translation>,
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'CoreUI Free',
        to: '/icons/coreui-icons',
        badge: {
          color: 'success-gradient',
          text: 'FREE',
        },
      },
      {
        component: CNavItem,
        name: 'CoreUI Flags',
        to: '/icons/flags',
      },
      {
        component: CNavItem,
        name: 'CoreUI Brands',
        to: '/icons/brands',
      },
    ],
  },
  {
    component: CNavGroup,
    name: <Translation>{(t) => t('notifications')}</Translation>,
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Alerts',
        to: '/notifications/alerts',
      },
      {
        component: CNavItem,
        name: 'Badges',
        to: '/notifications/badges',
      },
      {
        component: CNavItem,
        name: 'Modal',
        to: '/notifications/modals',
      },
      {
        component: CNavItem,
        name: 'Toasts',
        to: '/notifications/toasts',
      },
    ],
  },
  {
    component: CNavItem,
    name: <Translation>{(t) => t('widgets')}</Translation>,
    to: '/widgets',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    badge: {
      color: 'info-gradient',
      text: 'NEW',
    },
  },
  {
    component: CNavItem,
    name: 'Smart Table',
    icon: <CIcon icon={cilGrid} customClassName="nav-icon" />,
    badge: {
      color: 'danger-gradient',
      text: 'PRO',
    },
    to: '/smart-table',
  },
  {
    component: CNavTitle,
    name: <Translation>{(t) => t('plugins')}</Translation>,
  },
  {
    component: CNavItem,
    name: <Translation>{(t) => t('calendar')}</Translation>,
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    badge: {
      color: 'danger-gradient',
      text: 'PRO',
    },
    to: '/plugins/calendar',
  },
  {
    component: CNavItem,
    name: <Translation>{(t) => t('charts')}</Translation>,
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
    to: '/plugins/charts',
  },
  {
    component: CNavItem,
    name: 'Google Maps',
    icon: <CIcon icon={cilMap} customClassName="nav-icon" />,
    badge: {
      color: 'danger-gradient',
      text: 'PRO',
    },
    to: '/plugins/google-maps',
  },
  {
    component: CNavTitle,
    name: <Translation>{(t) => t('extras')}</Translation>,
  },
  {
    component: CNavGroup,
    name: <Translation>{(t) => t('pages')}</Translation>,
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: <Translation>{(t) => t('login')}</Translation>,
        to: '/login',
      },
      {
        component: CNavItem,
        name: <Translation>{(t) => t('register')}</Translation>,
        to: '/register',
      },
      {
        component: CNavItem,
        name: <Translation>{(t) => t('error404')}</Translation>,
        to: '/404',
      },
      {
        component: CNavItem,
        name: <Translation>{(t) => t('error500')}</Translation>,
        to: '/500',
      },
    ],
  },
  {
    component: CNavGroup,
    name: <Translation>{(t) => t('apps')}</Translation>,
    icon: <CIcon icon={cilLayers} customClassName="nav-icon" />,
    items: [
      {
        component: CNavGroup,
        name: 'Invoicing',
        icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
        to: '/apps/invoicing',
        items: [
          {
            component: CNavItem,
            name: 'Invoice',
            badge: {
              color: 'danger-gradient',
              text: 'PRO',
            },
            to: '/apps/invoicing/invoice',
          },
        ],
      },
      {
        component: CNavGroup,
        name: 'Email',
        to: '/apps/email',
        icon: <CIcon icon={cilEnvelopeOpen} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Inbox',
            badge: {
              color: 'danger-gradient',
              text: 'PRO',
            },
            to: '/apps/email/inbox',
          },
          {
            component: CNavItem,
            name: 'Message',
            badge: {
              color: 'danger-gradient',
              text: 'PRO',
            },
            to: '/apps/email/message',
          },
          {
            component: CNavItem,
            name: 'Compose',
            badge: {
              color: 'danger-gradient',
              text: 'PRO',
            },
            to: '/apps/email/compose',
          },
        ],
      },
    ],
  },
]

export default _nav
