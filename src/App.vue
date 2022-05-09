<script setup>
import { RouterView } from "vue-router";
import TheHeader from "@/layouts/TheHeader/TheHeader.vue";
</script>

<template>
  <TheHeader />
  <main id="main">
    <RouterView />
  </main>

  <!-- <Footer /> -->
</template>

<style lang="scss">
/* color palette from <https://github.com/vuejs/theme> */
:root {
  --vt-c-white: #ffffff;
  --vt-c-white-soft: #f8f8f8;
  --vt-c-white-mute: #f2f2f2;

  --vt-c-black: #181818;
  --vt-c-black-soft: #222222;
  --vt-c-black-mute: #282828;

  --vt-c-indigo: #2c3e50;

  --vt-c-divider-light-1: rgba(60, 60, 60, 0.29);
  --vt-c-divider-light-2: rgba(60, 60, 60, 0.12);
  --vt-c-divider-dark-1: rgba(84, 84, 84, 0.65);
  --vt-c-divider-dark-2: rgba(84, 84, 84, 0.48);

  --vt-c-text-light-1: var(--vt-c-indigo);
  --vt-c-text-light-2: rgba(60, 60, 60, 0.66);
  --vt-c-text-dark-1: var(--vt-c-white);
  --vt-c-text-dark-2: rgba(235, 235, 235, 0.64);
}

/* semantic color variables for this project */
:root {
  --color-background: var(--vt-c-white);
  --color-background-soft: var(--vt-c-white-soft);
  --color-background-mute: var(--vt-c-white-mute);

  --color-border: var(--vt-c-divider-light-2);
  --color-border-hover: var(--vt-c-divider-light-1);

  --color-heading: var(--vt-c-text-light-1);
  --color-text: var(--vt-c-text-light-1);

  --section-gap: 160px;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-background: var(--vt-c-black);
    --color-background-soft: var(--vt-c-black-soft);
    --color-background-mute: var(--vt-c-black-mute);

    --color-border: var(--vt-c-divider-dark-2);
    --color-border-hover: var(--vt-c-divider-dark-1);

    --color-heading: var(--vt-c-text-dark-1);
    --color-text: var(--vt-c-text-dark-2);
  }
}
@import-normalize;

:root {
  --color-purple: #7e33e0;
  --color-pink: #fb2e86;
  --color-dark-blue: #151875;

  --color-tr: color 0.1s ease-in;
  --opacity-tr: opacity 0.2s ease-in;
}
* {
  margin: 0;
  border: 0;
  box-sizing: border-box;
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

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}
#main {
  flex: 1 0 auto;
}

body {
  min-width: 320px;
  overflow-x: hidden;
  position: relative;
  font-family: "Lato";
  font-weight: normal;
}

#root {
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

.icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
  vertical-align: middle;
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

.form-error {
  display: block;
  margin-top: 3px;
  color: var(--color-pink);
  font-size: 12px;
}
</style>
