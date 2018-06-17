// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({5:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by glenn on 22.12.17.
 */
var unicornifyConstants = exports.unicornifyConstants = {};
},{}],6:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.unicornifyService = unicornifyService;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Created by glenn on 22.12.17.
 */
/* @ngInject */
function unicornifyService($q, unicornifyConstants) {
    ////////////
    var getDataFor = function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(filter) {
            var data;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return $q.resolve([]);

                        case 2:
                            data = _context.sent;

                            console.log(data);
                            return _context.abrupt("return", data);

                        case 5:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        return function getDataFor(_x) {
            return _ref.apply(this, arguments);
        };
    }();

    var service = {
        getDataFor: getDataFor
    };
    return service;
}
},{}],13:[function(require,module,exports) {
var define;
/*global define:false */
/**
 * Copyright 2012-2017 Craig Campbell
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Mousetrap is a simple keyboard shortcut library for Javascript with
 * no external dependencies
 *
 * @version 1.6.2
 * @url craig.is/killing/mice
 */
(function(window, document, undefined) {

    // Check if mousetrap is used inside browser, if not, return
    if (!window) {
        return;
    }

    /**
     * mapping of special keycodes to their corresponding keys
     *
     * everything in this dictionary cannot use keypress events
     * so it has to be here to map to the correct keycodes for
     * keyup/keydown events
     *
     * @type {Object}
     */
    var _MAP = {
        8: 'backspace',
        9: 'tab',
        13: 'enter',
        16: 'shift',
        17: 'ctrl',
        18: 'alt',
        20: 'capslock',
        27: 'esc',
        32: 'space',
        33: 'pageup',
        34: 'pagedown',
        35: 'end',
        36: 'home',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        45: 'ins',
        46: 'del',
        91: 'meta',
        93: 'meta',
        224: 'meta'
    };

    /**
     * mapping for special characters so they can support
     *
     * this dictionary is only used incase you want to bind a
     * keyup or keydown event to one of these keys
     *
     * @type {Object}
     */
    var _KEYCODE_MAP = {
        106: '*',
        107: '+',
        109: '-',
        110: '.',
        111 : '/',
        186: ';',
        187: '=',
        188: ',',
        189: '-',
        190: '.',
        191: '/',
        192: '`',
        219: '[',
        220: '\\',
        221: ']',
        222: '\''
    };

    /**
     * this is a mapping of keys that require shift on a US keypad
     * back to the non shift equivelents
     *
     * this is so you can use keyup events with these keys
     *
     * note that this will only work reliably on US keyboards
     *
     * @type {Object}
     */
    var _SHIFT_MAP = {
        '~': '`',
        '!': '1',
        '@': '2',
        '#': '3',
        '$': '4',
        '%': '5',
        '^': '6',
        '&': '7',
        '*': '8',
        '(': '9',
        ')': '0',
        '_': '-',
        '+': '=',
        ':': ';',
        '\"': '\'',
        '<': ',',
        '>': '.',
        '?': '/',
        '|': '\\'
    };

    /**
     * this is a list of special strings you can use to map
     * to modifier keys when you specify your keyboard shortcuts
     *
     * @type {Object}
     */
    var _SPECIAL_ALIASES = {
        'option': 'alt',
        'command': 'meta',
        'return': 'enter',
        'escape': 'esc',
        'plus': '+',
        'mod': /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? 'meta' : 'ctrl'
    };

    /**
     * variable to store the flipped version of _MAP from above
     * needed to check if we should use keypress or not when no action
     * is specified
     *
     * @type {Object|undefined}
     */
    var _REVERSE_MAP;

    /**
     * loop through the f keys, f1 to f19 and add them to the map
     * programatically
     */
    for (var i = 1; i < 20; ++i) {
        _MAP[111 + i] = 'f' + i;
    }

    /**
     * loop through to map numbers on the numeric keypad
     */
    for (i = 0; i <= 9; ++i) {

        // This needs to use a string cause otherwise since 0 is falsey
        // mousetrap will never fire for numpad 0 pressed as part of a keydown
        // event.
        //
        // @see https://github.com/ccampbell/mousetrap/pull/258
        _MAP[i + 96] = i.toString();
    }

    /**
     * cross browser add event method
     *
     * @param {Element|HTMLDocument} object
     * @param {string} type
     * @param {Function} callback
     * @returns void
     */
    function _addEvent(object, type, callback) {
        if (object.addEventListener) {
            object.addEventListener(type, callback, false);
            return;
        }

        object.attachEvent('on' + type, callback);
    }

    /**
     * takes the event and returns the key character
     *
     * @param {Event} e
     * @return {string}
     */
    function _characterFromEvent(e) {

        // for keypress events we should return the character as is
        if (e.type == 'keypress') {
            var character = String.fromCharCode(e.which);

            // if the shift key is not pressed then it is safe to assume
            // that we want the character to be lowercase.  this means if
            // you accidentally have caps lock on then your key bindings
            // will continue to work
            //
            // the only side effect that might not be desired is if you
            // bind something like 'A' cause you want to trigger an
            // event when capital A is pressed caps lock will no longer
            // trigger the event.  shift+a will though.
            if (!e.shiftKey) {
                character = character.toLowerCase();
            }

            return character;
        }

        // for non keypress events the special maps are needed
        if (_MAP[e.which]) {
            return _MAP[e.which];
        }

        if (_KEYCODE_MAP[e.which]) {
            return _KEYCODE_MAP[e.which];
        }

        // if it is not in the special map

        // with keydown and keyup events the character seems to always
        // come in as an uppercase character whether you are pressing shift
        // or not.  we should make sure it is always lowercase for comparisons
        return String.fromCharCode(e.which).toLowerCase();
    }

    /**
     * checks if two arrays are equal
     *
     * @param {Array} modifiers1
     * @param {Array} modifiers2
     * @returns {boolean}
     */
    function _modifiersMatch(modifiers1, modifiers2) {
        return modifiers1.sort().join(',') === modifiers2.sort().join(',');
    }

    /**
     * takes a key event and figures out what the modifiers are
     *
     * @param {Event} e
     * @returns {Array}
     */
    function _eventModifiers(e) {
        var modifiers = [];

        if (e.shiftKey) {
            modifiers.push('shift');
        }

        if (e.altKey) {
            modifiers.push('alt');
        }

        if (e.ctrlKey) {
            modifiers.push('ctrl');
        }

        if (e.metaKey) {
            modifiers.push('meta');
        }

        return modifiers;
    }

    /**
     * prevents default for this event
     *
     * @param {Event} e
     * @returns void
     */
    function _preventDefault(e) {
        if (e.preventDefault) {
            e.preventDefault();
            return;
        }

        e.returnValue = false;
    }

    /**
     * stops propogation for this event
     *
     * @param {Event} e
     * @returns void
     */
    function _stopPropagation(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
            return;
        }

        e.cancelBubble = true;
    }

    /**
     * determines if the keycode specified is a modifier key or not
     *
     * @param {string} key
     * @returns {boolean}
     */
    function _isModifier(key) {
        return key == 'shift' || key == 'ctrl' || key == 'alt' || key == 'meta';
    }

    /**
     * reverses the map lookup so that we can look for specific keys
     * to see what can and can't use keypress
     *
     * @return {Object}
     */
    function _getReverseMap() {
        if (!_REVERSE_MAP) {
            _REVERSE_MAP = {};
            for (var key in _MAP) {

                // pull out the numeric keypad from here cause keypress should
                // be able to detect the keys from the character
                if (key > 95 && key < 112) {
                    continue;
                }

                if (_MAP.hasOwnProperty(key)) {
                    _REVERSE_MAP[_MAP[key]] = key;
                }
            }
        }
        return _REVERSE_MAP;
    }

    /**
     * picks the best action based on the key combination
     *
     * @param {string} key - character for key
     * @param {Array} modifiers
     * @param {string=} action passed in
     */
    function _pickBestAction(key, modifiers, action) {

        // if no action was picked in we should try to pick the one
        // that we think would work best for this key
        if (!action) {
            action = _getReverseMap()[key] ? 'keydown' : 'keypress';
        }

        // modifier keys don't work as expected with keypress,
        // switch to keydown
        if (action == 'keypress' && modifiers.length) {
            action = 'keydown';
        }

        return action;
    }

    /**
     * Converts from a string key combination to an array
     *
     * @param  {string} combination like "command+shift+l"
     * @return {Array}
     */
    function _keysFromString(combination) {
        if (combination === '+') {
            return ['+'];
        }

        combination = combination.replace(/\+{2}/g, '+plus');
        return combination.split('+');
    }

    /**
     * Gets info for a specific key combination
     *
     * @param  {string} combination key combination ("command+s" or "a" or "*")
     * @param  {string=} action
     * @returns {Object}
     */
    function _getKeyInfo(combination, action) {
        var keys;
        var key;
        var i;
        var modifiers = [];

        // take the keys from this pattern and figure out what the actual
        // pattern is all about
        keys = _keysFromString(combination);

        for (i = 0; i < keys.length; ++i) {
            key = keys[i];

            // normalize key names
            if (_SPECIAL_ALIASES[key]) {
                key = _SPECIAL_ALIASES[key];
            }

            // if this is not a keypress event then we should
            // be smart about using shift keys
            // this will only work for US keyboards however
            if (action && action != 'keypress' && _SHIFT_MAP[key]) {
                key = _SHIFT_MAP[key];
                modifiers.push('shift');
            }

            // if this key is a modifier then add it to the list of modifiers
            if (_isModifier(key)) {
                modifiers.push(key);
            }
        }

        // depending on what the key combination is
        // we will try to pick the best event for it
        action = _pickBestAction(key, modifiers, action);

        return {
            key: key,
            modifiers: modifiers,
            action: action
        };
    }

    function _belongsTo(element, ancestor) {
        if (element === null || element === document) {
            return false;
        }

        if (element === ancestor) {
            return true;
        }

        return _belongsTo(element.parentNode, ancestor);
    }

    function Mousetrap(targetElement) {
        var self = this;

        targetElement = targetElement || document;

        if (!(self instanceof Mousetrap)) {
            return new Mousetrap(targetElement);
        }

        /**
         * element to attach key events to
         *
         * @type {Element}
         */
        self.target = targetElement;

        /**
         * a list of all the callbacks setup via Mousetrap.bind()
         *
         * @type {Object}
         */
        self._callbacks = {};

        /**
         * direct map of string combinations to callbacks used for trigger()
         *
         * @type {Object}
         */
        self._directMap = {};

        /**
         * keeps track of what level each sequence is at since multiple
         * sequences can start out with the same sequence
         *
         * @type {Object}
         */
        var _sequenceLevels = {};

        /**
         * variable to store the setTimeout call
         *
         * @type {null|number}
         */
        var _resetTimer;

        /**
         * temporary state where we will ignore the next keyup
         *
         * @type {boolean|string}
         */
        var _ignoreNextKeyup = false;

        /**
         * temporary state where we will ignore the next keypress
         *
         * @type {boolean}
         */
        var _ignoreNextKeypress = false;

        /**
         * are we currently inside of a sequence?
         * type of action ("keyup" or "keydown" or "keypress") or false
         *
         * @type {boolean|string}
         */
        var _nextExpectedAction = false;

        /**
         * resets all sequence counters except for the ones passed in
         *
         * @param {Object} doNotReset
         * @returns void
         */
        function _resetSequences(doNotReset) {
            doNotReset = doNotReset || {};

            var activeSequences = false,
                key;

            for (key in _sequenceLevels) {
                if (doNotReset[key]) {
                    activeSequences = true;
                    continue;
                }
                _sequenceLevels[key] = 0;
            }

            if (!activeSequences) {
                _nextExpectedAction = false;
            }
        }

        /**
         * finds all callbacks that match based on the keycode, modifiers,
         * and action
         *
         * @param {string} character
         * @param {Array} modifiers
         * @param {Event|Object} e
         * @param {string=} sequenceName - name of the sequence we are looking for
         * @param {string=} combination
         * @param {number=} level
         * @returns {Array}
         */
        function _getMatches(character, modifiers, e, sequenceName, combination, level) {
            var i;
            var callback;
            var matches = [];
            var action = e.type;

            // if there are no events related to this keycode
            if (!self._callbacks[character]) {
                return [];
            }

            // if a modifier key is coming up on its own we should allow it
            if (action == 'keyup' && _isModifier(character)) {
                modifiers = [character];
            }

            // loop through all callbacks for the key that was pressed
            // and see if any of them match
            for (i = 0; i < self._callbacks[character].length; ++i) {
                callback = self._callbacks[character][i];

                // if a sequence name is not specified, but this is a sequence at
                // the wrong level then move onto the next match
                if (!sequenceName && callback.seq && _sequenceLevels[callback.seq] != callback.level) {
                    continue;
                }

                // if the action we are looking for doesn't match the action we got
                // then we should keep going
                if (action != callback.action) {
                    continue;
                }

                // if this is a keypress event and the meta key and control key
                // are not pressed that means that we need to only look at the
                // character, otherwise check the modifiers as well
                //
                // chrome will not fire a keypress if meta or control is down
                // safari will fire a keypress if meta or meta+shift is down
                // firefox will fire a keypress if meta or control is down
                if ((action == 'keypress' && !e.metaKey && !e.ctrlKey) || _modifiersMatch(modifiers, callback.modifiers)) {

                    // when you bind a combination or sequence a second time it
                    // should overwrite the first one.  if a sequenceName or
                    // combination is specified in this call it does just that
                    //
                    // @todo make deleting its own method?
                    var deleteCombo = !sequenceName && callback.combo == combination;
                    var deleteSequence = sequenceName && callback.seq == sequenceName && callback.level == level;
                    if (deleteCombo || deleteSequence) {
                        self._callbacks[character].splice(i, 1);
                    }

                    matches.push(callback);
                }
            }

            return matches;
        }

        /**
         * actually calls the callback function
         *
         * if your callback function returns false this will use the jquery
         * convention - prevent default and stop propogation on the event
         *
         * @param {Function} callback
         * @param {Event} e
         * @returns void
         */
        function _fireCallback(callback, e, combo, sequence) {

            // if this event should not happen stop here
            if (self.stopCallback(e, e.target || e.srcElement, combo, sequence)) {
                return;
            }

            if (callback(e, combo) === false) {
                _preventDefault(e);
                _stopPropagation(e);
            }
        }

        /**
         * handles a character key event
         *
         * @param {string} character
         * @param {Array} modifiers
         * @param {Event} e
         * @returns void
         */
        self._handleKey = function(character, modifiers, e) {
            var callbacks = _getMatches(character, modifiers, e);
            var i;
            var doNotReset = {};
            var maxLevel = 0;
            var processedSequenceCallback = false;

            // Calculate the maxLevel for sequences so we can only execute the longest callback sequence
            for (i = 0; i < callbacks.length; ++i) {
                if (callbacks[i].seq) {
                    maxLevel = Math.max(maxLevel, callbacks[i].level);
                }
            }

            // loop through matching callbacks for this key event
            for (i = 0; i < callbacks.length; ++i) {

                // fire for all sequence callbacks
                // this is because if for example you have multiple sequences
                // bound such as "g i" and "g t" they both need to fire the
                // callback for matching g cause otherwise you can only ever
                // match the first one
                if (callbacks[i].seq) {

                    // only fire callbacks for the maxLevel to prevent
                    // subsequences from also firing
                    //
                    // for example 'a option b' should not cause 'option b' to fire
                    // even though 'option b' is part of the other sequence
                    //
                    // any sequences that do not match here will be discarded
                    // below by the _resetSequences call
                    if (callbacks[i].level != maxLevel) {
                        continue;
                    }

                    processedSequenceCallback = true;

                    // keep a list of which sequences were matches for later
                    doNotReset[callbacks[i].seq] = 1;
                    _fireCallback(callbacks[i].callback, e, callbacks[i].combo, callbacks[i].seq);
                    continue;
                }

                // if there were no sequence matches but we are still here
                // that means this is a regular match so we should fire that
                if (!processedSequenceCallback) {
                    _fireCallback(callbacks[i].callback, e, callbacks[i].combo);
                }
            }

            // if the key you pressed matches the type of sequence without
            // being a modifier (ie "keyup" or "keypress") then we should
            // reset all sequences that were not matched by this event
            //
            // this is so, for example, if you have the sequence "h a t" and you
            // type "h e a r t" it does not match.  in this case the "e" will
            // cause the sequence to reset
            //
            // modifier keys are ignored because you can have a sequence
            // that contains modifiers such as "enter ctrl+space" and in most
            // cases the modifier key will be pressed before the next key
            //
            // also if you have a sequence such as "ctrl+b a" then pressing the
            // "b" key will trigger a "keypress" and a "keydown"
            //
            // the "keydown" is expected when there is a modifier, but the
            // "keypress" ends up matching the _nextExpectedAction since it occurs
            // after and that causes the sequence to reset
            //
            // we ignore keypresses in a sequence that directly follow a keydown
            // for the same character
            var ignoreThisKeypress = e.type == 'keypress' && _ignoreNextKeypress;
            if (e.type == _nextExpectedAction && !_isModifier(character) && !ignoreThisKeypress) {
                _resetSequences(doNotReset);
            }

            _ignoreNextKeypress = processedSequenceCallback && e.type == 'keydown';
        };

        /**
         * handles a keydown event
         *
         * @param {Event} e
         * @returns void
         */
        function _handleKeyEvent(e) {

            // normalize e.which for key events
            // @see http://stackoverflow.com/questions/4285627/javascript-keycode-vs-charcode-utter-confusion
            if (typeof e.which !== 'number') {
                e.which = e.keyCode;
            }

            var character = _characterFromEvent(e);

            // no character found then stop
            if (!character) {
                return;
            }

            // need to use === for the character check because the character can be 0
            if (e.type == 'keyup' && _ignoreNextKeyup === character) {
                _ignoreNextKeyup = false;
                return;
            }

            self.handleKey(character, _eventModifiers(e), e);
        }

        /**
         * called to set a 1 second timeout on the specified sequence
         *
         * this is so after each key press in the sequence you have 1 second
         * to press the next key before you have to start over
         *
         * @returns void
         */
        function _resetSequenceTimer() {
            clearTimeout(_resetTimer);
            _resetTimer = setTimeout(_resetSequences, 1000);
        }

        /**
         * binds a key sequence to an event
         *
         * @param {string} combo - combo specified in bind call
         * @param {Array} keys
         * @param {Function} callback
         * @param {string=} action
         * @returns void
         */
        function _bindSequence(combo, keys, callback, action) {

            // start off by adding a sequence level record for this combination
            // and setting the level to 0
            _sequenceLevels[combo] = 0;

            /**
             * callback to increase the sequence level for this sequence and reset
             * all other sequences that were active
             *
             * @param {string} nextAction
             * @returns {Function}
             */
            function _increaseSequence(nextAction) {
                return function() {
                    _nextExpectedAction = nextAction;
                    ++_sequenceLevels[combo];
                    _resetSequenceTimer();
                };
            }

            /**
             * wraps the specified callback inside of another function in order
             * to reset all sequence counters as soon as this sequence is done
             *
             * @param {Event} e
             * @returns void
             */
            function _callbackAndReset(e) {
                _fireCallback(callback, e, combo);

                // we should ignore the next key up if the action is key down
                // or keypress.  this is so if you finish a sequence and
                // release the key the final key will not trigger a keyup
                if (action !== 'keyup') {
                    _ignoreNextKeyup = _characterFromEvent(e);
                }

                // weird race condition if a sequence ends with the key
                // another sequence begins with
                setTimeout(_resetSequences, 10);
            }

            // loop through keys one at a time and bind the appropriate callback
            // function.  for any key leading up to the final one it should
            // increase the sequence. after the final, it should reset all sequences
            //
            // if an action is specified in the original bind call then that will
            // be used throughout.  otherwise we will pass the action that the
            // next key in the sequence should match.  this allows a sequence
            // to mix and match keypress and keydown events depending on which
            // ones are better suited to the key provided
            for (var i = 0; i < keys.length; ++i) {
                var isFinal = i + 1 === keys.length;
                var wrappedCallback = isFinal ? _callbackAndReset : _increaseSequence(action || _getKeyInfo(keys[i + 1]).action);
                _bindSingle(keys[i], wrappedCallback, action, combo, i);
            }
        }

        /**
         * binds a single keyboard combination
         *
         * @param {string} combination
         * @param {Function} callback
         * @param {string=} action
         * @param {string=} sequenceName - name of sequence if part of sequence
         * @param {number=} level - what part of the sequence the command is
         * @returns void
         */
        function _bindSingle(combination, callback, action, sequenceName, level) {

            // store a direct mapped reference for use with Mousetrap.trigger
            self._directMap[combination + ':' + action] = callback;

            // make sure multiple spaces in a row become a single space
            combination = combination.replace(/\s+/g, ' ');

            var sequence = combination.split(' ');
            var info;

            // if this pattern is a sequence of keys then run through this method
            // to reprocess each pattern one key at a time
            if (sequence.length > 1) {
                _bindSequence(combination, sequence, callback, action);
                return;
            }

            info = _getKeyInfo(combination, action);

            // make sure to initialize array if this is the first time
            // a callback is added for this key
            self._callbacks[info.key] = self._callbacks[info.key] || [];

            // remove an existing match if there is one
            _getMatches(info.key, info.modifiers, {type: info.action}, sequenceName, combination, level);

            // add this call back to the array
            // if it is a sequence put it at the beginning
            // if not put it at the end
            //
            // this is important because the way these are processed expects
            // the sequence ones to come first
            self._callbacks[info.key][sequenceName ? 'unshift' : 'push']({
                callback: callback,
                modifiers: info.modifiers,
                action: info.action,
                seq: sequenceName,
                level: level,
                combo: combination
            });
        }

        /**
         * binds multiple combinations to the same callback
         *
         * @param {Array} combinations
         * @param {Function} callback
         * @param {string|undefined} action
         * @returns void
         */
        self._bindMultiple = function(combinations, callback, action) {
            for (var i = 0; i < combinations.length; ++i) {
                _bindSingle(combinations[i], callback, action);
            }
        };

        // start!
        _addEvent(targetElement, 'keypress', _handleKeyEvent);
        _addEvent(targetElement, 'keydown', _handleKeyEvent);
        _addEvent(targetElement, 'keyup', _handleKeyEvent);
    }

    /**
     * binds an event to mousetrap
     *
     * can be a single key, a combination of keys separated with +,
     * an array of keys, or a sequence of keys separated by spaces
     *
     * be sure to list the modifier keys first to make sure that the
     * correct key ends up getting bound (the last key in the pattern)
     *
     * @param {string|Array} keys
     * @param {Function} callback
     * @param {string=} action - 'keypress', 'keydown', or 'keyup'
     * @returns void
     */
    Mousetrap.prototype.bind = function(keys, callback, action) {
        var self = this;
        keys = keys instanceof Array ? keys : [keys];
        self._bindMultiple.call(self, keys, callback, action);
        return self;
    };

    /**
     * unbinds an event to mousetrap
     *
     * the unbinding sets the callback function of the specified key combo
     * to an empty function and deletes the corresponding key in the
     * _directMap dict.
     *
     * TODO: actually remove this from the _callbacks dictionary instead
     * of binding an empty function
     *
     * the keycombo+action has to be exactly the same as
     * it was defined in the bind method
     *
     * @param {string|Array} keys
     * @param {string} action
     * @returns void
     */
    Mousetrap.prototype.unbind = function(keys, action) {
        var self = this;
        return self.bind.call(self, keys, function() {}, action);
    };

    /**
     * triggers an event that has already been bound
     *
     * @param {string} keys
     * @param {string=} action
     * @returns void
     */
    Mousetrap.prototype.trigger = function(keys, action) {
        var self = this;
        if (self._directMap[keys + ':' + action]) {
            self._directMap[keys + ':' + action]({}, keys);
        }
        return self;
    };

    /**
     * resets the library back to its initial state.  this is useful
     * if you want to clear out the current keyboard shortcuts and bind
     * new ones - for example if you switch to another page
     *
     * @returns void
     */
    Mousetrap.prototype.reset = function() {
        var self = this;
        self._callbacks = {};
        self._directMap = {};
        return self;
    };

    /**
     * should we stop this event before firing off callbacks
     *
     * @param {Event} e
     * @param {Element} element
     * @return {boolean}
     */
    Mousetrap.prototype.stopCallback = function(e, element) {
        var self = this;

        // if the element has the class "mousetrap" then no need to stop
        if ((' ' + element.className + ' ').indexOf(' mousetrap ') > -1) {
            return false;
        }

        if (_belongsTo(element, self.target)) {
            return false;
        }

        // stop for input, select, and textarea
        return element.tagName == 'INPUT' || element.tagName == 'SELECT' || element.tagName == 'TEXTAREA' || element.isContentEditable;
    };

    /**
     * exposes _handleKey publicly so it can be overwritten by extensions
     */
    Mousetrap.prototype.handleKey = function() {
        var self = this;
        return self._handleKey.apply(self, arguments);
    };

    /**
     * allow custom key mappings
     */
    Mousetrap.addKeycodes = function(object) {
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                _MAP[key] = object[key];
            }
        }
        _REVERSE_MAP = null;
    };

    /**
     * Init the global mousetrap functions
     *
     * This method is needed to allow the global mousetrap functions to work
     * now that mousetrap is a constructor function.
     */
    Mousetrap.init = function() {
        var documentMousetrap = Mousetrap(document);
        for (var method in documentMousetrap) {
            if (method.charAt(0) !== '_') {
                Mousetrap[method] = (function(method) {
                    return function() {
                        return documentMousetrap[method].apply(documentMousetrap, arguments);
                    };
                } (method));
            }
        }
    };

    Mousetrap.init();

    // expose mousetrap to the global object
    window.Mousetrap = Mousetrap;

    // expose as a common js module
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Mousetrap;
    }

    // expose mousetrap as an AMD module
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return Mousetrap;
        });
    }
}) (typeof window !== 'undefined' ? window : null, typeof  window !== 'undefined' ? document : null);

},{}],14:[function(require,module,exports) {
var define;
var global = arguments[3];
!function(t,r){"object"==typeof exports&&"undefined"!=typeof module?module.exports=r():"function"==typeof define&&define.amd?define(r):t.cornify=r()}(this,function(){"use strict";var t="object"==typeof global&&global&&global.Object===Object&&global,r="object"==typeof self&&self&&self.Object===Object&&self,e=t||r||Function("return this")(),n=e.Symbol,o=Object.prototype,u=o.hasOwnProperty,c=o.toString,a=n?n.toStringTag:void 0;var i=Object.prototype.toString;var f="[object Null]",l="[object Undefined]",p=n?n.toStringTag:void 0;function v(t){return null==t?void 0===t?l:f:p&&p in Object(t)?function(t){var r=u.call(t,a),e=t[a];try{t[a]=void 0;var n=!0}catch(t){}var o=c.call(t);return n&&(r?t[a]=e:delete t[a]),o}(t):(r=t,i.call(r));var r}function s(t){var r=typeof t;return null!=t&&("object"==r||"function"==r)}var b="[object AsyncFunction]",y="[object Function]",d="[object GeneratorFunction]",j="[object Proxy]";function g(t){if(!s(t))return!1;var r=v(t);return r==y||r==d||r==b||r==j}var h,m=e["__core-js_shared__"],O=(h=/[^.]+$/.exec(m&&m.keys&&m.keys.IE_PROTO||""))?"Symbol(src)_1."+h:"";var _=Function.prototype.toString;var A=/^\[object .+?Constructor\]$/,x=Function.prototype,S=Object.prototype,w=x.toString,$=S.hasOwnProperty,P=RegExp("^"+w.call($).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function F(t){return!(!s(t)||O&&O in t)&&(g(t)?P:A).test(function(t){if(null!=t){try{return _.call(t)}catch(t){}try{return t+""}catch(t){}}return""}(t))}var E=function(){try{var t=(r=Object,F(n=null==(e=r)?void 0:e["defineProperty"])?n:void 0);return t({},"",{}),t}catch(t){}var r,e,n}();function M(t,r,e){"__proto__"==r&&E?E(t,r,{configurable:!0,enumerable:!0,value:e,writable:!0}):t[r]=e}function T(t,r){return t===r||t!=t&&r!=r}var k=Object.prototype.hasOwnProperty;function R(t){return t}function U(t,r,e){switch(e.length){case 0:return t.call(r);case 1:return t.call(r,e[0]);case 2:return t.call(r,e[0],e[1]);case 3:return t.call(r,e[0],e[1],e[2])}return t.apply(r,e)}var I=Math.max;var N=E?function(t,r){return E(t,"toString",{configurable:!0,enumerable:!1,value:(e=r,function(){return e}),writable:!0});var e}:R,z=800,B=16,C=Date.now;var D,L,q,W=(D=N,L=0,q=0,function(){var t=C(),r=B-(t-q);if(q=t,r>0){if(++L>=z)return arguments[0]}else L=0;return D.apply(void 0,arguments)});function G(t,r){return W((e=t,o=R,n=I(void 0===(n=r)?e.length-1:n,0),function(){for(var t=arguments,r=-1,u=I(t.length-n,0),c=Array(u);++r<u;)c[r]=t[n+r];r=-1;for(var a=Array(n+1);++r<n;)a[r]=t[r];return a[n]=o(c),U(e,this,a)}),t+"");var e,n,o}var V=9007199254740991;function H(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=V}function J(t){return null!=t&&H(t.length)&&!g(t)}var K=9007199254740991,Q=/^(?:0|[1-9]\d*)$/;function X(t,r){return!!(r=null==r?K:r)&&("number"==typeof t||Q.test(t))&&t>-1&&t%1==0&&t<r}function Y(t,r,e){if(!s(e))return!1;var n=typeof r;return!!("number"==n?J(e)&&X(r,e.length):"string"==n&&r in e)&&T(e[r],t)}function Z(t,r){for(var e=-1,n=Array(t);++e<t;)n[e]=r(e);return n}function tt(t){return null!=t&&"object"==typeof t}var rt="[object Arguments]";function et(t){return tt(t)&&v(t)==rt}var nt=Object.prototype,ot=nt.hasOwnProperty,ut=nt.propertyIsEnumerable,ct=et(function(){return arguments}())?et:function(t){return tt(t)&&ot.call(t,"callee")&&!ut.call(t,"callee")},at=Array.isArray;var it="object"==typeof exports&&exports&&!exports.nodeType&&exports,ft=it&&"object"==typeof module&&module&&!module.nodeType&&module,lt=ft&&ft.exports===it?e.Buffer:void 0,pt=(lt?lt.isBuffer:void 0)||function(){return!1},vt={};vt["[object Float32Array]"]=vt["[object Float64Array]"]=vt["[object Int8Array]"]=vt["[object Int16Array]"]=vt["[object Int32Array]"]=vt["[object Uint8Array]"]=vt["[object Uint8ClampedArray]"]=vt["[object Uint16Array]"]=vt["[object Uint32Array]"]=!0,vt["[object Arguments]"]=vt["[object Array]"]=vt["[object ArrayBuffer]"]=vt["[object Boolean]"]=vt["[object DataView]"]=vt["[object Date]"]=vt["[object Error]"]=vt["[object Function]"]=vt["[object Map]"]=vt["[object Number]"]=vt["[object Object]"]=vt["[object RegExp]"]=vt["[object Set]"]=vt["[object String]"]=vt["[object WeakMap]"]=!1;var st,bt="object"==typeof exports&&exports&&!exports.nodeType&&exports,yt=bt&&"object"==typeof module&&module&&!module.nodeType&&module,dt=yt&&yt.exports===bt&&t.process,jt=function(){try{return dt&&dt.binding&&dt.binding("util")}catch(t){}}(),gt=jt&&jt.isTypedArray,ht=gt?(st=gt,function(t){return st(t)}):function(t){return tt(t)&&H(t.length)&&!!vt[v(t)]},mt=Object.prototype.hasOwnProperty;function Ot(t,r){var e=at(t),n=!e&&ct(t),o=!e&&!n&&pt(t),u=!e&&!n&&!o&&ht(t),c=e||n||o||u,a=c?Z(t.length,String):[],i=a.length;for(var f in t)!r&&!mt.call(t,f)||c&&("length"==f||o&&("offset"==f||"parent"==f)||u&&("buffer"==f||"byteLength"==f||"byteOffset"==f)||X(f,i))||a.push(f);return a}var _t=Object.prototype;function At(t){var r=t&&t.constructor;return t===("function"==typeof r&&r.prototype||_t)}var xt=Object.prototype.hasOwnProperty;function St(t){if(!s(t))return function(t){var r=[];if(null!=t)for(var e in Object(t))r.push(e);return r}(t);var r=At(t),e=[];for(var n in t)("constructor"!=n||!r&&xt.call(t,n))&&e.push(n);return e}var wt,$t=(wt=function(t,r,e,n){var o;!function(t,r,e,n){var o=!e;e||(e={});for(var u,c,a,i,f=-1,l=r.length;++f<l;){var p=r[f],v=n?n(e[p],t[p],p,e,t):void 0;void 0===v&&(v=t[p]),o?M(e,p,v):(a=v,i=(u=e)[c=p],k.call(u,c)&&T(i,a)&&(void 0!==a||c in u)||M(u,c,a))}}(r,(o=r,J(o)?Ot(o,!0):St(o)),t,n)},G(function(t,r){var e=-1,n=r.length,o=n>1?r[n-1]:void 0,u=n>2?r[2]:void 0;for(o=wt.length>3&&"function"==typeof o?(n--,o):void 0,u&&Y(r[0],r[1],u)&&(o=n<3?void 0:o,n=1),t=Object(t);++e<n;){var c=r[e];c&&wt(t,c,e,o)}return t}));function Pt(t,r){return function(e){return t(r(e))}}var Ft=Pt(Object.getPrototypeOf,Object),Et="[object Object]",Mt=Function.prototype,Tt=Object.prototype,kt=Mt.toString,Rt=Tt.hasOwnProperty,Ut=kt.call(Object);var It="[object DOMException]",Nt="[object Error]";function zt(t){if(!tt(t))return!1;var r=v(t);return r==Nt||r==It||"string"==typeof t.message&&"string"==typeof t.name&&!function(t){if(!tt(t)||v(t)!=Et)return!1;var r=Ft(t);if(null===r)return!0;var e=Rt.call(r,"constructor")&&r.constructor;return"function"==typeof e&&e instanceof e&&kt.call(e)==Ut}(t)}var Bt=G(function(t,r){try{return U(t,void 0,r)}catch(t){return zt(t)?t:new Error(t)}});function Ct(t,r){for(var e=-1,n=null==t?0:t.length,o=Array(n);++e<n;)o[e]=r(t[e],e,t);return o}function Dt(t,r){return Ct(r,function(r){return t[r]})}var Lt=Object.prototype,qt=Lt.hasOwnProperty;function Wt(t,r,e,n){return void 0===t||T(t,Lt[e])&&!qt.call(n,e)?r:t}var Gt={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"};function Vt(t){return"\\"+Gt[t]}var Ht=Pt(Object.keys,Object),Jt=Object.prototype.hasOwnProperty;function Kt(t){return J(t)?Ot(t):function(t){if(!At(t))return Ht(t);var r=[];for(var e in Object(t))Jt.call(t,e)&&"constructor"!=e&&r.push(e);return r}(t)}var Qt=/<%=([\s\S]+?)%>/g;var Xt,Yt=(Xt={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},function(t){return null==Xt?void 0:Xt[t]}),Zt="[object Symbol]";function tr(t){return"symbol"==typeof t||tt(t)&&v(t)==Zt}var rr=1/0,er=n?n.prototype:void 0,nr=er?er.toString:void 0;function or(t){if("string"==typeof t)return t;if(at(t))return Ct(t,or)+"";if(tr(t))return nr?nr.call(t):"";var r=t+"";return"0"==r&&1/t==-rr?"-0":r}function ur(t){return null==t?"":or(t)}var cr=/[&<>"']/g,ar=RegExp(cr.source);var ir={escape:/<%-([\s\S]+?)%>/g,evaluate:/<%([\s\S]+?)%>/g,interpolate:Qt,variable:"",imports:{_:{escape:function(t){return(t=ur(t))&&ar.test(t)?t.replace(cr,Yt):t}}}},fr=/\b__p \+= '';/g,lr=/\b(__p \+=) '' \+/g,pr=/(__e\(.*?\)|\b__t\)) \+\n'';/g,vr=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,sr=/($^)/,br=/['\n\r\u2028\u2029\\]/g;var yr=Math.floor,dr=Math.random;function jr(t,r){return t+yr(dr()*(r-t+1))}function gr(t){var r=t.length;return r?t[jr(0,r-1)]:void 0}function hr(t){return gr(null==(r=t)?[]:Dt(r,Kt(r)));var r}var mr=NaN,Or=/^\s+|\s+$/g,_r=/^[-+]0x[0-9a-f]+$/i,Ar=/^0b[01]+$/i,xr=/^0o[0-7]+$/i,Sr=parseInt;var wr=1/0,$r=1.7976931348623157e308;function Pr(t){return t?(t=function(t){if("number"==typeof t)return t;if(tr(t))return mr;if(s(t)){var r="function"==typeof t.valueOf?t.valueOf():t;t=s(r)?r+"":r}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(Or,"");var e=Ar.test(t);return e||xr.test(t)?Sr(t.slice(2),e?2:8):_r.test(t)?mr:+t}(t))===wr||t===-wr?(t<0?-1:1)*$r:t==t?t:0:0===t?t:0}var Fr=parseFloat,Er=Math.min,Mr=Math.random;function Tr(t,r,e){if(e&&"boolean"!=typeof e&&Y(t,r,e)&&(r=e=void 0),void 0===e&&("boolean"==typeof r?(e=r,r=void 0):"boolean"==typeof t&&(e=t,t=void 0)),void 0===t&&void 0===r?(t=0,r=1):(t=Pr(t),void 0===r?(r=t,t=0):r=Pr(r)),t>r){var n=t;t=r,r=n}if(e||t%1||r%1){var o=Mr();return Er(t+o*(r-t+Fr("1e-"+((o+"").length-1))),r)}return jr(t,r)}function kr(t,r){for(var e=-1,n=null==t?0:t.length;++e<n&&!1!==r(t[e],e,t););return t}var Rr,Ur=function(t,r,e){for(var n=-1,o=Object(t),u=e(t),c=u.length;c--;){var a=u[Rr?c:++n];if(!1===r(o[a],a,o))break}return t};var Ir,Nr,zr=(Ir=function(t,r){return t&&Ur(t,r,Kt)},function(t,r){if(null==t)return t;if(!J(t))return Ir(t,r);for(var e=t.length,n=Nr?e:-1,o=Object(t);(Nr?n--:++n<e)&&!1!==r(o[n],n,o););return t});function Br(t){return"function"==typeof t?t:R}var Cr=9007199254740991,Dr=4294967295,Lr=Math.min;function qr(t,r){var e,n;if(e=Pr(t),n=e%1,(t=e==e?n?e-n:e:0)<1||t>Cr)return[];var o=Dr,u=Lr(t,Dr);r=Br(r),t-=Dr;for(var c=Z(u,r);++o<t;)r(o);return c}var Wr="cornify",Gr=function(t,r,e){var n=ir.imports._.templateSettings||ir;e&&Y(t,r,e)&&(r=void 0),t=ur(t),r=$t({},r,n,Wt);var o,u,c=$t({},r.imports,n.imports,Wt),a=Kt(c),i=Dt(c,a),f=0,l=r.interpolate||sr,p="__p += '",v=RegExp((r.escape||sr).source+"|"+l.source+"|"+(l===Qt?vr:sr).source+"|"+(r.evaluate||sr).source+"|$","g"),s="sourceURL"in r?"//# sourceURL="+r.sourceURL+"\n":"";t.replace(v,function(r,e,n,c,a,i){return n||(n=c),p+=t.slice(f,i).replace(br,Vt),e&&(o=!0,p+="' +\n__e("+e+") +\n'"),a&&(u=!0,p+="';\n"+a+";\n__p += '"),n&&(p+="' +\n((__t = ("+n+")) == null ? '' : __t) +\n'"),f=i+r.length,r}),p+="';\n";var b=r.variable;b||(p="with (obj) {\n"+p+"\n}\n"),p=(u?p.replace(fr,""):p).replace(lr,"$1").replace(pr,"$1;"),p="function("+(b||"obj")+") {\n"+(b?"":"obj || (obj = {});\n")+"var __t, __p = ''"+(o?", __e = _.escape":"")+(u?", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n":";\n")+p+"return __p\n}";var y=Bt(function(){return Function(a,s+"return "+p).apply(void 0,i)});if(y.source=p,zt(y))throw y;return y}("https://raw.github.com/akenn/cornify/master/images/<%= type %>/<%= id %>.gif"),Vr=[{name:"unicorn",count:7},{name:"rainbow",count:4}];function Hr(){var t,r=(at(t=Vr)?gr:hr)(t);return Gr({type:r.name,id:Tr(1,r.count)})}function Jr(){return document.body.appendChild(((t=document.createElement("img")).src=Hr(),t.className=Wr,t.style.top=Tr(100)+"%",t.style.left=Tr(100)+"%",t.style.position="fixed",t.style.transition="all .1s linear",t.onmouseover=function(){var t=Math.random()+.5,r="rotate("+(15*Math.random()+1)+"deg) scale("+t+","+t+")";this.style.transform=r,this.style.WebkitTransform=r},t.onmouseout=function(){var t="rotate(0deg) scale(1, 1)";this.style.transform=t,this.style.WebkitTransform=t},t));var t}return{add:Jr,count:function(){return document.querySelectorAll("."+Wr).length},clear:function(){var t,r;t=document.querySelectorAll("."+Wr),r=function(t){t.parentNode.removeChild(t)},(at(t)?kr:zr)(t,Br(r))},pizzazz:function(){qr(Tr(10,500),Jr)}}});

},{}],15:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function harlemshakify() {
  var MIN_HEIGHT = 30;
  var MIN_WIDTH = 30;
  var MAX_HEIGHT = 350;
  var MAX_WIDTH = 350;

  var PATH_TO_SONG = '//s3.amazonaws.com/moovweb-marketing/playground/harlem-shake.ogg';

  var CSS_BASE_CLASS = 'mw-harlem_shake_me';
  var CSS_SLOW_CLASS = 'mw-harlem_shake_slow';
  var CSS_FIRST_CLASS = 'im_first';
  var CSS_OTHER_CLASSES = ['im_drunk', 'im_baked', 'im_trippin', 'im_blown'];

  var CSS_STROBE_CLASS = 'mw-strobe_light';

  var PATH_TO_CSS = '//s3.amazonaws.com/moovweb-marketing/playground/harlem-shake-style.css';
  var FILE_ADDED_CLASS = 'mw_added_css';

  function addCSS() {
    var css = document.createElement('link');
    css.setAttribute('type', 'text/css');
    css.setAttribute('rel', 'stylesheet');
    css.setAttribute('href', PATH_TO_CSS);
    css.setAttribute('class', FILE_ADDED_CLASS);

    document.body.appendChild(css);
  }

  function removeAddedFiles() {
    var addedFiles = document.getElementsByClassName(FILE_ADDED_CLASS);
    for (var i = 0; i < addedFiles.length; i++) {
      document.body.removeChild(addedFiles[i]);
    }
  }

  function flashScreen() {
    var flash = document.createElement('div');
    flash.setAttribute('class', CSS_STROBE_CLASS);
    document.body.appendChild(flash);

    setTimeout(function () {
      document.body.removeChild(flash);
    }, 100);
  }

  function size(node) {
    return {
      height: node.offsetHeight,
      width: node.offsetWidth
    };
  }

  function withinBounds(node) {
    var nodeFrame = size(node);
    return nodeFrame.height > MIN_HEIGHT && nodeFrame.height < MAX_HEIGHT && nodeFrame.width > MIN_WIDTH && nodeFrame.width < MAX_WIDTH;
  }

  function posY(elm) {
    var test = elm;
    var top = 0;
    while (!!test) {
      top += test.offsetTop;
      test = test.offsetParent;
    }
    return top;
  }

  function viewPortHeight() {
    var de = document.documentElement;
    if (!!window.innerWidth) {
      return window.innerHeight;
    } else if (de && !isNaN(de.clientHeight)) {
      return de.clientHeight;
    }
    return 0;
  }

  function scrollY() {
    if (window.pageYOffset) {
      return window.pageYOffset;
    }
    return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
  }

  var vpH = viewPortHeight();
  var st = scrollY();

  function isVisible(node) {
    var y = posY(node);

    return y >= st && y <= vpH + st;
  }

  function playSong() {
    var audioTag = document.createElement('audio');
    audioTag.setAttribute('class', FILE_ADDED_CLASS);
    audioTag.src = PATH_TO_SONG;
    audioTag.loop = false;

    var harlem = false,
        shake = false,
        slowmo = false;

    audioTag.addEventListener('timeupdate', function () {
      var time = audioTag.currentTime,
          nodes = allShakeableNodes,
          len = nodes.length,
          i;

      // song started, start shaking first item
      if (time >= 0.5 && !harlem) {
        harlem = true;
        shakeFirst(firstNode);
      }

      // everyone else joins the party
      if (time >= 15.5 && !shake) {
        shake = true;
        stopShakeAll();
        flashScreen();
        for (i = 0; i < len; i++) {
          shakeOther(nodes[i]);
        }
      }

      // slow motion at the end
      if (audioTag.currentTime >= 28.4 && !slowmo) {
        slowmo = true;
        shakeSlowAll();
      }
    }, true);

    audioTag.addEventListener('ended', function () {
      stopShakeAll();
      removeAddedFiles();
    }, true);

    audioTag.innerHTML = '<p>If you are reading this, it is because your browser does not support the audio element. We recommend that you get a new browser.</p>';

    document.body.appendChild(audioTag);
    audioTag.play();
  }

  function shakeFirst(node) {
    node.className += ' ' + CSS_BASE_CLASS + ' ' + CSS_FIRST_CLASS;
  }

  function shakeOther(node) {
    node.className += ' ' + CSS_BASE_CLASS + ' ' + CSS_OTHER_CLASSES[Math.floor(Math.random() * CSS_OTHER_CLASSES.length)];
  }

  function shakeSlowAll() {
    var shakingNodes = document.getElementsByClassName(CSS_BASE_CLASS);
    for (var i = 0; i < shakingNodes.length;) {
      shakingNodes[i].className = shakingNodes[i].className.replace(CSS_BASE_CLASS, CSS_SLOW_CLASS);
    }
    CSS_BASE_CLASS = CSS_SLOW_CLASS;
  }

  function stopShakeAll() {
    var shakingNodes = document.getElementsByClassName(CSS_BASE_CLASS);
    var regex = new RegExp('\\b' + CSS_BASE_CLASS + '\\b');
    for (var i = 0; i < shakingNodes.length;) {
      shakingNodes[i].className = shakingNodes[i].className.replace(regex, '');
    }
  }

  // get first item
  var allNodes = document.getElementsByTagName('*'),
      len = allNodes.length,
      i,
      thisNode;
  var firstNode = null;
  for (i = 0; i < len; i++) {
    thisNode = allNodes[i];
    if (withinBounds(thisNode)) {
      if (isVisible(thisNode)) {
        firstNode = thisNode;
        break;
      }
    }
  }

  if (thisNode === null) {
    console.warn('Could not find a node of the right size. Please try a different page.');
    return;
  }

  // insert CSS
  addCSS();

  // play song
  playSong();

  var allShakeableNodes = [];

  for (i = 0; i < len; i++) {
    thisNode = allNodes[i];
    if (withinBounds(thisNode)) {
      allShakeableNodes.push(thisNode);
    }
  }
}

exports.default = harlemshakify;
},{}],7:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.c8yUnicornifyWidget = undefined;

var _mousetrap = require('mousetrap');

var _mousetrap2 = _interopRequireDefault(_mousetrap);

var _cornified = require('cornified');

var _cornified2 = _interopRequireDefault(_cornified);

var _harlemshakify = require('harlemshakify');

var _harlemshakify2 = _interopRequireDefault(_harlemshakify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var c8yUnicornifyWidget = exports.c8yUnicornifyWidget = {
    templateUrl: ':::PLUGIN_PATH:::/widget.html',
    bindings: {
        config: '<'
    },
    controllerAs: 'vm',
    controller: Controller
};
/* @ngInject */
/**
 * Created by glenn on 22.12.17.
 */
function Controller(unicornifyService) {
    var vm = this;
    _.assign(vm, {
        $onInit: $onInit,
        $onChanges: $onChanges,
        cornify: _cornified2.default,
        harlemshakify: _harlemshakify2.default
    });
    ////////////
    function $onInit() {
        _mousetrap2.default.bind('a d d enter', vm.cornify.add);
        _mousetrap2.default.bind('c l e a r enter', vm.cornify.clear);
        _mousetrap2.default.bind('p i z z a z z enter', vm.cornify.pizzazz);
        _mousetrap2.default.bind('h a r l e m enter', vm.harlemshakify);
    }
    function $onChanges(_ref) {
        var config = _ref.config;

        if (config) {
            onConfigChange(vm.config);
        }
    }
    function onConfigChange(config) {
        var deviceId = _.get(config, 'device.id');
        if (deviceId) {
            unicornifyService.getDataFor({ source: deviceId }).then(function (data) {
                vm.data = data;
            });
        }
    }
}
},{"mousetrap":13,"cornified":14,"harlemshakify":15}],8:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by glenn on 22.12.17.
 */
var c8yUnicornifyWidgetConfig = exports.c8yUnicornifyWidgetConfig = {
    templateUrl: ':::PLUGIN_PATH:::/widget-config.html',
    bindings: {
        config: '<'
    },
    controllerAs: 'vm',
    controller: Controller
};
/* @ngInject */
function Controller() {
    var vm = this;
    var defaultConfig = {};
    _.assign(vm, {
        $onInit: $onInit
    });
    ////////////
    function $onInit() {
        _.defaults(vm.config, defaultConfig);
    }
}
},{}],3:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = require('./constants.js');

var _dataService = require('./data.service.js');

var _widgetComponent = require('./widget.component.js');

var _widgetConfigComponent = require('./widget-config.component.js');

/**
 * Created by glenn on 22.12.17.
 */
exports.default = angular.module('c8y.pocs.unicornifyWidget', []).constant('unicornifyConstants', _constants.unicornifyConstants).factory('unicornifyService', _dataService.unicornifyService).component('c8yUnicornifyWidget', _widgetComponent.c8yUnicornifyWidget).component('c8yUnicornifyWidgetConfig', _widgetConfigComponent.c8yUnicornifyWidgetConfig).config(configure);
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
},{"./constants.js":5,"./data.service.js":6,"./widget.component.js":7,"./widget-config.component.js":8}],1:[function(require,module,exports) {
'use strict';

require('./widget.module');

/**
 * Created by glenn on 05.01.17.
 */
/**
 * Patch for making module concatenation work with cumulocity-node-tools,
 * otherwise "require is not defined" error is thrown both on browser and karma.
 * Not sure why, but there's something fishy on our tooling :/
 * @see https://github.com/parcel-bundler/parcel/issues/40
 */
var win = window;
win.require = win.require || {} || {};
},{"./widget.module":3}]},{},[1], null)
//# sourceMappingURL=/entry.map