
'use client';

import type { FilterState } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Filter, MapPin, CalendarDays, BarChartHorizontalBig, ListFilter, CheckSquare, Square } from 'lucide-react';
import { socialDeterminantsMap, allDeterminantKeys as defaultDeterminants } from './icon-map';

interface FiltersBarProps {
  countries: string[];
  years: (number | string)[];
  initialFilters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
}

export function FiltersBar({ countries, years, initialFilters, onFilterChange }: FiltersBarProps) {
  
  const handleCountryChange = (country: string, checked: boolean) => {
    const newSelectedCountries = checked
      ? [...initialFilters.countries, country]
      : initialFilters.countries.filter(c => c !== country);
    onFilterChange({ ...initialFilters, countries: newSelectedCountries.sort() });
  };

  const handleSelectAllCountries = () => {
    if (initialFilters.countries.length === countries.length) {
      onFilterChange({ ...initialFilters, countries: [] }); // Deselect all
    } else {
      onFilterChange({ ...initialFilters, countries: [...countries].sort() }); // Select all
    }
  };

  const handleYearChange = (value: string) => {
    const yearValue = value === 'all' ? 'all' : parseInt(value, 10);
    onFilterChange({ ...initialFilters, year: yearValue });
  };

  const handleDeterminantChange = (determinantKey: string, checked: boolean) => {
    const newSelectedDeterminants = checked
      ? [...initialFilters.selectedDeterminants, determinantKey]
      : initialFilters.selectedDeterminants.filter(key => key !== determinantKey);
    onFilterChange({ ...initialFilters, selectedDeterminants: newSelectedDeterminants });
  };
  
  const getCountryDropdownLabel = () => {
    if (initialFilters.countries.length === 0) return "Select Countries";
    if (initialFilters.countries.length === 1) return initialFilters.countries[0];
    if (initialFilters.countries.length === countries.length) return "All Countries Selected";
    return `${initialFilters.countries.length} Countries Selected`;
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <Filter className="mr-2 h-6 w-6 text-primary" />
          Filter Data
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="country-select-trigger" className="flex items-center font-semibold">
            <MapPin className="mr-2 h-5 w-5 text-primary" />
            Countries
          </Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" id="country-select-trigger" className="w-full justify-between">
                {getCountryDropdownLabel()}
                <ListFilter className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full max-h-80 overflow-y-auto">
              <DropdownMenuLabel>Select Countries</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSelectAllCountries} className="cursor-pointer">
                {initialFilters.countries.length === countries.length ? (
                  <CheckSquare className="mr-2 h-4 w-4" />
                ) : (
                  <Square className="mr-2 h-4 w-4" />
                )}
                {initialFilters.countries.length === countries.length ? "Deselect All" : "Select All"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {countries.map(country => (
                <DropdownMenuCheckboxItem
                  key={country}
                  checked={initialFilters.countries.includes(country)}
                  onCheckedChange={(checked) => handleCountryChange(country, !!checked)}
                >
                  {country}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-2">
          <Label htmlFor="year-select" className="flex items-center font-semibold">
            <CalendarDays className="mr-2 h-5 w-5 text-primary" />
            Year
          </Label>
          <Select value={String(initialFilters.year)} onValueChange={handleYearChange}>
            <SelectTrigger id="year-select" className="w-full">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map(year => (
                <SelectItem key={String(year)} value={String(year)}>
                  {year === 'all' || year === 0 ? 'All Years' : year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2 md:col-span-2 lg:col-span-1">
          <Label className="flex items-center font-semibold">
            <BarChartHorizontalBig className="mr-2 h-5 w-5 text-primary" />
            Social Determinants
          </Label>
          <div className="grid grid-cols-2 gap-2 pt-1">
            {defaultDeterminants.map(key => {
              const determinant = socialDeterminantsMap[key];
              if (!determinant) return null;
              return (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={`determinant-${key}`}
                  checked={initialFilters.selectedDeterminants.includes(key)}
                  onCheckedChange={(checked) => handleDeterminantChange(key, !!checked)}
                />
                <Label htmlFor={`determinant-${key}`} className="text-sm font-normal flex items-center">
                  <determinant.icon className="mr-1.5 h-4 w-4 text-muted-foreground" />
                  {determinant.label}
                </Label>
              </div>
            )})}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
