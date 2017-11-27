function Order(oid, wid, show_info, date_ordered, raw_date, order_amount, patron_info, tickets) {
  this.oid = oid;
  this.wid = wid;
  this.show_info = show_info;
  this.date_ordered = date_ordered;
  this.raw_date = raw_date;
  this.order_amount = order_amount;
  this.patron_info = patron_info;
  this.tickets = tickets;
}

Order.prototype.getPostOrderResponse = function() {
  return {
    oid: this.oid.toString(),
    wid: this.wid.toString(),
    show_info: this.show_info,
    date_ordered: this.date_ordered,
    order_amount: this.order_amount,
    tickets: this.getTicketsResponse()
  };
}

Order.prototype.getDate = function() {
  var order_year = this.date_ordered.slice(0, 4);
  var order_month = parseInt(this.date_ordered.slice(5, 7)) - 1;
  var order_day = this.date_ordered.slice(8, 10);
  var d = new Date(order_year, order_month, order_day);
  return d;
}

Order.prototype.getGetOrdersResponse = function() {
  var ccNum = this.patron_info.cc_number;
  var str = "xxxxxxxxxxxx";
  var cc_number = str + ccNum.slice(12, 16);
  var pat_out = {
    name: this.patron_info.name,
    phone: this.patron_info.phone,
    email: this.patron_info.email,
    billing_address: this.patron_info.billing_address,
    cc_number: cc_number,
    cc_expiration_date: this.patron_info.cc_expiration_date
  }
  return {
    oid: this.oid.toString(),
    wid: this.wid.toString(),
    show_info: {
      name: this.show_info.name,
      web: this.show_info.web,
      date: this.show_info.date,
      time: this.show_info.time
    },
    date_ordered: this.date_ordered,
    order_amount: this.order_amount,
    number_of_tickets: this.tickets.length,
    patron_info: pat_out,
  };
}

Order.prototype.hasKey = function(key) {
  var objString = JSON.stringify(this).toLowerCase();
  if(objString.indexOf(key) === -1) {
    return false;
  } else {
    return true;
  }
}

Order.prototype.getOrderSearchResponse = function() {
  return {
    oid: this.oid.toString(),
    wid: this.wid.toString(),
    show_info: {
      name: this.show_info.name,
      web: this.show_info.web,
      date: this.show_info.date,
      time: this.show_info.time
    },
    date_ordered: this.date_ordered,
    order_amount: this.order_amount,
    patron_info: this.getPatronInfo(),
    tickets: this.getTicks(),
  };
}

Order.prototype.getTicks = function() {
  var ticks = [];
  for (var i = 0; i < this.tickets.length; i++) {
    ticks.push(this.tickets[i].getOrderSearchResponse());
  }
  return ticks
}
// "patron_info": {
//     		"name": "John Doe",
//     		"phone": "123-456-7890",
//     		"email": "john.doe@example.com",
//     		"billing_address": "123 Main ST, Anytown, IL 45678",
//     		"cc_number": "xxxxxxxxxxxx7654",
//     		"cc_expiration_date": "12/21"
// }

Order.prototype.getTicketsResponse = function() {
  var ticks = [];
  for (var i = 0; i < this.tickets.length; i++) {
    ticks.push(this.tickets[i].tid.toString());
  }
  return ticks;
}

Order.prototype.getPatronInfo = function() {
  var ccNum = this.patron_info.cc_number;
  var str = "xxxxxxxxxxxx";
  var cc_number = str + ccNum.slice(12, 16);
  return {
    name: this.patron_info.name,
    phone: this.patron_info.phone,
    email: this.patron_info.email,
    billing_address: this.patron_info.billing_address,
    cc_number: cc_number,
    cc_expiration_date: this.patron_info.cc_expiration_date
  };
}

module.exports = {
  Order: Order
}
