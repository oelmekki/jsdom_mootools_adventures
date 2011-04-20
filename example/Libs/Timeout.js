/*
---

name: Timeout

description: Provides a wrapper to avoid shortcoming of timeout in testing environment

license: MIT-style license.

author: Olivier El Mekki

requires: Class

provides: [Timeout]

...
*/
(function(){
this.Timeout = new Class({ 
   setTimeout: function( func, timeout ){
      if ( typeof exports != 'undefined' || typeof jasmine != 'undefined' ){
         func();
      }

      else {
         return window.setTimeout( func, timeout );
      }
   }
});
}).apply( typeof exports == 'undefined' ? this : global );
