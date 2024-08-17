import { addCode } from '../index'

const features = addCode({
  name: { name: 'ФИО (полностью)', type: 'string', maxSize: 50, required: true },
  name_short: { name: 'ФИО (кратко)', type: 'string', maxSize: 25, required: true },
  email: { name: 'Email', type: 'email', maxSize: 25, required: true },
  user_status_id: { name: 'Статус', type: 'select', static: 'user_statuses' },
  department_id: { name: 'Отделение', type: 'select', static: 'departments' },
  user_role_id: { name: 'Роль', type: 'select', static: 'user_roles' },
  birth_date: { name: 'День рождения', type: 'date' },
  phone: { name: 'Телефон', type: 'phone' },
  phone_internal: { name: 'Внутренний телефон', type: 'string', maxSize: 20 },
  salary: { name: 'Зарплата', type: 'price', min: 0 },
  working_hours: { name: 'Рабочих часов', type: 'number', min: 0 },
  position_id: { name: 'Должность', type: 'select', items: 'positions' },
  password: { name: 'Пароль', type: 'string', maxSize: 100, addRequired: true },
  comment: { name: 'Комментарий', type: 'string', maxSize: 100 }
})

export const users = {
  table: {
    code: 'users',
    title: '',
    import: false,
    export: false,
    importExport: features,
    delAll: false,
    add: true,
    edit: true,
    headers: [
      features.name,
      features.name_short,
      features.email,
      features.user_status_id,
      features.department_id,
      features.user_role_id,
      features.birth_date,
      features.phone,
      features.phone_internal,
      features.salary,
      features.working_hours,
      { name: 'Должность', code: 'position', type: 'extractingValues', extractingValue: 'name' },
      features.comment,
      { type: 'cog' }
    ]
  },
  form: {
    title: { edit: 'Редактирование пользователя', add: 'Добавление пользователя' },
    values: [
      features.name,
      {
        formBlock: '2',
        items: [
          features.name_short,
          features.email,
          features.user_status_id,
          features.department_id,
          features.user_role_id,
          features.birth_date,
          features.phone,
          features.phone_internal,
          features.salary,
          features.working_hours,
          features.position_id,
          features.password
        ]
      },
      features.comment
    ]
  },
  card: {
    title: 'Основная информация',
    values: [...Object.values(features)]
  }

}
