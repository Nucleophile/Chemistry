<template>
  <input
    type="number"
    v-model="coef"
    @input="$emit('participantInput', this.participant, 0, coef)"
  >
  <input
    type="text"
    v-model="substance"
    @input="$emit('participantInput', this.participant, 1, substance)"
  >
</template>

<script>
export default {
  name: 'ReactionParticipant',
  data() {
    return {
      coef: this.participant[0],
      substance: this.participant[1]
    }
  },
  props: {
    'participant': Array
  },
  emits: ['participantInput']
}
</script>