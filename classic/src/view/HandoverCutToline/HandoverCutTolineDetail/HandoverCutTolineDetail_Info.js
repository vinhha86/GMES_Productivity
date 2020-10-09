Ext.define('GSmartApp.view.handovercuttoline.HandoverCutTolineDetail_Info', {
    extend: 'Ext.form.Panel',
    xtype: 'HandoverCutTolineDetail_Info',
    id: 'HandoverCutTolineDetail_Info',
    // controller: 'POrder_InfoViewController',
    reference: 'HandoverCutTolineDetail_Info',
    bodyPadding: 5,
    border: false,
    IdPOrder: 0,
    items: [{
        layout: 'vbox',
        border: false,
        width: '100%',
        items: [{
            layout: 'hbox',
            border: false,
            width: '100%',
            items: [
                {
                xtype:'combobox',
                // itemId:'txtstatus',
                bind:{
                    store:'{POrder_ListStore}',
                    value: '{currentRec.porderid_link}'
                },
                fieldLabel: "Mã lệnh",
                displayField: 'ordercode',
                valueField: 'id',
                queryMode: 'local',
                editable: false,
                allowBlank: false,
                // readOnly: true,
                margin: 2,
                labelWidth: 80,
                flex: 1,
                // width: 250
                listeners: {
                    // change: 'onChange',
                    select: 'onOrderCodeSelect'
                }
            },
            // {
            //     xtype: 'textfield',
            //     margin: 2,
            //     fieldLabel: "Mã lệnh",
            //     allowBlank: false,
            //     // itemId: 'contractcode',
            //     blankText: 'Không được để trống',
            //     bind: {
            //         value: '{porder.ordercode}'
            //     },
            //     labelWidth: 80,
            //     flex: 1,
            //     // width: 250
            // },
            {
                xtype: 'textfield',
                margin: 2,
                fieldLabel: "Số phiếu",
                allowBlank: false,
                // itemId: 'contractcode',
                blankText: 'Không được để trống',
                bind: {
                    value: '{currentRec.handover_code}'
                },
                labelWidth: 80,
                flex: 1,
                // width: 250
            },{
                xtype: 'datefield',
                margin: 2,
                reference: 'golivedate',
                fieldLabel: "Ngày xuất",
                allowBlank: false,
                itemId: 'golivedate',
                bind: {
                    value: '{currentRec.handover_date}'
                },
                format: 'd/m/Y',
                labelWidth: 80,
                flex: 1,
                // width: 250
            },{
                xtype:'combobox',
                // itemId:'txtstatus',
                bind:{
                    store:'{UserListStore}',
                    value: '{currentRec.handover_userid_link}'
                },
                fieldLabel: "Người giao",
                displayField: 'fullname',
                valueField: 'id',
                queryMode: 'local',
                editable: false,
                allowBlank: false,
                readOnly: true,
                margin: 2,
                labelWidth: 80,
                flex: 1,
                // width: 250
            }]
        },{
            layout: 'hbox',
            border: false,
            width: '100%',
            items: [{
                xtype:'combobox',
                // itemId:'txtstatus',
                bind:{
                    store:'{ListOrgStore}',
                    value: '{currentRec.orgid_from_link}'
                },
                fieldLabel: "Nơi giao",
                displayField: 'name',
                valueField: 'id',
                queryMode: 'local',
                editable: false,
                allowBlank: false,
                readOnly: true,
                margin: 2,
                labelWidth: 80,
                flex: 1,
                // width: 250
            },{
                xtype:'combobox',
                // itemId:'txtstatus',
                bind:{
                    store:'{POrderGrantStore}',
                    value: '{currentRec.pordergrantid_link}'
                },
                fieldLabel: "Nơi nhận",
                displayField: 'displayName',
                valueField: 'id',
                queryMode: 'local',
                // editable: false,
                allowBlank: false,
                margin: 2,
                labelWidth: 80,
                flex: 2,
                // width: 250
                listeners: {
                    // change: 'onChange',
                    select: 'onPOrderGrantSelect'
                }
            },{
                xtype:'combobox',
                // itemId:'txtstatus',
                bind:{
                    store:'{UserListStore}',
                    value: '{currentRec.receiver_userid_link}'
                },
                fieldLabel: "Người nhận",
                displayField: 'fullname',
                valueField: 'id',
                queryMode: 'local',
                // editable: false,
                allowBlank: false,
                margin: 2,
                labelWidth: 80,
                flex: 1,
                // width: 250
            }]
        },{
            layout: 'hbox',
            border: false,
            width: '100%',
            items: [{
                xtype: 'textfield',
                margin: 2,
                fieldLabel: "Lý do",
                // allowBlank: false,
                // itemId: 'contractcode',
                blankText: 'Không được để trống',
                bind: {
                    value: '{currentRec.reason}'
                },
                labelWidth: 80,
                flex: 1,
                // width: 250
            },{
                xtype: 'textfield',
                margin: 2,
                fieldLabel: "Ghi chú",
                // allowBlank: false,
                // itemId: 'contractcode',
                blankText: 'Không được để trống',
                bind: {
                    value: '{currentRec.extrainfo}'
                },
                labelWidth: 80,
                flex: 3,
                // width: 250
            }]
        }]
    }]
})