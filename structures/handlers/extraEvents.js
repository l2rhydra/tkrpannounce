const {
  MessageEmbed
} = require('discord.js');
const moment = require("moment");
const config = require("../botconfig/config.json");

module.exports = async (client) => {

  // Console Logger
  client.logger = (data) => {
    // if (!settings[`debug-logs`]) return;
    let logstring = `${String(`Milanio_Development`).brightGreen}${` | `.grey}${`${moment().format("ddd DD-MM-YYYY HH:mm:ss.SSSS")}`.cyan}${` 〢 `.magenta}`
    if (typeof data == "string") {
      console.log(logstring, data.split("\n").map(d => `${d}`.green).join(`\n${logstring} `))
    } else if (typeof data == "object") {
      console.log(logstring, JSON.stringify(data, null, 3).green)
    } else if (typeof data == "boolean") {
      console.log(logstring, String(data).cyan)
    } else {
      console.log(logstring, data)
    }
  };

    
  
    client.on("voiceStateUpdate", (oldState, newState) => {
      try{
        if(client.user.id != newState.id) return;
        if (
            (!oldState.streaming && newState.streaming)   ||
            (oldState.streaming && !newState.streaming)   ||
            (!oldState.serverDeaf && newState.serverDeaf) ||
            (oldState.serverDeaf && !newState.serverDeaf) ||
            (!oldState.serverMute && newState.serverMute) ||
            (oldState.serverMute && !newState.serverMute) || 
            (!oldState.selfDeaf && newState.selfDeaf)     ||
            (oldState.selfDeaf && !newState.selfDeaf)     ||
            (!oldState.selfMute && newState.selfMute)     ||
            (oldState.selfMute && !newState.selfMute)     ||
            (!oldState.selfVideo && newState.selfVideo)   ||
            (oldState.selfVideo && !newState.selfVideo) 
         )
        if ((!oldState.channelId && newState.channelId) || (oldState.channelId && newState.channelId)) {
            try{ newState.setDeaf(true);  }catch{ }
            return;
        }
      }catch{

      }
    
  });
  
  //ANTI UNMUTE
  client.on("voiceStateUpdate", async (oldState, newState) => {
    if(newState.id === client.user.id && oldState.serverDeaf === true && newState.serverDeaf === false){
      try{
        newState.setDeaf(true).catch(() => {});
      } catch (e){
        //console.log(e)
      }
    }
  });

}

/**
 * @INFO
 * Bot Coded by Zedro#2742 | https://discord.gg/8fYUFxMtAq
 * @INFO
 * Work for Milanio Development | https://discord.gg/8fYUFxMtAq
 * @INFO
 */