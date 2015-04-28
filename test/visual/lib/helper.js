var path = require('path');
var Promise = require('promise');

// This helper file creates a couple of helpers. In addition, it
// defines what actions should be taken before any tests
// were executed, and what should be done after all tests ran.

// Local reference for created objects
var config;

/**
 * Loads the configuration supplied through the configuration file
 *
 * @method loadConfig
 * @return {object}
 */
function loadConfig() {
  // Preceptor injects the global variable "PRECEPTOR" in all test processes it starts.
  // You can read the configuration data out of it. Currently, this is only the global
  // configuration from the Preceptor rule-book.

  // Load the settings from the Preceptor configuration
  return config = global.PRECEPTOR.config.settings;
}

/**
 * Load a page-object
 *
 * @param {string} page Page-object identifier
 * @return {PageObject}
 */
function loadPageObject(page) {
  var pageObj;

  // Load page-object and give it a name (just to identify itself - might need it in the future)
  pageObj = require('./pages/' + page);
  pageObj.prototype.NAME = page.replace(/\//g, '.');

  return pageObj;
}


/**
 * Setup for page objects
 *
 * @method setupPageObjects
 */
function setupPageObjects() {
  var hodman = require('hodman'),
    BaseObject = hodman.BaseObject,
    PageObject = hodman.PageObject;

  // Setup base-url to avoid having to hard-code these in the tests
  PageObject.BASE = config.webBaseUrl;

  // The Preceptor-WebDriver plugin creates another global namespace called
  // "PRECEPTOR_WEBDRIVER". This will give all the testing frameworks access
  // to the webDriver-client and some other often needed information.

  // Setup Cabbie
  BaseObject.DRIVER_ADAPTER = new hodman.driverAdapters.Cabbie(global.PRECEPTOR_WEBDRIVER
    .driver);
  BaseObject.DRIVER_ADAPTER.getDriver().timeOut().setImplicitTimeOut(config.implicitTimeOut);

  // Setup the screenshot-path
  BaseObject.SCREENSHOT_PATH = path.resolve(path.join(__dirname, '..',
    'screenshots', 'build'));

  // Add prefix for screenshots
  global.SCREENSHOT_PREFIX = global.PRECEPTOR_WEBDRIVER.browser;
}

/**
 * Setup for application object
 *
 * @method setupApplication
 * @return {PageObject}
 */
function setupApplication() {
  var size, pageContext, application;

  application = loadPageObject('application').navigate(5000);
  pageContext = application.getAdapter().getPageContext();

  // Setup a specific window-size - useful for screenshots
  size = pageContext.getSize();
  if ((size.width !== config.windowWidth) && (size.height !== config.windowHeight)) {
    pageContext.resize(config.windowWidth, config.windowHeight);
  }

  // Add a reset method that will
  // go back to the main application page
  application.reset = function() {
    loadPageObject('application').navigate(5000);
  };

  return application;
}


/**
 * Setup test-objects and helpers before any tests ran
 *
 * For many Selenium tests, it is helpful to have test-data available
 * in the system (or API) to tests against. There are a couple ways to achieve this:
 *
 * 1. Fixed data on the back-end (may be specific data in the DB)
 * 2. Mock data on the front- or back-end (using something like fakehr)
 * 3. Clear the data, i.e. drop and recreated the DB (not always feasible)
 * 4. Creating data with random identifiers to be used within the tests using direct API access
 *
 * The last one is in many cases the best solution. The tests then need access to the API.
 * Setting up this (possibly with authentication) could be done in this function.
 * The tests will wait until all of this is done by using the Promise.
 *
 * Regardless of which method you choose to setup your system, in nearly all of the cases
 * you need to setup something before tests can be run. This is the place to do it.
 *
 * @method setup
 * @return {Promise}
 */
function setup() {
  var application, config;

  config = loadConfig();

  setupPageObjects();
  application = setupApplication();

  return Promise.resolve({
    application: application,
    loadPageObject: loadPageObject,
    config: config
  });
}


/**
 * Tear-down application
 *
 * @method tearDownApplication
 */
function tearDownApplication() {
  // Nothing to do here (for now)
}

/**
 * Tear-down test-objects and helpers after all tests ran,
 * regardless of success or failure.
 *
 * This is the place to clear everything up before finishing up tests. This could
 * be removal of test-files, or the deletion of test-data through an API.
 *
 * @return {Promise}
 */
function tearDown() {
  tearDownApplication();
  return Promise.resolve();
}

module.exports = {
  setup: setup,
  tearDown: tearDown
};
