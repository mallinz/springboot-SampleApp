$(function() {
    MenuLinks.init();
	Panels.init();
	Calendars.init();
	WindowSpawner.init();
	Flyovers.init();
	Modals.init();
	SearchSelect.init();
	TableStriping.init();
	TableSorting.init();
	TablePaging.init();
	Treeviews.init();
	AddClears.init();
	StickyFooter.init();
	ActionsMenu.init();
	CheckBoxes.init();
});

/**
 * Control Drop Menu Behavior
 */
var MenuLinks = {
    init: function() {
	 
		if ($('.menus').length != 0 ) {
			$('.menus ul').find('ul').hide();
			this.bind();
		}
    },
    bind: function() {
		$('.menus li').hover(function() {
			$(this).addClass('active');
			$(this).children('ul').show();
			$(this).parents('.active').children('a').filter('.arrow').addClass('arrowHover');
		},
		function() {
			$(this).removeClass('active');
			$(this).children('a').removeClass('arrowHover');
			$(this).children('a').filter('.arrowHover').addClass('arrow');
			$(this).children('ul').hide();
		});
    }
}


 var CheckBoxes = {
	init: function(){
		$('input:checkbox').each(function(){
				if(($(this).prop('checked')== true)&&($(this).prop('class')!= "mainCheck")){
						var x = $(this).parents('tr').html();
						$(this).parents("tr").addClass('rowHighlight');
						}

				}
			
			);
	   $('.mainCheck').click(function(){
				if($(this).prop('checked')==true){
						$(this).parents('form').find(':checkbox').prop('checked',true);
						$(this).parents('form').find('tr').addClass('rowHighlight');
				}
			else
				{
						$(this).parents('form').find(':checkbox').prop('checked',false);
						$(this).parents('form').find('tr').removeClass('rowHighlight');
				}

		});

		$('input:checkbox').click(function(){
						if($(this).prop('class')=="mainCheck"){
									//do nothing
									}

						else if($(this).prop('checked')==false){
							$(this).parents('form').find('.mainCheck').prop('checked',false);
							$(this).parents("tr").removeClass('rowHighlight');
							}
						else
							{
							var checkedAll = true;
							$(this).parents("tr").addClass('rowHighlight');
							$(this).parents('form').find(':checkbox').each(function(){
								if(($(this).prop('checked')== false)&&($(this).prop('class')!= "mainCheck")){
									checkedAll = false;
									}

								});
							if(checkedAll==true)
								$(this).parents('form').find('.mainCheck').prop('checked',true);
							}
					});
	}
 }


/**
* Add clearing Divs after certain elements
*/
var AddClears = {
	init: function() {
		$('.treeview > ul, .image_list.vertical .details, .image_list.horizontal > ul, #nav_main, .actions_menu').after('<div class="clear"></div>');
	}
}

/**
 * Control Collapsible Panels
 */
var Panels = {
	init: function() {
		if ($('.panel').length != 0) {
			$('.panel_content').hide();
			this.bind();
		}
	},
	bind: function() {
		$('.title_bar > h2').click(function(){
			$(this).parents('.panel').children('.panel_content').slideToggle('fast');
			$(this).parents('.panel').toggleClass('active');
			return false;
		});
	}
}

var ActionsMenu = {
	init: function() {
		if($('.actions_menu').length != 0 ) {
			$('.actions_menu ul').hide();
			this.bind();
		}
	},
	bind: function() {
		$('.actions_menu').hover(function() {
			$(this).children('ul').show();
		},
		function() {
			$(this).children('ul').hide();
		});
	}
}

/**
 * Configure jQuery UI Datepickers
 */
var Calendars = {
	init: function() {
		if ($('.datechooser').length != 0) {
			$('.datechooser.single input, .datechooser.multiple input').datepicker({ duration: 'fast'});
			$('.datechooser.week input').datepicker({
				duration: 'fast',
				firstDay: 1,
				onSelect: function(dateText, inst) {
					var thisYear = new Date();
					thisYear = thisYear.getFullYear();
					var week = $.datepicker.iso8601Week(new Date (dateText));
					var year = [];
					year = dateText.split("/");
					year = year[2];
					if (week == 53 && year == thisYear) { year--; }
					$(this).val("Week " + week + ", " + year);
				}
			});
			this.bind();
		}
	},
	bind: function() {
		$('.datechooser .icon.calendar').click(function() {
			$(this).parents('div').children('input[type=text]').focus();
			return false;
		});
	}
}

/**
 * Control pop-up windows
 */
var WindowSpawner = {
	init: function() {
		if ($('.new_window').length != 0) {
			this.bind();
		}
	},
	bind: function() {
		$('.new_window').click(function() {
            window.open(this.href, '_blank', 'toolbar=0, location=0, directories=0, resizable=0, width=800, height=600');
			return false;
		});
	}
}

/**
 * Control Flyovers
 */
var Flyovers = {
	init: function() {
		if ($('.flyover').length != 0) {
			$('.flyover').draggable({ handle: '.title_bar'}).hide();
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
}

/**
 * Control Modal Windows
 */
var Modals = {
	init: function() {
		if ($('.modal').length != 0) {
			$('body').append('<div id="overlay"></div>');
			$('#overlay').hide();
			$('.modal').hide();
			this.bind();
		}
	},
	bind: function() {
		$('.modal .close').click(function() {
			$('#overlay').fadeOut('fast');
			$(this).parents('.modal').fadeOut('fast');
			return false;
		});
		$('.spawn_modal').click(function() {
			var modal_id = $(this).attr('href');
			var offset = Math.round(($(window).width() - $(modal_id).outerWidth())/2);
			$(modal_id).css("left", offset);
			$(modal_id).fadeIn('fast');
			$('#overlay').fadeTo('fast', .8);
			return false;
		});
	}
}

/**
 * Control Search Select Objects and auto complete lists
 */
var SearchSelect = {
	init: function() {
		if ($('.search_select').length != 0) {
			$('.search_select .search_select_options').hide();
			this.bind();
		}
	},
	bind: function() {
		$('.search_select_options').each(function() {
			var selectOptions = new Array();
			$(this).children('option').each(function() {
				selectOptions.push($(this).html());		
			});
			selectOptions.sort(function(x,y){ 
				var a = String(x).toUpperCase(); 
				var b = String(y).toUpperCase(); 
				if (a > b) {
					return 1;
				}
				if (a < b) {
					return -1;
				}
				return 0; 
			});
			$(this).parents('div').children('input').autocomplete({ source: selectOptions });
		});
	}
}

/**
 * Tree Views
 */
 var Treeviews = {
 	init: function() {
		var self = this;
		if ($('.treeview').length != 0) {
			$('.treeview').each(function() {
				if ($(this).hasClass('checkbox')) {
					var myTree = $(this);
					myTree.find('ul li a').prepend("<ins>&nbsp;</ins>");
					myTree.tree({
						ui : {
							theme_path : "themes/",
							theme_name : "checkbox",
							selected_parent_close: false
						},
						plugins : {
							checkbox : { }
						},
						callback : {
							onchange : function() {
								var checked_ids = [];
								$.tree.plugins.checkbox.get_checked($.tree.reference(myTree)).each(function () {
									checked_ids.push($(this).attr('id'));
								});
								$(myTree).find('input[type=hidden]').val("");
								$(myTree).find('input[type=hidden]').val(checked_ids.join(","));
							}
						}
					});
					myTree.append("<input type='hidden' id='" + myTree.attr('id') + "_values' />");
				} else {
					$(this).tree({
						ui : {
							theme_path : "themes/",
							theme_name : "checkbox"
						},
						plugins : {
							checkbox : { }
						}
					});
				}
			});
		}
	}
 }
 
 /**
 * Sticky Footer
 */
 var StickyFooter = {
 	init: function() {
		$('#wrapper').append('<div id="push"></div>');
	}
 }
 
 /**
 * Adds table striping
 */
var TableStriping = {
	init: function() {
		if ($('table.striped').length != 0 ){
			$('table.striped tbody tr:nth-child(even)').addClass('alt');
		}
	},
	clear: function() {
		$('table.striped tbody tr').removeClass('alt');
	}
}
/**
 * Adds table sorting
 */
var TableSorting = {
	init: function() {
		if ($('table.sortable').length != 0 ) {
			$('table.sortable').each(function() {
				if ($(this).hasClass('sortfirst')) {
					$(this).tablesorter({ sortList: [[0,0]] });
				} else {
					$(this).tablesorter();
				}
			});
			$('table.sortable thead th').append('<span class="sortarrows" />');
			this.bind();
		}
	},
	bind: function() {
		$('table.sortable').bind("sortEnd",function() { 
			if ($(this).hasClass('paging_basic') || $(this).hasClass('paging_complex')) {
				TablePaging.resetPaging($(this));
			}
			TableStriping.clear();
			TableStriping.init();
		});
	}
}

/**
 * Control Table pagination
 */
var TablePaging = {
	init: function() {
		var self = this;
		if ($('table.paging_basic').length != 0){
			$('table.paging_basic').each(function() {
				var html = '<div class="pagination_basic">';
				html += '<a class="next" href="#">Next Page &#187;</a>';
				html += '<a class="prev" href="#">&#171; Previous Page</a>';
				html += '<div class="page_selector"></div>';
				html += '</div>';
				$(this).parents('.table').append(html);
				self.basic($(this));
			});
		}
		if ($('table.paging_complex').length != 0){
			$('table.paging_complex').each(function() {
				var visibleRows = 10;
				var html = '<div class="pagination_complex">';
				html += '<ul>';
				html += '<li>';
				html += '<a class="view_all" href="#">view all</a>';
				html += '</li>';
				html += '<li>';
				html += '<div class="page_selector"></div>';
				html += '</li>';
				html += '<li>';
				html += '<a class="prev" href="#">&#171; prev</a>';
				html += ' | ';
				html += '<a class="next" href="#">next &#187;</a>';
				html += '</li>';
				html += '</ul>';
				html += '<input type="hidden" class="visible_rows" value="' + visibleRows + '" />';
				html += '</div>';
				$(this).parents('.table').prepend(html);
				self.complex($(this));
			});
		}
	},
	resetPaging: function(myTable) {
		if ( myTable.hasClass('paging_basic')) {
			this.basic(myTable);
		}
		if ( myTable.hasClass('paging_complex')) {
			this.complex(myTable);
		}
	},
	basic: function(basicTable) {
		var $table = basicTable;
		var currentPage = 0;
		var numPerPage = 10;
		var numRows = $table.find('tbody tr').length;
		var numPages = Math.ceil(numRows / numPerPage);
		var paginator = $table.parents('.table').children('.pagination_basic');
		
		var repaginate = function() {
			$table.find('tbody tr').show();
			$table.find('tbody tr:lt(' + (currentPage * numPerPage) + ')').hide();
			$table.find('tbody tr:gt(' + (((currentPage + 1) * (numPerPage)) - 1) + ')').hide();
			updateSelect();
		};

		var updateSelect = function() {
			var html = "";
			html = "page: <select class='selector'>";
			for (i=0; i < numPages; i++) {
				if (i == currentPage) {
					html += "<option val='" + (i + 1) + "' selected='selected'>" + (i + 1) + "</option>";
				} else {
					html += "<option val='" + (i + 1) + "'>" + (i + 1) + "</option>";
				}
			}
			html += "</select> of " + numPages;
			paginator.find('.page_selector').html("");
			paginator.find('.page_selector').append(html);
			paginator.find('.selector').change(function() {
				currentPage = $(this).val() - 1;
				repaginate();			
			});
			
			if (currentPage == 0) {
				paginator.find('.prev').addClass('noclick');
			} else {
				paginator.find('.prev').removeClass('noclick');
			}
			
			if (currentPage == numPages - 1) {
				paginator.find('.next').addClass('noclick');;
			} else {
				paginator.find('.next').removeClass('noclick');
			}
		}
		
		paginator.find('a').unbind();
		
		paginator.find('.next').click(function() {
			if ($(this).hasClass('noclick')) {
				return false;
			}
			if (currentPage < numPages - 1) {
				currentPage++;
				repaginate();
			}
			return false;
		});
		
		paginator.find('.prev').click(function() {
			if ($(this).hasClass('noclick')) {
				return false;
			}
			if (currentPage > 0) {
				currentPage--;
				repaginate();
			}
			return false;
		});
		
		repaginate();
	},
	complex: function(complexTable) {
		var self = this;
		var table = complexTable;
		var currentPage = 0;
		var numPerPage = table.parents('.table').find('.visible_rows').val();
		var originalNumPerPage = 10;
		var numRows = table.find('tbody tr').length;
		var numPages = Math.ceil(numRows / numPerPage);
		var paginator = table.parents('.table').children('.pagination_complex');
		//alert("numrows:: " + numRows +"\nnumPerPage :: " + numPerPage);
		
		var repaginate = function() {
			table.find('tbody tr').show();
			table.find('tbody tr:lt(' + (currentPage * numPerPage) + ')').hide();
			table.find('tbody tr:gt(' + (((currentPage + 1) * (numPerPage)) - 1) + ')').hide();
			updateSelect();
		};

		var updateSelect = function() {
			var html = "";
			html = "page: <select class='selector'>";
			for (i=0; i < numPages; i++) {
				if (i == currentPage) {
					html += "<option val='" + (i + 1) + "' selected='selected'>" + (i + 1) + "</option>";
				} else {
					html += "<option val='" + (i + 1) + "'>" + (i + 1) + "</option>";
				}
			}
			html += "</select> of " + numPages;
			paginator.find('.page_selector').html("");
			paginator.find('.page_selector').append(html);
			paginator.find('.selector').change(function() {
				currentPage = $(this).val() - 1;
				repaginate();			
			});
			
			if (currentPage == 0) {
				paginator.find('.prev').addClass('noclick');
			} else {
				paginator.find('.prev').removeClass('noclick');
			}
			
			if (currentPage == numPages - 1) {
				paginator.find('.next').addClass('noclick');;
			} else {
				paginator.find('.next').removeClass('noclick');
			}
		}
		
		paginator.find('a').unbind();
		
		paginator.find('.next').click(function() {
			if ($(this).hasClass('noclick')) {
				return false;
			}
			if (currentPage < numPages - 1) {
				currentPage++;
				repaginate();
			}
			return false;
		});
		
		paginator.find('.prev').click(function() {
			if ($(this).hasClass('noclick')) {
				return false;
			}
			if (currentPage > 0) {
				currentPage--;
				repaginate();
			}
			return false;
		});
		
		paginator.find('.view_all').click(function() {
			if (numPerPage == originalNumPerPage) {
				paginator.find('.visible_rows').val(numRows);
				numPerPage = numRows;
				currentPage = 0;
				$(this).html('view pages');
				paginator.find('.page_selector').parents('li').hide();
				paginator.find('.prev').parents('li').hide();
				repaginate();
			} else {
				paginator.find('.visible_rows').val(originalNumPerPage);
				numPerPage = originalNumPerPage;
				currentPage = 0;
				$(this).html('view all');
				paginator.find('.page_selector').parents('li').show();
				paginator.find('.prev').parents('li').show();
				self.complex(table);
			}
			return false;
		});
		
		repaginate();
	}
	
}