import FileSaver from 'file-saver';

const DatabaseService = {
	SetData,
	GetData,
	Export,
	ProcessResults
};

export default DatabaseService;

let data;
const version = 0.1;

function SetData(dataObj) {
	data = {
		database: dataObj.database,
		session: dataObj.session
	};
}

function GetData() {
	return data || {
		"version": 10000.0,
		"modified": "2019-07-13 15:30:38",
		"database": {
			"members": [
			  {
				"name": "adam-smith",
				"capabilities": {
				  "gunslinger": 1,
				  "mage-knight": 0
				},
				"history": {
				  "gunslinger": []
				}
			  },
			  {
				"name": "edina-partha",
				"capabilities": {
				  "gunslinger": 1,
				  "mage-knight": 1
				},
				"history": {
				  "gunslinger": ["2019-05-15"]
				}
			  },
			  {
				"name": "flagdomir-godstaff",
				"capabilities": {
				  "gunslinger": 1,
				  "mage-knight": 1
				},
				"history": {}
			  },
			  {
				"name": "hehs-pows",
				"capabilities": {
				  "gunslinger": 0,
				  "mage-knight": 1
				},
				"history": {
				  "gunslinger": []
				}
			  },
			  {
				"name": "meep-moop",
				"capabilities": {
				  "gunslinger": 1,
				  "mage-knight": 1
				},
				"history": {
				  "gunslinger": ["2019-06-06"]
				}
			  }
			],
			"roles": [
			  {
				"name": "gunslinger",
				"quantity": 2
			  },
			  {
				"name": "mage-knight",
				"quantity": 1
			  }
			],
			"history": []
		  }
	};
}

function Export() {
	if(data && data.database) {
		const blob = new Blob([JSON.stringify({
			version,
			modified: new Date(),
			database: data.database,
			session: data.session
		}, null, 2)], {type: "application/json;charset=utf-8"});
		FileSaver.saveAs(blob, "export.json");
	}
}

function ProcessResults() {	
	if(data && data.database && data.session) {
		// update all users profiles with history
		const peopleMap = mapPeopleToCapabilities(data.database.members);
		const proposedSchedule = data.session;

		proposedSchedule.results.forEach((assignment) => {
			const historicRole = peopleMap.get(assignment.member).history[assignment.role];

			if(historicRole || historicRole.length === 0) {
				historicRole.unshift(proposedSchedule.scheduleDate.toISOString().split('T')[0]);
			} else {
				historicRole = [proposedSchedule.scheduleDate];
			}
		})

		data.database.members = Array.from(peopleMap.values());

		// update history
		data.database.history.unshift({
			scheduleDate: proposedSchedule.scheduleDate.toISOString().split('T')[0],
			roles: proposedSchedule.results
		})

		// delete session
		delete data.session; 
	}
}

function mapPeopleToCapabilities(members) {
	// filter out the members who can't do things
	const peopleWithCapabilities = members.filter(
	  x =>
		Object.keys(x.capabilities).length !== 0 ||
		x.capabilities.constructor !== Object
	);
  
	// create hashmap to more easily extract members from json
	return new Map(
	  peopleWithCapabilities.map(i => [
		i.name,
		{
		  name: i.name,
		  capabilities: i.capabilities,
		  history: i.history
		}
	  ])
	);
  }