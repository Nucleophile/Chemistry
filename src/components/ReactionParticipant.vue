<template>
  <div class="participant">
    <input type="number" v-model="$props.participant.coef" />
    <input type="text" v-model="$props.participant.substance" />
    <button
      v-if="showRemoveParticipantBtn"
      @click="$emit('removeReactionParticipant', participants, index)"
      class="remove-btn"
    ></button>
  </div>
</template>

<script>
import { computed } from "vue";

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
  emits: ["removeReactionParticipant"],
};
</script>

<style>
.participant {
  position: relative;
  display: flex;
  padding: 0 1rem;
}
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
