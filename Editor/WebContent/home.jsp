<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<HTML>
<HEAD>
<link rel="stylesheet" type="text/css" href="css/style2.css">
<link rel="stylesheet" href="css/joint.css" />
<link rel="stylesheet" href="css/jquery-ui.css">
  
<!-- <script type="text/javascript" src="http://www.jointjs.com/downloads/joint.js" ></script> -->
<script type="text/javascript" src="js/jquery-latest.js"></script>

<!-- <script type="text/javascript" src="http://jointjs.com/downloads/joint.shapes.devs.min.js"></script> -->
<!-- <script type="text/javascript" src="http://jointjs.com/downloads/joint.shapes.devs.js"></script> -->
<script type="text/javascript" src="js/joint.js"></script>
<script type="text/javascript" src="js/joint.shapes.devs.js"></script>
<script type="text/javascript" src="js/Backbone.Undo.js"></script>
<script type="text/javascript" src="js/XMLWriter-1.0.0-min.js"></script>
<script type="text/javascript" src="js/sax.js"></script>
<script type="text/javascript" src="js/ecore.xmi.js"></script>
<script src="js/jquery-1.10.2.js"></script>
<script src="js/jquery-ui.js"></script>


<script type="text/javascript" src="js/followWF.js"></script>
<script type="text/javascript" src="js/operations.js"></script>
<script type="text/javascript" src="js/serializeXMI.js"></script>
<script type="text/javascript" src="js/loadPalette.js"></script>
<script type="text/javascript" src="js/metamodel.js"></script>
<script type="text/javascript" src="js/validateDiagramm.js"></script>
<script type="text/javascript" src="js/generateXMIfromJSON.js"></script>


<script language="javascript" type="text/javascript">
//Browser Support Code
function ajaxFunction(){
	console.log("INVOCO FUNXIONE AJAX");
   var ajaxRequest;  // The variable that makes Ajax possible!
   try{
   
      // Opera 8.0+, Firefox, Safari
      ajaxRequest = new XMLHttpRequest();
   }catch (e){
      
      // Internet Explorer Browsers
      try{
         ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
      }catch (e) {
         
         try{
            ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
         }catch (e){
         
            // Something went wrong
            alert("Your browser broke!");
            return false;
         }
      }
   }
   
   // Create a function that will receive data
   // sent from the server and will update
   // div section in the same page.
   ajaxRequest.onreadystatechange = function(){
   
      if(ajaxRequest.readyState == 4){
    	  console.log("State 4");
//          var ajaxDisplay = document.getElementById('ajaxDiv');
//          ajaxDisplay.innerHTML = ajaxRequest.responseText;
      }
   }
   
   // Now get the value from user and pass it to
   // server script.
//    var age = document.getElementById('age').value;
//    var wpm = document.getElementById('wpm').value;
//    var sex = document.getElementById('sex').value;
//    var queryString = "?age=" + age ;
   
//    queryString +=  "&wpm=" + wpm + "&sex=" + sex;
//    ajaxRequest.open("GET", "ajax-example.php" + queryString, true);
  // ajaxRequest.send(null); 
}
</script>
<title>EDITOR</title>

</HEAD>
<body>

<div id="header">
<h1>WORKFLOW WEB EDITOR</h1>
</div>
<div id="toolbar-container">
<img src="img/newFile.jpg" onclick="window.location.reload()"/>
    <img src="img/salva.jpg" onclick="saveDiagramm()"/>
<div class="image-upload">
    <label for="file_input" >
        <img src="img/load.jpg"/>
    </label>
   <input id="file_input" type="file" onchange="loadDiagramm()"/>
   
    <label for="file_palette" >
        <img src="img/loadPalette.jpg"/>
    </label>
   <input id="file_palette" type="file" onchange="evento_loadJSONPalette()" title="LOAD NEW PALETTE"/>
  
</div>
<img src="img/validate.png" onclick="checkDiagramm()"/>
<img src="img/exportXMI.jpg" onclick="exportXMINewId()"/>
<img src="img/xmlGenerate.png" onclick="generateXMItoJSON()"/> 
<img src="img/followWorkFlow.png" onclick="ajaxFunction()"/> 
<img src="img/undo.jpg" class="undo-button" />
<img src="img/reundo.jpg" class="redo-button"/>

<button id="create-item">ITEMS</button>
<input id="fileName" type="text" value="diagram-example"/>
</div>   


<div id="container">

 <div id="dialog-form" title="Create new ItemDefinition">
  <p class="validateTips">All form fields are required.</p>
 
  <form>
    <fieldset>
      <label for="structureRef">Structure Ref</label>
      <input type="text" name="structureRef" id="structureRef" value="" class="text ui-widget-content ui-corner-all">
      <label for="itemKind">Item Kind</label>
      <select id="itemKind">
		  <option value="Information">Information</option>
		  <option value="Physical">Physical</option>
	</select>
	<input type="checkbox" id="isCollectionItem"name="isCollectionItem" value="No"> Is Collection<br>
        <input type="submit" tabindex="-1" style="position:absolute; top:-1000px">
    </fieldset>
  </form>
</div>


<div id="navigation">
<div id="accordion">


<h3>TASK</h3>

<div id="activityDivMain">
	<div id="activityDivGeneric" style="display:none;" >
	    <table>
			<tr>
			<td>  <img   id="draggActivity" src="img/activity.jpg" width="40" height="40" ></td>
			<td> <p>STANDARD TASK</p></td>
	  		</tr>
	 </table>
	 </div>
     <div id="activityDiv">
     </div>
 

</div>     
   <h3> GATEWAY</h3>
  <div  id="gatewayDivMain">
  <div  id="gatewayDivGeneric" style="display:none;">
       <table>
			<tr>
			<td>  <img   id="draggGateway" src="img/gateway.jpg" width="40" height="40" ></td>
			<td> <p>STANDARD GATEWAY</p></td>
	  		</tr>
	 </table>
	 </div>
	 <div  id="gatewayDiv">
	 </div>

</div>

<h3>EVENT</h3>
<div id="eventDivMain">
     <div id="eventDivGeneric"  style="display:none;">
     <table>
		<tr>
		<td>  <img  id="draggEvent" src="img/event.jpg" width="40" height="40" ></td>
		<td>  <p> STANDARD START EVENT</p></td>
		</tr>
   </table>
     <table>
		<tr>
		<td>  <img  id="draggEventEnd" src="img/endEvent.png" width="40" height="40" ></td>
		<td>  <p> STANDARD END EVENT</p></td>
		</tr>
   </table>
   </div>
   <div id="eventDiv">
   </div>
</div>  
   
   <h3>DATA OBJECT</h3>
   <div id="dataObjectDivMain">
   <div id="dataObjectGenericDiv"  style="display:none;">
      <table>
		<tr>
		<td>  <img  id="draggDataObject" src="img/dataObject.jpg" width="40" height="40" ></td>
		<td>  <p>STANDARD DATA OBJECT</p></td>
		</tr>
   </table>
   </div>
    <div id="dataObjectDiv">
    </div>
</div>  

   
    <h3>MESSAGE</h3>
      <div id="messageDivMain">
       <div id="messageGenericDiv"  style="display:none;">
      <table>
		<tr>
		<td>  <img  id="draggMessage" src="img/message.png" width="40" height="40" ></td>
		<td>  <p>STANDARD MESSAGE</p></td>
		</tr>
   </table>
   </div>
   <div id="messageDiv">
   </div>
</div>  

   <h3>POOL</h3>

<div id="poolDivMain">
	<div id="poolDivGeneric"  >
	    <table>
			<tr>
			<td>  <img   id="draggPool" src="img/pool.png" width="40" height="40" ></td>
			<td> <p>STANDARD POOL</p></td>
	  		</tr>
	 </table>
	 </div>
     <div id="poolDiv">
     </div>
 

</div>  
   </div>
   <!-- accordion -->
   </div>
<div id="paperContent">
<div id="content">
            
</div><!-- /content-->
</div>

<div id="extra">     
<h2>PROPERTY</h2>
<div class="newsbox" id="newsbox">
<br>
<label>NAME:
<br>
<input name="nome" type="text" id="nomeProprieta" onchange="newProprieta('nome')"> 
</label>

<div id="selectExitCodeLink" style="display:none;">
<br>
<br>
<label>SELECT TYPE:
<select id="selectExitCodeLinkLabel"  onchange="updateLabelLink()">
  
</select>
</label>
</div>

<br>
<br>
<label>ELEMENT TYPE:
<br>
<input name="tipo" type="text" id="tipoProprieta"  readonly>
</label>


<div id="resourcePropertyDiv" >

<br>
<label>RESOURCE :
<br>
<input name="resourceProperty" type="text" id="resourceProperty" onchange="newProprieta('resourceProperty')" >
</label>
</div>

<div id="stateDataObject" style="display:none;">
<br>
<br>
<label>STATE :
<br>
<input name="stateProprieta" type="text" id="stateProprieta" onchange="newProprieta('stateProprieta')" >
</label>
</div>

<div id="fromToMessage" style="display:none;">

<br>
<label>SENDER :
<br>
<input name="senderMessageProperty" type="text" id="senderMessageProperty" onchange="newProprieta('stateProprieta')"  >
</label>
<br>
<br>
<label>RECEIVER :
<br>
<input name="receiverMessageProperty" type="text" id="receiverMessageProperty" onchange="newProprieta('stateProprieta')" >
</label>
</div>

<div id="typeTask" style="display:none;">

<br>
<label>TASK TYPE:
<br>
<select id="typeTaskSelect"  onchange="updateTypeTask()">
  <option value="default">----</option>
  <option value="user">User</option>
  <option value="manual">Manual</option>
  <option value="service">Service</option>
  <option value="script">Script</option>
  <option value="send">Send</option>
  <option value="receive">Receive</option>
  <option value="reference">Reference</option>
  
</select>
</label>

</div>
<div id="typeEvent" style="display:none;">

<br>
<label>EVENT TYPE:
<br>
<select id="typeEventSelect"  onchange="updateTypeEvent()">
  <option value="start">Start</option>
  <option value="intermediate">Intermediate</option>
  <option value="end">End</option>
</select>
</label>
<br>

<label>TYPE ACTION:
<br>
</label>

<select id="typeEventActionSelect"  onchange="updateTypeEventAction()">
  <option value="none">None</option>
  <option value="message">Message</option>
  <option value="conditional">Conditional</option>
  <option value="timer">Timer</option>
  <option value="signal">Signal</option>
  <option value="multiple">Multiple</option>
  <option value="parallelmultiple">Parallel Multiple</option>
  <option value="cancel">Cancel</option>
  <option value="error">Error</option>
  <option value="terminate">Terminate</option>
  <option value="escalation">Escalation</option>
  <option value="compensation">Compensation</option>
</select>



<br>
<br>
<div id="timerValue" style="display:none;">
<label>TIME:
<input name="timeProperty" type="text" id="timeProperty" >
</label>
<br>
</div>
<div id="conditionalValue" style="display:none;">
<label>CONDITION:
<input name="conditionalProperty" type="text" id="conditionalProperty" onchange="newProprieta('conditionalProperty')" >
</label>
<br>
</div>

<br>
  <input type="checkbox" id="showNameGateway"name="nameGateway" value="Yes" checked onchange="removeLabelGateway()"> Show Name<br>
</div>

<div id="typeGateway" style="display:none;">

<br>
<label>GATEWAY TYPE:
<br>
<select id="typeGatewaySelect"  onchange="updateTypeGateway()">
  <option value="default">Default</option>
  <option value="exclusive">Exclusive</option>
  <option value="inclusive">Inclusive</option>
  <option value="parallel">Parallel</option>
</select>
</label>
<br>
<br>
  <input type="checkbox" id="showNameGateway"name="nameGateway" value="Yes" checked onchange="removeLabelGateway()"> Show Name<br>
 
</div>

<br>
<br>
<label>ID ELEMENT:
<br>
<input name="idElemento" type="text" id="idElemento"  readonly>
</label>


<br>
<br>
<label>ID TYPE :
<br>
<input name="idType" type="text" id="idType"  readonly>
</label>


<div id="itemDefDiv" style="display:none;">

<br>
<label>ITEM DEFINITIONS:
<br>
<select id="itemDefSelect"  onchange="newProprieta()">
 <option value='None'>----</option>
</select>
</label>

</div>



<div id="urlTaskDiv">
<br>
<br>
<label>URL TASK:
<br>
<input name="urlTask" type="text" id="urlTask"  readonly>
</label>
</div>
<br>
<br>
<label>NOTES:
<textarea id="noteElement" rows="5" cols="15" onchange="newProprieta()"></textarea>
</label>
<br>
<br>
<img src="img/delete.png" width="30" height="30" onclick="deleteElement()">
<img src="img/extendProperty.png"  id="urlProperty" width="30" height="30" onclick="evento_show_customProperties()">
</div>


</div> 

<div id="loadProperty" title="CUSTOM PROPERTIES">

  </div>
<div id="validateDialog" title="INFO DIAGRAMM">

</div>

<div id="dialog-items" title="Items Added">

  <h1>Existing Items:</h1>
  <table id="items" class="ui-widget ui-widget-content">
    <thead>
      <tr class="ui-widget-header ">
      	<th>Id Item</th>
        <th>Structure Ref</th>
        <th>Item Kind</th>
        <th>IsCollection</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
     
    </tbody>
  </table>

</div>

</div> <!-- /container -->

<script type="text/javascript" src="js/elements.js"></script>
<script type="text/javascript" src="js/undo.js"></script>

 <div id="footer">
  <a href="http://www.cnr.it/istituti/Descrizione_eng.html?cds=018"><img src="img/logoIcar.png" /></a>
  <div id="mailFooter">
   Sviluppato da<a href="mailto:a.cavaleri@pa.icar.cnr.it"> Antonella Cavaleri</a><br>
   sotto la supervisione di<br>
  <a href="mailto:sabatucci@pa.icar.cnr.it"> Luca Sabatucci</a> e 
  <a href="mailto:cossentino@pa.icar.cnr.it"> Massimo Cossentino </a>(Gruppo <a href="http://www.pa.icar.cnr.it/aose/"> AOSE</a>)
  </div>
  <div id="logoJointjs" >
   <a href="http://www.jointjs.com/" ><img src="img/logoJOINTJS.png" /></a>
   </div>
 </div>
</body>

<script type="text/javascript">


$(function() {
    $( "#accordion" ).accordion({
    	
    });
   
  });
//var idProcess='P1';
var urlLocation=window.location.search.substring(1);
var getParameter =parseGetVars(urlLocation);

var idProcess=getParameter['ID'];
$(document).ready(function (){
//EFFETTUARE QUI LA CREAZIONE DELL PALETTE 
var filePaletteJson='file/paletteNew.json';
 load_palette_from_URL (filePaletteJson);
});
var xPos;
var yPos; 
	function setPosition(event,ui){
		 var wrapper = $("#content").offset();
         var borderLeft = parseInt($("#content").css("border-left-width"),10);
         var borderTop = parseInt($("#content").css("border-top-width"),10);
         var pos = ui.helper.offset();
          xPos=pos.left - wrapper.left - borderLeft;
          yPos=pos.top - wrapper.top - borderTop;
	}
	

	$( "#draggPool" ).draggable(
    		{
    			
    			
    	       helper : "clone",
    	       
    	       stop:function(event,ui) {
    	    	  setPosition(event,ui);
    	    	
    	          addPool(xPos,yPos,"Pool");
    	       }
    		
    	      }		
    );
    $( "#draggActivity" ).draggable(
    		{
    			
    			
    	       helper : "clone",
    	       
    	       stop:function(event,ui) {
    	    	  setPosition(event,ui);
    	    	
    	          addActivity(xPos,yPos,"First activity");
    	       }
    		
    	      }		
    );
    $( "#draggActivityNew" ).draggable(
    		{
    			
    			
    	       helper : "clone",
    	       
    	       stop:function(event,ui) {
    	    	  setPosition(event,ui);
    	          addActivity(xPos,yPos,"Second activity");
    	       }
    	      }		
    );
    
    $( "#draggGateway" ).draggable(
    		{
   	         helper : "clone",
   	      stop:function(event,ui) {
   	    	   setPosition(event,ui);
	           addGateway(xPos,yPos);
	          
	          
	       }
   	      }				
    );
    
    
    $( "#draggEvent" ).draggable(
    		{
    			
    			
    	       helper : "clone",
    	         
    	       stop:function(event,ui) {
    	    	  setPosition(event,ui);
    	          addEvent(xPos,yPos);
    	       }
    	      }		
    );
    $( "#draggEventEnd" ).draggable(
    		{
    			
    			
    	       helper : "clone",
    	         
    	       stop:function(event,ui) {
    	    	  setPosition(event,ui);
    	          addEvent(xPos,yPos,'E1','End Event',true);
    	       }
    	      }		
    );
    $( "#draggDataObject" ).draggable(
    		{
    			
    			
    	       helper : "clone",
    	         
    	       stop:function(event,ui) {
    	    	   setPosition(event,ui);
    	           addDataObject(xPos,yPos);
    	       }
    	      }		
    );
    $( "#draggMessage" ).draggable(
    		{
    			
    			
    	       helper : "clone",
    	         
    	       stop:function(event,ui) {
    	    	  setPosition(event,ui);
    	          addMessage(xPos,yPos);
    	       }
    	      }		
    );
    
    $( "#content" ).droppable({
      drop: function( event, ui ) {
        $( this )
      
      }
    });
    var structureRef = $( "#structureRef" ),
    itemKind = $( "#itemKind" ),
    isCollectionItem = $( "#isCollectionItem" ),
    allFields = $( [] ).add( structureRef ).add( itemKind ).add( isCollectionItem );
    
    dialog = $( "#dialog-form" ).dialog({
        autoOpen: false,
        height: 300,
        width: 350,
        modal: true,
        buttons: {
          "Add Item": addItem,
          Cancel: function() {
            dialog.dialog( "close" );
          }
        },
        close: function() {
          form[ 0 ].reset();
          allFields.removeClass( "ui-state-error" );
        }
      });
    dialogItems = $( "#dialog-items" ).dialog({
        autoOpen: false,
        height: 300,
        width: 350,
        modal: true,
        buttons: {
          "Create an new Item": function() {
              dialog.dialog( "open" )
          },
          Cancel: function() {
        	  dialogItems.dialog( "close" );
          }
        },
        close: function() {
          form[ 0 ].reset();
          allFields.removeClass( "ui-state-error" );
          dialog.dialog( "close" );
        }
      });
      form = dialog.find( "form" ).on( "submit", function( event ) {
        event.preventDefault();
        addItem();
      });
   
      $( "#create-item" ).button().on( "click", function() {
    	  dialogItems.dialog( "open" );
      });
 
      var itemIDIncrement=0;
      console.log("itemIDIncrement-->"+itemIDIncrement)
      function addItem() {
    	  itemIDIncrement++
    	  console.log("ADD ITEM ICREM-->"+itemIDIncrement);
          var idItemAdded="ID_"+itemIDIncrement;
          
          allFields.removeClass( "ui-state-error" );
     
        console.log("IS COLLECTION ITEM CHECKED:-->"+isCollectionItem.prop('checked'));
          var collectionValue='false';
         
          if(isCollectionItem.prop('checked'))
        	  collectionValue='true';
          isCollectionItem.val(collectionValue);
         $( "#items tbody" ).append( "<tr id='"+idItemAdded+"'>" +
        	  "<td class='idItem'>" +idItemAdded + "</td>" +
              "<td class='structureRef'>" + structureRef.val() + "</td>" +
              "<td class='itemKind'>" + itemKind.val() + "</td>" +
              "<td class='isCollectionItem'>" + isCollectionItem.val() + "</td>" +
              "<td><img src='img/deleteItem.jpg' onclick='removeItem("+idItemAdded+")' width='10' height='10' /></td>" +
            "</tr>" );
         
         $( "#itemDefSelect" ).append( 
        		"<option value="+idItemAdded+">"+structureRef.val()+"</option>"
           	  
                 );
            dialog.dialog( "close" );
          
         
        }
      
      function removeItem(idItemRemove) {
    	 $( idItemRemove ).remove();
    	 
      }
   
</script>

</html>
