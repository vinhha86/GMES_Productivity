Ext.define('GSmartApp.model.Stockout', {
    extend: 'GSmartApp.model.Base',
    idProperty: 'idx',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'idx', type: 'int'},
        'priority',
        'orgrootid_link',
        'stockoutorderid_link',
        'stockoutcode',
        {name: 'stockoutdate', type: 'date', dateFormat: 'c'},
        'stockouttypeid_link',
        'orgid_from_link',
        'org_from_name',
        'orgid_to_link',
        'org_to_name',
        'porderid_link',
        'pordercode',
        'shipperson',
        'totalpackage',
        'totalyds',
        'total_product',
        'total_mainmaterial',
        'total_mainmaterial_check',
        {
            name: 'total_mainmaterial_check_txt',
            calculate: function(data) {
                return (null == data.total_mainmaterial_check?'0':Ext.util.Format.number(data.total_mainmaterial_check, '0,000.00')) + ' / ' + Ext.util.Format.number(data.total_mainmaterial, '0,000.00');
            }
        },         
        'total_mainmaterial_processed',
        {
            name: 'total_mainmaterial_processed_txt',
            calculate: function(data) {
                return (null == data.total_mainmaterial_processed?'0':Ext.util.Format.number(data.total_mainmaterial_processed, '0,000.00')) + ' / ' + Ext.util.Format.number(data.total_mainmaterial, '0,000.00');
            }
        },           
        'total_mainmaterial_stockout',
        {
            name: 'total_mainmaterial_stockout_txt',
            calculate: function(data) {
                return (null == data.total_mainmaterial_stockout?'0':Ext.util.Format.number(data.total_mainmaterial_stockout, '0,000.00')) + ' / ' + Ext.util.Format.number(data.total_mainmaterial, '0,000.00');
            }
        }, 
        'total_liningmaterial',
        'total_liningmaterial_check',
        {
            name: 'total_liningmaterial_check_txt',
            calculate: function(data) {
                return (null == data.total_liningmaterial_check?'0':Ext.util.Format.number(data.total_liningmaterial_check, '0,000.00')) + ' / ' + Ext.util.Format.number(data.total_liningmaterial, '0,000.00');
            }
        },            
        'total_liningmaterial_processed',
        {
            name: 'total_liningmaterial_processed_txt',
            calculate: function(data) {
                return (null == data.total_liningmaterial_processed?'0':Ext.util.Format.number(data.total_liningmaterial_processed, '0,000.00')) + ' / ' + Ext.util.Format.number(data.total_liningmaterial, '0,000.00');
            }
        },          
        'total_liningmaterial_stockout',
        {
            name: 'total_liningmaterial_stockout_txt',
            calculate: function(data) {
                return (null == data.total_liningmaterial_stockout?'0':Ext.util.Format.number(data.total_liningmaterial_stockout, '0,000.00')) + ' / ' + Ext.util.Format.number(data.total_liningmaterial, '0,000.00');
            }
        },         
        'total_mex',
        'total_mex_check',
        {
            name: 'total_mex_check_txt',
            calculate: function(data) {
                return (null == data.total_mex_check?'0':Ext.util.Format.number(data.total_mex_check, '0,000.00')) + ' / ' + Ext.util.Format.number(data.total_mex, '0,000.00');
            }
        },           
        'total_mex_processed',
        {
            name: 'total_mex_processed_txt',
            calculate: function(data) {
                return (null == data.total_mex_processed?'0':Ext.util.Format.number(data.total_mex_processed, '0,000.00')) + ' / ' + Ext.util.Format.number(data.total_mex, '0,000.00');
            }
        },         
        'total_mex_stockout',
        {
            name: 'total_mex_stockout_txt',
            calculate: function(data) {
                return (null == data.total_mex_stockout?'0':Ext.util.Format.number(data.total_mex_stockout, '0,000.00')) + ' / ' + Ext.util.Format.number(data.total_mex, '0,000.00');
            }
        },         
        'total_mixmaterial',
        'total_mixmaterial_check',
        {
            name: 'total_mixmaterial_check_txt',
            calculate: function(data) {
                return (null == data.total_mixmaterial_check?'0':Ext.util.Format.number(data.total_mixmaterial_check, '0,000.00')) + ' / ' + Ext.util.Format.number(data.total_mixmaterial, '0,000.00');
            }
        },             
        'total_mixmaterial_processed',
        {
            name: 'total_mixmaterial_processed_txt',
            calculate: function(data) {
                return (null == data.total_mixmaterial_processed?'0':Ext.util.Format.number(data.total_mixmaterial_processed, '0,000.00')) + ' / ' + Ext.util.Format.number(data.total_mixmaterial, '0,000.00');
            }
        },        
        'total_mixmaterial_stockout',
        {
            name: 'total_mixmaterial_stockout_txt',
            calculate: function(data) {
                return (null == data.total_mixmaterial_stockout?'0':Ext.util.Format.number(data.total_mixmaterial_stockout, '0,000.00')) + ' / ' + Ext.util.Format.number(data.total_mixmaterial, '0,000.00');
            }
        },        
        'totalpackagecheck',
        'totalydscheck',
        'totalpackageprocessed',
        'totalydsprocessed',
        'totalm3',
        'totalnetweight',
        'totalgrossweight',
        'totalprice',
        'p_skuid_link',
        'p_skucode',
        'extrainfo',
        'status',
        'usercreateid_link',
        'usercreate_name',
        {name: 'timecreate', type: 'date', dateFormat: 'c'},
        'lastuserupdateid_link',
        {name: 'lasttimeupdate', type: 'date', dateFormat: 'c'},
    ],
    hasMany : {model: 'Stockout_d', name: 'stockoutd'}
});
