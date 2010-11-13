describe('TestObject', {
	'should say foo': function(){
		var resp = TestObject.say('foo');
		expect(resp).toBe("You know what? foo");
	},

	'should say something': function(){
		var resp = TestObject.saySomething();
		expect(resp).toBe("You know what? something");
	},


	'should create element': function(){
		var element = document.createElement('div');
		expect(element.tagName).toBe("DIV");
	},


	'should find an element by id': function(){
		var element = document.id('foo');
		expect(element.tagName).toBe("DIV");
	}
});
