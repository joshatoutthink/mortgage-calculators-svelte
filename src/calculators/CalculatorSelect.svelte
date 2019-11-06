<script>
  import AffordabilityCalculatorIconGray from "../icons/AffordabilityCalculatorIconGray.svelte";
  import IncomeRequiredCalculatorIconGray from "../icons/IncomeRequiredCalculatorIconGray.svelte";
  import MortgagePaymentCalculatorIconGray from "../icons/MortgagePaymentCalculatorIconGray.svelte";
  import RefinanceSavingsCalculatorIconGray from "../icons/RefinanceSavingsCalculatorIconGray.svelte";

  export let activeCalculator;
  export let setActiveCalculator;
</script>

<div class="py-12">
  <h2 class="text-black text-5xl text-center font-medium">
    Select a Calculator
  </h2>
  <div class="flex items-center justify-between py-24">
    <div
      class="calculator-select-item flex flex-col items-center border-r
      border-gray-500 py-10 w-1/4 cursor-pointer"
      on:click={() => setActiveCalculator('MortgagePaymentCalculator')}>
      <div class="h-40">
        <MortgagePaymentCalculatorIconGray />
      </div>
      <div class="h-40 flex items-center">
        <p class="text-5xl text-center font-light mt-8 px-20">
          Mortgage Payment
        </p>
      </div>
    </div>
    <div
      class="calculator-select-item flex flex-col items-center border-r
      border-gray-500 py-10 w-1/4 cursor-pointer"
      on:click={() => setActiveCalculator('IncomeRequiredCalculator')}>
      <div class="h-40">
        <IncomeRequiredCalculatorIconGray />
      </div>
      <div class="h-40 flex items-center">
        <p class="text-5xl text-center font-light mt-8 px-20">
          Income Required
        </p>
      </div>
    </div>
    <div
      class="calculator-select-item flex flex-col items-center self-start py-10
      w-1/4 cursor-pointer">
      <div class="h-40">
        <AffordabilityCalculatorIconGray />
      </div>
      <div class="h-40 flex items-center">
        <p class="text-5xl text-center font-light mt-8 px-20">Affordability</p>
      </div>
    </div>
    <div
      class="calculator-select-item flex flex-col items-center border-l
      border-gray-500 py-10 w-1/4 cursor-pointer">
      <div class="h-40">
        <RefinanceSavingsCalculatorIconGray />
      </div>
      <div class="h-40 flex items-center">
        <p class="text-5xl text-center font-light mt-8 px-20">
          Refinance Savings
        </p>
      </div>
    </div>
  </div>
</div>
