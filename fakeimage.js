const NativeImage = Image;

class FakeImage {
  constructor(w, h) {
    const nativeImage = new NativeImage(w, h);
    const handler = {
      set: function(obj, prop, value) {
        if (prop === 'src') {
          console.log('gotcha ' + value);
        }
        return nativeImage[prop] = value;
      },
      get: function(target, prop) {
        let result = target[prop];
        if (typeof result === 'function') {
          result = result.bind(target);
        }
        return result;
      }
    };
    const prox = new Proxy(nativeImage, handler);
    try {
      prox[Symbol.toStringTag] = 'HTMLImageElement';
    } catch(e){}
    return prox;
  }  
}

FakeImage.prototype[Symbol.toStringTag] = NativeImage.prototype.toString();

Object.defineProperty(FakeImage, 'name', {
  enumerable: false,
  configurable: false,
  writable: false,
  value: 'Image'
});

if ('toSource' in NativeImage) { // FF extra
  Object.defineProperty(FakeImage, 'toSource', {
    enumerable: false,
    configurable: false,
    writable: true,
    value: function() {
      return NativeImage.toSource();
    }
  });
}

Object.defineProperty(FakeImage, 'toString', {
  enumerable: true,
  configurable: false,
  writable: true,
  value: function() {
    return NativeImage.toString();
  }
});

Image = FakeImage;

document.createElement = function(tagName) {
    if(tagName == "img") return new Image();
    return temp.call(this, tagName);
};

