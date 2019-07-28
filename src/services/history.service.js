import DatabaseService from "./database.service";

const HistoryService = {
  GetHistory
};

export default HistoryService;

let history;

function InitData() {
  history = DatabaseService.GetData().database.history;
  InitData = () => true;
}

function GetHistory() {
  InitData();
  GetHistory = function GetHistory() {
    return history;
  };
  return history;
}
