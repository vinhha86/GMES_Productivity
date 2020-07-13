Ext.define('GSmartApp.view.Schedule.Plan.Schedule_plan_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Schedule_plan_ViewController',
    rec: null,
    init: function () {
        // var grid = this.getView().down('treeplan');
        // var crud = grid.getCrudManager();
        // crud.load();
    },
    control: {
        
    },
    onContextMenu: function (scheduler, eventRecord, e, eOpts) {
        var me = this;
        var menu_grid = new Ext.menu.Menu({
            items: [{
                text: 'Sản phẩm',
                iconCls: 'x-fa fa-cart-arrow-down',
                handler: function () {

                }
            },
            {
                text: 'Đơn hàng (PO)',
                iconCls: 'x-fa fa-handshake-o',
                handler: function () {
                }
            },
            {
                text: 'Lệnh sản xuất',
                iconCls: 'x-fa fa-industry'
            },
            {
                text: 'Tiến độ',
                iconCls: 'x-fa fa-line-chart',
                handler: function () {
                }
            },
            {
                text: 'Năng suất',
                iconCls: 'x-fa fa-angle-double-right',
                handler: function () {
                    me.ShowNangSuat(eventRecord);
                }
            },
            {
                text: 'Tách lệnh',
                iconCls: 'x-fa fa-cut',
                handler: function () {
                    me.ShowBreakPorder(eventRecord);
                }
            }
            ]
        })
        e.stopEvent();
        menu_grid.showAt(e.getXY());
    },
    ShowBreakPorder: function(rec){
        var form = Ext.create('Ext.window.Window', {
            height: 150,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Tách lệnh sản xuất '+ rec.get('mahang'),
            closeAction: 'destroy',
            width: 300,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Plan_break',
                viewModel: {
                    data : {
                        plan: {
                            quantity: rec.get('totalpackage'),
                            parentid_origin: rec.get('parentid_origin'),
                            resourceid: rec.get('resourceId'),
                            porderid_link: rec.get('id_origin'),
                            producttivity: rec.get('productivity')
                        }
                    }
                }
            }]
        });
        form.show();
    },
    ShowNangSuat: function(rec){
        var form = Ext.create('Ext.window.Window', {
            height: 230,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Thông tin lệnh sản xuất '+ rec.get('mahang'),
            closeAction: 'destroy',
            width: 600,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Plan_porder_info',
                viewModel: {
                    data: {
                        sch : rec.data
                    }
                }
            }]
        });
        form.show();
    },
    onFiltergrant: function() {

    },
    onResizeSchedule: function (scheduler, record, eOpts) {
        var me = this;
        var params = new Object();
        // record.data.EndDate = new Date(record.data.EndDate.substring(0,10));
        // record.data.StartDate = new Date(record.data.StartDate.substring(0,10));
        params.data = record.data;

        GSmartApp.Ajax.post('/api/v1/schedule/update', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        var data = response.data;
                        record.set('duration', data.duration);
                        record.set('productivity', data.productivity);
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Cập nhật thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            },
                            fn: function () {
                                if (record.previousValues.StartDate != null)
                                    record.set("StartDate", record.previousValues.StartDate);
                                if (record.previousValues.EndDate != null)
                                    record.set("EndDate", record.previousValues.EndDate);
                            }
                        });
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Cập nhật thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        },
                        fn: function () {
                            if (record.previousValues.StartDate != null)
                                record.set("StartDate", record.previousValues.StartDate);
                            if (record.previousValues.EndDate != null)
                                record.set("EndDate", record.previousValues.EndDate);
                        }
                    });
                }
            })
    },
    grant_to_orgid_link : 0,
    _dragContext : null,
    beforeDrop:  function( scheduler, dragContext, e, eOpts){
        var me = this;
        me._dragContext = dragContext;
        var newResource = dragContext.newResource;
        record = dragContext.draggedRecords[0].data;
        console.log(record);
        console.log(newResource);

        //truong hop keo tha tu to nay sang to khac cung 1 nha may
        if( newResource.get('parentid_origin') != record.parentid_origin){
            me._dragContext.finalize(false);
            return false;
            
            // Ext.Msg.show({
            //     title: 'Thông báo',
            //     msg: 'Bạn không được phép chuyển sang tổ của nhà máy khác',
            //     buttons: Ext.MessageBox.YES,
            //     buttonText: {
            //         yes: 'Đóng',
            //     },
            //     fn: function() {
                    
            //     }
            // });
           
        } else {
            if(newResource.get('Id') != record.resourceId){
                if(record.status != 0){
                    me.ShowFormQuestion();
                    var window = Ext.WindowManager.getActive();
                    window.el.setZIndex(1100000);
                    return false;
                }
             }
        }
        
        
        // dragContext.finalize(false);
        // return false;

        var newResource = dragContext.newResource;
        // console.log(newResource);
        me.grant_to_orgid_link = newResource.get('id_origin');
    },
    onEventDrop: function(scheduler, dragContext, e, eOpts){
        var me = this;
        var rec = scheduler.getEventSelectionModel().selected.items[0];
        // console.log(dragContext[0]);
        // var newResource = dragContext.newResource;
        // var record = dragContext.draggedRecords[0].data;
        var params = new Object();
        params.porderid_link = dragContext[0].get('id_origin');
        params.StartDate = dragContext[0].get('StartDate');
        params.EndDate = dragContext[0].get('EndDate');
        // //Truong hop drop trong to chuyen
        if(dragContext[0].modified.ResourceId == null){
            
            params.grant_to_orgid_link = 0;
            me.UpdateLenh(params, dragContext[0])
            
        }
        //truong hop tao lenh tu cac lenh chua phan chuyen
        else if (dragContext[0].get('status') == 0){
            params.grant_to_orgid_link = me.grant_to_orgid_link;
            me.UpdateLenh(params, dragContext[0])
        }
        else if (dragContext[0].get('status') > 0){

        }
    },
    onBeforeDrop:  function( node, data, overModel, dropPosition, dropHandlers, eOpts){
        var destPos_Data = overModel.data;
            if (destPos_Data.type != 1){
                Ext.Msg.show({
                    title: 'Thông báo',
                    msg: 'Chỉ được phép phân lệnh cho tổ chuyền',
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    },
                    fn: function(){
                        dropHandlers.cancelDrop();
                    }
                });
            } else {
                //Neu khong tha vao to san xuat --> Huy bo
                if (destPos_Data.id_origin < 1){
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Chỉ được phép phân lệnh cho tổ chuyền',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        },
                        fn: function(){
                            dropHandlers.cancelDrop();
                        }
                    });
                } else {
                    var porder_data = data.records[0].data;
                    if (destPos_Data.parentid_origin != porder_data.granttoorgid_link){
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lệnh sản xuất đang được phân cho phân xưởng khác',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            },
                            fn: function(){
                                dropHandlers.cancelDrop();
                            }
                        });
                    } else {
                        // this.showPOrder(
                        //     data.records[0].data,
                        //     destPos_Data.id_origin,
                        //     destPos_Data.Name,
                        //     true,
                        //     2
                        // );
                        // dropHandlers.cancelDrop();
                    }
                }
            }
    },
    onDrop: function(node, data, overModel, dropPosition, eOpts){
        var me = this.getView().down('#treeplan');
        var porder = data.records[0];
        var resource = overModel.data;

        var params = new Object();
        params.porderid_link = porder.get('id');
        params.resourceid = resource.Id;
        params.orggrantto = resource.id_origin;
        params.parentid_origin = resource.parentid_origin;

        GSmartApp.Ajax.post('/api/v1/schedule/create_pordergrant', Ext.JSON.encode(params),
        function (success, response, options) {
            if (success) {
                var response = Ext.decode(response.responseText);
                if (response.respcode == 200) {
                    var event = response.data;
                    var store = me.getCrudManager().getEventStore();
                    store.insert(0,event);
                    var rec = store.getAt(0);

                    me.getSchedulingView().scrollEventIntoView(rec);
                }
                else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Cập nhật thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng'
                        }
                    });
                }
            } else {
                Ext.Msg.show({
                    title: 'Thông báo',
                    msg: 'Cập nhật thất bại',
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng'
                    }
                });
            }
        })
    },
    doHighlight : function (value) {
        var me = this.getView();
        var store = me.eventStore;

        store.each(function(task) {
            if (task.getName().toLowerCase().indexOf(value) >= 0) {
                task.set('Cls', 'match');
            } else {
                task.set('Cls', '');
            }
        });

        me[value.length > 0 ? 'addCls' : 'removeCls']('highlighting');
    },

    onClearHighlightClick : function (field) {
        this.doHighlight(field, '');
    },
    ShowFormQuestion: function(){
        var me = this;
        var form = Ext.create('Ext.window.Window', {
            height: 200,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Tách - Chuyển lệnh sản xuất',
            closeAction: 'destroy',
            width: 300,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'FormQuestion_MoveGrant'
            }]
        });
        form.show();

        form.down('FormQuestion_MoveGrant').getController().on('Thoat',function(){
            me._dragContext.finalize(false);
            form.close();
        });

        form.down('FormQuestion_MoveGrant').getController().on('Chon',function(isBreak){
            me._dragContext.finalize(true);
            form.close();
        });
    },
    UpdateLenh: function(params, rec){
        GSmartApp.Ajax.post('/api/v1/schedule/update_porder', Ext.JSON.encode(params),
        function (success, response, options) {
            if (success) {
                var response = Ext.decode(response.responseText);
                if (response.respcode == 200) {
                    rec.set('duration', response.duration);
                    rec.set('productivity', response.productivity);
                }
                else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Cập nhật thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            } else {
                Ext.Msg.show({
                    title: 'Thông báo',
                    msg: 'Cập nhật thất bại',
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
            }
        })
    }
})