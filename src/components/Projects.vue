<template>
  <div class="projects">
    <div class="wrap">
      <div class="projects__title">Кейсы</div>
      <div class="projects__categories d-flex justify-content-sb">
        <button
          class="button-nav"
          v-for="(categorie, i) in categoriesList"
          :key="i"
          @click="handlerCategorie(categorie.id)"
          :ref="`button${categorie.id}`"
        >
          {{ categorie.name }}
        </button>
      </div>
      <div class="projects__container">
        <div
          class="projects__item"
          v-for="(card, i) in projectsList"
          :key="i"
          :style="{ backgroundImage: 'url(' + card.image + ')' }"
        >
          <div class="icon"></div>
          <div class="name">
            <span>{{ card.description }}</span>
          </div>
          <div class="description" v-if="isMobile">
            Онлайн гипермаркет. Для компании были разработаны сайт и мобильное приложение и т.д.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Projects",
  data: () => ({
    activeCategorie: null,
    isMobile: false,
  }),
  computed: {
    ...mapGetters("projects", ["projectsList", "categoriesList"]),
  },
  methods: {
    ...mapActions("projects", [
      "fetchProjects",
      "fetchCategories",
      "serializeProjects",
      "setDefaultProgects",
    ]),
    handlerCategorie(id) {
      const button = this.$refs[`button${id}`][0];
      const arrayButtons = Object.values(this.$refs);
      if (this.activeCategorie === id) {
        this.setDefaultProgects();
        button.classList.toggle("active-btn");
        this.activeCategorie = null;
        return;
      }
      this.activeCategorie = id;
      this.serializeProjects(id);
      arrayButtons.forEach((el) => {
        if (el[0].tagName === "BUTTON") {
          el[0].classList.remove("active-btn");
        }
      });
      button.classList.toggle("active-btn");
    },
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

  mounted() {
    this.fetchProjects();
    this.fetchCategories();
    this.checkScreenSize();
    window.addEventListener("resize", this.checkScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkScreenSize);
  },
};
</script>

<style scoped lang="stylus">
$mobile = 476px
mqPhone  = "only screen and (max-width: " + $mobile + ")"

.projects
  &__title
    font-size: 48px;
    font-weight: 600;
    margin-top: 130px;
    margin-bottom: 65px;
    @media mqPhone
      font-size: 21px;
      margin-top: 29.08px;
      margin-bottom: 47px;
  &__categories
    @media mqPhone
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: 4%;
    & button:nth-child(1)
      @media mqPhone
        font-size: 12px;
        padding: 8.5px 37.85px;
        height: fit-content;
    & button:nth-child(2)
      @media mqPhone
        font-size: 12px;
        padding: 8.5px 45.85px;
        height: fit-content;
    & button:nth-child(3)
      @media mqPhone
        font-size: 12px;
        padding: 8.5px 7.35px;
        height: fit-content
    & button:nth-child(4)
      @media mqPhone
        font-size: 12px;
        padding: 8.5px 27.85px;
        height: fit-content;
  &__container
    display grid
    grid-template-columns: repeat(3, 1fr)
    grid-gap: 40px
    margin-top 52px
    @media mqPhone
      margin-top: 23px;
      grid-gap: 20px;
      grid-template-columns: none
  &__item
    width: 387px
    height 387px
    background-color: #665399
    border-radius: 12px
    position relative
    cursor pointer
    background-repeat: no-repeat;
    background-size: cover;
    @media mqPhone
      width: 269px;
      height: 262px;
      padding 29px
    &::before
      @media mqPhone
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
        z-index: 1;
        border-radius: 12px
    .name
      font-size: 24px;
      font-weight: 600;
      position: absolute;
      background-color: #313341;
      border-radius: 5px;
      top: 23px;
      right: 27px;
      width: 122px;
      height: 122px;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
      @media mqPhone
        font-size: 18px;
        top: 215px;
        left: 29px;
        background-color: unset;
        display: block
      span
        max-width: 79px;
    .icon
      background-image: url('../assets/icon.svg')
      width: 25px;
      height: 25px;
      position: absolute;
      right: 21px;
      z-index: 2;
      top: 16px;
      @media mqPhone
        filter: brightness(0) invert(1);
        top: 192px;
        right: 0;
        left: 29px;
        width: 17px;
        height: 17px;
        background-repeat: no-repeat;
        background-size: cover;
    .description
        position: absolute;
        z-index: 2;
        top: 240px;

.active-btn
  background-color: #2D76F9
</style>
