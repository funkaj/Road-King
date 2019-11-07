/** 
 * common/index.js
 * 
 * What it Does:
 *   This file sets up our react app to render inside of the root html
 *   file. The global css file is included here as well as our service
 *   worker is registered.
 * 
 * Things to Change:
 *   Anything outside of react that needs to be included in your project
 *   can go here. If you want additional CSS files you can include them
 *   here.
 */
import Koji from 'koji-tools';
import './index.css';
require('app/index.js');

if (module.hot) {
        module.hot.accept('app/index.js', () => {
        let oldCanvas = document.getElementsByTagName('canvas')[0];
        oldCanvas.parentNode.removeChild(oldCanvas);

        require('app/index.js');
    });

}
