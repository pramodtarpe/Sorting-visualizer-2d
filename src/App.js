import Canvas from './Components/Canvas/Canvas';
import Banner from './Components/UI/Banner/Banner';
import Card from './Components/UI/Card/Card';

function App() {
  return (
    <div className="App">
      <Card>
        <Banner type="h2">Sorting Visualizer for Images</Banner>
      </Card>
      <Card>
        <Canvas/>
      </Card>
    </div>
  );
}

export default App;
