**THIS PROJECT IS DEPRECATED, IF YOU WANT TO TAKE OVER THE PROJECT MESSAGE ALMACLAINE**

# browserstats
Data set and json loader library based on statcounter.com browser size statistics.

```javascript
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
```

## Installing
`npm install browserstats`

## Citation

*Built on statcounter.com browser size statistics*
http://gs.statcounter.com/screen-resolution-stats

## Main Example
Setup.
```javascript
// Request a specific data1 set and use it like any other object
const data1 = browserstats("all", "both");
```

The result is a json object
```javascript
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
```

Defaults to most recent data set
```javascript
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
```

Specific dimensions retain an array of its corresponding aggregated dimensions.
```javscript
console.log(data2["lengths"][Reflect.ownKeys(data2["lengths"])[0]]);
// { widths: [ '128' ], pct: 0.02 }
```

The combined dimensions just retain the percentage of occurence.
```javscript
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
```

## API

### BrowserStats
Main class, constructor takes valid file path parameters and returns object.

#### Init
```javascript
// Can request most recent data set, or historical sets
// all requests all, any other value returns most recent
const data1 = browserstats("all", "");
const data2 = browserstats("", "");

// Can request specific data sets, or return all
// specific values return only those data sets, any other value
// returns all three data sets
const data3 = browserstats("", "both");
const data4 = browserstats("", "widths");
const data5 = browserstats("", "lengths");
const data6 = browserstats("", "");
```

#### Using Data
To use data, call browserstats with the appropriate parameters, returns an object.

```javascript
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
```

## Scripts

#### Testing
To run mocha/chai tests.
`npm run test`

#### Download Data
Redownload the csv file
`npm run dl`

#### Convert to JSON
Redownload the csv file
`npm run c2j`

#### Examples
To run the main example.
`npm run ex`

To run all examples.
`npm run exAll`

## License
BrowserStats.js is released under the MIT license.
