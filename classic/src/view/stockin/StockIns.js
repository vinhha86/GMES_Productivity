Ext.define('GSmartApp.view.stockin.StockIns', {
    extend: 'Ext.Panel',
    xtype: 'stockins',
    controller: 'stockins',
    config: {
        route: null
    },

    eventedConfig: {
        /**
         * Make the config trigger an event on change to allow the controller to monitor it.
         * https://www.sencha.com/blog/using-sencha-ext-config/
         */
        route: null
    },
	layout: {
        type: 'vbox',
        align: 'left',
        pack: 'top'
    },

    platformConfig: {
        '!phone': {
            header: {
                hidden: true
            }
        }
    },

    cls: 'home',
    scrollable: 'y',
	
	items:[{
		margin:'10',
		xtype: 'formpanel',
		platformConfig: {
			 phone: {
				 width:'380'
			 }
		},
        reference: 'form',
        layout: 'vbox',
		items: [{
			xtype: 'dataview',
			inline: true,
			ui: 'default',
			store: 'StockinStore',
			selectable: {
				deselectable: false
			},
			itemTpl: '<div class="dataview-multisort-item">' +
						'<img height="100" draggable="false" src="resources/images/{icon}" />' +
						'<h3 style="text-align: center; ">{text}</h3>' +
					'</div>',
			listeners: {
				childtap: 'onMenuChildTap'
			}
		}]
	}],

    reset: function() {
        this.fireEvent('reset');
        return this;
    }
});

