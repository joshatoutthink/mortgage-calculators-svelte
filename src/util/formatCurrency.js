function formatCurrency(value) {
  const currencyFormat = parseFloat(
    value
      .replace(/(.*){1}/, '0$1')
      .replace(/[^\d]/g, '')
      .replace(/(\d\d?)$/, '.$1')
  ).toLocaleString('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
  value = `$${currencyFormat}`;

  return value;
}

export default formatCurrency;
