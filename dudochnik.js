function addImageOnloadCallback(callback) {
    var oldSend, i;
    if (HTMLImageElement.callbacks) {
        HTMLImageElement.callbacks.push(callback);
    } else {
        HTMLImageElement.callbacks = [callback];
        HTMLImageElement.prototype.onload = function() {
            for (i = 0; i < HTMLImageElement.callbacks.length; i++) {
                HTMLImageElement.callbacks[i](this);
            }
        }
    }
}

addImageOnloadCallback(function(res) {
  console.log('image onload', res);
});


//Object.defineProperty(HTMLImageElement.prototype, 'onload', {
  //configurable: true,
  //enumerable: true,
  //value: function () {
    //console.log(this, "loaded");
  //}
//});
