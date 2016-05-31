/**
 * 排序算法.
 */

function ArrayList () {
    this.array = [];

    this.insert = function (item) {
        this.array.push(item);
    };

    this.toString = function () {
        return this.array.join();
    }
}

/**
 * 冒泡排序，每一轮外循环都把一个大数排列到最后
 */
ArrayList.prototype.bubbleSort = function () {
    var length = this.array.length;
    for (var i = 0; i < length; i++) {     // 由于要将所有数都冒泡过，所以外层循环次数为 n
        for(var j = 0; j< length-1-i; j++) {      // 每轮循环要进行 n-1 次比较，每次外层循环完后都会有一个大数拍到最后，所以内层循环次数为 n-1-i
            if(this.array[j] > this.array[j + 1]) {
                this.swap(j, j+1);
            }
        }
    }
};

ArrayList.prototype.swap = function (index1, index2) {
    var temp = this.array[index1];
    this.array[index1] = this.array[index2];
    this.array[index2] = temp;
};


/**
 * 选择排序，找到数据结构中的最小值并将其放置到第一位，接着找到第二小的值并将其放在第二位，依次类推
 */
ArrayList.prototype.selectionSort = function () {
    var length = this.array.length;
    var indexMin;
    for (var i = 0; i < length-1; i++) {  // 只要找到前n-1个最小值就可以
        indexMin = i;
        for(var j=i;j<length;j++) {         // 从已排好的最小值后一位开始循环到末尾
            if(this.array[indexMin] > this.array[j]) {
                indexMin = j;
            }
        }

        if(indexMin !== i) {
            this.swap(i, indexMin);
        }
    }
};

/**
 * 插入排序，每次排一个数组项，以此方式构建最后的排序数组。假定第一项已经排序好了，
 * 接着它和第二项进行比较，第二项是应该待在原位还是拍到第一项之前呢，这样，头两项就已经正确排序了，
 * 接着和第三项比较，以此类推
 */
ArrayList.prototype.insertionSort = function () {
    var length = this.array.length;
    var j, temp;
    for (var i =1; i< length; i++) {
         j=i;
         temp = this.array[i];

        while(j > 0 && this.array[j-1] > temp) {
            this.array[j] = this.array[j-1];
            j--;
        }

        this.array[j] = temp;
    }
};

/**
 * 归并排序，将原始数组切分成较小的数组，直到每个小数组只有一个位置，接着将小数组归并成较大的数组，
 * 直到最后只有一个排序完毕的大数组
 */
ArrayList.prototype.mergeSort = function () {
    this.array = this.mergeSortRec(this.array);
};

ArrayList.prototype.mergeSortRec = function (array) {
    var length = array.length;
    if(length === 1) {
        return array;
    }

    var mid = Math.floor(length/2),
        left = array.slice(0, mid),
        right = array.slice(mid);
    return this.merge(this.mergeSortRec(left), this.mergeSortRec(right));
};

ArrayList.prototype.merge = function (left, right) {
     var result = [],
         il = 0,
         ir = 0;

    while(il < left.length && ir < right.length) {
        if(left[il] < right[ir]) {
            result.push(left[il++]);
        } else {
            result.push(right[ir++]);
        }
    }

        while(il < left.length) {
            result.push(left[il++]);
        }

        while(ir < right.length) {
            result.push(right[ir++]);
        }

        return result;

};

ArrayList.prototype.quickSort = function () {
    this.quick(this.array, 0, this.array.length-1);
};

ArrayList.prototype.quick = function (array, left, right) {
    var index;

    if(array.length > 1) {
        index = this.partition(array, left, right);

        if(left < index -1 ) {
            this.quick(array, left, index-1);
        }

        if(index < right) {
            this.quick(array, index, right);
        }
    }
};

ArrayList.prototype.partition = function (array, left, right) {
  var pivot = array[Math.floor((right+left)/2)],
      i = left,
      j = right;

    while(i <=j) {
        while(array[i] < pivot) {
            i++;
        }
        while(array[j] > pivot) {
            j--;
        }
        if(i<=j) {
            swapQuickSort(array, i, j);
            i++;
            j--;
        }
    }
    return i;
};



Array.prototype.quick_sort = function() {
    var len = this.length;
    if (len <= 1)
        return this.slice(0);
    var left = [];
    var right = [];
    var mid = [this[0]];
    for (var i = 1; i < len; i++)
        if (this[i] < mid[0])
            left.push(this[i]);
        else
            right.push(this[i]);
    return left.quick_sort().concat(mid.concat(right.quick_sort()));
};