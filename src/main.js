import CalculatorContainer from "./calculators/CalculatorContainer.svelte";
import "./main.css";

const template = `
  <style >
    @import "${MC_Vars.globalStylesUrl}";
    @import "${MC_Vars.scopedStylesUrl}";
  </style>
`;
class MortgageCalculator extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = template;
  }
  connectedCallback() {
    const defaultCalculator = this.getAttribute("calc");
    const props = {
      company: "Warp Speed Mortgage",
      showTabs: !Boolean(defaultCalculator), // Only show tabs if no calculator is set as the default

      // style props
      //? at the moment these are not being used
      // containerMaxWidth: this.getAttribute("app-width") || "520px",
    };
    if (defaultCalculator) {
      props.defaultCalculator = defaultCalculator;
    }
    console.log(props);
    new CalculatorContainer({
      target: this.shadowRoot,
      props,
    });
  }
}

window.customElements.define("mortgage-calculator", MortgageCalculator);
