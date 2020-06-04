Ext.define('GSmartApp.view.fobprice.FOBPriceViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FOBPriceViewController',
    init: function(){
        var viewmodel = this.getViewModel();
        var store  =  viewmodel.getStore('PriceStore');
        store.loadStore();
    },
    control: {
        '#btnThemMoi': {
            click: 'onThemMoi'
        }
    },
    ThemMoi_CapNhat: function (params) {
        var me = this.getView();
        GSmartApp.Ajax.post('/api/v1/fobprice/create', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var store = me.getViewModel().getStore('PriceStore');
                    if (params.data.id == 0 || params.data.id == null) {                        
                        me.down('#txtThemMoi').reset();
                    }
                    store.loadStore();
                } else {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Thêm mới thất bại",
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
        var me = this.getView();
        if (me.down('#txtThemMoi').getValue() == "") {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn chưa nhập tên giá",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else {
            var check = this.checkValidate(me.down('#txtThemMoi').getValue());
            if(!check) {
                me.down('#txtThemMoi').focus();
                return;
            }

            var data = new Object();
            data.id = null;
            data.orgrootid_link = 0;
            data.name = me.down('#txtThemMoi').getValue();

            var params = new Object();
            params.data = data;

            me.setLoading("Đang lưu dữ liệu");
            this.ThemMoi_CapNhat(params);
        }
    },
    checkValidate: function(name){
        var store = this.getViewModel().getStore('PriceStore');
        for(var i=0; i< store.data.length;i++){
            var data = store.data.items[i].data;
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
    }
})