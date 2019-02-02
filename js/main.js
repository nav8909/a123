if('serviceWorker' in  navigator) {
    // window.addEventListener('load', function() {   //segun google developers
        navigator.serviceWorker.register('/service-worker.js') // TODO : update to your correct filename
        .then(function(reg) {
        console.log('Registration succeded');
            // If you want to force but it's made automatically
            // reg.update();
        })
        .catch(function(err) {
            console.error('Registration failed with ' + err);
        })
    // }); // eliminar esto y segun google developers
    
} else {
    console.error('no serviceWorker available');
}



if(window.Notification && Notification.permission !== 'denied' ) {
    Notification.requestPermission(status => {
        console.log(status)
        let n = new Notification('Te avisaremos lo nuevo', {
            body: 'Te haremos saber de la nueva información que subamos :)',
            icon: './HM.png'
        })
    })
}

