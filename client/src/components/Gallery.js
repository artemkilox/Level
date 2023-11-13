import React, {useState} from 'react';
import {images} from '../data/data'
import {Image} from "react-bootstrap";

const Gallery = () => {
    const [isPressed, setIsPressed] = useState(false)
    const [pressedPoint, setPressedPoint] = useState(0)
    const [diffX, setDiffX] = useState(0)
    const [cursorX, setCursorX] = useState(0)
    const [curImage, setCurImage] = useState(0)
    const availableScreenWidth = window.screen.availWidth

    // console.log(availableScreenWidth)


    return (
        <div
            className="gallery-wrapper"
        >
            <div className="gallery">
                <div
                    className="gallery-inner"
                    style={isPressed ? {left: `${cursorX - diffX}px`} : {left : `${(-100 * curImage)}vw`}}
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
                        if(diffX > 500 && curImage < (images.length)){
                            setCursorX(availableScreenWidth * curImage+1)
                            setCurImage(curImage+1)
                        } else if(diffX < -500 && curImage > 0){
                            setCursorX(availableScreenWidth * curImage-1)
                            setCurImage(curImage-1)
                        }
                        console.log(diffX)
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
                    LOGO
                </div>
                <div className="buttons">
                    <div
                        className="prev"
                        onClick={() => curImage > 0 ? setCurImage(curImage-1) : curImage}
                    >
                        Назад
                    </div>
                    <div className="numbers">
                        {curImage+1}/{images.length}
                    </div>
                    <div
                        className="next"
                        onClick={() => curImage < images.length - 1 ? setCurImage(curImage+1) : curImage}
                    >
                        Вперед
                    </div>
                </div>
                <div className="back-button">
                    Назад
                </div>
            </div>
        </div>
    );
};

export default Gallery;