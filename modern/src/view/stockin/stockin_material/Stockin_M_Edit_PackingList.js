Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_PackingList', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockin_M_Edit_PackingList',
    id: 'Stockin_M_Edit_PackingList',
    reference: 'Stockin_M_Edit_PackingList',
    viewModel: {
        type: 'Stockin_M_Edit_PackingListViewModel'
    },
    controller: 'Stockin_M_Edit_PackingListController',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    requires: [
        'Ext.Toast'
    ],

    items: [
        {
            xtype: 'container',
            bind:{
                html: '<div class="content">' +
                    '<div class="content1">' +
                    '<div class="content1-sub1">Mã hàng: <b>{stockinD.skucode}</b></div>' +
                    '<div class="content1-sub2">Màu: {stockinD.color_name}</div>' +
                    '</div>' +

                    '<div class="content2">Tên hàng: {stockinD.skucode}</div>' +

                    '<div class="content1">' +
                    '<div class="content1-sub1">SL nhập: {stockinD.totalpackage}</div>' +
                    '<div class="content1-sub2">SL kiểm: {stockinD.totalpackagecheck}</div>' +
                    '</div>' +

                    '<div class="content1">' +
                    '<div class="content1-sub1">Met nhập: {stockinD.totalmet_origin}</div>' +
                    '<div class="content1-sub2">Met kiểm: {stockinD.totalmet_check}</div>' +
                    '</div>' +

                    '<div class="content1">' +
                    '<div class="content1-sub1">YDS nhập: {stockinD.totalydsorigin}</div>' +
                    '<div class="content1-sub2">YDS kiểm: {stockinD.totalydscheck}</div>' +
                    '</div>' +
                '</div>' +
                '<div class="tittle-bottom"><b>Danh sách Cây/Bó/Túi</b></div>' 
                ,
            },
        },
        {
            margin: 1,
            flex: 1,
            xtype: 'Stockin_M_Edit_PackingList_D',
        },
    ],
    tbar: [{
        xtype:'button',
        iconCls: 'x-fa fa-arrow-left',
        itemId:'btnBack',
        ui: 'action',
    },
    '->',
    // {
    //     xtype:'button',
    //     iconCls: 'x-fa fa-check',
    //     itemId:'btnHandover',
    //     ui: 'action',
    //     bind: {
    //         hidden: '{isBtnConfirmHidden}'
    //     }
    // },
    // {
    //     xtype:'button',
    //     iconCls: 'x-fa fa-trash',
    //     itemId:'btnDelete',
    //     ui: 'action',
    //     bind: {
    //         hidden: '{isBtnDeleteHidden}'
    //     }
    // },
    {
        xtype:'button',
        iconCls: 'x-fa fa-save',
        itemId:'btnLuu',
        ui: 'action',
    }
    ],
    bbar: [
        {
            xtype: 'textfield',
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
            xtype: 'textfield',
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
            xtype: 'textfield',
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
                cls: '{yTxtCls}',
            },
        },
        '->',
        {
            xtype:'button',
            iconCls: 'x-fa fa-check',
            itemId:'btnCheck',
            ui: 'action',
        },
    ]
});