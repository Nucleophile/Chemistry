<template>
  <div class="reaction-input">
    <HalfReactionInput :participants="reactants" />
    <button
      type="button"
      @click="$emit('toggleReactionType', reactionNumber - 1)"
      class="arrow-btn"
      :class="{ reversible: reaction.reversible }"
    ></button>
    <HalfReactionInput :participants="products" />
    <AnimatedButton
      class="remove-reaction-btn"
      size="md"
      type="remove"
      v-if="reactionsNumber > 1"
      @button-click="$emit('removeReaction', reactionNumber - 1)"
    >Remove reaction</AnimatedButton>
  </div>
</template>

<script>
import AnimatedButton from "./AnimatedButton.vue";
import HalfReactionInput from "./HalfReactionInput.vue";

export default {
  name: "ReactionInput",
  setup(props) {
    return {
      reactants: props.reaction.equation.reactants,
      products: props.reaction.equation.products,
    };
  },
  props: {
    reactionNumber: Number,
    reaction: Object,
    reactionsNumber: Number,
  },
  emits: ["toggleReactionType", "removeReaction"],
  components: {
    HalfReactionInput,
    AnimatedButton,
  },
};
</script>

<style lang="scss">
.reaction-input {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin-left: -.25rem;
}
.arrow-btn::before {
  display: block;
  font-size: 1.125rem;
  line-height: 1.25rem;
}
.arrow-btn::before,
.arrow-btn.reversible:hover::before {
  content: "→";
}
.arrow-btn:hover::before,
.arrow-btn.reversible::before {
  content: "↔";
}
.remove-reaction-btn {
  position: absolute;
  left: 100%;
  top: -0.75rem;
}
</style>
