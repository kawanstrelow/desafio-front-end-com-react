export default function Selector({
  cities = 'cidades',
  onSelectorChange = null,
}) {
  function handleSelectorChange() {
    let select = document.getElementById('citiesSelector');
    let opcaoValor = select.options[select.selectedIndex].value;
    onSelectorChange(opcaoValor);
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center m-2 p-2">
        <h2>Escolha o município</h2>
        <select
          id="citiesSelector"
          defaultValue="Gotham"
          onChange={handleSelectorChange}
        >
          <option value="Gotham">Gotham</option>
          <option value="Asgard">Asgard</option>
          <option value="Themyscira">Themyscira</option>
          <option value="Metropolis">Metropolis</option>
          <option value="Smallville">Smallville</option>
        </select>
      </div>
    </div>
  );
}
