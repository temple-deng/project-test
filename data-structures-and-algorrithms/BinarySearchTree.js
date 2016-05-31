/**
 * 二叉搜索树的实现。
 */

function BinarySearchTree() {
    this.root = null;
}

function Node (key) {
    this.key = key;
    this.left = null;
    this.right = null;
}

BinarySearchTree.prototype.insert = function (key) {
    var newNode = new Node(key);

    if(this.root === null) {
        this.root = newNode;
    }
    else {
        this.insertNode(this.root, newNode);
    }
};

BinarySearchTree.prototype.insertNode = function (node, newNode) {
    if(newNode.key < node.key) {
        if (node.left === null) {
            node.left = newNode;
        }
        else {
            this.insertNode(node.left, newNode);
        }
    }
    else {
        if(node.right === null) {
            node.right = newNode;
        }
        else {
            this.insertNode(node.right, newNode);
        }
    }
};

/**
 * 中序遍历， 先遍历左子树，然后是当前节点，然后遍历右子树
 * @param callback
 */
BinarySearchTree.prototype.inOrderTraverse = function (callback) {
    this.inOrderTraverseNode(this.root, callback);
};

BinarySearchTree.prototype.inOrderTraverseNode = function (node, callback) {
    if (node !== null) {
        this.inOrderTraverseNode(node.left, callback);
        callback(node.key);
        this.inOrderTraverseNode(node.right, callback);
    }
};

/**
 * 先序遍历， 先是当前节点，然后遍历左子树，然后遍历右子树
 * @param callback
 */
BinarySearchTree.prototype.preOrderTraverse = function (callback) {
    this.preOrderTraverseNode(this.root, callback);
};

BinarySearchTree.prototype.preOrderTraverseNode = function (node, callback) {
    if(node !== null) {
        callback(node.key);
        this.preOrderTraverseNode(node.left, callback);
        this.preOrderTraverseNode(node.right, callback);
    }
};

BinarySearchTree.prototype.postOrderTraverse = function (callback) {
    this.postOrderTraverseNode(this.root, callback);
};

BinarySearchTree.prototype.postOrderTraverseNode = function (node, callback) {
    if(node !== null) {
        this.postOrderTraverseNode(node.left, callback);
        this.postOrderTraverseNode(node.right, callback);
        callback(node.key);
    }
};

BinarySearchTree.prototype.min = function () {
    return this.minNode(this.root);
};

BinarySearchTree.prototype.minNode = function (node) {
    if(node) {
        while(node && node.left !== null) {
            node = node.left;
        }

        return node.key;
    }

    return null;
};

BinarySearchTree.prototype.max = function () {
    return this.maxNode(this.root);
};

BinarySearchTree.prototype.maxNode = function (node) {
    if(node) {
        while(node && node.right !== null) {
            node = node.right;
        }

        return node.key;
    }

    return null;
};

BinarySearchTree.prototype.search = function (key) {
    return this.searchNode(this.root, key);
};

BinarySearchTree.prototype.searchNode = function (node, key) {
    if(node) {
        if(key < node.key) {
            return this.searchNode(node.left, key);
        }
        else if (key > node.key) {
            return this.searchNode(node.right, key);
        }
        else {
            return true;
        }
    }

    return false;
};

BinarySearchTree.prototype.remove = function (key) {
    this.root = this.removeNode(this.root, key);
};

BinarySearchTree.prototype.removeNode = function (node, key) {
    if(node === null) {
        return null;
    }

    if(key < node.key) {
        node.left = this.removeNode(node.left, key);
        return node;
    }
    else if(key > node.key) {
        node.right = this.removeNode(node.right, key);
        return node;
    }
    else {
        if(node.left === null && node.right === null) {
            node = null;
            return node;
        }

        if(node.left === null) {
            node = node.right;
            return node;
        } else if(node.right === null) {
            node = node.left;
            return node;
        }

        var aux = this.findMinNode(node.right);
        node.key = aux.key;
        node.right = this.removeNode(node.right, aux.key);
        return node;
    }
};