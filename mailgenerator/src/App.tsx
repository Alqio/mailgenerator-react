import React, {useEffect, useState} from 'react';
import './App.css';
import {SubTopicProps} from "./types/SubTopic";
import {Topic} from "./components/Topic";
import {TopicProps} from "./types/Topic";
import {AddSubtopic} from "./components/AddSubTopic";
import moment from "moment";
import {AddTopic} from "./components/AddTopic";
import axios from 'axios';
const App: React.FC = () => {

    const topic1: TopicProps = {
        name: "Kilta",
        number: 1,
        subTopics: []
    };
    const topic2: TopicProps = {
        name: "Ayy & Aalto",
        number: 2,
        subTopics: []
    };

    const data: SubTopicProps = {
        name: "Fuksisitsit",
        text: "Haha tää on muuten ihan hauska tapahtuma kantsii ehdottomasti osallistua koska saa halpaa viinaa ja vaikka mitä",
        date: moment(),
        picture: "https://tietokilta.fi/page_attachments/0000/0265/otatarhanajot2013_crop.jpg",
        url: "https://tietokilta.fi",
        registration: false,
        topic: topic1
    };

    const API_URL = "http://localhost:3001";

    const [topics, setTopics] = useState<Array<TopicProps>>([topic1, topic2]);

    useEffect(() => {
        axios.get(`${API_URL}/topic`).then(res => {
            const topicsData = res.data;
            console.log("topics:", topicsData);

            axios.get(`${API_URL}/subtopic`).then(res => {
                const subtopicsData = res.data;
                for (let i = 0; i < subtopicsData.length; i++) {
                    console.log(subtopicsData[i]);
                    const topic = topicsData.find((topic: any) => topic.name === subtopicsData[i].topic);

                    if (!topic.subtopics) {
                        topic.subtopics = []
                    }
                    topic.subtopics.push(subtopicsData[i]);
                    console.log(topic);
                }
                setTopics(topicsData);
                console.log(topics);
            });
       });
    }, []); //adding [] makes sure useEffect is called only once

    const addTopic = (topic: TopicProps) => {
        console.log(topic);
        topic.subTopics = [];

        const newTopics = topics.concat(topic).sort((a: TopicProps, b:TopicProps) => {
            return a.number > b.number ? 1 : -1;
        });

        setTopics(newTopics);

    };

    const addSubtopic = (subtopic: SubTopicProps) => {
        console.log(subtopic);

        if (subtopic.topic !== undefined) {

            const topic = topics.filter((topic: TopicProps) => {
                return topic.name === subtopic.topic.name;
            })[0];

            const subTopics = topic.subTopics.concat(subtopic);

            const newTopics = [...topics];

            const id = topics.indexOf(topic);

            newTopics[id] = {
                ...topic,
                subTopics
            };

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
                        <AddSubtopic onSubmit={addSubtopic} topics={topics} datePickerFocused={false} dateRangePickerFocused={null}/>
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
