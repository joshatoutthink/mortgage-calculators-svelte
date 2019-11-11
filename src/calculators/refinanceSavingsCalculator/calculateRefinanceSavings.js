// import utility functions
import { deformatCurrency, deformatNumber, deformatPercentage, formatCurrencyString } from '../../util';

function calculateOldValues(originalInterestRate, originalLoanAmount, originalLoanTerm, timeLeftToPayOnOriginalLoan) {
  const monthsLeft = deformatNumber(timeLeftToPayOnOriginalLoan);

  const originalPrincipal = deformatCurrency(originalLoanAmount);
  const originalRate = deformatPercentage(originalInterestRate) / 12;
  const originalTerm = originalLoanTerm * 12;

  const originalNumerator = originalRate * Math.pow(1 + originalRate, originalTerm);
  const originalDenominator = Math.pow(1 + originalRate, originalTerm) - 1;
  const originalPayment = originalPrincipal * (originalNumerator / originalDenominator);

  const monthsPaid = originalTerm - monthsLeft;

  let remainingBalance = originalPrincipal;

  for (let i = 0; i < monthsPaid; i++) {
    remainingBalance = remainingBalance * (1 + originalRate) - originalPayment;
  }

  const oldValues = {
    monthlyPayment: formatCurrencyString(originalPayment),
    remainingBalance: formatCurrencyString(remainingBalance),
    remainingTotal: formatCurrencyString(originalPayment * monthsLeft),
  };

  return oldValues;
}

function calculateNewValues(newInterestRate, newLoanAmount, newLoanTerm) {
  const newPrincipal = deformatCurrency(newLoanAmount);
  const newRate = deformatPercentage(newInterestRate) / 12;
  const newTerm = newLoanTerm * 12;

  const newNumerator = newRate * Math.pow(1 + newRate, newTerm);
  const newDenominator = Math.pow(1 + newRate, newTerm) - 1;
  const newPayment = newPrincipal * (newNumerator / newDenominator);

  const newValues = {
    monthlyPayment: formatCurrencyString(newPayment),
    totalCost: formatCurrencyString(newPayment * newLoanTerm * 12),
  };

  return newValues;
}

function calculateRefinanceSavings(
  originalInterestRate,
  originalLoanAmount,
  originalLoanTerm,
  timeLeftToPayOnOriginalLoan,
  newInterestRate,
  newLoanAmount,
  newLoanTerm
) {
  const oldValues = calculateOldValues(
    originalInterestRate,
    originalLoanAmount,
    originalLoanTerm,
    timeLeftToPayOnOriginalLoan
  );

  const newValues = calculateNewValues(newInterestRate, newLoanAmount, newLoanTerm);

  /**
   * maybe not the best way to get this number but is good enough lolz
   * allows keeping oldValues and newValues modularized into their own functions
   */
  newValues.monthlySavings = formatCurrencyString(
    Math.abs(
      parseFloat(newValues.monthlyPayment.replace(/,/g, '')) - parseFloat(oldValues.monthlyPayment.replace(/,/g, ''))
    )
  );

  // ditto here
  const totalSavings = formatCurrencyString(
    parseFloat(oldValues.remainingTotal.replace(/,/g, '')) - parseFloat(newValues.totalCost.replace(/,/g, ''))
  );

  return [oldValues, newValues, totalSavings];
}

export default calculateRefinanceSavings;
