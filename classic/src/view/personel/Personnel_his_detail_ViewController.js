Ext.define('GSmartApp.view.personel.Personnel_his_detail_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Personnel_his_detail_ViewController',
    init: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        if (viewmodel.get('isPosition')){
            var PositionStore = viewmodel.getStore('PositionStore');
            PositionStore.loadStore();
        }

        if (viewmodel.get('isLevel')){
            var LaborStore = viewmodel.getStore('LaborStore');
            LaborStore.loadStore();
        }

        if (viewmodel.get('isOrg')){
            var orgStore = viewmodel.getStore('OrgStore');
            var listid = '';
            if (viewmodel.get('orgmanagerid_link') == 1) {
                listid = "1";
            }
            else {
                listid = '22,14,8,9,17';
            }
            orgStore.getbyParentandType(viewmodel.get('orgmanagerid_link'), listid);
        }

        if (viewmodel.get('isSalary')){
            var SalTypeStore = viewmodel.getStore('SalTypeStore');
            SalTypeStore.loadStore(viewmodel.get('orgmanagerid_link'),viewmodel.get('saltype'));
        }
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnLuu': {
            click: 'onSave'
        },
        '#cmbDonViQL': {

        },
        '#rdoSalType': {
            change: 'onRdoSalType_Change'
        },
        '#cboSalType': {
            change: 'onCboSalType_Change'
        },
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
        else if (viewmodel.get('his.type') == 3 && viewmodel.get('his.orgid_link') == null) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn chưa chọn đơn vị",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
            });
            return false;
        }
        else if (viewmodel.get('his.type') == 4 && (viewmodel.get('his.saltypeid_link') == null || viewmodel.get('his.sallevelid_link') == null)) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn chưa chọn thang lương, bậc lương",
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
    },
    onRdoSalType_Change: function  ( m, newValue, oldValue, eOpts ) {
        var viewmodel = this.getViewModel();
        if (viewmodel.get('isSalary')){
            var SalTypeStore = viewmodel.getStore('SalTypeStore');
            viewmodel.set('his.saltypeid_link',null);
            viewmodel.set('his.sallevelid_link',null);
            SalTypeStore.removeAll();
            SalTypeStore.loadStore(viewmodel.get('orgmanagerid_link'),viewmodel.get('saltype'));
        }
    },
    onCboSalType_Change: function  ( m, newValue, oldValue, eOpts ) {
        var viewmodel = this.getViewModel();
        if (viewmodel.get('isSalary')){
            var SalTypeLevelStore = viewmodel.getStore('SalTypeLevelStore');
            viewmodel.set('his.sallevelid_link',null);
            SalTypeLevelStore.removeAll();
            SalTypeLevelStore.getSorters().removeAll();
            SalTypeLevelStore.getSorters().add('sallevel_code','ASC');
            SalTypeLevelStore.loadBySaltypeId(viewmodel.get('his.saltypeid_link'));
        }
    }
})