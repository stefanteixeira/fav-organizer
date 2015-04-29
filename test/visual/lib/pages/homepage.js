var PageObject = require('hodman').PageObject;

var HomePage = PageObject.extend(

  {
    /**
     * Initializes the page-object
     */
    initialize: function() {
      this.__super();

      this.setSelectors({
        "newBookmark": "#btnNewBookmark",
      });

      this.addLoadSelectors(["newBookmark"]);
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

  {
    URL: "http://54.149.253.66:3000/#/bookmarks",
    EXPECTED_URL: "/"
  }
);

module.exports = HomePage;
