function formatPercentage(value) {
  const percentValue = (parseFloat(value.replace(/\D/g, '')) / 100).toFixed(2);
  value = `${percentValue}%`;

  return value;
}

export default formatPercentage;
