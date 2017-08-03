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

function getHostname(url) {
    return (new URL(url)).hostname;
}

document.addEventListener('fetch', function(res) {
    console.log('fetch', res)
})

addXMLRequestCallback(function(xhr) {
    console.log(xhr);
    
    xhr.onreadystatechange = function() {
        console.log('xhr.readyState', xhr.readyState)
        
        //if (xhr.readyState == XMLHttpRequest.DONE) {
    
            var responseUrl = xhr.responseURL;

            console.log('xhr.responseURL', responseUrl);

            console.log('xhr.responseURL', typeof responseUrl);

            if (!responseUrl) return;
            var responseHostname = getHostname(responseUrl);
            console.log('responseHostname ', responseHostname);
            if (responseHostname !== 'www.google-analytics.com') return;

            var ecommerceFlag = getParameterByName('ec', responseUrl);
            console.log('ecommerceFlag ', ecommerceFlag);

            if (!ecommerceFlag || ecommerceFlag !== 'ecommerce') return;
            var orderId = getParameterByName('ti', responseUrl);

            console.log('order id is ', orderId);
        //}
    }
});
