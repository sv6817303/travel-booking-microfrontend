/**
 * Micro-Frontend (Module Federation) placeholders.
 *
 * In production you’d host each remote independently:
 * - flights: https://flights.your-domain.com/assets/remoteEntry.js
 * - hotels:  https://hotels.your-domain.com/assets/remoteEntry.js
 *
 * The host would lazy-load them per route.
 */

export const remotes = {
  flights: {
    name: 'flights',
    // url: 'http://localhost:4174/assets/remoteEntry.js',
  },
  hotels: {
    name: 'hotels',
    // url: 'http://localhost:4175/assets/remoteEntry.js',
  },
} as const;

export type RemoteKey = keyof typeof remotes;

