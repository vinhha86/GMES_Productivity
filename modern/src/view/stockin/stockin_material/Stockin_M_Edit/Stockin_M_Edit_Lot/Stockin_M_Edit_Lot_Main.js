Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_Lot_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockin_M_Edit_Lot_Main',
    id: 'Stockin_M_Edit_Lot_Main',
    reference: 'Stockin_M_Edit_Lot_Main',
    controller: 'Stockin_M_Edit_Lot_MainController',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    requires: [
        'Ext.Toast',
        'Ext.Responsive',
        'Ext.dataview.listswiper.ListSwiper'
    ],

    items:[
        {
            layout: 'vbox',
            flex: 1,
            items:[
                {
                    xtype: 'textfield',
                    itemId: 'maLotFilter',
                    // label: 'Mã hàng:',
                    // labelWidth: 85,
                    margin: '5 5 1 5',
                    // padding: 6,
                    // flex: 1,
                    // width: '100%',
                    // minWidth: 80,
                    // maxWidth: 200,
                    textAlign: 'left',
                    placeholder: 'Tìm kiếm nhanh ... (theo lot)',
                    // editable: false,
                    // readOnly: true,
                    clearable: false,
                    cls: 'searchField',
                    // bind: {
                    //     value: '{maNPLFilter}'
                    // },
                    listeners: {
                        keyup: 'onmaLotFilterKeyup',
                        buffer: 500
                    }
                },
                {
                    margin: 1,
                    flex: 2,
                    xtype: 'Stockin_M_Edit_Lot',
                },
                {
                    margin: 1,
                    flex: 1,
                    xtype: 'Stockin_M_Edit_Space',
                    hidden: true
                },
                {
                    layout: 'hbox',
                    // flex: 1,
                    items:[
                        {
                            xtype: 'textfield',
                            // itemId: 'maNPLFilter',
                            // label: 'Mã hàng:',
                            // labelWidth: 85,
                            margin: 1,
                            // padding: 6,
                            flex: 1,
                            // width: '100%',
                            // minWidth: 80,
                            // maxWidth: 200,
                            textAlign: 'left',
                            placeholder: 'Danh sách khoang',
                            editable: false,
                            readOnly: true,
                            clearable: false,
                            cls: 'notEditable',
                            bind: {
                                value:'{spacesString}'
                            },
                        },
                        {
                            xtype:'button',
                            iconCls: 'x-fa fa-edit',
                            itemId:'btnLotEditSpace',
                            ui: 'action',
                            margin: 1,
                        },    
                    ]
                },
                {
                    layout: 'hbox',
                    // flex: 1,
                    items:[
                        {
                            xtype: 'numberfield',
                            // itemId: 'maNPLFilter',
                            // label: 'Mã hàng:',
                            // labelWidth: 85,
                            margin: 1,
                            // padding: 6,
                            flex: 1,
                            // width: '100%',
                            // minWidth: 80,
                            // maxWidth: 200,
                            textAlign: 'left',
                            placeholder: 'Dãy',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value:'{lotRow}'
                            },
                        },
                        {
                            xtype: 'numberfield',
                            // itemId: 'maNPLFilter',
                            // label: 'Mã hàng:',
                            // labelWidth: 85,
                            margin: 1,
                            // padding: 6,
                            flex: 1,
                            // width: '100%',
                            // minWidth: 80,
                            // maxWidth: 200,
                            textAlign: 'left',
                            placeholder: 'Hàng',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value:'{lotSpace}'
                            },
                            // stepValue: 0.1,
                        },
                        {
                            xtype: 'numberfield',
                            // itemId: 'maNPLFilter',
                            // label: 'Mã hàng:',
                            // labelWidth: 85,
                            margin: 1,
                            // padding: 6,
                            flex: 1,
                            // width: '100%',
                            // minWidth: 80,
                            // maxWidth: 200,
                            textAlign: 'left',
                            placeholder: 'Tầng',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value:'{lotFloor}'
                            },
                            // stepValue: 0.1,
                        },
                        {
                            xtype: 'numberfield',
                            // itemId: 'maNPLFilter',
                            // label: 'Mã hàng:',
                            // labelWidth: 85,
                            margin: 1,
                            // padding: 6,
                            flex: 1,
                            // width: '100%',
                            // minWidth: 80,
                            // maxWidth: 200,
                            textAlign: 'left',
                            placeholder: 'SL Cây',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value:'{lotAmount}'
                            },
                            // stepValue: 0.1,
                        },
                        {
                            xtype:'button',
                            iconCls: 'x-fa fa-plus',
                            itemId:'btnLotAddSpace',
                            ui: 'action',
                            margin: 1,
                        },    
                    ]
                },
            ]
        },
    ]
});