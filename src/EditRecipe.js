import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {  useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import { Form, FormGroup, FormControl, Button, FormSelect } from 'react-bootstrap';
import './addRecipe.css'
import Header from "./Header";
const EditRecipy=( )=>{
  const recipe=useLocation(state=>state.state.recipe)
  const TypeR=useLocation(state=>state.Type)
  const nav=useNavigate()

    const [name, setName] = useState("");
    const [difficulty, setDifficulty] = useState(0);
    const [hour, setHour] = useState(0);
    const [instructions, setInstructions] = useState([]);
    const [ingredients, setIngredients] = useState([{ Count: '', Type: '',Name:'' }]);
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState('');
    const [category, setCategory] = useState(0);
  const dispatch=useDispatch()
const user=useSelector(state=>state.user)
    const handleInstructionChange = (index, value) => {
      const updatedInstructions = [...instructions];
      updatedInstructions[index] = value;
      setInstructions(updatedInstructions);
    };
    const parse_difficulty=(props)=>{
      switch(props){
        case "קל":
        setDifficulty(1)
        break;
        case "בינוני":
          setDifficulty(2)
          break;
          case "קשה":
            setDifficulty(3);
            break;
            default:
              setDifficulty(1)
      }
    }
    useEffect(() => {
     
        if (recipe.state.recipe) {
          setName(recipe.state.recipe.Name);
          setDifficulty(recipe.state.recipe.Difficulty);
          setHour(recipe.state.recipe.Duration);
          setInstructions(recipe.state.recipe.Instructions);
          setIngredients(recipe.state.recipe.Ingrident);
          setDescription(recipe.state.recipe.Description);
          setPhoto(recipe.state.recipe.Img);
          setCategory(recipe.state.recipe.CategoryId);
        }
      }, [recipe.state.recipe]);
    
 
    const handleIngredientChange = (index, key, value) => {
      const updatedIngredients = [...ingredients];
      updatedIngredients[index][key] = value;
      setIngredients(updatedIngredients);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
     if(TypeR?.state.Type=="Edit")
     {
      axios.post("http://localhost:8080/api/recipe/edit", {Id:recipe.state.recipe.Id,
      Name: name,Instructions: instructions,Difficulty: difficulty,Duration: hour,UserId:user.Id,Ingrident: ingredients, Description: description,
     Img: photo,
     CategoryId: category }).then((x)=>nav('../recipies'))
     }else{ 
      
      axios.post("http://localhost:8080/api/recipe", {
       
        Name: name, Instructions: instructions, Difficulty: difficulty, Duration: hour, UserId: user.Id, Ingrident: ingredients, Description: description,
        Img: photo,
        CategoryId: category
      })
        .then(x =>{ dispatch({ type: "ADD_RECIPE", payload: x.data })
        nav('./recipies')}
        )
     
     }  
     
       
      setName('');
      setDifficulty('');
      setHour('');
      setInstructions(['']);
      setIngredients([{ Count: '', Type: '',Name:'' }]);
      setDescription('');
      setPhoto('');
      setCategory('');
     
    };
  
    const addInstructionField = () => {
      setInstructions([...instructions, '']);
    };
  
    const removeInstructionField = (index) => {
      const updatedInstructions = [...instructions];
      updatedInstructions.splice(index, 1);
      setInstructions(updatedInstructions);
    };
  
    const addIngredientField = () => {
      setIngredients([...ingredients, { Count: '', Type: '',Name:'' }]);
    };
  
    const removeIngredientField = (index) => {
      const updatedIngredients = [...ingredients];
      updatedIngredients.splice(index, 1);
      setIngredients(updatedIngredients);
    };
  
    return (
      <>
      <Header/>
      <div className="allAdd" >
      
      <Form className="custom-form" onSubmit={handleSubmit}>
        <FormGroup>
          <Form.Label>שם המתכון:</Form.Label>
          <FormControl
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Form.Label>רמת קושי:</Form.Label>
      
          <FormSelect onChange={(e) => parse_difficulty(e.target.value)} >
           <option value={"קל"}>
            קל
           </option>
           <option value={"בינוני"}>
            בינוני
           </option>
           <option value={"קשה"}>
            קשה
           </option>
          </FormSelect>
        </FormGroup>

        <FormGroup>
          <Form.Label>זמן הכנה בדקות:</Form.Label>
          <FormControl
            type="text"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
          />
        </FormGroup>

       
        <FormGroup>
          <Form.Label>רכיבים:</Form.Label>
          {ingredients.map((ingredient, index) => (
            <div key={index}>
              <Button style={{ marginBottom: "20px" }} variant="danger" onClick={() => removeIngredientField(index)}>
                להסרת רכיב זה
              </Button>
              <FormControl
  type="number"
  value={ingredient.Count}
  placeholder="כמות"
  onChange={(e) => handleIngredientChange(index, 'Count', e.target.value)}
/>
<FormControl
  type="text"
  placeholder="סוג (כוס, כף, וכו')"
  value={ingredient.Type}
  onChange={(e) => handleIngredientChange(index, 'Type', e.target.value)}
/>
<FormControl
  type="text"
  value={ingredient.Name}
  placeholder="שם המוצר"
  onChange={(e) => handleIngredientChange(index, 'Name', e.target.value)}
/>
            </div>
          ))}
          <Button variant="outline-warning" onClick={addIngredientField}>
            להוספת רכיב
          </Button>
        </FormGroup>
        <FormGroup />
        <FormGroup>
          <Form.Label>הוראות הכנה:</Form.Label>
          {instructions.map((instruction, index) => (
            <div key={index}>
              <Button style={{marginBottom:"20px"}} variant="danger" onClick={() => removeInstructionField(index)}>
                להסרת הוראה זו
              </Button>
              <FormControl
                type="text"
                value={instruction}
                onChange={(e) => handleInstructionChange(index, e.target.value)}
              />

            </div>
          ))}
          <Button variant="primary" onClick={addInstructionField}>
            להוספת הוראה
          </Button>
        </FormGroup>

     <Form.Label>
       Description:
       <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
     </Form.Label>
     <br />

     <Form.Label>
       Photo:
       <FormControl value={photo} placeholder="הכנס קישור לתמונה" onChange={(e) => setPhoto(e.target.value)} />
     </Form.Label>
     <br />

     <Form.Label>
       Category:
       <FormControl type="number" value={category} onChange={(e) => setCategory(e.target.value)} />
     </Form.Label>
     <br />

     <Button type="submit">אישור</Button>
     </Form>
    
    </div>
    </>
     
    );
  }
  

export default EditRecipy;