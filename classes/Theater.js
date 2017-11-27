function Theater(name) {
  this.name = name;
  this.sections = [];
}

Theater.prototype.addSection = function(section) {
  this.sections.push(section);
}

Theater.prototype.getOpenSections = function() {
  var seating = [];
  for (var i = 0; i < this.sections.length; i++) {
    if (this.sections[i].open === true) {
      seating.push({
        sid: this.sections[i].sid,
        section_name: this.sections[i].name
      });
    }
  }
  return seating;
}

Theater.prototype.isOpenSection = function(sid) {
  var sections = this.getOpenSections();
  for (var i = 0; i < sections.length; i++) {
    if (sections[i].sid === sid) {
      return true;
    }
  }
  return false;
}

Theater.prototype.areSeatsAvailable = function(seats, sid) {
  if (this.isOpenSection(parseInt(sid))) {
    var currentSection = null;
    for (var i = 0; i < this.sections.length; i++) {
      if (this.sections[i].open === true && this.sections[i].sid === parseInt(sid)) {
        currentSection = this.sections[i];
      }
    }

    var count = seats.length;
    var currentCid = seats[0].cid;
    var currentRow = currentSection.getCidRow(parseInt(currentCid));
    var seats = currentRow.findContigSeats(currentCid, count);
    if (seats === []) {
      return -1;
    } else {

      var order_amount = currentSection.price * seats.length;
      var day = getDate();
      return {
        price: currentSection.price,
        seats: seats,
        order_amount: order_amount,
        date_ordered: day.datetime,
        raw_date: day.raw_date,
        sid: currentSection.sid,
        section_name: currentSection.name,
        seating: {
          row: currentRow.rowNum,
          seats: seats
        }
      };
    }
  } else {
    return -1;
  }
}

Theater.prototype.getShowSections = function() {
  var sections = [];
  for (var i = 0; i < this.sections.length; i++) {
    if (this.sections[i].open === true) {
      sections.push({
        sid: this.sections[i].sid,
        section_name: this.sections[i].name,
        price: this.sections[i].price
      });
    }
  }
  return sections;
}

function getDate() {
  var currentdate = new Date();
  var datetime = currentdate.getFullYear() + "-" +
    (currentdate.getMonth() + 1) + "-" +
    currentdate.getDate() + " " +
    currentdate.getHours() + ":" +
    currentdate.getMinutes();
  return {
    datetime: datetime,
    raw_date: currentdate
  };
}
Theater.prototype.getSection = function(id) {
  for (var i = 0; this.sections.length; i++) {
    if (parseInt(this.sections[i].sid) === parseInt(id)) {
      return this.sections[i].getShowSectionOutput();
    }
  }
  return -1;
}

// returning another printable json of sections
Theater.prototype.getSectionOutput = function(id) {
  for (var i = 0; this.sections.length; i++) {
    if (parseInt(this.sections[i].sid) === parseInt(id)) {
      return this.sections[i].getSectionOutput();
    }
  }
  return -1;
}

// returning printable json of sections
Theater.prototype.getSections = function() {
  var seating = [];
  for (var i = 0; i < this.sections.length; i++) {
    seating.push({
      sid: this.sections[i].sid.toString(),
      section_name: this.sections[i].name
    });
  }
  return seating;
}


// Returning a specific section based on section id
Theater.prototype.getShowSectionID = function(id) {
  for (var i = 0; i < this.sections.length; i++) {
    if (this.sections[i].open === true && this.sections[i].sid === id) {
      return this.sections[i];
    }
  }
  return -1;
}

Theater.prototype.getOccupancyReport = function(skipEmptySections) {
  var available = 0;
  var sold = 0;
  var totalRevenue = 0;
  var sectionReports = [];
  for (var i = 0; i < this.sections.length; i++) {
    var sectionReport = this.sections[i].getOccupancyReport();
    if (sectionReport.section_price === null) {
      continue;
    } else {
      available = available + sectionReport.available;
      sold = sold + sectionReport.sold;
      totalRevenue = totalRevenue + sectionReport.section_revenue;
      if (skipEmptySections === true && sectionReport.section_revenue === 0) {
        continue;
      } else {
        sectionReports.push({
          sid: sectionReport.sid,
          section_name: sectionReport.section_name,
          section_price: sectionReport.section_price,
          seats_available: sectionReport.available,
          seats_sold: sectionReport.sold,
          section_revenue: sectionReport.section_revenue
        });
      }
    }
  }
  var percentage = sold / available;
  var obj = {
    seats_available: available,
    seats_sold: sold,
    percentage: percentage,
    sections: sectionReports,
    total_revenue: totalRevenue,
  };
  //console.log(JSON.stringify(sectionReports, null, "\t"));

  return obj;
}

Theater.prototype.findAnyContigSeats = function(sid, count) {
  var currentSection = 0;
  for (var i = 0; i < this.sections.length; i++) {
    if (parseInt(this.sections[i].sid) === parseInt(sid)) {
      return this.sections[i].findAnyContigSeats(count);
    }
  }
}

Theater.prototype.getSeat = function(cid) {
  for (var i = 0; i < this.sections.length; i++) {
    if (this.sections[i].getSeat(cid) !== -1) {
      return this.sections[i].getSeat(cid);
    }
  }
  return -1;
}

module.exports = {
  Theater: Theater
};
