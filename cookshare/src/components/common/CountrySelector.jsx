import React, {useState, useEffect} from 'react'

const CountrySelector = ({ selectedNationality, onNationalityChange }) => {
    const [nationalities, setNationalities] = useState([]);
    

      useEffect(() => {
        const fetchNationalities = async () => {
          try {
            const response = await fetch("https://restcountries.com/v3.1/all");
            const data = await response.json();
            const extractedNationalities = data.map(
              (country) => country.demonyms?.eng?.m || country.name.common
            );
            const uniqueNationalities = [...new Set(extractedNationalities)]
              .sort()
              .map((nat) => ({ value: nat.toLowerCase(), label: nat }));

            setNationalities(uniqueNationalities);
          } catch (err) {
            console.error(err.message);
          }
        };
        fetchNationalities();
      }, []);
  
      const handleNationalitySelectChange = (e) => {
        onNationalityChange(e.target.value);
      };


  return (
    <section className='mb-4'>
      <legend>Cuisine</legend>
      <select
        className='form-select mt-2'
        value={selectedNationality}
        onChange={handleNationalitySelectChange}>
        <option value=''>...select the natinality for this cuisine...</option>
        {nationalities.map(({ value, label }) => (
          <option key={value} value={label}>
            {label}
          </option>
        ))}
      </select>
    </section>
  );
}

export default CountrySelector
