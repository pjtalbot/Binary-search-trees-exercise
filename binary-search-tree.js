class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;


    
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

_traverse(node, data, order) {
    if (order == "pre") {
      data.push(node.val);
    }
    
    node.left && this._traverse(node.left);
    if (order === "in") {
      data.push(node.val)
    }
    node.right && this._traverse(node.right);
    if (order === "post") {
      data.push(node.val)
    }
  }
  



  insert(val) {

    if (this.root === null) {
      this.root = new Node(val)
      return this;
    }

    let current = this.root;
    while (true) {
      if (val < current.val) {
        if (current.left === null) {
          current.left = new Node(val);
          return this;
        } else {
          current = current.left;
        }
      } else if (val > current.val) {
        if (current.right === null) {
          current.right = new Node(val);
          return this;
        } else {
          current = current.right;
        }
      }
    }

  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, current = this.root) {
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }

    if (val < current.val) {
      if (current.left === null) {
        current.left = new Node(val);
        return this;
      }
      return this.insertRecursively(val, current.left);
    } else {
      if (current.right === null) {
        current.right = new Node(val);
        return this;
      }
      return this.insertRecursively(val, current.right);
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let currentNode = this.root;
    let found = false;

    if (val === currentNode.val) return currentNode;

    while (currentNode && !found) {
      if (val < currentNode.val) {
        currentNode = currentNode.left;
      } else if (val > currentNode.val) {
        currentNode = currentNode.right;
      } else {
        found = true;
      }
    }

    if (!found) return undefined;
    return currentNode;

  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, current = this.root) {
    if (this.root === null) return undefined;

    if (val < current.val) {
      if (current.left === null) return undefined;

      return this.findRecursively(val, current.left);
    } 
    
    else if (val > current.val) {
      if (current.right === null) return undefined;
      return this.findRecursively(val, current.right);
    }
    return current;

  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

   dfsPreOrder() {
    let data = [];
    let current = this.root;

    function traverse(node) {
      data.push(node.val); // visit
      node.left && traverse(node.left); // go left if there's a left
      node.right && traverse(node.right); // go right if there's a right
    }

    traverse(current);
    return data;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

   dfsInOrder() {
    let data = [];
    let current = this.root;

    function traverse(node) {
      node.left && traverse(node.left); // go left if there's a left
      data.push(node.val); // visit
      node.right && traverse(node.right); // go right if there's a right
    }

    traverse(current);
    return data;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

   dfsPostOrder() {
    let data = [];
    let current = this.root;

    function traverse(node) {
      node.left && traverse(node.left); // go left if there's a left
      node.right && traverse(node.right); // go right if there's a right
      data.push(node.val); // visit
    }

    traverse(current);
    return data;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {

    let node = this.root;
    let queue = [];
    let data = [];

    queue.push(node);

    while (queue.length) {
      node = queue.shift();
      data.push(node.val);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }

    return data;

  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    let removedNode = this.root;

    let parentNode;

    // trouble returning the correct value with a linked list length of 1

    // remove › remove should correctly remove a node with one child

    // expect(received).toBe(expected) // Object.is equality

    // Expected: 5
    // Received: 1

    //   189 |
    //   190 |     binarySearchTree.remove(1);
    // > 191 |     expect(binarySearchTree.root.left.left.val).toBe(5);
    //       |                                                 ^
    //   192 |     expect(binarySearchTree.root.left.left.left).toBe(null);
    //   193 |     expect(binarySearchTree.root.left.left.right).toBe(null);
    // //   194 |

    //   at Object.<anonymous> (binary-search-tree.test.js:191:49)

    while (removedNode.val !== val) {
      parentNode = removedNode;
      val < removedNode.val ?  removedNode = removedNode.left : removedNode = removedNode.right
    }

    if (removedNode !== this.root) {
      if (removedNode.right === null && removedNode.left === null) {
        (parentNode.left === removedNode) ? parentNode.left = null : parentNode.right = null
      } else if (removedNode.left !== null && removedNode.right !== null) {
        let rightParent = removedNode
        let right = removedNode.right
        if (right.left === null) {
          right.left = removedNode.left
          parentNode.left === removedNode ? parentNode.left = right : parentNode.right = right
        } else {
          while (right.left !== null) {
            rightParent = right;
            right = right.left
          }
          parentNode.left === removedNode ? parentNode.left.val = right.val : parentNode.right.val = right.val
          right.right !== null ? rightParent.left = right.right : rightParent.left = null
        }
      } else {
        if (parentNode.left === removedNode) {
          removedNode.right === null ? parentNode.left = removedNode.left : parentNode.left = removedNode.right;
        } else {
          removedNode.right === null ? parentNode.right = removedNode.left : parentNode.right = removedNode.right
        }
      }
    }
    return removedNode;



//     x === 5 ? 
//   y === 5 ? console.log('x=5, y=5') :
//   y === 4 ? console.log('x=5, y=4') :
//   y === 3 ? console.log('x=5, y=3') : null
// : null

  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced(current=this.root) { 
    if (current === null) return;
    
    function minDepth(current) {
      if (current === null) return 0
      return 1 + Math.min(minDepth(current.left), minDepth(current.right))
    }
    function maxDepth(current) {
      if (current === null) return 0
      return 1 + Math.max(maxDepth(current.left), maxDepth(current.right))
    }

    return maxDepth(current) - minDepth(current) <= 1 

     

  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    
  }

  dfsInOrderIterative() {
    let cur = this.root;
    let stack = [];
    let dfs = [];
    while (stack.length > 0 || cur) {
      while (cur) {
        stack.push(cur);
        cur = cur.left;
      }
      cur = stack.pop();
      if (cur) {
        dfs.push(cur.val);
        cur = cur.right;
      }
    }
    return dfs;
  }
}

module.exports = BinarySearchTree;
