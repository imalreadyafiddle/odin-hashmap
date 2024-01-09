//creates a hash map data structure to store keys and hashed values
//this implementation will limit itself to an array of size 16 buckets initially
//capacity is the total number of buckets we currently have.
//keeping track of this will let us know if our map has reeached a specific load factor of 0.75
//the map will resize itself when this load factor is reached by adding new buckets as necessary
//any time that a bucket is accessed via an index, we should perform a quick check to make sure the index is within range

// node constructor, nodes store a value and a pointer to the next node
class Node {
  constructor(key, value = null, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class HashMap {
  constructor(capacity = 16) {
    this.bucketsArray = new Array(capacity).fill(null);
    this.loadFactor = 0.75;
    this.capacity = capacity;
    this.occupiedBuckets = 0;
  }

  //hash function
  //takes a key and returns a hash value
  hash(key) {
    let hashKey = 0;
    const prime = 11;
    for (let i = 0; i < key.length; i += 1) {
      hashKey += key.charCodeAt(i) * prime;
    }
    return hashKey % this.bucketsArray.length;
  }

  //resize function
  //doubles the capacity of the map and rehashes all of the keys
  //this will be called when the load factor is reached
  resize() {
    this.capacity *= 2;
    const newBucketsArray = new Array(this.capacity).fill(null);
    this.bucketsArray.forEach((node) => {
      if (node !== null) {
        let currentNode = node;
        while (currentNode !== null) {
          const bucket = this.hash(currentNode.key);
          if (newBucketsArray[bucket] === null) {
            newBucketsArray[bucket] = new Node(
              currentNode.key,
              currentNode.value
            );
          } else {
            let newNode = newBucketsArray[bucket];
            while (newNode.next !== null) {
              newNode = newNode.next;
            }
            newNode.next = new Node(currentNode.key, currentNode.value);
          }
          currentNode = currentNode.next;
        }
      }
    });
    this.bucketsArray = newBucketsArray;
  }

  //accepts a key and a value, if the key exists in the map already, it will update the value
  //resolves collisions by chaining
  //if the key does not exist, it will add the key-value pair to the map
  //will increase the number of buckets if the load factor is reached
  set(key, value) {
    const loadFactor = (this.occupiedBuckets + 1) / this.capacity;
    if (loadFactor > this.loadFactor) {
      this.resize();
    }
    const bucket = this.hash(key);
    if (this.bucketsArray[bucket] === null) {
      this.bucketsArray[bucket] = new Node(key, value);
      this.occupiedBuckets += 1;
    } else {
      let currentNode = this.bucketsArray[bucket];
      while (currentNode.next !== null && currentNode.key !== key) {
        currentNode = currentNode.next;
      }
      if (currentNode.key === key) {
        currentNode.value = value;
      } else {
        currentNode.next = new Node(key, value);
      }
    }
  }

  //accepts a key and returns the value associated with the key
  //returns null if the key does not exist
  get(key) {
    const bucket = this.hash(key);
    if (this.bucketsArray[bucket] === null) {
      return null;
    }
    let currentNode = this.bucketsArray[bucket];
    while (currentNode !== null && currentNode.key !== key) {
      currentNode = currentNode.next;
    }
    return currentNode !== null ? currentNode.value : null;
  }

  //accepts a key and returns true if the key exists in the map
  //checks the map for the key
  //returns true if the key exists in the map, false otherwise
  has(key) {
    const bucket = this.hash(key);
    if (this.bucketsArray[bucket] === null) {
      return false;
    }
    let currentNode = this.bucketsArray[bucket];
    while (currentNode !== null && currentNode.key !== key) {
      currentNode = currentNode.next;
    }
    return currentNode !== null;
  }

  remove(key) {
    const bucket = this.hash(key);
    if (this.bucketsArray[bucket] === null) {
      return false;
    }
    let currentNode = this.bucketsArray[bucket];
    let previousNode = null;
    while (currentNode !== null && currentNode.key !== key) {
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
    if (currentNode === null) {
      return false;
    }
    if (previousNode === null) {
      this.bucketsArray[bucket] = currentNode.next;
    } else {
      previousNode.next = currentNode.next;
    }
    this.occupiedBuckets -= 1;
    return true;
  }

  length() {
    return this.occupiedBuckets;
  }

  clear() {
    this.bucketsArray = new Array(this.capacity).fill(null);
    this.occupiedBuckets = 0;
  }

  keys() {
    const keys = [];
    for (let i = 0; i < this.bucketsArray.length; i += 1) {
      let currentNode = this.bucketsArray[i];
      while (currentNode !== null) {
        keys.push(currentNode.key);
        currentNode = currentNode.next;
      }
    }
    return keys;
  }
  values() {
    const values = [];
    for (let i = 0; i < this.bucketsArray.length; i += 1) {
      let currentNode = this.bucketsArray[i];
      while (currentNode !== null) {
        values.push(currentNode.value);
        currentNode = currentNode.next;
      }
    }
    return values;
  }
  entries() {
    const entries = [];
    for (let i = 0; i < this.bucketsArray.length; i += 1) {
      let currentNode = this.bucketsArray[i];
      while (currentNode !== null) {
        entries.push([currentNode.key, currentNode.value]);
        currentNode = currentNode.next;
      }
    }
    //make entries more readable
    let readableEntries = [];
    entries.forEach((entry) =>
      readableEntries.push("Key: " + entry[0] + " | Value: " + entry[1])
    );
    return readableEntries;
  }
}

console.log("\n");
//create a hash map
const map = new HashMap();
map.set("key1", 1);
console.log(map);
console.log(
  "Initial load level: " + (map.length() / map.capacity) * 100 + "%\n"
);
console.log("\nValue stored at key1: " + map.get("key1"));
console.log("Map contains Node with key of 'key1': " + map.has("key1")); //should return true
console.log("\nRemoving Node with key of 'key1'");
map.remove("key1");
console.log("Map contains Node with key of 'key1': " + map.has("key1")); //should return false

console.log("\nAdding 8 keys to the map...");

Array.from({ length: 8 }, (_, i) => {
  map.set("key" + i, i);
});

console.log("New load level: " + (map.length() / map.capacity) * 100 + "%\n");

console.log("New number of occupied buckets: " + map.length() + "\n");
console.log(map);
console.log("\n");

console.log("Clearing map...");
map.clear();
console.log("New number of occupied buckets: " + map.length() + "\n");
console.log(map);

console.log("\nRe-adding 8 keys to the map...");
Array.from({ length: 8 }, (_, i) => {
  map.set("key" + i, i);
});
console.log("New load level: " + (map.length() / map.capacity) * 100 + "%");

console.log("\nKeys contained in map: " + map.keys());
console.log("\nValues contained in map: " + map.values());
console.log("\nEntries contained in map:");
console.log(map.entries());
console.log("\n");

console.log("Adding an additional 56 keys to the map to force resize...\n");
Array.from({ length: 56 }, (_, i) => {
  map.set("key" + (i + 8), i);
});

console.log("New number of occupied buckets: " + map.length());
console.log("New max number of buckets: " + map.capacity + "\n");
console.log("New load level: " + (map.length() / map.capacity) * 100 + "%\n");
console.log("Entries contained in map:");
console.log(map.entries());
console.log("\n");
