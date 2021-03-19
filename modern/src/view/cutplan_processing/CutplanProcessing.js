Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing', {
    extend: 'Ext.form.Panel',
    xtype: 'cutplan_processing',
    id: 'cutplan_processing',
    reference: 'cutplan_processing',
    viewModel: {
        type: 'CutplanProcessing_ViewModel'
    },
    controller: 'CutplanProcessing_Controller',

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
                        // change : 'loadData'
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
                        // change : 'loadData'
                    }
                }
            ]
        },
        {
            margin: 1,
            flex: 1,
            xtype: 'CutplanProcessing_List',
        },
    ],
    tbar: [{
        xtype:'button',
        iconCls: 'x-fa fa-arrow-left',
        itemId:'btnBack',
        ui: 'action',
    },
    '->'
    ,
    {
        xtype:'button',
        iconCls: 'x-fa fa-plus',
        itemId:'btnThem',
        ui: 'action',
    },
    // {
    //     xtype: 'button',
    //     // margin: 3,
    //     // text: 'Lập phiếu mới',
    //     iconCls: 'x-fa fa-plus',
    //     ui: 'action',
    //     menu: [
    //         {
    //             itemId: 'btnNhapMuaMoi', // id:1
    //             // iconCls: 'fa fa-file-pdf-o greenIcon',
    //             text: 'Nhập mua mới',
    //             handler: 'onNhapMuaMoi'
    //         },
    //         {
    //             itemId: 'btnNhapDieuChuyen', // id:2
    //             // iconCls: 'fa fa-file-pdf-o greenIcon',
    //             text: 'Nhập điều chuyển',
    //             // handler: 'onNhapMuaMoi'
    //         },
    //         {
    //             itemId: 'btnNhapGiaCong', // id:4
    //             // iconCls: 'fa fa-file-pdf-o greenIcon',
    //             text: 'Nhập vải trả lại từ gia công',
    //             // handler: 'onNhapMuaMoi'
    //         },
    //         {
    //             itemId: 'btnNhapToCat', // id:3
    //             // iconCls: 'fa fa-file-pdf-o greenIcon',
    //             text: 'Nhập vải thừa từ tổ cắt',
    //             // handler: 'onNhapMuaMoi'
    //         },
    //         {
    //             itemId: 'btnNhapMau', // id:6
    //             // iconCls: 'fa fa-file-pdf-o greenIcon',
    //             text: 'Nhập mẫu',
    //             // handler: 'onNhapMuaMoi'
    //         },
    //         {
    //             itemId: 'btnNhapCungCap', // id:5
    //             // iconCls: 'fa fa-file-pdf-o greenIcon',
    //             text: 'Nhập cấp bù từ nhà cung cấp',
    //             // handler: 'onNhapMuaMoi'
    //         },
    //     ],
    //     // bind: {
    //     //     hidden: '{isNhapmoi}'
    //     // }
    // }
]
});
