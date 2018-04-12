function onClick(){
  var lotStrings = [];
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
})
  //console.log(input);
document.getElementById("display").innerHTML = lotStrings;  
}