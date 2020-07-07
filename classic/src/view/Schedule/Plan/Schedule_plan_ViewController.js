Ext.define('GSmartApp.view.Schedule.Plan.Schedule_plan_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Schedule_plan_ViewController',
    init: function(){
        var grid = this.getView();
        var crud = grid.getCrudManager();
        crud.load();
    },
    control: {
        'Schedule_plan_View' : {
            eventcontextmenu : 'onContextMenu',
            aftereventresize : 'onResizeSchedule'
        }
    },
    onContextMenu : function( scheduler, eventRecord, e, eOpts) {
        var menu_grid = new Ext.menu.Menu({
            items: [{
                text: 'Hợp đồng',
                iconCls: 'x-fa fa-cart-arrow-down',
                handler: function () {
                    
                }
            }, 
            {
                text: 'Thông tin đơn hàng',
                iconCls: 'x-fa fa-handshake-o',
                handler: function () {
                }
            },
            {
                text: 'Tiến độ sản xuất',
                iconCls: 'x-fa fa-line-chart',
                handler: function () {
                }
            },
            {
                text: 'Năng suất',
                iconCls: 'x-fa fa-line-chart',
                handler: function () {
                }
            }
            ]
        })
        e.stopEvent();
        menu_grid.showAt(e.getXY());
    },
    onResizeSchedule: function(scheduler, record, eOpts) {
        var params = new Object();
        params.data = record.data;

        GSmartApp.Ajax.post('/api/v1/schedule/update', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                       var data = response.data;
                       record.set('duration', data.duration);
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Cập nhật thất bại',
                        msg: null,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    }
})