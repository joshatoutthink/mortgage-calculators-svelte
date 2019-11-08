<script>
  import AffordabilityCalculatorIconGray from "../icons/AffordabilityCalculatorIconGray.svelte";
  import IncomeRequiredCalculatorIconGray from "../icons/IncomeRequiredCalculatorIconGray.svelte";
  import MortgagePaymentCalculatorIconGray from "../icons/MortgagePaymentCalculatorIconGray.svelte";
  import RefinanceSavingsCalculatorIconGray from "../icons/RefinanceSavingsCalculatorIconGray.svelte";

  export let setActiveCalculator;
</script>

<div class="py-12">
  <h2 class="text-black text-5xl text-center font-medium">
    Select a Calculator
  </h2>
  <div class="flex flex-wrap items-center justify-between py-8 lg:py-24">
    <div
      class="calculator-select-item flex flex-col items-center border-t border-r
      border-gray-500 py-10 w-1/2 cursor-pointer lg:border-t-0 lg:w-1/4"
      on:click={() => setActiveCalculator('MortgagePaymentCalculator')}>
      <div class="h-32 lg:h-40">
        <MortgagePaymentCalculatorIconGray />
      </div>
      <div class="h-24 flex items-center lg:h-40">
        <p
          class="text-3xl text-center font-medium mt-8 px-20 lg:text-5xl
          lg:font-light">
          Mortgage Payment
        </p>
      </div>
    </div>
    <div
      class="calculator-select-item flex flex-col items-center border-t border-r
      border-gray-500 py-10 w-1/2 cursor-pointer lg:border-t-0 lg:w-1/4"
      on:click={() => setActiveCalculator('IncomeRequiredCalculator')}>
      <div class="h-32 lg:h-40">
        <IncomeRequiredCalculatorIconGray />
      </div>
      <div class="h-24 flex items-center lg:h-40">
        <p
          class="text-3xl text-center font-medium mt-8 px-20 lg:text-5xl
          lg:font-light lg:mt-8 lg:px-20">
          Income Required
        </p>
      </div>
    </div>
    <div
      class="calculator-select-item flex flex-col items-center self-start
      border-t border-r border-b border-gray-500 py-10 w-1/2 cursor-pointer
      lg:border-t-0 border-r-0 lg:border-b-0 lg:w-1/4"
      on:click={() => setActiveCalculator('AffordabilityCalculator')}>
      <div class="h-32 lg:h-40">
        <AffordabilityCalculatorIconGray />
      </div>
      <div class="h-24 flex items-center lg:h-40">
        <p
          class="text-3xl text-center font-medium mt-8 px-20 lg:text-5xl
          lg:font-light lg:mt-8 lg:px-20">
          Affordability
        </p>
      </div>
    </div>
    <div
      class="calculator-select-item flex flex-col items-center border-t border-b
      border-gray-500 py-10 w-1/2 cursor-pointer lg:border-t-0 lg:border-b-0
      lg:border-l lg:w-1/4"
      on:click={() => setActiveCalculator('RefinanceSavingsCalculator')}>
      <div class="h-32 lg:h-40">
        <RefinanceSavingsCalculatorIconGray />
      </div>
      <div class="h-24 flex items-center lg:h-40">
        <p
          class="text-3xl text-center font-medium mt-8 px-20 lg:text-5xl
          lg:font-light lg:mt-8 lg:px-20">
          Refinance Savings
        </p>
      </div>
    </div>
  </div>
</div>
