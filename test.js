import React, { useState } from 'react'; 
const ClickHistoryButton = () => { 
  const [clickHistory, setClickHistory] = useState([]); 
  const handleClick = () => { setClickHistory([...clickHistory, new Date().toISOString()]); }; 
  return ( <button onPress={handleClick}> {clickHistory.length > 0 ? `Clicked ${clickHistory.length} times` : 'Click me'} </button> ); }; 
  export default ClickHistoryButton;

  import React, { useState } from 'react'; 
  const TextBoxSwap = () => { 
    const [text1, setText1] = useState(''); 
    const [text2, setText2] = useState(''); 
    const handleSwap = () => { const temp = text1; setText1(text2); setText2(temp); }; 
    return ( <> <TextInput value={text1} onChangeText={setText1} /> 
                <TextInput value={text2} 
    onChangeText={setText2} /> 
    <Button title="Swap" onPress={handleSwap} /> </> ); }; 
    export default TextBoxSwap;

    import React, { useState } from 'react'; 
    const CompareButton = () => { 
      const [clickHistory, setClickHistory] = useState([]); 
      const handleClick = () => { setClickHistory([...clickHistory, new Date().toISOString()]); }; 
      return ( <button onPress={handleClick}> {clickHistory.length > 0 ? `Compare clicked ${clickHistory.length} times` : 'Compare'} </button> ); }; 
      export default CompareButton;