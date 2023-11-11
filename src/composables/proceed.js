export default function useProceed(result, reactions) {
  return function proceed() {
    const addends = getAddends(reactions.value);
    result.value = {};

    reactions.value.forEach((reaction, reactionNumber) => {
      for (let halfReaction in reaction.equation) {
        reaction.equation[halfReaction].forEach((participant) => {
          if (!result.value[participant.substance]) {
            result.value[participant.substance] = "";
          }

          result.value[participant.substance] += getAddendsWithSignAndCoef(
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
  reactionNumber,
  halfReaction,
  isReversible,
  participantCoef,
  addends
) {
  let addendWithSignAndCoef = "";
  participantCoef = participantCoef === 1 ? "" : participantCoef;

  if (halfReaction === "reactants") {
    addendWithSignAndCoef = "-" + participantCoef + addends[reactionNumber][0];
  } else {
    addendWithSignAndCoef = "+" + participantCoef + addends[reactionNumber][0];
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

function getAddends(reactions) {
  const addends = [];
  reactions.forEach((reaction, reactionNumber) => {
    let addend =
      "k" + (reactionNumber + 1) + getAddend(reaction.equation.reactants);

    addends.push([addend]);

    if (reaction.reversible) {
      addend =
        "k<sub>" +
        (reactionNumber + 1) +
        "</sub><sup>'</sup>" +
        getAddend(reaction.equation.products);
      addends[reactionNumber].push(addend);
    }
  });

  return addends;
}

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
