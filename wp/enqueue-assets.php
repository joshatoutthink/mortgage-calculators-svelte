<?php 
add_action('wp_enqueue_scripts', 'MC_enqueue_all');
function MC_enqueue_all(){
  
  global $post;
  if( is_a( $post, 'WP_Post' ) && has_shortcode( $post->post_content, 'mortgage_calculator') ) {
    do_action('qm/debug',  'got_here');
    wp_enqueue_script('mc-calc-script', M_CALC_URL . 'public/bundle.js', '1.10', array(), false);
    //we need to enqueue it here and also in the webcomponent because of css vars nee to be set globally but 
    //the other stuff needs to be inside the webcomponent so it gets access to the styles
    //TODO break it out to a third stylesheet
    wp_enqueue_style('mc-calc-styles', M_CALC_URL . 'public/bundle.css', '1.00' , 'all');
    /* these styles get pulled in by the webcomponent  leaving it here for documentation*/
    // wp_enqueue_style('mc-calc-svelte-styles', M_CALC_URL . 'public/public/bundle.css', '1.00' , 'all');
    wp_localize_script('mc-calc-script', 'MC_Vars', [
      'globalStylesUrl'=> M_CALC_URL . 'public/bundle.css',
      'scopedStylesUrl'=> M_CALC_URL . 'public/public/bundle.css',
    ]);
  }
}