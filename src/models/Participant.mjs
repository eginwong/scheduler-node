export default class Participant {
	constructor(name, capabilities = {}, history = {}) {
		this.name = name;
		this.capabilities = capabilities;
		this.history = history;
	}
}
