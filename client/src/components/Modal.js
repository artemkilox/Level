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
                            <div className="article">{room.article}</div>
                            <div className="title">{room.title}</div>
                            <div className="characters">
                                {room.characters.map(character =>
                                    <div className="character-item"
                                         key={character.title}
                                    >
                                        <div className="character-title">
                                            {character.title}
                                        </div>
                                        <div className="character-value">
                                            {character.value}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="price">
                                <div className="timer">
                                    Цена по акции <span>{room.saleDate}</span>
                                </div>
                                <div className="price-value">
                                    {room.price}
                                </div>
                                <div className="sale">
                                    Со скидкой <span>{room.salePrice}</span>
                                </div>
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
                            <div className="icon">
                                <Image className="icon-image" src={room.supportItem}/>
                            </div>
                            <div className="tags-wrapper">
                                <div className="tags">
                                    {room.tags.map(tag =>
                                        <div
                                            className="tag-item"
                                        >{tag}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="slider-outer">
                            <div className="slider-wrapper">
                                <div
                                    className="images-wrapper"
                                    style={{marginLeft: `${currentImage * (-35)}em`}}
                                >
                                    {room.img.map(image =>
                                        <div
                                            className="slider-image"
                                        >
                                            <Image src={image}/>
                                        </div>
                                    )}
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