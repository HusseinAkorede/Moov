

const SwitchE = ( { checked , setChecked }) => {
  const handleChange = (e) => {
    setChecked(e.target.checked);
  };
  return(
    <div className='w-[101px] ml-12'>
      <div className="container"><input type="checkbox" className='checkbox' checked={checked} onChange={handleChange} /></div>
    </div>
);}

export default SwitchE