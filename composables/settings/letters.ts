import { addCode } from '../index'

const features = addCode({
  date: { name: 'Дата регистрации', type: 'date', required: true },
  code: { name: 'Номер', type: 'string', maxSize: 50, required: true },
  organization: { name: 'Организация', type: 'string', maxSize: 200, required: true },
  fio: { name: 'ФИО', type: 'string', maxSize: 200, required: true },
  letter_direction_id: { name: 'Направление', type: 'select', static: 'letter_directions', required: true },
  letter_type_id: { name: 'Тип', type: 'select', static: 'letter_types', required: true },
  shipping_method_id: { name: 'Тип доставки', type: 'select', static: 'shipping_methods' },
  delivery_email: { name: 'Email доставки', type: 'email', if: 'shipping_method_id', ifEqual: 1 },
  delivery_address: { name: 'Адрес доставки', type: 'string', maxSize: 250, if: 'shipping_method_id', ifEqual: 2 },
  content: { name: 'Содержание', type: 'string', maxSize: 250 },
  applications: { name: 'Приложения', type: 'string', maxSize: 250 },
  executor_id: { name: 'Исполнитель', type: 'select', items: 'users', withCode: 'executor' },
  contract_id: { name: 'Привязка к договору', type: 'select', items: 'contracts' },
  incoming_letter_date: { name: 'Вх. дата', type: 'date' },
  incoming_letter_code: { name: 'Вх. номер', type: 'string', maxSize: 50 },
  response_to_id: { name: 'В ответ на письмо', type: 'select', items: 'letters' },
  execution_date: { name: 'Исполнение', type: 'date' },
  notes: { name: 'Примечания', type: 'string', maxSize: 250 }
})

export const letters = {
  table: {
    code: 'letters',
    title: '',
    import: false,
    export: false,
    importExport: features,
    delAll: false,
    add: true,
    edit: true,
    headers: [
      { ...features.code, to: '/office-work/letters/{id}/' },
      { ...features.date, to: '/office-work/letters/{id}/' },
      features.letter_direction_id,
      features.letter_type_id,
      features.organization,
      features.fio,
      { name: 'Доставить', type: 'shipping_method' },
      features.content,
      features.applications,
      // {
      //   name: 'Договор',
      //   code: 'contract',
      //   type: 'extractingLink',
      //   extractingValue: 'code',
      //   to: '/office-work/contracts/{id}/'
      // },
      features.executor_id,
      // {
      //   name: 'Ответ на',
      //   code: 'response_to',
      //   type: 'extractingLink',
      //   extractingValue: 'code',
      //   to: '/office-work/letters/{id}/'
      // },
      features.execution_date,
      features.notes,
      { name: 'Интервал', type: 'interval' },
      { type: 'cog' }
    ]
  },
  table2: {
    code: 'letters',
    import: false,
    export: false,
    importExport: [],
    delAll: false,
    add: false,
    edit: false,
    title: 'Прикрепленные письма',
    headers: [
      { ...features.code, to: '/office-work/letters/{id}/' },
      { ...features.date, to: '/office-work/letters/{id}/' },
      features.letter_direction_id,
      features.letter_type_id,
      features.organization,
      features.fio,
      { name: 'Доставить', type: 'shipping_method' },
      features.content,
      features.applications,
      features.executor_id,
      // {
      //   name: 'Ответ на',
      //   code: 'response_to',
      //   type: 'extractingLink',
      //   extractingValue: 'code',
      //   to: '/office-work/letters/{id}/'
      // },
      features.execution_date,
      features.notes,
      { name: 'Интервал', type: 'interval' },
      { type: 'cog' }]
  },
  form: {
    title: { edit: 'Редактирование письма', add: 'Добавление письма' },
    values: [
      {
        formBlock: '2',
        items: [features.date, features.code]
      },
      features.organization,
      features.fio,
      {
        formBlock: '2',
        items: [features.letter_direction_id, features.letter_type_id]
      },
      features.shipping_method_id,
      features.delivery_email,
      features.delivery_address,
      features.content,
      features.applications,
      {
        formBlock: '2',
        items: [features.executor_id, features.contract_id, features.incoming_letter_date, features.incoming_letter_code, features.response_to_id, features.execution_date]
      },
      features.notes
    ]
  },
  card: {
    title: 'Основная информация',
    values: [
      features.date,
      features.code,
      features.organization,
      features.fio,
      features.letter_direction_id,
      features.letter_type_id,
      features.shipping_method_id,
      features.delivery_email,
      features.delivery_address,
      features.content,
      features.applications,
      features.executor_id,
      features.contract_id,
      features.incoming_letter_date,
      features.incoming_letter_code,
      { name: 'Договор', type: 'extractingLink', code: 'contract', to: '/office-work/contracts/{id}/', extractingValue: 'code' },
      { name: 'Ответ на', type: 'extractingLink', code: 'response_to', to: '/office-work/letters/{id}/', extractingValue: 'code' },
      features.response_to_id,
      features.execution_date,
      features.notes,
      { name: 'Файлы', type: 'files', table: 'letters' }
    ]
  }

}
