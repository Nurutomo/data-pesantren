import { legacy_createStore as createStore } from 'redux'

export type State = {
  asideShow: boolean
  sidebarShow: boolean
  theme: string
  sidebarUnfoldable: boolean
}

type Args = { type: string; [key: string]: boolean | string }

const initialState: State = {
  asideShow: false,
  sidebarShow: true,
  theme: 'light',
  sidebarUnfoldable: false,
}

const changeState = (state = initialState, { type, ...rest }: Args) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

const store = createStore(changeState)

export default store
