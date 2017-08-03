var imgc = Image.prototype.constructor;
Image = function () {
    imgc.apply(this, arguments);
    console.log ('ccc', this, this instanceof Image);
    var self = this;

    this.addEventListener ("load", function () {
        alert ('yes');
    }, false);

};



//Object.defineProperty(HTMLImageElement.prototype, 'onload', {
  //configurable: true,
  //enumerable: true,
  //value: function () {
    //console.log(this, "loaded");
  //}
//});
