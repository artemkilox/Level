import React, {useEffect, useState} from 'react';
// import {apartments} from '../data/data'
import {Button, Image} from "react-bootstrap";
import heartImage from '../img/heart.svg'
import levelLogoBlack from '../img/LevelLogoBlack.svg'
import {useNavigate} from "react-router";
import {MAIN_PAGE_ROUTE} from "../utils/consts";
import star from '../img/starBlack.png'
import Modal from "./Modal";
import GalleryModal from "./GalleryModal";
import {$host} from "../http";
import {Form} from "react-bootstrap";
import MultiRangeSlider from "./MultiRangeSlider";

const Apartments = () => {
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)
    const [selectedRoom, setSelectedRoom] = useState('')
    const [showGallery, setShowGallery] = useState(false)
    const [galleryImages, setGalleryImages] = useState([])
    const [showOverlay, setShowOverlay] = useState(true)
    const [apartments, setApartments] = useState([])
    const [showSidebar, setShowSidebar] = useState(false)

    useEffect(() => {
        $host.get('/').then(result => {
            // console.log(result)
            setApartments(result.data.results)
        })
    }, [])

    console.log(apartments)

    const onHide = () => {
        setShowModal(false)
        setSelectedRoom('')
    }

    const openGallery = () => {
        setShowModal(false)
        setShowGallery(true)
        setShowOverlay(false)
    }

    const closeGallery = () => {
        setShowModal(true)
        setShowGallery(false)
        setShowOverlay(true)
    }

    return (
        <div
            className="apartments-wrapper"
        >
            <Modal
                show={showModal}
                onHide={onHide}
                room={selectedRoom}
                openGallery={openGallery}
                setGalleryImages={setGalleryImages}
            />
            <GalleryModal
                show={showGallery}
                close={closeGallery}
                images={galleryImages}
            />
            <div className="content-outer">
                <div className="content-wrapper">
                    <div
                        className="top-menu"
                    >
                        <div className="menu-item">
                            Этаж
                        </div>
                        <div className="menu-item">
                            Площадь
                        </div>
                        <div className="menu-item">
                            Стоимость
                        </div>
                    </div>
                    <div className="apartments">
                        {apartments !== [] ? apartments.map(apartment =>
                            <div className="apartments-item" key={apartment.id}>
                                <div className="left-side">
                                    <div className="article">
                                        {apartment.number}
                                    </div>
                                    <div className="image-wrapper">
                                        <Image
                                            className="image"
                                            src={apartment.plan}
                                            onClick={() => {
                                                setSelectedRoom(apartment)
                                                setShowModal(true)
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="right-side">
                                    <div className="title">
                                       {/*{apartment.title}*/}
                                       Квартира
                                    </div>
                                    <div className="characters">
                                        {/*{apartment.characters.map(character =>*/}
                                        {/*    <div className="character-item" key={character.title}>*/}
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
                                                {apartment.area} м²
                                            </div>
                                        </div>
                                        <div className="character-item">
                                            <div className="character-title">
                                                Комнат
                                            </div>
                                            <div className="character-value">
                                                {apartment.room} к
                                            </div>
                                        </div>
                                        <div className="character-item">
                                            <div className="character-title">
                                                Отделка
                                            </div>
                                            <div className="character-value">
                                                {apartment.renovation}
                                            </div>
                                        </div>
                                        <div className="character-item">
                                            <div className="character-title">
                                                Этаж
                                            </div>
                                            <div className="character-value">
                                                {apartment.floor} из {apartment.floors_total}
                                            </div>
                                        </div>
                                        <div className="character-item">
                                            <div className="character-title">
                                                Корпус
                                            </div>
                                            <div className="character-value">
                                                {apartment.building}
                                            </div>
                                        </div>
                                        <div className="character-item">
                                            <div className="character-title">
                                                Окна на
                                            </div>
                                            <div className="character-value">
                                                {apartment.windows_located}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bottom-wrapper">
                                        <div className="price">
                                            {/*<div className="timer">*/}
                                            {/*    Цена по акции <span>{apartment.saleDate}</span>*/}
                                            {/*</div>*/}
                                            <div className="price-value">
                                                {apartment.price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽
                                            </div>
                                            {/*<div className="sale">*/}
                                            {/*    Со скидкой <span>{apartment.salePrice}</span>*/}
                                            {/*</div>*/}
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
                    <div
                        className="logo"
                        style={showOverlay ? {display: "flex"} : {display: "none"}}
                    >
                        <Image src={levelLogoBlack}/><span>Академическая</span>
                    </div>
                    <div
                        className="back-btn"
                        onClick={() => navigate(MAIN_PAGE_ROUTE)}
                        style={showOverlay ? {display: "block"} : {display: "none"}}
                    >
                    </div>
                </div>
            </div>
            <div
                className="sidebar-wrapper"
                style={showOverlay ? {display: "block"} : {display: "none"}}
            >
                <div
                    className="sidebar-title"
                    style={showSidebar ? {display: "none"} : {display: "block"}}
                    onClick={() => setShowSidebar(true)}
                >
                    <Image className="side-icon" src={star}/> Фильтрация
                </div>
                <div
                    className={showSidebar ? "sidebar open-sidebar" : "sidebar"}
                >
                    <div>Сайдбар</div>
                    <div>Сайдбар</div>
                    <div>Сайдбар</div>
                    <div>Сайдбар</div>
                    <div>Сайдбар</div>
                    <div>Сайдбар</div>
                    <div>Сайдбар</div>
                    <div>Сайдбар</div>
                    <div>Сайдбар</div>
                    <div>Сайдбар</div>
                    <div>Сайдбар</div>
                    <MultiRangeSlider
                        min={0}
                        max={100}
                        onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
                    />
                    <Button
                        onClick={() => setShowSidebar(false)}
                    >
                        Закрыть
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Apartments;