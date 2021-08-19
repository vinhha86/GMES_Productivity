Ext.define('GSmartApp.view.personel.Personnel_ListView', {
    extend: 'Ext.grid.Panel',
    xtype: 'Personnel_ListView',
    id: 'Personnel_ListView',
    controller: 'Personnel_ListView_Controller',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{Personnel_Store}'
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI',
        checkOnly: true
    },
    columns: [{
        xtype: 'actioncolumn',
        width: 28,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [
            {
                iconCls: 'x-fa fas fa-edit',
                handler: 'onEdit'
            },
        ]
    }, {
        text: 'STT',
        width: 40,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Họ và tên',
        dataIndex: 'fullname',
        flex: 1,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        },
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'personnel_name',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onpersonnel_name',
                buffer: 500
            }
        },
    }, {
        text: 'Mã NV',
        dataIndex: 'code',
        width: 100,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
       
    }, {
        text: 'Số CMT',
        dataIndex: 'idnumber',
        width: 100,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'Đơn vị trực thuộc',
        dataIndex: 'orgname',
        flex: 1,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'Cấp bậc',
        dataIndex: 'contractBuyerYear',
        width: 75,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'Chức vụ',
        dataIndex: 'contractTypeName',
        flex: 1,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        border: false,
        items: [{
            xtype: 'button',
            margin: 1,
            text: 'Thêm mới',
            iconCls: 'x-fa fa-plus',
            itemId: 'btnThemMoi_Personnel',
        }, {
            xtype: 'button',
            margin: 1,
            text: 'Print',
            iconCls: 'x-fa fa-print',
            itemId: 'btnPrint_Personnel',
        },{
            xtype: 'filefield',
            buttonOnly: true,
            hidden: true,
            itemId: 'fileUpload',
            width: 35,
            height: 32,
            margin: 3
        },
        {
            xtype: 'button',
            margin: 1,
            text: 'Upload',
            iconCls: 'x-fa fa-upload',
            itemId: 'splbtn_Upload',
            tooltip: 'Upload nhân viên',
        }
        
        , '->', {
            xtype: 'checkbox',
            margin: '1 5 1 1',
            boxLabel: 'Xem tất cả',
            labelAlign: 'right',
            bind: {
                value: '{isviewall}',
                disabled: '{isdisabled}'
            }
        }]
    }
    ]
});

