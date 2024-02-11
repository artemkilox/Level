import React, {useState} from 'react';
import {Button, Image} from "react-bootstrap";
import heartImage from "../img/heart.svg";
import imgIcon from "../img/imgIcon.svg";
import carIcon from "../img/carIcon.svg";
import {useEffect} from "react";

//////////////////////////////////////////
// import apartment1 from "../img/apartments/apartment.jpg";
// import star from "../img/starBlack.png";
// import galleryImage1 from "../img/архитектура 2.jpg";
// import galleryImage2 from "../img/благоустройство.jpg";
// import galleryImage3 from "../img/благоустройство 2.jpg";
///////////////////////////////////////////


const Modal = ({show, onHide, room, openGallery, setGalleryImages}) => {
    const [currentImage, setCurrentImage] = useState(0)

    useEffect( () => {
        if(show === true)
            setCurrentImage(0)
    }, [show])

    // const newRoom = {id: 1, img: [apartment1, apartment1, apartment1],
    //     article: 'K1-H8', title: "Аренда", characters: [{title: 'Площадь', value: "30 м²"},
    //         {title: 'Корпус', value: "1"}, {title: 'Этаж', value: "1 из 29"}, {title: 'Цена за м²', value: "486 645 ₽"},
    //         {title: 'Срок сдачи', value: "1 кв. 2026 г."}], saleDate: "до 31.07", price: "894 079 ₽/мес", salePrice: "762 755 ₽/мес",
    //     tags: ['постирочная', 'мастер-спальня', 'гардеробная', 'моллированное окно'], supportItem: star,
    //     galleryImages: [galleryImage1, galleryImage2, galleryImage3]}

    const setCurrent = (number) => {
        document.getElementById('btn-0').classList.remove('active')
        document.getElementById('btn-1').classList.remove('active')
        document.getElementById('btn-2').classList.remove('active')
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
                                Кладовая
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
                                        Этаж
                                    </div>
                                    <div className="character-value">
                                        {room.floor_number}
                                    </div>
                                </div>
                                {/*<div className="character-item">*/}
                                {/*    <div className="character-title">*/}
                                {/*        Размещение*/}
                                {/*    </div>*/}
                                {/*    <div className="character-value">*/}
                                {/*        {room.building_title}*/}
                                {/*    </div>*/}
                                {/*</div>*/}
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
                                        <div className="plan-wrapper">
                                            <svg
                                                className="svg-polygon"
                                                x="0px" y="0px"
                                                viewBox="0 0 1920 1080"
                                                style={{opacity: 1, fill: "red"}}
                                            >
                                                <polygon points={room.hover}/>
                                            </svg>
                                            <Image
                                                style={{width: "45em"}}
                                                className="inner-image"
                                                src="https://storage.yandexcloud.net/level-media/floor/plan/9bcf8f7c517216bebd4eaf7aa570c25fe38e9015.png"
                                            />
                                        </div>
                                    </div>
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