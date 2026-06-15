import type { Country } from '../../types';
import { CountryCard } from '../country-card/country-card';
import { getPopulationForYear, createYearDataMap } from '../../utils/data-transformers';

import styles from './country-list.module.css';

import { List, useDynamicRowHeight } from "react-window";

import { type RowComponentProps } from "react-window";
import { memo, useMemo } from 'react';
 
function CardRow({
  index,
  style, 
  countries,
  selectedYear,
  selectedColumns
}: RowComponentProps<{
  countries: Country[];
  selectedYear: number;
  selectedColumns: string[];
}>) {
  const country = countries[index];
  return (
    <div style={style}>
      <CountryCard
          key={country.id}
          country={country}
          selectedYear={selectedYear}
          selectedColumns={selectedColumns}
        />
    </div>
  );
}

type CountryListProps = {
  countries: Country[];
  searchQuery: string;
  selectedColumns: string[];
  selectedRegion: string;
  selectedYear: number;
  sortField: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  onYearChange: (year: number) => void;
};

export const CountryList = memo(({
  countries,
  searchQuery,
  selectedColumns,
  selectedRegion,
  selectedYear,
  sortField,
  sortOrder,
}: CountryListProps) => {
  const filteredCountries = useMemo(() => countries
    .filter((c) => {
      const matchesSearch = c.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = !selectedRegion || c.data.some((d) => d.region === selectedRegion);
      return matchesSearch && matchesRegion;
    })
    .sort((a, b) => {
      if (sortField === 'name') {
        return sortOrder === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
      } else {
        const popA = getPopulationForYear(createYearDataMap(a.data), selectedYear) || 0;
        const popB = getPopulationForYear(createYearDataMap(b.data), selectedYear) || 0;
        return sortOrder === 'asc' ? popA - popB : popB - popA;
      }
    }), [countries, searchQuery, selectedRegion, sortField, sortOrder, selectedYear]
  );

  const rowHeight = useDynamicRowHeight({
    defaultRowHeight: 150
  });

  return (
    <div className={styles.countryList}>
      <List
        rowComponent={CardRow}
        rowCount={filteredCountries.length}
        rowHeight={rowHeight}
        rowProps={{ 
          countries: filteredCountries,
          selectedYear: selectedYear,
          selectedColumns: selectedColumns
        }}
        style={{
          height: '100vh',
          width: '100%',
        }}
      />
    </div>
  );
});
