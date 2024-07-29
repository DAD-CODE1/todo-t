import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Main from './components/Main';
import { Routes , Route } from 'react-router-dom';
function App() {
  return (
    <div>
      
      <Routes>
        <Route path='/' element={<Register/>} />
        <Route path='login' element={<Login/>} />
        <Route path='main' element={<Main/>} />
      </Routes>
    </div>
  );
}

export default App;
