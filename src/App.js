import { useEffect } from 'react';
import './App.css';


function App() {

  useEffect(() => {
    tg.ready();
  },[])


  return (
    <div className="App">
      good 
      <button onClick={onClose}>закрыть</button>
    </div>
  );
}

export default App;
