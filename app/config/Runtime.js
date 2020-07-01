/* global Ext */
/* global l10n */
/* global config */

Ext.define('GSmartApp.config.Runtime',{
    alternateClassName: [
        'config'
    ],
    singleton : true,
    config : {
        basePath: {
            dictionary: 'resources/dictionary.json'
        },
        months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
        appBaseUrl: 'http://localhost:8990/gsmartcore',
        back: 'http://localhost:8181/oauth/',
        // appBaseUrl: 'http://gpay.vn:8090/gmes',
        // back: 'http://gpay.vn:8181/oauth/',
        token: null,
        enableSSO: false,
        warmUpTime: 300000,
        dictionary: null,
        fname: null,
        avantar: null,
        pageSize: 25,
        // MQTT config
        deviceid:'devsim-0002',
        termid:'term-0004',
        clientid:'thieutv#devops01',
        host:'gpay.vn',
        port:8083,
        porderTaskRunner: null
    },
    constructor : function(config){
        this.initConfig(config);
        return this;
    }
});
