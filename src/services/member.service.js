import DatabaseService from './database.service';

const MemberService = {
	GetMembers,
	UpdateMembers
};

export default MemberService;

let members;

function InitData() {
	const data = DatabaseService.GetData().database;
	members = data.members.slice();
}

function GetMembers() {
	InitData();
	return members;
}

function UpdateMembers(newMembers) {
	DatabaseService.GetData().database.members = members = newMembers;
}