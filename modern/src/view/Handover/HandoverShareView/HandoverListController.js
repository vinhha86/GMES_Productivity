Ext.define('GSmartApp.view.handover.HandoverShareView.HandoverListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HandoverListController',
    init: function() {
        
    },
    control: {
        '#handover_cut_tolinelist': {
            childtap: 'onChildTapCutToLine'
        }
    },
    onEdit: function(editor, context, eOpts ) {
        console.log(context);
    },
    onChildTapCutToLine: function ( dataView, location, eOpts ) {
        // console.log('location:');
        // console.log(location.record.data);

        var viewModel = this.getViewModel();
        var viewId = viewModel.get('viewId');
        var id = location.record.get('id');
        this.redirectTo(viewId + "/" + id + "/edit");
    }
});
