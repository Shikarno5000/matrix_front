// получение данных по умолчанию
function getDef(def: { code: string, value: string }[], v: any) {
  for (let i = 0; i < def.length; i++) {
    if (def[i].code === v) {
      if (def[i].value === 'now') { return new Date().toISOString().slice(0, 10) } else { return def[i].value }
    }
  }
  return null
}

export function getFormData<T, K extends keyof T>(obj: T | null, keys: K[], def: { code: string, value: string }[]): Pick<T, K> {
  return obj ? usePick(obj, keys) : keys.reduce((a, v) => ({ ...a, [v]: getDef(def, v) }), {} as Pick<T, K>)
}
