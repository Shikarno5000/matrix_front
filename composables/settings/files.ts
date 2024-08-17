import { addCode } from '../index'

const features = addCode({
  name: { name: 'Наименование', type: 'string', maxSize: 100 },
  date: { name: 'Дата', type: 'date' },
  comment: { name: 'Комментарий', type: 'string', maxSize: 200 },
  file: { type: 'file', noEdit: true }
})

export const files = {
  table: {
    code: 'files',
    title: 'Файлы',
    import: false,
    export: false,
    importExport: features,
    delAll: false,
    add: true,
    edit: true,
    headers: [
      { ...features.name, type: 'fileName' },
      features.date,
      features.comment,
      { code: 'url', name: 'Тип', type: 'split1' },
      { code: 'size', name: 'Размер', type: 'formatBytes' },
      { code: 'upload', name: 'Скачать', type: 'fileUpload' },
      { type: 'cog' }
    ]
  },
  form: {
    title: { edit: 'Редактирование файла', add: 'Добавление файла' },
    values: [
      {
        formBlock: '21',
        items: [features.name, features.date]
      },
      features.comment,
      features.file
    ]
  }
}
