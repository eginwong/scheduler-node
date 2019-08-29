import DatabaseService from "./database.service";
import MemberService from "./member.service";

const RoleService = {
  AddRole,
  GetRoles,
  GetExpandedRoles,
  UpdateRoles
};

export default RoleService;

let roles;

function InitData() {
  const data = DatabaseService.GetData().database;
  roles = data.roles;
}

function AddRole(role) {
  roles.push(role);
  UpdateRoles(roles);
}

function GetExpandedRoles() {
  InitData();
  return expandRoles(roles);
}

function GetRoles() {
  InitData();
  return roles;
}

function UpdateRoles(newRoles) {
  const currentData = DatabaseService.GetData();
    // add case
  const members = MemberService.GetMembers().slice().map(member => {
    for (let role of newRoles) {
      if(member.capabilities[role.name] === undefined) {
        member.capabilities[role.name] = 0;
      }
    }
    return member;
  });
  
  currentData.database.members = members;
  currentData.database.roles = newRoles;

  DatabaseService.SetData(currentData);
  roles = expandRoles(currentData.database.roles);
}

function expandRoles(sourceRoles) {
  return sourceRoles
    .map(role => Array(role.quantity).fill(role.name))
    .reduce((a, b) => a.concat(b))
    .slice();
}
