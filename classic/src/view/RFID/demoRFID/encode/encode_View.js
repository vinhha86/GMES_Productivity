Ext.define('GSmartApp.view.RFID.demoRFID.encode.encode_View', {
    extend: 'Ext.form.Panel',
    xtype: 'encode_View',
    id: 'encode_View',
    controller: 'encode_ViewController',
    items: [{
        region: 'west',
        xtype: 'inv_view',
        border: true,
        margin: 1,
        width: '30%'
    }, {
        region: 'center',
        xtype: 'inv_detail_View',
        border: true,
        margin: 1
    }]
});

