const Discord=require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const userData={}
const  {  readdirSync } = require('fs');
const { join } = require('path');
const prefix = "!"

client.on('ready', () => {
    client.user.setActivity('!help')
    console.log('Flex Online!!')
});

client.on('message', async message => {
  if (message.content.startsWith("!oynat")) {
    const args = message.content.split(' ').slice(1)
    const qwe = args.join(" ")
    if(!qwe) return message.channel.send('**Link Vermelisiniz.**')
    if(message.member.voice.channel) {
      const connection = await message.member.voice.channel.join()
      const aneğ = require('ytdl-core');
      connection.play(aneğ(`${qwe}`, { filter: 'audioonly' }))
    }
    else {
message.channel.send('**Herhangi bir sesli kanalda değilsin!**');      
    }
  }
})

client.on('message', async message => {
  if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send('**Bota aynı kanal da değilsin!**')
  if (message.content.startsWith("!leave")) {
    message.channel.send('**Ayrılıyorum..**')
      const connection = await message.member.voice.channel.leave()
    }      
  }
)

client.on("message",message=> {
    console.log("Mesaj Geldi")

    if(message.content.toLowerCase() === prefix + "ping")
    message.channel.send("Gecikme Süresi: "+ client.ws.ping+"*ms*")

    if(message.content.toLowerCase()=== prefix + "alive")
    message.channel.send('**Merhaba!** \n*Benim adım* **Flex** *sunucularınız daha kolay yönetmenize yardımcı olmak için geliştirildim* \n*Nasıl kullanacağınız hakkında fikriniz yoksa* `!help` komutunuz kullanın. \n\n**Source kodum burada:** https://github.com/Tioxs/Flex-Discord-Bot')

    if(message.content.toLowerCase()=== prefix + "help")
    message.channel.send("`!alive`: Botu başlatır. \n `!mystat`: Botun olduğu sunucularda ki mesaj sayınız kaç mesaj attınız onu söyler. \n `!botstat`: Botun verilerini söyler! \n `!kick`: Kullanıcıyı tekrar katılabilicek şekilde atar. \n `!ban`: Kullanıcıyı tekrar katılamayacak şekilde banlar. \n `!ping`: Botun hızını ölçer. \n `!purge <sayı>`: Verdiğiniz sayı kadar mesajı siler. \n `!oynat <link>`: Verdiğiniz linki sesli kanalda oynatır. \n `!leave`: Sesli kanaldan ayrılır.")

    const userId=message.author.id;

    if(!userData[userId])
    userData[userId]={
        messageCount:0
    }

    userData[userId].messageCount++

    console.log(JSON.stringify(userData,2,2))

    if (message.content.toLowerCase()=== prefix + "mystat") 
    message.channel.send("`Mesaj Sayınız: `"+ userData[userId].messageCount)
      
    if (message.content.toLowerCase()=== prefix + "kick") {
        const user = message.mentions.users.first();
        if (user) {
        const member = message.guild.member(user);
        if (member) {
            member
            .kick('Flex Tarafından atıldı')
            .then(() => {
                 message.channel.send(`Birisi daha haklandı, ${user.tag} yasaklandı!`);
                })
                .catch(err => {
                message.channel.send('*Yetkim veya yetkin yok!*');
                console.error(err);
            });
            } else {
              message.channel.send("*Böyle bir kullanıcı yok!*");
            }
          } else {
            message.channel.send("*Kullanıcı Bulunamadı!*");
          }
        }

        if (message.content.toLowerCase()=== prefix + "ban") {
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.member(user);
            if (member) {
                member
                .ban({
                    reason: 'Flex tarafından atıldı',
                })
                .then(() => {
                    message.channel.send(`Birisi daha haklandı, ${user.tag} yasaklandı`);
                })
                .catch(err => {
                    message.channel.send('*Yetkim veya Yetkin yok!*');
                    console.error(err);
                });
              } else {
                message.channel.send("*Böyle bir kullanıcı yok!*");
              }
            } else {
              message.channel.send("*Kullanıcı bulunamadı!*");
            }
          }

})

client.login(config.token)