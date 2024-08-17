<template>
  <MPage
    title="ШУ"
    :breadcrumbs="[{ to: '/questionnaires', title: 'Опросные листы' }]"
  >
    <QuestionnairesSurvey />
  </MPage>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'm-auth'
})
</script>
