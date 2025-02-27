<script setup>
import axios from '@/plugins/axios'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, maxLength, helpers, sameAs } from '@vuelidate/validators'
import { ref, reactive, onMounted, onBeforeUnmount, computed } from 'vue'
import Swal from 'sweetalert2'

const isMobile = ref(false)
const form = ref(null)

const formData = reactive({
  name: '',
  email: '',
  phone: '',
  message: '',
  agreement: false,
})

// Кастомный валидатор для телефона (только цифры и +)
const phoneDigitsAndPlus = helpers.regex(/^[0-9+]+$/)

// Кастомный валидатор для начала телефона (8 или +7)
const phoneStartsWith = helpers.regex(/^(8|\+7)/)

const rules = {
  formData: {
    name: { required },
    email: { required, email },
    phone: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(12),
      phoneStartsWith,
      phoneDigitsAndPlus,
    },
    message: { required },
    agreement: { sameAs: sameAs(true) },
  },
}

const $v = useVuelidate(rules, { formData })

// methods
const submitForm = async () => {
  if (isMobile.value) {
    formData.agreement = true
  }

  $v.value.$touch()

  if ($v.value.$invalid) {
    return
  } else {
    const { name, email, phone, message } = formData
    try {
      await axios
        .post('/feedbacks', {
          name,
          email,
          phone,
          message,
        })
        .then((response) => {
          console.log(response)
        })
      await Swal.fire({
        title: 'Успех!',
        text: 'Вы успешно отправили информацию о вашем проекте!',
        icon: 'success',
      })
    } catch (error) {
      if (error.response && error.response.status === 422) {
        await Swal.fire({
          title: 'Ошибка валидации',
          text: 'Произошла ошибка при отправке формы. Пожалуйста, попробуйте снова.',
          icon: 'error',
        })
      } else {
        await Swal.fire({
          title: 'Ошибка',
          text: 'Произошла ошибка при отправке формы. Пожалуйста, попробуйте снова.',
          icon: 'error',
        })
      }
    }
    resetForm()
  }
}

const resetForm = () => {
  formData.name = ''
  formData.email = ''
  formData.phone = ''
  formData.message = ''
  formData.agreement = false
  $v.value.$reset()
}

const checkScreenSize = () => {
  // Для разработки
  isMobile.value = window.innerWidth <= 476 * 2
  // Для продакшена (телефоны)
  // isMobile.value = window.innerWidth <= 476;
}

// computed
const textBtn = computed(() => {
  let text = ''
  isMobile.value === false ? (text = 'Обсудить проект') : (text = 'Отправить')
  return text
})

const placeholderName = computed(() => {
  let text = ''
  isMobile.value === false ? (text = '') : (text = 'Ваше имя*')
  return text
})

const placeholderPhone = computed(() => {
  let text = ''
  isMobile.value === false ? (text = '') : (text = 'Телефон*')
  return text
})

const placeholderMail = computed(() => {
  let text = ''
  isMobile.value === false ? (text = '') : (text = 'Email*')
  return text
})

const placeholderMsg = computed(() => {
  let text = ''
  isMobile.value === false ? (text = '') : (text = 'Сообщение*')
  return text
})

// условия для выведения ошибок
const defaultError = (property) => {
  return $v.value.formData[property].$error
}

const requiredError = (property) => {
  return $v.value.formData[property].required.$invalid
}

const typeError = (property, type) => {
  return $v.value.formData[property][type].$invalid
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
              class="form__item-input"
              :placeholder="placeholderName"
            />
            <span v-if="defaultError('name')" class="form__item-notice">*Имя обязательно</span>
          </div>
          <div class="form__item">
            <label for="email" class="form__item-name" v-if="!isMobile">Email*</label>
            <input
              class="form__item-input"
              v-model="formData.email"
              id="email"
              :placeholder="placeholderMail"
            />
            <span v-if="defaultError('email')" class="form__item-notice">
              <span v-if="requiredError('email')">*Email обязателен</span>
              <span v-if="!requiredError('email') && typeError('email', 'email')">
                *Введите корректный email
              </span>
            </span>
          </div>
          <div class="form__item">
            <label for="phone" class="form__item-name" v-if="!isMobile">Телефон*</label>
            <input
              v-model="formData.phone"
              id="phone"
              class="form__item-input"
              :placeholder="placeholderPhone"
            />
            <span v-if="defaultError('phone')" class="form__item-notice">
              <span v-if="requiredError('phone')">*Телефон обязателен</span>
              <span
                v-if="
                  !requiredError('phone') &&
                  (typeError('phone', 'minLength') ||
                    typeError('phone', 'maxLength') ||
                    typeError('phone', 'phoneDigitsAndPlus') ||
                    typeError('phone', 'phoneStartsWith'))
                "
              >
                *Введите корректный номер (+7 или 8)
              </span>
            </span>
          </div>
        </div>
        <div class="form__container-textarea">
          <label for="message" class="form__item-name" v-if="!isMobile">Сообщение*</label>
          <textarea
            type="text"
            v-model="formData.message"
            id="message"
            class="form__textarea"
            :placeholder="placeholderMsg"
          ></textarea>
          <span v-if="defaultError('message')" class="form__item-noticeArea"
            >*Необходимо указать сообщение</span
          >
        </div>
        <div v-if="!isMobile" class="form__container-checkbox d-flex align-items-center">
          <input
            class="form__checkbox"
            type="checkbox"
            v-model="formData.agreement"
            id="agreement"
          />
          <label for="agreement">Согласие на обработку персональных данных</label>
          <span v-if="defaultError('agreement')" class="form__item-noticeCheckbox"
            >*Необходимо ваше согласие</span
          >
        </div>
        <button type="submit" class="form__submit">{{ textBtn }}</button>
        <div class="form__warning" v-if="isMobile">
          Нажимая “Отправить”, Вы даете согласие на обработку персональных данных
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="stylus">
$mobile = 476px
mqPhone = "only screen and (max-width: " + $mobile + ")"

.box
  @media mqPhone
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 3.1875rem; // 51px / 16
    margin-bottom: 2.053125rem; // 32.85px / 16


.form
  font-size: 1.125rem; // 18px / 16
  color: #EFF3FF;
  font-weight: 300;
  &__title
    margin-top: 6.25rem; // 100px / 16
    font-size: 3rem; // 48px / 16
    margin-bottom: 4.875rem; // 78px / 16
    @media mqPhone
      font-size: 1.5rem; // 24px / 16
      width: fit-content;
      margin-top: 0;
      margin-bottom: 0;
  &__img
    background-image: url('/mail.svg');
    width: 4.75rem; // 76px / 16
    height: 4.384375rem; // 70.15px / 16
    background-repeat: no-repeat;
    background-size: cover;
  &__container
    &-textarea
      position: relative;
      margin-top: 2.5rem; // 40px / 16
      @media mqPhone
        margin-top: 0;
    &-checkbox
      margin-top: 2.6875rem; // 43px / 16
      position: relative;
    &-inputs
      @media mqPhone
        display: grid;
        grid-template-columns: 1fr;
  &__textarea
    width: -webkit-fill-available;
    height: 7.4375rem; // 119px / 16
    border-radius: 0.5rem; // 8px / 16
    border: 0.09375rem solid #9aa8ba; // 1.5px / 16
    background-color: inherit;
    color: #eef3ff;
    font-size: 1.25rem; // 20px / 16
    padding: 0.625rem; // 10px / 16
    @media mqPhone
      font-size: 0.8125rem; // 13px / 16
    &::placeholder
      color: #EEF3FF;
      font-size: 0.8125rem; // 13px / 16
      font-weight: 400;
  &__checkbox
    width: 1.5625rem; // 25px / 16
    height: 1.5625rem; // 25px / 16
    margin-right: 0.75rem; // 12px / 16
  &__item
    position: relative;
    &-name
      position: absolute;
      top: -0.6875rem; // -11px / 16
      left: 1.5rem; // 24px / 16
      background-color: #24252f;
      display: block;
      padding: 0 0.8125rem; // 13px / 16
    &-input
      width: 22.9375rem; // 367px / 16
      height: 3.8125rem; // 61px / 16
      border-radius: 0.5rem; // 8px / 16
      border: 0.09375rem solid #9AA8BA; // 1.5px / 16
      background-color: inherit;
      color: #eef3ff;
      font-size: 1.25rem; // 20px / 16
      padding: 0 0.625rem; // 10px / 16
      &::placeholder
        color: #EEF3FF;
        font-size: 0.8125rem; // 13px / 16
        font-weight: 400;
      @media mqPhone
        height: 3.25rem; // 52px / 16
        margin-bottom: 1.375rem; // 22px / 16
        width: -webkit-fill-available;
        font-size: 0.8125rem; // 13px / 16
    &-notice
      position: absolute;
      top: 4rem;
      left: 0;
      color: #e37777;
    &-noticeArea
      position: absolute;
      top: 9rem;
      left: 0;
      color: #e37777;
    &-noticeCheckbox
      position: absolute;
      top: 2rem;
      left: 0;
      color: #e37777;
  &__submit
    background-color: #2D76F9;
    padding: 1.25rem 2.8125rem; // 20px / 16, 45px / 16
    border-radius: 5.3125rem; // 85px / 16
    font-size: 1.125rem; // 18px / 16
    margin: 4.1875rem auto 6.25rem; // 67px / 16, 100px / 16
    display: block;
    transition: all 0.3s ease;
    @media mqPhone
      margin: 2.625rem auto 1.625rem; // 42px / 16, 26px / 16
      font-size: 0.8125rem; // 13px / 16
      padding: 0.9375rem 7.8125rem; // 15px / 16, 125px / 16
    &:hover
      box-shadow: 0px 0px 0.875rem #1f53b1; // 14px / 16
  &__warning
    font-size: 0.8125rem; // 13px / 16
    text-align: center;
    margin-bottom: 1.994375rem; // 31.91px / 16
</style>
