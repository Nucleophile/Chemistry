export default function useProceed(reactions, result) {
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
            result.value[participant.substance],
            reactionNumber,
            halfReaction,
            reaction.reversible,
            participant.coef,
            addends
          );
        });
      }
    });
    for (let substance in result.value) {
      result.value[substance] = `
      <math>
        <mfrac>
          <msub>
            <mi>&part;C</mi>
            <mi>${substance}</mi>
          </msub>
          <mi>&part;&tau;</mi>
        </mfrac>
        <mo>=</mo>
        ${result.value[substance]}
      </math>`;
    }
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
  participantCoef = participantCoef === 1 ? "" : `<mn>${participantCoef}</mn>`;

  if (halfReaction === "reactants") {
    addendWithSignAndCoef =
      "<mo>&minus;</mo>" + participantCoef + addends[reactionNumber][0];
  } else {
    const plus = currentValue ? "<mo>+</mo>" : ""; // if current addend is first in response string, we don't need "+" before it
    addendWithSignAndCoef = plus + participantCoef + addends[reactionNumber][0];
  }

  if (isReversible) {
    if (halfReaction === "reactants") {
      addendWithSignAndCoef +=
        "<mo>+</mo>" + participantCoef + addends[reactionNumber][1];
    } else {
      addendWithSignAndCoef +=
        "<mo>&minus;</mo>" + participantCoef + addends[reactionNumber][1];
    }
  }
console.log(addendWithSignAndCoef)
  return addendWithSignAndCoef;
}

function getAddends(reactions) {
  const addends = [];
  reactions.forEach((reaction, reactionNumber) => {
    let addend = `
      <msub>
        <mi>k</mi>
        <mn>${reactionNumber + 1}</mn>
      </msub>
      ${getAddend(reaction.equation.reactants)}`;

    addends.push([addend]);

    if (reaction.reversible) {
      addend = `
        <msubsup>
          <mi>k</mi>
          <mn>${reactionNumber + 1}</mn>
          <mi>′</mi>
        </msubsup>
        ${getAddend(reaction.equation.products)}`;
      addends[reactionNumber].push(addend);
    }
  });

  return addends;
}

function getAddend(halfReaction) {
  let result = "";

  halfReaction.forEach((item) => {
    result += `
      <msubsup>
        <mi>C</mi>
        <mi>${item.substance}</mi>
        <mn>${item.coef != 1 ? item.coef : ""}</mn>
      </msubsup>`;
  });

  return result;
}
