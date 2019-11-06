<script>
  import { onMount } from "svelte";

  // fields
  let totalHomeLoanAmount = {
    value: "",
    touched: false,
    error: false,
    errorMessage: "Please enter the Total Home Loan Amount"
  };
  let annualInterestRate = {
    value: "",
    touched: false,
    error: false,
    errorMessage: "Please enter the Annual Interest Rate"
  };
  let termOfTheLoan = {
    value: "",
    touched: false,
    error: false,
    errorMessage: "Please enter the Term of the Loan"
  };

  onMount(() => {
    document
      .querySelector("#totalHomeLoanAmount")
      .addEventListener("input", function(e) {
        const currencyFormat = parseFloat(
          e.target.value
            .replace(/(.*){1}/, "0$1")
            .replace(/[^\d]/g, "")
            .replace(/(\d\d?)$/, ".$1")
        ).toLocaleString("en-US", {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2
        });

        e.target.value = `$${currencyFormat}`;
      });

    document
      .querySelector("#annualInterestRate")
      .addEventListener("input", function(e) {
        const val = (
          parseFloat(e.target.value.replace(/\D/g, "")) / 100
        ).toFixed(2);

        e.target.value = `${val}%`;
      });
  });
</script>

<div>
  <div class="px-16 py-8">
    <h2 class="text-black text-6xl font-medium mb-4">
      Mortgage Payment Calculator
    </h2>
    <h3 class="text-black text-4xl">Estimate Your Monthly Mortgage Payment</h3>
  </div>
  <div class="bg-gray-200 px-16 py-4">
    <div class="flex">
      <div>
        <label class="block" for="totalHomeLoanAmount">
          Total Home Loan Amount
        </label>
        <input
          type="text"
          id="totalHomeLoanAmount"
          name="totalHomeLoanAmount"
          bind:value={totalHomeLoanAmount.value}
          required />
      </div>
      <div>
        <label class="block" for="annualInterestRate">
          Annual Interest Rate
        </label>
        <input
          type="text"
          id="annualInterestRate"
          name="annualInterestRate"
          bind:value={annualInterestRate.value}
          required />
      </div>
    </div>
  </div>
</div>
