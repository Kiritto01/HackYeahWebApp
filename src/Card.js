import "./Card.css"
import React, { useState } from "react";
import { createContext } from 'react';
import ParentComponnent from "./MainForm";

const Card = (props) => {
    function replaceSpacesAndCommas(st) {
        return st
    };

    let a1 = props.home;
    let a2 = props.address == null ? "" : props.address;

    return (
        <div className="card">
            <div className="card-left">
                <main>
                    <header>{props.course}</header>
                    <section className="card-info">
                        <strong>Nazwa uczelni: </strong>{props.name}<br/>
                        <strong>Typ kierunku: </strong>{props.type}<br/>
                        <strong>Wydział: </strong>{props.faculty}<br/>
                        <strong>Adres: </strong>{props.address}<br/>
                    </section>
                </main>
                <section className="card-buttons">
                    <a href={props.moreLink} className="card-link">Więcej informacji</a>
                    <a target="_blank" href={`https://www.google.com/maps/dir/?api=1&origin=${a1.split(/[ ,.]+/).join('+').replace("ul", "")}&destination=${a2.split(/[ ,.]+/).join('+').replace("ul", "")}&travelmode=transit`} className="card-link">Sprawdź dojazd</a>
                </section>
            </div>
            <div className="card-right">
                <div className="card-logo">
                    <img src={props.logoUrl} alt="logo"/>
                </div>
                <section className="card-price">
                    <h1>{props.price} zł</h1>
                    miesięcznie
                </section>
            </div>
            <div>
            </div>
        </div>
    );
}

export default Card;