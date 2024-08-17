import { addCode } from '../index'

const features = addCode({
  name: { name: 'ФИО', type: 'string', maxSize: 50, required: true },
  name_short: { name: 'Краткое ФИО', type: 'string', maxSize: 25, required: true },
  email: { name: 'Email', type: 'email' },
  phone: { name: 'Телефон', type: 'phone', maxSize: 20 },
  position: { name: 'Должность', type: 'string', maxSize: 50 },
  comment: { name: 'Комментарий', type: 'string', maxSize: 200 },
  counter_agents: { name: 'Контрагенты', type: 'select', items: 'counterAgents', multiple: true }
})

export const counterAgentWorkers = {
  table: {
    code: 'counter-agent-workers',
    title: '',
    import: false,
    export: false,
    importExport: features,
    delAll: false,
    add: true,
    edit: true,
    headers: [features.name_short, features.name, features.email, features.phone, features.position, features.comment, features.counter_agents, { type: 'cog' }]
  },
  form: {
    title: { edit: 'Редактирование работника контрагента', add: 'Добавление работника контрагента' },
    values: [
      features.name,
      {
        formBlock: '2',
        items: [features.name_short, features.position, features.email, features.phone]
      },
      features.comment,
      features.counter_agents
    ]
  },
  card: {
    title: 'Основная информация',
    values: Object.values(features)
  }

}
