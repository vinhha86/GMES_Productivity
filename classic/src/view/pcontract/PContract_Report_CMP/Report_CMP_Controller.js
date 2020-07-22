Ext.define('GSmartApp.view.pcontract.Report_CMP_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Report_CMP_Controller',

    init:function(){
        // var viewmodel =  this.getViewModel();
        // var CMPReportStore = viewmodel.get('CMPReportStore');
        // CMPReportStore.loadStore(new Date(),6);
    },
    yearLabelRenderer: function(value) {
        return 'Year ' + value;
    },

    monthLabelRenderer: function(value) {
        var month_vn = {
            1: 'Tháng 1',
            2: 'Tháng 2',
            3: 'Tháng 3',
            4: 'Tháng 4',
            5: 'Tháng 5',
            6: 'Tháng 6',
            7: 'Tháng 7',
            8: 'Tháng 8',
            9: 'Tháng 9',
            10: 'Tháng 10',
            11: 'Tháng 11',
            12: 'Tháng 12',
        };
        return month_vn[value];
    },

    expandAll: function() {
        this.getView().expandAll();
    },

    collapseAll: function() {
        this.getView().collapseAll();
    },

    subtotalsHandler: function(button, checked) {
        if (!checked) {
            return;
        }

        // reconfigure the pivot grid with new settings
        this.getView().reconfigurePivot({
            rowSubTotalsPosition: button.text.toLowerCase(),
            colSubTotalsPosition: button.text.toLowerCase()
        });
    },

    totalsHandler: function(button, checked) {
        if (!checked) {
            return;
        }

        // reconfigure the pivot grid with new settings
        this.getView().reconfigurePivot({
            rowGrandTotalsPosition: button.text.toLowerCase(),
            colGrandTotalsPosition: button.text.toLowerCase()
        });
    },

    onPivotGroupExpand: function(matrix, type, group) {
        Ext.log((group ? 'Group "' + group.name + '" expanded on ' : 'All groups expanded on ') + type);
    },

    onPivotGroupCollapse: function(matrix, type, group) {
        Ext.log((group ? 'Group "' + group.name + '" collapsed on ' : 'All groups collapsed on ') + type);
    },
    onRefreshTap: function(){
        var viewmodel =  this.getViewModel();
        var cbo_cmpoption = Ext.getCmp('Report_CMP_cmpoption');

        if (cbo_cmpoption != null){
            var CMPReportStore = viewmodel.get('CMPReportStore');
            CMPReportStore.loadStore(new Date(),cbo_cmpoption.getValue());
        }
    }
});