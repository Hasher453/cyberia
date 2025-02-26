<script setup>
import Card from './Card.vue'
import { useProjectsStore } from '../stores/projectsStore'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const projectsStore = useProjectsStore()

const isMobile = ref(false)
const activeCategorie = ref(null)
const buttonRefs = ref({})

const checkScreenSize = () => {
  // Для разработки
  isMobile.value = window.innerWidth <= 476 * 2
  // Для продакшена (телефоны)
  // isMobile.value = window.innerWidth <= 476;
}

const handlerCategorie = (id) => {
  const button = buttonRefs.value[`button${id}`]
  const arrayButtons = Object.values(buttonRefs.value)

  if (activeCategorie.value === id) {
    projectsStore.setDefaultProgects()
    button.classList.toggle('active-btn')
    activeCategorie.value = null
    return
  }
  activeCategorie.value = id
  projectsStore.serializeProjects(id)
  arrayButtons.forEach((el) => {
    el.classList.remove('active-btn')
  })
  button.classList.toggle('active-btn')
}

// Функция для установки ref
const setButtonRef = (id) => (el) => {
  if (el) {
    buttonRefs.value[`button${id}`] = el
  }
}

onMounted(() => {
  projectsStore.fetchProjects()
  projectsStore.fetchCategories()
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>

<template>
  <section class="projects">
    <div class="projects__wrap">
      <h1 class="projects__title">Кейсы</h1>
      <div class="projects__categories">
        <button
          class="projects__categories-button"
          v-for="(category, i) in projectsStore.categories"
          :key="i"
          @click="handlerCategorie(category.id)"
          :ref="setButtonRef(category.id)"
          :class="{ 'projects__categories-button--active': activeCategorie === category.id }"
        >
          {{ category.name }}
        </button>
      </div>
      <div class="projects__grid">
        <Card
          v-for="(card, i) in projectsStore.projectsList"
          :key="i"
          :description="card.description"
          :imageUrl="card.image"
          :isMobile="isMobile"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="stylus">
$mobile = 476px
mqPhone = "only screen and (max-width: " + $mobile + ")"

.projects
  &__wrap
    max-width: 1240px
    margin: 0 auto
    padding: 0 1.25rem

  &__title
    font-size: 3rem
    font-weight: 600
    margin-top: 8.125rem
    margin-bottom: 4.0625rem
    @media mqPhone
      font-size: 1.3125rem
      margin-top: 1.8175rem
      margin-bottom: 2.9375rem

  &__categories
    display: flex
    justify-content: space-between
    @media mqPhone
      display: grid
      grid-template-columns: repeat(2, 1fr)
      grid-column-gap: 4%
    &-button
      font-size: 1.5rem // 24px
      background-color: #313341
      border-radius: 0.4375rem // 7px
      padding: 0.625rem 1.8125rem // 10px 29px
      cursor: pointer
      @media mqPhone
        font-size: 0.75rem;
        padding: 0.53125rem 0.365625rem;
        height: fit-content;
        margin-bottom: 1.0625rem;
      &--active
        background-color: #2D76F9

  &__grid
    display: grid
    grid-template-columns: repeat(3, 1fr)
    grid-gap: 2.5rem
    margin-top: 3.25rem
    @media mqPhone
      margin-top: 1.4375rem
      grid-gap: 1.25rem
      grid-template-columns: 1fr
      justify-items: center;
  &__card
    width: 24.1875rem
    height: 24.1875rem
    background-color: #665399
    border-radius: 0.75rem
    position: relative
    cursor: pointer
    background-repeat: no-repeat
    background-size: cover
    @media mqPhone
      width: 16.8125rem
      height: 16.375rem
      padding: 1.8125rem

    &::before
      @media mqPhone
        content: ''
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0
        background: linear-gradient(to top, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))
        z-index: 1
        border-radius: 0.75rem

    &-icon
      background-image: url('/icon.svg')
      width: 1.5625rem
      height: 1.5625rem
      position: absolute
      right: 1.3125rem
      z-index: 2
      top: 1rem
      @media mqPhone
        filter: brightness(0) invert(1)
        top: 12rem
        right: 0
        left: 1.8125rem
        width: 1.0625rem
        height: 1.0625rem
        background-repeat: no-repeat
        background-size: cover

    &-name
      font-size: 1.5rem
      font-weight: 600
      position: absolute
      background-color: #313341
      border-radius: 0.3125rem
      top: 1.4375rem
      right: 1.6875rem
      width: 7.625rem
      height: 7.625rem
      display: flex
      justify-content: center
      align-items: center
      z-index: 1
      @media mqPhone
        font-size: 1.125rem
        top: 13.4375rem
        left: 1.8125rem
        background-color: unset
        display: block

      span
        max-width: 4.9375rem

    &-description
      position: absolute
      z-index: 2
      top: 15rem
</style>
