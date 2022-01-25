const createAutoComplete = (data) => {
    return function (string) {
        const arr = [];
        let str;
        if (string) str = string.toLowerCase();
        function Binary(startIndex, endIndex) {
            if (startIndex > endIndex) return arr;
            const middleIndex = Math.floor((startIndex + endIndex) / 2);
            const word = data[middleIndex]
                .substring(0, string.length)
                .toLowerCase();
            if (word > str) {
                Binary(startIndex, middleIndex - 1);
            } else if (word < str) {
                Binary(middleIndex + 1, endIndex);
            } else if (word === str) {
                let indexUp = middleIndex;
                let indexDown = middleIndex;
                let wordToUp = word;
                let wordToDown = word;
                while (wordToDown.startsWith(str) && indexDown) {
                    indexDown--;
                    wordToDown = data[indexDown].toLowerCase();
                }
                while (wordToUp.startsWith(str) && indexUp < data.length - 1) {
                    indexUp++;
                    wordToUp = data[indexUp].toLowerCase();
                }
                for (let i = indexDown; i <= indexUp; i++) {
                    if (data[i].toLowerCase().startsWith(str))
                        arr.push(data[i]);
                }
            }
        }
        if (str) Binary(0, data.length - 1);
        return arr;
    };
};

module.exports.createAutoComplete = createAutoComplete;
