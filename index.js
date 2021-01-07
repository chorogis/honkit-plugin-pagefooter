"use strict";

const moment = require('moment')
let config

module.exports = {
  book: {
    assets: './assets',
    css: [
      'footer.css'
    ],
  },
  hooks: {
    'page:before': function (page) {
      config = this.config.get("pluginsConfig.page-footer")

      if(config === undefined) return page

      const label = config.label || "Modified: "
      const datefmt = config.format || "YYYY-MM-DD HH:mm:ss"
      const footer = '<footer class="page-footer">' + config.footer +
        '<span class="footer-modification">' +
        label + '\n{{file.mtime | date("' + datefmt + '")}}\n</span></footer>'

      page.content = page.content + footer;
      return page;
    }
  },
  filters: {
    date: function (d, format) {
      const isUTC = config.utc === true || false
      if (isUTC) {
        return moment(d).utc().format(format)
      } else {
        return moment(d).local().format(format)
      }
    }
  }
};
