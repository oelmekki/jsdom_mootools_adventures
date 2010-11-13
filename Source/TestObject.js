TestObject = {
	say: function(sentence){
		return "You know what? " + sentence;
	},

	saySomething: function(){
		return this.say("something");
	}
};
