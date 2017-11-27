var OccupancyReporter = require("./../classes/OccupancyReporter");

function getDonatedTicketsReport(shows, donatedTickets) {
  //var showsDonatedTo = showsDonated(donatedTickets);
  var showDonationReports = [];
  var total_shows = shows.length;
  //console.log(total_shows);
  var total_seats = 0;
  var sold_seats = 0;
  var donated_tickets = donatedTickets.length;
  var donated_and_used_tickets = 0;
  var donated_and_used_value = 0;
  for (var i = 0; i < shows.length; i++) {
    var showReport = OccupancyReporter.getShowOccupancyReport(shows[i]);
    var showSeatsAvailable = showReport.seats_available;
    var showSeatsSold = showReport.seats_sold;
    var wid = shows[i].wid;
    var show_info = shows[i].show_info;

    var show_donated_tickets = 0;
    var show_donated_and_used_tickets = 0;
    var show_donated_and_used_value = 0;

    total_seats += showSeatsAvailable;
    sold_seats += showSeatsSold;

    for (var j = 0; j < donatedTickets.length; j++) {
      if (parseInt(donatedTickets[j].wid) === parseInt(shows[i].wid)) {
        show_donated_tickets++;
        if (donatedTickets[j].donated && donatedTickets[j].used) {
          donated_and_used_tickets++;
          donated_and_used_value += donatedTickets[j].price;

          show_donated_and_used_tickets++;
          show_donated_and_used_value += donatedTickets[j].price;
        } else {
          show_donated_and_used_tickets++;
          show_donated_and_used_value += donatedTickets[j].price;
        }
      }
    }
    var obj = {
      wid: wid,
      show_info: show_info,
      seats_available: showSeatsAvailable,
      seats_sold: showSeatsSold,
      donated_tickets: show_donated_tickets,
      donated_and_used_tickets: show_donated_and_used_tickets,
      donated_and_used_value: show_donated_and_used_value
    }
    showDonationReports.push(obj);
  }

  var obj = {
    mrid: 803,
    name: "Donated tickets report",
    total_shows: total_shows,
    total_seats: total_seats,
    sold_seats: sold_seats,
    donated_tickets: donated_tickets,
    donated_and_used_tickets: donated_and_used_tickets,
    donated_and_used_value: donated_and_used_value,
    shows: showDonationReports
  }
  return obj;
}

function getShowRangeDonatedTicketReport(allShows, start_date, end_date, allDonatedTickets) {
  var shows = getRangeShows(allShows, start_date, end_date);
  var donatedTickets = getRangeDonatedTickets(allDonatedTickets, start_date, end_date);
  var showDonationReports = [];
  var total_shows = shows.length;
  var total_seats = 0;
  var sold_seats = 0;
  var donated_tickets = donatedTickets.length;
  var donated_and_used_tickets = 0;
  var donated_and_used_value = 0;
  for (var i = 0; i < shows.length; i++) {
    var showReport = getShowOccupancyReport(shows[i]);
    var showSeatsAvailable = showReport.seats_available;
    var showSeatsSold = showReport.seats_sold;
    var wid = shows[i].wid;
    var show_info = shows[i].show_info;

    var show_donated_tickets = 0;
    var show_donated_and_used_tickets = 0;
    var show_donated_and_used_value = 0;

    total_seats += showSeatsAvailable;
    sold_seats += showSeatsSold;

    for (var j = 0; j < donatedTickets.length; j++) {
      if (parseInt(donatedTickets[j].wid) === parseInt(shows[i].wid)) {
        show_donated_tickets++;
        if (donatedTickets[j].donated && donatedTickets[j].used) {
          donated_and_used_tickets++;
          donated_and_used_value += donatedTickets[j].price;

          show_donated_and_used_tickets++;
          show_donated_and_used_value += donateTickets[j].price;
        }
      }
    }
    var obj = {
      wid: wid,
      show_info: show_info,
      seats_available: showSeatsAvailable,
      seats_sold: showSeatsSold,
      donated_tickets: show_donated_tickets,
      donated_and_used_tickets: show_donated_and_used_tickets,
      donated_and_used_value: show_donated_and_used_value
    }
    showDonationReports.push(obj);
  }

  var obj = {
    mrid: 803,
    name: "Donated tickets report",
    start_date: start_date,
    end_date: end_date,
    total_shows: total_shows,
    total_seats: total_seats,
    sold_seats: sold_seats,
    donated_tickets: donated_tickets,
    donated_and_used_tickets: donated_and_used_tickets,
    donated_and_used_value: donated_and_used_value,
    shows: showDonationReports
  }
  return obj;
}


function getRangeDonatedTickets(donatedTickets, start_date, end_date) {
  var start_year = start_date.slice(0, 4);
  var start_month = parseInt(start_date.slice(4, 6)) - 1;
  var start_day = start_date.slice(6, start_date.length);
  var end_year = end_date.slice(0, 4);
  var end_month = parseInt(end_date.slice(4, 6)) - 1;
  var end_day = end_date.slice(6, end_date.length);

  var start = new Date(start_year, start_month, start_day);
  var end = new Date(end_year, end_month, end_day);

  var validTickets = [];
  for (var i = 0; i < donatedTickets.length; i++) {
    var show_info = donatedTickets[i].show_info;
    var show_year = show_info.date.slice(0, 4);
    var show_month = parseInt(show_info.date.slice(5, 7)) - 1;
    var show_day = show_info.date.slice(8, show_info.date.length);

    var ticketDate = new Date(show_year, show_month, show_day);
    if (ticketDate >= start && ticketDate <= end) {
      validTickets.push(donatedTickets[i]);
    }
  }

  return validTickets;
}

module.exports = {
  getDonatedTicketsReport: getDonatedTicketsReport,
  getShowRangeDonatedTicketReport: getShowRangeDonatedTicketReport,
};
