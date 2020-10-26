Ext.define('GSmartApp.view.salary.Salary_ListOrg_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Salary_ListOrg_ViewController',
    init: function () {
        this.onload();
    },
    control: {
        '#Salary_ListOrg_View': {
            itemclick: 'onloadDetail'
        }
    },
    onloadDetail: function( grid, record, item, index, e, eOpts){
        var viewModel = this.getViewModel();
        var params = new Object();
        params.orgid_link = record.get('id');

        //neu loai = 13 la xuong sx thi xem tat ca trong xuong
        // = 1: xem toan bo cong ty hoac nhung nguoi chi thuoc Tru so chinh
        // con lai la xem trong to hoac phong ban
        // if(record.get('orgtypeid_link') == 13){
        //      params.ismanager = true;     
        //      viewModel.set('isdisabled', true);       
        // }
        // else if (record.get('orgtypeid_link') == 1){
        //     params.ismanager = true;
        //     viewModel.set('isdisabled', false);
        // }
        // else {
        //     params.ismanager = false;
        //     viewModel.set('isdisabled', true);
        // }

    },
    onload: function () {
        var me = this.getView();
        var viewModel = this.getViewModel();
        var OrgStore = viewModel.getStore('OrgStore');
        OrgStore.loadStore_ByType('13');

        OrgStore.getSorters().add('orgtypeid_link');
        OrgStore.getSorters().add('is_manufacturer');
        OrgStore.getSorters().add('id');
    }
})