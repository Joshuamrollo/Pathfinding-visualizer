import React, {useState, useEffect} from 'react';
import { dijkstras, getNodesInShortestPathOrder } from './Algorithms/Dijkstras';
import { depthFirstSearch } from './Algorithms/DepthFirstSearch';
import { breadthFirstSearch } from './Algorithms/BreadthFirstSearch';
import { Astar } from './Algorithms/Astar';
import { RecursiveBacktracking } from './Algorithms/RecursiveBacktracking';
import Node from './Node/Node';

import './Pathfinding.css';

const START_ROW = 13;
const START_COL = 20;
const END_ROW = 13;
const END_COL = 50;

function Pathfinding() {
    const [nodes, setNodes] = useState([]);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [algorithm, SetAlgorithm] = useState('Breadth First Search');
    //const [animating, setAnimating] = useState(false);
    

    useEffect(() => {
        const emptyBoard = [];
        for(let row = 0; row < 29; row++){
            const currentRow = [];
            for(let col = 0; col< 73; col++){
                currentRow.push(createNode(col, row));
            }
            emptyBoard.push(currentRow);
        }
        setNodes(emptyBoard);
        setHasLoaded(true);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const emptyBoard = () => {
        const emptyBoard = [];
        for(let row = 0; row < 29; row++){
            const currentRow = [];
            for(let col = 0; col< 73; col++){
                currentRow.push(createNode(col, row));
                if(col === START_COL && row === START_ROW){
                    document.getElementById(`node-${row}-${col}`).className = 'node node-start';
                }else if(col === END_COL && row === END_ROW){
                    document.getElementById(`node-${row}-${col}`).className = 'node node-finish';
                }else{
                    document.getElementById(`node-${row}-${col}`).className = 'node';
                }
            }
            emptyBoard.push(currentRow);
        }
        setNodes(emptyBoard);
    }

    const createNode = (col, row) => {
        return {
            col,
            row,
            id: row.toString() + '-' + col.toString(),
            isStart: row === START_ROW && col === START_COL,
            isFinish: row === END_ROW && col === END_COL,
            distance: Infinity,
            estimatedDistanceToEnd: Infinity,
            isVisited: false,
            isPath: false,
            isWall: false,
            previousNode: null,
        }
    }

    const handleMouseDown = (row, col) => {
        const newNodes = AddWall(nodes, row, col);
        setMouseIsPressed(true);
        setNodes(newNodes);
    }

    const handleMouseEnter = (row, col) => {
        if(mouseIsPressed) {
            const newNodes = AddWall(nodes, row, col);
            setNodes(newNodes);
        }
    }

    const handleMouseUp = () => {
        setMouseIsPressed(false);
    }

    const AddWall = (nodes, row, col) => {
        const newNodes = nodes.slice();
        const node = newNodes[row][col];
        const newNode = {
            ...node,
            isWall: !node.isWall,
        };
        newNodes[row][col] = newNode;
        return newNodes;
    }

    const animateDijkstras = () => {
        const start = nodes[START_ROW][START_COL];
        const finish = nodes[END_ROW][END_COL];
        nodes[START_ROW][START_COL].isWall = false;
        const visitedNodesInOrder = dijkstras(nodes, start, finish);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finish);
        for(let i = 0; i <= visitedNodesInOrder.length; i++) {
            if(i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
                node.isVisited = true;
            }, 10 * i);
        }
    }

    const animateDfs = () => {
        const finish = nodes[END_ROW][END_COL];
        nodes[START_ROW][START_COL].isWall = false;
        const visitedNodesInOrder = depthFirstSearch(nodes, START_ROW, START_COL);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finish);
        for(let i = 0; i <= visitedNodesInOrder.length; i++) {
            if(i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
                node.isVisited = true;
            }, 10 * i);
        }
    }

    const animateBfs = () => {
        const start = nodes[START_ROW][START_COL];
        const finish = nodes[END_ROW][END_COL];
        nodes[START_ROW][START_COL].isWall = false;
        const visitedNodesInOrder = breadthFirstSearch(nodes, start);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finish);
        for(let i = 0; i <= visitedNodesInOrder.length; i++) {
            if(i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
                node.isVisited = true;
            }, 10 * i);
        }
    }

    const animateAstar = () => {
        const start = nodes[START_ROW][START_COL];
        const finish = nodes[END_ROW][END_COL];
        nodes[START_ROW][START_COL].isWall = false;
        const visitedNodesInOrder = Astar(start, finish, nodes);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finish);
        for(let i = 0; i <= visitedNodesInOrder.length; i++) {
            if(i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
                node.isVisited = true;
            }, 10 * i);
        }
    }

    const animateShortestPath = (nodesInShortestPathOrder) => {
        for(let i = 0; i < nodesInShortestPathOrder.length; i++){
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path'
                node.isPath = true;
            }, 25 * i);
        }
    }

    const animateRecursiveBacktracking = () => {
        const finish = nodes[END_ROW][END_COL];
        let wallNodes = setAllNodesToWalls();
        let [mazeNodesInOrder, newNodes] = RecursiveBacktracking(finish, wallNodes);
        console.log(mazeNodesInOrder);
        setNodes(newNodes);
    }

    const setAllNodesToWalls = () => {
        let newNodes = [...nodes];
        for(let row of newNodes){
            for(let node of row){
                node.isWall = true;
            }
        }
        return newNodes;
    }

    const handleDropdown = (e) => {
        SetAlgorithm(e.target.value);
    }

    const visualizeAlgorithm = () => {
        if(algorithm === 'Depth First Search')animateDfs();
        if(algorithm === 'Breadth First Search')animateBfs();
        if(algorithm === 'Dijkstras')animateDijkstras();
        if(algorithm === 'A Star')animateAstar();
    }

    return hasLoaded ? (
        <div className='main-container'>
            <div className='navbar'>
                <div className='title'>Pathfinding Visualizer</div>
                <div className='nav-items'>
                    <button onClick={() => animateRecursiveBacktracking()} className='maze'>Generate Maze</button>
                    <select className='dropdown' value={algorithm} onChange={(e) => handleDropdown(e)}>
                        <option value='Dijkstras' className='options'>Dijkstras</option>
                        <option value='Depth First Search' className='options'>Depth First Search</option>
                        <option value='Breadth First Search' className='options'>Breadth First Search</option>
                        <option value='A Star' className='options'>A Star</option>
                    </select>
                    <button onClick={() => visualizeAlgorithm()} className='visualize'>Visualize Algorithm</button>
                    <button onClick={() => emptyBoard()} className='empty'>EmptyBoard</button>
                </div>
            </div>
            <div className='board'>
                {nodes.map((row, rowIdx) => {
                    return(
                        <div key={rowIdx}>
                            {row.map((node, nodeIdx) => {
                                return(<Node
                                    key={nodeIdx}
                                    row={node.row}
                                    col={node.col}
                                    isStart={node.isStart}
                                    isFinish={node.isFinish}
                                    isWall={node.isWall}
                                    isVisited={node.isVisited}
                                    isPath={node.isPath}
                                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                                    onMouseUp={handleMouseUp}
                                    ></Node>)
                            })}
                        </div>    
                    )
                })}
            </div>
        </div>
    ) : (<div>loading</div>)
}

export default Pathfinding;
