// import utility functions
import { deformatCurrency, deformatPercentage, formatCurrencyString } from '../../util';

function calculateMortgagePayment(totalHomeLoanAmount, annualInterestRate, termOfTheLoan) {
  const principal = deformatCurrency(totalHomeLoanAmount);
  const rate = deformatPercentage(annualInterestRate) / 12;
  const term = termOfTheLoan * 12;

  const numerator = rate * Math.pow(1 + rate, term);
  const denominator = Math.pow(1 + rate, term) - 1;
  const payment = formatCurrencyString(principal * (numerator / denominator));

  return payment;
}

export default calculateMortgagePayment;
