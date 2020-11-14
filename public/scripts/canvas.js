var canvas = document.getElementById('viewport'),
context = canvas.getContext('2d');
var num = 1;
var x = 0;
var y = 0;

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    x = event.clientX - rect.left
    y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y);
    make_base(x,y);
}

canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e)
})


//make_base();

function make_base(x,y)
{
//   base_image = new Image();
//   if(num === 1){
//     base_image.src = '../pages/miku.png';
//   } else if(num === 2){
//     base_image.src = '../pages/chicken.png';
//   } else if (num === 3){
//     base_image.src = '../pages/corn.jpg';
//   } else if (num === 4){
//     base_image.src = '../pages/owo.png';
//   } else {
//       console.log("error");
//   }

//   base_image.onload = function(){
//     context.drawImage(base_image, x, y);
//     console.log("draw");
//   }
    
    var img = document.getElementById("miku");
    context.drawImage(img, x, y, 40, 40);

}

function onKeyDown(event) {
    console.log(event.keyCode);
    switch(event.keyCode)  {

      case 49:
          num = 1;
          break;
      case 50:
           num =2 ;
        break;

    case 51:
        num = 3;
        break;
    case 52:
            num =4 ;
        break;
    }
    make_base();
}

var lastMouseX = 0, lastMouseY = 0;

    ///////////////////////////////////////////////////////////////

     function onDocumentMouseDown( event ) {
          event.preventDefault();
          document.addEventListener( 'mousemove', onDocumentMouseMove, false );
          document.addEventListener( 'mouseup', onDocumentMouseUp, false );
          document.addEventListener( 'mouseout', onDocumentMouseOut, false );
          x = event.clientX;
          y = event.clientY;

      }


     function onDocumentMouseMove( event ) {
          x = event.clientX;
          y = event.ClientY; 

     }

     function onDocumentMouseUp( event ) {
          document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
          document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
          document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
     }

     function onDocumentMouseOut( event ) {
          document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
          document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
          document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
     }