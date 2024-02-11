import React, {useState} from 'react';
import {Button, Image} from "react-bootstrap";
import heartImage from "../img/heart.svg";
import imgIcon from "../img/imgIcon.svg";
import {useEffect} from "react";

const Modal = ({show, onHide, room, openGallery, setGalleryImages}) => {
    const [currentImage, setCurrentImage] = useState(0)

    useEffect( () => {
        if(show === true)
            setCurrentImage(0)
    }, [show])

    const setCurrent = (number) => {
        document.getElementById('btn-0').classList.remove('active')
        document.getElementById('btn-1').classList.remove('active')
        document.getElementById('btn-' + number).classList.add('active')
    }

    return (
        <div
            style={show ? {display: "block"} : {display: "none"}}
            className="modal-outer"
        >
            <div
                className="close-button"
                onClick={onHide}
            >
            </div>
            {room ?
                <div className="modal-container">
                    <div className="left-side">
                        <div className="content-wrapper">
                            <div className="article">{room.number}</div>
                            <div className="title">
                                Помещение
                            </div>
                            <div className="characters">
                                <div className="character-item">
                                    <div className="character-title">
                                        Площадь
                                    </div>
                                    <div className="character-value">
                                        {room.area} м²
                                    </div>
                                </div>
                                <div className="character-item">
                                    <div className="character-title">
                                        Корпус
                                    </div>
                                    <div className="character-value">
                                        {room.section_title}
                                    </div>
                                </div>
                                <div className="character-item">
                                    <div className="character-title">
                                        Этаж
                                    </div>
                                    <div className="character-value">
                                        {room.floor.number}
                                    </div>
                                </div>
                                <div className="character-item">
                                    <div className="character-title">
                                        Цена за м²
                                    </div>
                                    <div className="character-value">
                                        {room.ppm.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽
                                    </div>
                                </div>
                                <div className="character-item">
                                    <div className="character-title">
                                        Тип сделки
                                    </div>
                                    <div className="character-value">
                                        {room.type_of_advertisement}
                                    </div>
                                </div>
                            </div>
                            <div className="price">
                                <div className="price-value">
                                    {room.price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right-side">
                        <div className="slider-outer">
                            <div className="slider-wrapper">
                                <div
                                    className="images-wrapper"
                                    style={{marginLeft: `${currentImage * (-45)}em`}}
                                >
                                    <div
                                        className="slider-image"
                                    >
                                        <Image className="plan-wrapper" src={room.plan}/>
                                    </div>
                                    <div
                                        className="slider-image"
                                    >
                                        <div className="plan-wrapper">
                                            <svg
                                                className="svg-polygon"
                                                x="0px" y="0px"
                                                viewBox="0 0 1920 1080"
                                                style={{display: `${currentImage === 1 ? 'block' : 'none'}`}}
                                            >
                                                <polygon points={room.hover.split('"')[1]}/>
                                            </svg>
                                            <Image
                                                style={{width: "45em"}}
                                                className="inner-image"
                                                src={room.floor.plan_png}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="buttons-wrapper">
                                <div
                                    id="btn-0"
                                    className="button active"
                                    onClick={() => {
                                        setCurrent(0)
                                        setCurrentImage(0)
                                    }}
                                >
                                    Планировка
                                </div>
                                <div
                                    id="btn-1"
                                    className="button"
                                    onClick={() => {
                                        setCurrent(1)
                                        setCurrentImage(1)
                                    }}
                                >
                                    План этажа
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : <div></div>
            }
        </div>
    );
};

export default Modal;