Ext.define('GSmartApp.view.TimeSheetInOut.TimeSheetInOutViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.TimeSheetInOutViewModel',
    requires:['GSmartApp.store.TimeSheetInOut.TimeSheetInOutStore'],
    
    stores:{
        TimeSheetInoutStore:{
            type:'TimeSheetInOutStore'
        }
    },
    data:{
        timesheetinout:{
            todate:null,
            fromdate:null
        }
    }
})