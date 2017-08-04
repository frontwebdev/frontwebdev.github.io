var originalBeacon = navigator.sendBeacon;
navigator.sendBeacon = function(url, data) {
    console.log(url);
    return originalBeacon.apply(this, arguments);
};
