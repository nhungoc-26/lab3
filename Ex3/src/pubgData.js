export const PUBG_VN_SQUADS = [
  {
    id: 'ces',
    name: 'Cerberus Esports',
    map: 'Erangel',
    phase: 'Phase 6',
    alive: 4,
    kills: 14,
    wwcdProb: '68%',
    status: 'In Safe Zone',
  },
  {
    id: 'te',
    name: 'The Expendables',
    map: 'Miramar',
    phase: 'Phase 7',
    alive: 4,
    kills: 18,
    wwcdProb: '82%',
    status: 'Holding High Ground',
  },
  {
    id: 'ge',
    name: 'Genius Esports',
    map: 'Taego',
    phase: 'Phase 5',
    alive: 3,
    kills: 9,
    wwcdProb: '41%',
    status: 'Rotating Blue Zone',
  },
];

export function fetchKraftonPubgTelemetry(
  squadId,
  { signal } = {},
) {
  return new Promise((resolve, reject) => {
    const squad = PUBG_VN_SQUADS.find(
      (item) => item.id === squadId,
    );

    if (!squad) {
      reject(new Error('Squad not found.'));
      return;
    }

    const timeoutId = setTimeout(() => {
      if (signal?.aborted) {
        return;
      }

      // Simulate 35% satellite packet loss.
      if (Math.random() < 0.35) {
        reject(new Error('Satellite packet timeout.'));
        return;
      }

      resolve(squad);
    }, 1000);

    signal?.addEventListener(
      'abort',
      () => {
        clearTimeout(timeoutId);
        reject(new DOMException('Request aborted.', 'AbortError'));
      },
      { once: true },
    );
  });
}