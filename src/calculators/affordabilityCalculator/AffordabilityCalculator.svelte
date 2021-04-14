<script>
  // import input formatting functions
  import { formatCurrency, formatPercentage } from "../../util";
  // calculate payment function
  import calculateAffordability from "./calculateAffordability";
  // import calculator base layout components
  import CalculatorHeader from "../CalculatorHeader.svelte";
  // import disclaimer component
  import Disclaimer from "../Disclaimer.svelte";

  // company prop for passing to Disclaimer
  export let company;

  // fields
  let annualInterestRate = {
    value: "3.50",
    touched: false,
    error: false,
    errorMessage: "Please enter a value",
  };
  let termOfTheLoan = {
    value: "30",
    touched: false,
    error: false,
    errorMessage: "Please select the Term of the Loan",
  };
  let annualRealEstateTaxes = {
    value: "100000",
    touched: false,
    error: false,
    errorMessage: "Please enter a value",
  };
  let annualHomeownersInsurance = {
    value: "100000",
    touched: false,
    error: false,
    errorMessage: "Please enter a value",
  };
  let grossAnnualIncome = {
    value: "5000000",
    touched: false,
    error: false,
    errorMessage: "Please enter a value",
  };
  let monthlyDebtObligations = {
    value: "50000",
    touched: false,
    error: false,
    errorMessage: "Please enter a value",
  };

  // result values
  let maximumMonthlyMortgagePayment = 0;
  let maximumLoanAmount = 0;

  // has the result been calculated?
  let calculated = false;

  // reactive statement to format input values when they change
  $: {
    annualInterestRate.value = formatPercentage(annualInterestRate.value);
    annualRealEstateTaxes.value = formatCurrency(annualRealEstateTaxes.value);
    annualHomeownersInsurance.value = formatCurrency(
      annualHomeownersInsurance.value
    );
    grossAnnualIncome.value = formatCurrency(grossAnnualIncome.value);
    monthlyDebtObligations.value = formatCurrency(monthlyDebtObligations.value);
  }

  // do required fields have a value?
  $: if (annualInterestRate.value !== "0.00%") annualInterestRate.error = false;

  $: if (grossAnnualIncome.value !== "$0.00") grossAnnualIncome.error = false;

  function setCalculatedAndCalculate() {
    if (annualInterestRate.value === "0.00%") annualInterestRate.error = true;

    if (grossAnnualIncome.value === "$0.00") grossAnnualIncome.error = true;

    if (
      annualInterestRate.value === "0.00%" ||
      grossAnnualIncome.value === "$0.00"
    )
      return;

    calculated = true;

    const calculatedAffordability = calculateAffordability(
      annualInterestRate.value,
      termOfTheLoan.value,
      annualRealEstateTaxes.value,
      annualHomeownersInsurance.value,
      grossAnnualIncome.value,
      monthlyDebtObligations.value
    );

    maximumMonthlyMortgagePayment = calculatedAffordability[0];
    maximumLoanAmount = calculatedAffordability[1];
  }
</script>

<div>
  <CalculatorHeader
    title="Affordability Calculator"
    subtitle="Calculate How Much You Can Borrow"
  />
  <form on:submit|preventDefault={setCalculatedAndCalculate}>
    <div class="bg-gray-custom px-16 py-8">
      <div
        class="flex flex-col text-center lg:flex-row lg:flex-wrap lg:text-left
        lg:w-4/5"
      >
        <div class="calculator-field lg:mr-16">
          <label for="annualInterestRate" class="block">
            Annual Interest Rate
          </label>
          <input
            type="text"
            id="annualInterestRate"
            name="annualInterestRate"
            bind:value={annualInterestRate.value}
            class="mt-2"
            required
          />
          {#if annualInterestRate.error}
            <p class="text-red-500 text-2xl py-6">
              {annualInterestRate.errorMessage}
            </p>
          {:else}
            <p class="text-2xl py-6">&nbsp;</p>
          {/if}
        </div>
        <div class="calculator-field mb-12 lg:mr-16 lg:mb-0">
          <label for="termOfTheLoan" class="block">Term of the Loan</label>
          <select
            name="termOfTheLoan"
            id="termOfTheLoan"
            bind:value={termOfTheLoan.value}
            class="mt-2"
            required
          >
            <option value="30" selected>30 Years</option>
            <option value="25">25 Years</option>
            <option value="20">20 Years</option>
            <option value="15">15 Years</option>
            <option value="10">10 Years</option>
            <option value="5">5 Years</option>
          </select>
          <p class="text-2xl py-6">&nbsp;</p>
        </div>
        <div class="calculator-field mb-12 lg:mr-16 lg:mb-0">
          <label for="annualRealEstateTaxes" class="block">
            Annual Real Estate Taxes
          </label>
          <input
            type="text"
            id="annualRealEstateTaxes"
            name="annualRealEstateTaxes"
            bind:value={annualRealEstateTaxes.value}
            class="mt-2"
            required
          />
        </div>
        <div class="calculator-field mb-12 lg:mr-16 lg:mb-0">
          <label for="annualHomeownersInsurance" class="block">
            Annual Homeowners Insurance
          </label>
          <input
            type="text"
            id="annualHomeownersInsurance"
            name="annualHomeownersInsurance"
            bind:value={annualHomeownersInsurance.value}
            class="mt-2"
            required
          />
          <p class="text-2xl py-6">&nbsp;</p>
        </div>
        <div class="calculator-field lg:mr-16">
          <label for="grossAnnualIncome" class="block">
            Gross Annual Income
          </label>
          <input
            type="text"
            id="grossAnnualIncome"
            name="grossAnnualIncome"
            bind:value={grossAnnualIncome.value}
            class="mt-2"
            required
          />
          {#if grossAnnualIncome.error}
            <p class="text-red-500 text-2xl py-6">
              {grossAnnualIncome.errorMessage}
            </p>
          {:else}
            <p class="text-2xl py-6">&nbsp;</p>
          {/if}
        </div>
        <div>
          <label for="monthlyDebtObligations" class="block">
            Monthly Debt Obligations
          </label>
          <input
            type="text"
            id="monthlyDebtObligations"
            name="monthlyDebtObligations"
            bind:value={monthlyDebtObligations.value}
            class="mt-2"
            required
          />
        </div>
      </div>
    </div>
    <div class="px-16">
      <div
        class="flex items-center justify-center border-b border-gray-500 py-10
        lg:w-4/5"
      >
        <div class="btn-outer border-red-button">
          <input
            type="submit"
            value="Calculate"
            class="btn btn-action bg-red-button w-full"
          />
        </div>
      </div>
    </div>
  </form>

  <div class="mt-10">
    {#if calculated}
      <div class="bg-gray-custom mt-10 py-4">
        <div
          class="flex flex-col justify-between px-16 py-8 lg:flex-row lg:w-4/5"
        >
          <div class="mb-20 lg:mb-0">
            <p class="text-3xl text-center lg:text-4xl lg:text-left">
              Maximum Monthly Mortgage Payment
            </p>
            <p class="text-3xl font-light py-4">
              ${maximumMonthlyMortgagePayment}
            </p>
          </div>
          <div>
            <p class="text-3xl text-center lg:text-4xl lg:text-left">
              Maximum Loan Amount
            </p>
            <p class="text-3xl font-light py-4">${maximumLoanAmount}</p>
          </div>
        </div>
        <div class="px-16">
          <Disclaimer {company} />
        </div>
      </div>
    {/if}
  </div>
</div>
