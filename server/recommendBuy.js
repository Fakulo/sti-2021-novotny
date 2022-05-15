const { getDate } = require("./getDate");
const { getRatesEUR } = require("./getRatesEUR");

/**
 * 
 * @returns Doporučí zda nakoupit eura nebo ne.
 */
module.exports.recommendBuy = async (datetest="") => {
  try {
    let date;
    if(datetest==""){date = new Date();}
    else{date = new Date(datetest);}
    
    let returnData = [];
    let yesterday = 1;
    let dayBeforeYesterday = 2;
    let dateToday = getDate(date, 0, false);
    let dateTEST = getDate(date, 0, true);
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
      const difference = tenPercent - rateTodayFloat;

      returnData.push("Kurz dne " + dateDayBeforeYesterday + ": " + rateDayBeforeYesterdayFloat.toFixed(3) + " CZK");
      returnData.push("Kurz dne " + dateYesterday + ": " + rateYesterdayFloat.toFixed(3) + " CZK");
      returnData.push("Kurz dne " + dateToday + ": " + rateTodayFloat.toFixed(3) + " CZK");

      if (rateDayBeforeYesterdayFloat >= rateYesterdayFloat && rateYesterdayFloat >= rateTodayFloat) {
        returnData.push("DOPURUČUJI nákup EUR! Cena totiž KLESÁ! Rozdíl činí: " + percent.toFixed(2) + " %");
        returnData.push("Hrana nákupu: (rezerva): " + difference.toFixed(3) + " CZK");
      }
      else if (tenPercent < rateToday.rate) {returnData.push("DOPURUČUJI nákup EUR! Kurz nesoupá o více než 10 %!");
        returnData.push("Hrana nákupu: (zbývá): " + difference.toFixed(3) + " CZK");}
      else {returnData.push("NEDOPURUČUJI nákup EUR!");
        returnData.push("Hrana nákupu: (zbývá)" + difference.toFixed(3) + " CZK");}

      returnData.push("Průměr za poslední 3 dny je: " + average.toFixed(2) + " CZK");      
      }
      
    //console.log(returnData);
    return returnData;
  }
  catch (err) {
    throw new Error(err.message);
  }
}

