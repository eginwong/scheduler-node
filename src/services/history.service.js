import DatabaseService from "./database.service";

const HistoryService = {
  GetHistory
};

export default HistoryService;

let history;

function InitData() {
  history = DatabaseService.GetData().database.history;
}

function GetHistory() {
  InitData();
  return history;
}
