

function checkRules(data){
			var stringError="";
			console.log("DATA CECK ERROR: "+data)
			if(data!==undefined){
	 		$.each(data.rules, function(index, d){ 
	 			var descrRule=data.rules[index].description; 
	 			var errorConnectionVal= data.rules[index].errorConnection;
	 			var allElements=graph.getElements();
				_.each(allElements, function (element) {
					 var typeId=element.attr('.typeId/text');
					console.log("TYPEID: "+typeId);
					console.log("ERROR CONNECTIONVAL: "+errorConnectionVal[0])
				//	 if(typeId !== errorConnectionVal[0]){
						 console.log("EQUAL STRING")
						  stringError= stringError+findTarget(element,errorConnectionVal[1],descrRule);
						
				//	 }
					
				});
	 			
	 		});
			}
			console.log("CHECK RULES ERROR STRING: "+ stringError)
	 		return stringError;
}
		
//controllo sintatti BPMN
function findErrorDiagramm(){
	var stringError="";
	//verifico che tutti gli elementi abbiano dei link e siano connessi ad almeno un altro elemento
	console.log("CALL FINDDIAGRAMM");
	var allElements=graph.getElements();
	_.each(allElements, function (element) {
		console.log("EACH ELEMENT: "+element.id);
		var  outLinks=graph.getConnectedLinks(element,{ outbound: true });
		var  inLinks=graph.getConnectedLinks(element,{ inbound: true });

		if(!(element instanceof joint.shapes.basic.Pool)){
			console.log("outLinks.length-->"+outLinks.length);
			console.log("inLinks.length-->"+inLinks.length);
		if(outLinks.length===0 && inLinks.length===0){
			
			stringError=stringError+"<p>-ERROR: ELEMENT (ID :"+element.id+")<br>CAUSE: Element is not connected to anything</p>";
			
			if(element instanceof joint.shapes.basic.Activity){
				element.attr('.outer/stroke','red');
				element.attr('.outer/stroke-width','2');
				element.attr('.outer/stroke-dasharray','1.1');
			}
			else
			 element.attr({rect: {stroke:'red', 'stroke-width':'2','stroke-dasharray': '1,1' }});
		}
		else{
			if(element instanceof joint.shapes.basic.Activity){
				if(element.attr('.outer/stroke')==="red")
				element.attr('.outer/stroke','white');
			}
				
			else{
				if(element.attr('rect/stroke')==="red")
					
			 element.attr({rect: {stroke:'white', 'stroke-width':'2','stroke-dasharray': '1,1' }});
			}
		}
		}
		//se si tratta di un eventi di tipo start verifico che non abbia alcun link in ingresso
		if(element instanceof joint.shapes.basic.Event && element.get('eventType')==='start'){
//			console.log("id link IN.length-->"+inLinks[0].id);
//			console.log("id link OUT.length-->"+outLinks[0].id);
			//Inserisce ssempre comunque un link in ingresso non capisco il perchè quindi efffettuo un controlo di questo tipo
			if(inLinks.length!==0){
				
				stringError=stringError+"<p>-ERROR: ELEMENT (ID :"+element.id+")<br>CAUSE: Element Start Event MUST NOT have any incoming Sequence Flows</p>";
				
				element.attr({rect: {stroke:'red', 'stroke-width':'2','stroke-dasharray': '1,1' }});
			}
			
		}
		
		//se si tratta di un eventi di tipo end  verifico che non abbia alcun link in uscita
		if(element instanceof joint.shapes.basic.Event && element.get('eventType')==='end'){
			if(outLinks.length!==0){
				stringError=stringError+"<p>-ERROR: ELEMENT (ID :"+element.id+")<br>CAUSE: Element End Event MUST NOT have any outgoing Sequence Flows</p>";
				
				element.attr({rect: {stroke:'red', 'stroke-width':'2','stroke-dasharray': '1,1' }});
			}
			
		}
		
		});
	
	//verifico che tutti i link siano associati a dei target o source
	var allLinks=graph.getLinks();
	_.each(allLinks, function (link) {
		var connectionLink=link.attr('.connection/stroke');
		if(connectionLink==='red'){
			stringError=stringError+"<p>-ERROR LINK (ID :"+link.id+")<br>CAUSE: No Target</p>";
		}
		var target=link.get('target');
		console.log("target-->"+target);
		if(target instanceof joint.shapes.basic.Pool){
			console.log("TARGET IS A POOL");
			stringError=stringError+"<p>-ERROR LINK (ID :"+link.id+")<br>CAUSE: Pool can not be a Target</p>";
			link.attr('.connection/stroke','red');
			
		}
		else{
//			console.log("TARGET IS A POOL");
//			stringError=stringError+"<p>-ERROR LINK (ID :"+link.id+")<br>CAUSE: Pool can not be a Target</p>";
//			link.attr('.connection/stroke','red');
		}
			
		//individuo tutti i link già evidenziati in rosso
		
		console.log("connectionLink : "+connectionLink);
		
	});
	console.log("STRING ERROR VALIDATE: "+ stringError);
	return stringError;
}
		

function checkDiagramm(){
			var stringError="";
			
		//	$.getJSON(filePaletteJson, function(data) {
			var	data= jsonData;
		 		
		 		//controllo che siano rispettate tutte le regole 
		 		var stringWarningsRules=checkRules(data);
		 		//Controllo che siano presenti tutti gli exitCode corretti per ogni task e non ci siano duplicati
		 		var stringWarningsExitCodes= exitCodeControl();
		 		//Controllo sui Task di tipo Send-Receive
		 		var stringWarningsSendReceive=findErrorMessageInOut();
		 		// TODO effettuare controllo che se ci sono messaggi di tipo input o output essi abbiano rispettivamente sono sequance in uscita o solo sequence in ingresso.
		 		var stringErrorMessageType=findErrorMessageType();
		 		var stringErrorDiagramm=findErrorDiagramm();
		 		var allWarnings=stringWarningsExitCodes+stringWarningsSendReceive+ stringWarningsRules+ stringErrorMessageType;
		 		if(allWarnings!=="")
		 			stringError="<p style='color: BLUE'><b> WARNINGS:</b></p>"+allWarnings;
		 		if(stringErrorDiagramm!=="")
		 		stringError=stringError+"<p  style='color: #CC0000'><b> ERRORS:</b></p>"+ stringErrorDiagramm;
		 		
		 		$( "#validateDialog" ).empty();
		 		if(stringError==""){
		 			stringError="CORRECT DIAGRAMM";
		 		}
				 $( "#validateDialog" ).append(stringError);
				 $( "#validateDialog" ).dialog({
					  width: 600,
					  modal: true,
				      buttons: {
				        Ok: function() {
				          $( this ).dialog( "close" );
				        }
				      }
				 });
		 		
	//		});
			return stringError;
	};
	//verifica che se un messagge è stato preimpostato come di input o di output nn abbia erronei link associati
	function findErrorMessageType(){
		var stringError="";
		var allElements=graph.getElements();
		_.each(allElements, function (element) {
			var  outLinks=graph.getConnectedLinks(element,{ outbound: true });
			var  inLinks=graph.getConnectedLinks(element,{ inbound: true });
			console.log("element.attr('.typeMessage/text')--->"+element.attr('.typeMessage/text'));
			console.log("outLinks Message--->"+outLinks.legth);
			console.log("inLinks.legth Message>"+inLinks.legth);
			//effettuo i controlli sl sui tipo gateway
			if(element.attr('.tipologia/text')==='Message' ){
				if(element.attr('.typeMessage/text')==='Output' && outLinks.length!==0){
					 element.attr('.outer/stroke','blue');
					 element.attr('.outer/stroke-width','2');
					 element.attr('.outer/stroke-dasharray','1.1');
					 stringError=stringError+"<p>-ERROR:MESSAGED (ID :"+element.id+")<br>CAUSE: Message Type Output with outbound link Connected</p>";
				}
				else if(element.attr('.typeMessage/text')==='Input' && inLinks.length!==0){
					 element.attr('.outer/stroke','blue');
					 element.attr('.outer/stroke-width','2');
					 element.attr('.outer/stroke-dasharray','1.1');
					 stringError=stringError+"<p>-ERROR:MESSAGED (ID :"+element.id+")<br>CAUSE: Message Type Input with inbound link Connected</p>";
				}
					
				
			}
		});
		return stringError;
	}
		function exitCodeControl(){
			var stringError="";
			
			var allElements=graph.getElements();
			_.each(allElements, function (element) {
				//effettuo i controlli sl sui tipo gateway
				if(element.attr('.tipologia/text')==='Gateway' ){
					var result=true;
				var exitCodesGateway=element.attr('.exitCodes/text');
					if(exitCodesGateway!==undefined){
					var nameLinkArray=new Array();
					//recupero tutti i link in uscita
					 var  outboundLinks=graph.getConnectedLinks(element,{ outbound: true });
					 //inserisco tutti nomi dei link in uscita in un array
					 for (var i=0;i<outboundLinks.length;i++) {
						 nameLinkArray[i]=outboundLinks[i].attributes.labels[0].attrs.text.text;
					 }

				 if(nameLinkArray.length===exitCodesGateway.length){
					 for (var i=0;i<exitCodesGateway.length;i++) {
						var c=0;
						 for (var j=0;j<nameLinkArray.length;j++) {
						 if(exitCodesGateway[i]===nameLinkArray[j]){
							
							 c++;
						 }
						 }
						 if(c>1) {result=false;}
						 }
					 }
					 else
						 result=false;
				 
				 if(!result){
					 stringError=stringError+"<p><b>-WARNING:</b> GATEWAY (ID :"+element.id+")<br>CAUSE:Check that the number and type of exit codes are correct</p>";
					 element.attr({rect: {stroke:'blue', 'stroke-width':'2','stroke-dasharray': '1,1' }});
				 }
				 else{
					 element.attr({rect: {stroke:'white', 'stroke-width':'2','stroke-dasharray': '1,1' }});
				 }
				}
				}
				 
			});
			
			return stringError;
		};
		function findErrorMessageInOut(){
			var  stringError="";
			var allElements=graph.getElements();
			_.each(allElements, function (element) {
				
				//considero solo gli elementi di tipo Task
		if(element.attr('.tipologia/text')==='Task' ){
			 var typeTask=element.get('taskType');
			 if(typeTask==="receive"){
				 
				 var  inboundLinks=graph.getConnectedLinks(element,{ inbound: true });
				 var message=false;
				 _.each(inboundLinks, function (link) {
						
					 var	 targetID=link.get('source').id;
						 
					 var targetCell=graph.getCell(targetID);
					
					 var tipologiaTarget=targetCell.attr('.tipologia/text');
					 if(tipologiaTarget==='Message'){
						 message=true;
					 }
					 
				 });
				 //se il task non ha alcun messaggio in ingresso genero un warning
				 if(!message){
					 element.attr('.outer/stroke','blue');
					 element.attr('.outer/stroke-width','2');
					 element.attr('.outer/stroke-dasharray','1.1');
					 stringError=stringError+"<p>"+"-WARNING:Task "+"<b>"+element.get('content')+"</b>"+" (ID:"+element.id+")"+"<br>CAUSE: Receive Task without incoming message "+"</p>";
						// alert("Task di tipo receive non ha alcun messaggio in ingresso");
				 }
				 else{
					 element.attr('.outer/stroke','white');
				 }
				 
			 }
				 
			 if(typeTask==="send"){
				 
				 var  outboundLinks=graph.getConnectedLinks(element,{ outbound: true });
				 var message=false;
				 _.each(outboundLinks, function (link) {
						
					 var	 targetID=link.get('target').id;
						 
					 var targetCell=graph.getCell(targetID);
					
					 var tipologiaTarget=targetCell.attr('.tipologia/text');
					
					 if(tipologiaTarget==='Message'){
						 message=true;
					 }
					 
				 });
				 //se il task non ha alcun messaggio in ingresso genero un warning
				 if(!message){
					 element.attr('.outer/stroke','blue');
					 element.attr('.outer/stroke-width','2');
					 element.attr('.outer/stroke-dasharray','1.1');
					 stringError=stringError+"<p>"+"-WARNING:Task "+"<b>"+element.get('content')+"</b>"+" (ID:"+element.id+")"+"<br>CAUSE: Send Task without outcoming messag"+"</p>";
					// alert("Task di tipo send non ha alcun messaggio in uscita");
				 }
				 
			 }
			
		}
			});
			return stringError;
		};
		
		
		function findTarget(element,errorId,descrRule){
			console.log("CALL FIND TARGET")
			var stringError="";
			var  connectedLinks=graph.getConnectedLinks(element,{ outbound: true });
			 _.each(connectedLinks, function (link) {
				
			 var	 targetID=link.get('target').id;
				 
			 var targetCell=graph.getCell(targetID);
			
			 if(targetID!==undefined){
			 var tipologiaTarget=targetCell.attr('.tipologia/text');
			
			 //se è un task verifico il suo typeId NB: attualmente il controllo vien effettuato sulla compatibilità solo sui task
			 if(tipologiaTarget==='Task'){
				 var typeIDTarget=targetCell.attr('.typeId/text');
				 console.log("typeIDTarget: "+typeIDTarget );
				 console.log("errorId: "+errorId )
				 if(typeIDTarget===errorId){
					 stringError=stringError+"<p>"+"-WARNING: Task "+"<b>"+element.get('content')+"</b>"+" (ID:"+element.id+")<br>CAUSE: "+descrRule+"</p>";
						
					 link.attr({
		    	        	'.marker-target': {fill: 'blue',d: 'M 10 0 L 0 5 L 10 10 z'},
		    	        	'.connection' : { stroke: 'blue' },
		    	        	
		        	 });
				 }
					 
					 
			 }
			 //altrimenti ricerco i link collegati all'elemento successivo
			 else{
				 findTarget(targetCell,errorId);
				
			 }
			 }

			 });
			
			return stringError;
		}