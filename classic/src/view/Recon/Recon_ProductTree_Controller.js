Ext.define('GSmartApp.view.Recon.Recon_ProductTree_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Recon_ProductTree_Controller',
    init: function () {
    },
    control: {

    },
    onStyleCodeFilterKeyup: function () {
        var viewmodel = this.getViewModel();
        var filterField = this.lookupReference('styleCodeFilter');
        store = viewmodel.getStore('ReconProductTree_Store'),
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
    onCalRecon_ManyProduct: function () {
        var me = this.getView();
        var select = me.getSelectionModel().getSelection();
        var viewmodel = this.getViewModel();
        var SKUReconStore = viewmodel.getStore('SKUReconStore');

        var params = new Object();
        params.pcontractid_link = viewmodel.get('pcontractid_link');
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

        me.setLoading("Đang tính quyết toán");

        GSmartApp.Ajax.post('/api/v1/recon/cal_recon_bycontract', Ext.JSON.encode(params),
        function (success, response, options) {
            me.setLoading(false);
            if (success) {
                var response = Ext.decode(response.responseText);
                if (response.respcode == 200) {
                    SKUReconStore.setData(response.data);
                }
            }
        })
    }
})