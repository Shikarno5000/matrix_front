import { addCode } from '../index'

const features = addCode({
  chapter_type_id: { name: 'Тип', type: 'select', static: 'chapter_types', required: true },
  name: { name: 'Наименование', type: 'string', maxSize: 250, required: true }
})

export const chapters = {
  table: {
    code: 'chapters',
    import: false,
    export: false,
    importExport: features,
    delAll: false,
    add: true,
    edit: true
  },
  form: {
    title: { edit: 'Редактирование раздела', add: 'Добавление раздела' },
    values: [{ ...features.chapter_type_id, disabledEdit: true }, features.name]
  }

}
