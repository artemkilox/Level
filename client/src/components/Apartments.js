import React from 'react';

const Apartments = () => {



    return (
        <div
            className="apartments-wrapper"
        >
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
                    <div className="apartments-item">
                        <div className="left-side">
                            <div className="article">
                                article
                            </div>
                            <div className="image">
                                image
                            </div>
                        </div>
                        <div className="right-side">
                            <div className="title">
                                title
                            </div>
                            <div className="characters">
                                <div className="character-item">
                                    <div className="character-title">
                                        Площадь
                                    </div>
                                    <div className="character-value">
                                        30 м2
                                    </div>
                                </div>
                                <div className="character-item">
                                    <div className="character-title">
                                        Площадь
                                    </div>
                                    <div className="character-value">
                                        30 м2
                                    </div>
                                </div>
                                <div className="character-item">
                                    <div className="character-title">
                                        Площадь
                                    </div>
                                    <div className="character-value">
                                        30 м2
                                    </div>
                                </div>
                                <div className="character-item">
                                    <div className="character-title">
                                        Площадь
                                    </div>
                                    <div className="character-value">
                                        30 м2
                                    </div>
                                </div>
                                <div className="character-item">
                                    <div className="character-title">
                                        Площадь
                                    </div>
                                    <div className="character-value">
                                        30 м2
                                    </div>
                                </div>
                                <div className="character-item">
                                    <div className="character-title">
                                        Площадь
                                    </div>
                                    <div className="character-value">
                                        30 м2
                                    </div>
                                </div>
                            </div>
                            <div className="bottom-wrapper">
                                <div className="price">
                                    <div className="timer">
                                        Цена по акции <span>до 31.07</span>
                                    </div>
                                    <div className="price-value">
                                        11 089 099 р
                                    </div>
                                    <div className="sale">
                                        Со скидкой 11 352 789 р
                                    </div>
                                </div>
                                <div className="follow">
                                    <div className="follow-item">
                                        Сердечко
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom-menu">
                    <div className="logo">
                        ЛОГО
                    </div>
                    <div className="back-btn">
                        Назад
                    </div>
                </div>
            </div>
            <div className="sidebar-wrapper">
                Фильтрация
            </div>
        </div>
    );
};

export default Apartments;