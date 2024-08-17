<template>
  <ClientOnly>
    <div class="grid gap-2">
      <MSection sec-code="survey-1" title="Вопросы">
        <div class="grid grid-cols-3 gap-3">
          <QuestionnairesItem v-model="ch" name="Нужна силовая секция?" type="yesNo" />
          <QuestionnairesItem v-if="ch['Нужна силовая секция?']" v-model="ch" name="Нужен программируемый логический контроллер?" type="ptkOven" />
          <template v-if="ch['Нужен программируемый логический контроллер?'] && ch['Нужен программируемый логический контроллер?'] !== 'Нет'">
            <QuestionnairesItem v-model="ch" name="Нужно предусмотреть резервное питание?" type="yesNo" />
            <QuestionnairesItem v-model="ch" name="Кол-во типов двигателей" type="number" />

            <div v-if="ch['Кол-во типов двигателей'] && ch['тип двигателя']" class="col-span-3 ml-10">
              <div v-for="li in ch['Кол-во типов двигателей']" :key="li" class="border p-2 grid gap-3">
                <div><b>Тип {{ li }}</b> Ввод данных двигателя:</div>
                <div class="grid grid-cols-4 gap-3">
                  <QuestionnairesItem v-model="ch['тип двигателя'][li-1]" name="Мощность 380В" type="number" />
                  <QuestionnairesItem v-model="ch['тип двигателя'][li-1]" name="Мощность 220В" type="number" />
                  <QuestionnairesItem v-model="ch['тип двигателя'][li-1]" name="Количество двигателей" type="number" />
                  <QuestionnairesItem v-model="ch['тип двигателя'][li-1]" name="Питание от ШУ?" type="yesNo" />
                </div>
                <div v-if="ch['тип двигателя'][li-1]['Питание от ШУ?'] === 'да'" class="grid grid-cols-4 gap-3">
                  <QuestionnairesItem v-model="ch['тип двигателя'][li-1]" name="Способ пуска двигателя" type="type" />
                  <QuestionnairesItem v-model="ch['тип двигателя'][li-1]" name="Есть реле перегрева?" type="rele" />
                  <QuestionnairesItem v-model="ch['тип двигателя'][li-1]" name="Нужен пост местного управления?" type="yesNo" />
                  <template v-if="['УПП','ПЧ','УПП+ПП'].includes(ch['тип двигателя'][li-1]['Способ пуска двигателя'])">
                    <QuestionnairesItem v-model="ch['тип двигателя'][li-1]" name="Подключение по RS/Eth?" type="yesNo" />
                  </template>
                  <template v-if="ch['тип двигателя'][li-1]['Способ пуска двигателя'] === 'ПП'">
                    <QuestionnairesItem v-model="ch['тип двигателя'][li-1]" name="Добавить интегрированное управление?" type="yesNo" />
                  </template>
                </div>
              </div>
            </div>
            <div class="col-span-3 grid grid-cols-4 gap-2">
              <QuestionnairesItem v-model="ch" name="КИП дискретные" type="yesNo" />
              <QuestionnairesItem v-if="ch['КИП дискретные'] ==='да'" v-model="ch['КИПД данные']" name="Датчики давления" type="number" />
              <QuestionnairesItem v-if="ch['КИП дискретные'] ==='да'" v-model="ch['КИПД данные']" name="Датчики расхода" type="number" />
              <QuestionnairesItem v-if="ch['КИП дискретные'] ==='да'" v-model="ch['КИПД данные']" name="Кол-во типов датчиков уровня" type="number" @change="changeColtD()" />
              <div v-if="ch['КИПД данные'] && ch['КИПД данные']['тип датчика уровня']" class="ml-10 col-span-4">
                <div v-for="li in ch['КИПД данные']['Кол-во типов датчиков уровня']" :key="li" class="border p-2 grid gap-3">
                  <div><b>Тип {{ li }}</b> Ввод данных датчика:</div>
                  <div class="grid grid-cols-4 gap-3">
                    <QuestionnairesItem v-model="ch['КИПД данные']['тип датчика уровня'][li-1]" name="Количество датчиков" type="number" />
                    <QuestionnairesItem v-model="ch['КИПД данные']['тип датчика уровня'][li-1]" name="Количество уровней" type="number" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-span-3 grid  grid-cols-4 gap-2">
              <QuestionnairesItem v-model="ch" name="КИП аналоговые" type="yesNo" />
              <QuestionnairesItem v-if="ch['КИП аналоговые'] ==='да'" v-model="ch['КИПA данные']" name="Кол-во датчики давления" type="number" />
              <QuestionnairesItem v-if="ch['КИПA данные'] && ch['КИПA данные']['Кол-во датчики давления']" v-model="ch['КИПA данные']" name="Датчики давления 220 или 24?" type="22024" />
              <QuestionnairesItem v-if="ch['КИП аналоговые'] ==='да'" v-model="ch['КИПA данные']" name="Кол-во датчики расхода" type="number" />
              <QuestionnairesItem v-if="ch['КИПA данные'] && ch['КИПA данные']['Кол-во датчики расхода']" v-model="ch['КИПA данные']" name="Датчики расхода 220 или 24?" type="22024" />
              <QuestionnairesItem v-if="ch['КИП аналоговые'] ==='да'" v-model="ch['КИПA данные']" name="Кол-во датчики уровня" type="number" />
              <QuestionnairesItem v-if="ch['КИПA данные'] && ch['КИПA данные']['Кол-во датчики уровня']" v-model="ch['КИПA данные']" name="Датчики уровня 220 или 24?" type="22024" />
            </div>
            <QuestionnairesItem v-model="ch" name="% резервных сигналов" type="number" />
          </template>
        </div>
      </MSection>
      <QuestionnairesSurveyResult :result="result" />
      <pre>{{ ch }}</pre>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { UZ1, UZ2, km } from '../table'
const ch = ref<any>({})

const result = computed(() => {
  let result: any = {}

  result = addValues(ch.value['Нужна силовая секция?'], 'нет', { 'kv.1f': 1, 'qf1.C6A': 1, sk: 1, el1: 1, 'qf1.C1A': 1, 'hl.e': 1, 'Qequip.1': 10 }, result)
  result = addValues(ch.value['Нужна силовая секция?'], 'да', { 'kv.3f': 1, 'qf3.C6A': 1, 'qs2.16A': 2, sk: 2, el1: 2, 'qf1.C1A': 2, 'hl.w': 1, 'Qequip.3': 10 }, result)
  result = addValues(ch.value['Нужен программируемый логический контроллер?'], 'Нет', { 'релейное управление': 'Да' }, result)
  result = addValues(ch.value['Нужен программируемый логический контроллер?'], 'ПТК ГПП', { 'qf1.D6A': 1, 'G.MW.120': 2, 'G.MW.DR': 1, 'hl.r': 1, 'A1.ПТК': 1 }, result)
  result = addValues(ch.value['Нужен программируемый логический контроллер?'], 'ОВЕН', { 'qf1.D6A': 1, 'G.MW.120': 2, 'G.MW.DR': 1, 'hl.r': 1, 'A1.ОВЕН': 1 }, result)
  result = addValues(ch.value['Нужно предусмотреть резервное питание?'], 'да', { 'G.UPS': 1 }, result)

  if (ch.value['Кол-во типов двигателей'] && ch.value['Кол-во типов двигателей'] > 0) {
    for (let i = 0; i < ch.value['Кол-во типов двигателей']; i++) {
      const item = ch.value['тип двигателя'][i]
      if (item) {
        const n = item['Количество двигателей']
        const N3F = item['Мощность 380В']
        // const N1F = item['Мощность 220В']
        if (item['Питание от ШУ?'] === 'да') {
          result = addN(item['Есть реле перегрева?'], 'да', n, { k2: 1, di: 1 }, result)
          result = addN(item['Есть реле перегрева?'], 'добавить', n, { KT: 1, 'qf1.C1A': 1 }, result)
          result = addN(item['Нужен пост местного управления?'], 'да', n, { x: 1, 's.start': 1, 's.stop': 1, sa: 1, k2: 3, di: 3, LCP: 1 }, result)
          if (['УПП', 'ПЧ', 'УПП+ПП'].includes(item['Способ пуска двигателя'])) {
            result = addN(item['Подключение по RS/Eth?'], 'да', n, { 'cable.tp': 2, rj45: 2 }, result)
          }
          result = addN(item['Способ пуска двигателя'], 'УПП', N3F, { 'N.3f': 1 }, result)
          result = addN(item['Способ пуска двигателя'], 'УПП', n, { 'hl.r': 1, 'hl.gr': 1, k2: 5, di: 3, do: 2 }, result)
          result = addN(item['Способ пуска двигателя'], 'ПЧ', N3F, { 'N.3f': 1 }, result)
          result = addN(item['Способ пуска двигателя'], 'ПЧ', n, { 'hl.r': 1, 'hl.gr': 1, k2: 4, di: 2, do: 2, ao: 1, MGR: 1, x: 2 }, result)
          result = addN(item['Способ пуска двигателя'], 'ПП', N3F, { 'N.3f': 1 }, result)
          if (item['Способ пуска двигателя'] === 'ПП') {
            // TODO: тут km3
            result = addN(item['Добавить интегрированное управление?'], 'да', n, { 'hl.r': 1, k2: 4, di: 2, do: 2 }, result)
            if (item['Добавить интегрированное управление?'] === 'да') {
              const pp = getB(km, N3F)
              if (pp) {
                result['km3.' + pp.val.km3] = (result['xt.' + pp.val.km3] || 0) + n
              }
            }
          }
          result = addN(item['Способ пуска двигателя'], 'УПП+ПЧ', N3F, { 'N.3f': 1 }, result)
          result = addN(item['Способ пуска двигателя'], 'УПП+ПЧ', n, { 'hl.r': 1, 'hl.gr': 1, k2: 5, di: 3, do: 2 }, result)
          result = addFromTable(item['Способ пуска двигателя'], n, N3F, result)
        }
        result = addN(item['Питание от ШУ?'], 'нет', n, { k2: 3, di: 2, do: 1 }, result)
      }
    }
  }
  if (ch.value['КИП дискретные'] === 'да') {
    result = addKIPD(ch.value['КИПД данные']['Датчики давления'], { di: 1, k2: 1 }, result)
    result = addKIPD(ch.value['КИПД данные']['Датчики расхода'], { di: 1, k2: 1 }, result)
    if (ch.value['КИПД данные'] && ch.value['КИПД данные']['тип датчика уровня'] && ch.value['КИПД данные']['тип датчика уровня'].length) {
      for (let i = 0; i < ch.value['КИПД данные']['тип датчика уровня'].length; i++) {
        const item = ch.value['КИПД данные']['тип датчика уровня'][i]
        if (item) {
          result = addKIPD(item['Количество датчиков'], { di: item['Количество уровней'], k2: item['Количество уровней'] }, result)
        }
      }
    }
  }
  if (ch.value['КИП аналоговые'] === 'да' && ch.value['КИПA данные']) {
    const d = ch.value['КИПA данные']
    if (d['Кол-во датчики давления']) {
      result = addN(d['Датчики давления 220 или 24?'], '220', d['Кол-во датчики давления'], { 'qf1.C1A': 1, ai: 1, MGR: 1, x: 2 }, result)
      result = addN(d['Датчики давления 220 или 24?'], '24', d['Кол-во датчики давления'], { ai: 1, MGR: 1, x: 3 }, result)
    }
    if (d['Кол-во датчики расхода']) {
      result = addN(d['Датчики расхода 220 или 24?'], '220', d['Кол-во датчики расхода'], { 'qf1.C1A': 1, ai: 1, MGR: 1, x: 2 }, result)
      result = addN(d['Датчики расхода 220 или 24?'], '24', d['Кол-во датчики расхода'], { ai: 1, MGR: 1, x: 3 }, result)
    }
    if (d['Кол-во датчики уровня']) {
      result = addN(d['Датчики уровня 220 или 24?'], '220', d['Кол-во датчики уровня'], { 'qf1.C1A': 1, ai: 1, MGR: 1, x: 2 }, result)
      result = addN(d['Датчики уровня 220 или 24?'], '24', d['Кол-во датчики уровня'], { ai: 1, MGR: 1, x: 3 }, result)
    }
  }
  if (ch.value['% резервных сигналов']) {
    result.DI = Math.round((result.di ? result.di : 0) * (1 + Number(ch.value['% резервных сигналов'] / 100)))
    result.DO = Math.round((result.do ? result.do : 0) * (1 + Number(ch.value['% резервных сигналов'] / 100)))
    result.AI = Math.round((result.ai ? result.ai : 0) * (1 + Number(ch.value['% резервных сигналов'] / 100)))
    result.AO = Math.round((result.ao ? result.ao : 0) * (1 + Number(ch.value['% резервных сигналов'] / 100)))
  }
  //
  if (ch.value['Нужен программируемый логический контроллер?'] === 'ПТК ГПП') {
    if (result.DI > 16) {
      result['n.DI.ПТК'] = Math.ceil((result.DI - 16) / 16)
    } else if (result.DO > 8) {
      result['n.DO.ПТК'] = Math.ceil((result.DO - 8) / 16)
    }
    if (result.AI > 0) {
      result['n.AI.ПТК'] = Math.ceil(result.AI / 16)
    }
  }
  if (ch.value['Нужен программируемый логический контроллер?'] === 'ОВЕН') {
    if (result.DI > 24) {
      result['n.DI.ОВЕН'] = Math.ceil((result.DI - 24) / 20)
    } else if (result.DO > 12) {
      result['n.DO.ОВЕН'] = Math.ceil((result.DO - 12) / 24)
    }
    if (result.AI > 0) {
      result['n.AI.ОВЕН'] = Math.ceil(result.AI / 8)
    }
    if (result.AO > 0) {
      result['n.AO.ОВЕН'] = Math.ceil(result.AO / 8)
    }
  }

  return result
})

// дополнение значений
function addValues(per: string, val: string, data: any, result: any) {
  if (per && per === val) {
    for (const key in data) {
      if (!result[key]) {
        result[key] = 0
      }
      if (typeof data[key] === 'number') {
        result[key] += data[key]
      } else {
        result[key] = data[key]
      }
    }
  }
  return result
}

function getB(array: any, val: any) {
  for (let i = 0; i < array.length; i++) {
    if (array[i + 1]) {
      const one = Math.round(Number(array[i]['N.3f']) * 1000)
      const two = Math.round(Number(array[i + 1]['N.3f']) * 1000)
      const nVal = Math.round(Number(val) * 1000)
      if (one > nVal) { return { val: array[0], index: 1 } }
      if (one < nVal && two >= nVal) {
        return { val: array[i + 1], index: i + 2 }
      }
    } else {
      return { val: array[array.length - 1], index: array.length }
    }
  }
}

function addFromTable(per: any, n: number, N3F: number, result: any) {
  if (per && N3F && n) {
    if (per === 'УПП') {
      const upp = getB(UZ1, N3F)
      if (upp) {
        result['Qequip.3'] = (result['Qequip.3'] || 0) + upp.val['Qequip.3']
        result['qf3.ВА'] = (result['qf3.ВА'] || 0) + upp.val['qf3.ВА']
        result['xt.' + upp.val.xt] = (result['xt.' + upp.val.xt] || 0) + 3 * n
        result['UZ1.' + upp.index] = (result['UZ1.' + upp.index] || 0) + 1
      }
    }
    if (per === 'ПЧ') {
      const pc = getB(UZ2, N3F)
      if (pc) {
        result['Qequip.3'] = (result['Qequip.3'] || 0) + pc.val['Qequip.3']
        result['qf3.AV-6'] = (result['qf3.AV-6'] || 0) + pc.val['qf3.AV-6']
        result['xt.' + pc.val.xt] = (result['xt.' + pc.val.xt] || 0) + 3 * n
        result['UZ2.' + pc.index] = (result['UZ1.' + pc.index] || 0) + 1
      }
    }
    if (per === 'ПП') {
      const pp = getB(km, N3F)
      if (pp) {
        result['xt.' + pp.val.xt] = (result['xt.' + pp.val.xt] || 0) + 3 * n
      // result['Qequip.3'] = (result['Qequip.3'] ? result['Qequip.3'] : 0) + val['Qequip.3']
      // result['qf3.AV-6'] = (result['qf3.AV-6'] ? result['qf3.AV-6'] : 0) + val['qf3.AV-6']
      }
    }
    if (per === 'УПП+ПП') {
      const upp = getB(UZ1, N3F)
      if (upp) {
        result['Qequip.3'] = (result['Qequip.3'] || 0) + upp.val['Qequip.3']
        result['qf3.ВА'] = (result['qf3.ВА'] || 0) + upp.val['qf3.ВА']
        result['xt.' + upp.val.xt] = (result['xt.' + upp.val.xt] || 0) + 3 * n
        result['UZ1.' + upp.index] = (result['UZ1.' + upp.index] || 0) + 3 * n
      }
      const pp = getB(km, N3F)
      if (pp) {
        result['xt.' + pp.val.xt] = (result['xt.' + pp.val.xt] || 0) + 3 * n
        // TODO: тут км3
        result['km3.' + pp.val.km3] = (result['xt.' + pp.val.km3] || 0) + n
      }
    }
  }
  return result
}
function addN(per: number, val: number | string, n: number, data: any, result: any) {
  if (per && per === val && n) {
    for (const key in data) {
      if (!result[key]) {
        result[key] = 0
      }
      result[key] += data[key] * n
    }
  }
  return result
}
function addKIPD(per: number, data: any, result: any) {
  if (per && per > 0) {
    for (const key in data) {
      if (!result[key]) {
        result[key] = 0
      }
      result[key] += data[key] * per
    }
  }
  return result
}

watch(
  () => ch.value['Кол-во типов двигателей'],
  () => {
    ch.value['тип двигателя'] = []
    for (let i = 0; i < ch.value['Кол-во типов двигателей']; i++) {
      ch.value['тип двигателя'][i] = {}
    }
  }
)
watch(
  () => ch.value['КИП дискретные'],
  () => {
    ch.value['КИПД данные'] = {
      'Кол-во типов датчиков уровня': null
    }
  }
)
watch(
  () => ch.value['КИП аналоговые'],
  () => {
    ch.value['КИПA данные'] = {}
  }
)
function changeColtD() {
  const res = []
  for (let i = 0; i < ch.value['КИПД данные']['Кол-во типов датчиков уровня']; i++) {
    res[i] = {}
  }
  ch.value['КИПД данные']['тип датчика уровня'] = res
}
</script>
