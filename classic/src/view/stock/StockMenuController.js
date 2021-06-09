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
        // '#btnReload': {
        //     click: 'onloadPage'
        // },
        '#btnSearch': {
            click: 'onloadPage'
        },
        '#txtMaHang': {
            specialkey: 'onSpecialkey'
        },
        '#txtDonHang': {
            specialkey: 'onSpecialkey'
        },
    },
    listen: {
        store: {
            'StockTreeStore': {
                'loadStore_Done': 'onloadStore_Done'
            }
        }
    },
    onloadStore_Done: function () {
        this.getView().setLoading(false);
    },
    resetObj: function(){
        var viewModel = this.getViewModel();
        viewModel.set('spaceObj', new Object());
        viewModel.set('rowObj', new Object());
    },
    onloadDetail: function( grid, record, item, index, e, eOpts){
        console.log(record);
        var viewModel = this.getViewModel();
        if(record.get('type') == 5){ // tầng
            var spaceepc = record.get('spaceepc');
            var stockid_link = record.get('orgid_link');
            var WarehouseStore = viewModel.getStore('WarehouseStore');
            WarehouseStore.loadBySpaceEpc(spaceepc, stockid_link);
        }
        if(record.get('type') == 3 && record.get('khoangKhongXacDinh') == true){ // khoang KXD
            var spaceepc = null;
            var stockid_link = record.get('orgid_link');
            var WarehouseStore = viewModel.getStore('WarehouseStore');
            WarehouseStore.loadBySpaceEpc(spaceepc, stockid_link);
        }
    },
    onloadPage: function () {
        var me = this.getView();
        var viewModel = this.getViewModel();
        //
        var searchObj = viewModel.get('searchObj');
        var maHang = searchObj.maHang == null ? null : searchObj.maHang.trim();
        var donHang = searchObj.donHang == null ? null : searchObj.donHang.trim();
        //
        me.setLoading("Đang tải dữ liệu");
        var StockTreeStore = viewModel.getStore('StockTreeStore');
        StockTreeStore.loadStore(maHang, donHang);
        StockTreeStore.getSorters().add({
            property: 'khoangKhongXacDinh',
            direction: 'ASC'
        },{
            property: 'name',
            direction: 'ASC'
        });
    },
    onSpecialkey: function (field, e) {
        var me = this;
        if (e.getKey() == e.ENTER) {
            me.onloadPage();
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
                            m.themDay(record, false);
                        }
                    }
                ]
                });
            var position = e.getXY();
            e.stopEvent();
            menu_grid.showAt(position);
        }
        if(record.get('type') == 3){ // dãy
            // khoang không xác định -> return
            if(record.get('khoangKhongXacDinh') == true){
                return;
            }
            var menu_grid = new Ext.menu.Menu({ items:
                [
                    {
                        text: 'Thêm hàng',
                        itemId: 'btn_themHang',
                        separator: true,
                        // margin: '5 0 0',
                        iconCls: 'x-fa fas fa-minus-square-o',
                        handler: function(){
                            console.log(record);
                            m.themHang(record, false);
                        }
                    },
                    {
                        text: 'Sửa dãy',
                        itemId: 'btn_suaDay',
                        separator: true,
                        // margin: '5 0 0',
                        iconCls: 'x-fa fas fa-edit',
                        handler: function(){
                            console.log(record);
                            m.themDay(record, true);
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
                            m.themTang(record, false);
                        }
                    },
                    {
                        text: 'Sửa hàng',
                        itemId: 'btn_suaHang',
                        separator: true,
                        // margin: '5 0 0',
                        iconCls: 'x-fa fas fa-minus-square-o',
                        handler: function(){
                            console.log(record);
                            //
                            m.suaHang(record, true);
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
                        text: 'Sửa tầng',
                        itemId: 'btn_SuaTang',
                        separator: true,
                        // margin: '5 0 0',
                        iconCls: 'x-fa fas fa-trash',
                        handler: function(){
                            console.log(record);
                            //
                            m.themTang(record, true);
                        }
                    },
                    {
                        text: 'Xoá tầng',
                        itemId: 'btn_XoaTang',
                        separator: true,
                        // margin: '5 0 0',
                        iconCls: 'x-fa fas fa-trash',
                        handler: function(){
                            console.log(record);
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

    themDay: function(record, isEdit){
        var me = this.getView();
        var viewModel = this.getViewModel();
        var form = Ext.create('Ext.window.Window', {
            // height: 300,
            // width: 400,
            closable: true,
            title: 'Chi tiết dãy : ',
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'StockRow',
                viewModel: {
                    type: 'StockViewModel',
                    data: {
                        record: record,
                        isEdit: isEdit
                    }
                }
            }]
        });
        form.show();

        form.down('#StockRow').getController().on('Thoat', function () {
            form.close();
        })

        form.down('#StockRow').getController().on('Luu', function (response) {
            var treePanel = Ext.getCmp('stock').down('StockMenu');
            var StockTreeStore = viewModel.getStore('StockTreeStore');
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
            //
            form.close();
        })
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

    suaHang: function(record, isEdit){
        var me = this.getView();
        var viewModel = this.getViewModel();
        var form = Ext.create('Ext.window.Window', {
            // height: 300,
            // width: 400,
            closable: true,
            title: 'Chi tiết hàng : ',
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'StockSpace',
                viewModel: {
                    type: 'StockViewModel',
                    data: {
                        record: record,
                        isEdit: isEdit
                    }
                }
            }]
        });
        form.show();

        form.down('#StockSpace').getController().on('Thoat', function () {
            form.close();
        })

        form.down('#StockSpace').getController().on('Luu', function (response, spaceObj) {
            var treePanel = Ext.getCmp('stock').down('StockMenu');
            var StockTreeStore = viewModel.getStore('StockTreeStore');
            var stockspace = response.stockspace;
            var isSpaceNew = response.isSpaceNew;

            // check ton tai
            if(!isSpaceNew){
                var node = StockTreeStore.findNode('idString', '4;' + spaceObj.rowid_link + ';' + spaceObj.spacename_old);
                node.data.name = stockspace.spacename;
                node.data.spacename = stockspace.spacename;
                node.data.idString = '4;' + stockspace.rowid_link + ';' + stockspace.spacename;

                var children = node.data.children;
                for (var i = 0; i < children.length; i++){
                    children[i].parentIdString = '4;' + stockspace.rowid_link + ';' + stockspace.spacename;
                    children[i].spacename = stockspace.spacename;
                }
            }

            treePanel.reconfigure(StockTreeStore);
            //
            form.close();
        })
    },
    themHang: function(record, isEdit){
        var me = this.getView();
        var viewModel = this.getViewModel();
        var form = Ext.create('Ext.window.Window', {
            // height: 300,
            // width: 400,
            closable: true,
            title: 'Chi tiết hàng : ',
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'StockFloor',
                viewModel: {
                    type: 'StockViewModel',
                    data: {
                        record: record,
                        isEdit: isEdit
                    }
                }
            }]
        });
        form.show();

        form.down('#StockFloor').getController().on('Thoat', function () {
            form.close();
        })

        form.down('#StockFloor').getController().on('Luu', function (response) {
            var treePanel = Ext.getCmp('stock').down('StockMenu');
            var StockTreeStore = viewModel.getStore('StockTreeStore');
            StockTreeStore.load();
            //
            form.close();
            // console.log(response);
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

    themTang: function(record, isEdit){
        var me = this.getView();
        var viewModel = this.getViewModel();
        var form = Ext.create('Ext.window.Window', {
            // height: 300,
            // width: 400,
            closable: true,
            title: 'Chi tiết tầng : ',
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'StockFloor',
                viewModel: {
                    type: 'StockViewModel',
                    data: {
                        record: record,
                        isEdit: isEdit
                    }
                }
            }]
        });
        form.show();

        form.down('#StockFloor').getController().on('Thoat', function () {
            form.close();
        })

        form.down('#StockFloor').getController().on('Luu', function (response, spaceObj) {
            var treePanel = Ext.getCmp('stock').down('StockMenu');
            var StockTreeStore = viewModel.getStore('StockTreeStore');

            var stockspace = response.stockspace;
            var isSpaceNew = response.isSpaceNew;
            var isFloorNew = response.isFloorNew;

            if(isFloorNew){
                var nodeSpace = StockTreeStore.findNode('idString', '4;' + stockspace.rowid_link + ';' + stockspace.spacename);
                var stockfloorObj = new Object();
                stockfloorObj.children = [];
                stockfloorObj.expandable = false;
                stockfloorObj.expanded = false;
                // stockfloorObj.id = null;
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
            }else
            // nếu tree đã có tầng (edit)
            if(!isFloorNew){
                var node = StockTreeStore.findNode('idString', '5;' + spaceObj.spaceepc_old);
                node.data.name = stockspace.floorid;
                node.data.floorid = stockspace.floorid;
                node.data.idString = '5;' + stockspace.spaceepc;
                node.data.spaceepc = stockspace.spaceepc;
                node.data.spacename = stockspace.spacename;
            }

            treePanel.reconfigure(StockTreeStore);
            //
            form.close();
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
    },


    // filter cho danh sach npl (theo 2 txt field maHang va donHang)
    onNPLFilterKeyup: function (){
        // var viewModel = this.getViewModel();
        // var WarehouseStore = viewModel.getStore('WarehouseStore');
        // var filters = grid.store.getFilters();

        // var maHang = viewModel.get('searchObj.maHang');
        // var maHang = viewModel.get('searchObj.maHang');
        // var filterField = this.getView().down('#invoiceFilter');
            
        
        // var value = filterField.getValue() == null ? '' : filterField.getValue().toLowerCase();
        // store.clearFilter();
        // store.filterBy(function(rec) { //toLowerCase() // includes()
        //     if(
        //         rec.get('invoice_number').toLowerCase().includes(value) ||
        //         rec.get('orgfrom_name').toLowerCase().includes(value) ||
        //         rec.get('stockintype_name').toLowerCase().includes(value) ||
        //         rec.get('stockinProductString').toLowerCase().includes(value) || 
        //         Ext.Date.format(rec.get('invoice_date'),'d/m/y').toLowerCase().includes(value)
                
        //     ){
        //         return true;
        //     }
        //     return false;
        // });
    },
})