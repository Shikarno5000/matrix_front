type revealed = {
  role?: string
  departmentName?: string
  positionName?: string
  status?: string
}

declare global {
  type TUserFillable = {
    email: string
    password: string
    name: string
    name_short: string
    birth_date: string
    phone: string
    phone_internal: string
    comment: string
    department_id: number
    user_role_id: number
    user_status_id: number
    salary: number
    working_hours: number
    settings: string // {name: string, value: any}[]
    position_id: number
  }

  type TUser = AId & TUserFillable
  type TUserRevealed = TUser & revealed
}
export default global
