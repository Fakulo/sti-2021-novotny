const { getDate } = require("./getDate");
const { getRatesEUR } = require("./getRatesEUR");

/**
 * 
 * @returns Doporučí zda nakoupit eura nebo ne.
 */
module.exports.recommendBuy = async () => {
  try {
    const date = new Date();
    let returnData = [];
    let yesterday = 1;
    let dayBeforeYesterday = 2;
    let dateToday = getDate(date, 0, false);
    const rateToday = await getRatesEUR(dateToday);
    const rateTodayFloat = parseFloat(rateToday.rate);

    if (rateToday.date < getDate(date, 1, false)) {
      dateToday = getDate(date, 1, false);
      yesterday = 2;
      dayBeforeYesterday = 3;
      returnData.push("Kurzy ČNB za poslední 3 dny: (dnes aktuálně není vypsán kurz)")
    }
    else { returnData.push("Kurzy ČNB za poslední 3 dny:") }

    let dateYesterday = new Date();
    dateYesterday = getDate(date, yesterday, false);
    const rateYesterday = await getRatesEUR(dateYesterday);
    const rateYesterdayFloat = parseFloat(rateYesterday.rate);

    let dateDayBeforeYesterday = new Date();
    dateDayBeforeYesterday = getDate(date, dayBeforeYesterday, false);
    const rateDayBeforeYesterday = await getRatesEUR(dateDayBeforeYesterday);
    let rateDayBeforeYesterdayFloat = parseFloat(rateDayBeforeYesterday.rate);

    if (rateToday && rateYesterday && rateDayBeforeYesterday) {
      const average = (rateTodayFloat + rateYesterdayFloat + rateDayBeforeYesterdayFloat) / 3;
      const tenPercent = (average * 1.1).toFixed(3);
      const percent = 100 - (rateTodayFloat * 100 / rateDayBeforeYesterdayFloat);

      returnData.push("Kurz dne " + dateDayBeforeYesterday + ": " + rateDayBeforeYesterdayFloat.toFixed(3) + " CZK");
      returnData.push("Kurz dne " + dateYesterday + ": " + rateYesterdayFloat.toFixed(3) + " CZK");
      returnData.push("Kurz dne " + dateToday + ": " + rateTodayFloat.toFixed(3) + " CZK");

      if (rateDayBeforeYesterdayFloat >= rateYesterdayFloat && rateYesterdayFloat >= rateTodayFloat) {
        returnData.push("Na základě těchto dat DOPURUČUJI nákup EUR! Cena totiž KLESÁ! Rozdíl činí: " + percent.toFixed(2) + " %");
        returnData.push("Průměr je: " + average.toFixed(2));
        returnData.push("10 % je: " + tenPercent);
      }
      else if (tenPercent > rateToday.rate) {
        returnData.push("Na základě těchto dat NEDOPURUČUJI nákup EUR!");
        returnData.push("Průměr je: " + average.toFixed(2));
        returnData.push("10 % je: " + tenPercent);
      }
    }
    //console.log(returnData);
    return returnData;
  }
  catch (err) {
    throw new Error(err.message);
  }
}

