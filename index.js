const munkres = require("munkres-js");
const fs = require("fs");

fs.readFile("source.json", (err, data) => {
  const store = JSON.parse(data);
  const peopleWithCapabilities = store.database.users.filter(
    x =>
      !(
        Object.keys(x.capabilities).length === 0 &&
        x.capabilities.constructor === Object
      )
  );

  // convert db into hashmap
  var peopleMap = new Map(
    peopleWithCapabilities.map(i => [
      i.name,
      {
        capabilities: i.capabilities,
        history: i.history
      }
    ])
  );

  // metadata for scheduler run
  const totalRoles = store.database.roles
    .map(role => role.quantity)
    .reduce((quantity, current) => quantity + current, 0);

  const scheduleDate = new Date();

  // var d2 = new Date("2011/02/01")  // some date
  // var diff = Math.abs(d1-d2);

  // TODO: find a way to create munkresMatrix directly
  const munkresMatrix = [];

  // convert people with capabilities into an array of values for cost matrix
  // start by retrieving the user object from the peopleMap to compute values
  peopleMap.forEach((value, key) => {
    const userHeuristic = [];
    for (let i = 0; i < totalRoles; i++) {
      let roleQuantityCount = 0;
    }
  });

  // must use the roles object to know size of array
  // check if locked object contains role, if yes, set to 0 or 1 depending on user (make this a hashmap too)
  // iterate by roles to create an array for each person
  // store index of the person in the array back into the hashmap for quick retrieval afterwards
  // run munkres
  // retrieve values out of munkres into names

  // set up email and tings later
});

const result = munkres(
  munkres.make_cost_matrix([
    // Toastmaster, Grammarian, Timekeeper, Evaluator #1, Evaluator #2, Speaker #1, Speaker #2, General Evaluator, Table Topics
    [400, 150, 400, 300, 300, 300, 300, 300, 300],
    [400, 450, 600, 300, 300, 300, 300, 300, 300],
    [300, 225, 300, 300, 300, 300, 300, 300, 300],
    [300, 225, 300, 300, 300, 300, 300, 300, 300],
    [300, 225, 300, 300, 300, 300, 300, 300, 300],
    [300, 225, 300, 300, 300, 300, 300, 300, 300],
    [300, 225, 300, 300, 300, 300, 300, 300, 300],
    [300, 225, 300, 300, 300, 300, 300, 300, 300],
    [300, 225, 300, 300, 300, 300, 300, 300, 300],
    [300, 225, 300, 300, 300, 300, 300, 300, 300]
  ])
);

// console.log(result);
