"use strict"

const browserstats = require("../browserstats");

// Request a specific data1 set and use it like any other object
const data1 = browserstats("all", "both");

console.log(data1[Reflect.ownKeys(data1)[0]]);
// { both:
//   { '360x640': { pct: '15.03' },
//     '1366x768': { pct: '14.29' },
//     '1920x1080': { pct: '7.34' },
//     ...
//   }
// }
