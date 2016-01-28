var storeData = [];
var storeHours = ["5AM", "6AM", "7AM", "8AM", "9AM", "10AM", "11AM", "Noon", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM"];

function Store(storeName, minCust, maxCust, lbsSold) {
  this.storeName = storeName;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.lbsSold = lbsSold;
  this.hourlyCustomers = [];
  this.hourlyLbs = []
  this.lbsReq = 0;
  this.render();
  storeData.push(this);
};
renderFirstRow();

Store.prototype.hourlyLbsGen = function() {
  for (var i = 0; i < storeHours.length; i++) {
    this.hourlyCustomers.push(Math.floor(Math.random() * (this.maxCust - this.minCust) + this.minCust));
    this.hourlyLbs.push((this.hourlyCustomers[i] * this.lbsSold).toFixed(1));
  }
  Store.prototype.totalLbs = function() {
    for (var i = 0; i < this.hourlyLbs.length; i++) {
      this.lbsReq += parseInt(this.hourlyLbs[i]);
    }
  }
}

function renderFirstRow() {
  var table = document.getElementById("tableJS");
  var trEl = document.createElement("tr");
  var thEl = document.createElement("th");
  thEl.textContent = "Store Name:";
  trEl.appendChild(thEl);
  table.appendChild(trEl);
  for (var i = 0; i <= storeHours.length; i++) {
    var thEl = document.createElement("th");
    thEl.textContent = storeHours[i];
    trEl.appendChild(thEl);
  };
  thEl.textContent = "Total Lbs Needed:";
  trEl.appendChild(thEl);
  table.appendChild(trEl);
}
Store.prototype.render = function() {
  this.hourlyLbsGen();
  this.totalLbs();
  getLocally();
  var table = document.getElementById("tableJS");
  var trEl2 = document.createElement("tr");
  trEl2.setAttribute('onclick', "deleteRow(this)");
  var tdEl = document.createElement("td");
  // tdEl.setAttribute("contentEditable", "true");
  tdEl.textContent = this.storeName;
  trEl2.appendChild(tdEl);
  table.appendChild(trEl2);
  for (var i = 0; i <= this.hourlyCustomers.length; i++) {
    var tdEl = document.createElement("td");
    // tdEl.setAttribute("contentEditable", "true");
    tdEl.textContent = this.hourlyLbs[i];
    trEl2.appendChild(tdEl);
  }
  tdEl.textContent = this.lbsReq;
  trEl2.appendChild(tdEl);
  var makeButton = document.createElement("button");
  makeButton.textContent = "DELETE";
  trEl2.appendChild(makeButton);
  table.appendChild(trEl2);
}

function deleteRow(btn) {
  var row = btn;
  document.getElementById("tableJS").deleteRow(row.rowIndex);
  storeLocally();
}
var pikePlace = new Store("Pike Place", 30, 110, 0.75);

function submitData(event) {
  event.preventDefault();
  if (!event.target.newLocationName.value || !event.target.fewestCust.value || !event.target.mostCust.value || !event.target.avgPurch.value) {
    return alert("All fields must be completed.");
  } else {
    var newLocation = event.target.newLocationName.value;
    var minCust = parseInt(event.target.fewestCust.value);
    var maxCust = parseInt(event.target.mostCust.value);
    var avgSales = parseInt(event.target.avgPurch.value);
    var newStore = new Store(newLocation, minCust, maxCust, avgSales);
    storeData.push(newStore);
    storeLocally();
    event.target.newLocationName.value = null;
    event.target.fewestCust.value = null;
    event.target.mostCust.value = null;
    event.target.avgPurch.value = null;
  }
}
document.getElementById("addStore").addEventListener("submit", submitData, false);

function storeLocally(){
  var jsonData = JSON.stringify(storeData);
  localStorage.setItem("lsData", jsonData);
}
function getLocally(){
  var getLocalStorageData = localStorage.getItem(lsData);
  var parseData = JSON.parse(getLocalStorageData);
}
