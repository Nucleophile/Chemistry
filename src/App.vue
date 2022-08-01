<template>
  <div class="content">
    <form action="" method="POST" @submit.prevent="proceed">
      <ul>
        <li v-for="(reaction, index) in reactions" :key="reaction">
          <ReactionInput
            :reactionNumber="index + 1"
            :reaction="reaction"
            :reactions="reactions"
            @remove-reaction="removeReaction"
            @toggle-reaction-type="toggleReactionType"
          />
        </li>
      </ul>
      <AddReactionBtn @add-reaction="addReaction"/>
      <ProceedBtn/>
    </form>
  </div>
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
          false, // reaction reversibility identificator
          [
            {
              coef: 1,
              substance: 'A'
            }
          ],
          [
            {
              coef: 1,
              substance: 'A'
            }
          ]
        ]
      ]
    }
  },
  methods: {
    addReaction() {
      this.reactions.push([
        false,
        [{
          coef: 1,
          substance: 'A'
        }],
        [{
          coef: 1,
          substance: 'A'
        }]
      ]);
    },
    removeReaction(reactionNumber) {
      this.reactions.splice(reactionNumber, 1);
    },
    toggleReactionType(reactionNumber) {
      this.reactions[reactionNumber][0] = !this.reactions[reactionNumber][0];
    },
    proceed() {
      console.log(this.reactions);
    }
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.content {
  max-width: 1020px;
  margin: 0 auto;
  padding: 15px;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
label {
  display: block;
}
</style>
