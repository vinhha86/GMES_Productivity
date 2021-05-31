Ext.define('GSmartApp.view.RFID.demoRFID.inv.encode_detail_View', {
    extend: 'Ext.form.Panel',
    xtype: 'encode_detail_View',
    id: 'encode_detail_View',
    controller: 'encode_detail_ViewCotroller',
    viewModel: {
        type: 'inv_create_ViewModel'
    },
    layout: 'vbox',
    items: [{
        layout: 'hbox',
        items: [{
            xtype: 'textfield',
            margin: 3,
            fieldLabel: 'Tạo nhãn'
        }, {
            xtype: 'textfield',
            margin: 3,
            fieldLabel: 'Code'
        }]
    }, {
        layout: 'hbox',
        items: [{
            xtype: 'textfield',
            margin: 3,
            fieldLabel: 'Lot'
        }, {
            xtype: 'datefield',
            fieldLabel: 'Exp:',
            margin: 3,
            format: 'd/m/y',
            altFormats: "Y-m-d\\TH:i:s.uO",
            bind: {
                value: '{po.productiondate}'
            }
        }]
    }, {
        layout: 'hbox',
        items: [{
            xtype: 'textfield',
            margin: 3,
            fieldLabel: 'Qty',
            maskRe: /[0-9]/
        }]
    }],
    dockedItems: [{
        layout: 'hbox',
        border: false,
        dock: 'bottom',
        items: [{
            xtype: 'button',
            text: 'Thoát',
            margin: 3,
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close'
        }, {
            xtype: 'button',
            margin: 3,
            text: 'In nhãn',
            iconCls: 'x-fa fa-print'
        }]
    }]
})