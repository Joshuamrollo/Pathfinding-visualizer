export function depthFirstSearch(nodes, row, col){
    let visitedNodesInOrder = [];

    dfs(nodes, row, col, visitedNodesInOrder, null, false);

    return visitedNodesInOrder;
}

function dfs(nodes, row, col, visitedNodesInOrder, previous, found){
    let directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];

    if(row < 0 || row >= nodes.length || col < 0 || col >= nodes[0].length){
        return;
    }else if(nodes[row][col].isVisited || nodes[row][col].isWall){
        return;
    }

    nodes[row][col].previousNode = previous;
    nodes[row][col].isVisited = true;
    if(nodes[row][col].isFinish) found = true;

    visitedNodesInOrder.push(nodes[row][col]);

    for(let dir of directions){
        if(!found){
            found = dfs(nodes, row + dir[0], col + dir[1], visitedNodesInOrder, nodes[row][col], found);
        }
    }
    return found;
}