<template>
    <button type="button" @click="$emit('addReaction')">Add Reaction</button>
</template>

<script>
export default {
  name: 'AddReactionBtn',
  props: {
    // msg: String
  },
  emits: ['addReaction']
}
</script>