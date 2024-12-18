import React, { useEffect} from 'react'
import {getCurrentUser} from '../apicalls/userapi';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../redux/loadersSlice';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({children}) {

    const user = useSelector((state)=> state.user.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchUser = async() => {
            dispatch(showLoading);
            try{
                const response = await getCurrentUser();
                if(response.success){
                    dispatch(hideLoading)
                    if(user._id !==response.user._id){
                        localStorage.removeItem('token');
                        navigate('/login');
                    }
                }
            } catch(error){
                console.log(error);
            }
        }
        if(localStorage.getItem('token')){
            fetchUser();
        }else{
            navigate('/login')
        }
    }, [])


  return (
    <div>
        {children}
    </div>
  )
}

export default ProtectedRoute