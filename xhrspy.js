var tempGlobal;

function addXMLRequestCallback(callback) {
    var oldSend, i;
    if (XMLHttpRequest.callbacks) {
        XMLHttpRequest.callbacks.push(callback);
    } else {
        XMLHttpRequest.callbacks = [callback];
        oldSend = XMLHttpRequest.prototype.send;
        XMLHttpRequest.prototype.send = function() {
            for (i = 0; i < XMLHttpRequest.callbacks.length; i++) {
                XMLHttpRequest.callbacks[i](this);
            }
            oldSend.apply(this, arguments);
        }
    }
}

function getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

addXMLRequestCallback(function(xhr) {
    console.log(xhr);
    
    if (!xhr || !xhr.responseURL) return;
    if ((new URL(url)).hostname !== 'www.google-analytics.com') return;
    
    var ecommerceFlag = getParameterByName('ec', xhr.responseURL);
    if (!ecommerceFlag || ecommerceFlag !== 'ecommerce') return;
    var orderId = getParameterByName('ti', xhr.responseURL);
    
    console.log('order id  is ', orderId);
});
