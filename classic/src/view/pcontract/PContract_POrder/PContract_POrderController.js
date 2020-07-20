Ext.define('GSmartApp.view.pcontract.PContract_POrderController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_POrderController',
    init: function () {
        
    },
    control:{
        '#btnSKUSelect':{
            click: 'onSKUSelect'
        },
        '#productFilter': {
            select: 'onFilterProduct'
        },
        'PContract_POList': {
            select: 'onSelectPO'
        },
        'PContract_POrder_Porders': {
            select: 'onSelectPOrder'
        },
        'PContract_POrder_Req': {
            select: 'onSelectPOrder_Req'
        },
        
    },
    onFilterProduct: function(combo, record, eOpts ){
        var store = this.getViewModel().getStore('PContractPOList');
        var productid_link = record.get('productid_link');
        var pcontractid_link = this.getViewModel().get('PContract.id');

        store.loadLeafOnly(pcontractid_link , productid_link);
    },
    onSelectPO: function(m, rec){
        var viewmodel = this.getViewModel();
        var po_id = rec.data.id;
        var pcontractid_link = rec.data.pcontractid_link;
        viewmodel.set('po_selected', rec.data);

        //Lay danh sach POrder_Req
        var porderReqStore = viewmodel.getStore('porderReqStore');
        porderReqStore.loadByPO(po_id);

    },
    onSelectPOrder_Req: function(m, rec){
        var viewmodel = this.getViewModel();
        var porder_req_id = rec.data.id;
        var po_id = viewmodel.get('po_selected').id;

        //Lay danh sach POrders
        var porderStore = viewmodel.getStore('porderStore');
        porderStore.loadByPOrder_Req(po_id,porder_req_id);
    },

    onSelectPOrder: function(m, rec){
        this.refreshSKUList(rec.data.id);
    },
    refreshSKUList:function(orderid){
        var viewmodel = this.getViewModel();
        //Lay danh sach POrders_SKU
        var porderSKUStore = viewmodel.getStore('porderSKUStore');
        porderSKUStore.loadByPorderID(orderid);
    },
    onXoaSKU: function(rid, rowIndex, colIndex){
        var viewmodel = this.getViewModel();
        Ext.Msg.confirm('Lệnh sản xuất', 'Bạn có thực sự muốn xóa SKU? chọn YES để thực hiện',
            function (choice) {
                if (choice === 'yes') {
                    var porderSKUStore = viewmodel.getStore('porderSKUStore');
                    var record = porderSKUStore.getAt(rowIndex);
                    var params=new Object();
                    params.data = record.data;
                    GSmartApp.Ajax.post('/api/v1/porder/delete_sku', Ext.JSON.encode(params),
                    function (success, response, options) {
                        var response = Ext.decode(response.responseText);
                        if (success) {
                            var porderSKUStore = viewmodel.getStore('porderSKUStore');
                            porderSKUStore.reload();
                        } else {
                            Ext.MessageBox.show({
                                title: "Lệnh sản xuất",
                                msg: response.message,
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        }
                    }); 
                }
            } );        

    },
    onSKUSelect: function(){
        var viewmodel = this.getViewModel();
        var me = this;
        var po_data = viewmodel.get('po_selected');
        var porderView = Ext.getCmp('PContract_POrder_Porders');
        var porder_data = porderView.getView().selection.data;
        if (null != porder_data){
            var form = Ext.create('Ext.window.Window', {
                height: 500,
                closable: true,
                title: 'Chi tiết màu, cỡ',
                resizable: false,
                modal: true,
                border: false,
                closeAction: 'destroy',
                width: 400,
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    border: false,
                    xtype: 'PContract_POrder_SKUSelect',
                    pcontract_poid_link: porder_data.pcontract_poid_link,
                    pcontractid_link: porder_data.pcontractid_link,
                    porderid_link: porder_data.id
                }]
            });
            form.show();
            // //Refresh Data
            // form.down('#PContract_POrder_SKUSelect').on('SKUSave', function (select) {
            //     for (var i = 0; i < select.length; i++) {
            //         var data = select[i].data;
            //         var newSKU = new Object();
            //         newSKU.id = null;
            //         newSKU.porderid_link = porderid_link;
            //         newSKU.productid_link = data.productid_link;
            //         newSKU.skuid_link = data.skuid_link;
            //         newSKU.pquantity_sample = data.pquantity_sample;
            //         newSKU.pquantity_porder = data.pquantity_porder;
            //         newSKU.pquantity_total = data.pquantity_total;
    
            //         var params = new Object();
            //         params.data = newSKU;
    
            //         GSmartApp.Ajax.post('/api/v1/porder/create_sku', Ext.JSON.encode(params),
            //         function (success, response, options) {
            //             if (success) {
            //                 var response = Ext.decode(response.responseText);
            //                 if (response.respcode != 200) {
            //                     console.log(response.message);
            //                 } else {
                                
            //                 }
            //             }
            //         })                
            //     }                  
            //     me.refreshSKUList(porder_data.id);
            //     form.close();
            // })         
        }
    },    
    onPOrderCreate:function(rid, rowIndex, colIndex){
        var me = this;
        var viewmodel = this.getViewModel();
        Ext.Msg.confirm('Lệnh sản xuất', 'Tạo lệnh sản xuất cho phân xưởng? chọn YES để thực hiện',
            function (choice) {
                if (choice === 'yes') {
                    var porderReqStore = viewmodel.getStore('porderReqStore');
                    var record = porderReqStore.getAt(rowIndex);                    
                    //Kiem tra xem co phai la san pham bo khong? --> nếu là bộ hiện danh sach san pham va so luong chua tao lenh de chon
                    var po_selected = viewmodel.get('po_selected');
                    var porderReqStore = viewmodel.getStore('porderReqStore');
                    //Kiem tra xem yeu cau sx cua PO co > 1 phan xuong ko? Neu nhieu hon 1 phan xuong --> hien option chon sizeset va color
                    if (null != porderReqStore && porderReqStore.data.items.length > 1) {
                        console.log('Hien window chon size va mau');
                        me.onSizeColorPickup(record.data.id, po_selected.productid_link, po_selected.pcontractid_link,po_selected.pcontract_poid_link);
                    } else {
                        me.onPOrderCreateByProduct(record.data.id, po_selected.productid_link, '', '');
                    }
                }
            } );        
    },
    onSizeColorPickup:function(porderreqid_link){
        var me = this;
        var viewmodel = this.getViewModel();
        var po_selected = viewmodel.get('po_selected');
        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Tạo lệnh sản xuất',
            closeAction: 'destroy',
            height: 465,
            width: 800,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'PContract_POrder_SizeColorPickup_Main',
                viewModel: {
                    data: {
                        po: po_selected,
                        porderreqid_link: porderreqid_link
                    }
                }
            }]
        });
        form.show();  
        form.down('PContract_POrder_SizeColorPickup_Main').getController().on('GenPOrder',function(product_select,sizelist,colorlist){
            for(i=0;i<product_select.length;i++){
                me.onPOrderCreateByProduct(porderreqid_link, product_select[i].data.id, sizelist, colorlist);
            }            
            form.close();
        });
        form.down('PContract_POrder_SizeColorPickup_Main').getController().on('GenPOrder_AllSKU',function(product_select,sizelist,colorlist){
            for(i=0;i<product_select.data.items.length;i++){
                me.onPOrderCreateByProduct(porderreqid_link, product_select.data.items[i].data.id, sizelist, colorlist);
            }            
            form.close();
        });
        form.down('PContract_POrder_SizeColorPickup_Main').getController().on('Thoat',function(){
            var porderStore = viewmodel.getStore('porderStore');
            porderStore.load();
            form.close();
        });
    },
    onPOrderCreateByProduct:function(porderreqid_link, productid_link, sizelist, colorlist){
        var viewmodel = this.getViewModel();
        var productStore = viewmodel.getStore('PContractProduct_PO_Store');
        productStore.loadStore_bypairid_Async(productid_link, null, true);

        productStore.load({
            scope: this,
            callback: function(records, operation, success) {
                if(!success){
                    this.fireEvent('logout');
                } else {
                    for(i=0;i<records.length;i++){
                        //Tao lenh sx cho tung san pham con
                        var params=new Object();
                        params.porderreqid_link = porderreqid_link;
                        params.productid_link = records[i].id;
                        params.size_list = sizelist;
                        params.color_list = colorlist;
                        console.log(params);
                        GSmartApp.Ajax.post('/api/v1/porder_req/gen_porder', Ext.JSON.encode(params),
                        function (success, response, options) {
                            var response = Ext.decode(response.responseText);
                            if (success) {
                                var porderStore = viewmodel.getStore('porderStore');
                                porderStore.reload();
                            } else {
                                Ext.MessageBox.show({
                                    title: "Lệnh sản xuất",
                                    msg: response.message,
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    }
                                });
                            }
                        }); 
                    }
                }
            }
        });
    },
    onMenu_POrder: function (grid, rowIndex, colIndex, item, e, record) {
        var me = this;
        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            //padding: 10,
            minWidth: 150,
            viewModel: {},
            items: [
            {
                text: 'Chi tiết lệnh',
                separator: true,
                margin: '10 0 0',
                iconCls: 'x-fa fas fa-pencil greenIcon',
                handler: function(){
                    var record = this.parentMenu.record;
                    me.onPOder_Edit(record);
                }
            }, 
            {
                text: 'Xóa lệnh',
                separator: true,
                margin: '10 0 0',
                iconCls: 'x-fa fas fa-trash redIcon',
                handler: function(){
                    var record = this.parentMenu.record;
                    me.onPOder_Delete(record);
                }
            }
        ]
        });
          // HERE IS THE MAIN CHANGE
          var position = [e.getX()-10, e.getY()-10];
          e.stopEvent();
          menu_grid.record = record;
          menu_grid.showAt(position);
    }, 
    onPOder_Edit: function(rec){
        var viewModel = this.getViewModel();

        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Chi tiết lệnh',
            closeAction: 'destroy',
            height: 465,
            width: 800,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'PContract_POrder_Edit_Main',
                viewModel: {
                    data: {
                        porder: rec,
                    }
                }
            }]
        });
        form.show();        
        form.down('PContract_POrder_Edit_Main').getController().on('Thoat',function(){
            var porderStore = viewModel.getStore('porderStore');
            if (null != porderStore) porderStore.load();
            
            form.close();
        });
    },  
    onPOder_Delete: function(rec){    
        var viewmodel = this.getViewModel();
        Ext.Msg.confirm('Lệnh sản xuất', 'Bạn có thực sự muốn xóa Lệnh sản xuất? chọn YES để thực hiện',
            function (choice) {
                if (choice === 'yes') {
                    var params=new Object();
                    params.id = rec.data.id;
                    GSmartApp.Ajax.post('/api/v1/porder/delete', Ext.JSON.encode(params),
                    function (success, response, options) {
                        var response = Ext.decode(response.responseText);
                        if (success) {
                            var porderStore = viewmodel.getStore('porderStore');
                            porderStore.load();
                        } else {
                            Ext.MessageBox.show({
                                title: "Lệnh sản xuất",
                                msg: response.message,
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        }
                    }); 
                }
            } );             
    },
    renderSum: function(value, summaryData, dataIndex){
        var viewmodel = this.getViewModel();
        var po_totalorder = viewmodel.get('po_selected.po_quantity');
        if (null == po_totalorder) po_totalorder = 0;
        if (null == value) value = 0;
        if (po_totalorder != value)
            return '<div style="font-weight: bold; color:red;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
        else 
            return '<div style="font-weight: bold; color:black;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
    }    
})