<script>
  // import input formatting functions
  import { formatCurrency, formatPercentage } from "../../util";
  // calculate payment function
  import calculateMortgagePayment from "./calculateMortgagePayment";
  // import calculator base layout components
  import CalculatorHeader from "../CalculatorHeader.svelte";
  // import disclaimer component
  import Disclaimer from "../Disclaimer.svelte";
  import FormField from "../formElements/FormField.svelte";
  import SubmitButton from "../formElements/SubmitButton.svelte";
  import Calculator from "../Calculator.svelte";
  import Toggle from "../Toggle.svelte";

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

<CalculatorHeader
  title="Mortgage Payment Calculator"
  subtitle="Estimate Your Monthly Mortgage Payment"
/>
<Calculator on:showForm={() => (calculated = false)} showResults={calculated}>
  <form on:submit|preventDefault={setCalculatedAndCalculate} slot="form">
    <div class="group">
      <FormField
        id="totalHomeLoanAmount"
        field={totalHomeLoanAmount}
        label="Total Home Loan Amount"
      >
        <input
          slot="input"
          type="text"
          id="totalHomeLoanAmount"
          name="totalHomeLoanAmount"
          bind:value={totalHomeLoanAmount.value}
          class=""
          required
        />
      </FormField>

      <FormField
        label="Annual Interest Rate"
        id="annualInterestRate"
        field={annualInterestRate}
      >
        <input
          slot="input"
          type="text"
          id="annualInterestRate"
          name="annualInterestRate"
          bind:value={annualInterestRate.value}
          class=""
          required
        />
      </FormField>
    </div>
    <FormField
      label="Term of the Loan"
      id="termOfTheLoan"
      field={termOfTheLoan}
    >
      <select
        slot="input"
        id="termOfTheLoan"
        name="termOfTheLoan"
        bind:value={termOfTheLoan.value}
        class=""
        required
      >
        <option value="30" selected>30 Years</option>
        <option value="25">25 Years</option>
        <option value="20">20 Years</option>
        <option value="15">15 Years</option>
        <option value="10">10 Years</option>
        <option value="5">5 Years</option>
      </select>
    </FormField>

    <SubmitButton />
  </form>

  <div class="" slot="results">
    <div class="result-section">
      <h4 class="">Loan Summary</h4>
      <div class="result-grid">
        <div class="label">Monthly Principal & Interest Payment</div>
        <div class="value">
          ${payment}
          <small class="">(Insurance and taxes not included)</small>
        </div>

        <div class="label">Loan Amount</div>
        <div class="value">{totalHomeLoanAmount.value}</div>

        <div class="label">Interest Rate</div>
        <div class="value">{annualInterestRate.value}</div>

        <div class="label">Term of the Loan</div>
        <div class="value">{termOfTheLoan.value} years</div>
      </div>
    </div>
    <div class="result-section">
      <Toggle
        bind:isChecked={showAmortizationSchedule}
        toggleActiveColor="var(--orange)"
        toggleSize={10}
      >
        <span style="font-size:16px;"
          >{!showAmortizationSchedule ? "Show" : "Hide"} Amortization Schedule</span
        >
      </Toggle>

      {#if showAmortizationSchedule}
        <h4 class="">Amortization Schedule</h4>
        <div class="" style="max-height: 400px; overflow-y:scroll">
          <table class="">
            <thead>
              <tr class="">
                <th class="">Year</th>
                <th class="">Month</th>
                <th class="">Interest Payment</th>
                <th class="">Principal Payment</th>
                <th class="">Loan Balance</th>
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
                    <td class="">{payment.year}</td>
                    <td class="">{payment.month}</td>
                    <td class="">${payment.interest}</td>
                    <td class="">${payment.principal}</td>
                    <td class="">
                      ${payment.currentBalance}
                    </td>
                  </tr>
                {/if}
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
    </div>
    <div class="result-section">
      <Disclaimer {company} />
    </div>
  </div>
</Calculator>

<style lang="scss">
  small {
    display: block;
  }
  //TABLE STYLING
  table {
    border-collapse: collapse;
  }
  tr:nth-of-type(even) {
    background: var(--grey-300);

    td:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    td:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
  th {
    text-align: left;
    padding: 5px;
    background: var(--grey-400);
    font-size: 14px;
  }
  td {
    padding: 3px 5px;
  }
  thead th {
    position: sticky;
    top: 0;
  }
</style>
