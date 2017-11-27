function getTheaterOccupancyReport(shows) {
  var showReports = [];
  var totalShows = shows.length;
  var totalAvailable = 0;
  var totalSold = 0;
  for (var i = 0; i < shows.length; i++) {
    var show = shows[i].theater.getOccupancyReport();
    totalAvailable = totalAvailable + show.seats_available;
    totalSold = totalSold + show.seats_sold;
    showReports.push({
      wid: shows[i].wid,
      show_info: shows[i].show_info,
      seats_available: show.seats_available,
      seats_sold: show.seats_sold,
      percentage: show.seats_sold / show.seats_available
    });
  }
  var obj = {
    mrid: 801,
    name: "Occupancy report",
    total_shows: totalShows,
    total_seats: totalAvailable,
    sold_seats: totalSold,
    overall_occupancy: totalSold / totalAvailable,
    shows: showReports
  };
  return obj;
}

function getShowRangeOccupancyReport(shows, start_date, end_date) {
  var in_range_shows = getRangeShows(shows, start_date, end_date);
  var totalShows = in_range_shows.length;
  var totalAvailable = 0;
  var totalSold = 0;
  var showReports = [];
  for (var i = 0; i < in_range_shows.length; i++) {
    var show = in_range_shows[i].theater.getOccupancyReport();
    totalAvailable = totalAvailable + show.seats_available;
    totalSold = totalSold + show.seats_sold;
    showReports.push({
      wid: in_range_shows[i].wid,
      show_info: in_range_shows[i].show_info,
      seats_available: show.seats_available,
      seats_sold: show.seats_sold,
      percentage: show.seats_sold / show.seats_available
    });
  }
  var overall_occupancy = 0;
  // avoids dividing by 0
  if(totalSold === 0 && totalAvailable === 0) {
    overall_occupancy = 0;
  } else {
    overall_occupancy = totalSold / totalAvailable;
  }
  var obj = {
    mrid: 801,
    name: "Occupancy report",
    start_date: start_date,
    end_date: end_date,
    total_shows: totalShows,
    total_seats: totalAvailable,
    sold_seats: totalSold,
    overall_occupancy: overall_occupancy,
    shows: showReports
  };
  return obj;
}

function getShowOccupancyReport(show) {
  var report = show.theater.getOccupancyReport();
  return {
    mrid: 801,
    name: "Occupancy report",
    wid: show.wid,
    seats_available: report.seats_available,
    seats_sold: report.seats_sold,
    percentage: report.seats_sold / report.seats_available
  };
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
  getTheaterOccupancyReport: getTheaterOccupancyReport,
  getShowRangeOccupancyReport: getShowRangeOccupancyReport,
  getShowOccupancyReport: getShowOccupancyReport,
}
