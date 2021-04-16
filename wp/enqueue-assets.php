<?php 
add_action('wp_enqueue_scripts', 'MC_enqueue_all');
function MC_enqueue_all(){
  
  global $post;
  if( is_a( $post, 'WP_Post' ) && has_shortcode( $post->post_content, 'mortgage_calculator') ) {
    do_action('qm/debug',  'got_here');
    wp_enqueue_script('mc-calc-script', M_CALC_URL . 'public/bundle.js', '1.10', array(), false);
    wp_enqueue_style('mc-calc-styles', M_CALC_URL . 'public/bundle.css', '1.00' , 'all');
    // wp_enqueue_style('mc-calc-svelte-styles', M_CALC_URL . 'public/public/bundle.css', '1.00' , 'all');
  }
}