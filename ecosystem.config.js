module.exports = {
  apps: [{
    name: 'edu-boss-fed',
    script: '/usr/local/bin/npm',
    args: 'start',
    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    instances: 1,
    autorestart: true,
    watch: false
  }]
}
