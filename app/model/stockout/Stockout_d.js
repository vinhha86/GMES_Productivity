Ext.define('GSmartApp.model.Stockout_d', {
    extend: 'GSmartApp.model.Base',
    idProperty: 'idx',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'idx', type: 'int'},
        'orgrootid_link',
        'stockoutid_link',
        'pordercode',
        {name: 'stockoutdate', type: 'date', dateFormat: 'c'},
        'skuid_link',
        'mainskucode',
        'skucode',
        'skutype',
        'skutypeid_link',
        'colorid_link',
        'color_name',
        'color_code',
        'unitid_link',
        'totalorder_design',
        'totalorder_tech',
        'widthorder',
        'totalpackage',
        'listpackage',
        'totalyds',
        'totalpackagecheck',
        'totalydscheck',
        'totalpackageprocessed',
        'totalydsprocessed',
        'totalydsstockout',
        'totalerror',
        {
            name: 'totaldif',
            calculate: function(data) {
                return data.totalydsprocessed - data.totalorder_tech;
            }
        },    
        {
            name: 'stockoutdif',
            calculate: function(data) {
                return data.totalydsstockout - data.totalorder_tech;
            }
        },        
        'unitprice',
        'p_skuid_link',
        'extrainfo',
        'usercreateid_link',
        {name: 'timecreate', type: 'date', dateFormat: 'c'},
        'lastuserupdateid_link',
        {name: 'lasttimeupdate', type: 'date', dateFormat: 'c'}
    ],
    hasMany : {model: 'Stockout_pklist', name: 'stockoutpklist'}
});
