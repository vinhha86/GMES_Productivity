Ext.define('GSmartApp.view.stockin.Stockin_M_AddSpace', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockin_M_AddSpace',
    id:'Stockin_M_AddSpace',
    reference: 'Stockin_M_AddSpace',
    viewModel: {
        type: 'Stockin_M_AddSpaceViewModel'
    },
    controller: 'Stockin_M_AddSpaceController',
    // title: 'Login',

    // bodyPadding: 20,
    layout : 'center',
    // width: 160,
    autoSize: true,

    items: [{
        xtype: 'combobox',
        // reference: 'cboorgto',
        editable: false,
        readOnly: true,
        // cls: 'notEditable',
        bind:{
            store:'{dayStore}',
            value:'{row}'
        },
        displayField: 'code',
        valueField: 'id',
        label: 'Dãy:',
        // disabled: true,
        labelWidth: 100,
        width: 280,
        margin: '1 1 5 1',
        listeners: {
            change: 'onRowChange'
        }
    },{
        xtype: 'combobox',
        // reference: 'cboorgto',
        editable: false,
        readOnly: true,
        // cls: 'notEditable',
        bind:{
            store:'{hangStore}',
            value:'{space}'
        },
        displayField: 'spacename',
        valueField: 'spacename',
        label: 'Hàng:',
        // disabled: true,
        labelWidth: 100,
        width: 280,
        margin: '1 1 5 1',
        listeners: {
            change: 'onSpaceChange'
        }
    },{
        xtype: 'combobox',
        // reference: 'cboorgto',
        editable: false,
        readOnly: true,
        // cls: 'notEditable',
        bind:{
            store:'{tangStore}',
            value:'{floor}'
        },
        displayField: 'floorid',
        valueField: 'floorid',
        label: 'Tầng:',
        // disabled: true,
        labelWidth: 100,
        width: 280,
        margin: '1 1 5 1'
    }],

    buttons: [{
        text: 'Thoát',
        itemId: 'btnThoat'
    },{
        text: 'Lưu',
        itemId: 'btnLuu'
    }]
});