Ext.define('GSmartApp.view.process_shipping.ProcessShippingMainView', {
    extend: 'Ext.form.Panel',
    xtype: 'ProcessShippingMainView',
    id: 'ProcessShippingMainView',
    itemId: 'ProcessShippingMainView',
    controller: 'ProcessShippingMainViewController',
    viewModel: {
        type: 'ProcessShippingMainViewModel'
    },
    layout: 'border',
    items: [
        {
            region: 'north',
            xtype: 'POLineView',
            height: '50%',
            margin: 1,
            border: true
        },
        {
            region: 'center',
            layout: 'border',
            items: [{
                region: 'west',
                xtype: 'POrderView',
                width: '35%',
                margin: 1,
                border: true
            }, {
                region: 'center',
                xtype: 'tabpanel',
                itemId: 'tabDetail',
                margin: 1,
                border: true,
                items: [{
                    title: 'Chi tiết lệnh',
                    xtype: 'form',
                    layout: 'border',
                    items: [{
                        region: 'west',
                        width: '50%',
                        xtype: 'POLineSKU',
                        margin: 1,
                        border: true
                    }, {
                        region: 'center',
                        xtype: 'POrderSKU',
                        border: true
                    }]
                }, {
                    title: 'Chi tiết tổ',
                    xtype: 'SizeBreakdown_Grant_MainView'
                }, {
                    title: 'Định mức',
                    xtype: 'POrderBom2View'
                }, {
                    title: 'Nguyên liệu',
                    xtype: 'Balance_mat_View'
                }, {
                    title: 'Phụ liệu',
                    xtype: 'Balance_Trim_View'
                }]
            }]
        }
    ],
})