import { useEffect, useState } from 'react';
import {
  fetchKraftonPubgTelemetry,
  PUBG_VN_SQUADS,
} from './pubgData';
import './App.css';

function PubgMatchTelemetry({ squadId = 'te' }) {
  const [view, setView] = useState({
    status: 'IDLE',
    data: null,
    error: null,
  });

  const [retryTick, setRetryTick] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    setView({
      status: 'LOADING',
      data: null,
      error: null,
    });

    fetchKraftonPubgTelemetry(squadId, {
      signal: controller.signal,
    })
      .then((payload) => {
        setView({
          status: 'SUCCESS',
          data: payload,
          error: null,
        });
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          return;
        }

        setView({
          status: 'ERROR',
          data: null,
          error: error.message,
        });
      });

    return () => {
      controller.abort();
    };
  }, [squadId, retryTick]);

  if (view.status === 'LOADING') {
    return (
      <section
        aria-busy="true"
        className="skeleton"
      >
        <p>Syncing KRAFTON Radar...</p>
      </section>
    );
  }

  if (view.status === 'ERROR') {
    return (
      <section role="alert" className="error-card">
        <p>
          Blue-Zone Link Lost: {view.error}
        </p>

        <button
          type="button"
          onClick={() =>
            setRetryTick((tick) => tick + 1)
          }
        >
          Reconnect Satellite (Retry)
        </button>
      </section>
    );
  }

  if (view.status === 'SUCCESS') {
    return (
      <article
        aria-live="polite"
        className="telemetry-card"
      >
        <h2>{view.data.name}</h2>

        <div className="telemetry-grid">
          <p>
            <strong>Map:</strong> {view.data.map}
          </p>

          <p>
            <strong>Phase:</strong> {view.data.phase}
          </p>

          <p>
            <strong>Alive:</strong> {view.data.alive}
          </p>

          <p>
            <strong>Kills:</strong> {view.data.kills}
          </p>

          <p>
            <strong>WWCD Probability:</strong>{' '}
            {view.data.wwcdProb}
          </p>

          <p>
            <strong>Status:</strong> {view.data.status}
          </p>
        </div>
      </article>
    );
  }

  return null;
}

function App() {
  const [selectedSquad, setSelectedSquad] = useState('te');

  return (
    <main className="app">
      <header>
        <p className="eyebrow">
          KRAFTON PUBG Vietnam Series
        </p>

        <h1>PVS Live Telemetry</h1>

        <p>
          Live satellite radar for Vietnamese PUBG
          professional squads.
        </p>
      </header>

      <nav
        aria-label="PUBG squad selector"
        className="squad-selector"
      >
        {PUBG_VN_SQUADS.map((squad) => (
          <button
            key={squad.id}
            type="button"
            className={
              selectedSquad === squad.id
                ? 'active'
                : ''
            }
            aria-pressed={
              selectedSquad === squad.id
            }
            onClick={() =>
              setSelectedSquad(squad.id)
            }
          >
            {squad.name}
          </button>
        ))}
      </nav>

      <PubgMatchTelemetry
        squadId={selectedSquad}
      />
    </main>
  );
}

export default App;