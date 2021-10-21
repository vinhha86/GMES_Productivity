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
        '#btnDelete': {
            click: 'onDelete'
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

        if(stockout.stockout_d == null) stockout.stockout_d = new Array();
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
        PackingListStore.setGroupField('spaceString');
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
    onDelete:function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var PackingListStore = viewModel.getStore('PackingListStore');
        var select = me.getSelectionModel().getSelection();
        if (select.length == 0) {
            Ext.Msg.show({
                title: "Thông báo",
                msg: "Phải chọn ít nhất một cây vải",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }else{
            Ext.Msg.show({
                title: "Thông báo",
                msg: "Bạn có chắc chắn xóa?",
                buttons: Ext.MessageBox.YESNO,
                buttonText: {
                    yes: 'Có',
                    no: 'Không'
                },
                fn: function (btn) {
                    if (btn === 'yes') {
                        m.delete(select);
                    }
                }
            });
        }
        // console.log(select);
        // this.fireEvent("ThemNPL", select, pcontractid_link, productid_link);
        // this.onThoat();
    },
    delete: function(select){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var PackingListStore = viewModel.getStore('PackingListStore');
        var stockout = viewModel.get('stockout');

        PackingListStore.remove(select);
        
        var stockout_d = stockout.stockout_d;
        for(var i=0; i<stockout_d.length; i++){
            var stockout_packinglist = stockout_d[i].stockout_packinglist;
            for(var j=0; j<select.length; j++){
                for(var k=0; k<stockout_packinglist.length; k++){
                    if(stockout_packinglist[k].epc == select[j].get('epc')){
                        // remove from stockout
                        stockout_packinglist.splice(k, 1);
                        k--;
                    }
                }
            }
        }

        stockout = m.recalculate(stockout);
        viewModel.set('stockout', stockout);
        this.fireEvent('DeletePkl', stockout);

        // console.log(select);
        // console.log(stockout);
    },
    recalculate: function(stockout){
        var stockout_d = stockout.stockout_d;
        for(var i=0; i<stockout_d.length; i++){
            var totalpackage = 0;
            var totalpackagecheck = 0;
            var totalydsorigin = 0;
            var totalydscheck = 0;
            var totalmet_origin = 0;
            var totalmet_check = 0;
            var stockout_packinglist = stockout_d[i].stockout_packinglist;
            for(var k=0; k<stockout_packinglist.length; k++){
                totalpackage++;
                totalpackagecheck++;
                totalydsorigin+=stockout_packinglist[k].ydsorigin == null ? 0 : stockout_packinglist[k].ydsorigin;
                totalydscheck+=stockout_packinglist[k].ydscheck == null ? 0 : stockout_packinglist[k].ydscheck;
                totalmet_origin+=stockout_packinglist[k].met_origin == null ? 0 : stockout_packinglist[k].met_origin;
                totalmet_check+=stockout_packinglist[k].met_check == null ? 0 : stockout_packinglist[k].met_check;
            }
            stockout_d[i].totalpackage = totalpackage;
            stockout_d[i].totalpackagecheck = totalpackagecheck;
            // stockout_d[i].totalydsorigin = totalydsorigin;
            stockout_d[i].totalydscheck = totalydscheck;
            // stockout_d[i].totalmet_origin = totalmet_origin;
            stockout_d[i].totalmet_check = totalmet_check;
        }
        return stockout;
    },
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
            includeGroups: true,
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