import React, {useState} from 'react';
import {images} from '../data/data'
import {Image} from "react-bootstrap";
import {useNavigate} from "react-router";
import {MAIN_PAGE_ROUTE} from "../utils/consts";
import levelLogo from '../img/LevelLogo.svg'

const Gallery = ({showGallery, hideGallery}) => {
    const navigate = useNavigate()
    const [isPressed, setIsPressed] = useState(false)
    const [pressedPoint, setPressedPoint] = useState(0)
    const [diffX, setDiffX] = useState(0)
    const [cursorX, setCursorX] = useState(0)
    const [curImage, setCurImage] = useState(0)
    const availableScreenWidth = window.screen.availWidth

    return (
        <div
            className="gallery-wrapper"
            style={showGallery ? {display: "flex"} : {display: "none"}}
        >
            <div className="gallery">
                <div
                    className="gallery-inner"
                    style={{left: `${isPressed ? cursorX - diffX : (- availableScreenWidth * curImage)}px`,
                        transition: `${isPressed ? 0 : .2}s`}}
                    // style={{left: `${isPressed ? cursorX - diffX : (-100 * curImage)}vw`}}
                    // style={{left: `${-100 * curImage}vw`}}
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
                            key={image.id}
                        >
                            <Image className="gallery-image" src={image.img}/>
                        </div>
                    )}
                </div>
            </div>
            <div className="gallery-footer">
                <div className="logo">
                    <Image className="logo-image" src={levelLogo}/><span>Нижегородская</span>
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
                    onClick={hideGallery}
                >
                </div>
            </div>
        </div>
    );
};

export default Gallery;