// import utility functions
import { deformatCurrency, deformatPercentage, formatCurrencyString } from '../../util';

function calculateAmortizationSchedule(principal, rate, term) {
  const numerator = rate * Math.pow(1 + rate, term);
  const denominator = Math.pow(1 + rate, term) - 1;
  const fixedPayment = principal * (numerator / denominator);
  const initialBalance = parseFloat(principal);

  function getTotal(balance, rate, payment) {
    return {
      interest: balance * rate,
      principal: payment - balance * rate,
      currentBalance: balance - payment + balance * rate,
    };
  }

  let runningTotal = getTotal(initialBalance, rate, fixedPayment);

  let amortizedPayments = {};
  let i = 1;

  while (i < term) {
    amortizedPayments[i] = {};
    amortizedPayments[i].year = Math.ceil(i / 12);
    amortizedPayments[i].month = i % 12 ? i % 12 : 12;

    i++;
  }

  console.log(amortizedPayments);

  // const amortizedPayments = {};
  // let totals = { interest: 0, principal: 0, balance: 0 };

  // for (let i = 1; i <= term; i++) {
  //   amortizedPayments[i] = {};
  //   amortizedPayments[i].year = Math.ceil(i / 12);
  //   amortizedPayments[i].month = i % 12 ? i % 12 : 12;
  //   amortizedPayments[i].interest = principal * rate;
  //   amortizedPayments[i].principal = payment - balance * rate;
  //   amortizedPayments[i].balance = balance - payment + balance * rate;

  //   if (i === 1) {
  //     totals.balance = amortizedPayments[i].balance;
  //     totals.interest = amortizedPayments[i].interest;
  //     totals.principal = amortizedPayments[i].principal;
  //   } else {
  //     totals.balance = amortizedPayments[i].balance;
  //     totals.interest += amortizedPayments[i].interest;
  //     totals.principal += amortizedPayments[i].principal;
  //   }

  //   console.log(totals);

  //   if (amortizedPayments[i].month === 12) {
  //     if (totals.balance < 0) totals.balance = 0;

  //     amortizedPayments[i].totals = totals;
  //     totals = {};
  //   }
  // }

  // return amortizedPayments;
}

export default calculateAmortizationSchedule;
