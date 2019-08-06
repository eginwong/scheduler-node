// TODO: consume proposed schedule and update database service and export
// TODO: save proposed schedule to database service and export
import munkres from "munkres-js";
import moment from "moment";

import DatabaseService from "./database.service";

const MunkresService = {
  GenerateSchedule
};

export default MunkresService;

function GenerateSchedule(scheduleDate, participants) {
  const database = DatabaseService.GetData().database;
  // create hashmap to more easily extract members from json
  const peopleMap = mapPeopleToCapabilities(database.members);

  // convert people with capabilities into an array of values for cost matrix
  // start by retrieving the user object from the peopleMap to compute values
  const munkresMatrix = [];
  const peoples = []; // filtered peoples
  const roleArray = populateRoles(database.roles);

  // simple validation
  if (participants.length < roleArray.length) {
    throw new Error("Insufficient members to create schedule");
  }

  // #0 preprocess to know which roles should be removed from matrix
  const lockMap = generateLockMap(participants);
  const globalConstraints = createConstraintsObject(lockMap);

  participants
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
          munkresVal = lastRoleDate
            ? moment(scheduleDate).diff(lastRoleDate, "days")
            : munkresVal;
        } else {
          munkresVal = -munkresVal;
        }

        for (let count = 0; count < role.quantity; count++) {
          if (isRoleLocked(localConstraints, role.name)) {
            // update local constraints object
            localConstraints[role.name]--;
          } else {
            userHeuristic.push(munkresVal);
          }
        }
      }

      munkresMatrix.push(userHeuristic);
    });

  const schedule = retrieveSchedule(munkresMatrix);

  // time to fabricate the schedule array with the locks
  let scheduleIndex = 0;
  const resultArray = [];
  for (let index = 0; index < roleArray.length; index++) {
    const roleName = roleArray[index];
    if (lockMap.get(roleName) && lockMap.get(roleName).length > 0) {
      resultArray.push([roleName, lockMap.get(roleName).pop()]);
    } else {
      resultArray.push([roleName, peoples[schedule[scheduleIndex][0]]]);
      scheduleIndex++;
    }
  }

  return resultArray;
}

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

function createConstraintsObject(lockMap) {
  const globalConstraints = {};
  for (const [key, val] of lockMap.entries()) {
    globalConstraints[key] = val.length;
  }
  return globalConstraints;
}

function retrieveSchedule(munkresMatrix) {
  const schedule = munkres(munkres.make_cost_matrix(munkresMatrix));
  schedule.sort((a, b) => a[1] - b[1]);
  return schedule;
}
