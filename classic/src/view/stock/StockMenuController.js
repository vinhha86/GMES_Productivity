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
    onloadDetail: function( grid, record, item, index, e, eOpts){
        var viewModel = this.getViewModel();
        // console.log(record.data);
        if(record.get('type') == 5){ // tầng
            viewModel.set('spaceObj.orgid_link', record.get('orgid_link'));
            viewModel.set('spaceObj.spaceepc', record.get('spaceepc'));
            viewModel.set('spaceObj.spacename', record.get('spacename'));
            viewModel.set('spaceObj.floorid', record.get('floorid'));
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
        var me = this;
        var viewModel = this.getViewModel();
        //Phan xuong
        if(record.get('type') == 2){
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
                            viewModel.set('rowObj.orgid_link', record.get('id'));
                            viewModel.set('spaceObj', null);
                            viewModel.set('isRowViewHidden', false);
                            viewModel.set('isSpaceViewHidden', true);
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