var nconf = require('nconf');
nconf.file('settings.json');

exports.config = {
  specs: ['../test/e2e/**/*.js'],
  seleniumAddress: 'http://localhost:4444/wd/hub',
  onPrepare: function() {
    browser.driver.get('http://localhost:3000');
    browser.driver.findElement(by.id('signin')).click();
    browser.driver.findElement(by.id('login_field')).sendKeys(nconf.get('login'));
    browser.driver.findElement(by.id('password')).sendKeys(nconf.get('pass'));
    browser.driver.findElement(by.name('commit')).click();
  }
};
