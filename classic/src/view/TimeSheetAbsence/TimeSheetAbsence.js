Ext.define('GSmartApp.view.TimeSheetAbsence.TimeSheetAbsence', {
    extend: 'Ext.grid.Panel',
    xtype: 'TimeSheetAbsence',
    id: 'TimeSheetAbsence',
    viewModel: {
        type: 'TimeSheetAbsenceViewModel'
    },
    controller: 'TimeSheetAbsenceController',
    reference: 'TimeSheetAbsence',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{TimeSheetAbsenceStore}'
    },
    columns: [
    {
        xtype: 'actioncolumn',
        width: 50,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [{
            iconCls: 'x-fa fas fa-edit',
            tooltip: "Chi tiết",
            handler: 'onCapNhat',
        }, {
            iconCls: 'x-fa fas fa-trash',
            tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
            handler: 'onXoa',
        }]
    },{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Đơn vị',
        dataIndex: 'personnelOrgManagename',
        width: 100,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Mã NV',
        dataIndex: 'personnelCode',
        width: 80,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Họ tên',
        dataIndex: 'personnelFullname',
        width: 120,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Từ ngày',
        dataIndex: 'absencedate_from',
        flex: 1,
        // width: 130,
        align: 'center',
        renderer: Ext.util.Format.dateRenderer('d/m/Y H:i')
    }, {
        text: 'Đến ngày',
        dataIndex: 'absencedate_to',
        flex: 1,
        // width: 130,
        align: 'center',
        renderer: Ext.util.Format.dateRenderer('d/m/Y H:i')
    }, {
        text: 'Loại nghỉ',
        dataIndex: 'timesheetAbsenceType',
        width: 80,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Lý do',
        dataIndex: 'absence_reason',
        width: 80,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Người xác nhận',
        dataIndex: 'userApprove',
        width: 120,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Ngày xác nhận',
        dataIndex: 'timeapprove',
        flex: 1,
        // width: 130,
        align: 'center',
        renderer: Ext.util.Format.dateRenderer('d/m/Y H:m')
    }],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        border: false,
        items: [{
            xtype: 'button',
            margin: '5 1 5 1',
            text: 'Thêm mới',
            width: 105,
            iconCls: 'x-fa fa-plus',
            itemId: 'btnThemMoi',
        },{
            xtype: 'combo',
            labelWidth: 0,
            emptyText:'Đơn vị',
            bind: {
                store : '{ListOrgStore}'
            },
            valueField: 'id',
            displayField: 'name',
            itemId: 'orgFactoryList',
            queryMode: 'local',
            margin: '5 1 5 0',
            width: 100
        },{
            xtype:'textfield',
            labelWidth: 0,
            margin: '5 1 5 0',
            emptyText: "Mã nhân viên",
            itemId: 'personnelCode',
            width: 120
        },{
            xtype:'textfield',
            labelWidth: 0,
            margin: '5 1 5 0',
            emptyText: "Họ tên",
            itemId: 'personnelName',
            width: 120
        },{
            xtype: 'datefield',
            labelWidth: 0,
            emptyText:'Từ ngày',
            itemId: 'datefrom',
            reference: 'datefrom',
            format:'d/m/Y',
            margin: '5 1 5 0',
            width: 130
        },{
            xtype: 'datefield',
            labelWidth: 0,
            emptyText:'Đến ngày',
            itemId: 'dateto',
            reference: 'dateto',
            format:'d/m/Y',
            margin: '5 1 5 0',
            width: 130
        },{
            xtype: 'combo',
            labelWidth: 0,
            emptyText:'Loại nghỉ',
            bind: {
                store : '{TimeSheetAbsenceTypeStore}'
            },
            valueField: 'id',
            displayField: 'name',
            itemId: 'timeSheetAbsenceTypeList',
            queryMode: 'local',
            margin: '5 1 5 0',
            width: 130
        },{
            xtype: 'button',
            margin: '5 1 5 1',
            // text: 'Tìm kiếm',
            iconCls: 'x-fa fa-search',
            itemId: 'btnTimKiem'
        }]
    }, {
        dock: 'bottom',
        layout: 'hbox',
        xtype: 'toolbar',
        border: false,
        cls: 'botToolbar',
        items: [{
            xtype: 'textfield',
            value: 25,
            itemId: 'limitpage',
            maskRe: /[0-9]/,
            width: 180,
            selectOnFocus: true,
            margin: 5,
            fieldLabel: 'Số bản ghi/ Trang',
            labelWidth: 120
        }, '-', {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            flex: 1,
            nextText: 'Trang tiếp',
            prevText: 'Trang trước',
            afterPageText: '/ {0}',
            beforePageText: 'Trang',
            itemId: 'page',
            refreshText: 'Làm mới dữ liệu',
            border: false,
            bind: {
                store: '{TimeSheetAbsenceStore}'
            },
            emptyMsg: 'Không có kết quả tìm kiếm',
            lastText: 'Trang cuối',
            firstText: 'Trang đầu',
            displayMsg: 'Hiển thị {0} - {1} của {2}'
        }]
    }]
});

