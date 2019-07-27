// Participants Module Node Test

const window = {};

import '../models/Participant.mjs';
import './index.js';

const IT = console.log.bind(console, 'It');

//with(global.window) {

	IT(`Exists`, (function(){
		return !!ParticipantsModule;
	})());

	IT(`Has #AddParticipant() defined`, (function(){
		return ParticipantsModule.AddParticipant &&
				'function' === typeof ParticipantsModule.AddParticipant;
	})());

	IT(`Adds a participant`, (function(){
		const name = 'Frank';
		const preLength = ParticipantsModule.GetParticipants().length;
		ParticipantsModule.AddParticipant(name);
		const particips = ParticipantsModule.GetParticipants();
		return particips.length == (preLength + 1) &&
				particips[0] == name;
	})());

//}