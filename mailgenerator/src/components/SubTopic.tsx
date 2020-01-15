import React from 'react';
import {SubTopicProps} from "../types/SubTopic";


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

    return (
        <div>
            <h2>{number}. {name} {(date ? date.toISOString() : "")}</h2>
            <p>{text}</p>
            <br/>
            <br/>
            <a href={url}>Lue lisää</a>
            <img src={(picture ? picture : "")}></img>
        </div>
    )
};