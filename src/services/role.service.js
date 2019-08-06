import DatabaseService from './database.service';

const RoleService = {
	GetRoles,
	UpdateRoles
};

export default RoleService;

let roles;

function InitData() {
	const data = DatabaseService.GetData().database;
	roles = data.roles.map(role => Array(role.quantity).fill(role.name)).reduce((a,b) => a.concat(b)).slice();
	InitData = () => true;
}

function GetRoles() {
	InitData();
	GetRoles = function GetRoles() {
		return roles;
	};
	return roles;
}

function UpdateRoles(newRoles) {
	DatabaseService.GetData().database.roles = roles = newRoles;
}