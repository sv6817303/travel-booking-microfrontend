/**
 * Module Federation typings (host side).
 * When you introduce real remotes, update these module names to match your federation config.
 */
declare module 'flights/App' {
  import type { ComponentType } from 'react';
  const App: ComponentType;
  export default App;
}

declare module 'hotels/App' {
  import type { ComponentType } from 'react';
  const App: ComponentType;
  export default App;
}

