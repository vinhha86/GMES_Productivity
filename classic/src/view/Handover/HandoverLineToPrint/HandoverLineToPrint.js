Ext.define('GSmartApp.view.handover.HandoverLineToPrint', {
    extend: 'Ext.form.Panel',
    xtype: 'handover_line_toprint',
    id: 'handover_line_toprint',
    reference: 'handover_line_toprint',
    layout: 'border',
    items: [
    {
        region: 'center',
        border: false,
        xtype: 'HandoverList',
        id: 'handover_line_toprintlist'
    }],
});

