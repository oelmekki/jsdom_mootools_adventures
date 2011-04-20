describe( 'Unit ExampleController', function(){
  var controller, view, $element;

  beforeEach( function(){
    $element = Elements.from( '<div><p>test content</p></div>' )[0];
    view = getMock( 'ExampleView', {
      prepareElement: true,
      show: true,
      hide: true
    });

    controller = new ExampleController( $element, { View: view });
  });


  describe( 'show()', function(){
    beforeEach( function(){
      var mock_event = { stop: function(){} };

      controller.show( mock_event );
    });

    it( 'should ask view to show the content', function(){
      expect( view.prototype.show.used ).toBe( 1 );
    });
  });


  describe( 'hide()', function(){
    beforeEach( function(){
      var mock_event = { stop: function(){} };

      controller.hide( mock_event );
    });

    it( 'should ask view to show the content', function(){
      expect( view.prototype.hide.used ).toBe( 1 );
    });
  });
});
