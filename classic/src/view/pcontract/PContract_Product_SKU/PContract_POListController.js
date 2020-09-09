Ext.define('GSmartApp.view.pcontract.PContract_POListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_POListController',
    onPOBuyerFilterKeyup:function(){
        var grid = this.getView(),
            filterField = this.lookupReference('POBuyerFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.POBuyerFilter = filters.add({
                id: 'POBuyerFilter',
                property: 'po_buyer',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.POBuyerFilter) {
            filters.remove(this.POBuyerFilter);
            this.POBuyerFilter = null;
        }
    },
    onThemPO: function(){

    },
    onEdit: function(grid, rowIndex, colIndex, item, e, rec){
        var viewModel = this.getViewModel();
    
            var form = Ext.create('Ext.window.Window', {
                closable: true,
                resizable: false,
                modal: true,
                border: false,
                title: 'Thông tin PO',
                closeAction: 'destroy',
                height: 350,
                width: 800,
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    xtype: 'PContract_PO_Edit_Info_Main',
                    viewModel: {
                        data: {
                            id: rec.data.id,
                            isedit: true
                        }
                    }
                }]
            });
            form.show();        
    
            form.down('#PContract_PO_Edit_Info_Main').getController().on('Thoat', function(){
                var storePO = viewModel.getStore('PContractPOList');
                storePO.load();
                form.close();
            })
    }
})