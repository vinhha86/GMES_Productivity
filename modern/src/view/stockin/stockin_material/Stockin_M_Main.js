Ext.define('GSmartApp.view.stockin.Stockin_M_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockin_M_Main',
    id: 'Stockin_M_Main',
    reference: 'Stockin_M_Main',
    viewModel: {
        type: 'Stockin_M_ViewModel'
    },
    controller: 'Stockin_M_MainController',

    layout: 'vbox',
    items: [
        {
            layout: 'hbox',
            defaults: {
                margin:'5 5 0 5'
            },
            items: [
                {
                    xtype: 'datefield',
                    reference: 'fromDate',
                    itemId: 'fromDate',
                    label: 'Từ:',
                    labelWidth: 'auto',
                    value: new Date(),
                    // value: new Date(2020, 1, 1),
                    dateFormat : 'd/m/y',
                    flex: 1,
                    enableKeyEvents: true,
                    listeners: {
                        change : 'loadData'
                    }
                },
                {
                    xtype: 'datefield',
                    reference: 'toDate',
                    itemId: 'toDate',
                    label: 'Đến:',
                    labelWidth: 'auto',
                    value: new Date(),
                    dateFormat : 'd/m/y',
                    flex: 1,
                    enableKeyEvents: true,
                    listeners: {
                        change : 'loadData'
                    }
                }
            ]
        },
        {
            margin: 1,
            flex: 1,
            xtype: 'Stockin_M_List',
        },
    ],
    tbar: [{
        xtype:'button',
        iconCls: 'x-fa fa-arrow-left',
        itemId:'btnBack',
        ui: 'action',
    },
    '->'
    ,{
        xtype:'button',
        iconCls: 'x-fa fa-plus',
        itemId:'btnThem',
        ui: 'action',
    }]
});
