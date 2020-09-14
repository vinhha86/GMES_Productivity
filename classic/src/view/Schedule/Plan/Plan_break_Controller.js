Ext.define('GSmartApp.view.Schedule.Plan.Plan_break_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Plan_break_Controller',
    init: function(){
      var view = this.getView();
      var viewmodel = this.getViewModel();
      var store = viewmodel.getStore('POrder_ListGrantSKUStore');
      var pordergrantid_link = viewmodel.get('plan.pordergrant_id_link');
      store.loadStore(pordergrantid_link);
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
    renderSum: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
    },
    onBreak: function(){
        var me = this;
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        var params = viewmodel.get('plan');

        if(viewmodel.get('quantity') < viewmodel.get('plan.quantity')){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Số lượng tách không được lớn hơn số lượng lệnh sản xuất!',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                },
                fn: function(){
                    viewmodel.set('plan.quantity',viewmodel.get('quantity'));
                }
            });
        }
        else {
            grid.setLoading('Đang xử lý dữ liệu');
            GSmartApp.Ajax.post('/api/v1/schedule/break_porder' , Ext.JSON.encode(params),
            function (success, response, options) {
                grid.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        me.fireEvent('BreakPorder', response);
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
        
    }
})