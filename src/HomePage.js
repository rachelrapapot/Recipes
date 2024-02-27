import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import Image from 'react-bootstrap/Image';
import './homepage.css';
import Carousel from 'react-bootstrap/Carousel';
import mussImage from './images/muss.jpg';
import waffleHeartsImage from './images/waffle-hearts.jpg';
import cookiesImage from './images/cookies.jpg';
import pizzaImage from './images/pizza.jpg';
import pizza2Image from './images/pizza2.jpg';
import mealImage from './images/meal.jpg';
import meatImage from './images/meat.jpg';
import meatSkewerImage from './images/meat-skewer.jpg';
import biryaniImage from './images/biryani.jpg';
const HomePage = () => {
    const [toShow, setToShow] = useState(true);
    const user = useSelector(state => state.user);

    useEffect(() => {
        if (user) {
            setToShow(false);
        } else {
            setToShow(true);
        }
    }, []);

    const close = () => {
        setToShow(false);
    }

    return (
        <>
            <div className="imgAll">
                <Header />
                
                {
                    toShow&&<div className="alert1">
                        <span className="closebtn" onClick={()=>close()}>x</span>
                        אינך רשום לצפייה במתכונים הכנס או הרשם
                    </div>
                }
<div className="images_home">
<Carousel>
      <Carousel.Item interval={3000} >
        <Image src={mussImage} style={{width:"33vw", height:"25vw" }}/>
        <Image src={waffleHeartsImage} style={{width:"33vw", height:"25vw"}}/>
        <Image src={cookiesImage} style={{width:"33vw", height:"25vw"}}/>
       
      </Carousel.Item>
      <Carousel.Item interval={3000}>
      <Image src={pizzaImage} style={{width:"33vw", height:"25vw"}}/>
      <Image src={pizza2Image} style={{width:"33vw", height:"25vw"}}/>
      <Image src={mealImage} style={{width:"33vw", height:"25vw"}}/>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
   
      <Image src={meatImage} style={{width:"33vw", height:"25vw"}}/>
      <Image src={meatSkewerImage} style={{width:"33vw", height:"25vw"}}/>
      <Image src={biryaniImage} style={{width:"33vw", height:"25vw"}}/>
      </Carousel.Item>
    </Carousel>
    </div>
                  
                
            </div>
        </>
    )
}

export default HomePage;