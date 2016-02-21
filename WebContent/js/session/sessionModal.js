$(function() {
	//Flyovers.init();
	SessionModal.init();
});

var SessionModal = {
		init: function() {
			if ($('.session_modal').length != 0) {
				$('body').append('<div id="session_overlay"></div>');
				$('#session_overlay').hide();
				$('#session_modal').hide();
				//this.bind();
			}
		}
		/*,
		bind: function() {
			$('.modal .close').click(function() {
				$('#overlay').fadeOut('fast');
				$(this).parents('.modal').fadeOut('fast');
				return false;
			});
			/*
			$('.spawn_modal').click(function() {
				var modal_id = $(this).attr('href');
				var offset = Math.round(($(window).width() - $(modal_id).outerWidth())/2);
				$(modal_id).css("left", offset);
				$(modal_id).fadeIn('fast');
				$('#overlay').fadeTo('fast', .8);
				return false;
			});			
		}*/
}
		/*
/**
 * Control Flyovers
 */
		/*
var Flyovers = {
	init: function() {
		if ($('.flyover').length != 0) {
			$('.flyover').hide();
			this.bind();
		}
	},
	bind: function() {
		$('.flyover .close').click(function() {
			$(this).parents('.flyover').fadeOut('fast');
			return false;
		});
		$('.spawn_flyover').click(function() {
			var flyover_id = $(this).attr('href');
			$(flyover_id).fadeIn('fast');
			return false;
		});
	}
}*/
/**
 * Control Modal Windows
 */
function displaySessionModal() {
	var modal_id = "#session_modal";
	var offset = Math.round(($(window).width() - $(modal_id).outerWidth())/2);
	$('#session_overlay').fadeTo('fast',.8);
	$(modal_id).css("left", offset);
	$(modal_id).css("top", 200);
	$(modal_id).fadeIn('fast');
	//setTimeForSession();
	//countDown();
}
function hideSessionModal() {
	$('#session_overlay').fadeOut('fast');
	//$(this).parents('.modal').fadeOut('fast');
	$('#session_modal').fadeOut('fast');
	//clearTimeoutForSession();
}
