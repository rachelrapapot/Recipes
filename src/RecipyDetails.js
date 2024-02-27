import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";
import './RecipyDetails.css'
import Header from "./Header";
import { useEffect, useState } from "react";
import { faTrash, faMoneyCheck, faPrint } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const RecipyDetails = () => {
  const user = useSelector(state => state?.user);
  const navigate = useNavigate()
  const location = useLocation();

  const AddProduct = (check, item) => {
    if (check) {
      axios.post("http://localhost:8080/api/bay", item)
        .then((x) => { console.log(x.data); alert("נוסף"); })
        .catch(err => console.log(err))
    }

    else
      DeleteProduct(item)
  }

  const DeleteProduct = (item) => {
    axios.post(`http://localhost:8080/api/bay/delete/${item.Id}`)
      .then((x) => { console.log(x.data); alert("נמחק"); })
      .catch(err => console.log(err))
  }
  const Delete = () => {
    console.log(props.Id);
    axios.post(`http://localhost:8080/api/recipe/delete/${props.Id}`)
      .then((x) => { console.log(x.data); alert("נמחק"); navigate('/recipies') })
      .catch(err => console.log(err))
  }

  const props = location.state;
  const [m, setm] = useState(false);
  return (
    <>
      <div className="all">
        <div style={{ backgroundColor: "black", width: "80vw", height: "8vw", zIndex: "5" }}>
          <Header />
        </div>
        <br />
        <br />
        <div className="wrapp">
          <Card border="warning" style={{ width: '30rem', direction: "rtl", backgroundColor: 'black', color: 'white' }}>
            <Card.Img variant="top" src={props.Img} style={{ width: '25rem', height: '20rem', margin: 'auto' }} />
            <Card.Body>
              <Card.Title style={{ fontSize: "4rem" }}>{props.Name}</Card.Title>
              <Card.Text style={{ color: 'white' }}>
                רמת קושי: {props.Difficulty}
              </Card.Text>
              <Card.Text style={{ color: 'white' }}>זמן הכנה: {props.Duration}</Card.Text>
              <Card.Text style={{ color: 'white' }}>
                {props.Description}
              </Card.Text >
              {props.UserId === user?.Id && <Button onClick={() => Delete()} variant="outline-warning"> <FontAwesomeIcon icon={faTrash} />
                {' '} מחיקה
              </Button>}
              <Button variant="outline-warning" onClick={()=>window.print()}><FontAwesomeIcon icon={faPrint} /> {' '}הדפסה</Button>
             
              {props.UserId === user?.Id && <Button onClick={() => { setm(true) }} variant="outline-warning">  <FontAwesomeIcon icon={faMoneyCheck} /> עריכה{' '} </Button>}
              <Card.Title style={{ color: 'white' }}>רכיבים:</Card.Title>
              <Card.Text style={{ color: 'white' }}>
                {props.Ingrident?.map((ingredient, index) => (
                  <ul key={index}>
                    <input type="checkbox" onChange={(e) => AddProduct(e.target.checked, { Id: ingredient.Id, Name: ingredient.Name, UserId: user.Id, Count: ingredient.Count })} />
                    <li>{ingredient.Name}  {ingredient.Count}  {ingredient.Type}</li>
                  </ul>
                ))}
              </Card.Text>
              <Card.Title style={{ color: 'white' }}>הוראות הכנה:</Card.Title>
              <Card.Text style={{ color: 'white' }}>
                <ol>
                  {props.Instructions?.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
      {m && navigate('/EditRecipe', { state: { Type: "Edit", recipe: props } })}
    </>
  )
}
export default RecipyDetails;