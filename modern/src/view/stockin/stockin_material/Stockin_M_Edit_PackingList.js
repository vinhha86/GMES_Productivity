Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_PackingList', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockin_M_Edit_PackingList',
    id: 'Stockin_M_Edit_PackingList',
    reference: 'Stockin_M_Edit_PackingList',
    viewModel: {
        type: 'Stockin_M_Edit_PackingListViewModel'
    },
    controller: 'Stockin_M_Edit_PackingListController',
    // layout: {
    //     type: 'vbox',
    //     align: 'stretch'
    // },
    height: '100%',
    width: '100%',
    layout: 'vbox',

    scrollable:'vertical',
    requires: [
        'Ext.Toast'
    ],
    items: [
        {
            xtype: 'container',
            bind:{
                html: '<div class="content">' +
                    '<div class="content1">' +
                        '<div class="content1-sub1">Mã hàng: </div>'+
                        '<div class="content1-sub2"><b>{stockinD.skucode}</b></div>' +
                        '<div class="content1-sub1">Màu: </div>'+
                        '<div class="content1-sub2">{stockinD.color_name}</div>' +
                    '</div>' +

                    '<div class="content2">'+
                        '<div class="content2-sub1">Tên hàng: </div>'+
                        '<div class="content2-sub2">{stockinD.skuname}</div>'+
                    '</div>' +

                    // '<div class="content1">' +
                    //     '<div class="content1-sub1">SL nhập: {stockinD.totalpackage}</div>' +
                    //     '<div class="content1-sub2">SL kiểm: {stockinD.totalpackagecheck}</div>' +
                    // '</div>' +

                    '<div class="content1">' +
                        '<div class="content1-sub1">Cây nhập: </div>'+
                        '<div class="content1-sub2">{stockinD.totalpackage}</div>' +
                        '<div class="content1-sub1">Cây kiểm: </div>'+
                        '<div class="content1-sub2">{stockinD.totalpackagecheck}</div>' +
                    '</div>' +

                    // '<div class="content1">' +
                    //     '<div class="content1-sub1">Met nhập: {stockinD.totalmet_origin}</div>' +
                    //     '<div class="content1-sub2">Met kiểm: {stockinD.totalmet_check}</div>' +
                    // '</div>' +

                    '<div class="content1 unitid_link1{stockin.unitid_link}">' +
                        '<div class="content1-sub1">Dài nhập: </div>'+
                        '<div class="content1-sub2">{stockinD.totalmet_origin}</div>' +
                        '<div class="content1-sub1">Dài kiểm: </div>'+
                        '<div class="content1-sub2">{stockinD.totalmet_check}</div>' +
                    '</div>' +

                    // '<div class="content1">' +
                    //     '<div class="content1-sub1">YDS nhập: {stockinD.totalydsorigin}</div>' +
                    //     '<div class="content1-sub2">YDS kiểm: {stockinD.totalydscheck}</div>' +
                    // '</div>' +

                    '<div class="content1 unitid_link3{stockin.unitid_link}">' +
                        '<div class="content1-sub1">Dài nhập: </div>'+
                        '<div class="content1-sub2">{stockinD.totalydsorigin}</div>' +
                        '<div class="content1-sub1">Dài kiểm: </div>'+
                        '<div class="content1-sub2">{stockinD.totalydscheck}</div>' +
                    '</div>' +

                '</div>' +
                '<div class="tittle-bottom"><b>Danh sách Cây/Bó/Túi</b></div>' 
                ,
            },
        },
        {
            margin: 1,
            height: '100%',
            flex: 1,
            xtype: 'Stockin_M_Edit_PackingList_D',
        },

    ],
    tbar: [
        {
            xtype:'button',
            iconCls: 'x-fa fa-arrow-left',
            itemId:'btnBack',
            ui: 'action',
        },
        {
            xtype:'button',
            iconCls: 'x-fa fa-home',
            itemId:'btnHome',
            ui: 'action',
        },        
        '->',
        {
            xtype:'button',
            iconCls: 'x-fa fa-save',
            itemId:'btnLuu',
            ui: 'action',
        }
    ],
    bbar:[
        {
            xtype: 'container',
            flex:1,
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
                            itemId: 'lotnumberTxt',
                            // label: 'Màu:',
                            // labelWidth: 85,
                            flex: 1,
                            minWidth: 80,
                            maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Số LOT',
                            // editable: false,
                            // readOnly: true,
                            clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{lotnumberTxt}'
                            },
                            listeners: {
                                keyup: 'onlotnumberTxtKeyup',
                                buffer: 1000
                            }
                        },
                        {
                            xtype: 'numberfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'packageidTxt',
                            // label: 'Màu:',
                            // labelWidth: 85,
                            flex: 1,
                            minWidth: 80,
                            maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Số cây',
                            // editable: false,
                            // readOnly: true,
                            clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{packageidTxt}'
                            },
                            listeners: {
                                keyup: 'onpackageidTxtKeyup',
                                buffer: 1000
                            }
                        },
        
                        {
                            xtype: 'combobox',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'colorTxt',
                            flex: 1,
                            minWidth: 80,
                            maxWidth: 130,
                            displayField: 'value',
                            valueField: 'id',
                            bind:{
                                store:'{attributeValueStore}',
                            },
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
                            border: true,
                            cls: 'my-textfield',
                            margin: 1,
                            itemId: 'widthTxt',
                            // label: 'Màu:',
                            // labelWidth: 85,
                            flex: 1,
                            maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Khổ',
                            // editable: false,
                            // readOnly: true,
                            clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{widthTxt}'
                            },
                            listeners: {
                                keyup: 'onlotnumberTxtKeyup',
                                buffer: 1000
                            }
                        },
                        {
                            xtype: 'numberfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'mTxt',
                            // label: 'Màu:',
                            // labelWidth: 85,
                            flex: 1,
                            minWidth: 80,
                            maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Số M',
                            // editable: false,
                            // readOnly: true,
                            clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{mTxt}',
                                // cls: '{yTxtCls}',
                                hidden: '{isMetColumnHidden}',
                            },
                        },
                        {
                            xtype: 'numberfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'yTxt',
                            // label: 'Màu:',
                            // labelWidth: 85,
                            flex: 1,
                            minWidth: 80,
                            maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Số Y',
                            // editable: false,
                            // readOnly: true,
                            clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{yTxt}',
                                // cls: '{yTxtCls}',
                                hidden: '{isYdsColumnHidden}',
                            },
                        },
                        {
                            // xtype: 'numberfield',
                            margin: 1,
                            padding: 1,
                            border: true,
                            // cls: 'my-textfield',
                            // itemId: 'yTxt',
                            // label: 'Màu:',
                            // labelWidth: 85,
                            flex: 1,
                            minWidth: 80,
                            maxWidth: 130,
                            // textAlign: 'left',
                            // placeholder: 'Số Y',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            // bind: {
                                
                            // },
                            // hidden: true,
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    border: false,
                    width: '100%',
                    items:[
                        {
                            xtype: 'numberfield',
                            border: true,
                            cls: 'my-textfield',
                            margin: 1,
                            itemId: 'mOriginTxt',
                            // label: 'Màu:',
                            // labelWidth: 85,
                            flex: 1,
                            maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Dài phiếu',
                            // editable: false,
                            // readOnly: true,
                            clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{mOriginTxt}',
                                hidden: '{isMetColumnHidden}',
                            },
                        },
                        {
                            xtype: 'numberfield',
                            border: true,
                            cls: 'my-textfield',
                            margin: 1,
                            itemId: 'yOriginTxt',
                            // label: 'Màu:',
                            // labelWidth: 85,
                            flex: 1,
                            maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Dài phiếu',
                            // editable: false,
                            // readOnly: true,
                            clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{yOriginTxt}',
                                hidden: '{isYdsColumnHidden}',
                            },
                        },
                        {
                            xtype: 'numberfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'sampleCheckTxt',
                            // label: 'Màu:',
                            // labelWidth: 85,
                            flex: 1,
                            minWidth: 80,
                            maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Cắt mẫu',
                            // editable: false,
                            // readOnly: true,
                            clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{sampleCheckTxt}',
                            },
                        },
                        {
                            xtype:'button',
                            // text: 'Xác nhận',
                            flex: 1,
                            minWidth: 80,
                            maxWidth: 130,
                            margin: 1,
                            iconCls: 'x-fa fa-check',
                            itemId:'btnCheck',
                            ui: 'action',
                        },   
                    ]
                }
            ]
        }
    ]
});