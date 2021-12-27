export const threeDigitSeparator = (value: any) => {
    try {
        if (!value) {
            return "";
        }

        const isValueTypeSuitable = typeof value === "number" || typeof value === "string";
        if (!isValueTypeSuitable) {
            return "";
        }

        // Convert the `value` to string
        value += "";

        return value.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        // return value.toLocaleString('en')
    }
    catch (e) {
        return "";
    }
}


export const convertToEnglishWord = (num: any, customJoinCharacter?: any) => {
    const strNum = num.toString();
    let end;

    const and = customJoinCharacter || "and";

    /* Is number zero? */
    if (parseInt(strNum, 0) === 0) {
        return "zero";
    }

    /* Array of units as words */
    const units = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];

    /* Array of tens as words */
    const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

    /* Array of scales as words */
    const scales = ["", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion", "sextillion", "septillion", "octillion", "nonillion", "decillion", "undecillion", "duodecillion", "tredecillion", "quatttuor-decillion", "quindecillion", "sexdecillion", "septen-decillion", "octodecillion", "novemdecillion", "vigintillion", "centillion"];

    /* Split user arguemnt into 3 digit chunks from right to left */
    let start = strNum.length;
    const chunks = [];
    while (start > 0) {
        end = start;
        chunks.push(strNum.slice((start = Math.max(0, start - 3)), end));
    }

    /* Check if function has enough scale words to be able to stringify the user argument */
    const chunksLen = chunks.length;
    if (chunksLen > scales.length) {
        return "";
    }

    /* Stringify each integer in each chunk */
    const words = [];
    for (let i = 0; i < chunksLen; i += 1) {

        const chunk = parseInt(chunks[i], 0);

        if (chunk) {

            /* Split chunk into array of individual integers */
            const ints = chunks[i].split("").reverse().map(parseFloat);

            /* If tens integer is 1, i.e. 10, then add 10 to units integer */
            if (ints[1] === 1) {
                ints[0] += 10;
            }

            /* Add scale word if chunk is not zero and array item exists */
            let word = scales[i];
            if (word) {
                words.push(word);
            }

            /* Add unit word if array item exists */
            word = units[ints[0]];
            if (word) {
                words.push(word);
            }

            /* Add tens word if array item exists */
            word = tens[ints[1]];
            if (word) {
                words.push(word);
            }

            /* Add 'and' string after units or tens integer if: */
            if (ints[0] || ints[1]) {

                /* Chunk has a hundreds integer or chunk is the first of multiple chunks */
                if (ints[2] || (!i && chunksLen)) {
                    words.push(and);
                }

            }

            /* Add hundreds word if array item exists */
            word = units[ints[2]];
            if (word) {
                words.push(word + " hundred");
            }

        }

    }

    return words.reverse().join(" ");
}


export const convertToPersianNum = (enDigit: any) => {
    try {
        if (!enDigit && !enDigit.toString().length) {
            return "";
        }

        const enDigitString = typeof enDigit === "number" ? enDigit.toString() : enDigit;

        let newValue = "";
        for (let i = 0; i < enDigitString.length; i += 1) {
            const ch = enDigitString.charCodeAt(i);
            if (ch >= 48 && ch <= 57) {
                // european digit range
                const newChar = ch + 1728;
                newValue += String.fromCharCode(newChar);
            }
            else {
                newValue += String.fromCharCode(ch);
            }
        }
        return newValue;
    } catch (e) {
        return "";
    }
};


export const convertToPersianWord = (num: number) => {
    try {
        let numStr = num.toString();

        let negative = "";
        if ((!num && num !== 0) || isNaN(num) === true || (typeof num !== "number" && typeof num !== "string")) {
            return "";
        }

        if (num % 1 !== 0 && num % 1 !== -0) {
            num = Math.floor(num * 1);
        }
        if (Math.sign(num) === -1) {
            num *= -1;
            negative = " منفی ";
        } else if (Math.sign(num) !== -1) {
            negative = "";
        }

        const spliter = " و ";
        const zero = "صفر";
        const Letters = [
            ["", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"],
            ["ده", "یازده", "دوازده", "سیزده", "چهارده", "پانزده", "شانزده", "هفده", "هجده", "نوزده", "بیست"],
            ["", "", "بیست", "سی", "چهل", "پنجاه", "شصت", "هفتاد", "هشتاد", "نود"],
            ["", "صد", "دویست", "سیصد", "چهارصد", "پانصد", "ششصد", "هفتصد", "هشتصد", "نهصد"],
            ["", " هزار ", " میلیون ", " میلیارد ", " تریلیون ", " تریلیارد ",
                " کوآدریلیون ", " کادریلیارد ", " کوینتیلیون ", " کوانتینیارد ", " سکستیلیون ", " سکستیلیارد ", " سپتیلیون ",
                " سپتیلیارد ", " اکتیلیون ", " اکتیلیارد ", " نانیلیون ", " نانیلیارد ", " دسیلیون ", " دسیلیارد "]
        ];
        if (typeof num === "number") {
            numStr = num.toString();
        }
        const NumberLength = numStr.length % 3;
        if (NumberLength === 1) {
            numStr = "00" + num;
        } else if (NumberLength === 2) {
            numStr = "0" + num;
        }
        // Explode to array
        const reg = numStr.replace(/\d{3}(?=\d)/g, "$&*").split("*");
        // return reg;

        // const ThreeNumbersToLetter = "";
        if (parseInt(numStr, 0) === 0 || numStr === "" || num === null || num === undefined) {
            return zero;
        }
        if (numStr.length > 66) {
            return "خارج از محدوده";
        }
        // Split to sections
        const SplitedNumber = reg;
        // Fetch Sections and convert
        const funcout = [];
        const SplitLength = SplitedNumber.length;
        for (let i = 0; i < SplitLength; i += 1) {
            const SectionTitle = Letters[4][SplitLength - (i + 1)];
            const converted = toThreeNumbersToLetter(SplitedNumber[i], Letters, spliter);
            if (converted !== "") {
                funcout.push(converted + SectionTitle);
            }
        }
        return negative + funcout.join(spliter);

    }
    catch (e) {
        return "";
    }
};

const toThreeNumbersToLetter = (num: any, Letters: any, splitter: any) => {
    let one;
    let ten;

    if (parseInt(num, 0) === 0) {
        return "";
    }
    const parsedInt = parseInt(num, 0);
    if (parsedInt < 10) {
        return Letters[0][parsedInt];
    }
    if (parsedInt <= 20) {
        return Letters[1][parsedInt - 10];
    }
    if (parsedInt < 100) {
        one = parsedInt % 10;
        ten = (parsedInt - one) / 10;
        if (one > 0) {
            return Letters[2][ten] + splitter + Letters[0][one];
        }
        return Letters[2][ten];
    }
    one = parsedInt % 10;
    const hundreds = (parsedInt - parsedInt % 100) / 100;
    ten = (parsedInt - ((hundreds * 100) + one)) / 10;
    const out = [Letters[3][hundreds]];
    const SecendPart = ((ten * 10) + one);
    if (SecendPart > 0) {
        if (SecendPart < 10) {
            out.push(Letters[0][SecendPart]);
        } else if (SecendPart <= 20) {
            out.push(Letters[1][SecendPart - 10]);
        } else {
            out.push(Letters[2][ten]);
            if (one > 0) {
                out.push(Letters[0][one]);
            }
        }
    }
    return out.join(splitter);
}