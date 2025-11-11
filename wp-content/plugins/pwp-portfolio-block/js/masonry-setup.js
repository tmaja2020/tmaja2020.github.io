(function ($) {
  'use strict'

  /* Masonry --------------------- */
  function masonrySetup () {
    var $container = $('.pwp-masonry-container')
    $container.masonry({
      gutter: '.pwp-grid-spacer',
      itemSelector: '.pwp-masonry-wrapper'
    })
  }

  /* Isotope --------------------- */
  function isotopeSetup () {
    $('.pwp-portfolio, .pwp-posts').each(function (index, obj) {
      var filterID = obj.getAttribute('data-id')
      var $grid = $('#' + filterID + ' .pwp-masonry-container.pwp-isotope')
      // Quick search regex
      var qsRegex

      // init Isotope
      $grid.imagesLoaded(function () {
        $grid.isotope({
          itemSelector: '.pwp-masonry-wrapper',
          percentPosition: true,
          masonry: {
            gutter: '.pwp-grid-spacer'
          }
        })
      })

      // use value of search field to filter
      $('#' + filterID + ' .pwp-filter-search').on('click', 'input', function () {
        $('.pwp-filter-buttons button').off('click')
        var $quicksearch = $('.quicksearch').keyup(debounce(function () {
          qsRegex = new RegExp($quicksearch.val(), 'gi')
          $grid.isotope({
            filter: function () {
              return qsRegex ? $(this).text().match(qsRegex) : true
            }
          })
        }, 200))
      })

      $('#' + filterID + ' .pwp-filter-buttons').on('click', 'button', function () {
        var filterValue = $(this).attr('data-filter')
        $grid.isotope({ filter: filterValue })
      })

      // debounce so filtering doesn't happen every millisecond
      function debounce (fn, threshold) {
        var timeout
        threshold = threshold || 100
        return function debounced () {
          clearTimeout(timeout)
          var args = arguments
          var _this = this
          function delayed () {
            fn.apply(_this, args)
          }
          timeout = setTimeout(delayed, threshold)
        }
      }
    })
  }

  $(document).ready(() => {
    isotopeSetup()
    masonrySetup()
  });

  $(window).on('resize', () => {
    isotopeSetup()
    masonrySetup()
  });
})(jQuery)
