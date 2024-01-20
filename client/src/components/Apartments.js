import React, {useEffect, useState} from 'react';
// import {apartments} from '../data/data'
import {Button, Image} from "react-bootstrap";
import heartImage from '../img/heart.svg'
import levelLogoBlack from '../img/LevelLogoBlack.svg'
import {useNavigate} from "react-router";
import {MAIN_PAGE_ROUTE} from "../utils/consts";
import filterIcon from '../img/filterIcon.svg'
import Modal from "./Modal";
import GalleryModal from "./GalleryModal";
import {$host} from "../http/index";
import {Form} from "react-bootstrap";
import MultiRangeSlider from "./MultiRangeSlider";
import {observer} from "mobx-react-lite";

const Apartments = ({showApartments, hideApartments, loadedApartments}) => {

    Array.prototype.multiget = function(){
        var args = Array.apply(null, arguments);
        var result = [];
        for(var i = args[0]; i < args[1]; i++){
            result.push(this[i]);
        }
        return result;
    }

    // const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)
    const [selectedRoom, setSelectedRoom] = useState('')
    // const [showGallery, setShowGallery] = useState(false)
    // const [galleryImages, setGalleryImages] = useState([])
    const [showOverlay, setShowOverlay] = useState(true)
    const [apartments, setApartments] = useState([])
    const [apartBase, setApartBase] = useState([])
    const [filtredAparts, setFiltredAparts] = useState([])
    const [showSidebar, setShowSidebar] = useState(false)
    const [page, setPage] = useState(0)
    const limit = 10

    ///////////// FILTERS //////////////////
    const [minPrice, setMinPrice] = useState(13.7)
    const [maxPrice, setMaxPrice] = useState(65.6)
    const [minArea, setMinArea] = useState(17)
    const [maxArea, setMaxArea] = useState(344)
    const [rooms, setRooms] = useState([0,1,2,3,4,5])
    const [windowsOn, setWindowsOn] = useState(['двор','город','парк','достопримечательности'])
    // const [rareFormats, setRareFormats] = useState([])


    useEffect(() => {
        if(showApartments){
            setApartments(loadedApartments.multiget(0 , limit))
            setApartBase(loadedApartments)
            setFiltredAparts(loadedApartments)
        }
    }, [showApartments])


    const setFilters = () => {
        const stud = document.getElementById('stud')
        const one = document.getElementById('one')
        const two = document.getElementById('two')
        const three = document.getElementById('three')
        const four = document.getElementById('four')
        const five = document.getElementById('five')

        let roomsArr = []
        if(stud.checked){
            roomsArr.push(0)
        }
        if(one.checked){
            roomsArr.push(1)
        }
        if(two.checked){
            roomsArr.push(2)
        }
        if(three.checked){
            roomsArr.push(3)
        }
        if(four.checked){
            roomsArr.push(4)
        }
        if(five.checked){
            roomsArr.push(5)
        }
        if(roomsArr.length === 0){
            roomsArr = [0,1,2,3,4,5]
        }

        const yard = document.getElementById('yard')
        const park = document.getElementById('park')
        const city = document.getElementById('city')
        const sight = document.getElementById('sight')
        let windowArr = []

        if (yard.checked){
            windowArr.push("двор")
        }
        if (park.checked){
            windowArr.push("парк")
        }
        if (city.checked){
            windowArr.push("город")
        }
        if (sight.checked){
            windowArr.push("достопримечательности")
        }
        if(windowArr.length === 0){
            windowArr = ['двор','город','парк','достопримечательности']
        }

        const afterFilter = apartBase.filter((apart) =>
            apart.full_payment_price > minPrice * 1000000
            && apart.full_payment_price < maxPrice * 1000000
            && apart.area > minArea
            && apart.area < maxArea
            && roomsArr.indexOf(apart.room) !== -1
            && windowArr.indexOf(apart.windows_located) !== -1
        )

        let rooms = []

        afterFilter.map(item => {
            rooms.push({type: "apart", building: item.building, number: item.number})
        })
        // console.log(arrToSend)
        $host.post('/', {rooms})
        setFiltredAparts(afterFilter)
        const quan = afterFilter.length > limit ? limit : afterFilter.length
        setApartments(afterFilter.multiget(0 , quan))
    }

    const onHide = () => {
        setShowModal(false)
        let rooms = []
        filtredAparts.map(item => {
            rooms.push({type: "apart", building: item.building, number: item.number})
        })
        $host.post('/', {rooms})
        setSelectedRoom('')
    }

    // console.log(page)
    // console.log(filtredAparts)
    // console.log(Math.round(filtredAparts.length/limit) - (page + 1))

    return (
        <div
            style={showApartments ? {display: "flex"} : {display: "none"}}
            className="apartments-wrapper"
        >
            <Modal
                show={showModal}
                onHide={onHide}
                room={selectedRoom}
                // openGallery={openGallery}
                // setGalleryImages={setGalleryImages}
            />
            {/*<GalleryModal*/}
            {/*    show={showGallery}*/}
            {/*    close={closeGallery}*/}
            {/*    images={galleryImages}*/}
            {/*/>*/}
            <div className="content-outer">
                <div className="content-wrapper">
                    {/*<div*/}
                    {/*    className="top-menu"*/}
                    {/*>*/}
                    {/*    <div className="menu-item">*/}
                    {/*        Этаж*/}
                    {/*    </div>*/}
                    {/*    <div className="menu-item">*/}
                    {/*        Площадь*/}
                    {/*    </div>*/}
                    {/*    <div className="menu-item">*/}
                    {/*        Стоимость*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className="apartments">
                        {apartments !== [] ? apartments.map(apartment =>
                            <div
                                className="apartments-item"
                                key={apartment.id}
                                onClick={() => {
                                    setSelectedRoom(apartment)
                                    setShowModal(true)
                                    let rooms = []
                                    rooms.push({type: "apart", building: apartment.building, number: apartment.number})
                                    $host.post('/', {rooms})
                                }}
                            >
                                <div className="left-side">
                                    <div className="article">
                                        {apartment.number}
                                    </div>
                                    <div className="image-wrapper">
                                        <Image
                                            className="image"
                                            src={apartment.plan}
                                        />
                                    </div>
                                </div>
                                <div className="right-side">
                                    <div className="title">
                                       {/*{apartment.title}*/}
                                       Квартира
                                    </div>
                                    <div className="characters">
                                        {/*{apartment.characters.map(character =>*/}
                                        {/*    <div className="character-item" key={character.title}>*/}
                                        {/*        <div className="character-title">*/}
                                        {/*            {character.title}*/}
                                        {/*        </div>*/}
                                        {/*        <div className="character-value">*/}
                                        {/*            {character.value}*/}
                                        {/*        </div>*/}
                                        {/*    </div>*/}
                                        {/*)}*/}
                                        <div className="character-item">
                                            <div className="character-title">
                                                Площадь
                                            </div>
                                            <div className="character-value">
                                                {apartment.area} м²
                                            </div>
                                        </div>
                                        <div className="character-item">
                                            <div className="character-title">
                                                Комнат
                                            </div>
                                            <div className="character-value">
                                                {apartment.room} к
                                            </div>
                                        </div>
                                        <div className="character-item">
                                            <div className="character-title">
                                                Отделка
                                            </div>
                                            <div className="character-value">
                                                {apartment.renovation}
                                            </div>
                                        </div>
                                        <div className="character-item">
                                            <div className="character-title">
                                                Этаж
                                            </div>
                                            <div className="character-value">
                                                {apartment.floor} из {apartment.floors_total}
                                            </div>
                                        </div>
                                        <div className="character-item">
                                            <div className="character-title">
                                                Корпус
                                            </div>
                                            <div className="character-value">
                                                {apartment.building}
                                            </div>
                                        </div>
                                        <div className="character-item">
                                            <div className="character-title">
                                                Окна на
                                            </div>
                                            <div className="character-value">
                                                {apartment.windows_located}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bottom-wrapper">
                                        <div className="price">
                                            {/*<div className="timer">*/}
                                            {/*    Цена по акции <span>{apartment.saleDate}</span>*/}
                                            {/*</div>*/}
                                            <div className="price-value">
                                                {apartment.price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽
                                            </div>
                                            {/*<div className="sale">*/}
                                            {/*    Со скидкой <span>{apartment.salePrice}</span>*/}
                                            {/*</div>*/}
                                        </div>
                                        <div className="follow">
                                            <div className="follow-item">
                                                <Image src={heartImage}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : <div></div>}
                    </div>
                    {apartments.length === 0 ? <div>Таких квартир нет</div> : <div></div>}
                    <div className="pagination">
                        <div
                            className="prev-page"
                            onClick={() => {
                                if(page > 0){
                                    setApartments(filtredAparts.multiget(limit * (page - 1) , (limit * (page - 1)) + limit))
                                    setPage(page - 1)
                                }
                            }}
                        >
                            {"<"}
                        </div>
                        <div className="page">
                            {filtredAparts.length > 0 ?
                                <div>{page + 1} / {Math.round(filtredAparts.length/limit)}</div> :
                                <div>Загрузка...</div>
                            }
                        </div>
                        <div
                            className="next-page"
                            onClick={() => {
                                if(page < Math.round(filtredAparts.length/limit)){
                                    setApartments(filtredAparts.multiget(limit * (page + 1) ,
                                        Math.round(filtredAparts.length/limit) - (page + 1) === 1 ?
                                            filtredAparts.length
                                            : (limit * (page + 1)) + limit))
                                    setPage(page + 1)
                                }
                            }}
                        >
                            {">"}
                        </div>
                    </div>
                    <div
                        className="logo"
                        style={showOverlay ? {display: "flex"} : {display: "none"}}
                    >
                        <Image src={levelLogoBlack}/><span>Нижегородская</span>
                    </div>
                    <div
                        className="back-btn"
                        onClick={hideApartments}
                        style={showOverlay ? {display: "block"} : {display: "none"}}
                    >
                    </div>
                </div>
            </div>
            <div
                className="sidebar-wrapper"
                style={showOverlay ? {display: "block"} : {display: "none"}}
            >
                <div
                    className="sidebar-title"
                    style={showSidebar ? {display: "none"} : {display: "block"}}
                    onClick={() => setShowSidebar(true)}
                >
                    <Image className="side-icon" src={filterIcon}/> Фильтрация
                </div>
                <div
                    className={showSidebar ? "sidebar open-sidebar" : "sidebar"}
                >
                    <div
                        className={showSidebar ? "sidebar-inner show-sidebar-inner" : "sidebar-inner"}
                    >
                        <div className="filters-outer">
                            <div className="filter-wrapper">
                                <div className="filter-title">
                                    Стоимость, <span>млн руб.</span>
                                </div>
                                <div className="filter-input">
                                    <MultiRangeSlider
                                        min={13.7}
                                        max={65.6}
                                        onChange={({ min, max }) => {
                                            setMinPrice(min)
                                            setMaxPrice(max)
                                            // console.log(`min = ${min}, max = ${max}`)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="filter-wrapper">
                                <div className="filter-title">
                                    Площадь квартиры, <span> м²</span>
                                </div>
                                <div className="filter-input">
                                    <MultiRangeSlider
                                        min={17}
                                        max={344}
                                        onChange={({ min, max }) => {
                                            setMinArea(min)
                                            setMaxArea(max)
                                            // console.log(`min = ${min}, max = ${max}`)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="filter-wrapper">
                                <div className="filter-title">
                                    Количество комнат
                                </div>
                                <div className="rooms">
                                    <label
                                        htmlFor="stud"
                                    >
                                        <input id="stud" className="checkbox" type="checkbox" style={{display: 'none'}}/>
                                        <span className="room-item">Ст</span>
                                    </label>
                                    <label
                                        htmlFor="one"
                                    >
                                        <input id="one" className="checkbox" type="checkbox" style={{display: 'none'}}/>
                                        <span className="room-item">1</span>
                                    </label>
                                    <label
                                        htmlFor="two"
                                    >
                                        <input id="two" className="checkbox" type="checkbox" style={{display: 'none'}}/>
                                        <span className="room-item">2</span>
                                    </label>
                                    <label
                                        htmlFor="three"
                                    >
                                        <input id="three" className="checkbox" type="checkbox" style={{display: 'none'}}/>
                                        <span className="room-item">3</span>
                                    </label>
                                    <label
                                        htmlFor="four"
                                    >
                                        <input id="four" className="checkbox" type="checkbox" style={{display: 'none'}}/>
                                        <span className="room-item">4</span>
                                    </label>
                                    <label
                                        htmlFor="five"
                                    >
                                        <input id="five" className="checkbox" type="checkbox" style={{display: 'none'}}/>
                                        <span className="room-item">5</span>
                                    </label>
                                </div>
                            </div>
                            {/*<div className="filter-wrapper">*/}
                            {/*    <div className="filter-title">*/}
                            {/*        Этаж*/}
                            {/*    </div>*/}
                            {/*    <div className="filter-input">*/}
                            {/*        <MultiRangeSlider*/}
                            {/*            min={2}*/}
                            {/*            max={19}*/}
                            {/*            onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <div className="split-filters">
                                <div className="filter-wrapper">
                                    <div className="filter-title">
                                        Окна на
                                    </div>
                                    <div
                                        className="checkbox-filters"
                                    >
                                        <div className="check-wrapper">
                                            <input id="yard" className="checkbox" type="checkbox"/>
                                            <label htmlFor="yard">двор</label>
                                        </div>
                                        <div className="check-wrapper">
                                            <input id="park" className="checkbox" type="checkbox"/>
                                            <label htmlFor="park">парк</label>
                                        </div>
                                        <div className="check-wrapper">
                                            <input id="city" className="checkbox" type="checkbox"/>
                                            <label htmlFor="city">город</label>
                                        </div>
                                        <div className="check-wrapper">
                                            <input id="sight" className="checkbox" type="checkbox"/>
                                            <label htmlFor="sight">достопримечательность</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="filter-wrapper">
                                    <div className="filter-title">
                                        Редкие форматы
                                    </div>
                                    <div
                                        className="checkbox-filters"
                                    >
                                        <div className="check-wrapper">
                                            <input id="threeSide" className="checkbox" type="checkbox"/>
                                            <label htmlFor="threeSide">трехсторонняя</label>
                                        </div>
                                        <div className="check-wrapper">
                                            <input id="bathWindow" className="checkbox" type="checkbox"/>
                                            <label htmlFor="bathWindow">с окном в ванной</label>
                                        </div>
                                        <div className="check-wrapper">
                                            <input id="patio" className="checkbox" type="checkbox"/>
                                            <label htmlFor="patio">с патио</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="close-filters-button"
                            onClick={() => setShowSidebar(false)}
                        >
                        </div>
                        <div className="buttons-wrapper">
                            <Button
                                className="filter-button"
                                onClick={() => {
                                    setPage(0)
                                    setFiltredAparts(apartBase)
                                    setApartments(apartBase.multiget(0 , limit))
                                    setShowSidebar(false)
                                    let rooms = []
                                    apartBase.map(item => {
                                        rooms.push({type: "apart", building: item.building, number: item.number})
                                    })
                                    $host.post('/', {rooms})
                                }}
                            >
                                Сбросить фильтр
                            </Button>
                            <Button
                                className="filter-button"
                                onClick={() => {
                                    setPage(0)
                                    setFilters()
                                    setShowSidebar(false)
                                }}
                            >
                                Применить
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Apartments;


// const getApartments = async (change) => {
//     if(change === 'none'){
//         await $host.get('/apartments/' + page).then(result => {
//             console.log(result)
//             setApartQuantity(result.data.count)
//             setApartments(result.data.results)
//             console.log(apartments)
//         })
//     } else if(change === 'next'){
//         if(page === Math.round(apartQuantity/limit)){
//             await $host.get('/apartments/' + page).then(result => {
//                 console.log(result)
//                 setApartQuantity(result.data.count)
//                 setApartments(result.data.results)
//                 console.log(apartments)
//             })
//         } else {
//             const newPage = page + 1
//             await $host.get('/apartments/' + newPage).then(result => {
//                 console.log(result)
//                 setApartQuantity(result.data.count)
//                 setApartments(result.data.results)
//                 console.log(apartments)
//             })
//             setPage(page + 1)
//         }
//     } else if (change === 'prev'){
//         if(page === 0){
//             await $host.get('/apartments/' + page).then(result => {
//                 console.log(result)
//                 setApartQuantity(result.data.count)
//                 setApartments(result.data.results)
//                 console.log(apartments)
//             })
//         } else{
//             const newPage = page - 1
//             await $host.get('/apartments/' + newPage).then(result => {
//                 console.log(result)
//                 setApartQuantity(result.data.count)
//                 setApartments(result.data.results)
//                 console.log(apartments)
//             })
//             setPage(page - 1)
//         }
//     }
// }