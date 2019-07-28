// TODO: consume proposed schedule and update database service and export
// TODO: save proposed schedule to database service and export

import DatabaseService from "./database.service";

const ScheduleService = {
    SaveSession,
    CreateSchedule,
    SendEmail
};

export default ScheduleService;

// TODO: need to load up the database first, on lifecycle
let database;
let session;

function ExportSession() {
    DatabaseService.SetData(database); // TODO: is this async?
    return DatabaseService.Export();
}

function UpdateSession() {
    database.session = {}
}

function CreateSchedule() {
    // use munkres here
}

function SendEmail() {

}