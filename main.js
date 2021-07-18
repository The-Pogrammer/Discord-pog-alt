const Discord = require("discord.js");
const client = new Discord.Client();
//damage taken will be dam - def/3 + 1
const expneed = [
	0, 10, 20, 40, 50, 80, 100, 200, 300, 400, 500, 800, 1000, 1500, 2000, 3000,
	5000, 10000, 25000, 49999,
];
Array.prototype.insert = function (index, item) {
	this.splice(index, 0, item);
};
var playertab = [];
newline = `
`;
client.on("ready", function() {
    client.user.setActivity(":!commands")
});
class player {
    constructor(token, monfight, monhealth, exp, Gold, curract, attack, love, def, playhealth, tothealth) {
        this.token = token;
        this.monfight = monfight;
        this.monhealth = monhealth;
        this.exp = exp;
        this.Gold = Gold;
        this.curract = curract;
        this.attack = attack;
        this.love = love;
        this.def = def;
        this.playhealth = playhealth;
        this.tothealth = tothealth;
    }
}
class Mon {
    constructor(name, gif, health, rewardg, rewarde, dam, actreplys) {
        this.name = name;
        this.gif = gif;
        this.health = health;
        this.rewardg = rewardg;
        this.rewarde = rewarde;
        this.dam = dam;
        this.actreplys = actreplys;
        this.requiredact = actreplys.length-1;
    }
}
const monstertable = [
    new Mon("Froggit", "froggit.gif", 30, 20, 10, 5, ["Froggit is now your friend and will spare you!", "You compliment Froggit, he doesn't understand what you said but he's flattered anyway."]),
    new Mon("Whimsun", "whimsun.gif", 10, 2, 2, 0, ["Whimsun is already sparing you!"]),
    new Mon("Vegetoid", "vegetoid.gif", 72, 4, 5, 5, ["Vegetoid will spare you now!", "You eat your greens!"]),
    new Mon("Loox", "loox.gif", 50, 5, 7, 5, [`Loox is sparing you`, `You don't pick on Loox, "Finally! Someone understands!"`]),
    new Mon("Moldsmal", "moldsmal.gif", 50, 3, 3, 3, ["Moldsmal is done wiggling.", "You wiggle with Moldsmal, he enjoys the attention."]),
    new Mon("Temmie", "tem.gif", 25, "tem", "tem", 1, ["Temmie is temmed out.", "You feed Temmie tem flakes."])
];
function findsubstr(str, index, length) {
    var substring = str.substr(index, length);
    return substring;
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function randtab(table) {
    return table[getRandomInt(table.length)];
};
function extra() {
    var d = -1;
    d = getRandomInt(9);
    if (d <= 2) {
        return -1
    } else if (d >= 6) {
        return 0
    } else {
        return 1
    }
}
client.on('message', message =>{
    if (message.content.startsWith(":!")) {
            var messagecurr = message;
            messagecurr.content = messagecurr.content.toLowerCase();
            if (messagecurr.content.startsWith(":!d")) {
            if (messagecurr.author.id == "697959912302444614" || messagecurr.author.id == "365637054249566208") {
                if (messagecurr.content.startsWith(":!dtest")) {
                    var intable = false;
                    var position = 0;
                    for (i = 0; i < playertab.length; i++) {
                        if (playertab[i].token == messagecurr.author.id) {
                            intable = true;
                            position = i;
                        }
                    }
                    if (intable) {
                        playertab[position].love = 20;
                        playertab[position].attack = (playertab[position].love*2)+8
                    } else {
                        messagecurr.channel.send("Your not in the table");
                    }
                }
                if (messagecurr.content.startsWith(":!dreset")) {
                    var intable = false;
                    var position = 0;
                    for (i = 0; i < playertab.length; i++) {
                        if (playertab[i].token == messagecurr.author.id) {
                            intable = true;
                            position = i;
                        }
                    }
                    var arr = messagecurr.content.split(" ");
                    if (arr[1] == undefined) {
                        playertab[position].exp = 0;
                        playertab[position].Gold = 0;
                        playertab[position].love = 1;
                        playertab[position].attack = 10;
                        playertab[position].tothealth = 20;
                        playertab[position].playhealth = 20;
                        playertab[position].def = 3;
                        console.log(playertab[position].def);
                    } else {
                        arr[1] = findsubstr(arr[1], 3, arr[1].length - 4)
                        var position = -1;
                        for (i = 0; i < playertab.length; i++) {
                            if (playertab[i].token == arr[1]) {
                                position = i;
                            }
                        }
                        if (position > -1) {
                            playertab[position].exp = 0;
                            playertab[position].Gold = 0;
                            playertab[position].love = 1;
                            playertab[position].attack = 10;
                            playertab[position].tothealth = 20;
                            playertab[position].playhealth = 20;
                            playertab[position].def = 3;
                        } else {
                            messagecurr.mhannel.send("That user does not exist.");
                        }
                    }
                }
                if (messagecurr.content == ":!dspare") {
                    var intable = false;
                    var position = 0;
                    var hasmon = true;
                    for (i = 0; i < playertab.length; i++) {
                        if (playertab[i].token == messagecurr.author.id) {
                            intable = true;
                            position = i;
                            if (playertab[i].monfight == "false") {
                                hasmon = false;
                            }
                        }
                    }
                    if (intable && hasmon) {
                        if (playertab[position].monfight.name == "Temmie") {
                            messagecurr.channel.send(new Discord.MessageEmbed()
                                .setDescription("*You receive a tem flake")
                            );
                            playertab[position].monfight = "false";
                        } else {
                            messagecurr.channel.send(new Discord.MessageEmbed()
                                .setDescription(playertab[position].monfight.name + " was spared! " + newline + "You Gained 0 EXP and " + playertab[position].monfight.rewardg + " Gold")
                            );
                            playertab[position].Gold += playertab[position].monfight.rewardg;
                            playertab[position].monfight = "false";
                        }
                    } else {
                        messagecurr.channel.send("you have no encounter, please use `:!enc`.");
                    }
                }
                if (messagecurr.content == ":!dfight") {
                    var intable = false;
                    var position = 0;
                    var hasmon = true;
                    for (i = 0; i < playertab.length; i++) {
                        if (playertab[i].token == messagecurr.author.id) {
                            intable = true;
                            position = i;
                            if (playertab[i].monfight == "false") {
                                hasmon = false;
                            }
                        }
                    }
                    if (intable && hasmon) {
                        newitem = playertab[position].monfight;
                        playertab[position].monhealth = 0;
                        if (playertab[position].monhealth <= 0) {
                            if (playertab[position].monfight.name != "Temmie") {
                                playertab[position].exp += playertab[position].monfight.rewarde;
                                playertab[position].Gold += playertab[position].monfight.rewardg;
                            }
                            if (playertab[position].Gold < 0 || isNaN(playertab[position].Gold) || playertab[position].Gold == undefined) {
                                playertab[position].Gold = 0;
                            }
                            if (playertab[position].exp < 0 || isNaN(playertab[position].exp) || playertab[position].exp == undefined) {
                                playertab[position].exp = 0;
                            }
                            if (playertab[position].exp > 99999) {
                                playertab[position].exp = 99999
                            }
                            if (playertab[position].Gold > 1000000000000000) {
                                playertab[position].Gold = 1000000000000000
                            }
                            if (playertab[position].exp >= expneed[playertab[position].love]) {
                                while (playertab[position].exp >= expneed[playertab[position].love]) {
                                    playertab[position].exp -= expneed[playertab[position].love];
                                    console.log("exp" + playertab[position].exp);
                                    playertab[position].love += 1;
                                    playertab[position].def = playertab[position].love*3;
                                    attackadd = (playertab[position].love*2)+8;
                                    playertab[position].tothealth = playertab[position].love * 4 + 16
                                }
                                playertab[position].attack = attackadd;
                                messagecurr.channel.send(new Discord.MessageEmbed()
                                    .setDescription("You win, you monster! You Gained " + playertab[position].monfight.rewarde + " EXP and " + playertab[position].monfight.rewardg + " Gold!" + newline + ":heart: Love up! ATK: " + attackadd + "  DEF: " + Math.floor(playertab[position].def/3) + "  HP: " + playertab[position].tothealth)
                                );
                            } else {
                                messagecurr.channel.send(new Discord.MessageEmbed()
                                    .setDescription("You win, you monster! You Gained " + playertab[position].monfight.rewarde + " EXP and " + playertab[position].monfight.rewardg + " Gold!")
                                );
                            }
                            playertab[position].monfight = "false";
                        } else {
                            messagecurr.channel.send(new Discord.MessageEmbed()
                                .attachFiles(newitem.gif)
                                .setDescription(playertab[position].monhealth + "/" + newitem.health)
                            );
                        }
                    } else {
                        messagecurr.channel.send("you have no encounter, please use `:!enc`.");
                    }
                }
                if (messagecurr.content.startsWith(":!dexp")) {
                    var position = 0;
                    var intable = false;
                    for (i = 0; i < playertab.length; i++) {
                        if (playertab[i].token == messagecurr.author.id) {
                            position = i;
                            intable = true;
                        }
                    }
                    var arr = messagecurr.content.split(" ");
                    console.log(arr);
                    if (arr[3] == undefined) {
                        if (isNaN(Number(arr[1]))) {
                            messagecurr.channel.send("thats not a real value");
                        } else {
                            if (intable) {
                                playertab[position].exp += Number(arr[1]);
                            } else {
                                messagecurr.channel.send("Your not on the list");
                            }
                        }
                    } else {
                        arr[2] = findsubstr(arr[2], 2, arr[2].length - 3)
                        var position = -1;
                        for (i = 0; i < playertab.length; i++) {
                            if (playertab[i].token == arr[2]) {
                                position = i;
                            }
                        }
                        if (position > -1) {
                            if (isNaN(Number(arr[1]))) {
                                messagecurr.channel.send("thats not a real value");
                            } else {
                                var position = -1;
                                for (i = 0; i < playertab.length; i++) {
                                    if (playertab[i].token == arr[3]) {
                                        position = i;
                                    }
                                }
                                if (position > -1) {
                                    playertab[position].exp += Number(arr[1]);
                                } else {
                                    messagecurr.channel.send("They're not on the list");
                                }
                            }
                        } else {
                            messagecurr.channel.send("Either that user isnt in the list or they dont exist at all, please try again.");
                        }
                    }
                }
                if (messagecurr.content.startsWith(":!dgold")) {
                    var position = 0;
                    var intable = false;
                    for (i = 0; i < playertab.length; i++) {
                        if (playertab[i].token == messagecurr.author.id) {
                            position = i;
                            intable = true;
                        }
                    }
                    var arr = messagecurr.content.split(" ");
                    console.log(arr);
                    if (arr[3] == undefined) {
                        if (isNaN(Number(arr[1]))) {
                            messagecurr.channel.send("thats not a real value");
                        } else {
                            if (intable) {
                                playertab[position].Gold += Number(arr[1]);
                            } else {
                                messagecurr.channel.send("Your not on the list");
                            }
                        }
                    } else {
                        arr[2] = findsubstr(arr[2], 2, arr[2].length - 3)
                        var position = -1;
                        for (i = 0; i < playertab.length; i++) {
                            if (playertab[i].token == arr[2]) {
                                position = i;
                            }
                        }
                        if (position > -1) {
                            if (isNaN(Number(arr[1]))) {
                                messagecurr.channel.send("thats not a real value");
                            } else {
                                var position = -1;
                                for (i = 0; i < playertab.length; i++) {
                                    if (playertab[i].token == arr[3]) {
                                        position = i;
                                    }
                                }
                                if (position > -1) {
                                    playertab[position].Gold += Number(arr[1]);
                                } else {
                                    messagecurr.channel.send("They're not on the list");
                                }
                            }
                        } else {
                            messagecurr.channel.send("Either that user isnt in the list or they dont exist at all, please try again.");
                        }
                    }
                }
                if (messagecurr.content == ":!dcommands") {
                    messagecurr.channel.send("`:!dfight for instant monster killing." + newline + ":!dspare for sparing monsters without acting." + newline + ":!dexp <amount> <person> to add exp to other people or yourself." + newline + ":!dgold <amount> <person> to add gold to other people or yourself." + newline + ":!dreset <player> for resetting a players exp and gold due to hacking or glitches." + newline + ":!dtest for specific testing, this command changes function alot.`");
                }
            } else {
                messagecurr.channel.send("You don't have debug perms.");
            }
        } else {
            if (messagecurr.content == ":!act") {
                var intable = false;
                var position = 0;
                var hasmon = true;
                for (i = 0; i < playertab.length; i++) {
                    if (playertab[i].token == messagecurr.author.id) {
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
                            messagecurr.channel.send(new Discord.MessageEmbed()
                                .setDescription("*" + playertab[position].monfight.actreplys[playertab[position].curract])
                            );
                            playertab[position].curract -= 1;
                        } else {
                            messagecurr.channel.send(new Discord.MessageEmbed()
                                .setDescription("*" + playertab[position].monfight.actreplys[0])
                            );
                        }
                        var egg = " damage!"
                        if (playertab[position].monfight.name == "Temmie") {
                            egg = " damegg!"
                        }
                        playertab[position].playhealth -= Math.floor(playertab[position].monfight.dam - playertab[position].def/3 + 1);
                        messagecurr.channel.send(new Discord.MessageEmbed()
                            .setDescription(playertab[position].monfight.name + " does " + Math.floor(playertab[position].monfight.dam - playertab[position].def/3 + 1) + egg + newline + "HP: " + playertab[position].playhealth + "/" + playertab[position].tothealth)
                        );
                    } else {
                        messagecurr.channel.send("you have no encounter, please use `:!enc`.");
                    }
                } else {
                    messagecurr.channel.send("you have no encounter, please use `:!enc`.");
                }
            }
            if (messagecurr.content == ":!commands") {
                messagecurr.channel.send("`:!enc for getting monster encounters." + newline + ":!spare for sparing monsters." + newline + ":!check for seeing your current fight if it gets buried." + newline + ":!stats <person> for seeing your or others stats." + newline + ":!fight for fighting monsters like a monster." + newline + ":!act for acting so you can spare.`");
            }
            console.log(playertab);
            if (messagecurr.content.startsWith(":!stats")) {
                var arr = messagecurr.content.split(" ");
                if (arr[1] == undefined) {
                    var intable = false;
                    var position = -1;
                    for (i = 0; i < playertab.length; i++) {
                        if (playertab[i].token == messagecurr.author.id) {
                            intable = true;
                            position = i;
                        }
                    }
                    if (intable) {
                        if (playertab[position].Gold < 0 || isNaN(playertab[position].Gold) || playertab[position].Gold == undefined) {
                            playertab[position].Gold = 0;
                        }
                        if (playertab[position].exp < 0 || isNaN(playertab[position].exp) || playertab[position].exp == undefined) {
                            playertab[position].exp = 0;
                        }
                        if (playertab[position].exp > 99999) {
                            playertab[position].exp = 99999
                        }
                        if (playertab[position].Gold > 1000000000000000) {
                            playertab[position].Gold = 1000000000000000
                        }
                        messagecurr.channel.send(new Discord.MessageEmbed()
                            .setDescription("You have " + playertab[position].exp + " EXP and " + playertab[position].Gold + " Gold." + newline + "Love: " + playertab[position].love + "    ATK: " + playertab[position].attack + "    DEF: " + Math.floor(playertab[position].def/3))
                        );
                    } else {
                        playertab.insert(0, new player(messagecurr.author.id, "false", 0, 0, 0, 0, 10, 1, 3, 20, 20));
                        messagecurr.channel.send(new Discord.MessageEmbed()
                            .setDescription("You have 0 EXP and 0 Gold." + newline + "Love: 1    ATK: 10    DEF: 1")
                        );
                    }
                } else {
                    arr[1] = findsubstr(arr[1], 3, arr[1].length - 4)
                    var position = -1;
                    for (i = 0; i < playertab.length; i++) {
                        if (playertab[i].token == arr[1]) {
                            position = i;
                        }
                    }
                    if (position > -1) {
                        if (playertab[position].Gold < 0 || isNaN(playertab[position].Gold) || playertab[position].Gold == undefined) {
                            playertab[position].Gold = 0;
                        }
                        if (playertab[position].exp < 0 || isNaN(playertab[position].exp) || playertab[position].exp == undefined) {
                            playertab[position].exp = 0;
                        }
                        if (playertab[position].exp > 99999) {
                            playertab[position].exp = 99999
                        }
                        if (playertab[position].Gold > 1000000000000000) {
                            playertab[position].Gold = 1000000000000000
                        }
                        messagecurr.channel.send(new Discord.MessageEmbed()
                            .setDescription("<@" + arr[1] + "> has " + playertab[position].exp + " EXP and " + playertab[position].Gold + " Gold." + newline + "Love: " + playertab[position].love + "    ATK: " + playertab[position].attack + "    DEF: " + Math.floor(playertab[position].def/3))
                        );
                    } else {
                        messagecurr.channel.send("That user doesn't have any stats because they haven't done :!stats or :!enc");
                    }
                }
            }
            if (messagecurr.content == ":!spare") {
                var intable = false;
                var position = 0;
                var hasmon = true;
                for (i = 0; i < playertab.length; i++) {
                    if (playertab[i].token == messagecurr.author.id) {
                        intable = true;
                        position = i;
                        if (playertab[i].monfight == "false") {
                            hasmon = false;
                        }
                    }
                }
                if (intable && hasmon) {
                    if (playertab[position].curract == 0) {
                        if (playertab[position].monfight.name == "Temmie") {
                            messagecurr.channel.send(new Discord.MessageEmbed()
                                .setDescription("*You receive a tem flake")
                            );
                            playertab[position].monfight = "false";
                        } else {
                            messagecurr.channel.send(new Discord.MessageEmbed()
                                .setDescription(playertab[position].monfight.name + " was spared! " + newline + "You Gained 0 EXP and " + playertab[position].monfight.rewardg + " Gold")
                            );
                            playertab[position].Gold += playertab[position].monfight.rewardg;
                            playertab[position].monfight = "false";
                        }
                    } else {
                        messagecurr.channel.send(playertab[position].monfight.name + " doesn't want to spare you!");
                    }
                } else {
                    messagecurr.channel.send("you have no encounter, please use `:!enc`.");
                }
            }
            if (messagecurr.content == ":!fight") {
                var intable = false;
                var position = 0;
                var hasmon = true;
                for (i = 0; i < playertab.length; i++) {
                    if (playertab[i].token == messagecurr.author.id) {
                        intable = true;
                        position = i;
                        if (playertab[i].monfight == "false") {
                            hasmon = false;
                        }
                    }
                }
                if (intable && hasmon) {
                    newitem = playertab[position].monfight;
                    playertab[position].monhealth -= playertab[position].attack + extra();
                    if (playertab[position].monhealth <= 0) {
                        if (playertab[position].monfight.name != "Temmie") {
                            playertab[position].exp += playertab[position].monfight.rewarde;
                            playertab[position].Gold += playertab[position].monfight.rewardg;
                        }
                        if (playertab[position].Gold < 0 || isNaN(playertab[position].Gold) || playertab[position].Gold == undefined) {
                            playertab[position].Gold = 0;
                        }
                        if (playertab[position].exp < 0 || isNaN(playertab[position].exp) || playertab[position].exp == undefined) {
                            playertab[position].exp = 0;
                        }
                        if (playertab[position].exp > 99999) {
                            playertab[position].exp = 99999
                        }
                        if (playertab[position].Gold > 1000000000000000) {
                            playertab[position].Gold = 1000000000000000
                        }
                        if (playertab[position].exp >= expneed[playertab[position].love]) {
                            while (playertab[position].exp >= expneed[playertab[position].love]) {
                                playertab[position].exp -= expneed[playertab[position].love];
                                console.log("exp" + playertab[position].exp);
                                playertab[position].love += 1;
                                playertab[position].def = playertab[position].love + 2;
                                attackadd = (playertab[position].love*2)+8;
                                playertab[position].tothealth = playertab[position].love * 4 + 16
                            }
                            playertab[position].attack = attackadd;
                            messagecurr.channel.send(new Discord.MessageEmbed()
                                .setDescription("You win, you monster! You Gained " + playertab[position].monfight.rewarde + " EXP and " + playertab[position].monfight.rewardg + " Gold!" + newline + ":heart: Love up! ATK: " + attackadd + "  DEF: " + Math.floor(playertab[position].def/3) + "  HP: " + playertab[position].tothealth)
                            );
                        } else {
                            messagecurr.channel.send(new Discord.MessageEmbed()
                                .setDescription("You win, you monster! You Gained " + playertab[position].monfight.rewarde + " EXP and " + playertab[position].monfight.rewardg + " Gold!")
                            );
                        }
                        playertab[position].monfight = "false";
                    } else {
                        if (playertab[position].monhealth/playertab[position].monfight.health <= 0.35) {
                            playertab[position].curract = 0;
                            messagecurr.channel.send(new Discord.MessageEmbed()
                                .attachFiles(newitem.gif)    
                                .setDescription(playertab[position].monhealth + "/" + newitem.health + " *" + playertab[position].monfight.name + " doesn't want to fight anymore.")
                            );
                        } else {
                            messagecurr.channel.send(new Discord.MessageEmbed()
                                .attachFiles(newitem.gif)
                                .setDescription(playertab[position].monhealth + "/" + newitem.health)
                            );
                        }
                        var egg = " damage!"
                        if (playertab[position].monfight.name == "Temmie") {
                            egg = " damegg!"
                        }
                        playertab[position].playhealth -= Math.floor(playertab[position].monfight.dam - playertab[position].def/3 + 1);
                        messagecurr.channel.send(new Discord.MessageEmbed()
                            .setDescription(playertab[position].monfight.name + " does " + Math.floor(playertab[position].monfight.dam - playertab[position].def/3 + 1) + egg + newline + "HP: " + playertab[position].playhealth + "/" + playertab[position].tothealth)
                        );
                    }
                } else {
                    messagecurr.channel.send("you have no encounter, please use `:!enc`.");
                }
            }
            if (messagecurr.content == ":!check") {
                var intable = false;
                var position = 0;
                var hasmon = true;
                for (i = 0; i < playertab.length; i++) {
                    if (playertab[i].token == messagecurr.author.id) {
                        intable = true;
                        position = i;
                        if (playertab[i].monfight == "false") {
                            hasmon = false;
                        }
                    }
                }
                if (intable && hasmon) {
                    newitem = playertab[position].monfight;
                    messagecurr.channel.send(new Discord.MessageEmbed()
                        .attachFiles(newitem.gif)
                        .setDescription("The fight continues! " + newitem.name + " is at " + playertab[position].monhealth + "/" + newitem.health)
                    );
                } else {
                    messagecurr.channel.send("you have no encounter, please use `:!enc`.");
                }
            }
            if (messagecurr.content == ":!enc") {
                var sintable = false;
                var sposition = -1;
                var shasmon = true;
                for (i = 0; i < playertab.length; i++) {
                    if (playertab[i].token == messagecurr.author.id) {
                        sintable = true;
                        sposition = i;
                        if (playertab[i].monfight == "false") {
                            shasmon = false;
                        }
                    }
                }
                if (sintable) {
                    if (shasmon == true) {
                        messagecurr.channel.send("you already have an encounter.");
                    } else {
                        newitem = randtab(monstertable);
                        playertab[sposition].playhealth = playertab[sposition].tothealth;
                        playertab[sposition].monfight = newitem;
                        playertab[sposition].monhealth = newitem.health
                        playertab[sposition].curract = newitem.requiredact;
                        messagecurr.channel.send(new Discord.MessageEmbed()
                            .attachFiles(newitem.gif)
                            .setDescription("A wild " + newitem.name + " has appeared!")
                        );
                    }
                } else {
                    newitem = randtab(monstertable);
                    playertab.insert(0, new player(messagecurr.author.id, newitem, newitem.health, 0, 0, newitem.requiredact, 10, 1, 3, 20, 20));
                    messagecurr.channel.send(new Discord.MessageEmbed()
                        .attachFiles(newitem.gif)
                        .setDescription("A wild " + newitem.name + " has appeared!")
                    );
                }
            }
        }
    }
});

client.login('token'); //put your bots token here
