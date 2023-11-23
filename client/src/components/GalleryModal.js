import React from 'react';
import {Image} from "react-bootstrap";
import {MAIN_PAGE_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router";
import {useState} from "react";
import levelLogo from '../img/LevelLogo.svg'

const GalleryModal = ({show, close, images}) => {
    const navigate = useNavigate()
    const [isPressed, setIsPressed] = useState(false)
    const [pressedPoint, setPressedPoint] = useState(0)
    const [diffX, setDiffX] = useState(0)
    const [cursorX, setCursorX] = useState(0)
    const [curImage, setCurImage] = useState(0)
    const availableScreenWidth = window.screen.availWidth

    console.log(images)

    return (
        <div
            className="gallery-wrapper"
            style={show ? {display: "block"} : {display: "none"}}
        >
            <div
                className="back-button-modal"
                onClick={close}
            >
                <div></div>
                Назад
            </div>
            <div className="gallery">
                <div
                    className="gallery-inner"
                    style={{left: `${isPressed ? cursorX - diffX : (- availableScreenWidth * curImage)}px`,
                        transition: `${isPressed ? 0 : .2}s`}}
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
                        if(diffX > 300 && curImage < (images.length - 1)){
                            setCursorX(-availableScreenWidth * (curImage+1))
                            setCurImage(curImage+1)
                        } else if(diffX < -300 && curImage > 0){
                            setCursorX(-availableScreenWidth * (curImage-1))
                            setCurImage(curImage-1)
                        }
                        setDiffX(0)
                        setIsPressed(false)
                    }}
                >
                    {images.map(image =>
                        <div
                            className="gallery-item"
                            key={image}
                        >
                            <Image className="gallery-image" src={image}/>
                        </div>
                    )}
                </div>
            </div>
            <div className="gallery-footer">
                <div className="logo">
                    <Image className="logo-image" src={levelLogo}/><span>Академическая</span>
                </div>
                <div className="buttons">
                    <div
                        className="prev"
                        onClick={() => curImage > 0 ? setCurImage(curImage-1) : curImage}
                    >
                        <div></div>
                    </div>
                    <div className="numbers">
                        {curImage+1}/{images.length}
                    </div>
                    <div
                        className="next"
                        onClick={() => curImage < images.length - 1 ? setCurImage(curImage+1) : curImage}
                    >
                        <div></div>
                    </div>
                </div>
                <div
                    className="back-button"
                    onClick={() => navigate(MAIN_PAGE_ROUTE)}
                >
                </div>
            </div>
        </div>)
};

export default GalleryModal;