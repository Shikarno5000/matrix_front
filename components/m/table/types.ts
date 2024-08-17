declare global {

  type TSort = {
    index: number;
    ascDesc: 'asc' | 'desc'
  }
  type TTableHeader = {
    name?: string,
    tableSize?: string,
    code?: string,
    type?: string,
    slot?: string,
    class?: string,
    to?: string,
  }
}
export default global
