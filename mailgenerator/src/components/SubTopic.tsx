import React from 'react';
import {SubTopicProps} from "../types/SubTopic";
import {Moment} from "moment";


export const SubTopic = (props: SubTopicProps) => {

    const {
        name,
        text,
        date,
        picture,
        url,
        registration,
        registrationStart,
        registrationEnd,
        topic,
        number
    } = props;

    //2020-01-16T10:00:00.000Z
    const formatDate = (date: Moment) => {
        return date.format("D.M.");
    };

    const registrationElements = () => {
        if (registration && registrationStart && registrationEnd) {
            return (
                <>
                    <p>Ilmoittautuminen auki: {formatDate(registrationStart)} - {formatDate(registrationEnd)}</p>
                </>
            );
        }
    };

    return (
        <div>
            <h2>{number}. {name} {(date ? formatDate(date) : "")}</h2>
            <p>{text}</p>
            <br/>
            <br/>
            <a href={url}>Lue lisää</a>
            {registrationElements()}
            <img src={(picture ? picture : "")}></img>
        </div>
    )
};