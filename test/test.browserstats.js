"use strict"

const chai         = require("chai");
const browserstats = require("../browserstats.js");

describe("browserstats", function() {
   describe("Data Test", function() {
      it("Should return an array of objects", function() {
         let file  = ["all","recent"];
         let props = ["both","widths","lengths",""];
         file.map((e1) => props.map((e2) => chai.expect(browserstats(e1,e2)).to.be.an("object")));
      });
      it("Correct data set returned pt1", function() {
         const stats = browserstats("all","");
         let dates = Reflect.ownKeys(stats)
         chai.expect(dates.length > 1).to.be.true;
         dates.map((e) => {
            chai.expect(Reflect.ownKeys(stats[e]).length === 3).to.be.true;
            let props = ["both","widths","lengths"];
            for(const x of props) {
               chai.expect(Reflect.has(stats[e], x)).to.be.true;
            }
         });
      });
      it("Correct data set returned pt2", function() {
         let props = ["both","widths","lengths"];
         for(const x of props) {
            const stats = browserstats("all",x);
            let dates = Reflect.ownKeys(stats)
            dates.map((e) => {
               chai.expect(Reflect.ownKeys(stats[e]).length === 1).to.be.true;
               chai.expect(Reflect.has(stats[e],x));
            });
         }
      });
      it("Correct data set returned pt3", function() {
         const stats = browserstats("recent","");
         chai.expect(Reflect.ownKeys(stats).length === 3).to.be.true;
         let props = ["both","widths","lengths"];
         for(const x of props) {
            chai.expect(Reflect.has(stats, x)).to.be.true;
         }
      });
      it("Correct data set returned pt3", function() {
         let props = ["both","widths","lengths"];
         for(const x of props) {
            const stats = browserstats("recent",x);
            chai.expect(Reflect.ownKeys(stats).length === 1).to.be.true;
            chai.expect(Reflect.has(stats, x)).to.be.true;
         }
      });
   });
});
