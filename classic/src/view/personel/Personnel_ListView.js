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
    columns: [{
        xtype: 'actioncolumn',
        width: 28,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [
            {
                iconCls: 'x-fa fas fa-bars violetIcon',
                handler: 'onMenu_ContractList'
            },            
        ]
    },{
        text: 'STT',
        width: 40,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Họ và tên',
        dataIndex: 'fullname',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Giới tính',
        dataIndex: 'gender_name',
        width: 100,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },{
        text: 'Số CMT',
        dataIndex: 'idnumber',
        width: 100,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'Đơn vị trực thuộc',
        dataIndex: 'contractBuyerCode',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'Cấp bậc',
        dataIndex: 'contractBuyerYear',
        width: 75,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'Chức vụ',
        dataIndex: 'contractTypeName',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
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
        }]
    }
    ]
});

