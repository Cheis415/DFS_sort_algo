// Not necessary to create node class for this problem, but convention
class Node {
  constructor(data = null) {
    this.data = data;
  }
}

class Graph {
  nodes = {};
  //array to store the root nodes
  start = [];
  //class method to insert objects from input array into nodes
  insert(data) {
    let node = new Node(data);
    if (data.parent_id === null) {
      this.start.push(node);
    } else {
      //if parent_id isn't present in nodes hash table then create a key with the node inside an array to account for multiple children else we push inside the value at that key
      !this.nodes[data.parent_id] ? this.nodes[data.parent_id] = [node] : this.nodes[data.parent_id].push(node);
    }
  } 
  //sorting algo with DFS using recursion to sort children to parents
  sort() {
    const output = []; 
    //iterate through start array containing the root nodes
    for (let node of this.start) {

      function findChildren(parent, nodes) {
        //condition to break recursive loop
        if (!parent) return;

        output.push(parent.data);
        //accesses children by the parents id, being the parent_id
        let children = nodes[parent.data.id];

        if (children) {
          //iterate through the array of children
          for (let child of children) {
            //recuresive loop to find all children
            findChildren(child, nodes);
          }
        }
      }
      //recuresive loop to find all parents
      findChildren(node, this.nodes);
    }
    return output;
  }
}

function sortCategoriesForInsert(inputJson) {
  const graph = new Graph();
  for (let data of inputJson) {
    graph.insert(data); 
  }
  const properJson = graph.sort();
  return JSON.stringify(properJson);
}

sortCategoriesForInsert(input);

module.exports = { Graph, Node, sortCategoriesForInsert };
