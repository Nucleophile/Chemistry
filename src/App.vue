<template>
  <div class="content">
    <ul>
      <li v-for="(reaction, index) in reactions" :key="reaction.id">
        <ReactionInput
          :reactionNumber="index + 1"
          :reaction="reaction"
          :reactions="reactions"
          @remove-reaction="removeReaction"
          @toggle-reaction-type="toggleReactionType"
        />
      </li>
    </ul>
    <AddReactionBtn @add-reaction="addReaction" />
    <section class="result">
      <ul>
        <li v-for="(equation, key) in result.value" :key="equation">
          <span v-html="key"></span> = <span v-html="equation"></span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { ref, reactive, onBeforeMount, watch } from "vue";
import useProceed from "./composables/proceed.js";
import ReactionInput from "./components/ReactionInput.vue";
import AddReactionBtn from "./components/AddReactionBtn.vue";

export default {
  name: "ChemistryApp",
  setup() {
    let reactionId = 0; // To have the unique id for key binding
    const reactions = ref([
      {
        id: reactionId++,
        equation: {
          reactants: [
            {
              coef: 1,
              substance: "A",
            },
          ],
          products: [
            {
              coef: 1,
              substance: "B",
            },
          ],
        },
        reversible: false,
      },
      {
        id: reactionId++,
        equation: {
          reactants: [
            {
              coef: 1,
              substance: "B",
            },
          ],
          products: [
            {
              coef: 2,
              substance: "C",
            },
          ],
        },
        reversible: true,
      },
    ]);
    const result = reactive({});
    const proceed = useProceed(result, reactions);

    const addReaction = () => {
      reactions.value.push({
        id: reactionId++,
        equation: {
          reactants: [
            {
              coef: 1,
              substance: "A",
            },
          ],
          products: [
            {
              coef: 1,
              substance: "B",
            },
          ],
        },
        reversible: false,
      });
    };

    const removeReaction = (reactionNumber) => {
      reactions.value.splice(reactionNumber, 1);
    };

    const toggleReactionType = (reactionNumber) => {
      reactions.value[reactionNumber].reversible =
        !reactions.value[reactionNumber].reversible;
    };

    watch(reactions, proceed, { deep: true });

    onBeforeMount(proceed);

    return {
      reactionId,
      reactions,
      result,
      addReaction,
      removeReaction,
      toggleReactionType,
    };
  },
  components: {
    ReactionInput,
    AddReactionBtn,
  },
};
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
