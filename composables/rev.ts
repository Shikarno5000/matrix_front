// получение полного названия видов работ
function getVid(project: TProject) {
  let result = staticDataGetNameById('project_types', project.project_type_id, 'name_short')
  if (project.directions.length) {
    const temp: string[] = []
    project.directions.forEach((i) => {
      if (i.name_short) {
        temp.push(i.name_short)
      }
    })
    if (temp.length) {
      result = `${result}, ` + temp.join('+')
    }
  }
  return result
}
// получение строки url из шаблона
export function getTo(item: any, to: string) {
  const replace = (string: string, object: any) => string.replaceAll(/\{([^}]+)\}/gi, (_, a) => a.split('.').reduce((b: any, c: any) => b?.[c], object))
  return replace(to, item)
}
// переработка данных для вывода
function getValue(val: any, item: any, to: TTo) {
  const tempVal = item[val.code]
  const type = val.type
  if (type === 'string' || type === 'number' || type === 'range') {
    if (val.to) {
      return { value: tempVal, type: 'link', to: getTo(item, val.to) }
    } else {
      return { value: tempVal, type: 'text' }
    }
  } else if (type === 'select') {
    if (val.static) {
      return { value: tempVal ? staticDataGetNameById(val.static, tempVal, 'name_short') : null, type: 'text' }
    } else if (val.items === 'counterAgents') {
      return { value: val.multiple ? item.counter_agents : item.counter_agent, type: val.multiple ? 'counterAgents' : 'counterAgent' }
    } else if (val.items === 'counterAgentWorkers') {
      return { value: val.multiple ? item.counter_agent_workers : item.counter_agent_worker, type: val.multiple ? 'counterAgentWorkers' : 'counterAgentWorker' }
    } else if (val.items === 'contracts') {
      return { value: val.multiple ? item.contracts : item.contract, type: val.multiple ? 'contracts' : 'contract' }
    } else if (val.items === 'users') {
      return { value: item[val.withCode], type: val.multiple ? 'users' : 'user' }
    } else if (val.items === 'specifications') {
      return { value: item.specification ? item.specification.article : null, type: 'link', to: getTo(item.specification, '/office-work/contracts/{contract_id}/{id}/') }
    } else {
      return { value: null, type: 'text' }
    }
  } else if (type === 'extractingValues') {
    let temp = null
    if (val.extractingValue) {
      if (typeof val.extractingValue === 'object' && val.extractingValue.length === 2) {
        if (tempVal[val.extractingValue[0]] && tempVal[val.extractingValue[0]][val.extractingValue[1]]) {
          if (val.extractingType && val.extractingType === 'date') {
            temp = formatTime(tempVal[val.extractingValue[0]][val.extractingValue[1]])
          } else {
            temp = val.static ? staticDataGetNameById(val.static, tempVal[val.extractingValue[0]][val.extractingValue[1]], 'name_short') : tempVal[val.extractingValue[0]][val.extractingValue[1]]
          }
        }
      } else if (typeof val.extractingValue === 'string') {
        if (tempVal && tempVal[val.extractingValue]) {
          temp = val.static ? staticDataGetNameById(val.static, tempVal[val.extractingValue], 'name_short') : tempVal[val.extractingValue]
        }
      }
    }
    return { value: temp, type: 'text' }
  } else if (type === 'date') {
    if (val.to) {
      return { value: formatTime(tempVal), type: 'link', to: getTo(item, val.to) }
    } else {
      return { value: formatTime(tempVal), type: 'text' }
    }
    // return { value: formatTime(tempVal), type: 'text' }
  } else if (type === 'extractingLink') {
    return { value: val.code ? (tempVal && tempVal[val.extractingValue] ? tempVal[val.extractingValue] : null) : 'перейти', type: 'link', to: getTo(val.code ? tempVal : item, val.to) }
  } else if (type === 'interval') {
    return { value: item.incoming_letter_date ? dayDiff(item.date, item.incoming_letter_date) : null, type: 'text' }
  } else if (type === 'projects') {
    return { value: item.chapter.subgroup.direction.project.name_short, type: 'link', to: `/projects/${item.chapter.subgroup.direction.project.id}/` }
  } else if (type === 'shipping_method') {
    if (item.shipping_method_id === 2) { return { value: item.delivery_email, type: 'text' } } else if (item.shipping_method_id === 1) { return { value: item.delivery_address, type: 'text' } } else { return { value: null, type: 'text' } }
  } else if (type === 'textarea') {
    return { value: tempVal, type: 'textarea' }
  } else if (type === 'project_type') {
    return { value: getVid(item), type: 'text' }
  } else if (type === 'formatBytes') {
    return { value: formatBytes(tempVal), type: 'text' }
  } else if (type === 'split1') {
    return { value: tempVal.split('.')[1], type: 'text' }
  } else if (type === 'fileName') {
    return { value: tempVal, type: 'link', to: `${useAuth().baseStorageURL}/storage/${item.url}`, target: '_blank' }
  } else if (type === 'fileUpload') {
    return { value: 'скачать', type: 'link', to: `${useAuth().baseStorageURL}/storage/${item.url}`, download: true, target: '_blank' }
  } else if (type === 'total_entrance') {
    return { value: priceSet(useSumBy(item.total_entrance_and_expenditure, 'entrance')), type: 'text' }
  } else if (type === 'total_expenditure') {
    return { value: priceSet(useSumBy(item.total_entrance_and_expenditure, 'expenditure')), type: 'text' }
  } else if (type === 'dateOfChange') {
    return { value: formatTime(item.create_update.u?.at ? item.create_update.u.at : item.create_update.c.at, 'YYYY-mm-dd'), type: 'text' }
  } else if (type === 'email') {
    return { value: tempVal, type: 'email' }
  } else if (type === 'checkbox') {
    return { value: tempVal ? 'да' : 'нет', type: 'text' }
  } else if (type === 'phone') {
    return { value: tempVal, type: 'phone' }
  } else if (type === 'price') {
    return { value: priceSet(tempVal), type: 'text' }
  } else if (type === 'link') {
    return { value: tempVal, type: 'link', to: tempVal, target: '_blank' }
  } else if (type === 'lastStatusChange') {
    return { value: item.last_status_change ? lastStatusChange(item.last_status_change) : null, type: 'text' }
  } else if (type === 'suffix') {
    return { value: item.chapter?.subgroup?.direction?.project?.cipher_prefix && item.chapter?.subgroup?.suffix && item.suffix ? [item.chapter.subgroup.direction.project.cipher_prefix, item.chapter.subgroup.suffix, item.suffix].join('-') : null, type: 'link', to: `/projects/${item.chapter.subgroup.direction.project.id}/doc-${item.id}` }
  } else if (type === 'linkToId') {
    return { value: tempVal, type: 'link', to: getTo(item, `${getTo(to, val.to)}{id}/`) }
  } else if (type === 'toIf') {
    if (val.ifNot) {
      if (!item[val.ifNot]) {
        return { value: val.extractingValue ? tempVal[val.extractingValue] : tempVal, type: 'link', to: getTo(item, val.to) }
      } else {
        return { value: tempVal, type: 'text' }
      }
    } else {
      return { value: null, type: 'text' }
    }
  } else if (type === 'files') {
    return {
      value: {
        to,
        files: item.files
      },
      type: 'files'
    }
  } else if (type === 'cog') {
    return { value: useOmit(item, ['files']), type: 'cog' }
  } else {
    return { value: null, type: 'text' }
  }
}

// раскрытие данных в таблице
export function revTable(data: any, settings: any) {
  return useCloneDeep(data).map((item: any) => {
    const headers = settings.headers
    const result: any = {}
    for (const key of Object.keys(headers)) {
      result[key] = getValue(headers[key], item, { table: settings.code, id: item.id })
    }
    return result
  })
}

// Раскрытие данных
export function revCard(data: any, card: any, to: TTo = undefined) {
  const result = []
  for (const key of Object.keys(card)) {
    result.push({ name: card[key].name, data: getValue(card[key], data, to) })
  }
  return result
}
