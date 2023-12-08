<template>
  <div class="half-reaction">
    <ul class="half-reaction__list">
      <template v-for="(participant, index) in participants" :key="index">
        <ReactionParticipant
          :participant="participant"
          :index="index"
          :participants="participants"
          @remove-reaction-participant="removeReactionParticipant"
        />
        <li v-if="index < participants.length - 1">+</li>
      </template>
    </ul>
    <AnimatedButton
      size="xs"
      class="add-participant-btn"
      @button-click="addReactionParticipant(participants)"
      >Add participant</AnimatedButton
    >
  </div>
</template>

<script>
import ReactionParticipant from "./ReactionParticipant.vue";
import AnimatedButton from "./AnimatedButton.vue";

export default {
  name: "HalfReactionInput",
  setup() {
    const addReactionParticipant = (participants) => {
      participants.push({
        coef: 1,
        substance: "A",
      });
    };

    const removeReactionParticipant = (participants, index) => {
      participants.splice(index, 1);
    };

    return {
      addReactionParticipant,
      removeReactionParticipant,
    };
  },
  props: {
    participants: Array,
  },
  components: {
    ReactionParticipant,
    AnimatedButton,
  },
};
</script>

<style lang="scss">
.half-reaction {
  position: relative;
  display: flex;
  align-items: center;
  padding-right: 1.75rem;

  &__list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
