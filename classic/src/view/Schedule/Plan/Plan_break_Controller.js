Ext.define('GSmartApp.view.Schedule.Plan.Plan_break_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Plan_break_Controller',
    init: function(){
      var view = this.getView();
      view.down('#quantity').focus();
    } ,
    control: {
        '#btnThoat' : {
            click: 'onThoat'
        },
        '#btnLuu' : {
            click: 'onBreak'
        }
    },
    onThoat: function(){
        this.getView().up('window').close();
    },
    onBreak: function(){
        var viewmodel = this.getViewModel();
        var params = viewmodel.get('plan');
        console.log(params);
        
        GSmartApp.Ajax.post('/api/v1/schedule/break_porder' , Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        console.log(response);
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