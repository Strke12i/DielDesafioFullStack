import './App.css';
import { useAuth } from './context/AuthContext';
import { HashRouter } from 'react-router-dom';
import { Login } from './components/Login';

const App = () => {
  const { authState } = useAuth();
  return (
    <HashRouter>
      <div className="App">
      {
        authState?.authenticated  ? (
          <h1>Welcome</h1>
        ) : (
          <Login />
        )
      }
    </div>
    </HashRouter>
    
  );
}


export default App;
