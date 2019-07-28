import DatabaseService from './database.service';

const MemberService = {
	GetRoles,
	GetMembers,
	UpdateMembers
};

export default MemberService;

let roles, members;

function InitData() {
	const data = DatabaseService.GetData().database;
	roles = data.roles.map(role => Array(role.quantity).fill(role.name)).reduce((a,b) => a.concat(b)).slice();
	members = data.members.slice();

	InitData = () => true;
}

function GetRoles() {
	InitData();
	GetRoles = function GetRoles() {
		return roles;
	};
	return roles;
}

function GetMembers() {
	InitData();
	GetMembers = function GetMembers() {
		return members;
	};
	return members;
}

function UpdateMembers(newMembers) {
	DatabaseService.GetData().database.members = members = newMembers;
}