Ext.define('GSmartApp.view.Recon.Recon_Main_Pcontract_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Recon_Main_Pcontract_Controller',
    init: function () {
        var viewmodel = this.getViewModel();
        // var storeproduct = viewmodel.getStore('ReconProductTree_Store');
        // storeproduct.loadStore(viewmodel.get('pcontractid_link'), null);
    },
    control: {
        '#btnRecon_Calculate': {
            click: 'onRecon_Calculate'
        }
    },
    setPcontractID: function(pcontractid_link){
        var viewmodel = this.getViewModel();
        viewmodel.set('pcontractid_link',pcontractid_link);
        console.log(pcontractid_link);
    },
    onRecon_Calculate: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var ReconProduct_Store = viewmodel.getStore('ReconProduct_Store');
        var ReconMaterial_Store = viewmodel.getStore('ReconMaterial_Store');

        var params = new Object();
        params.pcontractid_link = viewmodel.get('pcontractid_link');

        me.setLoading("Đang tính quyết toán");
        GSmartApp.Ajax.post_longtimeout('/api/v1/recon/cal_recon_bycontract', Ext.JSON.encode(params),
        function (success, response, options) {
            me.setLoading(false);
            if (success) {
                var response = Ext.decode(response.responseText);
                if (response.respcode == 200) {
                    ReconProduct_Store.setData(response.productsku_data);
                    ReconMaterial_Store.setData(response.data);
                }
            } 
        })
    },
    renderSum: function (value) {
		if (null == value) value = 0;
		return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },

    onFilterValueMaNPLKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('SKUBalanceStore');
        var filterField = this.lookupReference('ValueFilterFieldMaNPL'),
            filters = store.getFilters();

        if (filterField.value) {
            this.ValueFilterFieldMaNPL = filters.add({
                id: 'ValueFilterFieldMaNPL',
                property: 'mat_sku_code',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ValueFilterFieldMaNPL) {
            filters.remove(this.ValueFilterFieldMaNPL);
            this.ValueFilterFieldMaNPL = null;
        }
    },
})