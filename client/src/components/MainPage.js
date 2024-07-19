import React, {useEffect, useState} from 'react';
// import backImage from '../img/back-image.png'
import menuImage1 from '../img/menu1.jpeg'
import menuImage2 from '../img/menu2.jpg'
import menuImage3 from '../img/menu3.jpeg'
import menuImage4 from '../img/menu4.jpg'
import menuImage5 from '../img/menu5.jpg'
// import star from '../img/star.png'
import parkingIcon from '../img/parkingIcon.svg'
import pantryIcon from '../img/panntryIcon.svg'
import commerceIcon from '../img/commerceIcon.svg'
import galleryIcon from '../img/galleryIcon.svg'
import planIcon from '../img/planIcon.svg'
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
import axios from "axios";
import {$host} from "../http/index";
import levelLogo from "../img/LevelLogo.svg";
import Apartments from "./Apartments";
import Parking from "./Parking";
import StoreRooms from "./StoreRooms";
import StorageFacilities from "./StorageFacilities";
import Gallery from "./Gallery";

const MainPage = observer(() => {
    const navigate = useNavigate()
    const [isPressed, setIsPressed] = useState(false)
    const [pressedPoint, setPressedPoint] = useState(0)
    const [diffX, setDiffX] = useState(0)
    const [cursorX, setCursorX] = useState(0)
    const [currentPosition, setCurrentPosition] = useState(0)

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

    if(localStorage.getItem("last") !== null){
        const number = Number(localStorage.getItem("last"))
        setTimeout(() => {
            setCurrentPosition(number)
            selectImage(number)
            selectItem(number)
            localStorage.removeItem("last")
        }, 200)
    }

    ///// Flags
    const [apartmentLoaded, setApartmentLoaded] = useState(false)
    const [pantryLoaded, setPantryLoaded] = useState(false)
    const [parkingLoaded, setParkingLoaded] = useState(false)
    const [commercialLoaded, setCommercialLoaded] = useState(false)
    ///// Vars
    const [showApartments, setShowApartments] = useState(false)
    const [loadedApartments, setLoadedApartments] = useState([])

    const [showPantry, setShowPantry] = useState(false)
    const [loadedPantry, setLoadedPantry] = useState([])

    const [showParking, setShowParking] = useState(false)
    const [loadedParking, setLoadedParking] = useState([])

    const [showCommercial, setShowCommercial] = useState(false)
    const [loadedCommercial, setLoadedCommercial] = useState([])

    const [showGallery, setShowGallery] = useState(false)

    // console.log(loadedApartments)

    const loadApp = () => {

        setShowApartments(false)
        setShowPantry(false)
        setShowParking(false)
        setShowCommercial(false)
        setShowGallery(false)
        setApartmentLoaded(false)
        setPantryLoaded(false)
        setParkingLoaded(false)
        setCommercialLoaded(false)

        $host.get('/apartments/10').then(result => {
            $host.get('/apartments/' + result.data.count).then(result => {
                console.log(result.data.results)
                setLoadedApartments(result.data.results)
                setApartmentLoaded(true)
                // localStorage.setItem('apartments', result.data.results)
            })
        })
        $host.get('/pantry/100').then(result => {
            console.log(result.data)
            // localStorage.setItem('pantry', result.data)
            setLoadedPantry(result.data)
            setPantryLoaded(true)
        })
        $host.get('/parking/10').then(result => {
            $host.get('/parking/' + result.data.count).then(result => {
                console.log(result.data.results)
                // localStorage.setItem('parking', result.data.results)
                setLoadedParking(result.data.results)
                setParkingLoaded(true)
            })
        })
        $host.get('/commercial/10').then(result => {
            $host.get('/commercial/' + result.data.count).then(result => {
                console.log(result.data.results)
                // localStorage.setItem('commercial', result.data.results)
                setLoadedCommercial(result.data.results)
                setCommercialLoaded(true)
            })
        })
    }

    console.log("Начало")

    setTimeout(() => {
        console.log("setTim")
    }, 0)

    console.log("конец")


    useEffect(() => {
        loadApp()
    }, [])

    const hideApartments = () => {
        setShowApartments(false)
        $host.post('/', {rooms: 'apartments-closed'})
    }
    const hideParking = () => {
        setShowParking(false)
    }
    const hidePantry = () => {
        setShowPantry(false)
    }
    const hideCommercial = () => {
        setShowCommercial(false)
    }
    const hideGallery = () => {
        setShowGallery(false)
    }
    // apartmentLoaded
    // pantryLoaded
    // parkingLoaded
    // commercialLoaded
    return (
        <div>
            <div
                style={apartmentLoaded && pantryLoaded && parkingLoaded && commercialLoaded? {display: "none"} : {display: "flex"}}
                className="loading">
                <div
                    className="loading-item"
                >
                    Загрузка...
                </div>
            </div>
            <Apartments
                showApartments={showApartments}
                hideApartments={hideApartments}
                loadedApartments={loadedApartments}
            />
            <Parking
                showParking={showParking}
                hideParking={hideParking}
                loadedParking={loadedParking}
            />
            <StoreRooms
                showPantry={showPantry}
                hidePantry={hidePantry}
                loadedPantry={loadedPantry}
            />
            <StorageFacilities
                showCommercial={showCommercial}
                hideCommercial={hideCommercial}
                loadedCommercial={loadedCommercial}
            />
            <Gallery
                showGallery={showGallery}
                hideGallery={hideGallery}
            />
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
                    if(diffX > 50 && currentPosition < menuImages.length){
                        setCursorX(positions[currentPosition+1])
                        selectImage(currentPosition+1)
                        selectItem(currentPosition+1)
                        setCurrentPosition(currentPosition+1)
                    } else if(diffX < -50 && currentPosition > 0){
                        setCursorX(positions[currentPosition-1])
                        selectImage(currentPosition-1)
                        selectItem(currentPosition-1)
                        setCurrentPosition(currentPosition-1)
                    }
                    setDiffX(0)
                    setIsPressed(false)
                }}
            >
                <div
                    className="carousel-wrapper"
                    style={showApartments || showPantry || showParking || showCommercial || showGallery ? {display: "none"} : {display: "flex"}}
                >
                    <div
                        className="carousel"
                    >
                        <div
                            className="carousel-items"
                            id="cards"
                            style={{left: `${positions[currentPosition]}px`}}
                            // style={{left: `${isPressed ? cursorX - diffX : positions[currentPosition]}px`}}
                        >
                            <div
                                className="carousel-item current"
                                id="carouselItem0"
                                onClick={() => {
                                    if(currentPosition === 0){
                                        localStorage.setItem("last", "0")
                                        let rooms = []
                                        loadedApartments.map(item => {
                                            rooms.push({type: "apart", building: item.building, number: item.number, floor: item.floor})
                                        })
                                        $host.post('/', {rooms})
                                        $host.post('/', {rooms: 'apartments-open'})
                                        // navigate(APARTMENTS_ROUTE)
                                        setShowApartments(true)
                                    } else {
                                        selectImage(0)
                                        selectItem(0)
                                        setCurrentPosition(0)
                                    }
                                }}
                            >
                                <div className="icon">
                                    <Image className="icon-image" src={planIcon}/>
                                </div>
                                <div
                                    className="text-wrapper"
                                >
                                    <div className="number">01</div>
                                    <div className="title">Квартиры</div>
                                </div>
                            </div>
                            <div
                                className="carousel-item"
                                id="carouselItem1"
                                onClick={() => {
                                    if(currentPosition === 1){
                                        localStorage.setItem("last", "1")
                                        let rooms = []
                                        loadedParking.map(item => {
                                            rooms.push({type: "parking", building: item.building, number: item.number})
                                        })
                                        $host.post('/', {rooms})
                                        setShowParking(true)
                                        // navigate(PARKING_ROUTE)
                                    } else {
                                        selectImage(1)
                                        selectItem(1)
                                        setCurrentPosition(1)
                                    }
                                }}
                            >
                                <div className="icon">
                                    <Image className="icon-image" src={parkingIcon}/>
                                </div>
                                <div
                                    className="text-wrapper"
                                >
                                    <div className="number">02</div>
                                    <div className="title">Паркинг</div>
                                </div>
                            </div>
                            <div
                                className="carousel-item"
                                id="carouselItem2"
                                onClick={() => {
                                    if(currentPosition === 2){
                                        localStorage.setItem("last", "2")
                                        let rooms = []
                                        loadedPantry.map(item => {
                                            rooms.push({type: "pantry", building: item.building, number: item.number})
                                        })
                                        $host.post('/', {rooms})
                                        setShowPantry(true)
                                        // navigate(STORE_ROOMS_ROUTE)
                                    } else {
                                        selectImage(2)
                                        selectItem(2)
                                        setCurrentPosition(2)
                                    }
                                }}
                            >
                                <div className="icon">
                                    <Image className="icon-image" src={pantryIcon}/>
                                </div>
                                <div
                                    className="text-wrapper"
                                >
                                    <div className="number">03</div>
                                    <div className="title">Кладовые</div>
                                </div>
                            </div>
                            <div
                                className="carousel-item"
                                id="carouselItem3"
                                onClick={() => {
                                    if(currentPosition === 3){
                                        localStorage.setItem("last", "3")
                                        let rooms = []
                                        loadedCommercial.map(item => {
                                            rooms.push({type: "commercial", building: item.building, number: item.number})
                                        })
                                        $host.post('/', {rooms})
                                        setShowCommercial(true)
                                        // navigate(STORAGE_FACILITIES_ROUTE)
                                    } else {
                                        selectImage(3)
                                        selectItem(3)
                                        setCurrentPosition(3)
                                    }
                                }}
                            >
                                <div className="icon">
                                    <Image className="icon-image" src={commerceIcon}/>
                                </div>
                                <div
                                    className="text-wrapper"
                                >
                                    <div className="number">04</div>
                                    <div className="title">Складские <br/> помещения</div>
                                </div>
                            </div>
                            <div
                                className="carousel-item"
                                id="carouselItem4"
                                onClick={() => {
                                    if(currentPosition === 4){
                                        localStorage.setItem("last", "4")
                                        // navigate(GALLERY_ROUTE)
                                        setShowGallery(true)
                                    } else {
                                        selectImage(4)
                                        selectItem(4)
                                        setCurrentPosition(4)
                                    }
                                }}
                            >
                                <div className="icon">
                                    <Image className="icon-image" src={galleryIcon}/>
                                </div>
                                <div
                                    className="text-wrapper"
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
                    {/*<div className="loading">*/}
                    {/*    <div*/}
                    {/*        style={apartmentLoaded ? {display: "none"} : {display: "block"}}*/}
                    {/*        className="loading-item">Загрузка апартаментов...</div>*/}
                    {/*    <div*/}
                    {/*        style={pantryLoaded ? {display: "none"} : {display: "block"}}*/}
                    {/*        className="loading-item">Загрузка кладовых...</div>*/}
                    {/*    <div*/}
                    {/*        style={parkingLoaded ? {display: "none"} : {display: "block"}}*/}
                    {/*        className="loading-item">Загрузка паркингов...</div>*/}
                    {/*    <div*/}
                    {/*        style={commercialLoaded ? {display: "none"} : {display: "block"}}*/}
                    {/*        className="loading-item">Загрузка складских помещений...</div>*/}
                    {/*</div>*/}
                    <div
                        className="logo"
                        style={showApartments || showPantry || showParking || showCommercial || showGallery ? {display: "none"} : {display: "flex"}}

                    >
                        <Image onClick={() => loadApp()} src={levelLogo}/>
                        <span>Нижегородская</span>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default MainPage;