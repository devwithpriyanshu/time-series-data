import './App.css';
import DataInputForm from './DataInputForm';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import ShowCharts from './ShowCharts';

function App() {

  

  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DataInputForm/>}/>
        <Route path='/charts' element={<ShowCharts/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
