var Helper = require("./../classes/helper");
var Theater = require("./../classes/Theater");
var Show = require("./../classes/Show");
var Row = require("./../classes/Row");
var Seat = require("./../classes/Seat");
var Section = require("./../classes/Section");
var Order = require("./../classes/Order");
var Ticket = require("./../classes/Ticket");

describe("Helper", function() {

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

  it("Initializes Theater Given File", function() {
    var response = [{
        "sid": "123",
        "section_name": "Front right"
      },
      {
        "sid": "124",
        "section_name": "Front center"
      },
      {
        "sid": "125",
        "section_name": "Front left"
      },
      {
        "sid": "126",
        "section_name": "Main right"
      },
      {
        "sid": "127",
        "section_name": "Main center"
      },
      {
        "sid": "128",
        "section_name": "Main left"
      }
    ];

    var th = Helper.initialize();
    expect(th.getSections()).toEqual(response);
  });

  it("Sets the theater sections price for a given theater", function() {
    var sections = [{
      sid: 124,
      price: 100
    },{
      sid: 125,
      price: 200
    }];

    var response = [{
      sid: 124,
      section_name: "Middle"
    },{
      sid: 125,
      section_name: "Right"
    }];

    var th = this.theater;
    th = Helper.showSections(sections, th);
    expect(th.getOpenSections()).toEqual(response);
  });

  it("Returns true of object passed is empty ({})", function() {
    expect(Helper.isEmptyObject({})).toEqual(true);
  });

  it("Returns false if object passed is not empty", function() {
    expect(Helper.isEmptyObject({name: "Gabe"})).toEqual(false);
  });

  it("Produces order response for array of order", function() {
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
    var section_name = "Front and Center";
    var seat = {
      row: 1,
      seats: {
        cid: 200,
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
    var orders = [];
    orders.push(order);

    var response = [];
    response.push(order.getGetOrdersResponse());

    expect(Helper.getOrders(orders)).toEqual(response);
  })
});
