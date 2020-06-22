Ext.define('GSmartApp.view.pcontract.PContract_PO_FormAccept_ViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_PO_FormAccept_ViewCotroller',
    init: function(){
        var viewmodel = this.getViewModel();
        var listidtype = "4,8,9,11,12";
		var OrgStore = viewmodel.getStore('OrgStore');
        OrgStore.loadStore_allchildren_byorg(listidtype);
        
        
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