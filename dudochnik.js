function addImageOnloadCallback(callback) {
    var oldSend, i;
    if (Image.callbacks) {
        Image.callbacks.push(callback);
    } else {
        Image.callbacks = [callback];
        oldImageOnload = Image.prototype.onload;
        Image.prototype.onload = function() {
            for (i = 0; i < Image.callbacks.length; i++) {
                Image.callbacks[i](this);
            }
            oldImageOnload.apply(this, arguments);
        }
    }
}

addImageOnloadCallback(function(res) {
  console.log('image onload', res);
})
