"use strict"

const browserstats = require("../browserstats");

// Request a specific data1 set and use it like any other object
const data1 = browserstats("all", "both");

console.log(data1[Reflect.ownKeys(data1)[0]]);
// { both:
//   { '360x640': { pct: '15.03' },
//     '1366x768': { pct: '14.29' },
//     '768x1024': { pct: '3.08' },
//     ...

// The historical data1 set has an extra property layer, seperating by dates
console.log(Reflect.ownKeys(data1));
// [ '2016-09',
//  '2016-10',
//  '2016-11',
//  ...
//  '2017-07',
//  '2017-08',
//  '2017-09' ]

const data2 = browserstats("", "");

console.log(Reflect.ownKeys(data2)); // [ 'both', 'lengths', 'widths' ]

console.log(Reflect.ownKeys(data2["both"]));
// [ '360x640',
//  '1366x768',
//  '1920x1080',
//  '375x667',
//  '720x1280',
//  '768x1024',
//  ...

console.log(data2["lengths"][Reflect.ownKeys(data2["lengths"])[0]]);
// { widths: [ '128' ], pct: 0.02 }

console.log(data2);
// { both:
//     { '360x640': { pct: '21.19' },
//       '1366x768': { pct: '12.43' },
//       '1920x1080': { pct: '7.09' }
//       ...
//     },
//   lengths:
//     { '130': { widths: [Object], pct: 0.02 },
//       '133': { widths: [Object], pct: 0.02 },
//       '160': { widths: [Object], pct: 0.02 },
//       ...
//     },
//   widths:
//     { '122': { lengths: [Object], pct: 0.01 },
//       '128': { lengths: [Object], pct: 0.05 },
//       '218': { lengths: [Object], pct: 0.02 },
//       ...
//     }
// }
