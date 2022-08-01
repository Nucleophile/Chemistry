<template>
    <template v-for="(participant, index) in participants" :key="participant">
      <ReactionParticipant
        :participant="participant"
        :index="index"
        :participants="participants"
        @remove-reaction-participant="removeReactionParticipant"
      />
      <span v-if="index < participants.length - 1">+</span>
    </template>

    <AddReactionParticipantBtn
      @add-reaction-participant="addReactionParticipant"
      :participants="participants"
    />
</template>

<script>

import ReactionParticipant from './ReactionParticipant.vue';
import AddReactionParticipantBtn from './AddReactionParticipantBtn.vue';

export default {
    name: 'HalfReactionInput',
    data() {
        return {
        };
    },
    props: {
        participants: Array
    },
    methods: {
        addReactionParticipant(participants) {
          participants.push({
            coef: 1,
            substance: 'A'
          });
        },
        removeReactionParticipant(participants, index) {
          participants.splice(index, 1);
        }
    },
    emits: [],
    components: {
      ReactionParticipant,
      AddReactionParticipantBtn
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
