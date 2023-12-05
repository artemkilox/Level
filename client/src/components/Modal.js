import React, {useState} from 'react';
import {Button, Image} from "react-bootstrap";
import heartImage from "../img/heart.svg";
import imgIcon from "../img/imgIcon.svg";

//////////////////////////////////////////
import apartment1 from "../img/apartments/apartment.jpg";
import star from "../img/starBlack.png";
import galleryImage1 from "../img/архитектура 2.jpg";
import galleryImage2 from "../img/благоустройство.jpg";
import galleryImage3 from "../img/благоустройство 2.jpg";
///////////////////////////////////////////


const Modal = ({show, onHide, room, openGallery, setGalleryImages}) => {
    const [currentImage, setCurrentImage] = useState(0)

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

    const parser = new DOMParser();

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
                                {/*{room.title}*/}
                                Квартира
                            </div>
                            <div className="characters">
                                {/*{room.characters.map(character =>*/}
                                {/*    <div className="character-item"*/}
                                {/*         key={character.title}*/}
                                {/*    >*/}
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
                                        {room.area} м²
                                    </div>
                                </div>
                                <div className="character-item">
                                    <div className="character-title">
                                        Комнат
                                    </div>
                                    <div className="character-value">
                                        {room.room} к
                                    </div>
                                </div>
                                <div className="character-item">
                                    <div className="character-title">
                                        Отделка
                                    </div>
                                    <div className="character-value">
                                        {room.renovation}
                                    </div>
                                </div>
                                <div className="character-item">
                                    <div className="character-title">
                                        Этаж
                                    </div>
                                    <div className="character-value">
                                        {room.floor} из {room.floors_total}
                                    </div>
                                </div>
                                <div className="character-item">
                                    <div className="character-title">
                                        Корпус
                                    </div>
                                    <div className="character-value">
                                        {room.building}
                                    </div>
                                </div>
                                <div className="character-item">
                                    <div className="character-title">
                                        Окна на
                                    </div>
                                    <div className="character-value">
                                        {room.windows_located}
                                    </div>
                                </div>
                            </div>
                            <div className="price">
                                {/*<div className="timer">*/}
                                {/*    Цена по акции <span>{room.saleDate}</span>*/}
                                {/*</div>*/}
                                <div className="price-value">
                                    {room.price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽
                                </div>
                                {/*<div className="sale">*/}
                                {/*    Со скидкой <span>{room.salePrice}</span>*/}
                                {/*</div>*/}
                            </div>
                            {/*<div className="follow">*/}
                            {/*    <div className="follow-item">*/}
                            {/*        <Image src={heartImage}/>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                    <div className="right-side">
                        <div className="top-content">
                            {/*<div className="icon">*/}
                            {/*    <Image className="icon-image" src={room.supportItem}/>*/}
                            {/*</div>*/}
                            <div className="tags-wrapper">
                                <div className="tags">
                                    {/*{room.tags.map(tag =>*/}
                                    {/*    <div*/}
                                    {/*        className="tag-item"*/}
                                    {/*    >{tag}</div>*/}
                                    {/*)}*/}
                                </div>
                            </div>
                        </div>
                        <div className="slider-outer">
                            <div className="slider-wrapper">
                                <div
                                    className="images-wrapper"
                                    style={{marginLeft: `${currentImage * (-35)}em`}}
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
                                                <polygon points={room.hover}/>
                                            </svg>
                                            <Image className="inner-image" src={room.floor_plan}/>
                                        </div>
                                    </div>
                                    {/*<div*/}
                                    {/*    className="slider-image"*/}
                                    {/*>*/}
                                    {/*    <Image src={room.plan}/>*/}
                                    {/*</div>*/}


                                    {/*{newRoom.img.map(image =>*/}
                                    {/*    <div*/}
                                    {/*        className="slider-image"*/}
                                    {/*    >*/}
                                    {/*        <Image src={image}/>*/}
                                    {/*    </div>*/}
                                    {/*)}*/}
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
                                <div
                                    id="btn-2"
                                    className="button"
                                    onClick={() => {
                                        setCurrent(2)
                                        setCurrentImage(2)
                                    }}
                                >
                                    Вид на генплане
                                </div>
                            </div>
                        </div>
                        <div className="gallery-button">
                            <Image
                                className="gallery-button-icon"
                                src={imgIcon}
                                onClick={ () => {
                                    setGalleryImages(room.galleryImages)
                                    openGallery()
                                }}
                            />
                        </div>
                    </div>
                </div> : <div></div>
            }
        </div>
    );
};

export default Modal;