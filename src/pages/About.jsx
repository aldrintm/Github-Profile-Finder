function About() {
  return (
    <div>
      <h1 className='text-6xl mb-4'>Github Profile Finder</h1>
      <p className='mb-4 text-2xl font-light'>
        {' '}
        This is an app to search{' '}
        <strong>
          <a href='https://github.com/'>Github</a>
        </strong>{' '}
        for awesome Active Coder Profiles and check other repositories and how
        others are writing code.
      </p>
      <p className='text-base text-gray-400'>
        Version <span className='text-base-300'>1.0.0</span>
      </p>
      <p className='text-base text-gray-400'>
        Layout By:
        <a className='text px-2' href='https://github.com/aldrintm'>
          Aldrin Mabanta
        </a>
      </p>
    </div>
  )
}

export default About
