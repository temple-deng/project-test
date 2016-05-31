function Stack() {
	this.items = [];
}

Stack.prototype.push = function (elem) {
	this.items.push(elem);
}

Stack.prototype.pop = function () {
	return this.items.pop();
}

Stack.prototype.peek = function () {
	if(this.items.length === 0 )
		return 'the stack is empty';
	else
		return this.items[this.items.length-1];
}

Stack.prototype.isEmpty = function () {
	return this.items.length === 0;
}

Stack.prototype.size = function () {
	return this.items.length;
}

Stack.prototype.clear = function () {
	this.items.length = 0;
}

Stack.prototype.print = function () {
	return console.log(this.items.toString());
}                                          
