
function followWF(){
console.log("Chiaamata followWFExecution ");
$.ajax({
    url : "http://localhost:8080/WebEditor/WFFollow",
    type: "GET",
    success : function (data,stato) {
    	
    	
    //	console.log("DATO-->"+data)
    	//console.log("STATO-->"+stato)
    	var myObject = JSON.parse(data);
    	// console.log(" myObject-->"+myObject)
    	var allElements=graph.getElements();
    	 $.each(myObject.taskState, function(index, d){ 
    		
    		
    		 var taskName=myObject.taskState[index].name;
    		 var taskState=myObject.taskState[index].state;
    		 //devo individuare il nome del task
    		
    		//utilizzo il dato che mi arriva in formato Json per poter aggiornare il diagramma e lo stato delle attività
    	    	
    	_.each(allElements, function (element) {
    		 console.log(" name TASK-->"+ taskName)
    		console.log("element.get('content')"+element.get('content'));
    		if(taskName===element.get('content')){
    			
    			console.log("Task uguae trovato");
    			//adesso coloro il task di un contorno diverso 
    			 //recupero lo stato del task
       		 console.log(" state TASK-->"+ taskState)
       		 if(taskState==="Eseguito"){
       			 console.log("task eseguito ");
        		element.attr('.outer/stroke','#0047AB');
//       		 	element.attr('.outer/stroke-width','3');
//       		 	element.attr('.outer/stroke-dasharray','1.4');
       		 }
       		if(taskState==="Fallito"){
       		 console.log("task fallito");
        		element.attr('.outer/stroke','#DC143C');
//       		 	element.attr('.outer/stroke-width','3');
//       		 	element.attr('.outer/stroke-dasharray','1.4');
       		 }
       		if(taskState==="Sostituito"){
       		 console.log("task sostituito ");
        		element.attr('.outer/stroke','#008080');
       		 	
       		 }
       		element.attr('.outer/stroke-width','3');
   		 	element.attr('.outer/stroke-dasharray','1.4');
//       		var	bboxCell=element.getBBox();
//       		var rSelector = new joint.shapes.basic.Rect({
//		        position: {x: bboxCell.x-5, y: bboxCell.y-5  },
//		        size: { width: 10, height: 10 },
//		        attrs: { rect: { fill: '#7FFF00' } },
//		        isCornerSelector:true
//		       
//		    });
//       		
//       		element.embed(rSelector);
//			//	cellView.model.toFront();
//					
//					 graph.addCell(rSelector);
//       		
    		}
       		
    	});
    	});

    },
    error : function (richiesta,stato,errori) {
        alert("E' evvenuto un errore. Lo stato della chiamata: "+stato);
    }
});


}
