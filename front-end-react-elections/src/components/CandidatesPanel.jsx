export default function CandidatesPanel({
  children: candidatesCard,
  cityData = 'Dados da cidade',
  cityName = 'Nome da cidade',
  cityVotingPopulation = 'Número de eleitores totais na cidade',
  cityAbsence = 'Número de eleitores que não votaram nesta eleição',
  cityPresence = 'Número de pessoas que votaram nesta eleição',
}) {
  return (
    <div className="border">
      <h2 className="flex items-center justify-center">{`Eleição em ${cityName}`}</h2>
      <h2 className="flex items-center justify-center">
        {`Total de eleitores ${cityData.map(e => e.votingPopulation)}`}
      </h2>
      <h2 className="flex items-center justify-center">
        {`Abstenção ${cityData.map(e => e.absence)}`}
      </h2>
      <h2 className="flex items-center justify-center">
        {`Comparecimento ${cityData.map(e => e.presence)}`}
      </h2>
      <div className="border p-2 flex flex-row items-center justify-center flex-wrap">
        {candidatesCard}
      </div>
    </div>
  );
}
