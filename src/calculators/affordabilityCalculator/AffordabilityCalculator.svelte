<script>
  // import input formatting functions
  import { formatCurrency, formatPercentage } from "../../util";
  // calculate payment function
  import calculateAffordability from "./calculateAffordability";
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

<CalculatorHeader
  title="Affordability Calculator"
  subtitle="Calculate How Much You Can Borrow"
/>
<Calculator on:showForm={() => (calculated = false)} showResults={calculated}>
  <form on:submit|preventDefault={setCalculatedAndCalculate} slot="form">
    <div class="group">
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
    </div>
    <div class="group">
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
      </FormField>

      <FormField
        label="Annual Homeowners Insurance"
        id="annualHomeownersInsurance"
        field={annualHomeownersInsurance}
      >
        <input
          slot="input"
          type="text"
          id="annualHomeownersInsurance"
          name="annualHomeownersInsurance"
          bind:value={annualHomeownersInsurance.value}
          class=""
          required
        />
      </FormField>
    </div>
    <div class="group">
      <FormField
        label="Gross Annual Income"
        id="grossAnnualIncome"
        field={grossAnnualIncome}
      >
        <input
          slot="input"
          type="text"
          id="grossAnnualIncome"
          name="grossAnnualIncome"
          bind:value={grossAnnualIncome.value}
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
        <div class="label">Maximum Monthly Mortgage Payment</div>
        <div class="value">
          ${maximumMonthlyMortgagePayment}
        </div>
        <div class="label">Maximum Loan Amount</div>
        <div class="value">${maximumLoanAmount}</div>
      </div>
      <div class="result-secton">
        <Disclaimer {company} />
      </div>
    </div>
  </div>
</Calculator>
