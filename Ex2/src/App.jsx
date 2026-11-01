import { useId, useState } from 'react';
import { SMART_PEOPLE } from './smartPeople';
import './App.css';

function App() {
  const searchId = useId();
  const minIqId = useId();
  const sortId = useId();

  const [people, setPeople] = useState(SMART_PEOPLE);
  const [searchTerm, setSearchTerm] = useState('');
  const [minIq, setMinIq] = useState(NaN);
  const [sortBy, setSortBy] = useState('name');

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const minIqValue = Number.isNaN(minIq) ? null : minIq;

  const filteredPeople = people
    .filter((person) => {
      const matchesName = person.name
        .toLowerCase()
        .includes(normalizedSearch);

      const matchesIq =
        minIqValue === null || person.iq >= minIqValue;

      return matchesName && matchesIq;
    })
    .toSorted((a, b) => {
      if (sortBy === 'iq') {
        return b.iq - a.iq;
      }

      if (sortBy === 'age') {
        return a.age - b.age;
      }

      return a.name.localeCompare(b.name);
    });

  const handleDelete = (id) => {
    setPeople((currentPeople) =>
      currentPeople.filter((person) => person.id !== id),
    );
  };

  const handleReset = () => {
    setPeople(SMART_PEOPLE);
  };

  return (
    <main>
      <h1>Scientist & Pioneer Directory</h1>

      <section aria-label="Directory controls">
        <div>
          <label htmlFor={searchId}>
            Search by name
          </label>
          <input
            id={searchId}
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search a name..."
          />
        </div>

        <div>
          <label htmlFor={minIqId}>
            Minimum IQ
          </label>
          <input
            id={minIqId}
            type="number"
            min="0"
            value={Number.isNaN(minIq) ? '' : minIq}
            onChange={(event) => setMinIq(event.target.valueAsNumber)}
            placeholder="Minimum IQ"
          />
        </div>

        <div>
          <label htmlFor={sortId}>
            Sort by
          </label>
          <select
            id={sortId}
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="name">Name</option>
            <option value="iq">IQ</option>
            <option value="age">Age</option>
          </select>
        </div>

        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </section>

      <p role="status" aria-live="polite">
        {filteredPeople.length} result
        {filteredPeople.length !== 1 ? 's' : ''}
      </p>

      <ul aria-label="Scientists and pioneers">
        {filteredPeople.map((person) => (
          <li key={person.id}>
            <h2>{person.name}</h2>
            <p>Age: {person.age}</p>
            <p>IQ: {person.iq}</p>

            <button
              type="button"
              onClick={() => handleDelete(person.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;