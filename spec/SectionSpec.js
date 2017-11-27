var Seat = require("./../classes/Seat");
var Row = require("./../classes/Row");
var Section = require("./../classes/Section");

describe("Section", function() {

  beforeEach(function() {
    this.s1 = new Seat.Seat(1, 201);
    this.s2 = new Seat.Seat(1, 205);
    this.s3 = new Seat.Seat(1, 198);
    this.r1 = new Row.Row(1);
    this.r2 = new Row.Row(2);
    this.r3 = new Row.Row(3);
    this.rows = [];
    this.rows.push(this.r1);
    this.rows.push(this.r2);
    this.rows.push(this.r3);
    this.r1.addSeat(this.s1);
    this.r2.addSeat(this.s2);
    this.r3.addSeat(this.s3);
    this.section = new Section.Section("Front", 123);
    this.section.addRow(this.r1);
    this.section.addRow(this.r2);
    this.section.addRow(this.r3);
    this.section.price = 100;
  });

  it("Adds a row", function() {
    var r = new Row.Row(1);
    var result = [];
    result.push(r);
    var s = new Section.Section("Front",123);
    s.addRow(r);

    expect(s.rows).toEqual(result);
  });

  it("Finds correct row index for a given cid", function() {
    var correctIndex = 1;
    expect(this.section.getCidRow(201).rowNum).toEqual(correctIndex);
  });

  it("Returns -1 when searching for index for invalid cid", function() {
    var correctIndex = -1;
    expect(this.section.getCidRow(123)).toEqual(correctIndex);
  });

  it("Produces correct section output", function() {
    var rowOutput = [];
    this.rows.forEach(function(row) {
      rowOutput.push(row.getRowOutput());
    });

    var correctObj = {
      sid: this.section.sid.toString(),
      section_name: this.section.name,
      seating: rowOutput
    };

    expect(this.section.getSectionOutput()).toEqual(correctObj);
  });

  it("Produces correct output when getting show output", function() {
    var rowOutput = [];
    this.rows.forEach(function(row) {
      rowOutput.push(row.getShowRowOutput());
    });

    var correctObj = {
      sid: this.section.sid.toString(),
      section_name: this.section.name,
      price: this.section.price.toString(),
      seating: rowOutput
    };

    expect(this.section.getShowSectionOutput()).toEqual(correctObj);
  });

  it("Finds correct seat given cid", function() {
    var correctSeat = this.s1;
    var cid = correctSeat.cid;

    expect(this.section.getSeat(cid)).toEqual(correctSeat);
  });

  it("Gets correct occupancy report", function() {
    var correctObj = {
      available: 3,
      sold: 0,
      section_price: this.section.price,
      sid: this.section.sid,
      section_name: this.section.name,
      section_revenue: 0
    };

    expect(this.section.getOccupancyReport()).toEqual(correctObj);
  });
});
