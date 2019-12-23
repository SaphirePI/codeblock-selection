# Codeblock selections

- [Codeblock selections](#codeblock-selections)
    - [Установка](#%d0%a3%d1%81%d1%82%d0%b0%d0%bd%d0%be%d0%b2%d0%ba%d0%b0)
    - [Подключенние](#%d0%9f%d0%be%d0%b4%d0%ba%d0%bb%d1%8e%d1%87%d0%b5%d0%bd%d0%bd%d0%b8%d0%b5)
    - [Примеры использования](#%d0%9f%d1%80%d0%b8%d0%bc%d0%b5%d1%80%d1%8b-%d0%b8%d1%81%d0%bf%d0%be%d0%bb%d1%8c%d0%b7%d0%be%d0%b2%d0%b0%d0%bd%d0%b8%d1%8f)
### Установка

```bash
git clone https://github.com/thex49/codeblock-selection.git

yarn install
```

Вам потребуется создать папку plugins если ее нет, и перекинуть папку туда.

### Подключенние 
```js
const Discord = require('discord.js');
const client = new Discord.Client();

const module = require('./plugins/codeblock_selection/index.js');
module.inject(client);
/*
* Теперь плагин доступен в client.select
* Нахождение плагина так же можно измен
* ить если передать второй аргумент
*/
module.inject(client, 'choose');
// Плагин доступен в client.choose
```

### Примеры использования 

```js
let selected = await client.select(message, message.guild.channels.map(x=>x.name));
```

![image](http://i.imgur.com/VSNvOUm.png)
