Ext.define('GSmartApp.view.porders.POrder_List.POrder_List_GrantView', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrder_List_GrantView',
    id: 'POrder_List_GrantView',
    IdPOrder: 0,
    // viewModel: {
    //     type: 'SizesetViewModel'
    // },
    controller: 'POrder_List_GrantViewController',
    reference: 'POrder_List_GrantView',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    features: [{
        ftype: 'summary',
        groupHeaderTpl: 'Tổng',
        dock: 'bottom'
    }],
    bind: {
        store: '{POrder_ListGrantStore}'
    },
    title: 'Danh sách tổ chuyền',
    columns: [{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Tổ',
        dataIndex: 'granttoorgname',
        flex: 1,
    }, {
        text: 'Ngày vào chuyền',
        dataIndex: 'start_date_plan',
        renderer: Ext.util.Format.dateRenderer('d/m/Y'),
        // flex: 1,
    }, {
        text: 'Ngày ra chuyền',
        dataIndex: 'finish_date_plan',
        renderer: Ext.util.Format.dateRenderer('d/m/Y'),
        // flex: 1
    }, {
        text: 'Số lượng',
        dataIndex: 'grantamount',
        renderer: function(value){
            return Ext.util.Format.number(parseFloat(value), '0,000');
        },
        summaryType: 'sum',
        summaryRenderer: 'renderSum',
        flex: 1,
        align: 'end'
    }]
});

