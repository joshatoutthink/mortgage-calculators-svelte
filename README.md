# Warp Speed Mortgage Calculators

## What it is

A collection of calculators for calculating mortgage related things. This is a wordpress plugin, that uses shortcodes to output the calculators.

## How To Use

To use the plugin add the shortcode to your post content and the calculators will appear there.

### Shortcode

```
[mortgage_calculator calc=<calculator-name>]
```

If no calc attribute is given there will be tabbed layout allowing the user to select which calculator they wish to see

#### List of calculator names

- MortgagePaymentCalculator
- IncomeRequiredCalculator
- AffordabilityCalculator
- RefinanceSavingsCalculator

its important to get the casing correctly or it will not work.

## TODO

- Add more shortcode attributes
- Mortgage Payment Results
  - fix "insurance and taxes not included" text
  - Style Amortization Schedule Table
