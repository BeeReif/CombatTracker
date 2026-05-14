import ItemGrid from './components/ItemGrid';
import MonsterCard from './components/MonsterCard';

function App() {
  
  return (
      <ItemGrid>
        <MonsterCard
          color='red'
          name='Bandits'
          maxHp={25}
          ac={15}
          count={10}
          notes={["Dex +4/+6", "Con +2/+4","Wis +1", "Longbow: +6, 1d8+4"]}
          />
        <MonsterCard
          color='blue'
          name='Bandits'
          maxHp={25}
          ac={15}
          count={10}
          notes={["Dex +4/+6", "Con +2/+4","Wis +1", "Longbow: +6, 1d8+4"]}
          />
        <MonsterCard
          color='green'
          name='Bandits'
          maxHp={25}
          ac={15}
          count={10}
          notes={["Dex +4/+6", "Con +2/+4","Wis +1", "Longbow: +6, 1d8+4"]}
          />
        <MonsterCard
          color='black'
          name='Bandits'
          maxHp={25}
          ac={15}
          count={10}
          notes={["Dex +4/+6", "Con +2/+4","Wis +1", "Longbow: +6, 1d8+4"]}
          />
        <MonsterCard
          color='purple'
          name='Taenaran'
          maxHp={85}
          ac={16}
          count={1}
          />
      </ItemGrid>
  );
  
  
}

export default App