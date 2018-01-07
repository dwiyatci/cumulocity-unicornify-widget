(function () {
  'use strict';

  initBackendMocks();

  window.common = {
    globalBeforeWithUI,
    globalBefore,
  };

  ////////////

  function initBackendMocks() {
    angular
      .module('c8y.backendMocks', [])
      .run(runBlock);

    /* @ngInject */
    function runBlock($httpBackend) {
      $httpBackend
        .when('GET', /\/user\/currentUser(.*)/)
        .respond({});
    }
  }

  function globalBeforeWithUI() {
    globalBefore();
    module('c8y.ui');
  }

  function globalBefore() {
    module(($provide) => {
      /*
       * Best to keep the below "magic" fake info data for unit testing purpose,
       * otherwise some services may not be able to be injected properly,
       * errors maybe thrown from the minified (cumulocity-ui-build) files, and
       * you don't wanna waste your time debugging the build files and will most
       * likely have no clue on what's going wrong. You've been warned (!) :)
       */
      $provide.value('info', {
        appKey: 'test',
        beta: 'test',
        appConfig: { manifest: {} },
        appName: 'test',
        appLoadedJson: 'test',
        logout: 'test',
        hideAppEdit: 'test',
        baseUrl: '/',
        pageSize: 50,
        preventGetUser: true,
        languages: ['en'],
        skipSwitchingToDefaultLanguage: true,
        test: true,
      });
    });
    module('c8y.core');
    module('c8y.backendMocks');
    module('c8yHtml.test');
  }
}());
