<script>
  import CalculatorSelect from "./CalculatorSelect/CalculatorSelect.svelte";
  import AffordabilityCalculator from "./affordabilityCalculator/AffordabilityCalculator.svelte";
  import IncomeRequiredCalculator from "./incomeRequiredCalculator/IncomeRequiredCalculator.svelte";
  import MortgagePaymentCalculator from "./mortgagePaymentCalculator/MortgagePaymentCalculator.svelte";
  import RefinanceSavingsCalculator from "./refinanceSavingsCalculator/RefinanceSavingsCalculator.svelte";

  export let company;
  export let defaultCalculator = "MortgagePaymentCalculator";
  export let showTabs = true;

  let calculators = {
    AffordabilityCalculator,
    IncomeRequiredCalculator,
    MortgagePaymentCalculator,
    RefinanceSavingsCalculator,
  };
  let activeCalculator = calculators[defaultCalculator];
  let activeCalculatorName = defaultCalculator;

  function setActiveCalculator(calculator) {
    activeCalculatorName = calculator;
    activeCalculator = calculators[calculator];
  }
</script>

<section aria-label="Mortgage Calculators" class="">
  <div class="">
    {#if showTabs}
      <CalculatorSelect {setActiveCalculator} {activeCalculatorName} />
    {/if}
    <div class="calc-wrapper">
      <svelte:component this={activeCalculator} {company} />
    </div>
  </div>
</section>

<style lang="scss">
  section {
    max-width: 520px;
    min-height: 100%;
    background: var(--grey-200);
  }
  :global(*) {
    box-sizing: border-box;
  }
  :global(.group) {
    display: flex;
    gap: 20px;
    align-items: stretch;
    @media(max-width:400px){
      display:block;
    }
  }
  :global(form) {
    padding: 20px;
    background: var(--grey-200);
    height: 100%;
  }
  :global(input),
  :global(select) {
    border: 1px solid var(--grey-400);
    border-radius: 5px;
    margin-top: 8px;
    font-size: 16px;
    line-height: 1.5;
    padding: 8px 12px;
    box-shadow: 0 0 #000000, 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    width: 100%;
    @media (min-width: 762px) {
      font-size: 14px;
    }
  }
  :global(select) {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23333333' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
    padding-right: 2.5rem;
    -webkit-print-color-adjust: exact;
    color-adjust: exac;
    appearance: none;
  }
</style>
