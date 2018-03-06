"use strict"

const path     = require("path");
const jsonfile = require("jsonfile");

function browserstats(source, props) {
    let end;
    if(source === "all") {
        end = "historical_stats.json";
    } else {
        end = "recent_stats.json";
    }
    const file = path.join(__dirname,`/data/${end}`);

    const data = jsonfile.readFileSync(file);

    let out = {};

    if((props === "both") || (props === "widths") || (props === "lengths")) {
      if(source === "all") {
         const dates = Reflect.ownKeys(data);
         dates.reduce((a,c) => {
            if(!a[c]) a[c] = {};
            a[c][props] = data[c][props];
            return a;
         }, out);
      } else {
         out[props] = data[props];
      }
    } else {
      if(source === "all") {
         const dates = Reflect.ownKeys(data);
         dates.reduce((a,c) => {
            a[c] = data[c];
            return a;
         }, out);
      } else {
         out = data;
      }
    }

    return out;
}

module.exports = browserstats;
