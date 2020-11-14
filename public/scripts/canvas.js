var canvas = document.getElementById('viewport'),
context = canvas.getContext('2d');
var num = 1;
var x = 0;
var y = 0;

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    x = event.clientX - rect.left;
    y = event.clientY - rect.top*1.5;
    console.log("x: " + x + " y: " + y);
    make_base(x,y);
}

canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e)
})


//make_base();

function make_base(x,y)
{
    
    var img = document.getElementById(num);
    context.drawImage(img, x, y, 40, 40);

}

function run(){

    var e = document.getElementById("ddlViewBy");
    num = e.value;

}

function save(){

    var link = document.getElementById('link');
    link.setAttribute('download', 'stickerio_image.png');
    link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
    link.click();
  
  }