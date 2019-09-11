import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {SubTopicProps} from "./types/SubTopic";
import {Topic} from "./components/Topic";
import {TopicHook, TopicProps} from "./types/Topic";

const App: React.FC = () => {

    const data: SubTopicProps = {
        name: "Fuksisitsit",
        text: "Haha tää on muuten ihan hauska tapahtuma kantsii ehdottomasti osallistua koska saa halpaa viinaa ja vaikka mitä",
        date: new Date(),
        picture: "https://tietokilta.fi/page_attachments/0000/0265/otatarhanajot2013_crop.jpg",
        url: "https://tietokilta.fi",
        registration: false
    };

    const topic1: TopicProps = {
        name: "Kilta",
        number: 1,
        subTopics: []
    };

    const [topics, setTopics] = useState<Array<TopicProps>>([topic1]);

    const addSubtopic = (id: number) => {
        const topic = topics[id];

        if (topic !== undefined) {
            const subTopics = topic.subTopics.concat(data);

            const newTopics = [...topics];

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

            <div className="mail">
                <button onClick={() => addSubtopic(0)}>click me mate</button>
                {generateHtml()}
            </div>

        </div>
    );
};

export default App;
