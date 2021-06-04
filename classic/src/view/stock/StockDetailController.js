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
    onLuu: function () {
        var m = this;
        var me = this.getView();
        var treePanel = Ext.getCmp('stock').down('StockMenu');

        var viewModel = this.getViewModel();
        var spaceObj = viewModel.get('spaceObj'); // console.log(spaceObj);
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
        params.spaceepc_old = spaceObj.spaceepc_old;
        params.spacename_old = spaceObj.spacename_old;
        params.floorid_old = spaceObj.floorid_old;
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
                        StockTreeStore.load();
                        // var items = StockTreeStore.data.items; // items trong tree
                        // var stockspace = response.stockspace;
                        // var isSpaceNew = response.isSpaceNew;
                        // var isFloorNew = response.isFloorNew;

                        // // nếu tree chưa có hàng (space), thêm vào children của dãy(row)
                        // if(isSpaceNew){
                        //     var nodeRow = StockTreeStore.findNode('idString', '3;' + stockspace.rowid_link);
                        //     var stockSpaceObj = new Object();
                        //     stockSpaceObj.children = [];
                        //     stockSpaceObj.expandable = true;
                        //     stockSpaceObj.expanded = true;
                        //     // stockSpaceObj.id = null;
                        //     stockSpaceObj.idString = '4;' + stockspace.rowid_link + ';' + stockspace.spacename;
                        //     stockSpaceObj.leaf = false;
                        //     stockSpaceObj.name = stockspace.spacename;
                        //     stockSpaceObj.spacename = stockspace.spacename;
                        //     stockSpaceObj.orgid_link = stockspace.orgid_link;
                        //     stockSpaceObj.rowid_link = stockspace.rowid_link;
                        //     stockSpaceObj.parentId = stockspace.rowid_link;
                        //     stockSpaceObj.parentIdString = '3;' + stockspace.rowid_link;
                        //     stockSpaceObj.type = 4;
                        //     stockSpaceObj.visible = true;

                        //     var stockfloorObj = new Object();
                        //     stockfloorObj.children = [];
                        //     stockfloorObj.expandable = false;
                        //     stockfloorObj.expanded = false;
                        //     // stockfloorObj.id = null;
                        //     stockfloorObj.idString = '5;' + stockspace.spaceepc;
                        //     stockfloorObj.leaf = true;
                        //     stockfloorObj.name = stockspace.floorid;
                        //     stockfloorObj.floorid = stockspace.floorid;
                        //     stockfloorObj.orgid_link = stockspace.orgid_link;
                        //     stockfloorObj.rowid_link = stockspace.rowid_link;
                        //     stockfloorObj.parentId = null;
                        //     stockfloorObj.parentIdString = '4;' + stockspace.rowid_link + ';' + stockspace.spacename;
                        //     stockfloorObj.spaceepc = stockspace.spaceepc;
                        //     stockfloorObj.spacename = stockspace.spacename;
                        //     stockfloorObj.type = 5;
                        //     stockfloorObj.visible = true;

                        //     stockSpaceObj.children.push(stockfloorObj);
                        //     nodeRow.appendChild(stockSpaceObj);
                        //     treePanel.reconfigure(StockTreeStore);
                        // }else
                        // // nếu tree chưa có tầng (floor), thêm vào children của hàng(space)
                        // if(isFloorNew && !isSpaceNew){
                        //     var nodeSpace = StockTreeStore.findNode('idString', '4;' + stockspace.rowid_link + ';' + stockspace.spacename);
                        //     var stockfloorObj = new Object();
                        //     stockfloorObj.children = [];
                        //     stockfloorObj.expandable = false;
                        //     stockfloorObj.expanded = false;
                        //     // stockfloorObj.id = null;
                        //     stockfloorObj.idString = '5;' + stockspace.spaceepc;
                        //     stockfloorObj.leaf = true;
                        //     stockfloorObj.floorid = stockspace.floorid;
                        //     stockfloorObj.name = stockspace.floorid;
                        //     stockfloorObj.orgid_link = stockspace.orgid_link;
                        //     stockfloorObj.rowid_link = stockspace.rowid_link;
                        //     stockfloorObj.parentId = null;
                        //     stockfloorObj.parentIdString = '4;' + stockspace.rowid_link + ';' + stockspace.spacename;
                        //     stockfloorObj.spaceepc = stockspace.spaceepc;
                        //     stockfloorObj.spacename = stockspace.spacename;
                        //     stockfloorObj.type = 5;
                        //     stockfloorObj.visible = true;
                        //     nodeSpace.appendChild(stockfloorObj);
                        //     treePanel.reconfigure(StockTreeStore);
                        // }else
                        // // nếu tree đã có tầng (edit)
                        // if(!isFloorNew){
                        //     // var node = StockTreeStore.findNode('idString', '3;' + stockrow.id);
                        //     // node.data.name = stockrow.code;
                        // }

                        viewModel.set('spaceObj', new Object());
                        // console.log(stockspace);
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