<template>
  <article class="app">
    <header class="app__header">
      <h1 class="app__heading">
        Generator of kinetic equations of chemical reactions
      </h1>
    </header>
    <main class="app__main">
      <section class="section reactions">
        <div class="section__content">
          <h2 class="section__heading">Chemical reactions</h2>
          <ul class="reactions__list">
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
          <AnimatedButton
            size="lg"
            class="add-reaction-btn"
            :staticBtn="true"
            @button-click="addReaction"
            >Add reaction</AnimatedButton
          >
        </div>
      </section>
      <section class="section result">
        <div class="section__content">
          <h2 class="section__heading">Kinetic equations</h2>
          <ul class="result__list">
            <li
              v-for="(equation, substance) in result.value"
              :key="substance"
              v-html="equation"
            ></li>
          </ul>
        </div>
      </section>
    </main>
  </article>
</template>

<script>
import { ref, reactive, onBeforeMount, watch } from "vue";
import useProceed from "./composables/proceed.js";
import ReactionInput from "./components/ReactionInput.vue";
import AnimatedButton from "./components/AnimatedButton.vue";

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
    AnimatedButton,
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 1rem;
  font-family: Helvetica, Arial, sans-serif;
  color: #000;
  line-height: 1.25;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
button {
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  font-size: 1rem;
  line-height: inherit;
}
.app {
  display: block;
  margin: 0 auto;
  border: 0.0625rem solid #cce4ff;
  border-radius: 0.5rem;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.16);

  @media (min-width: 65.75rem) {
    max-width: 63.75rem;
  }
}
.app__header {
  padding: 2rem 1rem;
  border-bottom: 0.0625rem solid #cce4ff;
}
.app__heading {
  font-size: 1.5rem;
  margin: 0;
  text-align: center;
}
.app__main {
  background: #f7fafd;
}
.section {
  padding: 2rem 1rem;
}
.section__content {
  height: 100%;
  padding: 1.5rem 1.5rem;
  border: 0.1875rem solid #c7def4;
  background: #fff;
  border-radius: 0.5rem;
}
.result {
  font-size: 1.25rem;
}
.section__heading {
  font-size: 1.25rem;
  margin: 0 0 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 0.0625rem solid #cce4ff;
}
.reactions__list > li {
  display: flex;
  margin-bottom: 1.5rem;
}
.result__list > li:not(:last-child) {
  margin-bottom: 1.25rem;
}
.add-reaction-btn {
  display: inline-block;
}
.add-participant-btn {
  position: absolute;
  left: 100%;
  margin-left: -1.625rem;
}
.arrow-btn {
  position: relative;
}
@media (min-width: 56rem) {
  .app__header {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  .app__main {
    display: flex;
    padding: 0 1rem;
  }
  .section {
    width: 50%;
  }
}
@media (max-width: 55.9375rem) {
  .result {
    padding-top: 0;
  }
}
</style>
