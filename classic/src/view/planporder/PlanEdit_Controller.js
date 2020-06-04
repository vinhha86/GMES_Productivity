Ext.define('GSmartApp.view.planporder.PlanEdit_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PlanEdit_Controller',
    init: function(){
        var viewmodel = this.getViewModel();
        var unitStore = viewmodel.getStore('UnitStore');
        unitStore.loadStore();

        this.getInfo(viewmodel.get('plan.id'));
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
        
    }
})