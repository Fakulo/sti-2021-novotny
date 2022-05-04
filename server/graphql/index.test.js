const graphQLResolver = require('./resolvers/index');

let defaultAnswers = ["Zkus to znovu", "Na tuto 'otázku' neumím odpovědět", "Momentálně mám odstávku, zkus to později", "Programátoři mě odflákli, takže na tento dotaz neumím odpovědět",
                "Hele! Běž si dělat šoufky z někoho jiného", "Zkus příkaz 'help' - to je jediné, co ti pomůže ;)", "Nemáš jiné věci na práci, než mě tady spamovat?"];
let helpAnswers = ["Aktuálně umím příkazy:","jak se jmenuješ","jaký je čas","kurz eur na czk"];

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
        expect(output[0]).toMatch(/Aktuální kurz ze dne [0-9]{2}.[0-9]{2}.[0-9]{4}: 1 EUR = [0-9]{2},[0-9]{3} CZK/);
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

    test("Zadání s mezerami a interpukncí", async () => {
        const output = await callResolver("jak .  se ..-_jmenuješ ");
        expect(output[0]).toStrictEqual("Moje jméno je ChatoB :-)");
    }); 
    test("Zadání s mezislovy", async () => {
        const output = await callResolver("jak ahoj se máš nebo jmenuješ ");
        expect(output[0]).toStrictEqual("Moje jméno je ChatoB :-)");
    }); 
});