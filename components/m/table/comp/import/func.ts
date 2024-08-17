import * as XLSX from 'xlsx'
export const fileData = ref()
export const fileArray = ref({ ready: false, errors: [] as string[], success: [] as any[] })

// загрузка файла
export function addFile (event: any) {
  const file = event.target.files[0]
  const fileReader = new FileReader()
  fileReader.readAsArrayBuffer(file)
  fileReader.onload = () => {
    const arrayBuffer = fileReader.result
    // @ts-ignore
    const data = new Uint8Array(arrayBuffer)
    const arr = []
    for (let i = 0; i !== data.length; ++i) { arr[i] = String.fromCharCode(data[i]) }
    const bstr = arr.join('')
    const workbook = XLSX.read(bstr, { type: 'binary' })
    workbook.SheetNames.forEach(function (sheetName) {
      // @ts-ignore
      fileData.value = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName])
      // console.log(xlRowObject)
      // result.value = clearResult(xlRowObject)
      // fileArray.value = await checkData(xlRowObject)
    })
  }
}
