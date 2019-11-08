<script>
  // import input formatting functions
  import { formatCurrency, formatMonths, formatPercentage } from "../../util";
  // calculate refinance savings function
  import calculateRefinanceSavings from "./calculateRefinanceSavings";
  // import calculator base layout components
  import CalculatorHeader from "../CalculatorHeader.svelte";
  // import disclaimer component
  import Disclaimer from "../Disclaimer.svelte";

  // fields
  let originalInterestRate = {
    value: "0",
    error: false,
    errorMessage: "Please enter a value"
  };
  let originalLoanAmount = {
    value: "",
    error: false,
    errorMessage: "Please enter a value"
  };
  let originalLoanTerm = {
    value: "30",
    error: false,
    errorMessage: "Please select a loan term"
  };
  let timeLeftToPayOnOriginalLoan = {
    value: "",
    error: false,
    errorMessage: "Please enter a value"
  };
  let newInterestRate = {
    value: "0",
    error: false,
    errorMessage: "Please enter a value"
  };
  let newLoanAmount = {
    value: "",
    error: false,
    errorMessage: "Please enter a value"
  };
  let newLoanTerm = {
    value: "30",
    error: false,
    errorMessage: "Please select a loan term"
  };

  // result values
  let oldLoanValues = {
    monthlyPayment: "",
    remainingLoanBalance: "",
    remainingTotalCost: ""
  };
  let newLoanValues = {
    monthlyPayment: "",
    monthlySavings: "",
    totalCost: ""
  };
  let totalSavings = "";

  // has the result been calculated?
  let calculated = false;

  // reactive statement to format input values when they change
  $: {
    originalInterestRate.value = formatPercentage(originalInterestRate.value);
    originalLoanAmount.value = formatCurrency(originalLoanAmount.value);
    // timeLeftToPayOnOriginalLoan.value = formatMonths(
    //   timeLeftToPayOnOriginalLoan.value
    // );
    newInterestRate.value = formatPercentage(newInterestRate.value);
    newLoanAmount.value = formatCurrency(newLoanAmount.value);
  }

  // do required fields have a value?
  $: if (originalInterestRate.value !== "0.00%")
    originalInterestRate.error = false;

  $: if (originalLoanAmount.value !== "$0.00") originalLoanAmount.error = false;

  $: if (timeLeftToPayOnOriginalLoan.value !== "")
    timeLeftToPayOnOriginalLoan.error = false;

  $: if (newInterestRate.value !== "0.00%") newInterestRate.error = false;

  $: if (newLoanAmount.value !== "$0.00") newLoanAmount.error = false;

  function setCalculatedAndCalculate() {
    if (originalInterestRate.value === "0.00%")
      originalInterestRate.error = true;

    if (originalLoanAmount.value === "$0.00") originalLoanAmount.error = true;

    if (timeLeftToPayOnOriginalLoan.value === "")
      timeLeftToPayOnOriginalLoan.error = true;

    if (newInterestRate.value === "0.00%") newInterestRate.error = true;

    if (newLoanAmount.value === "$0.00") newLoanAmount.error = true;

    if (
      originalInterestRate.value === "0.00%" ||
      originalLoanAmount.value === "$0.00" ||
      timeLeftToPayOnOriginalLoan.value === "" ||
      newInterestRate.value === "0.00%" ||
      newLoanAmount.value === "$0.00"
    )
      return;

    calculated = true;

    const calculatedRefinanceSavings = calculateRefinanceSavings(
      originalInterestRate.value,
      originalLoanAmount.value,
      originalLoanTerm.value,
      timeLeftToPayOnOriginalLoan.value,
      newInterestRate.value,
      newLoanAmount.value,
      newLoanTerm.value
    );

    oldLoanValues = calculatedRefinanceSavings[0];
    newLoanValues = calculatedRefinanceSavings[1];
    totalSavings = calculatedRefinanceSavings[2];
  }
</script>

<div>
<CalculatorHeader title="Refinance Savings Calculator" subtitle="Calculate How Much You Will Save By Refinancing" />
  <form on:submit|preventDefault={setCalculatedAndCalculate}>
    <div class="bg-gray-custom px-16 py-4">
      <div class="flex flex-wrap w-4/5">
        <div class="calculator-field mr-16">
          <label for="originalInterestRate" class="block">
            Original Interest Rate
          </label>
          <input
            type="text"
            id="originalInterestRate"
            name="originalInterestRate"
            bind:value={originalInterestRate.value}
            class="mt-2"
            required />
          {#if originalInterestRate.error}
            <p class="text-red-500 text-2xl py-6">
              {originalInterestRate.errorMessage}
            </p>
          {:else}
            <p class="text-2xl py-6">&nbsp;</p>
          {/if}
        </div>
        <div class="calculator-field mr-16">
          <label for="originalLoanAmount" class="block">
            Original Loan Amount
          </label>
          <input
            type="text"
            id="originalLoanAmount"
            name="originalLoanAmount"
            bind:value={originalLoanAmount.value}
            class="mt-2"
            required />
          {#if originalLoanAmount.error}
            <p class="text-red-500 text-2xl py-6">
              {originalLoanAmount.errorMessage}
            </p>
          {:else}
            <p class="text-2l py-6">&nbsp;</p>
          {/if}
        </div>
        <div>
          <label for="originalLoanTerm" class="block">Original Loan Term</label>
          <select
            name="originalLoanTerm"
            id="originalLoanTerm"
            bind:value={originalLoanTerm.value}
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
          <label for="timeLeftToPayOnOriginalLoan" class="block">
            Time Left to Pay on Original Loan
          </label>
          <input
            type="text"
            id="timeLeftToPayOnOriginalLoan"
            name="timeLeftToPayOnOriginalLoan"
            bind:value={timeLeftToPayOnOriginalLoan.value}
            class="mt-2"
            required />
          {#if timeLeftToPayOnOriginalLoan.error}
            <p class="text-red-500 text-2xl py-6">
              {timeLeftToPayOnOriginalLoan.errorMessage}
            </p>
          {:else}
            <p class="text-2xl py-6">&nbsp;</p>
          {/if}
        </div>
        <div class="calculator-field mr-16">
          <label for="newInterestRate" class="block">New Interest Rate</label>
          <input
            type="text"
            id="newInterestRate"
            name="newInterestRate"
            bind:value={newInterestRate.value}
            class="mt-2"
            required />
          {#if newInterestRate.error}
            <p class="text-red-500 text-2xl py-6">
              {newInterestRate.errorMessage}
            </p>
          {:else}
            <p class="text-2xl py-6">&nbsp;</p>
          {/if}
        </div>
        <div>
          <label for="newLoanAmount" class="block">New Loan Amount</label>
          <input
            type="text"
            id="newLoanAmount"
            name="newLoanAmount"
            bind:value={newLoanAmount.value}
            class="mt-2"
            required />
          {#if newLoanAmount.error}
            <p class="text-red-500 text-2xl py-6">
              {newLoanAmount.errorMessage}
            </p>
          {:else}
            <p class="text-2xl py-6">&nbsp;</p>
          {/if}
        </div>
        <div>
          <label for="newLoanTerm" class="block">New Loan Term</label>
          <select
            name="newLoanTerm"
            id="newLoanTerm"
            bind:value={newLoanTerm.value}
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
      <div class="mt-10 py-12">
        <p class="text-5xl px-16">Old Loan</p>
        <div class="bg-gray-custom px-16 w-4/5">
          <div class="flex items-center pt-10 pb-16">
            <div class="w-1/3">
              <p class="text-4xl">Monthly Payment</p>
              <p class="text-3xl font-light">${oldLoanValues.monthlyPayment}</p>
            </div>
            <div class="w-1/3">
              <p class="text-4xl">Remaining Loan Balance</p>
              <p class="text-3xl font-light">
                ${oldLoanValues.remainingBalance}
              </p>
            </div>
            <div class="w-1/3">
              <p class="text-4xl">Remaining Total Cost</p>
              <p class="text-3xl font-light">${oldLoanValues.remainingTotal}</p>
            </div>
          </div>
        </div>

        <p class="text-5xl px-16 pt-8">New Loan</p>
        <div class="bg-gray-custom px-16 pb-8 w-4/5">
          <div class="flex items-center pt-10 pb-8">
            <div class="w-1/3">
              <p class="text-4xl">Monthly Payment</p>
              <p class="text-3xl font-light">${newLoanValues.monthlyPayment}</p>
            </div>
            <div class="w-1/3">
              <p class="text-4xl">Monthly Savings</p>
              <p class="text-3xl font-light">${newLoanValues.monthlySavings}</p>
            </div>
            <div class="w-1/3">
              <p class="text-4xl">Remaining Total Cost</p>
              <p class="text-3xl font-light">${newLoanValues.totalCost}</p>
            </div>
          </div>
          <div class="text-center pt-8">
            <p class="text-4xl">Total Savings</p>
            <p class="text-3xl font-light">${totalSavings}</p>
          </div>
        </div>
        <div class="px-16">
          <Disclaimer />
        </div>
      </div>
    {/if}
  </div>
</div>
