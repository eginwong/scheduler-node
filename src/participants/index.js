import Participant from '../models/Participant.mjs';

/* --- Vars & Consts ---*/
let participants = [];

/* --- Functions --- */

export function AddParticipant(name, ...opts) {
	// Create a participant
	participants.push(new Participant(name, ...opts));
}

export function RemoveParticipant(name) {
	// Remove a participant
	const ind = participants.map(p => p.name).indexOf(name);
	participants.splice(ind, 1);
}

export function GetParticipants() {
	// Return the participant names
	return participants.map(p => p.name);
}