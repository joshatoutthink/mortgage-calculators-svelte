// import utility functions
import { deformatCurrency, deformatPercentage, formatCurrencyString } from '../../util';

function calculateAmortizationSchedule(principal, rate, term) {
  const numerator = rate * Math.pow(1 + rate, term);
  const denominator = Math.pow(1 + rate, term) - 1;
  const fixedPayment = principal * (numerator / denominator);
  const initialBalance = parseFloat(principal);

  // easier to have a placeholder here at 0 than mess with modulo formula below
  const months = [
    'derp',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  function getTotal(balance, rate, payment) {
    return {
      interest: balance * rate,
      principal: payment - balance * rate,
      currentBalance: balance - payment + balance * rate,
    };
  }

  let runningTotal = getTotal(initialBalance, rate, fixedPayment);

  let amortizedPayments = [];
  let i = 1;

  while (i < term + 1) {
    const { interest, principal, currentBalance } = runningTotal;

    amortizedPayments[i] = {};
    amortizedPayments[i].year = Math.ceil(i / 12);
    amortizedPayments[i].month = months[i % 12 ? i % 12 : 12];

    amortizedPayments[i] = {
      ...amortizedPayments[i],
      principal: formatCurrencyString(principal),
      interest: formatCurrencyString(interest),
      currentBalance: formatCurrencyString(currentBalance),
    };

    runningTotal = getTotal(currentBalance, rate, fixedPayment);

    i++;
  }

  return amortizedPayments;
}

export default calculateAmortizationSchedule;
