import React, { useEffect} from 'react'
import {getCurrentUser} from '../apicalls/userapi';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../redux/loadersSlice';
import { setUser } from '../redux/userSlice';
import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu, message } from "antd";
import { Header } from "antd/es/layout/layout";
import {
    HomeOutlined,
    UserOutlined,
    ProfileOutlined,
    LogoutOutlined,
  } from "@ant-design/icons";



function ProtectedRoute({children}) {

    const user = useSelector((state)=> state.user.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const navItems = [
        {
          label: "Home",
          icon: <HomeOutlined />,
        },
        {
            label: `${user ? user.name : " "}`,
            icon: <UserOutlined />,
            children: [
              {
                label: (
                    <span
                      onClick={() => {
                        user.isAdmin ? navigate("/admin") : navigate("/profile");
                      }}
                    >
                      My Profile
                    </span>
                  ),
                icon: <ProfileOutlined />,
              },
              {
                label: (
                  <Link to="/login" onClick={() => localStorage.removeItem("token")}>
                    Log out
                  </Link>
                ),
                icon: <LogoutOutlined />,
              },
            ],
          },
        ];


    useEffect(()=>{
        const fetchUser = async() => {
            try{
                dispatch(showLoading);
                const response = await getCurrentUser();
                if(response.success){
                    dispatch(hideLoading)
                    dispatch(setUser(response.user));
                }else{
                    dispatch(setUser(null));
                    message.error(response.message);
                    dispatch(hideLoading);
                }
            } catch(error){
                dispatch(hideLoading);
                dispatch(setUser(null));
                message.error(error.message);
            }
        }
        if(localStorage.getItem('token')){
            fetchUser();
        }else{
            navigate('/login')
        }
    }, [])


  return (
    user && (
        <>
          <Layout>
            <Header
              className="d-flex justify-content-between"
              style={{
                position: "sticky",
                top: 0,
                zIndex: 1,
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>
                Book My Show
              </h3>
              <Menu theme="dark" mode="horizontal" items={navItems}></Menu>
            </Header>
            <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
              {children}
            </div>
          </Layout>
        </>
      )
  )
}

export default ProtectedRoute