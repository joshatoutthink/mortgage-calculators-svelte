<script>
  import CalculatorSelect from "./CalculatorSelect.svelte";
  import AffordabilityCalculator from "./affordabilityCalculator/AffordabilityCalculator.svelte";
  import IncomeRequiredCalculator from "./incomeRequiredCalculator/IncomeRequiredCalculator.svelte";
  import MortgagePaymentCalculator from "./mortgagePaymentCalculator/MortgagePaymentCalculator.svelte";
  import RefinanceSavingsCalculator from "./refinanceSavingsCalculator/RefinanceSavingsCalculator.svelte";

  export let company;
  export let defaultCalculator = "RefinanceSavingsCalculator";
  export let showTabs = true;

  let calculators = {
    AffordabilityCalculator,
    IncomeRequiredCalculator,
    MortgagePaymentCalculator,
    RefinanceSavingsCalculator,
  };
  let activeCalculator = calculators[defaultCalculator];
  console.log(activeCalculator, defaultCalculator);
  function setActiveCalculator(calculator) {
    activeCalculator = calculators[calculator];
  }
</script>

<section aria-label="Mortgage Calculators" class="flex justify-center">
  <div class="container">
    {#if showTabs}
      <CalculatorSelect {setActiveCalculator} />
    {/if}
    <div class="lg:border lg:border-gray">
      <svelte:component this={activeCalculator} {company} />
    </div>
  </div>
</section>
