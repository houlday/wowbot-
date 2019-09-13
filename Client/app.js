const Discord = require('discord.js');
const Bot = new Discord.Client();

const Config = require("./data/Config.json");
const managers = ["424699524364107776", "312496648783921152", "521990537612492800"];
const alns = ['봇', "명령어", "커맨드", "커멘드"];
const alys = ['봇', "공지"];
let prefix = Config.Bot.prefix;


Bot.login(Config.Bot.$token);
console.log("와우봇이 가동 중입니다.");

Bot.on('ready', () => {
	console.log("정상적으로 가동됐습니다.");
	Bot.user.setActivity("대화");

	// Public
	Bot.on('message', function(message){
		let argv = message.content.replace(message.content.split(" ")[0], '').trim();
		function getCmd($msg, type) {
			if(!type){
				if (typeof($msg) == 'string') return message.content.toLowerCase() == (prefix+$msg.toLowerCase());
				if (typeof($msg) == 'object') return ($msg.indexOf(message.content.replace(prefix, '')) != -1);
			};
			
			if(type == 'mtc'){
				if (typeof($msg) == 'string') return message.content.toLowerCase() == (prefix+$msg.toLowerCase());
				if (typeof($msg) == 'object') return ~$msg.indexOf(message.content.replace(prefix, ''));
			};
			if(type == 'stw') return message.content.toLowerCase().startsWith(prefix+$msg.toLowerCase());
		};
		function sendChat($msg, type) {
			if (!type) return message.channel.send($msg);
			
			if (type == 'msg') return message.channel.send($msg);
			if (type == 'rep') return message.reply($msg);
		};

		if (message.channel.type.toUpperCase() !== 'DM'){
			if (alns.some(value=> ~message.channel.name.indexOf(value))) {
				if(getCmd("안녕", 'stw')||message.isMentioned(Bot.user)) message.reply("안녕하세요 와우봇입니다!\n도움이 필요하시면 ``=도움``이라고 말해주세요!");
				if(getCmd(["도움","도움말"])||getCmd("help")){
					message.channel.send("", {
						embed: {
							title: "도움말들",
							fields: [{
									name: "``"+prefix+"안녕``",
									value: "안녕이라고 대답합니다.",
									inline: true
								},
								{
									name: "``"+prefix+"도움``",
									value: "도움말들을 알려줍니다.",
									inline: true
								},
								{
									name: "``"+prefix+"정보``",
									value: "서버의 정보와 나의 정보를 알려줍니다.",
									inline: true
								},
								{
									name: "``"+prefix+"핑`` | ``"+prefix+"ping``",
									value: "와우봇이 메시지를 읽고 대답하는데까지 얼마나 걸리는지 알려줍니다.",
									inline: true
								}
							]
						}
					});
				};
				if(getCmd(["핑","퐁"])||getCmd("ping")||getCmd("pong")){
					message.reply("", {
						embed: {
							title: "퐁!",
							fields: [{
								name: "와우봇의 PING",
								value: `${(new Date().getTime() - message.createdTimestamp)}ms`,
								inline: true
							},
							{
								name: "웹소켓의 PING",
								value: `${Math.round(Bot.ping)}ms`,
								inline: true
							}],
							footer:{ "text":"이 수치는 와우봇이 메시지 반응부터 전송까지에 소요된 시간입니다." }
						}
					});
				};
				if(getCmd("정보")){
					message.reply("", {
						embed: {
							fields: [{
									name: "유저 이름",
									value: message.author.username
								},
								{
									name: "유저 가입일",
									value: "``"+ message.author.createdAt.format("yyyy월 MM월 dd일 | (a/p) hh시 mm분 ss초") +"``"
								},
								{
									name: "유저 ID",
									value: "``"+ message.author.id +"``"
								},
								{
									name: "서버 이름",
									value: message.guild.name
								},
								{
									name: "서버 생성일",
									value: "``"+ message.guild.createdAt.format("yyyy월 MM월 dd일 | (a/p) hh시 mm분 ss초") +"``"
								},
								{
									name: "서버 ID",
									value: "``"+ message.guild.id +"``"
								}
							]
						}
					});
				};
			};
		}

		if(managers.indexOf(message.author.id)) {
			if(getCmd("공지")||getCmd("공지전송")){
				if (message.channel.type.toUpperCase() == 'DM'){
					if(!argv) return message.reply("전송할 내용을 지정하지 않았습니다.\n(다시 입력해 주세요)");
					
					for(var index=alys.length; index--;) {
						var aly = alys[index], channel = Bot.channels.find(channel=> channel.name.indexOf(alys[index]));
						if(channel){
							channel.send("", {
								embed: {
									title: ":loudspeaker: 공지",
									description: argv
								}
							});
						}
					};
				}
			};
		}
		
		
		
		// ------ 명령어 추가 ------
		if(getCmd("명령어")) { //"명령어"를 치면,
			message.channel.send("대답"); //"대답"이라고 말합니다.
		};
		// ------ 명령어 추가 ------
	})
});


// Options
Date.prototype.format=function(d){if(!this.valueOf())return" ";var e=["\uC77C\uC694\uC77C","\uC6D4\uC694\uC77C","\uD654\uC694\uC77C","\uC218\uC694\uC77C","\uBAA9\uC694\uC77C","\uAE08\uC694\uC77C","\uD1A0\uC694\uC77C"],b=this;return d.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi,function(c){return"yyyy"===c?b.getFullYear():"yy"===c?(b.getFullYear()%1e3).zf(2):"MM"===c?(b.getMonth()+1).zf(2):"dd"===c?b.getDate().zf(2):"E"===c?e[b.getDay()]:"HH"===c?b.getHours().zf(2):"hh"===c?((h=b.getHours()%12)?h:12).zf(2):"mm"===c?b.getMinutes().zf(2):"ss"===c?b.getSeconds().zf(2):"a/p"===c?12>b.getHours()?"\uC624\uC804":"\uC624\uD6C4":c})},String.prototype.string=function(d){for(var a="",e=0;e++<d;)a+=this;return a},String.prototype.zf=function(b){return"0".string(b-this.length)+this},Number.prototype.zf=function(b){return this.toString().zf(b)};
