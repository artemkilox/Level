import React, {useState} from 'react';
import Modal from "./Modal";
import {Button, Image} from "react-bootstrap";
import heartImage from "../img/heart.svg";
import levelLogoBlack from "../img/LevelLogoBlack.svg";
import filterIcon from "../img/filterIcon.svg";
import carIcon from "../img/carIcon.svg";
import MultiRangeSlider from "./MultiRangeSlider";
import {useEffect} from "react";
import ParkingModal from "./ParkingModal";
import {$host} from "../http";

const Parking = ({showParking, hideParking, loadedParking}) => {

    Array.prototype.multiget = function(){
        var args = Array.apply(null, arguments);
        var result = [];
        for(var i = args[0]; i < args[1]; i++){
            result.push(this[i]);
        }
        return result;
    }
    const onHide = () => {
        setShowModal(false)
        let rooms = []
        loadedParking.map(item => {
            rooms.push({type: "parking", building: item.building, number: item.number})
        })
        $host.post('/', {rooms})
        setSelectedRoom('')
    }
    const [showModal, setShowModal] = useState(false)
    const [selectedRoom, setSelectedRoom] = useState('')
    const limit = 10
    const [parking, setParking] = useState([])
    const [parkingBase, setParkingBase] = useState([])
    const [showOverlay, setShowOverlay] = useState(true)
    const [parkingFiltred, setParkingFiltred] = useState([])
    const [page, setPage] = useState(0)

    useEffect(() => {
        if(showParking){
            setParking(loadedParking.multiget(0 , limit))
            setParkingBase(loadedParking)
            setParkingFiltred(loadedParking)
        }
    }, [showParking])

    return (
        <div
            className="apartments-wrapper"
            style={showParking ? {display: "flex"} : {display: "none"}}
        >
            <ParkingModal
                show={showModal}
                onHide={onHide}
                room={selectedRoom}
            />
            <div className="content-outer">
                <div className="content-wrapper">
                    <div className="apartments">
                        {parking !== [] ? parking.map(parkPlace =>
                            <div
                                className="apartments-item"
                                key={parkPlace.id}
                                onClick={() => {
                                    setSelectedRoom(parkPlace)
                                    let rooms = []
                                    rooms.push({type: "parking", building: parkPlace.building, number: parkPlace.number})
                                    $host.post('/', {rooms})
                                    setShowModal(true)
                                }}
                            >
                                <div className="left-side">
                                    <div className="article">
                                        {parkPlace.number}
                                    </div>
                                    <div className="image-wrapper">
                                        <Image
                                            className="image"
                                            src={carIcon}
                                        />
                                    </div>
                                </div>
                                <div className="right-side">
                                    <div className="title">
                                        Парковочное место
                                    </div>
                                    <div className="characters">
                                        <div className="character-item">
                                            <div className="character-title">
                                                Площадь
                                            </div>
                                            <div className="character-value">
                                                {parkPlace.area} м²
                                            </div>
                                        </div>
                                        <div className="character-item">
                                            <div className="character-title">
                                                Этаж
                                            </div>
                                            <div className="character-value">
                                                {parkPlace.floor_number}
                                            </div>
                                        </div>
                                        <div className="character-item">
                                            <div className="character-title">
                                                Размещение
                                            </div>
                                            <div className="character-value">
                                                {parkPlace.building_title}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bottom-wrapper">
                                        <div className="price">
                                            <div className="price-value">
                                                {/*{parkPlace.price}*/}
                                                {parkPlace.price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽
                                            </div>
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
                    {parking.length === 0 ? <div>Таких парковочных мест нет</div> : <div></div>}
                    <div className="pagination">
                        <div
                            className="prev-page first"
                            onClick={() => {
                                if(page > 0){
                                    setParking(parkingFiltred.multiget(0 , limit))
                                    setPage(0)
                                }
                            }}
                        >
                            {"<<"}
                        </div>
                        <div
                            className="prev-page"
                            onClick={() => {
                                if(page > 0){
                                    setParking(parkingFiltred.multiget(limit * (page - 1) , (limit * (page - 1)) + limit))
                                    setPage(page - 1)
                                }
                            }}
                        >
                            {"<"}
                        </div>
                        <div className="page">
                            {parkingFiltred.length > 0 ?
                                <div>{page + 1} / {Math.round(parkingFiltred.length/limit)}</div> :
                                <div>Загрузка...</div>
                            }
                        </div>
                        <div
                            className="next-page"
                            onClick={() => {
                                if(page < Math.round(parkingFiltred.length/limit)-1){
                                    setParking(parkingFiltred.multiget(limit * (page + 1) ,
                                        Math.round(parkingFiltred.length/limit) - (page + 1) === 1 ?
                                            parkingFiltred.length
                                            : (limit * (page + 1)) + limit))
                                    setPage(page + 1)
                                }
                            }}
                        >
                            {">"}
                        </div>
                        <div
                            className="next-page last"
                            onClick={() => {
                                if(page < Math.round(parkingFiltred.length/limit)-1){
                                    setParking(parkingFiltred.multiget(limit * (Math.round(parkingFiltred.length/limit)-1) ,
                                        Math.round(parkingFiltred.length/limit) - (Math.round(parkingFiltred.length/limit)-1) === 1 ?
                                            parkingFiltred.length
                                            : (limit * (Math.round(parkingFiltred.length/limit))-1) + limit))
                                    setPage(Math.round(parkingFiltred.length/limit)-1)
                                }
                            }}
                        >
                            {">>"}
                        </div>
                    </div>
                    <div
                        className="logo"
                        style={showOverlay ? {display: "flex"} : {display: "none"}}
                    >
                        <Image src={levelLogoBlack}/>
                        {/*<span>Нижегородская</span>*/}
                    </div>
                    <div
                        className="back-btn-wrapper"
                        onClick={hideParking}
                        style={showOverlay ? {display: "block"} : {display: "none"}}
                    >
                        <div
                            className="back-btn"

                        >
                        </div>
                    </div>
                </div>
            </div>
            {/*<div*/}
            {/*    className="sidebar-wrapper"*/}
            {/*    style={showOverlay ? {display: "block"} : {display: "none"}}*/}
            {/*>*/}
            {/*    <div*/}
            {/*        className="sidebar-title"*/}
            {/*        style={showSidebar ? {display: "none"} : {display: "block"}}*/}
            {/*        onClick={() => setShowSidebar(true)}*/}
            {/*    >*/}
            {/*        <Image className="side-icon" src={filterIcon}/> Фильтрация*/}
            {/*    </div>*/}
            {/*    <div*/}
            {/*        className={showSidebar ? "sidebar open-sidebar" : "sidebar"}*/}
            {/*    >*/}
            {/*        <div*/}
            {/*            className={showSidebar ? "sidebar-inner show-sidebar-inner" : "sidebar-inner"}*/}
            {/*        >*/}
            {/*            <div className="filters-outer">*/}
            {/*                <div className="filter-wrapper">*/}
            {/*                    <div className="filter-title">*/}
            {/*                        Стоимость, <span>млн руб.</span>*/}
            {/*                    </div>*/}
            {/*                    <div className="filter-input">*/}
            {/*                        <MultiRangeSlider*/}
            {/*                            min={13.7}*/}
            {/*                            max={65.6}*/}
            {/*                            onChange={({ min, max }) => {*/}
            {/*                                setMinPrice(min)*/}
            {/*                                setMaxPrice(max)*/}
            {/*                            }}*/}
            {/*                        />*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*                <div className="filter-wrapper">*/}
            {/*                    <div className="filter-title">*/}
            {/*                        Площадь квартиры, <span> м²</span>*/}
            {/*                    </div>*/}
            {/*                    <div className="filter-input">*/}
            {/*                        <MultiRangeSlider*/}
            {/*                            min={17}*/}
            {/*                            max={344}*/}
            {/*                            onChange={({ min, max }) => {*/}
            {/*                                setMinArea(min)*/}
            {/*                                setMaxArea(max)*/}
            {/*                            }}*/}
            {/*                        />*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*                <div className="filter-wrapper">*/}
            {/*                    <div className="filter-title">*/}
            {/*                        Количество комнат*/}
            {/*                    </div>*/}
            {/*                    <div className="rooms">*/}
            {/*                        <label*/}
            {/*                            htmlFor="stud"*/}
            {/*                        >*/}
            {/*                            <input id="stud" className="checkbox" type="checkbox" style={{display: 'none'}}/>*/}
            {/*                            <span className="room-item">Ст</span>*/}
            {/*                        </label>*/}
            {/*                        <label*/}
            {/*                            htmlFor="one"*/}
            {/*                        >*/}
            {/*                            <input id="one" className="checkbox" type="checkbox" style={{display: 'none'}}/>*/}
            {/*                            <span className="room-item">1</span>*/}
            {/*                        </label>*/}
            {/*                        <label*/}
            {/*                            htmlFor="two"*/}
            {/*                        >*/}
            {/*                            <input id="two" className="checkbox" type="checkbox" style={{display: 'none'}}/>*/}
            {/*                            <span className="room-item">2</span>*/}
            {/*                        </label>*/}
            {/*                        <label*/}
            {/*                            htmlFor="three"*/}
            {/*                        >*/}
            {/*                            <input id="three" className="checkbox" type="checkbox" style={{display: 'none'}}/>*/}
            {/*                            <span className="room-item">3</span>*/}
            {/*                        </label>*/}
            {/*                        <label*/}
            {/*                            htmlFor="four"*/}
            {/*                        >*/}
            {/*                            <input id="four" className="checkbox" type="checkbox" style={{display: 'none'}}/>*/}
            {/*                            <span className="room-item">4</span>*/}
            {/*                        </label>*/}
            {/*                        <label*/}
            {/*                            htmlFor="five"*/}
            {/*                        >*/}
            {/*                            <input id="five" className="checkbox" type="checkbox" style={{display: 'none'}}/>*/}
            {/*                            <span className="room-item">5</span>*/}
            {/*                        </label>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*                <div className="split-filters">*/}
            {/*                    <div className="filter-wrapper">*/}
            {/*                        <div className="filter-title">*/}
            {/*                            Окна на*/}
            {/*                        </div>*/}
            {/*                        <div*/}
            {/*                            className="checkbox-filters"*/}
            {/*                        >*/}
            {/*                            <div className="check-wrapper">*/}
            {/*                                <input id="yard" className="checkbox" type="checkbox"/>*/}
            {/*                                <label htmlFor="yard">двор</label>*/}
            {/*                            </div>*/}
            {/*                            <div className="check-wrapper">*/}
            {/*                                <input id="park" className="checkbox" type="checkbox"/>*/}
            {/*                                <label htmlFor="park">парк</label>*/}
            {/*                            </div>*/}
            {/*                            <div className="check-wrapper">*/}
            {/*                                <input id="city" className="checkbox" type="checkbox"/>*/}
            {/*                                <label htmlFor="city">город</label>*/}
            {/*                            </div>*/}
            {/*                            <div className="check-wrapper">*/}
            {/*                                <input id="sight" className="checkbox" type="checkbox"/>*/}
            {/*                                <label htmlFor="sight">достопримечательность</label>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <div className="filter-wrapper">*/}
            {/*                        <div className="filter-title">*/}
            {/*                            Редкие форматы*/}
            {/*                        </div>*/}
            {/*                        <div*/}
            {/*                            className="checkbox-filters"*/}
            {/*                        >*/}
            {/*                            <div className="check-wrapper">*/}
            {/*                                <input id="threeSide" className="checkbox" type="checkbox"/>*/}
            {/*                                <label htmlFor="threeSide">трехсторонняя</label>*/}
            {/*                            </div>*/}
            {/*                            <div className="check-wrapper">*/}
            {/*                                <input id="bathWindow" className="checkbox" type="checkbox"/>*/}
            {/*                                <label htmlFor="bathWindow">с окном в ванной</label>*/}
            {/*                            </div>*/}
            {/*                            <div className="check-wrapper">*/}
            {/*                                <input id="patio" className="checkbox" type="checkbox"/>*/}
            {/*                                <label htmlFor="patio">с патио</label>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div*/}
            {/*                className="close-filters-button"*/}
            {/*                onClick={() => setShowSidebar(false)}*/}
            {/*            >*/}
            {/*            </div>*/}
            {/*            <div className="buttons-wrapper">*/}
            {/*                <Button*/}
            {/*                    className="filter-button"*/}
            {/*                    onClick={() => {*/}
            {/*                        setPage(0)*/}
            {/*                        setFiltredAparts(apartBase)*/}
            {/*                        setApartments(apartBase.multiget(0 , limit))*/}
            {/*                    }}*/}
            {/*                >*/}
            {/*                    Сбросить фильтр*/}
            {/*                </Button>*/}
            {/*                <Button*/}
            {/*                    className="filter-button"*/}
            {/*                    onClick={() => {*/}
            {/*                        setPage(0)*/}
            {/*                        setFilters()*/}
            {/*                        setShowSidebar(false)*/}
            {/*                    }}*/}
            {/*                >*/}
            {/*                    Применить*/}
            {/*                </Button>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};

export default Parking;