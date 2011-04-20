describe( 'Unit ExampleView', function(){
  var view, $element;

  beforeEach( function(){
    $element = Elements.from( '<div><p>test content</p></div>' )[0];
    view = new ExampleView( $element );
  });

  describe( 'prepareElement()', function(){
    beforeEach( function(){
      view.prepareElement();
    });

    it( 'should set width and height', function(){
      expect( $element.style.width ).toBe( '100px' );
      expect( $element.style.height ).toBe( '200px' );
    });

    it( 'should set color', function(){
      expect( $element.style.backgroundColor ).toBe( '#eaeaea' );
    });
  });


  describe( 'addTriggers()', function(){
    beforeEach( function(){
      view.addTriggers();
    });

    it( 'should add a "show" trigger', function(){
      expect( $element.getElement( 'a.show' ) ).not.toBeNull();
    });

    it( 'should add a "hide" trigger', function(){
      expect( $element.getElement( 'a.hide' ) ).not.toBeNull();
    });
  });


  describe( 'show()', function(){
    beforeEach( function(){
      view.$content.hide();
      view.show();
    });

    it( 'should show the content text', function(){
      expect( view.$content.style.display ).toBe( 'block' );
    });
  });


  describe( 'hide()', function(){
    beforeEach( function(){
      view.hide();
    });

    it( 'should hide the content text', function(){
      expect( view.$content.style.display ).toBe( 'none' );
    });
  });
});

