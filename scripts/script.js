// unity instance

var gameInstance = UnityLoader.instantiate(
  "gameContainer",
  //"https://lppcstorage.blob.core.windows.net/$web/LPPC.json",
  "build/Build_v02-5/Build/LPPC.json",
  { onProgress: UnityProgress }
);

// related to focus of the unity UI
var recaptureInputAndFocus = function () {
  var canvas = document.getElementById("#canvas");
  if (canvas) {
    canvas.setAttribute("tabindex", "1");
    canvas.focus();
  } else setTimeout(recaptureInputAndFocus, 100);
};

recaptureInputAndFocus();  

//****************************************

// collapsible script

/*var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
} */

// tab handling
var myRadios = document.getElementsByName("tabs2");
var setCheck;
var indx;

/*var x = 0;
for (x = 0; x < myRadios.length; x++) {
  myRadios[x].onclick = function () {
    if (setCheck != this) {
      setCheck = this;
    } else {
      this.checked = false;
      setCheck = null;
    }
  };
}*/


// checkboxes

function toggleCheckbox(element) {
  if (element.checked) {
    if (element.value == "indicativeLigt") {
      gameInstance.SendMessage(
        "LightSwitchController",
        "ToggleLightsInt",
        parseInt(1)
      );
    }

    if (element.value == "scaleRefer") {
      //message for scaleRefer on
      gameInstance.SendMessage(
        "AdditionalOptionsPanelController",
        "ToggleScaleReference",
        parseInt(1)
      );
    }

    if (element.value == "Measures") {
      gameInstance.SendMessage(
        "DimensionsController",
        "ToggleHintsInt",
        parseInt(1)
      );
    }
  } else {
    if (element.value == "indicativeLigt") {
      gameInstance.SendMessage(
        "LightSwitchController",
        "ToggleLightsInt",
        parseInt(0)
      );
    }

    if (element.value == "scaleRefer") {
      //message for scaleRefer off   OptionsPanelController" "ToggleScaleReference
      gameInstance.SendMessage(
        "AdditionalOptionsPanelController",
        "ToggleScaleReference",
        parseInt(0)
      );
    }
    if (element.value == "Measures") {
      gameInstance.SendMessage(
        "DimensionsController",
        "ToggleHintsInt",
        parseInt(0)
      );
    }
  }
}

// color buttons on top rigth side
var rad = document.myform.radioColor;
var prev = null;
var cv = 0;
for (var i = 0; i < rad.length; i++) {
  rad[i].addEventListener("change", function () {
    // prev ? (document.getElementById("colorText").innerHTML = this.value) : null;
    if (prev) {
      if (this.value == "Alumunium") cv = 0;
      else cv = 1;
    } else {
      prev = null;
    }
    if (this !== prev) {
      if (this.value == "Alumunium") cv = 0;
      else cv = 1;
      prev = this;
    }
    document.getElementById("colorText").innerHTML = this.value;
    gameInstance.SendMessage("UIController", "ChangeMaterial", cv);
  });
}

// dropboxes

// light head  style
function myFunction1(cid) {
  var x = document.getElementById(cid).value;
  var bol;

  if (x == "Normal") bol = 0;
  else bol = 1;
  //alert("You selected: " + bol);
  gameInstance.SendMessage("UIController", "Honeycomb", bol);

  gameInstance.SendMessage("SerializationController", "Honeycomb", bol);
}

// light head kelvin selectors function
function myFunction2(cid) {
  var x = document.getElementById(cid).value;
 
  gameInstance.SendMessage("UIController", "Kelvin", parseInt(x));

  gameInstance.SendMessage("SerializationController", "Kelvin", parseInt(x));
}

// light control selectors.

function myFunction3() {
  var x = document.getElementById("ltControl").value;
  var tr=0;
  if(x==="3")
    tr=1;
   
   if(tr===1)
     gameInstance.SendMessage("Base", "SetSmartCitySensorInt",1);
    else
     gameInstance.SendMessage("Base", "SetSmartCitySensorInt", 0);
    // alert("You selected: " + x + "tr:" + tr);
}

// pole height selector
function myFunction4() {
  var x = document.getElementById("polheight").value;

  var ix;
  if (x == 1) {

    ix = parseInt(x);
  } else if (x == 2) {
    ix = parseInt(x);
  } else if (x == 3) {
    ix = parseInt(x);
  }
  gameInstance.SendMessage("Base", "SetPoleHeight", ix);
}

// function for mounting inground or baseplate checkbox
function myFunction5() {
  var x = document.getElementById("mounting").value;
  if (x === 0) gameInstance.SendMessage("UIController", "IngroundBurial");
  else gameInstance.SendMessage("UIController", "BasePlate");
}


// input field for light head rotation

function rotFunction(cid, event){
  var input = document.getElementById(cid);

  var key = event.which || event.keyCode;
  if (key == '13') {
    if(input.value <-180 || input.value>180){
      //alert("use value between -180 and 180");
      swal("Info!","Choose Value Between -180 and 180 and press Enter","info");
      input.value="70";
      return;
    }
     gameInstance.SendMessage("UIController", "SetRotationOnSelected",input.value);
   
  }
}
 
// light distribution of light head
function myFunction6(cid) {
  var x = document.getElementById(cid).value;

  gameInstance.SendMessage(
    "UIController",
    "OnLightDistributionChanged",
    parseInt(x)
  );
}

//buttons in the left grid

function download() {
  gameInstance.SendMessage(
    "AdditionalOptionsPanelController",
    "OpenWindow",
    parseInt(0)
  );
}

function saveload() {
  // alert("can save or load");
  openNav();
}

function specs() {
  window.open(
    "https://6p935q.axshare.com/#id=hiubob&p=flint_plaza_specifications",
    "_blank"
  );
}


var unitSpec=["0"];
var addnum=1;

// add element to the unit
function addelem()
{
  var x = document.getElementById("elements").value;
  
  var txtDefUnit = document.getElementById("defunit");
  
  if(x!=="2")
  {
    txtDefUnit.innerHTML="<b>Customised Unit Elements</b>";
    if(checkConsecSpacer(x) && unitSpec.length<4)
    {
      //alert(unitSpec+"\ncan not add 2 consecutive spacer to unit"); 
      swal("Info!","You Can not add 2 consecutive Spacer Elements","info");
      return;
    }
    else
      if(unitSpec.length<4)
      {
        if(x==="1")
        {
          var spElem=document.getElementById("spacerElement").cloneNode(true);
           spElem.querySelector("#sptab-single").id = "sptab-single" + addnum; 
           spElem.querySelector("#splblfor").setAttribute("for","sptab-single" + addnum);
           spElem.classList.remove("invisible");
           spElem.id="spacerElement"+addnum;
           document.getElementById("tabDiv").append(spElem);
           addnum++;
       }

       if (x==="0")
       {
        const lhElem = document.getElementById("lightingHead").cloneNode(true);
        // console.log(lhElem);
         lhElem.querySelector("#lhtab-single").id= "lhtab-single" + addnum; 
         lhElem.querySelector("#lhlblfor").setAttribute("for", "lhtab-single" + addnum);
         lhElem.querySelector("#poleStylee").id="poleStyle"+addnum;
         lhElem.querySelector("#rotationn").id = "rotation" + addnum;
         lhElem.querySelector("#colorTempss").id = "colorTemps" + addnum;
         lhElem.querySelector("#ltdistributionn").id = "ltdistribution" + addnum;
        lhElem.classList.remove("invisible");
        lhElem.id = "lightingHead" + addnum;
        document.getElementById("tabDiv").append(lhElem);
        addnum++;
       }
      
      unitSpec.push(x);
      var sArray=unitSpec.join('');
      //alert(sArray);
      gameInstance.SendMessage("UIController", "SetElements", sArray);
      swal("Good job!", "You have added the Element", "success");
    }
    else
    {
     // alert("can not add more Elements to unit");
     swal("Beware!", "You can not add more elemts to unit", "info");
    }
  }   

}


// helper function to check consecutive spacers
function checkConsecSpacer(uEl){
   var last= unitSpec[unitSpec.length-1];
  if(last === "1" && uEl ==="1")
   return true;
  else
   return false;
}

// delete element from the bottom

function delelem(){
  if(unitSpec.length>1){
  document
     .getElementById("tabDiv")
     .removeChild(document.getElementById("tabDiv").lastChild);
     unitSpec.pop();
     
     var sArray = unitSpec.join("");
    
     gameInstance.SendMessage("UIController", "SetElements", sArray);
     if(unitSpec.length==1){
        var txtDefUnit = document.getElementById("defunit");
        txtDefUnit.innerHTML = "<b>Default Unit Element</b>";
     }
  }
  else{
     var txtDefUnit = document.getElementById("defunit");
     txtDefUnit.innerHTML = "<b>Default Unit Element</b>";
  
      swal("Error","you are not allowed to remove default element","error");
  } 
}

// for future
 function checkPrevNextelem(uEl){

var last = unitSpec[unitSpec.length - 1];
var first = unitSpec[0];
if (uEl === first) {
 // alert("U are not allowed to remove Default Conf");
  
 return;
}

if (uEl === last) unitSpec.pop();
}

// end of future function


function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}
 
 document
   .querySelector("#tabDiv")
   .addEventListener("click", function (e) {
      
      if (e.target.name == "tabs2") {
        if (setCheck != e.target) {
            setCheck = e.target;
            var temp = document.getElementsByName("tabs2");
             for(var i=0;i<temp.length;i++){
               
               if(temp[i].id===e.target.id)
                 {
                     gameInstance.SendMessage("UIController","SelectElement",i);
                   
                   indx=i;
                   break;
                 }
              }
                 
        }   
        else 
        {
          e.target.checked = false;
          setCheck = null;
          
        }
      }
   });