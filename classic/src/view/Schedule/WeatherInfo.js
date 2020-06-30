Ext.define('GSmartApp.view.Schedule.WeatherInfo', {
    extend : 'Sch.model.Event',
    fields : [
        'Snowing',
        'TemperatureC',
        { name : 'TemperatureF', calculate : function (data) {
            if ('TemperatureC' in data) {
                return Math.round(data.TemperatureC * 9/5) + 32;
            }
        }}
    ]
});