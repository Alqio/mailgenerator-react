import {AddSubTopicProps} from "../types/AddSubTopic";
import React, {useState} from 'react';
import {TopicProps} from "../types/Topic";
import {SubTopicProps} from "../types/SubTopic";


export const AddSubtopic = (props: AddSubTopicProps) => {

    const [state, setState] = useState<SubTopicProps>({
        name: "",
        text: "",
        registration: false,
        topic: props.topics[0]
    });

    const topicList = () => {
        console.log("in topic list");
        return props.topics.map((topic: TopicProps) => {
            return (<option key={"topic-key-" + topic.number} value={topic.name}>{topic.number}. {topic.name}</option>)
        })
    };

    const topics = [...topicList()];

    const handleInputChange = (event: any) => {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const n = target.name;

        console.log("n", n);

        // drops number from name
        if (n === "topic") {
            value = props.topics.filter((topic: TopicProps) => {
                return topic.name === value;
            })[0]
        }

        console.log(value);

        setState({
            ...state,
            [n]: value
        });

        console.log(state);

    };

    const onSubmit = (event: any) => {
        event.preventDefault();
        props.onSubmit(state);
    };

    return (
        <>
            <button>log state</button>
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
                    value={state.topic.name}
                    onChange={handleInputChange}
                >
                    {topics}
                </select>

                <button type="submit">Add a subtopic</button>
            </form>
        </>
    )
};