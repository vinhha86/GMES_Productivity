Ext.define('GSmartApp.view.balance.PContractProductTreeViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractProductTreeViewController',
    init: function () {
    },
    control: {

    },
    onStyleCodeFilterKeyup: function () {
        var viewmodel = this.getViewModel();
        var filterField = this.lookupReference('styleCodeFilter');
        store = viewmodel.getStore('PContractProductTreeStoreBalance'),
            filters = store.getFilters();

        store.filterer = 'bottomup';
        store.getRoot().expandChildren(true);

        if (filterField.value) {
            this.codeFilter = filters.add({
                id: 'codeFilter',
                property: 'code',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.codeFilter) {
            filters.remove(this.codeFilter);
            this.codeFilter = null;
        }
    },
    onCalBalance_ManyProduct: function () {
        var me = this.getView();
        var select = me.getSelectionModel().getSelection();
        var viewmodel = this.getViewModel();
        var SKUBalanceStore = viewmodel.getStore('SKUBalanceStore');

        var params = new Object();
        params.pcontractid_link = viewmodel.get('PContract.id');
        params.pcontract_poid_link = null;

        var list_id_product = '';
        if (select[0].get('children').length > 0) {
            for (var i = 0; i < select[0].get('children').length; i++) {
                var data = select[0].get('children')[i];
                if (i == 0) {
                    list_id_product = data.productid_link;
                }
                else {
                    list_id_product += ";" + data.productid_link;
                }
            }
        }
        else {
            list_id_product = select[0].get('productid_link');
        }
        params.list_productid = list_id_product;

        me.setLoading("Đang tính cân đối");
        if (null != params.pcontract_poid_link && 0 != params.pcontract_poid_link) {
            GSmartApp.Ajax.post('/api/v1/balance/cal_balance_bypo', Ext.JSON.encode(params),
                function (success, response, options) {
                    me.setLoading(false);
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            SKUBalanceStore.setData(response.data);
                        }
                    }
                })
        } else {
            GSmartApp.Ajax.post('/api/v1/balance/cal_balance_bycontract', Ext.JSON.encode(params),
                function (success, response, options) {
                    me.setLoading(false);
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            SKUBalanceStore.setData(response.data);
                        }
                    }
                })
        }
    }
})