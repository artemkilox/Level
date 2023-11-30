import React, {useState} from 'react';
import {Button, Image} from "react-bootstrap";
import heartImage from "../img/heart.svg";
import imgIcon from "../img/imgIcon.svg";

const Modal = ({show, onHide, room, openGallery, setGalleryImages}) => {
    const [currentImage, setCurrentImage] = useState(0)

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
                                        <Image src={room.plan}/>
                                    </div>
                                    <div
                                        className="slider-image"
                                    >
                                        <svg
                                             className="svg-polygon"
                                             x="0px" y="0px"
                                             viewBox="0 0 1920 1080"
                                        >
                                            {/*<polygon points="70.9,12.9 89.7,51.1 131.8,57.2 101.3,86.9 108.5,128.8 70.9,109 33.2,128.8 40.4,86.9 9.9,57.2 52,51.1 " style={{fill: '#000'}}/>*/}
                                            <polygon points={room.hover}/>
                                            {/*<polygon style={{fill: '#000', opacity: 1, stroke: "#000", strokeWidth :"1"}} points={room.floor_hover.split('"')[1]} />*/}
                                        </svg>
                                        {/*/!*{parser.parseFromString(room.floor_hover, 'text/html')}*!/*/}
                                        <Image className="inner-image" src={room.floor_plan}/>
                                    </div>
                                    <div
                                        className="slider-image"
                                    >
                                        <Image src={room.plan}/>
                                    </div>

                                    {/*{room.img.map(image =>*/}
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