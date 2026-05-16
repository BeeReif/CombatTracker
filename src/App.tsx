import ItemGrid from './components/ItemGrid';
import MonsterCard from './components/MonsterCard';

function App() {
  
  return (
      <ItemGrid>
        <MonsterCard
          color='black'
          name='Vel'
          maxHp={80}
          ac={16}
          count={1}
          notes={["Speed 40", "Dex +3/+6", "Con +2/+4", "Unarmed Strike +6, 1d6+3"]}
          />
        <MonsterCard
          color='blue'
          name='Vasil'
          maxHp={30}
          ac={15}
          count={1}
          notes={["Str +3/+5", "Cha +3/+5","Con +2", "Longsword: +5, 1d8+5"]}
          />
        <MonsterCard
          color='purple'
          name='Mathis'
          maxHp={15}
          ac={13}
          count={1}
          notes={["Str +2/+4", "Con +2/+4", "Warhammer: +4, 1d10+2"]}
          />
          <MonsterCard
          color='purple'
          name='Ariane'
          maxHp={10}
          ac={15}
          count={1}
          notes={["Dex +1/+3", "Int +2/+4", "Rapier: +3, 1d8+1", "R: Parry"]}
          />
      </ItemGrid>
  );
  
  
}

export default App