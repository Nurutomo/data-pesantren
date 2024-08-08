import { Pondok } from '../types.js'

export interface User {
  token?: string
  email: string
  password: string
}

export interface DataPondok extends Pondok {
  creator?: User['email']
}

export default interface Data {
  users: User[]
  pondok: DataPondok[]
}

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
