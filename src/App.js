
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import HomePage from './HomePage'
import Login from './LogIn';
import About from './About';
import SignUp from './SignUp';
import RecipyDetails from './RecipyDetails';
import Recipies from './Recipies';
import ShoppingList from './ShoppingList';
import { useSelector } from 'react-redux';
import Contact from './Contact';
import { useEffect } from 'react';
import EditRecipy from './EditRecipe';



function App() {
  const user = useSelector(state => state?.user)
  useEffect(()=>{
    localStorage.setItem("user",JSON.stringify(user));
  },user)
  return (
    <div className="App">
      <Router>
        <>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/About" element={user&&<About />} />
            <Route path="/EditRecipe" element={user&&<EditRecipy/>} />
            <Route path="/HomePage" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/RecipyDetails" element={user&&<RecipyDetails />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/recipies" element={user&&<Recipies />} />
            <Route path="/contact" element={user&&<Contact />} />
            <Route path="/ShoppingList" element={user&&<ShoppingList userId={user?.Id} />} />

          </Routes>
        </>
      </Router>

    </div>
  );
}

export default App;

