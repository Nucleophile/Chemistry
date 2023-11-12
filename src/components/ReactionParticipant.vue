<template>
  <div class="participant">
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
      v-if="showRemoveParticipantBtn"
      @click="$emit('removeReactionParticipant', participants, index)"
      class="remove-btn"
    ></button>
  </div>
</template>

<script>
import ReactionParticipantInput from "./ReactionParticipantInput.vue";

export default {
  name: "ReactionParticipant",
  data() {
    return {
      coef: this.participant.coef,
      substance: this.participant.substance,
    };
  },
  props: {
    participants: Array,
    participant: Object,
    index: Number,
  },
  computed: {
    showRemoveParticipantBtn() {
      return this.participants.length > 1;
    },
  },
  methods: {
    participantInput(participant, key, newValue) {
      participant[key] = newValue;
    },
  },
  components: {
    ReactionParticipantInput,
  },
  emits: ["removeReactionParticipant"],
};
</script>

<style>
.participant {
  position: relative;
  padding: 0 1rem;
}
</style>
