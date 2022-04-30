const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    this.rootNode = addNode(this.rootNode, data);

    function addNode(node, value) {
      if (!node) {
        return new Node(value);
      }

      if (node.data === value) {
        return node;
      }

      if (value < node.data) {
        node.left = addNode(node.left, value);
      } else {
        node.right = addNode(node.right, value);
      }

      return node;
    }
  }

  has(data) {
    return searchNode(this.rootNode, data);
    function searchNode(node, value) {
      if (!node) {
        return false;
      }

      if (node.data === value) {
        return true;
      }

      return value < node.data
        ? searchNode(node.left, value)
        : searchNode(node.right, value);
    }
  }

  find(data) {
    return searchNode(this.rootNode, data);
    function searchNode(node, value) {
      if (!node) {
        return null;
      }

      if (node.data === value) {
        return node;
      }

      return value < node.data
        ? searchNode(node.left, value)
        : searchNode(node.right, value);
    }
  }

  remove(data) {
    this.rootNode = removeNode(this.rootNode, data);

    function minNode(node) {
      let currentNode = node;
      while (currentNode.left) {
        currentNode = currentNode.left;
      }
      return currentNode.data;
    }

    function removeNode(node, value) {
      if (node) {
        if (value < node.data) {
          node.left = removeNode(node.left, value);
        } else if (value > node.data) {
          node.right = removeNode(node.right, value);
        } else if (node.left && node.right) {
          node.data = minNode(node.right);
          // console.log(node.right.min());
          node.right = removeNode(node.right, node.data);
        } else {
          node = node.left || node.right;
        }
        return node;
      }
      return node;
    }
  }

  min() {
    let currentNode = this.rootNode;
    while (currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode.data;
  }

  max() {
    let currentNode = this.rootNode;
    while (currentNode.right) {
      currentNode = currentNode.right;
    }
    return currentNode.data;
  }
}

const tree = new BinarySearchTree();
tree.add(9);
tree.add(14);
tree.add(2);
tree.add(6);
tree.add(128);
tree.add(8);
tree.add(31);
tree.add(54);
tree.add(1);
tree.remove(14);
tree.remove(8);
tree.remove(9);
console.log(tree);
console.log(tree.has(2));
// console.log(tree.find(2));
// console.log(tree.has(5));
// console.log(tree.find(5));

module.exports = {
  BinarySearchTree,
};
