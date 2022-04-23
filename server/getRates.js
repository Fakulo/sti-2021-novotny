const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports.getRatesEUR = async () => {
    try {
        let returnData = {
            amount: 0,
            rate: 0,
            code: "",
            currency: "",
            country: "",
            date: ""
        }
        const response = await fetch('https://www.cnb.cz/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/denni_kurz.txt');
        if(!response.ok){
            throw new Error("Kurz momentálně není k dispozici.");
        }
        const data = await response.text();
        const lines = data.split(/\r?\n/);
        returnData.date = lines[0].split(" ")[0];

        lines.every(line => {
            line = line.split("|");
            if (line[0] === "EMU") {
                returnData.country = line[0];
                returnData.currency = line[1];
                returnData.amount = line[2];
                returnData.code = line[3];
                returnData.rate = line[4];
                return false;
            }
            return true;
        });
        //console.log(returnData);
        return returnData;
    }
    catch(err) {
        throw new Error(err.message);
    }
}

