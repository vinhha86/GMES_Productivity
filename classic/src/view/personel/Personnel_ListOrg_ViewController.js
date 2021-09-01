Ext.define('GSmartApp.view.personel.Personnel_ListOrg_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Personnel_ListOrg_ViewController',
    init: function () {
        this.onload();
    },
    control: {
        '#Personnel_ListOrg_View': {
            itemclick: 'onloadDetail'
        }
    },
    onloadDetail: function( grid, record, item, index, e, eOpts){
        var viewModel = this.getViewModel();
        var params = new Object();
        params.isviewall = viewModel.get('isviewall');
        params.orgid_link = record.get('id');

        viewModel.set('donvi.id',record.data.id);
        viewModel.set('orgtypeid_link',record.get('orgtypeid_link'));
        //neu loai = 13 la xuong sx thi xem tat ca trong xuong
        // = 1: xem toan bo cong ty hoac nhung nguoi chi thuoc Tru so chinh
        // con lai la xem trong to hoac phong ban
        if(record.get('orgtypeid_link') == 13){
             params.ismanager = true;     
             viewModel.set('isdisabled', true);       
        }
        else if (record.get('orgtypeid_link') == 1){
            params.ismanager = true;
            viewModel.set('isdisabled', false);
        }
        else {
            params.ismanager = false;
            viewModel.set('isdisabled', true);
        }

        var StorePersonel = viewModel.getStore('Personnel_Store');
        StorePersonel.loadStore_byOrg(params.orgid_link , params.ismanager, params.isviewall);
    },
    onload: function () {
        var me = this.getView();
        var viewModel = this.getViewModel();
        var storeMenu = viewModel.getStore('OrgStore');
        storeMenu.loadStore();

        this.activeOnlyFilter = Ext.create('Ext.util.Filter', {
            id: 'activeOnlyFilter',
            property: 'status',
            value: 1
        });
        storeMenu.getFilters().add(this.activeOnlyFilter);
        storeMenu.getSorters().add({
            property: 'orgtypeid_link',
            direction: 'ASC'
        }, {
            property: 'id',
            direction: 'ASC'
        });

        storeMenu.getSorters().add('orgtypeid_link');
        storeMenu.getSorters().add('is_manufacturer');
        storeMenu.getSorters().add('id');
    }
})