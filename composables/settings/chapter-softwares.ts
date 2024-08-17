import { addCode } from '../index'

const features = addCode({
  software_id: { name: 'ПО', type: 'select', items: 'software', required: true },
  col: { name: 'Количество', type: 'number', min: 0 },
  specification_id: { name: 'Спецификация', type: 'select', items: 'specifications' }
})

export const chapterSoftwares = {
  table: {
    code: 'chapter-softwares',
    import: false,
    export: false,
    importExport: features,
    delAll: false,
    add: true,
    edit: true,
    headers: [
      { name: 'Наименование', code: 'software', type: 'extractingValues', extractingValue: 'name' },
      features.col,
      features.specification_id,
      { type: 'cog' }
    ]
  },
  form: {
    title: { edit: 'Редактирование  привязки ПЛК', add: 'Добавление  привязки ПЛК' },
    values: [
      features.software_id,
      {
        formBlock: '2',
        items: [features.col, features.specification_id]
      }
    ]
  }

}
