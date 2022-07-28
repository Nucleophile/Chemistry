<template>
    <button type="button" @click="$emit('addReactionParticipant', this.participants)">Add Participant</button>
</template>

<script>
export default {
  name: 'AddReactionParticipantBtn',
  props: {
    participants: Array
  },
  emits: ['addReactionParticipant']
}
</script>