const graphQLResolver = require('./resolvers/index');
const recommendBuy = require('../recommendBuy');

let defaultAnswers = ["Zkus to znovu", "Na tuto 'otázku' neumím odpovědět", "Momentálně mám odstávku, zkus to později", "Programátoři mě odflákli, takže na tento dotaz neumím odpovědět",
                "Hele! Běž si dělat šoufky z někoho jiného", "Zkus příkaz 'help' - to je jediné, co ti pomůže ;)", "Nemáš jiné věci na práci, než mě tady spamovat?"];
let helpAnswers = ["Aktuálně umím příkazy:","jak se jmenuješ","jaký je čas","kurz eur na czk","mám koupit eur","kurz dne dd.mm.rrrr"];
let recommendAnswers=["Kurzy ČNB za poslední 3 dny: (dnes aktuálně není vypsán kurz)","Kurzy ČNB za poslední 3 dny:"];


async function callResolver(userInput) {
    const input = { messageInput: {text: userInput} };
    const output = await graphQLResolver.userQuery(input);
    return output;
}

describe("Resolvers", () => {    
    test("Jméno", async () => {
        const output = await callResolver("jak se jmenuješ");
        expect(output[0]).toStrictEqual("Moje jméno je ChatoB :-)");
    });

    test("Čas", async () => {
        const output = await callResolver("jaký je čas");
        expect(output[0]).toMatch(/Aktuální čas serveru je: [0-9]{2}:[0-9]{2}:[0-9]{2}/);
    });

    test("Kurz", async () => {
        const output = await callResolver("kurz eur na czk");
        expect(output[0]).toMatch(/Aktuální kurz ze dne [0-9]{2}.[0-9]{2}.[0-9]{4}: 1 EUR = [0-9]{2}.[0-9]{3} CZK/);
    });

    test("Help", async () => {
        const output = await callResolver("help");
        expect(output).toStrictEqual(helpAnswers);        
    });    

    test("Neúplné zadání jméno", async () => {
        const output = await callResolver("jak jmenuješ");
        expect(defaultAnswers).toContainEqual(output[0]);        
    }); 

    test("Neúplné zadání čas", async () => {
        const output = await callResolver("co čas");
        expect(defaultAnswers).toContainEqual(output[0]);        
    });

    test("Neúplné zadání kurz", async () => {
        const output = await callResolver("jaký je czk");
        expect(defaultAnswers).toContainEqual(output[0]);        
    });

    test("Více zadání", async () => {
        const output = await callResolver("jak se jmenuješ a jaký je čas");
        expect(output[0]).toStrictEqual("Moje jméno je ChatoB :-)");
    });

    test("Žádné zadání", async () => {
        const output = await callResolver("");
        expect(defaultAnswers).toContainEqual(output[0]);
    });    

    test("Zadání s mezerami", async () => {
        const output = await callResolver("jak   se    jmenuješ ");
        expect(output[0]).toStrictEqual("Moje jméno je ChatoB :-)");
    }); 

    test("Zadání s mezislovy", async () => {
        const output = await callResolver("jak ahoj 12.05.2022 se máš nebo jmenuješ ");
        expect(output[0]).toStrictEqual("Moje jméno je ChatoB :-)");
    }); 

    test("Doporučení nákupu", async () => {
        const output = await callResolver("mám koupit EUR");
        expect(recommendAnswers).toContainEqual(output[0]);
        expect(output[1]).toMatch(/Kurz dne [0-9]{2}.[0-9]{2}.[0-9]{4}: [0-9]{2}.[0-9]{3} CZK/);
        expect(output[2]).toMatch(/Kurz dne [0-9]{2}.[0-9]{2}.[0-9]{4}: [0-9]{2}.[0-9]{3} CZK/);
        expect(output[3]).toMatch(/Kurz dne [0-9]{2}.[0-9]{2}.[0-9]{4}: [0-9]{2}.[0-9]{3} CZK/);
        expect(output[4]).toContain("nákup EUR!");
        expect(output[5]).toContain("Hrana nákupu:");
        expect(output[6]).toMatch(/Průměr za poslední 3 dny je: [0-9]{2}.[0-9]{2} CZK/);
    }); 

   /* test("Nedoporučení nákupu", async () => {
        const output = await recommendBuy.recommendBuy("10.05.2022");

        expect(recommendAnswers).toContainEqual(output[0]);
        expect(output[1]).toMatch(/Kurz dne [0-9]{2}.[0-9]{2}.[0-9]{4}: [0-9]{2}.[0-9]{3} CZK/);
        expect(output[2]).toMatch(/Kurz dne [0-9]{2}.[0-9]{2}.[0-9]{4}: [0-9]{2}.[0-9]{3} CZK/);
        expect(output[3]).toMatch(/Kurz dne [0-9]{2}.[0-9]{2}.[0-9]{4}: [0-9]{2}.[0-9]{3} CZK/);
        expect(output[4]).toContain("nákup EUR!");
        expect(output[5]).toContain("Hrana nákupu:");
        expect(output[6]).toMatch(/Průměr za poslední 3 dny je: [0-9]{2}.[0-9]{2} CZK/);
    }); */

    test("Zobrazení historie - všední den", async () => {
        const output = await callResolver("kurz dne 10.05.2022");
        expect(output[0]).toContain("Kurz ze dne 10.05.2022: 1 EUR = 25.010 CZK");
    }); 

    test("Zobrazení historie - víkend", async () => {
        const output = await callResolver("kurz dne 08.05.2022");
        expect(output[0]).toContain("Nejbližší kurz ke dni 08.05.2022 je ze dne 06.05.2022: 1 EUR = 24.665 CZK");
    }); 
});