<template>
  <div class="navigation">
    <div class="wrap">
      <div class="navigation__current">Главная / <span>Кейсы</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navigation",
};
</script>

<style lang="stylus" scoped>
$mobile = 476px
mqPhone  = "only screen and (max-width: " + $mobile + ")"

.navigation
  font-size: 18px
  margin-top 66px
  @media mqPhone
    margin-top: 46.20px;
    font-size: 12px;
  &__current
    color: #9AA8BA
    span
      color: #616580
</style>
