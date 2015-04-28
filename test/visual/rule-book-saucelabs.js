var path = require('path');

// WebDriver setup
var webDriverDecoratorChrome = {

  "type": "webDriver",

  "configuration": {

    // Running in shared-mode (share browser session);
    // turn it on to creating a new browser instance for each test (very slow)
    "isolation": false,

    // Web-driver client configuration
    "client": {
      "type": "cabbie", // Using Cabbie as web-driver client

      // Client-specific configuration
      "configuration": {
        "mode": "sync", // Synchronous mode
        "debug": false, // Turn this on to see what Cabbie does internally
        "httpDebug": false // Turn this on to see web-driver http calls and responses (needs also "debug" to be true)
      },

      // Requested browser capabilities
      "capabilities": {
        "browserName": "chrome",
        "version": "39",
        "platform": "Windows 7"
      }
    },

    // Web-driver server configuration
    "server": {
      "type": "sauceLabs",
      "configuration": {
        "user": 'stefanteixeira',
        "accessKey": 'abd48324-b1fb-40be-8649-4d991525972a'
      }
    }

  }
};

var webDriverDecoratorFirefox = {

  "type": "webDriver",

  "configuration": {

    // Running in shared-mode (share browser session);
    // turn it on to creating a new browser instance for each test (very slow)
    "isolation": false,

    // Web-driver client configuration
    "client": {
      "type": "cabbie", // Using Cabbie as web-driver client

      // Client-specific configuration
      "configuration": {
        "mode": "sync", // Synchronous mode
        "debug": false, // Turn this on to see what Cabbie does internally
        "httpDebug": false // Turn this on to see web-driver http calls and responses (needs also "debug" to be true)
      },

      // Requested browser capabilities
      "capabilities": {
        "browserName": "firefox",
        "version": "35",
        "platform": "Windows 7"
      }
    },

    // Web-driver server configuration
    "server": {
      "type": "sauceLabs",
      "configuration": {
        "user": 'fav-organizer',
        "accessKey": '67f84d23-778a-4def-b579-c98c363a097f'
      }
    }

  }
};

module.exports = {

  // Global configuration
  "configuration": {

    // Configuration for report-manager
    "reportManager": {

      // Configuration for reporting
      "reporter": [{
          "type": "Spec"
        }, // Printing spec information for each test
        {
          "type": "List",
          "progress": false
        }, // Print a list of problems at the end
        {
          "type": "Duration"
        }, // Print the total time the tests took
        {
          "type": "Junit",
          "path": path.join(__dirname, "test-results.xml")
        } // Create a JUnit report file
      ]
    },

    // Load the web-driver plugin
    "plugins": ["preceptor-webdriver"],

    // Settings available to test-client
    "settings": {
      "implicitTimeOut": 10000,
      "windowWidth": 1920,
      "windowHeight": 1024,
      "webBaseUrl": "http://localhost:3000/#/auth"
    }
  },

  "tasks": [{
      "type": "shell",
      "name": "Cleanup",

      "active": true,
      "failOnError": true,

      "configuration": {
        "cwd": __dirname + "/screenshots",
        "cmd": 'rm -rf highlight build && mkdir highlight build'
      }
    },

    [{
        "type": "mocha",
        "name": "Take screenshots (Chrome)",

        "active": true,
        "suite": true,
        "coverage": true,
        "debug": false,

        "failOnError": false,
        "echoStdErr": false,

        "decorator": [webDriverDecoratorChrome],

        "configuration": {
          "paths": [__dirname + "/tests/index.js"],
          "timeOut": 300000,
          "slow": 60000
        }
      }
      // {
      //   "type": "mocha",
      //   "name": "Take screenshots (Firefox)",
      //
      //   "active": true,
      //   "suite": true,
      //   "coverage": true,
      //   "debug": false,
      //
      //   "failOnError": false,
      //   "echoStdErr": false,
      //
      //   "decorator": [webDriverDecoratorFirefox],
      //
      //   "configuration": {
      //     "paths": [__dirname + "/tests/index.js"],
      //     "timeOut": 300000,
      //     "slow": 60000
      //   }
      // }
    ],

    {
      "type": "kobold",
      "name": "Visual Regression Tests",

      "active": true,
      "suite": true,

      "failOnError": true,

      "configuration": {
        "highlightOnSuccess": true,

        "storage": {
          "options": {
            "path": __dirname + "/screenshots"
          }
        }
      }
    }
  ]
};
