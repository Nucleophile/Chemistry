<template>
  <li class="participant">
    <ResponsiveInput inputType="number" v-model="$props.participant.coef" />
    <ResponsiveInput inputType="text" v-model="$props.participant.substance" />
    <AnimatedButton
      v-if="showRemoveParticipantBtn"
      class="remove-participant-btn"
      size="xs"
      type="remove"
      @button-click="$emit('removeReactionParticipant', participants, index)"
    >Remove participant</AnimatedButton>
  </li>
</template>

<script>
import AnimatedButton from "./AnimatedButton.vue";
import ResponsiveInput from "./ResponsiveInput.vue";
import { computed } from "vue";

export default {
  name: "ReactionParticipant",
  setup(props) {
    const showRemoveParticipantBtn = computed(() => {
      return props.participants.length > 1;
    });

    return {
      showRemoveParticipantBtn,
    };
  },
  props: {
    participants: Array,
    participant: Object,
    index: Number,
  },
  emits: ["removeReactionParticipant"],
  components: {
    ResponsiveInput,
    AnimatedButton,
  },
};
</script>

<style lang="scss">
.participant {
  position: relative;
  display: flex;
  padding: 0 1.5rem 0 0.25rem;
  &:only-of-type {
    padding-right: .25rem;
  }
}
input {
  border: 0;
  padding: 0;
  border-bottom: .0625rem solid #000;
  width: 2rem;
  font-size: 1rem;
}
input[type="text"] {
  text-align: center;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
.remove-participant-btn {
  position: absolute;
  left: 100%;
  top: -.5rem;
  margin-left: -1.375rem;
}
</style>
