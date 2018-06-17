/**
 * Created by glenn on 22.12.17.
 */
import Mousetrap from 'mousetrap';
import cornify from 'cornified';
import harlemshakify from 'harlemshakify';
export const c8yUnicornifyWidget = {
    templateUrl: ':::PLUGIN_PATH:::/widget.html',
    bindings: {
        config: '<'
    },
    controllerAs: 'vm',
    controller: Controller
};
/* @ngInject */
function Controller(unicornifyService) {
    const vm = this;
    _.assign(vm, {
        $onInit,
        $onChanges,
        cornify,
        harlemshakify
    });
    ////////////
    function $onInit() {
        Mousetrap.bind('a d d enter', vm.cornify.add);
        Mousetrap.bind('c l e a r enter', vm.cornify.clear);
        Mousetrap.bind('p i z z a z z enter', vm.cornify.pizzazz);
        Mousetrap.bind('h a r l e m enter', vm.harlemshakify);
    }
    function $onChanges({ config }) {
        if (config) {
            onConfigChange(vm.config);
        }
    }
    function onConfigChange(config) {
        const deviceId = _.get(config, 'device.id');
        if (deviceId) {
            unicornifyService.getDataFor({ source: deviceId }).then((data) => {
                vm.data = data;
            });
        }
    }
}
