import countries from "world-countries";

// formatting the countries
const formatedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  // all countries will passed on with this function
  const getAll = () => formatedCountries;

  // country information that has same value, to get a single country information
  const getByValue = (value: string) => {
    return formatedCountries.find((it) => it.value === value);
  };

  // return this two functions
  return {
    getAll,
    getByValue,
  };
};

export default useCountries;
