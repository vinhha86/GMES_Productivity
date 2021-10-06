Ext.define('GSmartApp.view.process_shipping.POLine.CreateManyPorderViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CreateManyPorderViewCotroller',
    init: function () {
        var me = this;
        var viewmodel = this.getViewModel();

        var listidtype = "13";
        var OrgStore = viewmodel.getStore('OrgStore');
        OrgStore.loadStore_allchildren_byorg(listidtype);

        // me.loadInfo();
    },
    control: {
        '#cmbOrg': {
            select: 'onSelectDV'
        },
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnChon': {
            click: 'onChon'
        }
    },
    onChon: function () {

    },
    onSelectDV: function (cmb, record, e) {
        var viewmodel = this.getViewModel();

        var grantStore = viewmodel.getStore('OrgGrantStore');
        var parentid_link = record.get('id');
        grantStore.getbyParentandType(parentid_link, "14");
    },
    onThoat: function () {
        this.getView().up('window').close();
    }
})