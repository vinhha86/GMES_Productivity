/**
 * @class Ext.ux.grid.Printer
 * @author Ed Spencer (edward@domine.co.uk)
 * Helper class to easily print the contents of a grid. Will open a new window with a table where the first row
 * contains the headings from your column model, and with a row for each item in your grid's store. When formatted
 * with appropriate CSS it should look very similar to a default grid. If renderers are specified in your column
 * model, they will be used in creating the table. Override headerTpl and bodyTpl to change how the markup is generated
 * 
 * Usage:
 * 
 * 1 - Add Ext.Require Before the Grid code
 * Ext.require([
 *   'Ext.ux.grid.GridPrinter',
 * ]);
 * 
 * 2 - Declare the Grid 
 * var grid = Ext.create('Ext.grid.Panel', {
 *   columns: //some column model,
 *   store   : //some store
 * });
 * 
 * 3 - Print!
 * Ext.ux.grid.Printer.mainTitle = 'Your Title here'; //optional
 * Ext.ux.grid.Printer.print(grid);
 * 
 * Original url: http://edspencer.net/2009/07/printing-grids-with-ext-js.html
 * 
 * Modified by Loiane Groner (me@loiane.com) - September 2011 - Ported to Ext JS 4
 * http://loianegroner.com (English)
 * http://loiane.com (Portuguese)
 * 
 * Modified by Bruno Sales - August 2012
 * 
 * Modified by Paulo Goncalves - March 2012
 * 
 * Modified by Beto Lima - March 2012
 * 
 * Modified by Beto Lima - April 2012
 *
 * Modified by Paulo Goncalves - May 2012
 * 
 * Modified by Nielsen Teixeira - 2012-05-02
 *
 * Modified by Joshua Bradley - 2012-06-01
 * 
 * Modified by Loiane Groner - 2012-09-08
    * 
 * Modified by Loiane Groner - 2012-09-24
 *
 */
Ext.define("GSmartApp.ux.grid.print_test", {

    requires: ['Ext.XTemplate'],

    statics: {
        /**
         * Prints the passed grid. Reflects on the grid's column model to build a table, and fills it using the store
         * @param {Ext.grid.Panel} grid The grid to print
         */
        print: function (data) {
            //We generate an XTemplate here by using 2 intermediary XTemplates - one to create the header,
            //the other to create the body (see the escaped {} below)
            //get so phieu




            //get Styles file relative location, if not supplied
            if (this.stylesheetPath === null) {
                var scriptPath = Ext.Loader.getPath('GSmartApp.ux.plugin.grid');
                console.log(scriptPath);
                this.stylesheetPath = scriptPath.substring(0, scriptPath.indexOf('grid.js')) + 'grid_printer_css/test.css';
            }

            //Here because inline styles using CSS, the browser did not show the correct formatting of the data the first time that loaded
            var htmlMarkup = [
                '<html class="' + Ext.baseCSSPrefix + 'ux-grid-printer">',
                '<head>',
                '<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />',
                '<link href="' + this.stylesheetPath + '" rel="stylesheet" type="text/css" />',
                '<title>' + 'Danh sách nhân viên' + '</title>',
                '</head>',
                '<body class="' + Ext.baseCSSPrefix + 'ux-grid-printer-body">',
                '<div class="' + Ext.baseCSSPrefix + 'ux-grid-printer-noprint ' + Ext.baseCSSPrefix + 'ux-grid-printer-links">',
                '<a class="' + Ext.baseCSSPrefix + 'ux-grid-printer-linkprint" href="javascript:void(0);" onclick="window.print();">' + this.printLinkText + '</a>',
                '<a class="' + Ext.baseCSSPrefix + 'ux-grid-printer-linkclose" href="javascript:void(0);" onclick="window.close();">' + this.closeLinkText + '</a>',
                '</div>',

                `<table border=0 cellpadding=0 cellspacing=0 width=374 style='border-collapse:
                      collapse;table-layout:fixed;width:281pt'>
                      <col width=64 style='width:48pt'>
                      <col width=118 style='mso-width-source:userset;mso-width-alt:4315;width:89pt'>
                      <col width=64 span=3 style='width:48pt'>
                      <tr height=20 style='height:15.0pt'>
                       <td height=20 class=xl6310923 width=64 style='height:15.0pt;width:48pt'>H&#7885;
                       tên</td>
                       <td class=xl6410923 width=118 style='width:89pt'>Nguyên v&#259;n Anh</td>
                       <td width=64 style='width:48pt' align=left valign=top>
                       </v:shape><![endif]--><![if !vml]><span style='mso-ignore:vglayout;
  position:absolute;z-index:1;margin-left:2px;margin-top:3px;width:125px;
  height:75px'><img width=125 height=75
  src="https://qrcode.tec-it.com/API/QRCode?data=QR+Code+Generator+by+TEC-IT"
  v:shapes="Picture_x0020_2"></span><![endif]><span style='mso-ignore:vglayout2'>
                       <table cellpadding=0 cellspacing=0>
                        <tr>
                         <td height=20 class=xl6410923 width=64 style='height:15.0pt;width:48pt'>&nbsp;</td>
                        </tr>
                       </table>
                       </span></td>
                       <td class=xl6410923 width=64 style='width:48pt'>&nbsp;</td>
                       <td class=xl6510923 width=64 style='width:48pt'>&nbsp;</td>
                      </tr>
                      <tr height=20 style='height:15.0pt'>
                       <td height=20 class=xl6610923 style='height:15.0pt'>Mã NV</td>
                       <td class=xl1510923 align=right>123451</td>
                       <td class=xl1510923></td>
                       <td class=xl1510923></td>
                       <td class=xl6710923>&nbsp;</td>
                      </tr>
                      <tr height=20 style='height:15.0pt'>
                       <td height=20 class=xl6610923 style='height:15.0pt'>Bi&#7875;n s&#7889;<span
                       style='mso-spacerun:yes'> </span></td>
                       <td class=xl1510923>29y3-12345</td>
                       <td class=xl1510923></td>
                       <td class=xl1510923></td>
                       <td class=xl6710923>&nbsp;</td>
                      </tr>
                      <tr height=20 style='height:15.0pt'>
                       <td height=20 class=xl6610923 style='height:15.0pt'>&#272;&#417;n v&#7883;</td>
                       <td class=xl1510923>BN1 - T&#7893; 1</td>
                       <td class=xl1510923></td>
                       <td class=xl1510923></td>
                       <td class=xl6710923>&nbsp;</td>
                      </tr>
                      <tr height=20 style='height:15.0pt'>
                       <td height=20 class=xl6810923 style='height:15.0pt'>&nbsp;</td>
                       <td class=xl6910923>&nbsp;</td>
                       <td class=xl6910923>&nbsp;</td>
                       <td class=xl6910923>&nbsp;</td>
                       <td class=xl7010923>&nbsp;</td>
                      </tr>
                      <![if supportMisalignedColumns]>
                      <tr height=0 style='display:none'>
                       <td width=64 style='width:48pt'></td>
                       <td width=118 style='width:89pt'></td>
                       <td width=64 style='width:48pt'></td>
                       <td width=64 style='width:48pt'></td>
                       <td width=64 style='width:48pt'></td>
                      </tr>
                      <![endif]>
                     </table>`,
                '</body>',
                '</html>'
            ];
            var html = Ext.create('Ext.XTemplate', htmlMarkup).apply(data);

            //open up a new printing window, write to it, print it and close
            var win = window.open('', 'printgrid');

            //document must be open and closed
            win.document.open();
            win.document.write(html);
            win.document.close();

            if (this.printAutomatically) {
                win.print();
            }

            //Another way to set the closing of the main
            if (this.closeAutomaticallyAfterPrint) {
                if (Ext.isIE) {
                    window.close();
                } else {
                    win.close();
                }
            }
        },

        /**
         * @property stylesheetPath
         * @type String
         * The path at which the print stylesheet can be found (defaults to 'ux/grid/gridPrinterCss/print.css')
         */
        stylesheetPath: null,

        /**
         * @property printAutomatically
         * @type Boolean
         * True to open the print dialog automatically and close the window after printing. False to simply open the print version
         * of the grid (defaults to false)
         */
        printAutomatically: false,

        /**
         * @property closeAutomaticallyAfterPrint
         * @type Boolean
         * True to close the window automatically after printing.
         * (defaults to false)
         */
        closeAutomaticallyAfterPrint: false,

        /**
         * @property mainTitle
         * @type String
         * Title to be used on top of the table
         * (defaults to empty)
         */
        mainTitle: '',

        /**
         * Text show on print link
         * @type String
         */
        printLinkText: 'In',

        /**
         * Text show on close link
         * @type String
         */
        closeLinkText: 'Đóng',

        /**
         * @property headerTpl
         * @type {Object/Array} values
         * The markup used to create the headings row. By default this just uses <th> elements, override to provide your own
         */
        headerTpl: [
            '<tpl for=".">',
            '<th>{text}</th>',
            '</tpl>'
        ],

        /**
         * @property bodyTpl
         * @type {Object/Array} values
         * The XTemplate used to create each row. This is used inside the 'print' function to build another XTemplate, to which the data
         * are then applied (see the escaped dataIndex attribute here - this ends up as "{dataIndex}")
         */
        bodyTpl: [
            '<tpl for=".">',
            '<td>\{{[Ext.String.createVarName(values.text)]}\}</td>',
            '</tpl>'
        ]
    }
});
