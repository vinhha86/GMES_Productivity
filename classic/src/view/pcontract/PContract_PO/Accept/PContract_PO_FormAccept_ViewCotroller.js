Ext.define('GSmartApp.view.pcontract.PContract_PO_FormAccept_ViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_PO_FormAccept_ViewCotroller',
    init: function(){
        var viewmodel = this.getViewModel();
		var OrgStore = viewmodel.getStore('OrgStore');
        OrgStore.loadOrg_Request(viewmodel.get('po.id'));
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#cmbDonVi': {
            select: 'onSelectOrg' 
        }
    },
    onThoat: function(){
        this.getView().up('window').close();
    },
    onSelectOrg: function(combo, record, eOpts){
        var viewmodel = this.getViewModel();
        var userStore = viewmodel.getStore('UserStore');
        userStore.loadUserbyOrg(record.get('id'));
    }
})