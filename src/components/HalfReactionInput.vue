<template>
  <div class="half-reaction">
    <template v-for="(participant, index) in participants" :key="index">
      <ReactionParticipant
        :participant="participant"
        :index="index"
        :participants="participants"
        @remove-reaction-participant="removeReactionParticipant"
      />
      <span v-if="index < participants.length - 1">+</span>
    </template>
    <button @click="addReactionParticipant(participants)" class="add-btn add-reaction-participant"></button>
  </div>
</template>

<script>
import ReactionParticipant from "./ReactionParticipant.vue";

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
    }

    return {
      addReactionParticipant,
      removeReactionParticipant
    }
  },
  props: {
    participants: Array,
  },
  components: {
    ReactionParticipant,
  },
};
</script>

<style>
.half-reaction {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.add-reaction-participant {
  position: absolute;
  right: 0;
}
</style>
