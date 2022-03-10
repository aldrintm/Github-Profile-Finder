import GearSpinner from './assets/Gear_Spinner.gif'

function Spinner() {
  return (
    <div>
      <img
        width={180}
        className='text-center mx-auto'
        src={GearSpinner}
        alt='Loading ...'
      ></img>
    </div>
  )
}

export default Spinner
