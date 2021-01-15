Ext.define('GSmartApp.view.handover.HandoverShareView.HandoverListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HandoverListController',
    init: function() {
        
    },
    control: {
        '#handover_cut_tolinelist': {
            itemdoubletap: 'onItemdoubletapCutToLine'
        }
    },
    onItemdoubletapCutToLine: function(dataView, index, target, record, e, eOpts){
        // console.log(record);
        var viewModel = this.getViewModel();
        var viewId = viewModel.get('viewId');
        var id = record.get('id');
        this.redirectTo(viewId + "/" + id + "/edit");
    },
    onEdit: function(editor, context, eOpts ) {
        console.log(context);
    }
});
