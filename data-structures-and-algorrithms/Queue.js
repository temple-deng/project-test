function Queue () {
	this.items = [];
}

// 入队操作，新加入的元素在队列尾部
Queue.prototype.enqueue = function (elem) {
	this.items.push(elem);
}

// 出队操作，将队列的第一个元素弹出并返回
Queue.prototype.dequeue = function () {
	if(this.isEmpty())
		return 'the queue is empty';
	return this.items.shift();
}

// 返回队列头部的第一个元素
Queue.prototype.front = function () {
	if(this.isEmpty())
		return 'the queue is empty';
	return this.items[0];
}

Queue.prototype.isEmpty = function () {
	return this.items.length === 0;
}

Queue.prototype.size = function () {
	return this.items.length;
}

Queue.prototype.print = function () {
	console.log(this.items.toString());
}