	var graphExecution = new joint.dia.Graph;
	var isFirstActivity=true;
	var setRun;
	var xPosCapability=5;
	var yPosCapability=5;
function injectGoals(){
	console.log("CAll javascript injectGoals");
	
	
	$.ajax({
	    url : "http://localhost:8080/WebEditor/InjectGoals",
	    type: "GET",
	    success : function (data) {
	    	
	    	alert("GOALS SENDED TO MUSA");
	    	console.log("data InjectGoals : "+data);
	    	 $("#followWFSubmit").attr("onclick","loadStartWorkFlow()");
	    //abilito il pulsante per effettuare il monitorning
	    	
	    },
	    error : function (richiesta,stato,errori) {
	      //  alert("Inject Goals :E' avvenuto un errore. Lo stato della chiamata: "+stato);
	    }
	});
	
}
	function getMusaStatus(){
		console.log("CALL GET MUSA STATUS--->");
		
		$.ajax({
	    url : "http://localhost:8080/WebEditor/MusaStatus",
	    type: "GET",
	    success : function (data,stato) {
	    	
	    	$("#musaStatus").text('MUSA STATUS: ' +data)
	    }	
	    	,
		    error : function (richiesta,stato,errori) {
		        alert("MUSA STATUS :E' evvenuto un errore. Lo stato della chiamata: "+stato);
		    }
		});
	}
function loadCapabilities(){
	getMusaStatus()
	 xPosCapability=25;
	 yPosCapability=25;
	//chiamo un servizio di musa che mi ritorna le capabiliti della pianificazione
	 console.log("CALL LOAD CAPABILITIES");
//imposto lo stato di musa
		
		
	$.ajax({
	    url : "http://localhost:8080/WebEditor/WFFollow",
	    type: "GET",
	    success : function (data,stato) {
	   var myObject = JSON.parse(data);
	  
	   
	   console.log("DIVE SIZE W--->>>>> "+$('#paperContentExecution').width())
	   console.log("DIVE SIZE height--->>>>> "+$('#paperContentExecution').height())
	  graphExecution.clear();
	    	var paperExecution = new joint.dia.Paper({
	    	    el: $('#paperContentExecution'),
	    	    width: $('#paperContentExecution').width(),
	    	    height: $('#paperContentExecution').height(),
	    	    model: graphExecution,
	    	    gridSize: 1
	    	});
	    	
	    	//var allElements=graphExecution.getElements();
	   $.each(myObject.capability_status, function(index, d){ 
	     		
	     		
	    		 var idTask=myObject.capability_status[index].id_task;
	    		 var taskName=myObject.capability_status[index].capability_name;
	    		 var taskState=myObject.capability_status[index].capability_state;
	    		 
	    	//creo un nuovo oggetto grao e paper dove inserire i miei elementi grafici
	    		 
	    	addNewCapability(idTask,taskName,taskState);
	    	//per ogni capapbiliti presente nel file JSON aggiungo un nuovo task
	    	
//			console.log("position to elemento: x  --> "+activity.get('position').x+"y  --> "+activity.get('position').y);
	    	 });
	    	 
	    },
	    error : function (richiesta,stato,errori) {
	        alert("Load Capability :E' evvenuto un errore. Lo stato della chiamata: "+stato);
	    }
	});
	
}

function loadStartWorkFlow(){
	window.open("http://localhost:8080/WebEditor/followWorkflow.jsp","nome_pagina","width=500,height=500"); 

}
var myVar;
var varCallMusaStatus;
function startfollowWF(){
	console.log("CALL START FOLLOW WF");
//	window.open("http://localhost:8080/WebEditor/followWorkflow.jsp","nome_pagina","width=500,height=500"); 
	//imposto tutti i pulsanti non editabili, setto il grafo della nuova pagina recuperando le capabily che vengono dalla pianificazione
	setRun=true;
	 myVar = setInterval(function(){followWF()},4000);
	 varCallMusaStatus=setInterval(function(){getMusaStatus()},2000);
	 
	 
	
}


function stopfollowWF(){
	console.log("CALL STOP FOLLOW WF");
	clearInterval(myVar);
	clearInterval(varCallMusaStatus);
	setRun=false;
}
function followWF(){
console.log("setRun-->"+setRun);
console.log("Chiamata followWFExecution ")

if(setRun){
$.ajax({
    url : "http://localhost:8080/WebEditor/WFFollow",
    type: "GET",
    success : function (data,stato) {
    	
    	
  // console.log("DATO-->"+data)
//    	console.log("STATO-->"+stato)
    	var myObject = JSON.parse(data);
//    	 console.log(" myObject-->"+myObject)
    	 
    	  //elimino tutti gli elementi precedenti
	   // qui potrei verificare se gli elemtni da inserire sono giaà presenti in base all'id ed eventualemnte verificare se è cambiato lo stato
	   // quando un task passa dallo stto di ready ad active fa parte un link da esso verso tutti gli altri che sono nello stato di active 
		//se l'elemnto non esiste nel grapho lo aggiungo
    	
    	var allElements=graphExecution.getElements();
    
    	 $.each(myObject.capability_status, function(index, d){ 
    		
    		
    		 var idTask=myObject.capability_status[index].id_task;
    		 var taskName=myObject.capability_status[index].capability_name;
    		 var taskState=myObject.capability_status[index].capability_state;
    	
    		var existElementIntheGraph=false;
    		//utilizzo il dato che mi arriva in formato Json per poter aggiornare il diagramma e lo stato delle attività
    		 console.log("Numero di Elementi presenti nel grafo-->"+allElements.legth);
    	_.each(allElements, function (element) {
    		
//    		console.log(" JSON idTask--> "+ idTask)
//    		 console.log(" JSON name TASK--> "+ taskName)
//    		 console.log("GRAPH ID"+element.attr('.typeId/text'));
//    		console.log("element.get('content')"+element.get('content'));
    		//if(taskName===element.get('content')){
    		//effettuo i controlli solo per gli elementi di tipo activity
    		if(element instanceof joint.shapes.basic.Activity){
    			
    	
	    		if(idTask===element.attr('.typeId/text')){
	    			existElementIntheGraph=true
	    			//verifico se è cambiato lo stato del task
//	    			console.log("Task uguae trovato");
//	    			console.log("Capability state: "+taskState);
//	    			console.log("element.attr('.taskState/text')-->"+element.attr('.taskState/text'));
			    			if(taskState!==element.attr('.taskState/text')){
			    				
			    				setStyleElementState(taskState,element);
			    			
			    			//adesso coloro il task di un contorno diverso 
			    			 //recupero lo stato del task
		//	       		 console.log(" state TASK-->"+ taskState)
//			       		 if(taskState==="ready"){
////			       			 console.log("task ready ");
//			        		element.attr('.outer/stroke','#FFFF00');
//			
//			       		 }
//			       		if(taskState==="active"){
////			       		 console.log("task active");
//			        		element.attr('.outer/stroke','#002FA7');
//			
//			       		 }
//			       		if(taskState==="failed"){
////			       		 console.log("task failde ");
//			        		element.attr('.outer/stroke','#E52B50');
//			        		element.set('taskType', 'failedExecution');
//			        		element.onTaskTypeChange(element, 'failedExecution');
//			       		 	
//			       		 }
//			       		if(taskState==="success"){
//			          		 console.log("task success ");
//			           		element.attr('.outer/stroke','#2E8B57');
//			           		element.set('taskType', 'successExecution');
//			           		element.onTaskTypeChange(element, 'successExecution');
//			          		 
//			          		 }
//			       	
			       		
			       	//verifico se il task è passato da uno stato di ready ad active se è cosi se ci sono altri task che sono active allora vengono collegati con un link
						if(element.attr('.taskState/text')==="ready"&& taskState==="active")
							{
							//solo pe il primo elemento inserisco uno start e un link verso di esso, uso un booleano per capire se è stato già stato isnerito uno start
						
							if(isFirstActivity){
								addFirstStartElement(element)
							}
							
							
							//individuo tutti gli altri task che sono in stato di ready
							_.each(allElements, function (otherElement) {
								//consideros tutti gli elemtni ecetto lui stesso
//								console.log("verifico se quali altri elemtni sono in stato active")
								if(element.id!==otherElement.id){
									
									//verifico lo stato dell'elemento 
									var outherElementState=otherElement.attr('.taskState/text');
//									console.log("Stato degli altri task--> "+outherElementState)
									if(outherElementState==="active"){
										//inserisco un elemtno link che colelga i due elementi
//										console.log("Altro task in stato ready trovato")
//										console.log(" SOURCE element.id--> "+element.id)
//										console.log(" SOURCE content--> "+element.get('content'))
//										console.log(" TARGET  content--> "+otherElement.get('content'))
//										console.log("TARGET outherElementState.id--> "+otherElement.id)
										var link = new joint.shapes.basic.BpmnLink({
										    source: { id: otherElement.id },
										    target: { id: element.id }
										});
//										console.log("aggiungo un link tra i due task")
										graphExecution.addCell(link);
									}
								}
								
							})
							}
							
			    			}
	       		//imposto il nuvo valore per l'attriuto state
	       		element.attr('.taskState/text',taskState);
	       		element.attr('.outer/stroke-width','3');
	   		 	element.attr('.outer/stroke-dasharray','1.4');
	     		
	    		}
    		}
    	});
    	
    	//se l'elemento non esiste lo aggiungo nel grafo 
    	if(!existElementIntheGraph)
    		{
    		//è necessario creare un nuovo elemnto ed aggiungerlo
    		console.log("<<<<<<<<<NUOVA CAPABILITY INTRODOTTA E' NECESARIO AGGIUNGERAL NEL GRAFO>>>>>>>>>>>>>")
    		addNewCapability(idTask,taskName,taskState);
    		xPos=+120;
    		}
    	});
    	 
    },
    error : function (richiesta,stato,errori) {
        alert("FOLLLOW WF--> E' evvenuto un errore. Lo stato della chiamata: "+stato);
        //qui blocco l'esecuzione delle chiamate
        clearInterval(myVar);
        clearInterval(varCallMusaStatus);
        setRun=false;
    }
});
 
}else
	{
	
	}
}

	function setStyleElementState(taskState,element){
		 if(taskState==="ready"){
//   			 console.log("task ready ");
    		element.attr('.outer/stroke','#FFFF00');

   		 }
   		if(taskState==="active"){
//   		 console.log("task active");
    		element.attr('.outer/stroke','#002FA7');

   		 }
   		if(taskState==="failed"){
//   		 console.log("task failde ");
    		element.attr('.outer/stroke','#E52B50');
    		element.set('taskType', 'failedExecution');
    		element.onTaskTypeChange(element, 'failedExecution');
   		 	
   		 }
   		if(taskState==="success"){
      		 console.log("task success ");
       		element.attr('.outer/stroke','#2E8B57');
       		element.set('taskType', 'successExecution');
       		element.onTaskTypeChange(element, 'successExecution');
      		 
      		 }
   	
	}

	function addNewCapability(idTask,taskName,taskState){
//		var yPos=5;
//		var xPos=5;
		var size={ width:80, height: 10 };
		var activity =   new joint.shapes.basic.Activity({
    		
   		 position: { x: 25, y: 25},
	        size: { width:120, height: 80 }
	    }); 
		 
		activity.attr({
			
	        '.label': { text: taskName},
	        '.tipologia':{text:'Task'},
	        '.typeId':{text:idTask},
	        '.urlTask':{text:""},
	        '.taskState':{text:taskState},
	        
	        '.fobj': {
	        	
       	 width:80, height: 40,
//	        	 ref: '.inner',
//	                'ref-x': 10,
//	               'ref-y': 10,
               transform: ' translate(20,20)',
             //  style: _.clone(size2) 
                },
           div: { style: _.clone(size) }
			    });
		
	
//		activity.on("change:position",function() { 
//			moving_entity=this; 
//			this.set("isChanging",true); 
//			
//		});
		
		setStyleElementState(taskState,activity);
		
//		 if(taskState==="ready"){
////  			 console.log("task eseguito ");
//  			activity.attr('.outer/stroke','#FFFF00');
//
//  		 }
//  		if(taskState==="active"){
////  		 console.log("task fallito");
//  		activity.attr('.outer/stroke','#002FA7');
//  	
//
//  		 }
//  		if(taskState==="failed"){
////  		 console.log("task sostituito ");
//  		activity.attr('.outer/stroke','#E52B50');
//  		activity.set('taskType', 'failedExecution');
// 		activity.onTaskTypeChange(activity, 'failedExecution');
//  		 	
//  		 }
//  		if(taskState==="success"){
////     		 console.log("task sostituito ");
//  			//qaundo passa in questo stato aggiungo un immagine che ne indica il completamento
//     		activity.attr('.outer/stroke','#2E8B57');
//     		activity.set('taskType', 'successExecution');
//     		activity.onTaskTypeChange(activity, 'successExecution');
//     		 	
//     		 }
		activity.set('content',taskName);
//		console.log("taskName--->>>> "+taskName)
//		console.log("xPosCapability--->> "+xPosCapability);
//		console.log("yPosCapability--->> "+yPosCapability);
		if(xPosCapability>=1000){
			//console.log("---<<<<<<INSERISCO IL TASK NELLA RIGA SUCCESSIVA<<<<<");
			yPosCapability=+130;
			activity.translate(xPosCapability-1000, yPosCapability);
		}
		else{
			activity.translate(xPosCapability, 30);
			//console.log("---<<<<<<INSERISCO IL TASK NELLA STESSA RIGA <<<<<");
		}
			
		
		xPosCapability+=125;
		graphExecution.addCell(activity);	
		if(taskState==="active"){
// 		 console.log("task fallito");
 	
 		addFirstStartElement(activity)
 	// il task è attivo inserisco un elemento di start a partire da esso 

 		 }
		
	}
	
	
	function addFirstStartElement(element){
			var eventStart =   new joint.shapes.basic.Event({
				position: { x: 0, y: 0},
		        size: { width: 50, height: 50 }
		    }); 
			eventStart.attr({
					text: {text: "Start Event"},
			        '.label': { text: "eventStart"},
			        '.tipologia':{text:'Event'}
		      	});
			eventStart.set('eventType','start');
			//creo un link tra i due elementi
			graphExecution.addCell(eventStart);
			console.log("id Start Event:-->"+eventStart.id);

			var linkStart = new joint.shapes.basic.BpmnLink({
			    source: { id: eventStart.id},
			    target: { id: element.id }
			});
			graphExecution.addCell(linkStart);
			isFirstActivity=false;
		
	}