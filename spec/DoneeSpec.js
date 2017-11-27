var Donee = require("./../classes/Donee");
var Ticket = require("./../classes/Ticket");

describe("Donee", function() {

  beforeEach(function() {
    this.tid = 700;
    this.price = 50;
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

    this.did = 100;
    this.wid = 300;
    this.count = 4;
    this.patron_info = {
      name: "Snoop",
      phone: "123-456-7890",
      email: "email@gmail.com",
      cc_number: "1234123412341234",
      cc_expiration_date: "11/24"
    };

    this.donee = new Donee.Donee(this.did, this.wid, this.count, this.patron_info);
  });

  it("Produces correct subscription update for pending donee", function() {
    var obj = {
      did: this.did.toString(),
      wid: this.wid.toString(),
      count: this.count,
      status: "pending",
      tickets: [],
      patron_info: this.patron_info
    };

    expect(this.donee.getSubUpdate()).toEqual(obj);
  });

  it("Produces correct subscription update for assigned donee", function() {
    this.donee.tickets.push(this.ticket);
    this.donee.received = true;
    var obj = {
      did: this.did.toString(),
      wid: this.wid.toString(),
      count: this.count,
      status: "assigned",
      tickets: [this.ticket.tid.toString()],
      patron_info: this.patron_info
    }

    expect(this.donee.getSubUpdate()).toEqual(obj);
  });

  it("Gets correct ticket ids for assigned tickes", function() {
    this.donee.tickets.push(this.ticket);
    this.donee.received = true;
    var tids = [];
    tids.push(this.ticket.tid.toString());
    expect(this.donee.getTicketTids()).toEqual(tids);
  });

  it("Finds a donated ticket for donee from array of donatedTickets", function() {
    var donatedTickets = [];
    donatedTickets.push(this.ticket);
    var tids = [];
    tids.push(this.ticket);
    expect(this.donee.findDonatedTicket(donatedTickets)).toEqual(tids);
  });

});
