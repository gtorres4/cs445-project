var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// Getting needed class files
var Theater = require("./classes/Theater");
var Show = require("./classes/Show");
var Row = require("./classes/Row");
var Seat = require("./classes/Seat");
var Order = require("./classes/Order");
var Ticket = require("./classes/Ticket");
var Donee = require("./classes/Donee");
var helper = require("./classes/helper");
var OccupancyReporter = require("./classes/OccupancyReporter");
var DonatedTicketsReporter = require("./classes/DonatedTicketsReporter");
var TicketRevenueReporter = require("./classes/TicketRevenueReporter");
var Finder = require("./classes/Finder");

helper.createShow
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var reports = [{
    mrid: "801",
    name: "Theatre occupancy"
  },
  {
    mrid: "802",
    name: "Revenue from ticket sales"
  },
  {
    mrid: "803",
    name: "Donated tickets report"
  }
];

var shows = [];
var orders = [];
var tickets = [];
var donatedTickets = [];
var donees = [];
var currentWid = 300;
var currentOid = 400;
var currentTicket = 700;
var currentdid = 900;

app.post("/thalia/tickets/donations", function(req, res) {
  var donatedTicks = req.body.tickets;
  for (var i = 0; i < donatedTicks.length; i++) {
    var response = Finder.findTicket(tickets, parseInt(donatedTicks[i]));
    if (response === -1) {
      continue;
    } else {
      tickets.splice(response.index, 1);
      var newDonated = response.ticket;
      newDonated.donated = true;
      donatedTickets.push(newDonated);
    }
  }
  var response = helper.updateDonees(donees, donatedTickets);
  donees = response.donees;
  donatedTickets = response.donatedTickets;
  res.status(201).json({
    message: "SUCCESS"
  });
});

app.post("/thalia/shows/:wid/donations", function(req, res) {
  var wid = parseInt(req.params.wid);
  var ticketCount = parseInt(req.body.count);
  var patron_info = req.body.patron_info;
  var donee = new Donee.Donee(currentdid, wid, ticketCount, patron_info);
  currentdid++;
  donees.push(donee);

  var response = helper.updateDonees(donees, donatedTickets);
  donees = response.donees;
  donatedTickets = response.donatedTickets;
  res.status(201).json({
    did: donee.did.toString()
  });
});

app.get("/thalia/shows/:wid/donations/:did", function(req, res) {
  var wid = parseInt(req.params.wid);
  var did = parseInt(req.params.did);
  var donee = Finder.findDonee(donees, did);
  if (donee === -1) {
    res.status(400).json({
      error: "NOT FOUND"
    });
  } else {
    //console.log(donee.getSubUpdate());
    res.status(200).json(donee.getSubUpdate());
  }
});

app.get("/thalia", function(req, res) {
  res.json(helper.initialize(), null, "\t");
});

app.get("/thalia/seating/:sid", function(req, res) {
  var sid = parseInt(req.params.sid);
  var obj = helper.initialize().getSectionOutput(sid);
  for (var k in obj) {
    if (obj.hasOwnProperty(k)) {
      if (typeof obj[k] === 'number') {
        obj[k] = String(obj[k]);
      }
    }
  }
  res.json(obj);
});

app.get("/thalia/seating", function(req, res) {
  if (helper.isEmptyObject(req.query)) {
    res.json(helper.initialize().getSections());
  } else {
    if (Object.keys(req.query).length === 4) {
      var wid = parseInt(req.query.show);
      var index = Finder.showIndex(shows, wid);

      var show = shows[index];
      var section = parseInt(req.query.section);
      var count = parseInt(req.query.count);
      var startSeat = parseInt(req.query.starting_seat_id);

      var showsResponse = helper.showSeatSections(show, section, count, startSeat);

      //console.log(showsResponse);
      res.status(200).json(showsResponse);
    } else {
      var wid = parseInt(req.query.show);
      var index = Finder.showIndex(shows, wid);

      var show = shows[index];
      var section = parseInt(req.query.section);
      var count = parseInt(req.query.count);

      var showsResponse = show.findSeats(section, count);
      //show.updateTheater(showsResponse.seating[0]);
      // console.log(showsResponse);
      res.status(200).json(showsResponse);
    }
  }
});

app.post("/thalia/shows", function(req, res) {
  var newShow = createShow(req.body, currentWid.toString(), helper.initialize());
  currentWid++;
  shows.push(newShow);
  res.status(201).json({
    wid: newShow.wid
  });
});

app.put("/thalia/shows/:wid", function(req, res) {
  var id = parseInt(req.params.wid);
  var newShow = createShow(req.body, id.toString(), helper.initialize());
  var index = Finder.showIndex(shows, id);
  shows[index] = newShow;
  //console.log(newShow);
  res.status(200).json({
    openSections: newShow.theater.getOpenSections(),
    allSections: newShow.theater.getSections()
  });
});

app.get("/thalia/shows/:wid", function(req, res) {
  var id = parseInt(req.params.wid);
  var index = Finder.showIndex(shows, id);
  res.status(200).json(shows[index].getShow());
});

app.get("/thalia/shows", function(req, res) {
  var showsResponse = [];
  for (var i = 0; i < shows.length; i++) {
    showsResponse.push(shows[i].getShows());
  }
  res.status(200).json(showsResponse);
});

app.get("/thalia/shows/:wid/sections", function(req, res) {
  var id = parseInt(req.params.wid);
  var index = Finder.showIndex(shows, id);
  res.status(200).json(shows[index].theater.getShowSections());
});

app.get("/thalia/shows/:wid/sections/:sid", function(req, res) {
  var id = parseInt(req.params.wid);
  var sid = req.params.sid;
  var index = Finder.showIndex(shows, id);
  var response = shows[index].theater.getSection(sid);
  var obj = {
    wid: id.toString(),
    show_info: shows[index].show_info,
    sid: response.sid,
    section_name: response.section_name,
    price: response.price,
    seating: response.seating
  };
  //console.log(JSON.stringify(obj, null, "\t"));
  res.status(200).json(obj);
});

// /orders?start_date=YYYYMMDD&end_date=YYYYMM
app.get("/thalia/orders", function(req, res) {
  if (helper.isEmptyObject(req.query)) {
    res.status(200).json(helper.getOrders(orders));
  } else {
    var start_date = req.query.start_date;
    var end_date = req.query.end_date;
    //console.log(helper.getRangeOrders(orders, start_date, end_date));
    res.status(200).json(helper.getRangeOrders(orders, start_date, end_date));
  }
});

app.get("/thalia/orders/:oid", function(req, res) {
  var oid = parseInt(req.params.oid);
  var order = Finder.findOrder(orders, oid);
  if (order === -1) {
    res.status(404).json({
      error: "ORDER COULD NOT BE FOUND"
    });
  } else {
    var response = order.getOrderSearchResponse();
    //console.log(JSON.stringify(response, null, "\t"));
    res.status(200).json(response);
  }
});

app.post("/thalia/orders", function(req, res) {
  var wid = parseInt(req.body.wid);
  var index = Finder.showIndex(shows, wid);
  var currentShow = shows[index];
  var seats = helper.getSeats(req.body, currentShow, currentOid, currentTicket, helper.initialize());

  var patron_info = req.body.patron_info;
  var postSeats = req.body.seats;

  // tid, price, wid, show_info, patron_info, sid, section_name, seating
  var orderTickets = [];
  var ticketCount = seats.seats.seats.length;

  for (var i = 0; i < ticketCount; i++) {
    var tid = currentTicket;
    var price = seats.price;
    var show_info = currentShow.show_info;
    var sid = seats.sid;
    var section_name = seats.section_name;
    var row = seats.seating.row;
    var seating = {
      row: row,
      seats: seats.seating.seats.seats[i]
    };

    var ticket = new Ticket.Ticket(tid, price, wid, show_info, patron_info, sid, section_name, seating);
    orderTickets.push(ticket);
    tickets.push(ticket);
    currentTicket++;
  }

  var order_amount = 0;
  for(var i = 0; i < orderTickets.length; i++) {
    order_amount+=orderTickets[i].price;
  }
  var order = createOrder(currentOid,
    wid,
    currentShow.show_info,
    seats.date_ordered,
    seats.raw_date,
    order_amount,
    patron_info,
    orderTickets);
  currentOid++;
  orders.push(order);
  currentShow.orderUpdateTheater(order);
  //console.log(JSON.stringify(order, null, "\t"));
  res.status(201).json(order.getPostOrderResponse());
});

app.get("/thalia/tickets/:tid", function(req, res) {
  var tid = parseInt(req.params.tid);
  var ticket = Finder.findTicket(tickets, tid);
  if (ticket === -1) {
    res.status(404).send("RESOURCE YOU REQUESTED COULD NOT BE FOUND");
  } else {
    res.status(200).send(ticket.getTicketSearchResponse());
  }
});

app.post("/thalia/tickets/:tid", function(req, res) {
  var tid = parseInt(req.params.tid);
  var data = req.body.status;
  var response = -1;
  if (data === "used") {
    response = Finder.findTicket(tickets, tid);
    if (response !== -1) {
      if (tickets[response.index].used) {
        response = -2;
      } else {
        tickets[response.index].used = true;
      }
    } else {
      response = Finder.findTicket(donatedTickets, tid);
      if (response !== -1) {
        if (tickets[response.index].used) {
          response = -2;
        } else {
          donatedTickets[response.index].used = true;
          donatedTickets[response.index].donated_and_received = true;
        }
      }
    }
  }

  if (response === -1) {
    res.status(400).json({
      message: "TICKET NOT FOUND"
    });
  } else {
    res.status(200).json({
      tid: tid,
      status: data
    });
  }
});

app.get("/thalia/reports", function(req, res) {
  res.status(200).json(reports);
});

app.get("/thalia/reports/:mrid", function(req, res) {
  var mrid = parseInt(req.params.mrid);
  //console.log(req.qeury);
  // Checking to see if wid is provided
  if (req.query.show !== undefined && mrid === 801) {
    var wid = parseInt(req.query.show);
    var currentShow = Finder.showIndex(shows, wid);
    res.status(200).json(OccupancyReporter.getShowOccupancyReport(shows[currentShow]));
  } else if ((req.query.start_date !== undefined) && (req.query.end_date !== undefined) && (mrid === 801)) {
    var start_date = req.query.start_date;
    var end_date = req.query.end_date;
    res.status(200).json(OccupancyReporter.getShowRangeOccupancyReport(shows, start_date, end_date));
  } else if (req.query.show !== undefined && mrid === 802) {
    var wid = parseInt(req.query.show);
    var currentShow = Finder.showIndex(shows, wid);
    res.status(200).json(TicketRevenueReporter.getShowTicketRevenueReport(shows[currentShow]));
  } else if ((req.query.start_date !== undefined) && (req.query.end_date !== undefined) && (mrid === 802)) {
    var start_date = req.query.start_date;
    var end_date = req.query.end_date;
    res.status(200).json(TicketRevenueReporter.getShowRangeTicketRevenueReport(shows, start_date, end_date));
  } else if (req.query.show !== undefined && mrid === 803) {
    var wid = parseInt(req.query.show);
    var currentShow = Finder.showIndex(shows, wid);
    var arr = [];
    arr.push(shows[currentShow]);
    res.status(200).json(DonatedTicketsReporter.getDonatedTicketsReport(arr, donatedTickets));
  } else if ((req.query.start_date !== undefined) && (req.query.end_date !== undefined) && (mrid === 803)) {
    var start_date = req.query.start_date;
    var end_date = req.query.end_date;
    res.status(200).json(DonatedTicketsReporter.getShowRangeDonatedTicketReport(shows, start_date, end_date, donatedTickets));
  } else if (mrid === 801) {
    res.json(OccupancyReporter.getTheaterOccupancyReport(shows));
  } else if (mrid === 802) {
    res.status(200).json(TicketRevenueReporter.getTicketRevenueReport(shows));
  } else if (mrid === 803) {
    res.status(200).json(helper.getDonatedTicketsReport(shows, donatedTickets));
  }
});

app.get("/thalia/search", function(req, res) {
  var topic = req.query.topic.toLowerCase();
  var key = req.query.key.toLowerCase();
  if(topic === "show") {
    var searchShows = [];
    for(var i = 0; i < shows.length; i++) {
      if(shows[i].hasKey(key)) {
        searchShows.push(shows[i].getShows());
      }
    }
    res.status(200).json({
      shows: searchShows
    });
  } else {
    var searchOrders = [];
    for(var i = 0; i < orders.length; i++) {
      if(orders[i].hasKey(key)) {
        searchOrders.push(orders[i].getGetOrdersResponse());
      }
    }
    res.status(200).json({
      orders: searchOrders
    });
  }
});

app.get("/:todoId", function(req, res) {
  var id = req.params.todoId;
  res.send("NEED TO GET SOMETHING AT " + id);
});

app.put("/:todoId", function(req, res) {
  var id = req.params.todoId;
  res.send("NEED TO UPDATE SOMETHING AT " + id);
});

app.delete("/:todoId", function(req, req) {
  var id = req.params.todoId;
  res.send("NEED TO DELETE SOMETHING AT " + id);
});

app.listen(8080, function() {
  console.log("App is running on " + 8080);
});

function createShow(data, id) {
  var sections = helper.showSections(data.seating_info, helper.initialize());
  var seating_info = data.seating_info;
  var show_info = data.show_info;
  var name = data.show_info.name;
  var web = data.show_info.web;
  var date = data.show_info.date;
  var time = data.show_info.time;

  var show = new Show.Show(id, show_info, seating_info, sections);
  return show;
}

function createOrder(oid, wid, show_info, date_ordered, raw_date, order_amount, patron_info, tickets) {
  return new Order.Order(oid, wid, show_info, date_ordered, raw_date, order_amount, patron_info, tickets);
}
