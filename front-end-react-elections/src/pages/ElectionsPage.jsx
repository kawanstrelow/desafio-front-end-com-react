import { useEffect } from 'react';
import { useState } from 'react';
import CandidateCard from '../components/CandidateCard';
import CandidatesPanel from '../components/CandidatesPanel';
import Header from '../components/Header';
import Selector from '../components/Selector';
import { apiGetAll } from '../services/apiService';

export default function ElectionsPage() {
  const [allElections, setAllElections] = useState([]);
  const [allCandidatesData, setAllCandidatesData] = useState([]);
  const [allCitiesData, setAllCitiesData] = useState([]);
  const [selectedCityData, setSelectedCityData] = useState([]);
  const [selectedCity, setSelectedCity] = useState('Gotham');
  const [selectedCityId, setSelectedCityId] = useState(
    '680df3f5-c5bf-48ae-bda0-5b667fd89197'
  );

  useEffect(() => {
    async function getAllElectionsData() {
      const dataElections = await apiGetAll('election');
      setAllElections(
        dataElections
          .filter(object => object.cityId === selectedCityId)
          .sort((a, b) => b.votes - a.votes)
      );
    }
    getAllElectionsData();
  }, [selectedCityId]);

  useEffect(() => {
    async function getAllCitiesData() {
      const cityData = await apiGetAll('cities');
      setAllCitiesData(cityData);
      setSelectedCityData(
        cityData.filter(object => object.id === selectedCityId)
      );
    }
    getAllCitiesData();
  }, [selectedCityId]);

  useEffect(() => {
    async function getAllCandidatesData() {
      const candidatesData = await apiGetAll('candidates');
      setAllCandidatesData(candidatesData);
    }
    getAllCandidatesData();
  }, []);

  function handleSelectorChange(newSelectedCity) {
    setSelectedCity(`"${newSelectedCity}"`);
    setSelectedCityId(
      allCitiesData
        .filter(object => object.name === newSelectedCity)
        .map(object => object.id)
        .toString()
    );
  }

  return (
    <>
      <Header></Header>
      <main>
        <Selector
          // defValueSelector={selectedCity} Não funciona!!
          onSelectorChange={handleSelectorChange}
        ></Selector>
        <CandidatesPanel cityName={selectedCity} cityData={selectedCityData}>
          {allElections.map(({ id, candidateId, votes }) => {
            let first =
              votes === allElections[0].votes ? 'Eleito' : 'Não eleito';

            return (
              <CandidateCard
                first={first}
                key={id}
                id={id}
                cityPopulation={selectedCityData.map(e => e.presence)}
                candidateName={allCandidatesData}
                candidateId={candidateId}
                votes={votes}
              />
            );
          })}
        </CandidatesPanel>
        ;
      </main>
    </>
  );
}
