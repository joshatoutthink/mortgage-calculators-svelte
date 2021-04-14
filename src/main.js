import CalculatorContainer from "./calculators/CalculatorContainer.svelte";
import "./main.css";

const mortgageCalcTemplate = `
  <style>
    @import "https://anniemurphypaul.local/wp-content/plugins/mortgage-calculators-svelte/public/bundle.css?ver=all"
  </style>

`;

class MortgageCalcElement extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = mortgageCalcTemplate;
  }

  connectedCallback() {
    const defaultCalc = this.getAttribute("data-calc");
    const props = {
      company: "some company",
      showTabs: !Boolean(defaultCalc),
    };
    if (defaultCalc) {
      props.defaultCalc = defaultCalc;
    }

    new CalculatorContainer({
      target: this.shadowRoot,
      props,
    });
  }
}

window.customElements.define("mortgage-calculator", MortgageCalcElement);
