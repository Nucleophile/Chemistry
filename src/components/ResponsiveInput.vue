<template>
  <div class="responsive-input">
    <input
      type="$props.inputType"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="responsive-input__input"
    />
    <div class="responsive-input__div">{{ modelValue }}</div>
  </div>
</template>

<script>
export default {
  name: "ResponsiveInput",
  setup() {
    return {};
  },
  props: {
    modelValue: String,
    inputType: String,
  },
  emits: ["update:modelValue"],
};
</script>

<style>
  .responsive-input {
    position: relative;
    line-height: 1.25;
  }
  .responsive-input__input,
  .responsive-input__div {
    padding: 0 2px;
  }
  .responsive-input__input {
    position: absolute;
    width: 100%;
    border: none;
    line-height: inherit;
  }
  .responsive-input__div {
    visibility: hidden;
  }
</style>
