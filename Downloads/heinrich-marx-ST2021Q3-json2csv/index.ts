type customObj = {
  [key:string]:string
}
import fs from 'fs'
import path  from 'path';
import stream from 'stream';
const arr = process.argv;
const pathIn = path.join(__dirname, arr[2]);
const pathOut = path.join(__dirname, arr[3]);
let cachePieceObj:string;
const arrWithKeys:string[] = [];
let flag = false;
let flagFirstChunk = true
const transform = new stream.Transform({
  transform(data:string, _encoding, callBack:Function) {
    const str = cachePieceObj ? cachePieceObj + data.toString() : data.toString();
    let strWithKeys = '';
    let strWithValues = '';
    let finalStr = '';
    const emptyStr = '';
    const firstIndex = str.indexOf('{');
    const lastIndex = str.lastIndexOf('}');
    const str2 = str.slice(firstIndex, lastIndex + 1);
    const arr = JSON.parse('[' + str2 + ']');
    cachePieceObj = str.slice(lastIndex + 1);
    arr.forEach((el:customObj, i:number) => {
      if (!i && flagFirstChunk) {
        for (let key in el) {
          arrWithKeys.push(key);
          strWithValues += el[key] + ',';
        }
        strWithValues = strWithValues.slice(0, strWithValues.length - 1);
        strWithValues += '\n';
        flagFirstChunk = false
      } else {
        arrWithKeys.forEach(elem => {
          el[elem] ? strWithValues += el[elem] + ',' : strWithValues += emptyStr + ',';
        });
        strWithValues = strWithValues.slice(0, strWithValues.length - 1);
        strWithValues += '\n';
      }
    });
    strWithKeys = arrWithKeys.join();
    !flag ? finalStr = strWithKeys + '\n' + strWithValues : finalStr += strWithValues;
    this.push(finalStr);
    flag = true;
    callBack();
  }
})
 const readable = fs.createReadStream(pathIn)
const writable = fs.createWriteStream(pathOut)
readable.pipe(transform).pipe(writable)


