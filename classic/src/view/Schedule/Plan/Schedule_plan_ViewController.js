Ext.define('GSmartApp.view.Schedule.Plan.Schedule_plan_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Schedule_plan_ViewController',
    rec: null,
    init: function () {
        // var grid = this.getView().down('treeplan');
        // var crud = grid.getCrudManager();
        // crud.load();
    },
    // control: {
    //     '#treeplan': {
    //         eventcontextmenu: 'onContextMenu',
    //         aftereventresize: 'onResizeSchedule',
    //         beforeeventdropfinalize: 'onDrop'
    //     }
    // },
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
            }
            ]
        })
        e.stopEvent();
        menu_grid.showAt(e.getXY());
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
            if(newResource.get('id_origin') != record.id_origin){
                me.ShowFormQuestion();
                var window = Ext.WindowManager.getActive();
                window.el.setZIndex(1100000);
                return false;
             }
        }
        
        
        // dragContext.finalize(false);
        // return false;

        var newResource = dragContext.newResource;
        // console.log(newResource);
        me.grant_to_orgid_link = newResource.get('id_origin');
    },
    onDrop: function(scheduler, dragContext, e, eOpts){
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