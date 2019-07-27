// Participants module
void function ParticipantsModule(parent){
	// Module
	const mod = {
		AddParticipant,
		RemoveParticipant,
		GetParticipants
	};

	// Vars & Consts
	let participants = [];

	return Object.assign(parent, { [arguments.callee.name]: mod });

	/* --- */

	function AddParticipant(name, ...opts) {
		// Create a participant
		participants.push(new Participant(name, ...opts));
	}

	function RemoveParticipant(name) {
		// Remove a participant
		const ind = participants.map(p => p.name).indexOf(name);
		participants.splice(ind, 1);
	}

	function GetParticipants() {
		// Return the participant names
		return participants.map(p => p.name);
	}
}(window);