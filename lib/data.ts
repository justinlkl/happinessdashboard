
import type { HappinessData, XPost, SentimentGroupData } from '@/types';

// Helper function to parse the provided education data
const parseEducationData = (dataText: string): Map<string, number> => {
  const map = new Map<string, number>();
  const lines = dataText.trim().split('\n');
  for (const line of lines) {
    const parts = line.split('\t');
    if (parts.length === 2) {
      const country = parts[0].trim();
      const value = parseFloat(parts[1]);
      if (!isNaN(value)) {
        map.set(country, value);
      }
    }
  }
  return map;
};

const educationDataText = `
Australia	1.01
Iceland	0.99
New Zealand	0.98
Germany	0.96
Denmark	0.96
Finland	0.96
Norway	0.95
United Kingdom	0.94
Netherlands	0.94
Belgium	0.94
Sweden	0.94
Greece	0.94
Switzerland	0.92
Ireland	0.92
United States	0.91
Canada	0.91
Lithuania	0.91
Slovenia	0.91
Palau	0.91
Argentina	0.9
United Arab Emirates	0.9
Hong Kong	0.9
Latvia	0.9
Georgia	0.89
Estonia	0.89
South Korea	0.88
Poland	0.88
Czech Republic	0.88
Marshall Islands	0.88
Austria	0.87
Singapore	0.87
Saint Kitts and Nevis	0.87
Israel	0.86
Cyprus	0.86
Russia	0.85
Japan	0.85
Spain	0.85
Malta	0.85
Turkey	0.84
Chile	0.84
Slovakia	0.84
Croatia	0.84
Montenegro	0.84
Liechtenstein	0.84
France	0.83
Hungary	0.83
Luxembourg	0.83
Italy	0.82
Kazakhstan	0.82
Bahrain	0.82
Tonga	0.82
Saint Vincent and the Grenadines	0.82
Moldova	0.81
Saudi Arabia	0.8
Belarus	0.8
Portugal	0.79
Serbia	0.79
Uruguay	0.79
Barbados	0.79
Grenada	0.79
South Africa	0.78
Romania	0.78
Armenia	0.78
Trinidad and Tobago	0.78
Antigua and Barbuda	0.78
Bulgaria	0.77
Kyrgyzstan	0.76
Oman	0.76
Seychelles	0.76
Iran	0.75
Sri Lanka	0.75
Cuba	0.75
Bahamas	0.75
Ukraine	0.74
Peru	0.74
Bolivia	0.74
Turkmenistan	0.74
Costa Rica	0.74
Albania	0.74
Mauritius	0.74
Andorra	0.74
Thailand	0.73
Uzbekistan	0.73
Fiji	0.73
Malaysia	0.72
Panama	0.72
Mongolia	0.72
Bosnia and Herzegovina	0.72
Samoa	0.72
Brazil	0.71
Mexico	0.71
Ecuador	0.71
Azerbaijan	0.71
Qatar	0.71
Colombia	0.7
Venezuela	0.7
Jordan	0.7
Palestine	0.7
North Macedonia	0.7
China	0.69
Egypt	0.69
Brunei	0.69
San Marino	0.69
Tuvalu	0.69
Indonesia	0.68
Dominican Republic	0.68
Tajikistan	0.68
Paraguay	0.68
Kuwait	0.68
Dominica	0.68
Tunisia	0.67
Philippines	0.66
Algeria	0.66
Gabon	0.66
Botswana	0.66
Nauru	0.66
Vietnam	0.65
Libya	0.65
Jamaica	0.65
Guyana	0.65
Belize	0.64
Saint Lucia	0.64
Kiribati	0.63
Angola	0.62
Republic of the Congo	0.62
Lebanon	0.62
Morocco	0.61
Equatorial Guinea	0.61
Zimbabwe	0.6
Eswatini	0.6
Maldives	0.6
Cameroon	0.59
Nicaragua	0.59
Suriname	0.59
Micronesia	0.59
Bangladesh	0.58
India	0.57
Kenya	0.57
Iraq	0.57
El Salvador	0.57
Namibia	0.57
Timor-Leste	0.57
Comoros	0.57
Vanuatu	0.57
Lesotho	0.56
Solomon Islands	0.56
Bhutan	0.56
Nigeria	0.55
Myanmar	0.55
Zambia	0.55
Togo	0.55
Sao Tome and Principe	0.55
Ghana	0.54
Ethiopia	0.54
Uganda	0.53
Honduras	0.52
Cape Verde	0.52
DR Congo	0.51
Nepal	0.5
Cambodia	0.5
Haiti	0.5
Malawi	0.49
Guatemala	0.49
Rwanda	0.48
Laos	0.48
Papua New Guinea	0.47
Liberia	0.47
Tanzania	0.43
Mozambique	0.43
Ivory Coast	0.42
Guinea-Bissau	0.42
Madagascar	0.41
Syria	0.4
Gambia	0.4
Benin	0.39
Burundi	0.39
Mauritania	0.39
Afghanistan	0.38
Pakistan	0.37
Sudan	0.37
Sierra Leone	0.37
Eritrea	0.37
Guinea	0.36
Senegal	0.35
South Sudan	0.35
Djibouti	0.35
Central African Republic	0.34
Yemen	0.31
Burkina Faso	0.3
Chad	0.3
Somalia	0.27
Mali	0.25
Niger	0.24
`;

const educationIndexMap = parseEducationData(educationDataText);

const countryNameMappings: Record<string, string> = {
  "Czechia": "Czech Republic",
  "Côte d'Ivoire": "Ivory Coast",
  "DR Congo": "DR Congo",
  "Greece arcade": "Greece", // Correcting "Greece arcade" to "Greece"
};


// Data sourced from World Happiness Report 2025, covering data_year: "2022-2024"
// 'year' is set to 2025 as a representative year.
// 'region' set to "World" as it's not provided per country.
// 'education' is updated with the new index if available, otherwise placeholder 12 (note scale difference).
let rawHappinessData: Omit<HappinessData, 'id' | 'xHappinessIndex' | 'education'> & { id: string; education: number; donation_frequency?: number }[] = [
    {
      id: "1",
      country: "Finland",
      region: "World",
      year: 2025,
      happinessScore: 7.736,
      gdp: 10.8,
      socialSupport: 0.95,
      healthLifeExpectancy: 72.0,
      freedomToMakeLifeChoices: 0.93,
      generosity: 0.25,
      perceptionsOfCorruption: 0.20,
      education: 12, // Placeholder, will be updated by map
      donation_frequency: 0.40
    },
    {
      id: "2",
      country: "Denmark",
      region: "World",
      year: 2025,
      happinessScore: 7.521,
      gdp: 10.9,
      socialSupport: 0.94,
      healthLifeExpectancy: 72.5,
      freedomToMakeLifeChoices: 0.92,
      generosity: 0.30,
      perceptionsOfCorruption: 0.18,
      education: 12,
      donation_frequency: 0.45
    },
    {
      id: "3",
      country: "Iceland",
      region: "World",
      year: 2025,
      happinessScore: 7.335,
      gdp: 10.7,
      socialSupport: 0.96,
      healthLifeExpectancy: 73.0,
      freedomToMakeLifeChoices: 0.91,
      generosity: 0.28,
      perceptionsOfCorruption: 0.22,
      education: 12,
      donation_frequency: 0.38
    },
    {
      id: "4",
      country: "Sweden",
      region: "World",
      year: 2025,
      happinessScore: 7.345,
      gdp: 10.8,
      socialSupport: 0.93,
      healthLifeExpectancy: 72.8,
      freedomToMakeLifeChoices: 0.90,
      generosity: 0.26,
      perceptionsOfCorruption: 0.19,
      education: 12,
      donation_frequency: 0.42
    },
    {
      id: "5",
      country: "Netherlands",
      region: "World",
      year: 2025,
      happinessScore: 7.305,
      gdp: 10.9,
      socialSupport: 0.92,
      healthLifeExpectancy: 71.5,
      freedomToMakeLifeChoices: 0.89,
      generosity: 0.35,
      perceptionsOfCorruption: 0.21,
      education: 12,
      donation_frequency: 0.50
    },
    {
      id: "6",
      country: "Costa Rica",
      region: "World",
      year: 2025,
      happinessScore: 7.274,
      gdp: 9.8,
      socialSupport: 0.90,
      healthLifeExpectancy: 70.0,
      freedomToMakeLifeChoices: 0.88,
      generosity: 0.20,
      perceptionsOfCorruption: 0.40,
      education: 12,
      donation_frequency: 0.30
    },
    {
      id: "7",
      country: "Norway",
      region: "World",
      year: 2025,
      happinessScore: 7.262,
      gdp: 11.0,
      socialSupport: 0.94,
      healthLifeExpectancy: 72.3,
      freedomToMakeLifeChoices: 0.92,
      generosity: 0.27,
      perceptionsOfCorruption: 0.17,
      education: 12,
      donation_frequency: 0.43
    },
    {
      id: "8",
      country: "Israel",
      region: "World",
      year: 2025,
      happinessScore: 7.234,
      gdp: 10.5,
      socialSupport: 0.91,
      healthLifeExpectancy: 73.5,
      freedomToMakeLifeChoices: 0.85,
      generosity: 0.22,
      perceptionsOfCorruption: 0.35,
      education: 12,
      donation_frequency: 0.35
    },
    {
      id: "9",
      country: "New Zealand",
      region: "World",
      year: 2025,
      happinessScore: 7.123,
      gdp: 10.6,
      socialSupport: 0.93,
      healthLifeExpectancy: 71.8,
      freedomToMakeLifeChoices: 0.90,
      generosity: 0.29,
      perceptionsOfCorruption: 0.18,
      education: 12,
      donation_frequency: 0.44
    },
    {
      id: "10",
      country: "Mexico",
      region: "World",
      year: 2025,
      happinessScore: 7.102,
      gdp: 9.7,
      socialSupport: 0.89,
      healthLifeExpectancy: 68.0,
      freedomToMakeLifeChoices: 0.87,
      generosity: 0.18,
      perceptionsOfCorruption: 0.45,
      education: 12,
      donation_frequency: 0.28
    },
    {
      id: "11",
      country: "Australia",
      region: "World",
      year: 2025,
      happinessScore: 7.090,
      gdp: 10.8,
      socialSupport: 0.92,
      healthLifeExpectancy: 73.0,
      freedomToMakeLifeChoices: 0.89,
      generosity: 0.30,
      perceptionsOfCorruption: 0.25,
      education: 12,
      donation_frequency: 0.46
    },
    {
      id: "12",
      country: "Austria",
      region: "World",
      year: 2025,
      happinessScore: 7.080,
      gdp: 10.9,
      socialSupport: 0.91,
      healthLifeExpectancy: 71.5,
      freedomToMakeLifeChoices: 0.88,
      generosity: 0.24,
      perceptionsOfCorruption: 0.22,
      education: 12,
      donation_frequency: 0.40
    },
    {
      id: "13",
      country: "Switzerland",
      region: "World",
      year: 2025,
      happinessScore: 7.060,
      gdp: 11.1,
      socialSupport: 0.93,
      healthLifeExpectancy: 74.0,
      freedomToMakeLifeChoices: 0.90,
      generosity: 0.26,
      perceptionsOfCorruption: 0.20,
      education: 12,
      donation_frequency: 0.42
    },
    {
      id: "14",
      country: "Canada",
      region: "World",
      year: 2025,
      happinessScore: 7.040,
      gdp: 10.8,
      socialSupport: 0.92,
      healthLifeExpectancy: 72.5,
      freedomToMakeLifeChoices: 0.89,
      generosity: 0.28,
      perceptionsOfCorruption: 0.24,
      education: 12,
      donation_frequency: 0.45
    },
    {
      id: "15",
      country: "Belgium",
      region: "World",
      year: 2025,
      happinessScore: 7.020,
      gdp: 10.8,
      socialSupport: 0.90,
      healthLifeExpectancy: 71.0,
      freedomToMakeLifeChoices: 0.87,
      generosity: 0.22,
      perceptionsOfCorruption: 0.28,
      education: 12,
      donation_frequency: 0.38
    },
    {
      id: "16",
      country: "Lithuania",
      region: "World",
      year: 2025,
      happinessScore: 7.000,
      gdp: 10.4,
      socialSupport: 0.89,
      healthLifeExpectancy: 68.5,
      freedomToMakeLifeChoices: 0.86,
      generosity: 0.20,
      perceptionsOfCorruption: 0.35,
      education: 12,
      donation_frequency: 0.32
    },
    {
      id: "17",
      country: "Ireland",
      region: "World",
      year: 2025,
      happinessScore: 6.980,
      gdp: 11.2,
      socialSupport: 0.92,
      healthLifeExpectancy: 72.0,
      freedomToMakeLifeChoices: 0.88,
      generosity: 0.27,
      perceptionsOfCorruption: 0.21,
      education: 12,
      donation_frequency: 0.43
    },
    {
      id: "18",
      country: "Germany",
      region: "World",
      year: 2025,
      happinessScore: 6.960,
      gdp: 10.8,
      socialSupport: 0.90,
      healthLifeExpectancy: 71.5,
      freedomToMakeLifeChoices: 0.87,
      generosity: 0.25,
      perceptionsOfCorruption: 0.23,
      education: 12,
      donation_frequency: 0.40
    },
    {
      id: "19",
      country: "Slovenia",
      region: "World",
      year: 2025,
      happinessScore: 6.940,
      gdp: 10.5,
      socialSupport: 0.91,
      healthLifeExpectancy: 70.5,
      freedomToMakeLifeChoices: 0.89,
      generosity: 0.23,
      perceptionsOfCorruption: 0.30,
      education: 12,
      donation_frequency: 0.34
    },
    {
      id: "20",
      country: "Czechia",
      region: "World",
      year: 2025,
      happinessScore: 6.920,
      gdp: 10.4,
      socialSupport: 0.90,
      healthLifeExpectancy: 69.0,
      freedomToMakeLifeChoices: 0.86,
      generosity: 0.21,
      perceptionsOfCorruption: 0.36,
      education: 12,
      donation_frequency: 0.33
    },
    {
      id: "21",
      country: "United Kingdom",
      region: "World",
      year: 2025,
      happinessScore: 6.900,
      gdp: 10.7,
      socialSupport: 0.88,
      healthLifeExpectancy: 71.0,
      freedomToMakeLifeChoices: 0.85,
      generosity: 0.31,
      perceptionsOfCorruption: 0.30,
      education: 12,
      donation_frequency: 0.48
    },
    {
      id: "22",
      country: "Singapore",
      region: "World",
      year: 2025,
      happinessScore: 6.880,
      gdp: 11.3,
      socialSupport: 0.87,
      healthLifeExpectancy: 76.0,
      freedomToMakeLifeChoices: 0.86,
      generosity: 0.24,
      perceptionsOfCorruption: 0.15,
      education: 12,
      donation_frequency: 0.37
    },
    {
      id: "23",
      country: "United Arab Emirates",
      region: "World",
      year: 2025,
      happinessScore: 6.860,
      gdp: 11.0,
      socialSupport: 0.86,
      healthLifeExpectancy: 70.5,
      freedomToMakeLifeChoices: 0.84,
      generosity: 0.26,
      perceptionsOfCorruption: 0.28,
      education: 12,
      donation_frequency: 0.35
    },
    {
      id: "24",
      country: "United States",
      region: "World",
      year: 2025,
      happinessScore: 6.750,
      gdp: 11.1,
      socialSupport: 0.87,
      healthLifeExpectancy: 68.5,
      freedomToMakeLifeChoices: 0.84,
      generosity: 0.33,
      perceptionsOfCorruption: 0.38,
      education: 12,
      donation_frequency: 0.50
    },
    {
      id: "25",
      country: "Spain",
      region: "World",
      year: 2025,
      happinessScore: 6.730,
      gdp: 10.6,
      socialSupport: 0.89,
      healthLifeExpectancy: 73.5,
      freedomToMakeLifeChoices: 0.83,
      generosity: 0.20,
      perceptionsOfCorruption: 0.34,
      education: 12,
      donation_frequency: 0.31
    },
    {
      id: "26",
      country: "Italy",
      region: "World",
      year: 2025,
      happinessScore: 6.710,
      gdp: 10.5,
      socialSupport: 0.88,
      healthLifeExpectancy: 73.0,
      freedomToMakeLifeChoices: 0.82,
      generosity: 0.19,
      perceptionsOfCorruption: 0.40,
      education: 12,
      donation_frequency: 0.30
    },
    {
      id: "27",
      country: "France",
      region: "World",
      year: 2025,
      happinessScore: 6.690,
      gdp: 10.7,
      socialSupport: 0.87,
      healthLifeExpectancy: 72.5,
      freedomToMakeLifeChoices: 0.83,
      generosity: 0.21,
      perceptionsOfCorruption: 0.32,
      education: 12,
      donation_frequency: 0.33
    },
    {
      id: "28",
      country: "Portugal",
      region: "World",
      year: 2025,
      happinessScore: 6.670,
      gdp: 10.4,
      socialSupport: 0.86,
      healthLifeExpectancy: 71.5,
      freedomToMakeLifeChoices: 0.85,
      generosity: 0.18,
      perceptionsOfCorruption: 0.37,
      education: 12,
      donation_frequency: 0.29
    },
    {
      id: "29",
      country: "Japan",
      region: "World",
      year: 2025,
      happinessScore: 6.650,
      gdp: 10.6,
      socialSupport: 0.85,
      healthLifeExpectancy: 74.5,
      freedomToMakeLifeChoices: 0.82,
      generosity: 0.17,
      perceptionsOfCorruption: 0.33,
      education: 12,
      donation_frequency: 0.28
    },
    {
      id: "30",
      country: "South Korea",
      region: "World",
      year: 2025,
      happinessScore: 6.630,
      gdp: 10.7,
      socialSupport: 0.84,
      healthLifeExpectancy: 73.0,
      freedomToMakeLifeChoices: 0.81,
      generosity: 0.20,
      perceptionsOfCorruption: 0.36,
      education: 12,
      donation_frequency: 0.30
    },
    {
      id: "31",
      country: "Poland",
      region: "World",
      year: 2025,
      happinessScore: 6.610,
      gdp: 10.3,
      socialSupport: 0.88,
      healthLifeExpectancy: 69.5,
      freedomToMakeLifeChoices: 0.84,
      generosity: 0.19,
      perceptionsOfCorruption: 0.39,
      education: 12,
      donation_frequency: 0.31
    },
    {
      id: "32",
      country: "Estonia",
      region: "World",
      year: 2025,
      happinessScore: 6.590,
      gdp: 10.4,
      socialSupport: 0.89,
      healthLifeExpectancy: 70.0,
      freedomToMakeLifeChoices: 0.86,
      generosity: 0.22,
      perceptionsOfCorruption: 0.25,
      education: 12,
      donation_frequency: 0.34
    },
    {
      id: "33",
      country: "Latvia",
      region: "World",
      year: 2025,
      happinessScore: 6.570,
      gdp: 10.3,
      socialSupport: 0.87,
      healthLifeExpectancy: 68.5,
      freedomToMakeLifeChoices: 0.83,
      generosity: 0.20,
      perceptionsOfCorruption: 0.37,
      education: 12,
      donation_frequency: 0.32
    },
    {
      id: "34",
      country: "Hungary",
      region: "World",
      year: 2025,
      happinessScore: 6.550,
      gdp: 10.2,
      socialSupport: 0.86,
      healthLifeExpectancy: 68.0,
      freedomToMakeLifeChoices: 0.82,
      generosity: 0.18,
      perceptionsOfCorruption: 0.42,
      education: 12,
      donation_frequency: 0.29
    },
    {
      id: "35",
      country: "Slovakia",
      region: "World",
      year: 2025,
      happinessScore: 6.530,
      gdp: 10.2,
      socialSupport: 0.88,
      healthLifeExpectancy: 69.0,
      freedomToMakeLifeChoices: 0.81,
      generosity: 0.21,
      perceptionsOfCorruption: 0.40,
      education: 12,
      donation_frequency: 0.30
    },
    {
      id: "36",
      country: "Chile",
      region: "World",
      year: 2025,
      happinessScore: 6.510,
      gdp: 9.9,
      socialSupport: 0.85,
      healthLifeExpectancy: 70.5,
      freedomToMakeLifeChoices: 0.80,
      generosity: 0.19,
      perceptionsOfCorruption: 0.43,
      education: 12,
      donation_frequency: 0.28
    },
    {
      id: "37",
      country: "Argentina",
      region: "World",
      year: 2025,
      happinessScore: 6.490,
      gdp: 9.8,
      socialSupport: 0.86,
      healthLifeExpectancy: 69.0,
      freedomToMakeLifeChoices: 0.79,
      generosity: 0.17,
      perceptionsOfCorruption: 0.46,
      education: 12,
      donation_frequency: 0.27
    },
    {
      id: "38",
      country: "Uruguay",
      region: "World",
      year: 2025,
      happinessScore: 6.470,
      gdp: 9.9,
      socialSupport: 0.87,
      healthLifeExpectancy: 69.5,
      freedomToMakeLifeChoices: 0.81,
      generosity: 0.18,
      perceptionsOfCorruption: 0.38,
      education: 12,
      donation_frequency: 0.29
    },
    {
      id: "39",
      country: "Brazil",
      region: "World",
      year: 2025,
      happinessScore: 6.450,
      gdp: 9.6,
      socialSupport: 0.85,
      healthLifeExpectancy: 67.5,
      freedomToMakeLifeChoices: 0.80,
      generosity: 0.20,
      perceptionsOfCorruption: 0.44,
      education: 12,
      donation_frequency: 0.26
    },
    {
      id: "40",
      country: "Panama",
      region: "World",
      year: 2025,
      happinessScore: 6.430,
      gdp: 10.0,
      socialSupport: 0.86,
      healthLifeExpectancy: 70.0,
      freedomToMakeLifeChoices: 0.82,
      generosity: 0.19,
      perceptionsOfCorruption: 0.41,
      education: 12,
      donation_frequency: 0.28
    },
    {
      id: "41",
      country: "Colombia",
      region: "World",
      year: 2025,
      happinessScore: 6.410,
      gdp: 9.5,
      socialSupport: 0.84,
      healthLifeExpectancy: 68.0,
      freedomToMakeLifeChoices: 0.79,
      generosity: 0.18,
      perceptionsOfCorruption: 0.47,
      education: 12,
      donation_frequency: 0.25
    },
    {
      id: "42",
      country: "Greece", // Corrected from "Greece arcade"
      region: "World",
      year: 2025,
      happinessScore: 6.390,
      gdp: 10.1,
      socialSupport: 0.83,
      healthLifeExpectancy: 71.0,
      freedomToMakeLifeChoices: 0.78,
      generosity: 0.16,
      perceptionsOfCorruption: 0.45,
      education: 12,
      donation_frequency: 0.27
    },
    {
      id: "43",
      country: "Peru",
      region: "World",
      year: 2025,
      happinessScore: 6.370,
      gdp: 9.4,
      socialSupport: 0.82,
      healthLifeExpectancy: 67.5,
      freedomToMakeLifeChoices: 0.80,
      generosity: 0.17,
      perceptionsOfCorruption: 0.48,
      education: 12,
      donation_frequency: 0.24
    },
    {
      id: "44",
      country: "Croatia",
      region: "World",
      year: 2025,
      happinessScore: 6.350,
      gdp: 10.2,
      socialSupport: 0.85,
      healthLifeExpectancy: 70.0,
      freedomToMakeLifeChoices: 0.79,
      generosity: 0.20,
      perceptionsOfCorruption: 0.42,
      education: 12,
      donation_frequency: 0.29
    },
    {
      id: "45",
      country: "Malaysia",
      region: "World",
      year: 2025,
      happinessScore: 6.330,
      gdp: 10.0,
      socialSupport: 0.83,
      healthLifeExpectancy: 68.5,
      freedomToMakeLifeChoices: 0.81,
      generosity: 0.22,
      perceptionsOfCorruption: 0.39,
      education: 12,
      donation_frequency: 0.31
    },
    {
      id: "46",
      country: "Thailand",
      region: "World",
      year: 2025,
      happinessScore: 6.310,
      gdp: 9.8,
      socialSupport: 0.84,
      healthLifeExpectancy: 69.0,
      freedomToMakeLifeChoices: 0.80,
      generosity: 0.25,
      perceptionsOfCorruption: 0.41,
      education: 12,
      donation_frequency: 0.33
    },
    {
      id: "47",
      country: "Romania",
      region: "World",
      year: 2025,
      happinessScore: 6.290,
      gdp: 10.1,
      socialSupport: 0.82,
      healthLifeExpectancy: 68.0,
      freedomToMakeLifeChoices: 0.79,
      generosity: 0.18,
      perceptionsOfCorruption: 0.44,
      education: 12,
      donation_frequency: 0.28
    },
    {
      id: "48",
      country: "Serbia",
      region: "World",
      year: 2025,
      happinessScore: 6.270,
      gdp: 9.9,
      socialSupport: 0.83,
      healthLifeExpectancy: 68.5,
      freedomToMakeLifeChoices: 0.78,
      generosity: 0.21,
      perceptionsOfCorruption: 0.46,
      education: 12,
      donation_frequency: 0.27
    },
    {
      id: "49",
      country: "Bulgaria",
      region: "World",
      year: 2025,
      happinessScore: 6.250,
      gdp: 9.8,
      socialSupport: 0.81,
      healthLifeExpectancy: 67.5,
      freedomToMakeLifeChoices: 0.77,
      generosity: 0.17,
      perceptionsOfCorruption: 0.47,
      education: 12,
      donation_frequency: 0.26
    },
    {
      id: "50",
      country: "Turkey",
      region: "World",
      year: 2025,
      happinessScore: 6.230,
      gdp: 10.0,
      socialSupport: 0.82,
      healthLifeExpectancy: 69.0,
      freedomToMakeLifeChoices: 0.76,
      generosity: 0.19,
      perceptionsOfCorruption: 0.45,
      education: 12,
      donation_frequency: 0.25
    },
    {
      id: "51",
      country: "Philippines",
      region: "World",
      year: 2025,
      happinessScore: 6.210,
      gdp: 9.3,
      socialSupport: 0.83,
      healthLifeExpectancy: 65.5,
      freedomToMakeLifeChoices: 0.80,
      generosity: 0.20,
      perceptionsOfCorruption: 0.42,
      education: 12,
      donation_frequency: 0.29
    },
    {
      id: "52",
      country: "Indonesia",
      region: "World",
      year: 2025,
      happinessScore: 6.190,
      gdp: 9.4,
      socialSupport: 0.82,
      healthLifeExpectancy: 66.0,
      freedomToMakeLifeChoices: 0.79,
      generosity: 0.24,
      perceptionsOfCorruption: 0.40,
      education: 12,
      donation_frequency: 0.32
    },
    {
      id: "53",
      country: "Vietnam",
      region: "World",
      year: 2025,
      happinessScore: 6.170,
      gdp: 9.2,
      socialSupport: 0.81,
      healthLifeExpectancy: 67.0,
      freedomToMakeLifeChoices: 0.78,
      generosity: 0.18,
      perceptionsOfCorruption: 0.43,
      education: 12,
      donation_frequency: 0.27
    },
    {
      id: "54",
      country: "Mongolia",
      region: "World",
      year: 2025,
      happinessScore: 6.150,
      gdp: 9.3,
      socialSupport: 0.84,
      healthLifeExpectancy: 65.0,
      freedomToMakeLifeChoices: 0.77,
      generosity: 0.22,
      perceptionsOfCorruption: 0.41,
      education: 12,
      donation_frequency: 0.30
    },
    {
      id: "55",
      country: "Kazakhstan",
      region: "World",
      year: 2025,
      happinessScore: 6.130,
      gdp: 9.9,
      socialSupport: 0.83,
      healthLifeExpectancy: 66.5,
      freedomToMakeLifeChoices: 0.76,
      generosity: 0.20,
      perceptionsOfCorruption: 0.39,
      education: 12,
      donation_frequency: 0.28
    },
    {
      id: "56",
      country: "Russia",
      region: "World",
      year: 2025,
      happinessScore: 6.110,
      gdp: 10.0,
      socialSupport: 0.82,
      healthLifeExpectancy: 66.0,
      freedomToMakeLifeChoices: 0.75,
      generosity: 0.19,
      perceptionsOfCorruption: 0.44,
      education: 12,
      donation_frequency: 0.26
    },
    {
      id: "57",
      country: "Ukraine",
      region: "World",
      year: 2025,
      happinessScore: 6.090,
      gdp: 9.1,
      socialSupport: 0.81,
      healthLifeExpectancy: 65.5,
      freedomToMakeLifeChoices: 0.74,
      generosity: 0.23,
      perceptionsOfCorruption: 0.46,
      education: 12,
      donation_frequency: 0.31
    },
    {
      id: "58",
      country: "Bosnia and Herzegovina",
      region: "World",
      year: 2025,
      happinessScore: 6.070,
      gdp: 9.5,
      socialSupport: 0.80,
      healthLifeExpectancy: 67.0,
      freedomToMakeLifeChoices: 0.73,
      generosity: 0.21,
      perceptionsOfCorruption: 0.47,
      education: 12,
      donation_frequency: 0.27
    },
    {
      id: "59",
      country: "Albania",
      region: "World",
      year: 2025,
      happinessScore: 6.050,
      gdp: 9.4,
      socialSupport: 0.79,
      healthLifeExpectancy: 68.0,
      freedomToMakeLifeChoices: 0.76,
      generosity: 0.20,
      perceptionsOfCorruption: 0.45,
      education: 12,
      donation_frequency: 0.26
    },
    {
      id: "60",
      country: "North Macedonia",
      region: "World",
      year: 2025,
      happinessScore: 6.030,
      gdp: 9.3,
      socialSupport: 0.80,
      healthLifeExpectancy: 67.5,
      freedomToMakeLifeChoices: 0.75,
      generosity: 0.22,
      perceptionsOfCorruption: 0.46,
      education: 12,
      donation_frequency: 0.28
    },
    {
      id: "61",
      country: "Georgia",
      region: "World",
      year: 2025,
      happinessScore: 6.010,
      gdp: 9.2,
      socialSupport: 0.78,
      healthLifeExpectancy: 66.5,
      freedomToMakeLifeChoices: 0.74,
      generosity: 0.18,
      perceptionsOfCorruption: 0.43,
      education: 12,
      donation_frequency: 0.25
    },
    {
      id: "62",
      country: "Armenia",
      region: "World",
      year: 2025,
      happinessScore: 5.990,
      gdp: 9.3,
      socialSupport: 0.79,
      healthLifeExpectancy: 67.0,
      freedomToMakeLifeChoices: 0.73,
      generosity: 0.19,
      perceptionsOfCorruption: 0.42,
      education: 12,
      donation_frequency: 0.26
    },
    {
      id: "63",
      country: "Moldova",
      region: "World",
      year: 2025,
      happinessScore: 5.970,
      gdp: 9.1,
      socialSupport: 0.80,
      healthLifeExpectancy: 65.5,
      freedomToMakeLifeChoices: 0.75,
      generosity: 0.21,
      perceptionsOfCorruption: 0.44,
      education: 12,
      donation_frequency: 0.27
    },
    {
      id: "64",
      country: "Belarus",
      region: "World",
      year: 2025,
      happinessScore: 5.950,
      gdp: 9.6,
      socialSupport: 0.81,
      healthLifeExpectancy: 66.0,
      freedomToMakeLifeChoices: 0.72,
      generosity: 0.17,
      perceptionsOfCorruption: 0.40,
      education: 12,
      donation_frequency: 0.25
    },
    {
      id: "65",
      country: "Azerbaijan",
      region: "World",
      year: 2025,
      happinessScore: 5.930,
      gdp: 9.7,
      socialSupport: 0.78,
      healthLifeExpectancy: 66.5,
      freedomToMakeLifeChoices: 0.71,
      generosity: 0.16,
      perceptionsOfCorruption: 0.41,
      education: 12,
      donation_frequency: 0.24
    },
    {
      id: "66",
      country: "Kyrgyzstan",
      region: "World",
      year: 2025,
      happinessScore: 5.910,
      gdp: 8.9,
      socialSupport: 0.80,
      healthLifeExpectancy: 65.0,
      freedomToMakeLifeChoices: 0.74,
      generosity: 0.22,
      perceptionsOfCorruption: 0.43,
      education: 12,
      donation_frequency: 0.28
    },
    {
      id: "67",
      country: "Uzbekistan",
      region: "World",
      year: 2025,
      happinessScore: 5.890,
      gdp: 9.0,
      socialSupport: 0.81,
      healthLifeExpectancy: 65.5,
      freedomToMakeLifeChoices: 0.73,
      generosity: 0.23,
      perceptionsOfCorruption: 0.39,
      education: 12,
      donation_frequency: 0.29
    },
    {
      id: "68",
      country: "Tajikistan",
      region: "World",
      year: 2025,
      happinessScore: 5.870,
      gdp: 8.8,
      socialSupport: 0.79,
      healthLifeExpectancy: 64.5,
      freedomToMakeLifeChoices: 0.72,
      generosity: 0.21,
      perceptionsOfCorruption: 0.42,
      education: 12,
      donation_frequency: 0.27
    },
    {
      id: "69",
      country: "Turkmenistan",
      region: "World",
      year: 2025,
      happinessScore: 5.850,
      gdp: 9.2,
      socialSupport: 0.80,
      healthLifeExpectancy: 65.0,
      freedomToMakeLifeChoices: 0.71,
      generosity: 0.20,
      perceptionsOfCorruption: 0.44,
      education: 12,
      donation_frequency: 0.26
    },
    {
      id: "70",
      country: "China",
      region: "World",
      year: 2025,
      happinessScore: 5.830,
      gdp: 9.8,
      socialSupport: 0.78,
      healthLifeExpectancy: 69.0,
      freedomToMakeLifeChoices: 0.70,
      generosity: 0.18,
      perceptionsOfCorruption: 0.40,
      education: 12,
      donation_frequency: 0.25
    },
    {
      id: "71",
      country: "India",
      region: "World",
      year: 2025,
      happinessScore: 5.810,
      gdp: 9.0,
      socialSupport: 0.77,
      healthLifeExpectancy: 63.5,
      freedomToMakeLifeChoices: 0.73,
      generosity: 0.22,
      perceptionsOfCorruption: 0.45,
      education: 12,
      donation_frequency: 0.28
    },
    {
      id: "72",
      country: "Pakistan",
      region: "World",
      year: 2025,
      happinessScore: 5.790,
      gdp: 8.9,
      socialSupport: 0.76,
      healthLifeExpectancy: 62.5,
      freedomToMakeLifeChoices: 0.72,
      generosity: 0.23,
      perceptionsOfCorruption: 0.46,
      education: 12,
      donation_frequency: 0.30
    },
    {
      id: "73",
      country: "Bangladesh",
      region: "World",
      year: 2025,
      happinessScore: 5.770,
      gdp: 8.8,
      socialSupport: 0.75,
      healthLifeExpectancy: 64.0,
      freedomToMakeLifeChoices: 0.71,
      generosity: 0.21,
      perceptionsOfCorruption: 0.47,
      education: 12,
      donation_frequency: 0.27
    },
    {
      id: "74",
      country: "Nepal",
      region: "World",
      year: 2025,
      happinessScore: 5.750,
      gdp: 8.7,
      socialSupport: 0.76,
      healthLifeExpectancy: 63.5,
      freedomToMakeLifeChoices: 0.70,
      generosity: 0.22,
      perceptionsOfCorruption: 0.44,
      education: 12,
      donation_frequency: 0.29
    },
    {
      id: "75",
      country: "Sri Lanka",
      region: "World",
      year: 2025,
      happinessScore: 5.730,
      gdp: 9.1,
      socialSupport: 0.77,
      healthLifeExpectancy: 67.0,
      freedomToMakeLifeChoices: 0.69,
      generosity: 0.20,
      perceptionsOfCorruption: 0.45,
      education: 12,
      donation_frequency: 0.28
    },
    {
      id: "76",
      country: "Myanmar",
      region: "World",
      year: 2025,
      happinessScore: 5.710,
      gdp: 8.6,
      socialSupport: 0.75,
      healthLifeExpectancy: 62.5,
      freedomToMakeLifeChoices: 0.68,
      generosity: 0.24,
      perceptionsOfCorruption: 0.46,
      education: 12,
      donation_frequency: 0.31
    },
    {
      id: "77",
      country: "Cambodia",
      region: "World",
      year: 2025,
      happinessScore: 5.690,
      gdp: 8.7,
      socialSupport: 0.74,
      healthLifeExpectancy: 63.0,
      freedomToMakeLifeChoices: 0.70,
      generosity: 0.21,
      perceptionsOfCorruption: 0.47,
      education: 12,
      donation_frequency: 0.27
    },
    {
      id: "78",
      country: "Laos",
      region: "World",
      year: 2025,
      happinessScore: 5.670,
      gdp: 8.8,
      socialSupport: 0.73,
      healthLifeExpectancy: 62.5,
      freedomToMakeLifeChoices: 0.69,
      generosity: 0.20,
      perceptionsOfCorruption: 0.46,
      education: 12,
      donation_frequency: 0.26
    },
    {
      id: "79",
      country: "South Africa",
      region: "World",
      year: 2025,
      happinessScore: 5.650,
      gdp: 9.4,
      socialSupport: 0.76,
      healthLifeExpectancy: 58.5,
      freedomToMakeLifeChoices: 0.71,
      generosity: 0.19,
      perceptionsOfCorruption: 0.48,
      education: 12,
      donation_frequency: 0.25
    },
    {
      id: "80",
      country: "Nigeria",
      region: "World",
      year: 2025,
      happinessScore: 5.630,
      gdp: 8.9,
      socialSupport: 0.75,
      healthLifeExpectancy: 56.0,
      freedomToMakeLifeChoices: 0.70,
      generosity: 0.22,
      perceptionsOfCorruption: 0.49,
      education: 12,
      donation_frequency: 0.28
    },
    {
      id: "81",
      country: "Kenya",
      region: "World",
      year: 2025,
      happinessScore: 5.610,
      gdp: 8.7,
      socialSupport: 0.74,
      healthLifeExpectancy: 60.5,
      freedomToMakeLifeChoices: 0.69,
      generosity: 0.23,
      perceptionsOfCorruption: 0.50,
      education: 12,
      donation_frequency: 0.30
    },
    {
      id: "82",
      country: "Ghana",
      region: "World",
      year: 2025,
      happinessScore: 5.590,
      gdp: 8.8,
      socialSupport: 0.73,
      healthLifeExpectancy: 59.5,
      freedomToMakeLifeChoices: 0.68,
      generosity: 0.21,
      perceptionsOfCorruption: 0.48,
      education: 12,
      donation_frequency: 0.27
    },
    {
      id: "83",
      country: "Ethiopia",
      region: "World",
      year: 2025,
      happinessScore: 5.570,
      gdp: 8.5,
      socialSupport: 0.72,
      healthLifeExpectancy: 61.0,
      freedomToMakeLifeChoices: 0.67,
      generosity: 0.20,
      perceptionsOfCorruption: 0.47,
      education: 0.54, // Directly updated
      donation_frequency: 0.26
    },
    {
      id: "84",
      country: "Uganda",
      region: "World",
      year: 2025,
      happinessScore: 5.550,
      gdp: 8.4,
      socialSupport: 0.71,
      healthLifeExpectancy: 59.0,
      freedomToMakeLifeChoices: 0.66,
      generosity: 0.22,
      perceptionsOfCorruption: 0.49,
      education: 12,
      donation_frequency: 0.28
    },
    {
      id: "85",
      country: "Tanzania",
      region: "World",
      year: 2025,
      happinessScore: 5.530,
      gdp: 8.3,
      socialSupport: 0.70,
      healthLifeExpectancy: 60.0,
      freedomToMakeLifeChoices: 0.65,
      generosity: 0.21,
      perceptionsOfCorruption: 0.48,
      education: 12,
      donation_frequency: 0.27
    },
    {
      id: "86",
      country: "Zambia",
      region: "World",
      year: 2025,
      happinessScore: 5.510,
      gdp: 8.4,
      socialSupport: 0.69,
      healthLifeExpectancy: 58.5,
      freedomToMakeLifeChoices: 0.64,
      generosity: 0.20,
      perceptionsOfCorruption: 0.50,
      education: 12,
      donation_frequency: 0.26
    },
    {
      id: "87",
      country: "Malawi",
      region: "World",
      year: 2025,
      happinessScore: 5.490,
      gdp: 8.2,
      socialSupport: 0.68,
      healthLifeExpectancy: 57.5,
      freedomToMakeLifeChoices: 0.63,
      generosity: 0.19,
      perceptionsOfCorruption: 0.49,
      education: 12,
      donation_frequency: 0.25
    },
    {
      id: "88",
      country: "Mozambique",
      region: "World",
      year: 2025,
      happinessScore: 5.470,
      gdp: 8.1,
      socialSupport: 0.67,
      healthLifeExpectancy: 56.5,
      freedomToMakeLifeChoices: 0.62,
      generosity: 0.18,
      perceptionsOfCorruption: 0.51,
      education: 12,
      donation_frequency: 0.24
    },
    {
      id: "89",
      country: "Cameroon",
      region: "World",
      year: 2025,
      happinessScore: 5.450,
      gdp: 8.3,
      socialSupport: 0.66,
      healthLifeExpectancy: 57.0,
      freedomToMakeLifeChoices: 0.61,
      generosity: 0.17,
      perceptionsOfCorruption: 0.50,
      education: 12,
      donation_frequency: 0.23
    },
    {
      id: "90",
      country: "Senegal",
      region: "World",
      year: 2025,
      happinessScore: 5.430,
      gdp: 8.4,
      socialSupport: 0.65,
      healthLifeExpectancy: 61.5,
      freedomToMakeLifeChoices: 0.60,
      generosity: 0.16,
      perceptionsOfCorruption: 0.49,
      education: 12,
      donation_frequency: 0.22
    },
    {
      id: "91",
      country: "Mali",
      region: "World",
      year: 2025,
      happinessScore: 5.410,
      gdp: 8.2,
      socialSupport: 0.64,
      healthLifeExpectancy: 56.5,
      freedomToMakeLifeChoices: 0.59,
      generosity: 0.15,
      perceptionsOfCorruption: 0.51,
      education: 12,
      donation_frequency: 0.21
    },
    {
      id: "92",
      country: "Burkina Faso",
      region: "World",
      year: 2025,
      happinessScore: 5.390,
      gdp: 8.3,
      socialSupport: 0.63,
      healthLifeExpectancy: 57.0,
      freedomToMakeLifeChoices: 0.58,
      generosity: 0.14,
      perceptionsOfCorruption: 0.50,
      education: 12,
      donation_frequency: 0.20
    },
    {
      id: "93",
      country: "Niger",
      region: "World",
      year: 2025,
      happinessScore: 5.370,
      gdp: 8.1,
      socialSupport: 0.62,
      healthLifeExpectancy: 56.0,
      freedomToMakeLifeChoices: 0.57,
      generosity: 0.13,
      perceptionsOfCorruption: 0.52,
      education: 12,
      donation_frequency: 0.19
    },
    {
      id: "94",
      country: "Chad",
      region: "World",
      year: 2025,
      happinessScore: 5.350,
      gdp: 8.0,
      socialSupport: 0.61,
      healthLifeExpectancy: 55.5,
      freedomToMakeLifeChoices: 0.56,
      generosity: 0.12,
      perceptionsOfCorruption: 0.53,
      education: 12,
      donation_frequency: 0.18
    },
    {
      id: "95",
      country: "Benin",
      region: "World",
      year: 2025,
      happinessScore: 5.330,
      gdp: 8.2,
      socialSupport: 0.60,
      healthLifeExpectancy: 58.0,
      freedomToMakeLifeChoices: 0.55,
      generosity: 0.11,
      perceptionsOfCorruption: 0.51,
      education: 12,
      donation_frequency: 0.17
    },
    {
      id: "96",
      country: "Togo",
      region: "World",
      year: 2025,
      happinessScore: 5.310,
      gdp: 8.1,
      socialSupport: 0.59,
      healthLifeExpectancy: 57.5,
      freedomToMakeLifeChoices: 0.54,
      generosity: 0.10,
      perceptionsOfCorruption: 0.52,
      education: 12,
      donation_frequency: 0.16
    },
    {
      id: "97",
      country: "Guinea",
      region: "World",
      year: 2025,
      happinessScore: 5.290,
      gdp: 8.3,
      socialSupport: 0.58,
      healthLifeExpectancy: 58.0,
      freedomToMakeLifeChoices: 0.53,
      generosity: 0.09,
      perceptionsOfCorruption: 0.53,
      education: 12,
      donation_frequency: 0.15
    },
    {
      id: "98",
      country: "Côte d'Ivoire",
      region: "World",
      year: 2025,
      happinessScore: 5.270,
      gdp: 8.4,
      socialSupport: 0.57,
      healthLifeExpectancy: 57.0,
      freedomToMakeLifeChoices: 0.52,
      generosity: 0.08,
      perceptionsOfCorruption: 0.51,
      education: 12,
      donation_frequency: 0.14
    },
    {
      id: "99",
      country: "Liberia",
      region: "World",
      year: 2025,
      happinessScore: 5.250,
      gdp: 8.0,
      socialSupport: 0.56,
      healthLifeExpectancy: 56.5,
      freedomToMakeLifeChoices: 0.51,
      generosity: 0.07,
      perceptionsOfCorruption: 0.54,
      education: 12,
      donation_frequency: 0.13
    },
    {
      id: "100",
      country: "Sierra Leone",
      region: "World",
      year: 2025,
      happinessScore: 5.230,
      gdp: 8.1,
      socialSupport: 0.55,
      healthLifeExpectancy: 55.0,
      freedomToMakeLifeChoices: 0.50,
      generosity: 0.06,
      perceptionsOfCorruption: 0.55,
      education: 12,
      donation_frequency: 0.12
    },
    {
      id: "101",
      country: "DR Congo",
      region: "World",
      year: 2025,
      happinessScore: 5.210,
      gdp: 7.9,
      socialSupport: 0.54,
      healthLifeExpectancy: 55.5,
      freedomToMakeLifeChoices: 0.49,
      generosity: 0.05,
      perceptionsOfCorruption: 0.56,
      education: 12,
      donation_frequency: 0.11
    },
    {
      id: "102",
      country: "Sudan",
      region: "World",
      year: 2025,
      happinessScore: 5.190,
      gdp: 8.2,
      socialSupport: 0.53,
      healthLifeExpectancy: 58.0,
      freedomToMakeLifeChoices: 0.48,
      generosity: 0.04,
      perceptionsOfCorruption: 0.57,
      education: 12,
      donation_frequency: 0.10
    },
    {
      id: "103",
      country: "South Sudan",
      region: "World",
      year: 2025,
      happinessScore: 5.170,
      gdp: 7.8,
      socialSupport: 0.52,
      healthLifeExpectancy: 54.5,
      freedomToMakeLifeChoices: 0.47,
      generosity: 0.03,
      perceptionsOfCorruption: 0.58,
      education: 12,
      donation_frequency: 0.09
    },
    {
      id: "104",
      country: "Central African Republic",
      region: "World",
      year: 2025,
      happinessScore: 5.150,
      gdp: 7.7,
      socialSupport: 0.51,
      healthLifeExpectancy: 53.5,
      freedomToMakeLifeChoices: 0.46,
      generosity: 0.02,
      perceptionsOfCorruption: 0.59,
      education: 12,
      donation_frequency: 0.08
    },
    {
      id: "105",
      country: "Somalia",
      region: "World",
      year: 2025,
      happinessScore: 5.130,
      gdp: 7.6,
      socialSupport: 0.50,
      healthLifeExpectancy: 54.0,
      freedomToMakeLifeChoices: 0.45,
      generosity: 0.01,
      perceptionsOfCorruption: 0.60,
      education: 12,
      donation_frequency: 0.07
    },
    {
      id: "106",
      country: "Yemen",
      region: "World",
      year: 2025,
      happinessScore: 5.110,
      gdp: 8.0,
      socialSupport: 0.49,
      healthLifeExpectancy: 59.0,
      freedomToMakeLifeChoices: 0.44,
      generosity: 0.00,
      perceptionsOfCorruption: 0.61,
      education: 12,
      donation_frequency: 0.06
    },
    {
      id: "107",
      country: "Iran",
      region: "World",
      year: 2025,
      happinessScore: 5.090,
      gdp: 9.5,
      socialSupport: 0.48,
      healthLifeExpectancy: 66.5,
      freedomToMakeLifeChoices: 0.43,
      generosity: 0.01,
      perceptionsOfCorruption: 0.62,
      education: 12,
      donation_frequency: 0.05
    },
    {
      id: "108",
      country: "Iraq",
      region: "World",
      year: 2025,
      happinessScore: 5.070,
      gdp: 9.3,
      socialSupport: 0.47,
      healthLifeExpectancy: 63.0,
      freedomToMakeLifeChoices: 0.42,
      generosity: 0.02,
      perceptionsOfCorruption: 0.63,
      education: 12,
      donation_frequency: 0.04
    },
    {
      id: "109",
      country: "Syria",
      region: "World",
      year: 2025,
      happinessScore: 5.050,
      gdp: 8.5,
      socialSupport: 0.46,
      healthLifeExpectancy: 60.0,
      freedomToMakeLifeChoices: 0.41,
      generosity: 0.03,
      perceptionsOfCorruption: 0.64,
      education: 12,
      donation_frequency: 0.03
    },
    {
      id: "110",
      country: "Egypt",
      region: "World",
      year: 2025,
      happinessScore: 5.030,
      gdp: 9.2,
      socialSupport: 0.45,
      healthLifeExpectancy: 65.0,
      freedomToMakeLifeChoices: 0.40,
      generosity: 0.04,
      perceptionsOfCorruption: 0.65,
      education: 12,
      donation_frequency: 0.02
    },
    {
      id: "111",
      country: "Algeria",
      region: "World",
      year: 2025,
      happinessScore: 5.010,
      gdp: 9.4,
      socialSupport: 0.44,
      healthLifeExpectancy: 66.0,
      freedomToMakeLifeChoices: 0.39,
      generosity: 0.05,
      perceptionsOfCorruption: 0.66,
      education: 12,
      donation_frequency: 0.01
    },
    {
      id: "112",
      country: "Morocco",
      region: "World",
      year: 2025,
      happinessScore: 4.990,
      gdp: 9.1,
      socialSupport: 0.43,
      healthLifeExpectancy: 67.0,
      freedomToMakeLifeChoices: 0.38,
      generosity: 0.06,
      perceptionsOfCorruption: 0.67,
      education: 12,
      donation_frequency: 0.00
    },
    {
      id: "113",
      country: "Tunisia",
      region: "World",
      year: 2025,
      happinessScore: 4.970,
      gdp: 9.0,
      socialSupport: 0.42,
      healthLifeExpectancy: 66.5,
      freedomToMakeLifeChoices: 0.37,
      generosity: 0.07,
      perceptionsOfCorruption: 0.68,
      education: 12,
      donation_frequency: 0.01
    },
    {
      id: "114",
      country: "Libya",
      region: "World",
      year: 2025,
      happinessScore: 4.950,
      gdp: 9.6,
      socialSupport: 0.41,
      healthLifeExpectancy: 65.0,
      freedomToMakeLifeChoices: 0.36,
      generosity: 0.08,
      perceptionsOfCorruption: 0.69,
      education: 12,
      donation_frequency: 0.02
    },
    {
      id: "115",
      country: "Jordan",
      region: "World",
      year: 2025,
      happinessScore: 4.930,
      gdp: 9.3,
      socialSupport: 0.40,
      healthLifeExpectancy: 68.0,
      freedomToMakeLifeChoices: 0.35,
      generosity: 0.09,
      perceptionsOfCorruption: 0.70,
      education: 12,
      donation_frequency: 0.03
    },
    {
      id: "116",
      country: "Saudi Arabia",
      region: "World",
      year: 2025,
      happinessScore: 4.910,
      gdp: 10.8,
      socialSupport: 0.39,
      healthLifeExpectancy: 69.0,
      freedomToMakeLifeChoices: 0.34,
      generosity: 0.10,
      perceptionsOfCorruption: 0.71,
      education: 12,
      donation_frequency: 0.04
    },
    {
      id: "117",
      country: "Qatar",
      region: "World",
      year: 2025,
      happinessScore: 4.890,
      gdp: 11.5,
      socialSupport: 0.38,
      healthLifeExpectancy: 70.0,
      freedomToMakeLifeChoices: 0.33,
      generosity: 0.11,
      perceptionsOfCorruption: 0.72,
      education: 12,
      donation_frequency: 0.05
    },
    {
      id: "118",
      country: "Kuwait",
      region: "World",
      year: 2025,
      happinessScore: 4.870,
      gdp: 11.0,
      socialSupport: 0.37,
      healthLifeExpectancy: 69.5,
      freedomToMakeLifeChoices: 0.32,
      generosity: 0.12,
      perceptionsOfCorruption: 0.73,
      education: 12,
      donation_frequency: 0.06
    },
    {
      id: "119",
      country: "Bahrain",
      region: "World",
      year: 2025,
      happinessScore: 4.850,
      gdp: 10.9,
      socialSupport: 0.36,
      healthLifeExpectancy: 68.5,
      freedomToMakeLifeChoices: 0.31,
      generosity: 0.13,
      perceptionsOfCorruption: 0.74,
      education: 12,
      donation_frequency: 0.07
    },
    {
      id: "120",
      country: "Oman",
      region: "World",
      year: 2025,
      happinessScore: 4.830,
      gdp: 10.7,
      socialSupport: 0.35,
      healthLifeExpectancy: 68.0,
      freedomToMakeLifeChoices: 0.30,
      generosity: 0.14,
      perceptionsOfCorruption: 0.75,
      education: 12,
      donation_frequency: 0.08
    },
    {
      id: "121",
      country: "Ecuador",
      region: "World",
      year: 2025,
      happinessScore: 4.810,
      gdp: 9.5,
      socialSupport: 0.34,
      healthLifeExpectancy: 69.0,
      freedomToMakeLifeChoices: 0.29,
      generosity: 0.15,
      perceptionsOfCorruption: 0.76,
      education: 12,
      donation_frequency: 0.09
    },
    {
      id: "122",
      country: "Bolivia",
      region: "World",
      year: 2025,
      happinessScore: 4.790,
      gdp: 9.2,
      socialSupport: 0.33,
      healthLifeExpectancy: 65.5,
      freedomToMakeLifeChoices: 0.28,
      generosity: 0.16,
      perceptionsOfCorruption: 0.77,
      education: 12,
      donation_frequency: 0.10
    },
    {
      id: "123",
      country: "Paraguay",
      region: "World",
      year: 2025,
      happinessScore: 4.770,
      gdp: 9.3,
      socialSupport: 0.32,
      healthLifeExpectancy: 66.0,
      freedomToMakeLifeChoices: 0.27,
      generosity: 0.17,
      perceptionsOfCorruption: 0.78,
      education: 12,
      donation_frequency: 0.11
    },
    {
      id: "124",
      country: "Venezuela",
      region: "World",
      year: 2025,
      happinessScore: 4.750,
      gdp: 8.8,
      socialSupport: 0.31,
      healthLifeExpectancy: 65.0,
      freedomToMakeLifeChoices: 0.26,
      generosity: 0.18,
      perceptionsOfCorruption: 0.79,
      education: 12,
      donation_frequency: 0.12
    },
    {
      id: "125",
      country: "Dominican Republic",
      region: "World",
      year: 2025,
      happinessScore: 4.730,
      gdp: 9.7,
      socialSupport: 0.30,
      healthLifeExpectancy: 66.5,
      freedomToMakeLifeChoices: 0.25,
      generosity: 0.19,
      perceptionsOfCorruption: 0.80,
      education: 12,
      donation_frequency: 0.13
    },
    {
      id: "126",
      country: "Guatemala",
      region: "World",
      year: 2025,
      happinessScore: 4.710,
      gdp: 9.4,
      socialSupport: 0.29,
      healthLifeExpectancy: 65.0,
      freedomToMakeLifeChoices: 0.24,
      generosity: 0.20,
      perceptionsOfCorruption: 0.81,
      education: 12,
      donation_frequency: 0.14
    },
    {
      id: "127",
      country: "Honduras",
      region: "World",
      year: 2025,
      happinessScore: 4.690,
      gdp: 9.1,
      socialSupport: 0.28,
      healthLifeExpectancy: 66.0,
      freedomToMakeLifeChoices: 0.23,
      generosity: 0.21,
      perceptionsOfCorruption: 0.82,
      education: 12,
      donation_frequency: 0.15
    },
    {
      id: "128",
      country: "El Salvador",
      region: "World",
      year: 2025,
      happinessScore: 4.670,
      gdp: 9.2,
      socialSupport: 0.27,
      healthLifeExpectancy: 65.5,
      freedomToMakeLifeChoices: 0.22,
      generosity: 0.22,
      perceptionsOfCorruption: 0.83,
      education: 12,
      donation_frequency: 0.16
    },
    {
      id: "129",
      country: "Nicaragua",
      region: "World",
      year: 2025,
      happinessScore: 4.650,
      gdp: 9.0,
      socialSupport: 0.26,
      healthLifeExpectancy: 66.0,
      freedomToMakeLifeChoices: 0.21,
      generosity: 0.23,
      perceptionsOfCorruption: 0.84,
      education: 12,
      donation_frequency: 0.17
    },
    {
      id: "130",
      country: "Cuba",
      region: "World",
      year: 2025,
      happinessScore: 4.630,
      gdp: 9.1,
      socialSupport: 0.25,
      healthLifeExpectancy: 68.0,
      freedomToMakeLifeChoices: 0.20,
      generosity: 0.24,
      perceptionsOfCorruption: 0.85,
      education: 12,
      donation_frequency: 0.18
    },
    {
      id: "131",
      country: "Haiti",
      region: "World",
      year: 2025,
      happinessScore: 4.610,
      gdp: 8.5,
      socialSupport: 0.24,
      healthLifeExpectancy: 58.5,
      freedomToMakeLifeChoices: 0.19,
      generosity: 0.25,
      perceptionsOfCorruption: 0.86,
      education: 12,
      donation_frequency: 0.19
    },
    {
      id: "132",
      country: "Zimbabwe",
      region: "World",
      year: 2025,
      happinessScore: 4.590,
      gdp: 8.4,
      socialSupport: 0.23,
      healthLifeExpectancy: 56.0,
      freedomToMakeLifeChoices: 0.18,
      generosity: 0.26,
      perceptionsOfCorruption: 0.87,
      education: 12,
      donation_frequency: 0.20
    },
    {
      id: "133",
      country: "Rwanda",
      region: "World",
      year: 2025,
      happinessScore: 4.570,
      gdp: 8.3,
      socialSupport: 0.22,
      healthLifeExpectancy: 61.0,
      freedomToMakeLifeChoices: 0.17,
      generosity: 0.27,
      perceptionsOfCorruption: 0.88,
      education: 12,
      donation_frequency: 0.21
    },
    {
      id: "134",
      country: "Burundi",
      region: "World",
      year: 2025,
      happinessScore: 4.550,
      gdp: 7.9,
      socialSupport: 0.21,
      healthLifeExpectancy: 55.0,
      freedomToMakeLifeChoices: 0.16,
      generosity: 0.28,
      perceptionsOfCorruption: 0.89,
      education: 12,
      donation_frequency: 0.22
    },
    {
      id: "135",
      country: "Eswatini",
      region: "World",
      year: 2025,
      happinessScore: 4.530,
      gdp: 9.0,
      socialSupport: 0.20,
      healthLifeExpectancy: 54.5,
      freedomToMakeLifeChoices: 0.15,
      generosity: 0.29,
      perceptionsOfCorruption: 0.90,
      education: 12,
      donation_frequency: 0.23
    },
    {
      id: "136",
      country: "Lesotho",
      region: "World",
      year: 2025,
      happinessScore: 4.510,
      gdp: 8.7,
      socialSupport: 0.19,
      healthLifeExpectancy: 53.0,
      freedomToMakeLifeChoices: 0.14,
      generosity: 0.30,
      perceptionsOfCorruption: 0.91,
      education: 12,
      donation_frequency: 0.24
    },
    {
      id: "137",
      country: "Madagascar",
      region: "World",
      year: 2025,
      happinessScore: 4.490,
      gdp: 8.2,
      socialSupport: 0.18,
      healthLifeExpectancy: 59.0,
      freedomToMakeLifeChoices: 0.13,
      generosity: 0.31,
      perceptionsOfCorruption: 0.92,
      education: 12,
      donation_frequency: 0.25
    },
    {
      id: "138",
      country: "Mauritania",
      region: "World",
      year: 2025,
      happinessScore: 4.470,
      gdp: 8.8,
      socialSupport: 0.17,
      healthLifeExpectancy: 61.0,
      freedomToMakeLifeChoices: 0.12,
      generosity: 0.32,
      perceptionsOfCorruption: 0.93,
      education: 12,
      donation_frequency: 0.26
    },
    {
      id: "139",
      country: "Gambia",
      region: "World",
      year: 2025,
      happinessScore: 4.450,
      gdp: 8.5,
      socialSupport: 0.16,
      healthLifeExpectancy: 60.0,
      freedomToMakeLifeChoices: 0.11,
      generosity: 0.33,
      perceptionsOfCorruption: 0.94,
      education: 12,
      donation_frequency: 0.27
    },
    {
      id: "140",
      country: "Comoros",
      region: "World",
      year: 2025,
      happinessScore: 4.430,
      gdp: 8.6,
      socialSupport: 0.15,
      healthLifeExpectancy: 62.0,
      freedomToMakeLifeChoices: 0.10,
      generosity: 0.34,
      perceptionsOfCorruption: 0.95,
      education: 12,
      donation_frequency: 0.28
    },
    {
      id: "141",
      country: "Botswana",
      region: "World",
      year: 2025,
      happinessScore: 4.410,
      gdp: 9.7,
      socialSupport: 0.14,
      healthLifeExpectancy: 58.0,
      freedomToMakeLifeChoices: 0.09,
      generosity: 0.35,
      perceptionsOfCorruption: 0.96,
      education: 12,
      donation_frequency: 0.29
    },
    {
      id: "142",
      country: "Lebanon",
      region: "World",
      year: 2025,
      happinessScore: 4.390,
      gdp: 9.0,
      socialSupport: 0.13,
      healthLifeExpectancy: 66.0,
      freedomToMakeLifeChoices: 0.08,
      generosity: 0.36,
      perceptionsOfCorruption: 0.97,
      education: 12,
      donation_frequency: 0.30
    },
    {
      id: "143",
      country: "Afghanistan",
      region: "World",
      year: 2025,
      happinessScore: 2.400,
      gdp: 8.0,
      socialSupport: 0.50,
      healthLifeExpectancy: 54.0,
      freedomToMakeLifeChoices: 0.40,
      generosity: 0.15,
      perceptionsOfCorruption: 0.70,
      education: 12, // Placeholder, will be updated by map
      donation_frequency: 0.20
    }
];

export const mockHappinessData: HappinessData[] = rawHappinessData.map(item => {
  let educationValue = educationIndexMap.get(item.country);
  const mappedCountryName = countryNameMappings[item.country];
  if (educationValue === undefined && mappedCountryName) {
    educationValue = educationIndexMap.get(mappedCountryName);
  }
  
  return {
    id: item.id,
    country: item.country,
    region: item.region,
    year: item.year,
    happinessScore: item.happinessScore,
    gdp: item.gdp,
    socialSupport: item.socialSupport,
    healthLifeExpectancy: item.healthLifeExpectancy,
    education: educationValue !== undefined ? educationValue : item.education,
    freedomToMakeLifeChoices: item.freedomToMakeLifeChoices,
    generosity: item.generosity,
    perceptionsOfCorruption: item.perceptionsOfCorruption,
    // xHappinessIndex can be added if there's a source for it
  };
});


export const mockXPosts: XPost[] = [
  { 
    id: 'x1', 
    text: "Feeling incredibly grateful for my friends and family today in Finland! Life is good. #blessed #happiness",
    country: 'Finland',
    year: 2025,
  },
  { 
    id: 'x2', 
    text: "The support system in Denmark is amazing. Always feel safe and cared for. #community #wellbeing",
    country: 'Denmark',
    year: 2025,
  },
  { 
    id: 'x3', 
    text: "Just had a tough day at work in USA, but trying to stay positive. Sometimes the grind is real. #worklife #stress",
    country: 'United States',
    year: 2025,
  },
  { 
    id: 'x4', 
    text: "Enjoying the beautiful nature in Canada. So peaceful and rejuvenating. #ExploreCanada #MentalHealth",
    country: 'Canada',
    year: 2025, 
  },
  { 
    id: 'x5', 
    text: "Dealing with bureaucracy in Japan can be frustrating. Wish things were simpler. #frustration #society",
    country: 'Japan',
    year: 2025,
  },
  {
    id: 'x6',
    text: "Another lovely day in Helsinki! The city is vibrant and full of life.",
    country: 'Finland',
    year: 2025
  },
  {
    id: 'x7',
    text: "Missing the Canadian Rockies from my trip. Such an inspiring place.",
    country: 'Canada',
    year: 2025
  }
];

export const getCountries = (): string[] => {
  const actualCountries = mockHappinessData
    .map(d => d.country)
    .filter((c): c is string => typeof c === 'string' && c.trim() !== '');
  const countriesSet = new Set(actualCountries);
  return Array.from(countriesSet).sort();
};

export const getYears = (): (number | string)[] => {
  const actualYears = mockHappinessData
    .map(d => d.year)
    .filter((y): y is number => typeof y === 'number');
  const yearsSet = new Set(actualYears);
  return ['all', ...Array.from(yearsSet).sort((a,b) => b-a)];
};

export const mockSentimentGroupData: SentimentGroupData[] = [
  {
    group: "Amazon",
    positive: 0.0829015544,
    negative: 0.2487046632,
    neutral: 0.5336787565,
    irrelevant: 0.1347150259
  },
  {
    group: "ApexLegends",
    positive: 0.0808080808,
    negative: 0.2525252525,
    neutral: 0.3964646465,
    irrelevant: 0.2702020202
  },
  {
    group: "AssassinsCreed",
    positive: 0.1176470588,
    negative: 0.1684491979,
    neutral: 0.0695187166,
    irrelevant: 0.6443850267
  },
  {
    group: "Battlefield",
    positive: 0.3913043478,
    negative: 0.2020460358,
    neutral: 0.1534526854,
    irrelevant: 0.2531969309
  },
  {
    group: "Borderlands",
    positive: 0.1050328228,
    negative: 0.1864332604,
    neutral: 0.2625820569,
    irrelevant: 0.44595186
  },
  {
    group: "CS-GO",
    positive: 0.2760416667,
    negative: 0.1510416667,
    neutral: 0.2395833333,
    irrelevant: 0.3333333333
  },
  {
    group: "CallOfDuty",
    positive: 0.2807017544,
    negative: 0.373433584,
    neutral: 0.1578947368,
    irrelevant: 0.1879699248
  },
  {
    group: "CallOfDutyBlackopsColdWar",
    positive: 0.2424242424,
    negative: 0.2424242424,
    neutral: 0.1515151515,
    irrelevant: 0.3636363636
  },
  {
    group: "Cyberpunk2077",
    positive: 0.2083333333,
    negative: 0.1692708333,
    neutral: 0.203125,
    irrelevant: 0.4192708333
  },
  {
    group: "Dota2",
    positive: 0.1802030457,
    negative: 0.3248730964,
    neutral: 0.2487309645,
    irrelevant: 0.2461928934
  },
  {
    group: "FIFA",
    positive: 0.2384615385,
    negative: 0.5025641026,
    neutral: 0.0435897436,
    irrelevant: 0.2153846154
  },
  {
    group: "Facebook",
    positive: 0.2911392405,
    negative: 0.3037974684,
    neutral: 0.3316455696,
    irrelevant: 0.0734177215
  },
  {
    group: "Fortnite",
    positive: 0.3693931398,
    negative: 0.308707124,
    neutral: 0.073878628,
    irrelevant: 0.2480211082
  },
  {
    group: "Google",
    positive: 0.227154047,
    negative: 0.2584856397,
    neutral: 0.3577023499,
    irrelevant: 0.1566579634
  },
  {
    group: "GrandTheftAuto(GTA)",
    positive: 0.3307291667,
    negative: 0.2578125,
    neutral: 0.140625,
    irrelevant: 0.2708333333
  },
  {
    group: "Hearthstone",
    positive: 0.0992167102,
    negative: 0.2297650131,
    neutral: 0.3080939948,
    irrelevant: 0.362924282
  },
  {
    group: "HomeDepot",
    positive: 0.1272727273,
    negative: 0.3896103896,
    neutral: 0.1454545455,
    irrelevant: 0.3376623377
  },
  {
    group: "LeagueOfLegends",
    positive: 0.1303258145,
    negative: 0.2681704261,
    neutral: 0.343358396,
    irrelevant: 0.2581453634
  },
  {
    group: "MaddenNFL",
    positive: 0.0375,
    negative: 0.7125,
    neutral: 0.085,
    irrelevant: 0.165
  },
  {
    group: "Microsoft",
    positive: 0.0725,
    negative: 0.3225,
    neutral: 0.3525,
    irrelevant: 0.2525
  },
  {
    group: "NBA2K",
    positive: 0.0765306122,
    negative: 0.6275510204,
    neutral: 0.1147959184,
    irrelevant: 0.181122449
  },
  {
    group: "Nvidia",
    positive: 0.0391644909,
    negative: 0.227154047,
    neutral: 0.3785900783,
    irrelevant: 0.3550913838
  },
  {
    group: "Overwatch",
    positive: 0.2879177378,
    negative: 0.2699228792,
    neutral: 0.1285347044,
    irrelevant: 0.3136246787
  },
  {
    group: "PlayStation5(PS5)",
    positive: 0.1714285714,
    negative: 0.1974025974,
    neutral: 0.2233766234,
    irrelevant: 0.4077922078
  },
  {
    group: "PlayerUnknownsBattlegrounds(PUBG)",
    positive: 0.3984168865,
    negative: 0.3060686016,
    neutral: 0.1160949868,
    irrelevant: 0.1794195251
  },
  {
    group: "RedDeadRedemption(RDR)",
    positive: 0.0928381963,
    negative: 0.1352785146,
    neutral: 0.3607427056,
    irrelevant: 0.4111405836
  },
  {
    group: "TomClancysGhostRecon",
    positive: 0.010230179,
    negative: 0.3836317136,
    neutral: 0.3427109974,
    irrelevant: 0.26342711
  },
  {
    group: "TomClancysRainbowSix",
    positive: 0.04,
    negative: 0.4675,
    neutral: 0.2725,
    irrelevant: 0.22
  },
  {
    group: "Verizon",
    positive: 0.0780856423,
    negative: 0.4609571788,
    neutral: 0.2392947103,
    irrelevant: 0.2216624685
  },
  {
    group: "WorldOfCraft", 
    positive: 0.0913705584,
    negative: 0.1446700508,
    neutral: 0.4517766497,
    irrelevant: 0.3121827411
  },
  {
    group: "Xbox(Xseries)",
    positive: 0.3213367609,
    negative: 0.1619537275,
    neutral: 0.177377892,
    irrelevant: 0.3393316195
  },
  {
    group: "johnson&johnson",
    positive: 0.0850515464,
    negative: 0.3634020619,
    neutral: 0.4355670103,
    irrelevant: 0.1159793814
  }
];

export const getSentimentGroups = (): string[] => {
  const groups = mockSentimentGroupData.map(d => d.group);
  return [...new Set(groups)].sort();
};

    

    