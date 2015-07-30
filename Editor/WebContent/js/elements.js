 var before;
 var moving_entity;
 var vertices;		
// joint.shapes.basic.SelectorRect= joint.dia.Element.extend({
//	  markup: '<g class="rotatable"><g class="scalable"><rect /></g></g>',
//
//	 defaults: joint.util.deepSupplement({
//		  type: 'basic.SelectorRect',
//		  attrs: {
//			  rect: {
//				  fill: 'red', 
//				 
//         },
//		  }
//	 }, joint.dia.Element.prototype.defaults)
// });
// joint.shapes.basic.SelectorRectView = joint.dia.ElementView.extend({
////	 pointerdown: function(evt, x, y) {
////	        var position = this.model.get('position');
////	        var size = this.model.get('size');
////	        var center = g.rect(position.x, position.y, size.width, size.height).center();
////	        var parent=this.model.get('parent');
////	 		 var  cellParent=graph.getCell(parent);
////	        var intersection = cellParent.intersectionWithLineFromCenterToPoint(center);
////	        joint.dia.ElementView.prototype.pointerdown.apply(this, [evt, intersection.x, intersection.y]);
////	    },
//	 pointermove: function(evt, x, y) {
//		 
//		 var parent=this.model.get('parent');
//	 		 var  cellParent=graph.getCell(parent);
//	 	console.log("cellParent  SELECTOR-->"+cellParent)
//	         joint.dia.ElementView.prototype.pointermove.apply(this, [evt, cellParent.getBBox().x-5,cellParent.getBBox().y-5]);
//	    }
//	});
 joint.shapes.basic.Pool= joint.dia.Element.extend({

	    markup: ['<g class="rotatable">',
	             '<g class="scalable"><rect class="body outer"/><rect class="body inner "/></g>',
	              '<rect class="header"/><text class="label"/>',
	             '<g class="lanes"/>',
	             '</g>'].join(''),

	    laneMarkup: '<g class="lane"><rect class="lane-body"/><rect class="lane-header"/><text class="lane-label"/></g>',

	    defaults: joint.util.deepSupplement({

	        type: 'basic.Pool',

	        size: {
	            width: 850,
	            height: 400
	        },
	        attrs: {
	        	 
	            '.body': {
	                fill: '#ffffff',
	                stroke: '#000000',
	               
	               
	            },
	            
	     
	            '.outer': {
	            	 fill: 'white',
	            	 stroke: 'white',
	            	 width: 170,
		             height:400,
		          
	                	
	            },
	            '.inner': {
	                transform: ' translate(2,4)',
	               // fill: 'blue',
	                stroke: '#000000',
	                width: 165,
	                height: 380,
	               
	                	
	            },
	            '.header': {
	                fill:'#ffffff',
	                stroke: '#000000',
	                width: 20,
	                ref: '.inner',
	                'ref-x': 1,
	                'ref-y': 1,
	               
	                'ref-height': 1,
	                'pointer-events': 'visiblePainted'
	            },
	            '.label': {
	                transform: 'rotate(-90)' ,
	                ref: '.header',
	                'ref-x': 10,
	                'ref-y': .4,
	                'font-family': 'Arial',
	                'font-size': 14,
	                'x-alignment': 'middle',
	                'text-anchor': 'middle'
	            },
	            '.lane-body': {
	                fill:'#ffffff',
	                stroke: '#000000',
	                'pointer-events': 'stroke'
	            },
	            '.lane-header': {
	                fill:'#ffffff',
	                stroke: '#000000',
	                'pointer-events': 'visiblePainted'
	            },
	            '.lane-label': {
	                transform: 'rotate(-90)',
	                'text-anchor': 'middle',
	                'font-family': 'Arial',
	                'font-size': 13
	            },
	          
	        }

	    }, joint.dia.Element.prototype.defaults)
	});
 
 
 joint.shapes.basic.PoolView = joint.dia.ElementView.extend({
	    pointerdown: function(evt,x,y) {
	        joint.dia.ElementView.prototype.pointerdown.apply(this, arguments);
	        
	        var bbox = this.getBBox();
	        var strokeWidth = this.model.attr('.outer/stroke-width') || 1;
	       
	      //  console.log(isBorderClicked(bbox, x, y, strokeWidth));

	    }
	});
 
joint.shapes.basic.BpmnLink = joint.dia.Link.extend({
	 defaults:{
		  type: 'basic.BpmnLink',
		  attrs: {
			  '.marker-target': {
	                 d: 'M 10 0 L 0 5 L 10 10 z'
	              },
	            '.connection' : { stroke: 'black' },
	             '.tipologia':{text:'sequenceFlowLink'},
	            '.notes':{text:''}

		    },
		    labels: [
		        { position: .5, attrs: { text: { text: '' ,'font-size':'10'} } }
		    ],
		    
    },
	    
	
});

//joint.shapes.basic.GatewayView = joint.dia.ElementView.extend({
//    pointerdown: function(evt,x,y) {
//        joint.dia.ElementView.prototype.pointerdown.apply(this, arguments);
//        console.log('View gateway');
//        var bbox = this.getBBox();
//        var strokeWidth = this.model.attr('circle/r') || 1;
//        this.model.attr('circle/fill','blue');
//        console.log('bbox X:'+bbox.x);
//        console.log('bbox Y:'+bbox.y);
//        console.log('strokeWidth:'+strokeWidth);
//        console.log(' X:'+x);
//        console.log(' Y:'+y);
//        if((x<=bbox.x+strokeWidth)&&(y<=bbox.y+strokeWidth)){
//        	if(this.trigger('pointermove', evt))
//        		console.log("")
//        	//this.trigger('pointermove', evt);
//        	 console.log("On circle");
//        }
//      //  console.log(isBorderClicked(bbox, x, y, strokeWidth));
//
//    }, 
//   
//});
joint.shapes.basic.Gateway = joint.dia.Element.extend({

    markup: '<g class="rotatable"><g class="scalable"><rect /><polygon class="body"></polygon><image/></g></g><text class="label"/>',

    defaults: joint.util.deepSupplement({

        type: 'basic.Gateway',
      //  size: { width: 90, height: 90 },
        attrs: {
            '.body': {
                points: '40,0 80,40 40,80 0,40',
                fill: '#ffffff',
                stroke: '#000000',
                
            },
      
            'rect': { fill: 'white', 
            		 stroke: 'white', 
            		 'follow-scale': true,
            		 width: 78,
            		 height: 80 ,
            		 magnet:true
            },
           
            '.label': {
                text: '',
                ref: '.body',
                'ref-x': .5,
                'ref-dy': 20,
                'y-alignment': 'middle',
                'x-alignment': 'middle',
                'font-size': 14,
                'font-family': 'Arial, helvetica, sans-serif',
                fill: '#000000'
            },
            '.notes':{text:''},
            '.resourceProperty':{text:''},
            
            image: {
                width:  40, height: 40, 'xlink:href': '', transform: 'translate(20,20)'
            }
        },
        
        gatewayType: "default",
        fixedType: false
        
    }, joint.dia.Element.prototype.defaults),
    
    
    initialize: function() {
    	
        joint.dia.Element.prototype.initialize.apply(this, arguments);

        this.listenTo(this, 'change:gatewayType', this.onGatewayTypeChange);
        this.listenTo(this, 'change:attrs ', this.onGatewayTypeChange);

        this.onGatewayTypeChange(this, this.get('gatewayType'));
    },

    onGatewayTypeChange: function(cell, type) {
    	
    	 switch (type) {

        case 'default':
        	cell.attr('image/xlink:href', '');
            break;

        case 'exclusive':
        	cell.attr('image/xlink:href', 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiBoZWlnaHQ9IjI0cHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0cHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik0yMi4yNDUsNC4wMTVjMC4zMTMsMC4zMTMsMC4zMTMsMC44MjYsMCwxLjEzOWwtNi4yNzYsNi4yN2MtMC4zMTMsMC4zMTItMC4zMTMsMC44MjYsMCwxLjE0bDYuMjczLDYuMjcyICBjMC4zMTMsMC4zMTMsMC4zMTMsMC44MjYsMCwxLjE0bC0yLjI4NSwyLjI3N2MtMC4zMTQsMC4zMTItMC44MjgsMC4zMTItMS4xNDIsMGwtNi4yNzEtNi4yNzFjLTAuMzEzLTAuMzEzLTAuODI4LTAuMzEzLTEuMTQxLDAgIGwtNi4yNzYsNi4yNjdjLTAuMzEzLDAuMzEzLTAuODI4LDAuMzEzLTEuMTQxLDBsLTIuMjgyLTIuMjhjLTAuMzEzLTAuMzEzLTAuMzEzLTAuODI2LDAtMS4xNGw2LjI3OC02LjI2OSAgYzAuMzEzLTAuMzEyLDAuMzEzLTAuODI2LDAtMS4xNEwxLjcwOSw1LjE0N2MtMC4zMTQtMC4zMTMtMC4zMTQtMC44MjcsMC0xLjE0bDIuMjg0LTIuMjc4QzQuMzA4LDEuNDE3LDQuODIxLDEuNDE3LDUuMTM1LDEuNzMgIEwxMS40MDUsOGMwLjMxNCwwLjMxNCwwLjgyOCwwLjMxNCwxLjE0MSwwLjAwMWw2LjI3Ni02LjI2N2MwLjMxMi0wLjMxMiwwLjgyNi0wLjMxMiwxLjE0MSwwTDIyLjI0NSw0LjAxNXoiLz48L3N2Zz4=');

            break;

        case 'inclusive':
        	cell.attr('image/xlink:href', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gULEBE3DEP64QAAAwlJREFUaN7dmktrU0EUx38ZmmBbfEIL2hSjkYKC1EW6EDFudC+404/gE6WKSvGxERQfIH4AX1T9EOKrCrYurVrbgsZWoaBVixDbpC6ci+Fyz9ybZG478cBs7syc+Z+5c86c+c8ksCPrgW1ADtgEbARafG1+AW+AYWAIGADGWUTZAJwHxoD5GssocA7ILiTwLcADoFQHcH8pAfeB7jiBtwO3gLJF4P5S1mO02wa/C5iMEbi/TAI7bYE/Y3m5VLOs+sLAJULqrgKHIxhZBp4DT4FX2jkLGoinq1M7fg7YDmwFVATd14CjFboiy5UIs/QBOAmka/izaeCU1hE2zuVqlZ8IUfgVOAA0WViiTcBBrdM0Zm9UhTuAOYOiRzXOeJh0Ak8M484B+TAlK4BPBiU3gWSMoTqpw6g0fgFYblJww9D5dojT25IEcMeA47rUsdsQLp9FmPmURSNSOqpJS2lzUKd+ocN3IBNx5mz+oXXADwHTXX/jjMFxjy1iwtgrYJoF1lY27BMafozZaaMspYKA7XRlw7f1xt4Y5biA7bXXIGv4TW0OGNCmsQRhzCidlwTJADDlgAFTwAuhLq+AHqHyMe6IhKVHAV1C5ZBDBkhYupThPPreIQNGJTJBGXKLLw4Z8NmQu/Fb8PCkQwakBIxFRWPLvAJmhMpWh4AuFb7PKGBaqFzjkAGrhe/TSjNrQZJ1yAAJy5gCRoTKnEMGSFhGFDBoOBu7IhKWQe8wLRFLHQ6A7zCcFNNK59vvAjoqYK8DBuwTCLBhTUD8Hweahj9S2jjU297VqzrU26BVmi2yEjXRKg1PbHnpqYla7AeWxAi+GbhHHdSit2mYyN2XQQ5kQTJ6Y6qL3PUkCr2+H7v0+jcs0eueRLngGNeKa9mxY73g8JzpEtHusorAQ/7e+e7WUWIl//jSVTrK7QEu6KgW9d7tYr3B44iBWPJfkZZ8pZ4r2VngkC0HywMTLNwN5YSBcKtZWoGzernEBbyox2iJc6Np2KcGfnHisYet1CDouc2yCjbhp07MrD+3+QNxi4JkAscRswAAAABJRU5ErkJggg==');

            break;
            
        case 'parallel':

        	cell.attr('image/xlink:href', 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiBoZWlnaHQ9IjI0cHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0cHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIyLjUsMTRIMTR2OC41YzAsMC4yNzYtMC4yMjQsMC41LTAuNSwwLjVoLTRDOS4yMjQsMjMsOSwyMi43NzYsOSwyMi41VjE0SDAuNSAgQzAuMjI0LDE0LDAsMTMuNzc2LDAsMTMuNXYtNEMwLDkuMjI0LDAuMjI0LDksMC41LDlIOVYwLjVDOSwwLjIyNCw5LjIyNCwwLDkuNSwwaDRDMTMuNzc2LDAsMTQsMC4yMjQsMTQsMC41VjloOC41ICBDMjIuNzc2LDksMjMsOS4yMjQsMjMsOS41djRDMjMsMTMuNzc2LDIyLjc3NiwxNCwyMi41LDE0eiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+');
            break;

        }
    }

});



joint.shapes.basic.Event = joint.dia.Element.extend({

		    markup: '<g class="rotatable"><g class="scalable"><rect /><circle class="body outer"/><circle class="body inner"/><image/></g><text class="label"/></g>',

		    defaults: joint.util.deepSupplement({

		        type: 'basic.Event',
		        size: { width: 60, height: 60 },
		        attrs: {
		            '.body': {
		                fill: '#ffffff',
		                stroke: '#000000'
		            },
		            'rect': { fill: 'white', 
	            		 stroke: 'white', 
	            		 'follow-scale': true,
	            		 width: 62,
	            		 height: 62 ,
	            		 
	            },
		            '.outer': {
		                'stroke-width': 1, r:30,
		                transform: 'translate(30,30)',
		                	magnet:true
		            },
		            '.inner': {
		                'stroke-width': 1, r: 26,
		                transform: 'translate(30,30)'
		            },
		            image: {
		                width:  40, height: 40, 'xlink:href': '', transform: 'translate(10,10)'
		            },
		            '.label': {
		                text: '',
		                fill: '#000000',
		                'font-family': 'Arial', 'font-size': 14,
		                ref: '.outer', 'ref-x': .5, 'ref-dy': 20,
		                'x-alignment': 'middle', 'y-alignment': 'middle'
		            },
		            '.notes':{text:''},
		            '.resourceProperty':{text:''}
		            
		        },
		        eventType: "start",
		        actionType:"none",
		        fixedType: false

		    }, joint.dia.Element.prototype.defaults),

		    initialize: function() {

		        joint.dia.Element.prototype.initialize.apply(this, arguments);

		        this.listenTo(this, 'change:eventType', this.onEventTypeChange);

		        this.onEventTypeChange(this, this.get('eventType')); 
		       
		        this.onEventActionChange(this, this.get('actionType'));
		    },

		    onEventTypeChange: function(cell, type) {
		    	 switch (type) {

		        case 'start':

		            cell.attr({
		                '.inner': {
		                    visibility: 'hidden'
		                },
		                '.outer': {
		                    'stroke-width': 1
		                }
		            });

		            break;

		        case 'end':

		            cell.attr({
		                '.inner': {
		                    visibility: 'hidden'
		                },
		                '.outer': {
		                    'stroke-width': 5
		                }
		            });

		            break;

		        case 'intermediate':

		            cell.attr({
		                '.inner': {
		                    visibility: 'visible'
		                },
		                '.outer': {
		                    'stroke-width': 1
		                }
		            });

		            break;

		        default:

		            throw "BPMN: Unknown Event Type: " + type;

		            break;
		        }
		    },
		    onEventActionChange: function(cell, type) {
		    	
		    	 switch (type) {

		        case 'none':
		        	cell.attr('image/xlink:href', '');
		            break;

		        case 'message':
		        	cell.attr('image/xlink:href', 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUxMiA1MTIiIGhlaWdodD0iNTEycHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iNTEycHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik00NzkuOTk4LDY0SDMyQzE0LjMyOSw2NCwwLDc4LjMxMiwwLDk2djMyMGMwLDE3LjY4OCwxNC4zMjksMzIsMzIsMzJoNDQ3Ljk5OEM0OTcuNjcxLDQ0OCw1MTIsNDMzLjY4OCw1MTIsNDE2Vjk2ICBDNTEyLDc4LjMxMiw0OTcuNjcxLDY0LDQ3OS45OTgsNjR6IE00MTYsMTI4TDI1NiwyNTZMOTYsMTI4SDQxNnogTTQ0OCwzODRINjRWMTYwbDE5MiwxNjBsMTkyLTE2MFYzODR6Ii8+PC9zdmc+');

		            break;

		        case 'timer':
		        	cell.attr('image/xlink:href', 'img/icon/timerIcon.png');
		            break;
		            
		        case 'conditional':

		        	cell.attr('image/xlink:href', 'img/icon/textIcon.jpg');
		        	break;
		        case 'signal':

		        	cell.attr('image/xlink:href', 'img/icon/signalIcon.jpg');
		        	break;
		            
		        case 'multiple':

		        	cell.attr('image/xlink:href', 'img/icon/multipleIcon.jpg');
		        	break;
		            
		        case 'cancel':

		        	cell.attr('image/xlink:href', 'img/icon/cancelIcon.png');
		        	break;
		            
		        case 'error':

		        	cell.attr('image/xlink:href', 'img/icon/errorIcon.jpg');
		        	break;
		        case 'escalation':

		        	cell.attr('image/xlink:href', 'img/icon/escalationIcon.png');
		        	break;
		        case 'compensation':

		        	cell.attr('image/xlink:href', 'img/icon/compensationIcon.jpg');
		        	break;
		        case 'terminate':

		        	cell.attr('image/xlink:href', 'img/icon/terminateIcon.png');
		        	break;
		        case 'parallelmultiple':

		        	cell.attr('image/xlink:href', 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiBoZWlnaHQ9IjI0cHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0cHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIyLjUsMTRIMTR2OC41YzAsMC4yNzYtMC4yMjQsMC41LTAuNSwwLjVoLTRDOS4yMjQsMjMsOSwyMi43NzYsOSwyMi41VjE0SDAuNSAgQzAuMjI0LDE0LDAsMTMuNzc2LDAsMTMuNXYtNEMwLDkuMjI0LDAuMjI0LDksMC41LDlIOVYwLjVDOSwwLjIyNCw5LjIyNCwwLDkuNSwwaDRDMTMuNzc2LDAsMTQsMC4yMjQsMTQsMC41VjloOC41ICBDMjIuNzc2LDksMjMsOS4yMjQsMjMsOS41djRDMjMsMTMuNzc2LDIyLjc3NiwxNCwyMi41LDE0eiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+');
		            break;


		        }
		    }

		});
		//Message
		joint.shapes.basic.Message = joint.dia.Element.extend({

		    markup: '<g class="rotatable"><g class="scalable"><rect /><polygon class="body inner"/></g><text class="label"/></g>',

		    defaults: joint.util.deepSupplement({

		        type: 'basic.Message',
		        size: {
		            width: 70,
		            height: 50
		        },
		        attrs: {
		            '.body': {
		                points: '0,0 60,0 60,40 0,40 0,0 60,0 30,20 0,0',
		                stroke: '#000000',
		                fill: '#ffffff'
		            },
		            'rect': { fill: 'white', 
	            		 stroke: 'white', 
	            		 'follow-scale': true,
	            		 width: 65,
	            		 height: 45 ,
	            		 magnet:true
	            },
		           
		            '.inner': {
		                transform: 'scale(0.9,0.9) translate(5,5)',
		                	
		            },
		            '.label': {
		                ref: '.body',
		                'ref-x': .5,
		                'ref-dy': 5,
		                text: '',
		                'text-anchor': 'middle'
		            },
		            '.notes':{text:''},
		            '.sender':{text:'Default Sender'},
		            '.receiver':{text:'Default Receiver'},
		            '.typeMessage':{text:'Default'},
		            '.resourceProperty':{text:''},
		            '.itemRef':{text:''}
		        }

		    }, joint.dia.Element.prototype.defaults)
		});
		// Data Object

		joint.shapes.basic.DataObject = joint.dia.Element.extend({

		    markup: '<g class="rotatable"><g class="scalable"><rect /><polygon class="body inner"/></g><text class="label"/></g>',

		    defaults: joint.util.deepSupplement({

		        type: 'basic.DataObject',
		        size: {
		            width: 80,
		            height: 100
		        },
		        attrs: {
		            '.body': {
		                points: '20,0 60,0 60,80 0,80 0,20 20,0 20,20 0,20',
		                stroke: '#000000',
		                fill: '#ffffff',
		               
		                	
		                
		            },
		            'rect': { 
		            	 fill: 'white', 
		            	 'stroke-width':'0',
		            	 stroke:'white',
		            	 'stroke-dasharray': '0',
		            	 'follow-scale': true,
	            		 width: 70,
	            		 height: 100 ,
	            		 magnet:true
	            },
	            '.inner': {
	                transform: 'scale(0.9,0.9) translate(5,5)',
	                	
	            },
		            '.label': {
		                ref: '.body',
		                'ref-x': .5,
		                'ref-dy': 5,
		                text: '',
		                'text-anchor': 'middle'
		            },
		            '.notes':{text:''},
		            '.resourceProperty':{text:''},
		            '.dataState':{text:''},
		            '.itemRef':{text:''}
		        },
		       

		    }, joint.dia.Element.prototype.defaults)
		});
		//Activity with exitCode
//		joint.shapes.basic.ActivityExitCode=joint.dia.Element.extend({
//
//
//		    markup: '<g class="rotatable"><g class="scalable"><rect  class="inner"/><line class="link"/><polygon class="body"></polygon><image/></g></g><text class="label"/>',
//
//		    defaults: joint.util.deepSupplement({
//
//		        type: 'basic.ActivityExitCode',
//		        size: { width: 150, height: 100 },
//		        attrs: {
//		        	 rect: {
//			                rx: 8,
//			                ry: 8,
//			                
//			            },
//			            
//		            '.body': {
//		                points: '40,0 80,40 40,80 0,40',
//		                fill: '#ffffff',
//		                stroke: '#000000',
//		                'follow-scale': true,
//		                transform: ' translate(150,40)',
//		                width: 50, height: 50,
//		                magnet:true
//		                
//		            },
//		            '.link':{
//		            	x1:'130',
//		            	y1:'80',
//		            	x2:'150',
//		            	y2:'80',
//		            	stroke:'black',
//		            	//stroke-width:'2'
//		                    
//		              
//		            },
//		            '.inner': {
//		            	
//		            	fill: 'white',
//		            	 stroke: '#000000',
//		                transform: ' translate(30,30)',
//		                'follow-scale': true,
//		                width: 100, height: 100
//		               
//		                	
//		            },
//		            '.label': {
//		                text: '',
//		                ref: '.body',
//		                'ref-x': .5,
//		                'ref-dy': 20,
//		                'y-alignment': 'middle',
//		                'x-alignment': 'middle',
//		                'font-size': 14,
//		                'font-family': 'Arial, helvetica, sans-serif',
//		                fill: '#000000'
//		            },
//		        }
//
//		    }, joint.dia.Element.prototype.defaults)
//		});
		
//		joint.shapes.basic.Activity =joint.dia.Element.extend({
//
//		    markup: '<g class="rotatable"><g class="scalable"><rect class="body outer"/><rect class="body inner"/><rect class="card"/><image/></g><text class="owned"/><text class="rank"/><text class="name"/><g></g></g>',
//
//		    defaults: joint.util.deepSupplement({
//
//		        type: 'basic.Activity',
//		        
//			name: 'PROVA',
//		        attrs: {
//
//		            rect: {  rx: 8,
//		                ry: 8,
//		                 },
//
//		            '.body': {
//		                fill: '#ffffff',
//		                stroke: '#000000',
//		                
//		                
//		            },
//		     
//		            '.outer': {
//		            	 fill: 'white',
//		            	 stroke: 'white',
//		            	 width: 400,
//			                height:400,
//			                magnet:true
//		                	
//		            },
//		            '.inner': {
//		                transform: ' translate(30,30)',
//		                width: 340,
//		                height: 340,
//		               
//		                	
//		            },
//		            image: {
//				        width: 48, height: 48,
//		                ref: '.card', 'ref-x': 10, 'ref-y': 5
//		            },
//
//		            '.owned': {
//		                ref: '.inner',
//		                'ref-x': 272,
//		                'ref-y': 0.16,
//		                'x-alignment': 'middle',
//		                'y-alignment': 'middle'
//		            },
//
//		            '.name': {
//		                ref: '.inner', 'ref-x': 0.7, 'ref-y': 0.25,
//				        'text-anchor': 'middle'
//		            },
//
//		            '.rank': {
//		                ref: '.inner', 'ref-x': 0.89, 'ref-y': 0.65,
//				        'text-anchor': 'middle'
//		            },
//
//		            '.label': {
//		            	'text-anchor': 'middle',
//		            	'font-size': 12,
//		                
//		                 y: '0.9em',
//		             }
//		        }, 
//		        taskType:''
//		    }, joint.dia.Element.prototype.defaults),
//		    
//		    onTaskTypeChange: function(cell, type) {
//		    	 switch (type) {
//
//		    	  case 'default':
//			        	
//			            break;
//		    	  case 'service':
//			        	cell.attr('image/xlink:href', 'img/icon/timerIcon.png');
//			            break;
//		    	  case 'user':
//			        	cell.attr('image/xlink:href', 'img/icon/userIcon.jpg');
//			            break;
//		    	  case 'manual':
//			        	cell.attr('image/xlink:href', 'img/icon/timerIcon.png');
//			            break;
//		    	  case 'script':
//			        	cell.attr('image/xlink:href', 'img/icon/timerIcon.png');
//			            break;
//			            
//		        }
//		    },
//		});
		// Activity TEXTBLOCK
		joint.shapes.basic.ActivityView = joint.shapes.basic.TextBlockView;
		joint.shapes.basic.Activity = joint.shapes.basic.TextBlock.extend({
			  markup: '<g class="rotatable"><g class="scalable"><rect class="body outer"/><rect class="body inner"/></g><switch><foreignObject requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" class=" body fobj"><body xmlns="http://www.w3.org/1999/xhtml"><div/></body></foreignObject><text class="content"/></switch><image/></g>', 
			   
			             defaults: joint.util.deepSupplement({

		       
		        type: 'basic.Activity',
		        attrs: {
		            rect: {
		                rx: 8,
		                ry: 8,
		                
		            },
		            
		            '.body': {
		                fill: '#ffffff',
		                stroke: '#000000',
		                
		                
		            },
		     
		            '.outer': {
		            	 fill: 'white',
		            	 stroke: 'white',
		            	 width: 400,
			                height:400,
			                magnet:true
		                	
		            },
		            '.inner': {
		                transform: ' translate(30,30)',
		                width: 340,
		                height: 340,
		               
		                	
		            },
		            image: {
		            	ref: '.inner',
		                'ref-x': 5,
		               'ref-y': 7,
		                width: 13,
		                height: 13,
		                'xlink:href': ''
		                
		            },
		            '.label': {
		                ref: '.body',
		                'ref-x': .5,
		                'ref-dy': 5,
		                text: '',
		                'text-anchor': 'middle'
		            },  
		            '.notes':{text:''},
		            '.resourceProperty':{text:''}
		        },
		        content: {
		        	text:'',
		        	  'text-anchor': 'middle',
		        	 
		        	 
		        },

		        '.fobj': {
		        	
		        //	 width:100, height: 60,
		        	 ref: '.inner',
//		                'ref-x': 10,
//		               'ref-y': 10,
	         //       transform: ' translate(20,20)',
	                
	                 },
				   
		        taskType:'default'
		        
		      
		   }, joint.shapes.basic.TextBlock.prototype.defaults),
		  
		    onTaskTypeChange: function(cell, type) {
		    	 switch (type) {

		    	  case 'default':
		    		  cell.attr('image/xlink:href', '');
			            break;
		    	  case 'service':
			        	cell.attr('image/xlink:href', 'img/icon/serviceIcon.jpg');
			            break;
		    	  case 'user':
			        	cell.attr('image/xlink:href', 'img/icon/userIcon.jpg');
			            break;
		    	  case 'manual':
			        	cell.attr('image/xlink:href', 'img/icon/handIcon.png');
			            break;
		    	  case 'script':
			        	cell.attr('image/xlink:href', 'img/icon/textIcon.jpg');
			            break;
		    	  case 'send':
		    		
		    		  	cell.attr('image/xlink:href', 'img/icon/sendIcon.jpg');
			        	break;
		    	  case 'receive':
			        	cell.attr('image/xlink:href', 'img/icon/messageIcon.jpg');
			            break;
		    	  case 'reference':
			        	cell.attr('image/xlink:href', 'img/icon/referenceIcon.jpg');
			            break;
			            
		    	  case 'successExecution':
			        	cell.attr('image/xlink:href', 'img/icon/success.png');
			            break;
		    	  case 'failedExecution':
			        	cell.attr('image/xlink:href', 'img/icon/failed.png');
			            break;
		        }
		    },
		});
		
		
		
		var graph = new joint.dia.Graph;
		
		
		var targetElement;
		var paper = new joint.dia.Paper({
			    el: $('#content'),
			    width: 2000,
			    height: 800,
			    model: graph,
			    defaultLink: new joint.shapes.basic.BpmnLink,
			 //   elementView: joint.shapes.basic.ElementView,
			    gridSize: 1,
			    
			  //VERIFICA SE LE CONNESSIONI TRA GLI ELEMENTI CREATI SONO VALIDE
		        validateConnection: function(cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
		        	targetElement=cellViewT.model.attr('.tipologia/text');
		        
		        	// Non è possibile collegare dataObject e gateway
		        	
		            if (cellViewS.model.attr('.tipologia/text')==='DataObject' && cellViewT.model.attr('.tipologia/text') ==='Gateway'){
		            	return false;
		            }
		        	
					if (cellViewS.model.attr('.tipologia/text')==='DataObject' && cellViewT.model.attr('.tipologia/text') ==='Event'){
					  return false;
					}
					if (cellViewS.model.attr('.tipologia/text')==='Message' && cellViewT.model.attr('.tipologia/text') ==='Gateway'){
						return false;
					}
					if (cellViewS.model.attr('.tipologia/text')==='Message' && cellViewT.model.attr('.tipologia/text') ==='DataObject'){
		            	return false;
		            }
					if (cellViewS.model.attr('.tipologia/text')==='Message' && cellViewT.model.attr('.tipologia/text') ==='Event'){
		            	return false;
		            }
					     
					if (cellViewS.model.attr('.tipologia/text')==='Gateway' && cellViewT.model.attr('.tipologia/text') ==='Message'){
					   return false;
					}
					if (cellViewS.model.attr('.tipologia/text')==='Gateway' && cellViewT.model.attr('.tipologia/text') ==='DataObject'){
						   return false;
						}
					
					//se è possibile  creare il link catturo l'evento e lo aggiungo al modello
					
					numLink=  linkList.length+1;
					var nameLink='Link_'+numLink;
					var newLink = Link.create({ name: nameLink ,type:'Link',id:linkView.model.id,idSource:cellViewS.model.id,idTarget:cellViewT.model.id});
					linkList[linkList.length]=newLink;
					
		            return true;
		        },
	        
		        
		});
	

		
		var firstCallChangeTarget=false;
		var changeV=false;
		var addLink=false;
		
		
		graph.on('add',function(cell)
				{
			console.log("ADD GRAPH NOTES"+cell.attr('.tipologia/text'));
			//this.set("isAdded",true); 
			if(cell.attr('.tipologia/text'))
				{
				console.log("ADD no selector");
				cell.set("isAdded",true); 
				}
			if(cell instanceof joint.dia.Link ){
				
				linkList[linkList.length]=cell;
				addLink=true;
				endtarget=cell.get('target');
				endsource=cell.get('source');
				 cell.label(0, { attrs: { text: { 'font-size':15} } });
				
				//verifico che se il source ha associati degli exitCode ed eventualmente permetto sl la creazione di quel tipo di link
//				 if(endsource.id!==undefined){
//					 	var sourceElement=graph.getCell(endsource.id);
//						var exitesCodes=sourceElement.attr('.exitCodes/text');
//						if(exitesCodes!==undefined){
//						
//						 cellView.model.label(0, { attrs: { text: { text:exitesCodes[0]} } });
//						
//						}
//				 
//				 }
				console.log("END TARGET LINK:-->"+endtarget.id );
				 if(endtarget.id !== undefined && endsource.id!=undefined && endsource!==endtarget || endtarget instanceof joint.shapes.basic.Pool)
	        	 {
					// console.log("SOURCE TYPE ID--->>>"+endsource.attr('.typeId'));
	        	 cell.attr({
	    	        	'.marker-target': {fill: 'black',d: 'M 10 0 L 0 5 L 10 10 z'},
	    	        	'.connection' : { stroke: 'black' },
	    	        	
	        	 });
	        	 

	        	 }
	         else{
	        	 console.log("LINK RED")
	        	
	        	 cell.attr({
	    	        	'.marker-target': {fill: 'red',d: 'M 10 0 L 0 5 L 10 10 z'},
	    	        	'.connection' : { stroke: 'red' },
	    	        	
	        	 });
	         }
				cell.on("change:target",function() { 
//					console.log("CALL CHANGE TARGET")
					if(firstCallChangeTarget){
					moving_entity=this; 
					this.set("isChanging",true); 
					//console.log("link moving"); 
					}
					firstCallChangeTarget=true;
				});
				
				
				cell.on("batch:stop",function() { 
				//	console.log("CALL batch:stop")
					if (moving_entity.get("isChanging") == true) {
						moving_entity.set("isChanging",false); 
						
					
						addLink=false;
					} 
					console.log("CALL BATCH STOP LINK")
				    endtarget= cell.get('target');
			          endsource=cell.get('source');
			         
			          cell.set('target',endtarget);
			          cell.set('source',endsource);
			          console.log("endtarget.id STOP LINK.-->"+endtarget.id)
			          var cellTarget=graph.getCell(endtarget.id);
			         if(endtarget.id !== undefined && endsource.id!=undefined && endsource!==endtarget && !(cellTarget instanceof joint.shapes.basic.Pool ))
			        	 {
			        	 cell.attr({
			    	        	'.marker-target': {fill: 'black',d: 'M 10 0 L 0 5 L 10 10 z'},
			    	        	'.connection' : { stroke: 'black'  },
			    	        	
			        	 });
			        	 
			        	 cell.removeAttr('.connection/stroke-width');
			        	 cell.removeAttr('.connection/stroke-dasharray');
			        	 }
			         else{
			        	 cell.attr({
			    	        	'.marker-target': {fill: 'red',d: 'M 10 0 L 0 5 L 10 10 z'},
			    	        	'.connection' : { stroke: 'red' },
			    	        	
			        	 });
			        	 cell.removeAttr('.connection/stroke-width');
			        	 cell.removeAttr('.connection/stroke-dasharray');
			         }
			         var targetElement = graph.getCell(endtarget.id);
				       	var souceElement=graph.getCell(endsource.id);
				       	if(targetElement&& souceElement){
			     	if((targetElement.attr('.tipologia/text')==='Message'||souceElement.attr('.tipologia/text')==='Message')
					       	||(
					       			souceElement.get('parent')	!==undefined &&targetElement.get('parent')!==undefined &&
					      	targetElement.get('parent')!==souceElement.get('parent'))
					       	){
					       		console.log("LINK IS MESSAGE FLOW");
					       		
					       	//qui posso verificare se il messaggio è di tipo input o output ed eventualmente gestire il controllo 
					       		cell.attr({
				    	        	'.marker-target': {fill: 'black',d: 'M 10 0 L 0 5 L 10 10 z'},
				    	  	       	'.connection' : { 'stroke-width': 3, 'stroke-dasharray': '5 2' },
				    	  	        '.tipologia':{text:'messageFlowLink'}
				    	          });
					       		
					       		//imposto l'attributo sender e receive del messaggio corrrettamente a seconda della Resouce a cui l'elemento è collegato
					       		if(targetElement.attr('.tipologia/text')==='Message'){
					       			if(souceElement.attr('.resourceProperty/text')!=="")
					       			targetElement.attr('.sender/text',souceElement.attr('.resourceProperty/text'));
					       		}
					       		if(souceElement.attr('.tipologia/text')==='Message'){
					       			if(targetElement.attr('.resourceProperty/text')!=="")
					       			souceElement.attr('.receiver/text',targetElement.attr('.resourceProperty/text'));
					       		}
					       	}
			         
			    	if(targetElement.attr('.tipologia/text')==='DataObject'||souceElement.attr('.tipologia/text')==='DataObject'){
			       		
			       		cell.attr({
		  	        	'.marker-target': {fill:'white', d: 'M 10 0 L 0 5 L 10 10 z'},
		  	  	       	'.connection' : {  'stroke-width': 1, 'stroke-dasharray': '5 4' },
		  	  	        '.tipologia':{text:'objectFlowLink'}
		  	          });
			       	}
				       	}
				});

				cell.on("batch:start",function() { 
				//	console.log("CALL batch:start LINK")
					moving_entity=this; 
					this.set("isChanging",true); 
//					console.log("link start moving"); 
					
				});
				cell.on("change:vertices",function() { 

					moving_entity=this; 
					this.set("isChanging",true); 
//					console.log("link change:vertices"); 
				});
				
			}
			else{
				
				//verifico se l'eelmnto è stato inserito all'interno di un Pool
				if(!(cell instanceof joint.shapes.basic.Pool)&& !(cell instanceof joint.shapes.basic.Rect)){
					//registro l'evento associato al cambiamento delle dimensioni in modo che possa essere gestito correttamente dall'undo
					cell.on("change:size",function() { 
//						moving_entity=this; 
//						this.set("isChanging",true); 
						
					});
					cell.on("change:position",function() { 
						moving_entity=this; 
						this.set("isChanging",true); 
						
					});
					console.log("CALL CHEK IN POOL ")
					checkInPoll(cell);
					if(cell instanceof joint.shapes.basic.Activity)
					cell.set({
				           
			            size: { width:cell.get('size').width+1, height:cell.get('size').height+1 }
			        });
				}
				
				
				
			}
				});
		//elimina i link che non hanno souce o targhet associati
		paper.model.on('batch:stop', function () {
		
			console.log("REGISTER STOP BATCH ");
		    var links = paper.model.getLinks();
		    
		    _.each(links, function (link) {
			    	var source = link.get('source');
			        var target = link.get('target');
			       
//			        var endtarget=0;
//			        var endsource=0;

//			        link.on('batch:stop', function() {
//			        	console.log("stop batch link");
//			          
//			          endtarget= link.get('target');
//			          endsource=link.get('source');
//			         
//			          link.set('target',endtarget);
//			          link.set('source',endsource);
//			          
//			         if(endtarget.id !== undefined && endsource.id!=undefined && endsource!==target)
//			        	 {
//			        	 link.attr({
//			    	        	'.marker-target': {fill: 'black',d: 'M 10 0 L 0 5 L 10 10 z'},
//			    	        	'.connection' : { stroke: 'black' },
//			    	        	
//			        	 });
//			        	 
//
//			        	 }
//			       
//			    	});
//			       	if ((source.id === undefined || target.id === undefined || source.id===target.id)) {
//			       		//console.log("REMOVE LINK");
//			       		
//			       		//L'eliminazione di un link dal modello non viene correttamente gestita dall'undo
//			       		// e rende impossibile lo spostamento del target e del source di un link
//			       		//	link.remove();
//			       		//cambio il colore del link
//			       		link.attr({
//		    	        	'.marker-target': {fill: 'red',d: 'M 10 0 L 0 5 L 10 10 z'},
//		    	        	'.connection' : { stroke: 'red' },
//		    	          });
//			        }
//			       	else{
//				       		var targetElement = graph.getCell(target.id);
//					       	var souceElement=graph.getCell(source.id);
//					       
//				       		if(targetElement!==undefined && souceElement !==undefined){
//				      
//				       	if((targetElement.attr('.tipologia/text')==='Message'||souceElement.attr('.tipologia/text')==='Message')
//				       	||(
//				       			souceElement.get('parent')	!==undefined &&targetElement.get('parent')!==undefined &&
//				      	targetElement.get('parent')!==souceElement.get('parent'))
//				       	){
//				       		console.log("LINK IS MESSAGE FLOW");
//				       		
//				       	//qui posso verificare se il messaggio è di tipo input o output ed eventualmente gestire il controllo 
//				       		link.attr({
//			    	        	'.marker-target': {fill: 'black',d: 'M 10 0 L 0 5 L 10 10 z'},
//			    	  	       	'.connection' : { stroke: 'black' , 'stroke-width': 3, 'stroke-dasharray': '5 2' },
//			    	  	        '.tipologia':{text:'messageFlowLink'}
//			    	          });
//				       		
//				       	}
//				       	else
//				       		{
//				       		console.log("Link is sequence flow");
//				       		link.attr({
//				       			'.marker-target': {fill: 'black',d: 'M 10 0 L 0 5 L 10 10 z'},
//			    	        	'.connection' : { stroke: 'black' ,},
//			    	  	        '.tipologia':{text:'sequenceFlowLink'}
//			    	          });
//				       		}
//				       	if(targetElement.attr('.tipologia/text')==='DataObject'||souceElement.attr('.tipologia/text')==='DataObject'){
//				       		
//				       		link.attr({
//			  	        	'.marker-target': {fill:'white', d: 'M 10 0 L 0 5 L 10 10 z'},
//			  	  	       	'.connection' : { stroke: 'black' , 'stroke-width': 1, 'stroke-dasharray': '5 4' },
//			  	  	        '.tipologia':{text:'objectFlowLink'}
//			  	          });
//				       	}
////			       		}
//			       	}
//				       		else
//				       			{
//				       			console.log("IN ELSE");
//				       			}
//			
//			       	if (link.get("isChangingTargetLink") == true) {
//			 			link.set("isChangingTargetLink",false); 
//			 			console.log("isChangingTargetLink moved"); 
//			 		} 
		    });

		});
		
//		paper.model.on('batch:start', function () {
//			console.log("BATCH START");
//			 var links = paper.model.getLinks();
//			    
//			    _.each(links, function (link) {
//			    	link.on("batch:start",function() { 
//			    		
//			    		moving_entity=this; 
//			    		this.set("isChanging",true); 
//			    		console.log("link start moving"); 
//			    		
//			    	});
//				       
//			    })
//			});


		graph.on('remove', function(cell)  { 
			
			
			for(  var i=0;i<linkList.length;i++){
				
				if(linkList[i].get('id')==cell.id){
					
					linkList.splice(i,1);
					}
					
			}
			
			$('#newsbox').hide();
			});
		
		
		paper.on('cell:pointermove ', 
			    function(cellView, evt, x, y) { 
			if(cellView.model instanceof joint.shapes.basic.Rect){
				console.log("Call POINTERMOVE");
				var parent=cellView.model.get('parent');
				console.log("POINTERMOVE Parent:"+parent);
				 var  cellParent=graph.getCell(parent);
				var originalPosition = cellParent.get('position');
				var originalSize = cellParent.get('size');
			//	var cornerParent=cellParent.getBBox().corner();
				 var newCornerX = originalPosition.x + originalSize.width;
			        var newCornerY = originalPosition.y + originalSize.height;
				
//				var newWidth=newCornerX - (cornerParent.x-x);
//				var newHeight=newCornerY - (cornerParent.y-y) ;
				var newWidth=newCornerX - x;
				var newHeight=newCornerY - y;
				if(newWidth>20&&newHeight>20){
					
				cellParent.set({
			           
			            size: { width: newWidth, height: newHeight }
			        });
				}
			}
			
			
		});

		var selectedElementID=0;
		
		
			paper.on('cell:pointerclick ', 
				    function(cellView, evt, x, y) { 
				
			 	
				if(!(cellView.model instanceof joint.shapes.basic.Rect)&&!(cellView.model instanceof joint.dia.Link)){
					
					var	bboxCell=cellView.model.getBBox();
//					var selectorCorner=new joint.shapes.basic.SelectorRect({
//				        position: {x: bboxCell.x-5, y: bboxCell.y-5  },
//				        size: { width: 50, height: 50 },
//				       
//				        isCornerSelector:true
//				        
//				    });
//					console.log("ADD A RECT EMBEDDed IN ELEMENT");
//					cellView.model.embed(selectorCorner);
//					//cellView.model.toFront();
//					graph.addCell(selectorCorner);
					var rSelector = new joint.shapes.basic.Rect({
				        position: {x: bboxCell.x-5, y: bboxCell.y-5  },
				        size: { width: 10, height: 10 },
				        attrs: { rect: { fill: '#FF9933' } },
				        isCornerSelector:true
				        
				    });
//					var rCornerSelector = new joint.shapes.basic.Rect({
//				        position: {x: bboxCell.corner().x-5, y: bboxCell.corner().y-5  },
//				        size: { width: 10, height: 10 },
//				        attrs: { rect: { fill: '#E74C3C' } },
//				        isCornerSelector:true
//				        
//				    });
//					console.log("ADD A RECT EMBEDDed IN ELEMENT");
//					cellView.model.embed(rCornerSelector);
				cellView.model.embed(rSelector);
			//	cellView.model.toFront();
					
					 graph.addCell(rSelector);
					 console.log("cellView.model.get('embeds'):"+cellView.model.get('embeds'));
						if(cellView.model.get('embeds'))
							console.log("cellView.model.get('embeds'):"+cellView.model.get('embeds').length);
							
//					 graph.addCell(rCornerSelector);
					 rSelector.on("change:position",function() { 
					 		console.log("CALL CHANGE POSITION TO RECT SELECTOR")
					 		var parent=this.get('parent');
					 		 var  cellParent=graph.getCell(parent);
					 	
					 		if(cellParent)
					 		//inibisco il movimento del rettangolo di selezione impostando la sua posizione sempre legata a quella dell' elemento parent a cui è collegato
					 		this.set({position: { x: cellParent.getBBox().x-5, y: cellParent.getBBox().y-5 } });
					 		
					 		
					 	});
					 
//					 rCornerSelector.on("change:position",function() { 
//					 		
//					 		var parent=this.get('parent');
//					 		console.log("parent RECT:-->"+parent) 
//					 		 var  cellParent=graph.getCell(parent);
//					 	
//					 		var xChange=this.get('position').x;
//					 		console.log("xChange-->"+xChange);
//					 		//inibisco il movimento del rettangolo di selezione impostando la sua posizione sempre legata a quella dell' elemnto parent a cuo è collegato
//					 		this.set({position: { x: cellParent.getBBox().corner().x-5, y: cellParent.getBBox().corner().y-5 } });
////					 		this.get("position/x",cellParent.getBBox().x-5); 
////					 		this.get("position/y",cellParent.getBBox().y-5); 
//					 		console.log("rect EMBEDDE MOVING"); 
//					 	});
					}else if(!(cellView.model instanceof joint.dia.Link)){
						console.log("CAll to front")
					//	cellView.model.toFront();
					}
				

					
				
				
				$('#noteElement').val(cellView.model.attr('.notes/text'));
				$('#resourceProperty').val(cellView.model.attr('.resourceProperty/text'));
						
				cellView.model.attr('notes/text',$('#noteElement').val());
				$('#typeGatewaySelect').prop('disabled', false);
				$('#typeEventSelect').prop('disabled', false);
				$('#typeEventActionSelect').prop('disabled', false);
				cellView.model.set("isChangingProperty",true); 
				var textName;
				deselectElement();
				if(cellView.model instanceof joint.shapes.basic.Pool){
					
					
					textName=cellView.model.attr('text/text');
					$('#typeTask').hide();
					$('#urlTaskDiv').hide();
					$('#urlProperty').hide();
			cellView.model.attr('.outer/stroke','black');
			cellView.model.attr('.outer/stroke-width','2');
			cellView.model.attr('.outer/stroke-dasharray','1.1');
		}
				else	if(cellView.model instanceof joint.shapes.basic.Activity){
					$('#urlTaskDiv').show();
					$('#urlProperty').show();
					$('#typeTask').show();
					textName=cellView.model.get('content');
					$('#typeTaskSelect').val(cellView.model.get('taskType'));
					cellView.model.attr('.outer/stroke','black');
					cellView.model.attr('.outer/stroke-width','2');
					cellView.model.attr('.outer/stroke-dasharray','1.1');
				}
				else{
					
					$('#typeTask').hide();
					$('#urlTaskDiv').hide();
					$('#urlProperty').hide();
					textName=cellView.model.attr('text/text');
					cellView.model.attr({rect: {stroke:'black', 'stroke-width':'2','stroke-dasharray': '1,1' }});
			}

			
			 
			 $('#newsbox').show();
			
			 if(cellView.model instanceof joint.dia.Link)
				{
				 endsource=cellView.model.get('source');
				 if(endsource.id!==undefined){
					 $('#selectExitCodeLinkLabel').empty();
						var sourceElement=graph.getCell(endsource.id);
						var exitesCodes=sourceElement.attr('.exitCodes/text');
						if(exitesCodes!==undefined){
						
						//Il nome del link deve essere scelto tra gli exitCodes disponibili
						 $('#selectExitCodeLink').show();
						 var labelLink=cellView.model.attributes.labels[0].attrs.text.text;
						 for(var i=0;i<exitesCodes.length;i++){
							 var value=exitesCodes[i];
								 
						 $('#selectExitCodeLinkLabel').append( ' <option value='+value+'>'+value+'</option>');
						 }
						 //verifico che il nome del link sia già settato 
						 if(labelLink===""){
						 cellView.model.label(0, { attrs: { text: { text:exitesCodes[0]} } });
						 }
						 else
							 $('#selectExitCodeLinkLabel option[value='+labelLink+']').attr('selected','selected');
							
						 textName=cellView.model.attributes.labels[0].attrs.text.text;
						 $('#nomeProprieta').val(cellView.model.attributes.labels[0].attrs.text.text);
						 $('#nomeProprieta').attr("disabled", true) ;
						}
				 
				 else{
					 textName=cellView.model.attributes.labels[0].attrs.text.text;
					 $('#nomeProprieta').val(cellView.model.attributes.labels[0].attrs.text.text);
					 $('#selectExitCodeLink').hide();
					 $('#nomeProprieta').attr("disabled", false) ;
				 }
				 }
				
				
				 
				}
			 if(cellView.model.attr('.tipologia/text')==='Message'){
				 $('#fromToMessage').show();
				 $('#senderMessageProperty').val(cellView.model.attr('.sender/text'));
				 $('#receiverMessageProperty').val(cellView.model.attr('.receiver/text'));
				 console.log("ITEM REF MESSAGE:-->"+cellView.model.attr('.itemRef/text'));
				 $('#itemDefSelect').val(cellView.model.attr('.itemRef/text'));
				 $( "#itemDefDiv" ).show();
			 }
			 else{
				 $('#fromToMessage').hide();
			 }
			 if(cellView.model.attr('.tipologia/text')==='DataObject'){
				 textName=(cellView.model.attr('.label/text'));
				$('#stateDataObject').show();
				 $('#stateProprieta').val(cellView.model.attr('.dataState/text'));
				 console.log("ITEM REF DATA OBJECT:-->"+cellView.model.attr('.itemRef/text'));
				 $('#itemDefSelect').val(cellView.model.attr('.itemRef/text'));
				 $( "#itemDefDiv" ).show();
			 }else{
				 $('#stateDataObject').hide();
			 }
				$('#tipoProprieta').val(cellView.model.attr('.tipologia/text'));
				$('#urlTask').val(cellView.model.attr('.urlTask/text'));
				$('#idType').val(cellView.model.attr('.typeId/text'));
				$('#idElemento').val(cellView.model.id);
				if($('#tipoProprieta').val()=='Gateway'){
					textName=(cellView.model.attr('.label/text'));
					$('#typeGateway').show();
					$('#urlTaskDiv').hide();
					$('#urlProperty').hide();
					$('#typeGatewaySelect').val(cellView.model.get('gatewayType'));
					//se il valore del gateway è fissato disabilito la select
					if(cellView.model.get('fixedType'))
					$('#typeGatewaySelect').prop('disabled', 'disabled');
				}
				else{
					$('#typeGateway').hide();
					
				}
				    
				if($('#tipoProprieta').val()=='Event'){
					textName=(cellView.model.attr('.label/text'));
					$('#typeEvent').show();
					$('#typeEventSelect').val(cellView.model.get('eventType'));
					updateTypeEvent();
					$('#typeEventActionSelect').val(cellView.model.get('actionType'));
					
					
					
					
					if(cellView.model.get('fixedType')){
						$('#typeEventSelect').prop('disabled', 'disabled');
						$('#typeEventActionSelect').prop('disabled', 'disabled');
						
					}
					
				}
				else{
					$('#typeEvent').hide();
					
				}
				$('#nomeProprieta').val(textName);
				 selectedElementID=cellView.model.id;
			});
			
			
			paper.on('blank:pointerdown', function(cellView,evt, x, y) { 
				
//				//qaundo inio a muovere un elemento
//				 var cell = cellView.model;
//
//				    if (!cell.get('embeds') || cell.get('embeds').length === 0) {
//				        // Show the dragged element above all the other cells (except when the
//				        // element is a parent).
//				        cell.toFront();
//				    }
//				    
//				    if (cell.get('parent')) {
//				    	console.log("DIVIDO GLI ELEMNTI");
//				        graph.getCell(cell.get('parent')).unembed(cell);
//				    }
				deselectAllElements();
				$('#newsbox').hide();
			});
			
			paper.on('cell:pointerdown', function(cellView, evt, x, y) {
				
			    var cell = cellView.model;
//			    console.log("cell.get('isCornerSelector')"+cell.get('isCornerSelector'));
//				   
			    if(!(cell instanceof joint.shapes.basic.Pool)){
			 if (!cell.get('embeds') || cell.get('embeds').length === 0) {
			        // Show the dragged element above all the other cells (except when the
			        // element is a parent).
			    //  cell.toFront();
			    }
			    if(!cell.get('isCornerSelector'))
			    if (cell.get('parent')) {
			    	graph.getCell(cell.get('parent')).unembed(cell);
			    }
}
			});
			function deselectAllElements(){
				selectedElementID=0;
				var allElements=graph.getElements();
				var allLinks=graph.getLinks();
				_.each(allLinks, function (links) {
					links.attr('.selected','');
					console.log("IS LINK SELECTED : "+links.attr('.selected'))
					console.log("DESELECT LINK")
				});
				_.each(allElements, function (element) {
					removeRectSelector(element);
					
					if(element instanceof joint.shapes.basic.Activity ||element instanceof joint.shapes.basic.Pool ){
						element.attr('.outer/stroke','white');
						console.log("selectedElementID In ALL :"+selectedElementID)
						
					}
				
						
					else{
						console.log("selectedElementID In ALL :"+selectedElementID)
						console.log("DESELECT ELEMENT:"+element.id)
						if(!(element instanceof joint.shapes.basic.Rect)){
							console.log("DESELECT ELEMENT NO RECT")
							element.attr({ rect: { stroke:'white'}});
						}
						
						
					}
						
				});
			
				_.each(allElements, function (element) {
					if((element instanceof joint.shapes.basic.Rect)){
						element.remove();
						console.log("DELETE RECT");
					}
					
						
				});
				
			}
			function removeRectSelector(element){
				console.log("REMOVE SELECTOR")
				
					 if(element!==undefined){
					 var embedeedElementArray=element.getEmbeddedCells();
					 for(var i=0;i<element.getEmbeddedCells().length;i++){
						 var elementEmb=embedeedElementArray[i];
//						 var elementEmbCorner=embedeedElementArray[1];
//						 elementEmbCorner.remove();
						 if(elementEmb instanceof joint.shapes.basic.Rect)
						 elementEmb.remove();
					 }
					 }
				
			}
			function deselectElement(){
				if(selectedElementID!==undefined){
					
			if(selectedElementID!=0 ){
				 var element=graph.getCell(selectedElementID);
				 console.log("DESELECT SINGLE ELEMENT");
				 removeRectSelector(element);
				if(element instanceof joint.shapes.basic.Activity ||element instanceof joint.shapes.basic.Pool ){
		
			 element.attr('.outer/stroke','white');
					
				}
				else{

					if((graph.getCell(selectedElementID))!==undefined)
			(graph.getCell(selectedElementID)).attr({ rect: { stroke:'white'}});
				}
				
				}	
				}

			}
			
			
			
			//INGRANDISCE LA FORMA DEL POOL QUANDO GLI ELEMENTI ALL'INTERNO SI AVVICINANO AI BORDI
//			paper.on("cell:pointermove", function(cellView, evt, x, y ) { 
//				cell=cellView.model;
//			      if(!cell.get('isCornerSelector'))
//				if(!(cellView.model instanceof joint.shapes.basic.Pool))
//					if(!(cellView.model instanceof joint.dia.Link))
//						if(!(cellView.model instanceof joint.shapes.basic.Rect)){
//					
//					checkInPoll(cellView.model);
//					
//					
//					 var parentId = cell.get('parent');
//				      
//				        if (!parentId) return;
//
//				        var parent = graph.getCell(parentId);
//				        var parentBbox = parent.getBBox();
//				     if (parent.get('skipParentHandler')) return;
////				        if (cell.get('embeds') && cell.get('embeds').length) {
////				            // If we're manipulating a parent element, let's store
////				            // it's original position to a special property so that
////				            // we can shrink the parent element back while manipulating
////				            // its children.
////				            cell.set('originalPosition', cell.get('position'));
////				        }
//				        
//				       
//
//				        if (!parent.get('originalPosition')) parent.set('originalPosition', parent.get('position'));
//				        if (!parent.get('originalSize')) parent.set('originalSize', parent.get('size'));
//				        
//				        var originalPosition = parent.get('originalPosition');
//				        var originalSize = parent.get('originalSize');
//				        
//				        var newX = originalPosition.x;
//				        var newY = originalPosition.y;
//				        var newCornerX = originalPosition.x + originalSize.width;
//				        var newCornerY = originalPosition.y + originalSize.height;
//				        
//				        _.each(parent.getEmbeddedCells(), function(child) {
//
//				            var childBbox = child.getBBox();
//				           if ((childBbox.x-40 ) < (newX+20)) { newX = childBbox.x-50; console.log("X CHILD MINORE DI PARENT");}
//				            if ((childBbox.y-40 )< (newY+20)) { newY = childBbox.y-30; }
//				            if ((childBbox.corner().x+60 ) > (newCornerX)) { newCornerX = childBbox.corner().x; }
//				            if ((childBbox.corner().y +40) > (newCornerY-20)) { newCornerY = childBbox.corner().y+30; }
//				        });
//
//				      
//				      
//				        parent.set({
//				        	
//				            position: { x: newX, y: newY },
//				            size: { width: newCornerX - newX, height: newCornerY - newY }
//				        }, { skipParentHandler: true });
//				}
//				if(cellView.model instanceof joint.dia.Link){
//					console.log("TYPO LINK");
//				}
////				else if(!(cellView instanceof joint.shapes.basic.Pool)){
////						console.log("CHAIMO CHECKINPOLL");
////					checkInPoll(cellView.model);
////				}
//			});
			
			
				
			paper.on("cell:pointerup", function(cellView, evt, x, y ) { 
				
				
				cell=cellView.model;
			      if(!cell.get('isCornerSelector'))
				if(!(cellView.model instanceof joint.shapes.basic.Pool))
					if(!(cellView.model instanceof joint.dia.Link))
						if(!(cellView.model instanceof joint.shapes.basic.Rect)){
					
					checkInPoll(cellView.model);
					
						}
				if (moving_entity != null) {
					

					if (moving_entity.get("isChanging") == true) {
						moving_entity.set("isChanging",false); 
						
					} 
					

				}
			});
			
			function updateLabelLink(){
				$('#nomeProprieta').val(	$('#selectExitCodeLinkLabel').val());
				newProprieta();
			}

			function checkInPoll(cell){
				// var cell = cellView.model;
//			     var cellViewsBelow = paper.findViewsFromPoint(cell.getBBox().center());
				//if(!cell instanceof joint.shapes.basic.Pool ){
					
			    var cellViewsBelowelements = graph.findModelsFromPoint(cell.getBBox().center());
			    _.each(cellViewsBelowelements, function (elm) {
			    	
			    	if(elm.id!=cell.id){
			    		if(elm instanceof joint.shapes.basic.Pool ){
			    			
							
//			    			if (!elm.get('embeds') || elm.get('embeds').length === 0) {
//						        // Show the dragged element above all the other cells (except when the
//						        // element is a parent).
//						    	console.log("CALL TO FRONT");
//						    	//elm.toFront();
//						    }
			    			elm.toBack();
			    			elm.embed(cell);
				    		console.log("includi nel Pool");
			    		}
			    		
			    	}
			    	   
			    });
				//}
			}
			graph.on('change:size', function(cell, newPosition, opt) {
				if(cell instanceof joint.shapes.basic.Activity ){
					//inibisco la taslazione del testo all'interno di un task al suo ridimensionamento
				
				
					cell.attr('.fobj/transform',' translate(10,10)');
//					cell.attr('.fobj/style/background','blue');
//					cell.attr('div/style/background','green');
					
					cell.attr('div/style/width',cell.get('size').width-30);
					cell.attr('div/style/height',cell.get('size').height-20);
					
					cell.attr('.fobj/width',cell.get('size').width-20);
					cell.attr('.fobj/height',cell.get('size').height-20);
					
				}
		      
		        if (cell.get('skipParentHandler')) return;
		        
		        if (cell.get('embeds') && cell.get('embeds').length) {
		          
		            cell.set('originalSize', cell.get('size'));
		        }
		    });
		    
		    graph.on('change:position', function(cell, newPosition, opt) {
		    	console.log("CHANGE POSITION CALLED:"+cell.id);
		    	 var  embedArray=cell.get('embeds');
			        console.log("cell.get('embeds')-->"+cell.get('embeds'))
//			       //  console.log(" cell.get('embeds').length-->"+ cell.get('embeds').length)
			     if( cell.get('embeds'))
			    	 console.log(" cell.get('embeds').length-->"+ cell.get('embeds').length)
		    	if (cell.get('skipParentHandler')) return;
		    	
//		    	console.log("CALL CHANGE POSITION")
//		       
//		        var  embedArray=cell.get('embeds');
//		        console.log("cell.get('embeds')-->"+cell.get('embeds'))
////		       //  console.log(" cell.get('embeds').length-->"+ cell.get('embeds').length)
//		     if( cell.get('embeds'))
//		    	 console.log(" cell.get('embeds').length-->"+ cell.get('embeds').length)
//		    	 for(var i=0; i<embedArray.length;i++){
//		    		
//		    		var elementEmb= embedArray[i];
//		    		 console.log(" Eleme "+ elementEmb)
//		    		 eleSelector=graph.getCell(elementEmb.id);
//		    		 
//		    		if(elementEmb instanceof joint.shapes.basic.Rect ){
//		    			console.log("CAHANGE POSITION RECT")
//		    			eleSelector.set({position: { x: cell.getBBox().x-5, y: cell.getBBox().y-5 } });
//		    		}
//		    		
//		    			
//		    	 }
//		     }

		    });
		
// INGRANDISCE LA FORMA DI UN ACTIVITY SE IL CAMPO TESTO DIVENTA LUNGO
		
//			  this.graph.on("change:attrs", _.bind(function (cell, content, opt) {
//	                if (cell.previous('content') && cell.get('content') && cell.previous('content')!=='' && content!=='') {
//
//	                    if (cell.previous('content') != cell.get('content')) { //test if label changed
//
//	                    var maxLineLength = _.max(cell.get('content').split('\n'), function(l) {
//	                        return l.length;
//	                    }).length;
//
//	                    
//	                   
//	                    
//	                    var letterSize = 8;
//	                    var width = 2 * (letterSize * (0.2 * maxLineLength + 1));
//	                    var height = 2 * (letterSize * (0.2 * maxLineLength + 1));
//	                    cell.set({
//	                                size: { width: width, height: height}
//	                    })
//	                }}}, this));