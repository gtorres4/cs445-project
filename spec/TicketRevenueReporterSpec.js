var TicketRevenueReporter = require("./../classes/TicketRevenueReporter");
var OccupancyReporter = require("./../classes/OccupancyReporter");
var Helper = require("./../classes/helper");
var Theater = require("./../classes/Theater");
var Show = require("./../classes/Show");
var Row = require("./../classes/Row");
var Seat = require("./../classes/Seat");
var Section = require("./../classes/Section");
var Order = require("./../classes/Order");
var Ticket = require("./../classes/Ticket");

describe("Ticket Revenue Reporter", function() {

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
    this.seating_info = [{
        "sid": "123",
        "price": 600
      },
      {
        "sid": "124",
        "price": 75
      },
      {
        "sid": "125",
        "price": 60
      }
    ];
    this.show_info = {
      name: "Gabes Show",
      web: "www.google.com",
      date: "2017-11-25",
      time: "17:00"
    };
    this.wid = 300;

    this.theater = new Theater.Theater(this.thName);
    this.theater.addSection(this.section1);
    this.theater.addSection(this.section2);
    this.theater.addSection(this.section3);

    this.show = new Show.Show(this.wid, this.show_info, this.seating_info, this.theater);
  });

  it("Produces correct revenue report for array of shows", function() {
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
    }]
    var response = {
      mrid: 802,
      name: "Revenue from ticket sales",
      total_shows: 1,
      total_seats: 9,
      sold_seats: 0,
      overall_revenue: 0,
      shows: [{
        wid: this.show.wid,
        show_info: this.show.show_info,
        sections: sectionReports
      }]
    };

    var shows = [];
    shows.push(this.show);
    expect(TicketRevenueReporter.getTicketRevenueReport(shows)).toEqual(response);
  });

  it("Produces correct ticket revenue report for one show", function() {
    var response = {
      mrid: (802).toString(),
      name: "Revenue from ticket sales",
      total_shows: 1,
      total_seats: 0,
      sold_seats: 0,
      overall_revenue: 0,
      shows: []
    };

    expect(TicketRevenueReporter.getShowTicketRevenueReport(this.show)).toEqual(response);
  });

  it("blah", function() {
    var start_date = "20171124";
    var end_date = "20171126";

    var response = {
      mrid: 802,
      name: "Revenue from ticket sales",
      start_date: start_date,
      end_date: end_date,
      total_shows: 1,
      total_seats: 0,
      sold_seats: 0,
      overall_revenue: 0,
      shows: []
    };

    var shows = [];
    shows.push(this.show);
    expect(TicketRevenueReporter.getShowRangeTicketRevenueReport(shows, start_date, end_date)).toEqual(response);
  })
});
