function calculateMortgagePayment(totalHomeLoanAmount, annualInterestRate, termOfTheLoan) {
  const principal = totalHomeLoanAmount.replace('$', '').replace(/,/g, '');
  const rate = annualInterestRate.replace('%', '').replace(/ /g, '') / 100 / 12;
  const term = termOfTheLoan * 12;

  const numerator = rate * Math.pow(1 + rate, term);
  const denominator = Math.pow(1 + rate, term) - 1;
  const payment = (principal * (numerator / denominator))
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return payment;
}

export default calculateMortgagePayment;
