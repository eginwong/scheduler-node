import FileSaver from "file-saver";
import { cloneDeep } from "lodash";

const DatabaseService = {
  SetData,
  GetData,
  GetConfig,
  Export,
  ProcessResults
};

export default DatabaseService;

let data;
const version = 0.1;

function SetData(dataObj) {
  data = {
    adminEmail: dataObj.adminEmail,
    database: dataObj.database,
    session: dataObj.session
  };
}

function GetData() {
  return (
    data || {
      version: 10000.0,
      modified: "2019-08-24T17:20:37.138Z",
      database: {
        members: [
          {
            name: "adam-smith",
            capabilities: {
              gunslinger: 1,
              "mage-knight": 0
            },
            history: {
              gunslinger: ["2019-08-29"]
            }
          },
          {
            name: "edina-partha",
            capabilities: {
              gunslinger: 1,
              "mage-knight": 1
            },
            history: {
              gunslinger: ["2019-05-15"]
            }
          },
          {
            name: "flagdomir-godstaff",
            capabilities: {
              gunslinger: 1,
              "mage-knight": 1
            },
            history: {
              gunslinger: ["2019-08-29"]
            }
          },
          {
            name: "hehs-pows",
            capabilities: {
              gunslinger: 0,
              "mage-knight": 1
            },
            history: {
              "mage-knight": ["2019-08-29"]
            }
          },
          {
            name: "meep-moop",
            capabilities: {
              gunslinger: 1,
              "mage-knight": 1
            },
            history: {
              gunslinger: ["2019-06-06"]
            }
          }
        ],
        roles: [
          {
            name: "gunslinger",
            quantity: 2
          },
          {
            name: "mage-knight",
            quantity: 1
          }
        ],
        history: [
          {
            scheduleDate: "2019-08-29",
            roles: [
              {
                role: "gunslinger",
                member: "adam-smith"
              },
              {
                role: "gunslinger",
                member: "flagdomir-godstaff"
              },
              {
                role: "mage-knight",
                member: "hehs-pows"
              }
            ]
          }
        ]
      }
    }
  );
}

function GetConfig() {
  return {
    version: data.version,
    adminEmail: data.adminEmail,
    modified: data.modified
  }
}

function Export() {
  if (data && data.database) {
    const clonedData = cloneDeep(data);
    const exportData = cleanseData(clonedData);

    const blob = new Blob(
      [
        JSON.stringify(
          {
            version,
            modified: new Date(),
            adminEmail: exportData.adminEmail,
            database: exportData.database,
            session: exportData.session
          },
          null,
          2
        )
      ],
      { type: "application/json;charset=utf-8" }
    );
    FileSaver.saveAs(blob, "export.json");
  }
}

function ProcessResults() {
  if (data && data.database && data.session) {
    // update all users profiles with history
    const peopleMap = mapPeopleToCapabilities(data.database.members);
    const proposedSchedule = data.session;
    const formattedScheduleDate = proposedSchedule.scheduleDate
      .toISOString()
      .split("T")[0];

    proposedSchedule.results.forEach(assignment => {
      const member = peopleMap.get(assignment.member);

      if (member.history[assignment.role] === undefined) {
        member.history[assignment.role] = [formattedScheduleDate];
      } else {
        member.history[assignment.role].unshift(formattedScheduleDate);
      }
    });

    data.database.members = Array.from(peopleMap.values());

    // update history
    data.database.history.unshift({
      scheduleDate: formattedScheduleDate,
      roles: proposedSchedule.results
    });

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
        email: i.email,
        capabilities: i.capabilities,
        history: i.history
      }
    ])
  );
}

function cleanseData(data) {
  for (let i = 0; i < data.database.members.length; i++) {
    delete data.database.members[i].possibleRoles;
  }
  return data;
}
