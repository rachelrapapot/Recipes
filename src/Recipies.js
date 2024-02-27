import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import RecipyDetails from "./RecipyDetails"
import { useNavigate } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import './Recipies.css'
import Category from "./Category"
import Header from "./Header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd, faCircleInfo } from "@fortawesome/free-solid-svg-icons"

const Recipies=()=>{
    const navigate=useNavigate();
    const recipes=useSelector(state=>state?.recipes);
    const selectedCategory=useSelector(state=>state.SelectedCategory)
    const [Time,setTime]=useState('')
    const [C,setC]=useState('')
    const [D,setD]=useState('')
    const dispatch=useDispatch();
  
   useEffect(function(){
axios.get("http://localhost:8080/api/recipe")
.then(

    (x)=>{
    console.log(x.data);
    dispatch({type: "GET_RECIPIES",payload:x.data})}
).catch(err=>console.log(err)
)

},[])
const nav = (recipe) => {
  navigate(`/RecipyDetails`, { state: recipe });
};
const difficulty=(difficulty)=>{
switch(difficulty){
  case "קל":
    setD(1);
    break;
    case "בינוני":
      setD(2);
      break;
     default:
      setD(3) ;
      break;
}

}
return(
    <>
    
      <div className="all_recipes">
        <div className="hcb">
          <div className="sinun">
        <input id="in" type="text" placeholder="משך זמן" onChange={(e) => setTime(e.target.value)}></input>
       <select onChange={(e) => difficulty(e.target.value)}>
        <option className="hidden-option" disabled selected>קושי</option>
        <option value={"קל"}>קל</option>
        <option value={"בינוני"}>בינוני</option>
        <option value={"קשה"}>קשה</option>
        </select>
        <input id="in" type="number" placeholder=" נוצר על ידי" onChange={(e) => setC(e.target.value)}></input>
    </div> <Header/>
      <Category/>

      <Button variant="outline-warning" onClick={()=>navigate('/EditRecipe',{state:{Type:"Add",recipe:null}})} className="drp1">הוספת מתכון{'  '}
      <FontAwesomeIcon icon={faAdd}/>
      </Button>
     </div >
    
      <div className="recipies">
      {     
 
      
      recipes.map((recipe) => (
       ( !selectedCategory||(selectedCategory.Id===recipe.CategoryId))&&
       (!Time||(Time==recipe.Duration))&&
       (!C||(C==recipe.UserId))&&
       (!D||(D==recipe.Difficulty))&&
        <Card style={{ width: '18rem',height:'20rem', backgroundColor: "black",  boxShadow: "0 4px 8px 0 rgb(201, 201, 194) , 0 6px 20px 0 rgb(73, 73, 72)", margin:"2vw"}}>
        <Card.Img variant="top" src={recipe.Img}style={{width:'15rem', height:'12rem'}} />
        <Card.Body>
          <Card.Title style={{color: "white"}}>{recipe.Name}</Card.Title>
          <Button variant="outline-warning" onClick={() =>nav(recipe)}>פרטי המתכון {'    '}   
                  <FontAwesomeIcon icon={faCircleInfo}/>
          </Button>
        </Card.Body>
      </Card>
      ))
      }
</div>
     
    </div>

   
    </>
)

}
export default Recipies