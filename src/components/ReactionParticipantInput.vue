<template>
  <input
    :type="type"
    v-model="value"
    @input="$emit('participantInput', participant, inputValueName, value)"
  >
</template>

<script>
export default {
  name: 'ReactionParticipantInput',
  setup(props) {
    return {
      value: props.inputValue
    }
  },
  props: {
    participant: Object,
    reactionNumber: Number,
    index: Number,
    type: String,
    inputValue: [String, Number],
    inputValueName: String
  },
  emits: ['participantInput']
}
</script>

<style>
  input {
    border: 0;
    border-bottom: 1px solid #000;
    width: 2rem;
    font-size: 1rem;
  }
  input[type="text"] {
    text-align: center;
  }
</style>