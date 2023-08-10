import NavBar from './Components/NavBar/NavBar';
import PageNav from './Components/Pages/PageNav';
import { BrowserRouter as Router } from 'react-router-dom';
import UserDisplay, {UserType} from './Components/UserData/UserDisplay';
import { manageUser } from './App';

function UserPage(props:manageUser){
    return(
        <div className='flex'>
      <Router>
        <NavBar/>
        <PageNav/>
        {/* <UserDisplay firstName = "Andrei" lastName='Voinea' id = "1" type = {UserType.Utilizator} callback = {props.callback}/> */}
      </Router>     
    </div> 
    )
}

export default UserPage;