<template>
    <button type="button" @click="$emit('addReaction')">Add Reaction</button>
</template>

<script>
export default {
  name: 'AddReactionBtn',
  emits: ['addReaction']
}
</script>