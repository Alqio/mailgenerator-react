import React, {useState} from 'react'
import {SubTopic} from "./SubTopic";
import {TopicProps} from "../types/Topic";
import {SubTopicProps} from "../types/SubTopic";
import moment from "moment";

export const Topic = (props: TopicProps) => {
    const {name, number, subTopics} = props;

    //List of dictionaries, 1 dict = 1 subtopic. Does not contain actual subtopic elements
    //const [subTopics, setSubTopics] = useState<Array<SubTopicProps>>([]);

    const sortSubtopics = (subtopics: Array<SubTopicProps>) => {
        return subtopics.sort((a: SubTopicProps, b: SubTopicProps) => {
            let aDate = a.date;
            let bDate = b.date;

            if (!aDate) {
                //TODO: 3000 to something else?
                aDate = moment("30-12-3000", "DD-MM-YYYY");
            }
            if (!bDate) {
                bDate = moment("30-12-3000", "DD-MM-YYYY");
            }

            return (aDate.isAfter(bDate)) ? 1 : -1;
        })
    };

    const generateHtml = () => {
        const ownHtml = (
            <>
                <h1>{number}. {name}</h1>
            </>
        );
        //TODO: add subtopic number
        const subtopicHtml = sortSubtopics(subTopics).map((subTopic: SubTopicProps, number: number) => {
            return (
                <SubTopic {...subTopic} number={number+1} key={subTopic.name}/>
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
