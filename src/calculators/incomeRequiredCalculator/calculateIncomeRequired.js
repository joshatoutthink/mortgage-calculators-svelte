// import utility functions
import { deformatCurrency, deformatPercentage, formatCurrencyString } from '../../util';

function calculateIncomeRequired(
  totalHomeLoanAmount,
  annualInterestRate,
  termOfTheLoan,
  annualRealEstateTaxes,
  monthlyDebtObligations
) {
  const principal = deformatCurrency(totalHomeLoanAmount);
  const rate = deformatPercentage(annualInterestRate) / 12;
  const term = termOfTheLoan * 12;

  const numerator = rate * Math.pow(1 + rate, term);
  const denominator = Math.pow(1 + rate, term) - 1;
  const payment = principal * (numerator / denominator);

  const annualPayment = payment * 12;
  const annualTax = parseInt(deformatCurrency(annualRealEstateTaxes));
  const annualDebt = deformatCurrency(monthlyDebtObligations) * 12;

  const income = formatCurrencyString((annualPayment + annualDebt + annualTax) / 0.44);

  return income;
}

export default calculateIncomeRequired;
