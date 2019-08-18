import DatabaseService from "./database.service";
import MunkresService from "./munkres.service";

const ScheduleService = {
    CreateSchedule
};

export default ScheduleService;

let data;

/**
 * Will create the schedule from Munkres and also update the global data with the session values.
 * 
 * @param {*} scheduleDate  date for next generated schedule
 * @param {*} participants  the members that are available for the next session
 */
function CreateSchedule(scheduleDate, participants) {
    data = data ? data : DatabaseService.GetData();

    data.session = {
        scheduleDate,
        participants,
        results: MunkresService.GenerateSchedule(scheduleDate, participants)
    }

    // update database
    DatabaseService.SetData(data);

    return data.session.results;
}
