<script setup>
import VIcon from "@/components/VIcon.vue";
import HeaderNavbar from "./HeaderNavbar.vue";
import HeaderTop from "./HeaderTop.vue";
import HeaderSearchbar from "./HeaderSearchbar.vue";
import {RouterLink} from "vue-router" 
</script>

<template>
  <header>
    <HeaderTop />

    <div class="header__bottom">
      <div class="container">
        <div class="header__bottom-inner">
          <RouterLink class="logo" to="/">
            <VIcon name="logo" />
          </RouterLink>

          <div class="header__right">
            <HeaderNavbar />
            <HeaderSearchbar />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header__bottom-inner {
  display: flex;
  align-items: center;
  height: 50px;
  background-color: #fff;
  @media only screen and (max-width: 768px) {
    justify-content: space-between;
  }
}

.header__right {
  display: flex;
  flex-grow: 1;
  align-items: center;
  @media only screen and (max-width: 768px) {
    flex-direction: row-reverse;
  }
}
</style>
