Ext.define('GSmartApp.view.pcontract.PContractSKUViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractSKUViewCotroller',
    init: function () {
        
    },
    control:{
        '#btnConfirmSKU' : {
            click: 'onConfimSKU'
        }
    },
    onConfimSKU: function(){
        var me = this.getView();
        var viewmodel = this.getViewModel();
        if(viewmodel.get('IdProduct') == 0){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn chưa chọn sản phẩm',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else {
            var params = new Object();
            params.pcontractid_link = viewmodel.get('PContract.id');
            params.productid_link = viewmodel.get('IdProduct');

            GSmartApp.Ajax.post('/api/v1/pcontractproduct/comfim_sizebreakdown', Ext.JSON.encode(params),
                    function (success, response, options) {
                        if (success) {
                            var response = Ext.decode(response.responseText);
                            if(response.respcode == 200){
                                Ext.Msg.show({
                                    title: "Thông báo",
                                    msg: 'Thành công',
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'OK'
                                    },
                                    fn: function(){
                                        me.fireEvent('ConfimSKU');
                                    }
                                });
                            }
                        }
                        else {
                            Ext.Msg.show({
                                title: "Thông báo",
                                msg: 'Thất bại',
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'OK'
                                }
                            });
                        }
                    })
        }
    },
    onEdit: function(editor, context, e){
        if(context.value == context.originalValue) return;

        var viewmodel = this.getViewModel();
        var data = context.record.data;
        var params = new Object();
        params.data = data;
        params.data.pcontract_poid_link = viewmodel.get('pcontract_poid_link');
        if(context.field == "pquantity_porder")
            params.isupdte_amount = true;
        else
            params.isupdte_amount = false;

        delete params.data.listSKUvalue;

        GSmartApp.Ajax.post('/api/v1/pcontractsku/update', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    var store = viewmodel.getStore('PContractSKUStore');
                    if (response.respcode != 200) {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: 'Lưu thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Có'
                            }
                        });
                        store.rejectChanges();
                    }
                    else {
                        context.record.set('pquantity_production', response.amount);
                        store.commitChanges();
                    }
                }
            })
    },
    onXoa: function(grid, rowIndex, colIndex){
        var th = this;
        Ext.Msg.show({
            title: "Thông báo",
            msg: 'bạn có chắc chắn muốn xóa SKU ?',
            buttons: Ext.MessageBox.YESNO,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function(btn){
                if(btn==='yes'){
                    var viewmodel= th.getViewModel();
                    var record = grid.getStore().getAt(rowIndex);
                    var params = new Object();
                    params.pcontractid_link = viewmodel.get('PContract.id');
                    params.skuid_link = record.data.skuid_link;
                
                    GSmartApp.Ajax.post('/api/v1/pcontractsku/delete', Ext.JSON.encode(params),
                    function (success, response, options) {
                        if (success) {
                            var response = Ext.decode(response.responseText);
                            var store = viewmodel.getStore('PContractSKUStore');
                            if (response.respcode == 200) {
                                Ext.Msg.show({
                                    title: "Thông báo",
                                    msg: 'Xóa thành công',
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'OK'
                                    }
                                });
                                store.remove(record);

                                var tab = Ext.getCmp('PContractProduct_Bom_TabColorView').getController();
                                tab.createTab();

                                var storeAtt = viewmodel.getStore('PContractAttValueStore');
                                storeAtt.loadStore(params.pcontractid_link, viewmodel.get('IdProduct'));
                            }
                            else {
                                Ext.Msg.show({
                                    title: "Thông báo",
                                    msg: 'Xóa thất bại',
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'OK'
                                    }
                                });
                            }
                        }
                    })
                }
            }
        });
    },
    onThemSKU: function(){
        var viewmodel = this.getViewModel();
        if(viewmodel.get('IdProduct') == 0){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn chưa chọn sản phẩm',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else{
            var form =Ext.create({
                xtype: 'skusearchwindow',
                reference:'skusearchwindow',
                width: 800,
                height: 500,                
                viewModel: {
                    data: {
                        sourceview: 'PContractSKU_ListProductView',
                        pcontractid_link: viewmodel.get('PContract.id'),
                        searchtype: 1,
                        orgcustomerid_link: viewmodel.get('PContract.orgbuyerid_link'),
                        productid_link : viewmodel.get('IdProduct'),
                        productid_link_notsearch: viewmodel.get('IdProduct'),
                        type: 10,
                        pcontract_poid_link: viewmodel.get('pcontract_poid_link'),
                        isSearchViewHidden: true
                    }
                }
            });
            form.show();
        }
        
    },    
})