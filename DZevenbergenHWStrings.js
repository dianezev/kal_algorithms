//Diane Zevenbergen HW String Problems
//




//1. Implement an algorithm to determine if a string has all unique characters. What if you cannot use additional data structures?

// Problem 1, solution 1, using an obj to store characters...
// Time complexity O(n), storage O(n)
function isUnique(str) {
  var arr = str.split('');
  var lookup = {}

  for (var i = 0; i < arr.length ; i++) {

    if (lookup.hasOwnProperty(arr[i])) {
      return false;

    } else {
      lookup[arr[i]] = 1;
    }
  }
  return true;
}

console.log(isUnique('oiusdfkljhw'));
console.log(isUnique('oiusdfkljhwo'));
console.log(isUnique('o'));
console.log(isUnique('123789'));
console.log(isUnique('9123789'));
console.log(isUnique('123n789'));







// 2. Given two strings, write a method to decide if one is a permutation of the other?
// Assumption: Include spaces, i.e. 'hel lo' is perm of 'hello '
// Time: O(2n)
//
function isPermutation(str1, str2) {
  var hash = {};

  if (str1.length !== str2.length) {return false;}
  
  // Put everything in str1 into a hash object (use counters for dupl)
  for (var i = 0; i < str1.length ; i++) {
    if (hash.hasOwnProperty(str1[i])) {
      hash[str1[i]]++;
    } else {
      hash[str1[i]] = 1;
    }
  }
        
  // Check hash for every item in str2, decrementing counter each time
  // If not found, return false
  for (var j = 0; j < str2.length ; j++) {
    if (hash.hasOwnProperty(str2[j])) {
      hash[str2[j]]--;
      if (hash[str2[j]] < 0) {
        return false;
      }
    } else {
      return false;
    }
  }
    
  return true;
}

console.log(isPermutation('hello', 'lleho'));
console.log(isPermutation('hello', 'llehoo'));
console.log(isPermutation('helllo', 'lleho'));
console.log(isPermutation('hello ', 'll eho'));


//3. Write a method to replace all spaces in a string with ‘%20’.
//    O(n) for time and O(3n) for storage
//
// One way is: return str.replace(/ /g, '%20');
//    which I think requires O(n) time & O(3n) extra storage (worst case, if str is all spaces?)
// But for an interview I assume I should turn in a solution that walks through the logic...
//    so I'll loop through the string & create a new string (also O(n) for time and O(3n) for storage)
function replaceSpaces(str) {
  var newStr = '';
  var curChar;
  
  for (var i = 0; i < str.length ; i++) {
    curChar = str.charAt(i),
    newStr += (curChar === ' ') ? '%20' : curChar;
  }
  return newStr;
}

console.log(replaceSpaces('Today is Wednesday.'));
console.log(replaceSpaces('abc def ghi jkl'));



// 4, Implement a method to perform a basic string compression using the counts of repeated characters. 
// For example, the string aabccccaaa would become a2b1c4a3. If the compressed string would not become
// smaller than the original string, your method should return the original string.
//
// Time: O(n) and add'l storage O(n)
function compressString(str) {
  let curChar;
  let ctr;
  let compressStr = '';
  let len = str.length;

  for (let i = 0; i < len ; i++) {
    if (i === 0) {
      curChar = str[i];
      ctr = 1;
    } else if (str[i] === curChar) {
      ctr++;
    } else {
      compressStr += curChar + ctr.toString();
      
      // If len of compressed string exceeds original, just return orig
      if (compressStr.length >= len) {
        return str;
      }
      curChar = str[i];
      ctr = 1;
    }
  }
  
  // When loop done, still need to append info for last char(s)
  compressStr += curChar + ctr.toString();
  
  return (len > compressStr.length) ? compressStr : str;
}

console.log(compressString('aabccccaaa'));
console.log(compressString('aazzzzbdccqqqccaaa'));
console.log(compressString('abcdefg'));
console.log(compressString('aaccee'));
console.log(compressString('aaaacccccdfgxyhijee'));





// 5. Write an algorithm such that if an element in an MxN matrix is 0, its entire row and column are set to 0.
// Assumption: assume input is an array of arrays, i.e. [[row 1 values], [row 2 values] ...] for each element
// Time: O(m x n)
function zeroOut(arr) {
  
  // Use this method to get deep copy, otherwise changing value of arrDupl[k][j]
  // also changes the original arr[k][j]
  var arrDupl = JSON.parse(JSON.stringify(arr));

  // Loop through rows & columns checking for val = 0
  for (var i = 0; i < arr.length ; i++) {
    for (var j = 0; j < arr[i].length ; j++) {

      // If val = 0 change row i and column j to 0
      if (arr[i][j] === 0) {
        
        arrDupl[i] = Array(arr[j].length).fill(0);
        
        for (var k = 0; k < arr.length ; k++) {
          arrDupl[k][j] = 0;
        }
      }
    }
  }  
  return arrDupl;
}

console.log(zeroOut([[3,34,56,78],[13,54,16,88],[30,340,5,7],[3,0,56,78],[3,34,56,78]]));
console.log(zeroOut([[3,34,56,78],[13,54,0,88],[30,340,5,7],[3,0,56,78],[3,34,56,78]]));



// 6. Given two sequences, print longest common subsequence
//LCS for input Sequences “ABCDGH” and “AEDFHR” is “ADH” of length 3. 
//LCS for input Sequences “AGGTAB” and “GXTXAYB” is “GTAB” of length 4.
//
function commonSubseq(str1, str2) {
  let len1 = str1.length;
  let len2 = str2.length;
  let lcs = Array(len1 + 1);
  let ans = [];
  let match;
  let iRow;
  let iCol;

  // Initialize table with zeros
  for (let i = 0; i <= len1 ; i++) {
    lcs[i] = Array(len2 + 1).fill(0);
  } 

  // Loop through matrix & assign
  for (let row = 1; row <= len1; row++) {
    for (let col = 1; col <= len2; col++) {

      if (str1.charAt(row - 1) === str2.charAt(col - 1)) {
        lcs[row][col] = lcs[row - 1][col - 1] + 1;

      } else {
        lcs[row][col] = Math.max(lcs[row - 1][col], lcs[row][col - 1]);      
      }
    }
  }
  
  // Backtrack to find answer
  iRow = len1;
  iCol = len2;
  match = lcs[iRow][iCol];
  
  while (match > 0) {
    
    // Move up if cur row/col matches above cell
    if (lcs[iRow - 1][iCol] === match) {
      iRow--;
      
    // Else move left if cur row/col matches left cell        
    } else if (lcs[iRow][iCol - 1] === match) {
      iCol--;
    
    // Else put matching letter into ans array (from end to 0)
    } else {
      ans[match] = str1.charAt(iRow-1);
      iRow--;
      iCol--;
      match = lcs[iRow][iCol];    
    }
  }
  return ans.join('');
}
console.log(commonSubseq('AGGTAB' , 'GXTXAYB'));
console.log(commonSubseq('ABCDGH', 'AEDFHR'));
console.log(commonSubseq('ABCDGH', 'AEFHDR'));
console.log(commonSubseq('ABCDGH', 'EFHDRMNWOSH'));


  





// 7. Given two string str1 and str2, find the shortest string that has both str1 and str2 as subsequences.
//Examples:
//Input: str1 = “geek”, str2=”eke”
//Output: “geeke”
//Input: str1 = “AGGTAB”, str2=”GXTXAYB”
//Output: “AGXGTXAYB”
// Assume: if str1 is subseq of str2, then just return str2 & vice versa
// NEED TO CORRECT - I was thinking substring instead of subsequence...

function findShortest(str1, str2) {
  var arrShort = [];
  var arrLong = [];
  var shortLen;
  var longLen;
  var isFound = false;
  
  (str1.length < str2.length) ? setupArrays(str1, str2) : setupArrays(str2, str1);

  // Check to see if short str is subseq anywhere in long str
  for (var i = 0; i < longLen - shortLen ; i+=shortLen) {
    isFound = isItSub
  
  }
  
  
  function setupArrays(short, long) {
    arrShort = short.split('');
    shortLen = arrShort.length;
    arrLong = long.split('');
    longLen = arrlong.length;
  }
}



// 8. Remove spaces from a given string in O(n) running time and only one traversal of a string.
//Input: “I love ice cream”
//Output: “Iloveicecream”

// Builds another string - running time O(n) and add'l storage O(n)
function removeSpaces(str) {
  var condensedStr = '';
  var myChar;
  
  for (var i = 0; i < str.length ; i++) {
    myChar = str.charAt(i);
    condensedStr += (myChar === ' ') ? '' : myChar;
  }
  return condensedStr;
}

console.log(removeSpaces('I love ice cream'));



// 9. Find all distinct palindromic sub-strings of a given string
//Input: str = "abaaa"
//Output: Below are 5 palindrome sub-strings
//a
//aa
//aaa
//aba
//b

function findPalindromes(str) {

}



//10. Given a string "This is a string" reverse its characters "gnirts a si siht"
//
//  Time: O(n)  Storage: O(n)
//
// Assume: return all lowercase??
function reverseChars(str) {
  var flipStr = '';
  
  for (var i = str.length - 1; i >= 0 ; i--) {
    flipStr += str.charAt(i).toLowerCase();
  }
  return flipStr;
}
console.log(reverseChars("This is a string"));




//11. Given a string "This is a string" reverse the characters in every word "siht si a gnirts"
//
//  Time: O(n)  Storage: O(n + something more for longest word len + 'arr')
//
// Assume: return all lowercase??
function reverseCharsInWords(str) {
  var arr = str.split(' ');
  var singleWord = '';
  var answer = '';
   
  for (var i = 0 ; i < arr.length; i++) {
    answer += reverseChars(arr[i]) + ((i < arr.length - 1) ? ' ' : '');
  }
  return answer;
}
console.log(reverseCharsInWords("This is a string"));
