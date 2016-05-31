/**
 * 集合类 Set 的实现
 * 这种实现的缺点是传入的字面量都被当做字符串对待
 */

function Set() {
    this.items = {}
}


Set.prototype.add = function (value) {

    if(!this.has(value)) {
        this.items[value] = value;
        return true;
    }

    return false;
};

Set.prototype.remove = function(value) {
    if(this.has(value)) {
        delete this.items[value];
        return value;
    }

    return null;
};

Set.prototype.has = function(value) {
    return this.items.hasOwnProperty(value);
};

Set.prototype.clear = function() {
    this.items = {};
};

Set.prototype.size = function() {
    return Object.keys(this.items).length;
};

Set.prototype.values = function () {
    return Object.keys(this.items);
};


Set.prototype.union = function (otherSet) {
    var unionSet = new Set();
    var values = this.values();
    var length = this.size();
    for(var i = 0; i < length; i++) {
        unionSet.add(values[i]);
    }


    var otherSetValues = otherSet.values();
    var oLength = otherSet.size();

    for(i = 0; i < oLength; i++) {
        if(!this.has(otherSetValues[i])) {
            unionSet.add(otherSetValues[i]);
        }
    }

    return unionSet;
};

Set.prototype.intersection = function (otherSet) {
    var intersectionSet = new Set();
    var values = this.values();

    for(var i = 0; i < values.length; i++) {
        if(otherSet.has(values[i])) {
            intersectionSet.add(values[i]);
        }
    }

    return intersectionSet;
};

/**
 * 差集，在A中但不在B中
 */
Set.prototype.difference = function (otherSet) {
    var differenceSet = new Set();
    var values = this.values();

    for(var i = 0; i < values.length; i++) {
        if(!otherSet.has(values[i])) {
            differenceSet.add(values[i]);
        }
    }

    return differenceSet;
}