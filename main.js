const Discord = require('discord.js');
const client = new Discord.Client();
Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
};
var playertab = [];
newline = `
`;
class player {
    constructor(token, monfight, monhealth, exp, Gold, curract) {
        this.token = token;
        this.monfight = monfight;
        this.monhealth = monhealth;
        this.exp = exp;
        this.Gold = Gold;
        this.curract = curract;
    }
}
class Mon {
    constructor(name, gif, health, rewardg, rewarde, actreplys) {
        this.name = name;
        this.gif = gif;
        this.health = health;
        this.rewardg = rewardg;
        this.rewarde = rewarde;
        this.requiredact = actreplys.length-1;
        this.actreplys = actreplys;
    }
}
const monstertable = [
    new Mon("Froggit", "froggit.gif", 30, 20, 10, ["Froggit is now your friend and will spare you!", "You compliment Froggit, he doesn't understand what you said but he's flattered anyway."]),
    new Mon("Whimsun", "whimsun.gif", 10, 2, 2, ["Whimsun is already sparing you!"]),
    new Mon("Vegetoid", "vegetoid.gif", 72, 4, 6, ["Vegetoid will spare you now!", "You eat your greens!"]),
    new Mon("Loox", "loox.gif", 50, 5, 7, [`Loox is sparing you`, `You don't pick on Loox, "Finally! Someone understands!"`]),
    new Mon("Moldsmal", "moldsmal.gif", 50, 3, 3, ["Moldsmal is done wiggling.", "You wiggle with Moldsmal, he enjoys the attention."])
];
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function randtab(table) {
    return table[getRandomInt(table.length)];
};
client.on('message', message =>{
    if (message.content == "no u" && message.author.id != "853429979526070282") {
        message.channel.send("no u");
    }
    if (message.content.startsWith(":!")) {
        if (message.content == ":!act") {
            var intable = false;
            var position = 0;
            var hasmon = true;
            for (i = 0; i < playertab.length; i++) {
                if (playertab[i].token == message.author.id) {
                    intable = true;
                    position = i;
                    if (playertab[i].monfight == "false") {
                        hasmon = false;
                    }
                }
            }
            if (intable) {
                if (hasmon) {
                    if(playertab[position].curract != 0) {
                        message.channel.send("*" + playertab[position].monfight.actreplys[playertab[position].curract]);
                        playertab[position].curract -= 1;
                    } else {
                        message.channel.send("*" + playertab[position].monfight.actreplys[0]);
                    }
                } else {
                    message.channel.send("you have no encounter, please use `:!enc`.");
                }
            } else {
                message.channel.send("you have no fight, please use `:!enc`.");
            }
        }
        if (message.content == ":!commands") {
            message.channel.send("`:!enc for getting monster encounters." + newline + ":!spare for sparing monsters." + newline + ":!check for seeing your current fight if it gets buried." + newline + ":!stats for seeing your stats." + newline + ":!fight for fighting monsters like a monster." + newline + ":!act for acting so you can spare.`");
        }
        console.log(playertab);
        if (message.content == ":!stats") {
            var intable = false;
            var position = 0;
            var hasmon = true;
            for (i = 0; i < playertab.length; i++) {
                if (playertab[i].token == message.author.id) {
                    intable = true;
                    position = i;
                    if (playertab[i].monfight == "false") {
                        hasmon = false;
                    }
                }
            }
            if (intable) {
                message.channel.send(new Discord.MessageEmbed()
                    .setDescription("You have " + playertab[position].exp + " EXP and " + playertab[position].Gold + " Gold.")
                );
            } else {
                playertab.splice(playertab[i], 1, new player(message.author.id, "false", 0, 0, 0));
                message.channel.send(new Discord.MessageEmbed()
                    .setDescription("You have 0 EXP and 0 Gold.")
                );
            }
        }
        if (message.content == ":!spare") {
            var intable = false;
            var position = 0;
            var hasmon = true;
            for (i = 0; i < playertab.length; i++) {
                if (playertab[i].token == message.author.id) {
                    intable = true;
                    position = i;
                    if (playertab[i].monfight == "false") {
                        hasmon = false;
                    }
                }
            }
            if (intable) {
                if (playertab[position].curract == 0) {
                    message.channel.send(new Discord.MessageEmbed()
                        .setDescription(playertab[position].monfight.name + " was spared! " + newline + "You Gained 0 EXP and " + playertab[position].monfight.rewardg + " Gold")
                    );
                    playertab[position].Gold += playertab[position].monfight.rewardg;
                    playertab[position].monfight = "false";
                } else {
                    message.channel.send(playertab[position].monfight.name + " doesn't want to spare you!");
                }
            } else {
                message.channel.send("you have no fight, please use `:!enc`.");
            }
        }
        if (message.content == ":!fight") {
            var intable = false;
            var position = 0;
            var hasmon = true;
            for (i = 0; i < playertab.length; i++) {
                if (playertab[i].token == message.author.id) {
                    intable = true;
                    position = i;
                    if (playertab[i].monfight == "false") {
                        hasmon = false;
                    }
                }
            }
            if (intable && hasmon) {
                newitem = playertab[position].monfight;
                playertab[position].monhealth -= 20;
                if (playertab[position].monhealth <= 0) {
                    message.channel.send(new Discord.MessageEmbed()
                        .setDescription("You win, you monster! You Gained " + playertab[position].monfight.rewarde + " EXP and " + playertab[position].monfight.rewardg + " Gold!")
                    );
                    playertab[position].exp += playertab[position].monfight.rewarde;
                    playertab[position].Gold += playertab[position].monfight.rewardg;
                    playertab[position].monfight = "false";
                } else {
                    message.channel.send(new Discord.MessageEmbed()
                        .attachFiles(newitem.gif)
                        .setDescription(playertab[position].monhealth + "/" + newitem.health)
                    );
                }
            } else {
                message.channel.send("you have no fight, please use `:!enc`.");
            }
        }
        if (message.content == ":!check") {
            var intable = false;
            var position = 0;
            var hasmon = true;
            for (i = 0; i < playertab.length; i++) {
                if (playertab[i].token == message.author.id) {
                    intable = true;
                    position = i;
                    if (playertab[i].monfight == "false") {
                        hasmon = false;
                    }
                }
            }
            if (intable && hasmon) {
                newitem = playertab[position].monfight;
                message.channel.send(new Discord.MessageEmbed()
                    .attachFiles(newitem.gif)
                    .setDescription("The fight continues! " + newitem.name + " is at " + playertab[position].monhealth + "/" + newitem.health)
                );
            } else {
                message.channel.send("you have no encounter, please use `:!enc`.");
            }
        }
        if (message.content == ":!enc") {
            var intable = false;
            var position = 0;
            var hasmon = true;
            for (i = 0; i < playertab.length; i++) {
                if (playertab[i].token == message.author.id) {
                    intable = true;
                    position = i;
                    if (playertab[i].monfight == "false") {
                        hasmon = false;
                    }
                }
            }
            if (intable) {
                if (hasmon == true) {
                    message.channel.send("you already have an encounter.");
                } else {
                    newitem = randtab(monstertable);
                    playertab.splice(playertab[position], 1, new player(message.author.id, newitem, newitem.health, playertab[position].exp, playertab[position].Gold, newitem.requiredact));
                    message.channel.send(new Discord.MessageEmbed()
                        .attachFiles(newitem.gif)
                        .setDescription("A wild " + newitem.name + " has appeared!")
                    );
                }
            } else {
                newitem = randtab(monstertable);
                playertab.insert(0, new player(message.author.id, newitem, newitem.health, 0, 0, newitem.requiredact));
                message.channel.send(new Discord.MessageEmbed()
                    .attachFiles(newitem.gif)
                    .setDescription("A wild " + newitem.name + " has appeared!")
                );
            }
        }
    }
});

client.login('token'); //please put your bots token here if you want to use this
