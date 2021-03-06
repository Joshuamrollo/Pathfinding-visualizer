export function Astar(startNode, endNode, nodes) {
    const visitedNodesInOrder = [];
      
    startNode.distance = 0;
    startNode.estimatedDistanceToEnd = calculateManhattanDistance(startNode, endNode);
      
    const nodesToVisit = new MinHeap([startNode]);
      
    while(!nodesToVisit.isEmpty()){
        const currentMinDistanceNode = nodesToVisit.remove();
        visitedNodesInOrder.push(currentMinDistanceNode);

        if(currentMinDistanceNode === endNode) break;
          
        const neighbors = getNeighboringNodes(currentMinDistanceNode, nodes);
        for(const neighbor of neighbors) {
            if(neighbor.isWall === true) continue;
              
            const tentativeDistanceToNeighbor = currentMinDistanceNode.distance + 1;
          
            if(tentativeDistanceToNeighbor >= neighbor.distance) continue;
          
            neighbor.previousNode = currentMinDistanceNode;
            neighbor.distance = tentativeDistanceToNeighbor;
            neighbor.estimatedDistanceToEnd = tentativeDistanceToNeighbor + calculateManhattanDistance(neighbor, endNode);
            
            if(!nodesToVisit.containsNode(neighbor)) {
                nodesToVisit.insert(neighbor);
            } else {
                nodesToVisit.update(neighbor);
            }
        }
    }
      
    return visitedNodesInOrder;
}
  
function calculateManhattanDistance(currentNode, endNode){
    const currentRow = currentNode.row;
    const currentCol = currentNode.col;
    const endRow = endNode.row;
    const endCol = endNode.col;
      
    return Math.abs(currentRow - endRow) + Math.abs(currentCol - endCol);
}
  
function getNeighboringNodes(node, nodes){
    const neighbors = [];
      
    const numRows = nodes.length;
    const numCols = nodes[0].length;
      
    const row = node.row;
    const col = node.col;
      
    if(row < numRows - 1) {
        neighbors.push(nodes[row + 1][col]);
    }
      
    if(row > 0){
        neighbors.push(nodes[row - 1][col]);
    }
      
    if(col < numCols - 1) {
        neighbors.push(nodes[row][col + 1]);
    }
      
    if(col > 0){
        neighbors.push(nodes[row][col - 1]);
    }
      
    return neighbors;
}
  
class MinHeap {
    constructor(array) {
        this.nodePositionsInHeap = array.reduce((obj, node, i) => {
            obj[node.id] = i;
            return obj;
        }, {});
        this.heap = this.buildHeap(array);
    }
      
    isEmpty() {
        return this.heap.length === 0;
    }
      
    buildHeap(array){
        const firstParentIdx = Math.floor((array.length - 2) / 2);
        for(let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
            this.siftDown(currentIdx, array.length - 1, array);
        }
        return array;
    }
      
    siftDown(currentIdx, endIdx, heap){
        let childOneIdx = currentIdx * 2 + 1;
        while(childOneIdx <= endIdx) {
            const childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
            let idxToSwap;
            if(childTwoIdx !== -1 && heap[childTwoIdx].estimatedDistanceToEnd < heap[childOneIdx].estimatedDistanceToEnd) {
                idxToSwap = childTwoIdx;
            } else{
                idxToSwap = childOneIdx;
            }
            if(heap[idxToSwap].estimatedDistanceToEnd < heap[currentIdx].estimatedDistanceToEnd) {
                this.swap(currentIdx, idxToSwap, heap);
                currentIdx = idxToSwap;
                childOneIdx = currentIdx * 2 + 1;
            } else {
                return;
            }
        }
    }
      
    siftUp(currentIdx, heap){
        let parentIdx = Math.floor((currentIdx - 1) / 2);
        while(currentIdx > 0 && heap[currentIdx].estimatedDistanceToEnd < heap[parentIdx].estimatedDistanceToEnd) {
            this.swap(currentIdx, parentIdx, heap);
            currentIdx = parentIdx;
            parentIdx = Math.floor((currentIdx - 1) / 2);
        }
    }
      
    remove() {
        if(this.isEmpty()) return;
          
        this.swap(0, this.heap.length - 1, this.heap);
        const node = this.heap.pop();
        delete this.nodePositionsInHeap[node.id];
        this.siftDown(0, this.heap.length - 1, this.heap);
        return node;
    }
      
    insert(node) {
        this.heap.push(node);
        this.nodePositionsInHeap[node.id] = this.heap.length - 1;
        this.siftUp(this.heap.length - 1, this.heap);
    }
      
    swap(i, j, heap){
        this.nodePositionsInHeap[this.heap[i].id] = j;
        this.nodePositionsInHeap[this.heap[j].id] = i;
        const temp = heap[j];
        heap[j] = heap[i];
        heap[i] = temp;
    }
      
    containsNode(node){
        return node.id in this.nodePositionsInHeap;
    }
      
    update(node){
        this.siftUp(this.nodePositionsInHeap[node.id], this.heap);
    }
}