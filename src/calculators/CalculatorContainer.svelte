<script>
  import AffordabilityCalculator from "./affordabilityCalculator/AffordabilityCalculator.svelte";
  import CalculatorSelect from "./CalculatorSelect.svelte";
  import IncomeRequiredCalculator from "./incomeRequiredCalculator/IncomeRequiredCalculator.svelte";
  import MortgagePaymentCalculator from "./mortgagePaymentCalculator/MortgagePaymentCalculator.svelte";
  import RefinanceSavingsCalculator from "./refinanceSavingsCalculator/RefinanceSavingsCalculator.svelte";

  let activeCalculator = MortgagePaymentCalculator;

  let calculators = {
    AffordabilityCalculator,
    IncomeRequiredCalculator,
    MortgagePaymentCalculator,
    RefinanceSavingsCalculator
  };

  function setActiveCalculator(calculator) {
    activeCalculator = calculators[calculator];
  }
</script>

<section aria-label="Mortgage Calculators" class="flex justify-center">
  <div class="container">
    <CalculatorSelect {setActiveCalculator} />
    <div class="lg:border lg:border-gray">
      <svelte:component this={activeCalculator} />
    </div>
  </div>
</section>
