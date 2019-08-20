export const StickyLocationSelector = ({
  locations,
  currentLocation,
  setCurrentLocation,
  locationPicker,
  setLocationPicker,
  locationRadioBtnsEl,
  className
}) => (
  <div className={`sticky-cta--container show-for-small-only ${className}`}>
    <div className='sticky-cta-location--container mb-2'>
      <span className={`sticky-cta-location--text ${!locationPicker ? 'show' : 'hide'}`}>
        <img src='/static/images/location-icon.svg' className='mr-1' />
        <b>{currentLocation.city}</b>, {currentLocation.date}
      </span>

      <span
        className='sticky-cta-location--btn'
        onClick={() => setLocationPicker(!locationPicker)}>
        {!locationPicker ? 'Change' : 'Close'}
      </span>
    </div>

    <div
      className={`sticky-cta-location-options--container ${
        locationPicker ? 'show mb-3' : 'hide'
      }`}
      ref={locationRadioBtnsEl}>
      {locations.map(location => (
        <LocationRadioButtons
          key={location.city}
          id='sticky-cta'
          location={location}
          currentLocation={currentLocation}
          setCurrentLocation={setCurrentLocation}
          locationPicker={locationPicker}
          setLocationPicker={setLocationPicker}
        />
      ))}
    </div>
    <div className='sticky-cta-btn--wrapper'>
      <a
        href={currentLocation.link}
        target='_blank'
        rel='noopener'
        className='btn btn-block'>
        Attend
      </a>
      {/* <a href='' className='btn btn-outline'>
        Donate
      </a> */}
    </div>
  </div>
)

export const LocationRadioButtons = ({
  location,
  id,
  currentLocation,
  setCurrentLocation,
  locationPicker,
  setLocationPicker
}) => (
  <label className='location-radio--container'>
    <b>{location.city}</b>, {location.date}
    <input
      type='radio'
      name={`location-${id}`}
      value={location.city}
      checked={location.city === currentLocation.city}
      onChange={() => {
        setCurrentLocation(location)
        locationPicker && setLocationPicker(!locationPicker)
      }}
    />
    <span className='location-radio--checkmark' />
  </label>
)
