Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing_Edit_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CutplanProcessing_Edit_Controller',
	init: function() {
        var viewModel = this.getViewModel();
        var OrgStore = viewModel.getStore('OrgStore');
		OrgStore.loadStore(28);

		// var userStore = this.getViewModel().getStore('UserStore');
		// userStore.loadStore();

		// var listidtype = "13,3";
        // // var listidtype = "4,8,9,11,12";
		// // var orgfromstore = this.getViewModel().getStore('OrgFromStore');
		// // orgfromstore.loadStore_byRoot(listidtype);

		// var orgtostore = this.getViewModel().getStore('OrgToStore');
		// orgtostore.loadStore_allchildren_byorg(listidtype);

		// var currencyStore = this.getViewModel().getStore('CurrencyStore');
		// currencyStore.loadStore();

		// var vattypeStore = this.getViewModel().getStore('VatTypeStore');
		// vattypeStore.loadStore();
		
		// var stockintype = this.getViewModel().getStore('StockinTypeStore');
		// stockintype.loadStore();
    },
    listen: {
        controller: {
            '*': {
                loaddata: 'onLoadData',
                newdata: 'onNewData',
				// urlBack:'onUrlBack'
            }
        }
	},
    control:{
        '#btnBack':{
            tap: 'onBackPage'
        },
        '#btnLuu':{
            tap: 'onSave'
        },
        '#btnPlus': {
            tap: 'onBtnPlus'
        },
        '#btnSearch': {
            tap: 'onBtnSearch'
        },
    },
    onUrlBack: function(type){
        
    },
    onNewData:function(type, id){
        // console.log('onNewData');
        // var viewModel = this.getViewModel();
        // var session = GSmartApp.util.State.get('session');
        // console.log(session);

        // viewModel.set('stockin.stockindate',new Date());
        // viewModel.set('stockin.usercreateid_link', session.user);
        // viewModel.set('listepc', new Map());
        // viewModel.set('stockin.orgid_to_link', session.orgid_link)
        // viewModel.set('stockin.stockintypeid_link', id);
        // viewModel.set('stockin.status', -1);

        // // set store org from
        // if(id == 1) {// mua moi va cap bu thi là nha cung cap
        //     var orgfromstore = viewModel.getStore('OrgFromStore');
        //     orgfromstore.loadStore(5, false);
        // }else{
        //     var listidtype = "13,4,8,9";
        //     var orgfromstore = viewModel.getStore('OrgFromStore');
        //     orgfromstore.loadStore_byRoot(listidtype);
        // }

        // console.log(viewModel.get('stockin'));
    },
    onLoadData:function(id,type){
        console.log('onLoadData: ' + id + ' ' + type);
        var me = this;
        var viewModel = this.getViewModel();
        if(id == 0){
            viewModel.set('cutplanProcessing.processingdate', new Date());
        }else{
            me.getInfo(id);
        }
    },
    onBackPage: function(){
        // console.log('onBackPage');
        this.redirectTo('cutplan_processing');
    },
    getInfo: function(id){
        // var me = this;
        // var viewModel = this.getViewModel();
        // var store = viewModel.getStore('StockinDetailStore');
        // var listepc = viewModel.get('listepc');

        // var params = new Object();
        // params.id = id ;
        // GSmartApp.Ajax.postJitin('/api/v1/stockin/stockin_getbyid',Ext.JSON.encode(params),
		// function(success,response,options ) {
        //     var response = Ext.decode(response.responseText);
        //     if(response.respcode == 200) {
        //         // console.log(response.data);
        //         viewModel.set('stockin', response.data);
        //         for(var i=0; i<response.listepc.length; i++){
        //             listepc.set(response.listepc[i].epc, response.listepc[i].epc);
        //         }
        //         store.setData(response.data.stockin_d);

        //         // set store org from
        //         if(response.data.stockintypeid_link == 1) {// mua moi va cap bu thi là nha cung cap
        //             var orgfromstore = viewModel.getStore('OrgFromStore');
        //             orgfromstore.loadStore(5, false);
        //         }else{
        //             var listidtype = "13,4,8,9";
        //             var orgfromstore = viewModel.getStore('OrgFromStore');
        //             orgfromstore.loadStore_byRoot(listidtype);
        //         }
        //     }
		// })
    },
    onSave: function(){
    //     var me = this.getView();
    //     var m = this;
    //     var viewModel = this.getViewModel();
    //     var params = new Object();
    //     params.data = [];
    //     var stockin = viewModel.get('stockin');

    //     var stockin_d = stockin.stockin_d;
    //     if(stockin_d != null){
    //         for(var i = 0; i < stockin_d.length; i++){
    //             if(stockin_d[i].id == 0 || typeof stockin_d[i].id === 'string'){
    //                 stockin_d[i].id = null;
    //             }

    //             var stockin_packinglist = stockin_d[i].stockin_packinglist;
    //             if(stockin_packinglist != null){
    //                 for(var j = 0; j < stockin_packinglist.length; j++){
    //                     if(stockin_packinglist[j].id == 0 || typeof stockin_packinglist[j].id === 'string'){
    //                         stockin_packinglist[j].id = null;
    //                     }
    //                     if(stockin_packinglist[j].stockindid_link == 0 || typeof stockin_packinglist[j].stockindid_link === 'string'){
    //                         stockin_packinglist[j].stockindid_link = null;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     // console.log(stockin);
    //     params.data.push(stockin);
    //     GSmartApp.Ajax.postJitin('/api/v1/stockin/stockin_create_material', Ext.JSON.encode(params),
    //         function (success, response, options) {
    //             if (success) {
    //                 var response = Ext.decode(response.responseText);
    //                 if (response.respcode == 200) {
    //                     Ext.toast('Lưu phiếu thành công', 1000);
    //                     this.redirectTo("stockin_m_main/" + response.id + "/edit");
    //                     m.getInfo(response.id);
    //                 }
    //             } else {
    //                 var response = Ext.decode(response.responseText);
    //                 Ext.toast('Lỗi lập phiếu: ' + response.message, 1000);
    //             }
    //     })
        
    },
    
    onBtnPlus: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var cutplanProcessing = viewModel.get('cutplanProcessing');
        var pordercode = viewModel.get('cutplanProcessing.pordercode');

        if(pordercode == null || pordercode.length == 0){
            Ext.toast('Mã lệnh không được bỏ trống', 1000);
            return;
        }

        var params = new Object();
        params.pordercode = pordercode;

        GSmartApp.Ajax.post('/api/v1/porderlist/getbyexactpordercode', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        console.log(response);
                        if(response.message == 'Mã lệnh không tồn tại'){
                            Ext.toast(response.message, 1000);
                        }else{
                            Ext.toast('Tìm lệnh thành công', 1000);
                            // load bản ghi đầu tiên trả vê, cần sửa lại nếu có nhiều lệnh trùng ordercode
                            var porderid_link = response.data[0].id;

                            // load sơ đồ cắt theo lệnh tìm được
                            var CutPlanRowStore = viewModel.getStore('CutPlanRowStore');
                            CutPlanRowStore.loadStore_byPorder(porderid_link);
                        }
                    }
                    else {
                        Ext.toast('Lấy thông tin thất bại', 1000);
                        console.log(response.message);
                    }

                } else {
                    Ext.toast('Lấy thông tin thất bại', 1000);
                    console.log('request failed');
                }
            })
    },
    onBtnSearch:function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var pordercode = viewModel.get('pordercode');
        var viewId = viewModel.get('viewId');
        var currentRec = viewModel.get('currentRec');
        var granttoorgid_link = currentRec.orgid_to_link;
        // console.log(granttoorgid_link);
        // console.log(pordercode);
        // console.log(viewId);

        if((pordercode == null || pordercode.length == 0) && granttoorgid_link == null){
            Ext.toast('Mã lệnh không được bỏ trống', 1000);
            return;
        }

        var dialog = Ext.create({
            xtype: 'dialog',
            itemId: 'dialog',
            // title: 'Số lượng',
            width: 300,
            height: 300,
            header: false,
            closable: true,
            closeAction: 'destroy',
            maximizable: false,
            maskTapHandler: function(){
                // console.log('mask tapped');
                if(dialog){
                    dialog.close();
                }
            },
            bodyPadding: '1',
            maxWidth: 300,
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'HandoverDetailPorderSearch',
                viewModel: {
                    data: {
                        pordercode: pordercode,
                        granttoorgid_link: granttoorgid_link,
                        viewId: viewId
                    }
                }
            }],
        });
        dialog.show();

        // get event
        dialog.down('#HandoverDetailPorderSearch').getController().on('selectPOrder', function (record) {
            // console.log(record);

            var porderid_link = record.get('id');
            var ordercode = record.get('ordercode');

            // cut to line, load store ListOrgStore_To
            var ListOrgStore_To = viewModel.getStore('ListOrgStore_To');
            ListOrgStore_To.loadStoreByPorderIdLink(porderid_link);
            me.down('#orgid_to_link').setValue(null);
            me.down('#orgid_to_link').focus();

            viewModel.set('currentRec.porderid_link', porderid_link);
            viewModel.set('pordercode', ordercode);
            m.loadHandoverProductOnPorderSelect(porderid_link);

            dialog.close();
        });
        dialog.down('#HandoverDetailPorderSearch').getController().on('found0Porder', function () {
            Ext.toast('Không tìm thấy lệnh', 1000);
            dialog.close();
        });
        dialog.down('#HandoverDetailPorderSearch').getController().on('found1Porder', function (record) {
            Ext.toast('Tìm thấy 1 lệnh', 1000);
            var record = record[0];

            var porderid_link = record.get('id');
            var ordercode = record.get('ordercode');

            // cut to line, load store ListOrgStore_To
            var ListOrgStore_To = viewModel.getStore('ListOrgStore_To');
            ListOrgStore_To.loadStoreByPorderIdLink(porderid_link);
            // me.down('#orgid_to_link').setValue(null);
            // me.down('#orgid_to_link').focus();

            viewModel.set('currentRec.porderid_link', porderid_link);
            viewModel.set('pordercode', ordercode);
            m.loadHandoverProductOnPorderSelect(porderid_link);

            dialog.close();
        });
    },

})