<template>
    <label :for="'reaction-' + reactionNumber + '-1'">Reaction {{ reactionNumber }}</label>
    <HalfReactionInput
      :participants="reactants"
    />
    
    <button type="button" @click="$emit('toggleReactionType', reactionNumber - 1)">
      <span v-if="reaction.reversible">↔</span>
      <span v-else>→</span>
    </button>

    <HalfReactionInput
      :participants="products"
    />

    <button
      type="button"
      v-if="reactions.length > 1"
      @click="$emit('removeReaction', reactionNumber - 1)"
    >Remove</button>
</template>

<script>
 
import HalfReactionInput from './HalfReactionInput.vue';

export default {
    name: 'ReactionInput',
    data() {
        return {
            reactants: this.reaction.equation.reactants,
            products: this.reaction.equation.products
        };
    },
    props: {
        reactionNumber: Number,
        reaction: Object,
        reactions: Array
    },
    methods: {
        
    },
    emits: ['toggleReactionType', 'removeReaction'],
    components: {
      HalfReactionInput
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
