(function ($, wp) {
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
    $('.pwp-portfolio').each(function (index, obj) {
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

  function subscribeToEditorChanges() {
    let lastKnownBlockCount = wp.data.select('core/block-editor').getBlockCount();

    wp.data.subscribe(() => {
      const currentBlockCount = wp.data.select('core/block-editor').getBlockCount();
      const selectedBlock = wp.data.select('core/block-editor').getSelectedBlock();

      if (currentBlockCount !== lastKnownBlockCount || selectedBlock) {
        lastKnownBlockCount = currentBlockCount;
        setTimeout(() => {
          isotopeSetup();
          masonrySetup();
        }, 1000); // Delay to ensure DOM updates are completed
      }
    });
  }

  $(document).ready(() => {
    isotopeSetup()
    masonrySetup()

    if (wp.data && wp.blocks) {
      subscribeToEditorChanges();
    }
  });

  $(window).on('resize', () => {
    isotopeSetup()
    masonrySetup()
  });
})(jQuery, wp)
