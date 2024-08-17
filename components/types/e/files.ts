declare global {

  type TFileFillable = {
    name: string,
    date: string,
    comment: string,
    url: string,
    size: string
    file?: any
  }
  type TFile = AId & TFileFillable

}
export default global
