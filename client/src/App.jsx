import './App.css';
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import {Spin} from 'antd'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector, useDispatch  } from 'react-redux';
import { showLoading, hideLoading } from './redux/loadersSlice'
import ProtectedRoute from './component/ProtectedRoute';

function App() {

  // const {loading} = useSelector((state)=> state.loader);
  const loading = useSelector((state)=> state.loader.loading);
  console.log('loading', loading);
  // const dispatch = useDispatch();

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
         <Route path='/' element={<ProtectedRoute><Home/></ ProtectedRoute>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/register' element={<Register/>}/>
         </Routes>
        </BrowserRouter>
    </div>
  );
}
export default App;