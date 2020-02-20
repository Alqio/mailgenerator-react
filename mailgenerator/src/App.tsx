import React, {useEffect, useState} from 'react';
import './App.css';
import {MailProps} from "./types/Mail";
import {Mail} from "./components/Mail";
import {TopicProps} from "./types/Topic";
import {AddTopic} from "./components/AddTopic";
import {AddSubtopic} from "./components/AddSubTopic";

const App: React.FC = () => {

    const topic1: TopicProps = {
        name: "Kilta",
        number: 1,
        subtopics: [],
    };
    const topic2: TopicProps = {
        name: "Ayy & Aalto",
        number: 2,
        subtopics: []
    };

    const mail1 = {
        id: 1,
        name: "Viikkomaili",
        topics: [topic1, topic2],
    };

    const [mails, setMails] = useState<Array<MailProps>>([mail1]);
    const [selectedMail, setSelectedMail] = useState<MailProps>(mail1);

    const renderSelectedMail = () => {
        return (
            <>
                <Mail id={selectedMail.id}
                      name={selectedMail.name}
                      topics={selectedMail.topics}
                />
            </>
        );
    };

    return (
        <div className="App">
            <header className="App-header">
                <p>mikä homma</p>
            </header>

            <div>
                {renderSelectedMail()}
            </div>

        </div>
    );
};

export default App;
