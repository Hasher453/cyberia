<template>
  <div id="app">
    <Header />
    <Navigation />
    <Projects />
    <Form />
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Navigation from "./components/Navigation.vue";
import Projects from "./components/Projects.vue";
import Form from "./components/Form.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Navigation,
    Projects,
    Form,
    Footer,
  },
};
</script>

<style lang="stylus">
$mobile = 476px
mqPhone  = "only screen and (max-width: " + $mobile + ")"

::-webkit-scrollbar {
  background-color: #121212
  width: 5px;
}

::-webkit-scrollbar-thumb {
  background-color: #384465;
  border-radius: 10px;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
-webkit-text-fill-color: #FFFFFF;
-webkit-box-shadow: 0 0 0px 1000px #24252f inset;
transition: background-color 5000s ease-in-out 0s;
}

#app
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale

body
  color #EEF3FF
  background: linear-gradient(to bottom, #24252F 100%, #31313F 100%, #242530 100%);
  font-family: "Fira Sans Condensed", sans-serif;
  margin 0

a
  text-decoration: none
  color: #fff

button
  background: none;
  border: none;
  color: #EEF3FF;
  cursor: pointer
  transition: all 0.3s ease

.button-nav
  font-size: 24px;
  background-color: #313341;
  border-radius: 7px;
  padding: 10px 29px;
  @media mqPhone
    margin-bottom: 17px;





.wrap
  max-width 1240px
  padding  0 10px
  margin: auto
  @media mqPhone
    padding: 0 25px 0 27px;

.d-flex
  display: flex

.align-items-center
  align-items: center


.justify-content-sb
  justify-content: space-between
</style>
