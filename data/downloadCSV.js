"use strict";

const request  = require("request");
const jsonfile = require("jsonfile");
const path     = require("path");
const fs       = require("fs");

function downloadCSV() {
   jsonfile.readFile(path.join(__dirname, "urls.json"), (err, data) => {
      if(err) throw err;
      let url = data.csvURL;
      request(url, (err, data, body) => {
         if(err) throw err;
         console.log(data);
         fs.writeFileSync(path.join(__dirname, "browser_stats.csv"), body);
      });
   });
}

downloadCSV();