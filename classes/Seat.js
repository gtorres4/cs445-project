function Seat(num, cid) {
  this.num = num;
  this.cid = cid;
  this.status = false;
}

Seat.prototype.getStatus = function() {
  return this.status;
}

Seat.prototype.setSeatStatus = function(stat) {
  this.status = stat;
}

Seat.prototype.getShowSeatOutput = function() {
  var available = "";
  if(this.status) {
    available = "sold";
  } else {
    available = "available";
  }
  var obj = {
    cid: this.cid.toString(),
    seat: this.num.toString(),
    status: available
  };
  return obj;
}

module.exports = {
  Seat: Seat
};
