<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Dropdown from './Dropdown.vue'

const isMobile = ref(false)
const dropdownOpen = ref(false)

// Функция для проверки размера экрана
const checkScreenSize = () => {
  // Для разработки
  isMobile.value = window.innerWidth <= 476 * 2
  // Для продакшена (телефоны)
  // isMobile.value = window.innerWidth <= 476;
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>

<template>
  <header class="header">
    <div class="header__wrap">
      <div class="header__container">
        <router-link to="/" class="header__logo"></router-link>
        <button
          class="header__burger"
          v-if="isMobile"
          @click="dropdownOpen = true"
          aria-label="Открыть меню"
        ></button>

        <nav class="header__nav" v-if="!isMobile">
          <router-link to="/agency" class="header__nav-item">Агенство</router-link>
          <router-link to="/services" class="header__nav-item">Услуги</router-link>
          <router-link to="/cases" class="header__nav-item">Кейсы</router-link>
          <router-link to="/blog" class="header__nav-item">Блог</router-link>
          <router-link to="/contacts" class="header__nav-item">Контакты</router-link>
        </nav>
      </div>
    </div>
    <transition name="fade">
      <Dropdown
        v-if="dropdownOpen"
        :dropdownOpen="dropdownOpen"
        @close-dropdown="dropdownOpen = false"
      />
    </transition>
  </header>
</template>

<style scoped lang="stylus">
$mobile = 476px
mqPhone = "only screen and (max-width: " + $mobile + ")"

.fade-enter-active, .fade-leave-active
  transition: opacity 0.2s;

.fade-enter, .fade-leave-to
  opacity: 0;


.header
  margin-top: 4rem
  @media mqPhone
    background-color: #20212C
    margin-top: 0
    padding: 1.5rem 0 1.65rem

  &__wrap
    max-width: 1240px
    margin: 0 auto
    padding: 0 1.25rem

  &__container
    display: flex
    align-items: center

  &__logo
    background-image: url('/logo.svg')
    width: 8.1875rem
    height: 1.7244rem
    cursor: pointer
    @media mqPhone
      width: 5.8125rem
      height: 1.2238rem
      background-repeat: no-repeat
      background-size: cover
      margin-right: auto

  &__burger
    background-image: url('/burger.svg')
    width: 1.5rem
    height: 1.5rem
    background-repeat: no-repeat
    background-size: cover
    border: none
    background-color: transparent
    cursor: pointer

  &__nav
    display: flex
    margin-left: 11.9rem
    gap: 3.75rem

  &__nav-item
    font-size: 1.125rem
    color: inherit
    text-decoration: none
    cursor: pointer
</style>
