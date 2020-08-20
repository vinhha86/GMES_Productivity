Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_Info_Main_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_PO_Edit_Info_Main_Controller',
    init: function(){
        var viewmodel = this.getViewModel();
        var ctrsewtarget = Ext.getCmp('PContract_PO_Edit_Info_sewtarget_percent');
        var ctrsewtarget_hidden = Ext.getCmp('PContract_PO_Edit_Info_sewtarget_hidepanel');
        var ctrporderreqdel = Ext.getCmp('PContract_PO_Edit_Porder_Req_deletebutton');
        var ctrportfromto = Ext.getCmp('PContract_PO_Edit_Info_PortFromTo');
        
        //An/hien Sewtarget_percent
        if(viewmodel.get('isedit')){
            if (null!=ctrsewtarget && null!=ctrsewtarget_hidden && null!=ctrporderreqdel){
                ctrsewtarget.setHidden(true);
                ctrsewtarget_hidden.setHidden(false);
                ctrporderreqdel.setHidden (true);
            }
        } else {
            if (null!=ctrsewtarget && null!=ctrsewtarget_hidden && null!=ctrporderreqdel){
                ctrsewtarget.setHidden(false);
                ctrsewtarget_hidden.setHidden(true);
                ctrporderreqdel.setHidden (false);
            }
        }
        var PackingTypeStore = viewmodel.getStore('PackingTypeStore');
        PackingTypeStore.loadStore();
        var PortStore = viewmodel.getStore('PortStore');
        PortStore.loadStore(null,null);

        if(viewmodel.get('id') > 0){
            this.getInfo(viewmodel.get('id'));

        } else {
            this.getInfo(null);
        }
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnLuu' : {
            click: 'onSave'
        }
    },
    getInfo: function(id){
        var viewmodel = this.getViewModel();
        if (null != id){
            var params = new Object();
            params.id = id;
            GSmartApp.Ajax.post('/api/v1/pcontract_po/getone', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                   
                    if(response.respcode == 200){
                        viewmodel.set('po', response.data);

                        //Chuyen packing notice ve array
                        var packing_str = response.data.packingnotice;
                        var packing_arr = packing_str.split(';');
                        viewmodel.set('po.packingnotice', packing_arr);

                        //Lay danh sach POrder_Req
                        var porderReqStore = viewmodel.getStore('porderReqStore');
                        porderReqStore.loadByPO(id);     
                        
                        // //Lay danh sach ke hoach giao hang
                        // var POShippingStore = viewmodel.getStore('POShippingStore');
                        // POShippingStore.loadStore_bypo(id);
                        // console.log(POShippingStore);
                    }
                }
            })
        } else {
            var new_po = new GSmartApp.model.pcontract.PContractPO();
            new_po.data.id = null;

            //Lay thong tin parent po
            var params = new Object();
            params.id = viewmodel.get('parentpoid_link');
            GSmartApp.Ajax.post('/api/v1/pcontract_po/getone', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    console.log(response);
                    if(response.respcode == 200){
                        var parent_po = response.data;
                        new_po.data.pcontractid_link = parent_po.pcontractid_link;
                        new_po.data.productid_link = parent_po.productid_link;
                        new_po.data.shipdate = parent_po.shipdate;
                        new_po.data.matdate = parent_po.matdate;
                        new_po.data.productiondate = parent_po.productiondate;
                        new_po.data.productiondays = parent_po.productiondays;
                        new_po.data.merchandiserid_link = parent_po.merchandiserid_link;
                        new_po.data.packingnotice = parent_po.packingnotice;
                        new_po.data.parentpoid_link = parent_po.id;
                        
                        viewmodel.set('po', new_po.data);

                        //Lay danh sach POrder_Req
                        // console.log(viewmodel.get('parentpoid_link'));
                        var porderReqStore = viewmodel.getStore('porderReqStore');
                        porderReqStore.loadByPO(viewmodel.get('parentpoid_link'));
                    }
                }
            })            
           
        }
    },
    onThoat: function(){
        this.getView().up('window').close();
    },
    onSave: function(){
        var me = this;
        var viewmodel = this.getViewModel();
        var params = new Object();

        var packing_arr = viewmodel.get('po.packingnotice'); 
        var packingnotice = '';
        for(i=0;i<packing_arr.length;i++){
            packingnotice = packingnotice + packing_arr[i];
            if (i < packing_arr.length-1) packingnotice = packingnotice  + ';';
        } 
        viewmodel.set('po.packingnotice',packingnotice);  

        params.data = viewmodel.get('po');

        var arrPOrders = [];
        var porderReqStore = viewmodel.getStore('porderReqStore');
        porderReqStore.each(function (record) {
            //Neu la lenh moi (sencha tu sinh id) --> set = null
            if(!Ext.isNumber(record.data.id)) record.data.id = null;

            //Neu la Sub-PO moi
            if (null == params.data.id) record.data.id = null;
            arrPOrders.push(record.data);
        });
        params.po_orders = arrPOrders;

        GSmartApp.Ajax.post('/api/v1/pcontract_po/update', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                   
                    if(response.respcode == 200){
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            },
                            fn: function(){
                                me.getInfo(response.id);
                            }
                        });
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lưu thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
        
    }
})