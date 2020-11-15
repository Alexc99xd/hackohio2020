var db = firebase.firestore();

function checkStats(){
    updateBG();
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
            document.getElementById("stats").innerHTML = "<h3>Our current stats</h3>";
            document.getElementById("count").innerHTML = "<h3>Columbus has redeemed " + count + " total stickers!</h3>";
            document.getElementById("parks").innerHTML = "<h3>The Columbus community has revitalized its parks with " + parks + " amount of stickers</h3>";
            document.getElementById("recreational").innerHTML = "<h3>The recreational community has given out " + recreational + " stickers!</h3>";
            document.getElementById("restaurants").innerHTML = "<h3>The restaurants of Columbus thank you for the " + restaurants + " stickers given out!</h3>";
            document.getElementById("special_events").innerHTML = "<h3>Special Events of Columbus has given out " + special_events + " stickers!</h3>";
            document.getElementById("week").innerHTML = "<h3>This week, we have given out " + week + " stickers! Why don't you join in on the fun!</h3>";

        } 
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

    updateProgressBar();
    
}

function updateBG(){
    particlesJS("particles-js", {"particles":{"number":{"value":6,"density":{"enable":true,"value_area":800}},"color":{"value":"#1b1e34"},"shape":{"type":"polygon","stroke":{"width":0,"color":"#000"},"polygon":{"nb_sides":6},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.3,"random":true,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":160,"random":false,"anim":{"enable":true,"speed":10,"size_min":40,"sync":false}},"line_linked":{"enable":false,"distance":200,"color":"#ffffff","opacity":1,"width":2},"move":{"enable":true,"speed":8,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":false,"mode":"grab"},"onclick":{"enable":false,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});var count_particles, stats, update; 
    // stats = new Stats; stats.setMode(0); 
    // stats.domElement.style.position = 'absolute'; 
    // stats.domElement.style.left = '0px'; s
    // tats.domElement.style.top = '0px'; 
    // document.body.appendChild(stats.domElement); 
    count_particles = document.querySelector('.js-count-particles'); update = function() { stats.begin(); stats.end(); if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) 
        { 
            //count_particles.innerText = window.pJSDom[0].pJS.particles.array.length; 
        }
         requestAnimationFrame(update); }; requestAnimationFrame(update);;
}

function updateProgressBar(){

    var docRef = db.collection("stats").doc("sticker");
    docRef.get().then(function(doc) {
        if (doc.exists) {
            var docData = doc.data();
            var count = docData.count;
            const stickerGoal = 25000;
            const percent = count/stickerGoal;

            document.getElementById('progress-details').innerHTML = `We have received ${(percent * 100).toFixed(2)}% of our goal of ${stickerGoal} stickers`;

            var bar = new ProgressBar.SemiCircle('#progress-container', {
                strokeWidth: 6,
                easing: 'easeInOut',
                color: '#9600ff',
                trailColor: '#ea3001',
                trailWidth: 1,
                duration: 12000,
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
                    bar.setText(value + "% Goal: " + stickerGoal + " stickers");
                    }
            
                    bar.text.style.color = state.color;
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