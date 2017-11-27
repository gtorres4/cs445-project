function Show(id, show_info, seating_info, th) {
  // this.name = name;
  // this.web = web;
  // this.date = date;
  // this.time = time;
  this.seating_info = seating_info;
  this.show_info = show_info;
  this.wid = id;
  this.theater = th;
}

Show.prototype.updateTheater = function(data) {
  if (data !== undefined) {
    for (var i = 0; i < data.seats.length; i++) {
      if (this.theater.getSeat(parseInt(data.seats[i].cid)) !== -1) {
        this.theater.getSeat(parseInt(data.seats[i].cid)).setSeatStatus(true);
      }
    }
  } else {
    return;
  }
}

Show.prototype.orderUpdateTheater = function(order) {
  var tickets = order.tickets;
  var seats = [];
  for (var i = 0; i < tickets.length; i++) {
    this.theater.getSeat(parseInt(tickets[i].seating.seats.cid)).setSeatStatus(true);
  }
  //console.log(seats);
}

Show.prototype.getShow = function() {
  var show = {
    wid: this.wid.toString(),
    show_info: this.getShowInfo(),
    // seating_info: this.seating_info,
  };
  return show;
};

Show.prototype.findSeats = function(sid, count) {
  var sectionResponse = this.theater.findAnyContigSeats(sid, count);
  var seats = sectionResponse.seats;
  if (seats.length === 0) {
    var obj = {
      wid: this.wid.toString(),
      show_info: this.show_info,
      sid: sid.toString(),
      section_name: sectionResponse.section_name,
      starting_seat_id: sectionResponse.starting_seat_id,
      status: "Error: " + count + " contiguous seats not available",
      seating: seats
    };
    return obj;
  } else {
    var obj = {
      wid: this.wid.toString(),
      show_info: this.show_info,
      sid: sid.toString(),
      section_name: sectionResponse.section_name,
      starting_seat_id: sectionResponse.starting_seat_id,
      status: "ok",
      total_amount: sectionResponse.price * seats[0].seats.length,
      seating: seats
    };
    return obj;
  }
}

Show.prototype.getShowInfo = function() {
  return {
    name: this.show_info.name,
    web: this.show_info.web,
    date: this.show_info.date,
    time: this.show_info.time
  };
}

Show.prototype.hasKey = function(key) {
  key = key.toLowerCase();
  var objString = JSON.stringify(this).toLowerCase();
  if (objString.indexOf(key) === -1) {
    return false;
  } else {
    return true;
  }
}

Show.prototype.getShows = function() {
  var show = {
    wid: this.wid.toString(),
    show_info: this.getShowInfo()
  };
  return show;
}

Show.prototype.getSeats = function(data, show, th) {
  var orderShow = show;
  var wid = data.wid;
  var sid = data.sid;
  var seats = data.seats;
  var patron_info = data.patron_info;
  return orderShow.theater.areSeatsAvailable(seats, sid);
}

module.exports = {
  Show: Show
};
