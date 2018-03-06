"use strict"

const browserstats = require("../browserstats");

// Request a specific data set and use it like any other object
const data = browserstats("all", "both");

console.log(data[Reflect.ownKeys(data)[0]]);
// { both:
//   { '360x640': { pct: '15.03' },
//     '1366x768': { pct: '14.29' },
//     '1920x1080': { pct: '7.34' },
//     ...
//   }
// }
