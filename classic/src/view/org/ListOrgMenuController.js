Ext.define('GSmartApp.view.org.ListOrgMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ListOrgMenuController',
    init: function () {
        this.onloadPage();
    },
    control: {
        '#ListOrgMenu': {
            // checkchange: 'onCheckChange',
            itemclick: 'onloadDetail'
        }
    },
    // onCheckChange: function(node, checked, e, eOpts ){
    //     var viewModel = this.getViewModel();
    //     var params = new Object();
    //     params.menuid_link = node.data.id;
    //     params.roleid_link = viewModel.get('roleid_link');
    //     params.checked = checked;

    //     GSmartApp.Ajax.post('/api/v1/approle/create_role_menu', Ext.JSON.encode(params),
    //     function (success, response, options) {
    //         if (success) {
    //             var response = Ext.decode(response.responseText);
    //             if (response.respcode != 200) {
    //                 Ext.Msg.show({
    //                     title: "Thông báo",
    //                     msg: 'Lưu thất bại',
    //                     buttons: Ext.Msg.YES,
    //                     buttonText: {
    //                         yes: 'OK'
    //                     }
    //                 });
    //             }
    //             else {
    //              var store = viewModel.getStore('MenuStore');
    //              store.loadStore_byrole(params.roleid_link);
    //             }
    //         }
    //     })
    // },
    onloadDetail: function( grid, record, item, index, e, eOpts){
        var viewmodel = this.getViewModel();
        viewmodel.set('currentRec', record.data);
        viewmodel.set('id', record.data.id);
        viewmodel.set('name', record.data.name);
        viewmodel.set('fieldState', true);
        // console.log(record.data);
    },
    onloadPage: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var storeMenu = viewmodel.getStore('MenuStore');
        storeMenu.loadStore();
        // var storeOrgType = viewmodel.getStore('OrgTypeStore');
        // storeOrgType.loadAllOrgType();
        var storeColor = viewmodel.getStore('ColorStore');
        storeColor.loadStore();

        // disable checkbox
        var viewMain = Ext.getCmp('ListOrgMenu');
        console.log('under here');
        console.log(viewMain);
    }
})