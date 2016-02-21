
if (jQuery) {
	jQuery(document).ready(
			function() {
				var myVersion = 'jQuery version ' + jQuery.fn.jquery + ' SUCCESSFULLY loaded and running!';
				jQuery('p').text(myVersion);
			}
	);
}
