Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_PackingList_DController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_M_Edit_PackingList_DController',
    isActivate: false,
    init: function () {
        
    },
	control: {
        '#Stockin_M_Edit_PackingList_D': {
            // itemsingletap: 'onChildTap'
        },
    },
    onEdit: function(editor, context, eOpts ) {
        // console.log(context);
    },
    onChildTap: function ( dataView, index, target, record, e, eOpts ) {
        // console.log(record);
        // var id = record.data.id;
        // this.redirectTo("stockin_m_main/" + id + "/edit");
    }
})