function Donee(did, wid, count, patron_info) {
  this.did = did;
  this.wid = wid;
  this.count = count;
  this.received = false;
  this.tickets = [];
  this.patron_info = patron_info;
}

Donee.prototype.getSubUpdate = function() {
  var status = "";
  if(this.received) {
    status = "assigned";
  } else {
    status = "pending";
  }
  var obj = {
    did: this.did.toString(),
    wid: this.wid.toString(),
    count: this.count,
    status: status,
    tickets: this.getTicketTids(),
    patron_info: this.patron_info
  };
  return obj
}

Donee.prototype.getTicketTids = function() {
  var tids = [];
  for(var i = 0; i < this.tickets.length; i++) {
    tids.push(this.tickets[i].tid.toString());
  }
  return tids;
}

Donee.prototype.findDonatedTicket = function(donatedTickets) {
  var tids = [];
  for(var i = 0; i < donatedTickets.length && tids.length < this.count; i++) {
    if(donatedTickets[i].wid === this.wid) {
      tids.push(donatedTickets[i]);
      this.tickets.push(donatedTickets[i]);
      this.received = true;
    }
  }
  return tids;
}

module.exports = {
  Donee: Donee
};
