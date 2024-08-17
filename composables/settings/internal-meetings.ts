import { addCode } from '../index'

const features = addCode({
  date: { name: 'Дата/время', type: 'date', required: true },
  place: { name: 'Место', type: 'string', maxSize: 100, required: true },
  organizer_id: { name: 'Организатор', type: 'select', items: 'users', withCode: 'organizer' },
  users: { name: 'Участники', type: 'select', items: 'users', withCode: 'users', multiple: true }
})

export const internalMeetings = {
  table: {
    code: 'internal-meetings',
    title: '',
    import: false,
    export: false,
    importExport: features,
    delAll: false,
    add: true,
    edit: true,
    headers: [
      { ...features.date, to: '/office-work/internal-meetings/{id}/' },
      { ...features.place, to: '/office-work/internal-meetings/{id}/' },
      features.organizer_id,
      features.users,
      { type: 'cog' }
    ]
  },
  form: {
    title: { edit: 'Редактирование внутреннего совещания', add: 'Добавление внутреннего совещания' },
    values: [
      {
        formBlock: '2',
        items: [features.date, features.organizer_id]
      },
      features.place,
      features.users
    ]
  },
  card: {
    title: 'Основная информация',
    values: [
      features.date,
      features.place,
      features.organizer_id,
      features.users
      // { name: 'Файлы', type: 'files', table: table.code }
    ]
  }

}
