describe( 'Functionnal ExampleClass', function(){
  var controller, $element;

  beforeEach( function(){
    $element = Elements.from( '<div><p>test content</p></div>' )[0];
    controller = new ExampleController( $element );
    controller.run();
  });

  describe( 'initialization', function(){
    it( 'should style the container', function(){
      expect( $element.style.width ).toBe( '100px' );
      expect( $element.style.height ).toBe( '200px' );
      expect( $element.style.backgroundColor ).toBe( '#eaeaea' );
    });

    it( 'should add a "show" link', function(){
      expect( $element.getElement( 'a.show' ) ).not.toBeNull();
    });

    it( 'should add a "hide" link', function(){
      expect( $element.getElement( 'a.hide' ) ).not.toBeNull();
    });
  });

  describe( 'when clicking on the hide button', function(){
    var mock_event;

    beforeEach( function(){
      mock_event = { stop: new Moock.Stub( true )};
      $element.getElement( 'a.hide' ).fireEvent( 'click', mock_event );
    });

    it( 'should hide the content', function(){
      expect( $element.getElement( 'p' ).style.display ).toBe( 'none' );
    });

    it( 'should stop the event propagation', function(){
      expect( mock_event.stop.used ).toBe( 1 );
    });
  });

  describe( 'when clicking on the show button', function(){
    var mock_event;

    beforeEach( function(){
      mock_event = { stop: new Moock.Stub( true )};
      $element.getElement( 'p' ).hide();
      $element.getElement( 'a.show' ).fireEvent( 'click', mock_event );
    });

    it( 'should show the content', function(){
      expect( $element.getElement( 'p' ).style.display ).toBe( 'block' );
    });

    it( 'should stop the event propagation', function(){
      expect( mock_event.stop.used ).toBe( 1 );
    });
  });
});
