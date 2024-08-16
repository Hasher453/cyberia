<template>
  <div class="footer">
    <div class="wrap">
      <div class="footer__container d-flex">
        <div class="footer__company ">
          <div class="footer__logo"></div>
          <span class="footer__description">Веб-разработка и усиление IT-команд</span>
        </div>
        <div class="footer__info">
          <a href="#" class="footer__item">+7 999 123 45 67</a>
          <a href="#" class="footer__item">hello@cyberia.studio</a>
          <a href="#" class="footer__item">ул.Ярных, д.35, оф.10</a>
          <a href="#" class="footer__item">Агентство</a>
          <a href="#" class="footer__item">Услуги</a>
          <a href="#" class="footer__item">Кейсы</a>
          <a href="#" class="footer__item">Блог</a>
          <a href="#" class="footer__item">Контакты</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

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
    background-image: url('../assets/logo.svg')
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
  &__info
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
