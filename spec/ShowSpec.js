var Show = require("./../classes/Show");
var Theater = require("./../classes/Theater");
var Section = require("./../classes/Section");
var Row = require("./../classes/Row");
var Seat = require("./../classes/Seat");
var Order = require("./../classes/Order");
var Ticket = require("./../classes/Ticket");

describe("Show", function() {

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

  it("Updates show theater given seat ids", function() {
    data = {
      seats: [{
        cid: 201
      }]
    };
    this.show.updateTheater(data);
    expect(this.theater.getSeat(data.seats[0].cid).status).toEqual(true);
    expect(this.theater.getSeat(202).status).toEqual(false);
  });

  it("Update show theater given order", function() {
    var order_amount = 100;

    var raw_date = new Date();
    var date_year = raw_date.getFullYear();
    var date_month = raw_date.getMonth();
    var date_day = raw_date.getDate();
    var date_hours = raw_date.getHours();
    var date_minutes = raw_date.getMinutes();
    var date_ordered = date_year +
      "-" + date_month +
      "-" + date_day +
      " " + date_hours +
      ":" + date_minutes;

    var oid = 200;
    var tid = 700;
    var price = 100;
    var wid = 300;
    var show_info = {
      name: "Gabriel Torres",
      date: "2017-11-24",
      time: "13:00"
    };
    var patron_info = {
      name: "Snoop",
      phone: "123-456-7890",
      email: "email@gmail.com",
      billing_address: "123 S. Sesame St.",
      cc_number: "1234123412341234",
      cc_expiration_date: "11/24"
    };
    var sid = 123;
    var section_name = "Left";
    var seat = {
      row: 1,
      seats: {
        cid: 201,
        num: 1
      }
    };

    var ticket = new Ticket.Ticket(tid,
      price,
      wid,
      show_info,
      patron_info,
      sid,
      section_name,
      seat);

    var tickets = [];
    tickets.push(ticket);

    var order = new Order.Order(oid,
      wid,
      show_info,
      date_ordered,
      raw_date,
      order_amount,
      patron_info,
      tickets);

    this.show.orderUpdateTheater(order);
    expect(this.theater.getSeat(seat.seats.cid).status).toEqual(true);
    expect(this.theater.getSeat(205).status).toEqual(false);
  });

  it("Produces correct show output", function() {
    var obj = {
      wid: this.wid.toString(),
      show_info: {
        name: this.show_info.name,
        web: this.show_info.web,
        date: this.show_info.date,
        time: this.show_info.time
      }
    };
    expect(this.show.getShow()).toEqual(obj);
  });

  it("Produces correct show info", function() {
    var obj = {
      name: this.show_info.name,
      web: this.show_info.web,
      date: this.show_info.date,
      time: this.show_info.time
    };
    expect(this.show.getShowInfo()).toEqual(obj);
  });

  it("Responds true if key contained within object", function() {
    var key = "Gabe";
    var expectedResponse = true;
    expect(this.show.hasKey(key)).toEqual(expectedResponse);
  });

  it("Responds false if key not contained within object", function() {
    var key = "Pizza";
    var expectedResponse = false;
    expect(this.show.hasKey(key)).toEqual(expectedResponse);
  });

  it("Produces correct output for getting all shows", function() {
    var obj = {
      wid: this.wid.toString(),
      show_info: {
        name: this.show_info.name,
        web: this.show_info.web,
        date: this.show_info.date,
        time: this.show_info.time
      }
    };
    expect(this.show.getShows()).toEqual(obj);
  });

  it("Finds an open seat within a section", function() {
    var correctSeat = this.s1;
    expect(this.show.findSeats(this.section1.sid, 1).seating[0].seats[0].cid).toEqual(correctSeat.cid.toString());
  });

  it("Correctly unable to find seats for request", function() {
    var correctSeats = [];
    expect(this.show.findSeats(this.section1.sid, 2).seating);
  });

});
