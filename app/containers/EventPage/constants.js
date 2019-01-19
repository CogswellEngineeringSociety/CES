//Could just do a quick get, honestly lol, this loaded event info doesn't need to be in redux.
const PREFIX = "CES/EventPage/";

const LOAD_EVENT = PREFIX + "LOAD_EVENT";
const LOADED_EVENT =  PREFIX + "LOADED_EVENT";

const ATTEND_EVENT = PREFIX + "ATTEND_EVENT";
const ATTENDANCE_UPDATED = PREFIX + "ATTENDANCE_UPDATED";
const CANCEL_ATTENDANCE = PREFIX + "CANCEL_ATTENDANCE"

const TRACK_EVENT = PREFIX + "TRACK_EVENT";
const EVENT_TRACKING_UPDATED = PREFIX + "EVENT_TRACKING_UPDATED";
const UNTRACK_EVENT = PREFIX + "UNTRACK_EVENT";


//For analytics
const ADD_VIEW = PREFIX + "ADD_VIEW";

export{

    ADD_VIEW,
    LOAD_EVENT,
    LOADED_EVENT,
    ATTEND_EVENT,
    ATTENDANCE_UPDATED,
    CANCEL_ATTENDANCE,
    TRACK_EVENT,
    EVENT_TRACKING_UPDATED,
    UNTRACK_EVENT,
};