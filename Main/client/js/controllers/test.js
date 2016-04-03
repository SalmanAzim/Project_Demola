angular.module('test', []).
        directive('draggable1', function($document) {
		
		
            return function(scope, element, attr) {
                var startX = 0,
                    startY = 0,
                    x = 0,
                    y = 0;
                element.css({
                    //position: 'relative',
					position: 'absolute',
                    cursor: 'pointer',
					left:'0',
					top:'11%', 
					bottom: '0',
					width: '10%'
                });
				
				
				
                element.on('mousedown', function(event) {
                    // Prevent default dragging of selected content
                    event.preventDefault();
					//elementDragged = this;
                    startX = event.screenX - x;
                    startY = event.screenY - y;
                    $document.on('mousemove', mousemove);
                    $document.on('mouseup', mouseup);
                });
				
				
			element[0].addEventListener('dragstart', function(e) {
			e.dataTransfer.effectAllowed = 'move';
			e.dataTransfer.setData('text', this.innerHTML);
			elementDragged = this;
				});
			

                function mousemove(event) {
                    y = event.screenY - startY;
                    x = event.screenX - startX;
                    element.css({
                        top: y + 'px',
                        left: x + 'px'
                    });
                }

                function mouseup() {
                    $document.off('mousemove', mousemove);
                    $document.off('mouseup', mouseup);
					//comparePositions();
                }
				
				
				
				
            };
        });