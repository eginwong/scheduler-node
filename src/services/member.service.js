const MemberService = {
	GetRoles,
	GetMembers
};

export default MemberService;

function GetRoles() {
	return ['Toastmaster', 'Grammarian', 'Speaker 1', 'Speaker 2'];
}

function GetMembers() {
	return [
		{
			name: 'Jimbo Slice',
			capabilites: {},
			history: {}
		},
		{
			name: 'Kimbo Chop',
			capabilites: {},
			history: {}
		},
		{
			name: 'Limbo Split',
			capabilites: {},
			history: {}
		},
		{
			name: 'Timbo Rend',
			capabilites: {},
			history: {}
		}
	];
}