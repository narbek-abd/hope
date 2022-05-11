<script setup>
import { RouterView } from "vue-router";
import TheHeader from "@/layouts/TheHeader/TheHeader.vue";
import TheFooter from "@/layouts/TheFooter.vue";
</script>

<template>
  <TheHeader />
  <main id="main">
    <RouterView />
  </main>

  <TheFooter />
</template>

<style lang="scss">
* {
  margin: 0;
  border: 0;
  padding: 0;
}

*,
*:before,
*:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

html {
  height: 100%;
  width: 100%;
  scroll-behavior: smooth;
}

body {
  min-width: 320px;
  overflow-x: hidden;
  position: relative;
  font-family: "Lato";
  font-weight: normal;
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}

#main {
  flex: 1 0 auto;
}

a {
  text-decoration: none;
  outline: none;
}

ul li {
  list-style-type: none;
}

img {
  max-width: 100%;
  height: auto;
}

button {
  cursor: pointer;
}

td,
th {
  padding: 10px;
  text-align: center;
}

input,
textarea,
button {
  outline: none;
}

textarea {
  resize: none;
}

input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: var(--color-dark-blue);
}

input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
  color: var(--color-dark-blue);
}

input:-moz-placeholder,
textarea:-moz-placeholder {
  color: var(--color-dark-blue);
}

input::-moz-placeholder,
textarea::-moz-placeholder {
  color: var(--color-dark-blue);
}

@font-face {
  font-family: "Josefin Sans";
  src: url(./assets/fonts/JosefinSans-SemiBold.woff2) format("woff2"),
    url(./assets/fonts/JosefinSans-SemiBold.woff) format("woff");
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Josefin Sans";
  src: url(./assets/fonts/JosefinSans-Thin.woff2) format("woff2"),
    url(./assets/fonts/JosefinSans-Thin.woff) format("woff");
  font-weight: 100;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Josefin Sans";
  src: url(./assets/fonts/JosefinSans-Bold.woff2) format("woff2"),
    url(./assets/fonts/JosefinSans-Bold.woff) format("woff");
  font-weight: bold;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Lato";
  src: url(./assets/fonts/Lato-Bold.woff2) format("woff2"),
    url(./assets/fonts/Lato-Bold.woff) format("woff");
  font-weight: bold;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Lato";
  src: url(./assets/fonts/Lato-Regular.woff2) format("woff2"),
    url(./assets/fonts/Lato-Regular.woff) format("woff");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

.container {
  max-width: 1177 + 30px;
  margin: 0 auto;
  padding: 0 15px;
  position: relative;
  @media only screen and (max-width: 1200px) {
    max-width: 960 + 30px;
  }
  @media only screen and (max-width: 992px) {
    max-width: 720 + 30px;
  }
  @media only screen and (max-width: 768px) {
    max-width: 540 + 30px;
  }
  @media only screen and (max-width: 576px) {
    max-width: auto;
  }
}

.icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
  vertical-align: middle;
}

.logo {
  svg {
    width: 98px;
    height: 34px;
    color: #0d0e43;
  }
}

.section-title {
  font-family: Josefin Sans;
  font-weight: bold;
  font-size: 42px;
  line-height: 42px;
  color: #1a0b5b;
  text-align: center;
}

.input {
  width: 100%;
  border: 1px solid #c2c5e1;
  box-sizing: border-box;
  border-radius: 2px;
  color: #9096b2;
  padding: 15px 13px;
}

.checkbox {
  position: relative;
  cursor: pointer;

  input {
    position: absolute;
    z-index: -1;
    opacity: 0;

    &:checked ~ label {
      &:before {
        background-color: var(--color-pink);
        border-color: transparent;
      }
      &:after {
        display: block;
      }
    }
  }

  label {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    user-select: none;
    &:before {
      content: "";
      width: 22px;
      height: 22px;
      border-radius: 6px;
      border: 1px solid #d5d5d5;

      display: inline-block;
      flex-shrink: 0;
      flex-grow: 0;
      margin-right: 0.5em;
    }

    &:after {
      content: "";
      border-right: 2px solid #fff;
      border-bottom: 2px solid #fff;
      position: absolute;
      transform: rotate(45deg);
      display: none;
      width: 4px;
      height: 10px;
      top: 3px;
      left: 8px;
      box-sizing: content-box;
    }
  }
}

.form-error {
  display: block;
  margin-top: 3px;
  color: var(--color-pink);
  font-size: 12px;
}
</style>
