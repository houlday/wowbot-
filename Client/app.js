const Discord = require('discord.js');
const Bot = new Discord.Client();

const Config = require("./config.json");
var prefix = Config.Bot.prefix;


Bot.login(Config.Bot.$token);
Bot.on('ready', () => {
	console.log("봇이 가동 중입니다.");
	console.log("--login--");
	console.log("정상입니다.");
	Bot.user.setActivity("대화 중");
	
		// Public
	Bot.on('message', (message) => {
		var getCmd = ($msg, type)=> {
			if (!type) {
				if (typeof($msg) == 'string') return message.content == (prefix+$msg);
				if (typeof($msg) == 'object') return ( $msg.indexOf(message.content.replace(prefix, '')) != -1 );
			};
			
			if (type=='mtc') {
				if (typeof($msg) == 'string') return message.content == (prefix+$msg);
				if (typeof($msg) == 'object') return ( $msg.indexOf(message.content.replace(prefix, '')) != -1 );
			};
			if (type=='stw') return message.content.startsWith(prefix+$msg);
		};
		var sendChat = ($msg, type)=> {
			if (!type) return message.channel.send($msg);
				
			if (type == 'msg') return message.channel.send($msg);
			if (type == 'rep') return message.reply($msg);
		};
		
		
		if (getCmd("안녕", 'stw')) {
			sendChat("안녕하세요 와우봇입니다!\n도움이 필요하시면 ``=도움``이라고 말해주세요!");
		};
		if (getCmd(["도움", "도움말"])) {
			sendChat({
				embed: {
					title: "도움말들",
					fields: [
						{
							name: "``"+prefix+"안녕``",
							value: "안녕이라고 말합니다."
						},
						{
							name: "``"+prefix+"도움``",
							value: "도움말들을 알려줍니다."
						},
						{
							name: "``"+prefix+"정보``",
							value: "서버 정보와 내 정보를 알려줍니다."
						}
					]
				}
			});
		};
		if (getCmd("정보")) {
			sendChat({
				embed: {
					fields: [
						{
							name: "유저 이름",
							value: message.author.username
						},
						{
							name: "유저 가입일",
							value: "``"+message.author.createdAt.format('yyyy월 MM월 dd일 | (a/p) hh시 mm분 ss초')+"``"
						},
						{
							name: "유저 ID",
							value: "``"+message.author.id+"``"
						},
						{
							name: "서버 이름",
							value: message.guild.name
						},
						{
							name: "서버 생성일",
							value: "``"+message.guild.createdAt.format('yyyy월 MM월 dd일 | (a/p) hh시 mm분 ss초')+"``"
						},
						{
							name: "서버 ID",
							value: "``"+message.guild.id+"``"
						}
					]
				}
			});
		};
		
		
		
		// ------ 명령어 추가 ------
		
			if (getCmd("명령어")) { //"명령어"를 치면,
				sendChat("대답"); // "대답"이라고 말합니다.
			};
			
		// ------ 명령어 추가 ------
	})
});


// Options
Date.prototype.format=function(t){if(!this.valueOf())return" ";var e=["일요일","월요일","화요일","수요일","목요일","금요일","토요일"],r=this;return t.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi,function(t){switch(t){case"yyyy":return r.getFullYear();case"yy":return(r.getFullYear()%1e3).zf(2);case"MM":return(r.getMonth()+1).zf(2);case"dd":return r.getDate().zf(2);case"E":return e[r.getDay()];case"HH":return r.getHours().zf(2);case"hh":return((h=r.getHours()%12)?h:12).zf(2);case"mm":return r.getMinutes().zf(2);case"ss":return r.getSeconds().zf(2);case"a/p":return r.getHours()<12?"오전":"오후";default:return t}})},String.prototype.string=function(t){for(var e="",r=0;r++<t;)e+=this;return e},String.prototype.zf=function(t){return"0".string(t-this.length)+this},Number.prototype.zf=function(t){return this.toString().zf(t)};