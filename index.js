// A dependency graph that contains any wasm must all be imported
// asynchronously. This `index.js` file does the single async import, so
// that no one else needs to worry about it again.
import('./src/main.js').catch(e => console.error('Error importing `./src/main.js`:', e));