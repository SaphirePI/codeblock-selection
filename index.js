const inject = (client_object, field) => {
    new Promise((resolve, reject) => {
        client = client_object;
        delete module.exports['inject'];
        try {
            if (!client.dataManager) throw new Error("Sorry, discord.js only!")
            Object.defineProperty(client, field ? field : 'select', {
                get: function () { return module.exports['selection']; },
                enumerable: false,
                configurable: false
            })
            resolve(true);
        } catch (error) {
            throw new Error(error.message === 'Sorry, discord.js only!' ? 'Sorry, discord.js only!' : "Please, provide a client");
        };
    });
}
const checkForClient = () => this.client ? true : new Error("No client provided");

const selection = async function (message, selections = [], options = {}) {
    this.message = message;
    if (!Array.isArray(selections)) return [selections, 0];
    if (!selections.length) return [];
    if (selections.length == 1) return [selections[0], 0];
    let { title = "Меню выбора", footer = "Наберите соответствующую цифру для ответа", mapFunc, cancel = 'exit', time = 60, add = 1 } = options,
        choices = (mapFunc ? selections.map(mapFunc) : selections).slice(0, 10),
        mess;
    try {
        mess = await this.message.channel.send(`\`\`\`xl\n${title}\n\n${choices.map((c, i) => `[${i + add}] ${c}`).join('\n')}${selections.length > 10 ? '\n' + `И ещё ${selections.length - 10} пунктов` : ''}\n\n${Array.isArray(footer) ? footer.join('\n') : footer}\nВведите '${cancel}', чтобы выйти из меню\`\`\``);
        let coll = this.message.channel.createMessageCollector(m => m.author.id == this.message.author.id, { time: time * 1000 });


        const awaitMessages = async (msg) => {
            let ans;
            try {
                ans = await coll.next;
                let content = ans.content.toLowerCase()
                if (content == cancel) {
                    this.message.channel.send('Выход из меню...');
                    return Promise.reject()
                }
                try {
                    if (isNaN(parseInt(ans.content)) || (parseInt(ans.content) < 0 || parseInt(ans.content) > selections.length + 1)) throw "asdas"
                    return ans.content;
                } catch (err) {
                    const display = err.err || err.message || err;
                    const p2 = this.message.channel.send(`Предоставлен недействительный ответ. Попробуйте ещё раз. Введите '${cancel}', чтобы выйти из меню`);
                    return awaitMessages(p2);
                }
            } catch (e) {
                console.log(e)
                return Promise.reject(e);
            }
        }
        const b = await awaitMessages(mess);
        return [selections[b - 1], b - 1];
        /*let ans = await coll.next,
            resp = ans.content;
        return [selections[resp - 1], resp - 1];*/
        //return [selections[resp - 1], resp - 1];
        //FIX
    } catch (e) {
        return [];
    }
}

module.exports = {
    inject, selection
}