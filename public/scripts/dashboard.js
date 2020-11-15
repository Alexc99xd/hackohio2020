
var db = firebase.firestore();
var loaded = false;

function startCircle(count){
    // progressbar.js@1.0.0 version is used
    // Docs: http://progressbarjs.readthedocs.org/en/1.0.0/
    const stickerMax = 10; //change this
    const percent = count/stickerMax;
    var bar = new ProgressBar.Circle(container, {
        color: '#9600ff',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 4,
        trailWidth: 1,
        easing: 'easeInOut',
        duration: 2400,
        text: {
        autoStyleContainer: false
        },
        from: { color: '#9600ff', width: 1 },
        to: { color: '#333', width: 4 },
        // Set default step function for all animate calls
        step: function(state, circle) {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);
    
        var value = Math.round(circle.value() * 100);
        if (value === 0) {
            circle.setText('');
        } else {
            circle.setText(value + "%");
        }
    
        }
    });
    bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar.text.style.fontSize = '2rem';
    
    // bar.animate(1.0);  // Number from 0.0 to 1.0
    if(percent >= 1){
        bar.animate(1);
    } else {
        bar.animate(percent);
    }
}
async function loadStickers(){
    if(!loaded){
        loaded = true;
        var docRef = db.collection("users").doc(firebase.auth().currentUser.uid);
        docRef.get().then(function(doc) {
            if (doc.exists) {
                for(let i = 1; i < 5; i++){
                    var str = "sticker_" + i;
                    if(doc.data()[str] != null){
                        //then get code
                        var code = doc.data()[str];

                        //use code to get "place"
                        getPlace(code, str);
                        //document.getElementById('stickerList').innerHTML += ('<li>'+ str + " from " + place +'</li>');

                    }
                }
                
                
                document.getElementById("sticker_title").innerHTML = "Number of stickers you have: " + doc.data().sticker_count + " stickers!";
                startCircle(doc.data().sticker_count);
            } else {

            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

    }
}

function getPlace(code, str){
    
    var docRef2 = db.collection("stickers").doc(code);
    
    docRef2.get().then(function(doc) {
        console.log(doc.data());
        if (doc.exists) {
            document.getElementById('stickerList').innerHTML += ('<li>'+ str + " from " + doc.data().place +'</li>');
            //return doc.data().place;
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    
}