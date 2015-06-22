
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
function generateXMItoJSON(){
	 var xmlWriterFROMJson = new  XMLWriter('MacRoman', '1.0');
	 var dataObjectId="";
		arrayDataObjectAdded=new Array();
		arrayDataObjectAdded[0]="new";
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
		 
		 
		 //Inizizlizzo array che contien le associazioni tra il link e il suo elemento target
		
		 
		 //opero sui dati definiti nel file
		 //childShapes è l'array che contiene tutti gli elementi bmpn definiti nel grafico
		 
		 incrementId=0;
		 $.each(data.childShapes, function(index, d){ 

			 	
		 		var resourceId=data.childShapes[index].resourceId; 
		 		 var elementType=data.childShapes[index].stencil.id; 
		 		 var elementOutgoing=data.childShapes[index].outgoing;
	 		// console.log("elementType:"+elementType)
		 		console.log("resourceId: "+resourceId);
		 		idElement="_"+incrementId++;
			//console.log("idElement added in map: "+idElement);
				idMapElement[resourceId] = idElement;
				 
				if(data.childShapes[index].properties.resources){
					 $.each(data.childShapes[index].properties.resources.items, function(indexRes){
						
				
						 if(data.childShapes[index].properties.resources.items){
						 resourceAssignedName=data.childShapes[index].properties.resources.items[indexRes].resource;
						 if(!idMapResourceToTask.has(resourceAssignedName)){
							 console.log("AGGIUNGO UAN RISORSA AL PROCCESSO:")
							 var sizeMap=idMapResourceToTask.size;
							 var idResource="RS_"+sizeMap;
							 idMapResourceToTask.set(resourceAssignedName,idResource);
							 idMapResourceName.set(idResource,resourceAssignedName);
							
						 }
						 }
						 
					 });
					
				}
				idMapTypeElement[resourceId]=elementType;
				idMapOutgoingResourceIdElement[resourceId] = new Array();
				 $.each(elementOutgoing, function(indexOutgoing, d){ 
					 var sizeT=idMapOutgoingResourceIdElement[resourceId].length;
					//Array che memorizza tutti i link in uscita associati ad un detetrminato elemento
					 idMapOutgoingResourceIdElement[resourceId][sizeT++] = elementOutgoing[indexOutgoing].resourceId;
					 //mappa che memorizza per un dato elemento il riferiemnto all'elemento di cui è un  outgoing
//					 if( mappIncomingresourceId[elementOutgoing[indexOutgoing].resourceId]===undefined)
//						 mappIncomingresourceId[elementOutgoing[indexOutgoing].resourceId] = new Array();
//					 var sizeIncomingMap=mappIncomingresourceId[elementOutgoing[indexOutgoing].resourceId].length;
//					 console.log("POPOLO MAPPINCOMING PER ELEMENTO livello 0:"+idMapElement[elementOutgoing[indexOutgoing].resourceId]+" CON ELEMENTO "+idMapElement[resourceId])
//					 mappIncomingresourceId[elementOutgoing[indexOutgoing].resourceId][sizeIncomingMap++]=resourceId;
				
				 });
				//inserisco tutti gli elementi
				var child=data.childShapes[index];
				$.each(child.childShapes, function(index1, d){ 
					var resourceId1=child.childShapes[index1].resourceId; 
			 		 var elementType1=child.childShapes[index1].stencil.id; 
			 		var elementOutgoing1=child.childShapes[index1].outgoing;
		 	//	console.log("elementType1:"+elementType1)
			 	//	console.log("resourceId: "+resourceId);
			 		idElement="_"+incrementId++;
				//	console.log("idElement added in map: "+idElement);
					idMapElement[resourceId1] = idElement;
					if(data.childShapes[index].properties.resources){
						 $.each(data.childShapes[index].properties.resources.items, function(indexRes){
							
					
							 if(data.childShapes[index].properties.resources.items){
							 resourceAssignedName=data.childShapes[index].properties.resources.items[indexRes].resource;
							 if(!idMapResourceToTask.has(resourceAssignedName)){
								 console.log("AGGIUNGO UAN RISORSA AL PROCCESSO:")
								 var sizeMap=idMapResourceToTask.size;
								 var idResource="RS_"+sizeMap;
								 idMapResourceToTask.set(resourceAssignedName,idResource);
								 idMapResourceName.set(idResource,resourceAssignedName);
								
							 }
							 }
							 
						 });
						
					}
					idMapTypeElement[resourceId1]=elementType1;
					idMapOutgoingResourceIdElement[resourceId1] = new Array();
					 $.each(elementOutgoing1, function(indexOutgoing, d){ 
						 var sizeT=idMapOutgoingResourceIdElement[resourceId1].length;
						//Array che memorizza tutti i link in uscita associati ad un detetrminato elemento
						 idMapOutgoingResourceIdElement[resourceId1][sizeT++] = elementOutgoing1[indexOutgoing].resourceId1;
						 
						 //mappa che memorizza per un dato elemento il riferiemnto all'elemento di cui è un  outgoing
//						 if( mappIncomingresourceId[elementOutgoing1[indexOutgoing].resourceId1]===undefined)
//							 mappIncomingresourceId[elementOutgoing1[indexOutgoing].resourceId1] = new Array();
//						 var sizeIncomingMap=mappIncomingresourceId[elementOutgoing1[indexOutgoing].resourceId1].length;
//						 console.log("POPOLO MAPPINCOMING PER ELEMENTO Livello 1:"+idMapElement[elementOutgoing1[indexOutgoing].resourceId1]+" CON ELEMENTO "+idMapElement[resourceId1])
//						 mappIncomingresourceId[elementOutgoing1[indexOutgoing].resourceId1][sizeIncomingMap++]=resourceId1;
					
					 });
					var child2=child.childShapes[index1];
					$.each(child2.childShapes, function(index2, d){ 
						var resourceId2=child2.childShapes[index2].resourceId; 
				 		 var elementType2=child2.childShapes[index2].stencil.id; 
				 		var elementOutgoing2=child2.childShapes[index2].outgoing;
			 		// console.log("elementType2:"+elementType2)
				 	//	console.log("resourceId: "+resourceId);
				 		idElement="_"+incrementId++;
						console.log("idElement added in map: "+idElement);
						idMapElement[resourceId2] = idElement;
						if(data.childShapes[index].properties.resources){
							 $.each(data.childShapes[index].properties.resources.items, function(indexRes){
								
						
								 if(data.childShapes[index].properties.resources.items){
								 resourceAssignedName=data.childShapes[index].properties.resources.items[indexRes].resource;
								 if(!idMapResourceToTask.has(resourceAssignedName)){
									 console.log("AGGIUNGO UAN RISORSA AL PROCCESSO:")
									 var sizeMap=idMapResourceToTask.size;
									 var idResource="RS_"+sizeMap;
									 idMapResourceToTask.set(resourceAssignedName,idResource);
									 idMapResourceName.set(idResource,resourceAssignedName);
									
								 }
								 }
								 
							 });
							
						}
						idMapTypeElement[resourceId2]=elementType2;
						idMapOutgoingResourceIdElement[resourceId2] = new Array();
						 $.each(elementOutgoing2, function(indexOutgoing, d){ 
							 var sizeT=idMapOutgoingResourceIdElement[resourceId2].length;
							//Array che memorizza tutti i link in uscita associati ad un detetrminato elemento
							 idMapOutgoingResourceIdElement[resourceId2][sizeT++] = elementOutgoing2[indexOutgoing].resourceId2;
							 //mappa che memorizza per un dato elemento il riferiemnto all'elemento di cui è un  outgoing
//							 if( mappIncomingresourceId[elementOutgoing2[indexOutgoing].resourceId2]===undefined)
//								 mappIncomingresourceId[elementOutgoing2[indexOutgoing].resourceId2] = new Array();
//							 var sizeIncomingMap=mappIncomingresourceId[elementOutgoing2[indexOutgoing].resourceId2].length;
//							 console.log("POPOLO MAPPINCOMING PER ELEMENTO livello 2:"+idMapElement[elementOutgoing2[indexOutgoing].resourceId2]+" CON ELEMENTO "+idMapElement[resourceId2])
//							 mappIncomingresourceId[elementOutgoing2[indexOutgoing].resourceId2][sizeIncomingMap++]=resourceId2;
						
						 });
					});
				});
				
		 });
		 //memorizzo l'informazione relativa agli elemnti in uscita collegati ad un dato elemento
		 $.each(data.childShapes, function(index, d){ 
			 
			 	var resourceId=data.childShapes[index].resourceId; 
		 		var elementOutgoing=data.childShapes[index].outgoing;
	 		
				 $.each(elementOutgoing, function(indexOutgoing, d){ ;
					 //mappa che memorizza per un dato elemento il riferiemnto all'elemento di cui è un  outgoing
					 if( mappIncomingresourceId[elementOutgoing[indexOutgoing].resourceId]===undefined)
						 mappIncomingresourceId[elementOutgoing[indexOutgoing].resourceId] = new Array();
					 var sizeIncomingMap=mappIncomingresourceId[elementOutgoing[indexOutgoing].resourceId].length;
					 console.log("POPOLO MAPPINCOMING PER ELEMENTO livello 0:"+idMapElement[elementOutgoing[indexOutgoing].resourceId]+" CON ELEMENTO "+idMapElement[resourceId])
					 mappIncomingresourceId[elementOutgoing[indexOutgoing].resourceId][sizeIncomingMap++]=resourceId;
				
				 });
				//inserisco tutti gli elementi
				var child=data.childShapes[index];
				$.each(child.childShapes, function(index1, d){ 
					var resourceId1=child.childShapes[index1].resourceId; 
			 		var elementOutgoing1=child.childShapes[index1].outgoing;
		 		
					 $.each(elementOutgoing1, function(indexOutgoing, d){ 
						 //mappa che memorizza per un dato elemento il riferiemnto all'elemento di cui è un  outgoing
						 if( mappIncomingresourceId[elementOutgoing1[indexOutgoing].resourceId]===undefined)
							 mappIncomingresourceId[elementOutgoing1[indexOutgoing].resourceId] = new Array();
						 var sizeIncomingMap=mappIncomingresourceId[elementOutgoing1[indexOutgoing].resourceId].length;
						 console.log("POPOLO MAPPINCOMING PER ELEMENTO Livello 1:"+idMapElement[elementOutgoing1[indexOutgoing].resourceId]+" CON ELEMENTO "+idMapElement[resourceId1])
						 mappIncomingresourceId[elementOutgoing1[indexOutgoing].resourceId][sizeIncomingMap++]=resourceId1;
					
					 });
					var child2=child.childShapes[index1];
					$.each(child2.childShapes, function(index2, d){ 
						var resourceId2=child2.childShapes[index2].resourceId; 
				 		var elementOutgoing2=child2.childShapes[index2].outgoing;
			 		   
				 		$.each(elementOutgoing2, function(indexOutgoing, d){ 
							 if( mappIncomingresourceId[elementOutgoing2[indexOutgoing].resourceId]===undefined)
								 mappIncomingresourceId[elementOutgoing2[indexOutgoing].resourceId] = new Array();
							 var sizeIncomingMap=mappIncomingresourceId[elementOutgoing2[indexOutgoing].resourceId].length;
							 console.log("elementOutgoing2[indexOutgoing].resourceId2-->"+elementOutgoing2[indexOutgoing].resourceId)
							 console.log("POPOLO MAPPINCOMING PER ELEMENTO livello 2:"+idMapElement[elementOutgoing2[indexOutgoing].resourceId]+" CON ELEMENTO "+idMapElement[resourceId2])
							 mappIncomingresourceId[elementOutgoing2[indexOutgoing].resourceId][sizeIncomingMap++]=resourceId2;
						
						 });
					});
				});
				
			 
			 
		 });
		 //memorizzo l'informazione relativa ai targetLink
		 $.each(data.childShapes, function(index, d){ 
			 var elementType=data.childShapes[index].stencil.id; 
			 var element=data.childShapes[index];
		 	 var resourceId=data.childShapes[index].resourceId; 
			 if(elementType==='SequenceFlow' ){
				 addElemtnInTargetAtrray(element,resourceId);
			 }
//			 memorizzo l'informazione reltativa ai dataobject
			 if(elementType.substring(0, 11)==='Association'){
				 addTargetAssociationAtrray(element,resourceId);
			 }
			 		var child=data.childShapes[index];
					$.each(child.childShapes, function(index1, d){ 
						 var elementType1=child.childShapes[index1].stencil.id; 
						 var element1=child.childShapes[index1];
					 	 var resourceId1=child.childShapes[index1].resourceId; 
					 	if(elementType1.substring(0, 11)==='Association'){
					 		addTargetAssociationAtrray(element1,resourceId1);
						 }
						 if(elementType1==='SequenceFlow'){
							 addElemtnInTargetAtrray(element1,resourceId1);
						 }
						var child2=child.childShapes[index1];
							$.each(child2.childShapes, function(index2, d){ 
								 var elementType2=child2.childShapes[index2].stencil.id; 
								 var element2=child2.childShapes[index2];
							 	 var resourceId2=child2.childShapes[index2].resourceId; 
							 	if(elementType2.substring(0, 11)==='Association'){
							 		addTargetAssociationAtrray(element2,resourceId2);
								 }
								 if(elementType2==='SequenceFlow'){
									 addElemtnInTargetAtrray(element2,resourceId2);
								 }
								
							});
					});
					
			 });
		 
		 
		 
//		 $.each(data.childShapes, function(index, d){ 
//			 var elementType=data.childShapes[index].stencil.id; 
//			 var resourceId=data.childShapes[index].resourceId; 
//			 var element=data.childShapes[index];
//			 if(elementType=='MessageFlow'){
//
//			 		xmlWriterFROMJson.writeStartElement('message' );
//			 		xmlWriterFROMJson.writeAttributeString('id', idMapElement[resourceId]);
//			 		xmlWriterFROMJson.writeAttributeString('name',  element.properties.name);
//					
//					 //TODO vedere come gestiscono gli item
////					 if(element.attr(".itemRef/text")!==undefined && element.attr(".itemRef/text")!=="")
////						 xmlWriterFROMJson.writeAttributeString('itemRef', element.attr(".itemRef/text"));
//					 xmlWriterFROMJson.writeStartElement('extensionElements' );
//					 xmlWriterFROMJson.writeStartElement('yaoqiang:style' );
//					 xmlWriterFROMJson.writeAttributeString('init', '1');
//					 xmlWriterFROMJson.writeEndElement();
//					 xmlWriterFROMJson.writeEndElement();
//					 xmlWriterFROMJson.writeEndElement();
//			 }
//				
//		 });
		
		 
		 //inserisco le colalboration
		 xmlWriterFROMJson.writeStartElement('collaboration' );
 		 xmlWriterFROMJson.writeAttributeString('id', "COLLABORATION_0"+numCollaboration);
		 xmlWriterFROMJson.writeAttributeString('isClosed', "false");
		 var numParticipant=1;
		 $.each(data.childShapes, function(index, d){  
			 var elementType=data.childShapes[index].stencil.id; 
			 var resourceId=data.childShapes[index].resourceId; 
			 var element=data.childShapes[index];
		 	 if(elementType=='Pool'){
		 		 hasPoll=true;
		 		xmlWriterFROMJson.writeStartElement('participant' );
				
				 xmlWriterFROMJson.writeAttributeString('id', idMapElement[resourceId]);
				
				 xmlWriterFROMJson.writeAttributeString('name', element.properties.name);
				 xmlWriterFROMJson.writeAttributeString('processRef', "PROCESS_"+ numParticipant);
				 idMapProcess[resourceId]="PROCESS_"+ numParticipant;
				 xmlWriterFROMJson.writeStartElement('participantMultiplicity' );
				 xmlWriterFROMJson.writeAttributeString('maximum', "1");
				 xmlWriterFROMJson.writeAttributeString('minimum', "0");
				 xmlWriterFROMJson.writeEndElement();
				 xmlWriterFROMJson.writeEndElement();
				
				
			
				 numParticipant++;
		 		
//		 		 addChildShapes(childShapesPool,xmlWriterFROMJson);
		 	 }
		 	 
		 	 if(elementType=='MessageFlow'){
//		 		 xmlWriterFROMJson.writeStartElement('messageFlow' );
//		 		
//				 xmlWriterFROMJson.writeAttributeString('id', idMapElement[resourceId]);
////				 xmlWriterFROMJson.writeAttributeString('messageRef', idMap[element.id]);
//				// xmlWriterFROMJson.writeAttributeString('sourceRef', idMapElement[]);
//				// xmlWriterFROMJson.writeAttributeString('targetRef', idMapElement[element.target.resourceId]);
//				 //end messageFlow tag
//				 xmlWriterFROMJson.writeEndElement();
			 }
			
		 });
		 //end collaboration tag
		 xmlWriterFROMJson.writeEndElement();
		 var lineAdded=false;
		 
		 $.each(data.childShapes, function(index, d){  
			 var elementType=data.childShapes[index].stencil.id; 
			 var resourceId=data.childShapes[index].resourceId; 
			 var childShapesPool= data.childShapes[index].childShapes;
			
			 if(elementType=='Pool'){
				 hasPoll=true;
				 //TODO verificare se il tag childshape contiene elementi
				 //inserisco il tag process se ha delle chid shapes associate
				//inserisco un tag process per ogni oggeto POOL
				 xmlWriterFROMJson.writeStartElement( 'process' );
			
				 xmlWriterFROMJson.writeAttributeString('id',idMapProcess[resourceId]);
				 xmlWriterFROMJson.writeAttributeString('isClosed','false');
				 xmlWriterFROMJson.writeAttributeString('isExecutable','true');
				 xmlWriterFROMJson.writeAttributeString('processType','None');
				 
				 //scendo di profondità fino alle line se presenti
				 
				 
				 $.each(childShapesPool, function(index, d){  
					 var elementTypeChildPool=childShapesPool[index].stencil.id; 
					 var element=childShapesPool[index];
					
					 var laneId=childShapesPool[index].resourceId; 
					
					 if(elementTypeChildPool=='Lane'){
						 if(!lineAdded){
							 xmlWriterFROMJson.writeStartElement( 'laneSet' );
							 lineAdded=true;
							}
						
						 //inserisco l'elemento nella mappa degli elementi
//						 idElement="_"+incrementId++;
//						 idMapElement[laneId] = idElement;
						 
						 xmlWriterFROMJson.writeStartElement( "lane" );
						 xmlWriterFROMJson.writeAttributeString('id',idMapElement[laneId]);
						 xmlWriterFROMJson.writeAttributeString('name',element.properties.name);
						 
						 //inserisco nella line tutti gli elemtni al suo interno
						 var childShapeLine=element.childShapes;
						 $.each(childShapeLine, function(index, d){  
							 //inserisco l'elemento nella mappa 
							 var childId=childShapeLine[index].resourceId; 

							 //inserisco il tag flowNodeRef
							 xmlWriterFROMJson.writeElementString( "flowNodeRef" , idMapElement[childId]);
							
							 
							 
						 });
						//end lane
						 xmlWriterFROMJson.writeEndElement();
						 laneChildAddes=true;
					 }
					 else
						 laneChildAddes=false;
					 
				 });
				 if(lineAdded )
						//end laneSet tag
						 xmlWriterFROMJson.writeEndElement();
				 //inserisco tutti gli elementi all'interno del processo
				 $.each(childShapesPool, function(index, d){  
					 var elementTypeChildPool=childShapesPool[index].stencil.id; 
					 var element=childShapesPool[index];
					
					 if(elementTypeChildPool=='Lane'){
						var childShapeLine=element.childShapes;
					//	addChildShape(childShapeLine[index],xmlWriterFROMJson);
						
						 addChildShape(childShapeLine,xmlWriterFROMJson);
//						 $.each(childShapeLine, function(index, d){  
//							 var childId=childShapeLine[index].resourceId; 
//							 var element=childShapeLine[index];
//						 		
//								var elementType=childShapeLine[index].stencil.id; 
//								console.log("elementType in line-->"+elementType)
//								if(elementType==='Task'){
//									console.log("ELEMENT IS A TASK");
//								console.log("NAME:-->"+ element.properties.name);
//									var taskType=element.properties.tasktype;
//									
//									
//									var taskTag='';
//									if(taskType==='None')
//										 taskTag='task';
//									else
//										 taskTag=taskType.toLowerCase()+'Task';
//									 xmlWriterFROMJson.writeStartElement(taskTag );
//									 xmlWriterFROMJson.writeAttributeString('completionQuantity','1');
//									 xmlWriterFROMJson.writeAttributeString('id', idMapElement[childId]);
//									 xmlWriterFROMJson.writeAttributeString('isForCompensation','false');
//									
//									 xmlWriterFROMJson.writeAttributeString('name', element.properties.name);
//									 xmlWriterFROMJson.writeAttributeString('startQuantity','1');
//									
//									 if(taskType==='Receive'||taskType==='Send'||taskType==='Service'||taskType==='User')
//										 xmlWriterFROMJson.writeAttributeString('implementation','##WebService');
//									 if(taskType==='Receive')
//										 xmlWriterFROMJson.writeAttributeString('instantiate','false');
//									
//									 $.each(element.outgoing, function(index, d){ 
//										 console.log("idMapTargetLink[resourceId]-->"+idMapTargetLink[idMapElement[childId]]);
//										 if(idMapTargetLink[idMapElement[childId]]!==undefined){
//											 xmlWriterFROMJson.writeElementString('incoming',idMapElement[idMapTargetLink[idMapElement[childId]]]);
//											 
//										 }
//									 });
//									 $.each(element.outgoing, function(index, d){ 
//									 if(element.outgoing[index].resourceId!==undefined){
//										 //memorizzo l'informazione relativa al source associato ad un link
//										 console.log("element.outgoing[index].resourceId-->"+element.outgoing[index].resourceId);
//										 console.log("idMapElement:resourceId-->"+idMapElement[childId]);
//										 
//										 idMapSourceLink[element.outgoing[index].resourceId]=idMapElement[childId];
//										 console.log()
//										 xmlWriterFROMJson.writeElementString('outgoing',idMapElement[element.outgoing[index].resourceId]);
//									 }
//									
//									 });
//					  //			end tag task
//									 xmlWriterFROMJson.writeEndElement();
////									xmlWriterFROMJson.writeStartElement('task');
////									xmlWriterFROMJson.writeAttributeString('completionQuantity','1');
////									xmlWriterFROMJson.writeAttributeString('id', idMapElement[resourceId]);
////									xmlWriterFROMJson.writeAttributeString('isForCompensation','false');
////									xmlWriterFROMJson.writeAttributeString('name',element.properties.name);
////									xmlWriterFROMJson.writeAttributeString('startQuantity','1');
////									//end tag task
////									xmlWriterFROMJson.writeEndElement();
//								}
//								if(elementType.substring(elementType.length-5, elementType.length)==='Event'){
//									console.log("ELEMENT IS A EVENT");
//									
//									var eventTag='startEvent';
//									if(elementType.substring(0, 3)==='End')
//										eventTag='endEvent';
//									
//									 xmlWriterFROMJson.writeStartElement(eventTag);
//									 xmlWriterFROMJson.writeAttributeString('id', idMapElement[childId]);
//									 $.each(element.outgoing, function(index, d){ 
//										 if(idMapTargetLink[idMapElement[childId]]!==undefined){
//											 xmlWriterFROMJson.writeElementString('incoming',idMapElement[idMapTargetLink[idMapElement[childId]]]);
//											 
//										 
//									 }
//								 });
//								 $.each(element.outgoing, function(index, d){ 
//									 if(element.outgoing[index].resourceId!==undefined){
//										 //memorizzo l'informazione relativa al source associato ad un link
//										 console.log("ELEMENT NAME : "+elementType);
//										 console.log("element.outgoing[index].resourceId-->"+element.outgoing[index].resourceId);
//										 console.log("idMapElement:resourceId-->"+idMapElement[childId]);
//										 idMapSourceLink[element.outgoing[index].resourceId]=idMapElement[childId];
//										 xmlWriterFROMJson.writeElementString('outgoing',idMapElement[element.outgoing[index].resourceId]);
//									 }
//									 });
//									// end tag event
//									 xmlWriterFROMJson.writeEndElement();
//								}
//								//gestione dei gateway
//								if(elementType.substring(elementType.length-7, elementType.length)==='Gateway'){
//									var gateType=element.properties.gatewaytype;
//									console.log("gateType-"+gateType);
//									var gatewayTag="";
//									if(gateType=="AND")
//										gatewayTag='parallelGateway';
//									if(gateType==="XOR")
//										gatewayTag='exclusiveGateway';
//									if(gateType==='OR')
//										gatewayTag='inclusiveGateway';
//										
//									console.log("ELEMENT IS A Gaterway");
//									 xmlWriterFROMJson.writeStartElement(gatewayTag);
//									 xmlWriterFROMJson.writeAttributeString('id', idMapElement[childId]);
//									 $.each(element.outgoing, function(index, d){ 
//										 if(idMapTargetLink[idMapElement[childId]]!==undefined){
//											 xmlWriterFROMJson.writeElementString('incoming',idMapElement[idMapTargetLink[idMapElement[childId]]]);
//											 
//										 }
//									 });
//									 $.each(element.outgoing, function(index, d){ 
//									 if(element.outgoing[index].resourceId!==undefined){
//										 //memorizzo l'informazione relativa al source associato ad un link
//										 console.log("ELEMENT NAME : "+elementType);
//										 console.log("element.outgoing[index].resourceId-->"+element.outgoing[index].resourceId);
//										 console.log("idMapElement:resourceId-->"+idMapElement[childId]);
//										 idMapSourceLink[element.outgoing[index].resourceId]=idMapElement[childId];
//										 xmlWriterFROMJson.writeElementString('outgoing',idMapElement[element.outgoing[index].resourceId]);
//									 }
//									 });
//									// end tag gateway
//									 xmlWriterFROMJson.writeEndElement();
//								}
//								
//								
////								if(elementType==='DataObject'){
////									
////									 xmlWriterFROMJson.writeStartElement(elementType.toLowerCase());
////									 xmlWriterFROMJson.writeAttributeString('id', idMapElement[childId]);
////									 xmlWriterFROMJson.writeAttributeString('name', element.properties.name);
////									 $.each(element.outgoing, function(index, d){ 
////										
////									 if(element.outgoing[index].resourceId!==undefined){
////										 //memorizzo l'informazione relativa al source associato ad un link
////										 console.log("ELEMENT NAME : "+elementType);
////										 console.log("element.outgoing[index].resourceId-->"+element.outgoing[index].resourceId);
////										 console.log("idMapElement:resourceId-->"+idMapElement[childId]);
////										 idMapSourceLink[element.outgoing[index].resourceId]=idMapElement[childId];
////										 xmlWriterFROMJson.writeElementString('outgoing',idMapElement[element.outgoing[index].resourceId]);
////									 }
////									 });
////									// end tag event
////									 xmlWriterFROMJson.writeEndElement();
////								}
//						 });
						
					 }
					
						 
					
				 });
				 
				
				 
				 
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
			 }
			 

			 
		 });
		 
		//end tag collaboration
	 	 xmlWriterFROMJson.writeEndElement();
	 	 //inserisco ta message
	 	if(!hasPoll){
			 console.log("SIMPLE PROCESS")
			 //Si tratta di un processo semplice
			 xmlWriterFROMJson.writeStartElement( 'process' );
				
			 xmlWriterFROMJson.writeAttributeString('id','PROCESS_0');
			 xmlWriterFROMJson.writeAttributeString('isClosed','false');
			 xmlWriterFROMJson.writeAttributeString('isExecutable','true');
			 xmlWriterFROMJson.writeAttributeString('processType','None');
			 addChildShape(data.childShapes,xmlWriterFROMJson);
				
			addAllSequenceFlow(data.childShapes, xmlWriterFROMJson);
			//end process tag
			
		 }

		 //end tag process
		 xmlWriterFROMJson.writeEndElement();
		 
		 //inserisco le Risorse presenti nel WorkFlow
		 console.log("RISORSE DA INSERIRE:--_>"+idMapResourceToTask.size);
		// $.each(idMapResourceToTask, function(indexMap, d){  
		 var sizeMap=idMapResourceName.size;
		
		 for(var indexMap=0;indexMap<idMapResourceName.size;indexMap++){  
			 console.log("Aggiungo TAG RESOURCE AL WORKFLOW");
			 
			 var idResource="RS_"+indexMap;
			
			 console.log("indexMap2-->"+idResource)
			 xmlWriterFROMJson.writeStartElement('resource' );
			 xmlWriterFROMJson.writeAttributeString('id', idResource);
			  console.log("idMapResourceName: "+idMapResourceName.get(idResource))
			 xmlWriterFROMJson.writeAttributeString('name',idMapResourceName.get(idResource));
			 
			 //chiudo tag resource
			 xmlWriterFROMJson.writeEndElement();
		 };
		 
		 //end tag definitions
		 xmlWriterFROMJson.writeEndElement();
		 xmlWriterFROMJson.writeEndDocument();
		 var textFileAsBlob = new Blob([xmlWriterFROMJson.flush()], {type:'text/xml'});
			var fileNameToSaveAs = "FileXMLFROMJSONSignavio";

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
	});
	 
//	scrivo il file di output
	
}
function addAllSequenceFlow(data, xmlWriterFROMJson){
	 $.each(data, function(index, d){  
		 addSequenceFlow(data[index], xmlWriterFROMJson)
	 });
	 
	 //TODO devo aggiungere i tag sbvrAssociationFlow recuperando l'informazione
}
function addSequenceFlow(childShapes, xmlWriterFROMJson){
	
	var elementType=childShapes.stencil.id; 
	 var element=childShapes;
	 var resourceId=childShapes.resourceId; 
	 if(elementType==='SequenceFlow'){
//		 console.log("Add sequenecFlow");
			xmlWriterFROMJson.writeStartElement('sequenceFlow' );
//			console.log("resourceId Sequence-->"+resourceId);
			xmlWriterFROMJson.writeAttributeString('id', idMapElement[resourceId]);
//			console.log("idMapSourceLink[resourceId]:"+idMapSourceLink[resourceId]);
			var sourceRef= idMapSourceLink[resourceId];
//			console.log("sourceRef:-->"+sourceRef);
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
	 else if(elementType==='Association_Undirected'){
		 xmlWriterFROMJson.writeStartElement('sbvrAssociationFlow' );
		 xmlWriterFROMJson.writeAttributeString('id', idMapElement[resourceId]);
		// var sourceRef= idMapTargetSBVRAssociation[resourceId];
		 var sourceRef= mappIncomingresourceId[resourceId];
		 console.log("SBVR  sourceRef-->"+idMapElement[sourceRef])
	
		 xmlWriterFROMJson.writeAttributeString('sourceRef', idMapElement[sourceRef]);
	     xmlWriterFROMJson.writeAttributeString('targetRef', idMapElement[element.target.resourceId]);
		 xmlWriterFROMJson.writeEndElement();
	 }
}

function addChildShape(childShapes,xmlWriterFROMJson){
	$.each(childShapes, function(index, d){            

	 	var element=childShapes[index];
 		var resourceId=childShapes[index].resourceId; 

		var elementType=childShapes[index].stencil.id; 
		//gestisco il tag SBVRAnnotation 
		if(elementType==='SBVRAnnotation'){
			xmlWriterFROMJson.writeStartElement("sbvrAnnotation");
			 xmlWriterFROMJson.writeAttributeString('id', idMapElement[resourceId]);
			 xmlWriterFROMJson.writeAttributeString('name', element.properties.text);
//			end tag sbvrAnnotation
			 xmlWriterFROMJson.writeEndElement();
		}
		if(elementType==='Task'){
			var taskType=element.properties.tasktype;
			
			
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
			addIncomingTag(element,xmlWriterFROMJson);
			addOutgoingTag(element,xmlWriterFROMJson);
			addIoSpecificationTag(element,xmlWriterFROMJson);
			addDataInputAssociationTag(element,xmlWriterFROMJson);
			addDataOutputAssociationTag(element,xmlWriterFROMJson);
			//verifico se il task ha delle risorse associate e inserire il tag relativo
			console.log("element NAME:  "+element.properties.name);
			console.log("xmlWriterFROMJson-->>>"+xmlWriterFROMJson);
			addPerformerToTask(element,xmlWriterFROMJson);

			 //aggiungo i tag relativi ai legami con il dataObject ad esso collegato se presente
			 for(var i=0;i<idMapTargetAssociation.length;i++){
				 console.log("a idMapTargetAssociation");
				 if(idMapTargetAssociation[idMapElement[resourceId]]){
					 
				 }
				 
			 }
//			end tag task
			 xmlWriterFROMJson.writeEndElement();

		}
		if(elementType.substring(elementType.length-5, elementType.length)==='Event'){
//			console.log("ELEMENT IS A EVENT");
			
			var eventTag='startEvent';
			if(elementType.substring(0, 3)==='End')
				eventTag='endEvent';
			
			 xmlWriterFROMJson.writeStartElement(eventTag);
			 xmlWriterFROMJson.writeAttributeString('id', idMapElement[resourceId]);
			 addIncomingTag(element,xmlWriterFROMJson);
			 addOutgoingTag(element,xmlWriterFROMJson);

			// end tag event
			 xmlWriterFROMJson.writeEndElement();
		}
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
				
//			console.log("ELEMENT IS A Gaterway");
			 xmlWriterFROMJson.writeStartElement(gatewayTag);
			 xmlWriterFROMJson.writeAttributeString('id', idMapElement[resourceId]);
			 addIncomingTag(element,xmlWriterFROMJson);
			 addOutgoingTag(element,xmlWriterFROMJson);

			// end tag event
			 xmlWriterFROMJson.writeEndElement();
		}
		
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
//			 if(element.attr(".itemRef/text")!==undefined && element.attr(".itemRef/text")!=="")
//				 xmlWriter.writeAttributeString('itemSubjectRef', element.attr(".itemRef/text"));
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
function  addElemtnInTargetAtrray(element,resourceId){
//	var targetElement=idMapElement[element.target.resourceId];
	
//	idMapTargetLink[targetElement]=resourceId;
	
	var targetElement=idMapElement[element.target.resourceId];
	
	if(idMapTargetLink[targetElement]===undefined)
	idMapTargetLink[targetElement] = new Array();
	
	var sizeT=idMapTargetLink[targetElement].length;
	//verifico che la risorsa target non si un data object perchè in questo caso non va inserito il tag incoming
//	var typeTarget=	verifyTypeResource(element.target.resourceId);
	
	idMapTargetLink[targetElement][sizeT++] = resourceId;
	
}

function addTargetAssociationAtrray(element,resourceId){
	var typeAssociation=element.stencil.id;
	var resourceId=element.resourceId;
	console.log("typeAssociation-->"+typeAssociation)
	//TODO GESTIRE LE ANNOTAION SBVR
	if(typeAssociation==="Association_Undirected"){
		console.log("Association_Undirected")
		 $.each(element.outgoing, function(index, d){ 
				var targetElement=idMapElement[element.outgoing[index].resourceId];
				//verifico se l'elemento target è un task se ciò si verifica 
				//memorizzo l'informazione che il task deve avere un dataInput tag
				 var typeTargetElement=idMapTypeElement[element.outgoing[index].resourceId];
		 if(typeTargetElement==="Task"){
			 //memorizzo l'informazione che il task ha una SBVRAnnotation associata
			 if( sbvrAnnotationTaskMap[element.outgoing[index].resourceId]===undefined)
				 sbvrAnnotationTaskMap[element.outgoing[index].resourceId]=new Array();
			 var sizeSBVRAnnotationMap=sbvrAnnotationTaskMap[element.outgoing[index].resourceId].length;
			 var idSBVRAnnotation="SBVRAnnotation"+targetElement+"_"+sizeSBVRAnnotationMap;
			 sbvrAnnotationTaskMap[element.outgoing[index].resourceId][sizeSBVRAnnotationMap++]=idSBVRAnnotation;
//			 console.log("ADD AN SBVR ANNOTATION: "+idSBVRAnnotation+ "FOR : "+targetElement)
		 }
		 if(idMapTargetSBVRAssociation[targetElement]===undefined)
				idMapTargetSBVRAssociation[targetElement] = new Array();
		 console.log("TARGET SBVR ASSOCIATION: "+targetElement);
		 console.log("TARGET SBVR ASSOCIATION resourceId : "+idMapElement[resourceId]);
			var sizeT=idMapTargetSBVRAssociation[targetElement].length;
			//mappa delle assocition di cui un dato elemento è target
			idMapTargetSBVRAssociation[targetElement][sizeT++] = resourceId;
			
		 });	
	}
	else
	{
	 $.each(element.outgoing, function(index, d){ 
	var targetElement=idMapElement[element.outgoing[index].resourceId];
	//verifico se l'elemento target è un task se ciò si verifica 
	//memorizzo l'informazione che il task deve avere un dataInput tag
	 var typeTargetElement=idMapTypeElement[element.outgoing[index].resourceId];
	 console.log("typeTargetElement to Association-->"+typeTargetElement);
	 if(typeTargetElement==="Task"){
		 if( dataInputTaskMap[element.outgoing[index].resourceId]===undefined)
			 dataInputTaskMap[element.outgoing[index].resourceId]=new Array();
		 var sizedataInputTaskMap=dataInputTaskMap[element.outgoing[index].resourceId].length;
		 var idDatInput="Din"+targetElement+"_"+sizedataInputTaskMap;
		 dataInputTaskMap[element.outgoing[index].resourceId][sizedataInputTaskMap++]=idDatInput;
		 console.log("ADD A DATA INPUT TAG: "+idDatInput+ "FOR : "+targetElement)
	 }
	if(idMapTargetAssociation[targetElement]===undefined)
		idMapTargetAssociation[targetElement] = new Array();
	var sizeT=idMapTargetAssociation[targetElement].length;
	//mappa delle assocition di cui un dato elemnto è target
	idMapTargetAssociation[targetElement][sizeT++] = resourceId;
	
	 });
	}
	
}

function addIncomingTag(element,xmlWriterFROMJson){
	
	var resourceId=element.resourceId;
	if(idMapTargetLink[idMapElement[resourceId]]){
		
	 $.each(idMapTargetLink[idMapElement[resourceId]], function(index, d){ 
//		 console.log("idMapTargetLink[resourceId]-->"+idMapTargetLink[idMapElement[resourceId]]);
		 if(idMapTargetLink[idMapElement[resourceId]]!==undefined){
			 var target=idMapTargetLink[idMapElement[resourceId]][index];
			 xmlWriterFROMJson.writeElementString('incoming',idMapElement[target]);
			 
		 }
	 });
	}
		

	
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
				 idMapSourceLink[element.outgoing[index].resourceId]=idMapElement[resourceId];
				 xmlWriterFROMJson.writeElementString('outgoing',idMapElement[element.outgoing[index].resourceId]);
			 }
			 else{
				 //il task ha un dataObject in output
				 if( dataOutputTaskMap[resourceId]===undefined)
					 dataOutputTaskMap[resourceId]=new Array();
				 var sizedataOutputTaskMap=dataOutputTaskMap[resourceId].length;
				 var idDatOutput="Dout"+idMapElement[resourceId]+"_"+sizedataOutputTaskMap;
				 dataOutputTaskMap[resourceId][sizedataOutputTaskMap++]=idDatOutput;
				 console.log("ADD A DATA OUTPUT TAG: "+idDatOutput+ "FOR : "+idMapElement[resourceId])
			 }
		}
		
	});
}

function addDataOutputAssociationTag(element,xmlWriterFROMJson){
	
	var resourceId=element.resourceId;
	 $.each(element.outgoing, function(index, d){ 
		 if(element.outgoing[index].resourceId!==undefined){

			// console.log("id elemento outgoing:"+element.outgoing[index].resourceId);
			 var typeSource=idMapTypeElement[element.outgoing[index].resourceId];
			// console.log("typeSource-->"+typeSource);
			 if(typeSource.substring(0,11)==='Association' && typeSource!=='Association_Undirected'){
				 xmlWriterFROMJson.writeStartElement('dataOutputAssociation' );
				 //scegliere un id univoco 
				 xmlWriterFROMJson.writeAttributeString('id', idMapElement[element.outgoing[index].resourceId]);
				 xmlWriterFROMJson.writeElementString('sourceRef',dataOutputTaskMap[resourceId][index]);
				 xmlWriterFROMJson.writeElementString('targetRef',idMapElement[  idMapOutgoingResourceIdElement[element.outgoing[index].resourceId]]);
				 //chiudo tag dataOutputAssociation
				 xmlWriterFROMJson.writeEndElement();
				 
				 
			 }
			
		 }
		
	});
	
}

function addDataInputAssociationTag(element,xmlWriterFROMJson){
	console.log("CALL addDataInputAssociationTag")
	var resourceId=element.resourceId;
	 if(idMapTargetAssociation[idMapElement[resourceId]]){
		 $.each(idMapTargetAssociation[idMapElement[resourceId]], function(index, d){ 
				 if(idMapTargetAssociation[idMapElement[resourceId]]!==undefined){
					 var target=idMapTargetAssociation[idMapElement[resourceId]][index];
					 var targetFromAssociation =idMapOutgoingResourceIdElement[target][0];
					 mappIncomingresourceId[targetFromAssociation][0];
					    xmlWriterFROMJson.writeStartElement('dataInputAssociation' );
						xmlWriterFROMJson.writeAttributeString('id', idMapElement[target]);
//						console.log("mappIncomingresourceId  PER ELEMENTO -->"+idMapElement[target]);
//						console.log("mappIncomingresourceId[target]-->"+mappIncomingresourceId[target]);
						xmlWriterFROMJson.writeElementString('sourceRef',idMapElement[mappIncomingresourceId[target][0]]);
						xmlWriterFROMJson.writeElementString('targetRef',dataInputTaskMap[resourceId][index]);
						 //chiudo tag dataOutputAssociation
						xmlWriterFROMJson.writeEndElement();
				 }
			 });
	}
	
}

function addIoSpecificationTag(element,xmlWriterFROMJson){
	console.log("CALL ADD IO SPECIFICATION");
	if(dataInputTaskMap[element.resourceId]!==undefined || dataOutputTaskMap[element.resourceId]!==undefined){
		console.log("TASK AS DATA INPUT");
		xmlWriterFROMJson.writeStartElement('ioSpecification' );
		 
		//aggiungere tanti dataInput verifica prima se il task ha dei dataOject in input
		if(dataInputTaskMap[element.resourceId])
		 for( var index=0;index<dataInputTaskMap[element.resourceId].length;index++){
			 xmlWriterFROMJson.writeStartElement('dataInput' );
			 xmlWriterFROMJson.writeAttributeString('id', dataInputTaskMap[element.resourceId][index]);
			 xmlWriterFROMJson.writeAttributeString('isCollection', 'false');
			 xmlWriterFROMJson.writeEndElement();
		 }
		//aggiungere tanti dataOutput 
		 if(dataOutputTaskMap[element.resourceId])
		 for( var index=0;index<dataOutputTaskMap[element.resourceId].length;index++){
			 console.log("ADD DAA OUTPUT TAG");
			 xmlWriterFROMJson.writeStartElement('dataOutput' );
			 xmlWriterFROMJson.writeAttributeString('id', dataOutputTaskMap[element.resourceId][index]);
			 xmlWriterFROMJson.writeAttributeString('isCollection', 'false');
			 xmlWriterFROMJson.writeEndElement();
		 }

		 xmlWriterFROMJson.writeStartElement('inputSet' );
		 addInputSet(element,xmlWriterFROMJson);
		 xmlWriterFROMJson.writeEndElement();
		 
		 xmlWriterFROMJson.writeStartElement('outputSet' );
		addOutputSet(element,xmlWriterFROMJson);
		 xmlWriterFROMJson.writeEndElement();
		 //chiudo tag ioSpecification
		 xmlWriterFROMJson.writeEndElement();
		
		
		
	}
}
function addInputSet(element,xmlWriterFROMJson){
	if(dataInputTaskMap[element.resourceId]!==undefined){
//		xmlWriterFROMJson.writeStartElement('inputSet' );
		 for( var index=0;index<dataInputTaskMap[element.resourceId].length;index++){
			 xmlWriterFROMJson.writeElementString('dataInputRefs', dataInputTaskMap[element.resourceId][index]);
		 }
		 //chiudo tag inputset
//		 xmlWriterFROMJson.writeEndElement();
	}
	
}


function addOutputSet(element,xmlWriterFROMJson){
	if(dataOutputTaskMap[element.resourceId]!==undefined){
//		xmlWriterFROMJson.writeStartElement('outputSet' );
		 for( var index=0;index<dataOutputTaskMap[element.resourceId].length;index++){
			 xmlWriterFROMJson.writeElementString('dataOutputRefs', dataOutputTaskMap[element.resourceId][index]);
		 }
		 //chiudo tag inputset
//		 xmlWriterFROMJson.writeEndElement();
	}
	
}
//TODO inserire all'interno del tag process tanti tag resource quante sono le risorse associate ai vari task 
//verificando che se esistono risorse con lo stesso nome esse fanno riferimetno ad un unica risorsa legata al processo


//TODO implementare la funzione che crea il relativo tag
function addPerformerToTask(element,xmlWriterFROMJson){
	console.log("call addPerformerToTask ");
	 var performerToTask=element.properties.resources;
	 console.log("call performerToTask 2 "+performerToTask.items);
	 //verifico se il task ha dele risorse assegnate
	
	 if(performerToTask.items)
		 {
		 console.log("IL TASK HA RISORSE");
		 $.each(performerToTask.items, function(index){
			 console.log("resource_type:-->"+performerToTask.items[index].resource_type);
			 console.log("resource:-->"+performerToTask.items[index].resource);
			 var resource_type=performerToTask.items[index].resource_type.toLowerCase();
			 console.log("resource_type-->"+resource_type);
			
			 var firstChar = performerToTask.items[index].resource_type.substr(0, 1);
			 var otherChar= performerToTask.items[index].resource_type.substr(1, performerToTask.items[index].resource_type.length);
			
			 //effettuo questa operazione per fare il modo che il tag venga scritto correttamente ovvero conl aprima lettera minuscola mentre la prima 
			 //lettera della seconda parola del nome composto si maiuscola
		
			 var resource_typeNew = firstChar.toLowerCase() + otherChar;
			
			 xmlWriterFROMJson.writeStartElement(resource_typeNew );
			 console.log("resource_typeNew: "+resource_typeNew)
			 xmlWriterFROMJson.writeAttributeString('id', idMapElement[element.resourceId]+"_RES_"+index);
			 xmlWriterFROMJson.writeElementString('resourceRef',idMapResourceToTask.get(performerToTask.items[index].resource));
			 //chiudo il tag resource_type
			 xmlWriterFROMJson.writeEndElement();
		 
		 });
		 
		 }
}































