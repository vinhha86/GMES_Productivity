Ext.define('GSmartApp.view.Schedule.Plan.Plan_porder_info_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Plan_porder_info_Controller',
    init: function(){
      
    } ,
    control: {
        '#btnThoat' : {
            click: 'onThoat'
        },
        '#date_start' : {
            focusleave: 'onSelectStartDate'
        },
        '#date_end' : {
            focusleave: 'onSelectEndDate'
        },
        '#duration' : {
            focusleave: 'onDuration'
        },
        '#productivity' : {
            focusleave: 'onProductivity'
        }
    },
    onThoat: function(){
        this.getView().up('window').close();
    },
    onSelectStartDate: function( field, value, eOpts){
        this.Update('#date_start', 'update_date');
    },
    onSelectEndDate: function(){
        this.url = 'update_date';
        this.Update('#date_end', 'update_date');
    },
    onDuration: function() {
        this.Update('#duration', 'update_duration');
    },
    onProductivity: function(){
        this.Update('#productivity', 'update_productivity');
    },
    Update: function(itemId, url){
        var me = this;
        var viewmodel = this.getViewModel();
        var params = new Object();
        params.data = viewmodel.get('sch');

        GSmartApp.Ajax.post('/api/v1/schedule/'+url , Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        viewmodel.set('sch',response.data);
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Cập nhật thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            },
                            fn: function(){
                                me.down(itemId).focus(true);
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
                        fn: function(){
                            me.down(itemId).focus(true);
                        }
                    });
                }
            })
    }
})