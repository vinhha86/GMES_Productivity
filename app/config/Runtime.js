/* global Ext */
/* global l10n */
/* global config */

Ext.define('GSmartApp.config.Runtime', {
    alternateClassName: [
        'config'
    ],
    singleton: true,
    config: {
        basePath: {
            dictionary: 'resources/dictionary.json'
        },
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        appBaseUrl: 'http://localhost:8990/gsmartcore',
        appBaseUrl_Jitin: 'http://localhost:8991/jitin',
        // appBaseUrl: 'http://172.20.10.2:8990/gsmartcore',
        // appBaseUrl_Jitin: 'http://172.20.10.2:8991/jitin',
        // appBaseUrl: 'http://gpay.vn:8090/gmes',
        // appBaseUrl: 'http://gpay.vn:8090/gmesdha',
        // appBaseUrl: 'http://27.71.231.154:8080/gmesdha',
        // back: 'http://27.71.231.154:8081/oauth/',
        back: 'http://gpay.vn:8181/oauth/',
        // back: 'http://localhost:8181/oauth/',
        token: null,
        enableSSO: false,
        warmUpTime: 300000,
        dictionary: null,
        fname: null,
        avatar: null,
        pageSize: 25,
        // MQTT config
        deviceid: 'devsim-0002',
        termid: 'term-0004',
        clientid: 'thieutv#devops01',
        host: 'gpay.vn',
        port: 8083,
        porderTaskRunner: null
    },
    constructor: function (config) {
        this.initConfig(config);
        return this;
    }
});
