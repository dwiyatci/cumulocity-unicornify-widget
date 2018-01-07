/**
 * Created by glenn on 22.12.17.
 */

export const c8yUnicornifyWidgetConfig = {
  templateUrl: ':::PLUGIN_PATH:::/widget-config.html',
  bindings: {
    config: '<'
  },
  controllerAs: 'vm',
  controller: Controller
};

/* @ngInject */
function Controller(
  this: angular.IController
) {
  const vm = this;
  const defaultConfig = {};

  _.assign(vm, {
    $onInit
  });

  ////////////

  function $onInit() {
    _.defaults(vm.config, defaultConfig);
  }
}
