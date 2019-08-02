const munkres = require("munkres-js");
const fs = require("fs");
const moment = require("moment");

const STATSTARTTIME = new Date();

fs.readFile("source.json", (err, data) => {
  const store = JSON.parse(data);
  const database = store.database;

  // create hashmap to more easily extract members from json
  const peopleMap = mapPeopleToCapabilities(database.members);

  // metadata for scheduler run
  const scheduleDate = moment(new Date());

  // convert people with capabilities into an array of values for cost matrix
  // start by retrieving the user object from the peopleMap to compute values

  const munkresMatrix = [];
  const peoples = []; // filtered peoples
  const roleArray = populateRoles(database.roles);

  const mockInput = [
    {
      name: "munaf-matadar",
      lock: "topicsmaster"
    },
    {
      name: "andrea-richardson",
      lock: "toastmaster"
    },
    {
      name: "reem-abdalla"
    },
    {
      name: "dana-woo"
    },
    {
      name: "keegan-grimminck",
    },
    {
      name: "eric-wong"
    },
    {
      name: "dan-barmasch",
    },
    {
      name: "bamike-kuyoro"
    },
    {
      name: "maame-apenteng"
    },
    {
      name: "kurt-henry"
    },
    {
      name: "matthew-steinberg"
    },
    {
      name: "yuki-zhong"
    },
    {
      name: "nikhil-metrani"
    }
  ];

  // #0 preprocess to know which roles should be removed from matrix
  const lockMap = generateLockMap(mockInput);

  const globalConstraints = {};
  for (const [key, val] of lockMap.entries()) {
    globalConstraints[key] = val.length;
  }

  if(mockInput.length < roleArray.length) {
    throw new Error("Insufficient members to create schedule");
  }

  mockInput
    .filter(member => !member.lock) // #1 if you're locked for a role, get filtered out.
    .map(input => peopleMap.get(input.name))
    .forEach(member => {
      peoples.push(member.name);
      const userHeuristic = [];
      const localConstraints = JSON.parse(JSON.stringify(globalConstraints));

      for (let i = 0; i < database.roles.length; i++) {
        const role = database.roles[i];
        // determine munkres value for the role + capability combination
        let munkresVal = 1000000;
        // are they capable of the role?
        if (member.capabilities[role.name] > 0) {
          // check lastDate
          const lastRoleDate = findLastRoleDate(member.history[role.name]);

          if (lastRoleDate) {
            munkresVal = moment(scheduleDate).diff(lastRoleDate, "days");
          }
        } else {
          munkresVal = -munkresVal;
        }

        let count = 0;

        while (count != role.quantity) {
          if (isRoleLocked(localConstraints, role.name)) {
            // update local constraints object
            localConstraints[role.name]--;
          } else {
            userHeuristic.push(munkresVal);
          }
          count++;
        }
      }

      munkresMatrix.push(userHeuristic);
    });

  // TODO: set up email and tings later

  const schedule = retrieveSchedule(munkresMatrix);

  console.log("NAMED SCHEDULE: ");
  // time to fabricate the schedule array with the locks
  let scheduleIndex = 0;
  const resultArray = [];
  for (let index = 0; index < roleArray.length; index++) {
    const roleName = roleArray[index];
    if (lockMap.get(roleName) && lockMap.get(roleName).length > 0) {
      resultArray.push(roleName + ": " + lockMap.get(roleName).pop());
    } else {
      resultArray.push(roleName + ": " + peoples[schedule[scheduleIndex][0]]);
      scheduleIndex++;
    }
  }

  console.log(resultArray);
});

// function to create lockMap (key: role, value: [] })
function generateLockMap(input) {
  const lockMap = new Map();
  input
    .filter(member => member.lock)
    .forEach(member => {
      const entry = lockMap.has(member.lock) ? lockMap.get(member.lock) : [];
      entry.push(member.name);
      lockMap.set(member.lock, entry);
    });
  return lockMap;
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

function findLastRoleDate(userHistory) {
  return userHistory && userHistory[0] ? userHistory[0] : undefined;
}

function populateRoles(databaseRoles) {
  const roles = [];

  databaseRoles.forEach(role => {
    let q = 0;
    while (q != role.quantity) {
      roles.push(role.name);
      q++;
    }
  });
  return roles;
}

function isRoleLocked(constraints, roleName) {
  return constraints[roleName] && constraints[roleName] > 0;
}

function retrieveSchedule(munkresMatrix) {
  console.info(
    "STATS: Preprocessing Execution time: %dms",
    new Date() - STATSTARTTIME
  );

  const STATSBEFOREMUNKRES = new Date();
  const schedule = munkres(munkres.make_cost_matrix(munkresMatrix));
  console.info(
    "STATS: Munkres Execution time: %dms",
    new Date() - STATSBEFOREMUNKRES
  );
  schedule.sort((a, b) => a[1] - b[1]);
  return schedule;
}
