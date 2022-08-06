import {Route, Routes} from 'react-router-dom';
import { Signup } from './pages/Signup';
import {AuthProvider} from './contexts/AuthContext';
import { PrivateRoute } from './components/routes/PrivateRoute';
import {Login} from './pages/Login';
import { Account } from './pages/Account';
function App() {
  return (
    <AuthProvider>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/account" element={(<PrivateRoute><Account/></PrivateRoute>)}/>
        </Routes>
    </AuthProvider>
    
  );
}

export default App;
