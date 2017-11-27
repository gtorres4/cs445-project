var Seat = require("./../classes/Seat");
var Row = require("./../classes/Row");
var Section = require("./../classes/Section");
var Theater = require("./../classes/Theater");

describe("Theater", function() {

  beforeEach(function() {
    this.s1 = new Seat.Seat(1, 201);
    this.s2 = new Seat.Seat(1, 202);
    this.s3 = new Seat.Seat(1, 203);
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
    this.section1 = new Section.Section("Left", 123);
    this.section1.addRow(this.r1);
    this.section1.addRow(this.r2);
    this.section1.addRow(this.r3);
    this.section1.price = 100;

    this.s4 = new Seat.Seat(1, 204);
    this.s5 = new Seat.Seat(1, 205);
    this.s6 = new Seat.Seat(1, 206);
    this.r4 = new Row.Row(1);
    this.r5 = new Row.Row(2);
    this.r6 = new Row.Row(3);
    this.rows = [];
    this.rows.push(this.r4);
    this.rows.push(this.r5);
    this.rows.push(this.r6);
    this.r4.addSeat(this.s4);
    this.r5.addSeat(this.s5);
    this.r6.addSeat(this.s6);
    this.section2 = new Section.Section("Middle", 124);
    this.section2.addRow(this.r4);
    this.section2.addRow(this.r5);
    this.section2.addRow(this.r6);
    this.section2.price = 150;

    this.s7 = new Seat.Seat(1, 207);
    this.s8 = new Seat.Seat(1, 208);
    this.s9 = new Seat.Seat(1, 209);
    this.r7 = new Row.Row(1);
    this.r8 = new Row.Row(2);
    this.r9 = new Row.Row(3);
    this.rows = [];
    this.rows.push(this.r7);
    this.rows.push(this.r8);
    this.rows.push(this.r9);
    this.r7.addSeat(this.s7);
    this.r8.addSeat(this.s8);
    this.r9.addSeat(this.s9);
    this.section3 = new Section.Section("Right", 125);
    this.section3.addRow(this.r7);
    this.section3.addRow(this.r8);
    this.section3.addRow(this.r9);
    this.section3.price = 200;

    this.thName = "Thalia";

    this.theater = new Theater.Theater(this.thName);
    this.theater.addSection(this.section1);
    this.theater.addSection(this.section2);
    this.theater.addSection(this.section3);
  })

  it("Adds a section to theater", function() {
    var newTheater = new Theater.Theater("Gabe");
    var section = new Section.Section("Back", 123);
    newTheater.addSection(section);

    expect(newTheater.sections.length).toEqual(1);
    expect(newTheater.sections[0]).toEqual(section);
  });

  it("Gets no open sections from theather", function() {
    var obj = [];
    expect(this.theater.getOpenSections()).toEqual(obj);
  });

  it("Gets open sections from theater", function() {
    this.section2.open = true;
    this.section3.open = true;
    var obj = [{
      sid: this.section2.sid,
      section_name: this.section2.name
    }, {
      sid: this.section3.sid,
      section_name: this.section3.name
    }];

    expect(this.theater.getOpenSections()).toEqual(obj);
  });

  it("Returns boolean if section given sid is open or closed", function() {
    this.section2.open = true;
    expect(this.theater.isOpenSection(this.section2.sid)).toEqual(true);
    expect(this.theater.isOpenSection(this.section3.sid)).toEqual(false);
  });

  it("Returns -1 if given seats are not available", function() {
    this.s1.status = true;
    var objToPass = [];
    objToPass.push(this.s1);
    expect(this.theater.areSeatsAvailable(objToPass)).toEqual(-1);
  });

  it("Returns object if given seats are available", function() {
    this.section1.open = true;
    this.s1.status = false;
    var obj = [];
    obj.push(this.s1);
    expect(this.theater.areSeatsAvailable(obj, 123)).not.toEqual(-1);
  });

  it("Produces correct output for show sections", function() {
    this.section1.open = true;
    this.section2.open = true;
    this.section3.open = true;
    var obj = [{
      sid: this.section1.sid,
      section_name: this.section1.name,
      price: this.section1.price
    }, {
      sid: this.section2.sid,
      section_name: this.section2.name,
      price: this.section2.price
    }, {
      sid: this.section3.sid,
      section_name: this.section3.name,
      price: this.section3.price
    }];

    expect(this.theater.getShowSections()).toEqual(obj);
  });

  it("Returns a specific section's output", function() {
    var obj = this.section1.getShowSectionOutput();
    expect(this.theater.getSection(this.section1.sid)).toEqual(obj);
  });

  it("Returns section output for given sid", function() {
    var obj = this.section2.getSectionOutput();
    expect(this.theater.getSectionOutput(this.section2.sid)).toEqual(obj);
  });

  // it("Returns -1 if given sid not found when searching for section output", function() {
  //   expect(this.theater.getSectionOutput(5)).toEqual(-1);
  // });

  it("Produces sid's and section_name's for all sections", function() {
    var obj = [{
      sid: this.section1.sid.toString(),
      section_name: this.section1.name
    }, {
      sid: this.section2.sid.toString(),
      section_name: this.section2.name
    }, {
      sid: this.section3.sid.toString(),
      section_name: this.section3.name
    }];

    expect(this.theater.getSections()).toEqual(obj);
  });

  it("Gets Occupancy Report for empty theater", function() {
    var sectionReports = [{
      sid: this.section1.sid,
      section_name: this.section1.name,
      section_price: this.section1.price,
      seats_available: 3,
      seats_sold: 0,
      section_revenue: 0
    }, {
      sid: this.section2.sid,
      section_name: this.section2.name,
      section_price: this.section2.price,
      seats_available: 3,
      seats_sold: 0,
      section_revenue: 0
    }, {
      sid: this.section3.sid,
      section_name: this.section3.name,
      section_price: this.section3.price,
      seats_available: 3,
      seats_sold: 0,
      section_revenue: 0
    }];

    var report = {
      seats_available: 9,
      seats_sold: 0,
      percentage: 0,
      sections: sectionReports,
      total_revenue: 0
    };

    expect(this.theater.getOccupancyReport()).toEqual(report);
  });

  it("Gets occupancy report with some seats sold", function() {
    this.s1.status = true;
    this.s4.status = true;
    this.s7.status = true;

    var sectionReports = [{
      sid: this.section1.sid,
      section_name: this.section1.name,
      section_price: this.section1.price,
      seats_available: 3,
      seats_sold: 1,
      section_revenue: this.section1.price
    }, {
      sid: this.section2.sid,
      section_name: this.section2.name,
      section_price: this.section2.price,
      seats_available: 3,
      seats_sold: 1,
      section_revenue: this.section2.price
    }, {
      sid: this.section3.sid,
      section_name: this.section3.name,
      section_price: this.section3.price,
      seats_available: 3,
      seats_sold: 1,
      section_revenue: this.section3.price
    }];

    var percent = 3 / 9;

    var report = {
      seats_available: 9,
      seats_sold: 3,
      percentage: percent,
      sections: sectionReports,
      total_revenue: this.section1.price + this.section2.price + this.section3.price
    };

    expect(this.theater.getOccupancyReport()).toEqual(report);
  });

  ({
    section_name: 'Left',
    starting_seat_id: '201',
    seats: [({
      row: 1,
      seats: [({
        cid: '201',
        seat: '1',
        status: 'available'
      })]
    })],
    price: 100
  })

  it("Finds contig seats given section and number of seats", function() {
    var seats = [{
      row: 1,
      seats: [{
        cid: this.s1.cid.toString(),
        seat: this.s1.num.toString(),
        status: "available"
      }]
    }];

    var obj = {
      section_name: this.section1.name,
      starting_seat_id: this.s1.cid.toString(),
      seats: seats,
      price: this.section1.price
    };

    expect(this.theater.findAnyContigSeats(this.section1.sid, 1)).toEqual(obj);
  });

  it("Returns seat given cid", function() {
    expect(this.theater.getSeat(this.s1.cid)).toEqual(this.s1);
  });


});
