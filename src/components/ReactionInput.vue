<template>
    <label for="reaction-1">Reaction {{ reactionNumber }}</label>
    <input
      type="text"
      :id="'reaction-' + reactionNumber + '-reagents'"
      v-model="reagents"
      @input="$emit('reactionInput', reactionNumber, 0, reagents)"
    >
    <button type="button" @click="toggleReactionType">
      <span v-if="reversible">=</span>
      <span v-else>-></span>
    </button>
    <input
      type="text"
      :id="'reaction-' + reactionNumber + '-products'"
      v-model="products"
      @input="$emit('reactionInput', reactionNumber, 1, products)"
    >
    <button type="button" @click="$emit('removeReaction', reactionNumber)">Remove</button>
</template>

<script>
export default {
  name: 'ReactionInput',
  data() {
    return {
      reversible: false,
      reagents: '',
      products: ''
    }
  },
  props: {
    reactionNumber: Number
  },
  methods: {
    toggleReactionType() {
      this.reversible = !this.reversible;
    }
  },
  emits: ['removeReaction', 'reactionInput']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
