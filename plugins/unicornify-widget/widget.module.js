/**
 * Created by glenn on 22.12.17.
 */
import { unicornifyConstants } from './constants.js';
import { unicornifyService } from './data.service.js';
import { c8yUnicornifyWidget } from './widget.component.js';
import { c8yUnicornifyWidgetConfig } from './widget-config.component.js';
export default angular
    .module('c8y.pocs.unicornifyWidget', [])
    .constant('unicornifyConstants', unicornifyConstants)
    .factory('unicornifyService', unicornifyService)
    .component('c8yUnicornifyWidget', c8yUnicornifyWidget)
    .component('c8yUnicornifyWidgetConfig', c8yUnicornifyWidgetConfig)
    .config(configure);
/* @ngInject */
function configure(c8yComponentsProvider, gettext) {
    c8yComponentsProvider.add({
        name: 'unicornify',
        nameDisplay: gettext('Unicornify'),
        description: gettext('Generates unicorn stamps and other kinds of happiness'),
        widgetComponent: 'c8yUnicornifyWidget',
        configComponent: 'c8yUnicornifyWidgetConfig',
        options: {
            noDeviceTarget: true,
            noNewWidgets: false,
            deviceTargetNotRequired: false,
            groupsSelectable: false
        }
    });
}
