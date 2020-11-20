Ext.define('GSmartApp.view.TimeSheetLunch.TimeSheetLunch_MainViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TimeSheetLunch_MainViewController',
    init: function () {

    },
    onChange: function( datefield, newValue, oldValue, eOpts){
        // console.log(newValue);
        var viewModel = this.getViewModel();
        
        var orgtypeid_link = viewModel.get('orgtypeid_link');
        var orgid_link = viewModel.get('orgid_link');
        if(orgtypeid_link == 1 || orgtypeid_link == 13){
            return;
        }

        var TimeSheetLunchStore = viewModel.getStore('TimeSheetLunchStore');
        TimeSheetLunchStore.loadStore(orgid_link, newValue);

        var today = new Date();
        if(newValue.toDateString() == today.toDateString()){
            viewModel.set('isToday', true);
        }else{
            viewModel.set('isToday', false);
        }
    }
})