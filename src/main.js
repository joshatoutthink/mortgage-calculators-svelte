import CalculatorContainer from './calculators/CalculatorContainer.svelte';
import './main.css';

const calculators = new CalculatorContainer({
  target: document.body,
  props: {
    company: 'Tabor Mortgage Group',
  },
});

export default calculators;
