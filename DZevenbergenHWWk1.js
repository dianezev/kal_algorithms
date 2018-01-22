// Homework Week1  Algorithms class
// by Diane Zevenbergen

// Kal Week 1, Prob 1

// Find the element that appears once in a sorted array where all other 
// elements appear twice one after another. Find that element in 0(logn) complexity.
// Input:   arr[] = {1, 1, 3, 3, 4, 5, 5, 7, 7, 8, 8}

// Output:  4

function findSingle(arr) {
  var len = arr.length;
  
  var ans = getSingleVal(0, len - 1);
  
  return ans;
  
  function getSingleVal(a, b) {
    var m = Math.floor((a + b) / 2);

    // Round m up to even index because pairs to left of single value
    // will start in even slot & to right of single value will
    // start in odd slot
    m += m % 2;

    if (b < a) {
      return undefined;
      
    } else if ((m + 1) > b) {
      return arr[m];
      
    } else if (arr[m] === arr[m + 1]) {
      return getSingleVal(m + 2, b);
    
    } else if (arr[m] === arr[m - 1]){
      return getSingleVal(a, m - 2);
      
    } else {
      return arr[m];
    }
  }
}
console.log(findSingle([1, 1, 3, 3, 4, 5, 5, 7, 7, 8, 8]));

//Kal Week 1, Problem 2

// Magic index: array of distinct & sorted integers, find arr[i] = i
// Assume there might be multiples


// Use binary search to find lowest & highest magic indexes
// (They'd be contiguous since integers are distinct and sorted)
function findMagicIndexArray(arr) {
  var len = arr.length;
  var lo = -1;
  var hi = -1;
  var ans;
  var matches = [];
  
  getIndexes(0, len - 1);
  
  if (lo !== -1) {
    matches = Array(hi - lo + 1)
              .fill(lo)
              .map((el, i) => lo + i);
    ans = matches.join(', ');
    
  } else {
    ans = 'The array does not contain a magic index.';
  }
  
  return ans;
  
  function getIndexes(a, b) {
    var m;
  
    // Base case
    if (b < a) {
      return;
    }
    
    // Get middle index
    m = Math.floor((a + b) / 2);
    
    // If m is magic index, set hi/lo as needed
    if (arr[m] === m) {
      lo = (lo === -1) ? m : Math.min(lo, m);
      hi = Math.max(hi, m);
      
      // Continue looking to left if (m - 1) < lo
      if ((m - 1) < lo) {
        getIndexes(a, m - 1);
      }

      // Continue looking to right if (m + 1) > hi
      if ((m + 1) > hi) {
        getIndexes(m + 1, b);
      }
      
    // If m is not magic index & val < m, just continue to look to right
    } else if (arr[m] < m) {
    
      // Continue looking to right
      getIndexes(m + 1, b);               
     
      
    // If m is not magic index & val > m, just continue to look to left
    } else {
      
      // Continue looking to left
      getIndexes(a, m - 1);
    }
  }
} 


 console.log(findMagicIndexArray([ -10, -2, 2, 3, 5, 7, 8]));
 console.log(findMagicIndexArray([ -10, -2, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 56, 67, 78]));
 console.log(findMagicIndexArray([ -10, -2, 1, 2, 3, 4, 6]));
 console.log(findMagicIndexArray([ 0]));
 console.log(findMagicIndexArray([ 8]));
 console.log(findMagicIndexArray([ 0, 8]));
 console.log(findMagicIndexArray([ -3, 1]));
 console.log(findMagicIndexArray([ -3, 0]));
 console.log(findMagicIndexArray([ -3, 4]));
 console.log(findMagicIndexArray([ -3, 1, 5]));
 console.log(findMagicIndexArray([ 0, 1, 5]));
 console.log(findMagicIndexArray([ -3, 1, 2]));
 console.log(findMagicIndexArray([ 0, 2, 5]));
 console.log(findMagicIndexArray([ -3, 0, 2]));


// Follow-up: what if integers are non-distinct?
// Question: can array values be negative? (If yes, could use binary search to
// find first element >= 0 & start loop there.)
//
// If there are multiples, they aren't necessarily contiguous, 
// i.e. input: [-1, 1, 3, 4, 5, 5, 5, 7] has output: [1, 7]
// So you have to search parts of array until arr[i] >= arr.length.
// Also note you can skip over parts of array if arr[i] > i. For example,
// if arr[5] = 10, then the next possible magic index is at arr[10] which could be = 10 
// but not less. 
//
//Complexity O(n)
function findIndexMatchNonDistinct(arr) {
  var i = 0;
  var cur;
  var incr;
  var len = arr.length;
  var ans = [];
  
  // Search for magic indexes as long as i < length of array
  // AND the value at current index is < length of array
  while (( i < len) && (arr[i] < len)) {
    cur = arr[i];
    incr = 1;
    
    // If match, push i
    if (cur === i) {
      ans.push(i);
    
    // If value at i exceeds i, set increment to difference because
    // there's no need to check everything (i.e. [0,4,4,4,4,4,8])
    } else if (cur > i) {
      incr = (cur - i);      
    }
    
    i+=incr;
  }
  
  return ans;
}


console.log(findIndexMatchNonDistinct([ 0, 4, 4, 4, 4, 4, 6]));







// Week 1 problem 3

// Sorted array is rotated unknown # of times.
// Write code to find el
function findIndex(el, arr) {
  var ans;
  
  ans = getIndex(0, arr.length - 1);
  
  return ans;

  function getIndex(a, b) {
    var m = Math.floor((a + b) /2);
    var mid = arr[m]
    var start = arr[a];
    var end = arr[b];
    
    // If end index < start index, return -1
    if (b < a) {
      return -1;
    }

    // If m is a match, return it
    if (el === mid) {
      return m;
    }

    /*
     * Search for the element in the left half if either
     * of these conditions is met:
     *    1) start val <= mid AND el is in between those values
     * OR 2) start val > mid AND el is EITHER > start OR < mid value
     */
    if (((start <= mid) && (el >= start) && (el < mid)) ||
        ((start > mid) && ((el >= start) || (el < mid)))) {
    
      // Call getIndex on left half
      return getIndex(a, m - 1);
        
    /*
     * Search for the element in the right half if either
     * of these conditions is met:
     *    1) mid < end val AND el is in between those values
     * OR 2) mid > end val AND el is EITHER > mid OR < end value
     */
    } else if (((mid <= end) && (el > mid) && (el <= end)) ||
               ((mid > end) && ((el > mid) || (el <= end)))) {
      
      // Call getIndex on right half
      return getIndex(m + 1, b);    
    
    // If above conditions not met, no match found so return -1
    } else {
      return -1;
    }
  }
}
 
 console.log(findIndex( 12, [10, 12, 15, 1, 2, 3, 6, 7 ])); // expect: 1
 console.log(findIndex( 2, [10, 12, 15, 1, 2, 3, 6, 7 ])); // expect: 4
 console.log(findIndex( 8, [10, 12, 15, 1, 2, 3, 6, 7 ])); // expect: -1
 console.log(findIndex( 17, [10, 12, 15, 1, 2, 3, 6, 7 ])); // expect: -1
 console.log(findIndex( -1, [10, 12, 15, 1, 2, 3, 6, 7 ])); // expect: -1
 console.log(findIndex( 2, [2, 1 ])); // expect: 0
 console.log(findIndex( 1, [2, 1 ])); // expect: 1
 console.log(findIndex( 3, [2, 1 ])); // expect: -1
console.log(findIndex( -3, [4, 9, 1 ])); // expect: -1 
console.log(findIndex( 3, [4, 9, 1 ])); // expect: -1
console.log(findIndex( 13, [4, 9, 1 ])); // expect: -1
console.log(findIndex( 4, [4, 9, 1 ])); // expect: 0
console.log(findIndex( 1, [4, 9, 1 ])); // expect: 2
console.log(findIndex( 9, [4, 9, 1 ])); // expect: 1







// Kal Week 1, Problem 4

// Version 2 - Assume:
//   Array is unsorted
//   Array includes ALL values 1  thru (n - 1), plus one dupl
//   return duplicate value, not index
// Use sum of arithmetic progression to find dupl val
// Complexity: O(n) for reduce method that sums the array, storage: effectively none, or just O(2) for 2 vars basicSum & actSum??
function findDupl(arr) {
  var n = arr.length;
  
  // Calc sum of values between 1 & (n - 1)
  var basicSum = ((n - 1) * n ) / 2;
  
  // Get sum of arr, using reduce
  var actSum = arr.reduce((a, b) => a + b);
  
  return actSum - basicSum;
  
}

console.log( findDupl([1, 2, 3, 2]));// expect 2
console.log( findDupl([3, 2, 3, 4, 5, 1]));// expect 3
console.log( findDupl([10, 2, 3, 1, 1, 6, 7, 9, 8, 4, 5]));// expect 1







//Kal Week 1, Problem 5

// Complexity O(n/2) because I think [4,5,4,5,4,5,4,5] is example of worst case if looking for 3.
function findVal(el, arr) {
  var cur;
  var i = 0;
  var ans = -1;
  
  while ((i < arr.length) && (ans === -1)) {
    
    cur = arr[i];

    // If el matches cur val in array, set ans to index
    if (el === cur){
      ans = i; 
      
    // Otherwise, jump index by diff between cur val and element we're looking for
    } else {
      i+=(cur - el);
    }
  }

  return ((ans !== -1) ? ("Found at index " + ans) : "Not found");
}


console.log(findVal(3, [8, 7, 6, 7, 6, 5, 4, 3, 2, 3, 4, 3]));
console.log(findVal(8, [8, 7, 6, 7, 6, 5, 4, 3, 2, 3, 4, 3]));
console.log(findVal(1, [8, 7, 6, 7, 6, 5, 4, 3, 2, 3, 2, 1]));






// Kal Week 1, Prob 6

// Given an array of numbers, split the array into two where one array contains the sum of n-1 numbers and the other array with all the n-1 elements.


// Assume that I need to verify that the sum of the n-1 elements is equal to the last element. 
// (not sure if this is right, but I think I'm missing something if I just pop the
// last element off of the array and return both pieces.)

function splitAndCheck(arr) {
  var lastEl = [];
  var actSum;
  
  // Pop last element off of array 'arr' and assign to 'lastEl' array
  lastEl.push(arr.pop());
  
  // Calc sum of 'arr' (which no longer includes last el)
  actSum = arr.reduce((a, b) => a + b);
  
  // Return different results depending on whether
  if (actSum === lastEl[0]) {
    return 'Sum array: [' + lastEl + '] equals the sum of the other elements: [' + arr + '].';
  } else {
    return 'Sum array: [' + lastEl + '] does not equal the sum of the other elements: [' + arr + '].';
  }
}

console.log(splitAndCheck([1, 3, 4, 8]));
console.log(splitAndCheck([1, 3, 4, 8, 6, 9, 5, 11, 67]));
console.log(splitAndCheck([1, 3, 4, 8, 6, 9, 5, 11, 47]));