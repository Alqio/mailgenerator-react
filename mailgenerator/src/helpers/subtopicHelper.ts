import moment from "moment";

export const formatDateKeys = (subtopic: any) => {
    const formatted = {...subtopic};

    //Change strings back to moments
    const dateKeys = ["date", "registrationStart", "registrationEnd"];
    for (let i in dateKeys) {
        const key = dateKeys[i];
        if (formatted[key]) {
            formatted[key] = moment(formatted[key]);
        }
    }
    return formatted;
};