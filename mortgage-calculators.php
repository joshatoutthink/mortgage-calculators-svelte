<?php
/**
* Plugin Name: Mortgage Calculators
* Plugin URI: 
* Description: Displays the mortgage calculators using a shortcode
* Version: 1.00
* Author: Outthinkgroup
* Author URI: 
* Copyright: 
* License: GNU General Public License v2.0
* License URI: http://www.gnu.org/licenses/gpl-2.0.html
* Text Domain: 
*/


define("M_CALC_PATH", plugin_dir_path(__FILE__));
define("M_CALC_URL", plugin_dir_url(__FILE__));

include_once M_CALC_PATH . 'wp/mortgage-calc-shortcode.php';
include_once M_CALC_PATH . 'wp/enqueue-assets.php';

