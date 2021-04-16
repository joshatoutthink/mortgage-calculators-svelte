<script>
  import FormField from "../formElements/FormField.svelte";
  import SubmitButton from "../formElements/SubmitButton.svelte";

  // import input formatting functions
  import {
    formatCurrency,
    formatMonths,
    formatPercentage,
    setCursorPosition,
  } from "../../util";
  // calculate refinance savings function
  import calculateRefinanceSavings from "./calculateRefinanceSavings";
  // import calculator base layout components
  import CalculatorHeader from "../CalculatorHeader.svelte";
  // import disclaimer component
  import Disclaimer from "../Disclaimer.svelte";
  import Calculator from "../Calculator.svelte";
  // company prop for passing to Disclaimer
  export let company;

  // fields
  let originalInterestRate = {
    value: "3.50",
    error: false,
    errorMessage: "Please enter a value",
  };
  let originalLoanAmount = {
    value: "30000000",
    error: false,
    errorMessage: "Please enter a value",
  };
  let originalLoanTerm = {
    value: "30",
    error: false,
    errorMessage: "Please select a loan term",
  };
  let timeLeftToPayOnOriginalLoan = {
    value: "120",
    error: false,
    errorMessage: "Please enter a value",
  };
  let newInterestRate = {
    value: "3.25",
    error: false,
    errorMessage: "Please enter a value",
  };
  let newLoanAmount = {
    value: "10000000",
    error: false,
    errorMessage: "Please enter a value",
  };
  let newLoanTerm = {
    value: "30",
    error: false,
    errorMessage: "Please select a loan term",
  };

  // result values
  let oldLoanValues = {
    monthlyPayment: "",
    remainingLoanBalance: "",
    remainingTotalCost: "",
  };
  let newLoanValues = {
    monthlyPayment: "",
    monthlySavings: "",
    totalCost: "",
  };
  let totalSavings = "";

  // has the result been calculated?
  let calculated = false;

  // reactive statement to format input values when they change
  $: {
    originalInterestRate.value = formatPercentage(originalInterestRate.value);
    originalLoanAmount.value = formatCurrency(originalLoanAmount.value);
    timeLeftToPayOnOriginalLoan.value = formatMonths(
      timeLeftToPayOnOriginalLoan.value
    );
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

<CalculatorHeader
  title="Refinance Savings Calculator"
  subtitle="Calculate How Much You Will Save By Refinancing"
/>
<Calculator on:showForm={() => (calculated = false)} showResults={calculated}>
  <form on:submit|preventDefault={setCalculatedAndCalculate} slot="form">
    <div class="">
      <div class="group">
        <FormField
          id="originalInterestRate"
          label="Original Interest Rate"
          field={originalInterestRate}
        >
          <input
            slot="input"
            type="text"
            id="originalInterestRate"
            name="originalInterestRate"
            bind:value={originalInterestRate.value}
            class=""
            required
          />
        </FormField>

        <FormField
          id="originalLoanAmount"
          label="Original Loan Amount"
          field={originalLoanAmount}
        >
          <input
            slot="input"
            type="text"
            id="originalLoanAmount"
            name="originalLoanAmount"
            bind:value={originalLoanAmount.value}
            class=""
            required
          />
        </FormField>
      </div>
      <div class="group">
        <FormField
          id="originalLoanTerm"
          label="Original Loan Term"
          field={originalLoanTerm}
        >
          <select
            slot="input"
            name="originalLoanTerm"
            id="originalLoanTerm"
            bind:value={originalLoanTerm.value}
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

        <FormField
          id="timeLeftToPayOnOriginalLoan"
          label="Time Left to Pay on Original Loan"
          field={timeLeftToPayOnOriginalLoan}
        >
          <input
            slot="input"
            type="text"
            id="timeLeftToPayOnOriginalLoan"
            name="timeLeftToPayOnOriginalLoan"
            bind:value={timeLeftToPayOnOriginalLoan.value}
            use:setCursorPosition={" Months"}
            class=""
            required
          />
        </FormField>
      </div>

      <div class="group">
        <FormField
          id="newInterestRate"
          field={newInterestRate}
          label="New Interest Rate"
        >
          <input
            slot="input"
            type="text"
            id="newInterestRate"
            name="newInterestRate"
            bind:value={newInterestRate.value}
            class=""
            required
          />
        </FormField>

        <FormField
          id="newLoanAmount"
          field={newLoanAmount}
          label="New Loan Amount"
        >
          <input
            slot="input"
            type="text"
            id="newLoanAmount"
            name="newLoanAmount"
            bind:value={newLoanAmount.value}
            class=""
            required
          />
        </FormField>
      </div>

      <FormField
        id="newLoanTerm"
        field={newLoanTerm}
        label="New Loan Term"
        style="--field-width:auto"
      >
        <select
          slot="input"
          name="newLoanTerm"
          id="newLoanTerm"
          bind:value={newLoanTerm.value}
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
    </div>
    <SubmitButton />
  </form>

  <div class="" slot="results">
    <div class="result-section">
      <h4>Old Loan</h4>
      <div class="">
        <div class="result-grid">
          <div class="label">Monthly Payment</div>
          <div class="value">
            ${oldLoanValues.monthlyPayment}
          </div>

          <div class="label">Remaining Loan Balance</div>
          <div class="value">
            ${oldLoanValues.remainingBalance}
          </div>

          <div class="label ">Remaining Total Cost</div>
          <div class="value">
            ${oldLoanValues.remainingTotal}
          </div>
        </div>
      </div>
    </div>

    <div class="result-section">
      <h4>New Lown</h4>

      <div class="result-grid">
        <div class="label">Monthly Payment</div>
        <div class="value">
          ${newLoanValues.monthlyPayment}
        </div>

        <div class="label">Monthly Savings</div>
        <div class="value">
          ${newLoanValues.monthlySavings}
        </div>

        <div class="label">Remaining Total Cost</div>
        <div class="value">${newLoanValues.totalCost}</div>

        <div class="label total">Total Savings</div>
        <div class="value total">${totalSavings}</div>
      </div>
    </div>

    <div class="result-section">
      <Disclaimer {company} />
    </div>
  </div>
</Calculator>

<style lang="scss">
</style>
