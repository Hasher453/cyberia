<script setup>
defineProps({
  description: String,
  imageUrl: String,
  isMobile: Boolean
})
</script>
<template>
  <article
    class="projects__card"
    :style="{ backgroundImage: 'url(' + imageUrl + ')' }"
  >
    <div class="projects__card-icon"></div>
    <div class="projects__card-name">
      <span>{{ description }}</span>
    </div>
    <div class="projects__card-description" v-if="isMobile">
      Онлайн гипермаркет. Для компании были разработаны сайт и мобильное приложение и т.д.
    </div>
  </article>
</template>

<style scoped lang="stylus">
$mobile = 476px
mqPhone = "only screen and (max-width: " + $mobile + ")"

.projects
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
