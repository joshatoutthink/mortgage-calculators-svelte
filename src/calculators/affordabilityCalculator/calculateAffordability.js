// import utility functions
import { deformatCurrency, deformatPercentage, formatCurrencyString } from '../../util';

function calculateAffordability(
  annualInterestRate,
  termOfTheLoan,
  annualRealEstateTaxes,
  annualHomeownersInsurance,
  grossAnnualIncome,
  monthlyDebtObligations
) {
  const annualIncome = deformatCurrency(grossAnnualIncome);
  const annualInsurance = deformatCurrency(annualHomeownersInsurance);
  const annualTax = parseInt(deformatCurrency(annualRealEstateTaxes));
  const monthlyDebt = parseInt(deformatCurrency(monthlyDebtObligations));

  const maximumMonthly = monthlyDebtObligations
    ? (annualIncome * 0.44 - annualTax - annualInsurance) / 12 - monthlyDebt
    : (annualIncome * 0.44 - annualTax - annualInsurance) / 12;

  const rate = deformatPercentage(annualInterestRate) / 12;
  const term = termOfTheLoan * 12;

  const numerator = rate * Math.pow(1 + rate, term);
  const denominator = Math.pow(1 + rate, term) - 1;
  const maximumAmount = formatCurrencyString(maximumMonthly / (numerator / denominator));

  return [formatCurrencyString(maximumMonthly), maximumAmount];
}

export default calculateAffordability;
