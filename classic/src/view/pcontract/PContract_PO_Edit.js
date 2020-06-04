Ext.define('GSmartApp.view.planporder.PContract_PO_Edit', {
    extend: 'Ext.form.Panel',
    xtype: 'PContract_PO_Edit',
    layout: 'vbox',
    controller: 'PContract_PO_Edit_Controller',
    // viewModel: {
    //     type: 'PlanEdit_ViewModel'
    // },
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
                value: '{plan.plan_date_start}'
            }
        },{
            xtype: 'datefield',
            margin: 5,
            fieldLabel: 'Kết thúc',
            format: 'd/m/Y',
            altFormats: "Y-m-d\\TH:i:s.uO",
            itemId: 'date_end',
            bind: {
                value: '{plan.plan_date_end}'
            }
        }]
    },{
        layout: 'hbox',
        items:[{
            xtype: 'textfield',
            margin: 5,
            fieldLabel: 'Số lượng',
            maskRe: /[0-9.]/,
            bind: {
                value: '{plan.plan_amount}'
            }
        },{
            xtype: 'combo',
            margin: 5,
            fieldLabel: 'Đơn vị tính',
            bind: {
                store: '{UnitStore}',
                value: '{plan.unitid_link}'
            },
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id'
        }]
    }, {
        layout: 'hbox',
        items:[{
            xtype:'textfield',
            width: 560,
            margin: 5,
            fieldLabel: 'Ghi chú',
            bind: {
                value: '{plan.comment}'
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