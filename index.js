const { Plugin } = require('powercord/entities');
const { getModule } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');

const Reaction = getModule(['addReaction'], false);

const Settings = require('./Settings/Settings.jsx');

module.exports = class ReactNoise extends Plugin {
  startPlugin() {
    powercord.api.settings.registerSettings("reactnoise", {
      label: "React Noise",
      category: this.entityID,
      render: Settings,
    });

    this.__injectReactions();
  }

  async __injectReactions() {
    inject('reactionNoise', Reaction, 'addReaction', (args, res) => {
      const audio = new Audio(this.settings.get('reactSound', 'https://cdn.discordapp.com/attachments/899313429054128168/996990758722736198/shwop.m4a'));
      audio.play();
      return args;
    })
  }

  pluginWillUnload() {
    uninject('reactionNoise')
    powercord.api.settings.unregisterSettings("reactnoise");
  }
}