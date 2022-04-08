Ext.define('GSmartApp.view.pcontract.PContract_Bom_PO_MainViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_Bom_PO_MainViewController',
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnDeselectAll': {
            click: 'onDeselectAll'
        }
    },
    init: function () {
    },
    onThoat: function () {
        var m = this;
        m.fireEvent('Thoat');
    },
    onDeselectAll: function() {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        // var material_skuid_link = viewModel.get('material_skuid_link');
        // var pcontractid_link = viewModel.get('pcontractid_link');
        // var productid_link = viewModel.get('productid_link');

        var PContract_Bom_PO_VIew = me.down('#PContract_Bom_PO_VIew');
        if(PContract_Bom_PO_VIew){
            var select = PContract_Bom_PO_VIew.getSelectionModel().getSelection();
            console.log(select);
            var pcontract_poid_link_list = new Array();
            for(var i=0;i<select.length;i++){
                pcontract_poid_link_list.push(select[i].get('id'));
            }
            if(pcontract_poid_link_list.length > 0){
                m.DeselectAll(pcontract_poid_link_list);
            }
        }
    },
    DeselectAll: function(pcontract_poid_link_list){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var material_skuid_link = viewModel.get('material_skuid_link');
        var pcontractid_link = viewModel.get('pcontractid_link');
        var productid_link = viewModel.get('productid_link');

        var params = new Object();
        params.material_skuid_link = material_skuid_link;
        params.pcontractid_link = pcontractid_link;
        params.productid_link = productid_link;
        params.pcontract_poid_link_list = pcontract_poid_link_list;

        me.setLoading(true);
        GSmartApp.Ajax.post('/api/v1/pcontract_po/deselectPContractBom2Npl', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        var PContract_Bom_PO_VIew = me.down('#PContract_Bom_PO_VIew');
                        if(PContract_Bom_PO_VIew){
                            PContract_Bom_PO_VIew.getSelectionModel().deselectAll(true);
                            m.fireEvent('DeselectAllPoLine');
                        }
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: "Có lỗi trong quá trình xử lý dữ liệu! Bạn hãy thử lại sau",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng'
                        },
                    });
                }
            })
    }
})