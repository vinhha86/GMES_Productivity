Ext.define('GSmartApp.view.handovercuttoprint.HandoverCutToPrintDetail_Info', {
    extend: 'Ext.form.Panel',
    xtype: 'HandoverCutToPrintDetail_Info',
    id: 'HandoverCutToPrintDetail_Info',
    // controller: 'POrder_InfoViewController',
    reference: 'HandoverCutToPrintDetail_Info',
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
                layout: 'hbox',
                border: false,
                margin: 2,
                flex : 1,
                // width: '100%',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: "Mã lệnh",
                    // allowBlank: false,
                    itemId: 'pordercode',
                    blankText: 'Không được để trống',
                    bind: {
                        value: '{pordercode}'
                    },
                    labelWidth: 80,
                    flex: 1,
                    enableKeyEvents : true,
                    listeners: {
                        keypress: 'onPressEnterPordercode'
                    }
                },{
                    xtype:'button',
                    margin: '0 0 0 2',
                    itemId:'btnPlus',
                    iconCls: 'x-fa fa-plus',
                    bind: {
                        visible: '{isCreateNew}'
                    }
                },{
                    xtype:'button',
                    margin: '0 0 0 2',
                    itemId:'btnSearch',
                    iconCls: 'x-fa fa-search',
                    bind: {
                        visible: '{isCreateNew}'
                    }
                }]
            },
            {
                xtype: 'textfield',
                margin: 2,
                fieldLabel: 'Số phiếu',
                // allowBlank: false,
                blankText: 'Không được để trống',
                bind: {
                    value: '{currentRec.handover_code}'
                },
                labelWidth: 80,
                flex: 1,
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
                // allowBlank: false,
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
                fieldLabel: 'Nơi giao ('+ '<span style="color:red">*</span>' + ')',
                displayField: 'name',
                valueField: 'id',
                queryMode: 'local',
                // editable: false,
                allowBlank: false,
                // readOnly: true,
                margin: 2,
                labelWidth: 80,
                flex: 1,
                // width: 250
            },{
                xtype:'combobox',
                // itemId:'comboboxPordergrant',
                bind:{
                    store:'{ListOrgStore_Print}',
                    value: '{currentRec.orgid_to_link}'
                },
                fieldLabel: 'Nơi nhận ('+ '<span style="color:red">*</span>' + ')',
                displayField: 'name',
                valueField: 'id',
                queryMode: 'local',
                // editable: false,
                allowBlank: false,
                margin: 2,
                labelWidth: 80,
                flex: 2,
                // width: 250
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
                // allowBlank: false,
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