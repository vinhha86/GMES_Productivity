Ext.define('GSmartApp.view.Schedule.Plan.FilterBar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'FilterBar',
    controller: 'FilterBar_Controller',
    layout: 'hbox',
    items: [
        {
            xtype: 'button',
            tooltip: 'Kế hoạch giao hàng',
            iconCls: 'x-fa fa-shopping-basket',
            weight: 30,
            bind : {
                hidden: 'isHidden_KHGH'
            }
        },
        {
            xtype: 'button',
            tooltip: 'Tổng hợp CMP',
            iconCls: 'x-fa fa-dollar',
            weight: 30,
            bind : {
                hidden: 'isHidden_CMP'
            }
        },
        {
            xtype: 'button',
            tooltip: 'Tổng hợp Salary Fund',
            iconCls: 'x-fa fa-money',
            weight: 30,
            bind : {
                hidden: 'isHidden_Salary'
            }
        },
        {
            xtype: 'button',
            tooltip: 'Phân lệnh vào tổ chuyền',
            text: 'Phân chuyền',
            iconCls: 'x-fa fa-sliders',
            weight: 30,
            handler: 'onGrantToOrgTap',
        },
        {
            xtype: 'button',
            tooltip: 'Khung nhìn khách',
            text: 'Khung nhìn khách',
            iconCls: 'x-fa fa-sliders',
            weight: 30,
            handler: 'onGuessView',
        },
        {
            xtype: 'datefield',
            weight: 30,
            fieldLabel: 'Bắt đầu',
            format: 'd/m/Y',
            altFormats: "Y-m-d\\TH:i:s.uO",
            labelWidth: 60,
            width: 190,
            bind: {
                value: '{schedule.startDate}'
            }
        },
        {
            xtype: 'datefield',
            weight: 30,
            fieldLabel: 'Kết thúc',
            format: 'd/m/Y',
            altFormats: "Y-m-d\\TH:i:s.uO",
            labelWidth: 60,
            width: 190,
            bind: {
                value: '{schedule.endDate}'
            }
        },
        {
            xtype: 'button',
            tooltip: 'Tìm kiếm',
            // text: 'Zoom in',
            iconCls: 'x-fa fa-search',
            weight: 30,
            handler: 'onSearch'
        },
        '->'
        ,{
            xtype  : 'button',
            iconCls: 'fa fa-file-pdf-o',
            text   : 'PDF'
        },{
            xtype: 'button',
            tooltip: 'Phóng to',
            // text: 'Zoom in',
            iconCls: 'x-fa fa-search-plus',
            weight: 30
        },
        {
            xtype: 'button',
            tooltip: 'Thu nhỏ',
            // text: 'Zoom out',
            iconCls: 'x-fa fa-search-minus',
            weight: 30
        }
    ]
})