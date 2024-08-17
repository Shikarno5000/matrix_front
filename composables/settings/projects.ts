import { addCode } from '../index'

const features = addCode({
  name_short: { name: 'Краткое обозначение', type: 'string', maxSize: 20, required: true },
  archive: { name: 'Архивный', type: 'checkbox' },
  name: { name: 'Наименование', type: 'string', maxSize: 250, required: true },
  project_type_id: { name: 'Тип', type: 'select', static: 'project_types', required: true, disabledEdit: true },
  cipher_prefix: { name: 'Префикс шифра', type: 'string', maxSize: 25 },
  object_description: { name: 'Объект', type: 'string', maxSize: 250 },
  responsible_executor_id: { name: 'Ответственный исполнитель', type: 'select', items: 'users', withCode: 'responsible_executor' },
  contract_id: { name: 'Основной договор', type: 'select', items: 'contracts' },
  contracts: { name: 'Доп. договора', type: 'select', items: 'contracts', multiple: true },
  sort: { name: 'Сортировка', type: 'number', max: 1000, min: 0, batchEditing: true }
})

export const projects = {
  table: {
    code: 'projects',
    title: '',
    import: false,
    export: false,
    importExport: features,
    delAll: false,
    add: true,
    edit: true,
    headers: [
      { ...features.name_short, to: '/projects/{id}/' },
      { ...features.name, to: '/projects/{id}/' },
      { name: 'Виды работ', type: 'project_type' },
      { name: 'Факт. поступления, руб.', type: 'total_entrance' },
      { name: 'Факт. расход, руб.', type: 'total_expenditure' },
      features.contract_id,
      // { name: 'Основной договор', code: 'contract', type: 'extractingLink', extractingValue: 'code', to: '/office-work/contracts/{id}/' },
      features.sort,
      { type: 'cog' }
    ]
  },
  form: {
    title: { edit: 'Редактирование проекта', add: 'Добавление нового проекта' },
    values: [
      {
        formBlock: '2',
        items: [features.name_short, features.archive]
      },
      features.name,
      features.project_type_id,
      features.cipher_prefix,
      features.object_description,
      features.responsible_executor_id,
      features.contract_id,
      features.contracts,
      features.sort
    ]
  },
  card: {
    title: 'Основная информация',
    values: [
      ...Object.values(features),
      { name: 'Файлы', type: 'files', table: 'projects' },
      { name: 'Выгрузка данных', type: 'extractingLink', to: '/projects/{id}/elements' }
    ]
  }

}
