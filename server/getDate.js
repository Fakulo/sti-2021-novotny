
/**
 * 
 * @param {Date} startingDate Počáteční den
 * @param {Int} number Kolik dní se má odečíst/přičíst
 * @param {Boolean} add True pokud přičíst / False pokud odečíst
 * @returns 
 */
module.exports.getDate = (startingDate, number, add) => {
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }     
    let date;
    if (add) {
        date = new Date(new Date().setDate(startingDate.getDate() + number));
        return new Intl.DateTimeFormat('cs-CZ', options).format(date).replace(" ","").replace(" ","");
      } else {
        date = new Date(new Date().setDate(startingDate.getDate() - number));
        return new Intl.DateTimeFormat('cs-CZ', options).format(date).replace(" ","").replace(" ","");
      }
}

