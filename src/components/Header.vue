<template>
  <div class="header">
    <div class="wrap">
      <div class="header__container d-flex align-items-center">
        <div class="header__logo"></div>
        <div class="header__burger" v-if="isMobile" @click="dropdownOpen = true"></div>

        <div class="header__nav" v-if="!isMobile">
          <div class="header__item">Агенство</div>
          <div class="header__item">Услуги</div>
          <div class="header__item">Кейсы</div>
          <div class="header__item">Блог</div>
          <div class="header__item">Контакты</div>
        </div>
      </div>
    </div>
    <div class="dropdown" v-if="dropdownOpen">
      <div class="dropdown__box">
        <div class="dropdown__close" @click="dropdownOpen = false"></div>
      </div>
      <ul class="dropdown__links">
        <li><a href="#">Агенство</a></li>
        <li><a href="#">Услуги</a></li>
        <li><a href="#">Кейсы</a></li>
        <li><a href="#">Блог</a></li>
        <li><a href="#">Контакты</a></li>
      </ul>
      <ul class="dropdown__contacts">
        <li>Контакты:</li>
        <li>+7 999 123 45 67</li>
        <li>hello@cyberia.studio</li>
        <li>ул.Ярных, д.35, оф.10</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data: () => ({
    isMobile: false,
    dropdownOpen: false,
  }),
  mounted() {
    this.checkScreenSize();
    window.addEventListener("resize", this.checkScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkScreenSize);
  },
  methods: {
    checkScreenSize() {
      console.log(window.innerWidth);
      this.isMobile = window.innerWidth <= 476 * 2;
      /*
      При разработке использую эту запись :
      this.isMobile = window.innerWidth <= 476 * 2;
      Но на телефоне коректно работает эта :
      this.isMobile = window.innerWidth <= 476;
      */
    },
  },
};
</script>

<style scoped lang="stylus">
$mobile = 476px
mqPhone  = "only screen and (max-width: " + $mobile + ")"


.header
 margin-top 64px
 @media mqPhone
    background-color: #20212C;
    margin-top: 0;
    padding: 24px 0 26.4px 0;
 &__container
  display flex
  align-items: center
 &__logo
  background-image: url('../assets/logo.svg')
  width: 131px;
  height: 27.59px;
  cursor pointer
  @media mqPhone
    width: 93px;
    height: 19.58px;
    background-repeat: no-repeat;
    background-size: cover;
    margin-right auto
 &__burger
   background-image: url('../assets/burger.svg')
   width: 24px;
   height: 24px;
   background-repeat: no-repeat;
   background-size: cover;
 &__nav
  display flex
  margin auto
 &__item
  margin-right 60px
  cursor pointer
  font-size 18px

.dropdown
  z-index: 3;
  position: absolute;
  background-color: #20212c;
  top: 0;
  left 0
  width: 100vw;
  padding: 0 33px 0 27px;
  box-sizing: border-box;
  &__box
    margin-top: 42px;
    margin-bottom: 8px;
    display: flex
    justify-content: end
  &__close
    background-image: url('../assets/close.svg');
    width: 30px;
    height: 30px;
  &__links
    margin: 0;
    list-style-type: none;
    padding: 0px 0px 17px 0px;
    border-bottom: 2px solid #2B2D3A;
    font-weight: 400;

  &__links li
    font-size: 18px;
    margin-bottom: 30px;
  &__contacts
    margin: 38px 0 181px 0;
    list-style-type: none;
    padding: 0px 0px 25px 0px;
    border-bottom: 2px solid #2B2D3A;
    font-weight: 400;
  &__contacts li
    font-size: 16px;
    color: #9AA8BA;
    margin-bottom: 19px;
  &__contacts li:nth-child(1)
    font-size: 18px;
    color: #9AA8BA;
    margin-bottom: 42px;
</style>
