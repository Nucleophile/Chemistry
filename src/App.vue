<template>
  <div class="content">
    <section class="reactions">
      <div class="wrapper">
        <ul>
          <li v-for="(reaction, index) in reactions" :key="reaction.id">
            <ReactionInput
              :reactionNumber="index + 1"
              :reaction="reaction"
              :reactionsNumber="reactions.length"
              @remove-reaction="removeReaction"
              @toggle-reaction-type="toggleReactionType"
            />
          </li>
        </ul>
        <button @click="addReaction" class="add-btn"></button>
      </div>
    </section>
    <section class="result">
      <ul>
        <li v-for="equation in result.value" :key="equation">
          <span v-html="equation.leftPart"></span> =
          <span v-html="equation.rightPart"></span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { ref, reactive, onBeforeMount, watch } from "vue";
import useProceed from "./composables/proceed.js";
import ReactionInput from "./components/ReactionInput.vue";

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
              coef: 2,
              substance: "A",
            },
          ],
          products: [
            {
              coef: 3,
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
            {
              coef: 2,
              substance: "C",
            },
          ],
          products: [
            {
              coef: 2,
              substance: "D",
            },
          ],
        },
        reversible: true,
      },
    ]);
    const result = reactive({});
    const proceed = useProceed(reactions, result);

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
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.content {
  max-width: 1020px;
  margin: 0 auto;
  padding: 15px;
  display: flex;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
li:not(:last-child) {
  margin-bottom: 1rem;
}
label {
  display: block;
}
button {
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  font-size: 1rem;
}
.add-btn,
.remove-btn {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  transition: box-shadow 0.2s;
}
.add-btn:hover,
.remove-btn:hover {
  box-shadow: 0 0 0.25rem #555;
}
.remove-btn {
  position: absolute;
  top: -0.25rem;
  right: 0.25rem;
}
.remove-btn::before,
.remove-btn::after,
.add-btn::before,
.add-btn::after {
  content: "";
  position: absolute;
  background: #000;
}
.remove-btn::before,
.remove-btn::after,
.add-btn::before {
  width: 8px;
  height: 1px;
}
.remove-btn::before,
.remove-btn::after {
  top: 50%;
  left: 50%;
}
.remove-btn::before {
  transform: translate(-50%, -50%) rotate(45deg);
}
.remove-btn::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}
.add-btn {
  position: relative;
}
.add-btn::before {
  left: 3px;
}
.add-btn::after {
  width: 1px;
  height: 8px;
  top: 3px;
}
.reactions,
.result {
  width: 50%;
}
.reactions {
  position: relative;
  padding-right: 15px;
}
.reactions li {
  display: flex;
}
.result {
  font-family: serif;
  padding-left: 15px;
}
.result ul,
.reactions .wrapper {
  border: 1px solid #000;
  padding: 15px;
  height: 100%;
}
</style>
