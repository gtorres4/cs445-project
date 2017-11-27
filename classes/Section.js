function Section(name, id) {
  this.open = false;
  this.price = null;
  this.name = name;
  this.sid = id;
  this.rows = [];
}

Section.prototype.addRow = function(row) {
  this.rows.push(row);
}

// Section.prototype.getRow = function(row) {
//   return rows[rows.indexOf(row)];
// }

Section.prototype.getCidRow = function(cid) {
  for (var i = 0; i < this.rows.length; i++) {
    if (this.rows[i].getCidIndex(cid) !== -1) {
      return this.rows[i];
    }
  }
  return -1;
}

Section.prototype.getSectionOutput = function() {
  var rows = [];
  for (var i = 0; i < this.rows.length; i++) {
    rows.push(this.rows[i].getRowOutput());
  }
  return {
    sid: this.sid.toString(),
    section_name: this.name,
    seating: rows
  };
}

Section.prototype.getShowSectionOutput = function() {
  var rows = [];
  for (var i = 0; i < this.rows.length; i++) {
    rows.push(this.rows[i].getShowRowOutput());
  }
  return {
    sid: this.sid.toString(),
    section_name: this.name,
    price: this.price.toString(),
    seating: rows
  };
}

Section.prototype.getOccupancyReport = function() {
  var available = 0;
  var sold = 0;
  for (var i = 0; i < this.rows.length; i++) {
    var rowReport = this.rows[i].getOccupancyReport();
    available = available + rowReport.available;
    sold = sold + rowReport.sold;
  }
  var obj = {
    available: available,
    sold: sold,
    section_price: this.price,
    sid: this.sid,
    section_name: this.name,
    section_revenue: this.price * sold
  };
  return obj;
}

Section.prototype.findAnyContigSeats = function(count) {
  var contigSeats = [];
  for (var i = 0; i < this.rows.length; i++) {
    contigSeats = this.rows[i].findAnyContigSeats(count);
    if (contigSeats.length === count) {
      var rowObj = {
        row: this.rows[i].rowNum,
        seats: contigSeats
      };
      return {
        section_name: this.name,
        starting_seat_id: contigSeats[0].cid,
        seats: [rowObj],
        price: this.price
      };
    }
  }
  return {
    section_name: this.name,
    starting_seat_id: this.rows[0].seats[0].getShowSeatOutput().cid.toString(),
    seats: [],
    price: this.price
  };
}

Section.prototype.getSeat = function(cid) {
  for (var i = 0; i < this.rows.length; i++) {
    if (this.rows[i].getSeat(cid) !== -1) {
      return this.rows[i].getSeat(cid);
    }
  }
  return -1;
}

Section.prototype.findSeatsExcludingRow = function(row, count) {
  var contigSeats = [];
  for (var i = 0; i < this.rows.length; i++) {
    if (this.rows[i].rowNum === row) {
      continue;
    } else {
      contigSeats = this.rows[i].findAnyContigSeats(count);
      if (contigSeats.length === count) {
        var rowObj = {
          row: this.rows[i].rowNum,
          seats: contigSeats
        };
        return {
          seats: [rowObj]
        };
      }
    }
  }
  return {
    seats: []
  };
}

module.exports = {
  Section: Section
};
