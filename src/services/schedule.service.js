// TODO: consume proposed schedule and update database service and export
// TODO: save proposed schedule to database service and export

import DatabaseService from "./database.service";
import MunkresService from "./munkres.service";

const ScheduleService = {
    CreateSchedule,
    UpdateSession,
    SendEmail
};

export default ScheduleService;

// TODO: need to load up the database first, on lifecycle
let database;

function UpdateSession(database) {
    DatabaseService.SetData(database);
}

/**
 * 
 * @param {*} scheduleDate 
 * @param {*} participants 
 */
function CreateSchedule(scheduleDate, participants) {
    database = database ? database : DatabaseService.GetData().database;

    database.session = {
        scheduleDate,
        participants
    }

    return MunkresService.GenerateSchedule(scheduleDate, participants);
}

function SendEmail() {

}