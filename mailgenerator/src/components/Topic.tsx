import React, {useState} from 'react'
import {SubTopic} from "./SubTopic";
import {TopicProps} from "../types/Topic";
import {SubTopicProps} from "../types/SubTopic";

export const Topic = (props: TopicProps) => {
    const {name, number, subTopics} = props;

    //List of dictionaries, 1 dict = 1 subtopic. Does not contain actual subtopic elements
    //const [subTopics, setSubTopics] = useState<Array<SubTopicProps>>([]);

    const generateHtml = () => {
        const ownHtml = (
            <>
                <h1>{number}. {name}</h1>
            </>
        );
        //TODO: add subtopic number
        const subtopicHtml = subTopics.map((subTopic: SubTopicProps) => {
            return (
                <SubTopic {...subTopic} key={subTopic.name}/>
            )
        });
        return (<>{ownHtml} <br/> {subtopicHtml}</>)
    };

    return (
        <div>
            {generateHtml()}
        </div>
    )

};
