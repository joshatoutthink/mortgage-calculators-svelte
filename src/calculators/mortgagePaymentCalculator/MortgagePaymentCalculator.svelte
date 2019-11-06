<script>
  // calculate payment function
  import calculateMortgagePayment from "./calculateMortgagePayment";

  // fields
  let totalHomeLoanAmount = {
    value: "",
    touched: false,
    error: false,
    errorMessage: "Please enter a value"
  };
  let annualInterestRate = {
    value: "0",
    touched: false,
    error: false,
    errorMessage: "Please enter a value"
  };
  let termOfTheLoan = {
    value: "30",
    touched: false,
    error: false,
    errorMessage: "Please select the Term of the Loan"
  };

  // result value
  let payment = 0;

  // has result been calculated?
  let calculated = false;

  function formatCurrency(value) {
    const currencyFormat = parseFloat(
      value
        .replace(/(.*){1}/, "0$1")
        .replace(/[^\d]/g, "")
        .replace(/(\d\d?)$/, ".$1")
    ).toLocaleString("en-US", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    });
    value = `$${currencyFormat}`;

    return value;
  }

  function formatPercentage(value) {
    const percentValue = (parseFloat(value.replace(/\D/g, "")) / 100).toFixed(
      2
    );
    value = `${percentValue}%`;

    return value;
  }

  // reactive statement to format input values when they change
  $: {
    totalHomeLoanAmount.value = formatCurrency(totalHomeLoanAmount.value);
    annualInterestRate.value = formatPercentage(annualInterestRate.value);
  }

  $: if (totalHomeLoanAmount.value !== "$0.00") {
    totalHomeLoanAmount.error = false;
  }

  $: if (annualInterestRate.value !== "0.00%") {
    annualInterestRate.error = false;
  }

  function setCalculatedAndCalculate() {
    if (totalHomeLoanAmount.value === "$0.00") {
      totalHomeLoanAmount.error = true;
    }

    if (annualInterestRate.value === "0.00%") {
      annualInterestRate.error = true;
    }

    if (
      totalHomeLoanAmount.value === "$0.00" ||
      annualInterestRate.value === "0.00%"
    )
      return;

    calculated = true;

    const calculatedPayment = calculateMortgagePayment(
      totalHomeLoanAmount.value,
      annualInterestRate.value,
      termOfTheLoan.value
    );

    payment = calculatedPayment;
  }
</script>

<div>
  <div class="px-16 py-8">
    <h2 class="text-black text-6xl font-medium mb-4">
      Mortgage Payment Calculator
    </h2>
    <h3 class="text-black text-4xl">Estimate Your Monthly Mortgage Payment</h3>
  </div>
  <form on:submit|preventDefault={setCalculatedAndCalculate}>
    <div class="bg-gray-custom px-16 py-4">
      <div class="flex w-2/3">
        <div class="mr-16">
          <label class="block" for="totalHomeLoanAmount">
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
        <div class="mr-16">
          <label class="block" for="annualInterestRate">
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
          <label class="block" for="termOfTheLoan">Term of the Loan</label>
          <select
            id="termOfTheLoan"
            name="termOfTheLoan"
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
      </div>
    </div>
    <div class="px-16">
      <div
        class="flex items-center justify-center border-b border-gray-500 py-10
        w-2/3">
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
      <h3 class="text-4xl px-16">Loan Summary</h3>
      <div class="bg-gray-custom mt-10 py-4">
        <div class="flex px-16 py-8">
          <div class="w-1/3">
            <p class="text-3xl">Monthly Principal & Interest Payment</p>
            <p class="text-3xl font-light py-4">${payment}</p>
            <p class="text-2xl font-light">
              (Insurance and taxes not included)
            </p>
          </div>
          <div class="w-1/3">
            <p class="text-3xl">Loan Amount</p>
            <p class="text-3xl font-light py-4">{totalHomeLoanAmount.value}</p>
          </div>
        </div>
        <div class="flex px-16 py-8">
          <div class="w-1/3">
            <p class="text-3xl">Interest Rate</p>
            <p class="text-3xl font-light py-4">{annualInterestRate.value}</p>
          </div>
          <div class="w-1/3">
            <p class="text-3xl">Term of the Loan</p>
            <p class="text-3xl font-light py-4">{termOfTheLoan.value} years</p>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>
