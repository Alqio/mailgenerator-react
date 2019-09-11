import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {SubTopicProps} from "./types/SubTopic";
import {Topic} from "./components/Topic";
import {TopicHook, TopicProps} from "./types/Topic";
import {array} from "prop-types";

const App: React.FC = () => {

    const data: SubTopicProps = {
        name: "Fuksisitsit",
        text: "Haha tää on muuten ihan hauska tapahtuma kantsii ehdottomasti osallistua koska saa halpaa viinaa ja vaikka mitä",
        date: new Date(),
        picture: "",
        url: "https://tietokilta.fi",
        registration: false
    };


    const topics = Array<TopicHook>();
    for (let i = 0; i < 5; i += 1) {
        const [topic, setTopic] = useState<TopicProps>({name: "name", number: i});
        topics.push({topic, setTopic});
    }

    const addSubtopic = (id: number) => {
        const {topic, setTopic} = topics[id];

    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
            }
            <button onClick={() => addSubtopic(0)}></button>
        </div>
    );
};

export default App;
