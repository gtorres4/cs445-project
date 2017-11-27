var Helper = require("./../classes/helper");
var Theater = require("./../classes/Theater");
var Show = require("./../classes/Show");
var Row = require("./../classes/Row");
var Seat = require("./../classes/Seat");
var Section = require("./../classes/Section");
var Order = require("./../classes/Order");
var Finder = require("./../classes/Finder");
var Ticket = require("./../classes/Ticket");
var Donee = require("./../classes/Donee");

describe("Finder", function() {

  it("Finds correct ticket given array of tickets and tid", function() {
    var arr = [];
    var t1 = new Ticket.Ticket(1);
    arr.push(t1);
    var t2 = new Ticket.Ticket(2);
    arr.push(t2);
    var t3 = new Ticket.Ticket(3);
    arr.push(t3);
    var t4 = new Ticket.Ticket(4);
    arr.push(t4);
    var t5 = new Ticket.Ticket(5);
    arr.push(t5);

    expect(Finder.findTicket(arr, 2)).toEqual({
      index: 1,
      ticket: t2
    });
  });

  it("Returns -1 if no ticket found with tid given", function() {
    var arr = [];
    var t1 = new Ticket.Ticket(1);
    arr.push(t1);
    var t2 = new Ticket.Ticket(2);
    arr.push(t2);
    var t3 = new Ticket.Ticket(3);
    arr.push(t3);
    var t4 = new Ticket.Ticket(4);
    arr.push(t4);
    var t5 = new Ticket.Ticket(5);
    arr.push(t5);

    expect(Finder.findTicket(arr, 20)).toEqual(-1);
  });

  it("Returns order give array of orders and oid", function() {
    var arr = [];
    var t1 = new Order.Order(1);
    arr.push(t1);
    var t2 = new Order.Order(2);
    arr.push(t2);
    var t3 = new Order.Order(3);
    arr.push(t3);
    var t4 = new Order.Order(4);
    arr.push(t4);
    var t5 = new Order.Order(5);
    arr.push(t5);

    expect(Finder.findOrder(arr, 3)).toEqual(t3);
  });

  it("Returns -1 if given array does not contain order", function() {
    var arr = [];
    var t1 = new Order.Order(1);
    arr.push(t1);
    var t2 = new Order.Order(2);
    arr.push(t2);
    var t3 = new Order.Order(3);
    arr.push(t3);
    var t4 = new Order.Order(4);
    arr.push(t4);
    var t5 = new Order.Order(5);
    arr.push(t5);

    expect(Finder.findOrder(arr, 10)).toEqual(-1);
  });

  it("Returns Donee given did and array of Donees", function() {
    var arr = [];
    var t1 = new Donee.Donee(1);
    arr.push(t1);
    var t2 = new Donee.Donee(2);
    arr.push(t2);
    var t3 = new Donee.Donee(3);
    arr.push(t3);
    var t4 = new Donee.Donee(4);
    arr.push(t4);
    var t5 = new Donee.Donee(5);
    arr.push(t5);

    expect(Finder.findDonee(arr, 5)).toEqual(t5);
  });

  it("Returns -1 if given did is not in array of Donees", function() {
    var arr = [];
    var t1 = new Donee.Donee(1);
    arr.push(t1);
    var t2 = new Donee.Donee(2);
    arr.push(t2);
    var t3 = new Donee.Donee(3);
    arr.push(t3);
    var t4 = new Donee.Donee(4);
    arr.push(t4);
    var t5 = new Donee.Donee(5);
    arr.push(t5);

    expect(Finder.findDonee(arr, 10)).toEqual(-1);
  });

  it("Returns index of show given array and wid", function() {
    var arr = [];
    var t1 = new Show.Show(1);
    arr.push(t1);
    var t2 = new Show.Show(2);
    arr.push(t2);
    var t3 = new Show.Show(3);
    arr.push(t3);
    var t4 = new Show.Show(4);
    arr.push(t4);
    var t5 = new Show.Show(5);
    arr.push(t5);

    expect(Finder.showIndex(arr, 2)).toEqual(1);
  });

  it("Returns -1 if given wid not in array of show", function() {
    var arr = [];
    var t1 = new Show.Show(1);
    arr.push(t1);
    var t2 = new Show.Show(2);
    arr.push(t2);
    var t3 = new Show.Show(3);
    arr.push(t3);
    var t4 = new Show.Show(4);
    arr.push(t4);
    var t5 = new Show.Show(5);
    arr.push(t5);

    expect(Finder.showIndex(arr, 10)).toEqual(-1);
  });

  it("Finds tickets for show for donations", function() {
    var arr = [];
    var t1 = new Ticket.Ticket(1, 100, 5);
    arr.push(t1);
    var t2 = new Ticket.Ticket(2, 100, 2);
    arr.push(t2);
    var t3 = new Ticket.Ticket(3, 100, 5);
    arr.push(t3);
    var t4 = new Ticket.Ticket(4, 100, 3);
    arr.push(t4);
    var t5 = new Ticket.Ticket(5, 100, 2);
    arr.push(t5);

    var foundTickets = [];
    foundTickets.push(t2);
    foundTickets.push(t5);

    var obj = {
      tickets: foundTickets,
      donatedTickets: arr
    };

    expect(Finder.findTicketForShow(arr, 2, 2)).toEqual(obj);
  });
})
