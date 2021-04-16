<script>
  import AffordabilityCalculatorIconGray from "../../icons/AffordabilityCalculatorIconGray.svelte";
  import IncomeRequiredCalculatorIconGray from "../../icons/IncomeRequiredCalculatorIconGray.svelte";
  import MortgagePaymentCalculatorIconGray from "../../icons/MortgagePaymentCalculatorIconGray.svelte";
  import RefinanceSavingsCalculatorIconGray from "../../icons/RefinanceSavingsCalculatorIconGray.svelte";

  import SelectButton from "./SelectButton.svelte";

  export let setActiveCalculator;
  export let activeCalculatorName;
</script>

<div class="">
  <header>
    <h2 class="">Select a Calculator</h2>
  </header>
  <div class="select-wrapper">
    <SelectButton
      calculatorName="MortgagePaymentCalculator"
      {activeCalculatorName}
      on:calcSet={(e) => setActiveCalculator("MortgagePaymentCalculator")}
    >
      <MortgagePaymentCalculatorIconGray slot="icon" />
      <div slot="name">Mortgage Payment</div>
    </SelectButton>

    <SelectButton
      calculatorName="IncomeRequiredCalculator"
      {activeCalculatorName}
      on:calcSet={() => setActiveCalculator("IncomeRequiredCalculator")}
    >
      <IncomeRequiredCalculatorIconGray slot="icon" />
      <div slot="name">Income Required</div>
    </SelectButton>

    <SelectButton
      calculatorName="AffordabilityCalculator"
      {activeCalculatorName}
      on:calcSet={() => setActiveCalculator("AffordabilityCalculator")}
    >
      <AffordabilityCalculatorIconGray slot="icon" />
      <div slot="name">Affordability</div>
    </SelectButton>

    <SelectButton
      calculatorName="RefinanceSavingsCalculator"
      {activeCalculatorName}
      on:calcSet={() => setActiveCalculator("RefinanceSavingsCalculator")}
    >
      <RefinanceSavingsCalculatorIconGray slot="icon" />
      <div slot="name">Refinance Savings</div>
    </SelectButton>
  </div>
</div>

<style lang="scss">
  header {
    background: var(--grey-300);
    padding: 1em 2rem;
    text-align: center;
  }
  h2 {
    font-size: 18px;
    color: var(--grey-600);
    margin: 0;
  }
  .select-wrapper {
    display: flex;
    justify-content: center;
  }
</style>
