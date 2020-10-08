;(function ($) {
    var count = 0,
        $html =$('html'),
        $nav_btn = $('.nav-btn'),
        //section_list = $('.region.region-content').children(),
        selector = '',
        current_offset = 0,
        offset_additional = 0,
        executed = false
    ;

    if ($('.nav-btn').length <= 0 || $('.cd-section').length == 0 ) {
      $('.nav-btn').hide();
  	  return false;
    }

    button_nav();

    $html.addClass('cd-section');
    $('.footer').addClass('cd-section');

    var $section_list = $('.cd-section'),
        $sections,
        len = $section_list.length -1,
        section_offset = 0
    ;


    function scroll_to_section(sel, offset_add) {
      selector = (typeof sel === 'undefined' || sel == '')?  get_selector() : sel;
      selector = (typeof selector !== 'undefined' && selector.length > 0)? selector : 'html' ;
      var section_offset = ($(selector).offset().top) - offset_add;
      
      $('html').animate({
        scrollTop: section_offset
      }, 'slow');
    }

    function get_selector() {
    	if ( !executed ) {
    		current_selector = ((typeof $section_list[count] !== 'undefined' && len > 0) 
    		        	    ? '.'+($section_list[count].classList.value).replace(/\s/g, '.')
    		        	    : 'html')
    		;
    		
        //$('.nav-btn__text').text(count);
    		return current_selector;
    	}
    }

    function button_nav() {
      var $btn_nav = $('.nav-btn');
      if ($btn_nav.offset().top > ($('.bottom-footer').offset().top) - 300) {
      	$btn_nav.addClass('to-top');
      	setTimeout(function () {
      	  $btn_nav.removeClass('nav-btn--active');
      	  $btn_nav.removeClass('arrow-up');
      	}, 1000);
      	count = 0;
      	executed = true;
      } else {
        $btn_nav.removeClass('to-top');
        executed = false;
      }
    }
    
    var home_two_cols_scroll = function () {
      var win_width = window.innerWidth;
      var $contacts = $('.block-two-cols-full-height__col.contacts');
      var $dealer_locator = $('.block-two-cols-full-height__col.dealer-locator');
      var $dealers_section = $dealer_locator.closest('section');
      return function () {
        if (window.innerWidth < 991) {
        	$contacts.addClass('cd-section');
        	$dealer_locator.addClass('cd-section');
        	$dealers_section.removeClass('cd-section');
        	offset_additional = ($('.navbar-fixed-top .navbar-header').height()) - 20;
        } 
        /*
        else if (window.innerWidth < 768) {
        	$contacts.addClass('cd-section');
        	$dealer_locator.addClass('cd-section');
        	$dealers_section.removeClass('cd-section');
        	offset_additional = ($('.navbar-fixed-top .navbar-header').height()) - 80;
        } 
        */
        else {
          $contacts.removeClass('cd-section');
          $dealer_locator.removeClass('cd-section');
          $dealers_section.addClass('cd-section');
          offset_additional = 0;
        }
      };
    }
    
    function to_next_section(e) {
      var offset_add = offset_additional,
          current_btn_offset = $('.nav-btn').offset().top;

      $section_list = $('.cd-section');
      len = $section_list.length -1;

      $nav_btn.addClass('nav-btn--active');
      
      $sections = $section_list.map(function (index, section) {
        if ( section.classList.contains('cd-section') ) {
          return {
            "selector": '.'+(section.classList.value).replace(/\s/g, '.'),
            "offset": $('.'+(section.classList.value).replace(/\s/g, '.')).offset().top
          };
        }
      });
  
      if (count >= len || selector === '.') {
        count = 0;
        scroll_to_section(selector, offset_add);
      }
      else if ((count - 1) >= 0 && typeof $sections[count ] !== 'undefined') {
        /*
        var x = e.clientX,
            y = e.clientY;
        */
        var elementMouseIsOver = document.elementFromPoint(5, 200);
        var $current_section = $(elementMouseIsOver).closest('.cd-section');
        
        /*
        console.log($(selector).get(0));
        console.log($current_section.get(0));
        */
        
        if (typeof $current_section.get(0) !== 'undefined' && typeof $(selector).get(0) !== 'undefined') {
        	if ($current_section.get(0).className == $(selector).get(0).className) {
        	  var $current_sec = $( '.'+($current_section.attr('class')).replace(/\s/g,'.') );
        		count += 1;
        		        scroll_to_section(false, offset_add);
        	} else {
        	  count -= 1;
        		        scroll_to_section(false, offset_add);
        	}
        }
      }
      else {
      	count += 1;
      	scroll_to_section(get_selector(), offset_add);
    	}
    }
    
    var home_two_cols = home_two_cols_scroll()
    home_two_cols();

    document.addEventListener('scroll', function () {
    	button_nav();
    });

    $nav_btn.click(to_next_section);
      
    var last_scroll_top = 0;
    $(window)
      .resize(function () {
        home_two_cols();
        to_next_section();
        button_nav(); 
      })
      .on('mousewheel', function(e) {
      	$('html, body').stop();
      })
      .on('scroll', function (e) {
        st = $(this).scrollTop();
        var $nav_btn = $('.nav-btn');
        if (st < last_scroll_top) {
            $nav_btn
              .addClass('arrow-up')
              .removeClass('arrow-down')
            ;
        } else {
            $nav_btn
              .addClass('arrow-down')
              .removeClass('arrow-up')
            ;
        }
        last_scroll_top = st;
      })
    ;

  })(jQuery);
