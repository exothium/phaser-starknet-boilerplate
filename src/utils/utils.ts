export function truncateString(fullStr, strLen, separator?) {
    if (fullStr.length <= strLen) return fullStr;

    separator = separator || '...';

    var sepLen = separator.length,
        charsToShow = strLen - sepLen,
        frontChars = Math.ceil(charsToShow/2),
        backChars = Math.floor(charsToShow/2);

    return fullStr.substr(0, frontChars) +
        separator +
        fullStr.substr(fullStr.length - backChars);
}

export function getViewFunctionsFromAbi(abi) {
    let views = [];
    abi.forEach((item) => {
        if (item.type === 'function' && item.stateMutability === 'view') {
            views.push(item);
        }
    });
    return views;
}

export function getWriteFunctionsFromAbi(abi) {
    let functions = [];
    abi.forEach((item) => {
        if (item.type === 'function' && item.stateMutability !== 'view') {
            functions.push(item);
        }
    });
    return functions;
}


