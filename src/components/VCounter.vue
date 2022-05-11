<script setup>
import { ref, watchEffect } from "vue";

const props = defineProps({
  min: Number,
  max: Number,
  current: Number,
});

const emit = defineEmits(['change'])

const count = ref(props.current);
const warning = ref("");

const minusBtn = ref(null);
const plusBtn = ref(null);

watchEffect(() => {
  if(!minusBtn.value || !plusBtn.value) return;

  minusBtn.value.disabled = props.min === props.current;
  plusBtn.value.disabled = props.max === props.current;
});

function increment() {
  if (typeof count.value === "string") {
    count.value = props.min;
    emit('change', +props.min);
    return;
  }

  if (count.value === +props.max - 1) {
    count.value = props.max;
    emit('change', +props.max)
    plusBtn.value.disabled = true;
    return;
  }

  plusBtn.value.disabled = false;
  minusBtn.value.disabled = false;
  warning.value = "";

  let newValue = count.value + 1;
  count.value = newValue;
  emit('change', +newValue);
}

function decrement() {
  if (count.value === +props.min + 1) {
    count.value = props.min;
    emit('change', +props.min);
    minusBtn.value.disabled = true;
    return;
  }

  plusBtn.value.disabled = false;
  minusBtn.value.disabled = false;
  warning.value = "";

  let newValue = +count.value - 1;
  count.value = newValue;
  emit('change', +newValue);
}

function changeCount(e) {
  let value = e.target.value;

  if (value === "") {
    minusBtn.value.disabled = true;
    count.value = "";
    return;
  } else {
    minusBtn.value.disabled = false;
  }


  let isNumber = /^\d*\.?\d*$/.test(value);
  if (!isNumber) return;

  if (+value > props.max) {
    warning.value = `Avaiable only ${props.max}`;
    count.value = props.max;
    emit('change', +props.max);
    return;
  }

  if (+value < props.min) {
    count.value = props.min;
    emit('change', +props.min);
    minusBtn.value.disabled = true;
    return;
  }

  minusBtn.value.disabled = +value === props.min;
  plusBtn.value.disabled = +value === props.max;

  warning.value = "";
  count.value = +value;
  emit('change', +value);
}
</script>

<template>
  <div class="counter">
    <button @click="decrement" ref="minusBtn" class="counter__btn">-</button>

    <input
      type="text"
      :value="count"
      @input="changeCount"
      class="counter__field"
    />

    <button @click="increment" ref="plusBtn" class="counter__btn">+</button>

    <span class="counter__waring">
      {{ warning }}
    </span>
  </div>
</template>

<style scoped lang="scss">
.counter {
  display: flex;
  align-items: center;
  position: relative;
}
.counter__waring {
  position: absolute;
  bottom: -25px;
  left: 0;
}

.counter__btn {
  font-size: 18px;
  line-height: 24px;
  background: 0 0;
  padding: 0;
  text-align: center;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border: 1px solid #d5d5d5;
  border-radius: 100%;
}
.counter__field {
  font-size: 18px;
  text-align: center;
  cursor: pointer;
  width: 42px;
  height: 24px;
}
</style>
