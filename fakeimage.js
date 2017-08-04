const NativeImage = Image;

class FakeImage {
    constructor(w, h) {
        let self = this;
        const nativeImage = new NativeImage(w, h);
        const handler = {
            set: function(obj, prop, value) {
                if (prop === 'src') {
                    console.log('gotcha ' + value);
                    let host = self.getHostname(value);
                    console.log('host', host);
                    let ecommerceFlag = self.getParameterByName('ec', value);
                    let orderId = self.getParameterByName('ti', value);
                    console.log('ecommerceFlag',ecommerceFlag);
                    console.log('orderId',orderId);
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

    getParameterByName(name, url) {
        name = name.replace(/[\[\]]/g, "\\$&");
        let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    getHostname(url) {
        return (new URL(url)).hostname;
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

var temp = document.createElement;
document.createElement = function(tagName) {
    if(tagName == "img") return new Image();
    return temp.call(this, tagName);
};
