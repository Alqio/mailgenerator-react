import {AddSubTopicProps} from "../types/AddSubTopic";
import React, {useState} from 'react'


export const AddSubtopic = (props: AddSubTopicProps) => {

    return (
        <>
            <form onSubmit={props.onSubmit}>
                Name: <input placeholder="name"></input>
                Text: <textarea></textarea>
                <input type="submit">Add subtopic</input>
            </form>
        </>
    )
};