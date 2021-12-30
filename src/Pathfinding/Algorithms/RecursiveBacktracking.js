export function RecursiveBacktracking(endNode, nodes){
    let mazeNodesInOrder = [];
    [mazeNodesInOrder, nodes] = backtracking(endNode, nodes, mazeNodesInOrder);
    return [mazeNodesInOrder, nodes];
}

function backtracking(currentNode, nodes, mazeNodesInOrder){
    let directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    currentNode.isWall = false;
    mazeNodesInOrder.push(currentNode);

    let dir = [0,1,2,3];

    do{
        let num = Math.floor(Math.random() * dir.length);
        let roll = dir.splice(num, 1);

        const invalidRow = currentNode.row + directions[roll[0]][0] >= nodes.length - 1 || currentNode.row + directions[roll[0]][0] < 1;
        const invalidCol = currentNode.col + directions[roll[0]][1] >= nodes[0].length - 1 || currentNode.col + directions[roll[0]][1] < 1;
        if(invalidRow || invalidCol) continue;
        if(!nodes[currentNode.row + directions[roll[0]][0]][currentNode.col + directions[roll[0]][1]].isWall) continue;
        let check = true;
        if(roll[0] === 0) check = checkUp(nodes[currentNode.row + directions[roll[0]][0]][currentNode.col + directions[roll[0]][1]], nodes);
        if(roll[0] === 1) check = checkRight(nodes[currentNode.row + directions[roll[0]][0]][currentNode.col + directions[roll[0]][1]], nodes);
        if(roll[0] === 2) check = checkDown(nodes[currentNode.row + directions[roll[0]][0]][currentNode.col + directions[roll[0]][1]], nodes);
        if(roll[0] === 3) check = checkLeft(nodes[currentNode.row + directions[roll[0]][0]][currentNode.col + directions[roll[0]][1]], nodes);
        if(!check) continue;
        let isAvailable = checkAvailable(currentNode, nodes[currentNode.row + directions[roll[0]][0]][currentNode.col + directions[roll[0]][1]], nodes);
        if(!isAvailable) continue;
        [mazeNodesInOrder, nodes] = backtracking(nodes[currentNode.row + directions[roll[0]][0]][currentNode.col + directions[roll[0]][1]], nodes, mazeNodesInOrder);
    }while(dir.length > 0);
    return [mazeNodesInOrder, nodes];
}

function checkAvailable(currentNode, targetNode, nodes){
    let directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    for(let dir of directions){
        const invalidRow = targetNode.row + dir[0] >= nodes.length || targetNode.row + dir[0] < 0;
        const invalidCol = targetNode.col + dir[1] >= nodes[0].length || targetNode.col + dir[1] < 0;
        if(!invalidRow && !invalidCol){
            if(!nodes[targetNode.row + dir[0]][targetNode.col + dir[1]].isWall && nodes[targetNode.row + dir[0]][targetNode.col + dir[1]] !== currentNode){
                return false;
            }
        }
    }
    return true;
}

function checkUp(targetNode, nodes){
    let directions = [[1, 1], [-1, 1]];
    for(let dir of directions){
        const invalidRow = targetNode.row + dir[0] >= nodes.length || targetNode.row + dir[0] < 0;
        const invalidCol = targetNode.col + dir[1] >= nodes[0].length || targetNode.col + dir[1] < 0;
        if(!invalidRow && !invalidCol){
            if(!nodes[targetNode.row + dir[0]][targetNode.col + dir[1]].isWall){
                return false;
            }
        }
    }
    return true;
}

function checkRight(targetNode, nodes){
    let directions = [[1, 1], [1, -1]];
    for(let dir of directions){
        const invalidRow = targetNode.row + dir[0] >= nodes.length || targetNode.row + dir[0] < 0;
        const invalidCol = targetNode.col + dir[1] >= nodes[0].length || targetNode.col + dir[1] < 0;
        if(!invalidRow && !invalidCol){
            if(!nodes[targetNode.row + dir[0]][targetNode.col + dir[1]].isWall){
                return false;
            }
        }
    }
    return true;
}

function checkDown(targetNode, nodes){
    let directions = [[1, -1], [-1, -1]];
    for(let dir of directions){
        const invalidRow = targetNode.row + dir[0] >= nodes.length || targetNode.row + dir[0] < 0;
        const invalidCol = targetNode.col + dir[1] >= nodes[0].length || targetNode.col + dir[1] < 0;
        if(!invalidRow && !invalidCol){
            if(!nodes[targetNode.row + dir[0]][targetNode.col + dir[1]].isWall){
                return false;
            }
        }
    }
    return true;
}

function checkLeft(targetNode, nodes){
    let directions = [[-1, -1], [-1, 1]];
    for(let dir of directions){
        const invalidRow = targetNode.row + dir[0] >= nodes.length || targetNode.row + dir[0] < 0;
        const invalidCol = targetNode.col + dir[1] >= nodes[0].length || targetNode.col + dir[1] < 0;
        if(!invalidRow && !invalidCol){
            if(!nodes[targetNode.row + dir[0]][targetNode.col + dir[1]].isWall){
                return false;
            }
        }
    }
    return true;
}