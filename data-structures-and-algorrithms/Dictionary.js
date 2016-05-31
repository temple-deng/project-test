/**
 * 字典结构类 Dictionary 的实现.
 */

function Dictionary() {
    this.items = {}
}

Dictionary.prototype.has = function(key) {
    return this.items.hasOwnProperty(key);
}

Dictionary.prototype.set = function(key, value) {
    this.items[key] = value;
};

Dictionary.prototype.remove = function(key) {
    if(this.has(key)) {
        delete this.items[key];
        return true;
    }

    return false;
};

Dictionary.prototype.get = function(key) {
    if(this.has(key)) {
        return this.items[key];
    }

    return undefined;
}

Dictionary.prototype.values = function() {
    var values = [];
    for(var k in this.items) {
        if(this.has(k)) {
            values.push(this.items[k]);
        }
    }

    return values;
};