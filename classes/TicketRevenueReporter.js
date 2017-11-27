function getTicketRevenueReport(shows) {
  var showReports = [];
  var totalShows = shows.length;
  var totalAvailable = 0;
  var totalSold = 0;
  var totalRevenue = 0;
  for (var i = 0; i < shows.length; i++) {
    var show = shows[i].theater.getOccupancyReport();
    totalAvailable = totalAvailable + show.seats_available;
    totalSold = totalSold + show.seats_sold;
    totalRevenue += show.total_revenue;
    showReports.push({
      wid: shows[i].wid,
      show_info: shows[i].show_info,
      sections: show.sections
    });
  }
  var obj = {
    mrid: 802,
    name: "Revenue from ticket sales",
    total_shows: totalShows,
    total_seats: totalAvailable,
    sold_seats: totalSold,
    overall_revenue: totalRevenue,
    shows: showReports
  };
  return obj;
}

function getShowTicketRevenueReport(oneShow) {
  var shows = [];
  shows.push(oneShow);
  var showReports = [];
  var totalShows = shows.length;
  var totalAvailable = 0;
  var totalSold = 0;
  var totalRevenue = 0;
  for (var i = 0; i < shows.length; i++) {
    var show = shows[i].theater.getOccupancyReport();
    if (show.total_revenue === 0) {
      continue;
    } else {
      totalAvailable = totalAvailable + show.seats_available;
      totalSold = totalSold + show.seats_sold;
      totalRevenue += show.total_revenue;
      showReports.push({
        wid: shows[i].wid,
        show_info: shows[i].getShowInfo(),
        sections: show.sections
      });
    }
  }
  var mrid = 802;
  var obj = {
    mrid: mrid.toString(),
    name: "Revenue from ticket sales",
    total_shows: totalShows,
    total_seats: totalAvailable,
    sold_seats: totalSold,
    overall_revenue: totalRevenue,
    shows: showReports
  };
  return obj;
}

function getShowRangeTicketRevenueReport(allShows, start_date, end_date) {
  var shows = getRangeShows(allShows, start_date, end_date);
  var showReports = [];
  var totalShows = shows.length;
  var totalAvailable = 0;
  var totalSold = 0;
  var totalRevenue = 0;
  for (var i = 0; i < shows.length; i++) {
    var show = shows[i].theater.getOccupancyReport();
    if (show.total_revenue === 0) {
      continue;
    } else {
      totalAvailable = totalAvailable + show.seats_available;
      totalSold = totalSold + show.seats_sold;
      totalRevenue += show.total_revenue;
      showReports.push({
        wid: shows[i].wid,
        show_info: shows[i].getShowInfo(),
        sections: show.sections
      });
    }
  }
  var obj = {
    mrid: 802,
    name: "Revenue from ticket sales",
    start_date: start_date,
    end_date: end_date,
    total_shows: totalShows,
    total_seats: totalAvailable,
    sold_seats: totalSold,
    overall_revenue: totalRevenue,
    shows: showReports
  };
  return obj;
}


function getRangeShows(shows, start_date, end_date) {
  var start_year = start_date.slice(0, 4);
  var start_month = parseInt(start_date.slice(4, 6)) - 1;
  var start_day = start_date.slice(6, start_date.length);
  var end_year = end_date.slice(0, 4);
  var end_month = parseInt(end_date.slice(4, 6)) - 1;
  var end_day = end_date.slice(6, end_date.length);

  var start = new Date(start_year, start_month, start_day);
  var end = new Date(end_year, end_month, end_day);

  var validShows = [];
  for (var i = 0; i < shows.length; i++) {
    var show = shows[i];
    var show_year = show.show_info.date.slice(0, 4);
    var show_month = parseInt(show.show_info.date.slice(5, 7)) - 1;
    var show_day = show.show_info.date.slice(8, show.show_info.date.length);

    var showDate = new Date(show_year, show_month, show_day);
    if (showDate >= start && showDate <= end) {
      validShows.push(show);
    }
  }

  return validShows;
}

module.exports = {
  getTicketRevenueReport: getTicketRevenueReport,
  getShowTicketRevenueReport: getShowTicketRevenueReport,
  getShowRangeTicketRevenueReport: getShowRangeTicketRevenueReport,
};
