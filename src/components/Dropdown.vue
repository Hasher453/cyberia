<script setup>
defineProps({
  dropdownOpen: Boolean,
})
const emit = defineEmits(['closeDropdown'])

</script>
<template>
  <div class="dropdown">
    <div class="dropdown__header">
      <button
        class="dropdown__close"
        @click="() => emit('closeDropdown')"
        aria-label="Закрыть меню"
      ></button>
    </div>
    <ul class="dropdown__menu">
      <li class="dropdown__menu-item" @click="() => emit('closeDropdown')">
        <router-link to="/agency" class="dropdown__link">Агенство</router-link>
      </li>
      <li class="dropdown__menu-item" @click="() => emit('closeDropdown')">
        <router-link to="/services" class="dropdown__link">Услуги</router-link>
      </li>
      <li class="dropdown__menu-item" @click="() => emit('closeDropdown')">
        <router-link to="/cases" class="dropdown__link">Кейсы</router-link>
      </li>
      <li class="dropdown__menu-item" @click="() => emit('closeDropdown')">
        <router-link to="/blog" class="dropdown__link">Блог</router-link>
      </li>
      <li class="dropdown__menu-item" @click="() => emit('closeDropdown')">
        <router-link to="/contacts" class="dropdown__link">Контакты</router-link>
      </li>
    </ul>
    <ul class="dropdown__contacts">
      <li class="dropdown__contacts-title">Контакты:</li>
      <li class="dropdown__contacts-item">+7 999 123 45 67</li>
      <li class="dropdown__contacts-item">hello@cyberia.studio</li>
      <li class="dropdown__contacts-item">ул. Ярных, д. 35, оф. 10</li>
    </ul>
  </div>
</template>
<style scoped lang="stylus">
.dropdown
  z-index: 3
  position: absolute
  top: 0
  left: 0
  width: 100vw
  padding: 0 2.0625rem 0 1.6875rem
  box-sizing: border-box
  background-color: #20212C

  &__header
    display: flex
    justify-content: flex-end
    margin-top: 2.625rem
    margin-bottom: 0.5rem

  &__close
    background-image: url('/close.svg')
    width: 1.875rem
    height: 1.875rem
    border: none
    background-color: transparent
    cursor: pointer

  &__menu
    margin: 0
    padding: 0 0 1.0625rem
    list-style-type: none
    border-bottom: 0.125rem solid #2B2D3A

  &__menu-item
    margin-bottom: 1.875rem
    font-size: 1.125rem

  &__link
    color: inherit
    text-decoration: none

  &__contacts
    margin: 2.375rem 0 11.3125rem
    padding: 0 0 1.5625rem
    list-style-type: none
    border-bottom: 0.125rem solid #2B2D3A

  &__contacts-title
    font-size: 1.125rem
    color: #9AA8BA
    margin-bottom: 2.625rem

  &__contacts-item
    font-size: 1rem
    color: #9AA8BA
    margin-bottom: 1.1875rem
</style>
