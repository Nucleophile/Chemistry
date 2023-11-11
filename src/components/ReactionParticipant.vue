<template>
  <ReactionParticipantInput
    type="number"
    :inputValue="coef"
    inputValueName="coef"
    :index="index"
    :participant="participant"
    @participant-input="participantInput"
  />
  <ReactionParticipantInput
    type="text"
    :inputValue="substance"
    inputValueName="substance"
    :index="index"
    :participant="participant"
    @participant-input="participantInput"
  />
  <button
    type="button"
    v-if="participants.length > 1"
    @click="$emit('removeReactionParticipant', participants, index)"
  >Remove participant</button>
</template>

<script>
import ReactionParticipantInput from './ReactionParticipantInput.vue';

export default {
  name: 'ReactionParticipant',
  data() {
    return {
      coef: this.participant.coef,
      substance: this.participant.substance
    }
  },
  props: {
    participants: Array,
    participant: Object,
    index: Number
  },
  methods: {
    participantInput(participant, key, newValue) {
      participant[key] = newValue;
      this.proceed();
    }
  },
  inject: ['proceed'],
  components: {
    ReactionParticipantInput
  },
  emits: ['removeReactionParticipant']
}
</script>

<style>
</style>