Ext.define('GSmartApp.view.pcontract.PContractListPOViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractListPOViewController',
    isActivate: false,
    control: {
        'PContractListPOView': {
            itemdblclick: 'onPOSelect'
        },
        '#btnEditAllLine': {
            click: 'onEditLine'
        },
        '#btnThuGon': {
			click: 'onhiddenMaster'
		},
		'#btnMoRong': {
			click: 'onhiddenMaster'
		},
    },
    onhiddenMaster: function () {
		var viewModel = this.getViewModel();
		var formMaster = Ext.getCmp('PContractMainView');
		var isHidden = formMaster.getHeight() > 0 ? false : true;
		viewModel.set('IsformMaster', !isHidden);

		formMaster.setHidden(!isHidden);
	},
    onPOSelect: function (grid, record, item, index, e, eOpts) {
        if (null != record) {
            var pcontractid_link = record.get('pcontractid_link');
            var poid_link = record.get('id');
            var productid_link = record.get('productid_link');

            this.redirectTo('lspcontract/' + pcontractid_link + "/edit_" + poid_link + "_" + productid_link);
        }
    },
    onEditLine: function () {
        var viewmodel = this.getViewModel();
        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Danh sách Line giao hàng',
            closeAction: 'destroy',
            height: 400,
            width: 700,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'All_line_Edit_View',
                viewModel: {
                    data: {
                        pcontractid_link: viewmodel.get('pcontractid_link')
                    }
                }
            }]
        });
        form.show();

        form.down('#All_line_Edit_View').getController().on('Reload', function () {
            var storePO = viewmodel.getStore('PContractPOList');
            storePO.reload();
            // form.close();
        })
    },
    onBuyerCodeFilterKeyup: function () {
        var viewmodel = this.getViewModel();
        var POStore = viewmodel.get('PContractPOList');
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('BuyerCodeFilterField'),
            filters = POStore.getFilters();

        if (filterField.value) {
            this.buyercodeFilter = filters.add({
                id: 'buyercodeFilter',
                property: 'productbuyercode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.buyercodeFilter) {
            filters.remove(this.buyercodeFilter);
            this.buyercodeFilter = null;
        }
    },
})