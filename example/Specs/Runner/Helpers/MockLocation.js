(function(){

var MockLocation = function(){
	this.href = window.location.href;
};

var mock_location = this.mock_location = new MockLocation();

}).apply(typeof exports == 'undefined' ? this : global);
