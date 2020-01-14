import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {SubTopicProps} from "./types/SubTopic";
import {Topic} from "./components/Topic";
import {TopicHook, TopicProps} from "./types/Topic";
import {AddSubtopic} from "./components/AddSubTopic";

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
        date: new Date(),
        picture: "https://tietokilta.fi/page_attachments/0000/0265/otatarhanajot2013_crop.jpg",
        url: "https://tietokilta.fi",
        registration: false,
        topic: topic1
    };

    const [topics, setTopics] = useState<Array<TopicProps>>([topic1, topic2]);

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
            return (<Topic {...topic} key={topic.number}/>)
        })
    };

    return (
        <div className="App">
            <header className="App-header">
                <p>mikä homma</p>
            </header>

            <div>
                <AddSubtopic onSubmit={addSubtopic} topics={topics}/>
            </div>
            <div className="mail">
                {generateHtml()}
            </div>

        </div>
    );
};

export default App;
