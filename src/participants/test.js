// Participants Module Node Test

import * as Module from './index.js';

const it = console.log.bind(console, 'It');
const IT = (name, test) => it(name, test());

IT(`Exists`, function(){
	return !!Module;
});

IT(`Has #AddParticipant() defined`, function(){
	return Module.AddParticipant &&
			'function' === typeof Module.AddParticipant;
});

IT(`Adds a participant`, function(){
	const name = 'Frank';
	const preLength = Module.GetParticipants().length;
	Module.AddParticipant(name);
	const particips = Module.GetParticipants();
	return particips.length == (preLength + 1) &&
			particips[0] == name;
});