function formatCurrencyString(value) {
  return value
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default formatCurrencyString;
