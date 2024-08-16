<template>
  <div class="sending">
    <div class="wrap">
      <div class="box">
        <div class="form__img" v-if="isMobile"></div>
        <h2 class="form__title">Расскажите <br />о вашем проекте:<br /></h2>
      </div>
      <form action="" class="form" @submit.prevent="submitForm" ref="form">
        <div class="form__container-inputs d-flex justify-content-sb">
          <div class="form__item">
            <label for="name" class="form__item-name" v-if="!isMobile">Ваше имя:</label>
            <input
              type="text"
              v-model="formData.name"
              id="name"
              required
              class="form__item-input"
              :placeholder="placeholderName"
            />
          </div>
          <div class="form__item">
            <label for="email" class="form__item-name" v-if="!isMobile">Email*</label>
            <input
              type="email"
              class="form__item-input"
              v-model="formData.email"
              id="email"
              required
              :placeholder="placeholderMail"
            />
          </div>
          <div class="form__item">
            <label for="phone" class="form__item-name" v-if="!isMobile">Телефон*</label>
            <input
              type="tel"
              pattern="^\d{10,15}$"
              v-model="formData.phone"
              id="phone"
              required
              class="form__item-input"
              :placeholder="placeholderPhone"
            />
          </div>
        </div>
        <div class="form__container-textarea">
          <label for="message" class="form__item-name" v-if="!isMobile">Сообщение*</label>
          <textarea
            type="text"
            v-model="formData.message"
            id="message"
            class="form__textarea"
            required
            :placeholder="placeholderMsg"
          ></textarea>
        </div>
        <div v-if="!isMobile" class="form__container-checkbox d-flex align-items-center">
          <input
            class="form__checkbox"
            type="checkbox"
            v-model="formData.agreement"
            id="agreement"
            required
          />
          <label for="agreement">Согласие на обработку персональных данных</label>
        </div>
        <button type="submit " class="form__submit">{{ textBtn }}</button>
        <div class="form__warning" v-if="isMobile">
          Нажимая “Отправить”, Вы даете согласие на обработку персональных данных
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  name: "Form",
  data: () => ({
    formData: {
      name: "",
      email: "",
      phone: "",
      message: "",
      agreement: false,
    },
    isMobile: false,
  }),
  methods: {
    async submitForm() {
      const isValid = this.$refs.form.checkValidity();
      if (isValid) {
        const { name, email, phone, message } = this.formData;
        try {
          await axios
            .post("/feedbacks", {
              name,
              email,
              phone,
              message,
            })
            .then((response) => {
              console.log(response);
            });
        } catch (error) {
          console.log(error);
        }

        this.resetForm();
      }
    },
    resetForm() {
      this.formData.name = "";
      this.formData.email = "";
      this.formData.phone = "";
      this.formData.message = "";
      this.formData.agreement = false;
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
  computed: {
    textBtn() {
      let text = "";
      this.isMobile === false ? (text = "Обсудить проект") : (text = "Отправить");
      return text;
    },
    placeholderName() {
      let text = "";
      this.isMobile === false ? (text = "") : (text = "Ваше имя*");
      return text;
    },
    placeholderPhone() {
      let text = "";
      this.isMobile === false ? (text = "") : (text = "Телефон*");
      return text;
    },
    placeholderMail() {
      let text = "";
      this.isMobile === false ? (text = "") : (text = "Email*");
      return text;
    },
    placeholderMsg() {
      let text = "";
      this.isMobile === false ? (text = "") : (text = "Сообщение*");
      return text;
    },
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener("resize", this.checkScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkScreenSize);
  },
};
</script>

<style lang="stylus" scoped>
$mobile = 476px
mqPhone  = "only screen and (max-width: " + $mobile + ")"


.box
  @media mqPhone
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 51px;
    margin-bottom: 32.85px;


.form
  font-size: 18px;
  color: #EFF3FF;
  font-weight: 300;
  &__title
    margin-top: 100px;
    font-size: 48px;
    margin-bottom: 78px;
    @media mqPhone
      font-size: 24px;
      width: fit-content;
      margin-top: 0px;
      margin-bottom: 0px;
  &__img
    background-image: url('../assets/mail.svg');
    width: 76px;
    height: 70.15px;
    background-repeat: no-repeat;
    background-size: cover;
  &__container
    &-textarea
      position: relative;
      margin-top: 40px;
      @media mqPhone
        margin-top: 0px;
    &-checkbox
      margin-top: 43px;
    &-inputs
      @media mqPhone
        display: grid;
        grid-template-columns: 1fr;
  &__textarea
    width: -webkit-fill-available;
    height: 119px;
    border-radius: 8px;
    border: 1.5px solid #9aa8ba;
    background-color: inherit;
    color: #eef3ff;
    font-size: 20px;
    padding: 10px;
    @media mqPhone
      font-size 13px
    &::placeholder
      color: #EEF3FF
      font-size: 13px
      font-weight: 400
  &__checkbox
    width: 25px;
    height: 25px;
    margin-right: 12px;
  &__item
    position relative
    &-name
      position: absolute;
      top: -11px;
      left: 24px;
      background-color: #24252f;
      display: block;
      padding: 0px 13px;
    &-input
      width: 367px;
      height: 61px;
      border-radius: 8px;
      border: 1.5px solid #9AA8BA;
      background-color: inherit;
      color: #eef3ff;
      font-size: 20px;
      padding: 0px 10px;
      &::placeholder
        color: #EEF3FF
        font-size: 13px
        font-weight: 400
      @media mqPhone
        height: 52px;
        margin-bottom: 22px;
        width: -webkit-fill-available;
        font-size: 13px
  &__submit
    background-color: #2D76F9;
    padding: 20px 45px;
    border-radius: 85px;
    font-size: 18px;
    margin: 67px auto 100px;
    display: block;
    transition: all 0.3s ease
    @media mqPhone
      margin: 42px auto 26px;
      font-size: 13px;
      padding: 15px 125px;
    &:hover
      box-shadow: 0px 0px 14px #1f53b1;
  &__warning
    font-size: 13px;
    text-align: center;
    margin-bottom: 31.91px;
</style>
