(function(){
this.ExampleController = new Class({ 
  Implements: [ Options, Timeout ],

  options: {
    View: ExampleView
  },

  initialize: function( $element, options ){
    this.setOptions( options );
    this.$element = $element;
    this.view = new this.options.View( $element );
  },

  run: function(){
    this.view.prepareElement();
    this.view.addTriggers();

    this.view.getShowLink().addEvent( 'click', this.show.bind( this ) );
    this.view.getHideLink().addEvent( 'click', this.hide.bind( this ) );
  },


  show: function( event ){
    event.stop();
    this.view.show();
  },


  hide: function( event ){
    event.stop();
    this.setTimeout( this.view.hide.bind( this.view ), 500 );
  }
});
}).apply( typeof exports == 'undefined' ? this : global );
