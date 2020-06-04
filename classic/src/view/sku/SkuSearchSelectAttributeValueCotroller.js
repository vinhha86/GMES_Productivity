Ext.define('GSmartApp.view.sku.SkuSearchSelectAttributeValueCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SkuSearchSelectAttributeValueCotroller',
    init: function () {
        var me = this.getView();
        var skuAtributeValueStore = this.getViewModel().getStore('SkuAtributeValueStore');
        skuAtributeValueStore.loadByAttrId(me.IdAttribute);
        // for(var i=0; i<skuAtributeValueStore.getCount();i++){
        //     me.getSelectionModel().select(i, true, false);
        // }
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnLuu': {
            click: 'onLuu'
        }
    },
    onThoat: function () {
        this.getView().up('window').close();
    },
    onLuu: function () {
        var me = this.getView();

        var select = me.getSelectionModel().getSelection();
        var selectedValue = '';
        var selectedIds = '';
        for (var i = 0; i < select.length; i++) {
            var data = select[i].data;
            if (selectedValue == ''){
                selectedValue = data.value;
                selectedIds = data.id;
            }
            else {
                selectedValue = selectedValue + '; ' + data.value;
                selectedIds = selectedIds + ';' + data.id;
            }
        }
        me.AttrRecord.beginedit;
        me.AttrRecord.set('description',selectedValue);
        me.AttrRecord.set('selectedids',selectedIds);
        me.AttrRecord.endedit;
        this.onThoat();
    }
})