Ext.define('GSmartApp.view.RFID.demoRFID.encode.encode_View', {
    extend: 'Ext.form.Panel',
    xtype: 'encode_View',
    id: 'encode_View',
    controller: 'encode_ViewController',
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
        dock: 'top',
        layout: 'hbox',
        border: true,
        items: [{
            xtype: 'combo',
            margin: 3,
            fieldLabel: 'Loại kho',
            displayField: 'name',
            valueField: 'id',
            bind: {
                store: '{StoreType}'
            }
        }, {
            xtype: 'button',
            margin: 3,
            text: 'In nhãn',
            iconCls: 'x-fa fa-print'
        }, {
            xtype: 'button',
            margin: 3,
            text: 'In nhãn & Mã hóa',
            iconCls: 'x-fa fa-print'
        }, {
            xtype: 'button',
            margin: 3,
            text: 'Mã hóa',
            iconCls: 'x-fa fa-print'
        }]
    }]
});

