/**
 * 哈希表（散列表）的 HashTable 的实现
 */
function HashTable() {
    this.table = [];
}

/**
 * 基本Hashtable的实现
 */
(function() {
    /**
     * 用字符编码值来当做hash值，当要注意双字节字符的问题，但是好像也没什么问题
     * @param key
     * @returns {number}
     */
    HashTable.prototype.loseloseHashCode = function (key) {
        var hash = 0;
        for (var i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }

        return  hash % 37;
    }

    HashTable.prototype.put = function (key, value) {
        var position = this.loseloseHashCode(key);
        this.table[position] = value;
    };

    HashTable.prototype.get = function (key) {
        return this.table[this.loseloseHashCode(key)];
    };

    HashTable.prototype.remove = function (key) {
        this.table[this.loseloseHashCode(key)] = undefined;
    }
})();

/**
 * 分离链接法解决散列表的冲突，这种方法是为散列表的每一个位置创建一个链表将元素存储在里面
 */
(function() {
    /**
     * 辅助类
     * @param key
     * @param value
     * @constructor
     */
    var ValuePair = function (key, value) {
        this.key = key;
        this.value = value;
        this.toString = function () {
            return '[' + this.key + ' - ' + this.value + ']';
        };
    };


    /**
     *
     * @param key
     * @param value
     */
    HashTable.prototype.put = function (key, value) {
        var position = this.loseloseHashCode(key);

        if(this.table[position] == undefined) {
            this.table[position] = new LinkedList();
        }

        this.table[position].append(new ValuePair(key, value));
    };


    HashTable.prototype.get = function (key) {
        var position = this.loseloseHashCode(key);
        if(this.table[position] == undefined) {
            return undefined;
        }

        var current = this.table[position].getHead();
        while(current.next) {
            if(current.value.key === key) {
                return current.value.value;
            }
            current = current.next;
        }

        // 检查在链表最后一个节点的情况或者只有一个节点的情况
        if(current.value.key === key) {
            return current.value.value;
        }
    };

    HashTable.prototype.remove = function (key) {
        var position = this.loseloseHashCode(key);

        if(this.table[position] == undefined) {
            return false;
        }

        var current = this.table[position].getHead();
        while(current.next) {
            if(current.value.key === key) {
                this.table[position].remove(current.value);

                if(this.table[position].isEmpty()) {
                    this.table[position] = undefined;
                }

                return true;
            }

            current = current.next;
        }

        if(current.value.key === key) {
            this.table[position].remove(current.value);

            if(this.table[position].isEmpty()) {
                this.table[position] = undefined;
            }

            return true;
        }
    }
})();

/**
 * 线性探查法解决散列表冲突，这种方法是当想向表中某个位置加入一个新元素的时候，如果索引为index的位置
 * 已经被占据了，就尝试index+1的位置。如果index+1位置被占据了就尝试index+2的位置，依次类推
 */
(function () {
    /**
     * 辅助类
     * @param key
     * @param value
     * @constructor
     */
    var ValuePair = function (key, value) {
        this.key = key;
        this.value = value;
        this.toString = function () {
            return '[' + this.key + ' - ' + this.value + ']';
        };
    };


    /**
     *
     * @param key
     * @param value
     */
    HashTable.prototype.put = function (key, value) {
        var position = this.loseloseHashCode(key);

        if(this.table[position] === undefined) {
            this.table[position] = new ValuePair(key, value);
        }
        else {
            var index = ++position;
            while(this.table[index] !== undefined) {
                index++;
            }
            this.table[index] = new ValuePair(key, value);
        }
    };


    /**
     * 这种get方法理论上好像有bug啊，如果插入的元素位置推后，然后把原位置的元素remove掉
     * 那原位置就是undefined，但是这个键值理论上是存在的啊
     * @param key
     */
    HashTable.prototype.get = function (key) {
        var position = this.loseloseHashCode(key);

        if(this.table[position] === undefined) {
            return undefined;
        }
        // 后面的省略了....

    };

    HashTable.prototype.remove = function (key) {
        var position = this.loseloseHashCode(key);

        if(this.table[position] == undefined) {
            return false;
        }

        var current = this.table[position].getHead();
        while(current.next) {
            if(current.value.key === key) {
                this.table[position].remove(current.value);

                if(this.table[position].isEmpty()) {
                    this.table[position] = undefined;
                }

                return true;
            }

            current = current.next;
        }

        if(current.value.key === key) {
            this.table[position].remove(current.value);

            if(this.table[position].isEmpty()) {
                this.table[position] = undefined;
            }

            return true;
        }
    }
})();