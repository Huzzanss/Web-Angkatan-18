// Vercel serverless entry point.
// Static files (index.html, style.css, page/*, etc) disajani langsung oleh Vercel.
// File ini hanya handle /api/* traffic.

module.exports = require("../server/app");
