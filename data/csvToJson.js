"use strict";

const parse = require("csv-parse");
const fs = require("fs");
const path = require("path");
const jsonfile = require("jsonfile");

let input = fs.readFileSync(path.join(__dirname, "browser_stats.csv"), {
    encoding: "utf-8"
});

function* arGen(ar) {
    let i = 0;
    while (true) {
        yield ar[i++ % ar.length];
    }
}

const parser = parse(input, { delimiter: ',' }, function(err, output) {
    let header = output.shift();

    header.shift();
    let dates = output.map((ar) => ar.shift());

    let unkInd = header.indexOf("Unknown");

    let unknownData = output.map((ar) => ar[unkInd]);

    let othInd = header.indexOf("Other");
    let otherData = header.map((ar) => ar[othInd]);



    header = header.slice(0, unkInd)
        .concat(header.slice(unkInd + 1, othInd))
        .concat(header.slice(othInd + 1, header.length));


    output = output.map((e) => {
        return e.slice(0, unkInd)
            .concat(e.slice(unkInd + 1, othInd))
            .concat(e.slice(othInd + 1, output.length));
    });

    let headGen = arGen(header);

    let allDatesBothDims = dates.reduce(function(a, c, i) {
        // console.log(output[i]);
        a[c] = output[i].reduce((a1, c1) => {
            let val = headGen.next().value;
            a1[val] = { pct: c1 };
            return a1;
        }, {});
        return a;
    }, {});

    let splitDimensions = {};

    for(const date in allDatesBothDims) {
        let rng = allDatesBothDims[date];
        let lenMap = {};
        let widMap = {};
        for(const prop in rng) {
            let res = prop;
            let split = res.split("x");
            if(!Reflect.has(widMap, split[0])) {
                let setObj = { lengths: [split[1]], pct: (rng[prop].pct - 0) };
                widMap[split[0]] = setObj;
            } else {
                let tmpGet = widMap[split[0]];
                tmpGet.lengths.push(split[1]);
                tmpGet.pct = tmpGet.pct + (rng[prop].pct - 0);
            }

            if(!Reflect.has(lenMap, split[1])) {
                let setObj = { widths: [split[0]], pct: (rng[prop].pct - 0) };
                lenMap[split[1]] = setObj;
            } else {
                let tmpGet = lenMap[split[1]];
                tmpGet.widths.push(split[0]);
                tmpGet.pct = tmpGet.pct + (rng[prop].pct - 0);
            }
        }
        splitDimensions[date] = { lengths: lenMap, widths: widMap };
    }

    let finalObj = dates.reduce((a, c) => {
        a[c] = {
            both: allDatesBothDims[c],
            lengths: splitDimensions[c].lengths,
            widths: splitDimensions[c].widths
        }
        return a;
    }, {});
    let lastDate = dates.sort((a, b) => {
        let yearA = a.split("-")[0] - 0;
        let yearB = b.split("-")[0] - 0;
        let yearDif= yearA - yearB;

        let dayA = a.split("-")[1] - 0;
        let dayB = b.split("-")[1] - 0;
        let dayDif= dayA - dayB;

        return 10 * yearDif+ dayDif;
    })[dates.length - 1];
    let recentObj = finalObj[lastDate];

   jsonfile.writeFile(path.join(__dirname,"historical_stats.json"), finalObj, function (err) {
      if(err) console.error(err);
   });

   jsonfile.writeFile(path.join(__dirname,"recent_stats.json"), recentObj, function (err) {
      if(err) console.error(err);
   });
});