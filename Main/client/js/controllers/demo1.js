window.onload = function() {

	/**
	*
	*	Demo 1: Elements
	*
	*/
	var dropZoneOne = document.querySelector('#drop-target-one');
	var dropZoneDelete = document.querySelector('#drop-target-delete');
	var dragElements = document.querySelectorAll('#drag-elements1 li');
	var dragCharts = $("[fusioncharts='']");
	//var dragDeleteElements = document.querySelectorAll('#drag-elements-new li');
	var dragDeleteElements = new Array();
	//var elementDragged = null;
	var elementDeleteDragged = null;

	for(var i=0;i<dragCharts.length;i++){
		
			var chart_real = dragCharts[i];
	//$("[fusioncharts='']")[1].getAttribute("type")
	
	chart_real.addEventListener('dragstart', function(e) {
			e.dataTransfer.effectAllowed = 'move';
			e.dataTransfer.setData('text', this.innerHTML);
			elementDragged = this;
		});
		
		
	}
	
/*
	var chart_real = document.getElementById("firstChart");
	$("[fusioncharts='']")[1].getAttribute("type")
	
	chart_real.addEventListener('dragstart', function(e) {
			e.dataTransfer.effectAllowed = 'move';
			e.dataTransfer.setData('text', this.innerHTML);
			elementDragged = this;
		});
*/
		
	for (var i = 0; i < dragElements.length; i++) {

	
		// Event Listener for when the drag interaction starts.
		dragElements[i].addEventListener('dragstart', function(e) {
			e.dataTransfer.effectAllowed = 'move';
			e.dataTransfer.setData('text', this.innerHTML);
			elementDragged = this;
		});

		// Event Listener for when the drag interaction finishes.
		dragElements[i].addEventListener('dragend', function(e) {
			
			
								//cln.style.top=ess.clientX+ "px";
				//cln.style.left=ess.clientY+ "px";	

		//		curr_element.css({
        //            top:e.clientY+'px',
        //            left:e.clientX+'px'
        //        });
			   
			   
			
			//console.log(this);
			//elementDragged = null;
		});
	};

///////////////////////////////////////////////////////////////////////////////////	
	for (var i = 0; i < dragDeleteElements.length; i++) {

		// Event Listener for when the drag interaction starts.
		dragDeleteElements[i].addEventListener('dragstart', function(e) {
			e.dataTransfer.effectAllowed = 'move';
			e.dataTransfer.setData('text', this.innerHTML);
			elementDeleteDragged = this;
		});

		// Event Listener for when the drag interaction finishes.
		dragDeleteElements[i].addEventListener('dragend', function(e) {
			
			//elementDeleteDragged = null;
		});
	};	
///////////////////////////////////////////////////////////////////////////////////	
	
	

	// Event Listener for when the dragged element is over the drop zone.
	dropZoneOne.addEventListener('dragover', function(e) {
		if (e.preventDefault) {
			e.preventDefault();
		}

		e.dataTransfer.dropEffect = 'move';

		return false;
	});

	// Event Listener for when the dragged element enters the drop zone.
	dropZoneOne.addEventListener('dragenter', function(e) {
		this.className = "over";
	});

	// Event Listener for when the dragged element leaves the drop zone.
	dropZoneOne.addEventListener('dragleave', function(e) {
		this.className = "";
	});

	// Event Listener for when the dragged element dropped in the drop zone.
	dropZoneOne.addEventListener('drop', function(e) {
				var ess = window.event;
		if (e.preventDefault) e.preventDefault(); 
  	if (e.stopPropagation) e.stopPropagation(); 
		

		this.className = "";
		//this.innerHTML = "Dropped " + e.dataTransfer.getData('text');

		// Remove the element from the list.
		//document.querySelector('#drag-elements').removeChild(elementDragged);
		
		
		//document.getElementById("drop-target-one").childNodes[0].appendChild(elementDragged);
		var nodes_test = document.getElementById("drop-target-one");
		var nodes = document.getElementById("drop-target-one").childNodes;
		
//			test = elementDragged;
						var cln = elementDragged.cloneNode(true);
						
						
						
						
				cln.removeAttribute("draggable");
				cln.style.top=(ess.clientY-60)+ "px";
				cln.style.left=(ess.clientX-140)+ "px";			
				

if(cln.class=="drag-elements-li"){
				cln.setAttribute("class","drag-elements-new-li");
}
				
				cln.setAttribute("oncontextmenu","showCustomMenu(this)");
				cln.setAttribute("ondblclick","showDoubleMenu(this)");
/*
				cln.ondblclick = function() {
					right_global = this;
		var e = window.event;
		var i = document.getElementById("menu1").style;
		var posX = e.clientX;
		var posY = e.clientY;
		menu(posX, posY,i);
		e.preventDefault();
				};
*/
		



		
		
		
				nodes_test.appendChild(cln);
var cln_test = $(cln);

					//cln.style.top=ess.clientX+ "px";
				//cln.style.left=ess.clientY+ "px";	
                cln_test.css({
                    position: 'absolute',
                    cursor: 'pointer'
                });
		

		
//var $draggables = $("li.drag-elements-new-li");
var $draggables_p = $("#drop-target-one");
var $draggables = $draggables_p.children();
var id, $draggableItem;
//var $my_test_array = new Array();
for (var i = 0; i < $draggables.length; i++) {
        //$draggableItem = $draggables.eq(i);
        //id = $draggableItem.attr("id");
			
			var $my_test_array = new Array();
			
		for(var j=0;j<$draggables.length; j++){
			
			//$draggableItem = $draggables.eq(j);
			
			if($draggables.eq(i)[0] != $draggables.eq(j)[0] ){
				$draggableItem = $draggables.eq(j);
				$my_test_array.push($draggableItem);
			}
			
		}
		
		$($draggables.eq(i)).draggable({
//            obstacle: "li.obstacle[id!=\"" + id + "\"]",
			obstacle: $my_test_array,
            preventCollision: true,
			containment: "#drop-target-one"	,
			stop: function(event, ui)
			{
				//alert('stop: dropped  ');
				// Check value of ui.helper.data('dropped') and handle accordingly...
			},
			drag: function(event, ui)
			{
				//console.log(this.id);
				//this.outerHTML
					  var xhttp = new XMLHttpRequest();
					  xhttp.open('POST', '/moveObject', true);
					  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					 // xhttp.send("loggedinUser=" + loggedinUser + "&currentId=" + this.id + "&positionX=" + ui.position.left+ "&positionY=" + ui.position.top);  
					
				//console.log('y = ' + ui.position.top + ',  x = ' + ui.position.left);
				// Check value of ui.helper.data('dropped') and handle accordingly...
				//console.log('y = ' + ui.position.top + ',  x = ' + ui.position.left);
				// Check value of ui.helper.data('dropped') and handle accordingly...
			}
	
        });


		
	
}



		
///////////////////////////////////////////////post request

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
		console.log(xhttp.responseText);
		var aaa=xhttp.responseText;
		cln.setAttribute("id",JSON.parse(aaa));
    }
  };
  xhttp.open('POST', '/getNewObject', true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  //xhttp.send("loggedinUser=" + loggedinUser);
//x.send("loggedinUser=" + loggedinUser + "&commandEntered=" + "Pallet_Moved_From_2_to_3");
//xhttp.send("loggedinUser=" + loggedinUser + "&currentHtml=" + cln.outerHTML);  
  //xhttp.send("currentHtml=" +cln.outerHTML);

///////////////////////////////////////////////post request



		
		elementDragged = null;
		
		return false;
});

	
		
};
