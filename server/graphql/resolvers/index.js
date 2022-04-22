
const resolver = {
    userQuery: (args) => {
        try {           
            const userInput = args.messageInput.text;
            let array = [];
            array.push(userInput);
            return array;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = resolver;