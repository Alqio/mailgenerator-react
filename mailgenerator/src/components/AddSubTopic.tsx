import {AddSubTopicProps} from "../types/AddSubTopic";
import React, {useState} from 'react';
import {TopicProps} from "../types/Topic";
import {SubTopicProps} from "../types/SubTopic";
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import {Moment} from "moment";

import 'react-dates/lib/css/_datepicker.css';

export const AddSubtopic = (props: AddSubTopicProps) => {

    const [subtopicState, setSubtopicState] = useState<SubTopicProps>({
        name: "",
        text: "",
        registration: false,
        topic: props.topics[0]
    });

    const [state, setState] = useState<AddSubTopicProps>({
        ...props,
        datePickerFocused: false
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

        // selects the correct topic
        if (n === "topic") {
            value = props.topics.filter((topic: TopicProps) => {
                return topic.name === value;
            })[0]
        }

        console.log(value);

        setSubtopicState({
            ...subtopicState,
            [n]: value
        });

        console.log(subtopicState);

    };

    const onDateChange = (date: Moment|null) => {
        if (date) {
            setSubtopicState({
                ...subtopicState,
                date
            });
        }
    };

    const onDateRangeChange = (startDate: Moment|null, endDate: Moment|null) => {
        if (startDate) {
            setSubtopicState({
                ...subtopicState,
                registrationStart: startDate
            });
        }
        if (endDate) {
            setSubtopicState({
                ...subtopicState,
                registrationEnd: endDate
            });
        }
    };

    const removeDateFromSubtopicState = (event: any) => {
        event.preventDefault();
        setSubtopicState({
            ...subtopicState,
            date: undefined
        });
    };

    const onSubmit = (event: any) => {
        event.preventDefault();
        props.onSubmit(subtopicState);
    };

    return (
        <div>
            <h2>Add a subtopic</h2>
            <form onSubmit={onSubmit}>
                Name: <input
                    placeholder="name"
                    name="name"
                    value={subtopicState.name}
                    onChange={handleInputChange}>
                </input>

                <br></br>

                Text: <textarea
                    name="text"
                    value={subtopicState.text}
                    onChange={handleInputChange}>
                </textarea>

                <br></br>

                <select
                    name="topic"
                    value={subtopicState.topic.name}
                    onChange={handleInputChange}
                >
                    {topics}
                </select>
                <br></br>

                URL: <input name="url" value={subtopicState.url} onChange={handleInputChange}></input>
                <br></br>

                Date: <SingleDatePicker
                    date={subtopicState.date ? subtopicState.date : null} // momentPropTypes.momentObj or null
                    onDateChange={date => onDateChange(date)} // PropTypes.func.isRequired
                    focused={state.datePickerFocused} // PropTypes.bool
                    onFocusChange={({ focused }) => {
                        if (focused) {
                            setState({...state, datePickerFocused: focused});
                        } else {
                            setState({...state, datePickerFocused: false});
                        }

                    }} // PropTypes.func.isRequired
                    id="date picker" // PropTypes.string.isRequired,
                />

                <button onClick={(event) => removeDateFromSubtopicState(event)}>Clear date</button>

                <br></br>

                Registration <input
                    type="checkbox"
                    name="registration"
                    onChange={handleInputChange}>
                </input>

                <br></br>

                Registration time: <DateRangePicker
                    startDate={subtopicState.registrationStart ? subtopicState.registrationStart : null} // momentPropTypes.momentObj or null,
                    startDateId="start_date" // PropTypes.string.isRequired,
                    endDate={subtopicState.registrationEnd ? subtopicState.registrationEnd : null} // momentPropTypes.momentObj or null,
                    endDateId="end_date" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => onDateRangeChange(startDate, endDate)} // PropTypes.func.isRequired,
                    focusedInput={state.dateRangePickerFocused} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => {
                        if (focusedInput) {
                            setState({...state, dateRangePickerFocused: focusedInput})
                        } else {
                            setState({...state, dateRangePickerFocused: null})
                        }
                    }}
                />

                <br></br>

                Image link: <input name="picture" value={subtopicState.picture} onChange={handleInputChange} placeholder="picture url"></input>

                <br></br>
                <button type="submit">Add a subtopic</button>
            </form>
        </div>
    )
};