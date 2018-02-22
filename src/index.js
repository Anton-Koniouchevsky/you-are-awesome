// DO WHATEVER YOU WANT HERE

const createEnumerableProperty = (propertyName) => {
    return propertyName;
};

const createNotEnumerableProperty = (propertyName) => {
    Object.defineProperty(Object.prototype, propertyName, {
        get: function() { return Object.prototype._value; },
        set: function(newVal) {
            Object.prototype._value = newVal;
        },
    });
    return propertyName;
};

const createProtoMagicObject = () => {
    let protoMagicObject = new Function();
    Object.defineProperty(protoMagicObject, 'prototype', { value: null });
    Object.defineProperty(protoMagicObject, '__proto__', { value: null });
    return protoMagicObject;
};

let iterator = 0;
Function.prototype.valueOf = function() {
    return iterator;
};
const incrementor = () => {
    iterator++;
    return incrementor;
};

let asyncIterator = 0;
const asyncIncrementor = () => {
    return new Promise((resolve) => {
        return resolve(++asyncIterator);
    });
};

const createIncrementer = () => {
    return {
        i: 0,
        next() {
            return { value: ++this.i };
        },
        [Symbol.iterator]() {
            return {
                next: () => {
                    return this.next();
                },
            };
        },
    };
}

// return same argument not earlier than in one second, and not later, than in two
const returnBackInSecond = (param) => {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve(param);
        }, 1100);
    });
};


const getDeepPropertiesCount = (obj) => {
    let count = 0;

    properties = Object.getOwnPropertyNames(obj);
    count += properties.length;
    properties.forEach(property => {
        if (Object.getOwnPropertyNames(obj[property]).length > 0)
            count += getDeepPropertiesCount(obj[property]);
    });

    return count;
};



const createSerializedObject = function() {
    return null;
};

const sortByProto = (objects) => {
    return objects.map((object, index) => {
        let count = 0;
        while (object = object.__proto__) count++;
        return [count, objects[index]];
    }).sort((left, right) => right[0] - left[0]).map(([_, object]) => object);
};

exports.createEnumerableProperty = createEnumerableProperty;
exports.createNotEnumerableProperty = createNotEnumerableProperty;
exports.createProtoMagicObject = createProtoMagicObject;
exports.incrementor = incrementor;
exports.asyncIncrementor = asyncIncrementor;
exports.createIncrementer = createIncrementer;
exports.returnBackInSecond = returnBackInSecond;
exports.getDeepPropertiesCount = getDeepPropertiesCount;
exports.createSerializedObject = createSerializedObject;
exports.sortByProto = sortByProto;