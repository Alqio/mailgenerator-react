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
        registrationEnd
    } = props;

    return (
        <div>
            <h1>{name} {(date ? date : "")}</h1>
            <p>{text}</p>
            <br/>
            <br/>
            <img src={(picture ? picture : "")}/>
            <a href={url}>{url}</a>
        </div>
    )
};