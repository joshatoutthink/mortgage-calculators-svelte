<?php
add_shortcode('mortgage_calculator', 'show_mortgage_calculator');

function show_mortgage_calculator($atts){
  ['calc'=>$calc] = shortcode_atts([
    'calc'=>null
  ], $atts);

  ob_start();
  ?>
  <mortgage-calculator calc="<?php echo $calc ?>"></mortgage-calculator>

  <?php
  //AVAILABLE OPTIONS IN CONSOLE SO USER KNOWS THE NAMES OF CALCS
  if( 0 != wp_get_current_user()->ID){
    ?>
    <script>
      console.log('Mortgage Calculator Choices For Shortcode');
      console.log(`>  AffordabilityCalculator`);
      console.log(`>  IncomeRequiredCalculator`);
      console.log(`>  MortgagePaymentCalculator`);
      console.log(`>  RefinanceSavingsCalculator`);

    </script>
    <?php
  }
  return ob_get_clean();
}