Ext.define('GSmartApp.view.invoice.InvoiceEdit_M', {
	extend: 'Ext.container.Container',
	xtype: 'InvoiceEdit_M',
	controller: 'InvoiceEdit_M_Controller',
	requires: ['Ext.form.field.Hidden', 'Ext.form.field.Date'],
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	items: [{
        layout: 'hbox',
        items:[{
            xtype: 'textfield',
            fieldLabel: 'Số hóa đơn',
            width: 280,
            margin: '0 5 0 5',
            readOnly: true,
            bind: {
                value: '{invoice.invoicenumber}'
            }
        },{
            xtype: 'datefield',
            editable: false,
            format: 'd/m/Y',
            altFormats: "Y-m-d\\TH:i:s.uO",
            fieldLabel: 'Ngày hóa đơn',
            margin: '0 5 0 0',
            width: 280,
            bind: {
                value: '{invoice.invoicedate}'
            }
        },{
            xtype: 'datefield',
            editable: false,
            format: 'd/m/Y',
            altFormats: "Y-m-d\\TH:i:s.uO",
            fieldLabel: 'Ngày rời cảng',
            margin: '0 5 0 0',
            width: 280,
            bind: {
                value: '{invoice.shipdatefrom}'
            }
        },{
            xtype: 'datefield',
            editable: false,
            format: 'd/m/Y',
            margin: '0 5 0 0',
            altFormats: "Y-m-d\\TH:i:s.uO",
            fieldLabel: 'Ngày cập cảng',
            flex: 1,
            bind: {
                value: '{invoice.shipdateto}'
            }
        }]
    },{
        layout: 'hbox',
        items:[{
            xtype:'combo',
            fieldLabel: 'Nhà cung cấp',
            margin: '0 5 0 5',
            bind:{
                store: '{OrgProviderStore}',
                value: '{invoice.org_prodviderid_link}'
            },
            valueField: 'id',
            displayField: 'name',
            width: 565,
            queryMode: 'local'
        },{
            xtype:'combo',
            fieldLabel: 'Đơn vị nhập',
            bind:{
                store: '{OrgToStore}',
                value: '{invoice.orgid_to_link}'
            },
            valueField: 'id',
            displayField: 'name',
            flex: 1,
            queryMode: 'local'
        }]
    },{
        layout: 'hbox',
        items:[{
            xtype:'combo',
            fieldLabel: 'Cảng xếp hàng',
            bind:{
                store: '{PortFromStore}',
                value: '{invoice.org_portfromid_link}'
            },
            valueField: 'id',
            displayField: 'name',
            width: 565,
            margin: '0 5 0 5',
            queryMode: 'local'
        },{
            xtype:'combo',
            fieldLabel: 'Cảng dỡ hàng',
            bind:{
                store: '{PortToStore}',
                value: '{invoice.org_porttoid_link}'
            },
            valueField: 'id',
            displayField: 'name',
            flex: 1,
            margin:'0 5 0 0',
            queryMode: 'local'
        }]
    },
    {
        layout: 'hbox',
        items:[{
            xtype: 'textfield',
            fieldLabel: 'Số tờ khai',
            margin: '0 5 0 5',
            width: 280,
            bind: {
                value: '{invoice.custom_declaration}'
            }
        },{
            xtype: 'datefield',
            editable: false,
            format: 'd/m/Y',
            altFormats: "Y-m-d\\TH:i:s.uO",
            fieldLabel: 'Ngày tờ khai',
            margin: '0 5 0 0',
            width: 280,
            bind: {
                value: '{invoice.declaration_date}'
            }
        },{
            xtype: 'textfield',
            fieldLabel: 'Người giao',
            margin:'0 5 0 0',
            flex : 1,
            bind: {
                value: '{invoice.shippersson}'
            }
        }]
    },{
        layout: 'hbox',
        items:[{
            xtype: 'textfield',
            fieldLabel: 'Ghi chú',
            margin: '0 5 0 5',
            flex: 1,
            bind: {
                value: '{invoice.extrainfo}'
            }
        }]
    }]
});

