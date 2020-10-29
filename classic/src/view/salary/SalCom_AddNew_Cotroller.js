Ext.define('GSmartApp.view.pcontract.SalCom_AddNew_Cotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SalCom_AddNew_Cotroller',
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnXacNhan' : {
            click: 'onAccept'
        },
    },
    onThoat: function(){
        this.getView().up('window').close();
    },
    onAccept: function(grid, rowIndex, colIndex) {
        var me = this;
        var viewmodel = this.getViewModel();
        var params = new Object();
        params.orgid_link = viewmodel.get('orgid_link');
        params.code = viewmodel.get('code');
        params.name = viewmodel.get('name');
        params.comratio = null!=viewmodel.get('comratio')?parseFloat(viewmodel.get('comratio').toString().replace(/,/gi,'')):null;
        params.comamount = null!=viewmodel.get('comamount')?parseInt(viewmodel.get('comamount').toString().replace(/,/gi,'')):null;
        params.typeid_link = viewmodel.get('typeid_link');

        GSmartApp.Ajax.post('/api/v1/salary/salcom_create', Ext.JSON.encode(params),
            function (success, response, options) {
                var mes = "";
                var isSuccess = false;
                if (success) {
                    var response = Ext.decode(response.responseText);
                   
                    if(response.respcode == 200){
                        mes = "Xác nhận thành công";
                        isSuccess = true;
                    }
                    else{
                        mes = response.message;
                    }
                }
                else{
                    mes = "Không nhận được phản hồi! Bạn vui lòng liên hệ kỹ thuật để trợ giúp";
                }

                Ext.Msg.show({
                    title: 'Thông báo',
                    msg: mes,
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng'
                    },
                    fn: function(){
                        if(isSuccess)
                            me.fireEvent('AcceptSuccess');
                    }
                });
            })
    },
    onUpdateComRatio: function(e, isValid, eOpts){
        var viewmodel = this.getViewModel();
        if (null != viewmodel.get('sal_basic') && null != viewmodel.get('comratio')){
            viewmodel.set('comamount',viewmodel.get('sal_basic')*viewmodel.get('comratio'));
        }
    }    
})