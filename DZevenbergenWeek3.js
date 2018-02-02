// Week 3 HW for Algorithms & Data Structures
// Diane Zevenbergen


/*********************************************************************
 * 1. Find missing parenthesis in a given expression –
 *        2 * ( 3 + 5(sasdfasdfasd)
 * Assumption:  1) there is exactly 1 missing paren
 *              2) return the index (w/ message) for the mismatched paren
 *
 * Complexity: O(n)
 *********************************************************************/

function findMismatch(str) {
  var arr = str.split('');
  var openLoc = [];
  
  console.log('Expression: ' + str);
  
  /***
   * Loop through array & push indexes for open parens
   * to the 'openLoc' array.
   * When close paren found, either pop corresponding
   * paren from openLoc (if it exists) or if empty,
   * return this close paren's index as answer.
   * If an open paren always can be popped to match a close paren
   * then return answer as last remaining item in openLoc.
   ***/
  for (var i = 0; i < arr.length ; i++) {
    if (arr[i] === '(') {
      openLoc.push(i);
    } else if (arr[i] === ')') {
      if (openLoc.length >= 1) {
        openLoc.pop();
      } else {
        return ('    The closing parenthesis at index ' + i + ' does not have a match.');
      }
    }
  }
  return ('    The opening parenthesis at index ' + openLoc[0] + ' does not have a match.');
}


console.log(findMismatch('2 * ( 3 + 5(sasdfasdfasd)'));
console.log(findMismatch('2 * 3) + 5(sasdfasdfasd)'));
console.log(findMismatch('(2 * 3 + (5 * 4 + (20 / 2) * 6 + ( 3 - ( 2 / .5)))'));
console.log(findMismatch('(2 * 3) + 5 * 4 + (20 / 2) * (6 + ( 3 - ( 2 / .5))'));








/*********************************************************************
 * 2. Evaluate an expression given only single digits and 
 * only 2 operators * and +.
 * Assumptions: 1) no parens
 *              2) possibly spaces 
 *              3) 'digits' implies 0 - 9 only, no negatives.
 *
 * Complexity: running time: O(n + n/2) for both the while loop plus 
 *            summing the stack at end (worst case 2+2+3+3+3...)
 *              storage: O(n/2)
 *
 * Use 'sumStack' to store values that need to be added
 * Use 'temp' to store values in a multiplication sequence
 *********************************************************************/
function evalExpr(str) {  
  var arr = str.split('');
  var sumStack = [];
  var temp = 1;    
  var j = arr.length - 1;
  
  while (j >=0) {
    
    // If digit, push (digit * temp) to sumStack
    if ((arr[j]) !== ' ' && (arr[j] >= 0) && (arr[j] <= 9)) {
      sumStack.push(arr[j] * temp);    
      temp = 1;
    
    // If * operator, pop previous value in stack & recalc temp
    } else if (arr[j] === '*') {
      temp = sumStack.pop() * temp;
    }
  
    j--;
  }
  
  // Return sum of sumStack
  return (str + ' = ' + sumStack.reduce((a, b) => a + b));
}


console.log(evalExpr('2 + 3 * 4 *2+7'));
console.log(evalExpr('2+3*4 + 2*7'));
console.log(evalExpr('2*3+4+2*7'));







/*********************************************************************
 * 3. Reverse a stack and put the reversed value back in the 
 * same stack. You can use only one other stack and a temp variable.
 * Assumptions:
 *    1) input is array
 *    2) 'put reversed value back in same stack' means to append
 *       the joined result, so that:
 *            input [a,b,c,d,e] yields output [a,b,c,d,e,edcba]
 *
 * Complexity: O(n/2) running time (what about running time for join?) and 
 *  O(n) storage
 *********************************************************************/

function revStack(arr) {
  var len = arr.length;
  var revArr = Array(len);
  var j = len - 1;
  
  for (var i = 0; i < (len/2) ; i++) {
    revArr[i] = arr[j];
    revArr[j] = arr[i];
    j--;
  }
  arr.push(revArr.join(''));
  return arr;
}

console.log(revStack(['a', 'b', 'c', 'd', 'e']));
console.log(revStack(['a', 'b', 'c', 'x']));
console.log(revStack([1, 2, 3, 4, 5]));
console.log(revStack([1, 2, 3, 4]));