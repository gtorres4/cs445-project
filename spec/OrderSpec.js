var Order = require("./../classes/Order");
var Ticket = require("./../classes/Ticket");

describe("Order", function() {

  beforeEach(function() {
    this.order_amount = 100;

    this.raw_date = new Date();
    this.date_year = this.raw_date.getFullYear();
    this.date_month = this.raw_date.getMonth();
    this.date_day = this.raw_date.getDate();
    this.date_hours = this.raw_date.getHours();
    this.date_minutes = this.raw_date.getMinutes();
    this.date_ordered = this.date_year +
      "-" + this.date_month +
      "-" + this.date_day +
      " " + this.date_hours +
      ":" + this.date_minutes;

    this.oid = 200;
    this.tid = 700;
    this.price = 100;
    this.wid = 300;
    this.show_info = {
      name: "Gabriel Torres",
      date: "2017-11-24",
      time: "13:00"
    };
    this.patron_info = {
      name: "Snoop",
      phone: "123-456-7890",
      email: "email@gmail.com",
      billing_address: "123 S. Sesame St.",
      cc_number: "1234123412341234",
      cc_expiration_date: "11/24"
    };
    this.sid = 123;
    this.section_name = "Front and Center";
    this.seat = {
      row: 1,
      seats: {
        cid: 200,
        num: 1
      }
    };

    this.ticket = new Ticket.Ticket(this.tid,
      this.price,
      this.wid,
      this.show_info,
      this.patron_info,
      this.sid,
      this.section_name,
      this.seat);

    var tickets = [];
    tickets.push(this.ticket);

    this.order = new Order.Order(this.oid,
      this.wid,
      this.show_info,
      this.date_ordered,
      this.raw_date,
      this.order_amount,
      this.patron_info,
      tickets);
  });

  it("Produces correct POST order response", function() {
    var arr = [];
    arr.push(this.ticket.tid.toString());
    var correctObj = {
      oid: this.oid.toString(),
      wid: this.wid.toString(),
      show_info: this.show_info,
      date_ordered: this.date_ordered,
      order_amount: this.order_amount,
      tickets: arr
    };
    expect(this.order.getPostOrderResponse()).toEqual(correctObj);
  });

  it("Gets correct order date", function() {
    var correctDate = new Date(this.date_year, this.date_month - 1, this.date_day);
    expect(this.order.getDate()).toEqual(correctDate);
  });

  it("Produces correct GET orders response", function() {
    var unsecureCC = this.patron_info.cc_number;
    var secureCC = "xxxxxxxxxxxx" + unsecureCC.slice(12, 16);
    var correctObj = {
      oid: this.oid.toString(),
      wid: this.wid.toString(),
      show_info: {
        name: this.show_info.name,
        web: this.show_info.web,
        date: this.show_info.date,
        time: this.show_info.time
      },
      date_ordered: this.date_ordered,
      order_amount: this.order_amount,
      number_of_tickets: 1,
      patron_info: {
        name: this.patron_info.name,
        phone: this.patron_info.phone,
        email: this.patron_info.email,
        billing_address: this.patron_info.billing_address,
        cc_number: secureCC,
        cc_expiration_date: this.patron_info.cc_expiration_date
      }
    }

    expect(this.order.getGetOrdersResponse()).toEqual(correctObj);
  });

  it("Responds true if key contained within object", function() {
    var key = 200;
    var expectedResponse = true;
    expect(this.order.hasKey(key)).toEqual(expectedResponse);
  });

  it("Responds false if key not contained within object", function() {
    var key = "Pizza";
    var expectedResponse = false;
    expect(this.order.hasKey(key)).toEqual(expectedResponse);
  });

  it("Secures patron CC info", function() {
    var unsecureCC = this.patron_info.cc_number;
    var secureCC = "xxxxxxxxxxxx" + unsecureCC.slice(12, 16);
    var correctObj = {
      name: this.patron_info.name,
      phone: this.patron_info.phone,
      email: this.patron_info.email,
      billing_address: this.patron_info.billing_address,
      cc_number: secureCC,
      cc_expiration_date: this.patron_info.cc_expiration_date
    };
    expect(this.order.getPatronInfo()).toEqual(correctObj);
  });

  it("Returns correct array of ticket ids for order", function() {
    var correctArr = [];
    correctArr.push(this.ticket.tid.toString());
    expect(this.order.getTicketsResponse()).toEqual(correctArr);
  });

  it("Returns order search response for tickes", function() {
    var arr = [];
    arr.push(this.ticket.getOrderSearchResponse());
    expect(this.order.getTicks()).toEqual(arr);
  })
});
