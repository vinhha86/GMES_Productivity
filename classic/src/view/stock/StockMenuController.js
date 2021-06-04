Ext.define('GSmartApp.view.stock.StockMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StockMenuController',
    init: function () {
        this.onloadPage();
    },
    control: {
        '#StockMenu': {
            itemclick: 'onloadDetail'
        },
        '#btnReload': {
            click: 'loadMenu'
        },
        '#phanxuong_orgid_link_cbbox': {
            select: 'loadMenu'
        },
    },
    resetObj: function(){
        var viewModel = this.getViewModel();
        viewModel.set('spaceObj', new Object());
        viewModel.set('rowObj', new Object());
    },
    onloadDetail: function( grid, record, item, index, e, eOpts){
        var m = this;
        var viewModel = this.getViewModel();
        // console.log(record.data);
        if(record.get('type') == 3){ // dãy
            //
            m.resetObj();
            viewModel.set('isRowViewHidden', false);
            viewModel.set('isSpaceViewHidden', true);
            //
            viewModel.set('rowObj.orgid_link', record.get('orgid_link'));
            viewModel.set('rowObj.code', record.get('name'));
            viewModel.set('rowObj.id', record.get('id'));
        }else
        if(record.get('type') == 5){ // tầng
            //
            m.resetObj();
            viewModel.set('isRowViewHidden', true);
            viewModel.set('isSpaceViewHidden', false);
            viewModel.set('isBtnLuuFloorDisabled', true);
            //
            viewModel.set('spaceObj.orgid_link', record.get('orgid_link'));
            viewModel.set('spaceObj.spaceepc', record.get('spaceepc'));
            viewModel.set('spaceObj.spaceepc_old', record.get('spaceepc'));
            viewModel.set('spaceObj.spacename', record.get('spacename'));
            viewModel.set('spaceObj.floorid', record.get('floorid'));
            viewModel.set('spaceObj.isCreateNew', false);
        }else{
            m.resetObj();
        }
        console.log(record);
    },
    onloadPage: function () {
        var me = this.getView();
        var viewModel = this.getViewModel();
        var ListPhanXuongStore = viewModel.getStore('ListPhanXuongStore');
        ListPhanXuongStore.loadStore(13);
        // var StockTreeStore = viewModel.getStore('StockTreeStore');
        // StockTreeStore.loadStore();
        // StockTreeStore.getSorters().add('name');
    },
    loadMenu: function(){
        var me = this.getView();
        var viewModel = this.getViewModel();
        var phanxuong_orgid_link = viewModel.get('phanxuong_orgid_link');
        if(phanxuong_orgid_link != null){
            var StockTreeStore = viewModel.getStore('StockTreeStore');
            StockTreeStore.loadStore(phanxuong_orgid_link);
            StockTreeStore.getSorters().add('name');
        }
    },
    onContextMenu: function(tree, record, item, index, e, eOpts ) {
        var m = this;
        var viewModel = this.getViewModel();
        //Phan xuong
        if(record.get('type') == 2){ // kho
            var menu_grid = new Ext.menu.Menu({ items:
                [
                    {
                        text: 'Thêm Dãy',
                        itemId: 'btn_themDay',
                        separator: true,
                        // margin: '5 0 0',
                        iconCls: 'x-fa fas fa-bars',
                        handler: function(){
                            console.log(record);
                            //
                            m.resetObj();
                            viewModel.set('isRowViewHidden', false);
                            viewModel.set('isSpaceViewHidden', true);
                            //
                            viewModel.set('rowObj.orgid_link', record.get('id'));
                        }
                    }
                ]
                });
            var position = e.getXY();
            e.stopEvent();
            menu_grid.showAt(position);
        }
        if(record.get('type') == 3){ // dãy
            var menu_grid = new Ext.menu.Menu({ items:
                [
                    {
                        text: 'Thêm Hàng/Tầng',
                        itemId: 'btn_themHangTang',
                        separator: true,
                        // margin: '5 0 0',
                        iconCls: 'x-fa fas fa-minus-square-o',
                        handler: function(){
                            console.log(record);
                            //
                            m.resetObj();
                            viewModel.set('isRowViewHidden', true);
                            viewModel.set('isSpaceViewHidden', false);
                            //
                            viewModel.set('spaceObj.orgid_link', record.get('orgid_link'));
                            viewModel.set('spaceObj.rowid_link', record.get('id'));
                            viewModel.set('spaceObj.isCreateNew', true);
                        }
                    },
                    {
                        text: 'Xoá dãy',
                        itemId: 'btn_XoaDay',
                        separator: true,
                        // margin: '5 0 0',
                        iconCls: 'x-fa fas fa-trash',
                        handler: function(){
                            console.log(record);
                            //
                            m.resetObj();
                            viewModel.set('isRowViewHidden', true);
                            viewModel.set('isSpaceViewHidden', true);
                            //
                            Ext.Msg.show({
                                title:'Thông báo',
                                message:'Bạn có chắc chắn xoá dãy?',
                                buttons: Ext.Msg.YESNO,
                                icon: Ext.Msg.QUESTION,
                                fn: function(btn) {
                                    if (btn === 'yes') {
                                        m.xoaDay(record);
                                    }
                                }
                            });
                        }
                    }
                ]
                });
            var position = e.getXY();
            e.stopEvent();
            menu_grid.showAt(position);
        }
        if(record.get('type') == 4){ // hàng
            var menu_grid = new Ext.menu.Menu({ items:
                [
                    {
                        text: 'Thêm Tầng',
                        itemId: 'btn_themTang',
                        separator: true,
                        // margin: '5 0 0',
                        iconCls: 'x-fa fas fa-minus-square-o',
                        handler: function(){
                            console.log(record);
                            //
                            m.resetObj();
                            viewModel.set('isRowViewHidden', true);
                            viewModel.set('isSpaceViewHidden', false);
                            viewModel.set('isBtnLuuFloorDisabled', false);
                            //
                            viewModel.set('spaceObj.orgid_link', record.get('orgid_link'));
                            viewModel.set('spaceObj.rowid_link', record.get('rowid_link'));
                            viewModel.set('spaceObj.spacename', record.get('spacename'));
                            viewModel.set('spaceObj.isCreateNew', true);
                        }
                    },
                    {
                        text: 'Xoá hàng',
                        itemId: 'btn_XoaHang',
                        separator: true,
                        // margin: '5 0 0',
                        iconCls: 'x-fa fas fa-trash',
                        handler: function(){
                            console.log(record);
                            //
                            m.resetObj();
                            viewModel.set('isRowViewHidden', true);
                            viewModel.set('isSpaceViewHidden', true);
                            //
                            Ext.Msg.show({
                                title:'Thông báo',
                                message:'Bạn có chắc chắn xoá hàng?',
                                buttons: Ext.Msg.YESNO,
                                icon: Ext.Msg.QUESTION,
                                fn: function(btn) {
                                    if (btn === 'yes') {
                                        m.xoaHang(record);
                                    }
                                }
                            });
                        }
                    }
                ]
                });
            var position = e.getXY();
            e.stopEvent();
            menu_grid.showAt(position);
        }

        if(record.get('type') == 5){ // hàng
            var menu_grid = new Ext.menu.Menu({ items:
                [
                    {
                        text: 'Xoá tầng',
                        itemId: 'btn_XoaTang',
                        separator: true,
                        // margin: '5 0 0',
                        iconCls: 'x-fa fas fa-trash',
                        handler: function(){
                            console.log(record);
                            //
                            m.resetObj();
                            viewModel.set('isRowViewHidden', true);
                            viewModel.set('isSpaceViewHidden', true);
                            //
                            Ext.Msg.show({
                                title:'Thông báo',
                                message:'Bạn có chắc chắn xoá tầng?',
                                buttons: Ext.Msg.YESNO,
                                icon: Ext.Msg.QUESTION,
                                fn: function(btn) {
                                    if (btn === 'yes') {
                                        m.xoaTang(record);
                                    }
                                }
                            });
                        }
                    }
                ]
                });
            var position = e.getXY();
            e.stopEvent();
            menu_grid.showAt(position);
        }
    },

    xoaDay: function(record){
        var m = this;
        var me = this.getView();
        var treePanel = Ext.getCmp('stock').down('StockMenu');

        var viewModel = this.getViewModel();
        
        var params = new Object();
        params.id = record.get('id');

        me.setLoading("Đang lưu dữ liệu");
        GSmartApp.Ajax.postJitin('/api/v1/stock/delete_row', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);
                var response = Ext.decode(response.responseText);
                if (success) {
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Xoá thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        
                        var StockTreeStore = viewModel.getStore('StockTreeStore');
                        var items = StockTreeStore.data.items; // items trong tree
                        var nodeKho = StockTreeStore.findNode('idString', record.get('parentIdString'));
                        nodeKho.removeChild(record);
                        treePanel.reconfigure(StockTreeStore);
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Xoá thất bại',
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Xoá thất bại',
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    },
    xoaHang: function(record){
        var m = this;
        var me = this.getView();
        var treePanel = Ext.getCmp('stock').down('StockMenu');

        var viewModel = this.getViewModel();
        
        var params = new Object();
        params.rowid_link = record.get('rowid_link');
        params.spacename = record.get('spacename');

        me.setLoading("Đang lưu dữ liệu");
        GSmartApp.Ajax.postJitin('/api/v1/stock/delete_space', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);
                var response = Ext.decode(response.responseText);
                if (success) {
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Xoá thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        
                        var StockTreeStore = viewModel.getStore('StockTreeStore');
                        var items = StockTreeStore.data.items; // items trong tree
                        var nodeDay = StockTreeStore.findNode('idString', record.get('parentIdString'));
                        nodeDay.removeChild(record);
                        treePanel.reconfigure(StockTreeStore);
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Xoá thất bại',
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Xoá thất bại',
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    },
    xoaTang: function(record){
        var m = this;
        var me = this.getView();
        var treePanel = Ext.getCmp('stock').down('StockMenu');

        var viewModel = this.getViewModel();
        
        var params = new Object();
        params.spaceepc = record.get('spaceepc');
        params.spacename = record.get('spacename');
        params.floorid = record.get('floorid');
        params.rowid_link = record.get('rowid_link');
        params.orgid_link = record.get('orgid_link');

        me.setLoading("Đang lưu dữ liệu");
        GSmartApp.Ajax.postJitin('/api/v1/stock/delete_floor', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);
                var response = Ext.decode(response.responseText);
                if (success) {
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Xoá thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        var isSpaceDelete = response.isSpaceDelete;
                        
                        var StockTreeStore = viewModel.getStore('StockTreeStore');
                        var nodeHang = StockTreeStore.findNode('idString', record.get('parentIdString'));
                        nodeHang.removeChild(record);

                        if(isSpaceDelete){ // console.log(nodeHang);
                            var nodeDay = StockTreeStore.findNode('idString', nodeHang.get('parentIdString'));
                            nodeDay.removeChild(nodeHang);
                        }

                        treePanel.reconfigure(StockTreeStore);
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Xoá thất bại',
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Xoá thất bại',
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    }
})