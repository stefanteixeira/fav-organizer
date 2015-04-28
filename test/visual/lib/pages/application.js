var PageObject = require('hodman').PageObject;

/**
 * @class Application
 * @extends PageObject
 */
var Application = PageObject.extend(

  /** @lends Application.prototype */
  {
    /**
     * Initializes the page-object
     */
    initialize: function() {
      this.__super();

      this.setSelectors({
        "signin": "#signin",
        "login": "#login_field",
        "password": "#password",
        "btnOk": "#commit"
      });

      this.addLoadSelectors(["signin"]);
    },

    /**
     * Does the application have page content?
     *
     * @return {Boolean}
     */
    hasPageContent: function() {
      return this.hasElement("signin");
    },

    /**
     * Performs a login
     */
    login: function(_login, _password) {
      this.getElement("signin").mouse().click();

      this.waitForElements(["login"], 10000);

      login = this.getElement("login");
      login.clear();
      login.sendKeys(_login);

      password = this.getElement("password");
      password.clear();
      password.sendKeys(_password);

      this.getElement("btnOk").mouse().click();

      var HomePage = require('./homepage');
      return new HomePage();
    },

    getHomePage: function() {
      var HomePage = require('./homepage');
      return new HomePage();
    },

    /**
     * List of blackout coordinates for the current page-object
     *
     * @method blackOut
     * @return {object[]}
     */
    blackOut: function() {
      return [];
    }
  },

  /** @lends Application */
  {
    URL: "/",

    // We don't care here if it redirects somewhere else
    EXPECTED_URL: "/"
  }
);

module.exports = Application;
