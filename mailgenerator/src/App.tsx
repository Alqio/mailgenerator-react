import React, {useEffect, useState} from 'react';
import './App.css';
import {SubtopicProps} from "./types/SubTopic";
import {Topic} from "./components/Topic";
import {TopicProps} from "./types/Topic";
import {AddSubtopic} from "./components/AddSubTopic";
import moment from "moment";
import {AddTopic} from "./components/AddTopic";
import {fetchTopicsAndSubtopics, addTopicToBackend, addSubtopicToBackend} from "./datahelpers/topicDataHelper";

const App: React.FC = () => {

    const topic1: TopicProps = {
        name: "Kilta",
        number: 1,
        subtopics: []
    };
    const topic2: TopicProps = {
        name: "Ayy & Aalto",
        number: 2,
        subtopics: []
    };

    const data: SubtopicProps = {
        name: "Fuksisitsit",
        text: "Haha tää on muuten ihan hauska tapahtuma kantsii ehdottomasti osallistua koska saa halpaa viinaa ja vaikka mitä",
        date: moment(),
        picture: "https://tietokilta.fi/page_attachments/0000/0265/otatarhanajot2013_crop.jpg",
        url: "https://tietokilta.fi",
        registration: false,
        topic: topic1
    };

    const [topics, setTopics] = useState<Array<TopicProps>>([topic1, topic2]);

    useEffect(() => {
        fetchTopicsAndSubtopics(setTopics);
    }, []); //adding [] makes sure useEffect is called only once

    const addTopic = (topic: TopicProps) => {
        console.log(topic);
        topic.subtopics = [];

        const callback = (addedTopic: TopicProps) => {
            const newTopics = topics.concat(addedTopic).sort((a: TopicProps, b: TopicProps) => {
                return a.number > b.number ? 1 : -1;
            });

            setTopics(newTopics);
        };

        addTopicToBackend(topic, callback);

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
        <div className="App">
            <header className="App-header">
                <p>mikä homma</p>
            </header>

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

                <div className="mail">
                    {generateHtml()}
                </div>

            </div>
        </div>
    );
};

export default App;
