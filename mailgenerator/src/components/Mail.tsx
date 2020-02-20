import {MailProps} from "../types/Mail";
import React, {useEffect, useState} from 'react';
import {TopicProps} from "../types/Topic";
import {Topic} from "./Topic";
import {addSubtopicToBackend, addTopicToBackend, fetchTopicsAndSubtopics} from "../datahelpers/topicDataHelper";
import {SubtopicProps} from "../types/SubTopic";
import {AddTopic} from "./AddTopic";
import {AddSubtopic} from "./AddSubTopic";
import moment from "moment";
import '../Mail.css';


export const Mail = (props: MailProps) => {

    const [mailState, setMailState] = useState<MailProps>(props);
    const [topics, setTopics] = useState<Array<TopicProps>>(props.topics);

    //adding [] makes sure useEffect is called only once, add elements to list whose change should trigger this again
    useEffect(() => {
        fetchTopicsAndSubtopics(setTopics);
    }, []);

    const addTopic = async (topic: TopicProps) => {
        console.log(topic);
        topic.subtopics = [];

        const addedTopic = await addTopicToBackend(topic);

        const newTopics = topics.concat(addedTopic).sort((a: TopicProps, b: TopicProps) => {
            return a.number > b.number ? 1 : -1;
        });

        setTopics(newTopics);
    };

    const addSubtopic = async (subtopic: SubtopicProps) => {
        console.log(subtopic);

        if (subtopic.topic !== undefined) {
            const newTopics = await addSubtopicToBackend(subtopic, topics);

            setTopics(newTopics);

        } else {
            console.error("Undefined topic");
        }
    };

    const generateHtml = () => {
        return topics.map((topic: TopicProps) => {
            return (<Topic {...topic} key={topic.name + "-" + topic.number}/>)
        })
    };

    return (
        <div className="mail">
            <div className="container">
                <div className="admin">
                    <div>
                        <AddTopic onSubmit={addTopic}/>
                    </div>

                    <br/>

                    <div>
                        <AddSubtopic onSubmit={addSubtopic} topics={topics} datePickerFocused={false}
                                     dateRangePickerFocused={null}/>
                    </div>
                </div>

                <div>
                    {generateHtml()}
                </div>
            </div>
        </div>
    );

};