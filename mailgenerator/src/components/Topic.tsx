import React, {useState} from 'react'
import {SubTopic} from "./SubTopic";
import {TopicProps} from "../types/Topic";
import {SubTopicProps} from "../types/SubTopic";

export const Topic = (props: TopicProps) => {
    const {name, number} = props;

    //List of dictionaries, 1 dict = 1 subtopic. Does not contain actual subtopic elements
    const [subTopics, setSubTopics] = useState<Array<SubTopicProps>>([]);


    const addSubTopic = (subTopic: SubTopicProps) => {
        setSubTopics(subTopics.concat(subTopic));
        return subTopics;
    };

    const generateHtml = () => {
        const ownHtml = (
            <>
                <h1>{number}. {name}</h1>
            </>
        );
        const subtopicHtml = subTopics.map((subTopic: SubTopicProps) => {
            return (
                <>
                    <SubTopic {...subTopic}/>
                    <hr/>
                </>
            )
        });
        return (<>{ownHtml} <br /> {subtopicHtml}</>)
    };

    return (
        <div>
            {generateHtml()}
        </div>
    )

};
