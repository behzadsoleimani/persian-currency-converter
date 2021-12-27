A Library that Makes You Able to Convert any Number to Persian Word. This Library Supports Negative Numbers and Strings :+1:.


With npm
use
```
npm i persian-currency-converter
```
or
```
yarn add persian-currency-converter
```
then use:

```
import * as Converter from "persian-currency-converter"
```

Functions
To Use This Library You Can Call All of it's Functions using Converter.functionName();

convertToPersianWord:
```
Converter.convertToPersianWord(number);
// Input: a number as int or string (Optional) (number should be in english)
// Output: Converted Number to it's Word (string)
```

Example:
```
Converter.convertToPersianWord(987); // نهصد و هشتاد و هفت
Converter.convertToPersianWord(-3214); //منفی سه هزار و دویست و چهارده
Converter.convertToPersianWord(5648789778); 
// پنج میلیارد و ششصد و چهل و هشت میلیون و هفتصد و هشتاد و نه هزار و هفتصد و هفتاد و هشت
```

threeDigitSeparator:

```
Converter.threeDigitSeparator(number);
// Input: a number as int or string (Optional) (number should be in english)
// Output: Put thousandSeperator (string)
```

Example:
```
Converter.threeDigitSeparator(987); // 987
Converter.threeDigitSeparator(3214); //3,214
Converter.threeDigitSeparator(5648789778); // 5,648,789,778
```
convertToPersianNum:
```
Converter.convertToPersianNum(number);
// Input: a number as int or string (Optional) (number should be in english)
// Output: Persian String (string)
```
Example:
```
Converter.convertToPersianNum(123); // ۱۲۳
```

