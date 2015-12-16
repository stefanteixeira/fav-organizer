var nconf = require('nconf');
nconf.file('settings.json');

exports.config = {
  sauceUser: nconf.get('login'),
  sauceKey: nconf.get('accessKey'),
  capabilities: {
    'name': 'UI Tests',
    'browserName': 'chrome'
  },

  specs: ['../test/ui/**/*.js'],
  // seleniumAddress: 'http://localhost:4444/wd/hub',
  onPrepare: function() {
    browser.driver.get('http://52.32.97.145:3000/#/auth');
    browser.driver.findElement(by.id('signin')).click();
    browser.driver.findElement(by.id('login_field')).sendKeys(nconf.get('login'));
    browser.driver.findElement(by.id('password')).sendKeys(nconf.get('pass'));
    browser.driver.findElement(by.name('commit')).click();
  }
};
