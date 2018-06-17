/**
 * Created by glenn on 05.01.17.
 */
/**
 * Patch for making module concatenation work with cumulocity-node-tools,
 * otherwise "require is not defined" error is thrown both on browser and karma.
 * Not sure why, but there's something fishy on our tooling :/
 * @see https://github.com/parcel-bundler/parcel/issues/40
 */
const win = window;
win.require = win.require || {} || {};
import './widget.module';
