<template>
  <form action="" method="POST" @submit.prevent="proceed">
    <ul>
      <li v-for="(reaction, index) in reactions" :key="reaction">
        <ReactionInput
          :reactionNumber="index + 1"
          :reaction="reaction"
          @remove-reaction="removeReaction"
          @reaction-input="reactionInput"
        />
      </li>
    </ul>
    <AddReactionBtn @add-reaction="addReaction"/>
    <ProceedBtn/>
  </form>
</template>

<script>
import ReactionInput from './components/ReactionInput.vue'
import AddReactionBtn from './components/AddReactionBtn.vue'
import ProceedBtn from './components/ProceedBtn.vue'

export default {
  name: 'App',
  components: {
    ReactionInput,
    AddReactionBtn,
    ProceedBtn
  },
  data() {
    return {
      reactionsNumber: 1,
      reactions: [
        [
          [
            [1, 'A']
          ],
          [
            [3, 'C']
          ]
        ]
      ]
    }
  },
  methods: {
    addReaction() {
      this.reactions.push([
        [[1, '']],
        [[1, '']]
      ]);
    },
    removeReaction(reactionNumber) {
      this.reactions.splice(reactionNumber - 1, 1);
    },
    reactionInput(reactionNumber, reactionPart, substances) {
      console.log(reactionNumber, reactionPart, substances)
      // this.reactions[reactionNumber - 1][reactionPart] = substances;
      // console.log(this.reactions)
    },
    proceed() {
      console.log(this.reactions);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
ul {
  list-style: none;
  padding: 0;
}
</style>
