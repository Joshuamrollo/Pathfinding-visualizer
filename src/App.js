import Pathfinding from './Pathfinding/Pathfinding';
import {Helmet} from 'react-helmet';
import './App.css';

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>Pathfinding Visualizer</title>
      </Helmet>
      <Pathfinding />
    </div>
  );
}

export default App;
