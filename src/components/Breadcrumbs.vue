<script setup>
import { ref,  onMounted,computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

let path = ref('')

const breadcrumbs = {
  agency: 'Агентство',
  services: 'Услуги',
  cases: 'Кейсы',
  blog: 'Блог',
  contacts: 'Контакты',
}

onMounted(() => {
  path.value = route.fullPath.slice(1)
})

const breadcrumbsCurrent = computed(() => breadcrumbs[path.value] || breadcrumbs.cases)

</script>

<template>
  <nav class="breadcrumbs">
    <div class="breadcrumbs__wrap">
      <div class="breadcrumbs__current">
        Главная / <span class="breadcrumbs__current-page">{{breadcrumbsCurrent}}</span>
      </div>
    </div>
  </nav>
</template>

<style lang="stylus" scoped>
$mobile = 476px
mqPhone = "only screen and (max-width: " + $mobile + ")"

.breadcrumbs
  font-size: 1.125rem // 18px
  margin-top: 4.125rem // 66px
  @media mqPhone
    margin-top: 2.8875rem // 46.20px
    font-size: 0.75rem // 12px

  &__wrap
    max-width: 1240px
    margin: 0 auto
    padding: 0 20px

  &__current
    color: #9AA8BA
    font-size: inherit
    &-page
      color: #616580
</style>
