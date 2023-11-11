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
        <li v-for="(equation, key) in result" :key="equation">
          <span v-html="key"></span> = <span v-html="equation"></span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import ReactionInput from "./components/ReactionInput.vue";
import AddReactionBtn from "./components/AddReactionBtn.vue";

export default {
  name: "App",
  components: {
    ReactionInput,
    AddReactionBtn,
  },
  beforeMount() {
    this.proceed();
  },
  data() {
    return {
      reactions: [
        {
          id: 0,
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
          id: 1,
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
      ],
      result: {},
      reactionId: 2,
    };
  },
  watch: {
    reactions: {
      handler: "proceed",
      deep: true,
    },
  },
  methods: {
    addReaction() {
      this.reactions.push({
        id: this.getReactionId(),
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
    },

    getReactionId() {
      return this.reactionId++;
    },

    removeReaction(reactionNumber) {
      this.reactions.splice(reactionNumber, 1);
    },

    toggleReactionType(reactionNumber) {
      this.reactions[reactionNumber].reversible =
        !this.reactions[reactionNumber].reversible;
    },

    proceed() {
      const addends = getAddends(this.reactions);
      this.result = {};

      this.reactions.forEach((reaction, reactionNumber) => {
        for (let halfReaction in reaction.equation) {
          reaction.equation[halfReaction].forEach((participant) => {
            if (!this.result[participant.substance]) {
              this.result[participant.substance] = "";
            }

            this.result[participant.substance] += getAddendsWithSignAndCoef(
              reactionNumber,
              halfReaction,
              reaction.reversible,
              participant.coef
            );
          });
        }

        function getAddendsWithSignAndCoef(
          reactionNumber,
          halfReaction,
          isReversible,
          participantCoef
        ) {
          let addendWithSignAndCoef = "";
          participantCoef = participantCoef === 1 ? "" : participantCoef;

          if (halfReaction === "reactants") {
            addendWithSignAndCoef =
              "-" + participantCoef + addends[reactionNumber][0];
          } else {
            addendWithSignAndCoef =
              "+" + participantCoef + addends[reactionNumber][0];
          }

          if (isReversible) {
            if (halfReaction === "reactants") {
              addendWithSignAndCoef +=
                "+" + participantCoef + addends[reactionNumber][1];
            } else {
              addendWithSignAndCoef +=
                "-" + participantCoef + addends[reactionNumber][1];
            }
          }

          return addendWithSignAndCoef;
        }
      });

      function getAddends(reactions) {
        const addends = [];
        reactions.forEach((reaction, reactionNumber) => {
          let addend =
            "k" + (reactionNumber + 1) + getAddend(reaction.equation.reactants);

          addends.push([addend]);

          if (reaction.reversible) {
            // Reversible reaction
            addend =
              "k<sub>" +
              (reactionNumber + 1) +
              "</sub><sup>'</sup>" +
              getAddend(reaction.equation.products);
            addends[reactionNumber].push(addend);
          }
        });

        return addends;

        function getAddend(halfReaction) {
          let result = "";

          halfReaction.forEach((item) => {
            result +=
              "C<sub>" +
              item.substance +
              "</sub>" +
              (item.coef != 1 ? "<sup>" + item.coef + "</sup>" : "");
          });

          return result;
        }
      }
    },
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
