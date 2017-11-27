var Seat = require("./../classes/Seat");

describe("Seat", function() {
  it("Gets Correct Status Boolean", function() {
    var correctCid = 200;
    var correctSeat = 1;
    var correctStatus = false;
    var s = new Seat.Seat(correctSeat, correctCid);
    expect(s.getStatus()).toEqual(correctStatus);
  });

  it("Correct Seat Output", function() {
    var correctCid = 200;
    var correctSeat = 1;
    var correctStatus = "available";
    var s = new Seat.Seat(correctSeat, correctCid);
    var correctObj = {
      cid: correctCid.toString(),
      seat: correctSeat.toString(),
      status: correctStatus
    };
    expect(s.getShowSeatOutput()).toEqual(correctObj);
  });

  it("Correctly Sets Seat Status", function() {
    var correctCid = 200;
    var correctSeat = 1;
    var correctStatus = "sold";
    var s = new Seat.Seat(correctSeat, correctCid);
    s.setSeatStatus(true);
    var correctObj = {
      cid: correctCid.toString(),
      seat: correctSeat.toString(),
      status: correctStatus
    };
    expect(s.getShowSeatOutput()).toEqual(correctObj);
  });
});
