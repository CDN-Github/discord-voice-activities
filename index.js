const { Plugin } = require('powercord/entities');
const { getModule } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');
const { get } = require('powercord/http');

class VoiceActivities extends Plugin {
    constructor() {
        super();

        this.prop = getModule(['getEnabledAppIds'], false);
    }

    async startPlugin() {
        const activities = JSON.parse((await get('https://raw.githubusercontent.com/xHyroM/discord-activities/master/activities.json')).body.toString());
        const appIds = activities.map(activity => activity.id);

        inject('voice-activities', this.prop.__proto__, 'getEnabledAppIds', () => appIds);
    }

    async pluginWillUnload() {
        uninject('voice-activities');
    }
}

module.exports = VoiceActivities;