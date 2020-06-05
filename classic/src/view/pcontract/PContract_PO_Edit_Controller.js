Ext.define('GSmartApp.view.planporder.PContract_PO_Edit_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_PO_Edit_Controller',
    init: function(){
        // var viewmodel = this.getViewModel();
        // var unitStore = viewmodel.getStore('UnitStore');
        // unitStore.loadStore();

        // this.getInfo(viewmodel.get('plan.id'));
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
        if(id != 0){
            var viewmodel = this.getViewModel();

            var params = new Object();
            params.id = id;
            GSmartApp.Ajax.post('/api/v1/plan/getinfo', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                   
                    if(response.respcode == 200){
                        console.log(response.data);
                        viewmodel.set('plan', response.data);
                    }
                }
            })
        }
    },
    onThoat: function(){
        this.getView().up('window').close();
    },
    CheckValidate: function(){
        var viewmodel = this.getViewModel();
        var mes = "";
        if(viewmodel.get('plan.comment') == "" || viewmodel.get('plan.comment') == null){
            mes = "Bạn chưa nhập ghi chú";
            return mes;
        }
        return mes;
    },
    onSave: function(){
        var me = this;
        var viewmodel = this.getViewModel();
        var mes = me.CheckValidate();
        if(mes == ""){
            var params = new Object();
            params.data = viewmodel.get('plan');
    
            GSmartApp.Ajax.post('/api/v1/plan/create', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        var response = Ext.decode(response.responseText);
                       
                        if(response.respcode == 200){
                            var main = Ext.getCmp('panel_plan');
                            var store = main.getTaskStore();
    
                            if(viewmodel.get('plan.id') == 0){
                                var newTask = new store.model({
                                    Name        : params.data.comment,
                                    StartDate   : params.data.plan_date_start,
                                    EndDate     : params.data.plan_date_end,
                                    leaf        : true,
                                    id_origin   : response.data.id,
                                    plan_amount : params.data.plan_amount,
                                    plan_type   : params.data.plan_type
                                });
                                var node = store.getNodeById(viewmodel.get('parentId'));
                                node.appendChild(newTask);
                                main.getSchedulingView().scrollEventIntoView(newTask);
                            }
                            else{
                                var start_date = me.getView().down('#date_start').getValue();
                                var end_date = me.getView().down('#date_end').getValue();

                                // var node = store.getNodeById(viewmodel.get('plan.id'));
                                var node = main.getSelectedRows();
                                node[0].set('StartDate', start_date);
                                node[0].set('EndDate', end_date);
                                node[0].set('totalpackage', params.data.plan_amount);
                                node[0].set('Name', params.data.comment);
                            }
                            
                            me.onThoat();
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
        else{
            Ext.Msg.show({
                title: 'Thông báo',
                msg: mes,
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        
    },
    onDropOrg: function(node, data, dropRec, dropPosition){
        // console.log(data.records[0].get('Id'));
        // console.log(data.records[0].get('Name'));
        // console.log(data.records[0].get('parentOrgId'));
        // console.log(data.records[0].get('parentName'));
        // var OrgGrantedStore = this.getViewModel().getStore('OrgGrantedStore');
        // OrgGrantedStore.add(
        //     {
        //         granttoorgid_link: data.records[0].get('parentOrgId'),
        //         granttoorg_name: data.records[0].get('parentName'),
        //         granttolineid_link: data.records[0].get('Id'),
        //         granttoline_name: data.records[0].get('Name'),
        //     }
        // );
        data.records[0].set('granttoorg_name',data.records[0].get('parentName'));
        data.records[0].set('granttoline_name',data.records[0].get('Name'));
        data.records[0].set('grantamount',0);
    },    
    onBeforeDropOrg:  function( node, data, overModel, dropPosition, dropHandlers, eOpts){
        dropHandlers.wait = true;
        var OrgGrantedStore = this.getViewModel().getStore('OrgGrantedStore');
        console.log(data.records[0].get('Id'));
        var orgRec = OrgGrantedStore.findRecord('granttolineid_link', data.records[0].get('Id'));

        if (null == orgRec) {
            dropHandlers.processDrop();
        } else {
            Ext.Msg.show({ 
                title: 'Phân chuyền',
                msg: 'Tổ chuyền đã được chọn'
                });            
            dropHandlers.cancelDrop();
        }
        
    }    
})