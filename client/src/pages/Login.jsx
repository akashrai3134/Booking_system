import React, { useEffect } from 'react'
import {Form , Input , Button, message} from 'antd'
import {Link} from 'react-router-dom';
import { loginUser } from '../apicalls/userapi';
import { useSelector, useDispatch  } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onsubmit = async (value) => {
        try{
            const response = await loginUser(value);
            console.log(response);
            

            if(response.success){
                message.success(response.message);
                localStorage.setItem('token', response.token);
                dispatch(setUser(response.user));
                navigate('/');

            }else{
                message.error(response.message);
            }
        }catch(error){
            message.error(error.message);
        }
    }

    useEffect(()=>{
        if(localStorage.getItem('token')){
            navigate('/home');
        }
    }, [])
  return (
     <>
      <header className="App-header">
        <main className="main-area mw-500 text-center px-3">
          <section className="left-section">
            <h1>Welcome back to BookMyShow</h1>
          </section>
          <section className="right-section">
            <Form layout="vertical" onFinish={onsubmit}>
              <Form.Item
                label="Email"
                name="email"
                className="d-block"
                rules={[{ required: true, message: "Email is required!" }]}
              >
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter your email"
                  autoComplete="username"
                ></Input>
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                className="d-block"
                rules={[{ required: true, message: "Password is required!" }]}
              >
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter the password"
                  autoComplete="current-password"
                ></Input>
              </Form.Item>
              <Form.Item>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
            <div>
              <p>
                Not registered yet? <Link to="/register">Register now</Link>
              </p>
            </div>
          </section>
        </main>
      </header>
     </>
  )
}
export default Login