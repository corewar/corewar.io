/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TokenCategory; });
var TokenCategory;
(function (TokenCategory) {
    TokenCategory[TokenCategory["Label"] = 0] = "Label";
    TokenCategory[TokenCategory["Opcode"] = 1] = "Opcode";
    TokenCategory[TokenCategory["Preprocessor"] = 2] = "Preprocessor";
    TokenCategory[TokenCategory["Modifier"] = 3] = "Modifier";
    TokenCategory[TokenCategory["Mode"] = 4] = "Mode";
    TokenCategory[TokenCategory["Number"] = 5] = "Number";
    TokenCategory[TokenCategory["Comma"] = 6] = "Comma";
    TokenCategory[TokenCategory["Maths"] = 7] = "Maths";
    TokenCategory[TokenCategory["EOL"] = 8] = "EOL";
    TokenCategory[TokenCategory["Comment"] = 9] = "Comment";
    TokenCategory[TokenCategory["Unknown"] = 10] = "Unknown";
})(TokenCategory || (TokenCategory = {}));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (true) {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.8.3';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = property('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }

    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0;
    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0, len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    return _.unzip(arguments);
  };

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a predicate test
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions
  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
            i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  }

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys =  _.keys(obj),
          length = keys.length,
          results = {},
          currentKey;
      for (var index = 0; index < length; index++) {
        currentKey = keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(object, oiteratee, context) {
    var result = {}, obj = object, iteratee, keys;
    if (obj == null) return result;
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);
      iteratee = function(value, key, obj) { return key in obj; };
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), and in Safari 8 (#1929).
  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = property;

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    return obj == null ? function(){} : function(key) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return '' + this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
      return _;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
}.call(this));


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TokenStream__ = __webpack_require__(7);

class PassBase {
    process(context, options) {
        // TODO CONSTANTS - need to define core settings at compile time
        // TODO P-Space
        // TODO ;redcode tags
        // TODO stringify and FOR variables
        // TODO loader should check against run options e.g. no P-space etc.
        this.context = context;
        this.stream = new __WEBPACK_IMPORTED_MODULE_0__TokenStream__["a" /* TokenStream */](context.tokens, context.messages);
        this.context.tokens = [];
        this.options = options;
        this.processLines();
        return this.context;
    }
    processLines() {
        while (!this.stream.eof()) {
            try {
                this.processLine();
            }
            catch (err) {
                this.stream.readToEOL();
            }
        }
    }
    processLine() {
        throw new Error("PassBase.processLine is an Abstract Method");
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PassBase;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Standard; });
var Standard;
(function (Standard) {
    Standard[Standard["ICWS86"] = 0] = "ICWS86";
    Standard[Standard["ICWS88"] = 1] = "ICWS88";
    Standard[Standard["ICWS94draft"] = 2] = "ICWS94draft";
})(Standard || (Standard = {}));


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageType; });
var MessageType;
(function (MessageType) {
    MessageType[MessageType["Error"] = 0] = "Error";
    MessageType[MessageType["Warning"] = 1] = "Warning";
    MessageType[MessageType["Info"] = 2] = "Info";
})(MessageType || (MessageType = {}));


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return OpcodeType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModifierType; });
var OpcodeType;
(function (OpcodeType) {
    OpcodeType[OpcodeType["DAT"] = 0] = "DAT";
    OpcodeType[OpcodeType["MOV"] = 1] = "MOV";
    OpcodeType[OpcodeType["ADD"] = 2] = "ADD";
    OpcodeType[OpcodeType["SUB"] = 3] = "SUB";
    OpcodeType[OpcodeType["MUL"] = 4] = "MUL";
    OpcodeType[OpcodeType["DIV"] = 5] = "DIV";
    OpcodeType[OpcodeType["MOD"] = 6] = "MOD";
    OpcodeType[OpcodeType["JMP"] = 7] = "JMP";
    OpcodeType[OpcodeType["JMZ"] = 8] = "JMZ";
    OpcodeType[OpcodeType["JMN"] = 9] = "JMN";
    OpcodeType[OpcodeType["DJN"] = 10] = "DJN";
    OpcodeType[OpcodeType["CMP"] = 11] = "CMP";
    OpcodeType[OpcodeType["SEQ"] = 12] = "SEQ";
    OpcodeType[OpcodeType["SNE"] = 13] = "SNE";
    OpcodeType[OpcodeType["SLT"] = 14] = "SLT";
    OpcodeType[OpcodeType["SPL"] = 15] = "SPL";
    OpcodeType[OpcodeType["NOP"] = 16] = "NOP";
    OpcodeType[OpcodeType["Count"] = 17] = "Count";
})(OpcodeType || (OpcodeType = {}));
var ModifierType;
(function (ModifierType) {
    ModifierType[ModifierType["A"] = 0] = "A";
    ModifierType[ModifierType["B"] = 1] = "B";
    ModifierType[ModifierType["AB"] = 2] = "AB";
    ModifierType[ModifierType["BA"] = 3] = "BA";
    ModifierType[ModifierType["F"] = 4] = "F";
    ModifierType[ModifierType["X"] = 5] = "X";
    ModifierType[ModifierType["I"] = 6] = "I";
    ModifierType[ModifierType["Count"] = 7] = "Count";
})(ModifierType || (ModifierType = {}));


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModeType; });
var ModeType;
(function (ModeType) {
    ModeType[ModeType["Immediate"] = 0] = "Immediate";
    ModeType[ModeType["Direct"] = 1] = "Direct";
    ModeType[ModeType["AIndirect"] = 2] = "AIndirect";
    ModeType[ModeType["BIndirect"] = 3] = "BIndirect";
    ModeType[ModeType["APreDecrement"] = 4] = "APreDecrement";
    ModeType[ModeType["BPreDecrement"] = 5] = "BPreDecrement";
    ModeType[ModeType["APostIncrement"] = 6] = "APostIncrement";
    ModeType[ModeType["BPostIncrement"] = 7] = "BPostIncrement"; // >
})(ModeType || (ModeType = {}));


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interface_IToken__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_IMessage__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__TokenHelper__ = __webpack_require__(15);



class TokenStream {
    constructor(tokens, messages) {
        this.position = 0;
        this.tokens = tokens;
        this.messages = messages;
    }
    eof() {
        return this.position >= this.tokens.length;
    }
    peek() {
        return this.tokens[this.position];
    }
    read() {
        return this.tokens[this.position++];
    }
    readToEOL() {
        var result = [];
        while (!this.eof()) {
            var token = this.read();
            result.push(token);
            if (token.category === __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].EOL) {
                break;
            }
        }
        return result;
    }
    warn(token, message) {
        this.messages.push({
            position: token.position,
            text: message,
            type: __WEBPACK_IMPORTED_MODULE_1__interface_IMessage__["a" /* MessageType */].Warning
        });
    }
    expectOnly(lexeme) {
        if (this.eof()) {
            this.error(_(this.tokens).last(), "Expected '" + lexeme + "', got end of file");
        }
        var token = this.read();
        if (token.lexeme !== lexeme) {
            this.expected("'" + lexeme + "'", token);
        }
        return token;
    }
    expect(category) {
        if (this.eof()) {
            this.error(_(this.tokens).last(), "Expected '" + __WEBPACK_IMPORTED_MODULE_2__TokenHelper__["a" /* TokenHelper */].categoryToString(category) + "', got end of file");
        }
        var token = this.read();
        if (token.category !== category) {
            this.expected(__WEBPACK_IMPORTED_MODULE_2__TokenHelper__["a" /* TokenHelper */].categoryToString(category), token);
        }
        return token;
    }
    expected(expected, got) {
        this.messages.push({
            type: __WEBPACK_IMPORTED_MODULE_1__interface_IMessage__["a" /* MessageType */].Error,
            position: got.position,
            text: "Expected " + expected + ", got " + __WEBPACK_IMPORTED_MODULE_2__TokenHelper__["a" /* TokenHelper */].tokenToString(got)
        });
        throw "";
    }
    error(token, message) {
        this.messages.push({
            position: token.position,
            text: message,
            type: __WEBPACK_IMPORTED_MODULE_1__interface_IMessage__["a" /* MessageType */].Error
        });
        throw "";
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TokenStream;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreAccessType; });
var CoreAccessType;
(function (CoreAccessType) {
    CoreAccessType[CoreAccessType["read"] = 0] = "read";
    CoreAccessType[CoreAccessType["write"] = 1] = "write";
    CoreAccessType[CoreAccessType["execute"] = 2] = "execute";
})(CoreAccessType || (CoreAccessType = {}));


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interface_IInstruction__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_IOperand__ = __webpack_require__(6);


class Defaults {
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Defaults;

Defaults.coresize = 8000;
Defaults.cyclesBeforeTie = 80000;
Defaults.initialInstruction = {
    address: 0,
    opcode: __WEBPACK_IMPORTED_MODULE_0__interface_IInstruction__["b" /* OpcodeType */].DAT,
    modifier: __WEBPACK_IMPORTED_MODULE_0__interface_IInstruction__["a" /* ModifierType */].F,
    aOperand: {
        mode: __WEBPACK_IMPORTED_MODULE_1__interface_IOperand__["a" /* ModeType */].Direct,
        address: 0
    },
    bOperand: {
        mode: __WEBPACK_IMPORTED_MODULE_1__interface_IOperand__["a" /* ModeType */].Direct,
        address: 0
    }
};
Defaults.instructionLimit = 100;
Defaults.maxTasks = 8000;
Defaults.minSeparation = 100;


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__parser_Parser__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__parser_Scanner__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__parser_ForPass__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__parser_PreprocessCollector__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__parser_PreprocessAnalyser__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__parser_PreprocessEmitter__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__parser_LabelCollector__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__parser_LabelEmitter__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__parser_MathsProcessor__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__parser_Expression__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__parser_Filter__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__parser_DefaultPass__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__parser_OrgPass__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__parser_SyntaxCheck__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__parser_LoadFileSerialiser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__parser_IllegalCommandCheck__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__simulator_Random__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__simulator_Executive__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__simulator_Decoder__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__simulator_Core__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__simulator_Loader__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__simulator_WarriorLoader__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__simulator_Fetcher__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__simulator_Simulator__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__simulator_EndCondition__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__Presentation_InstructionSerialiser__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__Presentation_CoreRenderer__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__Presentation_Presenter__ = __webpack_require__(42);




























var redcode = document.getElementById("redcode");
var loadfile = document.getElementById("loadfile");
var console = document.getElementById("console");
var standard = document.getElementById("standard");
var parseButton = document.getElementById("parseButton");
var runButton = document.getElementById("runButton");
var stepButton = document.getElementById("stepButton");
var canvas = document.getElementById("canvas");
var instructionLabel = document.getElementById("instructionLabel");
var expression = new __WEBPACK_IMPORTED_MODULE_9__parser_Expression__["a" /* Expression */]();
var parser = new __WEBPACK_IMPORTED_MODULE_0__parser_Parser__["a" /* Parser */](new __WEBPACK_IMPORTED_MODULE_1__parser_Scanner__["a" /* Scanner */](), new __WEBPACK_IMPORTED_MODULE_10__parser_Filter__["a" /* Filter */](), new __WEBPACK_IMPORTED_MODULE_2__parser_ForPass__["a" /* ForPass */](expression), new __WEBPACK_IMPORTED_MODULE_3__parser_PreprocessCollector__["a" /* PreprocessCollector */](), new __WEBPACK_IMPORTED_MODULE_4__parser_PreprocessAnalyser__["a" /* PreprocessAnalyser */](), new __WEBPACK_IMPORTED_MODULE_5__parser_PreprocessEmitter__["a" /* PreprocessEmitter */](), new __WEBPACK_IMPORTED_MODULE_6__parser_LabelCollector__["a" /* LabelCollector */](), new __WEBPACK_IMPORTED_MODULE_7__parser_LabelEmitter__["a" /* LabelEmitter */](), new __WEBPACK_IMPORTED_MODULE_8__parser_MathsProcessor__["a" /* MathsProcessor */](expression), new __WEBPACK_IMPORTED_MODULE_11__parser_DefaultPass__["a" /* DefaultPass */](), new __WEBPACK_IMPORTED_MODULE_12__parser_OrgPass__["a" /* OrgPass */](), new __WEBPACK_IMPORTED_MODULE_13__parser_SyntaxCheck__["a" /* SyntaxCheck */](), new __WEBPACK_IMPORTED_MODULE_15__parser_IllegalCommandCheck__["a" /* IllegalCommandCheck */]());
var core = new __WEBPACK_IMPORTED_MODULE_19__simulator_Core__["a" /* Core */]();
var loader = new __WEBPACK_IMPORTED_MODULE_20__simulator_Loader__["a" /* Loader */](new __WEBPACK_IMPORTED_MODULE_16__simulator_Random__["a" /* Random */](), core, new __WEBPACK_IMPORTED_MODULE_21__simulator_WarriorLoader__["a" /* WarriorLoader */](core));
var fetcher = new __WEBPACK_IMPORTED_MODULE_22__simulator_Fetcher__["a" /* Fetcher */]();
var executive = new __WEBPACK_IMPORTED_MODULE_17__simulator_Executive__["a" /* Executive */]();
var decoder = new __WEBPACK_IMPORTED_MODULE_18__simulator_Decoder__["a" /* Decoder */](executive);
var simulator = new __WEBPACK_IMPORTED_MODULE_23__simulator_Simulator__["a" /* Simulator */](core, loader, fetcher, decoder, executive, new __WEBPACK_IMPORTED_MODULE_24__simulator_EndCondition__["a" /* EndCondition */]());
var prez = new __WEBPACK_IMPORTED_MODULE_27__Presentation_Presenter__["a" /* Presenter */](redcode, loadfile, console, standard, parser, new __WEBPACK_IMPORTED_MODULE_14__parser_LoadFileSerialiser__["a" /* LoadFileSerialiser */](), simulator, core, executive);
var coreRenderer;
parseButton.addEventListener("click", () => {
    prez.parse();
});
runButton.addEventListener("click", () => {
    coreRenderer = new __WEBPACK_IMPORTED_MODULE_26__Presentation_CoreRenderer__["a" /* CoreRenderer */](canvas, instructionLabel, core, new __WEBPACK_IMPORTED_MODULE_25__Presentation_InstructionSerialiser__["a" /* InstructionSerialiser */]());
    prez.run();
    coreRenderer.initialise();
});
stepButton.addEventListener("click", () => {
    prez.step();
    coreRenderer.render();
});


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interface_IMessage__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_IParseOptions__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_underscore__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_underscore__);



class Parser {
    constructor(scanner, filter, forPass, preprocessCollector, preprocessAnalyser, preprocessEmitter, labelCollector, labelEmitter, mathsProcessor, defaultPass, orgPass, syntaxCheck, illegalCommandCheck) {
        this.scanner = scanner;
        this.filter = filter;
        this.forPass = forPass;
        this.preprocessCollector = preprocessCollector;
        this.preprocessAnalyser = preprocessAnalyser;
        this.preprocessEmitter = preprocessEmitter;
        this.labelCollector = labelCollector;
        this.labelEmitter = labelEmitter;
        this.mathsProcessor = mathsProcessor;
        this.defaultPass = defaultPass;
        this.orgPass = orgPass;
        this.syntaxCheck = syntaxCheck;
        this.illegalCommandCheck = illegalCommandCheck;
    }
    noErrors(context) {
        return !__WEBPACK_IMPORTED_MODULE_2_underscore__(context.messages).any((message) => {
            return message.type === __WEBPACK_IMPORTED_MODULE_0__interface_IMessage__["a" /* MessageType */].Error;
        });
    }
    parse(document, options) {
        options = __WEBPACK_IMPORTED_MODULE_2_underscore__["defaults"](options || {}, Parser.DefaultOptions);
        var context = this.scanner.scan(document, options);
        if (this.noErrors(context)) {
            context = this.filter.process(context, options);
        }
        if (options.standard === __WEBPACK_IMPORTED_MODULE_1__interface_IParseOptions__["a" /* Standard */].ICWS94draft) {
            if (this.noErrors(context)) {
                context = this.forPass.process(context, options);
            }
        }
        if (this.noErrors(context)) {
            context = this.preprocessCollector.process(context, options);
        }
        if (this.noErrors(context)) {
            context = this.preprocessAnalyser.process(context, options);
        }
        if (this.noErrors(context)) {
            context = this.preprocessEmitter.process(context, options);
        }
        if (this.noErrors(context)) {
            context = this.labelCollector.process(context, options);
        }
        if (this.noErrors(context)) {
            context = this.labelEmitter.process(context, options);
        }
        if (this.noErrors(context)) {
            context = this.mathsProcessor.process(context, options);
        }
        if (this.noErrors(context)) {
            context = this.orgPass.process(context, options);
        }
        if (this.noErrors(context)) {
            context = this.defaultPass.process(context, options);
        }
        if (this.noErrors(context)) {
            context = this.syntaxCheck.process(context, options);
        }
        if (options.standard < __WEBPACK_IMPORTED_MODULE_1__interface_IParseOptions__["a" /* Standard */].ICWS94draft) {
            if (this.noErrors(context)) {
                context = this.illegalCommandCheck.process(context, options);
            }
        }
        return {
            metaData: context.metaData,
            tokens: context.tokens,
            messages: context.messages
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Parser;

Parser.DefaultOptions = {
    standard: __WEBPACK_IMPORTED_MODULE_1__interface_IParseOptions__["a" /* Standard */].ICWS94draft,
    coresize: 8192
};


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interface_IToken__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_IParseOptions__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Context__ = __webpack_require__(13);



class Scanner {
    scan(document, options) {
        document = document.replace(/[\r]/g, "");
        this.context = new __WEBPACK_IMPORTED_MODULE_2__Context__["a" /* Context */]();
        this.position = {
            line: 1,
            char: 1
        };
        var lines = document.split("\n");
        this.options = options;
        this.regex = this.selectRegexes(options.standard);
        lines.forEach((line) => {
            this.readLine(line);
            this.position.line++;
        });
        return this.context;
    }
    selectRegexes(standard) {
        switch (standard) {
            case __WEBPACK_IMPORTED_MODULE_1__interface_IParseOptions__["a" /* Standard */].ICWS94draft:
                return Scanner.ICWS94draftRegex;
            case __WEBPACK_IMPORTED_MODULE_1__interface_IParseOptions__["a" /* Standard */].ICWS88:
                return Scanner.ICWS88Regex;
            case __WEBPACK_IMPORTED_MODULE_1__interface_IParseOptions__["a" /* Standard */].ICWS86:
                return Scanner.ICWS86Regex;
            default:
                throw "Unsupported Corewar Standard";
        }
    }
    readLine(line) {
        var accumulator = "";
        this.position.char = 1;
        for (var charNumber = 0; charNumber < line.length; charNumber++) {
            var c = line[charNumber];
            if (c === "\n") {
                break;
            }
            else if (c === ";") {
                if (accumulator !== "") {
                    this.processAccumulator(accumulator);
                    accumulator = "";
                }
                this.position.char = charNumber + 2;
                this.processComment(line.substr(charNumber));
                break;
            }
            var result = this.regex.Whitespace.exec(c);
            if (result === null) {
                accumulator += c;
            }
            else {
                if (accumulator !== "") {
                    this.processAccumulator(accumulator);
                    accumulator = "";
                }
                this.position.char = charNumber + 2;
            }
        }
        if (accumulator !== "") {
            this.processAccumulator(accumulator);
            accumulator = "";
        }
        this.emitEndOfLine();
    }
    indirectAModeCheck(category, match) {
        if (this.options.standard !== __WEBPACK_IMPORTED_MODULE_1__interface_IParseOptions__["a" /* Standard */].ICWS94draft) {
            return true;
        }
        if (match !== "*") {
            return true;
        }
        // HACK ICWS'94 uses * for both multiply and a field indirect addressing mode
        // If the previous token was an opcode or comma, treat this as an addressing mode
        // otherwise treat it as a multiply
        var previousOpcodeOrComma = this.previous.category === __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Opcode ||
            this.previous.category === __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Modifier ||
            this.previous.category === __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Comma;
        if (category === __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Mode) {
            return previousOpcodeOrComma;
        }
        else if (category === __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Maths) {
            return !previousOpcodeOrComma;
        }
        else {
            return true;
        }
    }
    processAccumulator(accumulator) {
        var result;
        var found = 0;
        var matchToken = (category, re) => {
            result = re.exec(accumulator);
            if (result !== null && result.index === 0 && this.indirectAModeCheck(category, result[0])) {
                accumulator = this.processToken(category, accumulator, result[0], found !== 0);
                this.position.char += result[0].length;
                found++;
                return true;
            }
            return false;
        };
        while (accumulator !== "") {
            if (accumulator[0] === ";") {
                return;
            }
            if (matchToken(__WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Comma, this.regex.CommaRE)) {
                continue;
            }
            if (matchToken(__WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Modifier, this.regex.ModifierRE)) {
                continue;
            }
            if (matchToken(__WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Mode, this.regex.ModeRE)) {
                continue;
            }
            if (matchToken(__WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Number, this.regex.NumberRE)) {
                continue;
            }
            if (matchToken(__WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Maths, this.regex.MathsRE)) {
                continue;
            }
            if (matchToken(__WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Opcode, this.regex.OpcodeRE)) {
                continue;
            }
            if (matchToken(__WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Preprocessor, this.regex.PreprocessorRE)) {
                continue;
            }
            if (matchToken(__WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Label, this.regex.LabelRE)) {
                continue;
            }
            if (matchToken(__WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Comment, this.regex.CommentRE)) {
                continue;
            }
            accumulator = this.processToken(__WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Unknown, accumulator, accumulator, found !== 0);
        }
    }
    processComment(lexeme) {
        this.emit(__WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Comment, lexeme);
    }
    isCaseInsensitive(category) {
        return category === __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Opcode ||
            category === __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Modifier ||
            category === __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Preprocessor;
    }
    processToken(category, accumulator, lexeme, found) {
        // HACK ICWS'88/86 has optional commas and delimits operands using whitespace but this parser does not tokenise whitespace.
        // This workaround will allow a plus/minus to begin an operand and disallows whitespace after a maths operator.
        // This means that the following operands are not interpretted as a single expression: MOV 0 -1 bcomes MOV 0, -1 not MOV -1
        if (this.options.standard <= __WEBPACK_IMPORTED_MODULE_1__interface_IParseOptions__["a" /* Standard */].ICWS88) {
            if (!found && category === __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Maths &&
                (lexeme === "-" || lexeme === "+")) {
                this.emit(__WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Number, "0");
            }
            else if (category === __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Maths && accumulator.length === 1) {
                category = __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Unknown;
            }
        }
        if (this.isCaseInsensitive(category)) {
            lexeme = lexeme.toUpperCase();
        }
        this.emit(category, lexeme);
        return accumulator.substr(lexeme.length);
    }
    emitEndOfLine() {
        this.emit(__WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].EOL, "\n");
    }
    emit(category, lexeme) {
        this.previous = {
            position: {
                line: this.position.line,
                char: this.position.char
            },
            lexeme: lexeme,
            category: category
        };
        this.context.tokens.push(this.previous);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Scanner;

Scanner.ICWS94draftRegex = {
    LabelRE: /^[A-Z_][A-Z_0-9]*/i,
    OpcodeRE: /^(DAT|MOV|ADD|SUB|MUL|DIV|MOD|JMP|JMZ|JMN|DJN|CMP|SLT|SPL|SEQ|SNE|NOP)(?!\w)/i,
    PreprocessorRE: /^(EQU|END|ORG|FOR|ROF)(?!\w)/i,
    ModifierRE: /^\.(AB|BA|A|B|F|X|I)/i,
    ModeRE: /^(#|\$|@|<|>|{|}|\*)/,
    NumberRE: /^[0-9]+/,
    CommaRE: /^,/,
    MathsRE: /^(\+|\-|\*|\/|%|\(|\))/,
    CommentRE: /^;.*/,
    Whitespace: /^[ \t]/
};
Scanner.ICWS88Regex = {
    LabelRE: /^[A-Z][A-Z0-9]*/i,
    OpcodeRE: /^(DAT|MOV|ADD|SUB|JMP|JMZ|JMN|CMP|SLT|DJN|SPL)(?!\w)/i,
    PreprocessorRE: /^(END|EQU)(?!\w)/i,
    ModifierRE: /$a/i,
    ModeRE: /^(#|\$|@|<)/,
    NumberRE: /^[0-9]+/,
    CommaRE: /^,/,
    MathsRE: /^(\+|\-|\*|\/)/,
    CommentRE: /^;.*/,
    Whitespace: /^[ \t]/
};
Scanner.ICWS86Regex = {
    LabelRE: /^[A-Z][A-Z0-9]{0,7}(?![A-Z0-9])/i,
    OpcodeRE: /^(DAT|MOV|ADD|SUB|JMP|JMZ|JMN|CMP|DJN|SPL)(?!\w)/i,
    PreprocessorRE: /^(END)(?!\w)/i,
    ModifierRE: /$a/i,
    ModeRE: /^(#|\$|@|<)/,
    NumberRE: /^[0-9]+/,
    CommaRE: /^,/,
    MathsRE: /^(\+|\-)/,
    CommentRE: /^;.*/,
    Whitespace: /^[ \t]/
};


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Context {
    constructor() {
        this.metaData = {
            name: "",
            author: "",
            strategy: ""
        };
        this.equs = {};
        this.tokens = [];
        this.labels = {};
        this.messages = [];
    }
    emitSingle(token) {
        this.tokens.push(token);
    }
    emit(tokens) {
        this.tokens = this.tokens.concat(tokens);
    }
    hasValue(something) {
        return (!(_.isUndefined(something) || _.isNull(something)));
    }
    emitInstruction(instruction) {
        if (this.hasValue(instruction.opcode)) {
            this.tokens.push(instruction.opcode);
        }
        if (this.hasValue(instruction.modifier)) {
            this.tokens.push(instruction.modifier);
        }
        if (this.hasValue(instruction.aOperand)) {
            if (this.hasValue(instruction.aOperand.mode)) {
                this.tokens.push(instruction.aOperand.mode);
            }
            if (this.hasValue(instruction.aOperand.address)) {
                this.tokens.push(instruction.aOperand.address);
            }
        }
        if (this.hasValue(instruction.comma)) {
            this.tokens.push(instruction.comma);
        }
        if (this.hasValue(instruction.bOperand)) {
            if (this.hasValue(instruction.bOperand.mode)) {
                this.tokens.push(instruction.bOperand.mode);
            }
            if (this.hasValue(instruction.bOperand.address)) {
                this.tokens.push(instruction.bOperand.address);
            }
        }
        if (this.hasValue(instruction.comment)) {
            this.tokens.push(instruction.comment);
        }
        if (this.hasValue(instruction.eol)) {
            this.tokens.push(instruction.eol);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Context;



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interface_IToken__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PassBase__ = __webpack_require__(2);


class ForPass extends __WEBPACK_IMPORTED_MODULE_1__PassBase__["a" /* PassBase */] {
    constructor(expression) {
        super();
        this.expression = expression;
    }
    /// <summary>
    /// Records EQU substitutions and removes statements from token stream
    /// Performs a duplicate label check
    /// </summary>
    processLine() {
        // Record EQU label tokens
        // Remove EQU token labels from token stream
        // Duplicate label check
        var next = this.stream.peek();
        if (next.category === __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Label) {
            this.processLabel();
        }
        else if (this.isFor(next)) {
            var pre = this.stream.expectOnly("FOR");
            this.processFor(null, pre);
        }
        else {
            var line = this.stream.readToEOL();
            this.context.emit(line);
        }
    }
    isFor(pre) {
        return pre.category === __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Preprocessor &&
            pre.lexeme === "FOR";
    }
    processLabel() {
        var label = this.stream.read();
        var pre = this.stream.read();
        if (this.isFor(pre)) {
            this.processFor(label, pre);
        }
        else {
            this.context.emit([label]);
            this.context.emit([pre]);
        }
    }
    // private warnDuplicateLabel(label: IToken) {
    //    this.context.messages.push({
    //        type: MessageType.Warning,
    //        position: label.position,
    //        text: "Redefinition of label '" + label.lexeme + "', original definition will be used"
    //    });
    // }
    processFor(label, pre) {
        // TODO use label (and reinstate warnDuplicateLabel)
        // TODO stringinisation
        // TODO loop counter variable subs
        var count = this.expression.parse(this.stream);
        if (this.stream.peek().category === __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Comment) {
            this.stream.read();
        }
        this.stream.expect(__WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].EOL);
        var expression = this.stream.readToEOL();
        while (!this.stream.eof() && this.stream.peek().lexeme !== "ROF") {
            expression = expression.concat(this.stream.readToEOL());
        }
        this.stream.expectOnly("ROF");
        for (var i = 0; i < count; i++) {
            this.context.emit(expression);
        }
        this.stream.readToEOL();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ForPass;



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interface_IToken__ = __webpack_require__(0);

class TokenHelper {
    static categoryToString(category) {
        switch (category) {
            case __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Comma:
                return "','";
            case __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Comment:
                return "';'";
            case __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].EOL:
                return "end of line";
            case __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Label:
                return "label";
            case __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Mode:
                return "mode";
            case __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Modifier:
                return "modifier";
            case __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Number:
                return "number";
            case __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Opcode:
                return "opcode";
        }
        return "";
    }
    static tokenToString(token) {
        switch (token.category) {
            case __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Comment:
                return "';'";
            case __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].EOL:
                return "end of line";
            default:
                return "'" + token.lexeme + "'";
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TokenHelper;



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interface_IParseOptions__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_IToken__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__interface_IMessage__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_underscore__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_underscore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__PassBase__ = __webpack_require__(2);





class PreprocessCollector extends __WEBPACK_IMPORTED_MODULE_4__PassBase__["a" /* PassBase */] {
    /// <summary>
    /// Records EQU substitutions and removes statements from token stream
    /// Performs a duplicate label check
    /// </summary>
    process(context, options) {
        // Record EQU label tokens
        // Remove EQU token labels from token stream
        // Duplicate label check
        this.previous = [];
        return super.process(context, options);
    }
    processLine() {
        while (!this.stream.eof()) {
            var next = this.stream.peek();
            if (next.category === __WEBPACK_IMPORTED_MODULE_1__interface_IToken__["a" /* TokenCategory */].Label) {
                this.previous = [];
                this.processLabels();
            }
            else if (this.isMultilineEqu(next)) {
                this.processMultilineEqu();
            }
            else {
                var line = this.stream.readToEOL();
                this.context.emit(line);
            }
        }
    }
    isMultilineEqu(next) {
        return next.category === __WEBPACK_IMPORTED_MODULE_1__interface_IToken__["a" /* TokenCategory */].Preprocessor &&
            next.lexeme === "EQU" &&
            this.previous.length > 0 &&
            this.options.standard === __WEBPACK_IMPORTED_MODULE_0__interface_IParseOptions__["a" /* Standard */].ICWS94draft;
    }
    isEqu(pre) {
        return pre.category === __WEBPACK_IMPORTED_MODULE_1__interface_IToken__["a" /* TokenCategory */].Preprocessor &&
            pre.lexeme === "EQU";
    }
    processLabels() {
        var labels = [];
        while (this.stream.peek().category === __WEBPACK_IMPORTED_MODULE_1__interface_IToken__["a" /* TokenCategory */].Label) {
            var token = this.stream.expect(__WEBPACK_IMPORTED_MODULE_1__interface_IToken__["a" /* TokenCategory */].Label);
            this.previous.push(token.lexeme);
            labels.push(token);
        }
        var pre = this.stream.read();
        if (this.isEqu(pre)) {
            this.processEqu(labels);
        }
        else {
            this.previous = [];
            this.context.emit(labels);
            this.context.emit([pre]);
        }
    }
    warnDuplicateLabel(label) {
        this.context.messages.push({
            type: __WEBPACK_IMPORTED_MODULE_2__interface_IMessage__["a" /* MessageType */].Warning,
            position: label.position,
            text: "Redefinition of label '" + label.lexeme + "', original definition will be used"
        });
    }
    processEqu(labels) {
        var expression = this.stream.readToEOL();
        // Do not include terminating EOL in replacement expression
        expression.pop();
        // Remove comments
        expression = __WEBPACK_IMPORTED_MODULE_3_underscore__["filter"](expression, (token) => {
            return token.category !== __WEBPACK_IMPORTED_MODULE_1__interface_IToken__["a" /* TokenCategory */].Comment;
        });
        __WEBPACK_IMPORTED_MODULE_3_underscore__["forEach"](labels, (label) => {
            if (label.lexeme in this.context.equs) {
                this.warnDuplicateLabel(label);
            }
            else {
                this.context.equs[label.lexeme] = expression;
            }
        });
    }
    processMultilineEqu() {
        this.stream.expectOnly("EQU");
        var expression = [{
                category: __WEBPACK_IMPORTED_MODULE_1__interface_IToken__["a" /* TokenCategory */].EOL,
                lexeme: "\n",
                position: __WEBPACK_IMPORTED_MODULE_3_underscore__["clone"](this.stream.peek().position)
            }];
        expression = expression.concat(this.stream.readToEOL());
        // Remove terminating newline
        expression.pop();
        __WEBPACK_IMPORTED_MODULE_3_underscore__(this.previous).forEach((label) => {
            var existing = this.context.equs[label];
            this.context.equs[label] = existing.concat(expression);
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PreprocessCollector;



/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interface_IToken__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_IMessage__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_underscore__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_underscore__);



class PreprocessAnalyser {
    process(context, options) {
        // Detect dependencies between EQU expressions
        // Raise circular reference errors
        // Replace references to EQU labels in other EQU label definitions
        this.context = context;
        this.references = {};
        this.collectReferences();
        if (this.noCircularReferences()) {
            this.replaceAllReferences();
        }
        return this.context;
    }
    collectReferences() {
        var keys = __WEBPACK_IMPORTED_MODULE_2_underscore__(this.context.equs).keys();
        __WEBPACK_IMPORTED_MODULE_2_underscore__(keys).forEach((key) => {
            var expression = this.context.equs[key];
            var references = __WEBPACK_IMPORTED_MODULE_2_underscore__(expression).filter((token) => {
                return token.category === __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Label &&
                    __WEBPACK_IMPORTED_MODULE_2_underscore__(keys).contains(token.lexeme);
            });
            this.references[key] = __WEBPACK_IMPORTED_MODULE_2_underscore__(references).map((token) => {
                return token.lexeme;
            });
        });
    }
    raiseCircularReference(key, reference) {
        this.context.messages.push({
            text: "Circular reference detected in '" + key + "' EQU statement",
            type: __WEBPACK_IMPORTED_MODULE_1__interface_IMessage__["a" /* MessageType */].Error,
            // TODO proper position
            position: { line: 1, char: 1 }
        });
    }
    noCircularReferences() {
        var keys = __WEBPACK_IMPORTED_MODULE_2_underscore__(this.context.equs).keys();
        var result = true;
        __WEBPACK_IMPORTED_MODULE_2_underscore__(keys).forEach((key) => {
            try {
                var seen = [];
                this.detectCircularReferencesRecursive(key, seen);
            }
            catch (reference) {
                this.raiseCircularReference(key, reference);
                result = false;
            }
        });
        return result;
    }
    detectCircularReferencesRecursive(token, seen) {
        if (__WEBPACK_IMPORTED_MODULE_2_underscore__(seen).contains(token)) {
            throw token;
        }
        seen.push(token);
        __WEBPACK_IMPORTED_MODULE_2_underscore__(this.references[token]).forEach((reference) => {
            this.detectCircularReferencesRecursive(reference, seen);
        });
        var i = seen.indexOf(token);
        seen.splice(i, 1);
    }
    replaceAllReferences() {
        var keys = __WEBPACK_IMPORTED_MODULE_2_underscore__(this.context.equs).keys();
        __WEBPACK_IMPORTED_MODULE_2_underscore__(keys).forEach((key) => {
            this.replaceReferences(key);
        });
    }
    replaceReferences(key) {
        var expression = this.context.equs[key];
        var keys = __WEBPACK_IMPORTED_MODULE_2_underscore__(this.context.equs).keys();
        while (__WEBPACK_IMPORTED_MODULE_2_underscore__(expression).any((token) => {
            return token.category === __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Label &&
                __WEBPACK_IMPORTED_MODULE_2_underscore__(keys).contains(token.lexeme);
        })) {
            for (var i = 0; i < expression.length; i++) {
                if (expression[i].category === __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Label) {
                    var label = expression[i].lexeme;
                    if (__WEBPACK_IMPORTED_MODULE_2_underscore__(keys).contains(label)) {
                        // HACK this is the only way I could find to insert an array into an array!
                        var args = [i, 1];
                        expression.splice.apply(expression, args.concat(this.context.equs[label]));
                    }
                }
            }
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PreprocessAnalyser;



/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interface_IToken__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_underscore__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_underscore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PassBase__ = __webpack_require__(2);



class PreprocessEmitter extends __WEBPACK_IMPORTED_MODULE_2__PassBase__["a" /* PassBase */] {
    /// <summary>
    /// Perform preprocessor substitutions.
    /// Replace EQU defined labels with corresponding expression
    /// </summary>
    processLine() {
        // Perform preprocessor substitution
        // Insert EQU expressions
        var next = this.stream.peek();
        if (next.category === __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Label &&
            next.lexeme in this.context.equs) {
            this.replaceLabel();
        }
        else {
            this.context.emit([this.stream.read()]);
        }
    }
    replaceLabel() {
        var label = this.stream.read();
        var originalExpression = this.context.equs[label.lexeme];
        var expression = __WEBPACK_IMPORTED_MODULE_1_underscore__["map"](originalExpression, (token) => {
            var clone = __WEBPACK_IMPORTED_MODULE_1_underscore__["clone"](token);
            clone.position = label.position;
            return clone;
        });
        this.context.emit(expression);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PreprocessEmitter;



/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interface_IToken__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_IParseOptions__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PassBase__ = __webpack_require__(2);



class LabelCollector extends __WEBPACK_IMPORTED_MODULE_2__PassBase__["a" /* PassBase */] {
    // Pass 2
    // Record label positions
    // Remove label declarations from the token stream
    // Duplicate label check
    // Syntax error if label declaration not followed by an opcode
    process(context, options) {
        this.line = -1;
        return super.process(context, options);
    }
    labelName(token) {
        switch (this.options.standard) {
            case __WEBPACK_IMPORTED_MODULE_1__interface_IParseOptions__["a" /* Standard */].ICWS86:
            case __WEBPACK_IMPORTED_MODULE_1__interface_IParseOptions__["a" /* Standard */].ICWS88:
                return token.lexeme.length > 8 ? token.lexeme.substr(0, 8) : token.lexeme;
            default:
                return token.lexeme;
        }
    }
    processLine() {
        var next = this.stream.peek();
        if (next.category === __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Label ||
            next.category === __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Opcode) {
            this.line++;
        }
        if (this.stream.peek().category === __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Label) {
            this.processLabel();
        }
        var tokens = this.stream.readToEOL();
        this.context.emit(tokens);
    }
    processLabel() {
        while (!this.stream.eof() && this.stream.peek().category === __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Label) {
            var label = this.stream.expect(__WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Label);
            var name = this.labelName(label);
            if (name in this.context.labels ||
                name in this.context.equs) {
                this.stream.warn(label, "Redefinition of label '" + this.labelName(label) + "', original definition will be used");
            }
            else {
                this.context.labels[name] = this.line;
            }
        }
        var next = this.stream.peek();
        if (next.lexeme === "END") {
            return;
        }
        var opcode = this.stream.expect(__WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Opcode);
        this.context.emitSingle(opcode);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LabelCollector;



/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interface_IMessage__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_IToken__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__interface_IParseOptions__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_underscore__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_underscore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__PassBase__ = __webpack_require__(2);





class LabelEmitter extends __WEBPACK_IMPORTED_MODULE_4__PassBase__["a" /* PassBase */] {
    process(context, options) {
        this.line = 0;
        return super.process(context, options);
    }
    labelName(token) {
        switch (this.options.standard) {
            case __WEBPACK_IMPORTED_MODULE_2__interface_IParseOptions__["a" /* Standard */].ICWS86:
            case __WEBPACK_IMPORTED_MODULE_2__interface_IParseOptions__["a" /* Standard */].ICWS88:
                return token.lexeme.length > 8 ? token.lexeme.substr(0, 8) : token.lexeme;
            default:
                return token.lexeme;
        }
    }
    processLine() {
        // Pass 3
        // Replace labels with numbers
        // Raise syntax error for undeclared labels
        if (this.stream.peek().category === __WEBPACK_IMPORTED_MODULE_1__interface_IToken__["a" /* TokenCategory */].Opcode) {
            this.processLineTokens(true);
            this.line++;
        }
        else if (this.stream.peek().category === __WEBPACK_IMPORTED_MODULE_1__interface_IToken__["a" /* TokenCategory */].Preprocessor) {
            this.processLineTokens(false);
        }
        else {
            var tokens = this.stream.readToEOL();
            this.context.emit(tokens);
        }
    }
    processLineTokens(isOpcode) {
        var tokens = this.stream.readToEOL();
        __WEBPACK_IMPORTED_MODULE_3_underscore__["forEach"](tokens, (token) => {
            if (token.category === __WEBPACK_IMPORTED_MODULE_1__interface_IToken__["a" /* TokenCategory */].Label) {
                this.processLabel(token, isOpcode);
            }
            else {
                this.context.emitSingle(token);
            }
        });
    }
    raiseUndeclaredLabel(label) {
        this.context.messages.push({
            type: __WEBPACK_IMPORTED_MODULE_0__interface_IMessage__["a" /* MessageType */].Error,
            position: label.position,
            text: "Unrecognised label '" + this.labelName(label) + "'"
        });
    }
    processLabel(label, isOpcode) {
        var name = this.labelName(label);
        if (name in this.context.labels) {
            var labelLine = this.context.labels[name];
            var diff = labelLine;
            if (isOpcode) {
                diff -= this.line;
            }
            var token = {
                category: __WEBPACK_IMPORTED_MODULE_1__interface_IToken__["a" /* TokenCategory */].Number,
                lexeme: diff.toString(),
                position: __WEBPACK_IMPORTED_MODULE_3_underscore__["clone"](label.position)
            };
            this.context.emitSingle(token);
        }
        else {
            this.raiseUndeclaredLabel(label);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LabelEmitter;



/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interface_IToken__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_underscore__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_underscore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PassBase__ = __webpack_require__(2);



class MathsProcessor extends __WEBPACK_IMPORTED_MODULE_2__PassBase__["a" /* PassBase */] {
    constructor(expression) {
        super();
        this.expression = expression;
    }
    processLine() {
        // Maths Processor
        // Locate and resolve mathematical expressions to resulting address
        var next = this.stream.peek();
        if (next.category === __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Number ||
            next.category === __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Maths) {
            try {
                var address = this.expression.parse(this.stream);
                this.context.emitSingle({
                    category: __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Number,
                    lexeme: address.toString(),
                    position: __WEBPACK_IMPORTED_MODULE_1_underscore__["clone"](next.position)
                });
            }
            catch (err) {
                this.stream.readToEOL();
            }
        }
        else {
            this.context.emitSingle(this.stream.read());
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MathsProcessor;



/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interface_IToken__ = __webpack_require__(0);

class Expression {
    parse(stream) {
        this.stream = stream;
        this.stream.peek();
        return this.expression();
    }
    expression() {
        var result = this.term();
        while (!this.stream.eof()) {
            var next = this.stream.peek();
            if (next.lexeme === "+") {
                this.stream.read();
                result += this.term();
            }
            else if (next.lexeme === "-") {
                this.stream.read();
                result -= this.term();
            }
            else {
                break;
            }
        }
        return result;
    }
    term() {
        var result = this.factor();
        while (!this.stream.eof()) {
            var next = this.stream.peek();
            if (next.lexeme === "*") {
                this.stream.read();
                result *= this.factor();
            }
            else if (next.lexeme === "/") {
                this.stream.read();
                var divisor = this.factor();
                result = this.division(next, result, divisor);
            }
            else if (next.lexeme === "%") {
                this.stream.read();
                result %= this.factor();
            }
            else {
                break;
            }
        }
        return result;
    }
    division(token, numerator, denominator) {
        if (denominator === 0) {
            this.stream.error(token, "Divide by zero is not permitted");
        }
        var quotient = numerator / denominator;
        var rounded = this.integerRound(quotient);
        if (rounded !== quotient) {
            this.stream.warn(token, "Rounded non-integer division truncated to integer value");
        }
        return rounded;
    }
    // http://stackoverflow.com/questions/4228356/integer-division-in-javascript
    integerRound(value) {
        /* tslint:disable */
        return value >> 0;
        /* tslint:enable */
    }
    factor() {
        var next = this.stream.peek();
        if (next.lexeme === "+" ||
            next.lexeme === "-") {
            // Place a zero in front of a - or + to allow e.g. -7 to be entered
            return 0;
        }
        else if (next.lexeme === "(") {
            this.stream.expectOnly("(");
            var result = this.expression();
            this.stream.expectOnly(")");
            return result;
        }
        else {
            this.stream.expect(__WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Number);
            return parseInt(next.lexeme, 10);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Expression;



/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interface_IToken__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PassBase__ = __webpack_require__(2);


class Filter extends __WEBPACK_IMPORTED_MODULE_1__PassBase__["a" /* PassBase */] {
    /// <summary>
    /// Filters superfluous tokens from the token stream.
    /// Removes any empty lines and anything after the END preprocessor command
    /// </summary>
    processLine() {
        // Remove empty lines from stream
        // Remove anything after END from stream
        var line;
        var next = this.stream.peek();
        switch (next.category) {
            case __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].EOL:
                this.processEmptyLine();
                break;
            case __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Preprocessor:
                if (next.lexeme === "END") {
                    this.processEnd();
                }
                else {
                    line = this.stream.readToEOL();
                    this.context.emit(line);
                }
                break;
            default:
                line = this.stream.readToEOL();
                this.context.emit(line);
                break;
        }
    }
    processEmptyLine() {
        this.stream.readToEOL();
    }
    processEnd() {
        var line = this.stream.readToEOL();
        this.context.emit(line);
        this.stream.position = this.stream.tokens.length;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Filter;



/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interface_IParseOptions__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_IToken__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_underscore__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_underscore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__PassBase__ = __webpack_require__(2);




class DefaultPass extends __WEBPACK_IMPORTED_MODULE_3__PassBase__["a" /* PassBase */] {
    processLine() {
        // Should specify default
        //    Modifiers (depends upon opcode)
        //    Modes ($)
        //    Operands $0
        var next = this.stream.peek();
        if (next.category === __WEBPACK_IMPORTED_MODULE_1__interface_IToken__["a" /* TokenCategory */].Opcode) {
            this.processInstruction();
        }
        else {
            this.context.emit(this.stream.readToEOL());
        }
    }
    processInstruction() {
        var instruction = this.readInstruction();
        if (instruction.aOperand.address === null) {
            // A address is mandatory, discard the rest of this line and leave for syntax check
            this.context.emit([
                instruction.opcode,
                instruction.modifier,
                instruction.aOperand.mode
            ]);
            this.context.emit(this.stream.readToEOL());
            return;
        }
        this.defaultBOperand(instruction);
        this.defaultModifier(instruction);
        this.emitInstruction(instruction);
    }
    readInstruction() {
        var instruction = {};
        instruction.opcode = this.stream.expect(__WEBPACK_IMPORTED_MODULE_1__interface_IToken__["a" /* TokenCategory */].Opcode);
        instruction.modifier = this.tryRead(__WEBPACK_IMPORTED_MODULE_1__interface_IToken__["a" /* TokenCategory */].Modifier);
        instruction.aOperand = {
            mode: this.readOrDefaultMode(instruction.opcode),
            address: this.tryRead(__WEBPACK_IMPORTED_MODULE_1__interface_IToken__["a" /* TokenCategory */].Number)
        };
        instruction.comma = null;
        if (this.options.standard <= __WEBPACK_IMPORTED_MODULE_0__interface_IParseOptions__["a" /* Standard */].ICWS88) {
            instruction.comma = this.readOrDefaultComma();
        }
        else if (this.stream.peek().category === __WEBPACK_IMPORTED_MODULE_1__interface_IToken__["a" /* TokenCategory */].Comma) {
            instruction.comma = this.stream.read();
        }
        instruction.bOperand = {
            mode: this.readOrDefaultMode(instruction.opcode),
            address: this.tryRead(__WEBPACK_IMPORTED_MODULE_1__interface_IToken__["a" /* TokenCategory */].Number)
        };
        return instruction;
    }
    tryRead(category) {
        if (this.stream.peek().category === category) {
            return this.stream.read();
        }
        return null;
    }
    readOrDefaultComma() {
        if (this.stream.peek().category === __WEBPACK_IMPORTED_MODULE_1__interface_IToken__["a" /* TokenCategory */].Comma) {
            return this.stream.read();
        }
        else {
            return {
                category: __WEBPACK_IMPORTED_MODULE_1__interface_IToken__["a" /* TokenCategory */].Comma,
                lexeme: ",",
                position: __WEBPACK_IMPORTED_MODULE_2_underscore__["clone"](this.stream.peek().position)
            };
        }
    }
    readOrDefaultMode(opcode) {
        if (this.stream.peek().category === __WEBPACK_IMPORTED_MODULE_1__interface_IToken__["a" /* TokenCategory */].Mode) {
            return this.stream.read();
        }
        else {
            var mode = "$";
            if (this.options.standard < __WEBPACK_IMPORTED_MODULE_0__interface_IParseOptions__["a" /* Standard */].ICWS94draft &&
                opcode.lexeme === "DAT") {
                mode = "#";
            }
            return {
                category: __WEBPACK_IMPORTED_MODULE_1__interface_IToken__["a" /* TokenCategory */].Mode,
                lexeme: mode,
                position: __WEBPACK_IMPORTED_MODULE_2_underscore__["clone"](this.stream.peek().position)
            };
        }
    }
    defaultBOperand(instruction) {
        if (instruction.bOperand.address === null) {
            if (instruction.comma === null) {
                instruction.comma = {
                    category: __WEBPACK_IMPORTED_MODULE_1__interface_IToken__["a" /* TokenCategory */].Comma,
                    lexeme: ",",
                    position: __WEBPACK_IMPORTED_MODULE_2_underscore__["clone"](this.stream.peek().position)
                };
            }
            instruction.bOperand.address = {
                category: __WEBPACK_IMPORTED_MODULE_1__interface_IToken__["a" /* TokenCategory */].Number,
                lexeme: "0",
                position: __WEBPACK_IMPORTED_MODULE_2_underscore__["clone"](this.stream.peek().position)
            };
            if (instruction.opcode.lexeme === "DAT") {
                instruction.bOperand.mode.lexeme = "#";
                var tempOperand = instruction.aOperand;
                instruction.aOperand = instruction.bOperand;
                instruction.bOperand = tempOperand;
                instruction.aOperand.address.position = instruction.bOperand.address.position;
                instruction.aOperand.mode.position = instruction.bOperand.mode.position;
            }
        }
    }
    defaultModifier(instruction) {
        if (instruction.modifier === null) {
            var token = {
                category: __WEBPACK_IMPORTED_MODULE_1__interface_IToken__["a" /* TokenCategory */].Modifier,
                position: __WEBPACK_IMPORTED_MODULE_2_underscore__["clone"](instruction.opcode.position),
                lexeme: ""
            };
            switch (instruction.opcode.lexeme) {
                case "DAT":
                    token.lexeme = ".F";
                    break;
                case "MOV":
                case "CMP":
                case "SEQ":
                case "SNE":
                    if (instruction.aOperand.mode.lexeme === "#") {
                        token.lexeme = ".AB";
                    }
                    else if (instruction.bOperand.mode.lexeme === "#") {
                        token.lexeme = ".B";
                    }
                    else {
                        token.lexeme = ".I";
                    }
                    break;
                case "ADD":
                case "SUB":
                case "MUL":
                case "DIV":
                case "MOD":
                    if (instruction.aOperand.mode.lexeme === "#") {
                        token.lexeme = ".AB";
                    }
                    else if (instruction.bOperand.mode.lexeme === "#") {
                        token.lexeme = ".B";
                    }
                    else if (this.options.standard !== __WEBPACK_IMPORTED_MODULE_0__interface_IParseOptions__["a" /* Standard */].ICWS86) {
                        token.lexeme = ".F";
                    }
                    else {
                        token.lexeme = ".B";
                    }
                    break;
                case "SLT":
                    if (instruction.aOperand.mode.lexeme === "#") {
                        token.lexeme = ".AB";
                    }
                    else {
                        token.lexeme = ".B";
                    }
                    break;
                case "JMP":
                case "JMZ":
                case "JMN":
                case "DJN":
                case "SPL":
                case "NOP":
                    token.lexeme = ".B";
                    break;
                default:
                    instruction.modifier = null;
                    break;
            }
            instruction.modifier = token;
        }
    }
    emitInstruction(instruction) {
        this.context.emitSingle(instruction.opcode);
        if (instruction.modifier !== null) {
            this.context.emitSingle(instruction.modifier);
        }
        this.context.emit([instruction.aOperand.mode, instruction.aOperand.address]);
        if (instruction.comma !== null) {
            this.context.emitSingle(instruction.comma);
        }
        this.context.emit([instruction.bOperand.mode, instruction.bOperand.address]);
        this.context.emit(this.stream.readToEOL());
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DefaultPass;



/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interface_IToken__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_IParseOptions__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_underscore__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_underscore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__PassBase__ = __webpack_require__(2);




class OrgPass extends __WEBPACK_IMPORTED_MODULE_3__PassBase__["a" /* PassBase */] {
    process(context, options) {
        // Replace END ### with ORG ###
        // Emit ORG as first instruction
        // Raise warning for duplicate ORGs / END ###
        // Under ICWS'86 - if no END ### found, if start label defined, emit ORG start
        this.firstInstruction = null;
        this.org = null;
        this.orgAddress = null;
        this.orgComment = null;
        var result = super.process(context, options);
        this.emitOrg();
        return result;
    }
    processLine() {
        var next = this.stream.peek();
        if (this.firstInstruction === null &&
            next.category !== __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Comment) {
            this.firstInstruction = this.stream.position;
        }
        if (next.category === __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Preprocessor) {
            if (next.lexeme === "ORG") {
                this.processOrg();
            }
            else if (next.lexeme === "END") {
                this.processEnd();
            }
            else {
                this.context.emit(this.stream.readToEOL());
            }
        }
        else {
            this.context.emit(this.stream.readToEOL());
        }
    }
    processOrg() {
        var org = this.stream.expectOnly("ORG");
        this.org = org;
        if (this.orgAddress !== null) {
            this.stream.warn(org, "Redefinition of ORG encountered, this later definition will take effect");
        }
        var address = this.stream.expect(__WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Number);
        this.orgAddress = parseInt(address.lexeme, 10);
        if (this.stream.peek().category === __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Comment) {
            this.orgComment = this.stream.read();
        }
        this.stream.expect(__WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].EOL);
    }
    processEnd() {
        var end = this.stream.expectOnly("END");
        var address = null;
        var comment = null;
        if (this.stream.peek().category === __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Number) {
            address = this.stream.read();
        }
        if (this.stream.peek().category === __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Comment) {
            comment = this.stream.read();
        }
        this.stream.expect(__WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].EOL);
        if (address !== null) {
            if (this.orgAddress !== null) {
                this.stream.warn(end, "Encountered both ORG and END address, the ORG definition will take effect");
            }
            else {
                this.org = end;
                this.orgAddress = parseInt(address.lexeme, 10);
            }
        }
    }
    emitOrg() {
        if (this.orgAddress === null) {
            if (this.options.standard === __WEBPACK_IMPORTED_MODULE_1__interface_IParseOptions__["a" /* Standard */].ICWS86 &&
                __WEBPACK_IMPORTED_MODULE_2_underscore__(__WEBPACK_IMPORTED_MODULE_2_underscore__(this.context.labels).keys()).contains(OrgPass.START_LABEL)) {
                this.orgAddress = this.context.labels[OrgPass.START_LABEL];
            }
            else {
                this.orgAddress = 0;
            }
            this.org = {
                category: __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Preprocessor,
                lexeme: "ORG",
                position: { line: 1, char: 1 }
            };
        }
        var org = {
            category: __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Preprocessor,
            lexeme: "ORG",
            position: __WEBPACK_IMPORTED_MODULE_2_underscore__["clone"](this.org.position)
        };
        var address = {
            category: __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Number,
            lexeme: this.orgAddress.toString(),
            position: __WEBPACK_IMPORTED_MODULE_2_underscore__["clone"](this.org.position)
        };
        var instruction = [org, address];
        if (this.orgComment !== null) {
            instruction.push(this.orgComment);
        }
        instruction.push({
            category: __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].EOL,
            lexeme: "\n",
            position: __WEBPACK_IMPORTED_MODULE_2_underscore__["clone"](this.org.position)
        });
        // HACK this is the only way I could find to insert an array into an array!
        var args = [this.firstInstruction, 0];
        this.context.tokens.splice.apply(this.context.tokens, args.concat(instruction));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = OrgPass;

OrgPass.START_LABEL = "start";


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PassBase__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_IToken__ = __webpack_require__(0);


class SyntaxCheck extends __WEBPACK_IMPORTED_MODULE_0__PassBase__["a" /* PassBase */] {
    processLine() {
        var next = this.stream.peek();
        if (next.category === __WEBPACK_IMPORTED_MODULE_1__interface_IToken__["a" /* TokenCategory */].Opcode) {
            this.parseInstruction();
        }
        else if (next.category === __WEBPACK_IMPORTED_MODULE_1__interface_IToken__["a" /* TokenCategory */].Comment) {
            this.parseComment();
        }
        else if (next.category === __WEBPACK_IMPORTED_MODULE_1__interface_IToken__["a" /* TokenCategory */].Preprocessor &&
            (next.lexeme === "END" || next.lexeme === "ORG")) {
            this.context.emit(this.stream.readToEOL());
        }
        else {
            this.stream.expected("instruction or comment", next);
        }
    }
    mustEmit(category) {
        var token = this.stream.expect(category);
        this.context.emitSingle(token);
    }
    mayEmit(category) {
        if (this.stream.peek().category === category) {
            this.context.emitSingle(this.stream.read());
        }
    }
    parseComment() {
        this.mustEmit(__WEBPACK_IMPORTED_MODULE_1__interface_IToken__["a" /* TokenCategory */].Comment);
        this.mustEmit(__WEBPACK_IMPORTED_MODULE_1__interface_IToken__["a" /* TokenCategory */].EOL);
    }
    parseInstruction() {
        this.mustEmit(__WEBPACK_IMPORTED_MODULE_1__interface_IToken__["a" /* TokenCategory */].Opcode);
        this.mustEmit(__WEBPACK_IMPORTED_MODULE_1__interface_IToken__["a" /* TokenCategory */].Modifier);
        this.mustEmit(__WEBPACK_IMPORTED_MODULE_1__interface_IToken__["a" /* TokenCategory */].Mode);
        this.mustEmit(__WEBPACK_IMPORTED_MODULE_1__interface_IToken__["a" /* TokenCategory */].Number);
        this.mustEmit(__WEBPACK_IMPORTED_MODULE_1__interface_IToken__["a" /* TokenCategory */].Comma);
        this.mustEmit(__WEBPACK_IMPORTED_MODULE_1__interface_IToken__["a" /* TokenCategory */].Mode);
        this.mustEmit(__WEBPACK_IMPORTED_MODULE_1__interface_IToken__["a" /* TokenCategory */].Number);
        this.mayEmit(__WEBPACK_IMPORTED_MODULE_1__interface_IToken__["a" /* TokenCategory */].Comment);
        this.mustEmit(__WEBPACK_IMPORTED_MODULE_1__interface_IToken__["a" /* TokenCategory */].EOL);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SyntaxCheck;



/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interface_IToken__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_underscore__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_underscore__);


class LoadFileSerialiser {
    serialise(tokens) {
        var result = "";
        this.previous = __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].EOL;
        __WEBPACK_IMPORTED_MODULE_1_underscore__["forEach"](tokens, (token) => {
            result += this.serialiseToken(token);
            this.previous = token.category;
        });
        return result;
    }
    serialiseToken(token) {
        switch (token.category) {
            case __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Comma:
                return ",\t";
            case __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].EOL:
                return "\n";
            case __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Mode:
                return token.lexeme;
            case __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Modifier:
                return token.lexeme + "\t";
            case __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Number:
                return token.lexeme;
            case __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Opcode:
                return token.lexeme;
            case __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Preprocessor:
                return token.lexeme + "\t";
            case __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Comment:
                if (this.previous === __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].EOL) {
                    return token.lexeme;
                }
                else {
                    return "\t" + token.lexeme;
                }
            default:
                return "";
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LoadFileSerialiser;



/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interface_IToken__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_underscore__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_underscore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PassBase__ = __webpack_require__(2);



class IllegalCommandCheck extends __WEBPACK_IMPORTED_MODULE_2__PassBase__["a" /* PassBase */] {
    processLine() {
        if (this.stream.peek().category === __WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Opcode) {
            this.checkLine();
        }
        else {
            this.context.emit(this.stream.readToEOL());
        }
    }
    checkLine() {
        var instruction = {
            opcode: this.stream.expect(__WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Opcode),
            modifier: this.stream.expect(__WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Modifier),
            aOperand: {
                mode: this.stream.expect(__WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Mode),
                address: this.stream.expect(__WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Number)
            },
            comma: this.stream.expect(__WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Comma),
            bOperand: {
                mode: this.stream.expect(__WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Mode),
                address: this.stream.expect(__WEBPACK_IMPORTED_MODULE_0__interface_IToken__["a" /* TokenCategory */].Number)
            }
        };
        var hash = instruction.opcode.lexeme +
            instruction.aOperand.mode.lexeme +
            instruction.bOperand.mode.lexeme;
        if (!__WEBPACK_IMPORTED_MODULE_1_underscore__(IllegalCommandCheck.LegalCommands).contains(hash)) {
            this.stream.error(instruction.opcode, "Illegal addressing mode under selected Corewar standard");
        }
        this.context.emitInstruction(instruction);
        this.context.emit(this.stream.readToEOL());
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = IllegalCommandCheck;

IllegalCommandCheck.LegalCommands = [
    "ADD#$", "ADD#@", "ADD#<", "ADD$$", "ADD$@",
    "ADD$<", "ADD@$", "ADD@@", "ADD@<", "ADD<$",
    "ADD<@", "ADD<<", "CMP#$", "CMP#@", "CMP#<",
    "CMP$$", "CMP$@", "CMP$<", "CMP@$", "CMP@@",
    "CMP@<", "CMP<$", "CMP<@", "CMP<<", "DAT##",
    "DAT#<", "DAT<#", "DAT<<", "DJN$#", "DJN$$",
    "DJN$@", "DJN$<", "DJN@#", "DJN@$", "DJN@@",
    "DJN@<", "DJN<#", "DJN<$", "DJN<@", "DJN<<",
    "JMN$#", "JMN$$", "JMN$@", "JMN$<", "JMN@#",
    "JMN@$", "JMN@@", "JMN@<", "JMN<#", "JMN<$",
    "JMN<@", "JMN<<", "JMP$#", "JMP$$", "JMP$@",
    "JMP$<", "JMP@#", "JMP@$", "JMP@@", "JMP@<",
    "JMP<#", "JMP<$", "JMP<@", "JMP<<", "JMZ$#",
    "JMZ$$", "JMZ$@", "JMZ$<", "JMZ@#", "JMZ@$",
    "JMZ@@", "JMZ@<", "JMZ<#", "JMZ<$", "JMZ<@",
    "JMZ<<", "MOV#$", "MOV#@", "MOV#<", "MOV$$",
    "MOV$@", "MOV$<", "MOV@$", "MOV@@", "MOV@<",
    "MOV<$", "MOV<@", "MOV<<", "SLT#$", "SLT#@",
    "SLT#<", "SLT$$", "SLT$@", "SLT$<", "SLT@$",
    "SLT@@", "SLT@<", "SLT<$", "SLT<@", "SLT<<",
    "SPL$#", "SPL$$", "SPL$@", "SPL$<", "SPL@#",
    "SPL@$", "SPL@@", "SPL@<", "SPL<#", "SPL<$",
    "SPL<@", "SPL<<", "SUB#$", "SUB#@", "SUB#<",
    "SUB$$", "SUB$@", "SUB$<", "SUB@$", "SUB@@",
    "SUB@<", "SUB<$", "SUB<@", "SUB<<"
];


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Random {
    get(max) {
        return Math.floor(Math.random() * max);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Random;



/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Executive {
    constructor() {
        this.commandTable = [
            this.dat,
            this.dat,
            this.dat,
            this.dat,
            this.dat,
            this.dat,
            this.dat,
            this.mov_a,
            this.mov_b,
            this.mov_ab,
            this.mov_ba,
            this.mov_f,
            this.mov_x,
            this.mov_i,
            this.add_a,
            this.add_b,
            this.add_ab,
            this.add_ba,
            this.add_f,
            this.add_x,
            this.add_f,
            this.sub_a,
            this.sub_b,
            this.sub_ab,
            this.sub_ba,
            this.sub_f,
            this.sub_x,
            this.sub_f,
            this.mul_a,
            this.mul_b,
            this.mul_ab,
            this.mul_ba,
            this.mul_f,
            this.mul_x,
            this.mul_f,
            this.div_a,
            this.div_b,
            this.div_ab,
            this.div_ba,
            this.div_f,
            this.div_x,
            this.div_f,
            this.mod_a,
            this.mod_b,
            this.mod_ab,
            this.mod_ba,
            this.mod_f,
            this.mod_x,
            this.mod_f,
            this.jmp,
            this.jmp,
            this.jmp,
            this.jmp,
            this.jmp,
            this.jmp,
            this.jmp,
            this.jmz_a,
            this.jmz_b,
            this.jmz_b,
            this.jmz_a,
            this.jmz_f,
            this.jmz_f,
            this.jmz_f,
            this.jmn_a,
            this.jmn_b,
            this.jmn_b,
            this.jmn_a,
            this.jmn_f,
            this.jmn_f,
            this.jmn_f,
            this.djn_a,
            this.djn_b,
            this.djn_b,
            this.djn_a,
            this.djn_f,
            this.djn_f,
            this.djn_f,
            this.seq_a,
            this.seq_b,
            this.seq_ab,
            this.seq_ba,
            this.seq_f,
            this.seq_x,
            this.seq_i,
            this.seq_a,
            this.seq_b,
            this.seq_ab,
            this.seq_ba,
            this.seq_f,
            this.seq_x,
            this.seq_i,
            this.sne_a,
            this.sne_b,
            this.sne_ab,
            this.sne_ba,
            this.sne_f,
            this.sne_x,
            this.sne_i,
            this.slt_a,
            this.slt_b,
            this.slt_ab,
            this.slt_ba,
            this.slt_f,
            this.slt_x,
            this.slt_f,
            this.spl,
            this.spl,
            this.spl,
            this.spl,
            this.spl,
            this.spl,
            this.spl,
            this.nop,
            this.nop,
            this.nop,
            this.nop,
            this.nop,
            this.nop,
            this.nop,
        ];
    }
    initialise(options) {
        this.instructionLimit = options.instructionLimit;
    }
    dat(context) {
        //Remove current task from the queue
        var ti = context.taskIndex;
        context.warrior.taskIndex = context.taskIndex;
        context.warrior.tasks.splice(ti, 1);
    }
    mov_a(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = aInstruction.aOperand.address;
    }
    mov_b(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.bOperand.address = aInstruction.bOperand.address;
    }
    mov_ab(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.bOperand.address = aInstruction.aOperand.address;
    }
    mov_ba(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = aInstruction.bOperand.address;
    }
    mov_f(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = aInstruction.aOperand.address;
        bInstruction.bOperand.address = aInstruction.bOperand.address;
    }
    mov_x(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = aInstruction.bOperand.address;
        bInstruction.bOperand.address = aInstruction.aOperand.address;
    }
    mov_i(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = {
            address: context.bPointer,
            opcode: aInstruction.opcode,
            modifier: aInstruction.modifier,
            aOperand: {
                address: aInstruction.aOperand.address,
                mode: aInstruction.aOperand.mode
            },
            bOperand: {
                address: aInstruction.bOperand.address,
                mode: aInstruction.bOperand.mode
            }
        };
        context.core.setAt(context.task, context.bPointer, bInstruction);
    }
    add_a(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = context.core.wrap(aInstruction.aOperand.address + bInstruction.aOperand.address);
    }
    add_b(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.bOperand.address = context.core.wrap(aInstruction.bOperand.address + bInstruction.bOperand.address);
    }
    add_ab(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.bOperand.address = context.core.wrap(aInstruction.aOperand.address + bInstruction.bOperand.address);
    }
    add_ba(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = context.core.wrap(aInstruction.bOperand.address + bInstruction.aOperand.address);
    }
    add_f(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = context.core.wrap(aInstruction.aOperand.address + bInstruction.aOperand.address);
        bInstruction.bOperand.address = context.core.wrap(aInstruction.bOperand.address + bInstruction.bOperand.address);
    }
    add_x(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = context.core.wrap(aInstruction.bOperand.address + bInstruction.aOperand.address);
        bInstruction.bOperand.address = context.core.wrap(aInstruction.aOperand.address + bInstruction.bOperand.address);
    }
    sub_a(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = context.core.wrap(bInstruction.aOperand.address - aInstruction.aOperand.address);
    }
    sub_b(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.bOperand.address = context.core.wrap(bInstruction.bOperand.address - aInstruction.bOperand.address);
    }
    sub_ab(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.bOperand.address = context.core.wrap(bInstruction.bOperand.address - aInstruction.aOperand.address);
    }
    sub_ba(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = context.core.wrap(bInstruction.aOperand.address - aInstruction.bOperand.address);
    }
    sub_f(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = context.core.wrap(bInstruction.aOperand.address - aInstruction.aOperand.address);
        bInstruction.bOperand.address = context.core.wrap(bInstruction.bOperand.address - aInstruction.bOperand.address);
    }
    sub_x(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = context.core.wrap(bInstruction.aOperand.address - aInstruction.bOperand.address);
        bInstruction.bOperand.address = context.core.wrap(bInstruction.bOperand.address - aInstruction.aOperand.address);
    }
    mul_a(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = context.core.wrap(aInstruction.aOperand.address * bInstruction.aOperand.address);
    }
    mul_b(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.bOperand.address = context.core.wrap(aInstruction.bOperand.address * bInstruction.bOperand.address);
    }
    mul_ab(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.bOperand.address = context.core.wrap(aInstruction.aOperand.address * bInstruction.bOperand.address);
    }
    mul_ba(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = context.core.wrap(aInstruction.bOperand.address * bInstruction.aOperand.address);
    }
    mul_f(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = context.core.wrap(aInstruction.aOperand.address * bInstruction.aOperand.address);
        bInstruction.bOperand.address = context.core.wrap(aInstruction.bOperand.address * bInstruction.bOperand.address);
    }
    mul_x(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = context.core.wrap(aInstruction.bOperand.address * bInstruction.aOperand.address);
        bInstruction.bOperand.address = context.core.wrap(aInstruction.aOperand.address * bInstruction.bOperand.address);
    }
    div_a(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address !== 0) {
            bInstruction.aOperand.address = (bInstruction.aOperand.address / aInstruction.aOperand.address) >> 0;
        }
        else {
            this.dat(context);
        }
    }
    div_b(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.bOperand.address !== 0) {
            bInstruction.bOperand.address = (bInstruction.bOperand.address / aInstruction.bOperand.address) >> 0;
        }
        else {
            this.dat(context);
        }
    }
    div_ab(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address !== 0) {
            bInstruction.bOperand.address = (bInstruction.bOperand.address / aInstruction.aOperand.address) >> 0;
        }
        else {
            this.dat(context);
        }
    }
    div_ba(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.bOperand.address !== 0) {
            bInstruction.aOperand.address = (bInstruction.aOperand.address / aInstruction.bOperand.address) >> 0;
        }
        else {
            this.dat(context);
        }
    }
    div_f(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address !== 0) {
            bInstruction.aOperand.address = (bInstruction.aOperand.address / aInstruction.aOperand.address) >> 0;
        }
        else {
            this.dat(context);
        }
        if (aInstruction.bOperand.address !== 0) {
            bInstruction.bOperand.address = (bInstruction.bOperand.address / aInstruction.bOperand.address) >> 0;
        }
        else {
            this.dat(context);
        }
    }
    div_x(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.bOperand.address !== 0) {
            bInstruction.aOperand.address = (bInstruction.aOperand.address / aInstruction.bOperand.address) >> 0;
        }
        else {
            this.dat(context);
        }
        if (aInstruction.aOperand.address !== 0) {
            bInstruction.bOperand.address = (bInstruction.bOperand.address / aInstruction.aOperand.address) >> 0;
        }
        else {
            this.dat(context);
        }
    }
    mod_a(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address !== 0) {
            bInstruction.aOperand.address = bInstruction.aOperand.address % aInstruction.aOperand.address;
        }
        else {
            this.dat(context);
        }
    }
    mod_b(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.bOperand.address !== 0) {
            bInstruction.bOperand.address = bInstruction.bOperand.address % aInstruction.bOperand.address;
        }
        else {
            this.dat(context);
        }
    }
    mod_ab(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address !== 0) {
            bInstruction.bOperand.address = bInstruction.bOperand.address % aInstruction.aOperand.address;
        }
        else {
            this.dat(context);
        }
    }
    mod_ba(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.bOperand.address !== 0) {
            bInstruction.aOperand.address = bInstruction.aOperand.address % aInstruction.bOperand.address;
        }
        else {
            this.dat(context);
        }
    }
    mod_f(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address !== 0) {
            bInstruction.aOperand.address = bInstruction.aOperand.address % aInstruction.aOperand.address;
        }
        else {
            this.dat(context);
        }
        if (aInstruction.bOperand.address !== 0) {
            bInstruction.bOperand.address = bInstruction.bOperand.address % aInstruction.bOperand.address;
        }
        else {
            this.dat(context);
        }
    }
    mod_x(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.bOperand.address !== 0) {
            bInstruction.aOperand.address = bInstruction.aOperand.address % aInstruction.bOperand.address;
        }
        else {
            this.dat(context);
        }
        //TODO double divide by zero will remove two processes from the warrior task queue!
        if (aInstruction.aOperand.address !== 0) {
            bInstruction.bOperand.address = bInstruction.bOperand.address % aInstruction.aOperand.address;
        }
        else {
            this.dat(context);
        }
    }
    jmp(context) {
        context.task.instructionPointer = context.core.wrap(context.aPointer);
    }
    jmz_a(context) {
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (bInstruction.aOperand.address === 0) {
            context.task.instructionPointer = context.core.wrap(context.aPointer);
        }
    }
    jmz_b(context) {
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (bInstruction.bOperand.address === 0) {
            context.task.instructionPointer = context.core.wrap(context.aPointer);
        }
    }
    jmz_f(context) {
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (bInstruction.aOperand.address === 0 &&
            bInstruction.bOperand.address === 0) {
            context.task.instructionPointer = context.core.wrap(context.aPointer);
        }
    }
    jmn_a(context) {
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (bInstruction.aOperand.address !== 0) {
            context.task.instructionPointer = context.core.wrap(context.aPointer);
        }
    }
    jmn_b(context) {
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (bInstruction.bOperand.address !== 0) {
            context.task.instructionPointer = context.core.wrap(context.aPointer);
        }
    }
    jmn_f(context) {
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (bInstruction.aOperand.address !== 0 ||
            bInstruction.bOperand.address !== 0) {
            context.task.instructionPointer = context.core.wrap(context.aPointer);
        }
    }
    djn_a(context) {
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        var a = context.core.wrap(bInstruction.aOperand.address - 1);
        bInstruction.aOperand.address = a;
        if (a !== 0) {
            context.task.instructionPointer = context.core.wrap(context.aPointer);
        }
    }
    djn_b(context) {
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        var b = context.core.wrap(bInstruction.bOperand.address - 1);
        bInstruction.bOperand.address = b;
        if (b !== 0) {
            context.task.instructionPointer = context.core.wrap(context.aPointer);
        }
    }
    djn_f(context) {
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        var a = context.core.wrap(bInstruction.aOperand.address - 1);
        bInstruction.aOperand.address = a;
        var b = context.core.wrap(bInstruction.bOperand.address - 1);
        bInstruction.bOperand.address = b;
        if (a !== 0 || b !== 0) {
            context.task.instructionPointer = context.core.wrap(context.aPointer);
        }
    }
    seq_a(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address === bInstruction.aOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    seq_b(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.bOperand.address === bInstruction.bOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    seq_ab(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address === bInstruction.bOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    seq_ba(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.bOperand.address === bInstruction.aOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    seq_f(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address === bInstruction.aOperand.address &&
            aInstruction.bOperand.address === bInstruction.bOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    seq_x(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address === bInstruction.bOperand.address &&
            aInstruction.bOperand.address === bInstruction.aOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    seq_i(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.opcode === bInstruction.opcode &&
            aInstruction.modifier === bInstruction.modifier &&
            aInstruction.aOperand.mode === bInstruction.aOperand.mode &&
            aInstruction.aOperand.address === bInstruction.aOperand.address &&
            aInstruction.bOperand.mode === bInstruction.bOperand.mode &&
            aInstruction.bOperand.address === bInstruction.bOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    sne_a(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address !== bInstruction.aOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    sne_b(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.bOperand.address !== bInstruction.bOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    sne_ab(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address !== bInstruction.bOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    sne_ba(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.bOperand.address !== bInstruction.aOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    sne_f(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address !== bInstruction.aOperand.address ||
            aInstruction.bOperand.address !== bInstruction.bOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    sne_x(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address !== bInstruction.bOperand.address ||
            aInstruction.bOperand.address !== bInstruction.aOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    sne_i(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.opcode !== bInstruction.opcode ||
            aInstruction.modifier !== bInstruction.modifier ||
            aInstruction.aOperand.mode !== bInstruction.aOperand.mode ||
            aInstruction.aOperand.address !== bInstruction.aOperand.address ||
            aInstruction.bOperand.mode !== bInstruction.bOperand.mode ||
            aInstruction.bOperand.address !== bInstruction.bOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    slt_a(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address < bInstruction.aOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    slt_b(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.bOperand.address < bInstruction.bOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    slt_ab(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address < bInstruction.bOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    slt_ba(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.bOperand.address < bInstruction.aOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    slt_f(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address < bInstruction.aOperand.address &&
            aInstruction.bOperand.address < bInstruction.bOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    slt_x(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address < bInstruction.bOperand.address &&
            aInstruction.bOperand.address < bInstruction.aOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    spl(context) {
        if (context.warrior.tasks.length < this.instructionLimit) {
            context.warrior.tasks.splice(context.warrior.taskIndex, 0, {
                instructionPointer: context.core.wrap(context.aPointer),
                warrior: context.warrior
            });
            context.warrior.taskIndex = (context.warrior.taskIndex + 1) % context.warrior.tasks.length;
        }
    }
    nop(context) {
        // DO NOWT
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Executive;



/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interface_IInstruction__ = __webpack_require__(5);

class Decoder {
    constructor(executive) {
        this.modeTable = [
            this.immediate,
            this.direct,
            this.aIndirect,
            this.bIndirect,
            this.aPreDecrement,
            this.bPreDecrement,
            this.aPostIncrement,
            this.bPostIncrement // >
        ];
        this.executive = executive;
    }
    decode(context) {
        var aAccessor = this.modeTable[context.instruction.aOperand.mode];
        var bAccessor = this.modeTable[context.instruction.bOperand.mode];
        context.aPointer = aAccessor(context.task, context.instructionPointer, context.instruction.aOperand, context.core);
        context.bPointer = bAccessor(context.task, context.instructionPointer, context.instruction.bOperand, context.core);
        context.command = this.executive.commandTable[context.instruction.opcode * __WEBPACK_IMPORTED_MODULE_0__interface_IInstruction__["a" /* ModifierType */].Count + context.instruction.modifier];
        return context;
    }
    immediate(task, ip, operand, core) {
        return ip;
    }
    direct(task, ip, operand, core) {
        return ip + operand.address;
    }
    aIndirect(task, ip, operand, core) {
        var ipa = ip + operand.address;
        return ipa + core.readAt(task, ipa).aOperand.address;
    }
    bIndirect(task, ip, operand, core) {
        var ipa = ip + operand.address;
        return ipa + core.readAt(task, ipa).bOperand.address;
    }
    aPreDecrement(task, ip, operand, core) {
        var ipa = ip + operand.address;
        var instruction = core.readAt(task, ipa);
        var value = instruction.aOperand.address;
        var result = ipa + --value;
        instruction.aOperand.address = value;
        core.setAt(task, ipa, instruction);
        return result;
    }
    bPreDecrement(task, ip, operand, core) {
        var ipa = ip + operand.address;
        var instruction = core.readAt(task, ipa);
        var value = instruction.bOperand.address;
        var result = ipa + --value;
        instruction.bOperand.address = value;
        core.setAt(task, ipa, instruction);
        return result;
    }
    aPostIncrement(task, ip, operand, core) {
        var ipa = ip + operand.address;
        var instruction = core.readAt(task, ipa);
        var value = instruction.aOperand.address;
        var result = ipa + value++;
        instruction.aOperand.address = value;
        core.setAt(task, ipa, instruction);
        return result;
    }
    bPostIncrement(task, ip, operand, core) {
        var ipa = ip + operand.address;
        var instruction = core.readAt(task, ipa);
        var value = instruction.bOperand.address;
        var result = ipa + value++;
        instruction.bOperand.address = value;
        core.setAt(task, ipa, instruction);
        return result;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Decoder;



/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_LiteEvent__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_ICore__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_underscore__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_underscore__);



class Core {
    constructor() {
        this.instructions = null;
        this._coreAccess = new __WEBPACK_IMPORTED_MODULE_0__modules_LiteEvent__["a" /* LiteEvent */]();
    }
    get coreAccess() {
        return this._coreAccess;
    }
    initialise(options) {
        this.options = options;
        this.cs = this.options.coresize;
        this.allocateMemory();
    }
    getSize() {
        return this.cs;
    }
    wrap(address) {
        address = address % this.cs;
        address = address >= 0 ? address : address + this.cs;
        return address;
    }
    triggerEvent(task, address, accessType) {
        this._coreAccess.trigger({
            task: task,
            accessType: accessType,
            address: address
        });
    }
    executeAt(task, address) {
        address = this.wrap(address);
        this.triggerEvent(task, address, __WEBPACK_IMPORTED_MODULE_1__interface_ICore__["a" /* CoreAccessType */].execute);
        return this.instructions[address];
    }
    readAt(task, address) {
        address = this.wrap(address);
        this.triggerEvent(task, address, __WEBPACK_IMPORTED_MODULE_1__interface_ICore__["a" /* CoreAccessType */].read);
        return this.instructions[address];
    }
    getAt(address) {
        address = this.wrap(address);
        return this.instructions[address];
    }
    setAt(task, address, instruction) {
        address = this.wrap(address);
        this.triggerEvent(task, address, __WEBPACK_IMPORTED_MODULE_1__interface_ICore__["a" /* CoreAccessType */].write);
        this.instructions[address] = instruction;
    }
    allocateMemory() {
        this.instructions = [];
        for (var i = 0; i < this.cs; i++) {
            this.instructions.push(this.buildDefaultInstruction(i));
        }
    }
    buildDefaultInstruction(index) {
        var instruction = __WEBPACK_IMPORTED_MODULE_2_underscore__["clone"](this.options.initialInstruction);
        instruction.aOperand = __WEBPACK_IMPORTED_MODULE_2_underscore__["clone"](instruction.aOperand);
        instruction.bOperand = __WEBPACK_IMPORTED_MODULE_2_underscore__["clone"](instruction.bOperand);
        instruction.address = index;
        return instruction;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Core;



/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//http://stackoverflow.com/questions/12881212/does-typescript-support-events-on-classes
class LiteEvent {
    constructor() {
        this.handlers = [];
    }
    subscribe(handler) {
        this.handlers.push(handler);
    }
    unsubscribe(handler) {
        this.handlers = this.handlers.filter(h => h !== handler);
    }
    trigger(data) {
        if (this.handlers) {
            this.handlers.slice(0).forEach(h => h(data));
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LiteEvent;



/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_underscore__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_underscore__);

class Loader {
    constructor(random, core, warriorLoader) {
        this.random = random;
        this.warriorLoader = warriorLoader;
        this.core = core;
    }
    load(warriors, options) {
        var result = [];
        __WEBPACK_IMPORTED_MODULE_0_underscore__(warriors).forEach((w) => {
            var address = this.getValidAddress(result, options);
            result.push(this.warriorLoader.load(address, w));
        });
        return result;
    }
    getValidAddress(warriors, options) {
        while (true) {
            var address = this.random.get(options.coresize);
            if (this.isValidAddress(address, warriors, options)) {
                return address;
            }
        }
    }
    isValidAddress(address, warriors, options) {
        var valid = true;
        var core = this.core;
        var instructionLimitLess1 = options.instructionLimit - 1;
        var minSeparationLess1 = options.minSeparation - 1;
        __WEBPACK_IMPORTED_MODULE_0_underscore__(warriors).forEach((w) => {
            var s0 = address;
            var f0 = address + instructionLimitLess1;
            var s1 = w.startAddress - minSeparationLess1;
            var f1 = w.startAddress + minSeparationLess1 + instructionLimitLess1;
            s0 = core.wrap(s0);
            f0 = core.wrap(f0);
            s1 = core.wrap(s1);
            f1 = core.wrap(f1);
            if (s0 <= f0) {
                if (s1 <= f1) {
                    if (s0 <= f1 && s1 <= f0) {
                        valid = false;
                        return;
                    }
                }
                else if (s0 <= f1 || s1 <= f0) {
                    valid = false;
                    return;
                }
            }
            else if (s0 <= f1 || s1 <= f0) {
                valid = false;
                return;
            }
        });
        return valid;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Loader;



/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interface_IInstruction__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_IOperand__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__parser_interface_IToken__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__parser_TokenStream__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Warrior__ = __webpack_require__(36);





class WarriorLoader {
    constructor(core) {
        this.core = core;
    }
    load(address, result) {
        this.stream = new __WEBPACK_IMPORTED_MODULE_3__parser_TokenStream__["a" /* TokenStream */](result.tokens, result.messages);
        this.address = address;
        this.warrior = new __WEBPACK_IMPORTED_MODULE_4__Warrior__["a" /* Warrior */]();
        this.warrior.startAddress = address;
        this.readInstructions();
        this.loadProcess();
        this.warrior.name = result.metaData.name;
        this.warrior.author = result.metaData.author;
        this.warrior.strategy = result.metaData.strategy;
        return this.warrior;
    }
    readInstructions() {
        while (!this.stream.eof()) {
            var next = this.stream.peek();
            if (next.category === __WEBPACK_IMPORTED_MODULE_2__parser_interface_IToken__["a" /* TokenCategory */].Opcode) {
                this.core.setAt(this.warrior.tasks[0], this.address++, this.readInstruction());
            }
            else if (next.category === __WEBPACK_IMPORTED_MODULE_2__parser_interface_IToken__["a" /* TokenCategory */].Preprocessor) {
                this.startAddress = this.readOrg();
            }
            else {
                this.stream.readToEOL();
            }
        }
    }
    readInstruction() {
        var parseInstruction = this.readParseInstruction();
        var instruction = {
            address: this.address,
            opcode: this.getOpcode(parseInstruction),
            modifier: this.getModifier(parseInstruction),
            aOperand: this.getOperand(parseInstruction.aOperand),
            bOperand: this.getOperand(parseInstruction.bOperand)
        };
        return instruction;
    }
    readOrg() {
        this.stream.read(); // ORG
        var token = this.stream.read();
        this.stream.readToEOL();
        return this.address + parseInt(token.lexeme, 10);
    }
    readParseInstruction() {
        var result = {
            opcode: this.stream.read(),
            modifier: this.stream.read(),
            aOperand: {
                mode: this.stream.read(),
                address: this.stream.read()
            },
            comma: this.stream.read(),
            bOperand: {
                mode: this.stream.read(),
                address: this.stream.read()
            }
        };
        this.stream.readToEOL();
        return result;
    }
    getOpcode(instruction) {
        switch (instruction.opcode.lexeme) {
            case "DAT":
                return __WEBPACK_IMPORTED_MODULE_0__interface_IInstruction__["b" /* OpcodeType */].DAT;
            case "MOV":
                return __WEBPACK_IMPORTED_MODULE_0__interface_IInstruction__["b" /* OpcodeType */].MOV;
            case "ADD":
                return __WEBPACK_IMPORTED_MODULE_0__interface_IInstruction__["b" /* OpcodeType */].ADD;
            case "SUB":
                return __WEBPACK_IMPORTED_MODULE_0__interface_IInstruction__["b" /* OpcodeType */].SUB;
            case "MUL":
                return __WEBPACK_IMPORTED_MODULE_0__interface_IInstruction__["b" /* OpcodeType */].MUL;
            case "DIV":
                return __WEBPACK_IMPORTED_MODULE_0__interface_IInstruction__["b" /* OpcodeType */].DIV;
            case "MOD":
                return __WEBPACK_IMPORTED_MODULE_0__interface_IInstruction__["b" /* OpcodeType */].MOD;
            case "JMP":
                return __WEBPACK_IMPORTED_MODULE_0__interface_IInstruction__["b" /* OpcodeType */].JMP;
            case "JMZ":
                return __WEBPACK_IMPORTED_MODULE_0__interface_IInstruction__["b" /* OpcodeType */].JMZ;
            case "JMN":
                return __WEBPACK_IMPORTED_MODULE_0__interface_IInstruction__["b" /* OpcodeType */].JMN;
            case "DJN":
                return __WEBPACK_IMPORTED_MODULE_0__interface_IInstruction__["b" /* OpcodeType */].DJN;
            case "CMP":
                return __WEBPACK_IMPORTED_MODULE_0__interface_IInstruction__["b" /* OpcodeType */].CMP;
            case "SEQ":
                return __WEBPACK_IMPORTED_MODULE_0__interface_IInstruction__["b" /* OpcodeType */].SEQ;
            case "SNE":
                return __WEBPACK_IMPORTED_MODULE_0__interface_IInstruction__["b" /* OpcodeType */].SNE;
            case "SLT":
                return __WEBPACK_IMPORTED_MODULE_0__interface_IInstruction__["b" /* OpcodeType */].SLT;
            case "SPL":
                return __WEBPACK_IMPORTED_MODULE_0__interface_IInstruction__["b" /* OpcodeType */].SPL;
            default:
                return __WEBPACK_IMPORTED_MODULE_0__interface_IInstruction__["b" /* OpcodeType */].NOP;
        }
    }
    getModifier(instruction) {
        switch (instruction.modifier.lexeme) {
            case ".A":
                return __WEBPACK_IMPORTED_MODULE_0__interface_IInstruction__["a" /* ModifierType */].A;
            case ".B":
                return __WEBPACK_IMPORTED_MODULE_0__interface_IInstruction__["a" /* ModifierType */].B;
            case ".BA":
                return __WEBPACK_IMPORTED_MODULE_0__interface_IInstruction__["a" /* ModifierType */].BA;
            case ".F":
                return __WEBPACK_IMPORTED_MODULE_0__interface_IInstruction__["a" /* ModifierType */].F;
            case ".I":
                return __WEBPACK_IMPORTED_MODULE_0__interface_IInstruction__["a" /* ModifierType */].I;
            case ".X":
                return __WEBPACK_IMPORTED_MODULE_0__interface_IInstruction__["a" /* ModifierType */].X;
            default:
                return __WEBPACK_IMPORTED_MODULE_0__interface_IInstruction__["a" /* ModifierType */].AB;
        }
    }
    getOperand(operand) {
        var result = {
            mode: 0,
            address: parseInt(operand.address.lexeme, 10)
        };
        switch (operand.mode.lexeme) {
            case "#":
                result.mode = __WEBPACK_IMPORTED_MODULE_1__interface_IOperand__["a" /* ModeType */].Immediate;
                break;
            case "*":
                result.mode = __WEBPACK_IMPORTED_MODULE_1__interface_IOperand__["a" /* ModeType */].AIndirect;
                break;
            case "@":
                result.mode = __WEBPACK_IMPORTED_MODULE_1__interface_IOperand__["a" /* ModeType */].BIndirect;
                break;
            case "{":
                result.mode = __WEBPACK_IMPORTED_MODULE_1__interface_IOperand__["a" /* ModeType */].APreDecrement;
                break;
            case "<":
                result.mode = __WEBPACK_IMPORTED_MODULE_1__interface_IOperand__["a" /* ModeType */].BPreDecrement;
                break;
            case "}":
                result.mode = __WEBPACK_IMPORTED_MODULE_1__interface_IOperand__["a" /* ModeType */].APostIncrement;
                break;
            case ">":
                result.mode = __WEBPACK_IMPORTED_MODULE_1__interface_IOperand__["a" /* ModeType */].BPostIncrement;
                break;
            default:
                result.mode = __WEBPACK_IMPORTED_MODULE_1__interface_IOperand__["a" /* ModeType */].Direct;
                break;
        }
        return result;
    }
    loadProcess() {
        this.warrior.tasks.push({
            instructionPointer: this.startAddress,
            warrior: this.warrior
        });
        this.warrior.taskIndex = 0;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = WarriorLoader;



/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Warrior {
    constructor() {
        this.name = "";
        this.author = "";
        this.strategy = "";
        this.instructions = [];
        this.taskIndex = 0;
        this.tasks = [];
        this.startAddress = 0;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Warrior;



/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Fetcher {
    fetch(state) {
        var wi = state.warriorIndex;
        var warrior = state.warriors[wi];
        var ti = warrior.taskIndex;
        var task = warrior.tasks[ti];
        state.warriorIndex = (wi + 1) % state.warriors.length;
        warrior.taskIndex = (ti + 1) % warrior.tasks.length;
        var ip = task.instructionPointer;
        var instruction = state.core.executeAt(task, ip);
        task.instructionPointer = (ip + 1) % state.options.coresize;
        // TODO should we instantiate an object everytime?
        return {
            core: state.core,
            instructionPointer: ip,
            instruction: instruction,
            taskIndex: ti,
            task: task,
            warriorIndex: wi,
            warrior: warrior
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Fetcher;



/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Defaults__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_underscore__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_underscore__);


class Simulator {
    constructor(core, loader, fetcher, decoder, executive, endCondition) {
        this.state = {
            core: core,
            cycle: 0,
            warriors: [],
            warriorIndex: 0,
            options: null //,
            //context: null
        };
        this.loader = loader;
        this.fetcher = fetcher;
        this.decoder = decoder;
        this.executive = executive;
        this.endCondition = endCondition;
    }
    initialise(options, warriors) {
        // TODO throw error if options are invalid e.g. minSeparation must be >=1
        this.state.options = __WEBPACK_IMPORTED_MODULE_1_underscore__["defaults"](options, __WEBPACK_IMPORTED_MODULE_0__Defaults__["a" /* default */]);
        this.state.core.initialise(options);
        this.state.warriors = this.loader.load(warriors, options);
    }
    run() {
        while (this.step()) {
            // TODO setTimeout?
            window.setTimeout(() => {
                //
            }, 0);
        }
    }
    step() {
        var context = this.fetcher.fetch(this.state);
        context = this.decoder.decode(context);
        context.command.apply(this.executive, [context]);
        this.state.cycle += 1;
        return this.endCondition.check(this.state);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Simulator;



/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_underscore__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_underscore__);

class EndCondition {
    check(state) {
        if (state.cycle === state.options.cyclesBeforeTie) {
            return true;
        }
        var liveWarriors = __WEBPACK_IMPORTED_MODULE_0_underscore__(state.warriors).filter((warrior) => warrior.tasks.length > 0);
        if (state.warriors.length > 1) {
            return liveWarriors.length === 1;
        }
        else {
            return liveWarriors.length === 0;
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EndCondition;



/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__simulator_interface_IInstruction__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__simulator_interface_IOperand__ = __webpack_require__(6);


class InstructionSerialiser {
    serialise(instruction) {
        return this.serialiseOpcode(instruction) + "." +
            this.serialiseModifier(instruction) + " " +
            this.serialiseOperand(instruction.aOperand) + ", " +
            this.serialiseOperand(instruction.bOperand);
    }
    serialiseOpcode(instruction) {
        switch (instruction.opcode) {
            case __WEBPACK_IMPORTED_MODULE_0__simulator_interface_IInstruction__["b" /* OpcodeType */].ADD:
                return "ADD";
            case __WEBPACK_IMPORTED_MODULE_0__simulator_interface_IInstruction__["b" /* OpcodeType */].CMP:
                return "CMP";
            case __WEBPACK_IMPORTED_MODULE_0__simulator_interface_IInstruction__["b" /* OpcodeType */].DAT:
                return "DAT";
            case __WEBPACK_IMPORTED_MODULE_0__simulator_interface_IInstruction__["b" /* OpcodeType */].DIV:
                return "DIV";
            case __WEBPACK_IMPORTED_MODULE_0__simulator_interface_IInstruction__["b" /* OpcodeType */].DJN:
                return "DJN";
            case __WEBPACK_IMPORTED_MODULE_0__simulator_interface_IInstruction__["b" /* OpcodeType */].JMN:
                return "JMN";
            case __WEBPACK_IMPORTED_MODULE_0__simulator_interface_IInstruction__["b" /* OpcodeType */].JMP:
                return "JMP";
            case __WEBPACK_IMPORTED_MODULE_0__simulator_interface_IInstruction__["b" /* OpcodeType */].JMZ:
                return "JMZ";
            case __WEBPACK_IMPORTED_MODULE_0__simulator_interface_IInstruction__["b" /* OpcodeType */].MOD:
                return "MOD";
            case __WEBPACK_IMPORTED_MODULE_0__simulator_interface_IInstruction__["b" /* OpcodeType */].MOV:
                return "MOV";
            case __WEBPACK_IMPORTED_MODULE_0__simulator_interface_IInstruction__["b" /* OpcodeType */].MUL:
                return "MUL";
            case __WEBPACK_IMPORTED_MODULE_0__simulator_interface_IInstruction__["b" /* OpcodeType */].NOP:
                return "NOP";
            case __WEBPACK_IMPORTED_MODULE_0__simulator_interface_IInstruction__["b" /* OpcodeType */].SEQ:
                return "SEQ";
            case __WEBPACK_IMPORTED_MODULE_0__simulator_interface_IInstruction__["b" /* OpcodeType */].SLT:
                return "SLT";
            case __WEBPACK_IMPORTED_MODULE_0__simulator_interface_IInstruction__["b" /* OpcodeType */].SNE:
                return "SNE";
            case __WEBPACK_IMPORTED_MODULE_0__simulator_interface_IInstruction__["b" /* OpcodeType */].SPL:
                return "SPL";
            case __WEBPACK_IMPORTED_MODULE_0__simulator_interface_IInstruction__["b" /* OpcodeType */].SUB:
                return "SUB";
        }
        throw "Unknown Opcode provided to InstructionSerialiser";
    }
    serialiseModifier(instruction) {
        switch (instruction.modifier) {
            case __WEBPACK_IMPORTED_MODULE_0__simulator_interface_IInstruction__["a" /* ModifierType */].A:
                return "A";
            case __WEBPACK_IMPORTED_MODULE_0__simulator_interface_IInstruction__["a" /* ModifierType */].B:
                return "B";
            case __WEBPACK_IMPORTED_MODULE_0__simulator_interface_IInstruction__["a" /* ModifierType */].AB:
                return "AB";
            case __WEBPACK_IMPORTED_MODULE_0__simulator_interface_IInstruction__["a" /* ModifierType */].BA:
                return "BA";
            case __WEBPACK_IMPORTED_MODULE_0__simulator_interface_IInstruction__["a" /* ModifierType */].F:
                return "F";
            case __WEBPACK_IMPORTED_MODULE_0__simulator_interface_IInstruction__["a" /* ModifierType */].I:
                return "I";
            case __WEBPACK_IMPORTED_MODULE_0__simulator_interface_IInstruction__["a" /* ModifierType */].X:
                return "X";
        }
        throw "Unknown Modifier provided to InstructionSerialiser";
    }
    serialiseOperand(operand) {
        return this.serialiseMode(operand.mode) +
            this.serialiseAddress(operand.address);
    }
    serialiseMode(mode) {
        switch (mode) {
            case __WEBPACK_IMPORTED_MODULE_1__simulator_interface_IOperand__["a" /* ModeType */].AIndirect:
                return "*";
            case __WEBPACK_IMPORTED_MODULE_1__simulator_interface_IOperand__["a" /* ModeType */].APostIncrement:
                return "}";
            case __WEBPACK_IMPORTED_MODULE_1__simulator_interface_IOperand__["a" /* ModeType */].APreDecrement:
                return "{";
            case __WEBPACK_IMPORTED_MODULE_1__simulator_interface_IOperand__["a" /* ModeType */].BIndirect:
                return "@";
            case __WEBPACK_IMPORTED_MODULE_1__simulator_interface_IOperand__["a" /* ModeType */].BPostIncrement:
                return ">";
            case __WEBPACK_IMPORTED_MODULE_1__simulator_interface_IOperand__["a" /* ModeType */].BPreDecrement:
                return "<";
            case __WEBPACK_IMPORTED_MODULE_1__simulator_interface_IOperand__["a" /* ModeType */].Direct:
                return "$";
            case __WEBPACK_IMPORTED_MODULE_1__simulator_interface_IOperand__["a" /* ModeType */].Immediate:
                return "#";
        }
        throw "Unknown Mode provided to InstructionSerialiser";
    }
    serialiseAddress(address) {
        return address.toString();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = InstructionSerialiser;



/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__simulator_interface_ICore__ = __webpack_require__(8);

class CoreRenderer {
    constructor(canvas, instructionLabel, core, instructionSerialiser) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.instructionLabel = instructionLabel;
        this.core = core;
        this.instructionSerialiser = instructionSerialiser;
        this.queue = [];
        core.coreAccess.subscribe((e) => {
            this.queue.push(e);
        });
    }
    initialise() {
        this.cellSize = this.calculateCellSize();
        this.cellsWide = Math.floor(this.canvas.width / this.cellSize);
        this.cellsHigh = Math.floor(this.canvas.height / this.cellSize);
        this.previousExecutions = [];
        this.canvas.addEventListener("click", (e) => { this.canvasClick(e); });
        this.renderGrid();
    }
    render() {
        var event;
        while (this.previousExecutions.length !== 0) {
            event = this.previousExecutions.pop();
            this.renderCell(event, "#f00");
        }
        this.previousExecutions = _(this.queue).where((q) => q.accessType === __WEBPACK_IMPORTED_MODULE_0__simulator_interface_ICore__["a" /* CoreAccessType */].execute);
        while (this.queue.length !== 0) {
            event = this.queue.shift();
            this.renderCell(event, "#fff");
        }
        this.renderGridLines();
    }
    addressToScreenCoordinate(address) {
        var ix = address % this.cellsWide;
        var iy = Math.floor(address / this.cellsWide);
        return {
            x: ix * this.cellSize,
            y: iy * this.cellSize
        };
    }
    screenCoordinateToAddress(point) {
        var x = Math.floor(point.x / this.cellSize);
        var y = Math.floor(point.y / this.cellSize);
        return y * this.cellsWide + x;
    }
    renderCell(event, executionColour) {
        var coordinate = this.addressToScreenCoordinate(event.address);
        //TODO colour for each process
        this.context.fillStyle = "#f00";
        this.context.strokeStyle = "#f00";
        switch (event.accessType) {
            case __WEBPACK_IMPORTED_MODULE_0__simulator_interface_ICore__["a" /* CoreAccessType */].execute:
                this.renderExecute(coordinate, executionColour);
                break;
            case __WEBPACK_IMPORTED_MODULE_0__simulator_interface_ICore__["a" /* CoreAccessType */].read:
                this.renderRead(coordinate);
                break;
            case __WEBPACK_IMPORTED_MODULE_0__simulator_interface_ICore__["a" /* CoreAccessType */].write:
                this.renderWrite(coordinate);
                break;
            default:
                throw Error("Cannot render unknown CoreAccessType: " + event.accessType);
        }
    }
    renderExecute(coordinate, executionColour) {
        var colour = this.context.fillStyle;
        this.context.fillStyle = executionColour;
        this.context.fillRect(coordinate.x, coordinate.y, this.cellSize, this.cellSize);
        this.context.fillStyle = colour;
    }
    renderRead(coordinate) {
        var hSize = this.cellSize / 2;
        var radius = this.cellSize / 8;
        var centre = {
            x: coordinate.x + hSize,
            y: coordinate.y + hSize
        };
        this.context.beginPath();
        this.context.arc(centre.x, centre.y, radius, 0, 2 * Math.PI, false);
        this.context.fill();
        //this.context.stroke();
    }
    renderWrite(coordinate) {
        var x0 = coordinate.x;
        var y0 = coordinate.y;
        var x1 = x0 + this.cellSize;
        var y1 = y0 + this.cellSize;
        this.context.beginPath();
        this.context.moveTo(x0, y0);
        this.context.lineTo(x1, y1);
        this.context.moveTo(x0, y1);
        this.context.lineTo(x1, y0);
        this.context.stroke();
    }
    renderGrid() {
        this.clearCanvas();
        this.fillGridArea();
        this.renderGridLines();
        this.greyOutExtraCells();
    }
    clearCanvas() {
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.setTransform(1, 0, 0, 1, 0.5, 0.5);
    }
    fillGridArea() {
        var width = this.cellsWide * this.cellSize;
        var height = this.cellsHigh * this.cellSize;
        this.context.fillStyle = "#eee";
        this.context.fillRect(0, 0, width, height);
    }
    greyOutExtraCells() {
        var cellsDrawn = this.cellsWide * this.cellsHigh;
        var extraCellsDrawn = cellsDrawn - this.core.getSize();
        if (extraCellsDrawn === 0) {
            return;
        }
        var gridWidth = this.cellsWide * this.cellSize;
        var gridHeight = this.cellsHigh * this.cellSize;
        var maxX = gridWidth - this.cellSize;
        var maxY = gridHeight - this.cellSize;
        var x = maxX;
        var y = maxY;
        this.context.fillStyle = "#aaa";
        while (extraCellsDrawn-- > 0) {
            this.context.fillRect(x, y, this.cellSize, this.cellSize);
            x -= this.cellSize;
            if (x < 0) {
                x = maxX;
                y -= this.cellSize;
            }
        }
    }
    renderGridLines() {
        this.context.beginPath();
        this.renderVerticalLines();
        this.renderHorizontalLines();
        this.context.strokeStyle = "#aaa";
        this.context.stroke();
    }
    renderHorizontalLines() {
        var gridWidth = this.cellsWide * this.cellSize;
        var gridHeight = this.cellsHigh * this.cellSize;
        for (var y = 0; y <= gridHeight; y += this.cellSize) {
            this.context.moveTo(0, y);
            this.context.lineTo(gridWidth, y);
        }
    }
    renderVerticalLines() {
        var gridWidth = this.cellsWide * this.cellSize;
        var gridHeight = this.cellsHigh * this.cellSize;
        for (var x = 0; x <= gridWidth; x += this.cellSize) {
            this.context.moveTo(x, 0);
            this.context.lineTo(x, gridHeight);
        }
    }
    calculateCellSize() {
        var area = this.canvas.width * this.canvas.height;
        var n = this.core.getSize();
        var maxCellSize = Math.sqrt(area / n);
        var possibleCellSize = Math.floor(maxCellSize);
        while (!this.isValidCellSize(possibleCellSize)) {
            possibleCellSize--;
        }
        return possibleCellSize;
    }
    isValidCellSize(cellSize) {
        var cellsWide = Math.floor(this.canvas.width / cellSize);
        var cellsHigh = Math.floor(this.canvas.height / cellSize);
        return cellsWide * cellsHigh >= this.core.getSize();
    }
    getRelativeCoordinates(event) {
        var totalOffsetX = 0;
        var totalOffsetY = 0;
        var currentElement = event.target;
        do {
            totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
            totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
        } while (currentElement = currentElement.offsetParent);
        var canvasX = event.pageX - totalOffsetX;
        var canvasY = event.pageY - totalOffsetY;
        return { x: canvasX, y: canvasY };
    }
    canvasClick(e) {
        var point = this.getRelativeCoordinates(e);
        var address = this.screenCoordinateToAddress(point);
        var instruction = this.core.getAt(address);
        this.instructionLabel.innerText = this.instructionSerialiser.serialise(instruction);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CoreRenderer;



/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__parser_interface_IMessage__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__simulator_Defaults__ = __webpack_require__(9);


class Presenter {
    constructor(redcode, loadfile, console, standard, parser, serialiser, simulator, core, executive) {
        this.redcode = redcode;
        this.loadfile = loadfile;
        this.console = console;
        this.standard = standard;
        this.serialiser = serialiser;
        this.parser = parser;
        this.simulator = simulator;
        this.core = core;
        this.executive = executive;
    }
    parse() {
        while (this.console.hasChildNodes()) {
            this.console.removeChild(this.console.lastChild);
        }
        var selectedStandard = parseInt(this.standard.value);
        var redcodeValue = this.redcode.value;
        this.result = this.parser.parse(redcodeValue, { standard: selectedStandard });
        this.loadfile.value = this.serialiser.serialise(this.result.tokens);
        _.forEach(this.result.messages, (item) => {
            var li = document.createElement("li");
            li.innerText =
                "[" + item.position.line.toString() + "," +
                    item.position.char.toString() + "] " +
                    this.messageTypeToString(item.type) +
                    item.text;
            this.console.appendChild(li);
        });
    }
    run() {
        //TODO check successful parse
        var selectedStandard = parseInt(this.standard.value);
        var options = _.defaults({
            coresize: 64,
            standard: selectedStandard
        }, __WEBPACK_IMPORTED_MODULE_1__simulator_Defaults__["a" /* default */]);
        this.core.initialise(options);
        this.executive.initialise(options);
        this.simulator.initialise(options, [this.result]);
    }
    step() {
        this.simulator.step();
    }
    messageTypeToString(messageType) {
        switch (messageType) {
            case __WEBPACK_IMPORTED_MODULE_0__parser_interface_IMessage__["a" /* MessageType */].Error:
                return "ERROR: ";
            case __WEBPACK_IMPORTED_MODULE_0__parser_interface_IMessage__["a" /* MessageType */].Warning:
                return "WARNING: ";
            case __WEBPACK_IMPORTED_MODULE_0__parser_interface_IMessage__["a" /* MessageType */].Info:
                return "";
        }
        return "";
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Presenter;



/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODIxNmY0MGE5Y2VhZGU5YjMxY2QiLCJ3ZWJwYWNrOi8vLy4vcGFyc2VyL2ludGVyZmFjZS9JVG9rZW4udHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3VuZGVyc2NvcmUvdW5kZXJzY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9wYXJzZXIvUGFzc0Jhc2UudHMiLCJ3ZWJwYWNrOi8vLy4vcGFyc2VyL2ludGVyZmFjZS9JUGFyc2VPcHRpb25zLnRzIiwid2VicGFjazovLy8uL3BhcnNlci9pbnRlcmZhY2UvSU1lc3NhZ2UudHMiLCJ3ZWJwYWNrOi8vLy4vc2ltdWxhdG9yL2ludGVyZmFjZS9JSW5zdHJ1Y3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc2ltdWxhdG9yL2ludGVyZmFjZS9JT3BlcmFuZC50cyIsIndlYnBhY2s6Ly8vLi9wYXJzZXIvVG9rZW5TdHJlYW0udHMiLCJ3ZWJwYWNrOi8vLy4vc2ltdWxhdG9yL2ludGVyZmFjZS9JQ29yZS50cyIsIndlYnBhY2s6Ly8vLi9zaW11bGF0b3IvRGVmYXVsdHMudHMiLCJ3ZWJwYWNrOi8vLy4vY29yZXdhci9hcHAudHMiLCJ3ZWJwYWNrOi8vLy4vcGFyc2VyL1BhcnNlci50cyIsIndlYnBhY2s6Ly8vLi9wYXJzZXIvU2Nhbm5lci50cyIsIndlYnBhY2s6Ly8vLi9wYXJzZXIvQ29udGV4dC50cyIsIndlYnBhY2s6Ly8vLi9wYXJzZXIvRm9yUGFzcy50cyIsIndlYnBhY2s6Ly8vLi9wYXJzZXIvVG9rZW5IZWxwZXIudHMiLCJ3ZWJwYWNrOi8vLy4vcGFyc2VyL1ByZXByb2Nlc3NDb2xsZWN0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vcGFyc2VyL1ByZXByb2Nlc3NBbmFseXNlci50cyIsIndlYnBhY2s6Ly8vLi9wYXJzZXIvUHJlcHJvY2Vzc0VtaXR0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vcGFyc2VyL0xhYmVsQ29sbGVjdG9yLnRzIiwid2VicGFjazovLy8uL3BhcnNlci9MYWJlbEVtaXR0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vcGFyc2VyL01hdGhzUHJvY2Vzc29yLnRzIiwid2VicGFjazovLy8uL3BhcnNlci9FeHByZXNzaW9uLnRzIiwid2VicGFjazovLy8uL3BhcnNlci9GaWx0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vcGFyc2VyL0RlZmF1bHRQYXNzLnRzIiwid2VicGFjazovLy8uL3BhcnNlci9PcmdQYXNzLnRzIiwid2VicGFjazovLy8uL3BhcnNlci9TeW50YXhDaGVjay50cyIsIndlYnBhY2s6Ly8vLi9wYXJzZXIvTG9hZEZpbGVTZXJpYWxpc2VyLnRzIiwid2VicGFjazovLy8uL3BhcnNlci9JbGxlZ2FsQ29tbWFuZENoZWNrLnRzIiwid2VicGFjazovLy8uL3NpbXVsYXRvci9SYW5kb20udHMiLCJ3ZWJwYWNrOi8vLy4vc2ltdWxhdG9yL0V4ZWN1dGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zaW11bGF0b3IvRGVjb2Rlci50cyIsIndlYnBhY2s6Ly8vLi9zaW11bGF0b3IvQ29yZS50cyIsIndlYnBhY2s6Ly8vLi9tb2R1bGVzL0xpdGVFdmVudC50cyIsIndlYnBhY2s6Ly8vLi9zaW11bGF0b3IvTG9hZGVyLnRzIiwid2VicGFjazovLy8uL3NpbXVsYXRvci9XYXJyaW9yTG9hZGVyLnRzIiwid2VicGFjazovLy8uL3NpbXVsYXRvci9XYXJyaW9yLnRzIiwid2VicGFjazovLy8uL3NpbXVsYXRvci9GZXRjaGVyLnRzIiwid2VicGFjazovLy8uL3NpbXVsYXRvci9TaW11bGF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc2ltdWxhdG9yL0VuZENvbmRpdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9jb3Jld2FyL1ByZXNlbnRhdGlvbi9JbnN0cnVjdGlvblNlcmlhbGlzZXIudHMiLCJ3ZWJwYWNrOi8vLy4vY29yZXdhci9QcmVzZW50YXRpb24vQ29yZVJlbmRlcmVyLnRzIiwid2VicGFjazovLy8uL2NvcmV3YXIvUHJlc2VudGF0aW9uL1ByZXNlbnRlci50cyJdLCJuYW1l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LEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLGVBQWU7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsZUFBZTtBQUNwQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFlBQVk7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0EseUJBQXlCLGdCQUFnQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsWUFBWTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxZQUFZO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxZQUFZO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSw0Q0FBNEMsbUJBQW1CO0FBQy9EO0FBQ0E7QUFDQSx5Q0FBeUMsWUFBWTtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRDtBQUNyRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFlBQVk7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkVBQTZFO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFB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VyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLE1BQU0sQ0FBQztZQUNYLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsd0VBQWEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RELFFBQVEsQ0FBQztZQUNiLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsd0VBQWEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVELFFBQVEsQ0FBQztZQUNiLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsd0VBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BELFFBQVEsQ0FBQztZQUNiLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsd0VBQWEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hELFFBQVEsQ0FBQztZQUNiLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsd0VBQWEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RELFFBQVEsQ0FBQztZQUNiLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsd0VBQWEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hELFFBQVEsQ0FBQztZQUNiLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsd0VBQWEsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENB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T0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU87SUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU87SUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU87SUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU87SUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU87SUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU87SUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU87SUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU87SUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU87SUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU87SUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU87SUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU87SUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU87SUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU87SUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU87SUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTztDQUNyQyxDQUFDOzs7Ozs7OztBQzNDQTtJQUVLLEdBQUcsQ0FBQyxHQUFXO1FBRWxCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUMzQyxDQUFDO0NBQ0o7QUFBQTtBQUFBOzs7Ozs7OztBQ0hLO0lBQU47UUFFVyxpQkFBWSxHQUE2QztZQUM1RCxJQUFJLENBQUMsR0FBRztZQUNSLElBQUksQ0FBQyxHQUFHO1lBQ1IsSUFBSSxDQUFDLEdBQUc7WUFDUixJQUFJLENBQUMsR0FBRztZQUNSLElBQUksQ0FBQyxHQUFHO1lBQ1IsSUFBSSxDQUFDLEdBQUc7WUFDUixJQUFJLENBQUMsR0FBRztZQUVSLElBQUksQ0FBQyxLQUFLO1lBQ1YsSUFBSSxDQUFDLEtBQUs7WUFDVixJQUFJLENBQUMsTUFBTTtZQUNYLElBQUksQ0FBQyxNQUFNO1lBQ1gsSUFBSSxDQUFDLEtBQUs7WUFDVixJQUFJLENBQUMsS0FBSztZQUNWLElBQUksQ0FBQyxLQUFLO1lBRVYsSUFBSSxDQUFDLEtBQUs7WUFDVixJQUFJLENBQUMsS0FBSztZQUNWLElBQUksQ0FBQyxNQUFNO1lBQ1gsSUFBSSxDQUFDLE1BQU07WUFDWCxJQUFJLENBQUMsS0FBSztZQUNWLElBQUksQ0FBQyxLQUFLO1lBQ1YsSUFBSSxDQUFDLEtBQUs7WUFFVixJQUFJLENBQUMsS0FBSztZQUNWLElBQUksQ0FBQyxLQUFLO1lBQ1YsSUFBSSxDQUFDLE1BQU07WUFDWCxJQUFJLENBQUMsTUFBTTtZQUNYLElBQUksQ0FBQyxLQUFLO1lBQ1YsSUFBSSxDQUFDLEtBQUs7WUFDVixJQUFJLENBQUMsS0FBSztZQUVWLElBQUksQ0FBQyxLQUFLO1lBQ1YsSUFBSSxDQUFDLEtBQUs7WUFDVixJQUFJLENBQUMsTUFBTTtZQUNYLElBQUksQ0FBQyxNQUFNO1lBQ1gsSUFBSSxDQUFDLEtBQUs7WUFDVixJQUFJLENBQUMsS0FBSztZQUNWLElBQUksQ0FBQyxLQUFLO1lBRVYsSUFBSSxDQUFDLEtBQUs7WUFDVixJQUFJLENBQUMsS0FBSztZQUNWLElBQUksQ0FBQyxNQUFNO1lBQ1gsSUFBSSxDQUFDLE1BQU07WUFDWCxJQUFJLENBQUMsS0FBSztZQUNWLElBQUksQ0FBQyxLQUFLO1lBQ1YsSUFBSSxDQUFDLEtBQUs7WUFFVixJQUFJLENBQUMsS0FBSztZQUNWLElBQUksQ0FBQyxLQUFLO1lBQ1YsSUFBSSxDQUFDLE1BQU07WUFDWCxJQUFJLENBQUMsTUFBTTtZQUNYLElBQUksQ0FBQyxLQUFLO1lBQ1YsSUFBSSxDQUFDLEtBQUs7WUFDVixJQUFJLENBQUMsS0FBSztZQUVWLElBQUksQ0FBQyxHQUFHO1lBQ1IsSUFBSSxDQUFDLEdBQUc7WUFDUixJQUFJLENBQUMsR0FBRztZQUNSLElBQUksQ0FBQyxHQUFHO1lBQ1IsSUFBSSxDQUFDLEdBQUc7WUFDUixJQUFJLENBQUMsR0FBRztZQUNSLElBQUksQ0FBQyxHQUFHO1lBRVIsSUFBSSxDQUFDLEtBQUs7WUFDVixJQUFJLENBQUMsS0FBSztZQUNWLElBQUksQ0FBQyxLQUFLO1lBQ1YsSUFBSSxDQUFDLEtBQUs7WUFDVixJQUFJLENBQUMsS0FBSztZQUNWLElBQUksQ0FBQyxLQUFLO1lBQ1YsSUFBSSxDQUFDLEtBQUs7WUFFVixJQUFJLENBQUMsS0FBSztZQUNWLElBQUksQ0FBQyxLQUFLO1lBQ1YsSUFBSSxDQUFDLEtBQUs7WUFDVixJQUFJLENBQUMsS0FBSztZQUNWLElBQUksQ0FBQyxLQUFLO1lBQ1YsSUFBSSxDQUFDLEtBQUs7WUFDVixJQUFJLENBQUMsS0FBSztZQUVWLElBQUksQ0FBQyxLQUFLO1lBQ1YsSUFBSSxDQUFDLEtBQUs7WUFDVixJQUFJLENBQUMsS0FBSztZQUNWLElBQUksQ0FBQyxLQUFLO1lBQ1YsSUFBSSxDQUFDLEtBQUs7WUFDVixJQUFJLENBQUMsS0FBSztZQUNWLElBQUksQ0FBQyxLQUFLO1lBRVYsSUFBSSxDQUFDLEtBQUs7WUFDVixJQUFJLENBQUMsS0FBSztZQUNWLElBQUksQ0FBQyxNQUFNO1lBQ1gsSUFBSSxDQUFDLE1BQU07WUFDWCxJQUFJLENBQUMsS0FBSztZQUNWLElBQUksQ0FBQyxLQUFLO1lBQ1YsSUFBSSxDQUFDLEtBQUs7WUFFVixJQUFJLENBQUMsS0FBSztZQUNWLElBQUksQ0FBQyxLQUFL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QUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUUsQ0FBQztJQUNMLENBQUM7SUFFTyxLQUFLLENBQUMsT0FBMEI7UUFFcEMsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFdkUsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDN0QsWUFBWSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBRWxDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1YsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUUsQ0FBQztJQUNMLENBQUM7SUFFTyxLQUFLLENBQUMsT0FBMEI7UUFFcEMsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFdkUsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDN0QsWUFBWSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBRWxDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzdELFlBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUVsQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFFLENBQUM7SUFDTCxDQUFDO0lBRU8sS0FBSyxDQUFDLE9BQTBCO1FBRXBDLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXZFLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxLQUFLLFlBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUVsRSxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUMvQyxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzdDLENBQUM7SUFDTCxDQUFDO0lBRU8sS0FBSyxDQUFDLE9BQTBCO1FBRXBDLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXZFLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxLQUFLLFlBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUVsRSxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUMvQyxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzdDLENBQUM7SUFDTCxDQUFDO0lBRU8sTUFBTSxDQUFDLE9BQTBCO1FBRXJDLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXZFLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxLQUFLLFlBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUVsRSxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUMvQyxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzdDLENBQUM7SUFDTCxDQUFDO0lBRU8sTUFBTSxDQUFDLE9BQTBCO1FBRXJDLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXZFLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxLQUFLLFlBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFD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SUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzdDLENBQUM7SUFDTCxDQUFDO0lBRU8sS0FBSyxDQUFDLE9BQTBCO1FBRXBDLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXZFLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxLQUFLLFlBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUVsRSxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUMvQyxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzdDLENBQUM7SUFDTCxDQUFDO0lBRU8sS0FBSyxDQUFDLE9BQTBCO1FBRXBDLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXZFLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxLQUFLLFlBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUVsRSxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUMvQyxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzdDLENBQUM7SUFDTCxDQUFDO0lBRU8sTUFBTSxDQUFDLE9BQTBCO1FBRXJDLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXZFLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxLQUFLLFlBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUVsRSxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUMvQyxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzdDLENBQUM7SUFDTCxDQUFDO0lBRU8sTUFBTSxDQUFDLE9BQTBCO1FBRXJDLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXZFLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxLQUFLLFlBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUVsRSxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUMvQyxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsQ0FBQyxDQUFD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QUFLLEtBQUs7Z0JBQ04sTUFBTSxDQUFDLDJFQUFVLENBQUMsR0FBRyxDQUFDO1lBQzFCLEtBQUssS0FBSztnQkFDTixNQUFNLENBQUMsMkVBQVUsQ0FBQyxHQUFHLENBQUM7WUFDMUIsS0FBSyxLQUFLO2dCQUNOLE1BQU0sQ0FBQywyRUFBVSxDQUFDLEdBQUcsQ0FBQztZQUMxQixLQUFLLEtBQUs7Z0JBQ04sTUFBTSxDQUFDLDJFQUFVLENBQUMsR0FBRyxDQUFDO1lBQzFCLEtBQUssS0FBSztnQkFDTixNQUFNLENBQUMsMkVBQVUsQ0FBQyxHQUFHLENBQUM7WUFDMUIsS0FBSyxLQUFLO2dCQUNOLE1BQU0sQ0FBQywyRUFBVSxDQUFDLEdBQUcsQ0FBQztZQUMxQixLQUFLLEtBQUs7Z0JBQ04sTUFBTSxDQUFDLDJFQUFVLENBQUMsR0FBRyxDQUFDO1lBQzFCLEtBQUssS0FBSztnQkFDTixNQUFNLENBQUMsMkVBQVUsQ0FBQyxHQUFHLENBQUM7WUFDMUIsS0FBSyxLQUFLO2dCQUNOLE1BQU0sQ0FBQywyRUFBVSxDQUFDLEdBQUcsQ0FBQztZQUMxQixLQUFLLEtBQUs7Z0JBQ04sTUFBTSxDQUFDLDJFQUFVLENBQUMsR0FBRyxDQUFDO1lBQzFCLEtBQUssS0FBSztnQkFDTixNQUFNLENBQUMsMkVBQVUsQ0FBQyxHQUFHLENBQUM7WUFDMUIsS0FBSyxLQUFLO2dCQUNOLE1BQU0sQ0FBQywyRUFBVSxDQUFDLEdBQUcsQ0FBQztZQUMxQixLQUFLLEtBQUs7Z0JBQ04sTUFBTSxDQUFDLDJFQUFVLENBQUMsR0FBRyxDQUFDO1lBQzFCLEtBQUssS0FBSztnQkFDTixNQUFNLENBQUMsMkVBQVUsQ0FBQyxHQUFHLENBQUM7WUFDMUIsS0FBSyxLQUFLO2dCQUNOLE1BQU0sQ0FBQywyRUFBVSxDQUFDLEdBQUcsQ0FBQztZQUMxQixLQUFLLEtBQUs7Z0JBQ04sTUFBTSxDQUFDLDJFQUFVLENBQUMsR0FBRyxDQUFDO1lBQzFCO2dCQUNJLE1BQU0sQ0FBQywyRUFBVSxDQUFDLEdBQUcsQ0FBQztRQUM5QixDQUFDO0lBQ0ws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LENBQUM7Q0FDSjtBQUFBO0FBQUEiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDgyMTZmNDBhOWNlYWRlOWIzMWNkIiwiXHJcbmV4cG9ydCBlbnVtIFRva2VuQ2F0ZWdvcnkge1xyXG4gICAgTGFiZWwsXHJcbiAgICBPcGNvZGUsXHJcbiAgICBQcmVwcm9jZXNzb3IsXHJcbiAgICBNb2RpZmllcixcclxuICAgIE1vZGUsXHJcbiAgICBOdW1iZXIsXHJcbiAgICBDb21tYSxcclxuICAgIE1hdGhzLFxyXG4gICAgRU9MLFxyXG4gICAgQ29tbWVudCxcclxuICAgIFVua25vd25cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUG9zaXRpb24ge1xyXG5cclxuICAgIGxpbmU6IG51bWJlcjtcclxuICAgIGNoYXI6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVG9rZW4ge1xyXG5cclxuICAgIHBvc2l0aW9uOiBJUG9zaXRpb247XHJcbiAgICBsZXhlbWU6IHN0cmluZztcclxuICAgIGNhdGVnb3J5OiBUb2tlbkNhdGVnb3J5O1xyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcGFyc2VyL2ludGVyZmFjZS9JVG9rZW4udHMiLCIvLyAgICAgVW5kZXJzY29yZS5qcyAxLjguM1xuLy8gICAgIGh0dHA6Ly91bmRlcnNjb3JlanMub3JnXG4vLyAgICAgKGMpIDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuLy8gICAgIFVuZGVyc2NvcmUgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG5cbihmdW5jdGlvbigpIHtcblxuICAvLyBCYXNlbGluZSBzZXR1cFxuICAvLyAtLS0tLS0tLS0tLS0tLVxuXG4gIC8vIEVzdGFibGlzaCB0aGUgcm9vdCBvYmplY3QsIGB3aW5kb3dgIGluIHRoZSBicm93c2VyLCBvciBgZXhwb3J0c2Agb24gdGhlIHNlcnZlci5cbiAgdmFyIHJvb3QgPSB0aGlzO1xuXG4gIC8vIFNhdmUgdGhlIHByZXZpb3VzIHZhbHVlIG9mIHRoZSBgX2AgdmFyaWFibGUuXG4gIHZhciBwcmV2aW91c1VuZGVyc2NvcmUgPSByb290Ll87XG5cbiAgLy8gU2F2ZSBieXRlcyBpbiB0aGUgbWluaWZpZWQgKGJ1dCBub3QgZ3ppcHBlZCkgdmVyc2lvbjpcbiAgdmFyIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGUsIE9ialByb3RvID0gT2JqZWN0LnByb3RvdHlwZSwgRnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuXG4gIC8vIENyZWF0ZSBxdWljayByZWZlcmVuY2UgdmFyaWFibGVzIGZvciBzcGVlZCBhY2Nlc3MgdG8gY29yZSBwcm90b3R5cGVzLlxuICB2YXJcbiAgICBwdXNoICAgICAgICAgICAgID0gQXJyYXlQcm90by5wdXNoLFxuICAgIHNsaWNlICAgICAgICAgICAgPSBBcnJheVByb3RvLnNsaWNlLFxuICAgIHRvU3RyaW5nICAgICAgICAgPSBPYmpQcm90by50b1N0cmluZyxcbiAgICBoYXNPd25Qcm9wZXJ0eSAgID0gT2JqUHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbiAgLy8gQWxsICoqRUNNQVNjcmlwdCA1KiogbmF0aXZlIGZ1bmN0aW9uIGltcGxlbWVudGF0aW9ucyB0aGF0IHdlIGhvcGUgdG8gdXNlXG4gIC8vIGFyZSBkZWNsYXJlZCBoZXJlLlxuICB2YXJcbiAgICBuYXRpdmVJc0FycmF5ICAgICAgPSBBcnJheS5pc0FycmF5LFxuICAgIG5hdGl2ZUtleXMgICAgICAgICA9IE9iamVjdC5rZXlzLFxuICAgIG5hdGl2ZUJpbmQgICAgICAgICA9IEZ1bmNQcm90by5iaW5kLFxuICAgIG5hdGl2ZUNyZWF0ZSAgICAgICA9IE9iamVjdC5jcmVhdGU7XG5cbiAgLy8gTmFrZWQgZnVuY3Rpb24gcmVmZXJlbmNlIGZvciBzdXJyb2dhdGUtcHJvdG90eXBlLXN3YXBwaW5nLlxuICB2YXIgQ3RvciA9IGZ1bmN0aW9uKCl7fTtcblxuICAvLyBDcmVhdGUgYSBzYWZlIHJlZmVyZW5jZSB0byB0aGUgVW5kZXJzY29yZSBvYmplY3QgZm9yIHVzZSBiZWxvdy5cbiAgdmFyIF8gPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgXykgcmV0dXJuIG9iajtcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgXykpIHJldHVybiBuZXcgXyhvYmopO1xuICAgIHRoaXMuX3dyYXBwZWQgPSBvYmo7XG4gIH07XG5cbiAgLy8gRXhwb3J0IHRoZSBVbmRlcnNjb3JlIG9iamVjdCBmb3IgKipOb2RlLmpzKiosIHdpdGhcbiAgLy8gYmFja3dhcmRzLWNvbXBhdGliaWxpdHkgZm9yIHRoZSBvbGQgYHJlcXVpcmUoKWAgQVBJLiBJZiB3ZSdyZSBpblxuICAvLyB0aGUgYnJvd3NlciwgYWRkIGBfYCBhcyBhIGdsb2JhbCBvYmplY3QuXG4gIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IF87XG4gICAgfVxuICAgIGV4cG9ydHMuXyA9IF87XG4gIH0gZWxzZSB7XG4gICAgcm9vdC5fID0gXztcbiAgfVxuXG4gIC8vIEN1cnJlbnQgdmVyc2lvbi5cbiAgXy5WRVJTSU9OID0gJzEuOC4zJztcblxuICAvLyBJbnRlcm5hbCBmdW5jdGlvbiB0aGF0IHJldHVybnMgYW4gZWZmaWNpZW50IChmb3IgY3VycmVudCBlbmdpbmVzKSB2ZXJzaW9uXG4gIC8vIG9mIHRoZSBwYXNzZWQtaW4gY2FsbGJhY2ssIHRvIGJlIHJlcGVhdGVkbHkgYXBwbGllZCBpbiBvdGhlciBVbmRlcnNjb3JlXG4gIC8vIGZ1bmN0aW9ucy5cbiAgdmFyIG9wdGltaXplQ2IgPSBmdW5jdGlvbihmdW5jLCBjb250ZXh0LCBhcmdDb3VudCkge1xuICAgIGlmIChjb250ZXh0ID09PSB2b2lkIDApIHJldHVybiBmdW5jO1xuICAgIHN3aXRjaCAoYXJnQ291bnQgPT0gbnVsbCA/IDMgOiBhcmdDb3VudCkge1xuICAgICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbChjb250ZXh0LCB2YWx1ZSk7XG4gICAgICB9O1xuICAgICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24odmFsdWUsIG90aGVyKSB7XG4gICAgICAgIHJldHVybiBmdW5jLmNhbGwoY29udGV4dCwgdmFsdWUsIG90aGVyKTtcbiAgICAgIH07XG4gICAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbChjb250ZXh0LCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xuICAgICAgfTtcbiAgICAgIGNhc2UgNDogcmV0dXJuIGZ1bmN0aW9uKGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbChjb250ZXh0LCBhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfTtcblxuICAvLyBBIG1vc3RseS1pbnRlcm5hbCBmdW5jdGlvbiB0byBnZW5lcmF0ZSBjYWxsYmFja3MgdGhhdCBjYW4gYmUgYXBwbGllZFxuICAvLyB0byBlYWNoIGVsZW1lbnQgaW4gYSBjb2xsZWN0aW9uLCByZXR1cm5pbmcgdGhlIGRlc2lyZWQgcmVzdWx0IOKAlCBlaXRoZXJcbiAgLy8gaWRlbnRpdHksIGFuIGFyYml0cmFyeSBjYWxsYmFjaywgYSBwcm9wZXJ0eSBtYXRjaGVyLCBvciBhIHByb3BlcnR5IGFjY2Vzc29yLlxuICB2YXIgY2IgPSBmdW5jdGlvbih2YWx1ZSwgY29udGV4dCwgYXJnQ291bnQpIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIF8uaWRlbnRpdHk7XG4gICAgaWYgKF8uaXNGdW5jdGlvbih2YWx1ZSkpIHJldHVybiBvcHRpbWl6ZUNiKHZhbHVlLCBjb250ZXh0LCBhcmdDb3VudCk7XG4gICAgaWYgKF8uaXNPYmplY3QodmFsdWUpKSByZXR1cm4gXy5tYXRjaGVyKHZhbHVlKTtcbiAgICByZXR1cm4gXy5wcm9wZXJ0eSh2YWx1ZSk7XG4gIH07XG4gIF8uaXRlcmF0ZWUgPSBmdW5jdGlvbih2YWx1ZSwgY29udGV4dCkge1xuICAgIHJldHVybiBjYih2YWx1ZSwgY29udGV4dCwgSW5maW5pdHkpO1xuICB9O1xuXG4gIC8vIEFuIGludGVybmFsIGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhc3NpZ25lciBmdW5jdGlvbnMuXG4gIHZhciBjcmVhdGVBc3NpZ25lciA9IGZ1bmN0aW9uKGtleXNGdW5jLCB1bmRlZmluZWRPbmx5KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKG9iaikge1xuICAgICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICBpZiAobGVuZ3RoIDwgMiB8fCBvYmogPT0gbnVsbCkgcmV0dXJuIG9iajtcbiAgICAgIGZvciAodmFyIGluZGV4ID0gMTsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpbmRleF0sXG4gICAgICAgICAgICBrZXlzID0ga2V5c0Z1bmMoc291cmNlKSxcbiAgICAgICAgICAgIGwgPSBrZXlzLmxlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICBpZiAoIXVuZGVmaW5lZE9ubHkgfHwgb2JqW2tleV0gPT09IHZvaWQgMCkgb2JqW2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG9iajtcbiAgICB9O1xuICB9O1xuXG4gIC8vIEFuIGludGVybmFsIGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhIG5ldyBvYmplY3QgdGhhdCBpbmhlcml0cyBmcm9tIGFub3RoZXIuXG4gIHZhciBiYXNlQ3JlYXRlID0gZnVuY3Rpb24ocHJvdG90eXBlKSB7XG4gICAgaWYgKCFfLmlzT2JqZWN0KHByb3RvdHlwZSkpIHJldHVybiB7fTtcbiAgICBpZiAobmF0aXZlQ3JlYXRlKSByZXR1cm4gbmF0aXZlQ3JlYXRlKHByb3RvdHlwZSk7XG4gICAgQ3Rvci5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBDdG9yO1xuICAgIEN0b3IucHJvdG90eXBlID0gbnVsbDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIHZhciBwcm9wZXJ0eSA9IGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT0gbnVsbCA/IHZvaWQgMCA6IG9ialtrZXldO1xuICAgIH07XG4gIH07XG5cbiAgLy8gSGVscGVyIGZvciBjb2xsZWN0aW9uIG1ldGhvZHMgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgYSBjb2xsZWN0aW9uXG4gIC8vIHNob3VsZCBiZSBpdGVyYXRlZCBhcyBhbiBhcnJheSBvciBhcyBhbiBvYmplY3RcbiAgLy8gUmVsYXRlZDogaHR0cDovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtdG9sZW5ndGhcbiAgLy8gQXZvaWRzIGEgdmVyeSBuYXN0eSBpT1MgOCBKSVQgYnVnIG9uIEFSTS02NC4gIzIwOTRcbiAgdmFyIE1BWF9BUlJBWV9JTkRFWCA9IE1hdGgucG93KDIsIDUzKSAtIDE7XG4gIHZhciBnZXRMZW5ndGggPSBwcm9wZXJ0eSgnbGVuZ3RoJyk7XG4gIHZhciBpc0FycmF5TGlrZSA9IGZ1bmN0aW9uKGNvbGxlY3Rpb24pIHtcbiAgICB2YXIgbGVuZ3RoID0gZ2V0TGVuZ3RoKGNvbGxlY3Rpb24pO1xuICAgIHJldHVybiB0eXBlb2YgbGVuZ3RoID09ICdudW1iZXInICYmIGxlbmd0aCA+PSAwICYmIGxlbmd0aCA8PSBNQVhfQVJSQVlfSU5ERVg7XG4gIH07XG5cbiAgLy8gQ29sbGVjdGlvbiBGdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvLyBUaGUgY29ybmVyc3RvbmUsIGFuIGBlYWNoYCBpbXBsZW1lbnRhdGlvbiwgYWthIGBmb3JFYWNoYC5cbiAgLy8gSGFuZGxlcyByYXcgb2JqZWN0cyBpbiBhZGRpdGlvbiB0byBhcnJheS1saWtlcy4gVHJlYXRzIGFsbFxuICAvLyBzcGFyc2UgYXJyYXktbGlrZXMgYXMgaWYgdGhleSB3ZXJlIGRlbnNlLlxuICBfLmVhY2ggPSBfLmZvckVhY2ggPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgaXRlcmF0ZWUgPSBvcHRpbWl6ZUNiKGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgICB2YXIgaSwgbGVuZ3RoO1xuICAgIGlmIChpc0FycmF5TGlrZShvYmopKSB7XG4gICAgICBmb3IgKGkgPSAwLCBsZW5ndGggPSBvYmoubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaXRlcmF0ZWUob2JqW2ldLCBpLCBvYmopO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIga2V5cyA9IF8ua2V5cyhvYmopO1xuICAgICAgZm9yIChpID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpdGVyYXRlZShvYmpba2V5c1tpXV0sIGtleXNbaV0sIG9iaik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgLy8gUmV0dXJuIHRoZSByZXN1bHRzIG9mIGFwcGx5aW5nIHRoZSBpdGVyYXRlZSB0byBlYWNoIGVsZW1lbnQuXG4gIF8ubWFwID0gXy5jb2xsZWN0ID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIGl0ZXJhdGVlID0gY2IoaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgIHZhciBrZXlzID0gIWlzQXJyYXlMaWtlKG9iaikgJiYgXy5rZXlzKG9iaiksXG4gICAgICAgIGxlbmd0aCA9IChrZXlzIHx8IG9iaikubGVuZ3RoLFxuICAgICAgICByZXN1bHRzID0gQXJyYXkobGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICB2YXIgY3VycmVudEtleSA9IGtleXMgPyBrZXlzW2luZGV4XSA6IGluZGV4O1xuICAgICAgcmVzdWx0c1tpbmRleF0gPSBpdGVyYXRlZShvYmpbY3VycmVudEtleV0sIGN1cnJlbnRLZXksIG9iaik7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9O1xuXG4gIC8vIENyZWF0ZSBhIHJlZHVjaW5nIGZ1bmN0aW9uIGl0ZXJhdGluZyBsZWZ0IG9yIHJpZ2h0LlxuICBmdW5jdGlvbiBjcmVhdGVSZWR1Y2UoZGlyKSB7XG4gICAgLy8gT3B0aW1pemVkIGl0ZXJhdG9yIGZ1bmN0aW9uIGFzIHVzaW5nIGFyZ3VtZW50cy5sZW5ndGhcbiAgICAvLyBpbiB0aGUgbWFpbiBmdW5jdGlvbiB3aWxsIGRlb3B0aW1pemUgdGhlLCBzZWUgIzE5OTEuXG4gICAgZnVuY3Rpb24gaXRlcmF0b3Iob2JqLCBpdGVyYXRlZSwgbWVtbywga2V5cywgaW5kZXgsIGxlbmd0aCkge1xuICAgICAgZm9yICg7IGluZGV4ID49IDAgJiYgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IGRpcikge1xuICAgICAgICB2YXIgY3VycmVudEtleSA9IGtleXMgPyBrZXlzW2luZGV4XSA6IGluZGV4O1xuICAgICAgICBtZW1vID0gaXRlcmF0ZWUobWVtbywgb2JqW2N1cnJlbnRLZXldLCBjdXJyZW50S2V5LCBvYmopO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1lbW87XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIG1lbW8sIGNvbnRleHQpIHtcbiAgICAgIGl0ZXJhdGVlID0gb3B0aW1pemVDYihpdGVyYXRlZSwgY29udGV4dCwgNCk7XG4gICAgICB2YXIga2V5cyA9ICFpc0FycmF5TGlrZShvYmopICYmIF8ua2V5cyhvYmopLFxuICAgICAgICAgIGxlbmd0aCA9IChrZXlzIHx8IG9iaikubGVuZ3RoLFxuICAgICAgICAgIGluZGV4ID0gZGlyID4gMCA/IDAgOiBsZW5ndGggLSAxO1xuICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBpbml0aWFsIHZhbHVlIGlmIG5vbmUgaXMgcHJvdmlkZWQuXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMpIHtcbiAgICAgICAgbWVtbyA9IG9ialtrZXlzID8ga2V5c1tpbmRleF0gOiBpbmRleF07XG4gICAgICAgIGluZGV4ICs9IGRpcjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpdGVyYXRvcihvYmosIGl0ZXJhdGVlLCBtZW1vLCBrZXlzLCBpbmRleCwgbGVuZ3RoKTtcbiAgICB9O1xuICB9XG5cbiAgLy8gKipSZWR1Y2UqKiBidWlsZHMgdXAgYSBzaW5nbGUgcmVzdWx0IGZyb20gYSBsaXN0IG9mIHZhbHVlcywgYWthIGBpbmplY3RgLFxuICAvLyBvciBgZm9sZGxgLlxuICBfLnJlZHVjZSA9IF8uZm9sZGwgPSBfLmluamVjdCA9IGNyZWF0ZVJlZHVjZSgxKTtcblxuICAvLyBUaGUgcmlnaHQtYXNzb2NpYXRpdmUgdmVyc2lvbiBvZiByZWR1Y2UsIGFsc28ga25vd24gYXMgYGZvbGRyYC5cbiAgXy5yZWR1Y2VSaWdodCA9IF8uZm9sZHIgPSBjcmVhdGVSZWR1Y2UoLTEpO1xuXG4gIC8vIFJldHVybiB0aGUgZmlyc3QgdmFsdWUgd2hpY2ggcGFzc2VzIGEgdHJ1dGggdGVzdC4gQWxpYXNlZCBhcyBgZGV0ZWN0YC5cbiAgXy5maW5kID0gXy5kZXRlY3QgPSBmdW5jdGlvbihvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBrZXk7XG4gICAgaWYgKGlzQXJyYXlMaWtlKG9iaikpIHtcbiAgICAgIGtleSA9IF8uZmluZEluZGV4KG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KTtcbiAgICB9IGVsc2Uge1xuICAgICAga2V5ID0gXy5maW5kS2V5KG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KTtcbiAgICB9XG4gICAgaWYgKGtleSAhPT0gdm9pZCAwICYmIGtleSAhPT0gLTEpIHJldHVybiBvYmpba2V5XTtcbiAgfTtcblxuICAvLyBSZXR1cm4gYWxsIHRoZSBlbGVtZW50cyB0aGF0IHBhc3MgYSB0cnV0aCB0ZXN0LlxuICAvLyBBbGlhc2VkIGFzIGBzZWxlY3RgLlxuICBfLmZpbHRlciA9IF8uc2VsZWN0ID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgIHByZWRpY2F0ZSA9IGNiKHByZWRpY2F0ZSwgY29udGV4dCk7XG4gICAgXy5lYWNoKG9iaiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBsaXN0KSB7XG4gICAgICBpZiAocHJlZGljYXRlKHZhbHVlLCBpbmRleCwgbGlzdCkpIHJlc3VsdHMucHVzaCh2YWx1ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH07XG5cbiAgLy8gUmV0dXJuIGFsbCB0aGUgZWxlbWVudHMgZm9yIHdoaWNoIGEgdHJ1dGggdGVzdCBmYWlscy5cbiAgXy5yZWplY3QgPSBmdW5jdGlvbihvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHJldHVybiBfLmZpbHRlcihvYmosIF8ubmVnYXRlKGNiKHByZWRpY2F0ZSkpLCBjb250ZXh0KTtcbiAgfTtcblxuICAvLyBEZXRlcm1pbmUgd2hldGhlciBhbGwgb2YgdGhlIGVsZW1lbnRzIG1hdGNoIGEgdHJ1dGggdGVzdC5cbiAgLy8gQWxpYXNlZCBhcyBgYWxsYC5cbiAgXy5ldmVyeSA9IF8uYWxsID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICBwcmVkaWNhdGUgPSBjYihwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIHZhciBrZXlzID0gIWlzQXJyYXlMaWtlKG9iaikgJiYgXy5rZXlzKG9iaiksXG4gICAgICAgIGxlbmd0aCA9IChrZXlzIHx8IG9iaikubGVuZ3RoO1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHZhciBjdXJyZW50S2V5ID0ga2V5cyA/IGtleXNbaW5kZXhdIDogaW5kZXg7XG4gICAgICBpZiAoIXByZWRpY2F0ZShvYmpbY3VycmVudEtleV0sIGN1cnJlbnRLZXksIG9iaikpIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgLy8gRGV0ZXJtaW5lIGlmIGF0IGxlYXN0IG9uZSBlbGVtZW50IGluIHRoZSBvYmplY3QgbWF0Y2hlcyBhIHRydXRoIHRlc3QuXG4gIC8vIEFsaWFzZWQgYXMgYGFueWAuXG4gIF8uc29tZSA9IF8uYW55ID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICBwcmVkaWNhdGUgPSBjYihwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIHZhciBrZXlzID0gIWlzQXJyYXlMaWtlKG9iaikgJiYgXy5rZXlzKG9iaiksXG4gICAgICAgIGxlbmd0aCA9IChrZXlzIHx8IG9iaikubGVuZ3RoO1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHZhciBjdXJyZW50S2V5ID0ga2V5cyA/IGtleXNbaW5kZXhdIDogaW5kZXg7XG4gICAgICBpZiAocHJlZGljYXRlKG9ialtjdXJyZW50S2V5XSwgY3VycmVudEtleSwgb2JqKSkgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICAvLyBEZXRlcm1pbmUgaWYgdGhlIGFycmF5IG9yIG9iamVjdCBjb250YWlucyBhIGdpdmVuIGl0ZW0gKHVzaW5nIGA9PT1gKS5cbiAgLy8gQWxpYXNlZCBhcyBgaW5jbHVkZXNgIGFuZCBgaW5jbHVkZWAuXG4gIF8uY29udGFpbnMgPSBfLmluY2x1ZGVzID0gXy5pbmNsdWRlID0gZnVuY3Rpb24ob2JqLCBpdGVtLCBmcm9tSW5kZXgsIGd1YXJkKSB7XG4gICAgaWYgKCFpc0FycmF5TGlrZShvYmopKSBvYmogPSBfLnZhbHVlcyhvYmopO1xuICAgIGlmICh0eXBlb2YgZnJvbUluZGV4ICE9ICdudW1iZXInIHx8IGd1YXJkKSBmcm9tSW5kZXggPSAwO1xuICAgIHJldHVybiBfLmluZGV4T2Yob2JqLCBpdGVtLCBmcm9tSW5kZXgpID49IDA7XG4gIH07XG5cbiAgLy8gSW52b2tlIGEgbWV0aG9kICh3aXRoIGFyZ3VtZW50cykgb24gZXZlcnkgaXRlbSBpbiBhIGNvbGxlY3Rpb24uXG4gIF8uaW52b2tlID0gZnVuY3Rpb24ob2JqLCBtZXRob2QpIHtcbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgICB2YXIgaXNGdW5jID0gXy5pc0Z1bmN0aW9uKG1ldGhvZCk7XG4gICAgcmV0dXJuIF8ubWFwKG9iaiwgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHZhciBmdW5jID0gaXNGdW5jID8gbWV0aG9kIDogdmFsdWVbbWV0aG9kXTtcbiAgICAgIHJldHVybiBmdW5jID09IG51bGwgPyBmdW5jIDogZnVuYy5hcHBseSh2YWx1ZSwgYXJncyk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gQ29udmVuaWVuY2UgdmVyc2lvbiBvZiBhIGNvbW1vbiB1c2UgY2FzZSBvZiBgbWFwYDogZmV0Y2hpbmcgYSBwcm9wZXJ0eS5cbiAgXy5wbHVjayA9IGZ1bmN0aW9uKG9iaiwga2V5KSB7XG4gICAgcmV0dXJuIF8ubWFwKG9iaiwgXy5wcm9wZXJ0eShrZXkpKTtcbiAgfTtcblxuICAvLyBDb252ZW5pZW5jZSB2ZXJzaW9uIG9mIGEgY29tbW9uIHVzZSBjYXNlIG9mIGBmaWx0ZXJgOiBzZWxlY3Rpbmcgb25seSBvYmplY3RzXG4gIC8vIGNvbnRhaW5pbmcgc3BlY2lmaWMgYGtleTp2YWx1ZWAgcGFpcnMuXG4gIF8ud2hlcmUgPSBmdW5jdGlvbihvYmosIGF0dHJzKSB7XG4gICAgcmV0dXJuIF8uZmlsdGVyKG9iaiwgXy5tYXRjaGVyKGF0dHJzKSk7XG4gIH07XG5cbiAgLy8gQ29udmVuaWVuY2UgdmVyc2lvbiBvZiBhIGNvbW1vbiB1c2UgY2FzZSBvZiBgZmluZGA6IGdldHRpbmcgdGhlIGZpcnN0IG9iamVjdFxuICAvLyBjb250YWluaW5nIHNwZWNpZmljIGBrZXk6dmFsdWVgIHBhaXJzLlxuICBfLmZpbmRXaGVyZSA9IGZ1bmN0aW9uKG9iaiwgYXR0cnMpIHtcbiAgICByZXR1cm4gXy5maW5kKG9iaiwgXy5tYXRjaGVyKGF0dHJzKSk7XG4gIH07XG5cbiAgLy8gUmV0dXJuIHRoZSBtYXhpbXVtIGVsZW1lbnQgKG9yIGVsZW1lbnQtYmFzZWQgY29tcHV0YXRpb24pLlxuICBfLm1heCA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICB2YXIgcmVzdWx0ID0gLUluZmluaXR5LCBsYXN0Q29tcHV0ZWQgPSAtSW5maW5pdHksXG4gICAgICAgIHZhbHVlLCBjb21wdXRlZDtcbiAgICBpZiAoaXRlcmF0ZWUgPT0gbnVsbCAmJiBvYmogIT0gbnVsbCkge1xuICAgICAgb2JqID0gaXNBcnJheUxpa2Uob2JqKSA/IG9iaiA6IF8udmFsdWVzKG9iaik7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gb2JqLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhbHVlID0gb2JqW2ldO1xuICAgICAgICBpZiAodmFsdWUgPiByZXN1bHQpIHtcbiAgICAgICAgICByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpdGVyYXRlZSA9IGNiKGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgICAgIF8uZWFjaChvYmosIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgbGlzdCkge1xuICAgICAgICBjb21wdXRlZCA9IGl0ZXJhdGVlKHZhbHVlLCBpbmRleCwgbGlzdCk7XG4gICAgICAgIGlmIChjb21wdXRlZCA+IGxhc3RDb21wdXRlZCB8fCBjb21wdXRlZCA9PT0gLUluZmluaXR5ICYmIHJlc3VsdCA9PT0gLUluZmluaXR5KSB7XG4gICAgICAgICAgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgICAgbGFzdENvbXB1dGVkID0gY29tcHV0ZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIFJldHVybiB0aGUgbWluaW11bSBlbGVtZW50IChvciBlbGVtZW50LWJhc2VkIGNvbXB1dGF0aW9uKS5cbiAgXy5taW4gPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgdmFyIHJlc3VsdCA9IEluZmluaXR5LCBsYXN0Q29tcHV0ZWQgPSBJbmZpbml0eSxcbiAgICAgICAgdmFsdWUsIGNvbXB1dGVkO1xuICAgIGlmIChpdGVyYXRlZSA9PSBudWxsICYmIG9iaiAhPSBudWxsKSB7XG4gICAgICBvYmogPSBpc0FycmF5TGlrZShvYmopID8gb2JqIDogXy52YWx1ZXMob2JqKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBvYmoubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFsdWUgPSBvYmpbaV07XG4gICAgICAgIGlmICh2YWx1ZSA8IHJlc3VsdCkge1xuICAgICAgICAgIHJlc3VsdCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGl0ZXJhdGVlID0gY2IoaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgICAgXy5lYWNoKG9iaiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBsaXN0KSB7XG4gICAgICAgIGNvbXB1dGVkID0gaXRlcmF0ZWUodmFsdWUsIGluZGV4LCBsaXN0KTtcbiAgICAgICAgaWYgKGNvbXB1dGVkIDwgbGFzdENvbXB1dGVkIHx8IGNvbXB1dGVkID09PSBJbmZpbml0eSAmJiByZXN1bHQgPT09IEluZmluaXR5KSB7XG4gICAgICAgICAgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgICAgbGFzdENvbXB1dGVkID0gY29tcHV0ZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIFNodWZmbGUgYSBjb2xsZWN0aW9uLCB1c2luZyB0aGUgbW9kZXJuIHZlcnNpb24gb2YgdGhlXG4gIC8vIFtGaXNoZXItWWF0ZXMgc2h1ZmZsZV0oaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9GaXNoZXLigJNZYXRlc19zaHVmZmxlKS5cbiAgXy5zaHVmZmxlID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIHNldCA9IGlzQXJyYXlMaWtlKG9iaikgPyBvYmogOiBfLnZhbHVlcyhvYmopO1xuICAgIHZhciBsZW5ndGggPSBzZXQubGVuZ3RoO1xuICAgIHZhciBzaHVmZmxlZCA9IEFycmF5KGxlbmd0aCk7XG4gICAgZm9yICh2YXIgaW5kZXggPSAwLCByYW5kOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgcmFuZCA9IF8ucmFuZG9tKDAsIGluZGV4KTtcbiAgICAgIGlmIChyYW5kICE9PSBpbmRleCkgc2h1ZmZsZWRbaW5kZXhdID0gc2h1ZmZsZWRbcmFuZF07XG4gICAgICBzaHVmZmxlZFtyYW5kXSA9IHNldFtpbmRleF07XG4gICAgfVxuICAgIHJldHVybiBzaHVmZmxlZDtcbiAgfTtcblxuICAvLyBTYW1wbGUgKipuKiogcmFuZG9tIHZhbHVlcyBmcm9tIGEgY29sbGVjdGlvbi5cbiAgLy8gSWYgKipuKiogaXMgbm90IHNwZWNpZmllZCwgcmV0dXJucyBhIHNpbmdsZSByYW5kb20gZWxlbWVudC5cbiAgLy8gVGhlIGludGVybmFsIGBndWFyZGAgYXJndW1lbnQgYWxsb3dzIGl0IHRvIHdvcmsgd2l0aCBgbWFwYC5cbiAgXy5zYW1wbGUgPSBmdW5jdGlvbihvYmosIG4sIGd1YXJkKSB7XG4gICAgaWYgKG4gPT0gbnVsbCB8fCBndWFyZCkge1xuICAgICAgaWYgKCFpc0FycmF5TGlrZShvYmopKSBvYmogPSBfLnZhbHVlcyhvYmopO1xuICAgICAgcmV0dXJuIG9ialtfLnJhbmRvbShvYmoubGVuZ3RoIC0gMSldO1xuICAgIH1cbiAgICByZXR1cm4gXy5zaHVmZmxlKG9iaikuc2xpY2UoMCwgTWF0aC5tYXgoMCwgbikpO1xuICB9O1xuXG4gIC8vIFNvcnQgdGhlIG9iamVjdCdzIHZhbHVlcyBieSBhIGNyaXRlcmlvbiBwcm9kdWNlZCBieSBhbiBpdGVyYXRlZS5cbiAgXy5zb3J0QnkgPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgaXRlcmF0ZWUgPSBjYihpdGVyYXRlZSwgY29udGV4dCk7XG4gICAgcmV0dXJuIF8ucGx1Y2soXy5tYXAob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGxpc3QpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICBjcml0ZXJpYTogaXRlcmF0ZWUodmFsdWUsIGluZGV4LCBsaXN0KVxuICAgICAgfTtcbiAgICB9KS5zb3J0KGZ1bmN0aW9uKGxlZnQsIHJpZ2h0KSB7XG4gICAgICB2YXIgYSA9IGxlZnQuY3JpdGVyaWE7XG4gICAgICB2YXIgYiA9IHJpZ2h0LmNyaXRlcmlhO1xuICAgICAgaWYgKGEgIT09IGIpIHtcbiAgICAgICAgaWYgKGEgPiBiIHx8IGEgPT09IHZvaWQgMCkgcmV0dXJuIDE7XG4gICAgICAgIGlmIChhIDwgYiB8fCBiID09PSB2b2lkIDApIHJldHVybiAtMTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBsZWZ0LmluZGV4IC0gcmlnaHQuaW5kZXg7XG4gICAgfSksICd2YWx1ZScpO1xuICB9O1xuXG4gIC8vIEFuIGludGVybmFsIGZ1bmN0aW9uIHVzZWQgZm9yIGFnZ3JlZ2F0ZSBcImdyb3VwIGJ5XCIgb3BlcmF0aW9ucy5cbiAgdmFyIGdyb3VwID0gZnVuY3Rpb24oYmVoYXZpb3IpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgICAgaXRlcmF0ZWUgPSBjYihpdGVyYXRlZSwgY29udGV4dCk7XG4gICAgICBfLmVhY2gob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgpIHtcbiAgICAgICAgdmFyIGtleSA9IGl0ZXJhdGVlKHZhbHVlLCBpbmRleCwgb2JqKTtcbiAgICAgICAgYmVoYXZpb3IocmVzdWx0LCB2YWx1ZSwga2V5KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICB9O1xuXG4gIC8vIEdyb3VwcyB0aGUgb2JqZWN0J3MgdmFsdWVzIGJ5IGEgY3JpdGVyaW9uLiBQYXNzIGVpdGhlciBhIHN0cmluZyBhdHRyaWJ1dGVcbiAgLy8gdG8gZ3JvdXAgYnksIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBjcml0ZXJpb24uXG4gIF8uZ3JvdXBCeSA9IGdyb3VwKGZ1bmN0aW9uKHJlc3VsdCwgdmFsdWUsIGtleSkge1xuICAgIGlmIChfLmhhcyhyZXN1bHQsIGtleSkpIHJlc3VsdFtrZXldLnB1c2godmFsdWUpOyBlbHNlIHJlc3VsdFtrZXldID0gW3ZhbHVlXTtcbiAgfSk7XG5cbiAgLy8gSW5kZXhlcyB0aGUgb2JqZWN0J3MgdmFsdWVzIGJ5IGEgY3JpdGVyaW9uLCBzaW1pbGFyIHRvIGBncm91cEJ5YCwgYnV0IGZvclxuICAvLyB3aGVuIHlvdSBrbm93IHRoYXQgeW91ciBpbmRleCB2YWx1ZXMgd2lsbCBiZSB1bmlxdWUuXG4gIF8uaW5kZXhCeSA9IGdyb3VwKGZ1bmN0aW9uKHJlc3VsdCwgdmFsdWUsIGtleSkge1xuICAgIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gIH0pO1xuXG4gIC8vIENvdW50cyBpbnN0YW5jZXMgb2YgYW4gb2JqZWN0IHRoYXQgZ3JvdXAgYnkgYSBjZXJ0YWluIGNyaXRlcmlvbi4gUGFzc1xuICAvLyBlaXRoZXIgYSBzdHJpbmcgYXR0cmlidXRlIHRvIGNvdW50IGJ5LCBvciBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGVcbiAgLy8gY3JpdGVyaW9uLlxuICBfLmNvdW50QnkgPSBncm91cChmdW5jdGlvbihyZXN1bHQsIHZhbHVlLCBrZXkpIHtcbiAgICBpZiAoXy5oYXMocmVzdWx0LCBrZXkpKSByZXN1bHRba2V5XSsrOyBlbHNlIHJlc3VsdFtrZXldID0gMTtcbiAgfSk7XG5cbiAgLy8gU2FmZWx5IGNyZWF0ZSBhIHJlYWwsIGxpdmUgYXJyYXkgZnJvbSBhbnl0aGluZyBpdGVyYWJsZS5cbiAgXy50b0FycmF5ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKCFvYmopIHJldHVybiBbXTtcbiAgICBpZiAoXy5pc0FycmF5KG9iaikpIHJldHVybiBzbGljZS5jYWxsKG9iaik7XG4gICAgaWYgKGlzQXJyYXlMaWtlKG9iaikpIHJldHVybiBfLm1hcChvYmosIF8uaWRlbnRpdHkpO1xuICAgIHJldHVybiBfLnZhbHVlcyhvYmopO1xuICB9O1xuXG4gIC8vIFJldHVybiB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIGFuIG9iamVjdC5cbiAgXy5zaXplID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gMDtcbiAgICByZXR1cm4gaXNBcnJheUxpa2Uob2JqKSA/IG9iai5sZW5ndGggOiBfLmtleXMob2JqKS5sZW5ndGg7XG4gIH07XG5cbiAgLy8gU3BsaXQgYSBjb2xsZWN0aW9uIGludG8gdHdvIGFycmF5czogb25lIHdob3NlIGVsZW1lbnRzIGFsbCBzYXRpc2Z5IHRoZSBnaXZlblxuICAvLyBwcmVkaWNhdGUsIGFuZCBvbmUgd2hvc2UgZWxlbWVudHMgYWxsIGRvIG5vdCBzYXRpc2Z5IHRoZSBwcmVkaWNhdGUuXG4gIF8ucGFydGl0aW9uID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICBwcmVkaWNhdGUgPSBjYihwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIHZhciBwYXNzID0gW10sIGZhaWwgPSBbXTtcbiAgICBfLmVhY2gob2JqLCBmdW5jdGlvbih2YWx1ZSwga2V5LCBvYmopIHtcbiAgICAgIChwcmVkaWNhdGUodmFsdWUsIGtleSwgb2JqKSA/IHBhc3MgOiBmYWlsKS5wdXNoKHZhbHVlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW3Bhc3MsIGZhaWxdO1xuICB9O1xuXG4gIC8vIEFycmF5IEZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS1cblxuICAvLyBHZXQgdGhlIGZpcnN0IGVsZW1lbnQgb2YgYW4gYXJyYXkuIFBhc3NpbmcgKipuKiogd2lsbCByZXR1cm4gdGhlIGZpcnN0IE5cbiAgLy8gdmFsdWVzIGluIHRoZSBhcnJheS4gQWxpYXNlZCBhcyBgaGVhZGAgYW5kIGB0YWtlYC4gVGhlICoqZ3VhcmQqKiBjaGVja1xuICAvLyBhbGxvd3MgaXQgdG8gd29yayB3aXRoIGBfLm1hcGAuXG4gIF8uZmlyc3QgPSBfLmhlYWQgPSBfLnRha2UgPSBmdW5jdGlvbihhcnJheSwgbiwgZ3VhcmQpIHtcbiAgICBpZiAoYXJyYXkgPT0gbnVsbCkgcmV0dXJuIHZvaWQgMDtcbiAgICBpZiAobiA9PSBudWxsIHx8IGd1YXJkKSByZXR1cm4gYXJyYXlbMF07XG4gICAgcmV0dXJuIF8uaW5pdGlhbChhcnJheSwgYXJyYXkubGVuZ3RoIC0gbik7XG4gIH07XG5cbiAgLy8gUmV0dXJucyBldmVyeXRoaW5nIGJ1dCB0aGUgbGFzdCBlbnRyeSBvZiB0aGUgYXJyYXkuIEVzcGVjaWFsbHkgdXNlZnVsIG9uXG4gIC8vIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBQYXNzaW5nICoqbioqIHdpbGwgcmV0dXJuIGFsbCB0aGUgdmFsdWVzIGluXG4gIC8vIHRoZSBhcnJheSwgZXhjbHVkaW5nIHRoZSBsYXN0IE4uXG4gIF8uaW5pdGlhbCA9IGZ1bmN0aW9uKGFycmF5LCBuLCBndWFyZCkge1xuICAgIHJldHVybiBzbGljZS5jYWxsKGFycmF5LCAwLCBNYXRoLm1heCgwLCBhcnJheS5sZW5ndGggLSAobiA9PSBudWxsIHx8IGd1YXJkID8gMSA6IG4pKSk7XG4gIH07XG5cbiAgLy8gR2V0IHRoZSBsYXN0IGVsZW1lbnQgb2YgYW4gYXJyYXkuIFBhc3NpbmcgKipuKiogd2lsbCByZXR1cm4gdGhlIGxhc3QgTlxuICAvLyB2YWx1ZXMgaW4gdGhlIGFycmF5LlxuICBfLmxhc3QgPSBmdW5jdGlvbihhcnJheSwgbiwgZ3VhcmQpIHtcbiAgICBpZiAoYXJyYXkgPT0gbnVsbCkgcmV0dXJuIHZvaWQgMDtcbiAgICBpZiAobiA9PSBudWxsIHx8IGd1YXJkKSByZXR1cm4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV07XG4gICAgcmV0dXJuIF8ucmVzdChhcnJheSwgTWF0aC5tYXgoMCwgYXJyYXkubGVuZ3RoIC0gbikpO1xuICB9O1xuXG4gIC8vIFJldHVybnMgZXZlcnl0aGluZyBidXQgdGhlIGZpcnN0IGVudHJ5IG9mIHRoZSBhcnJheS4gQWxpYXNlZCBhcyBgdGFpbGAgYW5kIGBkcm9wYC5cbiAgLy8gRXNwZWNpYWxseSB1c2VmdWwgb24gdGhlIGFyZ3VtZW50cyBvYmplY3QuIFBhc3NpbmcgYW4gKipuKiogd2lsbCByZXR1cm5cbiAgLy8gdGhlIHJlc3QgTiB2YWx1ZXMgaW4gdGhlIGFycmF5LlxuICBfLnJlc3QgPSBfLnRhaWwgPSBfLmRyb3AgPSBmdW5jdGlvbihhcnJheSwgbiwgZ3VhcmQpIHtcbiAgICByZXR1cm4gc2xpY2UuY2FsbChhcnJheSwgbiA9PSBudWxsIHx8IGd1YXJkID8gMSA6IG4pO1xuICB9O1xuXG4gIC8vIFRyaW0gb3V0IGFsbCBmYWxzeSB2YWx1ZXMgZnJvbSBhbiBhcnJheS5cbiAgXy5jb21wYWN0ID0gZnVuY3Rpb24oYXJyYXkpIHtcbiAgICByZXR1cm4gXy5maWx0ZXIoYXJyYXksIF8uaWRlbnRpdHkpO1xuICB9O1xuXG4gIC8vIEludGVybmFsIGltcGxlbWVudGF0aW9uIG9mIGEgcmVjdXJzaXZlIGBmbGF0dGVuYCBmdW5jdGlvbi5cbiAgdmFyIGZsYXR0ZW4gPSBmdW5jdGlvbihpbnB1dCwgc2hhbGxvdywgc3RyaWN0LCBzdGFydEluZGV4KSB7XG4gICAgdmFyIG91dHB1dCA9IFtdLCBpZHggPSAwO1xuICAgIGZvciAodmFyIGkgPSBzdGFydEluZGV4IHx8IDAsIGxlbmd0aCA9IGdldExlbmd0aChpbnB1dCk7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHZhbHVlID0gaW5wdXRbaV07XG4gICAgICBpZiAoaXNBcnJheUxpa2UodmFsdWUpICYmIChfLmlzQXJyYXkodmFsdWUpIHx8IF8uaXNBcmd1bWVudHModmFsdWUpKSkge1xuICAgICAgICAvL2ZsYXR0ZW4gY3VycmVudCBsZXZlbCBvZiBhcnJheSBvciBhcmd1bWVudHMgb2JqZWN0XG4gICAgICAgIGlmICghc2hhbGxvdykgdmFsdWUgPSBmbGF0dGVuKHZhbHVlLCBzaGFsbG93LCBzdHJpY3QpO1xuICAgICAgICB2YXIgaiA9IDAsIGxlbiA9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgb3V0cHV0Lmxlbmd0aCArPSBsZW47XG4gICAgICAgIHdoaWxlIChqIDwgbGVuKSB7XG4gICAgICAgICAgb3V0cHV0W2lkeCsrXSA9IHZhbHVlW2orK107XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoIXN0cmljdCkge1xuICAgICAgICBvdXRwdXRbaWR4KytdID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH07XG5cbiAgLy8gRmxhdHRlbiBvdXQgYW4gYXJyYXksIGVpdGhlciByZWN1cnNpdmVseSAoYnkgZGVmYXVsdCksIG9yIGp1c3Qgb25lIGxldmVsLlxuICBfLmZsYXR0ZW4gPSBmdW5jdGlvbihhcnJheSwgc2hhbGxvdykge1xuICAgIHJldHVybiBmbGF0dGVuKGFycmF5LCBzaGFsbG93LCBmYWxzZSk7XG4gIH07XG5cbiAgLy8gUmV0dXJuIGEgdmVyc2lvbiBvZiB0aGUgYXJyYXkgdGhhdCBkb2VzIG5vdCBjb250YWluIHRoZSBzcGVjaWZpZWQgdmFsdWUocykuXG4gIF8ud2l0aG91dCA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgcmV0dXJuIF8uZGlmZmVyZW5jZShhcnJheSwgc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgfTtcblxuICAvLyBQcm9kdWNlIGEgZHVwbGljYXRlLWZyZWUgdmVyc2lvbiBvZiB0aGUgYXJyYXkuIElmIHRoZSBhcnJheSBoYXMgYWxyZWFkeVxuICAvLyBiZWVuIHNvcnRlZCwgeW91IGhhdmUgdGhlIG9wdGlvbiBvZiB1c2luZyBhIGZhc3RlciBhbGdvcml0aG0uXG4gIC8vIEFsaWFzZWQgYXMgYHVuaXF1ZWAuXG4gIF8udW5pcSA9IF8udW5pcXVlID0gZnVuY3Rpb24oYXJyYXksIGlzU29ydGVkLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIGlmICghXy5pc0Jvb2xlYW4oaXNTb3J0ZWQpKSB7XG4gICAgICBjb250ZXh0ID0gaXRlcmF0ZWU7XG4gICAgICBpdGVyYXRlZSA9IGlzU29ydGVkO1xuICAgICAgaXNTb3J0ZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGl0ZXJhdGVlICE9IG51bGwpIGl0ZXJhdGVlID0gY2IoaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB2YXIgc2VlbiA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBnZXRMZW5ndGgoYXJyYXkpOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciB2YWx1ZSA9IGFycmF5W2ldLFxuICAgICAgICAgIGNvbXB1dGVkID0gaXRlcmF0ZWUgPyBpdGVyYXRlZSh2YWx1ZSwgaSwgYXJyYXkpIDogdmFsdWU7XG4gICAgICBpZiAoaXNTb3J0ZWQpIHtcbiAgICAgICAgaWYgKCFpIHx8IHNlZW4gIT09IGNvbXB1dGVkKSByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgICAgIHNlZW4gPSBjb21wdXRlZDtcbiAgICAgIH0gZWxzZSBpZiAoaXRlcmF0ZWUpIHtcbiAgICAgICAgaWYgKCFfLmNvbnRhaW5zKHNlZW4sIGNvbXB1dGVkKSkge1xuICAgICAgICAgIHNlZW4ucHVzaChjb21wdXRlZCk7XG4gICAgICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKCFfLmNvbnRhaW5zKHJlc3VsdCwgdmFsdWUpKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBQcm9kdWNlIGFuIGFycmF5IHRoYXQgY29udGFpbnMgdGhlIHVuaW9uOiBlYWNoIGRpc3RpbmN0IGVsZW1lbnQgZnJvbSBhbGwgb2ZcbiAgLy8gdGhlIHBhc3NlZC1pbiBhcnJheXMuXG4gIF8udW5pb24gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXy51bmlxKGZsYXR0ZW4oYXJndW1lbnRzLCB0cnVlLCB0cnVlKSk7XG4gIH07XG5cbiAgLy8gUHJvZHVjZSBhbiBhcnJheSB0aGF0IGNvbnRhaW5zIGV2ZXJ5IGl0ZW0gc2hhcmVkIGJldHdlZW4gYWxsIHRoZVxuICAvLyBwYXNzZWQtaW4gYXJyYXlzLlxuICBfLmludGVyc2VjdGlvbiA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHZhciBhcmdzTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gZ2V0TGVuZ3RoKGFycmF5KTsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IGFycmF5W2ldO1xuICAgICAgaWYgKF8uY29udGFpbnMocmVzdWx0LCBpdGVtKSkgY29udGludWU7XG4gICAgICBmb3IgKHZhciBqID0gMTsgaiA8IGFyZ3NMZW5ndGg7IGorKykge1xuICAgICAgICBpZiAoIV8uY29udGFpbnMoYXJndW1lbnRzW2pdLCBpdGVtKSkgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoaiA9PT0gYXJnc0xlbmd0aCkgcmVzdWx0LnB1c2goaXRlbSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gVGFrZSB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIG9uZSBhcnJheSBhbmQgYSBudW1iZXIgb2Ygb3RoZXIgYXJyYXlzLlxuICAvLyBPbmx5IHRoZSBlbGVtZW50cyBwcmVzZW50IGluIGp1c3QgdGhlIGZpcnN0IGFycmF5IHdpbGwgcmVtYWluLlxuICBfLmRpZmZlcmVuY2UgPSBmdW5jdGlvbihhcnJheSkge1xuICAgIHZhciByZXN0ID0gZmxhdHRlbihhcmd1bWVudHMsIHRydWUsIHRydWUsIDEpO1xuICAgIHJldHVybiBfLmZpbHRlcihhcnJheSwgZnVuY3Rpb24odmFsdWUpe1xuICAgICAgcmV0dXJuICFfLmNvbnRhaW5zKHJlc3QsIHZhbHVlKTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBaaXAgdG9nZXRoZXIgbXVsdGlwbGUgbGlzdHMgaW50byBhIHNpbmdsZSBhcnJheSAtLSBlbGVtZW50cyB0aGF0IHNoYXJlXG4gIC8vIGFuIGluZGV4IGdvIHRvZ2V0aGVyLlxuICBfLnppcCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBfLnVuemlwKGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgLy8gQ29tcGxlbWVudCBvZiBfLnppcC4gVW56aXAgYWNjZXB0cyBhbiBhcnJheSBvZiBhcnJheXMgYW5kIGdyb3Vwc1xuICAvLyBlYWNoIGFycmF5J3MgZWxlbWVudHMgb24gc2hhcmVkIGluZGljZXNcbiAgXy51bnppcCA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgdmFyIGxlbmd0aCA9IGFycmF5ICYmIF8ubWF4KGFycmF5LCBnZXRMZW5ndGgpLmxlbmd0aCB8fCAwO1xuICAgIHZhciByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgcmVzdWx0W2luZGV4XSA9IF8ucGx1Y2soYXJyYXksIGluZGV4KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBDb252ZXJ0cyBsaXN0cyBpbnRvIG9iamVjdHMuIFBhc3MgZWl0aGVyIGEgc2luZ2xlIGFycmF5IG9mIGBba2V5LCB2YWx1ZV1gXG4gIC8vIHBhaXJzLCBvciB0d28gcGFyYWxsZWwgYXJyYXlzIG9mIHRoZSBzYW1lIGxlbmd0aCAtLSBvbmUgb2Yga2V5cywgYW5kIG9uZSBvZlxuICAvLyB0aGUgY29ycmVzcG9uZGluZyB2YWx1ZXMuXG4gIF8ub2JqZWN0ID0gZnVuY3Rpb24obGlzdCwgdmFsdWVzKSB7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBnZXRMZW5ndGgobGlzdCk7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHZhbHVlcykge1xuICAgICAgICByZXN1bHRbbGlzdFtpXV0gPSB2YWx1ZXNbaV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHRbbGlzdFtpXVswXV0gPSBsaXN0W2ldWzFdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIEdlbmVyYXRvciBmdW5jdGlvbiB0byBjcmVhdGUgdGhlIGZpbmRJbmRleCBhbmQgZmluZExhc3RJbmRleCBmdW5jdGlvbnNcbiAgZnVuY3Rpb24gY3JlYXRlUHJlZGljYXRlSW5kZXhGaW5kZXIoZGlyKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGFycmF5LCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICAgIHByZWRpY2F0ZSA9IGNiKHByZWRpY2F0ZSwgY29udGV4dCk7XG4gICAgICB2YXIgbGVuZ3RoID0gZ2V0TGVuZ3RoKGFycmF5KTtcbiAgICAgIHZhciBpbmRleCA9IGRpciA+IDAgPyAwIDogbGVuZ3RoIC0gMTtcbiAgICAgIGZvciAoOyBpbmRleCA+PSAwICYmIGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSBkaXIpIHtcbiAgICAgICAgaWYgKHByZWRpY2F0ZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkpIHJldHVybiBpbmRleDtcbiAgICAgIH1cbiAgICAgIHJldHVybiAtMTtcbiAgICB9O1xuICB9XG5cbiAgLy8gUmV0dXJucyB0aGUgZmlyc3QgaW5kZXggb24gYW4gYXJyYXktbGlrZSB0aGF0IHBhc3NlcyBhIHByZWRpY2F0ZSB0ZXN0XG4gIF8uZmluZEluZGV4ID0gY3JlYXRlUHJlZGljYXRlSW5kZXhGaW5kZXIoMSk7XG4gIF8uZmluZExhc3RJbmRleCA9IGNyZWF0ZVByZWRpY2F0ZUluZGV4RmluZGVyKC0xKTtcblxuICAvLyBVc2UgYSBjb21wYXJhdG9yIGZ1bmN0aW9uIHRvIGZpZ3VyZSBvdXQgdGhlIHNtYWxsZXN0IGluZGV4IGF0IHdoaWNoXG4gIC8vIGFuIG9iamVjdCBzaG91bGQgYmUgaW5zZXJ0ZWQgc28gYXMgdG8gbWFpbnRhaW4gb3JkZXIuIFVzZXMgYmluYXJ5IHNlYXJjaC5cbiAgXy5zb3J0ZWRJbmRleCA9IGZ1bmN0aW9uKGFycmF5LCBvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgaXRlcmF0ZWUgPSBjYihpdGVyYXRlZSwgY29udGV4dCwgMSk7XG4gICAgdmFyIHZhbHVlID0gaXRlcmF0ZWUob2JqKTtcbiAgICB2YXIgbG93ID0gMCwgaGlnaCA9IGdldExlbmd0aChhcnJheSk7XG4gICAgd2hpbGUgKGxvdyA8IGhpZ2gpIHtcbiAgICAgIHZhciBtaWQgPSBNYXRoLmZsb29yKChsb3cgKyBoaWdoKSAvIDIpO1xuICAgICAgaWYgKGl0ZXJhdGVlKGFycmF5W21pZF0pIDwgdmFsdWUpIGxvdyA9IG1pZCArIDE7IGVsc2UgaGlnaCA9IG1pZDtcbiAgICB9XG4gICAgcmV0dXJuIGxvdztcbiAgfTtcblxuICAvLyBHZW5lcmF0b3IgZnVuY3Rpb24gdG8gY3JlYXRlIHRoZSBpbmRleE9mIGFuZCBsYXN0SW5kZXhPZiBmdW5jdGlvbnNcbiAgZnVuY3Rpb24gY3JlYXRlSW5kZXhGaW5kZXIoZGlyLCBwcmVkaWNhdGVGaW5kLCBzb3J0ZWRJbmRleCkge1xuICAgIHJldHVybiBmdW5jdGlvbihhcnJheSwgaXRlbSwgaWR4KSB7XG4gICAgICB2YXIgaSA9IDAsIGxlbmd0aCA9IGdldExlbmd0aChhcnJheSk7XG4gICAgICBpZiAodHlwZW9mIGlkeCA9PSAnbnVtYmVyJykge1xuICAgICAgICBpZiAoZGlyID4gMCkge1xuICAgICAgICAgICAgaSA9IGlkeCA+PSAwID8gaWR4IDogTWF0aC5tYXgoaWR4ICsgbGVuZ3RoLCBpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxlbmd0aCA9IGlkeCA+PSAwID8gTWF0aC5taW4oaWR4ICsgMSwgbGVuZ3RoKSA6IGlkeCArIGxlbmd0aCArIDE7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc29ydGVkSW5kZXggJiYgaWR4ICYmIGxlbmd0aCkge1xuICAgICAgICBpZHggPSBzb3J0ZWRJbmRleChhcnJheSwgaXRlbSk7XG4gICAgICAgIHJldHVybiBhcnJheVtpZHhdID09PSBpdGVtID8gaWR4IDogLTE7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbSAhPT0gaXRlbSkge1xuICAgICAgICBpZHggPSBwcmVkaWNhdGVGaW5kKHNsaWNlLmNhbGwoYXJyYXksIGksIGxlbmd0aCksIF8uaXNOYU4pO1xuICAgICAgICByZXR1cm4gaWR4ID49IDAgPyBpZHggKyBpIDogLTE7XG4gICAgICB9XG4gICAgICBmb3IgKGlkeCA9IGRpciA+IDAgPyBpIDogbGVuZ3RoIC0gMTsgaWR4ID49IDAgJiYgaWR4IDwgbGVuZ3RoOyBpZHggKz0gZGlyKSB7XG4gICAgICAgIGlmIChhcnJheVtpZHhdID09PSBpdGVtKSByZXR1cm4gaWR4O1xuICAgICAgfVxuICAgICAgcmV0dXJuIC0xO1xuICAgIH07XG4gIH1cblxuICAvLyBSZXR1cm4gdGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIGFuIGl0ZW0gaW4gYW4gYXJyYXksXG4gIC8vIG9yIC0xIGlmIHRoZSBpdGVtIGlzIG5vdCBpbmNsdWRlZCBpbiB0aGUgYXJyYXkuXG4gIC8vIElmIHRoZSBhcnJheSBpcyBsYXJnZSBhbmQgYWxyZWFkeSBpbiBzb3J0IG9yZGVyLCBwYXNzIGB0cnVlYFxuICAvLyBmb3IgKippc1NvcnRlZCoqIHRvIHVzZSBiaW5hcnkgc2VhcmNoLlxuICBfLmluZGV4T2YgPSBjcmVhdGVJbmRleEZpbmRlcigxLCBfLmZpbmRJbmRleCwgXy5zb3J0ZWRJbmRleCk7XG4gIF8ubGFzdEluZGV4T2YgPSBjcmVhdGVJbmRleEZpbmRlcigtMSwgXy5maW5kTGFzdEluZGV4KTtcblxuICAvLyBHZW5lcmF0ZSBhbiBpbnRlZ2VyIEFycmF5IGNvbnRhaW5pbmcgYW4gYXJpdGhtZXRpYyBwcm9ncmVzc2lvbi4gQSBwb3J0IG9mXG4gIC8vIHRoZSBuYXRpdmUgUHl0aG9uIGByYW5nZSgpYCBmdW5jdGlvbi4gU2VlXG4gIC8vIFt0aGUgUHl0aG9uIGRvY3VtZW50YXRpb25dKGh0dHA6Ly9kb2NzLnB5dGhvbi5vcmcvbGlicmFyeS9mdW5jdGlvbnMuaHRtbCNyYW5nZSkuXG4gIF8ucmFuZ2UgPSBmdW5jdGlvbihzdGFydCwgc3RvcCwgc3RlcCkge1xuICAgIGlmIChzdG9wID09IG51bGwpIHtcbiAgICAgIHN0b3AgPSBzdGFydCB8fCAwO1xuICAgICAgc3RhcnQgPSAwO1xuICAgIH1cbiAgICBzdGVwID0gc3RlcCB8fCAxO1xuXG4gICAgdmFyIGxlbmd0aCA9IE1hdGgubWF4KE1hdGguY2VpbCgoc3RvcCAtIHN0YXJ0KSAvIHN0ZXApLCAwKTtcbiAgICB2YXIgcmFuZ2UgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgbGVuZ3RoOyBpZHgrKywgc3RhcnQgKz0gc3RlcCkge1xuICAgICAgcmFuZ2VbaWR4XSA9IHN0YXJ0O1xuICAgIH1cblxuICAgIHJldHVybiByYW5nZTtcbiAgfTtcblxuICAvLyBGdW5jdGlvbiAoYWhlbSkgRnVuY3Rpb25zXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIERldGVybWluZXMgd2hldGhlciB0byBleGVjdXRlIGEgZnVuY3Rpb24gYXMgYSBjb25zdHJ1Y3RvclxuICAvLyBvciBhIG5vcm1hbCBmdW5jdGlvbiB3aXRoIHRoZSBwcm92aWRlZCBhcmd1bWVudHNcbiAgdmFyIGV4ZWN1dGVCb3VuZCA9IGZ1bmN0aW9uKHNvdXJjZUZ1bmMsIGJvdW5kRnVuYywgY29udGV4dCwgY2FsbGluZ0NvbnRleHQsIGFyZ3MpIHtcbiAgICBpZiAoIShjYWxsaW5nQ29udGV4dCBpbnN0YW5jZW9mIGJvdW5kRnVuYykpIHJldHVybiBzb3VyY2VGdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgIHZhciBzZWxmID0gYmFzZUNyZWF0ZShzb3VyY2VGdW5jLnByb3RvdHlwZSk7XG4gICAgdmFyIHJlc3VsdCA9IHNvdXJjZUZ1bmMuYXBwbHkoc2VsZiwgYXJncyk7XG4gICAgaWYgKF8uaXNPYmplY3QocmVzdWx0KSkgcmV0dXJuIHJlc3VsdDtcbiAgICByZXR1cm4gc2VsZjtcbiAgfTtcblxuICAvLyBDcmVhdGUgYSBmdW5jdGlvbiBib3VuZCB0byBhIGdpdmVuIG9iamVjdCAoYXNzaWduaW5nIGB0aGlzYCwgYW5kIGFyZ3VtZW50cyxcbiAgLy8gb3B0aW9uYWxseSkuIERlbGVnYXRlcyB0byAqKkVDTUFTY3JpcHQgNSoqJ3MgbmF0aXZlIGBGdW5jdGlvbi5iaW5kYCBpZlxuICAvLyBhdmFpbGFibGUuXG4gIF8uYmluZCA9IGZ1bmN0aW9uKGZ1bmMsIGNvbnRleHQpIHtcbiAgICBpZiAobmF0aXZlQmluZCAmJiBmdW5jLmJpbmQgPT09IG5hdGl2ZUJpbmQpIHJldHVybiBuYXRpdmVCaW5kLmFwcGx5KGZ1bmMsIHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gICAgaWYgKCFfLmlzRnVuY3Rpb24oZnVuYykpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0JpbmQgbXVzdCBiZSBjYWxsZWQgb24gYSBmdW5jdGlvbicpO1xuICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuICAgIHZhciBib3VuZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGV4ZWN1dGVCb3VuZChmdW5jLCBib3VuZCwgY29udGV4dCwgdGhpcywgYXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgfTtcbiAgICByZXR1cm4gYm91bmQ7XG4gIH07XG5cbiAgLy8gUGFydGlhbGx5IGFwcGx5IGEgZnVuY3Rpb24gYnkgY3JlYXRpbmcgYSB2ZXJzaW9uIHRoYXQgaGFzIGhhZCBzb21lIG9mIGl0c1xuICAvLyBhcmd1bWVudHMgcHJlLWZpbGxlZCwgd2l0aG91dCBjaGFuZ2luZyBpdHMgZHluYW1pYyBgdGhpc2AgY29udGV4dC4gXyBhY3RzXG4gIC8vIGFzIGEgcGxhY2Vob2xkZXIsIGFsbG93aW5nIGFueSBjb21iaW5hdGlvbiBvZiBhcmd1bWVudHMgdG8gYmUgcHJlLWZpbGxlZC5cbiAgXy5wYXJ0aWFsID0gZnVuY3Rpb24oZnVuYykge1xuICAgIHZhciBib3VuZEFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgdmFyIGJvdW5kID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcG9zaXRpb24gPSAwLCBsZW5ndGggPSBib3VuZEFyZ3MubGVuZ3RoO1xuICAgICAgdmFyIGFyZ3MgPSBBcnJheShsZW5ndGgpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBhcmdzW2ldID0gYm91bmRBcmdzW2ldID09PSBfID8gYXJndW1lbnRzW3Bvc2l0aW9uKytdIDogYm91bmRBcmdzW2ldO1xuICAgICAgfVxuICAgICAgd2hpbGUgKHBvc2l0aW9uIDwgYXJndW1lbnRzLmxlbmd0aCkgYXJncy5wdXNoKGFyZ3VtZW50c1twb3NpdGlvbisrXSk7XG4gICAgICByZXR1cm4gZXhlY3V0ZUJvdW5kKGZ1bmMsIGJvdW5kLCB0aGlzLCB0aGlzLCBhcmdzKTtcbiAgICB9O1xuICAgIHJldHVybiBib3VuZDtcbiAgfTtcblxuICAvLyBCaW5kIGEgbnVtYmVyIG9mIGFuIG9iamVjdCdzIG1ldGhvZHMgdG8gdGhhdCBvYmplY3QuIFJlbWFpbmluZyBhcmd1bWVudHNcbiAgLy8gYXJlIHRoZSBtZXRob2QgbmFtZXMgdG8gYmUgYm91bmQuIFVzZWZ1bCBmb3IgZW5zdXJpbmcgdGhhdCBhbGwgY2FsbGJhY2tzXG4gIC8vIGRlZmluZWQgb24gYW4gb2JqZWN0IGJlbG9uZyB0byBpdC5cbiAgXy5iaW5kQWxsID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIGksIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGgsIGtleTtcbiAgICBpZiAobGVuZ3RoIDw9IDEpIHRocm93IG5ldyBFcnJvcignYmluZEFsbCBtdXN0IGJlIHBhc3NlZCBmdW5jdGlvbiBuYW1lcycpO1xuICAgIGZvciAoaSA9IDE7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAga2V5ID0gYXJndW1lbnRzW2ldO1xuICAgICAgb2JqW2tleV0gPSBfLmJpbmQob2JqW2tleV0sIG9iaik7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgLy8gTWVtb2l6ZSBhbiBleHBlbnNpdmUgZnVuY3Rpb24gYnkgc3RvcmluZyBpdHMgcmVzdWx0cy5cbiAgXy5tZW1vaXplID0gZnVuY3Rpb24oZnVuYywgaGFzaGVyKSB7XG4gICAgdmFyIG1lbW9pemUgPSBmdW5jdGlvbihrZXkpIHtcbiAgICAgIHZhciBjYWNoZSA9IG1lbW9pemUuY2FjaGU7XG4gICAgICB2YXIgYWRkcmVzcyA9ICcnICsgKGhhc2hlciA/IGhhc2hlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIDoga2V5KTtcbiAgICAgIGlmICghXy5oYXMoY2FjaGUsIGFkZHJlc3MpKSBjYWNoZVthZGRyZXNzXSA9IGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIHJldHVybiBjYWNoZVthZGRyZXNzXTtcbiAgICB9O1xuICAgIG1lbW9pemUuY2FjaGUgPSB7fTtcbiAgICByZXR1cm4gbWVtb2l6ZTtcbiAgfTtcblxuICAvLyBEZWxheXMgYSBmdW5jdGlvbiBmb3IgdGhlIGdpdmVuIG51bWJlciBvZiBtaWxsaXNlY29uZHMsIGFuZCB0aGVuIGNhbGxzXG4gIC8vIGl0IHdpdGggdGhlIGFyZ3VtZW50cyBzdXBwbGllZC5cbiAgXy5kZWxheSA9IGZ1bmN0aW9uKGZ1bmMsIHdhaXQpIHtcbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgfSwgd2FpdCk7XG4gIH07XG5cbiAgLy8gRGVmZXJzIGEgZnVuY3Rpb24sIHNjaGVkdWxpbmcgaXQgdG8gcnVuIGFmdGVyIHRoZSBjdXJyZW50IGNhbGwgc3RhY2sgaGFzXG4gIC8vIGNsZWFyZWQuXG4gIF8uZGVmZXIgPSBfLnBhcnRpYWwoXy5kZWxheSwgXywgMSk7XG5cbiAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCB3aGVuIGludm9rZWQsIHdpbGwgb25seSBiZSB0cmlnZ2VyZWQgYXQgbW9zdCBvbmNlXG4gIC8vIGR1cmluZyBhIGdpdmVuIHdpbmRvdyBvZiB0aW1lLiBOb3JtYWxseSwgdGhlIHRocm90dGxlZCBmdW5jdGlvbiB3aWxsIHJ1blxuICAvLyBhcyBtdWNoIGFzIGl0IGNhbiwgd2l0aG91dCBldmVyIGdvaW5nIG1vcmUgdGhhbiBvbmNlIHBlciBgd2FpdGAgZHVyYXRpb247XG4gIC8vIGJ1dCBpZiB5b3UnZCBsaWtlIHRvIGRpc2FibGUgdGhlIGV4ZWN1dGlvbiBvbiB0aGUgbGVhZGluZyBlZGdlLCBwYXNzXG4gIC8vIGB7bGVhZGluZzogZmFsc2V9YC4gVG8gZGlzYWJsZSBleGVjdXRpb24gb24gdGhlIHRyYWlsaW5nIGVkZ2UsIGRpdHRvLlxuICBfLnRocm90dGxlID0gZnVuY3Rpb24oZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICAgIHZhciBjb250ZXh0LCBhcmdzLCByZXN1bHQ7XG4gICAgdmFyIHRpbWVvdXQgPSBudWxsO1xuICAgIHZhciBwcmV2aW91cyA9IDA7XG4gICAgaWYgKCFvcHRpb25zKSBvcHRpb25zID0ge307XG4gICAgdmFyIGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICBwcmV2aW91cyA9IG9wdGlvbnMubGVhZGluZyA9PT0gZmFsc2UgPyAwIDogXy5ub3coKTtcbiAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgIGlmICghdGltZW91dCkgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG5vdyA9IF8ubm93KCk7XG4gICAgICBpZiAoIXByZXZpb3VzICYmIG9wdGlvbnMubGVhZGluZyA9PT0gZmFsc2UpIHByZXZpb3VzID0gbm93O1xuICAgICAgdmFyIHJlbWFpbmluZyA9IHdhaXQgLSAobm93IC0gcHJldmlvdXMpO1xuICAgICAgY29udGV4dCA9IHRoaXM7XG4gICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgaWYgKHJlbWFpbmluZyA8PSAwIHx8IHJlbWFpbmluZyA+IHdhaXQpIHtcbiAgICAgICAgaWYgKHRpbWVvdXQpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcHJldmlvdXMgPSBub3c7XG4gICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgIGlmICghdGltZW91dCkgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xuICAgICAgfSBlbHNlIGlmICghdGltZW91dCAmJiBvcHRpb25zLnRyYWlsaW5nICE9PSBmYWxzZSkge1xuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgcmVtYWluaW5nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG4gIC8vIGJlIHRyaWdnZXJlZC4gVGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFmdGVyIGl0IHN0b3BzIGJlaW5nIGNhbGxlZCBmb3JcbiAgLy8gTiBtaWxsaXNlY29uZHMuIElmIGBpbW1lZGlhdGVgIGlzIHBhc3NlZCwgdHJpZ2dlciB0aGUgZnVuY3Rpb24gb24gdGhlXG4gIC8vIGxlYWRpbmcgZWRnZSwgaW5zdGVhZCBvZiB0aGUgdHJhaWxpbmcuXG4gIF8uZGVib3VuY2UgPSBmdW5jdGlvbihmdW5jLCB3YWl0LCBpbW1lZGlhdGUpIHtcbiAgICB2YXIgdGltZW91dCwgYXJncywgY29udGV4dCwgdGltZXN0YW1wLCByZXN1bHQ7XG5cbiAgICB2YXIgbGF0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBsYXN0ID0gXy5ub3coKSAtIHRpbWVzdGFtcDtcblxuICAgICAgaWYgKGxhc3QgPCB3YWl0ICYmIGxhc3QgPj0gMCkge1xuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCAtIGxhc3QpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgIGlmICghaW1tZWRpYXRlKSB7XG4gICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICBpZiAoIXRpbWVvdXQpIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBjb250ZXh0ID0gdGhpcztcbiAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICB0aW1lc3RhbXAgPSBfLm5vdygpO1xuICAgICAgdmFyIGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XG4gICAgICBpZiAoIXRpbWVvdXQpIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcbiAgICAgIGlmIChjYWxsTm93KSB7XG4gICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICB9O1xuXG4gIC8vIFJldHVybnMgdGhlIGZpcnN0IGZ1bmN0aW9uIHBhc3NlZCBhcyBhbiBhcmd1bWVudCB0byB0aGUgc2Vjb25kLFxuICAvLyBhbGxvd2luZyB5b3UgdG8gYWRqdXN0IGFyZ3VtZW50cywgcnVuIGNvZGUgYmVmb3JlIGFuZCBhZnRlciwgYW5kXG4gIC8vIGNvbmRpdGlvbmFsbHkgZXhlY3V0ZSB0aGUgb3JpZ2luYWwgZnVuY3Rpb24uXG4gIF8ud3JhcCA9IGZ1bmN0aW9uKGZ1bmMsIHdyYXBwZXIpIHtcbiAgICByZXR1cm4gXy5wYXJ0aWFsKHdyYXBwZXIsIGZ1bmMpO1xuICB9O1xuXG4gIC8vIFJldHVybnMgYSBuZWdhdGVkIHZlcnNpb24gb2YgdGhlIHBhc3NlZC1pbiBwcmVkaWNhdGUuXG4gIF8ubmVnYXRlID0gZnVuY3Rpb24ocHJlZGljYXRlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICFwcmVkaWNhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9O1xuXG4gIC8vIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGlzIHRoZSBjb21wb3NpdGlvbiBvZiBhIGxpc3Qgb2YgZnVuY3Rpb25zLCBlYWNoXG4gIC8vIGNvbnN1bWluZyB0aGUgcmV0dXJuIHZhbHVlIG9mIHRoZSBmdW5jdGlvbiB0aGF0IGZvbGxvd3MuXG4gIF8uY29tcG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgIHZhciBzdGFydCA9IGFyZ3MubGVuZ3RoIC0gMTtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSA9IHN0YXJ0O1xuICAgICAgdmFyIHJlc3VsdCA9IGFyZ3Nbc3RhcnRdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB3aGlsZSAoaS0tKSByZXN1bHQgPSBhcmdzW2ldLmNhbGwodGhpcywgcmVzdWx0KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCB3aWxsIG9ubHkgYmUgZXhlY3V0ZWQgb24gYW5kIGFmdGVyIHRoZSBOdGggY2FsbC5cbiAgXy5hZnRlciA9IGZ1bmN0aW9uKHRpbWVzLCBmdW5jKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKC0tdGltZXMgPCAxKSB7XG4gICAgICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCB3aWxsIG9ubHkgYmUgZXhlY3V0ZWQgdXAgdG8gKGJ1dCBub3QgaW5jbHVkaW5nKSB0aGUgTnRoIGNhbGwuXG4gIF8uYmVmb3JlID0gZnVuY3Rpb24odGltZXMsIGZ1bmMpIHtcbiAgICB2YXIgbWVtbztcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoLS10aW1lcyA+IDApIHtcbiAgICAgICAgbWVtbyA9IGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aW1lcyA8PSAxKSBmdW5jID0gbnVsbDtcbiAgICAgIHJldHVybiBtZW1vO1xuICAgIH07XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBleGVjdXRlZCBhdCBtb3N0IG9uZSB0aW1lLCBubyBtYXR0ZXIgaG93XG4gIC8vIG9mdGVuIHlvdSBjYWxsIGl0LiBVc2VmdWwgZm9yIGxhenkgaW5pdGlhbGl6YXRpb24uXG4gIF8ub25jZSA9IF8ucGFydGlhbChfLmJlZm9yZSwgMik7XG5cbiAgLy8gT2JqZWN0IEZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gS2V5cyBpbiBJRSA8IDkgdGhhdCB3b24ndCBiZSBpdGVyYXRlZCBieSBgZm9yIGtleSBpbiAuLi5gIGFuZCB0aHVzIG1pc3NlZC5cbiAgdmFyIGhhc0VudW1CdWcgPSAhe3RvU3RyaW5nOiBudWxsfS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgndG9TdHJpbmcnKTtcbiAgdmFyIG5vbkVudW1lcmFibGVQcm9wcyA9IFsndmFsdWVPZicsICdpc1Byb3RvdHlwZU9mJywgJ3RvU3RyaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAncHJvcGVydHlJc0VudW1lcmFibGUnLCAnaGFzT3duUHJvcGVydHknLCAndG9Mb2NhbGVTdHJpbmcnXTtcblxuICBmdW5jdGlvbiBjb2xsZWN0Tm9uRW51bVByb3BzKG9iaiwga2V5cykge1xuICAgIHZhciBub25FbnVtSWR4ID0gbm9uRW51bWVyYWJsZVByb3BzLmxlbmd0aDtcbiAgICB2YXIgY29uc3RydWN0b3IgPSBvYmouY29uc3RydWN0b3I7XG4gICAgdmFyIHByb3RvID0gKF8uaXNGdW5jdGlvbihjb25zdHJ1Y3RvcikgJiYgY29uc3RydWN0b3IucHJvdG90eXBlKSB8fCBPYmpQcm90bztcblxuICAgIC8vIENvbnN0cnVjdG9yIGlzIGEgc3BlY2lhbCBjYXNlLlxuICAgIHZhciBwcm9wID0gJ2NvbnN0cnVjdG9yJztcbiAgICBpZiAoXy5oYXMob2JqLCBwcm9wKSAmJiAhXy5jb250YWlucyhrZXlzLCBwcm9wKSkga2V5cy5wdXNoKHByb3ApO1xuXG4gICAgd2hpbGUgKG5vbkVudW1JZHgtLSkge1xuICAgICAgcHJvcCA9IG5vbkVudW1lcmFibGVQcm9wc1tub25FbnVtSWR4XTtcbiAgICAgIGlmIChwcm9wIGluIG9iaiAmJiBvYmpbcHJvcF0gIT09IHByb3RvW3Byb3BdICYmICFfLmNvbnRhaW5zKGtleXMsIHByb3ApKSB7XG4gICAgICAgIGtleXMucHVzaChwcm9wKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBSZXRyaWV2ZSB0aGUgbmFtZXMgb2YgYW4gb2JqZWN0J3Mgb3duIHByb3BlcnRpZXMuXG4gIC8vIERlbGVnYXRlcyB0byAqKkVDTUFTY3JpcHQgNSoqJ3MgbmF0aXZlIGBPYmplY3Qua2V5c2BcbiAgXy5rZXlzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKCFfLmlzT2JqZWN0KG9iaikpIHJldHVybiBbXTtcbiAgICBpZiAobmF0aXZlS2V5cykgcmV0dXJuIG5hdGl2ZUtleXMob2JqKTtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIGlmIChfLmhhcyhvYmosIGtleSkpIGtleXMucHVzaChrZXkpO1xuICAgIC8vIEFoZW0sIElFIDwgOS5cbiAgICBpZiAoaGFzRW51bUJ1ZykgY29sbGVjdE5vbkVudW1Qcm9wcyhvYmosIGtleXMpO1xuICAgIHJldHVybiBrZXlzO1xuICB9O1xuXG4gIC8vIFJldHJpZXZlIGFsbCB0aGUgcHJvcGVydHkgbmFtZXMgb2YgYW4gb2JqZWN0LlxuICBfLmFsbEtleXMgPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAoIV8uaXNPYmplY3Qob2JqKSkgcmV0dXJuIFtdO1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iaikga2V5cy5wdXNoKGtleSk7XG4gICAgLy8gQWhlbSwgSUUgPCA5LlxuICAgIGlmIChoYXNFbnVtQnVnKSBjb2xsZWN0Tm9uRW51bVByb3BzKG9iaiwga2V5cyk7XG4gICAgcmV0dXJuIGtleXM7XG4gIH07XG5cbiAgLy8gUmV0cmlldmUgdGhlIHZhbHVlcyBvZiBhbiBvYmplY3QncyBwcm9wZXJ0aWVzLlxuICBfLnZhbHVlcyA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciBrZXlzID0gXy5rZXlzKG9iaik7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciB2YWx1ZXMgPSBBcnJheShsZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhbHVlc1tpXSA9IG9ialtrZXlzW2ldXTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfTtcblxuICAvLyBSZXR1cm5zIHRoZSByZXN1bHRzIG9mIGFwcGx5aW5nIHRoZSBpdGVyYXRlZSB0byBlYWNoIGVsZW1lbnQgb2YgdGhlIG9iamVjdFxuICAvLyBJbiBjb250cmFzdCB0byBfLm1hcCBpdCByZXR1cm5zIGFuIG9iamVjdFxuICBfLm1hcE9iamVjdCA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICBpdGVyYXRlZSA9IGNiKGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgICB2YXIga2V5cyA9ICBfLmtleXMob2JqKSxcbiAgICAgICAgICBsZW5ndGggPSBrZXlzLmxlbmd0aCxcbiAgICAgICAgICByZXN1bHRzID0ge30sXG4gICAgICAgICAgY3VycmVudEtleTtcbiAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgY3VycmVudEtleSA9IGtleXNbaW5kZXhdO1xuICAgICAgICByZXN1bHRzW2N1cnJlbnRLZXldID0gaXRlcmF0ZWUob2JqW2N1cnJlbnRLZXldLCBjdXJyZW50S2V5LCBvYmopO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gIH07XG5cbiAgLy8gQ29udmVydCBhbiBvYmplY3QgaW50byBhIGxpc3Qgb2YgYFtrZXksIHZhbHVlXWAgcGFpcnMuXG4gIF8ucGFpcnMgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIga2V5cyA9IF8ua2V5cyhvYmopO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgcGFpcnMgPSBBcnJheShsZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHBhaXJzW2ldID0gW2tleXNbaV0sIG9ialtrZXlzW2ldXV07XG4gICAgfVxuICAgIHJldHVybiBwYWlycztcbiAgfTtcblxuICAvLyBJbnZlcnQgdGhlIGtleXMgYW5kIHZhbHVlcyBvZiBhbiBvYmplY3QuIFRoZSB2YWx1ZXMgbXVzdCBiZSBzZXJpYWxpemFibGUuXG4gIF8uaW52ZXJ0ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIHZhciBrZXlzID0gXy5rZXlzKG9iaik7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGtleXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlc3VsdFtvYmpba2V5c1tpXV1dID0ga2V5c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBSZXR1cm4gYSBzb3J0ZWQgbGlzdCBvZiB0aGUgZnVuY3Rpb24gbmFtZXMgYXZhaWxhYmxlIG9uIHRoZSBvYmplY3QuXG4gIC8vIEFsaWFzZWQgYXMgYG1ldGhvZHNgXG4gIF8uZnVuY3Rpb25zID0gXy5tZXRob2RzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIG5hbWVzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKF8uaXNGdW5jdGlvbihvYmpba2V5XSkpIG5hbWVzLnB1c2goa2V5KTtcbiAgICB9XG4gICAgcmV0dXJuIG5hbWVzLnNvcnQoKTtcbiAgfTtcblxuICAvLyBFeHRlbmQgYSBnaXZlbiBvYmplY3Qgd2l0aCBhbGwgdGhlIHByb3BlcnRpZXMgaW4gcGFzc2VkLWluIG9iamVjdChzKS5cbiAgXy5leHRlbmQgPSBjcmVhdGVBc3NpZ25lcihfLmFsbEtleXMpO1xuXG4gIC8vIEFzc2lnbnMgYSBnaXZlbiBvYmplY3Qgd2l0aCBhbGwgdGhlIG93biBwcm9wZXJ0aWVzIGluIHRoZSBwYXNzZWQtaW4gb2JqZWN0KHMpXG4gIC8vIChodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvYXNzaWduKVxuICBfLmV4dGVuZE93biA9IF8uYXNzaWduID0gY3JlYXRlQXNzaWduZXIoXy5rZXlzKTtcblxuICAvLyBSZXR1cm5zIHRoZSBmaXJzdCBrZXkgb24gYW4gb2JqZWN0IHRoYXQgcGFzc2VzIGEgcHJlZGljYXRlIHRlc3RcbiAgXy5maW5kS2V5ID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICBwcmVkaWNhdGUgPSBjYihwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIHZhciBrZXlzID0gXy5rZXlzKG9iaiksIGtleTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgIGlmIChwcmVkaWNhdGUob2JqW2tleV0sIGtleSwgb2JqKSkgcmV0dXJuIGtleTtcbiAgICB9XG4gIH07XG5cbiAgLy8gUmV0dXJuIGEgY29weSBvZiB0aGUgb2JqZWN0IG9ubHkgY29udGFpbmluZyB0aGUgd2hpdGVsaXN0ZWQgcHJvcGVydGllcy5cbiAgXy5waWNrID0gZnVuY3Rpb24ob2JqZWN0LCBvaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICB2YXIgcmVzdWx0ID0ge30sIG9iaiA9IG9iamVjdCwgaXRlcmF0ZWUsIGtleXM7XG4gICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gcmVzdWx0O1xuICAgIGlmIChfLmlzRnVuY3Rpb24ob2l0ZXJhdGVlKSkge1xuICAgICAga2V5cyA9IF8uYWxsS2V5cyhvYmopO1xuICAgICAgaXRlcmF0ZWUgPSBvcHRpbWl6ZUNiKG9pdGVyYXRlZSwgY29udGV4dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGtleXMgPSBmbGF0dGVuKGFyZ3VtZW50cywgZmFsc2UsIGZhbHNlLCAxKTtcbiAgICAgIGl0ZXJhdGVlID0gZnVuY3Rpb24odmFsdWUsIGtleSwgb2JqKSB7IHJldHVybiBrZXkgaW4gb2JqOyB9O1xuICAgICAgb2JqID0gT2JqZWN0KG9iaik7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBrZXlzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgIHZhciB2YWx1ZSA9IG9ialtrZXldO1xuICAgICAgaWYgKGl0ZXJhdGVlKHZhbHVlLCBrZXksIG9iaikpIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgIC8vIFJldHVybiBhIGNvcHkgb2YgdGhlIG9iamVjdCB3aXRob3V0IHRoZSBibGFja2xpc3RlZCBwcm9wZXJ0aWVzLlxuICBfLm9taXQgPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgaWYgKF8uaXNGdW5jdGlvbihpdGVyYXRlZSkpIHtcbiAgICAgIGl0ZXJhdGVlID0gXy5uZWdhdGUoaXRlcmF0ZWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIga2V5cyA9IF8ubWFwKGZsYXR0ZW4oYXJndW1lbnRzLCBmYWxzZSwgZmFsc2UsIDEpLCBTdHJpbmcpO1xuICAgICAgaXRlcmF0ZWUgPSBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICAgIHJldHVybiAhXy5jb250YWlucyhrZXlzLCBrZXkpO1xuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIF8ucGljayhvYmosIGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgfTtcblxuICAvLyBGaWxsIGluIGEgZ2l2ZW4gb2JqZWN0IHdpdGggZGVmYXVsdCBwcm9wZXJ0aWVzLlxuICBfLmRlZmF1bHRzID0gY3JlYXRlQXNzaWduZXIoXy5hbGxLZXlzLCB0cnVlKTtcblxuICAvLyBDcmVhdGVzIGFuIG9iamVjdCB0aGF0IGluaGVyaXRzIGZyb20gdGhlIGdpdmVuIHByb3RvdHlwZSBvYmplY3QuXG4gIC8vIElmIGFkZGl0aW9uYWwgcHJvcGVydGllcyBhcmUgcHJvdmlkZWQgdGhlbiB0aGV5IHdpbGwgYmUgYWRkZWQgdG8gdGhlXG4gIC8vIGNyZWF0ZWQgb2JqZWN0LlxuICBfLmNyZWF0ZSA9IGZ1bmN0aW9uKHByb3RvdHlwZSwgcHJvcHMpIHtcbiAgICB2YXIgcmVzdWx0ID0gYmFzZUNyZWF0ZShwcm90b3R5cGUpO1xuICAgIGlmIChwcm9wcykgXy5leHRlbmRPd24ocmVzdWx0LCBwcm9wcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBDcmVhdGUgYSAoc2hhbGxvdy1jbG9uZWQpIGR1cGxpY2F0ZSBvZiBhbiBvYmplY3QuXG4gIF8uY2xvbmUgPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAoIV8uaXNPYmplY3Qob2JqKSkgcmV0dXJuIG9iajtcbiAgICByZXR1cm4gXy5pc0FycmF5KG9iaikgPyBvYmouc2xpY2UoKSA6IF8uZXh0ZW5kKHt9LCBvYmopO1xuICB9O1xuXG4gIC8vIEludm9rZXMgaW50ZXJjZXB0b3Igd2l0aCB0aGUgb2JqLCBhbmQgdGhlbiByZXR1cm5zIG9iai5cbiAgLy8gVGhlIHByaW1hcnkgcHVycG9zZSBvZiB0aGlzIG1ldGhvZCBpcyB0byBcInRhcCBpbnRvXCIgYSBtZXRob2QgY2hhaW4sIGluXG4gIC8vIG9yZGVyIHRvIHBlcmZvcm0gb3BlcmF0aW9ucyBvbiBpbnRlcm1lZGlhdGUgcmVzdWx0cyB3aXRoaW4gdGhlIGNoYWluLlxuICBfLnRhcCA9IGZ1bmN0aW9uKG9iaiwgaW50ZXJjZXB0b3IpIHtcbiAgICBpbnRlcmNlcHRvcihvYmopO1xuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgLy8gUmV0dXJucyB3aGV0aGVyIGFuIG9iamVjdCBoYXMgYSBnaXZlbiBzZXQgb2YgYGtleTp2YWx1ZWAgcGFpcnMuXG4gIF8uaXNNYXRjaCA9IGZ1bmN0aW9uKG9iamVjdCwgYXR0cnMpIHtcbiAgICB2YXIga2V5cyA9IF8ua2V5cyhhdHRycyksIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIGlmIChvYmplY3QgPT0gbnVsbCkgcmV0dXJuICFsZW5ndGg7XG4gICAgdmFyIG9iaiA9IE9iamVjdChvYmplY3QpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgaWYgKGF0dHJzW2tleV0gIT09IG9ialtrZXldIHx8ICEoa2V5IGluIG9iaikpIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cblxuICAvLyBJbnRlcm5hbCByZWN1cnNpdmUgY29tcGFyaXNvbiBmdW5jdGlvbiBmb3IgYGlzRXF1YWxgLlxuICB2YXIgZXEgPSBmdW5jdGlvbihhLCBiLCBhU3RhY2ssIGJTdGFjaykge1xuICAgIC8vIElkZW50aWNhbCBvYmplY3RzIGFyZSBlcXVhbC4gYDAgPT09IC0wYCwgYnV0IHRoZXkgYXJlbid0IGlkZW50aWNhbC5cbiAgICAvLyBTZWUgdGhlIFtIYXJtb255IGBlZ2FsYCBwcm9wb3NhbF0oaHR0cDovL3dpa2kuZWNtYXNjcmlwdC5vcmcvZG9rdS5waHA/aWQ9aGFybW9ueTplZ2FsKS5cbiAgICBpZiAoYSA9PT0gYikgcmV0dXJuIGEgIT09IDAgfHwgMSAvIGEgPT09IDEgLyBiO1xuICAgIC8vIEEgc3RyaWN0IGNvbXBhcmlzb24gaXMgbmVjZXNzYXJ5IGJlY2F1c2UgYG51bGwgPT0gdW5kZWZpbmVkYC5cbiAgICBpZiAoYSA9PSBudWxsIHx8IGIgPT0gbnVsbCkgcmV0dXJuIGEgPT09IGI7XG4gICAgLy8gVW53cmFwIGFueSB3cmFwcGVkIG9iamVjdHMuXG4gICAgaWYgKGEgaW5zdGFuY2VvZiBfKSBhID0gYS5fd3JhcHBlZDtcbiAgICBpZiAoYiBpbnN0YW5jZW9mIF8pIGIgPSBiLl93cmFwcGVkO1xuICAgIC8vIENvbXBhcmUgYFtbQ2xhc3NdXWAgbmFtZXMuXG4gICAgdmFyIGNsYXNzTmFtZSA9IHRvU3RyaW5nLmNhbGwoYSk7XG4gICAgaWYgKGNsYXNzTmFtZSAhPT0gdG9TdHJpbmcuY2FsbChiKSkgcmV0dXJuIGZhbHNlO1xuICAgIHN3aXRjaCAoY2xhc3NOYW1lKSB7XG4gICAgICAvLyBTdHJpbmdzLCBudW1iZXJzLCByZWd1bGFyIGV4cHJlc3Npb25zLCBkYXRlcywgYW5kIGJvb2xlYW5zIGFyZSBjb21wYXJlZCBieSB2YWx1ZS5cbiAgICAgIGNhc2UgJ1tvYmplY3QgUmVnRXhwXSc6XG4gICAgICAvLyBSZWdFeHBzIGFyZSBjb2VyY2VkIHRvIHN0cmluZ3MgZm9yIGNvbXBhcmlzb24gKE5vdGU6ICcnICsgL2EvaSA9PT0gJy9hL2knKVxuICAgICAgY2FzZSAnW29iamVjdCBTdHJpbmddJzpcbiAgICAgICAgLy8gUHJpbWl0aXZlcyBhbmQgdGhlaXIgY29ycmVzcG9uZGluZyBvYmplY3Qgd3JhcHBlcnMgYXJlIGVxdWl2YWxlbnQ7IHRodXMsIGBcIjVcImAgaXNcbiAgICAgICAgLy8gZXF1aXZhbGVudCB0byBgbmV3IFN0cmluZyhcIjVcIilgLlxuICAgICAgICByZXR1cm4gJycgKyBhID09PSAnJyArIGI7XG4gICAgICBjYXNlICdbb2JqZWN0IE51bWJlcl0nOlxuICAgICAgICAvLyBgTmFOYHMgYXJlIGVxdWl2YWxlbnQsIGJ1dCBub24tcmVmbGV4aXZlLlxuICAgICAgICAvLyBPYmplY3QoTmFOKSBpcyBlcXVpdmFsZW50IHRvIE5hTlxuICAgICAgICBpZiAoK2EgIT09ICthKSByZXR1cm4gK2IgIT09ICtiO1xuICAgICAgICAvLyBBbiBgZWdhbGAgY29tcGFyaXNvbiBpcyBwZXJmb3JtZWQgZm9yIG90aGVyIG51bWVyaWMgdmFsdWVzLlxuICAgICAgICByZXR1cm4gK2EgPT09IDAgPyAxIC8gK2EgPT09IDEgLyBiIDogK2EgPT09ICtiO1xuICAgICAgY2FzZSAnW29iamVjdCBEYXRlXSc6XG4gICAgICBjYXNlICdbb2JqZWN0IEJvb2xlYW5dJzpcbiAgICAgICAgLy8gQ29lcmNlIGRhdGVzIGFuZCBib29sZWFucyB0byBudW1lcmljIHByaW1pdGl2ZSB2YWx1ZXMuIERhdGVzIGFyZSBjb21wYXJlZCBieSB0aGVpclxuICAgICAgICAvLyBtaWxsaXNlY29uZCByZXByZXNlbnRhdGlvbnMuIE5vdGUgdGhhdCBpbnZhbGlkIGRhdGVzIHdpdGggbWlsbGlzZWNvbmQgcmVwcmVzZW50YXRpb25zXG4gICAgICAgIC8vIG9mIGBOYU5gIGFyZSBub3QgZXF1aXZhbGVudC5cbiAgICAgICAgcmV0dXJuICthID09PSArYjtcbiAgICB9XG5cbiAgICB2YXIgYXJlQXJyYXlzID0gY2xhc3NOYW1lID09PSAnW29iamVjdCBBcnJheV0nO1xuICAgIGlmICghYXJlQXJyYXlzKSB7XG4gICAgICBpZiAodHlwZW9mIGEgIT0gJ29iamVjdCcgfHwgdHlwZW9mIGIgIT0gJ29iamVjdCcpIHJldHVybiBmYWxzZTtcblxuICAgICAgLy8gT2JqZWN0cyB3aXRoIGRpZmZlcmVudCBjb25zdHJ1Y3RvcnMgYXJlIG5vdCBlcXVpdmFsZW50LCBidXQgYE9iamVjdGBzIG9yIGBBcnJheWBzXG4gICAgICAvLyBmcm9tIGRpZmZlcmVudCBmcmFtZXMgYXJlLlxuICAgICAgdmFyIGFDdG9yID0gYS5jb25zdHJ1Y3RvciwgYkN0b3IgPSBiLmNvbnN0cnVjdG9yO1xuICAgICAgaWYgKGFDdG9yICE9PSBiQ3RvciAmJiAhKF8uaXNGdW5jdGlvbihhQ3RvcikgJiYgYUN0b3IgaW5zdGFuY2VvZiBhQ3RvciAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uaXNGdW5jdGlvbihiQ3RvcikgJiYgYkN0b3IgaW5zdGFuY2VvZiBiQ3RvcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgKCdjb25zdHJ1Y3RvcicgaW4gYSAmJiAnY29uc3RydWN0b3InIGluIGIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gQXNzdW1lIGVxdWFsaXR5IGZvciBjeWNsaWMgc3RydWN0dXJlcy4gVGhlIGFsZ29yaXRobSBmb3IgZGV0ZWN0aW5nIGN5Y2xpY1xuICAgIC8vIHN0cnVjdHVyZXMgaXMgYWRhcHRlZCBmcm9tIEVTIDUuMSBzZWN0aW9uIDE1LjEyLjMsIGFic3RyYWN0IG9wZXJhdGlvbiBgSk9gLlxuXG4gICAgLy8gSW5pdGlhbGl6aW5nIHN0YWNrIG9mIHRyYXZlcnNlZCBvYmplY3RzLlxuICAgIC8vIEl0J3MgZG9uZSBoZXJlIHNpbmNlIHdlIG9ubHkgbmVlZCB0aGVtIGZvciBvYmplY3RzIGFuZCBhcnJheXMgY29tcGFyaXNvbi5cbiAgICBhU3RhY2sgPSBhU3RhY2sgfHwgW107XG4gICAgYlN0YWNrID0gYlN0YWNrIHx8IFtdO1xuICAgIHZhciBsZW5ndGggPSBhU3RhY2subGVuZ3RoO1xuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgLy8gTGluZWFyIHNlYXJjaC4gUGVyZm9ybWFuY2UgaXMgaW52ZXJzZWx5IHByb3BvcnRpb25hbCB0byB0aGUgbnVtYmVyIG9mXG4gICAgICAvLyB1bmlxdWUgbmVzdGVkIHN0cnVjdHVyZXMuXG4gICAgICBpZiAoYVN0YWNrW2xlbmd0aF0gPT09IGEpIHJldHVybiBiU3RhY2tbbGVuZ3RoXSA9PT0gYjtcbiAgICB9XG5cbiAgICAvLyBBZGQgdGhlIGZpcnN0IG9iamVjdCB0byB0aGUgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMuXG4gICAgYVN0YWNrLnB1c2goYSk7XG4gICAgYlN0YWNrLnB1c2goYik7XG5cbiAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgYW5kIGFycmF5cy5cbiAgICBpZiAoYXJlQXJyYXlzKSB7XG4gICAgICAvLyBDb21wYXJlIGFycmF5IGxlbmd0aHMgdG8gZGV0ZXJtaW5lIGlmIGEgZGVlcCBjb21wYXJpc29uIGlzIG5lY2Vzc2FyeS5cbiAgICAgIGxlbmd0aCA9IGEubGVuZ3RoO1xuICAgICAgaWYgKGxlbmd0aCAhPT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICAgIC8vIERlZXAgY29tcGFyZSB0aGUgY29udGVudHMsIGlnbm9yaW5nIG5vbi1udW1lcmljIHByb3BlcnRpZXMuXG4gICAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgICAgaWYgKCFlcShhW2xlbmd0aF0sIGJbbGVuZ3RoXSwgYVN0YWNrLCBiU3RhY2spKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIERlZXAgY29tcGFyZSBvYmplY3RzLlxuICAgICAgdmFyIGtleXMgPSBfLmtleXMoYSksIGtleTtcbiAgICAgIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgICAgLy8gRW5zdXJlIHRoYXQgYm90aCBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUgbnVtYmVyIG9mIHByb3BlcnRpZXMgYmVmb3JlIGNvbXBhcmluZyBkZWVwIGVxdWFsaXR5LlxuICAgICAgaWYgKF8ua2V5cyhiKS5sZW5ndGggIT09IGxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICAgIC8vIERlZXAgY29tcGFyZSBlYWNoIG1lbWJlclxuICAgICAgICBrZXkgPSBrZXlzW2xlbmd0aF07XG4gICAgICAgIGlmICghKF8uaGFzKGIsIGtleSkgJiYgZXEoYVtrZXldLCBiW2tleV0sIGFTdGFjaywgYlN0YWNrKSkpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gUmVtb3ZlIHRoZSBmaXJzdCBvYmplY3QgZnJvbSB0aGUgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMuXG4gICAgYVN0YWNrLnBvcCgpO1xuICAgIGJTdGFjay5wb3AoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICAvLyBQZXJmb3JtIGEgZGVlcCBjb21wYXJpc29uIHRvIGNoZWNrIGlmIHR3byBvYmplY3RzIGFyZSBlcXVhbC5cbiAgXy5pc0VxdWFsID0gZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBlcShhLCBiKTtcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIGFycmF5LCBzdHJpbmcsIG9yIG9iamVjdCBlbXB0eT9cbiAgLy8gQW4gXCJlbXB0eVwiIG9iamVjdCBoYXMgbm8gZW51bWVyYWJsZSBvd24tcHJvcGVydGllcy5cbiAgXy5pc0VtcHR5ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoaXNBcnJheUxpa2Uob2JqKSAmJiAoXy5pc0FycmF5KG9iaikgfHwgXy5pc1N0cmluZyhvYmopIHx8IF8uaXNBcmd1bWVudHMob2JqKSkpIHJldHVybiBvYmoubGVuZ3RoID09PSAwO1xuICAgIHJldHVybiBfLmtleXMob2JqKS5sZW5ndGggPT09IDA7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YWx1ZSBhIERPTSBlbGVtZW50P1xuICBfLmlzRWxlbWVudCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiAhIShvYmogJiYgb2JqLm5vZGVUeXBlID09PSAxKTtcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIHZhbHVlIGFuIGFycmF5P1xuICAvLyBEZWxlZ2F0ZXMgdG8gRUNNQTUncyBuYXRpdmUgQXJyYXkuaXNBcnJheVxuICBfLmlzQXJyYXkgPSBuYXRpdmVJc0FycmF5IHx8IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YXJpYWJsZSBhbiBvYmplY3Q/XG4gIF8uaXNPYmplY3QgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIgdHlwZSA9IHR5cGVvZiBvYmo7XG4gICAgcmV0dXJuIHR5cGUgPT09ICdmdW5jdGlvbicgfHwgdHlwZSA9PT0gJ29iamVjdCcgJiYgISFvYmo7XG4gIH07XG5cbiAgLy8gQWRkIHNvbWUgaXNUeXBlIG1ldGhvZHM6IGlzQXJndW1lbnRzLCBpc0Z1bmN0aW9uLCBpc1N0cmluZywgaXNOdW1iZXIsIGlzRGF0ZSwgaXNSZWdFeHAsIGlzRXJyb3IuXG4gIF8uZWFjaChbJ0FyZ3VtZW50cycsICdGdW5jdGlvbicsICdTdHJpbmcnLCAnTnVtYmVyJywgJ0RhdGUnLCAnUmVnRXhwJywgJ0Vycm9yJ10sIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBfWydpcycgKyBuYW1lXSA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgJyArIG5hbWUgKyAnXSc7XG4gICAgfTtcbiAgfSk7XG5cbiAgLy8gRGVmaW5lIGEgZmFsbGJhY2sgdmVyc2lvbiBvZiB0aGUgbWV0aG9kIGluIGJyb3dzZXJzIChhaGVtLCBJRSA8IDkpLCB3aGVyZVxuICAvLyB0aGVyZSBpc24ndCBhbnkgaW5zcGVjdGFibGUgXCJBcmd1bWVudHNcIiB0eXBlLlxuICBpZiAoIV8uaXNBcmd1bWVudHMoYXJndW1lbnRzKSkge1xuICAgIF8uaXNBcmd1bWVudHMgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBfLmhhcyhvYmosICdjYWxsZWUnKTtcbiAgICB9O1xuICB9XG5cbiAgLy8gT3B0aW1pemUgYGlzRnVuY3Rpb25gIGlmIGFwcHJvcHJpYXRlLiBXb3JrIGFyb3VuZCBzb21lIHR5cGVvZiBidWdzIGluIG9sZCB2OCxcbiAgLy8gSUUgMTEgKCMxNjIxKSwgYW5kIGluIFNhZmFyaSA4ICgjMTkyOSkuXG4gIGlmICh0eXBlb2YgLy4vICE9ICdmdW5jdGlvbicgJiYgdHlwZW9mIEludDhBcnJheSAhPSAnb2JqZWN0Jykge1xuICAgIF8uaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT0gJ2Z1bmN0aW9uJyB8fCBmYWxzZTtcbiAgICB9O1xuICB9XG5cbiAgLy8gSXMgYSBnaXZlbiBvYmplY3QgYSBmaW5pdGUgbnVtYmVyP1xuICBfLmlzRmluaXRlID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIGlzRmluaXRlKG9iaikgJiYgIWlzTmFOKHBhcnNlRmxvYXQob2JqKSk7XG4gIH07XG5cbiAgLy8gSXMgdGhlIGdpdmVuIHZhbHVlIGBOYU5gPyAoTmFOIGlzIHRoZSBvbmx5IG51bWJlciB3aGljaCBkb2VzIG5vdCBlcXVhbCBpdHNlbGYpLlxuICBfLmlzTmFOID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIF8uaXNOdW1iZXIob2JqKSAmJiBvYmogIT09ICtvYmo7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YWx1ZSBhIGJvb2xlYW4/XG4gIF8uaXNCb29sZWFuID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIG9iaiA9PT0gdHJ1ZSB8fCBvYmogPT09IGZhbHNlIHx8IHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQm9vbGVhbl0nO1xuICB9O1xuXG4gIC8vIElzIGEgZ2l2ZW4gdmFsdWUgZXF1YWwgdG8gbnVsbD9cbiAgXy5pc051bGwgPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gb2JqID09PSBudWxsO1xuICB9O1xuXG4gIC8vIElzIGEgZ2l2ZW4gdmFyaWFibGUgdW5kZWZpbmVkP1xuICBfLmlzVW5kZWZpbmVkID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIG9iaiA9PT0gdm9pZCAwO1xuICB9O1xuXG4gIC8vIFNob3J0Y3V0IGZ1bmN0aW9uIGZvciBjaGVja2luZyBpZiBhbiBvYmplY3QgaGFzIGEgZ2l2ZW4gcHJvcGVydHkgZGlyZWN0bHlcbiAgLy8gb24gaXRzZWxmIChpbiBvdGhlciB3b3Jkcywgbm90IG9uIGEgcHJvdG90eXBlKS5cbiAgXy5oYXMgPSBmdW5jdGlvbihvYmosIGtleSkge1xuICAgIHJldHVybiBvYmogIT0gbnVsbCAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KTtcbiAgfTtcblxuICAvLyBVdGlsaXR5IEZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIFJ1biBVbmRlcnNjb3JlLmpzIGluICpub0NvbmZsaWN0KiBtb2RlLCByZXR1cm5pbmcgdGhlIGBfYCB2YXJpYWJsZSB0byBpdHNcbiAgLy8gcHJldmlvdXMgb3duZXIuIFJldHVybnMgYSByZWZlcmVuY2UgdG8gdGhlIFVuZGVyc2NvcmUgb2JqZWN0LlxuICBfLm5vQ29uZmxpY3QgPSBmdW5jdGlvbigpIHtcbiAgICByb290Ll8gPSBwcmV2aW91c1VuZGVyc2NvcmU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLy8gS2VlcCB0aGUgaWRlbnRpdHkgZnVuY3Rpb24gYXJvdW5kIGZvciBkZWZhdWx0IGl0ZXJhdGVlcy5cbiAgXy5pZGVudGl0eSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xuXG4gIC8vIFByZWRpY2F0ZS1nZW5lcmF0aW5nIGZ1bmN0aW9ucy4gT2Z0ZW4gdXNlZnVsIG91dHNpZGUgb2YgVW5kZXJzY29yZS5cbiAgXy5jb25zdGFudCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gIH07XG5cbiAgXy5ub29wID0gZnVuY3Rpb24oKXt9O1xuXG4gIF8ucHJvcGVydHkgPSBwcm9wZXJ0eTtcblxuICAvLyBHZW5lcmF0ZXMgYSBmdW5jdGlvbiBmb3IgYSBnaXZlbiBvYmplY3QgdGhhdCByZXR1cm5zIGEgZ2l2ZW4gcHJvcGVydHkuXG4gIF8ucHJvcGVydHlPZiA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiBvYmogPT0gbnVsbCA/IGZ1bmN0aW9uKCl7fSA6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgcmV0dXJuIG9ialtrZXldO1xuICAgIH07XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIHByZWRpY2F0ZSBmb3IgY2hlY2tpbmcgd2hldGhlciBhbiBvYmplY3QgaGFzIGEgZ2l2ZW4gc2V0IG9mXG4gIC8vIGBrZXk6dmFsdWVgIHBhaXJzLlxuICBfLm1hdGNoZXIgPSBfLm1hdGNoZXMgPSBmdW5jdGlvbihhdHRycykge1xuICAgIGF0dHJzID0gXy5leHRlbmRPd24oe30sIGF0dHJzKTtcbiAgICByZXR1cm4gZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gXy5pc01hdGNoKG9iaiwgYXR0cnMpO1xuICAgIH07XG4gIH07XG5cbiAgLy8gUnVuIGEgZnVuY3Rpb24gKipuKiogdGltZXMuXG4gIF8udGltZXMgPSBmdW5jdGlvbihuLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIHZhciBhY2N1bSA9IEFycmF5KE1hdGgubWF4KDAsIG4pKTtcbiAgICBpdGVyYXRlZSA9IG9wdGltaXplQ2IoaXRlcmF0ZWUsIGNvbnRleHQsIDEpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgaSsrKSBhY2N1bVtpXSA9IGl0ZXJhdGVlKGkpO1xuICAgIHJldHVybiBhY2N1bTtcbiAgfTtcblxuICAvLyBSZXR1cm4gYSByYW5kb20gaW50ZWdlciBiZXR3ZWVuIG1pbiBhbmQgbWF4IChpbmNsdXNpdmUpLlxuICBfLnJhbmRvbSA9IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XG4gICAgaWYgKG1heCA9PSBudWxsKSB7XG4gICAgICBtYXggPSBtaW47XG4gICAgICBtaW4gPSAwO1xuICAgIH1cbiAgICByZXR1cm4gbWluICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKTtcbiAgfTtcblxuICAvLyBBIChwb3NzaWJseSBmYXN0ZXIpIHdheSB0byBnZXQgdGhlIGN1cnJlbnQgdGltZXN0YW1wIGFzIGFuIGludGVnZXIuXG4gIF8ubm93ID0gRGF0ZS5ub3cgfHwgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICB9O1xuXG4gICAvLyBMaXN0IG9mIEhUTUwgZW50aXRpZXMgZm9yIGVzY2FwaW5nLlxuICB2YXIgZXNjYXBlTWFwID0ge1xuICAgICcmJzogJyZhbXA7JyxcbiAgICAnPCc6ICcmbHQ7JyxcbiAgICAnPic6ICcmZ3Q7JyxcbiAgICAnXCInOiAnJnF1b3Q7JyxcbiAgICBcIidcIjogJyYjeDI3OycsXG4gICAgJ2AnOiAnJiN4NjA7J1xuICB9O1xuICB2YXIgdW5lc2NhcGVNYXAgPSBfLmludmVydChlc2NhcGVNYXApO1xuXG4gIC8vIEZ1bmN0aW9ucyBmb3IgZXNjYXBpbmcgYW5kIHVuZXNjYXBpbmcgc3RyaW5ncyB0by9mcm9tIEhUTUwgaW50ZXJwb2xhdGlvbi5cbiAgdmFyIGNyZWF0ZUVzY2FwZXIgPSBmdW5jdGlvbihtYXApIHtcbiAgICB2YXIgZXNjYXBlciA9IGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgICByZXR1cm4gbWFwW21hdGNoXTtcbiAgICB9O1xuICAgIC8vIFJlZ2V4ZXMgZm9yIGlkZW50aWZ5aW5nIGEga2V5IHRoYXQgbmVlZHMgdG8gYmUgZXNjYXBlZFxuICAgIHZhciBzb3VyY2UgPSAnKD86JyArIF8ua2V5cyhtYXApLmpvaW4oJ3wnKSArICcpJztcbiAgICB2YXIgdGVzdFJlZ2V4cCA9IFJlZ0V4cChzb3VyY2UpO1xuICAgIHZhciByZXBsYWNlUmVnZXhwID0gUmVnRXhwKHNvdXJjZSwgJ2cnKTtcbiAgICByZXR1cm4gZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgICBzdHJpbmcgPSBzdHJpbmcgPT0gbnVsbCA/ICcnIDogJycgKyBzdHJpbmc7XG4gICAgICByZXR1cm4gdGVzdFJlZ2V4cC50ZXN0KHN0cmluZykgPyBzdHJpbmcucmVwbGFjZShyZXBsYWNlUmVnZXhwLCBlc2NhcGVyKSA6IHN0cmluZztcbiAgICB9O1xuICB9O1xuICBfLmVzY2FwZSA9IGNyZWF0ZUVzY2FwZXIoZXNjYXBlTWFwKTtcbiAgXy51bmVzY2FwZSA9IGNyZWF0ZUVzY2FwZXIodW5lc2NhcGVNYXApO1xuXG4gIC8vIElmIHRoZSB2YWx1ZSBvZiB0aGUgbmFtZWQgYHByb3BlcnR5YCBpcyBhIGZ1bmN0aW9uIHRoZW4gaW52b2tlIGl0IHdpdGggdGhlXG4gIC8vIGBvYmplY3RgIGFzIGNvbnRleHQ7IG90aGVyd2lzZSwgcmV0dXJuIGl0LlxuICBfLnJlc3VsdCA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHksIGZhbGxiYWNrKSB7XG4gICAgdmFyIHZhbHVlID0gb2JqZWN0ID09IG51bGwgPyB2b2lkIDAgOiBvYmplY3RbcHJvcGVydHldO1xuICAgIGlmICh2YWx1ZSA9PT0gdm9pZCAwKSB7XG4gICAgICB2YWx1ZSA9IGZhbGxiYWNrO1xuICAgIH1cbiAgICByZXR1cm4gXy5pc0Z1bmN0aW9uKHZhbHVlKSA/IHZhbHVlLmNhbGwob2JqZWN0KSA6IHZhbHVlO1xuICB9O1xuXG4gIC8vIEdlbmVyYXRlIGEgdW5pcXVlIGludGVnZXIgaWQgKHVuaXF1ZSB3aXRoaW4gdGhlIGVudGlyZSBjbGllbnQgc2Vzc2lvbikuXG4gIC8vIFVzZWZ1bCBmb3IgdGVtcG9yYXJ5IERPTSBpZHMuXG4gIHZhciBpZENvdW50ZXIgPSAwO1xuICBfLnVuaXF1ZUlkID0gZnVuY3Rpb24ocHJlZml4KSB7XG4gICAgdmFyIGlkID0gKytpZENvdW50ZXIgKyAnJztcbiAgICByZXR1cm4gcHJlZml4ID8gcHJlZml4ICsgaWQgOiBpZDtcbiAgfTtcblxuICAvLyBCeSBkZWZhdWx0LCBVbmRlcnNjb3JlIHVzZXMgRVJCLXN0eWxlIHRlbXBsYXRlIGRlbGltaXRlcnMsIGNoYW5nZSB0aGVcbiAgLy8gZm9sbG93aW5nIHRlbXBsYXRlIHNldHRpbmdzIHRvIHVzZSBhbHRlcm5hdGl2ZSBkZWxpbWl0ZXJzLlxuICBfLnRlbXBsYXRlU2V0dGluZ3MgPSB7XG4gICAgZXZhbHVhdGUgICAgOiAvPCUoW1xcc1xcU10rPyklPi9nLFxuICAgIGludGVycG9sYXRlIDogLzwlPShbXFxzXFxTXSs/KSU+L2csXG4gICAgZXNjYXBlICAgICAgOiAvPCUtKFtcXHNcXFNdKz8pJT4vZ1xuICB9O1xuXG4gIC8vIFdoZW4gY3VzdG9taXppbmcgYHRlbXBsYXRlU2V0dGluZ3NgLCBpZiB5b3UgZG9uJ3Qgd2FudCB0byBkZWZpbmUgYW5cbiAgLy8gaW50ZXJwb2xhdGlvbiwgZXZhbHVhdGlvbiBvciBlc2NhcGluZyByZWdleCwgd2UgbmVlZCBvbmUgdGhhdCBpc1xuICAvLyBndWFyYW50ZWVkIG5vdCB0byBtYXRjaC5cbiAgdmFyIG5vTWF0Y2ggPSAvKC4pXi87XG5cbiAgLy8gQ2VydGFpbiBjaGFyYWN0ZXJzIG5lZWQgdG8gYmUgZXNjYXBlZCBzbyB0aGF0IHRoZXkgY2FuIGJlIHB1dCBpbnRvIGFcbiAgLy8gc3RyaW5nIGxpdGVyYWwuXG4gIHZhciBlc2NhcGVzID0ge1xuICAgIFwiJ1wiOiAgICAgIFwiJ1wiLFxuICAgICdcXFxcJzogICAgICdcXFxcJyxcbiAgICAnXFxyJzogICAgICdyJyxcbiAgICAnXFxuJzogICAgICduJyxcbiAgICAnXFx1MjAyOCc6ICd1MjAyOCcsXG4gICAgJ1xcdTIwMjknOiAndTIwMjknXG4gIH07XG5cbiAgdmFyIGVzY2FwZXIgPSAvXFxcXHwnfFxccnxcXG58XFx1MjAyOHxcXHUyMDI5L2c7XG5cbiAgdmFyIGVzY2FwZUNoYXIgPSBmdW5jdGlvbihtYXRjaCkge1xuICAgIHJldHVybiAnXFxcXCcgKyBlc2NhcGVzW21hdGNoXTtcbiAgfTtcblxuICAvLyBKYXZhU2NyaXB0IG1pY3JvLXRlbXBsYXRpbmcsIHNpbWlsYXIgdG8gSm9obiBSZXNpZydzIGltcGxlbWVudGF0aW9uLlxuICAvLyBVbmRlcnNjb3JlIHRlbXBsYXRpbmcgaGFuZGxlcyBhcmJpdHJhcnkgZGVsaW1pdGVycywgcHJlc2VydmVzIHdoaXRlc3BhY2UsXG4gIC8vIGFuZCBjb3JyZWN0bHkgZXNjYXBlcyBxdW90ZXMgd2l0aGluIGludGVycG9sYXRlZCBjb2RlLlxuICAvLyBOQjogYG9sZFNldHRpbmdzYCBvbmx5IGV4aXN0cyBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuXG4gIF8udGVtcGxhdGUgPSBmdW5jdGlvbih0ZXh0LCBzZXR0aW5ncywgb2xkU2V0dGluZ3MpIHtcbiAgICBpZiAoIXNldHRpbmdzICYmIG9sZFNldHRpbmdzKSBzZXR0aW5ncyA9IG9sZFNldHRpbmdzO1xuICAgIHNldHRpbmdzID0gXy5kZWZhdWx0cyh7fSwgc2V0dGluZ3MsIF8udGVtcGxhdGVTZXR0aW5ncyk7XG5cbiAgICAvLyBDb21iaW5lIGRlbGltaXRlcnMgaW50byBvbmUgcmVndWxhciBleHByZXNzaW9uIHZpYSBhbHRlcm5hdGlvbi5cbiAgICB2YXIgbWF0Y2hlciA9IFJlZ0V4cChbXG4gICAgICAoc2V0dGluZ3MuZXNjYXBlIHx8IG5vTWF0Y2gpLnNvdXJjZSxcbiAgICAgIChzZXR0aW5ncy5pbnRlcnBvbGF0ZSB8fCBub01hdGNoKS5zb3VyY2UsXG4gICAgICAoc2V0dGluZ3MuZXZhbHVhdGUgfHwgbm9NYXRjaCkuc291cmNlXG4gICAgXS5qb2luKCd8JykgKyAnfCQnLCAnZycpO1xuXG4gICAgLy8gQ29tcGlsZSB0aGUgdGVtcGxhdGUgc291cmNlLCBlc2NhcGluZyBzdHJpbmcgbGl0ZXJhbHMgYXBwcm9wcmlhdGVseS5cbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBzb3VyY2UgPSBcIl9fcCs9J1wiO1xuICAgIHRleHQucmVwbGFjZShtYXRjaGVyLCBmdW5jdGlvbihtYXRjaCwgZXNjYXBlLCBpbnRlcnBvbGF0ZSwgZXZhbHVhdGUsIG9mZnNldCkge1xuICAgICAgc291cmNlICs9IHRleHQuc2xpY2UoaW5kZXgsIG9mZnNldCkucmVwbGFjZShlc2NhcGVyLCBlc2NhcGVDaGFyKTtcbiAgICAgIGluZGV4ID0gb2Zmc2V0ICsgbWF0Y2gubGVuZ3RoO1xuXG4gICAgICBpZiAoZXNjYXBlKSB7XG4gICAgICAgIHNvdXJjZSArPSBcIicrXFxuKChfX3Q9KFwiICsgZXNjYXBlICsgXCIpKT09bnVsbD8nJzpfLmVzY2FwZShfX3QpKStcXG4nXCI7XG4gICAgICB9IGVsc2UgaWYgKGludGVycG9sYXRlKSB7XG4gICAgICAgIHNvdXJjZSArPSBcIicrXFxuKChfX3Q9KFwiICsgaW50ZXJwb2xhdGUgKyBcIikpPT1udWxsPycnOl9fdCkrXFxuJ1wiO1xuICAgICAgfSBlbHNlIGlmIChldmFsdWF0ZSkge1xuICAgICAgICBzb3VyY2UgKz0gXCInO1xcblwiICsgZXZhbHVhdGUgKyBcIlxcbl9fcCs9J1wiO1xuICAgICAgfVxuXG4gICAgICAvLyBBZG9iZSBWTXMgbmVlZCB0aGUgbWF0Y2ggcmV0dXJuZWQgdG8gcHJvZHVjZSB0aGUgY29ycmVjdCBvZmZlc3QuXG4gICAgICByZXR1cm4gbWF0Y2g7XG4gICAgfSk7XG4gICAgc291cmNlICs9IFwiJztcXG5cIjtcblxuICAgIC8vIElmIGEgdmFyaWFibGUgaXMgbm90IHNwZWNpZmllZCwgcGxhY2UgZGF0YSB2YWx1ZXMgaW4gbG9jYWwgc2NvcGUuXG4gICAgaWYgKCFzZXR0aW5ncy52YXJpYWJsZSkgc291cmNlID0gJ3dpdGgob2JqfHx7fSl7XFxuJyArIHNvdXJjZSArICd9XFxuJztcblxuICAgIHNvdXJjZSA9IFwidmFyIF9fdCxfX3A9JycsX19qPUFycmF5LnByb3RvdHlwZS5qb2luLFwiICtcbiAgICAgIFwicHJpbnQ9ZnVuY3Rpb24oKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyk7fTtcXG5cIiArXG4gICAgICBzb3VyY2UgKyAncmV0dXJuIF9fcDtcXG4nO1xuXG4gICAgdHJ5IHtcbiAgICAgIHZhciByZW5kZXIgPSBuZXcgRnVuY3Rpb24oc2V0dGluZ3MudmFyaWFibGUgfHwgJ29iaicsICdfJywgc291cmNlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBlLnNvdXJjZSA9IHNvdXJjZTtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuXG4gICAgdmFyIHRlbXBsYXRlID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgcmV0dXJuIHJlbmRlci5jYWxsKHRoaXMsIGRhdGEsIF8pO1xuICAgIH07XG5cbiAgICAvLyBQcm92aWRlIHRoZSBjb21waWxlZCBzb3VyY2UgYXMgYSBjb252ZW5pZW5jZSBmb3IgcHJlY29tcGlsYXRpb24uXG4gICAgdmFyIGFyZ3VtZW50ID0gc2V0dGluZ3MudmFyaWFibGUgfHwgJ29iaic7XG4gICAgdGVtcGxhdGUuc291cmNlID0gJ2Z1bmN0aW9uKCcgKyBhcmd1bWVudCArICcpe1xcbicgKyBzb3VyY2UgKyAnfSc7XG5cbiAgICByZXR1cm4gdGVtcGxhdGU7XG4gIH07XG5cbiAgLy8gQWRkIGEgXCJjaGFpblwiIGZ1bmN0aW9uLiBTdGFydCBjaGFpbmluZyBhIHdyYXBwZWQgVW5kZXJzY29yZSBvYmplY3QuXG4gIF8uY2hhaW4gPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBfKG9iaik7XG4gICAgaW5zdGFuY2UuX2NoYWluID0gdHJ1ZTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH07XG5cbiAgLy8gT09QXG4gIC8vIC0tLS0tLS0tLS0tLS0tLVxuICAvLyBJZiBVbmRlcnNjb3JlIGlzIGNhbGxlZCBhcyBhIGZ1bmN0aW9uLCBpdCByZXR1cm5zIGEgd3JhcHBlZCBvYmplY3QgdGhhdFxuICAvLyBjYW4gYmUgdXNlZCBPTy1zdHlsZS4gVGhpcyB3cmFwcGVyIGhvbGRzIGFsdGVyZWQgdmVyc2lvbnMgb2YgYWxsIHRoZVxuICAvLyB1bmRlcnNjb3JlIGZ1bmN0aW9ucy4gV3JhcHBlZCBvYmplY3RzIG1heSBiZSBjaGFpbmVkLlxuXG4gIC8vIEhlbHBlciBmdW5jdGlvbiB0byBjb250aW51ZSBjaGFpbmluZyBpbnRlcm1lZGlhdGUgcmVzdWx0cy5cbiAgdmFyIHJlc3VsdCA9IGZ1bmN0aW9uKGluc3RhbmNlLCBvYmopIHtcbiAgICByZXR1cm4gaW5zdGFuY2UuX2NoYWluID8gXyhvYmopLmNoYWluKCkgOiBvYmo7XG4gIH07XG5cbiAgLy8gQWRkIHlvdXIgb3duIGN1c3RvbSBmdW5jdGlvbnMgdG8gdGhlIFVuZGVyc2NvcmUgb2JqZWN0LlxuICBfLm1peGluID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgXy5lYWNoKF8uZnVuY3Rpb25zKG9iaiksIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHZhciBmdW5jID0gX1tuYW1lXSA9IG9ialtuYW1lXTtcbiAgICAgIF8ucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhcmdzID0gW3RoaXMuX3dyYXBwZWRdO1xuICAgICAgICBwdXNoLmFwcGx5KGFyZ3MsIGFyZ3VtZW50cyk7XG4gICAgICAgIHJldHVybiByZXN1bHQodGhpcywgZnVuYy5hcHBseShfLCBhcmdzKSk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIEFkZCBhbGwgb2YgdGhlIFVuZGVyc2NvcmUgZnVuY3Rpb25zIHRvIHRoZSB3cmFwcGVyIG9iamVjdC5cbiAgXy5taXhpbihfKTtcblxuICAvLyBBZGQgYWxsIG11dGF0b3IgQXJyYXkgZnVuY3Rpb25zIHRvIHRoZSB3cmFwcGVyLlxuICBfLmVhY2goWydwb3AnLCAncHVzaCcsICdyZXZlcnNlJywgJ3NoaWZ0JywgJ3NvcnQnLCAnc3BsaWNlJywgJ3Vuc2hpZnQnXSwgZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciBtZXRob2QgPSBBcnJheVByb3RvW25hbWVdO1xuICAgIF8ucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgb2JqID0gdGhpcy5fd3JhcHBlZDtcbiAgICAgIG1ldGhvZC5hcHBseShvYmosIGFyZ3VtZW50cyk7XG4gICAgICBpZiAoKG5hbWUgPT09ICdzaGlmdCcgfHwgbmFtZSA9PT0gJ3NwbGljZScpICYmIG9iai5sZW5ndGggPT09IDApIGRlbGV0ZSBvYmpbMF07XG4gICAgICByZXR1cm4gcmVzdWx0KHRoaXMsIG9iaik7XG4gICAgfTtcbiAgfSk7XG5cbiAgLy8gQWRkIGFsbCBhY2Nlc3NvciBBcnJheSBmdW5jdGlvbnMgdG8gdGhlIHdyYXBwZXIuXG4gIF8uZWFjaChbJ2NvbmNhdCcsICdqb2luJywgJ3NsaWNlJ10sIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICB2YXIgbWV0aG9kID0gQXJyYXlQcm90b1tuYW1lXTtcbiAgICBfLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHJlc3VsdCh0aGlzLCBtZXRob2QuYXBwbHkodGhpcy5fd3JhcHBlZCwgYXJndW1lbnRzKSk7XG4gICAgfTtcbiAgfSk7XG5cbiAgLy8gRXh0cmFjdHMgdGhlIHJlc3VsdCBmcm9tIGEgd3JhcHBlZCBhbmQgY2hhaW5lZCBvYmplY3QuXG4gIF8ucHJvdG90eXBlLnZhbHVlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3dyYXBwZWQ7XG4gIH07XG5cbiAgLy8gUHJvdmlkZSB1bndyYXBwaW5nIHByb3h5IGZvciBzb21lIG1ldGhvZHMgdXNlZCBpbiBlbmdpbmUgb3BlcmF0aW9uc1xuICAvLyBzdWNoIGFzIGFyaXRobWV0aWMgYW5kIEpTT04gc3RyaW5naWZpY2F0aW9uLlxuICBfLnByb3RvdHlwZS52YWx1ZU9mID0gXy5wcm90b3R5cGUudG9KU09OID0gXy5wcm90b3R5cGUudmFsdWU7XG5cbiAgXy5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gJycgKyB0aGlzLl93cmFwcGVkO1xuICB9O1xuXG4gIC8vIEFNRCByZWdpc3RyYXRpb24gaGFwcGVucyBhdCB0aGUgZW5kIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQU1EIGxvYWRlcnNcbiAgLy8gdGhhdCBtYXkgbm90IGVuZm9yY2UgbmV4dC10dXJuIHNlbWFudGljcyBvbiBtb2R1bGVzLiBFdmVuIHRob3VnaCBnZW5lcmFsXG4gIC8vIHByYWN0aWNlIGZvciBBTUQgcmVnaXN0cmF0aW9uIGlzIHRvIGJlIGFub255bW91cywgdW5kZXJzY29yZSByZWdpc3RlcnNcbiAgLy8gYXMgYSBuYW1lZCBtb2R1bGUgYmVjYXVzZSwgbGlrZSBqUXVlcnksIGl0IGlzIGEgYmFzZSBsaWJyYXJ5IHRoYXQgaXNcbiAgLy8gcG9wdWxhciBlbm91Z2ggdG8gYmUgYnVuZGxlZCBpbiBhIHRoaXJkIHBhcnR5IGxpYiwgYnV0IG5vdCBiZSBwYXJ0IG9mXG4gIC8vIGFuIEFNRCBsb2FkIHJlcXVlc3QuIFRob3NlIGNhc2VzIGNvdWxkIGdlbmVyYXRlIGFuIGVycm9yIHdoZW4gYW5cbiAgLy8gYW5vbnltb3VzIGRlZmluZSgpIGlzIGNhbGxlZCBvdXRzaWRlIG9mIGEgbG9hZGVyIHJlcXVlc3QuXG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoJ3VuZGVyc2NvcmUnLCBbXSwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gXztcbiAgICB9KTtcbiAgfVxufS5jYWxsKHRoaXMpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3VuZGVyc2NvcmUvdW5kZXJzY29yZS5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBJUGFzcyB9IGZyb20gXCIuL2ludGVyZmFjZS9JUGFzc1wiO1xyXG5pbXBvcnQgeyBJQ29udGV4dCB9IGZyb20gXCIuL2ludGVyZmFjZS9JQ29udGV4dFwiO1xyXG5pbXBvcnQgeyBJVG9rZW5TdHJlYW0gfSBmcm9tIFwiLi9pbnRlcmZhY2UvSVRva2VuU3RyZWFtXCI7XHJcbmltcG9ydCB7IElQYXJzZU9wdGlvbnMgfSBmcm9tIFwiLi9pbnRlcmZhY2UvSVBhcnNlT3B0aW9uc1wiO1xyXG5cclxuaW1wb3J0IHsgVG9rZW5TdHJlYW0gfSBmcm9tIFwiLi9Ub2tlblN0cmVhbVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBhc3NCYXNlIGltcGxlbWVudHMgSVBhc3Mge1xyXG5cclxuICAgIHByb3RlY3RlZCBjb250ZXh0OiBJQ29udGV4dDtcclxuICAgIHByb3RlY3RlZCBzdHJlYW06IElUb2tlblN0cmVhbTtcclxuICAgIHByb3RlY3RlZCBvcHRpb25zOiBJUGFyc2VPcHRpb25zO1xyXG5cclxuICAgIHB1YmxpYyBwcm9jZXNzKGNvbnRleHQ6IElDb250ZXh0LCBvcHRpb25zOiBJUGFyc2VPcHRpb25zKTogSUNvbnRleHQge1xyXG5cclxuICAgICAgICAvLyBUT0RPIENPTlNUQU5UUyAtIG5lZWQgdG8gZGVmaW5lIGNvcmUgc2V0dGluZ3MgYXQgY29tcGlsZSB0aW1lXHJcbiAgICAgICAgLy8gVE9ETyBQLVNwYWNlXHJcbiAgICAgICAgLy8gVE9ETyA7cmVkY29kZSB0YWdzXHJcbiAgICAgICAgLy8gVE9ETyBzdHJpbmdpZnkgYW5kIEZPUiB2YXJpYWJsZXNcclxuICAgICAgICAvLyBUT0RPIGxvYWRlciBzaG91bGQgY2hlY2sgYWdhaW5zdCBydW4gb3B0aW9ucyBlLmcuIG5vIFAtc3BhY2UgZXRjLlxyXG5cclxuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG4gICAgICAgIHRoaXMuc3RyZWFtID0gbmV3IFRva2VuU3RyZWFtKGNvbnRleHQudG9rZW5zLCBjb250ZXh0Lm1lc3NhZ2VzKTtcclxuICAgICAgICB0aGlzLmNvbnRleHQudG9rZW5zID0gW107XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcclxuXHJcbiAgICAgICAgdGhpcy5wcm9jZXNzTGluZXMoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHByb2Nlc3NMaW5lcygpIHtcclxuXHJcbiAgICAgICAgd2hpbGUgKCF0aGlzLnN0cmVhbS5lb2YoKSkge1xyXG5cclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0xpbmUoKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0cmVhbS5yZWFkVG9FT0woKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgcHJvY2Vzc0xpbmUoKSB7XHJcblxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBhc3NCYXNlLnByb2Nlc3NMaW5lIGlzIGFuIEFic3RyYWN0IE1ldGhvZFwiKTtcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3BhcnNlci9QYXNzQmFzZS50cyIsIlxyXG5leHBvcnQgZW51bSBTdGFuZGFyZCB7XHJcbiAgICBJQ1dTODYsXHJcbiAgICBJQ1dTODgsXHJcbiAgICBJQ1dTOTRkcmFmdFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElQYXJzZU9wdGlvbnMge1xyXG5cclxuICAgIHN0YW5kYXJkPzogU3RhbmRhcmQ7XHJcbiAgICBjb3Jlc2l6ZT86IG51bWJlcjtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYXJzZXIvaW50ZXJmYWNlL0lQYXJzZU9wdGlvbnMudHMiLCJpbXBvcnQgeyBJUG9zaXRpb24gfSBmcm9tIFwiLi9JVG9rZW5cIjtcclxuXHJcbmV4cG9ydCBlbnVtIE1lc3NhZ2VUeXBlIHtcclxuICAgIEVycm9yLFxyXG4gICAgV2FybmluZyxcclxuICAgIEluZm9cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTWVzc2FnZSB7XHJcblxyXG4gICAgdHlwZTogTWVzc2FnZVR5cGU7XHJcbiAgICBwb3NpdGlvbjogSVBvc2l0aW9uO1xyXG4gICAgdGV4dDogc3RyaW5nO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3BhcnNlci9pbnRlcmZhY2UvSU1lc3NhZ2UudHMiLCJpbXBvcnQgeyBJT3BlcmFuZCB9IGZyb20gXCIuL0lPcGVyYW5kXCI7XHJcblxyXG5leHBvcnQgZW51bSBPcGNvZGVUeXBlIHtcclxuICAgIERBVCA9IDAsXHJcbiAgICBNT1YsXHJcbiAgICBBREQsXHJcbiAgICBTVUIsXHJcbiAgICBNVUwsXHJcbiAgICBESVYsXHJcbiAgICBNT0QsXHJcbiAgICBKTVAsXHJcbiAgICBKTVosXHJcbiAgICBKTU4sXHJcbiAgICBESk4sXHJcbiAgICBDTVAsXHJcbiAgICBTRVEsXHJcbiAgICBTTkUsXHJcbiAgICBTTFQsXHJcbiAgICBTUEwsXHJcbiAgICBOT1AsXHJcbiAgICBDb3VudFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBNb2RpZmllclR5cGUge1xyXG4gICAgQSA9IDAsXHJcbiAgICBCLFxyXG4gICAgQUIsXHJcbiAgICBCQSxcclxuICAgIEYsXHJcbiAgICBYLFxyXG4gICAgSSxcclxuICAgIENvdW50XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUluc3RydWN0aW9uIHtcclxuXHJcbiAgICBhZGRyZXNzOiBudW1iZXI7XHJcbiAgICBvcGNvZGU6IE9wY29kZVR5cGU7XHJcbiAgICBtb2RpZmllcjogTW9kaWZpZXJUeXBlO1xyXG4gICAgYU9wZXJhbmQ6IElPcGVyYW5kO1xyXG4gICAgYk9wZXJhbmQ6IElPcGVyYW5kO1xyXG59IFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NpbXVsYXRvci9pbnRlcmZhY2UvSUluc3RydWN0aW9uLnRzIiwiXHJcbmV4cG9ydCBlbnVtIE1vZGVUeXBlIHtcclxuICAgIEltbWVkaWF0ZSwgICAgICAvLyAjXHJcbiAgICBEaXJlY3QsICAgICAgICAgLy8gJFxyXG4gICAgQUluZGlyZWN0LCAgICAgIC8vICpcclxuICAgIEJJbmRpcmVjdCwgICAgICAvLyBAXHJcbiAgICBBUHJlRGVjcmVtZW50LCAgLy8ge1xyXG4gICAgQlByZURlY3JlbWVudCwgIC8vIDxcclxuICAgIEFQb3N0SW5jcmVtZW50LCAvLyB9XHJcbiAgICBCUG9zdEluY3JlbWVudCAgLy8gPlxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElPcGVyYW5kIHtcclxuXHJcbiAgICBtb2RlOiBNb2RlVHlwZTtcclxuICAgIGFkZHJlc3M6IG51bWJlcjtcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NpbXVsYXRvci9pbnRlcmZhY2UvSU9wZXJhbmQudHMiLCJpbXBvcnQgeyBJVG9rZW4sIFRva2VuQ2F0ZWdvcnkgfSBmcm9tIFwiLi9pbnRlcmZhY2UvSVRva2VuXCI7XHJcbmltcG9ydCB7IElNZXNzYWdlLCBNZXNzYWdlVHlwZSB9IGZyb20gXCIuL2ludGVyZmFjZS9JTWVzc2FnZVwiO1xyXG5pbXBvcnQgeyBJVG9rZW5TdHJlYW0gfSBmcm9tIFwiLi9pbnRlcmZhY2UvSVRva2VuU3RyZWFtXCI7XHJcblxyXG5pbXBvcnQgeyBUb2tlbkhlbHBlciB9IGZyb20gXCIuL1Rva2VuSGVscGVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVG9rZW5TdHJlYW0gaW1wbGVtZW50cyBJVG9rZW5TdHJlYW0ge1xyXG5cclxuICAgIHB1YmxpYyBwb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgcHVibGljIHRva2VuczogSVRva2VuW107XHJcbiAgICBwcml2YXRlIG1lc3NhZ2VzOiBJTWVzc2FnZVtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRva2VuczogSVRva2VuW10sIG1lc3NhZ2VzOiBJTWVzc2FnZVtdKSB7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IDA7XHJcbiAgICAgICAgdGhpcy50b2tlbnMgPSB0b2tlbnM7XHJcbiAgICAgICAgdGhpcy5tZXNzYWdlcyA9IG1lc3NhZ2VzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlb2YoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zaXRpb24gPj0gdGhpcy50b2tlbnMubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwZWVrKCk6IElUb2tlbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9rZW5zW3RoaXMucG9zaXRpb25dO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWFkKCk6IElUb2tlbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9rZW5zW3RoaXMucG9zaXRpb24rK107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlYWRUb0VPTCgpOiBJVG9rZW5bXXtcclxuICAgICAgICB2YXIgcmVzdWx0OiBJVG9rZW5bXSA9IFtdO1xyXG5cclxuICAgICAgICB3aGlsZSAoIXRoaXMuZW9mKCkpIHtcclxuICAgICAgICAgICAgdmFyIHRva2VuID0gdGhpcy5yZWFkKCk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRva2VuKTtcclxuICAgICAgICAgICAgaWYgKHRva2VuLmNhdGVnb3J5ID09PSBUb2tlbkNhdGVnb3J5LkVPTCkge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHdhcm4odG9rZW46IElUb2tlbiwgbWVzc2FnZTogc3RyaW5nKSB7XHJcblxyXG4gICAgICAgIHRoaXMubWVzc2FnZXMucHVzaCh7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiB0b2tlbi5wb3NpdGlvbixcclxuICAgICAgICAgICAgdGV4dDogbWVzc2FnZSxcclxuICAgICAgICAgICAgdHlwZTogTWVzc2FnZVR5cGUuV2FybmluZ1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBleHBlY3RPbmx5KGxleGVtZTogc3RyaW5nKTogSVRva2VuIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZW9mKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5lcnJvcihfKHRoaXMudG9rZW5zKS5sYXN0KCksIFwiRXhwZWN0ZWQgJ1wiICsgbGV4ZW1lICsgXCInLCBnb3QgZW5kIG9mIGZpbGVcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgdG9rZW4gPSB0aGlzLnJlYWQoKTtcclxuXHJcbiAgICAgICAgaWYgKHRva2VuLmxleGVtZSAhPT0gbGV4ZW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXhwZWN0ZWQoXCInXCIgKyBsZXhlbWUgKyBcIidcIiwgdG9rZW4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRva2VuO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBleHBlY3QoY2F0ZWdvcnk6IFRva2VuQ2F0ZWdvcnkpOiBJVG9rZW4ge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5lb2YoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmVycm9yKFxyXG4gICAgICAgICAgICAgICAgXyh0aGlzLnRva2VucykubGFzdCgpLFxyXG4gICAgICAgICAgICAgICAgXCJFeHBlY3RlZCAnXCIgKyBUb2tlbkhlbHBlci5jYXRlZ29yeVRvU3RyaW5nKGNhdGVnb3J5KSArIFwiJywgZ290IGVuZCBvZiBmaWxlXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHRva2VuID0gdGhpcy5yZWFkKCk7XHJcblxyXG4gICAgICAgIGlmICh0b2tlbi5jYXRlZ29yeSAhPT0gY2F0ZWdvcnkpIHtcclxuICAgICAgICAgICAgdGhpcy5leHBlY3RlZChUb2tlbkhlbHBlci5jYXRlZ29yeVRvU3RyaW5nKGNhdGVnb3J5KSwgdG9rZW4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRva2VuO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBleHBlY3RlZChleHBlY3RlZDogc3RyaW5nLCBnb3Q6IElUb2tlbikge1xyXG5cclxuICAgICAgICB0aGlzLm1lc3NhZ2VzLnB1c2goe1xyXG4gICAgICAgICAgICB0eXBlOiBNZXNzYWdlVHlwZS5FcnJvcixcclxuICAgICAgICAgICAgcG9zaXRpb246IGdvdC5wb3NpdGlvbixcclxuICAgICAgICAgICAgdGV4dDogXCJFeHBlY3RlZCBcIiArIGV4cGVjdGVkICsgXCIsIGdvdCBcIiArIFRva2VuSGVscGVyLnRva2VuVG9TdHJpbmcoZ290KVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRocm93IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVycm9yKHRva2VuOiBJVG9rZW4sIG1lc3NhZ2U6IHN0cmluZykge1xyXG5cclxuICAgICAgICB0aGlzLm1lc3NhZ2VzLnB1c2goe1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogdG9rZW4ucG9zaXRpb24sXHJcbiAgICAgICAgICAgIHRleHQ6IG1lc3NhZ2UsXHJcbiAgICAgICAgICAgIHR5cGU6IE1lc3NhZ2VUeXBlLkVycm9yXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhyb3cgXCJcIjtcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3BhcnNlci9Ub2tlblN0cmVhbS50cyIsImltcG9ydCB7IElUYXNrIH0gZnJvbSBcIi4vSVRhc2tcIjtcclxuaW1wb3J0IHsgSUxpdGVFdmVudCB9IGZyb20gXCIuLi8uLi9tb2R1bGVzL0xpdGVFdmVudFwiO1xyXG5pbXBvcnQgeyBJT3B0aW9ucyB9IGZyb20gXCIuL0lPcHRpb25zXCI7XHJcbmltcG9ydCB7IElJbnN0cnVjdGlvbiB9IGZyb20gXCIuL0lJbnN0cnVjdGlvblwiO1xyXG5cclxuZXhwb3J0IGVudW0gQ29yZUFjY2Vzc1R5cGUge1xyXG4gICAgcmVhZCxcclxuICAgIHdyaXRlLFxyXG4gICAgZXhlY3V0ZVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElDb3JlQWNjZXNzRXZlbnRBcmdzIHtcclxuXHJcbiAgICB0YXNrOiBJVGFzaztcclxuICAgIGFkZHJlc3M6IG51bWJlcjtcclxuICAgIGFjY2Vzc1R5cGU6IENvcmVBY2Nlc3NUeXBlO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElDb3JlIHtcclxuXHJcbiAgICBjb3JlQWNjZXNzOiBJTGl0ZUV2ZW50PElDb3JlQWNjZXNzRXZlbnRBcmdzPjtcclxuXHJcbiAgICBpbml0aWFsaXNlKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZDtcclxuICAgIGdldFNpemUoKTogbnVtYmVyO1xyXG4gICAgd3JhcChhZGRyZXNzOiBudW1iZXIpOiBudW1iZXI7XHJcbiAgICBleGVjdXRlQXQodGFzazogSVRhc2ssIGFkZHJlc3M6IG51bWJlcik6IElJbnN0cnVjdGlvbjtcclxuICAgIHJlYWRBdCh0YXNrOiBJVGFzaywgYWRkcmVzczogbnVtYmVyKTogSUluc3RydWN0aW9uO1xyXG4gICAgZ2V0QXQoYWRkcmVzczogbnVtYmVyKTogSUluc3RydWN0aW9uO1xyXG4gICAgc2V0QXQodGFzazogSVRhc2ssIGFkZHJlc3M6IG51bWJlciwgaW5zdHJ1Y3Rpb246IElJbnN0cnVjdGlvbik6IHZvaWQ7XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zaW11bGF0b3IvaW50ZXJmYWNlL0lDb3JlLnRzIiwiaW1wb3J0IHsgSU9wdGlvbnMgfSBmcm9tIFwiLi9pbnRlcmZhY2UvSU9wdGlvbnNcIjtcclxuaW1wb3J0IHsgSUluc3RydWN0aW9uLCBPcGNvZGVUeXBlLCBNb2RpZmllclR5cGUgfSBmcm9tIFwiLi9pbnRlcmZhY2UvSUluc3RydWN0aW9uXCI7XHJcbmltcG9ydCB7IE1vZGVUeXBlIH0gZnJvbSBcIi4vaW50ZXJmYWNlL0lPcGVyYW5kXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZWZhdWx0cyBpbXBsZW1lbnRzIElPcHRpb25zIHtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNvcmVzaXplOiBudW1iZXIgPSA4MDAwO1xyXG4gICAgcHVibGljIHN0YXRpYyBjeWNsZXNCZWZvcmVUaWU6IG51bWJlciA9IDgwMDAwO1xyXG4gICAgcHVibGljIHN0YXRpYyBpbml0aWFsSW5zdHJ1Y3Rpb246IElJbnN0cnVjdGlvbiA9IHtcclxuICAgICAgICBhZGRyZXNzOiAwLFxyXG4gICAgICAgIG9wY29kZTogT3Bjb2RlVHlwZS5EQVQsXHJcbiAgICAgICAgbW9kaWZpZXI6IE1vZGlmaWVyVHlwZS5GLFxyXG4gICAgICAgIGFPcGVyYW5kOiB7XHJcbiAgICAgICAgICAgIG1vZGU6IE1vZGVUeXBlLkRpcmVjdCxcclxuICAgICAgICAgICAgYWRkcmVzczogMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYk9wZXJhbmQ6IHtcclxuICAgICAgICAgICAgbW9kZTogTW9kZVR5cGUuRGlyZWN0LFxyXG4gICAgICAgICAgICBhZGRyZXNzOiAwXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHB1YmxpYyBzdGF0aWMgaW5zdHJ1Y3Rpb25MaW1pdDogbnVtYmVyID0gMTAwO1xyXG4gICAgcHVibGljIHN0YXRpYyBtYXhUYXNrczogbnVtYmVyID0gODAwMDtcclxuICAgIHB1YmxpYyBzdGF0aWMgbWluU2VwYXJhdGlvbjogbnVtYmVyID0gMTAwO1xyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2ltdWxhdG9yL0RlZmF1bHRzLnRzIiwiaW1wb3J0IHsgSVBhcnNlciB9IGZyb20gXCIuLi9wYXJzZXIvSW50ZXJmYWNlL0lQYXJzZXJcIjtcclxuaW1wb3J0IHsgSVBhcnNlUmVzdWx0IH0gZnJvbSBcIi4uL3BhcnNlci9JbnRlcmZhY2UvSVBhcnNlUmVzdWx0XCI7XHJcbmltcG9ydCB7IElTZXJpYWxpc2VyIH0gZnJvbSBcIi4uL3BhcnNlci9JbnRlcmZhY2UvSVNlcmlhbGlzZXJcIjtcclxuaW1wb3J0IHsgSU1lc3NhZ2UsIE1lc3NhZ2VUeXBlIH0gZnJvbSBcIi4uL3BhcnNlci9JbnRlcmZhY2UvSU1lc3NhZ2VcIjtcclxuXHJcbmltcG9ydCB7IElTaW11bGF0b3IgfSBmcm9tIFwiLi4vc2ltdWxhdG9yL0ludGVyZmFjZS9JU2ltdWxhdG9yXCI7XHJcbmltcG9ydCB7IElDb3JlIH0gZnJvbSBcIi4uL3NpbXVsYXRvci9JbnRlcmZhY2UvSUNvcmVcIjtcclxuaW1wb3J0IHsgSUV4ZWN1dGl2ZSB9IGZyb20gXCIuLi9zaW11bGF0b3IvSW50ZXJmYWNlL0lFeGVjdXRpdmVcIjtcclxuaW1wb3J0IHsgT3Bjb2RlVHlwZSwgTW9kaWZpZXJUeXBlIH0gZnJvbSBcIi4uL3NpbXVsYXRvci9JbnRlcmZhY2UvSUluc3RydWN0aW9uXCI7XHJcbmltcG9ydCBEZWZhdWx0cyBmcm9tIFwiLi4vc2ltdWxhdG9yL0RlZmF1bHRzXCI7XHJcblxyXG5pbXBvcnQgeyBQYXJzZXIgfSBmcm9tIFwiLi4vcGFyc2VyL1BhcnNlclwiO1xyXG5pbXBvcnQgeyBTY2FubmVyIH0gZnJvbSBcIi4uL3BhcnNlci9TY2FubmVyXCI7XHJcbmltcG9ydCB7IEZvclBhc3MgfSBmcm9tIFwiLi4vcGFyc2VyL0ZvclBhc3NcIjtcclxuaW1wb3J0IHsgUHJlcHJvY2Vzc0NvbGxlY3RvciB9IGZyb20gXCIuLi9wYXJzZXIvUHJlcHJvY2Vzc0NvbGxlY3RvclwiO1xyXG5pbXBvcnQgeyBQcmVwcm9jZXNzQW5hbHlzZXIgfSBmcm9tIFwiLi4vcGFyc2VyL1ByZXByb2Nlc3NBbmFseXNlclwiO1xyXG5pbXBvcnQgeyBQcmVwcm9jZXNzRW1pdHRlciB9IGZyb20gXCIuLi9wYXJzZXIvUHJlcHJvY2Vzc0VtaXR0ZXJcIjtcclxuaW1wb3J0IHsgTGFiZWxDb2xsZWN0b3IgfSBmcm9tIFwiLi4vcGFyc2VyL0xhYmVsQ29sbGVjdG9yXCI7XHJcbmltcG9ydCB7IExhYmVsRW1pdHRlciB9IGZyb20gXCIuLi9wYXJzZXIvTGFiZWxFbWl0dGVyXCI7XHJcbmltcG9ydCB7IE1hdGhzUHJvY2Vzc29yIH0gZnJvbSBcIi4uL3BhcnNlci9NYXRoc1Byb2Nlc3NvclwiO1xyXG5pbXBvcnQgeyBFeHByZXNzaW9uIH0gZnJvbSBcIi4uL3BhcnNlci9FeHByZXNzaW9uXCI7XHJcbmltcG9ydCB7IEZpbHRlciB9IGZyb20gXCIuLi9wYXJzZXIvRmlsdGVyXCI7XHJcbmltcG9ydCB7IERlZmF1bHRQYXNzIH0gZnJvbSBcIi4uL3BhcnNlci9EZWZhdWx0UGFzc1wiO1xyXG5pbXBvcnQgeyBPcmdQYXNzIH0gZnJvbSBcIi4uL3BhcnNlci9PcmdQYXNzXCI7XHJcbmltcG9ydCB7IFN5bnRheENoZWNrIH0gZnJvbSBcIi4uL3BhcnNlci9TeW50YXhDaGVja1wiO1xyXG5pbXBvcnQgeyBMb2FkRmlsZVNlcmlhbGlzZXIgfSBmcm9tIFwiLi4vcGFyc2VyL0xvYWRGaWxlU2VyaWFsaXNlclwiO1xyXG5pbXBvcnQgeyBJbGxlZ2FsQ29tbWFuZENoZWNrIH0gZnJvbSBcIi4uL3BhcnNlci9JbGxlZ2FsQ29tbWFuZENoZWNrXCI7XHJcblxyXG5pbXBvcnQgeyBSYW5kb20gfSBmcm9tIFwiLi4vc2ltdWxhdG9yL1JhbmRvbVwiO1xyXG5pbXBvcnQgeyBFeGVjdXRpdmUgfSBmcm9tIFwiLi4vc2ltdWxhdG9yL0V4ZWN1dGl2ZVwiO1xyXG5pbXBvcnQgeyBEZWNvZGVyIH0gZnJvbSBcIi4uL3NpbXVsYXRvci9EZWNvZGVyXCI7XHJcbmltcG9ydCB7IENvcmUgfSBmcm9tIFwiLi4vc2ltdWxhdG9yL0NvcmVcIjtcclxuaW1wb3J0IHsgTG9hZGVyIH0gZnJvbSBcIi4uL3NpbXVsYXRvci9Mb2FkZXJcIjtcclxuaW1wb3J0IHsgV2FycmlvckxvYWRlciB9IGZyb20gXCIuLi9zaW11bGF0b3IvV2FycmlvckxvYWRlclwiO1xyXG5pbXBvcnQgeyBGZXRjaGVyIH0gZnJvbSBcIi4uL3NpbXVsYXRvci9GZXRjaGVyXCI7XHJcbmltcG9ydCB7IFNpbXVsYXRvciB9IGZyb20gXCIuLi9zaW11bGF0b3IvU2ltdWxhdG9yXCI7XHJcbmltcG9ydCB7IEVuZENvbmRpdGlvbiB9IGZyb20gXCIuLi9zaW11bGF0b3IvRW5kQ29uZGl0aW9uXCI7XHJcblxyXG5pbXBvcnQgeyBJbnN0cnVjdGlvblNlcmlhbGlzZXIgfSBmcm9tIFwiLi9QcmVzZW50YXRpb24vSW5zdHJ1Y3Rpb25TZXJpYWxpc2VyXCI7XHJcbmltcG9ydCB7IENvcmVSZW5kZXJlciB9IGZyb20gXCIuL1ByZXNlbnRhdGlvbi9Db3JlUmVuZGVyZXJcIjtcclxuaW1wb3J0IHsgUHJlc2VudGVyIH0gZnJvbSBcIi4vUHJlc2VudGF0aW9uL1ByZXNlbnRlclwiO1xyXG5cclxudmFyIHJlZGNvZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlZGNvZGVcIik7XHJcbnZhciBsb2FkZmlsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9hZGZpbGVcIik7XHJcbnZhciBjb25zb2xlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb25zb2xlXCIpO1xyXG52YXIgc3RhbmRhcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YW5kYXJkXCIpO1xyXG52YXIgcGFyc2VCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhcnNlQnV0dG9uXCIpO1xyXG52YXIgcnVuQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJydW5CdXR0b25cIik7XHJcbnZhciBzdGVwQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGVwQnV0dG9uXCIpO1xyXG52YXIgY2FudmFzID0gPEhUTUxDYW52YXNFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIpO1xyXG52YXIgaW5zdHJ1Y3Rpb25MYWJlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5zdHJ1Y3Rpb25MYWJlbFwiKTtcclxuXHJcbnZhciBleHByZXNzaW9uID0gbmV3IEV4cHJlc3Npb24oKTtcclxuXHJcbnZhciBwYXJzZXIgPSBuZXcgUGFyc2VyKFxyXG4gICAgbmV3IFNjYW5uZXIoKSxcclxuICAgIG5ldyBGaWx0ZXIoKSxcclxuICAgIG5ldyBGb3JQYXNzKGV4cHJlc3Npb24pLFxyXG4gICAgbmV3IFByZXByb2Nlc3NDb2xsZWN0b3IoKSxcclxuICAgIG5ldyBQcmVwcm9jZXNzQW5hbHlzZXIoKSxcclxuICAgIG5ldyBQcmVwcm9jZXNzRW1pdHRlcigpLFxyXG4gICAgbmV3IExhYmVsQ29sbGVjdG9yKCksXHJcbiAgICBuZXcgTGFiZWxFbWl0dGVyKCksXHJcbiAgICBuZXcgTWF0aHNQcm9jZXNzb3IoZXhwcmVzc2lvbiksXHJcbiAgICBuZXcgRGVmYXVsdFBhc3MoKSxcclxuICAgIG5ldyBPcmdQYXNzKCksXHJcbiAgICBuZXcgU3ludGF4Q2hlY2soKSxcclxuICAgIG5ldyBJbGxlZ2FsQ29tbWFuZENoZWNrKCkpO1xyXG5cclxudmFyIGNvcmUgPSBuZXcgQ29yZSgpO1xyXG5cclxudmFyIGxvYWRlciA9IG5ldyBMb2FkZXIoXHJcbiAgICBuZXcgUmFuZG9tKCksXHJcbiAgICBjb3JlLFxyXG4gICAgbmV3IFdhcnJpb3JMb2FkZXIoY29yZSkpO1xyXG5cclxudmFyIGZldGNoZXIgPSBuZXcgRmV0Y2hlcigpO1xyXG52YXIgZXhlY3V0aXZlID0gbmV3IEV4ZWN1dGl2ZSgpO1xyXG52YXIgZGVjb2RlciA9IG5ldyBEZWNvZGVyKGV4ZWN1dGl2ZSk7XHJcblxyXG52YXIgc2ltdWxhdG9yID0gbmV3IFNpbXVsYXRvcihcclxuICAgIGNvcmUsXHJcbiAgICBsb2FkZXIsXHJcbiAgICBmZXRjaGVyLFxyXG4gICAgZGVjb2RlcixcclxuICAgIGV4ZWN1dGl2ZSxcclxuICAgIG5ldyBFbmRDb25kaXRpb24oKSk7XHJcblxyXG52YXIgcHJleiA9IG5ldyBQcmVzZW50ZXIoXHJcbiAgICA8SFRNTFRleHRBcmVhRWxlbWVudD5yZWRjb2RlLFxyXG4gICAgPEhUTUxUZXh0QXJlYUVsZW1lbnQ+bG9hZGZpbGUsXHJcbiAgICA8SFRNTFVMaXN0RWxlbWVudD5jb25zb2xlLFxyXG4gICAgPEhUTUxTZWxlY3RFbGVtZW50PnN0YW5kYXJkLFxyXG4gICAgcGFyc2VyLFxyXG4gICAgbmV3IExvYWRGaWxlU2VyaWFsaXNlcigpLFxyXG4gICAgc2ltdWxhdG9yLFxyXG4gICAgY29yZSxcclxuICAgIGV4ZWN1dGl2ZSk7XHJcblxyXG52YXIgY29yZVJlbmRlcmVyOiBDb3JlUmVuZGVyZXI7XHJcblxyXG5wYXJzZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgcHJlei5wYXJzZSgpO1xyXG59KTtcclxuXHJcbnJ1bkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwoKSA9PiB7XHJcblxyXG4gICAgY29yZVJlbmRlcmVyID0gbmV3IENvcmVSZW5kZXJlcihcclxuICAgICAgICBjYW52YXMsXHJcbiAgICAgICAgPEhUTUxQYXJhZ3JhcGhFbGVtZW50Pmluc3RydWN0aW9uTGFiZWwsXHJcbiAgICAgICAgY29yZSxcclxuICAgICAgICBuZXcgSW5zdHJ1Y3Rpb25TZXJpYWxpc2VyKCkpO1xyXG4gICAgcHJlei5ydW4oKTtcclxuICAgIGNvcmVSZW5kZXJlci5pbml0aWFsaXNlKCk7XHJcbn0pO1xyXG5cclxuc3RlcEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgcHJlei5zdGVwKCk7XHJcblxyXG4gICAgY29yZVJlbmRlcmVyLnJlbmRlcigpO1xyXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3Jld2FyL2FwcC50cyIsImltcG9ydCB7IElQYXJzZXIgfSBmcm9tIFwiLi9pbnRlcmZhY2UvSVBhcnNlclwiO1xyXG5pbXBvcnQgeyBJUGFzcyB9IGZyb20gXCIuL2ludGVyZmFjZS9JUGFzc1wiO1xyXG5pbXBvcnQgeyBJU2Nhbm5lciB9IGZyb20gXCIuL2ludGVyZmFjZS9JU2Nhbm5lclwiO1xyXG5pbXBvcnQgeyBJQ29udGV4dCB9IGZyb20gXCIuL2ludGVyZmFjZS9JQ29udGV4dFwiO1xyXG5pbXBvcnQgeyBJTWVzc2FnZSwgTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi9pbnRlcmZhY2UvSU1lc3NhZ2VcIjtcclxuaW1wb3J0IHsgSVBhcnNlT3B0aW9ucywgU3RhbmRhcmQgfSBmcm9tIFwiLi9pbnRlcmZhY2UvSVBhcnNlT3B0aW9uc1wiO1xyXG5pbXBvcnQgeyBJUGFyc2VSZXN1bHQgfSBmcm9tIFwiLi9pbnRlcmZhY2UvSVBhcnNlUmVzdWx0XCI7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSBcInVuZGVyc2NvcmVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBQYXJzZXIgaW1wbGVtZW50cyBJUGFyc2VyIHtcclxuXHJcbiAgICBwcml2YXRlIHNjYW5uZXI6IElTY2FubmVyO1xyXG4gICAgcHJpdmF0ZSBmaWx0ZXI6IElQYXNzO1xyXG4gICAgcHJpdmF0ZSBmb3JQYXNzOiBJUGFzcztcclxuICAgIHByaXZhdGUgcHJlcHJvY2Vzc0NvbGxlY3RvcjogSVBhc3M7XHJcbiAgICBwcml2YXRlIHByZXByb2Nlc3NBbmFseXNlcjogSVBhc3M7XHJcbiAgICBwcml2YXRlIHByZXByb2Nlc3NFbWl0dGVyOiBJUGFzcztcclxuICAgIHByaXZhdGUgbGFiZWxDb2xsZWN0b3I6IElQYXNzO1xyXG4gICAgcHJpdmF0ZSBsYWJlbEVtaXR0ZXI6IElQYXNzO1xyXG4gICAgcHJpdmF0ZSBtYXRoc1Byb2Nlc3NvcjogSVBhc3M7XHJcbiAgICBwcml2YXRlIGRlZmF1bHRQYXNzOiBJUGFzcztcclxuICAgIHByaXZhdGUgb3JnUGFzczogSVBhc3M7XHJcbiAgICBwcml2YXRlIHN5bnRheENoZWNrOiBJUGFzcztcclxuICAgIHByaXZhdGUgaWxsZWdhbENvbW1hbmRDaGVjazogSVBhc3M7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBEZWZhdWx0T3B0aW9uczogSVBhcnNlT3B0aW9ucyA9IHtcclxuICAgICAgICBzdGFuZGFyZDogU3RhbmRhcmQuSUNXUzk0ZHJhZnQsXHJcbiAgICAgICAgY29yZXNpemU6IDgxOTJcclxuICAgIH07XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgc2Nhbm5lcjogSVNjYW5uZXIsXHJcbiAgICAgICAgZmlsdGVyOiBJUGFzcyxcclxuICAgICAgICBmb3JQYXNzOiBJUGFzcyxcclxuICAgICAgICBwcmVwcm9jZXNzQ29sbGVjdG9yOiBJUGFzcyxcclxuICAgICAgICBwcmVwcm9jZXNzQW5hbHlzZXI6IElQYXNzLFxyXG4gICAgICAgIHByZXByb2Nlc3NFbWl0dGVyOiBJUGFzcyxcclxuICAgICAgICBsYWJlbENvbGxlY3RvcjogSVBhc3MsXHJcbiAgICAgICAgbGFiZWxFbWl0dGVyOiBJUGFzcyxcclxuICAgICAgICBtYXRoc1Byb2Nlc3NvcjogSVBhc3MsXHJcbiAgICAgICAgZGVmYXVsdFBhc3M6IElQYXNzLFxyXG4gICAgICAgIG9yZ1Bhc3M6IElQYXNzLFxyXG4gICAgICAgIHN5bnRheENoZWNrOiBJUGFzcyxcclxuICAgICAgICBpbGxlZ2FsQ29tbWFuZENoZWNrOiBJUGFzcykge1xyXG5cclxuICAgICAgICB0aGlzLnNjYW5uZXIgPSBzY2FubmVyO1xyXG4gICAgICAgIHRoaXMuZmlsdGVyID0gZmlsdGVyO1xyXG4gICAgICAgIHRoaXMuZm9yUGFzcyA9IGZvclBhc3M7XHJcbiAgICAgICAgdGhpcy5wcmVwcm9jZXNzQ29sbGVjdG9yID0gcHJlcHJvY2Vzc0NvbGxlY3RvcjtcclxuICAgICAgICB0aGlzLnByZXByb2Nlc3NBbmFseXNlciA9IHByZXByb2Nlc3NBbmFseXNlcjtcclxuICAgICAgICB0aGlzLnByZXByb2Nlc3NFbWl0dGVyID0gcHJlcHJvY2Vzc0VtaXR0ZXI7XHJcbiAgICAgICAgdGhpcy5sYWJlbENvbGxlY3RvciA9IGxhYmVsQ29sbGVjdG9yO1xyXG4gICAgICAgIHRoaXMubGFiZWxFbWl0dGVyID0gbGFiZWxFbWl0dGVyO1xyXG4gICAgICAgIHRoaXMubWF0aHNQcm9jZXNzb3IgPSBtYXRoc1Byb2Nlc3NvcjtcclxuICAgICAgICB0aGlzLmRlZmF1bHRQYXNzID0gZGVmYXVsdFBhc3M7XHJcbiAgICAgICAgdGhpcy5vcmdQYXNzID0gb3JnUGFzcztcclxuICAgICAgICB0aGlzLnN5bnRheENoZWNrID0gc3ludGF4Q2hlY2s7XHJcbiAgICAgICAgdGhpcy5pbGxlZ2FsQ29tbWFuZENoZWNrID0gaWxsZWdhbENvbW1hbmRDaGVjaztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG5vRXJyb3JzKGNvbnRleHQ6IElDb250ZXh0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICFfKGNvbnRleHQubWVzc2FnZXMpLmFueSgobWVzc2FnZTogSU1lc3NhZ2UpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UudHlwZSA9PT0gTWVzc2FnZVR5cGUuRXJyb3I7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBhcnNlKGRvY3VtZW50OiBzdHJpbmcsIG9wdGlvbnM/OiBJUGFyc2VPcHRpb25zKTogSVBhcnNlUmVzdWx0IHtcclxuXHJcbiAgICAgICAgb3B0aW9ucyA9IF8uZGVmYXVsdHMob3B0aW9ucyB8fCB7fSwgUGFyc2VyLkRlZmF1bHRPcHRpb25zKTtcclxuXHJcbiAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLnNjYW5uZXIuc2Nhbihkb2N1bWVudCwgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm5vRXJyb3JzKGNvbnRleHQpKSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQgPSB0aGlzLmZpbHRlci5wcm9jZXNzKGNvbnRleHQsIG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3B0aW9ucy5zdGFuZGFyZCA9PT0gU3RhbmRhcmQuSUNXUzk0ZHJhZnQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubm9FcnJvcnMoY29udGV4dCkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQgPSB0aGlzLmZvclBhc3MucHJvY2Vzcyhjb250ZXh0LCBvcHRpb25zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5ub0Vycm9ycyhjb250ZXh0KSkge1xyXG4gICAgICAgICAgICBjb250ZXh0ID0gdGhpcy5wcmVwcm9jZXNzQ29sbGVjdG9yLnByb2Nlc3MoY29udGV4dCwgb3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm5vRXJyb3JzKGNvbnRleHQpKSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQgPSB0aGlzLnByZXByb2Nlc3NBbmFseXNlci5wcm9jZXNzKGNvbnRleHQsIG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5ub0Vycm9ycyhjb250ZXh0KSkge1xyXG4gICAgICAgICAgICBjb250ZXh0ID0gdGhpcy5wcmVwcm9jZXNzRW1pdHRlci5wcm9jZXNzKGNvbnRleHQsIG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5ub0Vycm9ycyhjb250ZXh0KSkge1xyXG4gICAgICAgICAgICBjb250ZXh0ID0gdGhpcy5sYWJlbENvbGxlY3Rvci5wcm9jZXNzKGNvbnRleHQsIG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5ub0Vycm9ycyhjb250ZXh0KSkge1xyXG4gICAgICAgICAgICBjb250ZXh0ID0gdGhpcy5sYWJlbEVtaXR0ZXIucHJvY2Vzcyhjb250ZXh0LCBvcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubm9FcnJvcnMoY29udGV4dCkpIHtcclxuICAgICAgICAgICAgY29udGV4dCA9IHRoaXMubWF0aHNQcm9jZXNzb3IucHJvY2Vzcyhjb250ZXh0LCBvcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubm9FcnJvcnMoY29udGV4dCkpIHtcclxuICAgICAgICAgICAgY29udGV4dCA9IHRoaXMub3JnUGFzcy5wcm9jZXNzKGNvbnRleHQsIG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5ub0Vycm9ycyhjb250ZXh0KSkge1xyXG4gICAgICAgICAgICBjb250ZXh0ID0gdGhpcy5kZWZhdWx0UGFzcy5wcm9jZXNzKGNvbnRleHQsIG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5ub0Vycm9ycyhjb250ZXh0KSkge1xyXG4gICAgICAgICAgICBjb250ZXh0ID0gdGhpcy5zeW50YXhDaGVjay5wcm9jZXNzKGNvbnRleHQsIG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3B0aW9ucy5zdGFuZGFyZCA8IFN0YW5kYXJkLklDV1M5NGRyYWZ0KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5vRXJyb3JzKGNvbnRleHQpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0ID0gdGhpcy5pbGxlZ2FsQ29tbWFuZENoZWNrLnByb2Nlc3MoY29udGV4dCwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1ldGFEYXRhOiBjb250ZXh0Lm1ldGFEYXRhLFxyXG4gICAgICAgICAgICB0b2tlbnM6IGNvbnRleHQudG9rZW5zLFxyXG4gICAgICAgICAgICBtZXNzYWdlczogY29udGV4dC5tZXNzYWdlc1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYXJzZXIvUGFyc2VyLnRzIiwiaW1wb3J0IHsgSVNjYW5uZXIgfSBmcm9tIFwiLi9pbnRlcmZhY2UvSVNjYW5uZXJcIjtcclxuaW1wb3J0IHsgSUNvbnRleHQgfSBmcm9tIFwiLi9pbnRlcmZhY2UvSUNvbnRleHRcIjtcclxuaW1wb3J0IHsgSVRva2VuLCBJUG9zaXRpb24sIFRva2VuQ2F0ZWdvcnkgfSBmcm9tIFwiLi9pbnRlcmZhY2UvSVRva2VuXCI7XHJcbmltcG9ydCB7IElQYXJzZU9wdGlvbnMsIFN0YW5kYXJkIH0gZnJvbSBcIi4vaW50ZXJmYWNlL0lQYXJzZU9wdGlvbnNcIjtcclxuXHJcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwiLi9Db250ZXh0XCI7XHJcblxyXG5pbnRlcmZhY2UgSVNjYW5uZXJSZWdleCB7XHJcbiAgICBMYWJlbFJFOiBSZWdFeHA7XHJcbiAgICBPcGNvZGVSRTogUmVnRXhwO1xyXG4gICAgUHJlcHJvY2Vzc29yUkU6IFJlZ0V4cDtcclxuICAgIE1vZGlmaWVyUkU6IFJlZ0V4cDtcclxuICAgIE1vZGVSRTogUmVnRXhwO1xyXG4gICAgTnVtYmVyUkU6IFJlZ0V4cDtcclxuICAgIENvbW1hUkU6IFJlZ0V4cDtcclxuICAgIE1hdGhzUkU6IFJlZ0V4cDtcclxuICAgIENvbW1lbnRSRTogUmVnRXhwO1xyXG4gICAgV2hpdGVzcGFjZTogUmVnRXhwO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2Nhbm5lciBpbXBsZW1lbnRzIElTY2FubmVyIHtcclxuXHJcbiAgICBwcml2YXRlIGNvbnRleHQ6IElDb250ZXh0O1xyXG4gICAgcHJpdmF0ZSBwb3NpdGlvbjogSVBvc2l0aW9uO1xyXG4gICAgcHJpdmF0ZSByZWdleDogSVNjYW5uZXJSZWdleDtcclxuICAgIHByaXZhdGUgb3B0aW9uczogSVBhcnNlT3B0aW9ucztcclxuICAgIHByaXZhdGUgcHJldmlvdXM6IElUb2tlbjtcclxuXHJcbiAgICBwdWJsaWMgc2Nhbihkb2N1bWVudDogc3RyaW5nLCBvcHRpb25zOiBJUGFyc2VPcHRpb25zKTogSUNvbnRleHQge1xyXG5cclxuICAgICAgICBkb2N1bWVudCA9IGRvY3VtZW50LnJlcGxhY2UoL1tcXHJdL2csIFwiXCIpO1xyXG5cclxuICAgICAgICB0aGlzLmNvbnRleHQgPSBuZXcgQ29udGV4dCgpO1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSB7XHJcbiAgICAgICAgICAgIGxpbmU6IDEsXHJcbiAgICAgICAgICAgIGNoYXI6IDFcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2YXIgbGluZXMgPSBkb2N1bWVudC5zcGxpdChcIlxcblwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcclxuICAgICAgICB0aGlzLnJlZ2V4ID0gdGhpcy5zZWxlY3RSZWdleGVzKG9wdGlvbnMuc3RhbmRhcmQpO1xyXG5cclxuICAgICAgICBsaW5lcy5mb3JFYWNoKChsaW5lOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yZWFkTGluZShsaW5lKTtcclxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi5saW5lKys7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgSUNXUzk0ZHJhZnRSZWdleDogSVNjYW5uZXJSZWdleCA9IHtcclxuICAgICAgICBMYWJlbFJFOiAvXltBLVpfXVtBLVpfMC05XSovaSxcclxuICAgICAgICBPcGNvZGVSRTogL14oREFUfE1PVnxBRER8U1VCfE1VTHxESVZ8TU9EfEpNUHxKTVp8Sk1OfERKTnxDTVB8U0xUfFNQTHxTRVF8U05FfE5PUCkoPyFcXHcpL2ksXHJcbiAgICAgICAgUHJlcHJvY2Vzc29yUkU6IC9eKEVRVXxFTkR8T1JHfEZPUnxST0YpKD8hXFx3KS9pLFxyXG4gICAgICAgIE1vZGlmaWVyUkU6IC9eXFwuKEFCfEJBfEF8QnxGfFh8SSkvaSxcclxuICAgICAgICBNb2RlUkU6IC9eKCN8XFwkfEB8PHw+fHt8fXxcXCopLyxcclxuICAgICAgICBOdW1iZXJSRTogL15bMC05XSsvLFxyXG4gICAgICAgIENvbW1hUkU6IC9eLC8sXHJcbiAgICAgICAgTWF0aHNSRTogL14oXFwrfFxcLXxcXCp8XFwvfCV8XFwofFxcKSkvLFxyXG4gICAgICAgIENvbW1lbnRSRTogL147LiovLFxyXG4gICAgICAgIFdoaXRlc3BhY2U6IC9eWyBcXHRdL1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBJQ1dTODhSZWdleDogSVNjYW5uZXJSZWdleCA9IHtcclxuICAgICAgICBMYWJlbFJFOiAvXltBLVpdW0EtWjAtOV0qL2ksXHJcbiAgICAgICAgT3Bjb2RlUkU6IC9eKERBVHxNT1Z8QUREfFNVQnxKTVB8Sk1afEpNTnxDTVB8U0xUfERKTnxTUEwpKD8hXFx3KS9pLFxyXG4gICAgICAgIFByZXByb2Nlc3NvclJFOiAvXihFTkR8RVFVKSg/IVxcdykvaSxcclxuICAgICAgICBNb2RpZmllclJFOiAvJGEvaSxcclxuICAgICAgICBNb2RlUkU6IC9eKCN8XFwkfEB8PCkvLFxyXG4gICAgICAgIE51bWJlclJFOiAvXlswLTldKy8sXHJcbiAgICAgICAgQ29tbWFSRTogL14sLyxcclxuICAgICAgICBNYXRoc1JFOiAvXihcXCt8XFwtfFxcKnxcXC8pLyxcclxuICAgICAgICBDb21tZW50UkU6IC9eOy4qLyxcclxuICAgICAgICBXaGl0ZXNwYWNlOiAvXlsgXFx0XS9cclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgSUNXUzg2UmVnZXg6IElTY2FubmVyUmVnZXggPSB7XHJcbiAgICAgICAgTGFiZWxSRTogL15bQS1aXVtBLVowLTldezAsN30oPyFbQS1aMC05XSkvaSxcclxuICAgICAgICBPcGNvZGVSRTogL14oREFUfE1PVnxBRER8U1VCfEpNUHxKTVp8Sk1OfENNUHxESk58U1BMKSg/IVxcdykvaSxcclxuICAgICAgICBQcmVwcm9jZXNzb3JSRTogL14oRU5EKSg/IVxcdykvaSxcclxuICAgICAgICBNb2RpZmllclJFOiAvJGEvaSxcclxuICAgICAgICBNb2RlUkU6IC9eKCN8XFwkfEB8PCkvLFxyXG4gICAgICAgIE51bWJlclJFOiAvXlswLTldKy8sXHJcbiAgICAgICAgQ29tbWFSRTogL14sLyxcclxuICAgICAgICBNYXRoc1JFOiAvXihcXCt8XFwtKS8sXHJcbiAgICAgICAgQ29tbWVudFJFOiAvXjsuKi8sXHJcbiAgICAgICAgV2hpdGVzcGFjZTogL15bIFxcdF0vXHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgc2VsZWN0UmVnZXhlcyhzdGFuZGFyZDogU3RhbmRhcmQpOiBJU2Nhbm5lclJlZ2V4IHtcclxuICAgICAgICBzd2l0Y2ggKHN0YW5kYXJkKSB7XHJcbiAgICAgICAgICAgIGNhc2UgU3RhbmRhcmQuSUNXUzk0ZHJhZnQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gU2Nhbm5lci5JQ1dTOTRkcmFmdFJlZ2V4O1xyXG4gICAgICAgICAgICBjYXNlIFN0YW5kYXJkLklDV1M4ODpcclxuICAgICAgICAgICAgICAgIHJldHVybiBTY2FubmVyLklDV1M4OFJlZ2V4O1xyXG4gICAgICAgICAgICBjYXNlIFN0YW5kYXJkLklDV1M4NjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBTY2FubmVyLklDV1M4NlJlZ2V4O1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhyb3cgXCJVbnN1cHBvcnRlZCBDb3Jld2FyIFN0YW5kYXJkXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVhZExpbmUobGluZTogc3RyaW5nKSB7XHJcblxyXG4gICAgICAgIHZhciBhY2N1bXVsYXRvciA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbi5jaGFyID0gMTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgY2hhck51bWJlciA9IDA7IGNoYXJOdW1iZXIgPCBsaW5lLmxlbmd0aDsgY2hhck51bWJlcisrKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgYyA9IGxpbmVbY2hhck51bWJlcl07XHJcblxyXG4gICAgICAgICAgICBpZiAoYyA9PT0gXCJcXG5cIikge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYyA9PT0gXCI7XCIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYWNjdW11bGF0b3IgIT09IFwiXCIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzQWNjdW11bGF0b3IoYWNjdW11bGF0b3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY3VtdWxhdG9yID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uLmNoYXIgPSBjaGFyTnVtYmVyICsgMjtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NDb21tZW50KGxpbmUuc3Vic3RyKGNoYXJOdW1iZXIpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5yZWdleC5XaGl0ZXNwYWNlLmV4ZWMoYyk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBhY2N1bXVsYXRvciArPSBjO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChhY2N1bXVsYXRvciAhPT0gXCJcIikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NBY2N1bXVsYXRvcihhY2N1bXVsYXRvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjdW11bGF0b3IgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24uY2hhciA9IGNoYXJOdW1iZXIgKyAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWNjdW11bGF0b3IgIT09IFwiXCIpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc0FjY3VtdWxhdG9yKGFjY3VtdWxhdG9yKTtcclxuICAgICAgICAgICAgYWNjdW11bGF0b3IgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5lbWl0RW5kT2ZMaW5lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbmRpcmVjdEFNb2RlQ2hlY2soY2F0ZWdvcnk6IFRva2VuQ2F0ZWdvcnksIG1hdGNoOiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zdGFuZGFyZCAhPT0gU3RhbmRhcmQuSUNXUzk0ZHJhZnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobWF0Y2ggIT09IFwiKlwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSEFDSyBJQ1dTJzk0IHVzZXMgKiBmb3IgYm90aCBtdWx0aXBseSBhbmQgYSBmaWVsZCBpbmRpcmVjdCBhZGRyZXNzaW5nIG1vZGVcclxuICAgICAgICAvLyBJZiB0aGUgcHJldmlvdXMgdG9rZW4gd2FzIGFuIG9wY29kZSBvciBjb21tYSwgdHJlYXQgdGhpcyBhcyBhbiBhZGRyZXNzaW5nIG1vZGVcclxuICAgICAgICAvLyBvdGhlcndpc2UgdHJlYXQgaXQgYXMgYSBtdWx0aXBseVxyXG5cclxuICAgICAgICB2YXIgcHJldmlvdXNPcGNvZGVPckNvbW1hID0gdGhpcy5wcmV2aW91cy5jYXRlZ29yeSA9PT0gVG9rZW5DYXRlZ29yeS5PcGNvZGUgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91cy5jYXRlZ29yeSA9PT0gVG9rZW5DYXRlZ29yeS5Nb2RpZmllciB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzLmNhdGVnb3J5ID09PSBUb2tlbkNhdGVnb3J5LkNvbW1hO1xyXG5cclxuICAgICAgICBpZiAoY2F0ZWdvcnkgPT09IFRva2VuQ2F0ZWdvcnkuTW9kZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcHJldmlvdXNPcGNvZGVPckNvbW1hO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY2F0ZWdvcnkgPT09IFRva2VuQ2F0ZWdvcnkuTWF0aHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuICFwcmV2aW91c09wY29kZU9yQ29tbWE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcHJvY2Vzc0FjY3VtdWxhdG9yKGFjY3VtdWxhdG9yOiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgdmFyIHJlc3VsdDogUmVnRXhwRXhlY0FycmF5O1xyXG4gICAgICAgIHZhciBmb3VuZCA9IDA7XHJcblxyXG4gICAgICAgIHZhciBtYXRjaFRva2VuID0gKGNhdGVnb3J5OiBUb2tlbkNhdGVnb3J5LCByZTogUmVnRXhwKSA9PiB7XHJcblxyXG4gICAgICAgICAgICByZXN1bHQgPSByZS5leGVjKGFjY3VtdWxhdG9yKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgIT09IG51bGwgJiYgcmVzdWx0LmluZGV4ID09PSAwICYmIHRoaXMuaW5kaXJlY3RBTW9kZUNoZWNrKGNhdGVnb3J5LCByZXN1bHRbMF0pKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgYWNjdW11bGF0b3IgPSB0aGlzLnByb2Nlc3NUb2tlbihjYXRlZ29yeSwgYWNjdW11bGF0b3IsIHJlc3VsdFswXSwgZm91bmQgIT09IDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi5jaGFyICs9IHJlc3VsdFswXS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBmb3VuZCsrO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB3aGlsZSAoYWNjdW11bGF0b3IgIT09IFwiXCIpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChhY2N1bXVsYXRvclswXSA9PT0gXCI7XCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG1hdGNoVG9rZW4oVG9rZW5DYXRlZ29yeS5Db21tYSwgdGhpcy5yZWdleC5Db21tYVJFKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChtYXRjaFRva2VuKFRva2VuQ2F0ZWdvcnkuTW9kaWZpZXIsIHRoaXMucmVnZXguTW9kaWZpZXJSRSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobWF0Y2hUb2tlbihUb2tlbkNhdGVnb3J5Lk1vZGUsIHRoaXMucmVnZXguTW9kZVJFKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChtYXRjaFRva2VuKFRva2VuQ2F0ZWdvcnkuTnVtYmVyLCB0aGlzLnJlZ2V4Lk51bWJlclJFKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChtYXRjaFRva2VuKFRva2VuQ2F0ZWdvcnkuTWF0aHMsIHRoaXMucmVnZXguTWF0aHNSRSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobWF0Y2hUb2tlbihUb2tlbkNhdGVnb3J5Lk9wY29kZSwgdGhpcy5yZWdleC5PcGNvZGVSRSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobWF0Y2hUb2tlbihUb2tlbkNhdGVnb3J5LlByZXByb2Nlc3NvciwgdGhpcy5yZWdleC5QcmVwcm9jZXNzb3JSRSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobWF0Y2hUb2tlbihUb2tlbkNhdGVnb3J5LkxhYmVsLCB0aGlzLnJlZ2V4LkxhYmVsUkUpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG1hdGNoVG9rZW4oVG9rZW5DYXRlZ29yeS5Db21tZW50LCB0aGlzLnJlZ2V4LkNvbW1lbnRSRSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhY2N1bXVsYXRvciA9IHRoaXMucHJvY2Vzc1Rva2VuKFRva2VuQ2F0ZWdvcnkuVW5rbm93biwgYWNjdW11bGF0b3IsIGFjY3VtdWxhdG9yLCBmb3VuZCAhPT0gMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcHJvY2Vzc0NvbW1lbnQobGV4ZW1lOiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgdGhpcy5lbWl0KFRva2VuQ2F0ZWdvcnkuQ29tbWVudCwgbGV4ZW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzQ2FzZUluc2Vuc2l0aXZlKGNhdGVnb3J5OiBUb2tlbkNhdGVnb3J5KSB7XHJcbiAgICAgICAgcmV0dXJuIGNhdGVnb3J5ID09PSBUb2tlbkNhdGVnb3J5Lk9wY29kZSB8fFxyXG4gICAgICAgICAgICBjYXRlZ29yeSA9PT0gVG9rZW5DYXRlZ29yeS5Nb2RpZmllciB8fFxyXG4gICAgICAgICAgICBjYXRlZ29yeSA9PT0gVG9rZW5DYXRlZ29yeS5QcmVwcm9jZXNzb3I7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwcm9jZXNzVG9rZW4oY2F0ZWdvcnk6IFRva2VuQ2F0ZWdvcnksIGFjY3VtdWxhdG9yOiBzdHJpbmcsIGxleGVtZTogc3RyaW5nLCBmb3VuZDogYm9vbGVhbikge1xyXG5cclxuICAgICAgICAvLyBIQUNLIElDV1MnODgvODYgaGFzIG9wdGlvbmFsIGNvbW1hcyBhbmQgZGVsaW1pdHMgb3BlcmFuZHMgdXNpbmcgd2hpdGVzcGFjZSBidXQgdGhpcyBwYXJzZXIgZG9lcyBub3QgdG9rZW5pc2Ugd2hpdGVzcGFjZS5cclxuICAgICAgICAvLyBUaGlzIHdvcmthcm91bmQgd2lsbCBhbGxvdyBhIHBsdXMvbWludXMgdG8gYmVnaW4gYW4gb3BlcmFuZCBhbmQgZGlzYWxsb3dzIHdoaXRlc3BhY2UgYWZ0ZXIgYSBtYXRocyBvcGVyYXRvci5cclxuICAgICAgICAvLyBUaGlzIG1lYW5zIHRoYXQgdGhlIGZvbGxvd2luZyBvcGVyYW5kcyBhcmUgbm90IGludGVycHJldHRlZCBhcyBhIHNpbmdsZSBleHByZXNzaW9uOiBNT1YgMCAtMSBiY29tZXMgTU9WIDAsIC0xIG5vdCBNT1YgLTFcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnN0YW5kYXJkIDw9IFN0YW5kYXJkLklDV1M4OCkge1xyXG4gICAgICAgICAgICBpZiAoIWZvdW5kICYmIGNhdGVnb3J5ID09PSBUb2tlbkNhdGVnb3J5Lk1hdGhzICYmXHJcbiAgICAgICAgICAgICAgICAobGV4ZW1lID09PSBcIi1cIiB8fCBsZXhlbWUgPT09IFwiK1wiKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KFRva2VuQ2F0ZWdvcnkuTnVtYmVyLCBcIjBcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2F0ZWdvcnkgPT09IFRva2VuQ2F0ZWdvcnkuTWF0aHMgJiYgYWNjdW11bGF0b3IubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yeSA9IFRva2VuQ2F0ZWdvcnkuVW5rbm93bjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNDYXNlSW5zZW5zaXRpdmUoY2F0ZWdvcnkpKSB7XHJcbiAgICAgICAgICAgIGxleGVtZSA9IGxleGVtZS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5lbWl0KGNhdGVnb3J5LCBsZXhlbWUpO1xyXG4gICAgICAgIHJldHVybiBhY2N1bXVsYXRvci5zdWJzdHIobGV4ZW1lLmxlbmd0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBlbWl0RW5kT2ZMaW5lKCkge1xyXG4gICAgICAgIHRoaXMuZW1pdChUb2tlbkNhdGVnb3J5LkVPTCwgXCJcXG5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBlbWl0KGNhdGVnb3J5OiBUb2tlbkNhdGVnb3J5LCBsZXhlbWU6IHN0cmluZykge1xyXG5cclxuICAgICAgICB0aGlzLnByZXZpb3VzID0ge1xyXG4gICAgICAgICAgICBwb3NpdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgbGluZTogdGhpcy5wb3NpdGlvbi5saW5lLFxyXG4gICAgICAgICAgICAgICAgY2hhcjogdGhpcy5wb3NpdGlvbi5jaGFyXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxleGVtZTogbGV4ZW1lLFxyXG4gICAgICAgICAgICBjYXRlZ29yeTogY2F0ZWdvcnlcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmNvbnRleHQudG9rZW5zLnB1c2godGhpcy5wcmV2aW91cyk7XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYXJzZXIvU2Nhbm5lci50cyIsImltcG9ydCB7IElDb250ZXh0IH0gZnJvbSBcIi4vaW50ZXJmYWNlL0lDb250ZXh0XCI7XHJcbmltcG9ydCB7IElNZXRhRGF0YSB9IGZyb20gXCIuL2ludGVyZmFjZS9JTWV0YURhdGFcIjtcclxuaW1wb3J0IHsgSVRva2VuIH0gZnJvbSBcIi4vaW50ZXJmYWNlL0lUb2tlblwiO1xyXG5pbXBvcnQgeyBJTWVzc2FnZSB9IGZyb20gXCIuL2ludGVyZmFjZS9JTWVzc2FnZVwiO1xyXG5pbXBvcnQgeyBJUGFyc2VJbnN0cnVjdGlvbiB9IGZyb20gXCIuL2ludGVyZmFjZS9JUGFyc2VJbnN0cnVjdGlvblwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbnRleHQgaW1wbGVtZW50cyBJQ29udGV4dCB7XHJcblxyXG4gICAgcHVibGljIG1ldGFEYXRhOiBJTWV0YURhdGE7XHJcbiAgICBwdWJsaWMgdG9rZW5zOiBJVG9rZW5bXTtcclxuICAgIHB1YmxpYyBlcXVzOiB7IFtsYWJlbDogc3RyaW5nXTogSVRva2VuW10gfTtcclxuICAgIHB1YmxpYyBsYWJlbHM6IHsgW2xhYmVsOiBzdHJpbmddOiBudW1iZXIgfTtcclxuICAgIHB1YmxpYyBtZXNzYWdlczogSU1lc3NhZ2VbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLm1ldGFEYXRhID0ge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlwiLFxyXG4gICAgICAgICAgICBhdXRob3I6IFwiXCIsXHJcbiAgICAgICAgICAgIHN0cmF0ZWd5OiBcIlwiXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmVxdXMgPSB7fTtcclxuICAgICAgICB0aGlzLnRva2VucyA9IFtdO1xyXG4gICAgICAgIHRoaXMubGFiZWxzID0ge307XHJcbiAgICAgICAgdGhpcy5tZXNzYWdlcyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbWl0U2luZ2xlKHRva2VuOiBJVG9rZW4pIHtcclxuXHJcbiAgICAgICAgdGhpcy50b2tlbnMucHVzaCh0b2tlbik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVtaXQodG9rZW5zOiBJVG9rZW5bXSkge1xyXG5cclxuICAgICAgICB0aGlzLnRva2VucyA9IHRoaXMudG9rZW5zLmNvbmNhdCh0b2tlbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFzVmFsdWUoc29tZXRoaW5nOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKCEoXy5pc1VuZGVmaW5lZChzb21ldGhpbmcpIHx8IF8uaXNOdWxsKHNvbWV0aGluZykpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW1pdEluc3RydWN0aW9uKGluc3RydWN0aW9uOiBJUGFyc2VJbnN0cnVjdGlvbikge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5oYXNWYWx1ZShpbnN0cnVjdGlvbi5vcGNvZGUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9rZW5zLnB1c2goaW5zdHJ1Y3Rpb24ub3Bjb2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzVmFsdWUoaW5zdHJ1Y3Rpb24ubW9kaWZpZXIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9rZW5zLnB1c2goaW5zdHJ1Y3Rpb24ubW9kaWZpZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5oYXNWYWx1ZShpbnN0cnVjdGlvbi5hT3BlcmFuZCkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzVmFsdWUoaW5zdHJ1Y3Rpb24uYU9wZXJhbmQubW9kZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9rZW5zLnB1c2goaW5zdHJ1Y3Rpb24uYU9wZXJhbmQubW9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzVmFsdWUoaW5zdHJ1Y3Rpb24uYU9wZXJhbmQuYWRkcmVzcykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9rZW5zLnB1c2goaW5zdHJ1Y3Rpb24uYU9wZXJhbmQuYWRkcmVzcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzVmFsdWUoaW5zdHJ1Y3Rpb24uY29tbWEpKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9rZW5zLnB1c2goaW5zdHJ1Y3Rpb24uY29tbWEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5oYXNWYWx1ZShpbnN0cnVjdGlvbi5iT3BlcmFuZCkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzVmFsdWUoaW5zdHJ1Y3Rpb24uYk9wZXJhbmQubW9kZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9rZW5zLnB1c2goaW5zdHJ1Y3Rpb24uYk9wZXJhbmQubW9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzVmFsdWUoaW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9rZW5zLnB1c2goaW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzVmFsdWUoaW5zdHJ1Y3Rpb24uY29tbWVudCkpIHtcclxuICAgICAgICAgICAgdGhpcy50b2tlbnMucHVzaChpbnN0cnVjdGlvbi5jb21tZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzVmFsdWUoaW5zdHJ1Y3Rpb24uZW9sKSkge1xyXG4gICAgICAgICAgICB0aGlzLnRva2Vucy5wdXNoKGluc3RydWN0aW9uLmVvbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcGFyc2VyL0NvbnRleHQudHMiLCJpbXBvcnQgeyBJRXhwcmVzc2lvbiB9IGZyb20gXCIuL2ludGVyZmFjZS9JRXhwcmVzc2lvblwiO1xyXG5pbXBvcnQgeyBJVG9rZW4sIFRva2VuQ2F0ZWdvcnkgfSBmcm9tIFwiLi9pbnRlcmZhY2UvSVRva2VuXCI7XHJcblxyXG5pbXBvcnQgeyBQYXNzQmFzZSB9IGZyb20gXCIuL1Bhc3NCYXNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRm9yUGFzcyBleHRlbmRzIFBhc3NCYXNlIHtcclxuXHJcbiAgICBwcml2YXRlIGV4cHJlc3Npb246IElFeHByZXNzaW9uO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGV4cHJlc3Npb246IElFeHByZXNzaW9uKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmV4cHJlc3Npb24gPSBleHByZXNzaW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBSZWNvcmRzIEVRVSBzdWJzdGl0dXRpb25zIGFuZCByZW1vdmVzIHN0YXRlbWVudHMgZnJvbSB0b2tlbiBzdHJlYW1cclxuICAgIC8vLyBQZXJmb3JtcyBhIGR1cGxpY2F0ZSBsYWJlbCBjaGVja1xyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIHByb3RlY3RlZCBwcm9jZXNzTGluZSgpIHtcclxuXHJcbiAgICAgICAgLy8gUmVjb3JkIEVRVSBsYWJlbCB0b2tlbnNcclxuICAgICAgICAvLyBSZW1vdmUgRVFVIHRva2VuIGxhYmVscyBmcm9tIHRva2VuIHN0cmVhbVxyXG4gICAgICAgIC8vIER1cGxpY2F0ZSBsYWJlbCBjaGVja1xyXG5cclxuICAgICAgICB2YXIgbmV4dCA9IHRoaXMuc3RyZWFtLnBlZWsoKTtcclxuXHJcbiAgICAgICAgaWYgKG5leHQuY2F0ZWdvcnkgPT09IFRva2VuQ2F0ZWdvcnkuTGFiZWwpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc0xhYmVsKCk7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0ZvcihuZXh0KSkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHByZSA9IHRoaXMuc3RyZWFtLmV4cGVjdE9ubHkoXCJGT1JcIik7XHJcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc0ZvcihudWxsLCBwcmUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgbGluZSA9IHRoaXMuc3RyZWFtLnJlYWRUb0VPTCgpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZW1pdChsaW5lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc0ZvcihwcmU6IElUb2tlbik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBwcmUuY2F0ZWdvcnkgPT09IFRva2VuQ2F0ZWdvcnkuUHJlcHJvY2Vzc29yICYmXHJcbiAgICAgICAgICAgIHByZS5sZXhlbWUgPT09IFwiRk9SXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwcm9jZXNzTGFiZWwoKSB7XHJcblxyXG4gICAgICAgIHZhciBsYWJlbDogSVRva2VuID0gdGhpcy5zdHJlYW0ucmVhZCgpO1xyXG5cclxuICAgICAgICB2YXIgcHJlID0gdGhpcy5zdHJlYW0ucmVhZCgpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pc0ZvcihwcmUpKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NGb3IobGFiZWwsIHByZSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZW1pdChbbGFiZWxdKTtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmVtaXQoW3ByZV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBwcml2YXRlIHdhcm5EdXBsaWNhdGVMYWJlbChsYWJlbDogSVRva2VuKSB7XHJcblxyXG4gICAgLy8gICAgdGhpcy5jb250ZXh0Lm1lc3NhZ2VzLnB1c2goe1xyXG4gICAgLy8gICAgICAgIHR5cGU6IE1lc3NhZ2VUeXBlLldhcm5pbmcsXHJcbiAgICAvLyAgICAgICAgcG9zaXRpb246IGxhYmVsLnBvc2l0aW9uLFxyXG4gICAgLy8gICAgICAgIHRleHQ6IFwiUmVkZWZpbml0aW9uIG9mIGxhYmVsICdcIiArIGxhYmVsLmxleGVtZSArIFwiJywgb3JpZ2luYWwgZGVmaW5pdGlvbiB3aWxsIGJlIHVzZWRcIlxyXG4gICAgLy8gICAgfSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgcHJpdmF0ZSBwcm9jZXNzRm9yKGxhYmVsOiBJVG9rZW4sIHByZTogSVRva2VuKSB7XHJcblxyXG4gICAgICAgIC8vIFRPRE8gdXNlIGxhYmVsIChhbmQgcmVpbnN0YXRlIHdhcm5EdXBsaWNhdGVMYWJlbClcclxuICAgICAgICAvLyBUT0RPIHN0cmluZ2luaXNhdGlvblxyXG4gICAgICAgIC8vIFRPRE8gbG9vcCBjb3VudGVyIHZhcmlhYmxlIHN1YnNcclxuXHJcbiAgICAgICAgdmFyIGNvdW50ID0gdGhpcy5leHByZXNzaW9uLnBhcnNlKHRoaXMuc3RyZWFtKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3RyZWFtLnBlZWsoKS5jYXRlZ29yeSA9PT0gVG9rZW5DYXRlZ29yeS5Db21tZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RyZWFtLnJlYWQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc3RyZWFtLmV4cGVjdChUb2tlbkNhdGVnb3J5LkVPTCk7XHJcblxyXG4gICAgICAgIHZhciBleHByZXNzaW9uID0gdGhpcy5zdHJlYW0ucmVhZFRvRU9MKCk7XHJcblxyXG4gICAgICAgIHdoaWxlICghdGhpcy5zdHJlYW0uZW9mKCkgJiYgdGhpcy5zdHJlYW0ucGVlaygpLmxleGVtZSAhPT0gXCJST0ZcIikge1xyXG5cclxuICAgICAgICAgICAgZXhwcmVzc2lvbiA9IGV4cHJlc3Npb24uY29uY2F0KHRoaXMuc3RyZWFtLnJlYWRUb0VPTCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc3RyZWFtLmV4cGVjdE9ubHkoXCJST0ZcIik7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmVtaXQoZXhwcmVzc2lvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnN0cmVhbS5yZWFkVG9FT0woKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYXJzZXIvRm9yUGFzcy50cyIsImltcG9ydCB7IElUb2tlbiwgVG9rZW5DYXRlZ29yeSB9IGZyb20gXCIuL2ludGVyZmFjZS9JVG9rZW5cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUb2tlbkhlbHBlciB7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjYXRlZ29yeVRvU3RyaW5nKGNhdGVnb3J5OiBUb2tlbkNhdGVnb3J5KTogc3RyaW5nIHtcclxuICAgICAgICBzd2l0Y2ggKGNhdGVnb3J5KSB7XHJcbiAgICAgICAgICAgIGNhc2UgVG9rZW5DYXRlZ29yeS5Db21tYTpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIicsJ1wiO1xyXG4gICAgICAgICAgICBjYXNlIFRva2VuQ2F0ZWdvcnkuQ29tbWVudDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIic7J1wiO1xyXG4gICAgICAgICAgICBjYXNlIFRva2VuQ2F0ZWdvcnkuRU9MOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiZW5kIG9mIGxpbmVcIjtcclxuICAgICAgICAgICAgY2FzZSBUb2tlbkNhdGVnb3J5LkxhYmVsOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwibGFiZWxcIjtcclxuICAgICAgICAgICAgY2FzZSBUb2tlbkNhdGVnb3J5Lk1vZGU6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJtb2RlXCI7XHJcbiAgICAgICAgICAgIGNhc2UgVG9rZW5DYXRlZ29yeS5Nb2RpZmllcjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIm1vZGlmaWVyXCI7XHJcbiAgICAgICAgICAgIGNhc2UgVG9rZW5DYXRlZ29yeS5OdW1iZXI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJudW1iZXJcIjtcclxuICAgICAgICAgICAgY2FzZSBUb2tlbkNhdGVnb3J5Lk9wY29kZTpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIm9wY29kZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHRva2VuVG9TdHJpbmcodG9rZW46IElUb2tlbik6IHN0cmluZyB7XHJcbiAgICAgICAgc3dpdGNoICh0b2tlbi5jYXRlZ29yeSkge1xyXG4gICAgICAgICAgICBjYXNlIFRva2VuQ2F0ZWdvcnkuQ29tbWVudDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIic7J1wiO1xyXG4gICAgICAgICAgICBjYXNlIFRva2VuQ2F0ZWdvcnkuRU9MOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiZW5kIG9mIGxpbmVcIjtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIidcIiArIHRva2VuLmxleGVtZSArIFwiJ1wiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3BhcnNlci9Ub2tlbkhlbHBlci50cyIsImltcG9ydCB7IElQYXJzZU9wdGlvbnMsIFN0YW5kYXJkIH0gZnJvbSBcIi4vaW50ZXJmYWNlL0lQYXJzZU9wdGlvbnNcIjtcclxuaW1wb3J0IHsgSUNvbnRleHQgfSBmcm9tIFwiLi9pbnRlcmZhY2UvSUNvbnRleHRcIjtcclxuaW1wb3J0IHsgSVRva2VuLCBUb2tlbkNhdGVnb3J5IH0gZnJvbSBcIi4vaW50ZXJmYWNlL0lUb2tlblwiO1xyXG5pbXBvcnQgeyBNZXNzYWdlVHlwZSB9IGZyb20gXCIuL2ludGVyZmFjZS9JTWVzc2FnZVwiO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gXCJ1bmRlcnNjb3JlXCI7XHJcblxyXG5pbXBvcnQgeyBQYXNzQmFzZSB9IGZyb20gXCIuL1Bhc3NCYXNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUHJlcHJvY2Vzc0NvbGxlY3RvciBleHRlbmRzIFBhc3NCYXNlIHtcclxuXHJcbiAgICBwcml2YXRlIHByZXZpb3VzOiBzdHJpbmdbXTtcclxuXHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gUmVjb3JkcyBFUVUgc3Vic3RpdHV0aW9ucyBhbmQgcmVtb3ZlcyBzdGF0ZW1lbnRzIGZyb20gdG9rZW4gc3RyZWFtXHJcbiAgICAvLy8gUGVyZm9ybXMgYSBkdXBsaWNhdGUgbGFiZWwgY2hlY2tcclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBwdWJsaWMgcHJvY2Vzcyhjb250ZXh0OiBJQ29udGV4dCwgb3B0aW9uczogSVBhcnNlT3B0aW9ucyk6IElDb250ZXh0IHtcclxuXHJcbiAgICAgICAgLy8gUmVjb3JkIEVRVSBsYWJlbCB0b2tlbnNcclxuICAgICAgICAvLyBSZW1vdmUgRVFVIHRva2VuIGxhYmVscyBmcm9tIHRva2VuIHN0cmVhbVxyXG4gICAgICAgIC8vIER1cGxpY2F0ZSBsYWJlbCBjaGVja1xyXG5cclxuICAgICAgICB0aGlzLnByZXZpb3VzID0gW107XHJcblxyXG4gICAgICAgIHJldHVybiBzdXBlci5wcm9jZXNzKGNvbnRleHQsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBwcm9jZXNzTGluZSgpIHtcclxuXHJcbiAgICAgICAgd2hpbGUgKCF0aGlzLnN0cmVhbS5lb2YoKSkge1xyXG5cclxuICAgICAgICAgICAgdmFyIG5leHQgPSB0aGlzLnN0cmVhbS5wZWVrKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAobmV4dC5jYXRlZ29yeSA9PT0gVG9rZW5DYXRlZ29yeS5MYWJlbCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXMgPSBbXTtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0xhYmVscygpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzTXVsdGlsaW5lRXF1KG5leHQpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzTXVsdGlsaW5lRXF1KCk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBsaW5lID0gdGhpcy5zdHJlYW0ucmVhZFRvRU9MKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZW1pdChsaW5lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzTXVsdGlsaW5lRXF1KG5leHQ6IElUb2tlbik6IGJvb2xlYW4ge1xyXG5cclxuICAgICAgICByZXR1cm4gbmV4dC5jYXRlZ29yeSA9PT0gVG9rZW5DYXRlZ29yeS5QcmVwcm9jZXNzb3IgJiZcclxuICAgICAgICAgICAgbmV4dC5sZXhlbWUgPT09IFwiRVFVXCIgJiZcclxuICAgICAgICAgICAgdGhpcy5wcmV2aW91cy5sZW5ndGggPiAwICYmXHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5zdGFuZGFyZCA9PT0gU3RhbmRhcmQuSUNXUzk0ZHJhZnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc0VxdShwcmU6IElUb2tlbik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBwcmUuY2F0ZWdvcnkgPT09IFRva2VuQ2F0ZWdvcnkuUHJlcHJvY2Vzc29yICYmXHJcbiAgICAgICAgICAgIHByZS5sZXhlbWUgPT09IFwiRVFVXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwcm9jZXNzTGFiZWxzKCkge1xyXG5cclxuICAgICAgICB2YXIgbGFiZWxzOiBJVG9rZW5bXSA9IFtdO1xyXG5cclxuICAgICAgICB3aGlsZSAodGhpcy5zdHJlYW0ucGVlaygpLmNhdGVnb3J5ID09PSBUb2tlbkNhdGVnb3J5LkxhYmVsKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdG9rZW4gPSB0aGlzLnN0cmVhbS5leHBlY3QoVG9rZW5DYXRlZ29yeS5MYWJlbCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzLnB1c2godG9rZW4ubGV4ZW1lKTtcclxuICAgICAgICAgICAgbGFiZWxzLnB1c2godG9rZW4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHByZSA9IHRoaXMuc3RyZWFtLnJlYWQoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNFcXUocHJlKSkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5wcm9jZXNzRXF1KGxhYmVscyk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5lbWl0KGxhYmVscyk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5lbWl0KFtwcmVdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB3YXJuRHVwbGljYXRlTGFiZWwobGFiZWw6IElUb2tlbikge1xyXG5cclxuICAgICAgICB0aGlzLmNvbnRleHQubWVzc2FnZXMucHVzaCh7XHJcbiAgICAgICAgICAgIHR5cGU6IE1lc3NhZ2VUeXBlLldhcm5pbmcsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBsYWJlbC5wb3NpdGlvbixcclxuICAgICAgICAgICAgdGV4dDogXCJSZWRlZmluaXRpb24gb2YgbGFiZWwgJ1wiICsgbGFiZWwubGV4ZW1lICsgXCInLCBvcmlnaW5hbCBkZWZpbml0aW9uIHdpbGwgYmUgdXNlZFwiXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwcm9jZXNzRXF1KGxhYmVsczogSVRva2VuW10pIHtcclxuXHJcbiAgICAgICAgdmFyIGV4cHJlc3Npb24gPSB0aGlzLnN0cmVhbS5yZWFkVG9FT0woKTtcclxuXHJcbiAgICAgICAgLy8gRG8gbm90IGluY2x1ZGUgdGVybWluYXRpbmcgRU9MIGluIHJlcGxhY2VtZW50IGV4cHJlc3Npb25cclxuICAgICAgICBleHByZXNzaW9uLnBvcCgpO1xyXG5cclxuICAgICAgICAvLyBSZW1vdmUgY29tbWVudHNcclxuICAgICAgICBleHByZXNzaW9uID0gXy5maWx0ZXIoZXhwcmVzc2lvbiwodG9rZW46IElUb2tlbikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdG9rZW4uY2F0ZWdvcnkgIT09IFRva2VuQ2F0ZWdvcnkuQ29tbWVudDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgXy5mb3JFYWNoKGxhYmVscywgKGxhYmVsOiBJVG9rZW4pID0+IHtcclxuXHJcbiAgICAgICAgICAgIGlmIChsYWJlbC5sZXhlbWUgaW4gdGhpcy5jb250ZXh0LmVxdXMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2FybkR1cGxpY2F0ZUxhYmVsKGxhYmVsKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5lcXVzW2xhYmVsLmxleGVtZV0gPSBleHByZXNzaW9uO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwcm9jZXNzTXVsdGlsaW5lRXF1KCkge1xyXG5cclxuICAgICAgICB0aGlzLnN0cmVhbS5leHBlY3RPbmx5KFwiRVFVXCIpO1xyXG5cclxuICAgICAgICB2YXIgZXhwcmVzc2lvbjogSVRva2VuW10gPSBbe1xyXG4gICAgICAgICAgICBjYXRlZ29yeTogVG9rZW5DYXRlZ29yeS5FT0wsXHJcbiAgICAgICAgICAgIGxleGVtZTogXCJcXG5cIixcclxuICAgICAgICAgICAgcG9zaXRpb246IF8uY2xvbmUodGhpcy5zdHJlYW0ucGVlaygpLnBvc2l0aW9uKVxyXG4gICAgICAgIH1dO1xyXG5cclxuICAgICAgICBleHByZXNzaW9uID0gZXhwcmVzc2lvbi5jb25jYXQodGhpcy5zdHJlYW0ucmVhZFRvRU9MKCkpO1xyXG4gICAgICAgIC8vIFJlbW92ZSB0ZXJtaW5hdGluZyBuZXdsaW5lXHJcbiAgICAgICAgZXhwcmVzc2lvbi5wb3AoKTtcclxuXHJcbiAgICAgICAgXyh0aGlzLnByZXZpb3VzKS5mb3JFYWNoKChsYWJlbDogc3RyaW5nKSA9PiB7XHJcblxyXG4gICAgICAgICAgICB2YXIgZXhpc3RpbmcgPSB0aGlzLmNvbnRleHQuZXF1c1tsYWJlbF07XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5lcXVzW2xhYmVsXSA9IGV4aXN0aW5nLmNvbmNhdChleHByZXNzaW9uKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYXJzZXIvUHJlcHJvY2Vzc0NvbGxlY3Rvci50cyIsImltcG9ydCB7IElQYXNzIH0gZnJvbSBcIi4vaW50ZXJmYWNlL0lQYXNzXCI7XHJcbmltcG9ydCB7IElDb250ZXh0IH0gZnJvbSBcIi4vaW50ZXJmYWNlL0lDb250ZXh0XCI7XHJcbmltcG9ydCB7IElQYXJzZU9wdGlvbnMgfSBmcm9tIFwiLi9pbnRlcmZhY2UvSVBhcnNlT3B0aW9uc1wiO1xyXG5pbXBvcnQgeyBJVG9rZW4sIFRva2VuQ2F0ZWdvcnkgfSBmcm9tIFwiLi9pbnRlcmZhY2UvSVRva2VuXCI7XHJcbmltcG9ydCB7IE1lc3NhZ2VUeXBlIH0gZnJvbSBcIi4vaW50ZXJmYWNlL0lNZXNzYWdlXCI7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSBcInVuZGVyc2NvcmVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBQcmVwcm9jZXNzQW5hbHlzZXIgaW1wbGVtZW50cyBJUGFzcyB7XHJcblxyXG4gICAgcHJpdmF0ZSBjb250ZXh0OiBJQ29udGV4dDtcclxuXHJcbiAgICBwcml2YXRlIHJlZmVyZW5jZXM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nW10gfTtcclxuXHJcbiAgICBwdWJsaWMgcHJvY2Vzcyhjb250ZXh0OiBJQ29udGV4dCwgb3B0aW9uczogSVBhcnNlT3B0aW9ucyk6IElDb250ZXh0IHtcclxuXHJcbiAgICAgICAgLy8gRGV0ZWN0IGRlcGVuZGVuY2llcyBiZXR3ZWVuIEVRVSBleHByZXNzaW9uc1xyXG4gICAgICAgIC8vIFJhaXNlIGNpcmN1bGFyIHJlZmVyZW5jZSBlcnJvcnNcclxuICAgICAgICAvLyBSZXBsYWNlIHJlZmVyZW5jZXMgdG8gRVFVIGxhYmVscyBpbiBvdGhlciBFUVUgbGFiZWwgZGVmaW5pdGlvbnNcclxuXHJcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxuICAgICAgICB0aGlzLnJlZmVyZW5jZXMgPSB7fTtcclxuXHJcbiAgICAgICAgdGhpcy5jb2xsZWN0UmVmZXJlbmNlcygpO1xyXG4gICAgICAgIGlmICh0aGlzLm5vQ2lyY3VsYXJSZWZlcmVuY2VzKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXBsYWNlQWxsUmVmZXJlbmNlcygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNvbGxlY3RSZWZlcmVuY2VzKCkge1xyXG5cclxuICAgICAgICB2YXIga2V5cyA9IF8odGhpcy5jb250ZXh0LmVxdXMpLmtleXMoKTtcclxuXHJcbiAgICAgICAgXyhrZXlzKS5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xyXG5cclxuICAgICAgICAgICAgdmFyIGV4cHJlc3Npb24gPSB0aGlzLmNvbnRleHQuZXF1c1trZXldO1xyXG5cclxuICAgICAgICAgICAgdmFyIHJlZmVyZW5jZXMgPSBfKGV4cHJlc3Npb24pLmZpbHRlcigodG9rZW46IElUb2tlbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuLmNhdGVnb3J5ID09PSBUb2tlbkNhdGVnb3J5LkxhYmVsICYmXHJcbiAgICAgICAgICAgICAgICAgICAgXyhrZXlzKS5jb250YWlucyh0b2tlbi5sZXhlbWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucmVmZXJlbmNlc1trZXldID0gXyhyZWZlcmVuY2VzKS5tYXAoKHRva2VuOiBJVG9rZW4pID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbi5sZXhlbWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmFpc2VDaXJjdWxhclJlZmVyZW5jZShrZXk6IHN0cmluZywgcmVmZXJlbmNlOiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgdGhpcy5jb250ZXh0Lm1lc3NhZ2VzLnB1c2goe1xyXG4gICAgICAgICAgICB0ZXh0OiBcIkNpcmN1bGFyIHJlZmVyZW5jZSBkZXRlY3RlZCBpbiAnXCIgKyBrZXkgKyBcIicgRVFVIHN0YXRlbWVudFwiLFxyXG4gICAgICAgICAgICB0eXBlOiBNZXNzYWdlVHlwZS5FcnJvcixcclxuICAgICAgICAgICAgLy8gVE9ETyBwcm9wZXIgcG9zaXRpb25cclxuICAgICAgICAgICAgcG9zaXRpb246IHsgbGluZTogMSwgY2hhcjogMSB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBub0NpcmN1bGFyUmVmZXJlbmNlcygpOiBib29sZWFuIHtcclxuXHJcbiAgICAgICAgdmFyIGtleXMgPSBfKHRoaXMuY29udGV4dC5lcXVzKS5rZXlzKCk7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHRydWU7XHJcblxyXG4gICAgICAgIF8oa2V5cykuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcclxuXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2Vlbjogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRldGVjdENpcmN1bGFyUmVmZXJlbmNlc1JlY3Vyc2l2ZShrZXksIHNlZW4pO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChyZWZlcmVuY2UpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJhaXNlQ2lyY3VsYXJSZWZlcmVuY2Uoa2V5LCByZWZlcmVuY2UpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRldGVjdENpcmN1bGFyUmVmZXJlbmNlc1JlY3Vyc2l2ZSh0b2tlbjogc3RyaW5nLCBzZWVuOiBzdHJpbmdbXSkge1xyXG5cclxuICAgICAgICBpZiAoXyhzZWVuKS5jb250YWlucyh0b2tlbikpIHtcclxuICAgICAgICAgICAgdGhyb3cgdG9rZW47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWVuLnB1c2godG9rZW4pO1xyXG5cclxuICAgICAgICBfKHRoaXMucmVmZXJlbmNlc1t0b2tlbl0pLmZvckVhY2goKHJlZmVyZW5jZTogc3RyaW5nKSA9PiB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRldGVjdENpcmN1bGFyUmVmZXJlbmNlc1JlY3Vyc2l2ZShyZWZlcmVuY2UsIHNlZW4pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2YXIgaSA9IHNlZW4uaW5kZXhPZih0b2tlbik7XHJcbiAgICAgICAgc2Vlbi5zcGxpY2UoaSwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZXBsYWNlQWxsUmVmZXJlbmNlcygpIHtcclxuXHJcbiAgICAgICAgdmFyIGtleXMgPSBfKHRoaXMuY29udGV4dC5lcXVzKS5rZXlzKCk7XHJcblxyXG4gICAgICAgIF8oa2V5cykuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucmVwbGFjZVJlZmVyZW5jZXMoa2V5KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlcGxhY2VSZWZlcmVuY2VzKGtleTogc3RyaW5nKSB7XHJcblxyXG4gICAgICAgIHZhciBleHByZXNzaW9uID0gdGhpcy5jb250ZXh0LmVxdXNba2V5XTtcclxuICAgICAgICB2YXIga2V5cyA9IF8odGhpcy5jb250ZXh0LmVxdXMpLmtleXMoKTtcclxuXHJcbiAgICAgICAgd2hpbGUgKF8oZXhwcmVzc2lvbikuYW55KCh0b2tlbjogSVRva2VuKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0b2tlbi5jYXRlZ29yeSA9PT0gVG9rZW5DYXRlZ29yeS5MYWJlbCAmJlxyXG4gICAgICAgICAgICAgICAgXyhrZXlzKS5jb250YWlucyh0b2tlbi5sZXhlbWUpO1xyXG4gICAgICAgIH0pKSB7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4cHJlc3Npb24ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChleHByZXNzaW9uW2ldLmNhdGVnb3J5ID09PSBUb2tlbkNhdGVnb3J5LkxhYmVsKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsYWJlbCA9IGV4cHJlc3Npb25baV0ubGV4ZW1lO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoXyhrZXlzKS5jb250YWlucyhsYWJlbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSEFDSyB0aGlzIGlzIHRoZSBvbmx5IHdheSBJIGNvdWxkIGZpbmQgdG8gaW5zZXJ0IGFuIGFycmF5IGludG8gYW4gYXJyYXkhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzOiBhbnlbXSA9IFtpLCAxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbi5zcGxpY2UuYXBwbHkoZXhwcmVzc2lvbiwgYXJncy5jb25jYXQodGhpcy5jb250ZXh0LmVxdXNbbGFiZWxdKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcGFyc2VyL1ByZXByb2Nlc3NBbmFseXNlci50cyIsImltcG9ydCB7IElUb2tlbiwgVG9rZW5DYXRlZ29yeSB9IGZyb20gXCIuL2ludGVyZmFjZS9JVG9rZW5cIjtcclxuaW1wb3J0ICogYXMgXyBmcm9tIFwidW5kZXJzY29yZVwiO1xyXG5cclxuaW1wb3J0IHsgUGFzc0Jhc2UgfSBmcm9tIFwiLi9QYXNzQmFzZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFByZXByb2Nlc3NFbWl0dGVyIGV4dGVuZHMgUGFzc0Jhc2Uge1xyXG5cclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBQZXJmb3JtIHByZXByb2Nlc3NvciBzdWJzdGl0dXRpb25zLlxyXG4gICAgLy8vIFJlcGxhY2UgRVFVIGRlZmluZWQgbGFiZWxzIHdpdGggY29ycmVzcG9uZGluZyBleHByZXNzaW9uXHJcbiAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgcHJvdGVjdGVkIHByb2Nlc3NMaW5lKCkge1xyXG5cclxuICAgICAgICAvLyBQZXJmb3JtIHByZXByb2Nlc3NvciBzdWJzdGl0dXRpb25cclxuICAgICAgICAvLyBJbnNlcnQgRVFVIGV4cHJlc3Npb25zXHJcblxyXG4gICAgICAgIHZhciBuZXh0ID0gdGhpcy5zdHJlYW0ucGVlaygpO1xyXG5cclxuICAgICAgICBpZiAobmV4dC5jYXRlZ29yeSA9PT0gVG9rZW5DYXRlZ29yeS5MYWJlbCAmJlxyXG4gICAgICAgICAgICBuZXh0LmxleGVtZSBpbiB0aGlzLmNvbnRleHQuZXF1cykge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5yZXBsYWNlTGFiZWwoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZW1pdChbdGhpcy5zdHJlYW0ucmVhZCgpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVwbGFjZUxhYmVsKCkge1xyXG5cclxuICAgICAgICB2YXIgbGFiZWwgPSB0aGlzLnN0cmVhbS5yZWFkKCk7XHJcbiAgICAgICAgdmFyIG9yaWdpbmFsRXhwcmVzc2lvbiA9IHRoaXMuY29udGV4dC5lcXVzW2xhYmVsLmxleGVtZV07XHJcblxyXG4gICAgICAgIHZhciBleHByZXNzaW9uID0gXy5tYXAob3JpZ2luYWxFeHByZXNzaW9uLCAodG9rZW46IElUb2tlbikgPT4ge1xyXG4gICAgICAgICAgICB2YXIgY2xvbmUgPSBfLmNsb25lKHRva2VuKTtcclxuICAgICAgICAgICAgY2xvbmUucG9zaXRpb24gPSBsYWJlbC5wb3NpdGlvbjtcclxuICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmNvbnRleHQuZW1pdChleHByZXNzaW9uKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYXJzZXIvUHJlcHJvY2Vzc0VtaXR0ZXIudHMiLCJpbXBvcnQgeyBJVG9rZW4sIFRva2VuQ2F0ZWdvcnkgfSBmcm9tIFwiLi9pbnRlcmZhY2UvSVRva2VuXCI7XHJcbmltcG9ydCB7IElQYXJzZU9wdGlvbnMsIFN0YW5kYXJkIH0gZnJvbSBcIi4vaW50ZXJmYWNlL0lQYXJzZU9wdGlvbnNcIjtcclxuaW1wb3J0IHsgSUNvbnRleHQgfSBmcm9tIFwiLi9pbnRlcmZhY2UvSUNvbnRleHRcIjtcclxuXHJcbmltcG9ydCB7IFBhc3NCYXNlIH0gZnJvbSBcIi4vUGFzc0Jhc2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBMYWJlbENvbGxlY3RvciBleHRlbmRzIFBhc3NCYXNlIHtcclxuXHJcbiAgICBwcml2YXRlIGxpbmU6IG51bWJlcjtcclxuXHJcbiAgICAvLyBQYXNzIDJcclxuICAgIC8vIFJlY29yZCBsYWJlbCBwb3NpdGlvbnNcclxuICAgIC8vIFJlbW92ZSBsYWJlbCBkZWNsYXJhdGlvbnMgZnJvbSB0aGUgdG9rZW4gc3RyZWFtXHJcbiAgICAvLyBEdXBsaWNhdGUgbGFiZWwgY2hlY2tcclxuICAgIC8vIFN5bnRheCBlcnJvciBpZiBsYWJlbCBkZWNsYXJhdGlvbiBub3QgZm9sbG93ZWQgYnkgYW4gb3Bjb2RlXHJcbiAgICBwdWJsaWMgcHJvY2Vzcyhjb250ZXh0OiBJQ29udGV4dCwgb3B0aW9uczogSVBhcnNlT3B0aW9ucyk6IElDb250ZXh0IHtcclxuXHJcbiAgICAgICAgdGhpcy5saW5lID0gLTE7XHJcblxyXG4gICAgICAgIHJldHVybiBzdXBlci5wcm9jZXNzKGNvbnRleHQsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbGFiZWxOYW1lKHRva2VuOiBJVG9rZW4pOiBzdHJpbmcge1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHRoaXMub3B0aW9ucy5zdGFuZGFyZCkge1xyXG4gICAgICAgICAgICBjYXNlIFN0YW5kYXJkLklDV1M4NjpcclxuICAgICAgICAgICAgY2FzZSBTdGFuZGFyZC5JQ1dTODg6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW4ubGV4ZW1lLmxlbmd0aCA+IDggPyB0b2tlbi5sZXhlbWUuc3Vic3RyKDAsIDgpIDogdG9rZW4ubGV4ZW1lO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuLmxleGVtZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHByb2Nlc3NMaW5lKCkge1xyXG5cclxuICAgICAgICB2YXIgbmV4dCA9IHRoaXMuc3RyZWFtLnBlZWsoKTtcclxuXHJcbiAgICAgICAgaWYgKG5leHQuY2F0ZWdvcnkgPT09IFRva2VuQ2F0ZWdvcnkuTGFiZWwgfHxcclxuICAgICAgICAgICAgbmV4dC5jYXRlZ29yeSA9PT0gVG9rZW5DYXRlZ29yeS5PcGNvZGUpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubGluZSsrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3RyZWFtLnBlZWsoKS5jYXRlZ29yeSA9PT0gVG9rZW5DYXRlZ29yeS5MYWJlbCkge1xyXG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NMYWJlbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHRva2VucyA9IHRoaXMuc3RyZWFtLnJlYWRUb0VPTCgpO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5lbWl0KHRva2Vucyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwcm9jZXNzTGFiZWwoKSB7XHJcblxyXG4gICAgICAgIHdoaWxlICghdGhpcy5zdHJlYW0uZW9mKCkgJiYgdGhpcy5zdHJlYW0ucGVlaygpLmNhdGVnb3J5ID09PSBUb2tlbkNhdGVnb3J5LkxhYmVsKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgbGFiZWwgPSB0aGlzLnN0cmVhbS5leHBlY3QoVG9rZW5DYXRlZ29yeS5MYWJlbCk7XHJcbiAgICAgICAgICAgIHZhciBuYW1lID0gdGhpcy5sYWJlbE5hbWUobGFiZWwpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG5hbWUgaW4gdGhpcy5jb250ZXh0LmxhYmVscyB8fFxyXG4gICAgICAgICAgICAgICAgbmFtZSBpbiB0aGlzLmNvbnRleHQuZXF1cykge1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc3RyZWFtLndhcm4obGFiZWwsIFwiUmVkZWZpbml0aW9uIG9mIGxhYmVsICdcIiArIHRoaXMubGFiZWxOYW1lKGxhYmVsKSArIFwiJywgb3JpZ2luYWwgZGVmaW5pdGlvbiB3aWxsIGJlIHVzZWRcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQubGFiZWxzW25hbWVdID0gdGhpcy5saW5lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgbmV4dCA9IHRoaXMuc3RyZWFtLnBlZWsoKTtcclxuXHJcbiAgICAgICAgaWYgKG5leHQubGV4ZW1lID09PSBcIkVORFwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBvcGNvZGUgPSB0aGlzLnN0cmVhbS5leHBlY3QoVG9rZW5DYXRlZ29yeS5PcGNvZGUpO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5lbWl0U2luZ2xlKG9wY29kZSk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcGFyc2VyL0xhYmVsQ29sbGVjdG9yLnRzIiwiaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi9pbnRlcmZhY2UvSU1lc3NhZ2VcIjtcclxuaW1wb3J0IHsgSVRva2VuLCBUb2tlbkNhdGVnb3J5IH0gZnJvbSBcIi4vaW50ZXJmYWNlL0lUb2tlblwiO1xyXG5pbXBvcnQgeyBJUGFyc2VPcHRpb25zLCBTdGFuZGFyZCB9IGZyb20gXCIuL2ludGVyZmFjZS9JUGFyc2VPcHRpb25zXCI7XHJcbmltcG9ydCB7IElDb250ZXh0IH0gZnJvbSBcIi4vaW50ZXJmYWNlL0lDb250ZXh0XCI7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSBcInVuZGVyc2NvcmVcIjtcclxuXHJcbmltcG9ydCB7IFBhc3NCYXNlIH0gZnJvbSBcIi4vUGFzc0Jhc2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBMYWJlbEVtaXR0ZXIgZXh0ZW5kcyBQYXNzQmFzZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBsaW5lOiBudW1iZXI7XHJcblxyXG4gICAgcHVibGljIHByb2Nlc3MoY29udGV4dDogSUNvbnRleHQsIG9wdGlvbnM6IElQYXJzZU9wdGlvbnMpOiBJQ29udGV4dCB7XHJcblxyXG4gICAgICAgIHRoaXMubGluZSA9IDA7XHJcbiAgICAgICAgcmV0dXJuIHN1cGVyLnByb2Nlc3MoY29udGV4dCwgb3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsYWJlbE5hbWUodG9rZW46IElUb2tlbik6IHN0cmluZyB7XHJcblxyXG4gICAgICAgIHN3aXRjaCAodGhpcy5vcHRpb25zLnN0YW5kYXJkKSB7XHJcbiAgICAgICAgICAgIGNhc2UgU3RhbmRhcmQuSUNXUzg2OlxyXG4gICAgICAgICAgICBjYXNlIFN0YW5kYXJkLklDV1M4ODpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbi5sZXhlbWUubGVuZ3RoID4gOCA/IHRva2VuLmxleGVtZS5zdWJzdHIoMCwgOCkgOiB0b2tlbi5sZXhlbWU7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW4ubGV4ZW1lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgcHJvY2Vzc0xpbmUoKSB7XHJcblxyXG4gICAgICAgIC8vIFBhc3MgM1xyXG4gICAgICAgIC8vIFJlcGxhY2UgbGFiZWxzIHdpdGggbnVtYmVyc1xyXG4gICAgICAgIC8vIFJhaXNlIHN5bnRheCBlcnJvciBmb3IgdW5kZWNsYXJlZCBsYWJlbHNcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3RyZWFtLnBlZWsoKS5jYXRlZ29yeSA9PT0gVG9rZW5DYXRlZ29yeS5PcGNvZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9jZXNzTGluZVRva2Vucyh0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5saW5lKys7XHJcbiAgICAgICAgfSBlbHNlIGlmKHRoaXMuc3RyZWFtLnBlZWsoKS5jYXRlZ29yeSA9PT0gVG9rZW5DYXRlZ29yeS5QcmVwcm9jZXNzb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9jZXNzTGluZVRva2VucyhmYWxzZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIHRva2VucyA9IHRoaXMuc3RyZWFtLnJlYWRUb0VPTCgpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZW1pdCh0b2tlbnMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHByb2Nlc3NMaW5lVG9rZW5zKGlzT3Bjb2RlOiBib29sZWFuKSB7XHJcblxyXG4gICAgICAgIHZhciB0b2tlbnMgPSB0aGlzLnN0cmVhbS5yZWFkVG9FT0woKTtcclxuXHJcbiAgICAgICAgXy5mb3JFYWNoKHRva2VucywgKHRva2VuOiBJVG9rZW4pID0+IHtcclxuXHJcbiAgICAgICAgICAgIGlmICh0b2tlbi5jYXRlZ29yeSA9PT0gVG9rZW5DYXRlZ29yeS5MYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzTGFiZWwodG9rZW4sIGlzT3Bjb2RlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5lbWl0U2luZ2xlKHRva2VuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmFpc2VVbmRlY2xhcmVkTGFiZWwobGFiZWw6IElUb2tlbikge1xyXG5cclxuICAgICAgICB0aGlzLmNvbnRleHQubWVzc2FnZXMucHVzaCh7XHJcbiAgICAgICAgICAgIHR5cGU6IE1lc3NhZ2VUeXBlLkVycm9yLFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogbGFiZWwucG9zaXRpb24sXHJcbiAgICAgICAgICAgIHRleHQ6IFwiVW5yZWNvZ25pc2VkIGxhYmVsICdcIiArIHRoaXMubGFiZWxOYW1lKGxhYmVsKSArIFwiJ1wiXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwcm9jZXNzTGFiZWwobGFiZWw6IElUb2tlbiwgaXNPcGNvZGU6IGJvb2xlYW4pIHtcclxuXHJcbiAgICAgICAgdmFyIG5hbWUgPSB0aGlzLmxhYmVsTmFtZShsYWJlbCk7XHJcblxyXG4gICAgICAgIGlmIChuYW1lIGluIHRoaXMuY29udGV4dC5sYWJlbHMpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBsYWJlbExpbmUgPSB0aGlzLmNvbnRleHQubGFiZWxzW25hbWVdO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRpZmYgPSBsYWJlbExpbmU7XHJcbiAgICAgICAgICAgIGlmIChpc09wY29kZSkge1xyXG4gICAgICAgICAgICAgICAgZGlmZiAtPSB0aGlzLmxpbmU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciB0b2tlbiA9IHtcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiBUb2tlbkNhdGVnb3J5Lk51bWJlcixcclxuICAgICAgICAgICAgICAgIGxleGVtZTogZGlmZi50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IF8uY2xvbmUobGFiZWwucG9zaXRpb24pXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZW1pdFNpbmdsZSh0b2tlbik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucmFpc2VVbmRlY2xhcmVkTGFiZWwobGFiZWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYXJzZXIvTGFiZWxFbWl0dGVyLnRzIiwiaW1wb3J0IHsgSUV4cHJlc3Npb24gfSBmcm9tIFwiLi9pbnRlcmZhY2UvSUV4cHJlc3Npb25cIjtcclxuaW1wb3J0IHsgVG9rZW5DYXRlZ29yeSB9IGZyb20gXCIuL2ludGVyZmFjZS9JVG9rZW5cIjtcclxuaW1wb3J0ICogYXMgXyBmcm9tIFwidW5kZXJzY29yZVwiO1xyXG5pbXBvcnQgeyBQYXNzQmFzZSB9IGZyb20gXCIuL1Bhc3NCYXNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTWF0aHNQcm9jZXNzb3IgZXh0ZW5kcyBQYXNzQmFzZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBleHByZXNzaW9uOiBJRXhwcmVzc2lvbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihleHByZXNzaW9uOiBJRXhwcmVzc2lvbikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5leHByZXNzaW9uID0gZXhwcmVzc2lvbjtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgcHJvY2Vzc0xpbmUoKSB7XHJcblxyXG4gICAgICAgIC8vIE1hdGhzIFByb2Nlc3NvclxyXG4gICAgICAgIC8vIExvY2F0ZSBhbmQgcmVzb2x2ZSBtYXRoZW1hdGljYWwgZXhwcmVzc2lvbnMgdG8gcmVzdWx0aW5nIGFkZHJlc3NcclxuXHJcbiAgICAgICAgdmFyIG5leHQgPSB0aGlzLnN0cmVhbS5wZWVrKCk7XHJcblxyXG4gICAgICAgIGlmIChuZXh0LmNhdGVnb3J5ID09PSBUb2tlbkNhdGVnb3J5Lk51bWJlciB8fFxyXG4gICAgICAgICAgICBuZXh0LmNhdGVnb3J5ID09PSBUb2tlbkNhdGVnb3J5Lk1hdGhzKSB7XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGFkZHJlc3MgPSB0aGlzLmV4cHJlc3Npb24ucGFyc2UodGhpcy5zdHJlYW0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5lbWl0U2luZ2xlKHtcclxuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeTogVG9rZW5DYXRlZ29yeS5OdW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGV4ZW1lOiBhZGRyZXNzLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IF8uY2xvbmUobmV4dC5wb3NpdGlvbilcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RyZWFtLnJlYWRUb0VPTCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmVtaXRTaW5nbGUodGhpcy5zdHJlYW0ucmVhZCgpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYXJzZXIvTWF0aHNQcm9jZXNzb3IudHMiLCJpbXBvcnQgeyBJRXhwcmVzc2lvbiB9IGZyb20gXCIuL2ludGVyZmFjZS9JRXhwcmVzc2lvblwiO1xyXG5pbXBvcnQgeyBJVG9rZW4sIFRva2VuQ2F0ZWdvcnkgfSBmcm9tIFwiLi9pbnRlcmZhY2UvSVRva2VuXCI7XHJcbmltcG9ydCB7IElUb2tlblN0cmVhbSB9IGZyb20gXCIuL2ludGVyZmFjZS9JVG9rZW5TdHJlYW1cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBFeHByZXNzaW9uIGltcGxlbWVudHMgSUV4cHJlc3Npb24ge1xyXG5cclxuICAgIHByaXZhdGUgc3RyZWFtOiBJVG9rZW5TdHJlYW07XHJcblxyXG4gICAgcHVibGljIHBhcnNlKHN0cmVhbTogSVRva2VuU3RyZWFtKTogbnVtYmVyIHtcclxuXHJcbiAgICAgICAgdGhpcy5zdHJlYW0gPSBzdHJlYW07XHJcblxyXG4gICAgICAgIHRoaXMuc3RyZWFtLnBlZWsoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXhwcmVzc2lvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZXhwcmVzc2lvbigpOiBudW1iZXIge1xyXG5cclxuICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy50ZXJtKCk7XHJcblxyXG4gICAgICAgIHdoaWxlICghdGhpcy5zdHJlYW0uZW9mKCkpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBuZXh0ID0gdGhpcy5zdHJlYW0ucGVlaygpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG5leHQubGV4ZW1lID09PSBcIitcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdHJlYW0ucmVhZCgpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IHRoaXMudGVybSgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5leHQubGV4ZW1lID09PSBcIi1cIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdHJlYW0ucmVhZCgpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0IC09IHRoaXMudGVybSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0ZXJtKCk6IG51bWJlciB7XHJcblxyXG4gICAgICAgIHZhciByZXN1bHQgPSB0aGlzLmZhY3RvcigpO1xyXG5cclxuICAgICAgICB3aGlsZSAoIXRoaXMuc3RyZWFtLmVvZigpKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgbmV4dCA9IHRoaXMuc3RyZWFtLnBlZWsoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChuZXh0LmxleGVtZSA9PT0gXCIqXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RyZWFtLnJlYWQoKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCAqPSB0aGlzLmZhY3RvcigpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5leHQubGV4ZW1lID09PSBcIi9cIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdHJlYW0ucmVhZCgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRpdmlzb3IgPSB0aGlzLmZhY3RvcigpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5kaXZpc2lvbihuZXh0LCByZXN1bHQsIGRpdmlzb3IpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5leHQubGV4ZW1lID09PSBcIiVcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdHJlYW0ucmVhZCgpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ICU9IHRoaXMuZmFjdG9yKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRpdmlzaW9uKHRva2VuOiBJVG9rZW4sIG51bWVyYXRvcjogbnVtYmVyLCBkZW5vbWluYXRvcjogbnVtYmVyKTogbnVtYmVyIHtcclxuXHJcbiAgICAgICAgaWYgKGRlbm9taW5hdG9yID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RyZWFtLmVycm9yKHRva2VuLCBcIkRpdmlkZSBieSB6ZXJvIGlzIG5vdCBwZXJtaXR0ZWRcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgcXVvdGllbnQgPSBudW1lcmF0b3IgLyBkZW5vbWluYXRvcjtcclxuICAgICAgICB2YXIgcm91bmRlZCA9IHRoaXMuaW50ZWdlclJvdW5kKHF1b3RpZW50KTtcclxuXHJcbiAgICAgICAgaWYgKHJvdW5kZWQgIT09IHF1b3RpZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RyZWFtLndhcm4odG9rZW4sIFwiUm91bmRlZCBub24taW50ZWdlciBkaXZpc2lvbiB0cnVuY2F0ZWQgdG8gaW50ZWdlciB2YWx1ZVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByb3VuZGVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDIyODM1Ni9pbnRlZ2VyLWRpdmlzaW9uLWluLWphdmFzY3JpcHRcclxuICAgIHByaXZhdGUgaW50ZWdlclJvdW5kKHZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIC8qIHRzbGludDpkaXNhYmxlICovXHJcbiAgICAgICAgcmV0dXJuIHZhbHVlID4+IDA7XHJcbiAgICAgICAgLyogdHNsaW50OmVuYWJsZSAqL1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmFjdG9yKCk6IG51bWJlciB7XHJcblxyXG4gICAgICAgIHZhciBuZXh0ID0gdGhpcy5zdHJlYW0ucGVlaygpO1xyXG5cclxuICAgICAgICBpZiAobmV4dC5sZXhlbWUgPT09IFwiK1wiIHx8XHJcbiAgICAgICAgICAgIG5leHQubGV4ZW1lID09PSBcIi1cIikge1xyXG5cclxuICAgICAgICAgICAgLy8gUGxhY2UgYSB6ZXJvIGluIGZyb250IG9mIGEgLSBvciArIHRvIGFsbG93IGUuZy4gLTcgdG8gYmUgZW50ZXJlZFxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9IGVsc2UgaWYgKG5leHQubGV4ZW1lID09PSBcIihcIikge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdHJlYW0uZXhwZWN0T25seShcIihcIik7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLmV4cHJlc3Npb24oKTtcclxuICAgICAgICAgICAgdGhpcy5zdHJlYW0uZXhwZWN0T25seShcIilcIik7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN0cmVhbS5leHBlY3QoVG9rZW5DYXRlZ29yeS5OdW1iZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQobmV4dC5sZXhlbWUsIDEwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYXJzZXIvRXhwcmVzc2lvbi50cyIsImltcG9ydCB7IElUb2tlbiwgVG9rZW5DYXRlZ29yeSB9IGZyb20gXCIuL2ludGVyZmFjZS9JVG9rZW5cIjtcclxuXHJcbmltcG9ydCB7IFBhc3NCYXNlIH0gZnJvbSBcIi4vUGFzc0Jhc2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBGaWx0ZXIgZXh0ZW5kcyBQYXNzQmFzZSB7XHJcblxyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIEZpbHRlcnMgc3VwZXJmbHVvdXMgdG9rZW5zIGZyb20gdGhlIHRva2VuIHN0cmVhbS5cclxuICAgIC8vLyBSZW1vdmVzIGFueSBlbXB0eSBsaW5lcyBhbmQgYW55dGhpbmcgYWZ0ZXIgdGhlIEVORCBwcmVwcm9jZXNzb3IgY29tbWFuZFxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIHByb3RlY3RlZCBwcm9jZXNzTGluZSgpIHtcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGVtcHR5IGxpbmVzIGZyb20gc3RyZWFtXHJcbiAgICAgICAgLy8gUmVtb3ZlIGFueXRoaW5nIGFmdGVyIEVORCBmcm9tIHN0cmVhbVxyXG5cclxuICAgICAgICB2YXIgbGluZTogSVRva2VuW107XHJcbiAgICAgICAgdmFyIG5leHQgPSB0aGlzLnN0cmVhbS5wZWVrKCk7XHJcblxyXG4gICAgICAgIHN3aXRjaCAobmV4dC5jYXRlZ29yeSkge1xyXG4gICAgICAgICAgICBjYXNlIFRva2VuQ2F0ZWdvcnkuRU9MOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzRW1wdHlMaW5lKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBUb2tlbkNhdGVnb3J5LlByZXByb2Nlc3NvcjpcclxuICAgICAgICAgICAgICAgIGlmIChuZXh0LmxleGVtZSA9PT0gXCJFTkRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0VuZCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsaW5lID0gdGhpcy5zdHJlYW0ucmVhZFRvRU9MKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmVtaXQobGluZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGxpbmUgPSB0aGlzLnN0cmVhbS5yZWFkVG9FT0woKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5lbWl0KGxpbmUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcHJvY2Vzc0VtcHR5TGluZSgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5zdHJlYW0ucmVhZFRvRU9MKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwcm9jZXNzRW5kKCkge1xyXG5cclxuICAgICAgICB2YXIgbGluZSA9IHRoaXMuc3RyZWFtLnJlYWRUb0VPTCgpO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5lbWl0KGxpbmUpO1xyXG4gICAgICAgIHRoaXMuc3RyZWFtLnBvc2l0aW9uID0gdGhpcy5zdHJlYW0udG9rZW5zLmxlbmd0aDtcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3BhcnNlci9GaWx0ZXIudHMiLCJpbXBvcnQgeyBTdGFuZGFyZCB9IGZyb20gXCIuL2ludGVyZmFjZS9JUGFyc2VPcHRpb25zXCI7XHJcbmltcG9ydCB7IElUb2tlbiwgVG9rZW5DYXRlZ29yeSB9IGZyb20gXCIuL2ludGVyZmFjZS9JVG9rZW5cIjtcclxuaW1wb3J0IHsgSVBhcnNlSW5zdHJ1Y3Rpb24gfSBmcm9tIFwiLi9pbnRlcmZhY2UvSVBhcnNlSW5zdHJ1Y3Rpb25cIjtcclxuaW1wb3J0ICogYXMgXyBmcm9tIFwidW5kZXJzY29yZVwiO1xyXG5pbXBvcnQgeyBQYXNzQmFzZSB9IGZyb20gXCIuL1Bhc3NCYXNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRGVmYXVsdFBhc3MgZXh0ZW5kcyBQYXNzQmFzZSB7XHJcblxyXG4gICAgcHJvdGVjdGVkIHByb2Nlc3NMaW5lKCkge1xyXG5cclxuICAgICAgICAvLyBTaG91bGQgc3BlY2lmeSBkZWZhdWx0XHJcbiAgICAgICAgLy8gICAgTW9kaWZpZXJzIChkZXBlbmRzIHVwb24gb3Bjb2RlKVxyXG4gICAgICAgIC8vICAgIE1vZGVzICgkKVxyXG4gICAgICAgIC8vICAgIE9wZXJhbmRzICQwXHJcblxyXG4gICAgICAgIHZhciBuZXh0ID0gdGhpcy5zdHJlYW0ucGVlaygpO1xyXG5cclxuICAgICAgICBpZiAobmV4dC5jYXRlZ29yeSA9PT0gVG9rZW5DYXRlZ29yeS5PcGNvZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9jZXNzSW5zdHJ1Y3Rpb24oKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZW1pdCh0aGlzLnN0cmVhbS5yZWFkVG9FT0woKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcHJvY2Vzc0luc3RydWN0aW9uKCkge1xyXG5cclxuICAgICAgICB2YXIgaW5zdHJ1Y3Rpb246IElQYXJzZUluc3RydWN0aW9uID0gdGhpcy5yZWFkSW5zdHJ1Y3Rpb24oKTtcclxuXHJcbiAgICAgICAgaWYgKGluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3MgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgLy8gQSBhZGRyZXNzIGlzIG1hbmRhdG9yeSwgZGlzY2FyZCB0aGUgcmVzdCBvZiB0aGlzIGxpbmUgYW5kIGxlYXZlIGZvciBzeW50YXggY2hlY2tcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmVtaXQoW1xyXG4gICAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb24ub3Bjb2RlLFxyXG4gICAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb24ubW9kaWZpZXIsXHJcbiAgICAgICAgICAgICAgICBpbnN0cnVjdGlvbi5hT3BlcmFuZC5tb2RlXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZW1pdCh0aGlzLnN0cmVhbS5yZWFkVG9FT0woKSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZGVmYXVsdEJPcGVyYW5kKGluc3RydWN0aW9uKTtcclxuXHJcbiAgICAgICAgdGhpcy5kZWZhdWx0TW9kaWZpZXIoaW5zdHJ1Y3Rpb24pO1xyXG5cclxuICAgICAgICB0aGlzLmVtaXRJbnN0cnVjdGlvbihpbnN0cnVjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkSW5zdHJ1Y3Rpb24oKTogSVBhcnNlSW5zdHJ1Y3Rpb24ge1xyXG5cclxuICAgICAgICB2YXIgaW5zdHJ1Y3Rpb246IElQYXJzZUluc3RydWN0aW9uID0ge307XHJcblxyXG4gICAgICAgIGluc3RydWN0aW9uLm9wY29kZSA9IHRoaXMuc3RyZWFtLmV4cGVjdChUb2tlbkNhdGVnb3J5Lk9wY29kZSk7XHJcbiAgICAgICAgaW5zdHJ1Y3Rpb24ubW9kaWZpZXIgPSB0aGlzLnRyeVJlYWQoVG9rZW5DYXRlZ29yeS5Nb2RpZmllcik7XHJcbiAgICAgICAgaW5zdHJ1Y3Rpb24uYU9wZXJhbmQgPSB7XHJcbiAgICAgICAgICAgIG1vZGU6IHRoaXMucmVhZE9yRGVmYXVsdE1vZGUoaW5zdHJ1Y3Rpb24ub3Bjb2RlKSxcclxuICAgICAgICAgICAgYWRkcmVzczogdGhpcy50cnlSZWFkKFRva2VuQ2F0ZWdvcnkuTnVtYmVyKVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGluc3RydWN0aW9uLmNvbW1hID0gbnVsbDtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnN0YW5kYXJkIDw9IFN0YW5kYXJkLklDV1M4OCkge1xyXG4gICAgICAgICAgICBpbnN0cnVjdGlvbi5jb21tYSA9IHRoaXMucmVhZE9yRGVmYXVsdENvbW1hKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0cmVhbS5wZWVrKCkuY2F0ZWdvcnkgPT09IFRva2VuQ2F0ZWdvcnkuQ29tbWEpIHtcclxuICAgICAgICAgICAgaW5zdHJ1Y3Rpb24uY29tbWEgPSB0aGlzLnN0cmVhbS5yZWFkKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnN0cnVjdGlvbi5iT3BlcmFuZCA9IHtcclxuICAgICAgICAgICAgbW9kZTogdGhpcy5yZWFkT3JEZWZhdWx0TW9kZShpbnN0cnVjdGlvbi5vcGNvZGUpLFxyXG4gICAgICAgICAgICBhZGRyZXNzOiB0aGlzLnRyeVJlYWQoVG9rZW5DYXRlZ29yeS5OdW1iZXIpXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGluc3RydWN0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJ5UmVhZChjYXRlZ29yeTogVG9rZW5DYXRlZ29yeSk6IElUb2tlbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RyZWFtLnBlZWsoKS5jYXRlZ29yeSA9PT0gY2F0ZWdvcnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RyZWFtLnJlYWQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVhZE9yRGVmYXVsdENvbW1hKCk6IElUb2tlbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RyZWFtLnBlZWsoKS5jYXRlZ29yeSA9PT0gVG9rZW5DYXRlZ29yeS5Db21tYSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdHJlYW0ucmVhZCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogVG9rZW5DYXRlZ29yeS5Db21tYSxcclxuICAgICAgICAgICAgICAgIGxleGVtZTogXCIsXCIsXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogXy5jbG9uZSh0aGlzLnN0cmVhbS5wZWVrKCkucG9zaXRpb24pXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVhZE9yRGVmYXVsdE1vZGUob3Bjb2RlOiBJVG9rZW4pOiBJVG9rZW4ge1xyXG4gICAgICAgIGlmICh0aGlzLnN0cmVhbS5wZWVrKCkuY2F0ZWdvcnkgPT09IFRva2VuQ2F0ZWdvcnkuTW9kZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdHJlYW0ucmVhZCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgbW9kZSA9IFwiJFwiO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zdGFuZGFyZCA8IFN0YW5kYXJkLklDV1M5NGRyYWZ0ICYmXHJcbiAgICAgICAgICAgICAgICBvcGNvZGUubGV4ZW1lID09PSBcIkRBVFwiKSB7XHJcbiAgICAgICAgICAgICAgICBtb2RlID0gXCIjXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogVG9rZW5DYXRlZ29yeS5Nb2RlLFxyXG4gICAgICAgICAgICAgICAgbGV4ZW1lOiBtb2RlLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IF8uY2xvbmUodGhpcy5zdHJlYW0ucGVlaygpLnBvc2l0aW9uKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRlZmF1bHRCT3BlcmFuZChpbnN0cnVjdGlvbjogSVBhcnNlSW5zdHJ1Y3Rpb24pIHtcclxuXHJcbiAgICAgICAgaWYgKGluc3RydWN0aW9uLmJPcGVyYW5kLmFkZHJlc3MgPT09IG51bGwpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChpbnN0cnVjdGlvbi5jb21tYSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb24uY29tbWEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnk6IFRva2VuQ2F0ZWdvcnkuQ29tbWEsXHJcbiAgICAgICAgICAgICAgICAgICAgbGV4ZW1lOiBcIixcIixcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogXy5jbG9uZSh0aGlzLnN0cmVhbS5wZWVrKCkucG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzID0ge1xyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6IFRva2VuQ2F0ZWdvcnkuTnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgbGV4ZW1lOiBcIjBcIixcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBfLmNsb25lKHRoaXMuc3RyZWFtLnBlZWsoKS5wb3NpdGlvbilcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpbnN0cnVjdGlvbi5vcGNvZGUubGV4ZW1lID09PSBcIkRBVFwiKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb24uYk9wZXJhbmQubW9kZS5sZXhlbWUgPSBcIiNcIjtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdGVtcE9wZXJhbmQgPSBpbnN0cnVjdGlvbi5hT3BlcmFuZDtcclxuICAgICAgICAgICAgICAgIGluc3RydWN0aW9uLmFPcGVyYW5kID0gaW5zdHJ1Y3Rpb24uYk9wZXJhbmQ7XHJcbiAgICAgICAgICAgICAgICBpbnN0cnVjdGlvbi5iT3BlcmFuZCA9IHRlbXBPcGVyYW5kO1xyXG5cclxuICAgICAgICAgICAgICAgIGluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3MucG9zaXRpb24gPSBpbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb24uYU9wZXJhbmQubW9kZS5wb3NpdGlvbiA9IGluc3RydWN0aW9uLmJPcGVyYW5kLm1vZGUucG9zaXRpb247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkZWZhdWx0TW9kaWZpZXIoaW5zdHJ1Y3Rpb246IElQYXJzZUluc3RydWN0aW9uKSB7XHJcblxyXG4gICAgICAgIGlmIChpbnN0cnVjdGlvbi5tb2RpZmllciA9PT0gbnVsbCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRva2VuID0ge1xyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6IFRva2VuQ2F0ZWdvcnkuTW9kaWZpZXIsXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogXy5jbG9uZShpbnN0cnVjdGlvbi5vcGNvZGUucG9zaXRpb24pLFxyXG4gICAgICAgICAgICAgICAgbGV4ZW1lOiBcIlwiXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKGluc3RydWN0aW9uLm9wY29kZS5sZXhlbWUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJEQVRcIjpcclxuICAgICAgICAgICAgICAgICAgICB0b2tlbi5sZXhlbWUgPSBcIi5GXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiTU9WXCI6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiQ01QXCI6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiU0VRXCI6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiU05FXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluc3RydWN0aW9uLmFPcGVyYW5kLm1vZGUubGV4ZW1lID09PSBcIiNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbi5sZXhlbWUgPSBcIi5BQlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5zdHJ1Y3Rpb24uYk9wZXJhbmQubW9kZS5sZXhlbWUgPT09IFwiI1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuLmxleGVtZSA9IFwiLkJcIjtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbi5sZXhlbWUgPSBcIi5JXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIkFERFwiOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBcIlNVQlwiOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBcIk1VTFwiOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBcIkRJVlwiOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBcIk1PRFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnN0cnVjdGlvbi5hT3BlcmFuZC5tb2RlLmxleGVtZSA9PT0gXCIjXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4ubGV4ZW1lID0gXCIuQUJcIjtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGluc3RydWN0aW9uLmJPcGVyYW5kLm1vZGUubGV4ZW1lID09PSBcIiNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbi5sZXhlbWUgPSBcIi5CXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMuc3RhbmRhcmQgIT09IFN0YW5kYXJkLklDV1M4Nikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbi5sZXhlbWUgPSBcIi5GXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4ubGV4ZW1lID0gXCIuQlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJTTFRcIjpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5zdHJ1Y3Rpb24uYU9wZXJhbmQubW9kZS5sZXhlbWUgPT09IFwiI1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuLmxleGVtZSA9IFwiLkFCXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4ubGV4ZW1lID0gXCIuQlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJKTVBcIjpcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJKTVpcIjpcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJKTU5cIjpcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJESk5cIjpcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJTUExcIjpcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJOT1BcIjpcclxuICAgICAgICAgICAgICAgICAgICB0b2tlbi5sZXhlbWUgPSBcIi5CXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGluc3RydWN0aW9uLm1vZGlmaWVyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaW5zdHJ1Y3Rpb24ubW9kaWZpZXIgPSB0b2tlbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBlbWl0SW5zdHJ1Y3Rpb24oaW5zdHJ1Y3Rpb246IElQYXJzZUluc3RydWN0aW9uKSB7XHJcblxyXG4gICAgICAgIHRoaXMuY29udGV4dC5lbWl0U2luZ2xlKGluc3RydWN0aW9uLm9wY29kZSk7XHJcbiAgICAgICAgaWYgKGluc3RydWN0aW9uLm1vZGlmaWVyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5lbWl0U2luZ2xlKGluc3RydWN0aW9uLm1vZGlmaWVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmVtaXQoW2luc3RydWN0aW9uLmFPcGVyYW5kLm1vZGUsIGluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3NdKTtcclxuICAgICAgICBpZiAoaW5zdHJ1Y3Rpb24uY29tbWEgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmVtaXRTaW5nbGUoaW5zdHJ1Y3Rpb24uY29tbWEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbnRleHQuZW1pdChbaW5zdHJ1Y3Rpb24uYk9wZXJhbmQubW9kZSwgaW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzc10pO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5lbWl0KHRoaXMuc3RyZWFtLnJlYWRUb0VPTCgpKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYXJzZXIvRGVmYXVsdFBhc3MudHMiLCJpbXBvcnQgeyBJVG9rZW4sIFRva2VuQ2F0ZWdvcnkgfSBmcm9tIFwiLi9pbnRlcmZhY2UvSVRva2VuXCI7XHJcbmltcG9ydCB7IElDb250ZXh0IH0gZnJvbSBcIi4vaW50ZXJmYWNlL0lDb250ZXh0XCI7XHJcbmltcG9ydCB7IElQYXJzZU9wdGlvbnMsIFN0YW5kYXJkIH0gZnJvbSBcIi4vaW50ZXJmYWNlL0lQYXJzZU9wdGlvbnNcIjtcclxuaW1wb3J0ICogYXMgXyBmcm9tIFwidW5kZXJzY29yZVwiO1xyXG5cclxuaW1wb3J0IHsgUGFzc0Jhc2UgfSBmcm9tIFwiLi9QYXNzQmFzZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE9yZ1Bhc3MgZXh0ZW5kcyBQYXNzQmFzZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBmaXJzdEluc3RydWN0aW9uOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG9yZ0FkZHJlc3M6IG51bWJlcjtcclxuICAgIHByaXZhdGUgb3JnQ29tbWVudDogSVRva2VuO1xyXG4gICAgcHJpdmF0ZSBvcmc6IElUb2tlbjtcclxuXHJcbiAgICBwdWJsaWMgcHJvY2Vzcyhjb250ZXh0OiBJQ29udGV4dCwgb3B0aW9uczogSVBhcnNlT3B0aW9ucyk6IElDb250ZXh0IHtcclxuXHJcbiAgICAgICAgLy8gUmVwbGFjZSBFTkQgIyMjIHdpdGggT1JHICMjI1xyXG4gICAgICAgIC8vIEVtaXQgT1JHIGFzIGZpcnN0IGluc3RydWN0aW9uXHJcbiAgICAgICAgLy8gUmFpc2Ugd2FybmluZyBmb3IgZHVwbGljYXRlIE9SR3MgLyBFTkQgIyMjXHJcbiAgICAgICAgLy8gVW5kZXIgSUNXUyc4NiAtIGlmIG5vIEVORCAjIyMgZm91bmQsIGlmIHN0YXJ0IGxhYmVsIGRlZmluZWQsIGVtaXQgT1JHIHN0YXJ0XHJcblxyXG4gICAgICAgIHRoaXMuZmlyc3RJbnN0cnVjdGlvbiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5vcmcgPSBudWxsO1xyXG4gICAgICAgIHRoaXMub3JnQWRkcmVzcyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5vcmdDb21tZW50ID0gbnVsbDtcclxuXHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHN1cGVyLnByb2Nlc3MoY29udGV4dCwgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIHRoaXMuZW1pdE9yZygpO1xyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBwcm9jZXNzTGluZSgpIHtcclxuXHJcbiAgICAgICAgdmFyIG5leHQgPSB0aGlzLnN0cmVhbS5wZWVrKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmZpcnN0SW5zdHJ1Y3Rpb24gPT09IG51bGwgJiZcclxuICAgICAgICAgICAgbmV4dC5jYXRlZ29yeSAhPT0gVG9rZW5DYXRlZ29yeS5Db21tZW50KSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmZpcnN0SW5zdHJ1Y3Rpb24gPSB0aGlzLnN0cmVhbS5wb3NpdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChuZXh0LmNhdGVnb3J5ID09PSBUb2tlbkNhdGVnb3J5LlByZXByb2Nlc3Nvcikge1xyXG5cclxuICAgICAgICAgICAgaWYgKG5leHQubGV4ZW1lID09PSBcIk9SR1wiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NPcmcoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChuZXh0LmxleGVtZSA9PT0gXCJFTkRcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzRW5kKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZW1pdCh0aGlzLnN0cmVhbS5yZWFkVG9FT0woKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZW1pdCh0aGlzLnN0cmVhbS5yZWFkVG9FT0woKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcHJvY2Vzc09yZygpIHtcclxuXHJcbiAgICAgICAgdmFyIG9yZyA9IHRoaXMuc3RyZWFtLmV4cGVjdE9ubHkoXCJPUkdcIik7XHJcbiAgICAgICAgdGhpcy5vcmcgPSBvcmc7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9yZ0FkZHJlc3MgIT09IG51bGwpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RyZWFtLndhcm4ob3JnLCBcIlJlZGVmaW5pdGlvbiBvZiBPUkcgZW5jb3VudGVyZWQsIHRoaXMgbGF0ZXIgZGVmaW5pdGlvbiB3aWxsIHRha2UgZWZmZWN0XCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGFkZHJlc3MgPSB0aGlzLnN0cmVhbS5leHBlY3QoVG9rZW5DYXRlZ29yeS5OdW1iZXIpO1xyXG5cclxuICAgICAgICB0aGlzLm9yZ0FkZHJlc3MgPSBwYXJzZUludChhZGRyZXNzLmxleGVtZSwgMTApO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zdHJlYW0ucGVlaygpLmNhdGVnb3J5ID09PSBUb2tlbkNhdGVnb3J5LkNvbW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5vcmdDb21tZW50ID0gdGhpcy5zdHJlYW0ucmVhZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zdHJlYW0uZXhwZWN0KFRva2VuQ2F0ZWdvcnkuRU9MKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHByb2Nlc3NFbmQoKSB7XHJcblxyXG4gICAgICAgIHZhciBlbmQgPSB0aGlzLnN0cmVhbS5leHBlY3RPbmx5KFwiRU5EXCIpO1xyXG4gICAgICAgIHZhciBhZGRyZXNzOiBJVG9rZW4gPSBudWxsO1xyXG4gICAgICAgIHZhciBjb21tZW50OiBJVG9rZW4gPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zdHJlYW0ucGVlaygpLmNhdGVnb3J5ID09PSBUb2tlbkNhdGVnb3J5Lk51bWJlcikge1xyXG5cclxuICAgICAgICAgICAgYWRkcmVzcyA9IHRoaXMuc3RyZWFtLnJlYWQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnN0cmVhbS5wZWVrKCkuY2F0ZWdvcnkgPT09IFRva2VuQ2F0ZWdvcnkuQ29tbWVudCkge1xyXG5cclxuICAgICAgICAgICAgY29tbWVudCA9IHRoaXMuc3RyZWFtLnJlYWQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc3RyZWFtLmV4cGVjdChUb2tlbkNhdGVnb3J5LkVPTCk7XHJcblxyXG4gICAgICAgIGlmIChhZGRyZXNzICE9PSBudWxsKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5vcmdBZGRyZXNzICE9PSBudWxsKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdHJlYW0ud2FybihlbmQsIFwiRW5jb3VudGVyZWQgYm90aCBPUkcgYW5kIEVORCBhZGRyZXNzLCB0aGUgT1JHIGRlZmluaXRpb24gd2lsbCB0YWtlIGVmZmVjdFwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9yZyA9IGVuZDtcclxuICAgICAgICAgICAgICAgIHRoaXMub3JnQWRkcmVzcyA9IHBhcnNlSW50KGFkZHJlc3MubGV4ZW1lLCAxMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgU1RBUlRfTEFCRUwgPSBcInN0YXJ0XCI7XHJcblxyXG4gICAgcHJpdmF0ZSBlbWl0T3JnKCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5vcmdBZGRyZXNzID09PSBudWxsKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnN0YW5kYXJkID09PSBTdGFuZGFyZC5JQ1dTODYgJiZcclxuICAgICAgICAgICAgICAgIF8oXyh0aGlzLmNvbnRleHQubGFiZWxzKS5rZXlzKCkpLmNvbnRhaW5zKE9yZ1Bhc3MuU1RBUlRfTEFCRUwpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9yZ0FkZHJlc3MgPSB0aGlzLmNvbnRleHQubGFiZWxzW09yZ1Bhc3MuU1RBUlRfTEFCRUxdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcmdBZGRyZXNzID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5vcmcgPSB7XHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogVG9rZW5DYXRlZ29yeS5QcmVwcm9jZXNzb3IsXHJcbiAgICAgICAgICAgICAgICBsZXhlbWU6IFwiT1JHXCIsXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogeyBsaW5lOiAxLCBjaGFyOiAxIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBvcmcgPSB7XHJcbiAgICAgICAgICAgIGNhdGVnb3J5OiBUb2tlbkNhdGVnb3J5LlByZXByb2Nlc3NvcixcclxuICAgICAgICAgICAgbGV4ZW1lOiBcIk9SR1wiLFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogXy5jbG9uZSh0aGlzLm9yZy5wb3NpdGlvbilcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2YXIgYWRkcmVzcyA9IHtcclxuICAgICAgICAgICAgY2F0ZWdvcnk6IFRva2VuQ2F0ZWdvcnkuTnVtYmVyLFxyXG4gICAgICAgICAgICBsZXhlbWU6IHRoaXMub3JnQWRkcmVzcy50b1N0cmluZygpLFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogXy5jbG9uZSh0aGlzLm9yZy5wb3NpdGlvbilcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2YXIgaW5zdHJ1Y3Rpb246IElUb2tlbltdID0gW29yZywgYWRkcmVzc107XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9yZ0NvbW1lbnQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgaW5zdHJ1Y3Rpb24ucHVzaCh0aGlzLm9yZ0NvbW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5zdHJ1Y3Rpb24ucHVzaCh7XHJcbiAgICAgICAgICAgIGNhdGVnb3J5OiBUb2tlbkNhdGVnb3J5LkVPTCxcclxuICAgICAgICAgICAgbGV4ZW1lOiBcIlxcblwiLFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogXy5jbG9uZSh0aGlzLm9yZy5wb3NpdGlvbilcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gSEFDSyB0aGlzIGlzIHRoZSBvbmx5IHdheSBJIGNvdWxkIGZpbmQgdG8gaW5zZXJ0IGFuIGFycmF5IGludG8gYW4gYXJyYXkhXHJcbiAgICAgICAgdmFyIGFyZ3M6IGFueVtdID0gW3RoaXMuZmlyc3RJbnN0cnVjdGlvbiwgMF07XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LnRva2Vucy5zcGxpY2UuYXBwbHkodGhpcy5jb250ZXh0LnRva2VucywgYXJncy5jb25jYXQoaW5zdHJ1Y3Rpb24pKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYXJzZXIvT3JnUGFzcy50cyIsImltcG9ydCB7IFBhc3NCYXNlIH0gZnJvbSBcIi4vUGFzc0Jhc2VcIjtcclxuaW1wb3J0IHsgVG9rZW5DYXRlZ29yeSB9IGZyb20gXCIuL2ludGVyZmFjZS9JVG9rZW5cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTeW50YXhDaGVjayBleHRlbmRzIFBhc3NCYXNlIHtcclxuXHJcbiAgICBwcm90ZWN0ZWQgcHJvY2Vzc0xpbmUoKSB7XHJcblxyXG4gICAgICAgIHZhciBuZXh0ID0gdGhpcy5zdHJlYW0ucGVlaygpO1xyXG5cclxuICAgICAgICBpZiAobmV4dC5jYXRlZ29yeSA9PT0gVG9rZW5DYXRlZ29yeS5PcGNvZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJzZUluc3RydWN0aW9uKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChuZXh0LmNhdGVnb3J5ID09PSBUb2tlbkNhdGVnb3J5LkNvbW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJzZUNvbW1lbnQoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKG5leHQuY2F0ZWdvcnkgPT09IFRva2VuQ2F0ZWdvcnkuUHJlcHJvY2Vzc29yICYmXHJcbiAgICAgICAgICAgIChuZXh0LmxleGVtZSA9PT0gXCJFTkRcIiB8fCBuZXh0LmxleGVtZSA9PT0gXCJPUkdcIikpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmVtaXQodGhpcy5zdHJlYW0ucmVhZFRvRU9MKCkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RyZWFtLmV4cGVjdGVkKFwiaW5zdHJ1Y3Rpb24gb3IgY29tbWVudFwiLCBuZXh0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtdXN0RW1pdChjYXRlZ29yeTogVG9rZW5DYXRlZ29yeSkge1xyXG5cclxuICAgICAgICB2YXIgdG9rZW4gPSB0aGlzLnN0cmVhbS5leHBlY3QoY2F0ZWdvcnkpO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5lbWl0U2luZ2xlKHRva2VuKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1heUVtaXQoY2F0ZWdvcnk6IFRva2VuQ2F0ZWdvcnkpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3RyZWFtLnBlZWsoKS5jYXRlZ29yeSA9PT0gY2F0ZWdvcnkpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmVtaXRTaW5nbGUodGhpcy5zdHJlYW0ucmVhZCgpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwYXJzZUNvbW1lbnQoKSB7XHJcblxyXG4gICAgICAgIHRoaXMubXVzdEVtaXQoVG9rZW5DYXRlZ29yeS5Db21tZW50KTtcclxuICAgICAgICB0aGlzLm11c3RFbWl0KFRva2VuQ2F0ZWdvcnkuRU9MKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHBhcnNlSW5zdHJ1Y3Rpb24oKSB7XHJcblxyXG4gICAgICAgIHRoaXMubXVzdEVtaXQoVG9rZW5DYXRlZ29yeS5PcGNvZGUpO1xyXG4gICAgICAgIHRoaXMubXVzdEVtaXQoVG9rZW5DYXRlZ29yeS5Nb2RpZmllcik7XHJcblxyXG4gICAgICAgIHRoaXMubXVzdEVtaXQoVG9rZW5DYXRlZ29yeS5Nb2RlKTtcclxuICAgICAgICB0aGlzLm11c3RFbWl0KFRva2VuQ2F0ZWdvcnkuTnVtYmVyKTtcclxuICAgICAgICB0aGlzLm11c3RFbWl0KFRva2VuQ2F0ZWdvcnkuQ29tbWEpO1xyXG5cclxuICAgICAgICB0aGlzLm11c3RFbWl0KFRva2VuQ2F0ZWdvcnkuTW9kZSk7XHJcbiAgICAgICAgdGhpcy5tdXN0RW1pdChUb2tlbkNhdGVnb3J5Lk51bWJlcik7XHJcblxyXG4gICAgICAgIHRoaXMubWF5RW1pdChUb2tlbkNhdGVnb3J5LkNvbW1lbnQpO1xyXG4gICAgICAgIHRoaXMubXVzdEVtaXQoVG9rZW5DYXRlZ29yeS5FT0wpO1xyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcGFyc2VyL1N5bnRheENoZWNrLnRzIiwiaW1wb3J0IHsgSVRva2VuLCBUb2tlbkNhdGVnb3J5IH0gZnJvbSBcIi4vaW50ZXJmYWNlL0lUb2tlblwiO1xyXG5pbXBvcnQgeyBJU2VyaWFsaXNlciB9IGZyb20gXCIuL2ludGVyZmFjZS9JU2VyaWFsaXNlclwiO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gXCJ1bmRlcnNjb3JlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTG9hZEZpbGVTZXJpYWxpc2VyIGltcGxlbWVudHMgSVNlcmlhbGlzZXIge1xyXG5cclxuICAgIHByaXZhdGUgcHJldmlvdXM6IFRva2VuQ2F0ZWdvcnk7XHJcblxyXG4gICAgcHVibGljIHNlcmlhbGlzZSh0b2tlbnM6IElUb2tlbltdKTogc3RyaW5nIHtcclxuXHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5wcmV2aW91cyA9IFRva2VuQ2F0ZWdvcnkuRU9MO1xyXG5cclxuICAgICAgICBfLmZvckVhY2godG9rZW5zLCAodG9rZW46IElUb2tlbikgPT4ge1xyXG4gICAgICAgICAgICByZXN1bHQgKz0gdGhpcy5zZXJpYWxpc2VUb2tlbih0b2tlbik7XHJcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXMgPSB0b2tlbi5jYXRlZ29yeTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlcmlhbGlzZVRva2VuKHRva2VuOiBJVG9rZW4pOiBzdHJpbmcge1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHRva2VuLmNhdGVnb3J5KSB7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFRva2VuQ2F0ZWdvcnkuQ29tbWE6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCIsXFx0XCI7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFRva2VuQ2F0ZWdvcnkuRU9MOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXFxuXCI7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFRva2VuQ2F0ZWdvcnkuTW9kZTpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbi5sZXhlbWU7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFRva2VuQ2F0ZWdvcnkuTW9kaWZpZXI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW4ubGV4ZW1lICsgXCJcXHRcIjtcclxuXHJcbiAgICAgICAgICAgIGNhc2UgVG9rZW5DYXRlZ29yeS5OdW1iZXI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW4ubGV4ZW1lO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBUb2tlbkNhdGVnb3J5Lk9wY29kZTpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbi5sZXhlbWU7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFRva2VuQ2F0ZWdvcnkuUHJlcHJvY2Vzc29yOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuLmxleGVtZSArIFwiXFx0XCI7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFRva2VuQ2F0ZWdvcnkuQ29tbWVudDpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByZXZpb3VzID09PSBUb2tlbkNhdGVnb3J5LkVPTCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbi5sZXhlbWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlxcdFwiICsgdG9rZW4ubGV4ZW1lO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYXJzZXIvTG9hZEZpbGVTZXJpYWxpc2VyLnRzIiwiaW1wb3J0IHsgSVBhcnNlSW5zdHJ1Y3Rpb24gfSBmcm9tIFwiLi9pbnRlcmZhY2UvSVBhcnNlSW5zdHJ1Y3Rpb25cIjtcclxuaW1wb3J0IHsgSVRva2VuLCBUb2tlbkNhdGVnb3J5IH0gZnJvbSBcIi4vaW50ZXJmYWNlL0lUb2tlblwiO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gXCJ1bmRlcnNjb3JlXCI7XHJcbmltcG9ydCB7IFBhc3NCYXNlIH0gZnJvbSBcIi4vUGFzc0Jhc2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBJbGxlZ2FsQ29tbWFuZENoZWNrIGV4dGVuZHMgUGFzc0Jhc2Uge1xyXG5cclxuXHJcbiAgICBwcm90ZWN0ZWQgcHJvY2Vzc0xpbmUoKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnN0cmVhbS5wZWVrKCkuY2F0ZWdvcnkgPT09IFRva2VuQ2F0ZWdvcnkuT3Bjb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tMaW5lKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmVtaXQoXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0cmVhbS5yZWFkVG9FT0woKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBMZWdhbENvbW1hbmRzOiBzdHJpbmdbXSA9IFtcclxuICAgICAgICBcIkFERCMkXCIsIFwiQUREI0BcIiwgXCJBREQjPFwiLCBcIkFERCQkXCIsIFwiQUREJEBcIixcclxuICAgICAgICBcIkFERCQ8XCIsIFwiQUREQCRcIiwgXCJBRERAQFwiLCBcIkFEREA8XCIsIFwiQUREPCRcIixcclxuICAgICAgICBcIkFERDxAXCIsIFwiQUREPDxcIiwgXCJDTVAjJFwiLCBcIkNNUCNAXCIsIFwiQ01QIzxcIixcclxuICAgICAgICBcIkNNUCQkXCIsIFwiQ01QJEBcIiwgXCJDTVAkPFwiLCBcIkNNUEAkXCIsIFwiQ01QQEBcIixcclxuICAgICAgICBcIkNNUEA8XCIsIFwiQ01QPCRcIiwgXCJDTVA8QFwiLCBcIkNNUDw8XCIsIFwiREFUIyNcIixcclxuICAgICAgICBcIkRBVCM8XCIsIFwiREFUPCNcIiwgXCJEQVQ8PFwiLCBcIkRKTiQjXCIsIFwiREpOJCRcIixcclxuICAgICAgICBcIkRKTiRAXCIsIFwiREpOJDxcIiwgXCJESk5AI1wiLCBcIkRKTkAkXCIsIFwiREpOQEBcIixcclxuICAgICAgICBcIkRKTkA8XCIsIFwiREpOPCNcIiwgXCJESk48JFwiLCBcIkRKTjxAXCIsIFwiREpOPDxcIixcclxuICAgICAgICBcIkpNTiQjXCIsIFwiSk1OJCRcIiwgXCJKTU4kQFwiLCBcIkpNTiQ8XCIsIFwiSk1OQCNcIixcclxuICAgICAgICBcIkpNTkAkXCIsIFwiSk1OQEBcIiwgXCJKTU5APFwiLCBcIkpNTjwjXCIsIFwiSk1OPCRcIixcclxuICAgICAgICBcIkpNTjxAXCIsIFwiSk1OPDxcIiwgXCJKTVAkI1wiLCBcIkpNUCQkXCIsIFwiSk1QJEBcIixcclxuICAgICAgICBcIkpNUCQ8XCIsIFwiSk1QQCNcIiwgXCJKTVBAJFwiLCBcIkpNUEBAXCIsIFwiSk1QQDxcIixcclxuICAgICAgICBcIkpNUDwjXCIsIFwiSk1QPCRcIiwgXCJKTVA8QFwiLCBcIkpNUDw8XCIsIFwiSk1aJCNcIixcclxuICAgICAgICBcIkpNWiQkXCIsIFwiSk1aJEBcIiwgXCJKTVokPFwiLCBcIkpNWkAjXCIsIFwiSk1aQCRcIixcclxuICAgICAgICBcIkpNWkBAXCIsIFwiSk1aQDxcIiwgXCJKTVo8I1wiLCBcIkpNWjwkXCIsIFwiSk1aPEBcIixcclxuICAgICAgICBcIkpNWjw8XCIsIFwiTU9WIyRcIiwgXCJNT1YjQFwiLCBcIk1PViM8XCIsIFwiTU9WJCRcIixcclxuICAgICAgICBcIk1PViRAXCIsIFwiTU9WJDxcIiwgXCJNT1ZAJFwiLCBcIk1PVkBAXCIsIFwiTU9WQDxcIixcclxuICAgICAgICBcIk1PVjwkXCIsIFwiTU9WPEBcIiwgXCJNT1Y8PFwiLCBcIlNMVCMkXCIsIFwiU0xUI0BcIixcclxuICAgICAgICBcIlNMVCM8XCIsIFwiU0xUJCRcIiwgXCJTTFQkQFwiLCBcIlNMVCQ8XCIsIFwiU0xUQCRcIixcclxuICAgICAgICBcIlNMVEBAXCIsIFwiU0xUQDxcIiwgXCJTTFQ8JFwiLCBcIlNMVDxAXCIsIFwiU0xUPDxcIixcclxuICAgICAgICBcIlNQTCQjXCIsIFwiU1BMJCRcIiwgXCJTUEwkQFwiLCBcIlNQTCQ8XCIsIFwiU1BMQCNcIixcclxuICAgICAgICBcIlNQTEAkXCIsIFwiU1BMQEBcIiwgXCJTUExAPFwiLCBcIlNQTDwjXCIsIFwiU1BMPCRcIixcclxuICAgICAgICBcIlNQTDxAXCIsIFwiU1BMPDxcIiwgXCJTVUIjJFwiLCBcIlNVQiNAXCIsIFwiU1VCIzxcIixcclxuICAgICAgICBcIlNVQiQkXCIsIFwiU1VCJEBcIiwgXCJTVUIkPFwiLCBcIlNVQkAkXCIsIFwiU1VCQEBcIixcclxuICAgICAgICBcIlNVQkA8XCIsIFwiU1VCPCRcIiwgXCJTVUI8QFwiLCBcIlNVQjw8XCJcclxuICAgIF07XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja0xpbmUoKSB7XHJcblxyXG4gICAgICAgIHZhciBpbnN0cnVjdGlvbjogSVBhcnNlSW5zdHJ1Y3Rpb24gPSB7XHJcbiAgICAgICAgICAgIG9wY29kZTogdGhpcy5zdHJlYW0uZXhwZWN0KFRva2VuQ2F0ZWdvcnkuT3Bjb2RlKSxcclxuICAgICAgICAgICAgbW9kaWZpZXI6IHRoaXMuc3RyZWFtLmV4cGVjdChUb2tlbkNhdGVnb3J5Lk1vZGlmaWVyKSxcclxuICAgICAgICAgICAgYU9wZXJhbmQ6IHtcclxuICAgICAgICAgICAgICAgIG1vZGU6IHRoaXMuc3RyZWFtLmV4cGVjdChUb2tlbkNhdGVnb3J5Lk1vZGUpLFxyXG4gICAgICAgICAgICAgICAgYWRkcmVzczogdGhpcy5zdHJlYW0uZXhwZWN0KFRva2VuQ2F0ZWdvcnkuTnVtYmVyKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjb21tYTogdGhpcy5zdHJlYW0uZXhwZWN0KFRva2VuQ2F0ZWdvcnkuQ29tbWEpLFxyXG4gICAgICAgICAgICBiT3BlcmFuZDoge1xyXG4gICAgICAgICAgICAgICAgbW9kZTogdGhpcy5zdHJlYW0uZXhwZWN0KFRva2VuQ2F0ZWdvcnkuTW9kZSksXHJcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiB0aGlzLnN0cmVhbS5leHBlY3QoVG9rZW5DYXRlZ29yeS5OdW1iZXIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2YXIgaGFzaCA9IGluc3RydWN0aW9uLm9wY29kZS5sZXhlbWUgK1xyXG4gICAgICAgICAgICBpbnN0cnVjdGlvbi5hT3BlcmFuZC5tb2RlLmxleGVtZSArXHJcbiAgICAgICAgICAgIGluc3RydWN0aW9uLmJPcGVyYW5kLm1vZGUubGV4ZW1lO1xyXG5cclxuICAgICAgICBpZiAoIV8oSWxsZWdhbENvbW1hbmRDaGVjay5MZWdhbENvbW1hbmRzKS5jb250YWlucyhoYXNoKSkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdHJlYW0uZXJyb3IoXHJcbiAgICAgICAgICAgICAgICBpbnN0cnVjdGlvbi5vcGNvZGUsXHJcbiAgICAgICAgICAgICAgICBcIklsbGVnYWwgYWRkcmVzc2luZyBtb2RlIHVuZGVyIHNlbGVjdGVkIENvcmV3YXIgc3RhbmRhcmRcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvbnRleHQuZW1pdEluc3RydWN0aW9uKGluc3RydWN0aW9uKTtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZW1pdCh0aGlzLnN0cmVhbS5yZWFkVG9FT0woKSk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcGFyc2VyL0lsbGVnYWxDb21tYW5kQ2hlY2sudHMiLCJpbXBvcnQgeyBJUmFuZG9tIH0gZnJvbSBcIi4vaW50ZXJmYWNlL0lSYW5kb21cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSYW5kb20gaW1wbGVtZW50cyBJUmFuZG9tIHtcclxuXHJcbiAgICBwdWJsaWMgZ2V0KG1heDogbnVtYmVyKTogbnVtYmVyIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heCk7XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zaW11bGF0b3IvUmFuZG9tLnRzIiwiaW1wb3J0IHsgSUV4ZWN1dGl2ZSB9IGZyb20gXCIuL2ludGVyZmFjZS9JRXhlY3V0aXZlXCI7XHJcbmltcG9ydCB7IElFeGVjdXRpb25Db250ZXh0IH0gZnJvbSBcIi4vaW50ZXJmYWNlL0lFeGVjdXRpb25Db250ZXh0XCI7XHJcbmltcG9ydCB7IElJbnN0cnVjdGlvbiB9IGZyb20gXCIuL2ludGVyZmFjZS9JSW5zdHJ1Y3Rpb25cIjtcclxuaW1wb3J0IHsgSU9wdGlvbnMgfSBmcm9tIFwiLi9pbnRlcmZhY2UvSU9wdGlvbnNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBFeGVjdXRpdmUgaW1wbGVtZW50cyBJRXhlY3V0aXZlIHtcclxuXHJcbiAgICBwdWJsaWMgY29tbWFuZFRhYmxlOiAoKGNvbnRleHQ6IElFeGVjdXRpb25Db250ZXh0KSA9PiB2b2lkKVtdID0gW1xyXG4gICAgICAgIHRoaXMuZGF0LCAgIC8vIC5BXHJcbiAgICAgICAgdGhpcy5kYXQsICAgLy8gLkJcclxuICAgICAgICB0aGlzLmRhdCwgICAvLyAuQUJcclxuICAgICAgICB0aGlzLmRhdCwgICAvLyAuQkFcclxuICAgICAgICB0aGlzLmRhdCwgICAvLyAuRlxyXG4gICAgICAgIHRoaXMuZGF0LCAgIC8vIC5YXHJcbiAgICAgICAgdGhpcy5kYXQsICAgLy8gLklcclxuXHJcbiAgICAgICAgdGhpcy5tb3ZfYSxcclxuICAgICAgICB0aGlzLm1vdl9iLFxyXG4gICAgICAgIHRoaXMubW92X2FiLFxyXG4gICAgICAgIHRoaXMubW92X2JhLFxyXG4gICAgICAgIHRoaXMubW92X2YsXHJcbiAgICAgICAgdGhpcy5tb3ZfeCxcclxuICAgICAgICB0aGlzLm1vdl9pLFxyXG5cclxuICAgICAgICB0aGlzLmFkZF9hLFxyXG4gICAgICAgIHRoaXMuYWRkX2IsXHJcbiAgICAgICAgdGhpcy5hZGRfYWIsXHJcbiAgICAgICAgdGhpcy5hZGRfYmEsXHJcbiAgICAgICAgdGhpcy5hZGRfZixcclxuICAgICAgICB0aGlzLmFkZF94LFxyXG4gICAgICAgIHRoaXMuYWRkX2YsXHJcblxyXG4gICAgICAgIHRoaXMuc3ViX2EsXHJcbiAgICAgICAgdGhpcy5zdWJfYixcclxuICAgICAgICB0aGlzLnN1Yl9hYixcclxuICAgICAgICB0aGlzLnN1Yl9iYSxcclxuICAgICAgICB0aGlzLnN1Yl9mLFxyXG4gICAgICAgIHRoaXMuc3ViX3gsXHJcbiAgICAgICAgdGhpcy5zdWJfZixcclxuXHJcbiAgICAgICAgdGhpcy5tdWxfYSxcclxuICAgICAgICB0aGlzLm11bF9iLFxyXG4gICAgICAgIHRoaXMubXVsX2FiLFxyXG4gICAgICAgIHRoaXMubXVsX2JhLFxyXG4gICAgICAgIHRoaXMubXVsX2YsXHJcbiAgICAgICAgdGhpcy5tdWxfeCxcclxuICAgICAgICB0aGlzLm11bF9mLFxyXG5cclxuICAgICAgICB0aGlzLmRpdl9hLFxyXG4gICAgICAgIHRoaXMuZGl2X2IsXHJcbiAgICAgICAgdGhpcy5kaXZfYWIsXHJcbiAgICAgICAgdGhpcy5kaXZfYmEsXHJcbiAgICAgICAgdGhpcy5kaXZfZixcclxuICAgICAgICB0aGlzLmRpdl94LFxyXG4gICAgICAgIHRoaXMuZGl2X2YsXHJcblxyXG4gICAgICAgIHRoaXMubW9kX2EsXHJcbiAgICAgICAgdGhpcy5tb2RfYixcclxuICAgICAgICB0aGlzLm1vZF9hYixcclxuICAgICAgICB0aGlzLm1vZF9iYSxcclxuICAgICAgICB0aGlzLm1vZF9mLFxyXG4gICAgICAgIHRoaXMubW9kX3gsXHJcbiAgICAgICAgdGhpcy5tb2RfZixcclxuXHJcbiAgICAgICAgdGhpcy5qbXAsICAgLy8gLkFcclxuICAgICAgICB0aGlzLmptcCwgICAvLyAuQlxyXG4gICAgICAgIHRoaXMuam1wLCAgIC8vIC5BQlxyXG4gICAgICAgIHRoaXMuam1wLCAgIC8vIC5CQVxyXG4gICAgICAgIHRoaXMuam1wLCAgIC8vIC5GXHJcbiAgICAgICAgdGhpcy5qbXAsICAgLy8gLlhcclxuICAgICAgICB0aGlzLmptcCwgICAvLyAuSVxyXG5cclxuICAgICAgICB0aGlzLmptel9hLCAvLyAuQVxyXG4gICAgICAgIHRoaXMuam16X2IsIC8vIC5CXHJcbiAgICAgICAgdGhpcy5qbXpfYiwgLy8gLkFCXHJcbiAgICAgICAgdGhpcy5qbXpfYSwgLy8gLkJBXHJcbiAgICAgICAgdGhpcy5qbXpfZiwgLy8gLkZcclxuICAgICAgICB0aGlzLmptel9mLCAvLyAuWFxyXG4gICAgICAgIHRoaXMuam16X2YsIC8vIC5JXHJcblxyXG4gICAgICAgIHRoaXMuam1uX2EsIC8vIC5BXHJcbiAgICAgICAgdGhpcy5qbW5fYiwgLy8gLkJcclxuICAgICAgICB0aGlzLmptbl9iLCAvLyAuQUJcclxuICAgICAgICB0aGlzLmptbl9hLCAvLyAuQkFcclxuICAgICAgICB0aGlzLmptbl9mLCAvLyAuRlxyXG4gICAgICAgIHRoaXMuam1uX2YsIC8vIC5YXHJcbiAgICAgICAgdGhpcy5qbW5fZiwgLy8gLklcclxuXHJcbiAgICAgICAgdGhpcy5kam5fYSwgLy8gLkFcclxuICAgICAgICB0aGlzLmRqbl9iLCAvLyAuQlxyXG4gICAgICAgIHRoaXMuZGpuX2IsIC8vIC5BQlxyXG4gICAgICAgIHRoaXMuZGpuX2EsIC8vIC5CQVxyXG4gICAgICAgIHRoaXMuZGpuX2YsIC8vIC5GXHJcbiAgICAgICAgdGhpcy5kam5fZiwgLy8gLlhcclxuICAgICAgICB0aGlzLmRqbl9mLCAvLyAuSVxyXG5cclxuICAgICAgICB0aGlzLnNlcV9hLCAvLyBDTVBcclxuICAgICAgICB0aGlzLnNlcV9iLCAvLyBDTVBcclxuICAgICAgICB0aGlzLnNlcV9hYiwvLyBDTVBcclxuICAgICAgICB0aGlzLnNlcV9iYSwvLyBDTVBcclxuICAgICAgICB0aGlzLnNlcV9mLCAvLyBDTVBcclxuICAgICAgICB0aGlzLnNlcV94LCAvLyBDTVBcclxuICAgICAgICB0aGlzLnNlcV9pLCAvLyBDTVBcclxuXHJcbiAgICAgICAgdGhpcy5zZXFfYSxcclxuICAgICAgICB0aGlzLnNlcV9iLFxyXG4gICAgICAgIHRoaXMuc2VxX2FiLFxyXG4gICAgICAgIHRoaXMuc2VxX2JhLFxyXG4gICAgICAgIHRoaXMuc2VxX2YsXHJcbiAgICAgICAgdGhpcy5zZXFfeCxcclxuICAgICAgICB0aGlzLnNlcV9pLFxyXG5cclxuICAgICAgICB0aGlzLnNuZV9hLFxyXG4gICAgICAgIHRoaXMuc25lX2IsXHJcbiAgICAgICAgdGhpcy5zbmVfYWIsXHJcbiAgICAgICAgdGhpcy5zbmVfYmEsXHJcbiAgICAgICAgdGhpcy5zbmVfZixcclxuICAgICAgICB0aGlzLnNuZV94LFxyXG4gICAgICAgIHRoaXMuc25lX2ksXHJcblxyXG4gICAgICAgIHRoaXMuc2x0X2EsXHJcbiAgICAgICAgdGhpcy5zbHRfYixcclxuICAgICAgICB0aGlzLnNsdF9hYixcclxuICAgICAgICB0aGlzLnNsdF9iYSxcclxuICAgICAgICB0aGlzLnNsdF9mLFxyXG4gICAgICAgIHRoaXMuc2x0X3gsXHJcbiAgICAgICAgdGhpcy5zbHRfZixcclxuXHJcbiAgICAgICAgdGhpcy5zcGwsICAgLy8gLkFcclxuICAgICAgICB0aGlzLnNwbCwgICAvLyAuQlxyXG4gICAgICAgIHRoaXMuc3BsLCAgIC8vIC5BQlxyXG4gICAgICAgIHRoaXMuc3BsLCAgIC8vIC5CQVxyXG4gICAgICAgIHRoaXMuc3BsLCAgIC8vIC5GXHJcbiAgICAgICAgdGhpcy5zcGwsICAgLy8gLlhcclxuICAgICAgICB0aGlzLnNwbCwgICAvLyAuSVxyXG5cclxuICAgICAgICB0aGlzLm5vcCwgICAvLyAuQVxyXG4gICAgICAgIHRoaXMubm9wLCAgIC8vIC5CXHJcbiAgICAgICAgdGhpcy5ub3AsICAgLy8gLkFCXHJcbiAgICAgICAgdGhpcy5ub3AsICAgLy8gLkJBXHJcbiAgICAgICAgdGhpcy5ub3AsICAgLy8gLkZcclxuICAgICAgICB0aGlzLm5vcCwgICAvLyAuWFxyXG4gICAgICAgIHRoaXMubm9wLCAgIC8vIC5JXHJcbiAgICBdO1xyXG5cclxuICAgIHByaXZhdGUgaW5zdHJ1Y3Rpb25MaW1pdDogbnVtYmVyO1xyXG5cclxuICAgIHB1YmxpYyBpbml0aWFsaXNlKG9wdGlvbnM6IElPcHRpb25zKSB7XHJcblxyXG4gICAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25MaW1pdCA9IG9wdGlvbnMuaW5zdHJ1Y3Rpb25MaW1pdDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRhdChjb250ZXh0OiBJRXhlY3V0aW9uQ29udGV4dCkge1xyXG4gICAgICAgIC8vUmVtb3ZlIGN1cnJlbnQgdGFzayBmcm9tIHRoZSBxdWV1ZVxyXG4gICAgICAgIHZhciB0aSA9IGNvbnRleHQudGFza0luZGV4O1xyXG4gICAgICAgIGNvbnRleHQud2Fycmlvci50YXNrSW5kZXggPSBjb250ZXh0LnRhc2tJbmRleDtcclxuICAgICAgICBjb250ZXh0LndhcnJpb3IudGFza3Muc3BsaWNlKHRpLCAxKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1vdl9hKGNvbnRleHQ6IElFeGVjdXRpb25Db250ZXh0KSB7XHJcblxyXG4gICAgICAgIHZhciBhSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5hUG9pbnRlcik7XHJcbiAgICAgICAgdmFyIGJJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmJQb2ludGVyKTtcclxuXHJcbiAgICAgICAgYkluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3MgPSBhSW5zdHJ1Y3Rpb24uYU9wZXJhbmQuYWRkcmVzcztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1vdl9iKGNvbnRleHQ6IElFeGVjdXRpb25Db250ZXh0KSB7XHJcblxyXG4gICAgICAgIHZhciBhSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5hUG9pbnRlcik7XHJcbiAgICAgICAgdmFyIGJJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmJQb2ludGVyKTtcclxuXHJcbiAgICAgICAgYkluc3RydWN0aW9uLmJPcGVyYW5kLmFkZHJlc3MgPSBhSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1vdl9hYihjb250ZXh0OiBJRXhlY3V0aW9uQ29udGV4dCkge1xyXG5cclxuICAgICAgICB2YXIgYUluc3RydWN0aW9uID0gY29udGV4dC5jb3JlLnJlYWRBdChjb250ZXh0LnRhc2ssIGNvbnRleHQuYVBvaW50ZXIpO1xyXG4gICAgICAgIHZhciBiSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5iUG9pbnRlcik7XHJcblxyXG4gICAgICAgIGJJbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzID0gYUluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3M7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtb3ZfYmEoY29udGV4dDogSUV4ZWN1dGlvbkNvbnRleHQpIHtcclxuXHJcbiAgICAgICAgdmFyIGFJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmFQb2ludGVyKTtcclxuICAgICAgICB2YXIgYkluc3RydWN0aW9uID0gY29udGV4dC5jb3JlLnJlYWRBdChjb250ZXh0LnRhc2ssIGNvbnRleHQuYlBvaW50ZXIpO1xyXG5cclxuICAgICAgICBiSW5zdHJ1Y3Rpb24uYU9wZXJhbmQuYWRkcmVzcyA9IGFJbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbW92X2YoY29udGV4dDogSUV4ZWN1dGlvbkNvbnRleHQpIHtcclxuXHJcbiAgICAgICAgdmFyIGFJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmFQb2ludGVyKTtcclxuICAgICAgICB2YXIgYkluc3RydWN0aW9uID0gY29udGV4dC5jb3JlLnJlYWRBdChjb250ZXh0LnRhc2ssIGNvbnRleHQuYlBvaW50ZXIpO1xyXG5cclxuICAgICAgICBiSW5zdHJ1Y3Rpb24uYU9wZXJhbmQuYWRkcmVzcyA9IGFJbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzO1xyXG4gICAgICAgIGJJbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzID0gYUluc3RydWN0aW9uLmJPcGVyYW5kLmFkZHJlc3M7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtb3ZfeChjb250ZXh0OiBJRXhlY3V0aW9uQ29udGV4dCkge1xyXG5cclxuICAgICAgICB2YXIgYUluc3RydWN0aW9uID0gY29udGV4dC5jb3JlLnJlYWRBdChjb250ZXh0LnRhc2ssIGNvbnRleHQuYVBvaW50ZXIpO1xyXG4gICAgICAgIHZhciBiSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5iUG9pbnRlcik7XHJcblxyXG4gICAgICAgIGJJbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzID0gYUluc3RydWN0aW9uLmJPcGVyYW5kLmFkZHJlc3M7XHJcbiAgICAgICAgYkluc3RydWN0aW9uLmJPcGVyYW5kLmFkZHJlc3MgPSBhSW5zdHJ1Y3Rpb24uYU9wZXJhbmQuYWRkcmVzcztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1vdl9pKGNvbnRleHQ6IElFeGVjdXRpb25Db250ZXh0KSB7XHJcblxyXG4gICAgICAgIHZhciBhSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5hUG9pbnRlcik7XHJcbiAgICAgICAgdmFyIGJJbnN0cnVjdGlvbjogSUluc3RydWN0aW9uID0ge1xyXG4gICAgICAgICAgICBhZGRyZXNzOiBjb250ZXh0LmJQb2ludGVyLFxyXG4gICAgICAgICAgICBvcGNvZGU6IGFJbnN0cnVjdGlvbi5vcGNvZGUsXHJcbiAgICAgICAgICAgIG1vZGlmaWVyOiBhSW5zdHJ1Y3Rpb24ubW9kaWZpZXIsXHJcbiAgICAgICAgICAgIGFPcGVyYW5kOiB7XHJcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiBhSW5zdHJ1Y3Rpb24uYU9wZXJhbmQuYWRkcmVzcyxcclxuICAgICAgICAgICAgICAgIG1vZGU6IGFJbnN0cnVjdGlvbi5hT3BlcmFuZC5tb2RlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJPcGVyYW5kOiB7XHJcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiBhSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcyxcclxuICAgICAgICAgICAgICAgIG1vZGU6IGFJbnN0cnVjdGlvbi5iT3BlcmFuZC5tb2RlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnRleHQuY29yZS5zZXRBdChjb250ZXh0LnRhc2ssIGNvbnRleHQuYlBvaW50ZXIsIGJJbnN0cnVjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRfYShjb250ZXh0OiBJRXhlY3V0aW9uQ29udGV4dCkge1xyXG5cclxuICAgICAgICB2YXIgYUluc3RydWN0aW9uID0gY29udGV4dC5jb3JlLnJlYWRBdChjb250ZXh0LnRhc2ssIGNvbnRleHQuYVBvaW50ZXIpO1xyXG4gICAgICAgIHZhciBiSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5iUG9pbnRlcik7XHJcblxyXG4gICAgICAgIGJJbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzID0gY29udGV4dC5jb3JlLndyYXAoXHJcbiAgICAgICAgICAgICAgICBhSW5zdHJ1Y3Rpb24uYU9wZXJhbmQuYWRkcmVzcyArIGJJbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzXHJcbiAgICAgICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRfYihjb250ZXh0OiBJRXhlY3V0aW9uQ29udGV4dCkge1xyXG5cclxuICAgICAgICB2YXIgYUluc3RydWN0aW9uID0gY29udGV4dC5jb3JlLnJlYWRBdChjb250ZXh0LnRhc2ssIGNvbnRleHQuYVBvaW50ZXIpO1xyXG4gICAgICAgIHZhciBiSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5iUG9pbnRlcik7XHJcblxyXG4gICAgICAgIGJJbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzID0gY29udGV4dC5jb3JlLndyYXAoXHJcbiAgICAgICAgICAgICAgICBhSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcyArIGJJbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzXHJcbiAgICAgICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRfYWIoY29udGV4dDogSUV4ZWN1dGlvbkNvbnRleHQpIHtcclxuXHJcbiAgICAgICAgdmFyIGFJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmFQb2ludGVyKTtcclxuICAgICAgICB2YXIgYkluc3RydWN0aW9uID0gY29udGV4dC5jb3JlLnJlYWRBdChjb250ZXh0LnRhc2ssIGNvbnRleHQuYlBvaW50ZXIpO1xyXG5cclxuICAgICAgICBiSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcyA9IGNvbnRleHQuY29yZS53cmFwKFxyXG4gICAgICAgICAgICAgICAgYUluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3MgKyBiSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzc1xyXG4gICAgICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRkX2JhKGNvbnRleHQ6IElFeGVjdXRpb25Db250ZXh0KSB7XHJcblxyXG4gICAgICAgIHZhciBhSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5hUG9pbnRlcik7XHJcbiAgICAgICAgdmFyIGJJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmJQb2ludGVyKTtcclxuXHJcbiAgICAgICAgYkluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3MgPSBjb250ZXh0LmNvcmUud3JhcChcclxuICAgICAgICAgICAgICAgIGFJbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzICsgYkluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3NcclxuICAgICAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFkZF9mKGNvbnRleHQ6IElFeGVjdXRpb25Db250ZXh0KSB7XHJcblxyXG4gICAgICAgIHZhciBhSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5hUG9pbnRlcik7XHJcbiAgICAgICAgdmFyIGJJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmJQb2ludGVyKTtcclxuXHJcbiAgICAgICAgYkluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3MgPSBjb250ZXh0LmNvcmUud3JhcChcclxuICAgICAgICAgICAgICAgIGFJbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzICsgYkluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3NcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICBiSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcyA9IGNvbnRleHQuY29yZS53cmFwKFxyXG4gICAgICAgICAgICAgICAgYUluc3RydWN0aW9uLmJPcGVyYW5kLmFkZHJlc3MgKyBiSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzc1xyXG4gICAgICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRkX3goY29udGV4dDogSUV4ZWN1dGlvbkNvbnRleHQpIHtcclxuXHJcbiAgICAgICAgdmFyIGFJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmFQb2ludGVyKTtcclxuICAgICAgICB2YXIgYkluc3RydWN0aW9uID0gY29udGV4dC5jb3JlLnJlYWRBdChjb250ZXh0LnRhc2ssIGNvbnRleHQuYlBvaW50ZXIpO1xyXG5cclxuICAgICAgICBiSW5zdHJ1Y3Rpb24uYU9wZXJhbmQuYWRkcmVzcyA9IGNvbnRleHQuY29yZS53cmFwKFxyXG4gICAgICAgICAgICAgICAgYUluc3RydWN0aW9uLmJPcGVyYW5kLmFkZHJlc3MgKyBiSW5zdHJ1Y3Rpb24uYU9wZXJhbmQuYWRkcmVzc1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIGJJbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzID0gY29udGV4dC5jb3JlLndyYXAoXHJcbiAgICAgICAgICAgICAgICBhSW5zdHJ1Y3Rpb24uYU9wZXJhbmQuYWRkcmVzcyArIGJJbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzXHJcbiAgICAgICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdWJfYShjb250ZXh0OiBJRXhlY3V0aW9uQ29udGV4dCkge1xyXG5cclxuICAgICAgICB2YXIgYUluc3RydWN0aW9uID0gY29udGV4dC5jb3JlLnJlYWRBdChjb250ZXh0LnRhc2ssIGNvbnRleHQuYVBvaW50ZXIpO1xyXG4gICAgICAgIHZhciBiSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5iUG9pbnRlcik7XHJcblxyXG4gICAgICAgIGJJbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzID0gY29udGV4dC5jb3JlLndyYXAoXHJcbiAgICAgICAgICAgICAgICBiSW5zdHJ1Y3Rpb24uYU9wZXJhbmQuYWRkcmVzcyAtIGFJbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzXHJcbiAgICAgICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdWJfYihjb250ZXh0OiBJRXhlY3V0aW9uQ29udGV4dCkge1xyXG5cclxuICAgICAgICB2YXIgYUluc3RydWN0aW9uID0gY29udGV4dC5jb3JlLnJlYWRBdChjb250ZXh0LnRhc2ssIGNvbnRleHQuYVBvaW50ZXIpO1xyXG4gICAgICAgIHZhciBiSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5iUG9pbnRlcik7XHJcblxyXG4gICAgICAgIGJJbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzID0gY29udGV4dC5jb3JlLndyYXAoXHJcbiAgICAgICAgICAgICAgICBiSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcyAtIGFJbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzXHJcbiAgICAgICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdWJfYWIoY29udGV4dDogSUV4ZWN1dGlvbkNvbnRleHQpIHtcclxuXHJcbiAgICAgICAgdmFyIGFJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmFQb2ludGVyKTtcclxuICAgICAgICB2YXIgYkluc3RydWN0aW9uID0gY29udGV4dC5jb3JlLnJlYWRBdChjb250ZXh0LnRhc2ssIGNvbnRleHQuYlBvaW50ZXIpO1xyXG5cclxuICAgICAgICBiSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcyA9IGNvbnRleHQuY29yZS53cmFwKFxyXG4gICAgICAgICAgICAgICAgYkluc3RydWN0aW9uLmJPcGVyYW5kLmFkZHJlc3MgLSBhSW5zdHJ1Y3Rpb24uYU9wZXJhbmQuYWRkcmVzc1xyXG4gICAgICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3ViX2JhKGNvbnRleHQ6IElFeGVjdXRpb25Db250ZXh0KSB7XHJcblxyXG4gICAgICAgIHZhciBhSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5hUG9pbnRlcik7XHJcbiAgICAgICAgdmFyIGJJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmJQb2ludGVyKTtcclxuXHJcbiAgICAgICAgYkluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3MgPSBjb250ZXh0LmNvcmUud3JhcChcclxuICAgICAgICAgICAgICAgIGJJbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzIC0gYUluc3RydWN0aW9uLmJPcGVyYW5kLmFkZHJlc3NcclxuICAgICAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN1Yl9mKGNvbnRleHQ6IElFeGVjdXRpb25Db250ZXh0KSB7XHJcblxyXG4gICAgICAgIHZhciBhSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5hUG9pbnRlcik7XHJcbiAgICAgICAgdmFyIGJJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmJQb2ludGVyKTtcclxuXHJcbiAgICAgICAgYkluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3MgPSBjb250ZXh0LmNvcmUud3JhcChcclxuICAgICAgICAgICAgICAgIGJJbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzIC0gYUluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3NcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICBiSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcyA9IGNvbnRleHQuY29yZS53cmFwKFxyXG4gICAgICAgICAgICAgICAgYkluc3RydWN0aW9uLmJPcGVyYW5kLmFkZHJlc3MgLSBhSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzc1xyXG4gICAgICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3ViX3goY29udGV4dDogSUV4ZWN1dGlvbkNvbnRleHQpIHtcclxuXHJcbiAgICAgICAgdmFyIGFJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmFQb2ludGVyKTtcclxuICAgICAgICB2YXIgYkluc3RydWN0aW9uID0gY29udGV4dC5jb3JlLnJlYWRBdChjb250ZXh0LnRhc2ssIGNvbnRleHQuYlBvaW50ZXIpO1xyXG5cclxuICAgICAgICBiSW5zdHJ1Y3Rpb24uYU9wZXJhbmQuYWRkcmVzcyA9IGNvbnRleHQuY29yZS53cmFwKFxyXG4gICAgICAgICAgICAgICAgYkluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3MgLSBhSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzc1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIGJJbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzID0gY29udGV4dC5jb3JlLndyYXAoXHJcbiAgICAgICAgICAgICAgICBiSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcyAtIGFJbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzXHJcbiAgICAgICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtdWxfYShjb250ZXh0OiBJRXhlY3V0aW9uQ29udGV4dCkge1xyXG5cclxuICAgICAgICB2YXIgYUluc3RydWN0aW9uID0gY29udGV4dC5jb3JlLnJlYWRBdChjb250ZXh0LnRhc2ssIGNvbnRleHQuYVBvaW50ZXIpO1xyXG4gICAgICAgIHZhciBiSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5iUG9pbnRlcik7XHJcblxyXG4gICAgICAgIGJJbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzID0gY29udGV4dC5jb3JlLndyYXAoXHJcbiAgICAgICAgICAgICAgICBhSW5zdHJ1Y3Rpb24uYU9wZXJhbmQuYWRkcmVzcyAqIGJJbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzXHJcbiAgICAgICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtdWxfYihjb250ZXh0OiBJRXhlY3V0aW9uQ29udGV4dCkge1xyXG5cclxuICAgICAgICB2YXIgYUluc3RydWN0aW9uID0gY29udGV4dC5jb3JlLnJlYWRBdChjb250ZXh0LnRhc2ssIGNvbnRleHQuYVBvaW50ZXIpO1xyXG4gICAgICAgIHZhciBiSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5iUG9pbnRlcik7XHJcblxyXG4gICAgICAgIGJJbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzID0gY29udGV4dC5jb3JlLndyYXAoXHJcbiAgICAgICAgICAgICAgICBhSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcyAqIGJJbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzXHJcbiAgICAgICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtdWxfYWIoY29udGV4dDogSUV4ZWN1dGlvbkNvbnRleHQpIHtcclxuXHJcbiAgICAgICAgdmFyIGFJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmFQb2ludGVyKTtcclxuICAgICAgICB2YXIgYkluc3RydWN0aW9uID0gY29udGV4dC5jb3JlLnJlYWRBdChjb250ZXh0LnRhc2ssIGNvbnRleHQuYlBvaW50ZXIpO1xyXG5cclxuICAgICAgICBiSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcyA9IGNvbnRleHQuY29yZS53cmFwKFxyXG4gICAgICAgICAgICAgICAgYUluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3MgKiBiSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzc1xyXG4gICAgICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbXVsX2JhKGNvbnRleHQ6IElFeGVjdXRpb25Db250ZXh0KSB7XHJcblxyXG4gICAgICAgIHZhciBhSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5hUG9pbnRlcik7XHJcbiAgICAgICAgdmFyIGJJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmJQb2ludGVyKTtcclxuXHJcbiAgICAgICAgYkluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3MgPSBjb250ZXh0LmNvcmUud3JhcChcclxuICAgICAgICAgICAgICAgIGFJbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzICogYkluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3NcclxuICAgICAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG11bF9mKGNvbnRleHQ6IElFeGVjdXRpb25Db250ZXh0KSB7XHJcblxyXG4gICAgICAgIHZhciBhSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5hUG9pbnRlcik7XHJcbiAgICAgICAgdmFyIGJJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmJQb2ludGVyKTtcclxuXHJcbiAgICAgICAgYkluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3MgPSBjb250ZXh0LmNvcmUud3JhcChcclxuICAgICAgICAgICAgICAgIGFJbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzICogYkluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3NcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICBiSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcyA9IGNvbnRleHQuY29yZS53cmFwKFxyXG4gICAgICAgICAgICAgICAgYUluc3RydWN0aW9uLmJPcGVyYW5kLmFkZHJlc3MgKiBiSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzc1xyXG4gICAgICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbXVsX3goY29udGV4dDogSUV4ZWN1dGlvbkNvbnRleHQpIHtcclxuXHJcbiAgICAgICAgdmFyIGFJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmFQb2ludGVyKTtcclxuICAgICAgICB2YXIgYkluc3RydWN0aW9uID0gY29udGV4dC5jb3JlLnJlYWRBdChjb250ZXh0LnRhc2ssIGNvbnRleHQuYlBvaW50ZXIpO1xyXG5cclxuICAgICAgICBiSW5zdHJ1Y3Rpb24uYU9wZXJhbmQuYWRkcmVzcyA9IGNvbnRleHQuY29yZS53cmFwKFxyXG4gICAgICAgICAgICAgICAgYUluc3RydWN0aW9uLmJPcGVyYW5kLmFkZHJlc3MgKiBiSW5zdHJ1Y3Rpb24uYU9wZXJhbmQuYWRkcmVzc1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIGJJbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzID0gY29udGV4dC5jb3JlLndyYXAoXHJcbiAgICAgICAgICAgICAgICBhSW5zdHJ1Y3Rpb24uYU9wZXJhbmQuYWRkcmVzcyAqIGJJbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzXHJcbiAgICAgICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkaXZfYShjb250ZXh0OiBJRXhlY3V0aW9uQ29udGV4dCkge1xyXG5cclxuICAgICAgICB2YXIgYUluc3RydWN0aW9uID0gY29udGV4dC5jb3JlLnJlYWRBdChjb250ZXh0LnRhc2ssIGNvbnRleHQuYVBvaW50ZXIpO1xyXG4gICAgICAgIHZhciBiSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5iUG9pbnRlcik7XHJcblxyXG4gICAgICAgIGlmIChhSW5zdHJ1Y3Rpb24uYU9wZXJhbmQuYWRkcmVzcyAhPT0gMCkge1xyXG4gICAgICAgICAgICBiSW5zdHJ1Y3Rpb24uYU9wZXJhbmQuYWRkcmVzcyA9IChiSW5zdHJ1Y3Rpb24uYU9wZXJhbmQuYWRkcmVzcyAvIGFJbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzKSA+PiAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0KGNvbnRleHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRpdl9iKGNvbnRleHQ6IElFeGVjdXRpb25Db250ZXh0KSB7XHJcblxyXG4gICAgICAgIHZhciBhSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5hUG9pbnRlcik7XHJcbiAgICAgICAgdmFyIGJJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmJQb2ludGVyKTtcclxuXHJcbiAgICAgICAgaWYgKGFJbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGJJbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzID0gKGJJbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzIC8gYUluc3RydWN0aW9uLmJPcGVyYW5kLmFkZHJlc3MpID4+IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kYXQoY29udGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZGl2X2FiKGNvbnRleHQ6IElFeGVjdXRpb25Db250ZXh0KSB7XHJcblxyXG4gICAgICAgIHZhciBhSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5hUG9pbnRlcik7XHJcbiAgICAgICAgdmFyIGJJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmJQb2ludGVyKTtcclxuXHJcbiAgICAgICAgaWYgKGFJbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGJJbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzID0gKGJJbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzIC8gYUluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3MpID4+IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kYXQoY29udGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZGl2X2JhKGNvbnRleHQ6IElFeGVjdXRpb25Db250ZXh0KSB7XHJcblxyXG4gICAgICAgIHZhciBhSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5hUG9pbnRlcik7XHJcbiAgICAgICAgdmFyIGJJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmJQb2ludGVyKTtcclxuXHJcbiAgICAgICAgaWYgKGFJbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGJJbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzID0gKGJJbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzIC8gYUluc3RydWN0aW9uLmJPcGVyYW5kLmFkZHJlc3MpID4+IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kYXQoY29udGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZGl2X2YoY29udGV4dDogSUV4ZWN1dGlvbkNvbnRleHQpIHtcclxuXHJcbiAgICAgICAgdmFyIGFJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmFQb2ludGVyKTtcclxuICAgICAgICB2YXIgYkluc3RydWN0aW9uID0gY29udGV4dC5jb3JlLnJlYWRBdChjb250ZXh0LnRhc2ssIGNvbnRleHQuYlBvaW50ZXIpO1xyXG5cclxuICAgICAgICBpZiAoYUluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3MgIT09IDApIHtcclxuICAgICAgICAgICAgYkluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3MgPSAoYkluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3MgLyBhSW5zdHJ1Y3Rpb24uYU9wZXJhbmQuYWRkcmVzcykgPj4gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmRhdChjb250ZXh0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcyAhPT0gMCkge1xyXG4gICAgICAgICAgICBiSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcyA9IChiSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcyAvIGFJbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzKSA+PiAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0KGNvbnRleHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRpdl94KGNvbnRleHQ6IElFeGVjdXRpb25Db250ZXh0KSB7XHJcblxyXG4gICAgICAgIHZhciBhSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5hUG9pbnRlcik7XHJcbiAgICAgICAgdmFyIGJJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmJQb2ludGVyKTtcclxuXHJcbiAgICAgICAgaWYgKGFJbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGJJbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzID0gKGJJbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzIC8gYUluc3RydWN0aW9uLmJPcGVyYW5kLmFkZHJlc3MpID4+IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kYXQoY29udGV4dCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYUluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3MgIT09IDApIHtcclxuICAgICAgICAgICAgYkluc3RydWN0aW9uLmJPcGVyYW5kLmFkZHJlc3MgPSAoYkluc3RydWN0aW9uLmJPcGVyYW5kLmFkZHJlc3MgLyBhSW5zdHJ1Y3Rpb24uYU9wZXJhbmQuYWRkcmVzcykgPj4gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmRhdChjb250ZXh0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtb2RfYShjb250ZXh0OiBJRXhlY3V0aW9uQ29udGV4dCkge1xyXG5cclxuICAgICAgICB2YXIgYUluc3RydWN0aW9uID0gY29udGV4dC5jb3JlLnJlYWRBdChjb250ZXh0LnRhc2ssIGNvbnRleHQuYVBvaW50ZXIpO1xyXG4gICAgICAgIHZhciBiSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5iUG9pbnRlcik7XHJcblxyXG4gICAgICAgIGlmIChhSW5zdHJ1Y3Rpb24uYU9wZXJhbmQuYWRkcmVzcyAhPT0gMCkge1xyXG4gICAgICAgICAgICBiSW5zdHJ1Y3Rpb24uYU9wZXJhbmQuYWRkcmVzcyA9IGJJbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzICUgYUluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3M7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kYXQoY29udGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbW9kX2IoY29udGV4dDogSUV4ZWN1dGlvbkNvbnRleHQpIHtcclxuXHJcbiAgICAgICAgdmFyIGFJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmFQb2ludGVyKTtcclxuICAgICAgICB2YXIgYkluc3RydWN0aW9uID0gY29udGV4dC5jb3JlLnJlYWRBdChjb250ZXh0LnRhc2ssIGNvbnRleHQuYlBvaW50ZXIpO1xyXG5cclxuICAgICAgICBpZiAoYUluc3RydWN0aW9uLmJPcGVyYW5kLmFkZHJlc3MgIT09IDApIHtcclxuICAgICAgICAgICAgYkluc3RydWN0aW9uLmJPcGVyYW5kLmFkZHJlc3MgPSBiSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcyAlIGFJbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0KGNvbnRleHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1vZF9hYihjb250ZXh0OiBJRXhlY3V0aW9uQ29udGV4dCkge1xyXG5cclxuICAgICAgICB2YXIgYUluc3RydWN0aW9uID0gY29udGV4dC5jb3JlLnJlYWRBdChjb250ZXh0LnRhc2ssIGNvbnRleHQuYVBvaW50ZXIpO1xyXG4gICAgICAgIHZhciBiSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5iUG9pbnRlcik7XHJcblxyXG4gICAgICAgIGlmIChhSW5zdHJ1Y3Rpb24uYU9wZXJhbmQuYWRkcmVzcyAhPT0gMCkge1xyXG4gICAgICAgICAgICBiSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcyA9IGJJbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzICUgYUluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3M7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kYXQoY29udGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbW9kX2JhKGNvbnRleHQ6IElFeGVjdXRpb25Db250ZXh0KSB7XHJcblxyXG4gICAgICAgIHZhciBhSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5hUG9pbnRlcik7XHJcbiAgICAgICAgdmFyIGJJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmJQb2ludGVyKTtcclxuXHJcbiAgICAgICAgaWYgKGFJbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGJJbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzID0gYkluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3MgJSBhSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmRhdChjb250ZXh0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtb2RfZihjb250ZXh0OiBJRXhlY3V0aW9uQ29udGV4dCkge1xyXG5cclxuICAgICAgICB2YXIgYUluc3RydWN0aW9uID0gY29udGV4dC5jb3JlLnJlYWRBdChjb250ZXh0LnRhc2ssIGNvbnRleHQuYVBvaW50ZXIpO1xyXG4gICAgICAgIHZhciBiSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5iUG9pbnRlcik7XHJcblxyXG4gICAgICAgIGlmIChhSW5zdHJ1Y3Rpb24uYU9wZXJhbmQuYWRkcmVzcyAhPT0gMCkge1xyXG4gICAgICAgICAgICBiSW5zdHJ1Y3Rpb24uYU9wZXJhbmQuYWRkcmVzcyA9IGJJbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzICUgYUluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3M7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kYXQoY29udGV4dCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYUluc3RydWN0aW9uLmJPcGVyYW5kLmFkZHJlc3MgIT09IDApIHtcclxuICAgICAgICAgICAgYkluc3RydWN0aW9uLmJPcGVyYW5kLmFkZHJlc3MgPSBiSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcyAlIGFJbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0KGNvbnRleHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1vZF94KGNvbnRleHQ6IElFeGVjdXRpb25Db250ZXh0KSB7XHJcblxyXG4gICAgICAgIHZhciBhSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5hUG9pbnRlcik7XHJcbiAgICAgICAgdmFyIGJJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmJQb2ludGVyKTtcclxuXHJcbiAgICAgICAgaWYgKGFJbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGJJbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzID0gYkluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3MgJSBhSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmRhdChjb250ZXh0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9UT0RPIGRvdWJsZSBkaXZpZGUgYnkgemVybyB3aWxsIHJlbW92ZSB0d28gcHJvY2Vzc2VzIGZyb20gdGhlIHdhcnJpb3IgdGFzayBxdWV1ZSFcclxuICAgICAgICBpZiAoYUluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3MgIT09IDApIHtcclxuICAgICAgICAgICAgYkluc3RydWN0aW9uLmJPcGVyYW5kLmFkZHJlc3MgPSBiSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcyAlIGFJbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0KGNvbnRleHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGptcChjb250ZXh0OiBJRXhlY3V0aW9uQ29udGV4dCkge1xyXG5cclxuICAgICAgICBjb250ZXh0LnRhc2suaW5zdHJ1Y3Rpb25Qb2ludGVyID0gY29udGV4dC5jb3JlLndyYXAoY29udGV4dC5hUG9pbnRlcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBqbXpfYShjb250ZXh0OiBJRXhlY3V0aW9uQ29udGV4dCkge1xyXG5cclxuICAgICAgICB2YXIgYkluc3RydWN0aW9uID0gY29udGV4dC5jb3JlLnJlYWRBdChjb250ZXh0LnRhc2ssIGNvbnRleHQuYlBvaW50ZXIpO1xyXG5cclxuICAgICAgICBpZiAoYkluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3MgPT09IDApIHtcclxuICAgICAgICAgICAgY29udGV4dC50YXNrLmluc3RydWN0aW9uUG9pbnRlciA9IGNvbnRleHQuY29yZS53cmFwKGNvbnRleHQuYVBvaW50ZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGptel9iKGNvbnRleHQ6IElFeGVjdXRpb25Db250ZXh0KSB7XHJcblxyXG4gICAgICAgIHZhciBiSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5iUG9pbnRlcik7XHJcblxyXG4gICAgICAgIGlmIChiSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcyA9PT0gMCkge1xyXG4gICAgICAgICAgICBjb250ZXh0LnRhc2suaW5zdHJ1Y3Rpb25Qb2ludGVyID0gY29udGV4dC5jb3JlLndyYXAoY29udGV4dC5hUG9pbnRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgam16X2YoY29udGV4dDogSUV4ZWN1dGlvbkNvbnRleHQpIHtcclxuXHJcbiAgICAgICAgdmFyIGJJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmJQb2ludGVyKTtcclxuXHJcbiAgICAgICAgaWYgKGJJbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzID09PSAwICYmXHJcbiAgICAgICAgICAgIGJJbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQudGFzay5pbnN0cnVjdGlvblBvaW50ZXIgPSBjb250ZXh0LmNvcmUud3JhcChjb250ZXh0LmFQb2ludGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBqbW5fYShjb250ZXh0OiBJRXhlY3V0aW9uQ29udGV4dCkge1xyXG5cclxuICAgICAgICB2YXIgYkluc3RydWN0aW9uID0gY29udGV4dC5jb3JlLnJlYWRBdChjb250ZXh0LnRhc2ssIGNvbnRleHQuYlBvaW50ZXIpO1xyXG5cclxuICAgICAgICBpZiAoYkluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3MgIT09IDApIHtcclxuICAgICAgICAgICAgY29udGV4dC50YXNrLmluc3RydWN0aW9uUG9pbnRlciA9IGNvbnRleHQuY29yZS53cmFwKGNvbnRleHQuYVBvaW50ZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGptbl9iKGNvbnRleHQ6IElFeGVjdXRpb25Db250ZXh0KSB7XHJcblxyXG4gICAgICAgIHZhciBiSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5iUG9pbnRlcik7XHJcblxyXG4gICAgICAgIGlmIChiSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcyAhPT0gMCkge1xyXG4gICAgICAgICAgICBjb250ZXh0LnRhc2suaW5zdHJ1Y3Rpb25Qb2ludGVyID0gY29udGV4dC5jb3JlLndyYXAoY29udGV4dC5hUG9pbnRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgam1uX2YoY29udGV4dDogSUV4ZWN1dGlvbkNvbnRleHQpIHtcclxuXHJcbiAgICAgICAgdmFyIGJJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmJQb2ludGVyKTtcclxuXHJcbiAgICAgICAgaWYgKGJJbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzICE9PSAwIHx8XHJcbiAgICAgICAgICAgIGJJbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQudGFzay5pbnN0cnVjdGlvblBvaW50ZXIgPSBjb250ZXh0LmNvcmUud3JhcChjb250ZXh0LmFQb2ludGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkam5fYShjb250ZXh0OiBJRXhlY3V0aW9uQ29udGV4dCkge1xyXG5cclxuICAgICAgICB2YXIgYkluc3RydWN0aW9uID0gY29udGV4dC5jb3JlLnJlYWRBdChjb250ZXh0LnRhc2ssIGNvbnRleHQuYlBvaW50ZXIpO1xyXG5cclxuICAgICAgICB2YXIgYSA9IGNvbnRleHQuY29yZS53cmFwKGJJbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzIC0gMSk7XHJcbiAgICAgICAgYkluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3MgPSBhO1xyXG5cclxuICAgICAgICBpZiAoYSAhPT0gMCkge1xyXG4gICAgICAgICAgICBjb250ZXh0LnRhc2suaW5zdHJ1Y3Rpb25Qb2ludGVyID0gY29udGV4dC5jb3JlLndyYXAoY29udGV4dC5hUG9pbnRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZGpuX2IoY29udGV4dDogSUV4ZWN1dGlvbkNvbnRleHQpIHtcclxuXHJcbiAgICAgICAgdmFyIGJJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmJQb2ludGVyKTtcclxuXHJcbiAgICAgICAgdmFyIGIgPSBjb250ZXh0LmNvcmUud3JhcChiSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcyAtIDEpO1xyXG4gICAgICAgIGJJbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzID0gYjtcclxuXHJcbiAgICAgICAgaWYgKGIgIT09IDApIHtcclxuICAgICAgICAgICAgY29udGV4dC50YXNrLmluc3RydWN0aW9uUG9pbnRlciA9IGNvbnRleHQuY29yZS53cmFwKGNvbnRleHQuYVBvaW50ZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRqbl9mKGNvbnRleHQ6IElFeGVjdXRpb25Db250ZXh0KSB7XHJcblxyXG4gICAgICAgIHZhciBiSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5iUG9pbnRlcik7XHJcblxyXG4gICAgICAgIHZhciBhID0gY29udGV4dC5jb3JlLndyYXAoYkluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3MgLSAxKTtcclxuICAgICAgICBiSW5zdHJ1Y3Rpb24uYU9wZXJhbmQuYWRkcmVzcyA9IGE7XHJcblxyXG4gICAgICAgIHZhciBiID0gY29udGV4dC5jb3JlLndyYXAoYkluc3RydWN0aW9uLmJPcGVyYW5kLmFkZHJlc3MgLSAxKTtcclxuICAgICAgICBiSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcyA9IGI7XHJcblxyXG4gICAgICAgIGlmIChhICE9PSAwIHx8IGIgIT09IDApIHtcclxuICAgICAgICAgICAgY29udGV4dC50YXNrLmluc3RydWN0aW9uUG9pbnRlciA9IGNvbnRleHQuY29yZS53cmFwKGNvbnRleHQuYVBvaW50ZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlcV9hKGNvbnRleHQ6IElFeGVjdXRpb25Db250ZXh0KSB7XHJcblxyXG4gICAgICAgIHZhciBhSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5hUG9pbnRlcik7XHJcbiAgICAgICAgdmFyIGJJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmJQb2ludGVyKTtcclxuXHJcbiAgICAgICAgaWYgKGFJbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzID09PSBiSW5zdHJ1Y3Rpb24uYU9wZXJhbmQuYWRkcmVzcykge1xyXG5cclxuICAgICAgICAgICAgY29udGV4dC50YXNrLmluc3RydWN0aW9uUG9pbnRlciA9IGNvbnRleHQuY29yZS53cmFwKFxyXG4gICAgICAgICAgICAgICAgY29udGV4dC50YXNrLmluc3RydWN0aW9uUG9pbnRlciArIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlcV9iKGNvbnRleHQ6IElFeGVjdXRpb25Db250ZXh0KSB7XHJcblxyXG4gICAgICAgIHZhciBhSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5hUG9pbnRlcik7XHJcbiAgICAgICAgdmFyIGJJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmJQb2ludGVyKTtcclxuXHJcbiAgICAgICAgaWYgKGFJbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzID09PSBiSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcykge1xyXG5cclxuICAgICAgICAgICAgY29udGV4dC50YXNrLmluc3RydWN0aW9uUG9pbnRlciA9IGNvbnRleHQuY29yZS53cmFwKFxyXG4gICAgICAgICAgICAgICAgY29udGV4dC50YXNrLmluc3RydWN0aW9uUG9pbnRlciArIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlcV9hYihjb250ZXh0OiBJRXhlY3V0aW9uQ29udGV4dCkge1xyXG5cclxuICAgICAgICB2YXIgYUluc3RydWN0aW9uID0gY29udGV4dC5jb3JlLnJlYWRBdChjb250ZXh0LnRhc2ssIGNvbnRleHQuYVBvaW50ZXIpO1xyXG4gICAgICAgIHZhciBiSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5iUG9pbnRlcik7XHJcblxyXG4gICAgICAgIGlmIChhSW5zdHJ1Y3Rpb24uYU9wZXJhbmQuYWRkcmVzcyA9PT0gYkluc3RydWN0aW9uLmJPcGVyYW5kLmFkZHJlc3MpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnRleHQudGFzay5pbnN0cnVjdGlvblBvaW50ZXIgPSBjb250ZXh0LmNvcmUud3JhcChcclxuICAgICAgICAgICAgICAgIGNvbnRleHQudGFzay5pbnN0cnVjdGlvblBvaW50ZXIgKyAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXFfYmEoY29udGV4dDogSUV4ZWN1dGlvbkNvbnRleHQpIHtcclxuXHJcbiAgICAgICAgdmFyIGFJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmFQb2ludGVyKTtcclxuICAgICAgICB2YXIgYkluc3RydWN0aW9uID0gY29udGV4dC5jb3JlLnJlYWRBdChjb250ZXh0LnRhc2ssIGNvbnRleHQuYlBvaW50ZXIpO1xyXG5cclxuICAgICAgICBpZiAoYUluc3RydWN0aW9uLmJPcGVyYW5kLmFkZHJlc3MgPT09IGJJbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzKSB7XHJcblxyXG4gICAgICAgICAgICBjb250ZXh0LnRhc2suaW5zdHJ1Y3Rpb25Qb2ludGVyID0gY29udGV4dC5jb3JlLndyYXAoXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnRhc2suaW5zdHJ1Y3Rpb25Qb2ludGVyICsgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2VxX2YoY29udGV4dDogSUV4ZWN1dGlvbkNvbnRleHQpIHtcclxuXHJcbiAgICAgICAgdmFyIGFJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmFQb2ludGVyKTtcclxuICAgICAgICB2YXIgYkluc3RydWN0aW9uID0gY29udGV4dC5jb3JlLnJlYWRBdChjb250ZXh0LnRhc2ssIGNvbnRleHQuYlBvaW50ZXIpO1xyXG5cclxuICAgICAgICBpZiAoYUluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3MgPT09IGJJbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzICYmXHJcbiAgICAgICAgICAgIGFJbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzID09PSBiSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcykge1xyXG5cclxuICAgICAgICAgICAgY29udGV4dC50YXNrLmluc3RydWN0aW9uUG9pbnRlciA9IGNvbnRleHQuY29yZS53cmFwKFxyXG4gICAgICAgICAgICAgICAgY29udGV4dC50YXNrLmluc3RydWN0aW9uUG9pbnRlciArIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlcV94KGNvbnRleHQ6IElFeGVjdXRpb25Db250ZXh0KSB7XHJcblxyXG4gICAgICAgIHZhciBhSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5hUG9pbnRlcik7XHJcbiAgICAgICAgdmFyIGJJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmJQb2ludGVyKTtcclxuXHJcbiAgICAgICAgaWYgKGFJbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzID09PSBiSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcyAmJlxyXG4gICAgICAgICAgICBhSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcyA9PT0gYkluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3MpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnRleHQudGFzay5pbnN0cnVjdGlvblBvaW50ZXIgPSBjb250ZXh0LmNvcmUud3JhcChcclxuICAgICAgICAgICAgICAgIGNvbnRleHQudGFzay5pbnN0cnVjdGlvblBvaW50ZXIgKyAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXFfaShjb250ZXh0OiBJRXhlY3V0aW9uQ29udGV4dCkge1xyXG5cclxuICAgICAgICB2YXIgYUluc3RydWN0aW9uID0gY29udGV4dC5jb3JlLnJlYWRBdChjb250ZXh0LnRhc2ssIGNvbnRleHQuYVBvaW50ZXIpO1xyXG4gICAgICAgIHZhciBiSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5iUG9pbnRlcik7XHJcblxyXG4gICAgICAgIGlmIChhSW5zdHJ1Y3Rpb24ub3Bjb2RlID09PSBiSW5zdHJ1Y3Rpb24ub3Bjb2RlICYmXHJcbiAgICAgICAgICAgIGFJbnN0cnVjdGlvbi5tb2RpZmllciA9PT0gYkluc3RydWN0aW9uLm1vZGlmaWVyICYmXHJcbiAgICAgICAgICAgIGFJbnN0cnVjdGlvbi5hT3BlcmFuZC5tb2RlID09PSBiSW5zdHJ1Y3Rpb24uYU9wZXJhbmQubW9kZSAmJlxyXG4gICAgICAgICAgICBhSW5zdHJ1Y3Rpb24uYU9wZXJhbmQuYWRkcmVzcyA9PT0gYkluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3MgJiZcclxuICAgICAgICAgICAgYUluc3RydWN0aW9uLmJPcGVyYW5kLm1vZGUgPT09IGJJbnN0cnVjdGlvbi5iT3BlcmFuZC5tb2RlICYmXHJcbiAgICAgICAgICAgIGFJbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzID09PSBiSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcykge1xyXG5cclxuICAgICAgICAgICAgY29udGV4dC50YXNrLmluc3RydWN0aW9uUG9pbnRlciA9IGNvbnRleHQuY29yZS53cmFwKFxyXG4gICAgICAgICAgICAgICAgY29udGV4dC50YXNrLmluc3RydWN0aW9uUG9pbnRlciArIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNuZV9hKGNvbnRleHQ6IElFeGVjdXRpb25Db250ZXh0KSB7XHJcblxyXG4gICAgICAgIHZhciBhSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5hUG9pbnRlcik7XHJcbiAgICAgICAgdmFyIGJJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmJQb2ludGVyKTtcclxuXHJcbiAgICAgICAgaWYgKGFJbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzICE9PSBiSW5zdHJ1Y3Rpb24uYU9wZXJhbmQuYWRkcmVzcykge1xyXG5cclxuICAgICAgICAgICAgY29udGV4dC50YXNrLmluc3RydWN0aW9uUG9pbnRlciA9IGNvbnRleHQuY29yZS53cmFwKFxyXG4gICAgICAgICAgICAgICAgY29udGV4dC50YXNrLmluc3RydWN0aW9uUG9pbnRlciArIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNuZV9iKGNvbnRleHQ6IElFeGVjdXRpb25Db250ZXh0KSB7XHJcblxyXG4gICAgICAgIHZhciBhSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5hUG9pbnRlcik7XHJcbiAgICAgICAgdmFyIGJJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmJQb2ludGVyKTtcclxuXHJcbiAgICAgICAgaWYgKGFJbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzICE9PSBiSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcykge1xyXG5cclxuICAgICAgICAgICAgY29udGV4dC50YXNrLmluc3RydWN0aW9uUG9pbnRlciA9IGNvbnRleHQuY29yZS53cmFwKFxyXG4gICAgICAgICAgICAgICAgY29udGV4dC50YXNrLmluc3RydWN0aW9uUG9pbnRlciArIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNuZV9hYihjb250ZXh0OiBJRXhlY3V0aW9uQ29udGV4dCkge1xyXG5cclxuICAgICAgICB2YXIgYUluc3RydWN0aW9uID0gY29udGV4dC5jb3JlLnJlYWRBdChjb250ZXh0LnRhc2ssIGNvbnRleHQuYVBvaW50ZXIpO1xyXG4gICAgICAgIHZhciBiSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5iUG9pbnRlcik7XHJcblxyXG4gICAgICAgIGlmIChhSW5zdHJ1Y3Rpb24uYU9wZXJhbmQuYWRkcmVzcyAhPT0gYkluc3RydWN0aW9uLmJPcGVyYW5kLmFkZHJlc3MpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnRleHQudGFzay5pbnN0cnVjdGlvblBvaW50ZXIgPSBjb250ZXh0LmNvcmUud3JhcChcclxuICAgICAgICAgICAgICAgIGNvbnRleHQudGFzay5pbnN0cnVjdGlvblBvaW50ZXIgKyAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzbmVfYmEoY29udGV4dDogSUV4ZWN1dGlvbkNvbnRleHQpIHtcclxuXHJcbiAgICAgICAgdmFyIGFJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmFQb2ludGVyKTtcclxuICAgICAgICB2YXIgYkluc3RydWN0aW9uID0gY29udGV4dC5jb3JlLnJlYWRBdChjb250ZXh0LnRhc2ssIGNvbnRleHQuYlBvaW50ZXIpO1xyXG5cclxuICAgICAgICBpZiAoYUluc3RydWN0aW9uLmJPcGVyYW5kLmFkZHJlc3MgIT09IGJJbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzKSB7XHJcblxyXG4gICAgICAgICAgICBjb250ZXh0LnRhc2suaW5zdHJ1Y3Rpb25Qb2ludGVyID0gY29udGV4dC5jb3JlLndyYXAoXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnRhc2suaW5zdHJ1Y3Rpb25Qb2ludGVyICsgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc25lX2YoY29udGV4dDogSUV4ZWN1dGlvbkNvbnRleHQpIHtcclxuXHJcbiAgICAgICAgdmFyIGFJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmFQb2ludGVyKTtcclxuICAgICAgICB2YXIgYkluc3RydWN0aW9uID0gY29udGV4dC5jb3JlLnJlYWRBdChjb250ZXh0LnRhc2ssIGNvbnRleHQuYlBvaW50ZXIpO1xyXG5cclxuICAgICAgICBpZiAoYUluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3MgIT09IGJJbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzIHx8XHJcbiAgICAgICAgICAgIGFJbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzICE9PSBiSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcykge1xyXG5cclxuICAgICAgICAgICAgY29udGV4dC50YXNrLmluc3RydWN0aW9uUG9pbnRlciA9IGNvbnRleHQuY29yZS53cmFwKFxyXG4gICAgICAgICAgICAgICAgY29udGV4dC50YXNrLmluc3RydWN0aW9uUG9pbnRlciArIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNuZV94KGNvbnRleHQ6IElFeGVjdXRpb25Db250ZXh0KSB7XHJcblxyXG4gICAgICAgIHZhciBhSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5hUG9pbnRlcik7XHJcbiAgICAgICAgdmFyIGJJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmJQb2ludGVyKTtcclxuXHJcbiAgICAgICAgaWYgKGFJbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzICE9PSBiSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcyB8fFxyXG4gICAgICAgICAgICBhSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcyAhPT0gYkluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3MpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnRleHQudGFzay5pbnN0cnVjdGlvblBvaW50ZXIgPSBjb250ZXh0LmNvcmUud3JhcChcclxuICAgICAgICAgICAgICAgIGNvbnRleHQudGFzay5pbnN0cnVjdGlvblBvaW50ZXIgKyAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzbmVfaShjb250ZXh0OiBJRXhlY3V0aW9uQ29udGV4dCkge1xyXG5cclxuICAgICAgICB2YXIgYUluc3RydWN0aW9uID0gY29udGV4dC5jb3JlLnJlYWRBdChjb250ZXh0LnRhc2ssIGNvbnRleHQuYVBvaW50ZXIpO1xyXG4gICAgICAgIHZhciBiSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5iUG9pbnRlcik7XHJcblxyXG4gICAgICAgIGlmIChhSW5zdHJ1Y3Rpb24ub3Bjb2RlICE9PSBiSW5zdHJ1Y3Rpb24ub3Bjb2RlIHx8XHJcbiAgICAgICAgICAgIGFJbnN0cnVjdGlvbi5tb2RpZmllciAhPT0gYkluc3RydWN0aW9uLm1vZGlmaWVyIHx8XHJcbiAgICAgICAgICAgIGFJbnN0cnVjdGlvbi5hT3BlcmFuZC5tb2RlICE9PSBiSW5zdHJ1Y3Rpb24uYU9wZXJhbmQubW9kZSB8fFxyXG4gICAgICAgICAgICBhSW5zdHJ1Y3Rpb24uYU9wZXJhbmQuYWRkcmVzcyAhPT0gYkluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3MgfHxcclxuICAgICAgICAgICAgYUluc3RydWN0aW9uLmJPcGVyYW5kLm1vZGUgIT09IGJJbnN0cnVjdGlvbi5iT3BlcmFuZC5tb2RlIHx8XHJcbiAgICAgICAgICAgIGFJbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzICE9PSBiSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcykge1xyXG5cclxuICAgICAgICAgICAgY29udGV4dC50YXNrLmluc3RydWN0aW9uUG9pbnRlciA9IGNvbnRleHQuY29yZS53cmFwKFxyXG4gICAgICAgICAgICAgICAgY29udGV4dC50YXNrLmluc3RydWN0aW9uUG9pbnRlciArIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNsdF9hKGNvbnRleHQ6IElFeGVjdXRpb25Db250ZXh0KSB7XHJcblxyXG4gICAgICAgIHZhciBhSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5hUG9pbnRlcik7XHJcbiAgICAgICAgdmFyIGJJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmJQb2ludGVyKTtcclxuXHJcbiAgICAgICAgaWYgKGFJbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzIDwgYkluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3MpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnRleHQudGFzay5pbnN0cnVjdGlvblBvaW50ZXIgPSBjb250ZXh0LmNvcmUud3JhcChcclxuICAgICAgICAgICAgICAgIGNvbnRleHQudGFzay5pbnN0cnVjdGlvblBvaW50ZXIgKyAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzbHRfYihjb250ZXh0OiBJRXhlY3V0aW9uQ29udGV4dCkge1xyXG5cclxuICAgICAgICB2YXIgYUluc3RydWN0aW9uID0gY29udGV4dC5jb3JlLnJlYWRBdChjb250ZXh0LnRhc2ssIGNvbnRleHQuYVBvaW50ZXIpO1xyXG4gICAgICAgIHZhciBiSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5iUG9pbnRlcik7XHJcblxyXG4gICAgICAgIGlmIChhSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcyA8IGJJbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzKSB7XHJcblxyXG4gICAgICAgICAgICBjb250ZXh0LnRhc2suaW5zdHJ1Y3Rpb25Qb2ludGVyID0gY29udGV4dC5jb3JlLndyYXAoXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnRhc2suaW5zdHJ1Y3Rpb25Qb2ludGVyICsgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2x0X2FiKGNvbnRleHQ6IElFeGVjdXRpb25Db250ZXh0KSB7XHJcblxyXG4gICAgICAgIHZhciBhSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5hUG9pbnRlcik7XHJcbiAgICAgICAgdmFyIGJJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmJQb2ludGVyKTtcclxuXHJcbiAgICAgICAgaWYgKGFJbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzIDwgYkluc3RydWN0aW9uLmJPcGVyYW5kLmFkZHJlc3MpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnRleHQudGFzay5pbnN0cnVjdGlvblBvaW50ZXIgPSBjb250ZXh0LmNvcmUud3JhcChcclxuICAgICAgICAgICAgICAgIGNvbnRleHQudGFzay5pbnN0cnVjdGlvblBvaW50ZXIgKyAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzbHRfYmEoY29udGV4dDogSUV4ZWN1dGlvbkNvbnRleHQpIHtcclxuXHJcbiAgICAgICAgdmFyIGFJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmFQb2ludGVyKTtcclxuICAgICAgICB2YXIgYkluc3RydWN0aW9uID0gY29udGV4dC5jb3JlLnJlYWRBdChjb250ZXh0LnRhc2ssIGNvbnRleHQuYlBvaW50ZXIpO1xyXG5cclxuICAgICAgICBpZiAoYUluc3RydWN0aW9uLmJPcGVyYW5kLmFkZHJlc3MgPCBiSW5zdHJ1Y3Rpb24uYU9wZXJhbmQuYWRkcmVzcykge1xyXG5cclxuICAgICAgICAgICAgY29udGV4dC50YXNrLmluc3RydWN0aW9uUG9pbnRlciA9IGNvbnRleHQuY29yZS53cmFwKFxyXG4gICAgICAgICAgICAgICAgY29udGV4dC50YXNrLmluc3RydWN0aW9uUG9pbnRlciArIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNsdF9mKGNvbnRleHQ6IElFeGVjdXRpb25Db250ZXh0KSB7XHJcblxyXG4gICAgICAgIHZhciBhSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5hUG9pbnRlcik7XHJcbiAgICAgICAgdmFyIGJJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmJQb2ludGVyKTtcclxuXHJcbiAgICAgICAgaWYgKGFJbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzIDwgYkluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3MgJiZcclxuICAgICAgICAgICAgYUluc3RydWN0aW9uLmJPcGVyYW5kLmFkZHJlc3MgPCBiSW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcykge1xyXG5cclxuICAgICAgICAgICAgY29udGV4dC50YXNrLmluc3RydWN0aW9uUG9pbnRlciA9IGNvbnRleHQuY29yZS53cmFwKFxyXG4gICAgICAgICAgICAgICAgY29udGV4dC50YXNrLmluc3RydWN0aW9uUG9pbnRlciArIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNsdF94KGNvbnRleHQ6IElFeGVjdXRpb25Db250ZXh0KSB7XHJcblxyXG4gICAgICAgIHZhciBhSW5zdHJ1Y3Rpb24gPSBjb250ZXh0LmNvcmUucmVhZEF0KGNvbnRleHQudGFzaywgY29udGV4dC5hUG9pbnRlcik7XHJcbiAgICAgICAgdmFyIGJJbnN0cnVjdGlvbiA9IGNvbnRleHQuY29yZS5yZWFkQXQoY29udGV4dC50YXNrLCBjb250ZXh0LmJQb2ludGVyKTtcclxuXHJcbiAgICAgICAgaWYgKGFJbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzIDwgYkluc3RydWN0aW9uLmJPcGVyYW5kLmFkZHJlc3MgJiZcclxuICAgICAgICAgICAgYUluc3RydWN0aW9uLmJPcGVyYW5kLmFkZHJlc3MgPCBiSW5zdHJ1Y3Rpb24uYU9wZXJhbmQuYWRkcmVzcykge1xyXG5cclxuICAgICAgICAgICAgY29udGV4dC50YXNrLmluc3RydWN0aW9uUG9pbnRlciA9IGNvbnRleHQuY29yZS53cmFwKFxyXG4gICAgICAgICAgICAgICAgY29udGV4dC50YXNrLmluc3RydWN0aW9uUG9pbnRlciArIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNwbChjb250ZXh0OiBJRXhlY3V0aW9uQ29udGV4dCkge1xyXG5cclxuICAgICAgICBpZiAoY29udGV4dC53YXJyaW9yLnRhc2tzLmxlbmd0aCA8IHRoaXMuaW5zdHJ1Y3Rpb25MaW1pdCkge1xyXG5cclxuICAgICAgICAgICAgY29udGV4dC53YXJyaW9yLnRhc2tzLnNwbGljZShjb250ZXh0LndhcnJpb3IudGFza0luZGV4LCAwLCB7XHJcbiAgICAgICAgICAgICAgICBpbnN0cnVjdGlvblBvaW50ZXI6IGNvbnRleHQuY29yZS53cmFwKGNvbnRleHQuYVBvaW50ZXIpLFxyXG4gICAgICAgICAgICAgICAgd2FycmlvcjogY29udGV4dC53YXJyaW9yXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb250ZXh0LndhcnJpb3IudGFza0luZGV4ID0gKGNvbnRleHQud2Fycmlvci50YXNrSW5kZXggKyAxKSAlIGNvbnRleHQud2Fycmlvci50YXNrcy5sZW5ndGg7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG5vcChjb250ZXh0OiBJRXhlY3V0aW9uQ29udGV4dCkge1xyXG4gICAgICAgIC8vIERPIE5PV1RcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NpbXVsYXRvci9FeGVjdXRpdmUudHMiLCJpbXBvcnQgeyBJRGVjb2RlciB9IGZyb20gXCIuL2ludGVyZmFjZS9JRGVjb2RlclwiO1xyXG5pbXBvcnQgeyBJRXhlY3V0aXZlIH0gZnJvbSBcIi4vaW50ZXJmYWNlL0lFeGVjdXRpdmVcIjtcclxuaW1wb3J0IHsgSU9wZXJhbmQgfSBmcm9tIFwiLi9pbnRlcmZhY2UvSU9wZXJhbmRcIjtcclxuaW1wb3J0IHsgSVRhc2sgfSBmcm9tIFwiLi9pbnRlcmZhY2UvSVRhc2tcIjtcclxuaW1wb3J0IHsgSUNvcmUgfSBmcm9tIFwiLi9pbnRlcmZhY2UvSUNvcmVcIjtcclxuaW1wb3J0IHsgSUV4ZWN1dGlvbkNvbnRleHQgfSBmcm9tIFwiLi9pbnRlcmZhY2UvSUV4ZWN1dGlvbkNvbnRleHRcIjtcclxuaW1wb3J0IHsgTW9kaWZpZXJUeXBlIH0gZnJvbSBcIi4vaW50ZXJmYWNlL0lJbnN0cnVjdGlvblwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERlY29kZXIgaW1wbGVtZW50cyBJRGVjb2RlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBleGVjdXRpdmU6IElFeGVjdXRpdmU7XHJcblxyXG4gICAgcHJpdmF0ZSBtb2RlVGFibGU6ICgodGFzazogSVRhc2ssIGlwOiBudW1iZXIsIG9wZXJhbmQ6IElPcGVyYW5kLCBjb3JlOiBJQ29yZSkgPT4gbnVtYmVyKVtdID0gW1xyXG4gICAgICAgIHRoaXMuaW1tZWRpYXRlLCAgICAgICAgIC8vICNcclxuICAgICAgICB0aGlzLmRpcmVjdCwgICAgICAgICAgICAvLyAkXHJcbiAgICAgICAgdGhpcy5hSW5kaXJlY3QsICAgICAgICAgLy8gKlxyXG4gICAgICAgIHRoaXMuYkluZGlyZWN0LCAgICAgICAgIC8vIEBcclxuICAgICAgICB0aGlzLmFQcmVEZWNyZW1lbnQsICAgICAvLyB7XHJcbiAgICAgICAgdGhpcy5iUHJlRGVjcmVtZW50LCAgICAgLy8gPFxyXG4gICAgICAgIHRoaXMuYVBvc3RJbmNyZW1lbnQsICAgIC8vIH1cclxuICAgICAgICB0aGlzLmJQb3N0SW5jcmVtZW50ICAgICAvLyA+XHJcbiAgICBdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGV4ZWN1dGl2ZTogSUV4ZWN1dGl2ZSkge1xyXG5cclxuICAgICAgICB0aGlzLmV4ZWN1dGl2ZSA9IGV4ZWN1dGl2ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVjb2RlKGNvbnRleHQ6IElFeGVjdXRpb25Db250ZXh0KTogSUV4ZWN1dGlvbkNvbnRleHQge1xyXG5cclxuICAgICAgICB2YXIgYUFjY2Vzc29yID0gdGhpcy5tb2RlVGFibGVbY29udGV4dC5pbnN0cnVjdGlvbi5hT3BlcmFuZC5tb2RlXTtcclxuICAgICAgICB2YXIgYkFjY2Vzc29yID0gdGhpcy5tb2RlVGFibGVbY29udGV4dC5pbnN0cnVjdGlvbi5iT3BlcmFuZC5tb2RlXTtcclxuXHJcbiAgICAgICAgY29udGV4dC5hUG9pbnRlciA9IGFBY2Nlc3NvcihcclxuICAgICAgICAgICAgY29udGV4dC50YXNrLFxyXG4gICAgICAgICAgICBjb250ZXh0Lmluc3RydWN0aW9uUG9pbnRlcixcclxuICAgICAgICAgICAgY29udGV4dC5pbnN0cnVjdGlvbi5hT3BlcmFuZCxcclxuICAgICAgICAgICAgY29udGV4dC5jb3JlKTtcclxuXHJcbiAgICAgICAgY29udGV4dC5iUG9pbnRlciA9IGJBY2Nlc3NvcihcclxuICAgICAgICAgICAgY29udGV4dC50YXNrLFxyXG4gICAgICAgICAgICBjb250ZXh0Lmluc3RydWN0aW9uUG9pbnRlcixcclxuICAgICAgICAgICAgY29udGV4dC5pbnN0cnVjdGlvbi5iT3BlcmFuZCxcclxuICAgICAgICAgICAgY29udGV4dC5jb3JlKTtcclxuXHJcbiAgICAgICAgY29udGV4dC5jb21tYW5kID0gdGhpcy5leGVjdXRpdmUuY29tbWFuZFRhYmxlW1xyXG4gICAgICAgICAgICBjb250ZXh0Lmluc3RydWN0aW9uLm9wY29kZSAqIE1vZGlmaWVyVHlwZS5Db3VudCArIGNvbnRleHQuaW5zdHJ1Y3Rpb24ubW9kaWZpZXJcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICByZXR1cm4gY29udGV4dDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGltbWVkaWF0ZSh0YXNrOiBJVGFzaywgaXA6IG51bWJlciwgb3BlcmFuZDogSU9wZXJhbmQsIGNvcmU6IElDb3JlKSB7XHJcbiAgICAgICAgcmV0dXJuIGlwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZGlyZWN0KHRhc2s6IElUYXNrLCBpcDogbnVtYmVyLCBvcGVyYW5kOiBJT3BlcmFuZCwgY29yZTogSUNvcmUpIHtcclxuICAgICAgICByZXR1cm4gaXAgKyBvcGVyYW5kLmFkZHJlc3M7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhSW5kaXJlY3QodGFzazogSVRhc2ssIGlwOiBudW1iZXIsIG9wZXJhbmQ6IElPcGVyYW5kLCBjb3JlOiBJQ29yZSkge1xyXG5cclxuICAgICAgICB2YXIgaXBhID0gaXAgKyBvcGVyYW5kLmFkZHJlc3M7XHJcblxyXG4gICAgICAgIHJldHVybiBpcGEgKyBjb3JlLnJlYWRBdCh0YXNrLCBpcGEpLmFPcGVyYW5kLmFkZHJlc3M7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBiSW5kaXJlY3QodGFzazogSVRhc2ssIGlwOiBudW1iZXIsIG9wZXJhbmQ6IElPcGVyYW5kLCBjb3JlOiBJQ29yZSkge1xyXG5cclxuICAgICAgICB2YXIgaXBhID0gaXAgKyBvcGVyYW5kLmFkZHJlc3M7XHJcblxyXG4gICAgICAgIHJldHVybiBpcGEgKyBjb3JlLnJlYWRBdCh0YXNrLCBpcGEpLmJPcGVyYW5kLmFkZHJlc3M7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhUHJlRGVjcmVtZW50KHRhc2s6IElUYXNrLCBpcDogbnVtYmVyLCBvcGVyYW5kOiBJT3BlcmFuZCwgY29yZTogSUNvcmUpIHtcclxuXHJcbiAgICAgICAgdmFyIGlwYSA9IGlwICsgb3BlcmFuZC5hZGRyZXNzO1xyXG5cclxuICAgICAgICB2YXIgaW5zdHJ1Y3Rpb24gPSBjb3JlLnJlYWRBdCh0YXNrLCBpcGEpO1xyXG5cclxuICAgICAgICB2YXIgdmFsdWUgPSBpbnN0cnVjdGlvbi5hT3BlcmFuZC5hZGRyZXNzO1xyXG5cclxuICAgICAgICB2YXIgcmVzdWx0ID0gaXBhICsgLS12YWx1ZTtcclxuXHJcbiAgICAgICAgaW5zdHJ1Y3Rpb24uYU9wZXJhbmQuYWRkcmVzcyA9IHZhbHVlO1xyXG4gICAgICAgIGNvcmUuc2V0QXQodGFzaywgaXBhLCBpbnN0cnVjdGlvbik7XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBiUHJlRGVjcmVtZW50KHRhc2s6IElUYXNrLCBpcDogbnVtYmVyLCBvcGVyYW5kOiBJT3BlcmFuZCwgY29yZTogSUNvcmUpIHtcclxuXHJcbiAgICAgICAgdmFyIGlwYSA9IGlwICsgb3BlcmFuZC5hZGRyZXNzO1xyXG5cclxuICAgICAgICB2YXIgaW5zdHJ1Y3Rpb24gPSBjb3JlLnJlYWRBdCh0YXNrLCBpcGEpO1xyXG5cclxuICAgICAgICB2YXIgdmFsdWUgPSBpbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzO1xyXG5cclxuICAgICAgICB2YXIgcmVzdWx0ID0gaXBhICsgLS12YWx1ZTtcclxuXHJcbiAgICAgICAgaW5zdHJ1Y3Rpb24uYk9wZXJhbmQuYWRkcmVzcyA9IHZhbHVlO1xyXG4gICAgICAgIGNvcmUuc2V0QXQodGFzaywgaXBhLCBpbnN0cnVjdGlvbik7XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhUG9zdEluY3JlbWVudCh0YXNrOiBJVGFzaywgaXA6IG51bWJlciwgb3BlcmFuZDogSU9wZXJhbmQsIGNvcmU6IElDb3JlKSB7XHJcblxyXG4gICAgICAgIHZhciBpcGEgPSBpcCArIG9wZXJhbmQuYWRkcmVzcztcclxuXHJcbiAgICAgICAgdmFyIGluc3RydWN0aW9uID0gY29yZS5yZWFkQXQodGFzaywgaXBhKTtcclxuXHJcbiAgICAgICAgdmFyIHZhbHVlID0gaW5zdHJ1Y3Rpb24uYU9wZXJhbmQuYWRkcmVzcztcclxuXHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IGlwYSArIHZhbHVlKys7XHJcblxyXG4gICAgICAgIGluc3RydWN0aW9uLmFPcGVyYW5kLmFkZHJlc3MgPSB2YWx1ZTtcclxuICAgICAgICBjb3JlLnNldEF0KHRhc2ssIGlwYSwgaW5zdHJ1Y3Rpb24pO1xyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYlBvc3RJbmNyZW1lbnQodGFzazogSVRhc2ssIGlwOiBudW1iZXIsIG9wZXJhbmQ6IElPcGVyYW5kLCBjb3JlOiBJQ29yZSkge1xyXG5cclxuICAgICAgICB2YXIgaXBhID0gaXAgKyBvcGVyYW5kLmFkZHJlc3M7XHJcblxyXG4gICAgICAgIHZhciBpbnN0cnVjdGlvbiA9IGNvcmUucmVhZEF0KHRhc2ssIGlwYSk7XHJcblxyXG4gICAgICAgIHZhciB2YWx1ZSA9IGluc3RydWN0aW9uLmJPcGVyYW5kLmFkZHJlc3M7XHJcblxyXG4gICAgICAgIHZhciByZXN1bHQgPSBpcGEgKyB2YWx1ZSsrO1xyXG5cclxuICAgICAgICBpbnN0cnVjdGlvbi5iT3BlcmFuZC5hZGRyZXNzID0gdmFsdWU7XHJcbiAgICAgICAgY29yZS5zZXRBdCh0YXNrLCBpcGEsIGluc3RydWN0aW9uKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NpbXVsYXRvci9EZWNvZGVyLnRzIiwiaW1wb3J0IHsgSUxpdGVFdmVudCwgTGl0ZUV2ZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvTGl0ZUV2ZW50XCI7XHJcbmltcG9ydCB7IElDb3JlLCBJQ29yZUFjY2Vzc0V2ZW50QXJncywgQ29yZUFjY2Vzc1R5cGUgfSBmcm9tIFwiLi9pbnRlcmZhY2UvSUNvcmVcIjtcclxuaW1wb3J0IHsgSU9wdGlvbnMgfSBmcm9tIFwiLi9pbnRlcmZhY2UvSU9wdGlvbnNcIjtcclxuaW1wb3J0IHsgSUluc3RydWN0aW9uIH0gZnJvbSBcIi4vaW50ZXJmYWNlL0lJbnN0cnVjdGlvblwiO1xyXG5pbXBvcnQgeyBJVGFzayB9IGZyb20gXCIuL2ludGVyZmFjZS9JVGFza1wiO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gXCJ1bmRlcnNjb3JlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29yZSBpbXBsZW1lbnRzIElDb3JlIHtcclxuXHJcbiAgICBwcml2YXRlIF9jb3JlQWNjZXNzOiBMaXRlRXZlbnQ8SUNvcmVBY2Nlc3NFdmVudEFyZ3M+O1xyXG4gICAgcHVibGljIGdldCBjb3JlQWNjZXNzKCk6IElMaXRlRXZlbnQ8SUNvcmVBY2Nlc3NFdmVudEFyZ3M+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29yZUFjY2VzcztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9wdGlvbnM6IElPcHRpb25zO1xyXG4gICAgcHJpdmF0ZSBpbnN0cnVjdGlvbnM6IElJbnN0cnVjdGlvbltdID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIGNzOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX2NvcmVBY2Nlc3MgPSBuZXcgTGl0ZUV2ZW50PElDb3JlQWNjZXNzRXZlbnRBcmdzPigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0aWFsaXNlKG9wdGlvbnM6IElPcHRpb25zKSB7XHJcblxyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICAgICAgdGhpcy5jcyA9IHRoaXMub3B0aW9ucy5jb3Jlc2l6ZTtcclxuXHJcbiAgICAgICAgdGhpcy5hbGxvY2F0ZU1lbW9yeSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRTaXplKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3M7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHdyYXAoYWRkcmVzczogbnVtYmVyKTogbnVtYmVyIHtcclxuXHJcbiAgICAgICAgYWRkcmVzcyA9IGFkZHJlc3MgJSB0aGlzLmNzO1xyXG4gICAgICAgIGFkZHJlc3MgPSBhZGRyZXNzID49IDAgPyBhZGRyZXNzIDogYWRkcmVzcyArIHRoaXMuY3M7XHJcblxyXG4gICAgICAgIHJldHVybiBhZGRyZXNzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJpZ2dlckV2ZW50KHRhc2s6IElUYXNrLCBhZGRyZXNzOiBudW1iZXIsIGFjY2Vzc1R5cGU6IENvcmVBY2Nlc3NUeXBlKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX2NvcmVBY2Nlc3MudHJpZ2dlcih7XHJcbiAgICAgICAgICAgIHRhc2s6IHRhc2ssXHJcbiAgICAgICAgICAgIGFjY2Vzc1R5cGU6IGFjY2Vzc1R5cGUsXHJcbiAgICAgICAgICAgIGFkZHJlc3M6IGFkZHJlc3NcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXhlY3V0ZUF0KHRhc2s6IElUYXNrLCBhZGRyZXNzOiBudW1iZXIpOiBJSW5zdHJ1Y3Rpb24ge1xyXG5cclxuICAgICAgICBhZGRyZXNzID0gdGhpcy53cmFwKGFkZHJlc3MpO1xyXG5cclxuICAgICAgICB0aGlzLnRyaWdnZXJFdmVudCh0YXNrLCBhZGRyZXNzLCBDb3JlQWNjZXNzVHlwZS5leGVjdXRlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdHJ1Y3Rpb25zW2FkZHJlc3NdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWFkQXQodGFzazogSVRhc2ssIGFkZHJlc3M6IG51bWJlcik6IElJbnN0cnVjdGlvbiB7XHJcblxyXG4gICAgICAgIGFkZHJlc3MgPSB0aGlzLndyYXAoYWRkcmVzcyk7XHJcblxyXG4gICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KHRhc2ssIGFkZHJlc3MsIENvcmVBY2Nlc3NUeXBlLnJlYWQpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0cnVjdGlvbnNbYWRkcmVzc107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEF0KGFkZHJlc3M6IG51bWJlcik6IElJbnN0cnVjdGlvbiB7XHJcblxyXG4gICAgICAgIGFkZHJlc3MgPSB0aGlzLndyYXAoYWRkcmVzcyk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RydWN0aW9uc1thZGRyZXNzXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0QXQodGFzazogSVRhc2ssIGFkZHJlc3M6IG51bWJlciwgaW5zdHJ1Y3Rpb246IElJbnN0cnVjdGlvbikge1xyXG5cclxuICAgICAgICBhZGRyZXNzID0gdGhpcy53cmFwKGFkZHJlc3MpO1xyXG5cclxuICAgICAgICB0aGlzLnRyaWdnZXJFdmVudCh0YXNrLCBhZGRyZXNzLCBDb3JlQWNjZXNzVHlwZS53cml0ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25zW2FkZHJlc3NdID0gaW5zdHJ1Y3Rpb247XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhbGxvY2F0ZU1lbW9yeSgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5pbnN0cnVjdGlvbnMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY3M7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmluc3RydWN0aW9ucy5wdXNoKHRoaXMuYnVpbGREZWZhdWx0SW5zdHJ1Y3Rpb24oaSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJ1aWxkRGVmYXVsdEluc3RydWN0aW9uKGluZGV4OiBudW1iZXIpOiBJSW5zdHJ1Y3Rpb24ge1xyXG5cclxuICAgICAgICB2YXIgaW5zdHJ1Y3Rpb24gPSBfLmNsb25lKHRoaXMub3B0aW9ucy5pbml0aWFsSW5zdHJ1Y3Rpb24pO1xyXG4gICAgICAgIGluc3RydWN0aW9uLmFPcGVyYW5kID0gXy5jbG9uZShpbnN0cnVjdGlvbi5hT3BlcmFuZCk7XHJcbiAgICAgICAgaW5zdHJ1Y3Rpb24uYk9wZXJhbmQgPSBfLmNsb25lKGluc3RydWN0aW9uLmJPcGVyYW5kKTtcclxuICAgICAgICBpbnN0cnVjdGlvbi5hZGRyZXNzID0gaW5kZXg7XHJcblxyXG4gICAgICAgIHJldHVybiBpbnN0cnVjdGlvbjtcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NpbXVsYXRvci9Db3JlLnRzIiwiLy9odHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEyODgxMjEyL2RvZXMtdHlwZXNjcmlwdC1zdXBwb3J0LWV2ZW50cy1vbi1jbGFzc2VzXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElMaXRlRXZlbnQ8VD4ge1xyXG4gIHN1YnNjcmliZShoYW5kbGVyOiB7IChkYXRhPzogVCk6IHZvaWQgfSk6IHZvaWQ7XHJcbiAgdW5zdWJzY3JpYmUoaGFuZGxlcjogeyAoZGF0YT86IFQpOiB2b2lkIH0pOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTGl0ZUV2ZW50PFQ+IGltcGxlbWVudHMgSUxpdGVFdmVudDxUPiB7XHJcbiAgcHJpdmF0ZSBoYW5kbGVyczogeyAoZGF0YT86IFQpOiB2b2lkOyB9W10gPSBbXTtcclxuXHJcbiAgcHVibGljIHN1YnNjcmliZShoYW5kbGVyOiB7IChkYXRhPzogVCk6IHZvaWQgfSkge1xyXG4gICAgICB0aGlzLmhhbmRsZXJzLnB1c2goaGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdW5zdWJzY3JpYmUoaGFuZGxlcjogeyAoZGF0YT86IFQpOiB2b2lkIH0pIHtcclxuICAgICAgdGhpcy5oYW5kbGVycyA9IHRoaXMuaGFuZGxlcnMuZmlsdGVyKGggPT4gaCAhPT0gaGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdHJpZ2dlcihkYXRhPzogVCkge1xyXG4gICAgICBpZiAodGhpcy5oYW5kbGVycykge1xyXG4gICAgICAgICAgdGhpcy5oYW5kbGVycy5zbGljZSgwKS5mb3JFYWNoKGggPT4gaChkYXRhKSk7XHJcbiAgICAgIH1cclxuICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9tb2R1bGVzL0xpdGVFdmVudC50cyIsImltcG9ydCB7IElMb2FkZXIgfSBmcm9tIFwiLi9pbnRlcmZhY2UvSUxvYWRlclwiO1xyXG5pbXBvcnQgeyBJUmFuZG9tIH0gZnJvbSBcIi4vaW50ZXJmYWNlL0lSYW5kb21cIjtcclxuaW1wb3J0IHsgSUNvcmUgfSBmcm9tIFwiLi9pbnRlcmZhY2UvSUNvcmVcIjtcclxuaW1wb3J0IHsgSVdhcnJpb3JMb2FkZXIgfSBmcm9tIFwiLi9pbnRlcmZhY2UvSVdhcnJpb3JMb2FkZXJcIjtcclxuaW1wb3J0IHsgSVBhcnNlUmVzdWx0IH0gZnJvbSBcIi4uL3BhcnNlci9pbnRlcmZhY2UvSVBhcnNlUmVzdWx0XCI7XHJcbmltcG9ydCB7IElXYXJyaW9yIH0gZnJvbSBcIi4vaW50ZXJmYWNlL0lXYXJyaW9yXCI7XHJcbmltcG9ydCB7IElPcHRpb25zIH0gZnJvbSBcIi4vaW50ZXJmYWNlL0lPcHRpb25zXCI7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSBcInVuZGVyc2NvcmVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBMb2FkZXIgaW1wbGVtZW50cyBJTG9hZGVyIHtcclxuXHJcbiAgICBwcml2YXRlIHJhbmRvbTogSVJhbmRvbTtcclxuICAgIHByaXZhdGUgd2FycmlvckxvYWRlcjogSVdhcnJpb3JMb2FkZXI7XHJcbiAgICBwcml2YXRlIGNvcmU6IElDb3JlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHJhbmRvbTogSVJhbmRvbSwgY29yZTogSUNvcmUsIHdhcnJpb3JMb2FkZXI6IElXYXJyaW9yTG9hZGVyKSB7XHJcblxyXG4gICAgICAgIHRoaXMucmFuZG9tID0gcmFuZG9tO1xyXG4gICAgICAgIHRoaXMud2FycmlvckxvYWRlciA9IHdhcnJpb3JMb2FkZXI7XHJcbiAgICAgICAgdGhpcy5jb3JlID0gY29yZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9hZCh3YXJyaW9yczogSVBhcnNlUmVzdWx0W10sIG9wdGlvbnM6IElPcHRpb25zKTogSVdhcnJpb3JbXSB7XHJcblxyXG4gICAgICAgIHZhciByZXN1bHQ6IElXYXJyaW9yW10gPSBbXTtcclxuXHJcbiAgICAgICAgXyh3YXJyaW9ycykuZm9yRWFjaCgodzogSVBhcnNlUmVzdWx0KSA9PiB7XHJcblxyXG4gICAgICAgICAgICB2YXIgYWRkcmVzcyA9IHRoaXMuZ2V0VmFsaWRBZGRyZXNzKHJlc3VsdCwgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLndhcnJpb3JMb2FkZXIubG9hZChhZGRyZXNzLCB3KSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRWYWxpZEFkZHJlc3Mod2FycmlvcnM6IElXYXJyaW9yW10sIG9wdGlvbnM6IElPcHRpb25zKTogbnVtYmVyIHtcclxuXHJcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBhZGRyZXNzID0gdGhpcy5yYW5kb20uZ2V0KG9wdGlvbnMuY29yZXNpemUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNWYWxpZEFkZHJlc3MoYWRkcmVzcywgd2FycmlvcnMsIG9wdGlvbnMpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYWRkcmVzcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzVmFsaWRBZGRyZXNzKGFkZHJlc3M6IG51bWJlciwgd2FycmlvcnM6IElXYXJyaW9yW10sIG9wdGlvbnM6IElPcHRpb25zKTogYm9vbGVhbiB7XHJcblxyXG4gICAgICAgIHZhciB2YWxpZCA9IHRydWU7XHJcbiAgICAgICAgdmFyIGNvcmUgPSB0aGlzLmNvcmU7XHJcblxyXG4gICAgICAgIHZhciBpbnN0cnVjdGlvbkxpbWl0TGVzczEgPSBvcHRpb25zLmluc3RydWN0aW9uTGltaXQgLSAxO1xyXG4gICAgICAgIHZhciBtaW5TZXBhcmF0aW9uTGVzczEgPSBvcHRpb25zLm1pblNlcGFyYXRpb24gLSAxO1xyXG5cclxuICAgICAgICBfKHdhcnJpb3JzKS5mb3JFYWNoKCh3OiBJV2FycmlvcikgPT4ge1xyXG5cclxuICAgICAgICAgICAgdmFyIHMwID0gYWRkcmVzcztcclxuICAgICAgICAgICAgdmFyIGYwID0gYWRkcmVzcyArIGluc3RydWN0aW9uTGltaXRMZXNzMTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzMSA9IHcuc3RhcnRBZGRyZXNzIC0gbWluU2VwYXJhdGlvbkxlc3MxO1xyXG4gICAgICAgICAgICB2YXIgZjEgPSB3LnN0YXJ0QWRkcmVzcyArIG1pblNlcGFyYXRpb25MZXNzMSArIGluc3RydWN0aW9uTGltaXRMZXNzMTtcclxuXHJcbiAgICAgICAgICAgIHMwID0gY29yZS53cmFwKHMwKTtcclxuICAgICAgICAgICAgZjAgPSBjb3JlLndyYXAoZjApO1xyXG4gICAgICAgICAgICBzMSA9IGNvcmUud3JhcChzMSk7XHJcbiAgICAgICAgICAgIGYxID0gY29yZS53cmFwKGYxKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzMCA8PSBmMCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzMSA8PSBmMSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoczAgPD0gZjEgJiYgczEgPD0gZjApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHMwIDw9IGYxIHx8IHMxIDw9IGYwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHMwIDw9IGYxIHx8IHMxIDw9IGYwKSB7XHJcbiAgICAgICAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB2YWxpZDtcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NpbXVsYXRvci9Mb2FkZXIudHMiLCJpbXBvcnQgeyBJV2FycmlvckxvYWRlciB9IGZyb20gXCIuL2ludGVyZmFjZS9JV2FycmlvckxvYWRlclwiO1xyXG5pbXBvcnQgeyBJV2FycmlvciB9IGZyb20gXCIuL2ludGVyZmFjZS9JV2FycmlvclwiO1xyXG5pbXBvcnQgeyBJQ29yZSB9IGZyb20gXCIuL2ludGVyZmFjZS9JQ29yZVwiO1xyXG5pbXBvcnQgeyBJSW5zdHJ1Y3Rpb24sIE9wY29kZVR5cGUsIE1vZGlmaWVyVHlwZSB9IGZyb20gXCIuL2ludGVyZmFjZS9JSW5zdHJ1Y3Rpb25cIjtcclxuaW1wb3J0IHsgSU9wZXJhbmQsIE1vZGVUeXBlIH0gZnJvbSBcIi4vaW50ZXJmYWNlL0lPcGVyYW5kXCI7XHJcblxyXG5pbXBvcnQgeyBJVG9rZW5TdHJlYW0gfSBmcm9tIFwiLi4vcGFyc2VyL2ludGVyZmFjZS9JVG9rZW5TdHJlYW1cIjtcclxuaW1wb3J0IHsgSVBhcnNlUmVzdWx0IH0gZnJvbSBcIi4uL3BhcnNlci9pbnRlcmZhY2UvSVBhcnNlUmVzdWx0XCI7XHJcbmltcG9ydCB7IFRva2VuQ2F0ZWdvcnkgfSBmcm9tIFwiLi4vcGFyc2VyL2ludGVyZmFjZS9JVG9rZW5cIjtcclxuaW1wb3J0IHsgSVBhcnNlSW5zdHJ1Y3Rpb24gfSBmcm9tIFwiLi4vcGFyc2VyL2ludGVyZmFjZS9JUGFyc2VJbnN0cnVjdGlvblwiO1xyXG5pbXBvcnQgeyBJUGFyc2VPcGVyYW5kIH0gZnJvbSBcIi4uL3BhcnNlci9pbnRlcmZhY2UvSVBhcnNlT3BlcmFuZFwiO1xyXG5cclxuaW1wb3J0IHsgVG9rZW5TdHJlYW0gfSBmcm9tIFwiLi4vcGFyc2VyL1Rva2VuU3RyZWFtXCI7XHJcbmltcG9ydCB7IFdhcnJpb3IgfSBmcm9tIFwiLi9XYXJyaW9yXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgV2FycmlvckxvYWRlciBpbXBsZW1lbnRzIElXYXJyaW9yTG9hZGVyIHtcclxuXHJcbiAgICBwcml2YXRlIGFkZHJlc3M6IG51bWJlcjtcclxuICAgIHByaXZhdGUgc3RyZWFtOiBJVG9rZW5TdHJlYW07XHJcbiAgICBwcml2YXRlIHdhcnJpb3I6IElXYXJyaW9yO1xyXG5cclxuICAgIHByaXZhdGUgY29yZTogSUNvcmU7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGFydEFkZHJlc3M6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb3JlOiBJQ29yZSkge1xyXG5cclxuICAgICAgICB0aGlzLmNvcmUgPSBjb3JlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2FkKGFkZHJlc3M6IG51bWJlciwgcmVzdWx0OiBJUGFyc2VSZXN1bHQpOiBJV2FycmlvciB7XHJcblxyXG4gICAgICAgIHRoaXMuc3RyZWFtID0gbmV3IFRva2VuU3RyZWFtKHJlc3VsdC50b2tlbnMsIHJlc3VsdC5tZXNzYWdlcyk7XHJcbiAgICAgICAgdGhpcy5hZGRyZXNzID0gYWRkcmVzcztcclxuXHJcbiAgICAgICAgdGhpcy53YXJyaW9yID0gbmV3IFdhcnJpb3IoKTtcclxuICAgICAgICB0aGlzLndhcnJpb3Iuc3RhcnRBZGRyZXNzID0gYWRkcmVzcztcclxuXHJcbiAgICAgICAgdGhpcy5yZWFkSW5zdHJ1Y3Rpb25zKCk7XHJcblxyXG4gICAgICAgIHRoaXMubG9hZFByb2Nlc3MoKTtcclxuXHJcbiAgICAgICAgdGhpcy53YXJyaW9yLm5hbWUgPSByZXN1bHQubWV0YURhdGEubmFtZTtcclxuICAgICAgICB0aGlzLndhcnJpb3IuYXV0aG9yID0gcmVzdWx0Lm1ldGFEYXRhLmF1dGhvcjtcclxuICAgICAgICB0aGlzLndhcnJpb3Iuc3RyYXRlZ3kgPSByZXN1bHQubWV0YURhdGEuc3RyYXRlZ3k7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLndhcnJpb3I7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkSW5zdHJ1Y3Rpb25zKCkge1xyXG4gICAgICAgIHdoaWxlICghdGhpcy5zdHJlYW0uZW9mKCkpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBuZXh0ID0gdGhpcy5zdHJlYW0ucGVlaygpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG5leHQuY2F0ZWdvcnkgPT09IFRva2VuQ2F0ZWdvcnkuT3Bjb2RlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb3JlLnNldEF0KHRoaXMud2Fycmlvci50YXNrc1swXSwgdGhpcy5hZGRyZXNzKyssIHRoaXMucmVhZEluc3RydWN0aW9uKCkpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChuZXh0LmNhdGVnb3J5ID09PSBUb2tlbkNhdGVnb3J5LlByZXByb2Nlc3Nvcikge1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRBZGRyZXNzID0gdGhpcy5yZWFkT3JnKCk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc3RyZWFtLnJlYWRUb0VPTCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVhZEluc3RydWN0aW9uKCk6IElJbnN0cnVjdGlvbiB7XHJcblxyXG4gICAgICAgIHZhciBwYXJzZUluc3RydWN0aW9uID0gdGhpcy5yZWFkUGFyc2VJbnN0cnVjdGlvbigpO1xyXG5cclxuICAgICAgICB2YXIgaW5zdHJ1Y3Rpb246IElJbnN0cnVjdGlvbiA9IHtcclxuICAgICAgICAgICAgYWRkcmVzczogdGhpcy5hZGRyZXNzLFxyXG4gICAgICAgICAgICBvcGNvZGU6IHRoaXMuZ2V0T3Bjb2RlKHBhcnNlSW5zdHJ1Y3Rpb24pLFxyXG4gICAgICAgICAgICBtb2RpZmllcjogdGhpcy5nZXRNb2RpZmllcihwYXJzZUluc3RydWN0aW9uKSxcclxuICAgICAgICAgICAgYU9wZXJhbmQ6IHRoaXMuZ2V0T3BlcmFuZChwYXJzZUluc3RydWN0aW9uLmFPcGVyYW5kKSxcclxuICAgICAgICAgICAgYk9wZXJhbmQ6IHRoaXMuZ2V0T3BlcmFuZChwYXJzZUluc3RydWN0aW9uLmJPcGVyYW5kKVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBpbnN0cnVjdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlYWRPcmcoKTogbnVtYmVyIHtcclxuICAgICAgICB0aGlzLnN0cmVhbS5yZWFkKCk7IC8vIE9SR1xyXG4gICAgICAgIHZhciB0b2tlbiA9IHRoaXMuc3RyZWFtLnJlYWQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdHJlYW0ucmVhZFRvRU9MKCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmFkZHJlc3MgKyBwYXJzZUludCh0b2tlbi5sZXhlbWUsIDEwKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlYWRQYXJzZUluc3RydWN0aW9uKCk6IElQYXJzZUluc3RydWN0aW9uIHtcclxuXHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHtcclxuICAgICAgICAgICAgb3Bjb2RlOiB0aGlzLnN0cmVhbS5yZWFkKCksXHJcbiAgICAgICAgICAgIG1vZGlmaWVyOiB0aGlzLnN0cmVhbS5yZWFkKCksXHJcbiAgICAgICAgICAgIGFPcGVyYW5kOiB7XHJcbiAgICAgICAgICAgICAgICBtb2RlOiB0aGlzLnN0cmVhbS5yZWFkKCksXHJcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiB0aGlzLnN0cmVhbS5yZWFkKClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29tbWE6IHRoaXMuc3RyZWFtLnJlYWQoKSxcclxuICAgICAgICAgICAgYk9wZXJhbmQ6IHtcclxuICAgICAgICAgICAgICAgIG1vZGU6IHRoaXMuc3RyZWFtLnJlYWQoKSxcclxuICAgICAgICAgICAgICAgIGFkZHJlc3M6IHRoaXMuc3RyZWFtLnJlYWQoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5zdHJlYW0ucmVhZFRvRU9MKCk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRPcGNvZGUoaW5zdHJ1Y3Rpb246IElQYXJzZUluc3RydWN0aW9uKTogT3Bjb2RlVHlwZSB7XHJcblxyXG4gICAgICAgIHN3aXRjaCAoaW5zdHJ1Y3Rpb24ub3Bjb2RlLmxleGVtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiREFUXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gT3Bjb2RlVHlwZS5EQVQ7XHJcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBPcGNvZGVUeXBlLk1PVjtcclxuICAgICAgICAgICAgY2FzZSBcIkFERFwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9wY29kZVR5cGUuQUREO1xyXG4gICAgICAgICAgICBjYXNlIFwiU1VCXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gT3Bjb2RlVHlwZS5TVUI7XHJcbiAgICAgICAgICAgIGNhc2UgXCJNVUxcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBPcGNvZGVUeXBlLk1VTDtcclxuICAgICAgICAgICAgY2FzZSBcIkRJVlwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9wY29kZVR5cGUuRElWO1xyXG4gICAgICAgICAgICBjYXNlIFwiTU9EXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gT3Bjb2RlVHlwZS5NT0Q7XHJcbiAgICAgICAgICAgIGNhc2UgXCJKTVBcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBPcGNvZGVUeXBlLkpNUDtcclxuICAgICAgICAgICAgY2FzZSBcIkpNWlwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9wY29kZVR5cGUuSk1aO1xyXG4gICAgICAgICAgICBjYXNlIFwiSk1OXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gT3Bjb2RlVHlwZS5KTU47XHJcbiAgICAgICAgICAgIGNhc2UgXCJESk5cIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBPcGNvZGVUeXBlLkRKTjtcclxuICAgICAgICAgICAgY2FzZSBcIkNNUFwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9wY29kZVR5cGUuQ01QO1xyXG4gICAgICAgICAgICBjYXNlIFwiU0VRXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gT3Bjb2RlVHlwZS5TRVE7XHJcbiAgICAgICAgICAgIGNhc2UgXCJTTkVcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBPcGNvZGVUeXBlLlNORTtcclxuICAgICAgICAgICAgY2FzZSBcIlNMVFwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9wY29kZVR5cGUuU0xUO1xyXG4gICAgICAgICAgICBjYXNlIFwiU1BMXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gT3Bjb2RlVHlwZS5TUEw7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gT3Bjb2RlVHlwZS5OT1A7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0TW9kaWZpZXIoaW5zdHJ1Y3Rpb246IElQYXJzZUluc3RydWN0aW9uKTogTW9kaWZpZXJUeXBlIHtcclxuXHJcbiAgICAgICAgc3dpdGNoIChpbnN0cnVjdGlvbi5tb2RpZmllci5sZXhlbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcIi5BXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTW9kaWZpZXJUeXBlLkE7XHJcbiAgICAgICAgICAgIGNhc2UgXCIuQlwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1vZGlmaWVyVHlwZS5CO1xyXG4gICAgICAgICAgICBjYXNlIFwiLkJBXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTW9kaWZpZXJUeXBlLkJBO1xyXG4gICAgICAgICAgICBjYXNlIFwiLkZcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBNb2RpZmllclR5cGUuRjtcclxuICAgICAgICAgICAgY2FzZSBcIi5JXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTW9kaWZpZXJUeXBlLkk7XHJcbiAgICAgICAgICAgIGNhc2UgXCIuWFwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1vZGlmaWVyVHlwZS5YO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1vZGlmaWVyVHlwZS5BQjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRPcGVyYW5kKG9wZXJhbmQ6IElQYXJzZU9wZXJhbmQpOiBJT3BlcmFuZCB7XHJcblxyXG4gICAgICAgIHZhciByZXN1bHQ6IElPcGVyYW5kID0ge1xyXG4gICAgICAgICAgICBtb2RlOiAwLFxyXG4gICAgICAgICAgICBhZGRyZXNzOiBwYXJzZUludChvcGVyYW5kLmFkZHJlc3MubGV4ZW1lLCAxMClcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBzd2l0Y2ggKG9wZXJhbmQubW9kZS5sZXhlbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcIiNcIjpcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5tb2RlID0gTW9kZVR5cGUuSW1tZWRpYXRlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIqXCI6XHJcbiAgICAgICAgICAgICAgICByZXN1bHQubW9kZSA9IE1vZGVUeXBlLkFJbmRpcmVjdDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiQFwiOlxyXG4gICAgICAgICAgICAgICAgcmVzdWx0Lm1vZGUgPSBNb2RlVHlwZS5CSW5kaXJlY3Q7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIntcIjpcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5tb2RlID0gTW9kZVR5cGUuQVByZURlY3JlbWVudDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiPFwiOlxyXG4gICAgICAgICAgICAgICAgcmVzdWx0Lm1vZGUgPSBNb2RlVHlwZS5CUHJlRGVjcmVtZW50O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ9XCI6XHJcbiAgICAgICAgICAgICAgICByZXN1bHQubW9kZSA9IE1vZGVUeXBlLkFQb3N0SW5jcmVtZW50O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCI+XCI6XHJcbiAgICAgICAgICAgICAgICByZXN1bHQubW9kZSA9IE1vZGVUeXBlLkJQb3N0SW5jcmVtZW50O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXN1bHQubW9kZSA9IE1vZGVUeXBlLkRpcmVjdDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRQcm9jZXNzKCkge1xyXG5cclxuICAgICAgICB0aGlzLndhcnJpb3IudGFza3MucHVzaCh7XHJcbiAgICAgICAgICAgIGluc3RydWN0aW9uUG9pbnRlcjogdGhpcy5zdGFydEFkZHJlc3MsXHJcbiAgICAgICAgICAgIHdhcnJpb3I6IHRoaXMud2FycmlvclxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMud2Fycmlvci50YXNrSW5kZXggPSAwO1xyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2ltdWxhdG9yL1dhcnJpb3JMb2FkZXIudHMiLCJpbXBvcnQgeyBJV2FycmlvciB9IGZyb20gXCIuL2ludGVyZmFjZS9JV2FycmlvclwiO1xyXG5pbXBvcnQgeyBJSW5zdHJ1Y3Rpb24gfSBmcm9tIFwiLi9pbnRlcmZhY2UvSUluc3RydWN0aW9uXCI7XHJcbmltcG9ydCB7IElUYXNrIH0gZnJvbSBcIi4vaW50ZXJmYWNlL0lUYXNrXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgV2FycmlvciBpbXBsZW1lbnRzIElXYXJyaW9yIHtcclxuXHJcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG4gICAgcHVibGljIGF1dGhvcjogc3RyaW5nO1xyXG4gICAgcHVibGljIHN0cmF0ZWd5OiBzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIGluc3RydWN0aW9uczogSUluc3RydWN0aW9uW107XHJcblxyXG4gICAgcHVibGljIHRhc2tJbmRleDogbnVtYmVyO1xyXG4gICAgcHVibGljIHRhc2tzOiBJVGFza1tdO1xyXG5cclxuICAgIHB1YmxpYyBzdGFydEFkZHJlc3M6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuYXV0aG9yID0gXCJcIjtcclxuICAgICAgICB0aGlzLnN0cmF0ZWd5ID0gXCJcIjtcclxuICAgICAgICB0aGlzLmluc3RydWN0aW9ucyA9IFtdO1xyXG4gICAgICAgIHRoaXMudGFza0luZGV4ID0gMDtcclxuICAgICAgICB0aGlzLnRhc2tzID0gW107XHJcbiAgICAgICAgdGhpcy5zdGFydEFkZHJlc3MgPSAwO1xyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2ltdWxhdG9yL1dhcnJpb3IudHMiLCJpbXBvcnQgeyBJRmV0Y2hlciB9IGZyb20gXCIuL2ludGVyZmFjZS9JRmV0Y2hlclwiO1xyXG5pbXBvcnQgeyBJU3RhdGUgfSBmcm9tIFwiLi9pbnRlcmZhY2UvSVN0YXRlXCI7XHJcbmltcG9ydCB7IElFeGVjdXRpb25Db250ZXh0IH0gZnJvbSBcIi4vaW50ZXJmYWNlL0lFeGVjdXRpb25Db250ZXh0XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRmV0Y2hlciBpbXBsZW1lbnRzIElGZXRjaGVyIHtcclxuXHJcbiAgICBwdWJsaWMgZmV0Y2goc3RhdGU6IElTdGF0ZSk6IElFeGVjdXRpb25Db250ZXh0IHtcclxuXHJcbiAgICAgICAgdmFyIHdpID0gc3RhdGUud2FycmlvckluZGV4O1xyXG4gICAgICAgIHZhciB3YXJyaW9yID0gc3RhdGUud2FycmlvcnNbd2ldO1xyXG5cclxuICAgICAgICB2YXIgdGkgPSB3YXJyaW9yLnRhc2tJbmRleDtcclxuICAgICAgICB2YXIgdGFzayA9IHdhcnJpb3IudGFza3NbdGldO1xyXG5cclxuICAgICAgICBzdGF0ZS53YXJyaW9ySW5kZXggPSAod2kgKyAxKSAlIHN0YXRlLndhcnJpb3JzLmxlbmd0aDtcclxuICAgICAgICB3YXJyaW9yLnRhc2tJbmRleCA9ICh0aSArIDEpICUgd2Fycmlvci50YXNrcy5sZW5ndGg7XHJcblxyXG4gICAgICAgIHZhciBpcCA9IHRhc2suaW5zdHJ1Y3Rpb25Qb2ludGVyO1xyXG4gICAgICAgIHZhciBpbnN0cnVjdGlvbiA9IHN0YXRlLmNvcmUuZXhlY3V0ZUF0KHRhc2ssIGlwKTtcclxuXHJcbiAgICAgICAgdGFzay5pbnN0cnVjdGlvblBvaW50ZXIgPSAoaXAgKyAxKSAlIHN0YXRlLm9wdGlvbnMuY29yZXNpemU7XHJcbiAgICAgICAgLy8gVE9ETyBzaG91bGQgd2UgaW5zdGFudGlhdGUgYW4gb2JqZWN0IGV2ZXJ5dGltZT9cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb3JlOiBzdGF0ZS5jb3JlLFxyXG4gICAgICAgICAgICBpbnN0cnVjdGlvblBvaW50ZXI6IGlwLFxyXG4gICAgICAgICAgICBpbnN0cnVjdGlvbjogaW5zdHJ1Y3Rpb24sXHJcbiAgICAgICAgICAgIHRhc2tJbmRleDogdGksXHJcbiAgICAgICAgICAgIHRhc2s6IHRhc2ssXHJcbiAgICAgICAgICAgIHdhcnJpb3JJbmRleDogd2ksXHJcbiAgICAgICAgICAgIHdhcnJpb3I6IHdhcnJpb3JcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NpbXVsYXRvci9GZXRjaGVyLnRzIiwiaW1wb3J0IHsgSVNpbXVsYXRvciB9IGZyb20gXCIuL2ludGVyZmFjZS9JU2ltdWxhdG9yXCI7XHJcbmltcG9ydCB7IElTdGF0ZSB9IGZyb20gXCIuL2ludGVyZmFjZS9JU3RhdGVcIjtcclxuaW1wb3J0IHsgSUxvYWRlciB9IGZyb20gXCIuL2ludGVyZmFjZS9JTG9hZGVyXCI7XHJcbmltcG9ydCB7IElGZXRjaGVyIH0gZnJvbSBcIi4vaW50ZXJmYWNlL0lGZXRjaGVyXCI7XHJcbmltcG9ydCB7IElEZWNvZGVyIH0gZnJvbSBcIi4vaW50ZXJmYWNlL0lEZWNvZGVyXCI7XHJcbmltcG9ydCB7IElFeGVjdXRpdmUgfSBmcm9tIFwiLi9pbnRlcmZhY2UvSUV4ZWN1dGl2ZVwiO1xyXG5pbXBvcnQgeyBJRW5kQ29uZGl0aW9uIH0gZnJvbSBcIi4vaW50ZXJmYWNlL0lFbmRDb25kaXRpb25cIjtcclxuaW1wb3J0IHsgSUNvcmUgfSBmcm9tIFwiLi9pbnRlcmZhY2UvSUNvcmVcIjtcclxuaW1wb3J0IHsgSU9wdGlvbnMgfSBmcm9tIFwiLi9pbnRlcmZhY2UvSU9wdGlvbnNcIjtcclxuaW1wb3J0IHsgSVBhcnNlUmVzdWx0IH0gZnJvbSBcIi4uL3BhcnNlci9pbnRlcmZhY2UvSVBhcnNlUmVzdWx0XCI7XHJcbmltcG9ydCBEZWZhdWx0cyBmcm9tIFwiLi9EZWZhdWx0c1wiO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gXCJ1bmRlcnNjb3JlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2ltdWxhdG9yIGltcGxlbWVudHMgSVNpbXVsYXRvciB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0ZTogSVN0YXRlO1xyXG5cclxuICAgIHByaXZhdGUgbG9hZGVyOiBJTG9hZGVyO1xyXG4gICAgcHJpdmF0ZSBmZXRjaGVyOiBJRmV0Y2hlcjtcclxuICAgIHByaXZhdGUgZGVjb2RlcjogSURlY29kZXI7XHJcbiAgICBwcml2YXRlIGV4ZWN1dGl2ZTogSUV4ZWN1dGl2ZTtcclxuICAgIHByaXZhdGUgZW5kQ29uZGl0aW9uOiBJRW5kQ29uZGl0aW9uO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIGNvcmU6IElDb3JlLFxyXG4gICAgICAgIGxvYWRlcjogSUxvYWRlcixcclxuICAgICAgICBmZXRjaGVyOiBJRmV0Y2hlcixcclxuICAgICAgICBkZWNvZGVyOiBJRGVjb2RlcixcclxuICAgICAgICBleGVjdXRpdmU6IElFeGVjdXRpdmUsXHJcbiAgICAgICAgZW5kQ29uZGl0aW9uOiBJRW5kQ29uZGl0aW9uKSB7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGNvcmU6IGNvcmUsXHJcbiAgICAgICAgICAgIGN5Y2xlOiAwLFxyXG4gICAgICAgICAgICB3YXJyaW9yczogW10sXHJcbiAgICAgICAgICAgIHdhcnJpb3JJbmRleDogMCxcclxuICAgICAgICAgICAgb3B0aW9uczogbnVsbC8vLFxyXG4gICAgICAgICAgICAvL2NvbnRleHQ6IG51bGxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmxvYWRlciA9IGxvYWRlcjtcclxuICAgICAgICB0aGlzLmZldGNoZXIgPSBmZXRjaGVyO1xyXG4gICAgICAgIHRoaXMuZGVjb2RlciA9IGRlY29kZXI7XHJcbiAgICAgICAgdGhpcy5leGVjdXRpdmUgPSBleGVjdXRpdmU7XHJcbiAgICAgICAgdGhpcy5lbmRDb25kaXRpb24gPSBlbmRDb25kaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXRpYWxpc2Uob3B0aW9uczogSU9wdGlvbnMsIHdhcnJpb3JzOiBJUGFyc2VSZXN1bHRbXSkge1xyXG4gICAgICAgIC8vIFRPRE8gdGhyb3cgZXJyb3IgaWYgb3B0aW9ucyBhcmUgaW52YWxpZCBlLmcuIG1pblNlcGFyYXRpb24gbXVzdCBiZSA+PTFcclxuICAgICAgICB0aGlzLnN0YXRlLm9wdGlvbnMgPSBfLmRlZmF1bHRzKG9wdGlvbnMsIERlZmF1bHRzKTtcclxuICAgICAgICB0aGlzLnN0YXRlLmNvcmUuaW5pdGlhbGlzZShvcHRpb25zKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZS53YXJyaW9ycyA9IHRoaXMubG9hZGVyLmxvYWQod2FycmlvcnMsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBydW4oKSB7XHJcblxyXG4gICAgICAgIHdoaWxlICh0aGlzLnN0ZXAoKSkge1xyXG4gICAgICAgICAgICAvLyBUT0RPIHNldFRpbWVvdXQ/XHJcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIH0sIDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RlcCgpOiBib29sZWFuIHtcclxuXHJcbiAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLmZldGNoZXIuZmV0Y2godGhpcy5zdGF0ZSk7XHJcblxyXG4gICAgICAgIGNvbnRleHQgPSB0aGlzLmRlY29kZXIuZGVjb2RlKGNvbnRleHQpO1xyXG5cclxuICAgICAgICBjb250ZXh0LmNvbW1hbmQuYXBwbHkodGhpcy5leGVjdXRpdmUsIFtjb250ZXh0XSk7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUuY3ljbGUgKz0gMTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5kQ29uZGl0aW9uLmNoZWNrKHRoaXMuc3RhdGUpO1xyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2ltdWxhdG9yL1NpbXVsYXRvci50cyIsImltcG9ydCB7IElFbmRDb25kaXRpb24gfSBmcm9tIFwiLi9pbnRlcmZhY2UvSUVuZENvbmRpdGlvblwiO1xyXG5pbXBvcnQgeyBJU3RhdGUgfSBmcm9tIFwiLi9pbnRlcmZhY2UvSVN0YXRlXCI7XHJcbmltcG9ydCB7IElXYXJyaW9yIH0gZnJvbSBcIi4vaW50ZXJmYWNlL0lXYXJyaW9yXCI7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSBcInVuZGVyc2NvcmVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBFbmRDb25kaXRpb24gaW1wbGVtZW50cyBJRW5kQ29uZGl0aW9uIHtcclxuXHJcbiAgICBwdWJsaWMgY2hlY2soc3RhdGU6IElTdGF0ZSk6IGJvb2xlYW4ge1xyXG5cclxuICAgICAgICBpZiAoc3RhdGUuY3ljbGUgPT09IHN0YXRlLm9wdGlvbnMuY3ljbGVzQmVmb3JlVGllKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGxpdmVXYXJyaW9ycyA9IF8oc3RhdGUud2FycmlvcnMpLmZpbHRlcigod2FycmlvcjogSVdhcnJpb3IpID0+IHdhcnJpb3IudGFza3MubGVuZ3RoID4gMCk7XHJcblxyXG4gICAgICAgIGlmIChzdGF0ZS53YXJyaW9ycy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXZlV2FycmlvcnMubGVuZ3RoID09PSAxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXZlV2FycmlvcnMubGVuZ3RoID09PSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NpbXVsYXRvci9FbmRDb25kaXRpb24udHMiLCJpbXBvcnQgeyBJSW5zdHJ1Y3Rpb25TZXJpYWxpc2VyIH0gZnJvbSBcIi4vaW50ZXJmYWNlL0lJbnN0cnVjdGlvblNlcmlhbGlzZXJcIjtcclxuXHJcbmltcG9ydCB7IElJbnN0cnVjdGlvbiwgT3Bjb2RlVHlwZSwgTW9kaWZpZXJUeXBlIH0gZnJvbSBcIi4uLy4uL3NpbXVsYXRvci9pbnRlcmZhY2UvSUluc3RydWN0aW9uXCI7XHJcbmltcG9ydCB7IElPcGVyYW5kLCBNb2RlVHlwZSB9IGZyb20gXCIuLi8uLi9zaW11bGF0b3IvaW50ZXJmYWNlL0lPcGVyYW5kXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSW5zdHJ1Y3Rpb25TZXJpYWxpc2VyIGltcGxlbWVudHMgSUluc3RydWN0aW9uU2VyaWFsaXNlciB7XHJcblxyXG4gICAgcHVibGljIHNlcmlhbGlzZShpbnN0cnVjdGlvbjogSUluc3RydWN0aW9uKTogc3RyaW5nIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VyaWFsaXNlT3Bjb2RlKGluc3RydWN0aW9uKSArIFwiLlwiICtcclxuICAgICAgICAgICAgdGhpcy5zZXJpYWxpc2VNb2RpZmllcihpbnN0cnVjdGlvbikgKyBcIiBcIiArXHJcbiAgICAgICAgICAgIHRoaXMuc2VyaWFsaXNlT3BlcmFuZChpbnN0cnVjdGlvbi5hT3BlcmFuZCkgKyBcIiwgXCIgK1xyXG4gICAgICAgICAgICB0aGlzLnNlcmlhbGlzZU9wZXJhbmQoaW5zdHJ1Y3Rpb24uYk9wZXJhbmQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2VyaWFsaXNlT3Bjb2RlKGluc3RydWN0aW9uOiBJSW5zdHJ1Y3Rpb24pOiBzdHJpbmcge1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGluc3RydWN0aW9uLm9wY29kZSkge1xyXG4gICAgICAgICAgICBjYXNlIE9wY29kZVR5cGUuQUREOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiQUREXCI7XHJcbiAgICAgICAgICAgIGNhc2UgT3Bjb2RlVHlwZS5DTVA6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJDTVBcIjtcclxuICAgICAgICAgICAgY2FzZSBPcGNvZGVUeXBlLkRBVDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIkRBVFwiO1xyXG4gICAgICAgICAgICBjYXNlIE9wY29kZVR5cGUuRElWOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiRElWXCI7XHJcbiAgICAgICAgICAgIGNhc2UgT3Bjb2RlVHlwZS5ESk46XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJESk5cIjtcclxuICAgICAgICAgICAgY2FzZSBPcGNvZGVUeXBlLkpNTjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIkpNTlwiO1xyXG4gICAgICAgICAgICBjYXNlIE9wY29kZVR5cGUuSk1QOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiSk1QXCI7XHJcbiAgICAgICAgICAgIGNhc2UgT3Bjb2RlVHlwZS5KTVo6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJKTVpcIjtcclxuICAgICAgICAgICAgY2FzZSBPcGNvZGVUeXBlLk1PRDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIk1PRFwiO1xyXG4gICAgICAgICAgICBjYXNlIE9wY29kZVR5cGUuTU9WOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiTU9WXCI7XHJcbiAgICAgICAgICAgIGNhc2UgT3Bjb2RlVHlwZS5NVUw6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJNVUxcIjtcclxuICAgICAgICAgICAgY2FzZSBPcGNvZGVUeXBlLk5PUDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIk5PUFwiO1xyXG4gICAgICAgICAgICBjYXNlIE9wY29kZVR5cGUuU0VROlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiU0VRXCI7XHJcbiAgICAgICAgICAgIGNhc2UgT3Bjb2RlVHlwZS5TTFQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJTTFRcIjtcclxuICAgICAgICAgICAgY2FzZSBPcGNvZGVUeXBlLlNORTpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIlNORVwiO1xyXG4gICAgICAgICAgICBjYXNlIE9wY29kZVR5cGUuU1BMOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiU1BMXCI7XHJcbiAgICAgICAgICAgIGNhc2UgT3Bjb2RlVHlwZS5TVUI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJTVUJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRocm93IFwiVW5rbm93biBPcGNvZGUgcHJvdmlkZWQgdG8gSW5zdHJ1Y3Rpb25TZXJpYWxpc2VyXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXJpYWxpc2VNb2RpZmllcihpbnN0cnVjdGlvbjogSUluc3RydWN0aW9uKTogc3RyaW5nIHtcclxuXHJcbiAgICAgICAgc3dpdGNoIChpbnN0cnVjdGlvbi5tb2RpZmllcikge1xyXG4gICAgICAgICAgICBjYXNlIE1vZGlmaWVyVHlwZS5BOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiQVwiO1xyXG4gICAgICAgICAgICBjYXNlIE1vZGlmaWVyVHlwZS5COlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiQlwiO1xyXG4gICAgICAgICAgICBjYXNlIE1vZGlmaWVyVHlwZS5BQjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIkFCXCI7XHJcbiAgICAgICAgICAgIGNhc2UgTW9kaWZpZXJUeXBlLkJBOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiQkFcIjtcclxuICAgICAgICAgICAgY2FzZSBNb2RpZmllclR5cGUuRjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIkZcIjtcclxuICAgICAgICAgICAgY2FzZSBNb2RpZmllclR5cGUuSTpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIklcIjtcclxuICAgICAgICAgICAgY2FzZSBNb2RpZmllclR5cGUuWDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIlhcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRocm93IFwiVW5rbm93biBNb2RpZmllciBwcm92aWRlZCB0byBJbnN0cnVjdGlvblNlcmlhbGlzZXJcIjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlcmlhbGlzZU9wZXJhbmQob3BlcmFuZDogSU9wZXJhbmQpOiBzdHJpbmcge1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5zZXJpYWxpc2VNb2RlKG9wZXJhbmQubW9kZSkgK1xyXG4gICAgICAgICAgICB0aGlzLnNlcmlhbGlzZUFkZHJlc3Mob3BlcmFuZC5hZGRyZXNzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlcmlhbGlzZU1vZGUobW9kZTogTW9kZVR5cGUpOiBzdHJpbmcge1xyXG5cclxuICAgICAgICBzd2l0Y2ggKG1vZGUpIHtcclxuICAgICAgICAgICAgY2FzZSBNb2RlVHlwZS5BSW5kaXJlY3Q6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCIqXCI7XHJcbiAgICAgICAgICAgIGNhc2UgTW9kZVR5cGUuQVBvc3RJbmNyZW1lbnQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJ9XCI7XHJcbiAgICAgICAgICAgIGNhc2UgTW9kZVR5cGUuQVByZURlY3JlbWVudDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIntcIjtcclxuICAgICAgICAgICAgY2FzZSBNb2RlVHlwZS5CSW5kaXJlY3Q6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJAXCI7XHJcbiAgICAgICAgICAgIGNhc2UgTW9kZVR5cGUuQlBvc3RJbmNyZW1lbnQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCI+XCI7XHJcbiAgICAgICAgICAgIGNhc2UgTW9kZVR5cGUuQlByZURlY3JlbWVudDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIjxcIjtcclxuICAgICAgICAgICAgY2FzZSBNb2RlVHlwZS5EaXJlY3Q6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCIkXCI7XHJcbiAgICAgICAgICAgIGNhc2UgTW9kZVR5cGUuSW1tZWRpYXRlOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiI1wiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhyb3cgXCJVbmtub3duIE1vZGUgcHJvdmlkZWQgdG8gSW5zdHJ1Y3Rpb25TZXJpYWxpc2VyXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXJpYWxpc2VBZGRyZXNzKGFkZHJlc3M6IG51bWJlcik6IHN0cmluZyB7XHJcblxyXG4gICAgICAgIHJldHVybiBhZGRyZXNzLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3Jld2FyL1ByZXNlbnRhdGlvbi9JbnN0cnVjdGlvblNlcmlhbGlzZXIudHMiLCJpbXBvcnQgeyBJSW5zdHJ1Y3Rpb25TZXJpYWxpc2VyIH0gZnJvbSBcIi4vaW50ZXJmYWNlL0lJbnN0cnVjdGlvblNlcmlhbGlzZXJcIjtcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4vaW50ZXJmYWNlL0lQb2ludFwiO1xyXG5cclxuaW1wb3J0IHsgSUNvcmUsIElDb3JlQWNjZXNzRXZlbnRBcmdzLCBDb3JlQWNjZXNzVHlwZSB9IGZyb20gXCIuLi8uLi9zaW11bGF0b3IvaW50ZXJmYWNlL0lDb3JlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29yZVJlbmRlcmVyIHtcclxuXHJcbiAgICBwcml2YXRlIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICBwcml2YXRlIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcclxuXHJcbiAgICBwcml2YXRlIGluc3RydWN0aW9uTGFiZWw6IEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xyXG5cclxuICAgIHByaXZhdGUgY29yZTogSUNvcmU7XHJcbiAgICBwcml2YXRlIGluc3RydWN0aW9uU2VyaWFsaXNlcjogSUluc3RydWN0aW9uU2VyaWFsaXNlcjtcclxuXHJcbiAgICBwcml2YXRlIHF1ZXVlOiBJQ29yZUFjY2Vzc0V2ZW50QXJnc1tdO1xyXG4gICAgcHJpdmF0ZSBwcmV2aW91c0V4ZWN1dGlvbnM6IElDb3JlQWNjZXNzRXZlbnRBcmdzW107XHJcblxyXG4gICAgcHJpdmF0ZSBjZWxsc1dpZGU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgY2VsbHNIaWdoOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGNlbGxTaXplOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCxcclxuICAgICAgICBpbnN0cnVjdGlvbkxhYmVsOiBIVE1MUGFyYWdyYXBoRWxlbWVudCxcclxuICAgICAgICBjb3JlOiBJQ29yZSxcclxuICAgICAgICBpbnN0cnVjdGlvblNlcmlhbGlzZXI6IElJbnN0cnVjdGlvblNlcmlhbGlzZXIpIHtcclxuXHJcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICB0aGlzLmluc3RydWN0aW9uTGFiZWwgPSBpbnN0cnVjdGlvbkxhYmVsO1xyXG4gICAgICAgIHRoaXMuY29yZSA9IGNvcmU7XHJcbiAgICAgICAgdGhpcy5pbnN0cnVjdGlvblNlcmlhbGlzZXIgPSBpbnN0cnVjdGlvblNlcmlhbGlzZXI7XHJcbiAgICAgICAgdGhpcy5xdWV1ZSA9IFtdO1xyXG5cclxuICAgICAgICBjb3JlLmNvcmVBY2Nlc3Muc3Vic2NyaWJlKChlOiBJQ29yZUFjY2Vzc0V2ZW50QXJncykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnF1ZXVlLnB1c2goZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXRpYWxpc2UoKSB7XHJcblxyXG4gICAgICAgIHRoaXMuY2VsbFNpemUgPSB0aGlzLmNhbGN1bGF0ZUNlbGxTaXplKCk7XHJcbiAgICAgICAgdGhpcy5jZWxsc1dpZGUgPSBNYXRoLmZsb29yKHRoaXMuY2FudmFzLndpZHRoIC8gdGhpcy5jZWxsU2l6ZSk7XHJcbiAgICAgICAgdGhpcy5jZWxsc0hpZ2ggPSBNYXRoLmZsb29yKHRoaXMuY2FudmFzLmhlaWdodCAvIHRoaXMuY2VsbFNpemUpO1xyXG5cclxuICAgICAgICB0aGlzLnByZXZpb3VzRXhlY3V0aW9ucyA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHsgdGhpcy5jYW52YXNDbGljayhlKTsgfSk7XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyR3JpZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW5kZXIoKSB7XHJcblxyXG4gICAgICAgIHZhciBldmVudDogSUNvcmVBY2Nlc3NFdmVudEFyZ3M7XHJcblxyXG4gICAgICAgIHdoaWxlICh0aGlzLnByZXZpb3VzRXhlY3V0aW9ucy5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgICAgZXZlbnQgPSB0aGlzLnByZXZpb3VzRXhlY3V0aW9ucy5wb3AoKTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJDZWxsKGV2ZW50LCBcIiNmMDBcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnByZXZpb3VzRXhlY3V0aW9ucyA9IF8odGhpcy5xdWV1ZSkud2hlcmUoKHE6IElDb3JlQWNjZXNzRXZlbnRBcmdzKSA9PiBxLmFjY2Vzc1R5cGUgPT09IENvcmVBY2Nlc3NUeXBlLmV4ZWN1dGUpO1xyXG5cclxuICAgICAgICB3aGlsZSAodGhpcy5xdWV1ZS5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgICAgZXZlbnQgPSB0aGlzLnF1ZXVlLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyQ2VsbChldmVudCwgXCIjZmZmXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJHcmlkTGluZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFkZHJlc3NUb1NjcmVlbkNvb3JkaW5hdGUoYWRkcmVzczogbnVtYmVyKTogSVBvaW50IHtcclxuXHJcbiAgICAgICAgdmFyIGl4ID0gYWRkcmVzcyAlIHRoaXMuY2VsbHNXaWRlO1xyXG4gICAgICAgIHZhciBpeSA9IE1hdGguZmxvb3IoYWRkcmVzcyAvIHRoaXMuY2VsbHNXaWRlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgeDogaXggKiB0aGlzLmNlbGxTaXplLFxyXG4gICAgICAgICAgICB5OiBpeSAqIHRoaXMuY2VsbFNpemVcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2NyZWVuQ29vcmRpbmF0ZVRvQWRkcmVzcyhwb2ludDogSVBvaW50KTogbnVtYmVyIHtcclxuXHJcbiAgICAgICAgdmFyIHggPSBNYXRoLmZsb29yKHBvaW50LnggLyB0aGlzLmNlbGxTaXplKTtcclxuICAgICAgICB2YXIgeSA9IE1hdGguZmxvb3IocG9pbnQueSAvIHRoaXMuY2VsbFNpemUpO1xyXG5cclxuICAgICAgICByZXR1cm4geSAqIHRoaXMuY2VsbHNXaWRlICsgeDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbmRlckNlbGwoZXZlbnQ6IElDb3JlQWNjZXNzRXZlbnRBcmdzLCBleGVjdXRpb25Db2xvdXI6IHN0cmluZykge1xyXG5cclxuICAgICAgICB2YXIgY29vcmRpbmF0ZSA9IHRoaXMuYWRkcmVzc1RvU2NyZWVuQ29vcmRpbmF0ZShldmVudC5hZGRyZXNzKTtcclxuXHJcbiAgICAgICAgLy9UT0RPIGNvbG91ciBmb3IgZWFjaCBwcm9jZXNzXHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IFwiI2YwMFwiO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IFwiI2YwMFwiO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmFjY2Vzc1R5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBDb3JlQWNjZXNzVHlwZS5leGVjdXRlOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJFeGVjdXRlKGNvb3JkaW5hdGUsIGV4ZWN1dGlvbkNvbG91cik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDb3JlQWNjZXNzVHlwZS5yZWFkOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJSZWFkKGNvb3JkaW5hdGUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ29yZUFjY2Vzc1R5cGUud3JpdGU6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcldyaXRlKGNvb3JkaW5hdGUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihcIkNhbm5vdCByZW5kZXIgdW5rbm93biBDb3JlQWNjZXNzVHlwZTogXCIgKyBldmVudC5hY2Nlc3NUeXBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW5kZXJFeGVjdXRlKGNvb3JkaW5hdGU6IElQb2ludCwgZXhlY3V0aW9uQ29sb3VyOiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgdmFyIGNvbG91ciA9IHRoaXMuY29udGV4dC5maWxsU3R5bGU7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IGV4ZWN1dGlvbkNvbG91cjtcclxuXHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KFxyXG4gICAgICAgICAgICBjb29yZGluYXRlLngsXHJcbiAgICAgICAgICAgIGNvb3JkaW5hdGUueSxcclxuICAgICAgICAgICAgdGhpcy5jZWxsU2l6ZSxcclxuICAgICAgICAgICAgdGhpcy5jZWxsU2l6ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBjb2xvdXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW5kZXJSZWFkKGNvb3JkaW5hdGU6IElQb2ludCkge1xyXG5cclxuICAgICAgICB2YXIgaFNpemUgPSB0aGlzLmNlbGxTaXplIC8gMjtcclxuICAgICAgICB2YXIgcmFkaXVzID0gdGhpcy5jZWxsU2l6ZSAvIDg7XHJcblxyXG4gICAgICAgIHZhciBjZW50cmUgPSB7XHJcbiAgICAgICAgICAgIHg6IGNvb3JkaW5hdGUueCArIGhTaXplLFxyXG4gICAgICAgICAgICB5OiBjb29yZGluYXRlLnkgKyBoU2l6ZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgICAgICB0aGlzLmNvbnRleHQuYXJjKGNlbnRyZS54LCBjZW50cmUueSwgcmFkaXVzLCAwLCAyICogTWF0aC5QSSwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsKCk7XHJcbiAgICAgICAgLy90aGlzLmNvbnRleHQuc3Ryb2tlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW5kZXJXcml0ZShjb29yZGluYXRlOiBJUG9pbnQpIHtcclxuXHJcbiAgICAgICAgdmFyIHgwID0gY29vcmRpbmF0ZS54O1xyXG4gICAgICAgIHZhciB5MCA9IGNvb3JkaW5hdGUueTtcclxuXHJcbiAgICAgICAgdmFyIHgxID0geDAgKyB0aGlzLmNlbGxTaXplO1xyXG4gICAgICAgIHZhciB5MSA9IHkwICsgdGhpcy5jZWxsU2l6ZTtcclxuXHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5tb3ZlVG8oeDAsIHkwKTtcclxuICAgICAgICB0aGlzLmNvbnRleHQubGluZVRvKHgxLCB5MSk7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0Lm1vdmVUbyh4MCwgeTEpO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5saW5lVG8oeDEsIHkwKTtcclxuICAgICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW5kZXJHcmlkKCkge1xyXG5cclxuICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZmlsbEdyaWRBcmVhKCk7XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyR3JpZExpbmVzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZ3JleU91dEV4dHJhQ2VsbHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNsZWFyQ2FudmFzKCkge1xyXG5cclxuICAgICAgICB0aGlzLmNvbnRleHQuc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLjUsIDAuNSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmaWxsR3JpZEFyZWEoKSB7XHJcblxyXG4gICAgICAgIHZhciB3aWR0aCA9IHRoaXMuY2VsbHNXaWRlICogdGhpcy5jZWxsU2l6ZTtcclxuICAgICAgICB2YXIgaGVpZ2h0ID0gdGhpcy5jZWxsc0hpZ2ggKiB0aGlzLmNlbGxTaXplO1xyXG5cclxuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gXCIjZWVlXCI7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ3JleU91dEV4dHJhQ2VsbHMoKSB7XHJcblxyXG4gICAgICAgIHZhciBjZWxsc0RyYXduID0gdGhpcy5jZWxsc1dpZGUgKiB0aGlzLmNlbGxzSGlnaDtcclxuICAgICAgICB2YXIgZXh0cmFDZWxsc0RyYXduID0gY2VsbHNEcmF3biAtIHRoaXMuY29yZS5nZXRTaXplKCk7XHJcblxyXG4gICAgICAgIGlmIChleHRyYUNlbGxzRHJhd24gPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGdyaWRXaWR0aCA9IHRoaXMuY2VsbHNXaWRlICogdGhpcy5jZWxsU2l6ZTtcclxuICAgICAgICB2YXIgZ3JpZEhlaWdodCA9IHRoaXMuY2VsbHNIaWdoICogdGhpcy5jZWxsU2l6ZTtcclxuXHJcbiAgICAgICAgdmFyIG1heFggPSBncmlkV2lkdGggLSB0aGlzLmNlbGxTaXplO1xyXG4gICAgICAgIHZhciBtYXhZID0gZ3JpZEhlaWdodCAtIHRoaXMuY2VsbFNpemU7XHJcblxyXG4gICAgICAgIHZhciB4ID0gbWF4WDtcclxuICAgICAgICB2YXIgeSA9IG1heFk7XHJcblxyXG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBcIiNhYWFcIjtcclxuICAgICAgICB3aGlsZSAoZXh0cmFDZWxsc0RyYXduLS0gPiAwKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QoeCwgeSwgdGhpcy5jZWxsU2l6ZSwgdGhpcy5jZWxsU2l6ZSk7XHJcblxyXG4gICAgICAgICAgICB4IC09IHRoaXMuY2VsbFNpemU7XHJcblxyXG4gICAgICAgICAgICBpZiAoeCA8IDApIHtcclxuICAgICAgICAgICAgICAgIHggPSBtYXhYO1xyXG4gICAgICAgICAgICAgICAgeSAtPSB0aGlzLmNlbGxTaXplO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVuZGVyR3JpZExpbmVzKCkge1xyXG5cclxuICAgICAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJWZXJ0aWNhbExpbmVzKCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJIb3Jpem9udGFsTGluZXMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gXCIjYWFhXCI7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVuZGVySG9yaXpvbnRhbExpbmVzKCkge1xyXG5cclxuICAgICAgICB2YXIgZ3JpZFdpZHRoID0gdGhpcy5jZWxsc1dpZGUgKiB0aGlzLmNlbGxTaXplO1xyXG4gICAgICAgIHZhciBncmlkSGVpZ2h0ID0gdGhpcy5jZWxsc0hpZ2ggKiB0aGlzLmNlbGxTaXplO1xyXG5cclxuICAgICAgICBmb3IgKHZhciB5ID0gMDsgeSA8PSBncmlkSGVpZ2h0OyB5ICs9IHRoaXMuY2VsbFNpemUpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5tb3ZlVG8oMCwgeSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5saW5lVG8oZ3JpZFdpZHRoLCB5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW5kZXJWZXJ0aWNhbExpbmVzKCkge1xyXG5cclxuICAgICAgICB2YXIgZ3JpZFdpZHRoID0gdGhpcy5jZWxsc1dpZGUgKiB0aGlzLmNlbGxTaXplO1xyXG4gICAgICAgIHZhciBncmlkSGVpZ2h0ID0gdGhpcy5jZWxsc0hpZ2ggKiB0aGlzLmNlbGxTaXplO1xyXG5cclxuICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8PSBncmlkV2lkdGg7IHggKz0gdGhpcy5jZWxsU2l6ZSkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0Lm1vdmVUbyh4LCAwKTtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh4LCBncmlkSGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVDZWxsU2l6ZSgpOiBudW1iZXIge1xyXG5cclxuICAgICAgICB2YXIgYXJlYSA9IHRoaXMuY2FudmFzLndpZHRoICogdGhpcy5jYW52YXMuaGVpZ2h0O1xyXG4gICAgICAgIHZhciBuID0gdGhpcy5jb3JlLmdldFNpemUoKTtcclxuXHJcbiAgICAgICAgdmFyIG1heENlbGxTaXplID0gTWF0aC5zcXJ0KGFyZWEgLyBuKTtcclxuICAgICAgICB2YXIgcG9zc2libGVDZWxsU2l6ZSA9IE1hdGguZmxvb3IobWF4Q2VsbFNpemUpO1xyXG5cclxuICAgICAgICB3aGlsZSAoIXRoaXMuaXNWYWxpZENlbGxTaXplKHBvc3NpYmxlQ2VsbFNpemUpKSB7XHJcblxyXG4gICAgICAgICAgICBwb3NzaWJsZUNlbGxTaXplLS07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcG9zc2libGVDZWxsU2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzVmFsaWRDZWxsU2l6ZShjZWxsU2l6ZTogbnVtYmVyKTogYm9vbGVhbiB7XHJcblxyXG4gICAgICAgIHZhciBjZWxsc1dpZGUgPSBNYXRoLmZsb29yKHRoaXMuY2FudmFzLndpZHRoIC8gY2VsbFNpemUpO1xyXG4gICAgICAgIHZhciBjZWxsc0hpZ2ggPSBNYXRoLmZsb29yKHRoaXMuY2FudmFzLmhlaWdodCAvIGNlbGxTaXplKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNlbGxzV2lkZSAqIGNlbGxzSGlnaCA+PSB0aGlzLmNvcmUuZ2V0U2l6ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0UmVsYXRpdmVDb29yZGluYXRlcyhldmVudDogTW91c2VFdmVudCk6IElQb2ludCB7XHJcblxyXG4gICAgICAgIHZhciB0b3RhbE9mZnNldFggPSAwO1xyXG4gICAgICAgIHZhciB0b3RhbE9mZnNldFkgPSAwO1xyXG4gICAgICAgIHZhciBjdXJyZW50RWxlbWVudCA9IDxIVE1MRWxlbWVudD5ldmVudC50YXJnZXQ7XHJcblxyXG4gICAgICAgIGRvIHtcclxuICAgICAgICAgICAgdG90YWxPZmZzZXRYICs9IGN1cnJlbnRFbGVtZW50Lm9mZnNldExlZnQgLSBjdXJyZW50RWxlbWVudC5zY3JvbGxMZWZ0O1xyXG4gICAgICAgICAgICB0b3RhbE9mZnNldFkgKz0gY3VycmVudEVsZW1lbnQub2Zmc2V0VG9wIC0gY3VycmVudEVsZW1lbnQuc2Nyb2xsVG9wO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aGlsZSAoY3VycmVudEVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+Y3VycmVudEVsZW1lbnQub2Zmc2V0UGFyZW50KVxyXG5cclxuICAgICAgICB2YXIgY2FudmFzWCA9IGV2ZW50LnBhZ2VYIC0gdG90YWxPZmZzZXRYO1xyXG4gICAgICAgIHZhciBjYW52YXNZID0gZXZlbnQucGFnZVkgLSB0b3RhbE9mZnNldFk7XHJcblxyXG4gICAgICAgIHJldHVybiB7IHg6IGNhbnZhc1gsIHk6IGNhbnZhc1kgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbnZhc0NsaWNrKGU6IE1vdXNlRXZlbnQpIHtcclxuXHJcbiAgICAgICAgdmFyIHBvaW50ID0gdGhpcy5nZXRSZWxhdGl2ZUNvb3JkaW5hdGVzKGUpO1xyXG4gICAgICAgIHZhciBhZGRyZXNzID0gdGhpcy5zY3JlZW5Db29yZGluYXRlVG9BZGRyZXNzKHBvaW50KTtcclxuXHJcbiAgICAgICAgdmFyIGluc3RydWN0aW9uID0gdGhpcy5jb3JlLmdldEF0KGFkZHJlc3MpO1xyXG5cclxuICAgICAgICB0aGlzLmluc3RydWN0aW9uTGFiZWwuaW5uZXJUZXh0ID0gdGhpcy5pbnN0cnVjdGlvblNlcmlhbGlzZXIuc2VyaWFsaXNlKGluc3RydWN0aW9uKTtcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvcmV3YXIvUHJlc2VudGF0aW9uL0NvcmVSZW5kZXJlci50cyIsImltcG9ydCB7IElQYXJzZXIgfSBmcm9tIFwiLi4vLi4vcGFyc2VyL2ludGVyZmFjZS9JUGFyc2VyXCI7XHJcbmltcG9ydCB7IElTZXJpYWxpc2VyIH0gZnJvbSBcIi4uLy4uL3BhcnNlci9pbnRlcmZhY2UvSVNlcmlhbGlzZXJcIjtcclxuaW1wb3J0IHsgSVBhcnNlUmVzdWx0IH0gZnJvbSBcIi4uLy4uL3BhcnNlci9pbnRlcmZhY2UvSVBhcnNlUmVzdWx0XCI7XHJcbmltcG9ydCB7IElNZXNzYWdlLCBNZXNzYWdlVHlwZSB9IGZyb20gXCIuLi8uLi9wYXJzZXIvaW50ZXJmYWNlL0lNZXNzYWdlXCI7XHJcbmltcG9ydCB7IElTaW11bGF0b3IgfSBmcm9tIFwiLi4vLi4vc2ltdWxhdG9yL2ludGVyZmFjZS9JU2ltdWxhdG9yXCI7XHJcbmltcG9ydCB7IElDb3JlIH0gZnJvbSBcIi4uLy4uL3NpbXVsYXRvci9pbnRlcmZhY2UvSUNvcmVcIjtcclxuaW1wb3J0IHsgSUV4ZWN1dGl2ZSB9IGZyb20gXCIuLi8uLi9zaW11bGF0b3IvaW50ZXJmYWNlL0lFeGVjdXRpdmVcIjtcclxuaW1wb3J0IERlZmF1bHRzMSBmcm9tIFwiLi4vLi4vc2ltdWxhdG9yL0RlZmF1bHRzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUHJlc2VudGVyIHtcclxuICAgIHByaXZhdGUgcmVkY29kZTogSFRNTFRleHRBcmVhRWxlbWVudDtcclxuICAgIHByaXZhdGUgbG9hZGZpbGU6IEhUTUxUZXh0QXJlYUVsZW1lbnQ7XHJcbiAgICBwcml2YXRlIGNvbnNvbGU6IEhUTUxVTGlzdEVsZW1lbnQ7XHJcbiAgICBwcml2YXRlIHN0YW5kYXJkOiBIVE1MU2VsZWN0RWxlbWVudDtcclxuXHJcbiAgICBwcml2YXRlIHBhcnNlcjogSVBhcnNlcjtcclxuICAgIHByaXZhdGUgc2VyaWFsaXNlcjogSVNlcmlhbGlzZXI7XHJcblxyXG4gICAgcHJpdmF0ZSByZXN1bHQ6IElQYXJzZVJlc3VsdDtcclxuXHJcbiAgICBwcml2YXRlIHNpbXVsYXRvcjogSVNpbXVsYXRvcjtcclxuICAgIHByaXZhdGUgY29yZTogSUNvcmU7XHJcbiAgICBwcml2YXRlIGV4ZWN1dGl2ZTogSUV4ZWN1dGl2ZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICByZWRjb2RlOiBIVE1MVGV4dEFyZWFFbGVtZW50LFxyXG4gICAgICAgIGxvYWRmaWxlOiBIVE1MVGV4dEFyZWFFbGVtZW50LFxyXG4gICAgICAgIGNvbnNvbGU6IEhUTUxVTGlzdEVsZW1lbnQsXHJcbiAgICAgICAgc3RhbmRhcmQ6IEhUTUxTZWxlY3RFbGVtZW50LFxyXG4gICAgICAgIHBhcnNlcjogSVBhcnNlcixcclxuICAgICAgICBzZXJpYWxpc2VyOiBJU2VyaWFsaXNlcixcclxuICAgICAgICBzaW11bGF0b3I6IElTaW11bGF0b3IsXHJcbiAgICAgICAgY29yZTogSUNvcmUsXHJcbiAgICAgICAgZXhlY3V0aXZlOiBJRXhlY3V0aXZlKSB7XHJcblxyXG4gICAgICAgIHRoaXMucmVkY29kZSA9IHJlZGNvZGU7XHJcbiAgICAgICAgdGhpcy5sb2FkZmlsZSA9IGxvYWRmaWxlO1xyXG4gICAgICAgIHRoaXMuY29uc29sZSA9IGNvbnNvbGU7XHJcbiAgICAgICAgdGhpcy5zdGFuZGFyZCA9IHN0YW5kYXJkO1xyXG4gICAgICAgIHRoaXMuc2VyaWFsaXNlciA9IHNlcmlhbGlzZXI7XHJcbiAgICAgICAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XHJcbiAgICAgICAgdGhpcy5zaW11bGF0b3IgPSBzaW11bGF0b3I7XHJcbiAgICAgICAgdGhpcy5jb3JlID0gY29yZTtcclxuICAgICAgICB0aGlzLmV4ZWN1dGl2ZSA9IGV4ZWN1dGl2ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcGFyc2UoKSB7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMuY29uc29sZS5oYXNDaGlsZE5vZGVzKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5jb25zb2xlLnJlbW92ZUNoaWxkKHRoaXMuY29uc29sZS5sYXN0Q2hpbGQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHNlbGVjdGVkU3RhbmRhcmQgPSBwYXJzZUludCh0aGlzLnN0YW5kYXJkLnZhbHVlKTtcclxuXHJcbiAgICAgICAgdmFyIHJlZGNvZGVWYWx1ZSA9IHRoaXMucmVkY29kZS52YWx1ZTtcclxuICAgICAgICB0aGlzLnJlc3VsdCA9IHRoaXMucGFyc2VyLnBhcnNlKHJlZGNvZGVWYWx1ZSwgeyBzdGFuZGFyZDogc2VsZWN0ZWRTdGFuZGFyZCB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2FkZmlsZS52YWx1ZSA9IHRoaXMuc2VyaWFsaXNlci5zZXJpYWxpc2UodGhpcy5yZXN1bHQudG9rZW5zKTtcclxuXHJcbiAgICAgICAgXy5mb3JFYWNoKHRoaXMucmVzdWx0Lm1lc3NhZ2VzLCAoaXRlbTogSU1lc3NhZ2UpID0+IHtcclxuICAgICAgICAgICAgdmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gICAgICAgICAgICBsaS5pbm5lclRleHQgPVxyXG4gICAgICAgICAgICBcIltcIiArIGl0ZW0ucG9zaXRpb24ubGluZS50b1N0cmluZygpICsgXCIsXCIgK1xyXG4gICAgICAgICAgICBpdGVtLnBvc2l0aW9uLmNoYXIudG9TdHJpbmcoKSArIFwiXSBcIiArXHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZVR5cGVUb1N0cmluZyhpdGVtLnR5cGUpICtcclxuICAgICAgICAgICAgaXRlbS50ZXh0O1xyXG4gICAgICAgICAgICB0aGlzLmNvbnNvbGUuYXBwZW5kQ2hpbGQobGkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBydW4oKSB7XHJcblxyXG4gICAgICAgIC8vVE9ETyBjaGVjayBzdWNjZXNzZnVsIHBhcnNlXHJcblxyXG4gICAgICAgIHZhciBzZWxlY3RlZFN0YW5kYXJkID0gcGFyc2VJbnQodGhpcy5zdGFuZGFyZC52YWx1ZSk7XHJcblxyXG4gICAgICAgIHZhciBvcHRpb25zID0gXy5kZWZhdWx0cyh7XHJcbiAgICAgICAgICAgIGNvcmVzaXplOiA2NCxcclxuICAgICAgICAgICAgc3RhbmRhcmQ6IHNlbGVjdGVkU3RhbmRhcmRcclxuICAgICAgICB9LCBEZWZhdWx0czEpO1xyXG5cclxuICAgICAgICB0aGlzLmNvcmUuaW5pdGlhbGlzZShvcHRpb25zKTtcclxuICAgICAgICB0aGlzLmV4ZWN1dGl2ZS5pbml0aWFsaXNlKG9wdGlvbnMpO1xyXG5cclxuICAgICAgICB0aGlzLnNpbXVsYXRvci5pbml0aWFsaXNlKG9wdGlvbnMsIFt0aGlzLnJlc3VsdF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGVwKCkge1xyXG5cclxuICAgICAgICB0aGlzLnNpbXVsYXRvci5zdGVwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtZXNzYWdlVHlwZVRvU3RyaW5nKG1lc3NhZ2VUeXBlOiBNZXNzYWdlVHlwZSkge1xyXG4gICAgICAgIHN3aXRjaCAobWVzc2FnZVR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBNZXNzYWdlVHlwZS5FcnJvcjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIkVSUk9SOiBcIjtcclxuICAgICAgICAgICAgY2FzZSBNZXNzYWdlVHlwZS5XYXJuaW5nOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiV0FSTklORzogXCI7XHJcbiAgICAgICAgICAgIGNhc2UgTWVzc2FnZVR5cGUuSW5mbzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb3Jld2FyL1ByZXNlbnRhdGlvbi9QcmVzZW50ZXIudHMiXSwic291cmNlUm9vdCI6IiJ9