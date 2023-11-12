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
import { computed } from "vue";
import ReactionParticipantInput from "./ReactionParticipantInput.vue";

export default {
  name: "ReactionParticipant",
  setup(props) {
    const showRemoveParticipantBtn = computed(() => {
      return props.participants.length > 1;
    });

    const participantInput = (participant, key, newValue) => {
      participant[key] = newValue;
    };

    return {
      coef: props.participant.coef,
      substance: props.participant.substance,
      showRemoveParticipantBtn,
      participantInput,
    };
  },
  props: {
    participants: Array,
    participant: Object,
    index: Number,
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
  display: flex;
  padding: 0 1rem;
}
</style>
