A Library that Makes You Able to Convert any Number to Persian Word. This Library Supports Negative Numbers and Strings :+1:.


With npm
use
```
npm i @behzadsoleimani/persian-currency-converter
```
or
```
yarn add @behzadsoleimani/persian-currency-converter
```
then use:

```
import * as Converter from "@behzadsoleimani/persian-currency-converter"
```

Functions
To Use This Library You Can Call All of it's Functions using Converter.functionName();
```
Converter.convertToPersianNum(number);
// Input: a number as int or string
```


Output: Converted Number to it's Word (string)

Example:
```
Converter.convertToPersianNum(987); // نهصد و هشتاد و هفت
Converter.convertToPersianNum(-3214); //منفی سه هزار و دویست و چهارده
Converter.convertToPersianNum(5648789778); 
// پنج میلیارد و ششصد و چهل و هشت میلیون و هفتصد و هشتاد و نه هزار و هفتصد و هفتاد و هشت
```

Input: a number as int or string (Optional) (number should be in english)
