<?php
function vkEdit_get_default_options() {
	$vkEdit_options = array(
		'remove_front_css' => '',
		'remove_admin_css' => '',
	);
	return apply_filters( 'vkEdit_default_options', $vkEdit_options );
}

function vkEdit_plugin_options_Custom_init() {
	if ( false === vkEdit_get_plugin_options() )
	add_option( 'vkEdit_plugin_options', vkEdit_get_default_options() );
	register_setting(
		'vkEdit_plugin_options',
		'vkEdit_plugin_options',
		'vkEdit_plugin_options_validate'
	);
}
add_action( 'admin_init', 'vkEdit_plugin_options_Custom_init' );

/*-------------------------------------------*/
/*	functionsで毎回呼び出して$optionsに入れる処理を他でする。
/*-------------------------------------------*/
function vkEdit_get_plugin_options() {
	return get_option( 'vkEdit_plugin_options', vkEdit_get_default_options() );
}

/*-------------------------------------------*/
/*	メニューに追加
/*-------------------------------------------*/
function vkEdit_add_customSetting() {
	$custom_page = add_options_page(
		'VK Front-end Grid Editor setting',		// Name of page
		'VK Grid Editor',						// Label in menu
		'edit_theme_options',					// Capability
		'vkEdit_plugin_options',				// ユニークなこのサブメニューページの識別子
		'vkEdit_add_customSettingPage'			// メニューページのコンテンツを出力する関数
	);
	if ( ! $custom_page )
	return;
}
add_action( 'admin_menu', 'vkEdit_add_customSetting' );

/*-------------------------------------------*/
/*	Setting Page
/*-------------------------------------------*/
function vkEdit_add_customSettingPage() { ?>
<div class="wrap" id="vkEdit_plugin_options">
<h2>VK Front-end Grid Editor Setting</h2>

<div style="width:68%;display:inline-block;vertical-align:top;">

<form method="post" action="options.php">
<?php
	settings_fields( 'vkEdit_plugin_options' );
	$options = vkEdit_get_plugin_options();
	$default_options = vkEdit_get_default_options();
?>

<h3><?php _e('Do not display Grid css of VK Front-end Grid Editor.','vk-front-end-grid-editor');?></h3>
<p><?php _e('If your theme already included bootstrap css, please check the following check box.','vk-front-end-grid-editor');?></p>
<ul>
<li><input type="checkbox" name="vkEdit_plugin_options[remove_front_css]" id="vkEdit_plugin_options" value="true" <?php echo (isset($options['remove_front_css']) && $options['remove_front_css'])? 'checked': ''; ?> /> <?php _e('Front page','vk-front-end-grid-editor');?></li>
<li><input type="checkbox" name="vkEdit_plugin_options[remove_admin_css]" id="vkEdit_plugin_options" value="true" <?php echo (isset($options['remove_admin_css']) && $options['remove_admin_css'])? 'checked': ''; ?> /> <?php _e('Admin page','vk-front-end-grid-editor');?></li>
</ul>

<?php submit_button(); ?>

</form>
</div>

<div style="width:29%;display:block; overflow:hidden;float:right;">
	<a href="http://bizvektor.com/en/" target="_blank" title="Free Wordpress theme for businesses">
		<img src="<?php echo plugins_url('/vk-post-author-display/images/bizVektor-ad-banner-vert.jpg') ?>" alt="Download Biz Vektor free Wordpress theme for businesses" style="max-width:100%;" />
	</a>
</div>

</div>
<?php }

/*-------------------------------------------*/
/*	options_validate
/*-------------------------------------------*/
function vkEdit_plugin_options_validate( $input ) {
	$output = $defaults = vkEdit_get_default_options();

	$output['remove_front_css'] = $input['remove_front_css'];
	$output['remove_admin_css'] = $input['remove_admin_css'];

	return apply_filters( 'vkEdit_plugin_options_validate', $output, $input, $defaults );
}
