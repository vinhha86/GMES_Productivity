Ext.define('GSmartApp.view.devicegroup.DeviceGroupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DeviceGroupController',
    init: function(){
        let viewmodel = this.getViewModel();
        let store  =  viewmodel.getStore('DeviceGroupStore');
        store.loadStore();
    },
    control: {
        '#btnThemMoi': {
            click: 'onThemMoi'
        }
    },
    ThemMoi_CapNhat: function (params) {
        // console.log('ThemMoi_CapNhat OK');
        // console.log(params);
        let me = this.getView();
        GSmartApp.Ajax.post('/api/v1/device/createDeviceGroup', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    let store = me.getViewModel().getStore('DeviceGroupStore');
                    if (params.data.id == 0 || params.data.id == null) {                        
                        me.down('#txtThemMoi').reset();
                        me.down('#txtThemMoi').focus();
                    }
                    store.loadStore();
                } else {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Lưu thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
                me.setLoading(false);
            })
     },
    onThemMoi: function(){
        let me = this.getView();
        if (me.down('#txtThemMoi').getValue() == "") {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn chưa nhập tên thiết bị",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            me.down('#txtThemMoi').focus();
        }
        else {
            let check = this.checkValidate(me.down('#txtThemMoi').getValue());
            if(!check) {
                me.down('#txtThemMoi').focus();
                return;
            }

            let data = new Object();
            data.id = null;
            data.name = me.down('#txtThemMoi').getValue();

            let params = new Object();
            params.data = data;

            me.setLoading("Đang lưu dữ liệu");
            this.ThemMoi_CapNhat(params);
        }
    },
    checkValidate: function(name){
        let store = this.getViewModel().getStore('DeviceGroupStore');
        for(let i=0; i< store.data.length;i++){
            let data = store.data.items[i].data;
            if(data.name == name){
                Ext.MessageBox.show({
                    title: "Thông báo",
                    msg: "Dữ liệu đã tồn tại ở dòng "+ (i+1),
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });

                return false;
            }
        }
        return true;
    },
    onXoa: function(grid, rowIndex, colIndex){
        let me = this;
        let rec = grid.getStore().getAt(rowIndex);
        let id = rec.get('id');
        let name = rec.get('name');

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa loại thiết bị "' + name + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.Xoa(id, rec);
                }
            }
        });
    },
    Xoa: function (id, rec) {
        let me = this.getView();
        me.setLoading("Đang xóa dữ liệu");
        let params = new Object();
        params.id = id;

        GSmartApp.Ajax.post('/api/v1/device/deleteDeviceGroup', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Xóa thành công",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });

                    let store = me.getStore();
                    store.remove(rec);
                } else {
                    Ext.Msg.show({
                        title: 'Xóa thất bại',
                        msg: null,
                        buttons: [{
                            itemId: 'cancel',
                            text: GSmartApp.Locales.btn_dong[GSmartApp.Locales.currentLocale],
                        }]
                    });
                }
                me.setLoading(false);
            })
    },
    onChange:function(textField, newValue, oldValue, eOpts){
        let viewModel = this.getViewModel();
        viewModel.set('newValue',newValue);
    },
    onFocusLeave:function(textField, event, eOpts){
        let me = this.getView();
        let viewModel = this.getViewModel();
        let newName = viewModel.get('newValue');
        let oldName = viewModel.get('oldValue');

        if(newName==oldName){
            return;
        }

        let check = this.checkValidate(newName);
        if(!check || newName=='') {
            textField.setValue(oldName);
            textField.focus();
            return;
        }

        let data = new Object();
        data = viewModel.get('currentRec');
        data.name=newName;

        let params = new Object();
        params.data = data;

        me.setLoading("Đang lưu dữ liệu");
        this.ThemMoi_CapNhat(params);

        // console.log(viewModel.get('currentName'));
        // console.log(viewModel.get('currentRec').id);
    },
    onRowClick:function(row, record, element, rowIndex, e, eOpts){
        // console.log(record); 
        let viewModel = this.getViewModel();
        viewModel.set('currentRec',record.data);
        viewModel.set('oldValue',record.data.name);
        viewModel.set('newValue',record.data.name);
    },
    onDeviceGroupNameFilterKeyup:function(){
        let filterField = this.lookupReference('deviceGroupNameFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.nameFilter = filters.add({
                id: 'nameFilter',
                property: 'name',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.nameFilter) {
            filters.remove(this.nameFilter);
            this.nameFilter = null;
        }
    }
})