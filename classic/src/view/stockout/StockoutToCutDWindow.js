Ext.define('GSmartApp.view.stockout.StockoutToCutDWindow', {
    extend: 'Ext.window.Window',
    xtype: 'stockouttocutdwindow',
    requires: [
        'Ext.grid.Panel'
    ],
    viewModel: 'stockouttocutd',
    controller: 'stockouttocutd',
    title: '',
    header: false,
    width: 950,
    height: 500,
    margin:10,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'stockouttocutdavailable',
            reference: 'stockouttocutdavailable',
            padding: 5,
            flex: 1
        },
        {
            xtype: 'panel',
            width: 40,
            layout: 'center',
            items:[
                {
                    xtype: 'container',
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'button',
                            tooltip: 'Thêm vào danh sách xuất kho',
                            //margin: '0 0 20 0',
                            iconCls: 'x-fa fa-arrow-right',
                            weight: 30,
                            handler: 'onAddPklistToStockout'
                        },
                        {
                            xtype: 'button',
                            tooltip: 'Hủy khỏi danh sách xuất kho',
                            margin: '10 0 0 0',
                            iconCls: 'x-fa fa-arrow-left',
                            weight: 30,
                            handler: 'onRemovePklistFromStockout'
                        }       
                    ]
                }
               
            ]
        },
        {
            xtype: 'stockouttocutpklist',
            reference: 'stockouttocutpklist',
            padding: 5,
            flex: 1
        }
    ],
    fbar: [{
        minWidth: 80,
        text: 'Đóng',
        handler: 'onCloseButton'
    }],    
    listeners: {
        close: 'onClose',
        activate: 'onActivate'
    }       
});
