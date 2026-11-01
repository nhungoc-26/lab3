import { useState } from 'react';
import { SMART_PEOPLE } from './smartPeople';
import './App.css';

function App() {
  const [people] = useState(SMART_PEOPLE);
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

  return (
    <main>
      <h1>Scientist & Pioneer Directory</h1>

      <section aria-label="Directory controls">
        <label htmlFor="search-name">
          Search by name
        </label>
        <input
          id="search-name"
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search a name..."
        />

        <label htmlFor="min-iq">
          Minimum IQ
        </label>
        <input
          id="min-iq"
          type="number"
          min="0"
          value={minIq}
         onChange={(event) => setMinIq(event.target.valueAsNumber)}
          placeholder="Minimum IQ"
        />

        <label htmlFor="sort-by">
          Sort by
        </label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="name">Name</option>
          <option value="iq">IQ</option>
          <option value="age">Age</option>
        </select>
      </section>

      <ul>
        {filteredPeople.map((person) => (
          <li key={person.id}>
            <h2>{person.name}</h2>
            <p>Age: {person.age}</p>
            <p>IQ: {person.iq}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;