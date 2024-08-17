import { addCode } from '../index'

const features = addCode({
  name: { name: 'Наименование', type: 'string', maxSize: 250, required: true },
  suffix: { name: 'Суффикс', type: 'string', maxSize: 25 },
  sort: { name: 'Сорт.', type: 'number', max: 1000, min: 0 },
  execution_weight: { name: 'Вес выполнения', type: 'number', min: 0 },
  document_status_id: { name: 'Статус', type: 'select', static: 'document_statuses' },
  change_from_gip: { name: 'Изменения от ГИПа', type: 'string', maxSize: 250 },
  executor_id: { name: 'Исполнитель', type: 'select', items: 'users', withCode: 'executor' }
})

export const documents = {
  table: {
    code: 'documents',
    title: '',
    import: false,
    export: false,
    importExport: features,
    delAll: false,
    add: true,
    edit: true,
    headers: [
      features.sort,
      { ...features.suffix, type: 'suffix' },
      { ...features.name, type: 'linkToId', to: '/projects/{id}/doc-' },
      features.document_status_id,
      { name: 'Время в статусе ', code: 'lastStatusChange', type: 'lastStatusChange' },
      features.execution_weight,
      features.executor_id,
      features.change_from_gip,
      features.execution_weight,
      { type: 'cog' }
    ]
  },
  form: {
    title: { edit: 'Редактирование документа', add: 'Добавление документа' },
    values: [
      {
        formBlock: '21',
        items: [features.name, features.sort]
      },
      {
        formBlock: '2',
        items: [features.document_status_id, features.executor_id, features.suffix, features.execution_weight]
      },
      features.change_from_gip
    ]
  },
  card: {
    title: 'Основная информация',
    values: [
      ...Object.values(features),
      { ...features.suffix, type: 'suffix' },
      { name: 'Связанные проекты', type: 'links', code: 'projects', to: '/projects/{id}/' },
      { name: 'Прикрепленные файлы', type: 'files', table: 'documents' }
    ]
  }

}
