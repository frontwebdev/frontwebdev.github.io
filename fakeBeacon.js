var originalBeacon = navigator.sendBeacon;
navigator.sendBeacon = function(url, data) {
    console.log(url);
    return temp.call(this, arguments);
};
