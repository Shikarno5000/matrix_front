import { addCode } from '../index'

const features = addCode({
  users: { name: 'Участники проекта от Матрикс', type: 'select', items: 'users', multiple: true }
})

export const projectUsers = {
  table: {
    code: 'project-users'
  },
  form: {
    title: { edit: 'Редактирование участников проекта от Матрикс', add: 'Добавление  участников проекта от Матрикс' },
    values: [features.users]
  },
  card: {

  }

}
