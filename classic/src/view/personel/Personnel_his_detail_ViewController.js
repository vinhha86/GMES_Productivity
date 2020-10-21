Ext.define('GSmartApp.view.personel.Personnel_his_detail_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Personnel_his_detail_ViewController',
    init: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var PositionStore = viewmodel.getStore('PositionStore');
        PositionStore.loadStore();

        var LaborStore = viewmodel.getStore('LaborStore');
        LaborStore.loadStore();

        var orgStore = viewmodel.getStore('OrgStore');
        var listid = '';
        if (viewmodel.get('orgmanagerid_link') == 1) {
            listid = "1";
        }
        else {
            listid = '22,14,8,9,17';
        }
        orgStore.getbyParentandType(viewmodel.get('orgmanagerid_link'), listid);
       
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnLuu': {
            click: 'onSave'
        },
        '#cmbDonViQL': {

        }
    },
    onThoat: function () {
        this.fireEvent('Thoat');
    },
    onSave: function () {
        var me = this;
        var viewmodel = this.getViewModel();
        if (viewmodel.get('his.type') == 1 && viewmodel.get('his.positionid_link') == null) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn chưa chọn chức vụ",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
            });
            return false;
        }
        else if (viewmodel.get('his.type') == 2 && viewmodel.get('his.levelid_link') == null) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn chưa chọn cấp bậc",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
            });
            return false;
        }

        var params = new Object();
        params.data = viewmodel.get('his');

        GSmartApp.Ajax.post('/api/v1/personnel/create_his', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        me.fireEvent('Thoat', viewmodel.get('his.orgid_link'));
                    }
                }
            })
    }
})