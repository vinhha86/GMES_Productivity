Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_M_List.Stockout_M_Edit.Stockout_M_Edit_Pkl_Rip.Stockout_M_Edit_Pkl_Rip_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockout_M_Edit_Pkl_Rip_Main',
    itemId: 'Stockout_M_Edit_Pkl_Rip_Main',
    reference: 'Stockout_M_Edit_Pkl_Rip_Main',
    controller: 'Stockout_M_Edit_Pkl_Rip_MainController',
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
            xtype: 'container',
            // flex:1,
            // height: 100,
            // docked: 'bottom',
            layout: 'hbox',
            items:[
                {
                    xtype: 'combobox',
                    itemId: 'cbbox_pklRip_stockoutdId',
                    // reference: 'cboorgto',
                    editable: false,
                    readOnly: true,
                    // cls: 'notEditable',
                    bind:{
                        store:'{Stockout_d}',
                        value:'{pklRip_stockoutdId}'
                    },
                    displayField: 'skucode',
                    valueField: 'id',
                    // label: 'Nơi giao:',
                    // disabled: true,
                    labelWidth: 85,
                    flex: 1,
                    padding: 2,
                },
                {
                    xtype: 'textfield',
                    itemId: 'maPklRipFilter',
                    // label: 'Mã hàng:',
                    // labelWidth: 85,
                    margin: '5 5 1 5',
                    // padding: 6,
                    flex: 1,
                    // width: '100%',
                    // minWidth: 80,
                    // maxWidth: 200,
                    textAlign: 'left',
                    placeholder: 'Tìm kiếm nhanh ... (theo lot)',
                    // editable: false,
                    // readOnly: true,
                    clearable: false,
                    cls: 'searchField',
                    bind: {
                        value: '{maPklRipFilter}'
                    },
                    listeners: {
                        keyup: 'onmaPklRipFilterKeyup',
                        buffer: 500
                    }
                },
            ]
        },
        
        {
            margin: 1,
            flex: 1,
            xtype: 'Stockout_M_Edit_Pkl_Rip',
        },
        {
            xtype: 'container',
            // flex:1,
            // height: 100,
            // docked: 'bottom',
            layout: 'vbox',
            items:[
                {
                    layout: 'hbox',
                    border: false,
                    width: '100%',
                    items:[
                        {
                            xtype: 'textfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'lotnumberTxtRip',
                            // label: 'Màu:',
                            // labelWidth: 85,
                            flex: 1,
                            minWidth: 80,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Số LOT',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                // value: '{lotnumberTxtRip}',
                                value: '{objRip.lotnumber}'
                            },
                            listeners: {
                                change: 'onlotnumberTxtRipType',
                                focusleave: 'onlotnumberTxtAndpackageidTxtRipleave'
                            }
                        },
                        {
                            xtype: 'numberfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'packageidTxtRip',
                            // label: 'Màu:',
                            // labelWidth: 85,
                            flex: 1,
                            minWidth: 80,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Số cây',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                // value: '{packageidTxtRip}'
                                value: '{objRip.packageid}'
                            },
                            listeners: {
                                focusleave: 'onlotnumberTxtAndpackageidTxtRipleave'
                            },
                            stepValue: 0.1,
                        },
                        {
                            xtype:'button',
                            // text: 'Xác nhận',
                            // flex: 1,
                            // minWidth: 80,
                            // maxWidth: 130,
                            // width: 45,
                            margin: 1,
                            iconCls: 'x-fa fa-check',
                            itemId:'btnCheckRip',
                            ui: 'action',
                            bind: {
                                disabled: '{!isobjRipSelected}'
                            }
                        },   
                    ]
                },
                {
                    layout: 'hbox',
                    border: false,
                    width: '100%',
                    items:[
                        {
                            xtype: 'numberfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'mTxtRip',
                            // label: 'Màu:',
                            // labelWidth: 85,
                            flex: 1,
                            minWidth: 80,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Số xé (M)',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                // value: '{mTxtRip}',
                                value: '{objRip.met_check}',
                                // cls: '{yTxtCls}',
                                hidden: '{isMetColumnHidden}',
                            },
                            stepValue: 0.1,
                        },
                        {
                            xtype: 'numberfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'yTxtRip',
                            // label: 'Màu:',
                            // labelWidth: 85,
                            flex: 1,
                            minWidth: 80,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Số xé (Y)',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                // value: '{yTxtRip}',
                                value: '{objRip.ydscheck}',
                                // cls: '{yTxtCls}',
                                hidden: '{isYdsColumnHidden}',
                            },
                            stepValue: 0.1,
                        },
                        {
                            xtype: 'numberfield',
                            border: true,
                            cls: 'my-textfield',
                            margin: 1,
                            itemId: 'mOriginTxtRip',
                            // label: 'Màu:',
                            // labelWidth: 85,
                            flex: 1,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Số còn (M)',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                // value: '{mOriginTxtRip}',
                                value: '{objRip.met_remain}',
                                hidden: '{isMetColumnHidden}',
                            },
                            stepValue: 0.1,
                        },
                        {
                            xtype: 'numberfield',
                            border: true,
                            cls: 'my-textfield',
                            margin: 1,
                            itemId: 'yOriginTxtRip',
                            // label: 'Màu:',
                            // labelWidth: 85,
                            flex: 1,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Số còn (Y)',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                // value: '{yOriginTxtRip}',
                                value: '{objRip.yds_remain}',
                                hidden: '{isYdsColumnHidden}',
                            },
                            stepValue: 0.1,
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
        }
    ]
});