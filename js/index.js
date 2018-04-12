function generateRow(begin, end, rowId){
  let divRow = document.createElement("div");
  divRow.id = `${rowId}`;
  divRow.classList.add("col-sm")
  document.getElementById("display").appendChild(divRow);
  for(let x = end; x >= begin; x -= 2){
    let div = document.createElement("div");
    div.style.width = "50px";
    div.style.height = "50px";
    div.style.background = "red";
    div.style.color = "white";
    div.style.border = "1px solid black"
    div.id = `${x}`;
    div.innerHTML = `${x}`;

  document.getElementById(`${rowId}`).appendChild(div);
  }
}

function generateLot(){
  let count = 9999;
  const lotLayout = [[22,44],[1, 41],[100, 146],[101,147], [200,246], [201,247], [300,346], [301,347], [418, 464], [417,465], [518,564], [517,565]].reverse();
  lotLayout.forEach((arr)=>{
    generateRow(arr[0], arr[1], count--)
  });
}

function onClick(){
  generateLot();
  var lotStrings = [], lot = [];
  var input = document.getElementById("input").value;

input = input.split(/\r?\n/);
input.forEach(function(element){
  if(element !== ""){
  var c = element.charAt(0);
  var isDigit = (c >= '0' && c <= '9');
    if(isDigit){
      lotStrings.push(element);
    }
  }
});

lotStrings.forEach((string)=>{
  let tempArr = string.split(" ");
  let tempObj = {stall:0, carClass:""};
  let adjustment = 6;

  tempObj['stall'] = tempArr[0];

  // some strings have a hold and some do not. We are looking for the car class
  
  if(tempArr[tempArr.length-1] === '/'){
    adjustment--;
  }

  tempObj['carClass'] = tempArr[tempArr.length-adjustment];

  lot.push(tempObj);
});
  
  lot.forEach((obj)=>{
    let stall = document.getElementById(`${obj.stall}`);
    stall.style.background = "green";
    stall.innerHTML = `${obj.stall} <br /> ${obj.carClass}`;

  });
  //console.log(lot);  
}