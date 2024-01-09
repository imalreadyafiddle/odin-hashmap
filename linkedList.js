// linked list implementation in javascript
// each node stores a value and a pointer to the next node
// the list stores a pointer to the head and tail nodes
// the list also stores the length of the list
class LinkedList {
  constructor() {
    this.listHead = null;
    this.listTail = null;
    this.length = 0;
  }

  append(value) {
    //adds a new node containing value to the end of the list
    //if the list is empty, the new element is considered the tail and the head
    //if not, the new node becomes the tail, and the old tail points to it

    //create a new node
    let newNode = new Node(value);
    //if the list is empty
    if (this.listHead === null) {
      //make the new node the head and tail
      this.listHead = newNode;
      this.listTail = newNode;
    } else {
      //otherwise, make the new node the tail
      this.listTail.nextNode = newNode;
      this.listTail = newNode;
    }

    //increment the length
    this.length++;

    //return the list
    return this;
  }

  prepend(value) {
    //adds a new node containing value to the start of the list
    //if the list is empty, the new element is considered the tail and the head
    //if not, the new node becomes the head, and the old head points to it

    //create a new node
    let newNode = new Node(value);
    //if the list is empty
    if (this.listHead === null) {
      //make the new node the head and tail
      this.listHead = newNode;
      this.listTail = newNode;
    } else {
      //otherwise, make the new node the head
      newNode.nextNode = this.listHead;
      this.listHead = newNode;
    }

    //increment the length
    this.length++;

    //return the list
    return this;
  }

  size() {
    //returns the total number of nodes in the list
    return this.length;
  }

  head() {
    //returns the first node in the list
    return this.listHead;
  }

  tail() {
    //returns the last node in the list
    return this.listTail;
  }

  at(index) {
    //returns the node at the given index
    //if the index is out of range, returns null
    //otherwise, returns the node
    if (index < 0 || index >= this.length) {
      return null;
    }
    let currentNode = this.listHead;
    let currentIndex = 0;
    while (currentIndex < index) {
      currentNode = currentNode.nextNode;
      currentIndex++;
    }
    return currentNode;
  }

  pop() {
    //removes the last element from the list
    //if the list is empty, returns null
    //otherwise, returns the value of the node removed
    //if there is only one node, the head and tail should be removed
    //update the tail to be the previous node
    //set the new tail's nextNode to null
    //decrement the length
    //return the value of the node removed
    if (this.length === 0) {
      return null;
    }
    let currentNode = this.listHead;
    let previousNode = null;
    while (currentNode.nextNode !== null) {
      previousNode = currentNode;
      currentNode = currentNode.nextNode;
    }
    //currentNode is the tail
    //previousNode is the node before the tail
    //if there is only one node
    if (previousNode === null) {
      this.listHead = null;
      this.listTail = null;
    } else {
      //otherwise, remove the tail
      previousNode.nextNode = null;
      this.listTail = previousNode;
    }
    this.length--;
    return currentNode.value;
  }

  contains(value) {
    //returns true if the passed in value is in the list, otherwise returns false
    let currentNode = this.listHead;
    while (currentNode !== null) {
      if (currentNode.value === value) {
        return true;
      }
      currentNode = currentNode.nextNode;
    }
    return false;
  }

  find(value) {
    //returns the index of the node containing value, returns null if not found
    let currentNode = this.listHead;
    let currentIndex = 0;
    while (currentNode !== null) {
      if (currentNode.value === value) {
        return currentIndex;
      }
      currentNode = currentNode.nextNode;
      currentIndex++;
    }
    return null;
  }

  toString() {
    //represent the LinkedList objects as strings so they can be printed to the console
    //the string representation of a LinkedList is the string representation of all the nodes
    //the format should be: ( value ) -> ( value ) -> ( value ) -> null
    //if the list is empty, return null
    //otherwise, return the string representation
    let currentNode = this.listHead;
    let string = "";
    while (currentNode !== null) {
      string += `(${currentNode.value}) -> `;
      currentNode = currentNode.nextNode;
    }
    string += "null";
    return string;
  }

  // EXTRA CREDIT FUNCTIONS

  insertAt(value, index) {
    //inserts a new node with the provided value at the given index
    //if the index is out of range, add the node to the end of the list
    //otherwise, insert the new node at the proper index
    //increment the length
    //return the list
    if (index < 0 || index >= this.length) {
      return this.append(value);
    }
    //create a new node
    let newNode = new Node(value);
    //if the index is 0, make the new node the head
    if (index === 0) {
      newNode.nextNode = this.listHead;
      this.listHead = newNode;
    } else {
      //otherwise, find the node at the given index
      let currentNode = this.listHead;
      let currentIndex = 0;
      while (currentIndex < index - 1) {
        currentNode = currentNode.nextNode;
        currentIndex++;
      }
      //insert the new node
      newNode.nextNode = currentNode.nextNode;
      currentNode.nextNode = newNode;
    }
    //increment the length
    this.length++;
    //return the list
    return this;
  }

  removeAt(index) {
    //removes the node at the given index
    //if the index is out of range, return "There is no item for this index"

    //if the list is empty
    if (this.listHead === null) {
      return "There is no item for this index";
    } else if (index === 0) {
      //if the index is 0, remove the head
      this.listHead = this.listHead.nextNode;
    } else {
      //otherwise, find the node at the given index
      let currentNode = this.listHead;
      let currentIndex = 0;
      while (currentIndex < index - 1) {
        currentNode = currentNode.nextNode;
        currentIndex++;
      }
      //remove the node
      currentNode.nextNode = currentNode.nextNode.nextNode;
      if (currentNode.nextNode === null) {
        this.listTail = currentNode;
      }
    }
  }
}

// node constructor, nodes store a value and a pointer to the next node
class Node {
  constructor(key, value = null, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

//export the LinkedList class to be imported by another js file
module.exports = LinkedList;
