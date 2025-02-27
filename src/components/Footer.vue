<template>
  <footer  class="footer">
    <div class="wrap">
      <div class="footer__container d-flex">
        <div class="footer__company">
          <div class="footer__logo"></div>
          <span class="footer__description">Веб-разработка и усиление IT-команд</span>
        </div>
        <address  class="footer__address">
          <span class="footer__item">+7 999 123 45 67</span>
          <span href="#" class="footer__item">hello@cyberia.studio</span>
          <span href="#" class="footer__item">ул.Ярных, д.35, оф.10</span>
          <router-link to="/agency" class="footer__item">Агенство</router-link>
          <router-link to="/services" class="footer__item">Услуги</router-link>
          <router-link to="/cases" class="footer__item">Кейсы</router-link>
          <router-link to="/blog" class="footer__item">Блог</router-link>
          <router-link to="/contacts" class="footer__item">Контакты</router-link>
        </address >
      </div>
    </div>
  </footer >
</template>

<style lang="stylus" scoped>
$mobile = 476px
mqPhone  = "only screen and (max-width: " + $mobile + ")"

.footer
  background-color: #313341
  padding 131px 0 151px 0
  @media mqPhone
    padding: 32.94px 0 48px 0;
  &__container
    @media mqPhone
      display: block;
  &__company
    margin-right: 157px;
    @media mqPhone
      margin: auto;
      width: fit-content;
  &__logo
    background-image: url('./logo.svg')
    width: 196px;
    height: 41.28px;
    background-repeat: no-repeat;
    background-size: contain;
    margin-bottom: 28px;
    @media mqPhone
      width: 102px;
      height: 21.48px;
      margin: 0 auto 11.25px auto;
  &__description
    display: block;
    max-width: 188px;
    @media mqPhone
      font-size: 13px;
      text-align: center;
      margin-bottom: 38px;
  &__address
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 56px;
    grid-row-gap: 25px;
    grid-auto-flow: column;
    grid-template-rows: repeat(3, 1fr);
    @media mqPhone
      font-size: 13px;
      grid-column-gap: 49px;
      grid-row-gap: 23px;
</style>

