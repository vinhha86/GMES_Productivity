Ext.define('GSmartApp.view.Schedule.Plan.Plan_porder_info', {
    extend: 'Ext.form.Panel',
    xtype: 'Plan_porder_info',
    layout: 'vbox',
    controller: 'Plan_porder_info_Controller',
    viewModel: {
        type: 'Plan_porder_info_ViewModel'
    },
    items:[{
        layout: 'hbox',
        items:[{
            xtype: 'datefield',
            margin: 5,
            fieldLabel: 'Bắt đầu',
            format: 'd/m/Y',
            altFormats: "Y-m-d\\TH:i:s.uO",
            itemId: 'date_start',
            bind: {
                value: '{startDate}'
            }
        },{
            xtype: 'datefield',
            margin: 5,
            fieldLabel: 'Kết thúc',
            format: 'd/m/Y',
            altFormats: "Y-m-d\\TH:i:s.uO",
            itemId: 'date_end',
            bind: {
                value: '{endDate}'
            }
        }]
    },{
        layout: 'hbox',
        items:[{
            xtype: 'textfield',
            margin: 5,
            fieldLabel: 'Số ngày',
            maskRe: /[0-9.]/,
            bind: {
                value: '{duration}'
            }
        },{
            xtype: 'textfield',
            margin: 5,
            fieldLabel: 'Năng suất',
            maskRe: /[0-9.]/,
            bind: {
                value: '{productivity}'
            }
        }]
    }],
    dockedItems:[{
        dock:'bottom',
        layout: 'hbox',
        items:[{
            flex:1
        },{
            xtype:'button',
            text: 'Lưu',
            margin: 5,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save'
        },{
            xtype: 'button',
            text: 'Thoát',
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close',
            margin: 5
        }]
    }]
})