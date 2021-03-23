Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing_Edit_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CutplanProcessing_Edit_Controller',
	init: function() {
        var viewModel = this.getViewModel();
        var OrgStore = viewModel.getStore('OrgStore');
		OrgStore.loadStore(28);

        var SkuStore = viewModel.getStore('Sku');
        SkuStore.getSorters().add('product_code');

        var CutPlanRowStore = viewModel.getStore('CutPlanRowStore');
        // console.log(CutPlanRowStore);
        // var CutPlanRowStoreFilter = CutPlanRowStore.getFilters();
        // CutPlanRowStoreFilter.add({
        //     id: 'CutPlanRowStoreFilter',
        //     property: 'type',
        //     value: 0,
        //     exactMatch: true
        // });
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
        '#btnAdd': {
            tap: 'onBtnAdd'
        },
    },
    onTestFilterKeyup: function(){
        var viewModel = this.getViewModel();
        var filterField = this.getView().down('#testFilter'),
            filters = viewModel.getStore('CutPlanRowStore').getFilters();

        if (filterField.getValue()) {
            this.testFilter = filters.add({
                id: 'testFilter',
                property: 'name',
                value: filterField.getValue(),
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.testFilter) {
            filters.remove(this.testFilter);
            this.testFilter = null;
        }
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
        // console.log('onLoadData: ' + id + ' ' + type);
        var me = this;
        var viewModel = this.getViewModel();
        if(id == 0){
            viewModel.set('cutplanProcessing.processingdate', new Date());
            // viewModel.set('cutplanProcessing.pordercode', 'VCTK-203621-14/05/21_1');
        }else{
            me.getInfo(id);
        }
    },
    onBackPage: function(){
        // console.log('onBackPage');
        this.redirectTo('cutplan_processing');
    },
    getInfo: function(id){
        var m = this;
        var viewModel = this.getViewModel();
        // var CutplanProcessingDStore = viewModel.getStore('CutplanProcessingDStore');

        var params = new Object();
        params.id = id ;
        GSmartApp.Ajax.post('/api/v1/cutplan_processing/cutplan_processing_getbyid',Ext.JSON.encode(params),
		function(success,response,options ) {
            var response = Ext.decode(response.responseText);
            if(response.respcode == 200) {
                // console.log(response.data);
                viewModel.set('cutplanProcessing', response.data);

                var date = Ext.Date.parse(response.data.processingdate, 'c');
                if(date == null) date = new Date(response.data.processingdate);
                viewModel.set('cutplanProcessing.processingdate', date);

                // dựa vào thông tin cutplan_processing để load store sku và color
                if(response.data.porderId != null || response.data.porderId != 0){
                    var porderid_link = response.data.porderid_link;
                    var pcontractid_link = response.data.pcontractid_link;
                    var productid_link = response.data.productid_link;
                    var producttypeid_link = 20;

                    // load sku store (npl)
                    if(pcontractid_link != null){
                        var SkuStore = viewModel.getStore('Sku');
                        SkuStore.load_by_type_and_pcontract(producttypeid_link, pcontractid_link);
                    }

                    // load color store
                    if(pcontractid_link != null && productid_link != null){
                        m.loadColorStore(pcontractid_link, productid_link);
                    }


                }
                
                // CutplanProcessingDStore.setData(response.data.cutplanProcessingD);

            }
		})
    },
    onSave: function(){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var params = new Object();
        params.data = [];
        var cutplanProcessing = viewModel.get('cutplanProcessing');

        var cutplanProcessingD = cutplanProcessing.cutplanProcessingD;
        if(cutplanProcessingD != null){
            for(var i = 0; i < cutplanProcessingD.length; i++){
                if(cutplanProcessingD[i].id == 0 || typeof cutplanProcessingD[i].id === 'string'){
                    cutplanProcessingD[i].id = null;
                }
            }
        }
        // console.log(stockin);
        params.data.push(cutplanProcessing);
        GSmartApp.Ajax.post('/api/v1/cutplan_processing/cutplan_processing_create', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.toast('Lưu thành công', 1000);
                        this.redirectTo("cutplan_processing/" + response.id + "/edit");
                        m.getInfo(response.id);
                    }
                } else {
                    var response = Ext.decode(response.responseText);
                    Ext.toast('Lỗi ' + response.message, 1000);
                }
        })
        
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
                        // console.log(response);
                        if(response.message == 'Mã lệnh không tồn tại'){
                            Ext.toast(response.message, 1000);
                        }else{
                            Ext.toast('Tìm lệnh thành công', 1000);
                            // load bản ghi đầu tiên trả vê, cần sửa lại nếu có nhiều lệnh trùng ordercode
                            viewModel.set('porder', response.data[0]); // VCTK-203621-14/05/21_1
                            viewModel.set('cutplanProcessing.porderid_link', response.data[0].id);
                            viewModel.set('cutplanProcessing.pcontractid_link', response.data[0].pcontractid_link);
                            viewModel.set('cutplanProcessing.productid_link', response.data[0].productid_link);

                            var porderid_link = response.data[0].id;
                            var pcontractid_link = response.data[0].pcontractid_link;
                            var productid_link = response.data[0].productid_link;
                            var producttypeid_link = 20;

                            // load sku store (npl)
                            if(pcontractid_link != null){
                                var SkuStore = viewModel.getStore('Sku');
                                SkuStore.load_by_type_and_pcontract(producttypeid_link, pcontractid_link);
                            }

                            // load color store
                            if(pcontractid_link != null && productid_link != null){
                                m.loadColorStore(pcontractid_link, productid_link);
                            }

                        }
                    }
                    else {
                        Ext.toast('Lấy thông tin thất bại', 1000);
                        // console.log(response.message);
                    }

                } else {
                    Ext.toast('Lấy thông tin thất bại', 1000);
                    // console.log('request failed');
                }
            })
    },
    onBtnSearch:function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var pordercode = viewModel.get('cutplanProcessing.pordercode');
        var viewId = 'cutplan_processing_edit';
        var cutplanProcessing = viewModel.get('cutplanProcessing');
        var granttoorgid_link = null;

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
            var porder = record.data; // console.log(record);
            viewModel.set('porder', porder);
            viewModel.set('cutplanProcessing.pordercode', porder.ordercode);

            viewModel.set('cutplanProcessing.porderid_link', porder.id);
            viewModel.set('cutplanProcessing.pcontractid_link', porder.pcontractid_link);
            viewModel.set('cutplanProcessing.productid_link', porder.productid_link);

            var porderid_link = porder.id;
            var pcontractid_link = porder.pcontractid_link;
            var productid_link = porder.productid_link;
            var producttypeid_link = 20;

            // load sku store (npl)
            if(pcontractid_link != null){
                var SkuStore = viewModel.getStore('Sku');
                SkuStore.load_by_type_and_pcontract(producttypeid_link, pcontractid_link);
            }

            // load color store
            if(pcontractid_link != null && productid_link != null){
                m.loadColorStore(pcontractid_link, productid_link);
            }

            dialog.close();
        });
        dialog.down('#HandoverDetailPorderSearch').getController().on('found0Porder', function () {
            Ext.toast('Không tìm thấy lệnh', 1000);
            dialog.close();
        });
        dialog.down('#HandoverDetailPorderSearch').getController().on('found1Porder', function (record) {
            Ext.toast('Tìm thấy 1 lệnh', 1000);
            var porder = record[0].data; // console.log(porder);
            viewModel.set('porder', porder);
            viewModel.set('cutplanProcessing.pordercode', porder.ordercode);

            viewModel.set('cutplanProcessing.porderid_link', porder.id);
            viewModel.set('cutplanProcessing.pcontractid_link', porder.pcontractid_link);
            viewModel.set('cutplanProcessing.productid_link', porder.productid_link);

            var porderid_link = porder.id;
            var pcontractid_link = porder.pcontractid_link;
            var productid_link = porder.productid_link;
            var producttypeid_link = 20;

            // load sku store (npl)
            if(pcontractid_link != null){
                var SkuStore = viewModel.getStore('Sku');
                SkuStore.load_by_type_and_pcontract(producttypeid_link, pcontractid_link);
            }

            // load color store
            if(pcontractid_link != null && productid_link != null){
                m.loadColorStore(pcontractid_link, productid_link);
            }

            dialog.close();
        });
    },

    loadColorStore: function(pcontractid_link, productid_link){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var params = new Object();
        params.pcontractid_link = pcontractid_link;
        params.productid_link = productid_link;

        GSmartApp.Ajax.post('/api/v1/pcontractsku/getbypcontract_product', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);

                    var listcolorData = new Array();
                    var listcolorid = new Array();
                    for (var i = 0; i < response.data.length; i++) {
                        var data = response.data[i];
                        if (!listcolorid.includes(data.color_id)) {
                            var colorObj = new Object();
                            colorObj.id = data.color_id;
                            colorObj.name = data.mauSanPham;
                            listcolorData.push(colorObj);
                            listcolorid.push(data.color_id);
                        }
                    }

                    // set data cho store cbbox
                    viewModel.set('listcolorData',listcolorData);
                    // console.log(viewModel.get('cutplanProcessing'));
                    // console.log(me.down('#cbboxcolor').getStore().getData());
                    // console.log(me.down('#cbboxcolor').getValue());
                    // console.log(viewModel.get('cutplanProcessing.colorid_link') == me.down('#cbboxcolor').getValue());
                }
            })
    },

    onSelectSku: function( cbbox, newValue, oldValue, eOpts){
        this.loadCutPlanRowStore();
    },
    onSelectMauSP: function(cbbox, newValue, oldValue, eOpts){
        this.loadCutPlanRowStore();
    },
    loadCutPlanRowStore: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var porder = viewModel.get('porder');
        var porderid_link = viewModel.get('cutplanProcessing.porderid_link');
        var pcontractid_link = viewModel.get('cutplanProcessing.pcontractid_link');
        var productid_link = viewModel.get('cutplanProcessing.productid_link');
        var material_skuid_link = viewModel.get('cutplanProcessing.material_skuid_link');
        var colorid_link = viewModel.get('cutplanProcessing.colorid_link');

        if(material_skuid_link != null && colorid_link != null){
            var CutPlanRowStore = viewModel.getStore('CutPlanRowStore');
            CutPlanRowStore.loadStore_bycolor(
                colorid_link, porderid_link, material_skuid_link, 
                productid_link, pcontractid_link
                );

            // CutPlanRowStore.loadStore_bycolor_async(
            //     colorid_link, porderid_link, material_skuid_link, 
            //     productid_link, pcontractid_link
            //     );
            //     CutPlanRowStore.load({
            //     scope: this,
            //     callback: function(records, operation, success) {
            //         if(!success){
            //                 this.fireEvent('logout');
            //         } else {
            //             var CutPlanRowStoreFilter = CutPlanRowStore.getFilters();

            //             if (!m.CutPlanRowStoreFilter) {
            //                 console.log('in here');
            //                 m.CutPlanRowStoreFilter = CutPlanRowStoreFilter.add({
            //                     id: 'CutPlanRowStoreFilter',
            //                     property: 'type',
            //                     value: '0',
            //                     exactMatch: true
            //                 });

            //                 console.log(m.CutPlanRowStoreFilter);
            //             }
            //         }
            //     }
            // });
        }
    },

    onSelectCutPlanRow:function(cbbox, newValue, oldValue, eOpts){
        var viewModel = this.getViewModel();
        var cutPlanRow = newValue.data;
        viewModel.set('cutPlanRow', cutPlanRow);
        viewModel.set('cutplanProcessing.cutplanrowid_link', cutPlanRow.id)
        // console.log(cutPlanRow);
    },

    onBtnAdd: function(){
        var me = this.getView();
        var viewModel = this.getViewModel();
        // var CutplanProcessingDStore = viewModel.getStore('CutplanProcessingDStore');
        var store = Ext.getCmp('CutplanProcessing_Edit_D').getStore();

        var cutplanProcessing = viewModel.get('cutplanProcessing');
        var cutplanProcessingD = viewModel.get('cutplanProcessing.cutplanProcessingD');

        var cutplanProcessingDObj = new Object();
        cutplanProcessingDObj.lotnumber = viewModel.get('cutplanProcessingDObj.lotnumber');
        cutplanProcessingDObj.packageid = viewModel.get('cutplanProcessingDObj.packageid');
        cutplanProcessingDObj.la_vai = viewModel.get('cutplanProcessingDObj.la_vai');
        cutplanProcessingDObj.tieu_hao = viewModel.get('cutplanProcessingDObj.tieu_hao');
        cutplanProcessingDObj.con_lai = viewModel.get('cutplanProcessingDObj.con_lai');
        cutplanProcessingDObj.ps = viewModel.get('cutplanProcessingDObj.ps');
        cutplanProcessingDObj.met = viewModel.get('cutplanProcessingDObj.met');

        if(
            viewModel.get('cutplanProcessingDObj.lotnumber') == null || 
            viewModel.get('cutplanProcessingDObj.lotnumber') == ''){
                me.down('#lotnumber').focus();
                return;
        }
        if(
            viewModel.get('cutplanProcessingDObj.packageid') == null || 
            viewModel.get('cutplanProcessingDObj.packageid') == ''){
                me.down('#packageid').focus();
                return;
        }
        if(
            viewModel.get('cutplanProcessingDObj.met') == null || 
            viewModel.get('cutplanProcessingDObj.met') == ''){
                me.down('#met').focus();
                return;
        }
        if(
            viewModel.get('cutplanProcessingDObj.la_vai') == null || 
            viewModel.get('cutplanProcessingDObj.la_vai') == ''){
                me.down('#la_vai').focus();
                return;
        }
        if(
            viewModel.get('cutplanProcessingDObj.tieu_hao') == null || 
            viewModel.get('cutplanProcessingDObj.tieu_hao') == ''){
                me.down('#tieu_hao').focus();
                return;
        }
        if(
            viewModel.get('cutplanProcessingDObj.con_lai') == null || 
            viewModel.get('cutplanProcessingDObj.con_lai') == ''){
                me.down('#con_lai').focus();
                return;
        }
        if(
            viewModel.get('cutplanProcessingDObj.ps') == null || 
            viewModel.get('cutplanProcessingDObj.ps') == ''){
                me.down('#ps').focus();
                return;
        }

        cutplanProcessingD.push(cutplanProcessingDObj);
        store.loadData(cutplanProcessingD);

        viewModel.set('cutplanProcessingDObj.lotnumber', '');
        viewModel.set('cutplanProcessingDObj.packageid', '');
        viewModel.set('cutplanProcessingDObj.la_vai', '');
        viewModel.set('cutplanProcessingDObj.tieu_hao', '');
        viewModel.set('cutplanProcessingDObj.con_lai', '');
        viewModel.set('cutplanProcessingDObj.ps', '');
        viewModel.set('cutplanProcessingDObj.met', '');

        // console.log(cutplanProcessing);
        // console.log(cutplanProcessingD);
        // console.log(store);
    }

})