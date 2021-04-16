Ext.define('GSmartApp.view.balance.Balance_Main_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Balance_Main_Controller',
    init: function () {
        // this.onCalBalance();
        var viewmodel = this.getViewModel();
        var PContractProductStore = viewmodel.getStore('PContractProductStore');
        if (!viewmodel.get('isAdd_Pcontract_Stockin')){
            //Neu khong phai goi de tao Stockin --> Load tat cac SP cua don hang
            PContractProductStore.loadStore(viewmodel.get('pcontractid_link'), null);
        } else {
            //Goi de tao Stockin va nhan vao danh sach SP
            var grd_product = Ext.getCmp('Balance_Product');
            grd_product.getView().getSelectionModel().selectAll();
            this.onCalBalance();
        }
    },
    onCalBalance: function(){
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var SKUBalanceStore = viewmodel.getStore('SKUBalanceStore');
        var BalanceProductStore = viewmodel.getStore('BalanceProductStore');

        // if (null!=SKUBalanceStore){
        //     SKUBalanceStore.loadBalanceByPo(viewmodel.get('pcontractid_link'), viewmodel.get('pcontract_poid_link'));
        // }
        var grd_product = Ext.getCmp('Balance_Product');
        var list_productid = '';
        if (null!=grd_product){
            var select = grd_product.getView().getSelectionModel().getSelection();
            for(var i = 0; i < select.length; i++){
                var theProduct = select[i].data;
                list_productid = list_productid + theProduct.productid_link + ";";
            }
        }

        var params = new Object();
        params.pcontractid_link = viewmodel.get('pcontractid_link');
        params.pcontract_poid_link = viewmodel.get('pcontract_poid_link');
        params.list_productid = list_productid;

        me.setLoading("Đang tính cân đối");
        if (null!=params.pcontract_poid_link){
            GSmartApp.Ajax.post('/api/v1/balance/cal_balance_bypo', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        SKUBalanceStore.setData(response.data);
                        BalanceProductStore.setData(response.product_data);
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
                        BalanceProductStore.setData(response.product_data);
                    }
                }
            })
        }
    },
    onMaterialSelect: function(){
        var grd_material = Ext.getCmp('Balance_D');
        var select = grd_material.getView().getSelectionModel().getSelection();
        if(select.length > 0){
            this.fireEvent('onSelect_Materials', select);
        }
    },
    onCloseButton:function(){
        var mywin = Ext.WindowManager.getActive();
        if (mywin) {
            mywin.close();
        }
    },
    renderSum: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
    },
})