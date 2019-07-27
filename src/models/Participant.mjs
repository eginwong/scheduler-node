class Participant {
	#name;
	#capabilities;
	#history;
	constructor(name, capabilities = {}, history = {}) {
		this.name = name;
		this.capabilities = capabilities;
		this.history = history;
	}
}
