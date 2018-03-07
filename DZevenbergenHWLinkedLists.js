//Diane Zevenbergen HW - Linked Lists
//
// Still to be done, but I will try to get to these later...:
//3. Clone a linked list with a random pointer.
//9. Given a singly linked list which has data sorted in ascending order, construct a balanced BST.





function Node(val) {
  
  let node = {
    val: val,
    next: null
  }
  
  return node;
}

function LinkedList() {
  let head = null;

  let list = {
    append: function(val) {
      let newNode = new Node(val);
      
      if (head === null) {
        head = newNode;
        
      } else {
        let cur = head;
        while (cur.next !== null) {
          cur = cur.next;
        }
        cur.next = newNode;
        cur = cur.next;
      }
    },
    
    // 5. Find kth to last element in LL
    findKthToLastElement: function(n) {
      let slow = head;
      let fast = head;
      let ctr = 0;
      
      
      // Move fast ptr n nodes ahead of slow
      while (ctr < n) {
        fast = fast.next;
        ctr++;
      }
      
      // Continue to end, moving both ptrs together and 
      // when fast is at end, slow should be at kth to last
      while (fast.next !== null) {
        fast = fast.next;
        slow = slow.next;
      }
      
      return '#5. The ' + n + 'th to last node has a value of ' + slow.val + '.';
    },
    
    /*
     * Helper function: this forces a linked list into a circular list
     * by connecting the tail to the nth node
     */
    forceCircular: function(n) {
      let cur = head;
      let connectingNode = null;
      let ctr = 1;

      // If LL is empty, return msg
      if (head === null) {
        console.log( 'This list is empty so it can\'t be made circular.');
      }
      
      // Move pointer to nodeLoc then move on to end
      while (cur.next !== null) {
        if (ctr === n) {
          connectingNode = cur;
        }
        cur = cur.next;
        ctr++;
      }

      // Connect tail to connection point to make circular
      if (connectingNode !== null) {
        cur.next = connectingNode;
        
      } else {
        console.log( 'This list is too short to make it circular at node #' + n + '.');
      }
      
    },
    
    // Helper function: returns the NODE to be deleted (I pass the result in as arg for problem #6)
    getNodeToDel: function (n) {
      let cur = head;
      let ctr = 1;

      // Loop through LL to find the nth node & return it
      while ((cur !== null) && (ctr < n)) {
        cur = cur.next;
        ctr++;
      }

      return cur;
    },
  
    // #1. Is it a palindrome? Use fast and slow pointers
    // with val at each slow pointer pushed to stack.
    // Once faster ptr reaches end, continue slow pointer
    // while comparing to val on stack. Return false if unequal.
    //
    // Complexity: O(n) Add'l Storage: O(n/2)
    isPalindrome: function() {
      let slow = head;
      let fast = head;
      let stack = [];

      // If LL is empty, return msg
      if (head === null) {
        return 'This list is empty so there isn\'t a palindrome.';
      }
      
      // Move through list with slow & fast ptrs, pushing to stack from slow
      while (fast.next !== null) {
        stack.push(slow.val);
        
        // If not at end, increment ptrs, otherwise break out of loop
        // QUESTION: should my condition here be something simpler?
        if ((fast.next !== null) && (fast.next.next !== null)) {
          fast = fast.next.next;
          slow = slow.next;  
        } else {
          break;
        }
      }
      
      // Continue on in LL with slow pointer, comparing vals to vals popped from stack
      slow = slow.next;
      
      while (slow !== null) {
        if (stack.pop() !== slow.val) {
          return 'The list is not a palindrome.';
        } else {
          slow = slow.next;
        }
      }
      return 'The list is a palindrome.';
    },

    // #2. Is it circular? Fast pointer jumps ahead by two
    // Keep comparing nodes either until nodes are equal (not just value, but 
    // the whole node object) or exit loop if fast ptr reaches end
    isCircular: function() {
      let slow = head;
      let fast = head;
      
      // If LL is empty, return msg
      if (head === null) {
        return 'This list is empty so there\'s no circularity.';
      }

      // QUESTION: should my condition here be something simpler?
      while ((fast.next !== null) && (fast.next.next !== null)) {

        if (typeof fast.next.next === "undefined") {
          return 'No, the list is not circular';
        } else if (fast.next.next === slow.next) {
          return 'Yes, the list is circular';
        } else {
          fast = fast.next.next;
          slow = slow.next;
        }
      }
      return 'No, the list is not circular';
    },
    
    // Helper function: log up to 10 node values (limit is 10 to avoid
    // endless loop when list is set to circular)
    logUpTo10NodeValues: function() {
      let ctr = 1;
      
      if (head === null) {
        console.log('This list is empty.');
        
      } else {
        let cur = head;
        while (cur.next !== null && ctr <= 10) {
          console.log(cur.val);
          cur = cur.next;
          ctr++;
        }
        console.log(cur.val);
      }
    },
    
    // #7. Write code to partition a linkedlist around a value x, such that all nodes less than x come before all nodes great than or equal to x.
    // Assumption: I'm assuming that the values that are greater than x do NOT need to come after x, as long as they come after all of 
    // the values less than x.
    // So for example the linked list 17 -> 4 -> 11 -> 7 -> 8 -> 1 -> 5 -> 78 will return
    // 5 -> 1 -> 4 -> 17 -> 11 -> 7 -> 8 -> 78
    //
    // Complexity: O(n);
    partition: function(x) {
      let prev = head;
      let cur = prev.next;
    
      while (cur !== null) {

        // If val is < x, move node to head of LL
        if (cur.val < x) {
          prev.next = cur.next;
          cur.next = head;
          head = cur;
          cur = prev.next;
          
        } else {
          prev = cur;
          cur = cur.next;
        }
      }
      
      // Check partitioning
      this.logUpTo10NodeValues();
    },
    
    // #4. To remove duplicates, create a hash of values and delete matching nodes
    // Complexity: O(n) Extra storage: O(n)
    removeDuplicates: function() {
      let store = {};
      let cur = head;
      let prev = null;
      
      while (cur != null) {
        if (store.hasOwnProperty(cur.val)) {
          prev.next = cur.next;
          
        } else {
          store[cur.val] = true;
          prev = cur;
        }
        cur = cur.next;
      }
    },
    
    // #6. Delete a random node with access only to that node
    // Assumption: I'm assuming I can still work with head property and
    // loop through LL to find the node that matches the node that's passed in as argument.
    // Is that correct? I couldn't figure out another way to get ahold of the previous node's
    // 'next' property, which I needed to bypass the node I wanted to delete.
    //
    // Complexity: O(n)
    removeNode: function(node) {
      let cur = head;
      let prev = null;
      
      // Loop from head through list until matching node found
      while (cur !== null) {
        
        if (cur === node) {          
          prev.next = cur.next;
          break;
          
        } else {
          prev = cur;
          cur = cur.next;
        }
      }
      
      // Check that node has been deleted
      this.logUpTo10NodeValues();
    },
    
    // #8a. Reverse a linked list iteratively
    // Complexity: O(n) Extra storage: O(3) for 3 variables(??)
    reverseIteratively: function() {
      let cur = head;
      let prev = null;
      let temp = null;
      
      while (cur.next !== null) {
        temp = cur.next;
        cur.next = prev;
        prev = cur;
        cur = temp;
      }
      cur.next = prev;
      head = cur;
      
      console.log('#8. Finished reversing linked list ITERATIVELY and result is:');
      this.logUpTo10NodeValues();
    },
    
    // #8b. Reverse a linked list recursively
    // Complexity: O(n) Extra storage (I'm not sure how to count the recursive variables...)
    reverseRecursively: function() {
      
      if (head === null) {
        return 'The list is empty...';
      }
      
      reversePtr(null, head);
      
      function reversePtr(nodeA, nodeB) {
        
        // Base case: if nodeB.next === null, you've reached end of LL so this is new head
        if (nodeB.next === null) {
          head = nodeB;
          
        // Otherwise move through LL, swapping pointer recursively
        } else {
          reversePtr(nodeB, nodeB.next);
        }
        
        nodeB.next = nodeA;
      }
      
      console.log('#8. Finished reversing linked list RECURSIVELY and result is:');
      this.logUpTo10NodeValues();
    }
    
  }
  
  return list;
}

// 1. Create linked list that is a palindrome
var myList = new LinkedList();
myList.append(2);
myList.append(3);
myList.append(5);
myList.append(4);
myList.append(2);
console.log('#1. Checking the following LL to see if it\'s a palindrome:');
console.log(myList.logUpTo10NodeValues());
console.log(myList.isPalindrome());

// 2. Create another linked list and then force it to be circular at node #3
var myListCircular = new LinkedList();
myListCircular.append(12);
myListCircular.append(13);
myListCircular.append(14);
myListCircular.append(15);
myListCircular.append(16);
myListCircular.forceCircular(3);  // force a circular list at 3rd node
console.log('#2. Here are first 10 nodes of circular linked list:');
console.log(myListCircular.logUpTo10NodeValues());
console.log(myListCircular.isCircular());

//4. Write code to remove duplicates from an unsorted linked list. Follow up: How would you solve it if temporary buffer is not allowed?
var myListWithDupl = new LinkedList();
myListWithDupl.append(12);
myListWithDupl.append(13);
myListWithDupl.append(14);
myListWithDupl.append(15);
myListWithDupl.append(16);
myListWithDupl.append(2);
myListWithDupl.append(14);
myListWithDupl.append(99);
console.log(myListWithDupl.removeDuplicates());
console.log('#4. Linked list after removing duplicates:');
console.log(myListWithDupl.logUpTo10NodeValues());


//5. Implement an algorithm to find the kth to the last element of a singly linked list
var myListToFindK = new LinkedList();
myListToFindK.append(1);
myListToFindK.append(2);
myListToFindK.append(3);
myListToFindK.append(4);
myListToFindK.append(5);
myListToFindK.append(6);
myListToFindK.append(7);
myListToFindK.append(8);
console.log(myListToFindK.findKthToLastElement(4));

//6. Remove a node with access only to that node
var myList2 = new LinkedList();
myList2.append(71);
myList2.append(72);
myList2.append(73);
myList2.append(74);
myList2.append(75);
myList2.append(76);
myList2.append(77);
myList2.append(78);
let nodeToDel = myList2.getNodeToDel(3); // get node that CONTAINS 'next' pointer to 3rd node
console.log('#6. LL after removing node #3 is:');
console.log(myList2.removeNode(nodeToDel));



//7. Write code to partition a linkedlist around a value x, such that all nodes less than x come before all nodes great than or equal to x.
var listToPartition = new LinkedList();
listToPartition.append(17);
listToPartition.append(4);
listToPartition.append(11);
listToPartition.append(7);
listToPartition.append(8);
listToPartition.append(1);
listToPartition.append(5);
listToPartition.append(78);
console.log('#7. LL after partitioning for x = 7 is:');
console.log(listToPartition.partition(7));


//8a. Reverse a linked list – iteratively
var listToReverse = new LinkedList();
listToReverse.append(12);
listToReverse.append(13);
listToReverse.append(14);
listToReverse.append(15);
listToReverse.append(16);
listToReverse.append(2);
listToReverse.append(14);
listToReverse.append(99);
console.log(listToReverse.reverseIteratively());

//8b. Reverse a linked list – recursively
var list2ToReverse = new LinkedList();
list2ToReverse.append(12);
list2ToReverse.append(13);
list2ToReverse.append(14);
list2ToReverse.append(15);
list2ToReverse.append(16);
list2ToReverse.append(2);
list2ToReverse.append(14);
list2ToReverse.append(99);
console.log(list2ToReverse.reverseRecursively());


