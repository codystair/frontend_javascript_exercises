const App = {
  handleMouseEnter: function(event) {
    const idx = $('img').index($(event.target));
    const $caption = $('figcaption').eq(idx);

    this.timer = setTimeout(function() {
      $caption.fadeIn();
    }, 2000);
  },

  handleMouseLeave: function(event) {
    const idx = $('img').index($(event.target));
    const $caption = $('figcaption').eq(idx);

    if (this.timer) {
      clearTimeout(this.timer);
    }

    $caption.fadeOut();
  },

  init: function() {
    $('img').on('mouseenter', this.handleMouseEnter.bind(this));
    $('img').on('mouseleave', this.handleMouseLeave.bind(this));
  }
};

App.init();
