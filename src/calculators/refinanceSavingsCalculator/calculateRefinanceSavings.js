// import utility functions
import { deformatCurrency, deformatPercentage } from '../../util';

function calculateRefinanceSavings(
  originalInterestRate,
  originalLoanAmount,
  originalLoanTerm,
  timeLeftToPayOnOriginalLoan,
  newInterestRate,
  newLoanAmount,
  newLoanTerm
) {
  // const monthsLeft = timeLeftToPayOnOriginalLoan.replace(' months', '');

  const originalPrincipal = deformatCurrenct(originalLoanAmount);
  const originalRate = deformatPercentage(originalInterestRate) / 12;
  const originalTerm = originalLoanTerm * 12;
}

export default calculateRefinanceSavings;
