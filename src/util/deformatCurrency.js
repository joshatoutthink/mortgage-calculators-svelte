function deformatCurrency(value) {
  return value.replace('$', '').replace(/,/g, '');
}

export default deformatCurrency;
