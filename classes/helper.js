var fs = require('fs');

var Theater = require("./Theater");
var Show = require("./Show");
var Row = require("./Row");
var Seat = require("./Seat");
var Section = require("./Section");
var Order = require("./Order");
var Finder = require("./Finder");

var DonatedTicketsReporter = require("./DonatedTicketsReporter");
var OccupancyReporter = require("./OccupancyReporter");
var TicketRevenueReporter = require("./TicketRevenueReporter");

function initializeTheater() {
  var obj = JSON.parse(fs.readFileSync('project-test-theatre-seating.json', 'utf8'));
  var th = new Theater.Theater("Thalia");
  var sectionId = 123;
  var cid = 201;
  for (var i = 0; i < obj.length; i++) {
    var section = new Section.Section(obj[i].section_name, sectionId);
    for (var j = 0; j < obj[i].seating.length; j++) {
      var row = new Row.Row(obj[i].seating[j].row);
      for (var k = 0; k < obj[i].seating[j].seats.length; k++) {
        var seat = new Seat.Seat(obj[i].seating[j].seats[k], cid);
        cid++;
        row.addSeat(seat);
      }
      section.addRow(row);
    }
    sectionId++;
    th.addSection(section);
  }
  return th;
}

function showSections(sections, th) {
  for (var i = 0; i < sections.length; i++) {
    var currentSid = parseInt(sections[i].sid);
    var price = sections[i].price;
    for (var j = 0; j < th.sections.length; j++) {
      if (currentSid === th.sections[j].sid) {
        //console.log("FOUND AN OPEN ONE " + currentSid);
        th.sections[j].open = true;
        th.sections[j].price = price;
      }
    }
  }
  //console.log(th.sections[0].sid);
  return th;
}

function isEmptyObject(obj) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}

function showSeatSections(show, section, count, startSeat) {
  var currentSection = show.theater.getShowSectionID(section);
  if (currentSection !== -1) {
    // Section is open for specific show
    // Time to check if specific startSeat is valid
    var currentRow = currentSection.getCidRow(startSeat);
    if (currentRow !== -1) {
      // startSeat is valid
      // Time to search for the contiguous getseats
      var seats = currentRow.findContigSeats(startSeat, count);

      if (seats.length === 0) {
        seats = currentSection.findSeatsExcludingRow(currentRow.rowNum, count);
        if (seats.seats.length === 0) {
          var obj = {
            wid: show.wid.toString(),
            show_info: show.show_info,
            sid: currentSection.sid.toString(),
            section_name: currentSection.name,
            starting_seat_id: startSeat.toString(),
            status: "Error: " + count + " contiguous seats not available",
            total_amount: 0,
            seating: []
          }
          return obj;
        } else {
          var obj = {
            wid: show.wid.toString(),
            show_info: show.show_info,
            sid: currentSection.sid.toString(),
            section_name: currentSection.name,
            starting_seat_id: startSeat.toString(),
            status: "ok",
            total_amount: currentSection.price * seats.seats[0].seats.length,
            seating: seats.seats
          }
          //console.log(JSON.stringify(obj, null, "\t"));
          return obj;
        }
      } else {
        var obj = {
          wid: show.wid.toString(),
          show_info: show.show_info,
          sid: currentSection.sid.toString(),
          section_name: currentSection.name,
          starting_seat_id: startSeat.toString(),
          status: "ok",
          total_amount: currentSection.price * seats.seats.length,
          seating: [seats]
        }
        return obj;
      }
    }
  }
  return [];
}

function getSeats(data, show, th) {
  var orderShow = show;
  var wid = data.wid;
  var sid = data.sid;
  var seats = data.seats;
  var patron_info = data.patron_info;
  return orderShow.theater.areSeatsAvailable(seats, sid);
}

function getOrders(orders) {
  var arr = [];
  for (var i = 0; i < orders.length; i++) {
    arr.push(orders[i].getGetOrdersResponse());
  }
  return arr;
}

function getRangeOrders(orders, start_date, end_date) {
  var start_year = start_date.slice(0, 4);
  var start_month = parseInt(start_date.slice(4, 6)) - 1;
  var start_day = start_date.slice(6, start_date.length);
  var end_year = end_date.slice(0, 4);
  var end_month = parseInt(end_date.slice(4, 6)) - 1;
  var end_day = end_date.slice(6, end_date.length);

  var start = new Date(start_year, start_month, start_day);
  var end = new Date(end_year, end_month, end_day);

  var validOrders = [];
  for (var i = 0; i < orders.length; i++) {
    var orderDate = orders[i].getDate();
    if (orderDate >= start && orderDate <= end) {
      validOrders.push(orders[i].getGetOrdersResponse());
    }
  }
  //console.log(validOrders);
  return validOrders;
}

function updateDonees(donees, donatedTickets) {
  tids = [];
  var newDonatedList = null;
  for (var i = 0; i < donees.length; i++) {
    var wid = donees[i].wid;
    var response = Finder.findTicketForShow(donatedTickets, wid, donees[i].count);
    newDonatedList = response.donatedTickets;
    for (var j = 0; j < response.tickets.length; j++) {
      donees[i].tickets.push(response.tickets[j]);
      tids.push(response.tickets[j].tid);
      donees[i].received = true;
    }
  }
  return {
    donees: donees,
    donatedTickets: donatedTickets,
    tids: tids,
  };
}
//
// function showsDonated(donatedTickets) {
//   var shows = [];
//   for (var i = 0; i < donatedTickets.length; i++) {
//     if (shows.indexOf(donatedTickets[i].wid) === -1) {
//       shows.push(donatedTickets[i].wid);
//     } else {
//       continue;
//     }
//   }
//   return shows;
// }

module.exports = {
  initialize: initializeTheater,
  isEmptyObject: isEmptyObject,
  showSeatSections: showSeatSections,
  getOrders: getOrders,
  getRangeOrders: getRangeOrders,
  updateDonees: updateDonees,
  showSections: showSections,
  getSeats: getSeats,
}
