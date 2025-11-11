( function( $ ) {

	'use strict';

	function modifyAdmin() {

		$( '.theme-browser .theme.active' ).click(function() {
			setTimeout( function() {
				$( '.theme-overlay.active .theme-author' ).after( '<div class="notice notice-warning notice-alt notice-large"><h3 class="notice-title">Upgrade Available</h3><p><b>Upgrade to the premium version for additional pro patterns, styles, blocks, demo content, and customer support. <a href="https://portfoliowp.com/features/" target="_blank">View details</a> or <a href="https://portfoliowp.com/checkout/?edd_action=add_to_cart&download_id=37" target="_blank">upgrade now.</a></b></p></div>' );
			}, 200);
		});

	}

	$( document )
		.ready( modifyAdmin );

})( jQuery );
