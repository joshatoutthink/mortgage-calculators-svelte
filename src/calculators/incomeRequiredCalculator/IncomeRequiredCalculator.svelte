<script>
  // import input formatting functions
  import { formatCurrency, formatPercentage } from "../../util";
  // calculate income required function
  import calculateIncomeRequired from "./calculateIncomeRequired";
  // import calculator base layout components
  import CalculatorHeader from "../CalculatorHeader.svelte";
  // import disclaimer component
  import Disclaimer from "../Disclaimer.svelte";
  import FormField from "../formElements/FormField.svelte";
  import SubmitButton from "../formElements/SubmitButton.svelte";
  import Calculator from "../Calculator.svelte";

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
  let annualRealEstateTaxes = {
    value: "100000",
    error: false,
    errorMessage: "Please enter a value",
  };
  let monthlyDebtObligations = {
    value: "50000",
    error: false,
    errorMessage: "Please enter a value",
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

<CalculatorHeader
  title="Income Required Calculator"
  subtitle="Calculate How Much You Need to Earn to Afford Your Dream Home"
/>
<Calculator on:showForm={() => (calculated = false)} showResults={calculated}>
  <form on:submit|preventDefault={setCalculatedAndCalculate} slot="form">
    <div class="group">
      <FormField
        label="Total Home Loan Amount"
        id="totalHomeLoanAmount"
        field={totalHomeLoanAmount}
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
        name="termOfTheLoan"
        id="termOfTheLoan"
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
      <p class="">&nbsp;</p>
    </FormField>
    <div class="group">
      <FormField
        label="Annual Real Estate Taxes"
        id="annualRealEstateTaxes"
        field={annualRealEstateTaxes}
      >
        <input
          slot="input"
          type="text"
          id="annualRealEstateTaxes"
          name="annualRealEstateTaxes"
          bind:value={annualRealEstateTaxes.value}
          class=""
          required
        />
      </FormField>
      <FormField
        label="Monthly Debt Obligations"
        id="monthlyDebtObligations"
        field={monthlyDebtObligations}
      >
        <input
          slot="input"
          type="text"
          id="monthlyDebtObligations"
          name="monthlyDebtObligations"
          bind:value={monthlyDebtObligations.value}
          class=""
          required
        />
      </FormField>
    </div>

    <SubmitButton />
  </form>

  <div class="" slot="results">
    <div class="result-section">
      <div class="result-grid">
        <div class="label total">Required Salary</div>
        <div class="value total">${requiredSalary}</div>
      </div>
    </div>
    <div class="result-section">
      <Disclaimer {company} />
    </div>
  </div>
</Calculator>
