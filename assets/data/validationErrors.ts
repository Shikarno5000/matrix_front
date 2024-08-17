export const validationError = (value: any) => {
  let error: string | false = false
  if (!value.$dirty) { return error }
  const checks = [
    {
      condition: value.minLength && !value.minLength.$response,
      message: 'Должно быть более ' + value.minLength?.$params.min + ' символов'
    },
    {
      condition: value.maxLength && !value.maxLength.$response,
      message: 'Должно быть менее ' + value.maxLength?.$params?.max + ' символов'
    },
    {
      condition: value.numeric && !value.numeric.$response,
      message: 'Допускаются только числа'
    },
    {
      condition: value.required && !value.required.$response,
      message: 'Обязательное поле'
    },
    {
      condition: value.maxValue && !value.maxValue.$response,
      message: 'Должно быть менее ' + value.maxValue?.$params.max
    },
    {
      condition: value.minValue && !value.minValue.$response,
      message: 'Должно быть более ' + value.minValue?.$params.min
    },
    {
      condition: value.email && !value.email.$response,
      message: 'Должно быть email'
    },
    {
      condition: value.url && !value.url.$response,
      message: 'Должно быть Url'
    }
  ]

  checks.forEach((check) => {
    if (check.condition) {
      error = check.message
    }
  })

  return error
}
