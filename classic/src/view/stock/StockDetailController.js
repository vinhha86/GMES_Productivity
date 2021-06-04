Ext.define('GSmartApp.view.stock.StockDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StockDetailController',
    Id: 0,
    init: function () {
        this.onloadPage();
    },
    control: {
        '#btnLuuSpace': {
            click: 'onLuu'
        },
        // '#btnThemDonViTrucThuoc': {
        //     click: 'onThemTrucThuoc'
        // }
    },
    onloadPage: function(){
        var viewModel = this.getViewModel();
        var ListKhoSpaceStore = viewModel.getStore('ListKhoSpaceStore');
        ListKhoSpaceStore.loadOrgByTypeKho();
    },
    emptyForm: function(){
        var viewModel = this.getViewModel();
        viewModel.set('spaceObj', null);
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
        var spaceObj = viewModel.get('spaceObj'); console.log(spaceObj);
        if(
            spaceObj.orgid_link == null || spaceObj.orgid_link == '' || 
            spaceObj.spaceepc == null || spaceObj.spaceepc == '' || 
            spaceObj.spacename == null || spaceObj.spacename == '' || 
            spaceObj.floorid == null || spaceObj.floorid == ''
            ){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Cần phải điền đầy đủ thông tin',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            if(spaceObj.floorid == null || spaceObj.floorid) me.down('#txtFieldFloorId').focus();
            if(spaceObj.spacename == null || spaceObj.spacename) me.down('#txtFieldSpaceName').focus();
            if(spaceObj.spaceepc == null || spaceObj.spaceepc) me.down('#txtFieldSpaceEpc').focus();
            return;
        }

        var params = new Object();
        params.orgid_link = spaceObj.orgid_link;
        params.spaceepc = spaceObj.spaceepc;
        params.spacename = spaceObj.spacename;
        params.floorid = spaceObj.floorid;
        params.rowid_link = spaceObj.rowid_link;
        params.isCreateNew = spaceObj.isCreateNew;

        me.setLoading("Đang lưu dữ liệu");
        GSmartApp.Ajax.postJitin('/api/v1/stock/create_floor', Ext.JSON.encode(params),
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
                        var stockspace = response.stockspace;
                        var isSpaceNew = response.isSpaceNew;
                        var isFloorNew = response.isFloorNew;

                        // nếu tree chưa có hàng (space), thêm vào children của dãy(row)
                        if(isSpaceNew){
                            var nodeRow = StockTreeStore.findNode('idString', '3;' + stockspace.rowid_link);
                            var stockSpaceObj = new Object();
                            stockSpaceObj.children = [];
                            stockSpaceObj.expandable = true;
                            stockSpaceObj.expanded = true;
                            stockSpaceObj.id = null;
                            stockSpaceObj.idString = '4;' + stockspace.rowid_link + ';' + stockspace.spacename;
                            stockSpaceObj.leaf = false;
                            stockSpaceObj.name = stockspace.spacename;
                            stockSpaceObj.spacename = stockspace.spacename;
                            stockSpaceObj.orgid_link = stockspace.orgid_link;
                            stockSpaceObj.rowid_link = stockspace.rowid_link;
                            stockSpaceObj.parentId = stockspace.rowid_link;
                            stockSpaceObj.parentIdString = '3;' + stockspace.rowid_link;
                            stockSpaceObj.type = 4;
                            stockSpaceObj.visible = true;

                            var stockfloorObj = new Object();
                            stockfloorObj.children = [];
                            stockfloorObj.expandable = false;
                            stockfloorObj.expanded = false;
                            stockfloorObj.id = null;
                            stockfloorObj.idString = '5;' + stockspace.spaceepc;
                            stockfloorObj.leaf = true;
                            stockfloorObj.name = stockspace.floorid;
                            stockfloorObj.floorid = stockspace.floorid;
                            stockfloorObj.orgid_link = stockspace.orgid_link;
                            stockfloorObj.rowid_link = stockspace.rowid_link;
                            stockfloorObj.parentId = null;
                            stockfloorObj.parentIdString = '4;' + stockspace.rowid_link + ';' + stockspace.spacename;
                            stockfloorObj.spaceepc = stockspace.spaceepc;
                            stockfloorObj.spacename = stockspace.spacename;
                            stockfloorObj.type = 5;
                            stockfloorObj.visible = true;

                            stockSpaceObj.children.push(stockfloorObj);

                            nodeRow.appendChild(stockSpaceObj);
                        }

                        // nếu tree chưa có tầng (floor), thêm vào children của hàng(space)
                        if(isFloorNew && !isSpaceNew){
                            var nodeSpace = StockTreeStore.findNode('idString', '4;' + stockspace.rowid_link + ';' + stockspace.spacename);
                            var stockfloorObj = new Object();
                            stockfloorObj.children = [];
                            stockfloorObj.expandable = false;
                            stockfloorObj.expanded = false;
                            stockfloorObj.id = null;
                            stockfloorObj.idString = '5;' + stockspace.spaceepc;
                            stockfloorObj.leaf = true;
                            stockfloorObj.floorid = stockspace.floorid;
                            stockfloorObj.name = stockspace.floorid;
                            stockfloorObj.orgid_link = stockspace.orgid_link;
                            stockfloorObj.rowid_link = stockspace.rowid_link;
                            stockfloorObj.parentId = null;
                            stockfloorObj.parentIdString = '4;' + stockspace.rowid_link + ';' + stockspace.spacename;
                            stockfloorObj.spaceepc = stockspace.spaceepc;
                            stockfloorObj.spacename = stockspace.spacename;
                            stockfloorObj.type = 5;
                            stockfloorObj.visible = true;
                            nodeSpace.appendChild(stockfloorObj);
                        }

                        // nếu tree đã có tầng (edit)
                        // if(!isFloorNew){
                        //     var node = StockTreeStore.findNode('idString', '3;' + stockrow.id);
                        //     node.data.name = stockrow.code;
                        // }

                        treePanel.reconfigure(StockTreeStore);
                        viewModel.set('spaceObj', new Object());
                        console.log(stockspace);
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