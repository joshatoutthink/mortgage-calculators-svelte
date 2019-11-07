function deformatPercentage(value) {
  return value.replace('%', '').replace(/ /g, '') / 100;
}

export default deformatPercentage;
