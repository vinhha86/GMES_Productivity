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
            editable: false,
            altFormats: "Y-m-d\\TH:i:s.uO",
            itemId: 'date_start',
            bind: {
                value: '{sch.StartDate}'
            }
        },{
            xtype: 'datefield',
            margin: 5,
            fieldLabel: 'Kết thúc',
            editable: false,
            format: 'd/m/Y',
            altFormats: "Y-m-d\\TH:i:s.uO",
            itemId: 'date_end',
            bind: {
                value: '{sch.EndDate}'
            }
        }]
    },{
        layout: 'hbox',
        items:[{
            xtype: 'textfield',
            margin: 5,
            fieldLabel: 'Số ngày',
            itemId: 'duration',
            maskRe: /[0-9.]/,
            bind: {
                value: '{sch.duration}'
            }
        },{
            xtype: 'textfield',
            margin: 5,
            fieldLabel: 'Năng suất',
            itemId: 'productivity',
            maskRe: /[0-9.]/,
            bind: {
                value: '{sch.productivity}'
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