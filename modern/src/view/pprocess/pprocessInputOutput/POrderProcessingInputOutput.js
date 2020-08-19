Ext.define('GSmartApp.view.pprocess.pprocessInputOutput.POrderProcessingInputOutput', {
    extend: 'Ext.form.Panel',
    xtype: 'POrderProcessingInputOutput',
    reference:'POrderProcessingInputOutput',
    // controller: 'POrderProcessingInputOutputController',
	// viewModel: {
    //     type: 'POrderProcessingViewModel'
    // },    
    header: false,
    bodyPadding: 0,
    defaults: {
        margin:'0 0 10 0'
    },
    layout: 'hbox',

    items: [{
        // Vào chuyền
        layout: 'vbox',
        flex: 2,
        items: [{
            xtype: 'label',
            html: 'Vào chuyền:'
        },{
            layout: 'hbox',
            defaults: {
                margin:'2 2 2 2'
            },
            items: [{
                xtype: 'numberfield',
                reference: 'io_amountinput',
                bind: {
                    value: '{amountinput}'
                },
                minValue: 0,
                editable: false,
                readOnly: true,
                textAlign: 'right',
                flex: 1,
                enableKeyEvents: true,
                listeners: {
                    // change: 'onIo_amountinputChange',
                }
            },{
                xtype: 'numberfield',
                reference: 'io_amountinputsum',
                bind: {
                    value: '{amountinputsum}'
                },
                minValue: 0,
                editable: false,
                readOnly: true,
                textAlign: 'right',
                flex: 1
            }]
        },{
            layout: 'hbox',
            defaults: {
                margin:'2 2 2 2'
            },
            items: [{
                xtype: 'button',
                text: '+1',
                flex: 1,
                bind: {
                    disabled: '{isbtnDisabled}'
                },
                listeners:{
                    tap: 'onInputTap'
                }
            },{
                xtype: 'button',
                text: '+10',
                flex: 1,
                bind: {
                    disabled: '{isbtnDisabled}'
                },
                listeners:{
                    tap: 'onInputTap'
                }
            }]
        },{
            layout: 'hbox',
            defaults: {
                margin:'2 2 2 2'
            },
            items: [{
                xtype: 'button',
                text: '-1',
                flex: 1,
                bind: {
                    disabled: '{isbtnDisabled}'
                },
                listeners:{
                    tap: 'onInputTap'
                }
            },{
                xtype: 'button',
                text: '-10',
                flex: 1,
                bind: {
                    disabled: '{isbtnDisabled}'
                },
                listeners:{
                    tap: 'onInputTap'
                }
            }]
        },{
            // Kế hoạch ngày
            layout: 'hbox',
            defaults: {
                margin:'2 2 2 2'
            },
            items: [{
                xtype: 'label',
                html: 'KH ngày:',
                flex: 1
            },{
                xtype: 'numberfield',
                reference: 'io_amounttarget',
                // label: 'KH ngày:',
                bind: {
                    value: '{amounttarget}'
                },
                minValue: 0,
                editable: false,
                readOnly: true,
                textAlign: 'right',
                flex: 1
            }]
        }]
    },{
        // Ra chuyền
        layout: 'vbox',
        flex: 2,
        items: [{
            xtype: 'label',
            html: 'Ra chuyền:'
        },{
            layout: 'hbox',
            defaults: {
                margin:'2 2 2 2'
            },
            items: [{
                xtype: 'numberfield',
                reference: 'io_amountoutput',
                bind: {
                    value: '{amountoutput}'
                },
                minValue: 0,
                editable: false,
                readOnly: true,
                textAlign: 'right',
                flex: 1
            },{
                xtype: 'numberfield',
                reference: 'io_amountoutputsum',
                bind: {
                    value: '{amountoutputsum}'
                },
                minValue: 0,
                editable: false,
                readOnly: true,
                textAlign: 'right',
                flex: 1
            }]
        },{
            layout: 'hbox',
            defaults: {
                margin:'2 2 2 2'
            },
            items: [{
                xtype: 'button',
                text: '+1',
                flex: 1,
                bind: {
                    disabled: '{isbtnDisabled}'
                },
                listeners:{
                    tap: 'onOutputTap'
                }
            },{
                xtype: 'button',
                text: '+10',
                flex: 1,
                bind: {
                    disabled: '{isbtnDisabled}'
                },
                listeners:{
                    tap: 'onOutputTap'
                }
            }]
        },{
            layout: 'hbox',
            defaults: {
                margin:'2 2 2 2'
            },
            items: [{
                xtype: 'button',
                text: '-1',
                flex: 1,
                bind: {
                    disabled: '{isbtnDisabled}'
                },
                listeners:{
                    tap: 'onOutputTap'
                }
            },{
                xtype: 'button',
                text: '-10',
                flex: 1,
                bind: {
                    disabled: '{isbtnDisabled}'
                },
                listeners:{
                    tap: 'onOutputTap'
                }
            }]
        }]
    },]
});