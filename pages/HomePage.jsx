import { useState } from 'react';
import BasicTable from '../components/BasicTable.jsx';
import Link from 'next/link';

function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}

export default function HomePage() {

  const [mdRate, setMdRate] = useState(8000)
  const [numOfDays, setNumOfDays] = useState(230)

  const names = ['Dobry den', 'Sergi je muj kamarad', 'Jedu bomby'];

  const [likes, setLikes] = useState(0);
  const [money, setMoney] = useState([]);

  function handleClick() {
    new Audio("/pressed.mp3").play();
    setLikes(likes + 1);
  }

  function handleClickCalculate() {
    const income = mdRate * numOfDays
    const expenses = Math.min(1200000, income * 0.6)
    const taxable_income = income - expenses
    const tax_base = 0.55 * taxable_income
    const social_tax = Math.min(tax_base, 1920000) * 0.292
    const health_tax = tax_base * 0.135
    const income_tax = taxable_income * 0.15 - 30840
    const mil_tax = Math.max(0.0, (taxable_income - 1440000) * 0.08)
    const net_income = income - social_tax - health_tax - income_tax - mil_tax
    const effective_tax = (income - net_income) / (income / 100)

    function createData(name, value) {
      return { name, value };
    }
    
    const rows = [
      createData('Příjem', income.toLocaleString()),
      createData('Výdaje', expenses.toLocaleString()),
      createData('Zdanitelný příjem', taxable_income.toLocaleString()),
      createData('Základ daně pro rok 2024', tax_base.toLocaleString()),
      createData('Sociální daň', social_tax.toLocaleString()),
      createData('Zdravotní daň', health_tax.toLocaleString()),
      createData('Daň z příjmu', income_tax.toLocaleString()),
      createData('Milionářská daň', mil_tax.toLocaleString()),
      createData('Čistý příjem', net_income.toLocaleString()),
      createData('Efektivní zdanění v procentech', effective_tax.toLocaleString()),
    ];
    setMoney(rows)
    new Audio("/calculate.mp3").play();
  }


  return (
    <div>

      <Header title="Dobrý den, vítejte na stránce Honzíka" />
      <h1 className="title">
      <Link href="/trello">trello page!</Link>
      </h1>  
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      <button onClick={handleClick}>Like ({likes})</button>
      <br/>
      <br/> 
      <br/> 
      <label>Zadej MD rate v CZK kamo:</label> <br/> 
      <input onChange={(e) => {setMdRate(e.target.value)}} type="text" id="md_rate" name="md_rate" value={mdRate}/><br/> 
      <label>Pocet dnu v roce co planujes pracovat:</label><br/>
      <input onChange={(e) => {setNumOfDays(e.target.value)}} type="text" id="num_of_days" name="num_of_days" value={numOfDays}/><br/><br/> 
      <button onClick={handleClickCalculate}>Calculate</button>
      <BasicTable money={money}/>
    </div>
  );
}