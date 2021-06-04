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
            click: 'onloadPage'
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
        var StockTreeStore = viewModel.getStore('StockTreeStore');
        StockTreeStore.loadStore();
        StockTreeStore.getSorters().add('name');
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
                            //
                            viewModel.set('spaceObj.orgid_link', record.get('orgid_link'));
                            viewModel.set('spaceObj.rowid_link', record.get('rowid_link'));
                            viewModel.set('spaceObj.spacename', record.get('spacename'));
                            viewModel.set('spaceObj.isCreateNew', true);
                        }
                    }
                ]
                });
            var position = e.getXY();
            e.stopEvent();
            menu_grid.showAt(position);
        }
    },
})