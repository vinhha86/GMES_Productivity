Ext.define('GSmartApp.view.pcontract.PContract_PO_FormAccept_ViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_PO_FormAccept_ViewCotroller',
    init: function(){
        var viewmodel = this.getViewModel();
		var OrgStore = viewmodel.getStore('OrgStore');
        OrgStore.loadOrg_Request(viewmodel.get('po.id'));
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnXacNhan' : {
            click: 'onAccept'
        },
        '#cmbDonVi': {
            select: 'onSelectOrg' 
        }
    },
    onThoat: function(){
        this.getView().up('window').close();
    },
    onSelectOrg: function(combo, record, eOpts){
        var viewmodel = this.getViewModel();
        var userStore = viewmodel.getStore('UserStore');
        userStore.loadUserbyOrg_Buyer(record.get('id'), viewmodel.get('po.orgbuyerid_link'));
    },
    onAccept: function() {
        var me = this;
        var viewmodel = this.getViewModel();
        var params = new Object();
        params.userid_link = viewmodel.get('po.userid_link');
        params.orgid_link = viewmodel.get('po.orgid_link');
        params.pcontract_poid_link = viewmodel.get('po.id');

        GSmartApp.Ajax.post('/api/v1/pcontract_po/accept', Ext.JSON.encode(params),
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
                        mes = "Có lỗi trong khi xử lý dữ liệu! Bạn vui lòng liên hệ kỹ thuật để trợ giúp";
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
    }
})