import {useSelector } from 'react-redux';
function Home() {

    const user = useSelector((state)=> state.user.user);

  return (
    <div>
        {user.email}
    </div>
  )
}
export default Home