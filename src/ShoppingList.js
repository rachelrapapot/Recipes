import axios from "axios";
import { useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './list.css'
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";

const ShoppingList = (userId) => {
const dispatch=useDispatch();
    const navigate = useNavigate()
     const user = useSelector(state=>state?.user);
    const [data, setData] = useState([]);
   
    
    useEffect(() => {  

       GetData();  
     
    }, [])
   
    const GetData = () => {
      
        axios.get(`http://localhost:8080/api/bay/${userId.userId}`).
            then((x) => {
                console.log(x.data);
                setData(x.data)
            }).catch(err => console.log(err))
    }
    const deleted = (product) => {
        console.log(product)
        axios.post(`http://localhost:8080/api/bay/delete/${product.Id}`)
            .then((x) => {
                console.log(x.data);
                alert("נמחק");
                GetData();
            })
            .catch(err => console.log(err))
    }
 
    return (
        <>
        <Header/>

        <div className="list">
            {data?.map((product, index) => (
                <ListGroup className="ligroup" key={index} >
                    <div className="two">
               
                  
                    
                <ListGroup.Item className="item">
                <FontAwesomeIcon icon={faCircleMinus}  onClick={() => deleted(product)} />
                 {'   '} {product.Count} {product.Type}   {product.Name}          
                </ListGroup.Item> 
                </div>
              </ListGroup>
            ))}
            </div>
        </>
    )


}
export default ShoppingList;