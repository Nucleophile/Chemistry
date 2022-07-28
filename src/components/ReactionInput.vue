<template>
    <label for="reaction-1">Reaction {{ reactionNumber }}</label>
    <template v-for="(participant, index) in reactants" :key="participant">
      <ReactionParticipant
        :participant="participant"
        @participant-input="participantInput"
      />
      <span v-if="index < reactants.length - 1">+</span>
    </template>

    <AddReactionParticipantBtn
      @add-reaction-participant="addReactionParticipant"
      :participants="reactants"
    />
    
    <button type="button" @click="toggleReactionType">
      <span v-if="reversible">=</span>
      <span v-else>-></span>
    </button>

    <template v-for="(participant, index) in products" :key="participant">
      <ReactionParticipant
        :participant="participant"
        @participant-input="participantInput"
      />
      <span v-if="index < products.length - 1">+</span>
    </template>

    <AddReactionParticipantBtn
      @add-reaction-participant="addReactionParticipant"
      :participants="products"
    />

    <button type="button" @click="$emit('removeReaction', reactionNumber)">Remove</button>
</template>

<script>

import ReactionParticipant from './ReactionParticipant.vue';
import AddReactionParticipantBtn from './AddReactionParticipantBtn.vue';

export default {
    name: 'ReactionInput',
    data() {
        return {
            reversible: false,
            reactants: this.reaction[0],
            products: this.reaction[1] 
        };
    },
    props: {
        reactionNumber: Number,
        reaction: Array
    },
    methods: {
        toggleReactionType() {
            this.reversible = !this.reversible;
        },
        participantInput(participant, arrNumber, newValue) {
          participant[arrNumber] = newValue;
        },
        addReactionParticipant(participants) {
          participants.push([1, '']);
        }
    },
    emits: ['removeReaction', 'reactionInput'],
    components: {
      ReactionParticipant,
      AddReactionParticipantBtn
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
