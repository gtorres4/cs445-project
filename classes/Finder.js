var Show = require("./Show");
var Row = require("./Row");
var Seat = require("./Seat");
var Section = require("./Section");
var Order = require("./Order");
var Ticket = require("./Ticket");

function findTicket(tickets, tid) {
  for (var i = 0; i < tickets.length; i++) {
    if (tickets[i].tid === tid) {
      return {
        index: i,
        ticket: tickets[i]
      };
    }
  }
  return -1;
}

function findOrder(orders, oid) {
  for (var i = 0; i < orders.length; i++) {
    if (orders[i].oid === oid) {
      return orders[i];
    }
  }
  return -1;
}

function findDonee(donees, did) {
  for (var i = 0; i < donees.length; i++) {
    if (donees[i].did === did) {
      return donees[i];
    }
  }
  return -1;
}

function showIndex(arr, wid) {
  for (var i = 0; i < arr.length; i++) {
    if (parseInt(arr[i].wid) === parseInt(wid)) {
      return i;
    }
  }
  return -1;
}


function findTicketForShow(tickets, wid, count) {
  var currentCount = 0;
  var retTickets = [];
  for (var i = 0; i < tickets.length && currentCount < count; i++) {
    if (tickets[i].wid === wid && tickets[i].donated_and_received === false) {
      tickets[i].donated_and_received = true;
      retTickets.push(tickets[i]);
      currentCount++;
    }
  }
  return {
    tickets: retTickets,
    donatedTickets: tickets
  };
}

module.exports = {
  findTicket: findTicket,
  findOrder: findOrder,
  findDonee: findDonee,
  showIndex: showIndex,
  findTicketForShow: findTicketForShow,
};
