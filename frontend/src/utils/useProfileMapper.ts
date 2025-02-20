export const useProfileMapper = () => {
  const mapFetchResponseToUserInterface = (data: any) => {
    const {
      travel_preferences,
      health_safety,
      travel_personalization,
      additional_details,
      ...rest
    } = data

    return {
      ...rest,
      preferences: {
        travel_preferences,
        health_safety,
        travel_personalization,
        additional_details,
      },
    }
  }

  return {
    mapFetchResponseToUserInterface,
  }
}
