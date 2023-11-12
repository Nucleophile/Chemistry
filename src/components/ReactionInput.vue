<template>
  <div class="reaction-input">
    <HalfReactionInput :participants="reactants" />
    <button
      type="button"
      @click="$emit('toggleReactionType', reactionNumber - 1)"
      class="arrow-btn"
      :class="{ reversible: reaction.reversible }"
    >
    </button>
    <HalfReactionInput :participants="products" />
    <button
      v-if="reactionsNumber > 1"
      @click="$emit('removeReaction', reactionNumber - 1)"
      class="remove-btn"
    ></button>
  </div>
</template>

<script>
import HalfReactionInput from "./HalfReactionInput.vue";

export default {
  name: "ReactionInput",
  data() {
    return {
      reactants: this.reaction.equation.reactants,
      products: this.reaction.equation.products,
    };
  },
  props: {
    reactionNumber: Number,
    reaction: Object,
    reactionsNumber: Number,
  },
  methods: {},
  emits: ["toggleReactionType", "removeReaction"],
  components: {
    HalfReactionInput,
  },
};
</script>

<style>
.reaction-input {
  position: relative;
  display: flex;
}
.arrow-btn::before,
.arrow-btn.reversible:hover::before {
  content: '→';
}
.arrow-btn:hover::before,
.arrow-btn.reversible::before {
  content: '↔'
}
</style>
