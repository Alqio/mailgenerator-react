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
        topic
    } = props;

    return (
        <div>
            <h2>{name} {(date ? date.toDateString() : "")}</h2>
            <p>{text}</p>
            <br/>
            <br/>
            <a href={url}>Lue lisää</a>
            <img src={(picture ? picture : "")}/>
        </div>
    )
};