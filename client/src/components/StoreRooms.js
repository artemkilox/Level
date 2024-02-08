import React, {useState} from 'react';
import Modal from "./Modal";
import {Button, Image} from "react-bootstrap";
import heartImage from "../img/heart.svg";
import levelLogoBlack from "../img/LevelLogoBlack.svg";
import filterIcon from "../img/filterIcon.svg";
import bagsIcon from "../img/bagsIcon.svg";
import MultiRangeSlider from "./MultiRangeSlider";
import {useEffect} from "react";
import ParkingModal from "./ParkingModal";
import PantryModal from "./PantryModal";
import {$host} from "../http";

const StoreRooms = ({showPantry, hidePantry, loadedPantry}) => {

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
        loadedPantry.map(item => {
            rooms.push({type: "pantry", building: item.building, number: item.number})
        })
        $host.post('/', {rooms})
        setSelectedRoom('')
    }
    const [showModal, setShowModal] = useState(false)
    const [selectedRoom, setSelectedRoom] = useState('')
    const limit = 10
    const [pantry, setPantry] = useState([])
    const [pantryFiltred, setPantryFiltred] = useState([])

    const [showOverlay, setShowOverlay] = useState(true)
    const [page, setPage] = useState(0)

    useEffect(() => {
        if(showPantry){
            setPantry(loadedPantry.multiget(0 , loadedPantry.length > limit ? limit : loadedPantry.length))
            setPantryFiltred(loadedPantry)
        }
    }, [showPantry])

    // console.log(pantry)

    return (
        <div
            className="apartments-wrapper"
            style={showPantry ? {display: "flex"} : {display: "none"}}
        >
            <PantryModal
                show={showModal}
                onHide={onHide}
                room={selectedRoom}
            />
            <div className="content-outer">
                <div className="content-wrapper">
                    <div className="apartments">
                        {pantry !== [] ? pantry.map(pantr =>
                            <div
                                className="apartments-item"
                                key={pantr.id}
                                onClick={() => {
                                    setSelectedRoom(pantr)
                                    let rooms = []
                                    rooms.push({type: "pantry", building: pantr.building, number: pantr.number})
                                    $host.post('/', {rooms})
                                    setShowModal(true)
                                }}
                            >
                                <div className="left-side">
                                    <div className="article">
                                        {pantr.number}
                                    </div>
                                    <div className="image-wrapper">
                                        <Image
                                            className="image"
                                            src={bagsIcon}
                                        />
                                    </div>
                                </div>
                                <div className="right-side">
                                    <div className="title">
                                        Кладовка
                                    </div>
                                    <div className="characters">
                                        <div className="character-item">
                                            <div className="character-title">
                                                Площадь
                                            </div>
                                            <div className="character-value">
                                                {pantr.area} м²
                                            </div>
                                        </div>
                                        <div className="character-item">
                                            <div className="character-title">
                                                Этаж
                                            </div>
                                            <div className="character-value">
                                                {pantr.floor_number}
                                            </div>
                                        </div>
                                        {/*<div className="character-item">*/}
                                        {/*    <div className="character-title">*/}
                                        {/*        Размещение*/}
                                        {/*    </div>*/}
                                        {/*    <div className="character-value">*/}
                                        {/*        {pantr.building_title}*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                    </div>
                                    <div className="bottom-wrapper">
                                        <div className="price">
                                            <div className="price-value">
                                                {pantr.price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽
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
                    {pantry.length === 0 ? <div>Таких парковочных мест нет</div> : <div></div>}
                    <div className="pagination">
                        <div
                            className="prev-page first"
                            onClick={() => {
                                if(page > 0){
                                    setPantry(pantryFiltred.multiget(0 , limit))
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
                                    setPantry(pantryFiltred.multiget(limit * (page - 1) , (limit * (page - 1)) + limit))
                                    setPage(page - 1)
                                }
                            }}
                        >
                            {"<"}
                        </div>
                        <div className="page">
                            {pantryFiltred.length > 0 ?
                                <div>{page + 1} / {Math.round(pantryFiltred.length/limit)}</div> :
                                <div>Загрузка...</div>
                            }
                        </div>
                        <div
                            className="next-page"
                            onClick={() => {
                                if(page < Math.round(pantryFiltred.length/limit)-1){
                                    setPantry(pantryFiltred.multiget(limit * (page + 1) ,
                                        Math.round(pantryFiltred.length/limit) - (page + 1) === 1 ?
                                            pantryFiltred.length
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
                                if(page < Math.round(pantryFiltred.length/limit)-1){
                                    setPantry(pantryFiltred.multiget(limit * (Math.round(pantryFiltred.length/limit)-1) ,
                                        Math.round(pantryFiltred.length/limit) - (Math.round(pantryFiltred.length/limit)-1) === 1 ?
                                            pantryFiltred.length
                                            : (limit * (Math.round(pantryFiltred.length/limit))-1) + limit))
                                    setPage(Math.round(pantryFiltred.length/limit)-1)
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
                        <Image src={levelLogoBlack}/><span>Нижегородская</span>
                    </div>
                    <div
                        className="back-btn-wrapper"
                        onClick={hidePantry}
                        style={showOverlay ? {display: "block"} : {display: "none"}}
                    >
                        <div
                            className="back-btn"
                        >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoreRooms;