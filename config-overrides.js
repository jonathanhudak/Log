const { override, adjustWorkbox } = require("customize-cra");
const path = require("path");

module.exports = override(
  // adjust the underlying workbox
  adjustWorkbox(wb =>
    Object.assign(wb, {
      skipWaiting: true,
      exclude: (wb.exclude || []).concat("index.html")
    })
  )
);
