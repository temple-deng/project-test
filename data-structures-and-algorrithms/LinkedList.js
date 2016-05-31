function LinkedList () {
	this.head = null;
	this.length = 0;
}

function Node (elem) {
	this.value = elem;
	this.next = null;
}

LinkedList.prototype.getHead = function () {
    return this.head;
};

/**
 * 在链表尾部插入元素
 * @param elem 要插入的元素
 */
LinkedList.prototype.append = function (elem) {
	var node = new Node(elem),
		current;

	// 链表为空时插入第一个元素
	if(this.head === null) {
		this.head = node;
	}
	else {
		current = this.head;

		while(current.next) {
			current = current.next;
		}

		current.next = node;
	}
	
	this.length++;
};

/**
 * 在指定的位置插入元素
 * @param {Number} position 插入位置
 * @param {*} elem
 * @returns elem or false  返回插入的元素，如果插入失败返回false
 */
LinkedList.prototype.insert = function (position, elem) {
	var node = new Node(elem),
		i = 0,
		current = this.head,
        prev = null;

    // 位置不合法返回false
	if(position < 0 || position > this.size()) {
		return false;
	}

    if(position === 0 ) {
        this.head = node;
        node.next = current;
    }
    else {
        for(; i < position; i++) {
            prev = current;
            current = current.next;
        }

        prev.next = node;
        node.next = current;
    }

    this.length++;
    return node.value;
};


/**
 * 移除指定位置的元素
 * @param position
 * @returns {*}  返回移除的元素，移除失败返回false
 */
LinkedList.prototype.removeAt = function (position) {
    if(position < 0 || position > this.size()) {
        return null;
    }

    var current = this.head;
    var prev = null;
    if(position === 0 ){
        this.head = current.next;
    }
    else {
        for(var i = 0;i < position; i++) {
            prev = current;
            current = current.next;
        }
        prev.next = current.next;
    }

    this.length-- ;

    return current.value;
};


LinkedList.prototype.remove = function (elem) {
        var index = this.indexOf(elem);
        return this.removeAt(index);
};

/**
 * 查找元素的索引，注意只能找到一个符合元素的索引，返回 -1 表示未找到
 * @param elem
 * @returns {number}
 */
LinkedList.prototype.indexOf = function (elem) {
    var current = this.head;

    var length = this.size();
    for(var i = 0; i < length; i++) {
        if(current.value === elem) {
            return i;
        }

        current = current.next;
    }

    return -1;
};

LinkedList.prototype.isEmpty = function () {
    return this.length === 0;
};

LinkedList.prototype.size = function () {
	return this.length;
};


LinkedList.prototype.toString = function () {
    var current = this.head,
        string = '';

    while(current) {
        string = current.value;
        current = current.next;
    }

    return string;
};

LinkedList.prototype.print = function () {
    console.log(this.toString());
};