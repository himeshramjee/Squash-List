// Function purpse: 
//        Accepts a number and returns a locale formatted currency representation.
// Status: Working.
//        This function did something unexpected (for me) that results in string comparison failing when it shouldn't.
//        Turns out the issue was with the encoding of a 'space' or literal character in the currency format. 
//        ' ' has ASCII code 32 whilst the version output by the currency formatter has ASCII code 160 which is the 
//        non-breaking Space version.
//        Rewriting it as a ' ' or '' (removing it) results in the comparison check passing.
// Reproducable: 
//        Yes, the issue is demonstrated in the sef.test.ts file.
// Comment: 
//        The issue plays out when trying to validate a string as currency using express-validator node package which is regex based. 
//        The regex is kak to read and I'm not sure exactly where it failing the check but I think that's secondary to fixing the issue with the formatCurrency method. Or at least understanding the reason for that equality check failing.
export const formatCurrency = (price: number, locale: string = "en-ZA", currencyCode: string = "ZAR"): string => {
  if (!price) {
    throw new Error("Price is required");
  }

  var formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode
  });

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatToParts
  // Holy smokes.
  // console.log(formatter.formatToParts(price));

  var priceString = formatter.formatToParts(price).map(({type, value}) => { 
    switch (type) {
      case "literal": {
        console.log(`Char code per formatter: ${value.charCodeAt(0)}.`);            // [Output] 160
        console.log(`Char code per normal string literal: ${" ".charCodeAt(0)}.`);  // [Output] 32

        return ' '; // Magic line that bring back world peace.
      };
      case 'group': return `,`;
      case 'decimal': return `.`;
      default : return value; 
    } 
  }).reduce((string, part) => string + part);

  return priceString;
};