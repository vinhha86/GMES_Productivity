Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_Info_Main_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_PO_Edit_Info_Main_Controller',
    init: function(){
        var viewmodel = this.getViewModel();
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
        params.data = viewmodel.get('po');

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
        
    },
})