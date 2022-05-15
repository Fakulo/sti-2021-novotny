const { getRatesEUR } = require("../../getRatesEUR");
const { getDate } = require("../../getDate");
const { recommendBuy } = require("../../recommendBuy");

const resolver = {
    userQuery: async (args, req) => {
        try {
            const userInput = args.messageInput.text;
            //console.log("Dotaz: '" + userInput);

            // odpovědi na neznámé příkazy (7)
            let defaultAnswers = ["Zkus to znovu", "Na tuto 'otázku' neumím odpovědět", "Momentálně mám odstávku, zkus to později", "Programátoři mě odflákli, takže na tento dotaz neumím odpovědět",
                "Hele! Běž si dělat šoufky z někoho jiného", "Zkus příkaz 'help' - to je jediné, co ti pomůže ;)", "Nemáš jiné věci na práci, než mě tady spamovat?"]

            // jaký je čas
            let progressTime = [false, false, false];

            // kurz EUR na CZK
            let progressRate = [false, false, false, false];

            // jak se jmenuješ
            let progressName = [false, false, false];

            // mám koupit EUR
            let progressBuy = [false, false, false];

            // kurz dne dd.mm.rrrr
            let progressHistory = [false, false];

            const words = userInput.replace(/[?=]/g, '').replace(/ +(?= )/g, '').toLowerCase().trim().split(" ");
            let result = [];

            let dateHistory = "";

            words.every(word => {
                switch (word) {
                    case "mám":
                        if (!progressBuy[0]) progressBuy[0] = true;
                        break;

                    case "koupit":
                        if (progressBuy[0]) progressBuy[1] = true;
                        break;

                    case "jaký":
                        if (!progressTime[0]) progressTime[0] = true;
                        break;

                    case "je":
                        if (progressTime[0]) progressTime[1] = true;
                        break;

                    case "čas":
                        if (progressTime[1]) {
                            progressTime[2] = true;
                            result.push("Aktuální čas serveru je: " + new Date().toTimeString().split(' ')[0]);
                            return false;
                        }
                        break;

                    case "kurz":
                        if (!progressRate[0]) progressRate[0] = true;
                        if (!progressHistory[0]) progressHistory[0] = true;
                        break;

                    case "dne":
                        if (progressHistory[0]) progressHistory[1] = true;
                        break;

                    case "eur":
                        if (progressRate[0]) progressRate[1] = true;
                        if (progressBuy[1]) {
                            progressBuy[2] = true;
                            return false;
                        }
                        break;

                    case "na":
                        if (progressRate[1]) progressRate[2] = true;
                        break;

                    case "czk":
                        if (progressRate[2]) {
                            progressRate[3] = true;
                            return false;
                        }
                        break;

                    case word.match(/[0-9]{2}.[0-9]{2}.[0-9]{4}/)?.input:
                        if (progressHistory[1]) {
                            dateHistory = word;
                            return false;
                        }
                        break;
                    case "jak":
                        if (!progressName[0]) progressName[0] = true;
                        break;

                    case "se":
                        if (progressName[0]) progressName[1] = true;
                        break;

                    case "jmenuješ":
                        if (progressName[1]) {
                            progressName[2] = true;
                            result.push("Moje jméno je ChatoB :-)");
                            return false;
                        }
                        break;

                    case "help":
                        result.push("Aktuálně umím příkazy:");
                        result.push("jak se jmenuješ");
                        result.push("jaký je čas");
                        result.push("kurz eur na czk");
                        result.push("mám koupit eur");
                        result.push("kurz dne dd.mm.rrrr");
                        return false;

                    default:
                        break;
                }
                return true;
            });
            if (progressRate[3]) {
                const rate = await getRatesEUR();
                if (rate) {
                    result.push("Aktuální kurz ze dne " + rate.date + ": " + rate.amount + " " + rate.code + " = " + rate.rate + " CZK");
                }
            }
            if (progressBuy[2]) {
                const response = await recommendBuy();
                response.forEach(element => {
                    result.push(element);
                });                
            }
            if (progressHistory[1]) {
                const rateHistory = await getRatesEUR(dateHistory);
                if(dateHistory == rateHistory.date){
                    result.push("Kurz ze dne " + rateHistory.date + ": " + rateHistory.amount + " " + rateHistory.code + " = " + rateHistory.rate + " CZK");
                }
                else {
                    result.push("Nejbližší kurz ke dni " + dateHistory + " je ze dne " + rateHistory.date + ": " + rateHistory.amount + " " + rateHistory.code + " = " + rateHistory.rate + " CZK");
                }
            }
            if (result.length == 0) {
                const min = 0;
                const max = defaultAnswers.length - 1;
                const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
                result.push(defaultAnswers[randomNumber]);
            }
            //console.log("Odpověď: " + result);

            return result;

        } catch (err) {
            return [err.message];
        }
    }
}

module.exports = resolver;