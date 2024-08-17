import { addCode } from '../index'

const features = addCode({
  name: { name: 'Краткое наименование', type: 'string', maxSize: 250, required: true },
  name_short: { name: 'Краткое обозначение', type: 'string', maxSize: 50, required: true },
  legal_address: { name: 'Юридический адрес', type: 'string', maxSize: 250 },
  actual_address: { name: 'Фактический адрес', type: 'string', maxSize: 250 },
  inn: { name: 'ИНН', type: 'string', maxSize: 30, required: true },
  kpp: { name: 'КПП', type: 'string', maxSize: 30 },
  ogrn: { name: 'ОГРН', type: 'string', maxSize: 30 },
  okpo: { name: 'ОКПО', type: 'string', maxSize: 30 },
  oktmo: { name: 'ОКТМО', type: 'string', maxSize: 30 },
  counter_agent_role_id: { name: 'Роль', type: 'select', static: 'counter_agent_roles' },
  counter_agent_workers: { name: 'Сотрудники', type: 'select', items: 'counterAgentWorkers', multiple: true }
})

export const counterAgents = {
  table: {
    code: 'counter-agents',
    title: 'Перечень контрагентов',
    import: false,
    export: false,
    importExport: features,
    delAll: false,
    add: true,
    edit: true,
    headers: [features.name_short, features.name, features.legal_address, features.actual_address, features.inn, features.kpp, features.ogrn, features.okpo, features.oktmo, features.counter_agent_role_id, features.counter_agent_workers, { type: 'cog' }]
  },
  form: {
    title: { edit: 'Редактирование контрагента', add: 'Добавление контрагента' },
    values: [
      {
        formBlock: '2',
        items: [features.name_short, features.counter_agent_role_id]
      },
      features.name,
      features.legal_address,
      features.actual_address,
      features.counter_agent_workers,
      {
        formBlock: '2',
        items: [features.inn, features.kpp, features.ogrn, features.okpo, features.oktmo]
      }
    ]
  },
  card: {
    title: 'Основная информация',
    values: Object.values(features)
  }

}
