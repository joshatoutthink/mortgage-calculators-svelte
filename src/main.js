import CalculatorContainer from "./calculators/CalculatorContainer.svelte";
import "./main.css";

const template = `
  <style >
    @import "https://anniemurphypaul.local/wp-content/plugins/mortgage-calculators-svelte/public/bundle.css";
    @import "https://anniemurphypaul.local/wp-content/plugins/mortgage-calculators-svelte/public/public/bundle.css";
  </style>
`;
class MortgageCalculator extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = template;
  }
  connectedCallback() {
    const defaultCalc = this.getAttribute("calc");
    const props = {
      company: "Warp Speed Mortgage",
      showTabs: !Boolean(defaultCalc), // Only show tabs if no calculator is set as the default

      // style props
      containerMaxWidth: this.getAttribute("app-width") || "520px",
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

window.customElements.define("mortgage-calculator", MortgageCalculator);
