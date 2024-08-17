import { addCode } from '../index'

const features = addCode({
  participant_type_id: { name: 'Тип', type: 'select', static: 'participant_types', required: true },
  counter_agent_id: { name: 'Контрагент', type: 'select', items: 'counterAgents', required: true, disabledEdit: true },
  comment: { name: 'Комментарий', type: 'string', maxSize: 100 },
  counter_agent_workers: { name: 'Сотрудники', type: 'select', items: 'counterAgentWorkers', multiple: true, if: 'counter_agent_id', itemsFilter: 'counter_agent_id', filterValue: 'counter_agent_ids' }
})

export const participants = {
  table: {
    code: 'participants',
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
    title: { edit: 'Редактирование участника проекта', add: 'Добавление участника проекта' },
    values: [
      {
        formBlock: '2',
        items: [features.participant_type_id, features.counter_agent_id, features.comment, features.counter_agent_workers]
      }
    ]
  }

}
