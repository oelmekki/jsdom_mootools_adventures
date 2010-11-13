describe('TestObject', {
	'should say foo': function(){
		var resp = TestObject.say('foo');
		expect(resp).toBe("You know what? foo");
	},

	'should say something': function(){
		var resp = TestObject.saySomething();
		expect(resp).toBe("You know what? something");
	}
});
