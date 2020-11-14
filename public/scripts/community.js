var db = firebase.firestore();

function checkStats(){
    
    var docRef = db.collection("stats").doc("sticker");
    docRef.get().then(function(doc) {
        if (doc.exists) {
            var docData = doc.data();
            var count = docData.count;
            var parks = docData.parks;
            var recreational = docData.recreational;
            var restaurants = docData.restaurants;
            var special_events = docData.special_events;
            var week = docData.weekly;

            //update stuff
            document.getElementById("stats").innerHTML = "Our current stats";
            document.getElementById("count").innerHTML = "Columbus has redeemed " + count + " total stickers!";
            document.getElementById("parks").innerHTML = "The Columbus community has revitalized its parks with " + parks + " amount of stickers";
            document.getElementById("recreational").innerHTML = "The recreational community has given out " + recreational + " stickers!";
            document.getElementById("restaurants").innerHTML = "The restaurants of Columbus thank you for the " + restaurants + " stickers given out!";
            document.getElementById("special_events").innerHTML = "Special Events of Columbus has given out " + special_events + " stickers!";
            document.getElementById("week").innerHTML = "This week, we have given out " + week + " stickers! Why don't you join in on the fun!";

        } 
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

    updateProgressBar();
}

function updateProgressBar(){

    var docRef = db.collection("stats").doc("sticker");
    docRef.get().then(function(doc) {
        if (doc.exists) {
            var docData = doc.data();
            var count = docData.count;
            const stickerGoal = 6969;
            const percent = count/stickerGoal;

            document.getElementById('progress-details').innerHTML = `We have received ${(percent * 100).toFixed(2)}% of our goal of ${stickerGoal} stickers`;

            var bar = new ProgressBar.SemiCircle('#progress-container', {
                strokeWidth: 6,
                easing: 'easeInOut',
                color: '#9600ff',
                trailColor: '#ea3001',
                trailWidth: 1,
                duration: 1400,
                text: {
                    value: '',
                    alignToBottom: true
                },
                from: {color: '#9600ff'},
                to: {color: '#ea3001'},
                // Set default step function for all animate calls
                step: (state, bar) => {
                    bar.path.setAttribute('stroke', state.color);
                    var value = Math.round(bar.value() * 100);
                    if (value === 0) {
                    bar.setText('');
                    } else {
                    bar.setText(count + " stickers!");
                    }
            
                    bar.text.style.color = state.color;
                    //document.getElementById('progress-details').css("color", state.color);
                }
                });
                bar.text.style.fontSize = '4rem';
                if(percent >= 1){
                    bar.animate(1);
                } else {
                    bar.animate(percent);
                }
        }
    });

    
}


function animate(){
    requestAnimationFrame(animate);
    renderer.render(stage);
}