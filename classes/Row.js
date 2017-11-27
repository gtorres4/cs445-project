function Row(rowNum) {
  this.rowNum = rowNum;
  this.seats = [];
}

Row.prototype.addSeat = function(seat) {
  this.seats.push(seat);
}

Row.prototype.getOccupancyReport = function() {
  var available = 0;
  var sold = 0;
  for(var i = 0; i < this.seats.length; i++) {
    if(this.seats[i].status) {
      sold++;
    }
    available++;
  }
  return {
    available: available,
    sold: sold
  };
}

Row.prototype.getCidIndex = function(cid) {
  for(var i = 0; i < this.seats.length; i++) {
    if(this.seats[i].cid === cid) {
      return i;
    }
  }
  return -1;
}

Row.prototype.getRowOutput = function() {
  return {
    row: this.rowNum.toString(),
    seats: this.getSeatNumbers()
  };
}

Row.prototype.getShowRowOutput = function() {
  return {
    row: this.rowNum.toString(),
    seats: this.getShowSeatNumbers(),
  }
}

Row.prototype.getShowSeatNumbers = function() {
  var seatOutput = [];
  for(var i = 0; i < this.seats.length; i++) {
    seatOutput.push(this.seats[i].getShowSeatOutput());
  }
  return seatOutput;
}

Row.prototype.findAnyContigSeats = function(count) {
  var openSeats = [];

  for(var i = 0; i < this.seats.length && openSeats.length < count; i++) {
    if(this.seats[i].status) {
      openSeats = [];
    } else {
      openSeats.push(this.seats[i].getShowSeatOutput());
    }
  }

  return openSeats;
}

Row.prototype.getSeatNumbers = function() {
  var numbers = [];
  for(var i = 0; i < this.seats.length; i++) {
    numbers.push(this.seats[i].num.toString());
  }
  return numbers;
}

Row.prototype.findContigSeats = function(startSeat, count) {
  // cannot get seats for count greater than seats in row
  if(count > this.seats.length) {
    console.log("COUNT TOO HIGH");
    return -1;
  }

  // cannot get seats for 0 or negative count
  if(count < 1) {
    console.log("COUNT LESS THAN 1");
    return -1;
  }

  // if seat is not open, return
  var index = this.getCidIndex(parseInt(startSeat));
  //console.log(index);
  if(this.seats[index].getStatus()) {
    console.log("SEATS ARE NOT OPEN");
    return -1;
  }

  //console.log(this.seats.length);
  var contigSeats = [];
  for(var i = 0; i < count && index < this.seats.length; i++) {
    if(this.seats[index].getStatus()) {
      return -1;
    } else {
      contigSeats.push(this.seats[index].getShowSeatOutput());
    }
    index++;
  }

  if(contigSeats.length === count) {
    return {
      row: this.rowNum,
      seats: contigSeats
    };
  } else {
    return [];
  }
}

Row.prototype.getSeat = function(cid) {
  for(var i = 0; i < this.seats.length; i++) {
    if(this.seats[i].cid === cid) {
      return this.seats[i];
    }
  }
  return -1;
}


module.exports = {
  Row: Row
};
