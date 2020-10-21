Ext.define('GSmartApp.view.personel.Personnel_history_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Personnel_history_ViewController',
    init: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('PersonnelHis_Store');
        store.loadStore_by_person(viewmodel.get('personnel.id'));
    },
    control: {
        '#btn_position': {
            click: 'onEditPos'
        },
        '#btn_level': {
            click: 'onEditLevel'
        },
        '#btn_department': {
            click: 'onEditDep'
        }
    },
    getTitle: function(id, itype){
        var name ="", type="";
        if(id==null)
            name = "Thêm mới ";
        else 
            name = "Cập nhật ";

        switch(itype){
            case 1:
                type = "chức vụ";
                break;
            case 2:
                type = "cấp bậc";
                break;
            case 3:
                type = "phòng ban";
                break;
            default: 
                "";
        }

        return name + type;
    },
    OpenShowDetail: function (isPosition, isLevel, isOrg, type, personnelid_link, id, positionid_link, levelid_link, orgid_link, decision_number, decision_date) {
        var me = this;

        var viewmodel = this.getViewModel();
        var form = Ext.create('Ext.window.Window', {
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: me.getTitle(id, type),
            closeAction: 'destroy',
            height: 300,
            width: 400,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Personnel_his_detail',
                viewModel: {
                    data: {
                        isPosition: isPosition,
                        isLevel: isLevel,
                        isOrg: isOrg,
                        his: {
                            type: type,
                            personnelid_link: personnelid_link,
                            positionid_link: positionid_link,
                            levelid_link: levelid_link,
                            orgid_link : orgid_link,
                            decision_date: decision_date,
                            decision_number: decision_number,
                            id: id
                        },
                        orgmanagerid_link: viewmodel.get('personnel.orgmanagerid_link')
                    }
                }
            }]
        });
        form.show();

        form.down('#Personnel_his_detail').getController().on('Thoat', function (orgid_link) {
            var store = viewmodel.getStore('PersonnelHis_Store');
            store.load();
            if(orgid_link != null){
                viewmodel.set('personnel.orgid_link', orgid_link);
            }
            form.close();
        })
    },
    onEditPos: function () {
        var me = this;
        var viewmodel = this.getViewModel();

        if (viewmodel.get('personnel.id') == null) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn phải lưu thông tin nhân viên trước khi cập nhật chức vụ",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });

            return;
        }

        me.OpenShowDetail(false, true, true, 1, viewmodel.get('personnel.id'), null, null, null, null, null, null);
    },
    onEditLevel: function () {
        var me = this;
        var viewmodel = this.getViewModel();

        if (viewmodel.get('personnel.id') == null) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn phải lưu thông tin nhân viên trước khi cập nhật cấp bậc",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });

            return;
        }

        me.OpenShowDetail(true, false, true, 2, viewmodel.get('personnel.id'), null, null, null, null, null, null);
    },
    onEditDep: function () {
        var me = this;
        var viewmodel = this.getViewModel();

        if (viewmodel.get('personnel.id') == null) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn phải lưu thông tin nhân viên trước khi cập nhật phòng ban",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });

            return;
        }

        me.OpenShowDetail(true, true, false, 3, viewmodel.get('personnel.id'), null, null, null, null, null, null);
    },
    onEdit: function(grid, rowIndex){
        var me = this;
        var viewmodel = this.getViewModel();

        var rec = grid.getStore().getAt(rowIndex);
        var isPos = true, isLevel = true, isOrg = true;
        if(rec.get('type') == 1)
            isPos = false;
        else if (rec.get('type') ==2)
            isLevel = false
        else 
            isOrg = false;

        me.OpenShowDetail(isPos, isLevel, isOrg, rec.get('type'), viewmodel.get('personnel.id'), rec.get('id'),
        rec.get('positionid_link'), rec.get('levelid_link'), rec.get('orgid_link'),rec.get('decision_number'),rec.get('decision_date'));
    },
    onDelete: function (grid, rowIndex, colIndex) {
        var viewmodel = this.getViewModel();

        var rec = grid.getStore().getAt(rowIndex);

        var params = new Object();
        params.personnelid_link = viewmodel.get('personnel.id');
        params.id = rec.get('id');

        GSmartApp.Ajax.post('/api/v1/personnel/delete_his_person', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        var store = viewmodel.getStore('PersonnelHis_Store');
                        store.load();

                        if(rec.get('type') == 3){
                            viewmodel.set('personnel.orgid_link', response.orgid_link);
                        }
                    }
                }
                else {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Có lỗi trong quá trình xóa dữ liệu",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    }
})