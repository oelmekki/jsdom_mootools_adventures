(function(){
this.ExampleView = new Class({ 
  Implements: [ Options ],

  options: {
  },

  initialize: function( $element ){
    this.$element = $element;
    this.$content = $element.getElement( 'p' );
  },

  prepareElement: function(){
    this.$element.setStyles({ 
      'width': 100,
      'height': 200,
      'background-color': '#eaeaea'
    });
  },


  addTriggers: function(){
    this.$show = new Element( 'a.show[href="#"][text="show"]' ).inject( this.$element, 'top' );
    this.$hide = new Element( 'a.hide[href="#"][text="hide"]' ).inject( this.$element, 'top' );
  },


  getShowLink: function(){
    return this.$show;
  },


  getHideLink: function(){
    return this.$hide;
  },


  show: function(){
    this.$content.show();
  },


  hide: function(){
    this.$content.hide();
  }
});
}).apply( typeof exports == 'undefined' ? this : global );

