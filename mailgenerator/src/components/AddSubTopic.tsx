import {AddSubTopicProps} from "../types/AddSubTopic";
import React, {useState} from 'react';
import {TopicProps} from "../types/Topic";
import {SubTopicProps} from "../types/SubTopic";


export const AddSubtopic = (props: AddSubTopicProps) => {

    const [state, setState] = useState<SubTopicProps>({
        name: "",
        text: "",
        registration: false,
        topic: ""
    });

    const topicList = () => {
        return props.topics.map((topic: TopicProps) => {
            return (<option key={"topic-key-" + topic.number}>{topic.number}. {topic.name}</option>)
        })
    };

    const handleInputChange = (event: any) => {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const n = target.name;

        console.log("n", n);
        // drops number from name
        if (n === "topic") {
            value = value.substring(3);
        }

        console.log("input changed");
        console.log(event);

        setState({
            ...state,
            [n]: value
        });

    };

    const onSubmit = (event: any) => {
        event.preventDefault();
        props.onSubmit(state);
    };

    return (
        <>
            <h2>Add a subtopic</h2>
            <form onSubmit={onSubmit}>
                Name:
                <input
                    placeholder="name"
                    name="name"
                    value={state.name}
                    onChange={handleInputChange}>
                </input>

                <br></br>

                Text:
                <textarea
                    name="text"
                    value={state.text}
                    onChange={handleInputChange}>
                </textarea>

                <select
                    name="topic"
                    value={state.topic}
                    onChange={handleInputChange}
                >
                    {topicList()}
                </select>

                <button type="submit">Add a subtopic</button>
            </form>
        </>
    )
};