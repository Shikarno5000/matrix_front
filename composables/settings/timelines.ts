import { addCode } from '../index'

const features = addCode({
  text: { name: 'Наименование', type: 'string', maxSize: 250, required: true },
  date: { name: 'Дата', type: 'date', required: true, default: 'now' },
  description: { name: 'Описание', type: 'textarea' },
  event_id: { name: 'Событие', type: 'select', static: 'events' },
  entrance: { name: 'Поступление', type: 'price', if: 'event_id', ifEqual: 1 },
  expenditure: { name: 'Расход', type: 'price', if: 'event_id', ifEqual: 2 }
})

export const timelines = {
  table: {
    code: 'timelines',
    title: '',
    import: false,
    export: false,
    importExport: features,
    delAll: false,
    add: true,
    edit: true,
    headers: [{ type: 'cog' }]
  },
  form: {
    title: { edit: 'Редактирование истории', add: 'Добавление истории' },
    values: [
      {
        formBlock: '21',
        items: [features.text, features.date]
      },
      features.description,
      {
        formBlock: '2',
        items: [features.event_id, features.entrance, features.expenditure]
      }
    ]
  }

}
