/**
 * 双向列表的实现类 DoublyLinkedList
 */

function DoublyLinkedList() {

    this.length = 0;
    this.head = null;
    this.tail = null;

}

function Node(elem) {
    this.value = elem;
    this.next = null;
    this.prev = null;
}

DoublyLinkedList.prototype.insert = function(pos, elem) {
    if(pos < 0 || pos > this.length) {
        return false;
    }

    var node = new Node(elem),
        current = this.head,
        previous,
        length = this.length;

    // 在头部插入
    if(pos === 0) {
        if(!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            node.next = current;
            current.prev = node;
            this.head = node;
        }
    }  // 在尾部插入
    else if(pos === length) {
        current = this.tail;
        current.next = node;
        node.prev = current;
        this.tail = node;
    }
    else {
        for(var i = 0; i < pos; i++) {
            previous = current;
            current = current.next;
        }

        previous.next  = node;
        node.prev = previous;
        node.next = current;
        current.prev = node;
    }

    this.length++;
    return true
}