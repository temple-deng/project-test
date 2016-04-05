# underscore

标签（空格分隔）： 未分类

---

###   1.Collections(集合（数组和对象）)
1. **_.each(list, iteratee, [context]);        Alias: forEach**
    没什么好说的，遍历List.如果传递了context参数，则把iteratee绑定到context对象上(这个还没试验过)。iteratee就是遍历函数，如果是数组三个参数就是(element, index, list),如果是对象就是(value, key, list)

2. _.map(list, iteratee, [context])   @return newArray   Alias: collect  
    这个也没什么好说的。。。，同上， 

3.  _.reduce(list, iteratee, [memory], [context])   @return unknown type   Aliases: inject, foldl
```
    var arr=[1,2,3,4];  var i =0;
    var sum = _.reduce(arr, function(x,y){
                        i++;
                        return x+y;}, 0);
    //sum =10; i = 4;
    var sum = _.reduce(arr, function(x,y){
                        i++;
                        return x+y;});
    //sum=10, i=3
```

4. _.find(list, predicate, [context])   @return element or undefined   Alias: detect
    返回第一个通过断言的元素值，没有的话就返回undefined。注意返回后遍历就结束了，所以即使有多个满足断言的元素也只返回第一个。

5. ** _.filter(list, predicate, [context])   @return newArray or []   Alias: select**
    这里和上面predicate的参数除了element，应该也有index(key)和list

6. **  _.where(list, properties)  @return newArray or []**
    这个东西有点复杂，properties可能是一个对象（说可能是因为传入字面量也可以，但返回结果不是预期的样子）。 返回的数组元素包含properties里的所有键-值对。

7. ** _.findWhere(list, properties)   @return 应该是个object或者 undefined**
    这个就是上面函数返回的第一个值

8. ** _.reject(list, predicate, [context])  @return newArray or []**
    返回没通过断言的元素，与filter相反

9. ** _.every(list, [predicate], [context])  @return boolean    Alias: all**

10. ** _.some(list, [predicate], [context])  @return boolean     Alias: any**
    注意有提前中断遍历的效果

11. **_.contains(list, value, [fromIndex])  @return boolean    Alias: includes**
    如果list包含指定的value则返回true（使用===检测）。如果list是数组，内部使用indexOf判断。使用fromIndex来给定开始检索的索引位置。 