Ext.define('GSmartApp.view.pcontract.PContract_POrder_Edit_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_POrder_Edit_Controller',
    init: function(){
        this.reloadSKU();
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
    },    
    reloadSKU:function(){
        var viewmodel = this.getViewModel();
        var porder = viewmodel.get('porder');
        var poSKUStore = viewmodel.getStore('POSKUStore');
        var porderSKUStore = viewmodel.getStore('POrderSKUStore');

        var pcontract_poid_link =  porder.data.pcontract_poid_link;
        var pcontractid_link =  porder.data.pcontractid_link;

        poSKUStore.loadPOSKU_Free(pcontractid_link, pcontract_poid_link);
        porderSKUStore.loadByPorderID(porder.data.id);
		// poSKUStore.load({
		// 	scope: this,
		// 	callback: function(records, operation, success) {
		// 		if(!success){
		// 			 this.fireEvent('logout');
		// 		}
		// 		else{
        //             porderSKUStore.loadByPorderID_ASync(porder.data.id);
        //             porderSKUStore.load({
        //                 scope: this,
        //                 callback: function(records, operation, success) {
        //                     if(!success){
        //                          this.fireEvent('logout');
        //                     }
        //                     else{
        //                         //Xoa khoi poSKUStore cac skuid da co trong porderSKUStore
        //                         for (i=0; i<records.length; i++){
        //                             poSKUStore.removeAt(poSKUStore.find('skuid_link',records[i].data.skuid_link));
        //                         }
        //                         // poSKUStore.clearFilter();
        //                     }
        //                 }
        //             }); 
		// 		}
		// 	}
		// }); 
    },
    onPorder_RemoveSKU:function(){
        me = this;
        var viewmodel = this.getViewModel();
        var porder = viewmodel.get('porder');
        var porderSKU_View = Ext.getCmp('PContract_POrder_Edit_PorderSKU').getView();
        var porderSKU_select = porderSKU_View.getSelectionModel().getSelection();

        console.log(porderSKU_select);
        var porderSKU_list = [];
        for (var i = 0; i < porderSKU_select.length; i++) {
            porderSKU_list.push(porderSKU_select[i].data);
        }

        var params=new Object();
        params.porderid_link = porder.data.id;
        params.data = porderSKU_list;

        GSmartApp.Ajax.post('/api/v1/porder/delete_sku', Ext.JSON.encode(params),
        function (success, response, options) {
            var response = Ext.decode(response.responseText);
            if (!success) {
                Ext.MessageBox.show({
                    title: "Chi tiết lệnh",
                    msg: response.message,
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
            } else {
                me.reloadSKU();
            }
        });        
    },
    onPorder_AddSKU: function(){
        me = this;
        var viewmodel = this.getViewModel();
        var porder = viewmodel.get('porder');
        var poSKU_View = Ext.getCmp('PContract_POrder_Edit_POSKU').getView();
        var poSKU_select = poSKU_View.getSelectionModel().getSelection();
        console.log(poSKU_select);
        var poSKU_list = [];
        for (var i = 0; i < poSKU_select.length; i++) {
            var data = poSKU_select[i].data;
            var newSKU =new Object();
            newSKU.id = null;
            newSKU.porderid_link = porder.data.id;
            newSKU.productid_link = data.productid_link;
            newSKU.skuid_link = data.skuid_link;
            newSKU.pquantity_sample = data.pquantity_sample;
            newSKU.pquantity_porder = data.pquantity_porder;
            newSKU.pquantity_production = data.pquantity_production;
            newSKU.pquantity_total = data.pquantity_total;

            poSKU_list.push(newSKU);
        }
        var params=new Object();
        params.porderid_link = porder.data.id;
        params.data = poSKU_list;

        GSmartApp.Ajax.post('/api/v1/porder/create_skulist', Ext.JSON.encode(params),
        function (success, response, options) {
            var response = Ext.decode(response.responseText);
            if (!success) {
                Ext.MessageBox.show({
                    title: "Chi tiết lệnh",
                    msg: response.message,
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
            } else {
                me.reloadSKU();
            }
        });
    },
    onThoat: function () {
        this.fireEvent('Thoat');
    }
})