Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_Pklist_Print.Stockout_Pklist_Print_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_Pklist_Print_Controller',
    init: function () {
        
    },
    requires: [
        'Ext.exporter.excel.Xlsx'
    ],
    listen: {

    },
    control: {
        '#Stockout_Pklist_Print_View': {
            afterrender: 'onAfterrender'
        },
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnPrint': {
            click: 'onPrint'
        },
    },
    onThoat: function(){
        this.fireEvent('Thoat');
    },
    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var stockout = viewModel.get('stockout');
        var storeData = new Array();

        var stockout_d = stockout.stockout_d;
        for(var i = 0; i<stockout_d.length; i++) {
            var stockout_packinglist = stockout_d[i].stockout_packinglist;
            // console.log(stockout_d[i]);
            for(var j = 0; j<stockout_packinglist.length; j++){
                stockout_packinglist[j].skucode = stockout_d[i].skucode;
                stockout_packinglist[j].skuname = stockout_d[i].skuname;
                if(stockout_packinglist[j].warehousestatus == 0){
                    stockout_packinglist[j].warehousestatusString = 'Chưa tở';
                }else{
                    stockout_packinglist[j].warehousestatusString = 'Đã tở';
                }
                storeData.push(stockout_packinglist[j]);
            }
        }

        viewModel.set('storeData',storeData);
        var PackingListStore = viewModel.getStore('PackingListStore');
        PackingListStore.getSorters().add({
            property: 'skucode',
            direction: 'ASC'
        },{
            property: 'skuname',
            direction: 'ASC'
        },{
            property: 'spaceString',
            direction: 'ASC'
        },{
            property: 'lotnumber',
            direction: 'ASC'
        },{
            property: 'packageid',
            direction: 'ASC'
        });
        PackingListStore.insert(0,storeData);
    },
    // onPrint: function(){
    //     var m = this;
    //     var me = this.getView();
    //     var viewModel = this.getViewModel();
    //     var stockout = viewModel.get('stockout');

    //     console.log(stockout);


    // },
    onPrint: function (btn) {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
		// var cfg = Ext.merge({
		// 	title: 'Grid export demo',
		// 	fileName: 'GridExport' + '.' + (btn.cfg.ext || btn.cfg.type)
		// }, btn.cfg);

		// this.getView().saveDocumentAs(cfg);

        me.saveDocumentAs({
            type: 'excel', // exporter alias
            title: 'Danh sách cây vải',
            showSummary: true,
            fileName: 'PKList.xlsx'
        });
	},
	onBeforeDocumentSave: function (view) {
		view.mask({
			xtype: 'loadmask',
			message: 'Document is prepared for export. Please wait ...'
		});
	},
	onDocumentSave: function (view) {
		view.unmask();
	},
})