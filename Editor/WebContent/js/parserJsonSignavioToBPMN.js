var fileLoadJson='file/DiagramSignavioJson.json';
var idMapElement={};
var idMapTypeElement={};
//mappa delle risorse presenti nel proesso assegante a ciascun task
var idMapResourceToTask=new Map();
var idMapResourceName=new Map();
//mappa dei data input associati ad un task
var dataInputTaskMap={};
//mappa dei data output associati ad un task
var dataOutputTaskMap={};

//mappa delle annotation sbvr associate ad un task
var sbvrAnnotationTaskMap={};
//mappa degli id delle risorse 
var idMapOutgoingResourceIdElement={};
var mappIncomingresourceId={};
var idMapSourceLink={};
var idMapTargetLink= new Array();
var idMapTargetAssociation=new Array();
var idMapTargetSBVRAssociation=new Array();
var arrayDataObjectAdded={};
var idMapProcess={};
var idProcess='PROCESS_';
var incrementId=0;
var numCollaboration=1;
var hasPoll=false;
function parserJsonSignavioToBPMN(){
	 var xmlWriterFROMJson = new  XMLWriter('MacRoman', '1.0');
		//Leggo il file JSON che descrive il diagramma generato con signavio
	 jQuery.get(fileLoadJson, function(data) { 
		 
		 xmlWriterFROMJson.writeStartDocument(false);
			
			// xmlWriter.WriteProcessingInstruction("xml", "version=""1.0"" encoding=""UTF-8"" standalone=""yes""")
			 xmlWriterFROMJson.writeStartElement( 'definitions' );
			 xmlWriterFROMJson.writeAttributeString('xmlns', 'http://www.omg.org/spec/BPMN/20100524/MODEL');
			 xmlWriterFROMJson.writeAttributeString('xmlns:bpmndi', 'http://www.omg.org/spec/BPMN/20100524/DI');
			 xmlWriterFROMJson.writeAttributeString('xmlns:dc', 'http://www.omg.org/spec/DD/20100524/DC');
			 xmlWriterFROMJson.writeAttributeString('xmlns:di', 'http://www.omg.org/spec/DD/20100524/DI');
			 xmlWriterFROMJson.writeAttributeString('xmlns:tns', 'http://sourceforge.net/bpmn/definitions/_1419237461760');
			 xmlWriterFROMJson.writeAttributeString('xmlns:xsd', 'http://www.w3.org/2001/XMLSchema');
			 xmlWriterFROMJson.writeAttributeString('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
			 xmlWriterFROMJson.writeAttributeString('xmlns:yaoqiang', 'http://bpmn.sourceforge.net');
				
			 xmlWriterFROMJson.writeAttributeString('exporter', '');
			 xmlWriterFROMJson.writeAttributeString('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
			 xmlWriterFROMJson.writeAttributeString('exporterVersion', '2.2.5 (GPLv3, Non-Commercial)');
				
			 xmlWriterFROMJson.writeAttributeString('expressionLanguage', 'http://www.w3.org/1999/XPath');
			 //SETTARE UN ID UNIVOCO
			
			 xmlWriterFROMJson.writeAttributeString('id', '_1419237461760');
			 xmlWriterFROMJson.writeAttributeString('name', '');
			 xmlWriterFROMJson.writeAttributeString('targetNamespace', 'http://sourceforge.net/bpmn/definitions/_1419237461760');
			 xmlWriterFROMJson.writeAttributeString('typeLanguage', 'http://www.omg.org/spec/BPMN/20100524/MODEL http://bpmn.sourceforge.net/schemas/BPMN20.xsd');
			 
			 
			//opero sui dati definiti nel file
			 //childShapes è l'array che contiene tutti gli elementi bmpn definiti nel grafico
			 //IN QUESTA FASE INIZIALIZZO TUTTE LA MAPPE NECESSARIE POI PER EFFETTUARE IL PARSER
			 incrementId=0;
			 $.each(data.childShapes, function(index, d){ 
				 var resourceId=data.childShapes[index].resourceId; 
		 		 var elementType=data.childShapes[index].stencil.id; 
		 		 var elementOutgoing=data.childShapes[index].outgoing;
//		 		console.log("elementType:"+elementType)
//		 		console.log("resourceId: "+resourceId);
		 		idElement="_"+incrementId++;
	 		console.log("idElement added in map: "+idElement);
	 		//if(elementType!=="SBVRAnnotation" && elementType!=="Association_Undirected")
				idMapElement[resourceId] = idElement;
				 
				//INFORMAXIONI RELATIVE ALLE RISORSE VERIFICARE SE FUNZIONA QUANDO METTONO UN TASK CON UNA RISORSA TODO
//				if(data.childShapes[index].properties.resources){
//					 $.each(data.childShapes[index].properties.resources.items, function(indexRes){
//						
//				//verifico se al task sono assegnate delle risorse
//						 if(data.childShapes[index].properties.resources.items){
//						 resourceAssignedName=data.childShapes[index].properties.resources.items[indexRes].resource;
//						 if(!idMapResourceToTask.has(resourceAssignedName)){
//							 console.log("AGGIUNGO UAN RISORSA AL PROCCESSO:")
//							 var sizeMap=idMapResourceToTask.size;
//							 var idResource="RS_"+sizeMap;
//							 //mappo ciascuna risorsa con il relativo task a cui è assegnata
//							 idMapResourceToTask.set(idMapElement[resourceId],idResource);
//							// idMapResourceToTask.set(resourceAssignedName,idResource);
//							 idMapResourceName.set(idResource,resourceAssignedName);
//							
//						 }
//						 }
//						 
//					 });
//					}
				
				idMapTypeElement[resourceId]=elementType;
				idMapOutgoingResourceIdElement[resourceId] = new Array();
				 $.each(elementOutgoing, function(indexOutgoing, d){ 
					 console.log("ELEMNTO CON OUTGOING: "+resourceId+ "--->"+ elementOutgoing[indexOutgoing].resourceId);
					 var sizeT=idMapOutgoingResourceIdElement[resourceId].length;
					//Array che memorizza tutti i link in uscita associati ad un detetrminato elemento
					 idMapOutgoingResourceIdElement[resourceId][sizeT++] = elementOutgoing[indexOutgoing].resourceId;
					// mappa che memorizza per un dato elemento il riferiemnto all'elemento di cui è un  outgoing
					 if( mappIncomingresourceId[elementOutgoing[indexOutgoing].resourceId]===undefined )
						 mappIncomingresourceId[elementOutgoing[indexOutgoing].resourceId] = new Array();
					 //_.contains(mappIncomingresourceId[elementOutgoing[indexOutgoing].resourceId], resourceId)
					 if(! _.contains(mappIncomingresourceId[elementOutgoing[indexOutgoing].resourceId], resourceId)){
					 var sizeIncomingMap=mappIncomingresourceId[elementOutgoing[indexOutgoing].resourceId].length;
//					 console.log("POPOLO MAPPINCOMING PER ELEMENTO livello 0:"+elementOutgoing[indexOutgoing].resourceId +" CON ELEMENTO "+resourceId)
					 mappIncomingresourceId[elementOutgoing[indexOutgoing].resourceId][sizeIncomingMap++]=resourceId;
					 console.log("ELEMNTO  "+resourceId+ "INCOMING DI :--->"+ elementOutgoing[indexOutgoing].resourceId);
					 }
					 else
						 
						 console.log("ELEMNTO INCOMING gia contenuto :--->");
				 });
			 });
			 
			 //verifico se sono presenti degli elementi di tipo collaboration e li inserisco prima dei tag process
			 //TODO gestire il caso in cui un intero processo sia all'interno di una collaboration
			 $.each(data.childShapes, function(index, d){            

				 	var element=data.childShapes[index];
					var resourceId=data.childShapes[index].resourceId; 
					var elementType=data.childShapes[index].stencil.id; 
			 if(elementType==='CollapsedPool'){
					xmlWriterFROMJson.writeStartElement('collaboration');
					xmlWriterFROMJson.writeAttributeString('id',"COLLABORATION_"+idMapElement[resourceId]);
					xmlWriterFROMJson.writeAttributeString('isClosed','false');
					
					xmlWriterFROMJson.writeStartElement('participant');
					xmlWriterFROMJson.writeAttributeString('id',idMapElement[resourceId]);
					xmlWriterFROMJson.writeAttributeString('name',element.properties.name);
					xmlWriterFROMJson.writeStartElement('participantMultiplicity');
					xmlWriterFROMJson.writeAttributeString('maximum', "1");
					xmlWriterFROMJson.writeAttributeString('minimum',"0");
					//fine participantMultiplicity
					xmlWriterFROMJson.writeEndElement();
					//fine participant
					xmlWriterFROMJson.writeEndElement();
					
					//aggiungo il tag message floe se presente
					addMessageFlow(element,xmlWriterFROMJson);
					//fine collaboration
					xmlWriterFROMJson.writeEndElement();
				}
				
			 });
			 console.log("SIMPLE PROCESS")
			 //Si tratta di un processo semplice
			 xmlWriterFROMJson.writeStartElement( 'process' );
				
			 xmlWriterFROMJson.writeAttributeString('id','PROCESS_0');
			 xmlWriterFROMJson.writeAttributeString('isClosed','false');
			 xmlWriterFROMJson.writeAttributeString('isExecutable','true');
			 xmlWriterFROMJson.writeAttributeString('processType','None');
			 addChildShape(data.childShapes,xmlWriterFROMJson);
				
			 
			 
			 //aggiungo i tag sequence flow
			 $.each(data.childShapes, function(index, d){ 
				addSequenceFlow(data.childShapes[index], xmlWriterFROMJson);
			 		var child=data.childShapes[index];
					$.each(child.childShapes, function(index1, d){ 
						addSequenceFlow(child.childShapes[index1], xmlWriterFROMJson);
						var child2=child.childShapes[index1];
						$.each(child2.childShapes, function(index2, d){ 
							addSequenceFlow(child2.childShapes[index2], xmlWriterFROMJson);
							
						});
					});
					
			 });
			 
			 
			//end process tag
			 xmlWriterFROMJson.writeEndElement();
			 //end tag definitions
			 xmlWriterFROMJson.writeEndElement();
			 xmlWriterFROMJson.writeEndDocument();
			 var textFileAsBlob = new Blob([xmlWriterFROMJson.flush()], {type:'text/xml'});
				var fileNameToSaveAs = "FileXMLFROMJSONSignavio";

				var downloadLink = document.createElement("a");
				downloadLink.download = fileNameToSaveAs;
				downloadLink.innerHTML = "Download File";
				if (window.URL != null)
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
			 
		 
	 });
	 
}


function addChildShape(childShapes,xmlWriterFROMJson){
	console.log("addChildShape");
$.each(childShapes, function(index, d){            

 	var element=childShapes[index];
		var resourceId=childShapes[index].resourceId; 

	var elementType=childShapes[index].stencil.id; 
//	//gestisco il tag SBVRAnnotation 
//	if(elementType==='SBVRAnnotation'){
//		xmlWriterFROMJson.writeStartElement("sbvrAnnotation");
//		 xmlWriterFROMJson.writeAttributeString('id', idMapElement[resourceId]);
//		 xmlWriterFROMJson.writeAttributeString('name', element.properties.text);
////		end tag sbvrAnnotation
//		 xmlWriterFROMJson.writeEndElement();
//	}
	console.log("elementType.search('Task')-->"+elementType.search('Task'))
	if (elementType.search('Task') !==-1 ) {
		var taskType=element.properties.tasktype;
		console.log("trovato task")
		
		var taskTag='';
		if(taskType==='None')
			 taskTag='task';
		else
			 taskTag=taskType.toLowerCase()+'Task';
		 xmlWriterFROMJson.writeStartElement(taskTag );
		 xmlWriterFROMJson.writeAttributeString('completionQuantity','1');
		 xmlWriterFROMJson.writeAttributeString('id', idMapElement[resourceId]);
		 xmlWriterFROMJson.writeAttributeString('isForCompensation','false');
		
		 xmlWriterFROMJson.writeAttributeString('name', element.properties.name);
		 xmlWriterFROMJson.writeAttributeString('startQuantity','1');
		
		 if(taskType==='Receive'||taskType==='Send'||taskType==='Service'||taskType==='User')
			 xmlWriterFROMJson.writeAttributeString('implementation','##WebService');
		 if(taskType==='Receive')
			 xmlWriterFROMJson.writeAttributeString('instantiate','false');

		//verifico se il task ha delle risorse associate e inserire il tag relativo
		console.log("element NAME:  "+element.properties.name);
		console.log("xmlWriterFROMJson-->>>"+xmlWriterFROMJson);
		
		addIncomingTag(element,xmlWriterFROMJson);
		addOutgoingTag(element,xmlWriterFROMJson);

		 //aggiungo i tag relativi ai legami con il dataObject ad esso collegato se presente
		 for(var i=0;i<idMapTargetAssociation.length;i++){
			 console.log("a idMapTargetAssociation");
			 if(idMapTargetAssociation[idMapElement[resourceId]]){
				 
			 }
			 
		 }
//		end tag task
		 xmlWriterFROMJson.writeEndElement();

	}

	if(elementType.substring(elementType.length-5, elementType.length)==='Event'){
		console.log("ELEMENT IS A EVENT");
			
			var eventTag='startEvent';
			if(elementType.substring(0, 3)==='End')
				eventTag='endEvent';
			console.log(" idMapElement[resourceId]-->"+ idMapElement[resourceId]);
			 xmlWriterFROMJson.writeStartElement(eventTag);
			 xmlWriterFROMJson.writeAttributeString('id', idMapElement[resourceId]);
			 addIncomingTag(element,xmlWriterFROMJson);
			 addOutgoingTag(element,xmlWriterFROMJson);

			// end tag event
			 xmlWriterFROMJson.writeEndElement();
		}
	
	else if(elementType.search("Intermediate")!==-1 && elementType.search("Event")!==-1 && elementType.search("Catching")!==-1){
	console.log("ELEMENT IS A EVENT");
		
		
		 xmlWriterFROMJson.writeStartElement("intermediateThrowEvent");
		 xmlWriterFROMJson.writeAttributeString('id', idMapElement[resourceId]);
		 addIncomingTag(element,xmlWriterFROMJson);
		 addOutgoingTag(element,xmlWriterFROMJson);
		 if(elementType.search("Message")!==-1 ){
			 //inserisco il messagggio
			 xmlWriterFROMJson.writeStartElement( "messageEventDefinition");
			 xmlWriterFROMJson.writeAttributeString('id', idMapElement[resourceId]+"_ED_1");
			// end tag messageEventDefinition
			 xmlWriterFROMJson.writeEndElement();
		 }
		

		// end tag event
		 xmlWriterFROMJson.writeEndElement();
	}
//	
	//gestione dei gateway
	if(elementType.substring(elementType.length-7, elementType.length)==='Gateway'){
		
		var gateType=element.properties.gatewaytype;
		
		var gatewayTag="";
		if(gateType=="AND")
			gatewayTag='parallelGateway';
		if(gateType==="XOR")
			gatewayTag='exclusiveGateway';
		if(gateType==='OR')
			gatewayTag='inclusiveGateway';
			
//		console.log("ELEMENT IS A Gaterway");
		 xmlWriterFROMJson.writeStartElement(gatewayTag);
		 xmlWriterFROMJson.writeAttributeString('id', idMapElement[resourceId]);
//		 addIncomingTag(element,xmlWriterFROMJson);
//		 addOutgoingTag(element,xmlWriterFROMJson);

		// end tag event
		 xmlWriterFROMJson.writeEndElement();
	}
	//mappo gli oggetti di tipo collaboration che vanno inserit all'esterno dell'elemento process
//	if(elementType==='CollapsedPool'){
//		xmlWriterFROMJson.writeStartElement('collaboration');
//		xmlWriterFROMJson.writeAttributeString('id',"COLLABORATION_"+idMapElement[resourceId]);
//		xmlWriterFROMJson.writeAttributeString('isClosed','false');
//		
//		xmlWriterFROMJson.writeStartElement('participant');
//		xmlWriterFROMJson.writeAttributeString('id',idMapElement[resourceId]);
//		xmlWriterFROMJson.writeAttributeString('name',element.properties.name);
//		xmlWriterFROMJson.writeStartElement('participantMultiplicity');
//		xmlWriterFROMJson.writeAttributeString('maximum', "1");
//		xmlWriterFROMJson.writeAttributeString('minimum',"0");
//		//fine participantMultiplicity
//		xmlWriterFROMJson.writeEndElement();
//		//fine participant
//		xmlWriterFROMJson.writeEndElement();
//		
//		//aggiungo il tag message floe se presente
//		addMessageFlow(element,xmlWriterFROMJson);
//		//fine collaboration
//		xmlWriterFROMJson.writeEndElement();
//	}
//	
	if(elementType==='DataObject'){
		 for( var j = 0; j < arrayDataObjectAdded.length;j++) {
				if(element.properties.name !== arrayDataObjectAdded[j]) {
					
	//	if(!in_array(element.attr('.label/text'),arrayDataObjectAdded)){
	//	console.log("aggiungo elemento :"+element.attr('.label/text')+" in posirione:"+j)
		arrayDataObjectAdded[j]=element.properties.name;
	//	console.log("arrayDataObjectAdded[j]-->"+arrayDataObjectAdded[j]);
		dataObjectId=idMapElement[resourceId];
		xmlWriterFROMJson.writeStartElement('dataObject' );
		xmlWriterFROMJson.writeAttributeString('id', "DO_"+idMapElement[resourceId]);
		xmlWriterFROMJson.writeAttributeString('isCollection','false');
//		 if(element.attr(".itemRef/text")!==undefined && element.attr(".itemRef/text")!=="")
//			 xmlWriter.writeAttributeString('itemSubjectRef', element.attr(".itemRef/text"));
//		
		xmlWriterFROMJson.writeAttributeString('name',element.properties.name);
		xmlWriterFROMJson.writeEndElement();
		xmlWriterFROMJson.writeStartElement('dataObjectReference' );
		xmlWriterFROMJson.writeAttributeString('dataObjectRef',"DO_"+dataObjectId);
		xmlWriterFROMJson.writeAttributeString('id', idMapElement[resourceId]);
		 //se contiene uno state allora aggiungo il tag dataState
		
		 if(element.properties.state!==""){
			 xmlWriterFROMJson.writeStartElement('dataState' );
			 xmlWriterFROMJson.writeAttributeString('name', element.properties.state);
			 xmlWriterFROMJson.writeEndElement();
		 }
		 xmlWriterFROMJson.writeEndElement();
		}else{
		 //per ciascun dataObject devo creare tanti tag dataObjectReference quanti sono gli state ad esso associati
			xmlWriterFROMJson.writeStartElement('dataObjectReference' );
			xmlWriterFROMJson.writeAttributeString('dataObjectRef',"DO_"+dataObjectId);
			xmlWriterFROMJson.writeAttributeString('id', idMapElement[resourceId]);
		
			
		 //aggiungo tag dataState
			if(element.properties.state!==""){
				 xmlWriterFROMJson.writeStartElement('dataState' );
				 xmlWriterFROMJson.writeAttributeString('name', element.properties.state);
				 xmlWriterFROMJson.writeEndElement();
			 }
		 xmlWriterFROMJson.writeEndElement();
		}
	}
		 
	
}
	
});
}
function addMessageFlow(element,xmlWriterFROMJson){
	 console.log(" CALL addMessageFlow TAG ");
	 var resourceId=element.resourceId;
	 var elementType=element.stencil.id;
	 if(mappIncomingresourceId[resourceId]!==undefined)
		if(mappIncomingresourceId[resourceId].length>0){
			
		 $.each(mappIncomingresourceId[resourceId], function(index, d){ 
//			 console.log("idMapTargetLink[resourceId]-->"+idMapTargetLink[idMapElement[resourceId]]);
			 
				 var target=mappIncomingresourceId[resourceId][index];
				 console.log("target addMessageFlow-->"+target)
				 console.log(" ADD addMessageFlow idMapElement[target]"+idMapElement[target]);
				// var inTask=mappIncomingresourceId[target][0] ;
				 //verifico che non si tratti di elementi del SBVR
				
//				 console.log("IN TASK"+idMapElement[inTask]);
				 console.log("IN addMessageFlow TASK TYPE-->"+idMapTypeElement[target]);
				 if(idMapTypeElement[target]==="MessageFlow")
				 {
					 xmlWriterFROMJson.writeStartElement('messageFlow' );
					 xmlWriterFROMJson.writeAttributeString('id', idMapElement[target]);
					 xmlWriterFROMJson.writeAttributeString('sourceRef', dMapElement[mappIncomingresourceId[target][0]]);
					 xmlWriterFROMJson.writeAttributeString('targetRef', idMapElement[resourceId]);
					 xmlWriterFROMJson.writeEndElement();
						
				 }
		 });
		}
	 if(idMapOutgoingResourceIdElement[resourceId]!==undefined){
		 $.each(idMapOutgoingResourceIdElement[resourceId], function(index, d){ 
//			 console.log("idMapTargetLink[resourceId]-->"+idMapTargetLink[idMapElement[resourceId]]);
			 
				 var target=idMapOutgoingResourceIdElement[resourceId][index];
				 console.log("target addMessageFlow-->"+target)
				 console.log(" ADD addMessageFlow idMapElement[target]"+idMapElement[target]);
				// var inTask=mappIncomingresourceId[target][0] ;
				 //verifico che non si tratti di elementi del SBVR
				
//				 console.log("IN TASK"+idMapElement[inTask]);
				 console.log("IN addMessageFlow TASK TYPE-->"+idMapTypeElement[target]);
				 if(idMapTypeElement[target]==="MessageFlow")
				 {
					 xmlWriterFROMJson.writeStartElement('messageFlow' );
					 xmlWriterFROMJson.writeAttributeString('id', idMapElement[target]);
					 xmlWriterFROMJson.writeAttributeString('sourceRef',  idMapElement[resourceId]);
					 xmlWriterFROMJson.writeAttributeString('targetRef', idMapElement[idMapOutgoingResourceIdElement[target][0]]);
					 xmlWriterFROMJson.writeEndElement();
						
				 }
		 });
		 
		}
}
function addIncomingTag(element,xmlWriterFROMJson){
	 console.log(" CALL ADD INCOMING TAG ");
	 var resourceId=element.resourceId;
	 var elementType=element.stencil.id;
	 if(mappIncomingresourceId[resourceId]!==undefined)
		if(mappIncomingresourceId[resourceId].length>0){
			
		 $.each(mappIncomingresourceId[resourceId], function(index, d){ 
//			 console.log("idMapTargetLink[resourceId]-->"+idMapTargetLink[idMapElement[resourceId]]);
			 
				 var target=mappIncomingresourceId[resourceId][index];
				 console.log("target incoming-->"+target)
				 console.log(" ADD INCOMING TAG idMapElement[target]"+idMapElement[target]);
				// var inTask=mappIncomingresourceId[target][0] ;
				 //verifico che non si tratti di elementi del SBVR
				
//				 console.log("IN TASK"+idMapElement[inTask]);
				 console.log("IN TASK TYPE-->"+idMapTypeElement[target]);
				 if(idMapTypeElement[target]==="SequenceFlow")
				 xmlWriterFROMJson.writeElementString('incoming',idMapElement[target]);
			
		 });
		}
//	var resourceId=element.resourceId;
//	if(idMapTargetLink[idMapElement[resourceId]]){
//		
//	 $.each(idMapTargetLink[idMapElement[resourceId]], function(index, d){ 
////		 console.log("idMapTargetLink[resourceId]-->"+idMapTargetLink[idMapElement[resourceId]]);
//		 if(idMapTargetLink[idMapElement[resourceId]]!==undefined){
//			 var target=idMapTargetLink[idMapElement[resourceId]][index];
//			 console.log(" ADD INCOMING TAG idMapElement[target]"+idMapElement[target]);
//			 xmlWriterFROMJson.writeElementString('incoming',idMapElement[target]);
//			 
//		 }
//	 });
//	}
		

	
}
function addOutgoingTag(element,xmlWriterFROMJson){
	

	var resourceId=element.resourceId;
	 $.each(element.outgoing, function(index, d){ 
		 if(element.outgoing[index].resourceId!==undefined){

			 var typeSource=idMapTypeElement[element.outgoing[index].resourceId];
			 //aggiungo un tag associationSBVR
			if(typeSource ==='Association_Undirected')
				console.log("Devo aggiungere un ta associationSBVR");
			else
			 if(typeSource.substring(0,11)!=='Association'){
				 console.log("Association----->"+idMapElement[element.outgoing[index].resourceId]);
				 idMapSourceLink[element.outgoing[index].resourceId]=idMapElement[resourceId];
				// var outTask=idMapOutgoingResourceIdElement[element.outgoing[index].resourceId][0];
//				 console.log("OUT TASK-->"+idMapElement[outTask]);
//				 console.log("OUT TASK TYPE-->"+idMapTypeElement[outTask]);
				 
				 if(idMapTypeElement[element.outgoing[index].resourceId]!=="SBVRAnnotation" && idMapTypeElement[element.outgoing[index].resourceId]!=="Association_Undirected"){

					 idMapSourceLink[element.outgoing[index].resourceId]=idMapElement[resourceId];
					 xmlWriterFROMJson.writeElementString('outgoing',idMapElement[element.outgoing[index].resourceId]);
				 }
				
				
				// xmlWriterFROMJson.writeElementString('outgoing',idMapElement[outTask]);
			 }
			 else{
				 //il task ha un dataObject in output
				 if( dataOutputTaskMap[resourceId]===undefined)
					 dataOutputTaskMap[resourceId]=new Array();
				 var sizedataOutputTaskMap=dataOutputTaskMap[resourceId].length;
				 var idDatOutput="Dout"+idMapElement[resourceId]+"_"+sizedataOutputTaskMap;
				 dataOutputTaskMap[resourceId][sizedataOutputTaskMap++]=idDatOutput;
				// console.log("ADD A DATA OUTPUT TAG: "+idDatOutput+ "FOR : "+idMapElement[resourceId])
			 }
		}
		
	});
}
function addSequenceFlow(childShapes, xmlWriterFROMJson){
	
	var elementType=childShapes.stencil.id; 
	 var element=childShapes;
	 var resourceId=childShapes.resourceId; 
	
	 if(elementType==='SequenceFlow'){
	 console.log("Add sequenecFlow");
			xmlWriterFROMJson.writeStartElement('sequenceFlow' );
		console.log("Id Sequence-->"+ idMapElement[resourceId]);
			xmlWriterFROMJson.writeAttributeString('id', idMapElement[resourceId]);
//			console.log("idMapSourceLink[resourceId]:"+idMapSourceLink[resourceId]);
			var sourceRef=  idMapElement[mappIncomingresourceId[resourceId][0]]
//			var sourceRef= idMapSourceLink[resourceId];
		console.log("sourceRef:-->"+sourceRef);
			xmlWriterFROMJson.writeAttributeString('sourceRef', sourceRef);
			 xmlWriterFROMJson.writeAttributeString('targetRef', idMapElement[element.target.resourceId]);
			// xmlWriterFROMJson.writeAttributeString('name', element.properties.name);
			 if(element.properties.name!==""){
				// xmlWriter.writeStartElement('conditionExpression' );
				 xmlWriterFROMJson.writeElementString('conditionExpression',element.properties.name);
				 
				// xmlWriter.writeEndElement();
			 }
			 xmlWriterFROMJson.writeEndElement();
		}
	 
	 //INFORMAZIONI RELATIVE AD SBVR
//	 else if(elementType==='Association_Undirected'){
//		 xmlWriterFROMJson.writeStartElement('sbvrAssociationFlow' );
//		 xmlWriterFROMJson.writeAttributeString('id', idMapElement[resourceId]);
//		 var sourceRef= idMapTargetSBVRAssociation[resourceId];
//		// var sourceRef= mappIncomingresourceId[resourceId];
//		 console.log("SBVR  sourceRef-->"+idMapElement[sourceRef]);
//		 console.log("SBVR  targetRef-->"+idMapElement[element.target.resourceId]);
//			
//		 xmlWriterFROMJson.writeAttributeString('sourceRef', idMapElement[sourceRef]);
//	     xmlWriterFROMJson.writeAttributeString('targetRef', idMapElement[element.target.resourceId]);
//		 xmlWriterFROMJson.writeEndElement();
//	 }
}