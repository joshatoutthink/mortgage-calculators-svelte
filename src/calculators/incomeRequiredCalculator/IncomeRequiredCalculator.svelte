<script>
  // import input formatting functions
  import { formatCurrency, formatPercentage } from "../../util";
  // calculate income required function
  import calculateIncomeRequired from "./calculateIncomeRequired";
  // import calculator base layout components
  import CalculatorHeader from "../CalculatorHeader.svelte";
  // import disclaimer component
  import Disclaimer from "../Disclaimer.svelte";

  // fields
  let totalHomeLoanAmount = {
    value: "",
    error: false,
    errorMessage: "Please enter a value"
  };
  let annualInterestRate = {
    value: "0",
    error: false,
    errorMessage: "Please enter a value"
  };
  let termOfTheLoan = {
    value: "30",
    error: false,
    errorMessage: "Please select the Term of the Loan"
  };
  let annualRealEstateTaxes = {
    value: "",
    error: false,
    errorMessage: "Please enter a value"
  };
  let monthlyDebtObligations = {
    value: "",
    error: false,
    errorMessage: "Please enter a value"
  };

  // result value
  let requiredSalary = 0;

  // has result been calculated?
  let calculated = false;

  // reactive statement to format input values when they change
  $: {
    totalHomeLoanAmount.value = formatCurrency(totalHomeLoanAmount.value);
    annualInterestRate.value = formatPercentage(annualInterestRate.value);
    annualRealEstateTaxes.value = formatCurrency(annualRealEstateTaxes.value);
    monthlyDebtObligations.value = formatCurrency(monthlyDebtObligations.value);
  }

  // do required fields have a value?
  $: if (totalHomeLoanAmount.value !== "$0.00")
    totalHomeLoanAmount.error = false;

  $: if (annualInterestRate.value !== "0.00%") annualInterestRate.error = false;

  function setCalculatedAndCalculate() {
    if (totalHomeLoanAmount.value === "$0.00") totalHomeLoanAmount.error = true;

    if (annualInterestRate.value === "0.00%") annualInterestRate.error = true;

    if (
      totalHomeLoanAmount.value === "$0.00" ||
      annualInterestRate.value === "$0.00"
    )
      return;

    calculated = true;

    requiredSalary = calculateIncomeRequired(
      totalHomeLoanAmount.value,
      annualInterestRate.value,
      termOfTheLoan.value,
      annualRealEstateTaxes.value,
      monthlyDebtObligations.value
    );
  }
</script>

<div>
  <CalculatorHeader
    title="Income Required Calculator"
    subtitle="Calculate How Much You Need to Earn to Afford Your Dream Home" />
  <form on:submit|preventDefault={setCalculatedAndCalculate}>
    <div class="bg-gray-custom px-16 py-4">
      <div class="flex flex-wrap w-4/5">
        <div class="calculator-field mr-16">
          <label for="totalHomeLoanAmount" class="block">
            Total Home Loan Amount
          </label>
          <input
            type="text"
            id="totalHomeLoanAmount"
            name="totalHomeLoanAmount"
            bind:value={totalHomeLoanAmount.value}
            class="mt-2"
            required />
          {#if totalHomeLoanAmount.error}
            <p class="text-red-500 text-2xl py-6">
              {totalHomeLoanAmount.errorMessage}
            </p>
          {:else}
            <p class="text-2xl py-6">&nbsp;</p>
          {/if}
        </div>
        <div class="calculator-field mr-16">
          <label for="annualInterestRate" class="block">
            Annual Interest Rate
          </label>
          <input
            type="text"
            id="annualInterestRate"
            name="annualInterestRate"
            bind:value={annualInterestRate.value}
            class="mt-2"
            required />
          {#if annualInterestRate.error}
            <p class="text-red-500 text-2xl py-6">
              {annualInterestRate.errorMessage}
            </p>
          {:else}
            <p class="text-2xl py-6">&nbsp;</p>
          {/if}
        </div>
        <div>
          <label for="termOfTheLoan" class="block">Term of the Loan</label>
          <select
            name="termOfTheLoan"
            id="termOfTheLoan"
            bind:value={termOfTheLoan.value}
            class="mt-2"
            required>
            <option value="30" selected>30 Years</option>
            <option value="25">25 Years</option>
            <option value="20">20 Years</option>
            <option value="15">15 Years</option>
            <option value="10">10 Years</option>
            <option value="5">5 Years</option>
          </select>
        </div>
        <div class="calculator-field mr-16">
          <label for="annualRealEstateTaxes" class="block">
            Annual Real Estate Taxes
          </label>
          <input
            type="text"
            id="annualRealEstateTaxes"
            name="annualRealEstateTaxes"
            bind:value={annualRealEstateTaxes.value}
            class="mt-2"
            required />
        </div>
        <div class="calculator-field mr-16">
          <label for="monthlyDebtObligations" class="block">
            Monthly Debt Obligations
          </label>
          <input
            type="text"
            id="monthlyDebtObligations"
            name="monthlyDebtObligations"
            bind:value={monthlyDebtObligations.value}
            class="mt-2"
            required />
        </div>
      </div>
    </div>
    <div class="px-16">
      <div
        class="flex items-center justify-center border-b border-gray-500 py-10
        w-4/5">
        <div class="btn-outer border-red-button">
          <input
            type="submit"
            value="Calculate"
            class="btn btn-action bg-red-button w-full" />
        </div>
      </div>
    </div>
  </form>

  <div class="mt-10">
    {#if calculated}
      <div class="bg-gray-custom mt-10 py-4">
        <div class="px-16 py-8 w-4/5">
          <p class="text-4xl">Required Salary</p>
          <p class="text-3xl font-light py-4">${requiredSalary}</p>
          <Disclaimer />
        </div>
      </div>
    {/if}
  </div>
</div>
