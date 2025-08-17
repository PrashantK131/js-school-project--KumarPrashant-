/**
 * Entry point for the Timeline Application
 */
import { TimelineApp } from './app.js';
import { logError } from './utils.js';
import { Environment } from './browser-types.js';
/**
 * Initialize the application when DOM is ready
 */
function initializeApp() {
    try {
        const app = new TimelineApp();
        app.initialize();
        // Expose app instance to window for debugging (development only)
        if (Environment.isDevelopment()) {
            window.timelineApp = app;
        }
    }
    catch (error) {
        logError('App Initialization', error);
        // Show user-friendly error message
        const errorMessage = document.createElement('div');
        errorMessage.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #f8d7da;
      color: #721c24;
      padding: 1rem 2rem;
      border-radius: 8px;
      border: 1px solid #f5c6cb;
      font-family: Arial, sans-serif;
      text-align: center;
      z-index: 9999;
    `;
        errorMessage.innerHTML = `
      <h3>Application Error</h3>
      <p>Failed to initialize the timeline application.</p>
      <p><small>Please refresh the page or check the browser console for details.</small></p>
    `;
        document.body.appendChild(errorMessage);
    }
}
/**
 * Wait for DOM to be ready before initializing
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
}
else {
    // DOM is already ready
    initializeApp();
}
//# sourceMappingURL=index.js.map