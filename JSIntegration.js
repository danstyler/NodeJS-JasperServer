module.exports = class JSIntegration {
    constructor(jasperUrl, reportPath, type, user, password, parameters) {
        this.jasperUrl = jasperUrl;
        this.reportPath = reportPath;
        this.type = type;
        this.user = user;
        this.password = password;
        this.parameters = [];

        if (typeof parameters !== 'undefined') {
            for (var key in parameters) {
                this.parameters = [];
                this.parameters.push({parameter : key, value : parameters[key]});
            }
        } 
        

        if (this.jasperUrl.indexOf('/') === this.jasperUrl.length-1) {
            this.jasperUrl = this.jasperUrl.substr(1, this.jasperUrl.length - 2);
        }

        if (this.reportPath.indexOf('/') === this.reportPath.length-1) {
            this.reportPath = this.reportPath.substr(1, this.reportPath.length - 2);
        }
    }

    addParameter(parameter, value) {
        this.parameters.push({parameter : parameter, value : value});
    }

    _getQueryString() {
        var queryString = '';

        for(var i = 0; i < this.parameters.length; i++) {
            queryString += (queryString === '' ? '?' : '&') + this.parameters[i].parameter + '=' + this.parameters[i].value;
        }

        return queryString;
    }

    execute() {
        return new Promise((resolve, reject) => {
            var http = require('http');
            var url = '';

            var options = {
                auth : this.user + ':' + this.password
            };

            url += this.jasperUrl + '/rest_v2/reports/' + this.reportPath + '.' + this.type + this._getQueryString();

            http.get(
                url,
                options,
                (res) => {
                    let rawData = [];
                    res.on('data', (chunk) => {
                        rawData.push(chunk);
                    });

                    res.on('end', () => {
                        var buffer = Buffer.concat(rawData);
                        resolve(buffer);
                    });

                    res.on('error', (e) => {
                        reject(e.message);
                    });
                }

            )
        });
    }
}
