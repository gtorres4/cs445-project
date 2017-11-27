var Ticket = require("./../classes/Ticket");

describe("Ticket", function() {

  beforeEach(function() {
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
  });

  it("Produces correct ticket search response", function() {
    var unsecureCC = this.patron_info.cc_number;
    var secureCC = "xxxxxxxxxxxx" + unsecureCC.slice(12, 16);
    var correctObj = {
      tid: this.tid,
      price: this.price,
      status: false,
      wid: this.wid,
      show_info: this.show_info,
      patron_info: {
        name: this.patron_info.name,
        phone: this.patron_info.phone,
        email: this.patron_info.email,
        cc_number: secureCC,
        cc_expiration_date: this.patron_info.cc_expiration_date
      },
      sid: this.sid,
      section_name: this.section_name,
      seating: [{
        row: this.seat.row,
        seats: [{
          cid: this.seat.seats.cid,
          seat: this.seat.seats.num
        }]
      }]
    };
    expect(this.ticket.getTicketSearchResponse()).toEqual(correctObj);
  });

  it("Secures patron CC info", function() {
    var unsecureCC = this.patron_info.cc_number;
    var secureCC = "xxxxxxxxxxxx" + unsecureCC.slice(12, 16);
    var correctObj = {
      name: this.patron_info.name,
      phone: this.patron_info.phone,
      email: this.patron_info.email,
      cc_number: secureCC,
      cc_expiration_date: this.patron_info.cc_expiration_date
    };
    expect(this.ticket.getPatronInfo()).toEqual(correctObj);
  });

  it("Produces correct Order Search Response for open ticket", function() {
    var correctObj = {
      tid: this.tid.toString(),
      status: "open"
    };
    expect(this.ticket.getOrderSearchResponse()).toEqual(correctObj);
  })


    it("Produces correct Order Search Response for donated ticket", function() {
      var correctObj = {
        tid: this.tid.toString(),
        status: "donated"
      };
      this.ticket.donated = true;
      expect(this.ticket.getOrderSearchResponse()).toEqual(correctObj);
    })


      it("Produces correct Order Search Response for used ticket", function() {
        var correctObj = {
          tid: this.tid.toString(),
          status: "used"
        };
        this.ticket.used = true;
        expect(this.ticket.getOrderSearchResponse()).toEqual(correctObj);
      })
});
