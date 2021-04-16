import CalculatorContainer from "./calculators/CalculatorContainer.svelte";
import "./main.css";

window.addEventListener("DOMContentLoaded", () => {
  const targetElements = document.querySelectorAll(".insert-calculator-here");
  console.log(targetElements);
  targetElements.forEach((targetElement) => {
    const defaultCalc = targetElement.dataset.calc;
    const props = {
      company: "Tabor Mortgage Group",
      showTabs: !Boolean(defaultCalc), // Only show tabs if no calculator is set as the default

      // style props
      containerMaxWidth: "600px",
    };
    if (defaultCalc) {
      props.defaultCalc = defaultCalc;
    }

    new CalculatorContainer({
      target: targetElement,
      props,
    });
  });
});
