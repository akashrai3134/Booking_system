import './App.css';
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import {Spin} from 'antd'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector  } from 'react-redux';
import ProtectedRoute from './component/ProtectedRoute';
import Profile from './pages/Profile';
import Admin from './pages/Admin';

function App() {

  const loading = useSelector((state)=> state.loader.loading);

  const user = useSelector((state)=> state.user.user);
  console.log(user);

  
  return (
    <div>
        {loading && (
          <div className="spinner-overlay"> 
            <Spin size="large" />
          </div>
        )}
        <BrowserRouter>
         <Routes>
         <Route path='/home' element={<ProtectedRoute><Home/></ ProtectedRoute>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/register' element={<Register/>}/>
         <Route path='/admin' element={<ProtectedRoute><Admin/></ProtectedRoute>}/>
         <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
         </Routes>
        </BrowserRouter>
    </div>
  );
}
export default App;