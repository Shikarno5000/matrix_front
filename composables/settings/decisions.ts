import { addCode } from '../index'

const features = addCode({
  description: { name: 'Решение', type: 'textarea', required: true },
  responsible_id: { name: 'Ответственный', type: 'select', items: 'users', withCode: 'responsible', required: true },
  date: { name: 'Срок', type: 'date' },
  decision_status_id: { name: 'Статус', type: 'select', static: 'decision_statuses' }
})

export const decisions = {
  table: {
    code: 'decisions',
    title: 'Решения',
    import: false,
    export: false,
    importExport: features,
    delAll: false,
    add: true,
    edit: true,
    headers: [
      features.date,
      features.responsible_id,
      features.decision_status_id,
      features.description,
      { type: 'cog' }
    ]
  },
  form: {
    title: { edit: 'Редактирование предложения', add: 'Добавление предложения' },
    values: [
      features.date,
      features.responsible_id,
      features.decision_status_id,
      features.description
    ]
  },
  card: {
    title: 'Основная информация',
    values: []
  }
}
