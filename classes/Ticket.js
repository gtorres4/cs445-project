function Ticket(tid, price, wid, show_info, patron_info, sid, section_name, seat) {
  this.tid = tid;
  this.price = price;
  this.wid = wid;
  this.show_info = show_info;
  this.patron_info = patron_info;
  this.sid = sid;
  this.section_name = section_name;
  this.seating  = seat;
  this.used = false;
  this.donated = false;
  this.donated_and_received = false;
}

Ticket.prototype.getTicketSearchResponse = function() {
  return {
    tid: this.tid,
    price: this.price,
    status: this.used,
    wid: this.wid,
    show_info: this.show_info,
    patron_info: this.getPatronInfo(),
    sid: this.sid,
    section_name: this.section_name,
    seating: [{
      row: this.seating.row,
      seats: [{
        cid: this.seating.seats.cid,
        seat: this.seating.seats.num
      }]
    }]
  }
}

Ticket.prototype.getOrderSearchResponse = function() {
  var stat = "";
  if(this.used) {
    stat = "used";
  } else if(this.donated) {
    stat = "donated";
  } else {
    stat = "open";
  }
  return {
    tid: this.tid.toString(),
    status: stat
  };
}

Ticket.prototype.getPatronInfo = function() {
  var ccNum = this.patron_info.cc_number;
  var str = "xxxxxxxxxxxx";
  var cc_number = str + ccNum.slice(12,16);
  return {
     name: this.patron_info.name,
     phone: this.patron_info.phone,
     email: this.patron_info.email,
     cc_number: cc_number,
     cc_expiration_date: this.patron_info.cc_expiration_date
  };
}

module.exports = {
  Ticket: Ticket
};
