<script>
  import MortgagePaymentCalculator from "./MortgagePaymentCalculator.svelte";

  let activeCalculator = MortgagePaymentCalculator;
</script>

<section aria-label="Mortgage Calculators" class="flex justify-center">
  <div class="container">
    <div class="border border-gray">
      <svelte:component this={activeCalculator} />
    </div>
  </div>
</section>
