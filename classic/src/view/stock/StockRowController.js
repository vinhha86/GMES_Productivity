Ext.define('GSmartApp.view.stock.StockRowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StockRowController',
    Id: 0,
    init: function () {
        this.onloadPage();
    },
    control: {
        '#btnLuuRow': {
            click: 'onLuu'
        },
        // '#btnThemDonViTrucThuoc': {
        //     click: 'onThemTrucThuoc'
        // }
    },
    onloadPage: function(){
        var viewModel = this.getViewModel();
        var ListKhoRowStore = viewModel.getStore('ListKhoRowStore');
        ListKhoRowStore.loadOrgByTypeKho();
    },
    emptyForm: function(){
        var viewModel = this.getViewModel();
        viewModel.set('rowObj', null);
    },
    onLuu: function () {
        var m = this;
        var me = this.getView();
        var treePanel = Ext.getCmp('stock').down('StockMenu');

        var viewModel = this.getViewModel();
        var rowObj = viewModel.get('rowObj');
        if(
            rowObj.orgid_link == null || rowObj.orgid_link == '' || 
            rowObj.code == null || rowObj.code == ''
            ){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Cần phải điền đầy đủ thông tin',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            me.down('#txtFieldCode').focus();
            return;
        }

        var params = new Object();
        params.data = rowObj;

        me.setLoading("Đang lưu dữ liệu");
        GSmartApp.Ajax.postJitin('/api/v1/stock/create_row', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);
                var response = Ext.decode(response.responseText);
                if (success) {
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        
                        var StockTreeStore = viewModel.getStore('StockTreeStore');
                        var items = StockTreeStore.data.items; // items trong tree
                        var stockrow = response.stockrow;
                        var isNew = response.isNew;

                        // check ton tai
                        if(!isNew){
                            var node = StockTreeStore.findNode('idString', '3;' + stockrow.id);
                            node.data.name = stockrow.code;
                        }
                        if(isNew){
                            var parentNode = StockTreeStore.findNode('idString', '2;' + stockrow.orgid_link);
                            var stockrowObj = new Object();
                            stockrowObj.children = [];
                            stockrowObj.expandable = true;
                            stockrowObj.expanded = false;
                            stockrowObj.id = stockrow.id;
                            stockrowObj.idString = '3;' + stockrow.id;
                            stockrowObj.leaf = true;
                            stockrowObj.name = stockrow.code;
                            stockrowObj.orgid_link = stockrow.orgid_link;
                            stockrowObj.parentId = stockrow.orgid_link;
                            stockrowObj.parentIdString = '2;' + stockrow.orgid_link;
                            stockrowObj.type = 3;
                            stockrowObj.visible = true;
                            parentNode.appendChild(stockrowObj);
                        }

                        treePanel.reconfigure(StockTreeStore);
                        viewModel.set('rowObj', null);
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Lưu thất bại',
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Lưu thất bại',
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    },
})