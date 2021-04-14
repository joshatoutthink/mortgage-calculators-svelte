<script>
  // import input formatting functions
  import { formatCurrency, formatPercentage } from "../../util";
  // calculate payment function
  import calculateMortgagePayment from "./calculateMortgagePayment";
  // import calculator base layout components
  import CalculatorHeader from "../CalculatorHeader.svelte";
  // import disclaimer component
  import Disclaimer from "../Disclaimer.svelte";

  // company prop for passing to Disclaimer
  export let company;

  // fields
  let totalHomeLoanAmount = {
    value: "30000000",
    error: false,
    errorMessage: "Please enter a value",
  };
  let annualInterestRate = {
    value: "3.50",
    error: false,
    errorMessage: "Please enter a value",
  };
  let termOfTheLoan = {
    value: "30",
    error: false,
    errorMessage: "Please select the Term of the Loan",
  };
  let showAmortizationSchedule = false;

  // result values
  let payment = 0;
  let amortizationSchedule = {};

  // has result been calculated?
  let calculated = false;

  // reactive statement to format input values when they change
  $: {
    totalHomeLoanAmount.value = formatCurrency(totalHomeLoanAmount.value);
    annualInterestRate.value = formatPercentage(annualInterestRate.value);
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
      annualInterestRate.value === "0.00%"
    )
      return;

    calculated = true;

    const calculatedMortgagePayment = calculateMortgagePayment(
      totalHomeLoanAmount.value,
      annualInterestRate.value,
      termOfTheLoan.value
    );

    payment = calculatedMortgagePayment[0];
    amortizationSchedule = calculatedMortgagePayment[1];
  }
</script>

<div>
  <CalculatorHeader
    title="Mortgage Payment Calculator"
    subtitle="Estimate Your Monthly Mortgage Payment"
  />
  <form on:submit|preventDefault={setCalculatedAndCalculate}>
    <div class="bg-gray-custom px-16 py-8">
      <div class="flex flex-col text-center lg:flex-row lg:text-left lg:w-4/5">
        <div class="calculator-field lg:mr-16">
          <label for="totalHomeLoanAmount" class="block">
            Total Home Loan Amount
          </label>
          <input
            type="text"
            id="totalHomeLoanAmount"
            name="totalHomeLoanAmount"
            bind:value={totalHomeLoanAmount.value}
            class="mt-2"
            required
          />
          {#if totalHomeLoanAmount.error}
            <p class="text-red-500 text-2xl py-6">
              {totalHomeLoanAmount.errorMessage}
            </p>
          {:else}
            <p class="text-2xl py-6">&nbsp;</p>
          {/if}
        </div>
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
        <div>
          <label for="termOfTheLoan" class="block">Term of the Loan</label>
          <select
            id="termOfTheLoan"
            name="termOfTheLoan"
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
      <h3 class="text-4xl text-center px-16 lg:text-left">Loan Summary</h3>
      <div class="bg-gray-custom mt-10 py-4">
        <div
          class="flex flex-col justify-between px-16 py-8 lg:flex-row lg:w-4/5"
        >
          <div class="mb-20 lg:mb-0 lg:w-1/3">
            <p class="text-3xl text-center lg:text-4xl lg:text-left">
              Monthly Principal & Interest Payment
            </p>
            <p class="text-3xl font-light py-4">${payment}</p>
            <p class="text-2xl text-center font-light lg:text-left">
              (Insurance and taxes not included)
            </p>
          </div>
          <div class="lg:w-1/3">
            <p class="text-3xl text-center lg:text-4xl lg:text-left">
              Loan Amount
            </p>
            <p class="text-3xl font-light py-4">{totalHomeLoanAmount.value}</p>
          </div>
        </div>
        <div
          class="flex flex-col justify-between px-16 py-8 lg:flex-row lg:w-4/5"
        >
          <div class="mb-20 lg:mb-0 lg:w-1/3">
            <p class="text-3xl text-center lg:text-4xl lg:text-left">
              Interest Rate
            </p>
            <p class="text-3xl font-light py-4">{annualInterestRate.value}</p>
          </div>
          <div class="lg:w-1/3">
            <p class="text-3xl text-center lg:text-4xl lg:text-left">
              Term of the Loan
            </p>
            <p class="text-3xl font-light py-4">{termOfTheLoan.value} years</p>
          </div>
        </div>
        <div class="px-16">
          <input
            type="checkbox"
            id="showAmortizationSchedule"
            name="showAmortizationSchedule"
            bind:checked={showAmortizationSchedule}
          />
          <label for="showAmortizationSchedule">
            Show Amortization Schedule
          </label>
          <Disclaimer {company} />
        </div>
      </div>
      {#if showAmortizationSchedule}
        <div class="px-16 pt-10 pb-4">
          <h3 class="text-4xl text-center lg:text-left">
            Amortization Schedule
          </h3>
          <div
            class="mt-10 overflow-y-scroll lg:w-4/5"
            style="max-height: 500px;"
          >
            <table class="w-full">
              <thead>
                <tr class="text-white text-3xl">
                  <th class="bg-blue-500 p-4 sticky top-0 lg:p-0 lg:py-4">
                    Year
                  </th>
                  <th class="bg-blue-500 p-4 sticky top-0 lg:p-0 lg:py-4">
                    Month
                  </th>
                  <th class="bg-blue-500 p-4 sticky top-0 lg:p-0 lg:py-4">
                    Interest Payment
                  </th>
                  <th class="bg-blue-500 p-4 sticky top-0 lg:p-0 lg:py-4">
                    Principal Payment
                  </th>
                  <th class="bg-blue-500 p-4 sticky top-0 lg:p-0 lg:py-4">
                    Loan Balance
                  </th>
                </tr>
              </thead>
              <tbody>
                {#each amortizationSchedule as payment, i}
                  {#if i !== 0}
                    <tr
                      class="text-center text-3xl {i % 2 === 0
                        ? 'bg-gray-300'
                        : null}"
                    >
                      <td class="p-4 lg:p-0 lg:py-4">{payment.year}</td>
                      <td class="p-4 lg:p-0 lg:py-4">{payment.month}</td>
                      <td class="p-4 lg:p-0 lg:py-4">${payment.interest}</td>
                      <td class="p-4 lg:p-0 lg:py-4">${payment.principal}</td>
                      <td class="p-4 lg:p-0 lg:py-4">
                        ${payment.currentBalance}
                      </td>
                    </tr>
                  {/if}
                {/each}
              </tbody>
            </table>
          </div>
        </div>
      {/if}
    {/if}
  </div>
</div>
