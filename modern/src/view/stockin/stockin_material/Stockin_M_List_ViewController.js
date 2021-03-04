Ext.define('GSmartApp.view.stockin.Stockin_M_List_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_M_List_ViewController',
    isActivate: false,
    init: function () {
        
    },
	control: {
        '#Stockin_M_List': {
            childtap: 'onChildTap'
        },
    },
    onEdit: function(editor, context, eOpts ) {
        console.log(context);
    },
    onChildTap: function ( dataView, location, eOpts ) {
        // console.log('location:');
        // console.log(location.record.data);

        // var viewModel = this.getViewModel();
        // var viewId = viewModel.get('viewId');
        // var id = location.record.get('id');
        // this.redirectTo(viewId + "/" + id + "/edit");
    }
})