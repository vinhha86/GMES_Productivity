Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing_Edit.CutplanProcessing_Edit_M', {
	extend: 'Ext.container.Container',
	xtype: 'CutplanProcessing_Edit_M',
    itemId: 'CutplanProcessing_Edit_M',
	controller: 'CutplanProcessing_Edit_M_Controller',
	requires: ['Ext.form.field.Hidden', 'Ext.form.field.Date'],
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	items: [
        {
            layout: 'hbox',
            width: '100%',
            items: [
                {
                    layout: 'hbox',
                    margin: 2,
                    flex : 1,
                    // width: '100%',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: "Lệnh SX",
                            // allowBlank: false,
                            itemId: 'pordercode',
                            blankText: 'Không được để trống',
                            bind: {
                                // value: '{pordercode}'
                            },
                            labelWidth: 80,
                            flex: 1,
                            enableKeyEvents : true,
                            listeners: {
                                // keypress: 'onPressEnterPordercode'
                            }
                        },
                        {
                            xtype:'button',
                            margin: '0 0 0 2',
                            itemId:'btnPlus',
                            iconCls: 'x-fa fa-plus',
                            bind: {
                                // visible: '{isCreateNew}'
                            }
                        },
                        {
                            xtype:'button',
                            margin: '0 0 0 2',
                            itemId:'btnSearch',
                            iconCls: 'x-fa fa-search',
                            bind: {
                                // visible: '{isCreateNew}'
                            }
                        }
                    ],
                },
                {
                    xtype:'combobox',
                    // itemId:'orgid_from_link',
                    bind:{
                        // store:'{ListOrgStore_From}',
                        // value: '{currentRec.orgid_from_link}',
                    },
                    fieldLabel: 'Mã vải',
                    displayField: 'nameParent',
                    valueField: 'id',
                    queryMode: 'local',
                    // editable: false,
                    allowBlank: false,
                    // readOnly: true,
                    margin: 2,
                    // cls: 'notEditable',
                    labelWidth: 80,
                    flex: 1,
                    // width: 250
                },
                {
                    xtype: 'datefield',
                    margin: 2,
                    // cls: 'notEditable',
                    reference: 'golivedate',
                    fieldLabel: "Ngày",
                    // allowBlank: false,
                    itemId: 'golivedate',
                    bind: {
                        // value: '{currentRec.handover_date}',
                        // editable: '{isEditable}',
                        // readOnly: '{isReadOnly}',
                    },
                    format: 'd/m/Y',
                    labelWidth: 80,
                    flex: 1,
                    // width: 250
                },
                {
                    xtype:'combobox',
                    // itemId:'orgid_from_link',
                    bind:{
                        // store:'{ListOrgStore_From}',
                        // value: '{currentRec.orgid_from_link}',
                    },
                    fieldLabel: 'Bàn cắt',
                    displayField: 'nameParent',
                    valueField: 'id',
                    queryMode: 'local',
                    // editable: false,
                    allowBlank: false,
                    // readOnly: true,
                    margin: 2,
                    // cls: 'notEditable',
                    labelWidth: 80,
                    flex: 1,
                    // width: 250
                },
            ]
        },
        {
            layout: 'hbox',
            width: '100%',
            items: [
                {
                    xtype:'combobox',
                    // itemId:'orgid_from_link',
                    bind:{
                        // store:'{ListOrgStore_From}',
                        // value: '{currentRec.orgid_from_link}',
                    },
                    fieldLabel: 'Màu SP',
                    displayField: 'nameParent',
                    valueField: 'id',
                    queryMode: 'local',
                    // editable: false,
                    allowBlank: false,
                    // readOnly: true,
                    margin: 2,
                    // cls: 'notEditable',
                    labelWidth: 80,
                    flex: 1,
                    // width: 250
                },
                {
                    xtype:'combobox',
                    // itemId:'orgid_from_link',
                    bind:{
                        // store:'{ListOrgStore_From}',
                        // value: '{currentRec.orgid_from_link}',
                    },
                    fieldLabel: 'Sơ đồ cắt',
                    displayField: 'nameParent',
                    valueField: 'id',
                    queryMode: 'local',
                    // editable: false,
                    allowBlank: false,
                    // readOnly: true,
                    margin: 2,
                    // cls: 'notEditable',
                    labelWidth: 80,
                    flex: 1,
                    // width: 250
                },
                {
                    xtype: 'textfield',
                    fieldLabel: "Dài bàn",
                    // allowBlank: false,
                    itemId: 'pordercode',
                    // blankText: 'Không được để trống',
                    bind: {
                        // value: '{pordercode}'
                    },
                    margin: 2,
                    labelWidth: 80,
                    flex: 1,
                    enableKeyEvents : true,
                    listeners: {
                        // keypress: 'onPressEnterPordercode'
                    }
                },
                {
                    margin: 2,
                    flex: 1,
                },
            ]
        },
    ]
});

