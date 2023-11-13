import React, {useState} from 'react';
// import backImage from '../img/back-image.png'
import menuImage1 from '../img/menu1.jpeg'
import menuImage2 from '../img/menu2.jpg'
import menuImage3 from '../img/menu3.jpeg'
import menuImage4 from '../img/menu4.jpg'
import menuImage5 from '../img/menu5.jpg'
import star from '../img/star.png'
import {Image} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useNavigate} from 'react-router-dom'
import {
    APARTMENTS_ROUTE,
    GALLERY_ROUTE,
    PARKING_ROUTE,
    STORAGE_FACILITIES_ROUTE,
    STORE_ROOMS_ROUTE
} from "../utils/consts";

const MainPage = observer(() => {
    const navigate = useNavigate()
    const [isPressed, setIsPressed] = useState(false)
    const [pressedPoint, setPressedPoint] = useState(0)
    const [diffX, setDiffX] = useState(0)
    const [cursorX, setCursorX] = useState(0)
    const [currentPosition, setCurrentPosition] = useState(0)
    const [lastImage, setLastImage] = useState(900)

    const menuImages = [
        menuImage1,
        menuImage2,
        menuImage3,
        menuImage4,
        menuImage5
    ]

    const positions = [
        400,
        -100,
        -600,
        -1100,
        -1600
    ]

    const selectImage = (cur) => {
        document.getElementById('carouselImage0').classList.remove('current')
        document.getElementById('carouselImage1').classList.remove('current')
        document.getElementById('carouselImage2').classList.remove('current')
        document.getElementById('carouselImage3').classList.remove('current')
        document.getElementById('carouselImage4').classList.remove('current')
        document.getElementById('carouselImage' + cur).classList.add('current')
    }

    const selectItem = (cur) => {
        document.getElementById('carouselItem0').classList.remove('current')
        document.getElementById('carouselItem1').classList.remove('current')
        document.getElementById('carouselItem2').classList.remove('current')
        document.getElementById('carouselItem3').classList.remove('current')
        document.getElementById('carouselItem4').classList.remove('current')
        document.getElementById('carouselItem' + cur).classList.add('current')
    }

    return (
        <div
            className="main-page-wrapper"
            onMouseDown={(e) => {
                setIsPressed(true)
                setPressedPoint(e.pageX)
            }}
            onMouseMove={(e) => {
                if (isPressed) {
                    setDiffX(pressedPoint - e.pageX)
                }
            }}
            onMouseUp={() => {
                if(diffX > 100 && currentPosition < 4){
                    setCursorX(positions[currentPosition+1])
                    selectImage(currentPosition+1)
                    selectItem(currentPosition+1)
                    setCurrentPosition(currentPosition+1)
                } else if(diffX < 100 && currentPosition > 0){
                    setCursorX(positions[currentPosition-1])
                    selectImage(currentPosition-1)
                    selectItem(currentPosition-1)
                    setCurrentPosition(currentPosition-1)
                }
                setDiffX(0)
                setIsPressed(false)
            }}
        >
            <div className="carousel-wrapper">
                <div
                    className="carousel"
                >
                    <div
                        className="carousel-items"
                        id="cards"
                        style={{left: `${isPressed ? cursorX - diffX : positions[currentPosition]}px`}}
                    >
                        <div
                            className="carousel-item current"
                            id="carouselItem0"
                        >
                            <div className="icon">
                                <Image className="icon-image" src={star}/>
                            </div>
                            <div
                                className="text-wrapper"
                                onClick={() => navigate(APARTMENTS_ROUTE)}
                            >
                                <div className="number">01</div>
                                <div className="title">Квартиры</div>
                            </div>
                        </div>
                        <div
                            className="carousel-item"
                            id="carouselItem1"
                        >
                            <div className="icon">
                                <Image className="icon-image" src={star}/>
                            </div>
                            <div
                                className="text-wrapper"
                                onClick={() => navigate(PARKING_ROUTE)}
                            >
                                <div className="number">02</div>
                                <div className="title">Паркинг</div>
                            </div>
                        </div>
                        <div
                            className="carousel-item"
                            id="carouselItem2"
                        >
                            <div className="icon">
                                <Image className="icon-image" src={star}/>
                            </div>
                            <div
                                className="text-wrapper"
                                onClick={() => navigate(STORE_ROOMS_ROUTE)}
                            >
                                <div className="number">03</div>
                                <div className="title">Кладовые</div>
                            </div>
                        </div>
                        <div
                            className="carousel-item"
                            id="carouselItem3"
                        >
                            <div className="icon">
                                <Image className="icon-image" src={star}/>
                            </div>
                            <div
                                className="text-wrapper"
                                onClick={() => navigate(STORAGE_FACILITIES_ROUTE)}
                            >
                                <div className="number">04</div>
                                <div className="title">Складские <br/> помещения</div>
                            </div>
                        </div>
                        <div
                            className="carousel-item"
                            id="carouselItem4"
                        >
                            <div className="icon">
                                <Image className="icon-image" src={star}/>
                            </div>
                            <div
                                className="text-wrapper"
                                onClick={() => navigate(GALLERY_ROUTE)}
                            >
                                <div className="number">05</div>
                                <div className="title">Галерея</div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-images">
                        <div className="carousel-image-wrapper">
                            <Image className="carousel-image current" id="carouselImage0" src={menuImages[0]}/>
                        </div>
                        <div className="carousel-image-wrapper">
                            <Image className="carousel-image" id="carouselImage1" src={menuImages[1]}/>
                        </div>
                        <div className="carousel-image-wrapper">
                            <Image className="carousel-image" id="carouselImage2" src={menuImages[2]}/>
                        </div>
                        <div className="carousel-image-wrapper">
                            <Image className="carousel-image" id="carouselImage3" src={menuImages[3]}/>
                        </div>
                        <div className="carousel-image-wrapper">
                            <Image className="carousel-image" id="carouselImage4" src={menuImages[4]}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer">
                LOGO
            </div>
        </div>
    );
});

export default MainPage;