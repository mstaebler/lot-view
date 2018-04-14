// Removed arrow functions and template literals for IE10 support

// zoneArr[first stall, last stall, zoneName]
function colorZone(zoneArr, x, div) {
  //test to see if the zone is odd or even and if that matches the current stall skip if not.
  if (zoneArr[0] % 2 === x % 2) {
    if (x >= zoneArr[0] && x <= zoneArr[1]) {
      div.className = zoneArr[2] + "-side-border";
      if (x === zoneArr[0])
        div.className =
          zoneArr[2] + "-bottom-border " + zoneArr[2] + "-side-border";
      if (x === zoneArr[1])
        div.className =
          zoneArr[2] + "-top-border " + zoneArr[2] + "-side-border";
    }
  }
}

var zones = [
  [100, 128, "gold"],
  [101, 129, "gold"],
  [206, 228, "pc"],
  [207, 229, "pc"],
  [306, 328, "fivestar"],
  [307, 329, "fivestar"],
  [413, 465, "zoneone"],
  [520, 572, "zonetwo"],
  [531, 563, "zonethree"]
];

function generateRow(begin, end, rowId) {
  var divRow = document.createElement("div");
  divRow.id = String(rowId);
  divRow.classList.add("col-sm");
  document.getElementById("display").appendChild(divRow);
  for (var x = end; x >= begin; x -= 2) {
    var div = document.createElement("div");
    zones.forEach(function(element) {
      colorZone(element, x, div);
    });
    div.style.width = "50px";
    div.style.height = "50px";
    div.style.backgroundColor = "red";
    div.style.color = "white";
    // div.style.border = "1px solid black"
    div.id = String(x);
    div.innerHTML = String(x);

    document.getElementById(String(rowId)).appendChild(div);
  }
}

function generateLot() {
  // row div id out of range of lot stalls
  var count = 9999;
  var lotLayout = [
    [22, 44],
    [1, 41],
    [100, 146],
    [101, 147],
    [200, 246],
    [201, 247],
    [300, 346],
    [301, 347],
    [418, 464],
    [413, 465],
    [520, 572],
    [531, 563]
  ].reverse();
  lotLayout.forEach(function(arr) {
    generateRow(arr[0], arr[1], count--);
  });
}

function styleZone(start, end, color) {
  for (var x = start; x <= end; x += 2) {
    console.log("working");
    document.getElementById(String(x)).style.boxShadow =
      "0px 0px 2px 0px" + String(color);
  }
}

function onClick() {
  generateLot();
  var lotStrings = [],
    lot = [];
  var input = document.getElementById("input").value;

  input = input.split(/\r?\n/);
  input.forEach(function(element) {
    if (element !== "") {
      var c = element.charAt(0);
      var isDigit = c >= "0" && c <= "9";
      if (isDigit || c === "y") {
        lotStrings.push(element);
      }
    }
  });

  lotStrings.forEach(function(string) {
    var tempArr = string.split(" ");
    var tempObj = { stall: 0, carClass: "" };
    var adjustment = 6;

    tempObj["stall"] = tempArr[0];

    // some strings have a hold and some do not. We are looking for the car class

    if (tempArr[tempArr.length - 1] === "/") {
      adjustment--;
    }

    tempObj["carClass"] = tempArr[tempArr.length - adjustment];

    lot.push(tempObj);
  });
  //console.log(lot);
  lot.forEach(function(obj) {
    var stall = document.getElementById(String(obj.stall));
    if (stall) {
      stall.style.backgroundColor = "green";
      stall.innerHTML = String(obj.stall) + "<br />" + String(obj.carClass);
    }
    styleZone(100, 128, "black");
  });
}
