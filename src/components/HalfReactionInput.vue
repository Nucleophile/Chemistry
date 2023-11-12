<template>
  <div class="half-reaction">
    <template v-for="(participant, index) in participants" :key="participant">
      <ReactionParticipant
        :participant="participant"
        :index="index"
        :participants="participants"
        @remove-reaction-participant="removeReactionParticipant"
      />
      <span v-if="index < participants.length - 1">+</span>
    </template>
    <button @click="addReactionParticipant(participants)" class="add-btn"></button>
  </div>
</template>

<script>
import ReactionParticipant from "./ReactionParticipant.vue";

export default {
  name: "HalfReactionInput",
  data() {
    return {};
  },
  props: {
    participants: Array,
  },
  methods: {
    addReactionParticipant(participants) {
      participants.push({
        coef: 1,
        substance: "A",
      });
    },
    removeReactionParticipant(participants, index) {
      participants.splice(index, 1);
    },
  },
  emits: [],
  components: {
    ReactionParticipant,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.half-reaction {
  position: relative;
  display: flex;
  align-items: center;
}
</style>
