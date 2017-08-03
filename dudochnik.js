Object.defineProperty(HTMLImageElement.prototype, 'onload', {
  configurable: true,
  enumerable: true,
  value: function () {
    console.log(this, "loaded");
  }
});
