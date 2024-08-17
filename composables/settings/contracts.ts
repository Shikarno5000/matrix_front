import { addCode } from '../index'

const features = addCode({
  date: { name: 'Дата', type: 'date', required: true },
  code: { name: 'Номер', type: 'string', maxSize: 100, required: true },
  contract_status_id: { name: 'Статус договора', type: 'select', static: 'contract_statuses', required: true },
  responsible_executor_id: { name: 'Отв., Матрикс', type: 'select', items: 'users', withCode: 'responsible_executor' },
  contract_type_id: { name: 'Тип', type: 'select', static: 'contract_types' },
  pricing_type_id: { name: 'Формирование цены', type: 'select', static: 'pricing_types' },
  counter_agent_id: { name: 'Контрагент', type: 'select', items: 'counterAgents' },
  counter_agent_worker_id: { name: 'Отв., контрагент', type: 'select', items: 'counterAgentWorkers', if: 'counter_agent_id', itemsFilter: 'counter_agent_id', filterValue: 'counter_agent_ids' },
  subject_contract: { name: 'Предмет договора', type: 'string', maxSize: 250 },
  term_of_agreement: { name: 'Срок действия', type: 'date' },
  price: { name: 'Цена договора', type: 'price' },
  notes: { name: 'Примечание', type: 'string', maxSize: 50 },
  object_name: { name: 'Наименование объекта', type: 'string', maxSize: 250 },
  execution_percentage: { name: 'Исполнение договора', type: 'range', min: 0, max: 100, default: 0 }
})

export const contracts = {
  table: {
    code: 'contracts',
    title: 'Договора',
    import: false,
    export: false,
    importExport: features,
    delAll: false,
    add: true,
    edit: true,
    headers: [
      { ...features.date, to: '/office-work/contracts/{id}/' },
      { ...features.code, to: '/office-work/contracts/{id}/' },
      features.contract_status_id,
      features.responsible_executor_id,
      features.counter_agent_id,
      features.counter_agent_worker_id,
      features.subject_contract,
      features.term_of_agreement,
      features.contract_type_id,
      features.object_name,
      { ...features.pricing_type_id, name: 'Форм. цены' },
      features.price,
      { ...features.execution_percentage, name: 'Исполнение' },
      features.notes,
      { type: 'cog' }
    ]
  },
  form: {
    title: { edit: 'Редактирование договора', add: 'Добавление договора' },
    values: [
      {
        formBlock: '2',
        items: [
          features.date,
          features.code,
          features.contract_status_id,
          features.contract_type_id,
          features.responsible_executor_id,
          features.counter_agent_id,
          features.counter_agent_worker_id,
          features.pricing_type_id,
          features.price,
          features.execution_percentage
        ]
      },
      { ...features.term_of_agreement, type: 'dateCalculation' },
      features.subject_contract,
      features.object_name,
      features.notes
    ]
  },
  card: {
    title: 'Основная информация',
    code: 'contracts',
    values: [
      ...Object.values(features),
      { name: 'Связанные проекты', type: 'links', code: 'projects', to: '/projects/{id}/' },
      { name: 'Файлы', type: 'files', table: 'contracts' }
    ]
  }

}
