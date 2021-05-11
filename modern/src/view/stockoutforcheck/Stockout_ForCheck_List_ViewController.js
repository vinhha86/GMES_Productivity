Ext.define('GSmartApp.view.stockin.Stockout_ForCheck_List_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_ForCheck_List_ViewController',
    isActivate: false,
    init: function () {
        
    },
	control: {
        '#Stockout_ForCheck_List': {
            itemsingletap: 'onChildTap'
        },
    },
    onEdit: function(editor, context, eOpts ) {
        // console.log(context);
    },
    onChildTap: function ( dataView, index, target, record, e, eOpts ) {
        // console.log(record);
        var id = record.data.id;
        this.redirectTo("stockoutforcheckmain/" + id + "/edit");
    }
})