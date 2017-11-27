var Seat = require("./../classes/Seat");
var Row = require("./../classes/Row");

describe("Row", function() {
  it("Adds Seats", function() {
    var correctSeats = [];
    var s = new Seat.Seat(1, 200);
    correctSeats.push(s);
    var r = new Row.Row(1);
    r.addSeat(s);
    expect(r.seats).toEqual(correctSeats);
  });

  it("Produces Correct Occupancy Report", function() {
    var correctObj = {
      available: 4,
      sold: 3
    };

    var seats = [];
    var s1 = new Seat.Seat(1, 200);
    s1.status = true;
    var s2 = new Seat.Seat(2, 201);
    s2.status = true;
    var s3 = new Seat.Seat(3, 202);
    s3.status = true;
    var s4 = new Seat.Seat(4, 203);
    seats.push(s1);
    seats.push(s2);
    seats.push(s3);
    seats.push(s4);

    var r = new Row.Row(1);
    seats.forEach(function(seat) {
      r.addSeat(seat);
    });

    expect(r.getOccupancyReport()).toEqual(correctObj);
  });

  it("Gets Correct Cid index from array of seats", function() {
    var correctIndex = 2;
    var seats = [];
    var s1 = new Seat.Seat(1, 200);
    s1.status = true;
    var s2 = new Seat.Seat(2, 201);
    s2.status = true;
    var s3 = new Seat.Seat(3, 202);
    s3.status = true;
    var s4 = new Seat.Seat(4, 203);
    seats.push(s1);
    seats.push(s2);
    seats.push(s3);
    seats.push(s4);

    var r = new Row.Row(1);
    seats.forEach(function(seat) {
      r.addSeat(seat);
    });

    expect(r.getCidIndex(202)).toEqual(correctIndex);
  });

  it("Returns correct seats given cid", function() {
    var seats = [];
    var s1 = new Seat.Seat(1, 200);
    s1.status = true;
    var s2 = new Seat.Seat(2, 201);
    s2.status = true;
    var s3 = new Seat.Seat(3, 202);
    s3.status = true;
    var s4 = new Seat.Seat(4, 203);
    seats.push(s1);
    seats.push(s2);
    seats.push(s3);
    seats.push(s4);

    var r = new Row.Row(1);
    seats.forEach(function(seat) {
      r.addSeat(seat);
    });

    expect(r.getSeat(s2.cid)).toEqual(s2);
  });

  it("Gets correct array of seats numbers", function() {
    var seats = [];
    var s1 = new Seat.Seat(1, 200);
    s1.status = true;
    var s2 = new Seat.Seat(2, 201);
    s2.status = true;
    var s3 = new Seat.Seat(3, 202);
    s3.status = true;
    var s4 = new Seat.Seat(4, 203);
    seats.push(s1);
    seats.push(s2);
    seats.push(s3);
    seats.push(s4);

    var seatNums = [];
    seats.forEach(function(seat) {
      seatNums.push(seat.num.toString());
    });

    var r = new Row.Row(1);
    seats.forEach(function(seat) {
      r.addSeat(seat);
    });

    expect(r.getSeatNumbers()).toEqual(seatNums);
  });

  it("Finds any valid contiguous seats", function() {
    var seats = [];
    var s1 = new Seat.Seat(1, 200);
    var s2 = new Seat.Seat(2, 201);
    var s3 = new Seat.Seat(3, 202);
    var s4 = new Seat.Seat(4, 203);
    seats.push(s1);
    seats.push(s2);
    seats.push(s3);
    seats.push(s4);

    var correctSeats = [];
    correctSeats.push(s1.getShowSeatOutput());
    correctSeats.push(s2.getShowSeatOutput());
    correctSeats.push(s3.getShowSeatOutput());


    var r = new Row.Row(1);
    seats.forEach(function(seat) {
      r.addSeat(seat);
    });

    expect(r.findAnyContigSeats(3)).toEqual(correctSeats);
  });

  it("Produces correct row output", function() {
    var seats = [];
    var s1 = new Seat.Seat(1, 200);
    s1.status = true;
    var s2 = new Seat.Seat(2, 201);
    s2.status = true;
    var s3 = new Seat.Seat(3, 202);
    s3.status = true;
    var s4 = new Seat.Seat(4, 203);
    seats.push(s1);
    seats.push(s2);
    seats.push(s3);
    seats.push(s4);

    var seatNums = [];
    seats.forEach(function(seat) {
      seatNums.push(seat.num.toString());
    });

    var r = new Row.Row(1);
    seats.forEach(function(seat) {
      r.addSeat(seat);
    });

    var correctObj = {
      row: r.rowNum.toString(),
      seats: seatNums
    };

    expect(r.getRowOutput()).toEqual(correctObj);
  });

  it("Produces correct output for array of seats", function() {
    var seats = [];
    var s1 = new Seat.Seat(1, 200);
    s1.status = true;
    var s2 = new Seat.Seat(2, 201);
    s2.status = true;
    var s3 = new Seat.Seat(3, 202);
    s3.status = true;
    var s4 = new Seat.Seat(4, 203);
    seats.push(s1);
    seats.push(s2);
    seats.push(s3);
    seats.push(s4);

    var seatOutput = [];
    seats.forEach(function(seat) {
      seatOutput.push(seat.getShowSeatOutput());
    });

    var r = new Row.Row(1);
    seats.forEach(function(seat) {
      r.addSeat(seat);
    });

    expect(r.getShowSeatNumbers()).toEqual(seatOutput);
  });

});
