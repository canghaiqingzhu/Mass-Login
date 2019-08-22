$(function(){
  /**比较运算**/
    /**大于**/
    console.log(R.gt(2)(1));//true
    console.log(R.gt('a')('z'));//false
    /**大于等于**/
    console.log(R.gte(2)(2));//true
    console.log(R.gte('a')('z'));//false
    /**小于**/
    console.log(R.lt(2)(1));//false
    console.log(R.lt('a')('z'));//true
    /**小于等于**/
    console.log(R.lte(2)(2));//true
    console.log(R.lte('a')('z'));//true
    /**是否相等**/
    console.log(R.equals(1)(1));//true
    console.log(R.equals(1)('1'));//false
    console.log(R.equals([1, 2, 3])([1, 2, 3]));//true
    var a = {};
    a.v = a;
    var b = {};
    b.v = b;
    console.log(R.equals(a)(b));//true
    /**两个值传入指定函数,运算结果是否相等**/
    console.log(R.eqBy(Math.abs, 5)(-5));//true
  /**数学运算**/
    /**加法**/
    console.log(R.add(7)(10));//17
    /**减法**/
    console.log(R.subtract(10)(8));//2
    /**乘法**/
    console.log(R.multiply(2)(5));//10
    /**除法**/
    console.log(R.divide(71)(100));//0.71
  /**逻辑运算**/
    /**或运算,相当于||**/
    var gt10 = function(x){
    	return x>10;
    }
    var even = function(x){
    	return x%2===0;
    }
    var f = R.either(gt10, even);
    console.log(f(101));//true
    console.log(f(8));//true
    /**与运算,相当于&&**/
    var f = R.both(gt10, even);
    console.log(f(15));//false
    console.log(f(30));//true
    /**一个函数数组都返回true的时候为true**/
    var isEvenAndGt10 = R.allPass([gt10, even]);
    console.log(isEvenAndGt10(15));//false
    console.log(isEvenAndGt10(30));//true
  /**字符串**/
    /**拆分成数组**/
    console.log(R.split('.')('a.b.c.xyz.d'));//['a', 'b', 'c', 'xyz', 'd']
    /**判断是否匹配正则表达式**/
    console.log(R.test(/^x/)('xyz'));//true
    console.log(R.test(/^y/)('xyz'));//false
    /**返回匹配结果**/
    console.log(R.match(/([a-z]a)/g)('bananas'));//['ba', 'na', 'na']
    console.log(R.match(/a/)('b'));//[]
    //console.log(R.match(/a/)(null));//TypeError: null does not have a method named "match"
  /**函数**/
  /**函数的合成**/
    /**多个函数合并为一个函数,从右到左执行**/
    console.log(R.compose(Math.abs, R.add(1), R.multiply(2))(-4));//7
    /**多个函数合并为一个函数,从左到右执行**/
    var negative = function(x){
    	return -1*x;
    }
    var increaseOne = function(x){
    	return x+1;
    }
    var f = R.pipe(Math.pow, negative, increaseOne);
    console.log(f(3, 4));//-80 => -(3^4) + 1
    /**接受两个参数，第一个参数是函数，第二个参数是函数数组。传入的值先使用第二个参数包含的函数分别处理以后，再用第一个参数处理前一步生成的结果**/
    var sumOfArr = function(arr){
    	var sum = 0;
    	arr.forEach(function(i){
    		return sum+=i;
    	});
    	return sum;
    }
    var lengthOfArr = function(arr){
    	return arr.length;
    }
    var average = R.converge(R.divide, [sumOfArr, lengthOfArr])
    console.log(average([1, 2, 3, 4, 5, 6, 7]));//4
    var toUpperCase = function(s){
    	return s.toUpperCase();
    }
    var toLowerCase = function(s){
    	return s.toLowerCase();
    }
    var strangeConcat = R.converge(R.concat, [toUpperCase, toLowerCase]);
    console.log(strangeConcat("Yodel"));//"YODELyodel"
  /**柯里化**/
    /**将多参数的函数，转换成单参数的形式**/
    var addFourNumbers = function(a, b, c, d){
    	return a+b+c+d;
    }
    var curriedAddFourNumbers = R.curry(addFourNumbers);
    var f = curriedAddFourNumbers(1, 2);
    var g = f(3);
    console.log(g(4));//10
    /**允许多参数的函数接受一个数组，指定最左边的部分参数**/
    var multiply2 = function(a, b){
    	return a*b;
    }
    var double = R.partial(multiply2, [2]);
    console.log(double(2));//4
    var greet = function(salutation, title, firstName, lastName){
    	return salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
    }
    var sayHello = R.partial(greet, ['Hello']);
    var sayHelloToMs = R.partial(sayHello, ['Ms.']);
    console.log(sayHelloToMs('Jane', 'Jones'));//'Hello, Ms. Jane Jones!'
    /**允许多参数的函数接受一个数组，指定最右边的部分参数**/
    var greet = function(salutation, title, firstName, lastName){
    	return salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
    }
    var greetMsJaneJones = R.partialRight(greet, ['Ms.', 'Jane', 'Jones']);
    console.log(greetMsJaneJones('Hello'));//'Hello, Ms. Jane Jones!'
    /**接受一个函数fn和一个函数数组fnList作为参数，返回fn的柯里化版本。该新函数的参数，先分别经过对应的fnList成员处理，再传入fn执行**/
    var decreaseOne = function(x){
    	return x-1;
    }
    var increaseOne = function(x){
    	return x+1;
    }
    console.log(R.useWith(Math.pow, [decreaseOne, increaseOne])(3, 4));//32
    console.log(R.useWith(Math.pow, [decreaseOne, increaseOne])(3)(4));//32
    /**返回一个函数，会缓存每一次的运行结果**/
    var productOfArr = function(arr){
    	var product = 1;
    	arr.forEach(function(i){
    		return product*=i;
    	});
    	return product;
    }
    var count = 0;
    var factorial = R.memoize(function(n){
    	count += 1;
    	return productOfArr(R.range(1, n + 1));
    });
    console.log(factorial(5));//120
    console.log(factorial(5));//120
    console.log(factorial(5));//120
    console.log(count);//1
    /**返回一个新函数，如果原函数返回true，该函数返回false；如果原函数返回false，该函数返回true**/
    var gt10 = function(x){
    	return x>10;
    }
    var lte10 = R.complement(gt10);
    console.log(gt10(7));//false
    console.log(lte10(7));//true
  /**函数的执行**/
    /**参数函数执行时，只传入最前面两个参数**/
    var takesThreeArgs = function(a, b, c){
    	return [a, b, c];
    };
    var takesTwoArgs = R.binary(takesThreeArgs);
    console.log(takesTwoArgs(1, 2, 3));//[1, 2, undefined]
    /**将一个值传入指定函数，并返回该值**/
    var sayX = function(x){
    	console.log('x is ' + x);
    }
    console.log(R.tap(sayX)(100));//100
    console.log(R.pipe(R.assoc('a', 2),R.tap(sayX),R.assoc('a', 3))({a: 1}));//{a: 3}
    /**将两个数组对应位置的值，一起作为参数传入某个函数**/
    var f = function(x, y){
    	// ...
    }
    console.log(R.zipWith(f, [1, 2, 3])(['a', 'b', 'c']));//[f(1, 'a'), f(2, 'b'), f(3, 'c')]
    /**将数组转成参数序列，传入指定函数**/
    var nums = [1, 2, 3, -99, 42, 6, 7];
    console.log(R.apply(Math.max)(nums));//42
    /**返回一个模板函数，该函数会将参数传入模板内的函数执行，然后将执行结果填充到模板**/
    var getMetrics = R.applySpec({
    	sum: R.add,
    	nested: { mul: R.multiply }
    });
    console.log(getMetrics(2, 4));//{ sum: 6, nested: { mul: 8 } }
    /**返回一个升序排列的比较函数，主要用于排序**/
    var byAge = R.ascend(R.prop('age'));
    var people = [
      // ...
    ];
    var peopleByYoungestFirst = R.sort(byAge)(people);
    /**返回一个降序排列的比较函数，主要用于排序**/
    var byAge = R.descend(R.prop('age'));
    var people = [
      // ...
    ];
    var peopleByOldestFirst = R.sort(byAge)(people);
  /**数组**/
    /**如果包含某个成员，返回true**/
    console.log(R.contains(3)([1, 2, 3]));//true
    console.log(R.contains(4)([1, 2, 3]));//false
    console.log(R.contains({ name: 'Fred' })([{ name: 'Fred' }]));//true
    console.log(R.contains([42])([[42]]));//true
    /**所有成员都满足指定函数时，返回true，否则返回false**/
    var equals3 = R.equals(3);
    console.log(R.all(equals3)([3, 3, 3, 3]));//true
    console.log(R.all(equals3)([3, 3, 1, 3]));//false
    /**只要有一个成员满足条件，就返回true**/
    var lessThan0 = R.flip(R.lt)(0);
    var lessThan2 = R.flip(R.lt)(2);
    console.log(R.any(lessThan0)([1, 2]));//false
    console.log(R.any(lessThan2)([1, 2]));//true
    /**没有成员满足条件时，返回true**/
    var isEven = function(n){
    	return n%2==0;
    }
    console.log(R.none(isEven)([1, 3, 5, 7, 9, 11]));//true
    console.log(R.none(isEven)([1, 3, 5, 7, 8, 11]));//false
    /**返回数组的第一个成员**/
    console.log(R.head(['fi', 'fo', 'fum']));//'fi'
    console.log(R.head([]));//undefined
    console.log(R.head('abc'));//'a'
    console.log(R.head(''));//''
    /**返回数组的最后一个成员**/
    console.log(R.last(['fi', 'fo', 'fum']));//'fum'
    console.log(R.last([]));//undefined
    console.log(R.last('abc'));//'c'
    console.log(R.last(''));//''
    /**返回第一个成员以外的所有成员组成的新数组**/
    console.log(R.tail([1, 2, 3]));//[2, 3]
    console.log(R.tail([1, 2]));//[2]
    console.log(R.tail([1]));//[]
    console.log(R.tail([]));//[]
    console.log(R.tail('abc'));//'bc'
    console.log(R.tail('ab'));//'b'
    console.log(R.tail('a'));//''
    console.log(R.tail(''));//''
    /**返回最后一个成员以外的所有成员组成的新数组**/
    console.log(R.init([1, 2, 3]));//[1, 2]
    console.log(R.init([1, 2]));//[1]
    console.log(R.init([1]));//[]
    console.log(R.init([]));//[]
    console.log(R.init('abc'));//'ab'
    console.log(R.init('ab'));//'a'
    console.log(R.init('a'));//''
    console.log(R.init(''));//''
    /**取出指定位置的成员**/
    var list = ['foo', 'bar', 'baz', 'quux'];
    console.log(R.nth(1)(list));//'bar'
    console.log(R.nth(-1)(list));//'quux'
    console.log(R.nth(-99)(list));//undefined
    console.log(R.nth(2)('abc'));//'c'
    console.log(R.nth(3)('abc'));//''
    /**取出前 n 个成员**/
    console.log(R.take(1)(['foo', 'bar', 'baz']));//['foo']
    console.log(R.take(2)(['foo', 'bar', 'baz']));//['foo', 'bar']
    console.log(R.take(3)(['foo', 'bar', 'baz']));//['foo', 'bar', 'baz']
    console.log(R.take(4)(['foo', 'bar', 'baz']));//['foo', 'bar', 'baz']
    console.log(R.take(3)('ramda'));//'ram'
    /**取出后 n 个成员**/
    console.log(R.takeLast(1)(['foo', 'bar', 'baz']));//['baz']
    console.log(R.takeLast(2)(['foo', 'bar', 'baz']));//['bar', 'baz']
    console.log(R.takeLast(3)(['foo', 'bar', 'baz']));//['foo', 'bar', 'baz']
    console.log(R.takeLast(4)(['foo', 'bar', 'baz']));//['foo', 'bar', 'baz']
    console.log(R.takeLast(3)('ramda'));//'mda'
    /**从起始位置（包括）开始，到结束位置（不包括）为止，从原数组截取出一个新数组**/
    console.log(R.slice(1, 3)(['a', 'b', 'c', 'd']));//['b', 'c']
    console.log(R.slice(1, Infinity)(['a', 'b', 'c', 'd']));//['b', 'c', 'd']
    console.log(R.slice(0, -1)(['a', 'b', 'c', 'd']));//['a', 'b', 'c']
    console.log(R.slice(-3, -1)(['a', 'b', 'c', 'd']));//['b', 'c']
    console.log(R.slice(0, 3)('ramda'));//'ram'
    /**移除开始位置后的n个成员**/
    console.log(R.remove(2, 3)([1,2,3,4,5,6,7,8]));//[1,2,6,7,8]
    /**在指定位置插入给定值**/
    console.log(R.insert(2, 'x')([1,2,3,4]));//[1,2,'x',3,4]
    /**在指定位置，插入另一个数组的所有成员**/
    console.log(R.insertAll(2, ['x','y','z'])([1,2,3,4]));//[1,2,'x','y','z',3,4]
    /**在数组头部插入一个成员**/
    console.log(R.prepend('fee')(['fi', 'fo', 'fum']));//['fee', 'fi', 'fo', 'fum']
    /**在数组尾部追加新的成员**/
    console.log(R.append('tests')(['write', 'more']));//['write', 'more', 'tests']
    console.log(R.append('tests')([]));//['tests']
    console.log(R.append(['tests'])(['write', 'more']));//['write', 'more', ['tests']]
    /**在数组成员之间插入表示分隔的成员**/
    console.log(R.intersperse('n')(['ba', 'a', 'a']));//['ba', 'n', 'a', 'n', 'a']
    /**将数组合并成一个字符串，并在成员之间插入分隔符**/
    console.log(R.join('|')([1, 2, 3]));//'1|2|3'
    /**过滤出符合条件的成员**/
    var isEven = function(n){
    	return n%2===0;
    }
    console.log(R.filter(isEven)([1, 2, 3, 4]));//[2, 4]
    /**过滤出所有不满足条件的成员**/
    var isOdd = function(n){
    	return n%2===1;
    }
    console.log(R.reject(isOdd)([1, 2, 3, 4]));//[2, 4]
    /**一旦满足条件，后面的成员都会被过滤**/
    var isNotFour = function(x){
    	return x!==4;
    }
    console.log(R.takeWhile(isNotFour)([1, 2, 3, 4, 3, 2, 1]));//[1, 2, 3]
    /**一旦不满足条件，取出剩余的所有成员**/
    var lteTwo = function(x){
    	return x<=2;
    }
    console.log(R.dropWhile(lteTwo)([1, 2, 3, 4, 3, 2, 1]));//[3, 4, 3, 2, 1]
    /**返回指定值以外的成员**/
    console.log(R.without([1, 2])([1, 2, 1, 3, 4]));//[3, 4]
    /**对每个成员执行指定函数以后，返回一个对象，表示各种执行结果分别包含多少成员**/
    var numbers = [1.0, 1.1, 1.2, 2.0, 3.0, 2.2];
    console.log(R.countBy(Math.floor)(numbers));//{'1': 3, '2': 2, '3': 1}
    var letters = ['a', 'b', 'A', 'a', 'B', 'c'];
    console.log(R.countBy(R.toLower)(letters));// {'a': 3, 'b': 2, 'c': 1}
    /**在给定位置，将原数组分成两个部分**/
    console.log(R.splitAt(1)([1, 2, 3]));//[[1], [2, 3]]
    console.log(R.splitAt(5)('hello world'));//['hello', ' world']
    console.log(R.splitAt(-1)('foobar'));//['fooba', 'r']
    /**按照指定的个数，将原数组分成多个部分**/
    console.log(R.splitEvery(3)([1, 2, 3, 4, 5, 6, 7]));//[[1, 2, 3], [4, 5, 6], [7]]
    console.log(R.splitEvery(3)('foobarbaz'));//['foo', 'bar', 'baz']
    /**以第一个满足指定函数的成员为界，将数组分成两个部分**/
    console.log(R.splitWhen(R.equals(2))([1, 2, 3, 1, 2, 3]));//[[1], [2, 3, 1, 2, 3]]
    /**每个成员与其后给定数量的成员分成一组，这些组构成一个新的数组**/
    console.log(R.aperture(3)([1, 2, 3, 4, 5, 6, 7]));//[[1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7]]
    /**根据是否满足指定函数，将成员分区**/
    console.log(R.partition(R.contains('s'))(['sss', 'ttt', 'foo', 'bars']));//=> [ [ 'sss', 'bars' ],  [ 'ttt', 'foo' ] ]
    /**某个值在数组中第一次出现的位置**/
    console.log(R.indexOf(3)([1,2,3,4]));//2
    console.log(R.indexOf(10)([1,2,3,4]));//-1
    /**某个值在数组中最后一次出现的位置**/
    console.log(R.lastIndexOf(3)([-1,3,3,0,1,2,3,4]));//6
    console.log(R.lastIndexOf(10)([1,2,3,4]));//-1
    /**数组的每个成员依次执行某个函数**/
    var double = function(x){
    	return x*2;
    }
    console.log(R.map(double)([1, 2, 3]));//[2, 4, 6]
    /**与map类似，区别是遍历函数可以额外获得两个参数：索引位置和原数组**/
    var mapIndexed = R.addIndex(R.map);
    console.log(mapIndexed(function	(val, idx){
    	return idx + '-' + val, ['f', 'o', 'o', 'b', 'a', 'r'];
    }));//['0-f', '1-o', '2-o', '3-b', '4-a', '5-r']
    /**数组的每个成员依次执行某个函数，总是返回原数组**/
    var printXPlusFive = function(x){
    	console.log(x + 5);
    }
    console.log(R.forEach(printXPlusFive, [1, 2, 3]));//[1, 2, 3]
    /**数组成员依次执行指定函数，每一次的运算结果都会进入一个累积变量**/
    var mySubtract = function (a, b) {
    	return a - b;
    };
    console.log(R.reduce(mySubtract, 0)([1, 2, 3, 4]));//-10
    /**与reduce类似，区别是数组成员从左到右执行**/
    console.log(R.reduceRight(R.subtract, 0)([1, 2, 3, 4]));//-2
    /**与reduce类似，区别是有一个判断函数，一旦数组成员不符合条件，就停止累积**/
    var isOdd = function(acc, x){
    	return x%2=== 1;
    }
    var xs = [1, 3, 5, 60, 777, 800];
    console.log(R.reduceWhile(isOdd, R.add, 0)(xs));//9
    var ys = [2, 4, 6];
    console.log(R.reduceWhile(isOdd, R.add, 111)(ys));//111
    /**按照给定函数，对数组进行排序**/
    var diff = function(a, b) { return a - b; };
    console.log(R.sort(diff)([4,2,7,5]));//[2, 4, 5, 7]
    /**按照给定的一组函数，进行多重排序**/
    var alice = {
    	name: 'alice',
    	age: 40
    };
    var bob = {
    	name: 'bob',
    	age: 30
    };
    var clara = {
    	name: 'clara',
    	age: 40
    };
    var people = [clara, bob, alice];
    var ageNameSort = R.sortWith([R.descend(R.prop('age')),R.ascend(R.prop('name'))]);
    console.log(ageNameSort(people));//=> [alice, clara, bob]
    /**对指定位置的成员执行给定的函数**/
    console.log(R.adjust(R.add(10),1)([1, 2, 3]));//[1, 12, 3]
    console.log(R.adjust(R.add(10),1)([1, 2, 3]));//[1, 12, 3]
    /**数组成员分别执行一组函数，将结果合成为一个新数组**/
    console.log(R.ap([R.multiply(2), R.add(3)])([1,2,3]));//[2, 4, 6, 4, 5, 6]
    console.log(R.ap([R.concat('tasty '), R.toUpper])(['pizza', 'salad']));//["tasty pizza", "tasty salad", "PIZZA", "SALAD"]
    /**将嵌套数组铺平**/
    console.log(R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]));//[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    /**将数组成员依次按照指定条件两两比较，并按照结果将所有成员放入子数组**/
    console.log(R.groupWith(R.equals)([0, 1, 1, 2, 3, 5, 8, 13, 21]));//[[0], [1, 1], [2], [3], [5], [8], [13], [21]]
    console.log(R.groupWith(function(a, b){return a % 2 === b % 2})([0, 1, 1, 2, 3, 5, 8, 13, 21]));//[[0], [1, 1], [2], [3, 5], [8], [13, 21]]
    
//    console.log(R.groupWith(R.eqBy(isVowel), 'aestiou'));//=> ['ae', 'st', 'iou']
    /**将两个数组合并成一个数组**/
    console.log(R.concat('ABC')('DEF'));//'ABCDEF'
    console.log(R.concat([4, 5, 6])([1, 2, 3]));//[4, 5, 6, 1, 2, 3]
    console.log(R.concat([])([]));//[]
    /**将两个数组指定位置的成员放在一起，生成一个新数组**/
    console.log(R.zip([1, 2, 3])(['a', 'b', 'c']));//[[1, 'a'], [2, 'b'], [3, 'c']]
    /**将两个数组指定位置的成员分别作为键名和键值，生成一个新对象**/
    console.log(R.zipObj(['a', 'b', 'c'])([1, 2, 3]));//{a: 1, b: 2, c: 3}
    /**将两个数组的成员两两混合，生成一个新数组**/
    console.log(R.xprod([1, 2])(['a', 'b']));//[[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
    /**返回两个数组相同的成员组成的新数组**/
    console.log(R.intersection([1,2,3,4], [7,6,5,4,3]));//[4, 3]
    /**返回经过某种运算，有相同结果的两个成员**/
    var buffaloSpringfield = [
    	{id: 824, name: 'Richie Furay'},
    	{id: 956, name: 'Dewey Martin'},
    	{id: 313, name: 'Bruce Palmer'},
    	{id: 456, name: 'Stephen Stills'},
    	{id: 177, name: 'Neil Young'}
    ];
    var csny = [
    	{id: 204, name: 'David Crosby'},
    	{id: 456, name: 'Stephen Stills'},
    	{id: 539, name: 'Graham Nash'},
    	{id: 177, name: 'Neil Young'}
    ];
    console.log(R.intersectionWith(R.eqBy(R.prop('id')),buffaloSpringfield)(csny));//[{id: 456, name: 'Stephen Stills'}, {id: 177, name: 'Neil Young'}]
    /**返回第一个数组不包含在第二个数组里面的成员**/
    console.log(R.difference([1,2,3,4])([7,6,5,4,3]));//[1,2]
    console.log(R.difference([7,6,5,4,3])([1,2,3,4]));//[7,6,5]
    console.log(R.difference([{a: 1}, {b: 2}])([{a: 1}, {c: 3}]));//[{b: 2}]
    /**返回执行指定函数后，第一个数组里面不符合条件的所有成员**/
    var cmp = function(x, y){
    	return x.a === y.a;
    }
    var l1 = [{a: 1}, {a: 2}, {a: 3}];
    var l2 = [{a: 3}, {a: 4}];
    console.log(R.differenceWith(cmp, l1)(l2));//[{a: 1}, {a: 2}]
    /**返回两个数组的非共有成员所组成的一个新数组**/
    console.log(R.symmetricDifference([1,2,3,4])([7,6,5,4,3]));//[1,2,7,6,5]
    console.log(R.symmetricDifference([7,6,5,4,3])([1,2,3,4]));//[7,6,5,1,2]
    /**根据指定条件，返回两个数组所有运算结果不相等的成员所组成的新数组**/
    var eqA = R.eqBy(R.prop('a'));
    var l1 = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
    var l2 = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
    console.log(R.symmetricDifferenceWith(eqA, l1, l2));//[{a: 1}, {a: 2}, {a: 5}, {a: 6}]
    /**返回符合指定条件的成员**/
    var xs = [{a: 1}, {a: 2}, {a: 3}];
    console.log(R.find(R.propEq('a', 2))(xs));//{a: 2}
    console.log(R.find(R.propEq('a', 4))(xs));//undefined
    /**返回符合指定条件的成员的位置**/
    var xs = [{a: 1}, {a: 2}, {a: 3}];
    console.log(R.findIndex(R.propEq('a', 2))(xs));//1
    console.log(R.findIndex(R.propEq('a', 4))(xs));//-1
    /**返回最后一个符合指定条件的成员**/
    var xs = [{a: 1, b: 0}, {a:1, b: 1}];
    console.log(R.findLast(R.propEq('a', 1))(xs));//{a: 1, b: 1}
    console.log(R.findLast(R.propEq('a', 4))(xs));//undefined
    /**返回最后一个符合指定条件的成员的位置**/
    var xs = [{a: 1, b: 0}, {a:1, b: 1}];
    console.log(R.findLastIndex(R.propEq('a', 1))(xs));//1
    console.log(R.findLastIndex(R.propEq('a', 4))(xs));//-1
    /**取出数组成员的某个属性，组成一个新数组**/
    console.log(R.pluck('a')([{a: 1}, {a: 2}]));//[1, 2]
    console.log(R.pluck(0)([[1, 2], [3, 4]]));//[1, 3]
    /**取出数组成员的多个属性，组成一个新数组**/
    var abby = {name: 'Abby', age: 7, hair: 'blond', grade: 2};
    var fred = {name: 'Fred', age: 12, hair: 'brown', grade: 7};
    var kids = [abby, fred];
    console.log(R.project(['name', 'grade'])(kids));//[{name: 'Abby', grade: 2}, {name: 'Fred', grade: 7}]
    /**将每个成员相同位置的值，组成一个新数组**/
    console.log(R.transpose([[1, 'a'], [2, 'b'], [3, 'c']]));//[[1, 2, 3], ['a', 'b', 'c']]
    console.log(R.transpose([[1, 2, 3], ['a', 'b', 'c']]));//[[1, 'a'], [2, 'b'], [3, 'c']]
    console.log(R.transpose([[10, 11], [20], [], [30, 31, 32]]));//[[10, 20, 30], [11, 31], [32]]
    /**将数组的成员合并成一个对象**/
    console.log(R.mergeAll([{foo:1},{bar:2},{baz:3}]));//{foo:1,bar:2,baz:3}
    console.log(R.mergeAll([{foo:1},{foo:2},{bar:2}]));//{foo:2, bar:2}
    /**将嵌套数组转为一个对象**/
    console.log(R.fromPairs([['a', 1], ['b', 2], ['c', 3]]));//{a: 1, b: 2, c: 3}
    /**将数组成员按照指定条件分组**/
    var byGrade = R.groupBy(function(student) {
    	var score = student.score;
    	return score < 65 ? 'F' :
    		score < 70 ? 'D' :
    		score < 80 ? 'C' :
    		score < 90 ? 'B' : 'A';
    });
    var students = [{name: 'Abby', score: 84},
    	{name: 'Eddy', score: 58},
    	{name: 'Jack', score: 69}];
    console.log(byGrade(students));//{'A': [{name: 'Dianne', score: 99}],'B': [{name: 'Abby', score: 84}],'F': [{name: 'Eddy', score: 58}]}
    /**根据成员的某个属性排序**/
    var sortByFirstItem = R.sortBy(R.prop(0));
    console.log(sortByFirstItem([[-1, 1], [-2, 2], [-3, 3]]));//[[-3, 3], [-2, 2], [-1, 1]]
    var sortByNameCaseInsensitive = R.sortBy(R.compose(R.toLower, R.prop('name')));
    var alice = {name: 'ALICE', age: 101};
    var bob = {name: 'Bob', age: -10};
    var clara = {name: 'clara', age: 314.159};
    var people = [clara, bob, alice];
    console.log(sortByNameCaseInsensitive(people));//[alice, bob, clara]
  /**对象**/
    /**返回一个布尔值，表示对象自身是否具有该属性**/
    var hasName = R.has('name')
    console.log(hasName({name: 'alice'}));//true
    console.log(hasName({name: 'bob'}));//true
    console.log(hasName({}));//false
    var point = {x: 0, y: 0};
    var pointHas = R.has(R.__, point);
    console.log(pointHas('x'));//true
    console.log(pointHas('y'));//true
    console.log(pointHas('z'));//false
    /**返回一个布尔值，表示对象自身或原型链上是否具有某个属性**/
    function Rectangle(width, height) {
    	this.width = width;
    	this.height = height;
    }
    Rectangle.prototype.area = function() {
    	return this.width * this.height;
    };
    var square = new Rectangle(2, 2);
    console.log(R.hasIn('width')(square));//true
    console.log(R.hasIn('area')(square));//true
    /**如果属性等于给定值，返回true**/
    var abby = {name: 'Abby', age: 7, hair: 'blond'};
    var fred = {name: 'Fred', age: 12, hair: 'brown'};
    var rusty = {name: 'Rusty', age: 10, hair: 'brown'};
    var alois = {name: 'Alois', age: 15, disposition: 'surly'};
    var kids = [abby, fred, rusty, alois];
    var hasBrownHair = R.propEq('hair', 'brown');
    console.log(R.filter(hasBrownHair)(kids));//[fred, rusty]
    /**如果属性等于给定值，返回true**/
    var pred = R.whereEq({a: 1, b: 2});
    console.log(pred({a: 1}));//false
    console.log(pred({a: 1, b: 2}));//true
    console.log(pred({a: 1, b: 2, c: 3}));//true
    console.log(pred({a: 1, b: 1}));//false
    /**如果各个属性都符合指定条件，返回true**/
    var pred = R.where({
    	a: R.equals('foo'),
    	b: R.complement(R.equals('bar')),
    	x: R.gt(10),
    	y: R.lt(20)
    });
    console.log(pred({a: 'foo', b: 'xxx', x: 11, y: 19}));//true
    console.log(pred({a: 'xxx', b: 'xxx', x: 11, y: 19}));//false
    console.log(pred({a: 'foo', b: 'bar', x: 11, y: 19}));//false
    console.log(pred({a: 'foo', b: 'xxx', x: 10, y: 19}));//false
    console.log(pred({a: 'foo', b: 'xxx', x: 11, y: 20}));//false
    /**过滤指定属性**/
    console.log(R.omit(['a', 'd'])({a: 1, b: 2, c: 3, d: 4}));//{b: 2, c: 3}
    /**返回所有满足条件的属性**/
    var isEven = function(n){return n % 2 === 0;} 
    console.log(R.filter(isEven)({a: 1, b: 2, c: 3, d: 4}));//{b: 2, d: 4}
    /**返回所有不满足条件的属性**/
    var isOdd = function(n){return n % 2 === 1;}
    console.log(R.reject(isOdd)({a: 1, b: 2, c: 3, d: 4}));//{b: 2, d: 4}
    /**过滤指定属性**/
    console.log(R.dissoc('b')({a: 1, b: 2, c: 3}));//{a: 1, c: 3}
    /**添加或改写某个属性**/
    console.log(R.assoc('c', 3)({a: 1, b: 2}));//{a: 1, b: 2, c: 3}
    /**根据属性值是否满足给定条件，将属性分区**/
    console.log(R.partition(R.contains('s'))({ a: 'sss', b: 'ttt', foo: 'bars' }));//[ { a: 'sss', foo: 'bars' }, { b: 'ttt' }  ]
    /**返回指定属性组成的新对象**/
    console.log(R.pick(['a', 'd'])({a: 1, b: 2, c: 3, d: 4}));//{a: 1, d: 4}
    console.log(R.pick(['a', 'e', 'f'])({a: 1, b: 2, c: 3, d: 4}));//{a: 1}
    /**与pick类似，但会包括不存在的属性**/
    console.log(R.pickAll(['a', 'd'])({a: 1, b: 2, c: 3, d: 4}));//{a: 1, d: 4}
    console.log(R.pickAll(['a', 'e', 'f'])({a: 1, b: 2, c: 3, d: 4}));//{a: 1, e: undefined, f: undefined}
    /**返回符合条件的属性**/
    var isUpperCase = function(val, key){return key.toUpperCase() === key;} 
    console.log(R.pickBy(isUpperCase)({a: 1, b: 2, A: 3, B: 4}));//{A: 3, B: 4}
    /**返回对象自身属性的属性名组成的新数组**/
    console.log(R.keys({a: 1, b: 2, c: 3}));//['a', 'b', 'c']
    /**返回对象自身的和继承的属性的属性名组成的新数组**/
    var F = function() { this.x = 'X'; };
    F.prototype.y = 'Y';
    var f = new F();
    console.log(R.keysIn(f));//['x', 'y']
    /**返回对象自身的属性的属性值组成的数组**/
    console.log(R.values({a: 1, b: 2, c: 3}));//=> [1, 2, 3]
    /**返回对象自身的和继承的属性的属性值组成的数组**/
    var F = function() { this.x = 'X'; };
    F.prototype.y = 'Y';
    var f = new F();
    console.log(R.valuesIn(f));//['X', 'Y']
    /**将属性值和属性名互换。如果多个属性的属性值相同，只返回最后一个属性**/
    var raceResultsByFirstName = {
    	first: 'alice',
    	second: 'jake',
    	third: 'alice',
    };
    console.log(R.invertObj(raceResultsByFirstName));//{"alice": "third", "jake": "second"}
    /**将属性值和属性名互换，每个属性值对应一个数组**/
    var raceResultsByFirstName = {
    	first: 'alice',
    	second: 'jake',
    	third: 'alice',
    };
    console.log(R.invert(raceResultsByFirstName));//{ 'alice': ['first', 'third'], 'jake':['second'] }
    /**返回对象的指定属性**/
    console.log(R.prop('x')({x: 100}));//100
    console.log(R.prop('x')({}));//undefined
    /**对象的所有属性依次执行某个函数**/
    var double = function(x){return x * 2;}
    console.log(R.map(double)({x: 1, y: 2, z: 3}));//{x: 2, y: 4, z: 6}
    /**与map类似，但是会额外传入属性名和整个对象**/
    var values = { x: 1, y: 2, z: 3 };
    var prependKeyAndDouble = function(num, key, obj){return key + (num * 2);} 
    console.log(R.mapObjIndexed(prependKeyAndDouble)(values));//{ x: 'x2', y: 'y4', z: 'z6' }
    /**每个属性依次执行给定函数，给定函数的参数分别是属性值和属性名，返回原对象**/
    var printKeyConcatValue = function(value, key){console.log(key + ':' + value);} 
    console.log(R.forEachObjIndexed(printKeyConcatValue)({x: 1, y: 2}));//{x: 1, y: 2}
    /**合并两个对象，如果有同名属性，后面的值会覆盖掉前面的值**/
    console.log(R.merge({ 'name': 'fred', 'age': 10 })({ 'age': 40 }));//{ 'name': 'fred', 'age': 40 }
    var resetToDefault = R.merge(R.__, {x: 0});
    console.log(resetToDefault({x: 5, y: 2}));//{x: 0, y: 2}
    /**合并两个对象，如果有同名属性，会使用指定的函数处理**/
    R.mergeWith(
    		R.concat,
    		{ a: true, values: [10, 20] },
    		{ b: true, values: [15, 35] }
    );//{ a: true, b: true, values: [10, 20, 15, 35] }
    /**比较两个对象的指定属性是否相等**/
    var o1 = { a: 1, b: 2, c: 3, d: 4 };
    var o2 = { a: 10, b: 20, c: 3, d: 40 };
    console.log(R.eqProps('a', o1)(o2));//false
    console.log(R.eqProps('c', o1)(o2));//true
    /**对象的属性分别经过一组函数的处理，返回一个新对象**/
    var tomato  = {
    	firstName: '  Tomato ',
    	data: {elapsed: 100, remaining: 1400},
    	id: 123
    };
    var transformations = {
    	firstName: R.trim,
    	lastName: R.trim, // 不会被调用
    	data: {elapsed: R.add(1), remaining: R.add(-1)}
    };
    console.log(R.evolve(transformations)(tomato));//{firstName: 'Tomato',data: {elapsed: 101, remaining: 1399},id: 123}
    /**取出数组中指定路径的值**/
    console.log(R.path(['a', 'b'], {a: {b: 2}}));//2
    console.log(R.path(['a', 'b'], {c: {b: 2}}));//undefined
    /**返回指定路径的值符合条件的成员**/var user1 = { address: { zipCode: 90210 } };
    var user2 = { address: { zipCode: 55555 } };
    var user3 = { name: 'Bob' };
    var users = [ user1, user2, user3 ];
    var isFamous = R.pathEq(['address', 'zipCode'], 90210);
    console.log(R.filter(isFamous)(users));//[ user1 ]
    /**添加或改写指定路径的属性的值**/
    console.log(R.assocPath(['a', 'b', 'c'], 42)({a: {b: {c: 0}}}));//{a: {b: {c: 42}}}
    console.log(R.assocPath(['a', 'b', 'c'], 42)({a: 5}));//{a: {b: {c: 42}}}
  });