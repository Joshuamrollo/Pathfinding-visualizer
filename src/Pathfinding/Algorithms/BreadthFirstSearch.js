export function breadthFirstSearch(nodes, start){
    let directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    const visitedNodesInOrder = [];
    const queue = [start];
    let found = false;
    while(queue.length > 0 && !found){
        const current = queue[0];
        queue.shift();
        visitedNodesInOrder.push(current);
        current.isVisited = true;
        if(current.isFinish){
            found = true;
            return visitedNodesInOrder;
        }
        for(const dir of directions){
            const invalidRow = current.row + dir[0] >= nodes.length || current.row + dir[0] < 0;
            const invalidCol = current.col + dir[1] >= nodes[0].length || current.col + dir[1] < 0;
            if(!invalidRow && !invalidCol){
                if(!nodes[current.row + dir[0]][current.col + dir[1]].isWall && !nodes[current.row + dir[0]][current.col + dir[1]].isVisited){
                    queue.push(nodes[current.row + dir[0]][current.col + dir[1]]);
                    nodes[current.row + dir[0]][current.col + dir[1]].isVisited = true;
                    nodes[current.row + dir[0]][current.col + dir[1]].previousNode = current;
                }
            }
        }
    }
    return visitedNodesInOrder;
}