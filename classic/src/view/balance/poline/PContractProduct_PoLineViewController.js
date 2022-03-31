Ext.define('GSmartApp.view.balance.PContractProduct_PoLineViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractProduct_PoLineViewController',
    init: function () {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
    },
    control: {
        '#PContractProduct_PoLineView': {
            afterrender: 'onAfterrender'
        },
        '#monthBalanceArray': {
            select: 'onSelectMonthBalanceArray'
        }
    },
    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var PContract_PO = viewModel.getStore('PContract_PO');
        PContract_PO.getSorters().removeAll();
        PContract_PO.getSorters().add({
            property: 'shipdate',
            direction: 'ASC'
        },{
            property: 'po_buyer',
            direction: 'ASC'
        });
        PContract_PO.setGroupField('shipmonth');

        // 
        // var arrtest = new Array();
        // arrtest.push('Tất cả');
        // arrtest.push('01/2022');
        // arrtest.push('02/2022');
        // arrtest.push('03/2022');
        // viewModel.set('monthBalanceArray', arrtest);
    },
    onSelectMonthBalanceArray: function(combo, record, eOpts){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var monthYear = record.get('field1');
        var PContract_PO = viewModel.getStore('PContract_PO');
        var filter = PContract_PO.getFilters();

        if(monthYear == 'Tất cả'){ // bỏ filter
            filter.removeAll();
        }else{ // filter theo monthYear
            var yearMonth = '';
            var words = monthYear.split('/');
            if(words.length >= 2){
                yearMonth += words[1] + '/' + words[0];
            }
            filter.removeAll();
            filter.add({
                property: 'shipmonth',
                value: yearMonth,
                exactMatch: true
            });
        }
        // console.log(record);
    },


    // test_popup_chart: function(){
    //     var m = this;
    //     var me = this.getView();
    //     var viewModel = this.getViewModel();

    //     var form = Ext.create('Ext.window.Window', {
    //         height: '90%',
    //         width: '90%',
    //         closable: true,
    //         resizable: false,
    //         modal: true,
    //         border: false,
    //         title: 'Test chart',
    //         closeAction: 'destroy',
    //         bodyStyle: 'background-color: transparent',
    //         layout: {
    //             type: 'fit', // fit screen for window
    //             padding: 5
    //         },
    //         items: [{
    //             xtype: 'PContractChartView',
    //             viewModel: {
    //                 type: 'DashBoardMainViewModel',
    //                 data: {
    //                     // pordercode: pordercode,
    //                     // granttoorgid_link: granttoorgid_link,
    //                     // viewId: viewId
    //                 }
    //             }
    //         }]
    //     });
    //     form.show();
    // },
})