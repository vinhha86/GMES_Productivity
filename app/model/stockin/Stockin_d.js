Ext.define('GSmartApp.model.stockin.Stockin_d', {
    extend: 'GSmartApp.model.Base',
    idProperty: 'idx',
    fields: [
        {name: 'id'},
        {name: 'idx'},
        'orgrootid_link',
        'stockinid_link',
        'skucode',
        'skuname',
        'sku_product_code',
        'colorid_link',
        'sizeid_link',
        'color_name',
        'size_name',
        'unitid_link',
        'unit_name',
        'totalpackage_order',
        {name: 'totalpackage', type: 'int'},
        'totalydsorigin',
        'foc',
        'totalpackagecheck',
        'totalydscheck',
        'unitprice',
        'p_skuid_link',
        'usercreateid_link',
        'skutypeid_link',
        'usercreate_name',
        {name: 'timecreate', type: 'date', dateFormat: 'c'},
        'lastuserupdateid_link',
        {name: 'lasttimeupdate', type: 'date', dateFormat: 'c'},
        'porder_year',
        {
            name: 'totalprice',
            calculate: function(data) {
                return (null == data.unitprice ?'0':data.totalpackage * data.unitprice);
            }
        },
        'status',
        'totalmet_origin',
        'totalmet_check'
    ],
    hasMany : {model: 'Stockin_pklist', name: 'stockin_packinglist'}
});
