var userdata = data;
var JsNewAttr;
var CurrentRow,TargetId ="";
var Map = {};
function PokeDox_onload(){
  var PuserData=  userdata;
  commonCreation(PuserData)
}
function commonCreation(PuserData){
  var tbl = document.createElement("table");
  var tblBody = document.createElement("tbody");
  for(x in PuserData){
     var row = document.createElement("tr");
     var cell = document.createElement("td");
     cell.setAttribute("id", "row"+x);
     cell.setAttribute("data-toggle","modal");
     cell.setAttribute("data-target","#myModal")
     var cellText = document.createTextNode(PuserData[x].name.english);
     cell.appendChild(cellText);
     row.appendChild(cell);
     tblBody.appendChild(row);
     tbl.appendChild(tblBody);
    }
document.getElementById("jsonview").appendChild(tbl);
}
function PokemonView(event){
  if(TargetId !=""){
  document.getElementById(TargetId).classList.remove("click-spec");
 }
	TargetId = event.target.id;
  document.getElementById(TargetId).className = "click-spec";
  CurrentRow = TargetId.slice(3,4);
  for (y in userdata) {
    Map[userdata[y].name.english] = userdata[y];
}
	if(TargetId){
      document.getElementById("pokemondet").innerHTML = event.target.innerText;
      document.getElementById("pokemonAttack").innerHTML =  Map[event.target.innerText].base.Attack;
      document.getElementById("pokemondefense").innerHTML = Map[event.target.innerText].base.Defense;
      document.getElementById("pokemontype").innerHTML = Map[event.target.innerText].type;
	}
}
document.getElementById("Add").addEventListener("click", function(){
    document.getElementById("listview").style.display ="none";
    document.getElementById("addpokemon").style.display ="block";
    document.getElementById("pokeform").style.display = "block";
    document.getElementById("BtnAdd").style.display="block";
    document.getElementById('addpokemon').reset();
    CurrentRow= "";
});


function AddPokemon(event){
  event.preventDefault();
  console.log(event.target.id);
  if(event.target.id == "addAtt"){
    var AttributeName = document.getElementById("Addname").value;
    var AttrDesc =  document.getElementById("Adddesc").value;
    if(AttributeName!="" && AttrDesc != ""){
    JsNewAttr={};
    JsNewAttr[AttributeName] = AttrDesc;
    document.getElementById("addpokemon").style.display ="block";
    document.getElementById("BtnAdd").style.display="block";
    document.getElementById("pokeform").style.display = "block";
    document.getElementById("attackattr").style.display ="none";
    var label= document.createElement("label");
    label.setAttribute("for", AttributeName);
    label.innerHTML = AttributeName;
    var InputTag = document.createElement("input");
    InputTag.className= "form-control";
    InputTag.setAttribute("value",AttrDesc);
    document.getElementById("newelem").appendChild(label);
    document.getElementById("newelem").appendChild(InputTag);
  }
   else{
       alert("Please Enter all fields")
    }
  }
  else if(event.target.id == "AddPoke"){
    var jsonObj ={};
    var type=[];
    var AttackLevel = document.forms[0].elements["attack_level"].value;
    var DefenseLevel = document.forms[0].elements["defense_level"].value;
    var PokeName = document.forms[0].elements["Formname"].value;
    var PokeType =document.forms[0].elements["poketype"].value;
    if(AttackLevel !="" && DefenseLevel !="" && PokeName !="" && PokeType != ""){
    type.push(PokeType);
    if( (typeof JsNewAttr != "undefined") && !(Object.keys(JsNewAttr).length === 0) && JsNewAttr.constructor === Object){
      jsonObj = JsNewAttr;
    }
    jsonObj.base = {};
    jsonObj["name"] = {};
    jsonObj["base"].Attack = AttackLevel;
    jsonObj["base"].Defense = DefenseLevel;
    jsonObj["name"]["english"] =PokeName;
    jsonObj["type"] = type;
    if(Map[jsonObj["name"]["english"]] && CurrentRow != ""){
         userdata[CurrentRow]["name"]["english"] = PokeName;
         userdata[CurrentRow]["base"].Attack =AttackLevel;
         userdata[CurrentRow]["base"].Defense = DefenseLevel;
}
     else{
          userdata.push(jsonObj);

     }
    document.getElementById("addpokemon").style.display = "none"
    document.getElementById("pokeform").style.display = "none";
    document.getElementById("listview").style.display = "block"
    PokeDox_onload();
  }
}
else{
  alert("Please enter Mandatory fields")
}
}

function AddAttribute(event){
      document.getElementById("addpokemon").style.display ="none";
      document.getElementById("pokeform").style.display = "block";
      document.getElementById("attackattr").style.display ="block";
      document.getElementById("addattr").reset();
}

function FilterTextVlu(searchText){
  var FilterVal;
    FilterVal =userdata.filter(PokeVal => PokeVal["name"].english.includes(searchText))
    return FilterVal;
}
 

function SearchPokemon(event) {
  event.preventDefault();
  var FilterValue;
  var tbl = document.createElement("table");
 var tblBody = document.createElement("tbody");
  var searchText = document.getElementById("search").value;
  FilterValue = FilterTextVlu(searchText);
    if(FilterValue.length == "1"){
     var start = searchText.length;
     var end= FilterValue[0].name.english.length;
     var AppendVal=  FilterValue[0].name.english.slice(start,end);
     document.getElementById("search").value = searchText + applyHighlights(AppendVal);

   }
   $("#jsonview").empty();
   commonCreation(FilterValue);
}

function EditFunction(){
  var Poken = document.getElementById("pokemondet").innerHTML;
  var PokeAtt =  document.getElementById("pokemonAttack").innerHTML;
  var PokeDef =  document.getElementById("pokemondefense").innerHTML;
   var PokeType=  document.getElementById("pokemontype").innerHTML;
   document.getElementById("pokeform").style.display = "block";
   document.getElementById("BtnAdd").style.display="none";
   document.getElementById("addpokemon").style.display = "block"
  document.getElementById("listview").style.display = "none";
  document.getElementById("Formname").value = Poken;
  document.getElementById("poketype").value = PokeType;
  document.getElementById("attack_level").value = PokeAtt;
  document.getElementById("defense_level").value = PokeDef;

}



