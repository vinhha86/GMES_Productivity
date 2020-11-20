Ext.define('GSmartApp.view.TimeSheetLunch.TimeSheetLunch_ListOrgViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TimeSheetLunch_ListOrgViewController',
    init: function () {
        this.onload();
    },
    control: {
        '#TimeSheetLunch_ListOrgView': {
            itemclick: 'onloadDetail'
        }
    },
    onloadDetail: function( grid, record, item, index, e, eOpts){
        // console.log(record);
        var viewModel = this.getViewModel();
        var TimeSheetLunchStore = viewModel.getStore('TimeSheetLunchStore');

        var orgtypeid_link = record.get('orgtypeid_link');
        var orgid_link = record.get('id');
        
        var TimeSheetLunch_MainView = Ext.getCmp('TimeSheetLunch_MainView');
        var date = TimeSheetLunch_MainView.down('#txtdatefield').getValue();

        viewModel.set('orgtypeid_link', orgtypeid_link);
        viewModel.set('orgid_link', orgid_link);

        if(orgtypeid_link == 1 || orgtypeid_link == 13){
            TimeSheetLunchStore.removeAll();
            return;
        }

        var TimeSheetLunchStore = viewModel.getStore('TimeSheetLunchStore');
        TimeSheetLunchStore.loadStore(orgid_link, date);
    },
    onload: function () {
        var me = this.getView();
        var viewModel = this.getViewModel();
        var OrgStore = viewModel.getStore('OrgStore');
        OrgStore.loadStore();

        OrgStore.getSorters().add('orgtypeid_link');
        OrgStore.getSorters().add('is_manufacturer');
        OrgStore.getSorters().add('id');
    }
})