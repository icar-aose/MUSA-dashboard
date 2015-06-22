
var fileLoadJson='file/DiagramSignavioJson.json';
//mappa delle annotation sbvr associate ad un task
var sbvrAnnotationTaskMap={};
var idMapElement={};
var idMapNameToElement={};
var idMapOutgoungToElement={};
var mapNameTaskOutgoingAssociation={};
var idMapTargetSBVRAssociation=new Array();
function parseSVBRInfo(){
	
	 jQuery.get(fileLoadJson, function(data) { 
			
		 var  incrementId=0;
		
		 
		//compongo la string per generare un json
		 var jsonOutput='{"sbvrAnnotation":[';
		 $.each(data.childShapes, function(index, d){ 
				var element=data.childShapes[index];
				var resourceId=data.childShapes[index].resourceId; 
		 		var elementType=data.childShapes[index].stencil.id; 
		 		var elementOutgoing=data.childShapes[index].outgoing;
//		 		console.log("elementType:"+elementType)
//		 		console.log("resourceId: "+resourceId);
		 		
		 		idElement="_"+incrementId++;
//		 		console.log("idElement added in map: "+idElement);
		 		if(elementType.search('Task') !==-1 ){
		 			//per ogni task memorizzo il nome ad esso associato
		 			//console.log("Aggiungo nel mappa  il nome del task: "+element.properties.name)
		 		idMapNameToElement[resourceId]=element.properties.name;
		 		}
		 		else if (elementType==='SBVRAnnotation')
		 			{
		 			//per ogni annotation sbvr memorizzo il nome ad esso associato
		 			//console.log("Aggiungo nel mappa  il nome dell'annotation sbvr: "+element.properties.text)
		 			idMapNameToElement[resourceId]=element.properties.text;
		 			//individuo l'outgoig della nnotation SBVR
		 			
		 			
		 			}
		 		// per ogni Association_Undirected memorizzo qual'è il task a cui è legato
		 		if(elementType==="Association_Undirected" ){
		 			
		 			if(elementOutgoing!== undefined)
		 				{
		 				
		 				mapNameTaskOutgoingAssociation[resourceId]=idMapNameToElement[elementOutgoing[0].resourceId];

		 				
		 				}
		 		
		 		}
		 		idMapElement[resourceId] = idElement;
		 		
		 		

		 });
		 
		 
//Recupero tutte le informazioni relative alle annotation SBVR
		 $.each(data.childShapes, function(index, d){ 
				var element=data.childShapes[index];
				var resourceId=data.childShapes[index].resourceId; 
		 		var elementType=data.childShapes[index].stencil.id; 
		 		var elementOutgoing=data.childShapes[index].outgoing;
		if(elementType==='SBVRAnnotation'){
			
			jsonOutput+='{';
			jsonOutput+='"id":"'+resourceId+'",';
				jsonOutput+='"name":"'+element.properties.text+'",';
				if(elementOutgoing[0]!==undefined){
					
				jsonOutput+='"task":"'+mapNameTaskOutgoingAssociation[elementOutgoing[0].resourceId]+'"';
				}
				
				jsonOutput+='},';
			
		}
		
		 });
		 
		 jsonOutput=jsonOutput.substring(0, jsonOutput.length-1);
		 jsonOutput+=']}';
		 
		 //INSERISCO IL FILE DOCUEMNTO XML CREATO IN UN FILE .JSON
		 var textFileAsBlob = new Blob([jsonOutput], {type:'application/json'});
			var fileNameToSaveAs = "SBVRAnnonation2Signavio";

			var downloadLink = document.createElement("a");
			downloadLink.download = fileNameToSaveAs;
			downloadLink.innerHTML = "Download File";
			if (window.webkitURL != null)
			{
				downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
			}
			else
			{
				
				downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
				downloadLink.style.display = "none";
				document.body.appendChild(downloadLink);
			}

			downloadLink.click();
	 })
	
}

