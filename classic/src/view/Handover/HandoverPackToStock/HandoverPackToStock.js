Ext.define('GSmartApp.view.handover.HandoverPackToStock', {
    extend: 'Ext.form.Panel',
    xtype: 'handover_pack_tostock',
    id: 'handover_pack_tostock',
    reference: 'handover_pack_tostock',
    layout: 'border',
    items: [
    {
        region: 'center',
        border: false,
        xtype: 'HandoverList',
        id: 'handover_pack_tostocklist'
    }],
});

