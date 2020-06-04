Ext.define('GSmartApp.model.Stockout_push_ivyerp', {
    extend: 'GSmartApp.model.Base',
    idProperty: 'mainskucode',
    fields: [
        'mainskucode',
        'comment',
    ],
    hasMany : {model: 'Stockout_push_ivyerp_d', name: 'pklist'}
});
