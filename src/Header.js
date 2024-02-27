import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHomeLg, faSign, faUser, faPen, faPhone, faCake , faList, faArrowRightFromFile} from '@fortawesome/free-solid-svg-icons';
import './header.css'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Header = () => {
const dispatch=useDispatch()
 const ifUser =useSelector(state=>state.user);
 


  const Logout=()=>
  {    
    localStorage.setItem('user', JSON.stringify(null))
     dispatch({type:"SET_USER",payload:null})
    navigate('/HomePage')
  }
  const navigate = useNavigate();
  return (
    <>

      <div id="allBtn" className="btn-group btn-group-block" role="group">
        <ButtonGroup>
         <Button onClick={()=>navigate('/HomePage')}  className="hbtn" variant="outline-warning" size="lg">דף הבית <FontAwesomeIcon icon={faHomeLg} />
          </Button>
          {!ifUser&&<Button onClick={()=>navigate('/SignUp')} className="hbtn" variant="outline-warning" size="lg">הרשמה <FontAwesomeIcon icon={faSign} /> </Button>}
          {!ifUser&&<Button onClick={()=>navigate('/login')} className="hbtn" variant="outline-warning" size="lg"> כניסה <FontAwesomeIcon icon={faUser} /> </Button>}
          {ifUser&&<Button  onClick={()=>navigate('/Recipies')} variant="outline-warning"  size="lg">מתכונים  <FontAwesomeIcon icon={faCake}/></Button>}
          {ifUser&&<Button onClick={()=>navigate('/ShoppingList')} className="hbtn" variant="outline-warning" size="lg">רשימת קניות <FontAwesomeIcon icon={faList}/> </Button>}
          {ifUser&&<Button onClick={()=>navigate('/about')} className="hbtn" variant="outline-warning" size="lg">אודות  <FontAwesomeIcon icon={faPen} /> </Button>}
          {ifUser&&<Button onClick={()=>navigate(`/contact`)} className="hbtn" variant="outline-warning" size="lg">צור קשר  <FontAwesomeIcon icon={faPhone} /> </Button>}
          {ifUser&&<Button onClick={()=>Logout()} className="hbtn" variant="outline-warning" size="lg">התנתק <FontAwesomeIcon icon={faArrowRightFromFile} /></Button>}
        </ButtonGroup>
      </div>
    </>
  )
}
export default Header;

