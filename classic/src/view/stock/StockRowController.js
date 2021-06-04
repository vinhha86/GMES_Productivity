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
    onThemTrucThuoc: function(){
        // parentid_link
        var viewModel = this.getViewModel();
        viewModel.set('parentid_link',viewModel.get('id'));
        viewModel.set('id',0);
        this.emptyForm();
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
                if (success) {
                    var response = Ext.decode(response.responseText);
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
    createProductionLineForManufacturer: function (record) {
        var treePanel = Ext.getCmp('ListOrgMenu');
        var viewModel = this.getViewModel();

        var params = new Object();
        var data = record;
        // data.prefix = parentRecord.data.code;
        params.data = data;
        params.msgtype = "ORG_PRODUCTIONLINE_CREATE";
        params.message = "Thêm tổ chuyền";

        GSmartApp.Ajax.post('/api/v1/orgmenu/createproductionline', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        // Ext.Msg.show({
                        //     title: 'Thông báo',
                        //     msg: 'Thêm tổ chuyền thành công',
                        //     buttons: Ext.MessageBox.YES,
                        //     buttonText: {
                        //         yes: 'Đóng',
                        //     }
                        // });

                        var storeMenu = viewModel.getStore('MenuStore');
                        var items = storeMenu.data.items; // items trong tree
                        var isExist = false;
                        var org = response.org;

                        // neu org chua ton tai, neu status = 1, them
                        if(!isExist && org.status == 1){
                            for(var i=0;i<items.length;i++){
                                var parentOrg = items[i].data;
                                // console.log(parentOrg);
                                if(parentOrg.id == org.parentid_link){
                                    org.children = [];
                                    org.depth = parentOrg.depth+1;
                                    org.expandable = true;
                                    org.expanded = false;
                                    org.glyph = '';
                                    org.leaf = true;
                                    org.qshowDelay = 0;
                                    org.root = false;
                                    org.selectable = true;
                                    org.visible = true;
                                    var node = storeMenu.getById(parentOrg.id);
                                    node.appendChild(org);
                                    break;
                                }
                            }
                        }

                        treePanel.reconfigure(storeMenu);

                    }
                }
            })
    }
})