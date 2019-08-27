import DatabaseService from "./database.service";

const MemberService = {
  AddMember,
  GetMembers,
  UpdateMembers
};

export default MemberService;

let members;

function InitData() {
  const data = DatabaseService.GetData().database;
  members = data.members.slice();
}

function AddMember(member) {
	const capabilities = generateBlankCapabilities();

  const newMember = {
    name: member.name,
    email: member.email,
    capabilities,
    history: {}
  };
  
  members.unshift(newMember);
  UpdateMembers(members);
}

function GetMembers() {
  InitData();
  return members;
}

function UpdateMembers(newMembers) {
  const currentData = DatabaseService.GetData();
  currentData.database.members = members = newMembers;
  DatabaseService.SetData(currentData);
}

function generateBlankCapabilities() { 
  const capabilities = {};
	DatabaseService.GetData().database.roles.forEach((role) => {
		capabilities[role.name] = 0;
	})
	return capabilities;
}