export default function useProceed(reactions, result) {
  return function proceed() {
    const addends = getAddends(reactions.value);
    result.value = {};

    reactions.value.forEach((reaction, reactionNumber) => {
      for (let halfReaction in reaction.equation) {
        reaction.equation[halfReaction].forEach((participant) => {

          if (!result.value[participant.substance]) {
            result.value[participant.substance] = {
              leftPart: `&part;C<sub>${participant.substance}</sub>/&part;&tau;`,
              rightPart: ''
            };
          }

          result.value[participant.substance].rightPart += getAddendsWithSignAndCoef(
            result.value[participant.substance].rightPart,
            reactionNumber,
            halfReaction,
            reaction.reversible,
            participant.coef,
            addends
          );
        });
      }
    });
  };
}

function getAddendsWithSignAndCoef(
  currentValue,
  reactionNumber,
  halfReaction,
  isReversible,
  participantCoef,
  addends
) {
  let addendWithSignAndCoef = "";
  participantCoef = participantCoef === 1 ? "" : participantCoef;

  if (halfReaction === "reactants") {
    const space = currentValue ? " " : ""; // if current addend is first in response string, we don't need " " between  minus and text
    addendWithSignAndCoef =
      " &minus;" + space + participantCoef + addends[reactionNumber][0];
  } else {
    const plus = currentValue ? " + " : ""; // if current addend is first in response string, we don't need "+" before it
    addendWithSignAndCoef = plus + participantCoef + addends[reactionNumber][0];
  }

  if (isReversible) {
    if (halfReaction === "reactants") {
      addendWithSignAndCoef +=
        " + " + participantCoef + addends[reactionNumber][1];
    } else {
      addendWithSignAndCoef +=
        " &minus; " + participantCoef + addends[reactionNumber][1];
    }
  }

  return addendWithSignAndCoef;
}

function getAddends(reactions) {
  const addends = [];
  reactions.forEach((reaction, reactionNumber) => {
    let addend = `k<sub>${reactionNumber + 1}</sub>${getAddend(
      reaction.equation.reactants
    )}`;

    addends.push([addend]);

    if (reaction.reversible) {
      addend = `k′<sub>${reactionNumber + 1}</sub>${getAddend(
        reaction.equation.products
      )}`;
      addends[reactionNumber].push(addend);
    }
  });

  return addends;
}

function getAddend(halfReaction) {
  let result = "";

  halfReaction.forEach((item) => {
    result += `C<sub>${item.substance}</sub>${
      item.coef != 1 ? "<sup>" + item.coef + "</sup>" : ""
    }`;
  });

  return result;
}
