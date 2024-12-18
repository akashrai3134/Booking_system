import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showLoading, hideLoading } from '../redux/loadersSlice';
function Home() {

    const navigate = useNavigate();
    const dispatch  = useDispatch();

    const handleOnClick = ()=>{
        dispatch(showLoading);
        localStorage.removeItem('token');
        navigate('/login');
        dispatch(hideLoading);
    }

  return (
    <div>
        <button className='center-class' onClick={handleOnClick}>logout</button>
    </div>
  )
}
export default Home