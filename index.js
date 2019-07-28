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

  // TODO: dot matrix participant, iterate through list of members and potential locks and adjust matrix accordingly

  // convert people with capabilities into an array of values for cost matrix
  // start by retrieving the user object from the peopleMap to compute values

  const munkresMatrix = [];
  const peoples = [];
  const roleArray = populateRoles(database.roles);

  // TODO: to refactor to not use the entire member base of people for the scheduler run
  peopleMap.forEach((value, key) => {
    peoples.push(key);
    // console.log(key, value);
    const userHeuristic = [];
    for (let i = 0; i < database.roles.length; i++) {
      const role = database.roles[i];

      // determine munkres value for the role + capability combination
      let munkresVal = Number.MAX_VALUE;
      // are they capable of the role?
      if (value.capabilities[role.name] > 0) {
        // check lastDate
        const lastRoleDate = findLastRoleDate(value.history[role.name]);

        if (lastRoleDate) {
          munkresVal = moment(scheduleDate).diff(lastRoleDate, "days");
        } else {
          // leave as Infinity
        }
      } else {
        munkresVal = -munkresVal;
      }

      let count = 0;
      while (count != role.quantity) {
        userHeuristic.push(munkresVal);
        count++;
      }
    }
    munkresMatrix.push(userHeuristic);
  });

  // must use the roles object to know size of array
  // check if locked object contains role, if yes, set to 0 or 1 depending on user (make this a hashmap too)
  // iterate by roles to create an array for each person
  // store index of the person in the array back into the hashmap for quick retrieval afterwards
  // run munkres
  // retrieve values out of munkres into names

  // set up email and tings later

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

  schedule.sort(function(a, b) {
    return a[1] - b[1];
  });

  console.log("NAMED SCHEDULE: ");
  console.log(
    schedule.map(pair => {
      return peoples[pair[0]] + ", " + roleArray[pair[1]];
    })
  );
});

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
