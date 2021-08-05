Ext.define('GSmartApp.view.stockin.stockin_material.Stockin_M_Edit.Stockin_M_Edit_D_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockin_M_Edit_D_Main',
    id: 'Stockin_M_Edit_D_Main',
    reference: 'Stockin_M_Edit_D_Main',
    controller: 'Stockin_M_Edit_D_MainController',
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
                    itemId: 'maNPLFilter',
                    // label: 'Mã hàng:',
                    // labelWidth: 85,
                    margin: '5 5 1 5',
                    // padding: 6,
                    // flex: 1,
                    // width: '100%',
                    // minWidth: 80,
                    // maxWidth: 200,
                    textAlign: 'left',
                    placeholder: 'Tìm kiếm nhanh ... (theo mã)',
                    // editable: false,
                    // readOnly: true,
                    clearable: false,
                    cls: 'searchField',
                    // bind: {
                    //     value: '{maNPLFilter}'
                    // },
                    listeners: {
                        keyup: 'onmaNPLFilterKeyup',
                        buffer: 500
                    }
                },
                {
                    margin: 1,
                    flex: 1,
                    xtype: 'Stockin_M_Edit_D',
                    // id: 'handover_cut_toline_detail',
                },
                {
                    layout: 'hbox',
                    // flex: 1,
                    items:[
                        {
                            xtype: 'textfield',
                            itemId: 'lotNumberTxt',
                            // label: 'Mã hàng:',
                            // labelWidth: 85,
                            margin: 1,
                            // padding: 6,
                            flex: 1,
                            // width: '100%',
                            // minWidth: 80,
                            // maxWidth: 200,
                            textAlign: 'left',
                            placeholder: 'Số lot',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{lotNumberTxt}'
                            },
                            listeners: {
                                change: 'onlotNumberTxtType',
                                focus: 'onFocus'
                            }
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
                            placeholder: 'Số lượng cây',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{cayNumberTxt}'
                            },
                            stepValue: 0.1,
                            listeners: {
                                focus: 'onFocus'
                            }
                        },
                        {
                            xtype:'button',
                            iconCls: 'x-fa fa-plus',
                            itemId:'btnAddLot',
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
                            placeholder: 'Tổng độ dài',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{yNumberTxt}'
                            },
                            stepValue: 0.1,
                            listeners: {
                                focus: 'onFocus'
                            }
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
                            placeholder: 'Tổng cân nặng',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{canNumberTxt}'
                            },
                            stepValue: 0.1,
                            listeners: {
                                focus: 'onFocus'
                            }
                        },
                        {
                            xtype:'button',
                            iconCls: 'x-fa fa-plus',
                            // itemId:'',
                            ui: 'action',
                            margin: 1,
                            style: 'visibility: hidden;'
                        },
                    ]
                },
            ]
        },
    ]
});