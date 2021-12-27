export const convertToPersianNum = (num: number) => {
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