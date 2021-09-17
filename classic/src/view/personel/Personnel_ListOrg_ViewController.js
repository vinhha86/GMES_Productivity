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
    onloadDetail: function (grid, record, item, index, e, eOpts) {
        var viewModel = this.getViewModel();
        var params = new Object();
        params.isviewall = viewModel.get('isviewall');
        params.orgid_link = record.get('id');
        params.isviewallThoiVu = viewModel.get('isviewallThoiVu')
        viewModel.set('donvi.id', record.data.id);
        viewModel.set('orgtypeid_link', record.get('orgtypeid_link'));
        //neu loai = 13 la xuong sx thi xem tat ca trong xuong
        // = 1: xem toan bo cong ty hoac nhung nguoi chi thuoc Tru so chinh
        // con lai la xem trong to hoac phong ban
        if (record.get('orgtypeid_link') == 13) {
            params.ismanager = true;
            viewModel.set('isdisabled', true);
        }
        else if (record.get('orgtypeid_link') == 1) {
            params.ismanager = true;
            viewModel.set('isdisabled', false);
        }
        else {
            params.ismanager = false;
            viewModel.set('isdisabled', true);
        }

        var StorePersonel = viewModel.getStore('Personnel_Store');
        StorePersonel.loadStore_byOrg_PersonType(params.orgid_link, params.ismanager, params.isviewall, params.isviewallThoiVu );
        //load list phong ban - để filter     

        var orgStore = viewModel.getStore('ListOrgStore');
        var listid = '';
        if (record.data.id == 1) {
            listid = "1";
        }
        else {
            listid = '22,14,8,9,17,19,20,21,22,23,28,29,30,31,32,33,34,35,36,37,38,39,221';
        }
        orgStore.getbyParentandType(record.data.id, listid);

        //load danh sách chức vụ
        var positionStore = viewModel.getStore('Personnel_Position_Store');
        positionStore.loadByOrg(record.get('id'));
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