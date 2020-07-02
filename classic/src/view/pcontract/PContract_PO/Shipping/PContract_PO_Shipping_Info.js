Ext.define('GSmartApp.view.pcontract.PContract_PO_Shipping_Info', {
    extend: 'Ext.form.Panel',
    xtype: 'PContract_PO_Shipping_Info',
    layout: 'vbox',
    poid: null,
    items: [
        {
            xtype: 'datefield',
            labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
            fieldStyle: 'font-size:11px;',
            fieldLabel: 'Ngày giao:',
            reference: 'poinfo_shipdate',
            labelAlign: 'left',
            labelWidth: 75,
            width: '100%',
            margin: 1,
            format: 'd/m/Y',
            altFormats: "Y-m-d\\TH:i:s.uO",
            bind: {
                value: '{shipping.shipdate}'
            },
        },           
        {
            xtype: 'numberfield',
            labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
            fieldStyle: 'font-size:11px;text-align:right',
            fieldLabel: 'Số lượng:',
            hideTrigger:true,
            labelAlign: 'left',
            labelWidth: 75,
            width: '100%',
            margin: 1,
            bind: {
                value: '{shipping.shipamount}'
            }
        },
        {
            xtype: 'combo',
            labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
            fieldStyle: 'font-size:11px;',            
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            margin: 1,
            fieldLabel: "Cảng đi:",
            labelAlign: 'left',
            labelWidth: 75,
            bind: {
                value: '{shipping.portfromid_link}',
                store: '{EndBuyer}'
            },
            itemId: 'portfromid_link',
            width: '100%'
        },    
        {
            xtype: 'combo',
            labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
            fieldStyle: 'font-size:11px;',            
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            margin: 1,
            fieldLabel: "Cảng đến:",
            labelAlign: 'left',
            labelWidth: 75,
            bind: {
                value: '{shipping.porttoid_link}',
                store: '{EndBuyer}'
            },
            itemId: 'porttoid_link',
            width: '100%'
        },      
        {
            region: 'center',
            labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
            fieldStyle: 'font-size:11px;',
            xtype: 'textarea',
            labelWidth: 75,
            labelAlign: 'left',
            fieldLabel:'Đóng gói:',
            width: '100%',
            margin: 1,
            bind: {
                value: '{shipping.packingnotice}'
            }
        },
    ]
})