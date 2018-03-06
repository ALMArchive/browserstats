"use strict"

const browserstats = require("../browserstats");

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
