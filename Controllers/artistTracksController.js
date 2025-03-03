import axios from "axios";

const getTopArtists = async (req, res, next) => {
  try {
    const response = await axios.get("https://api.deezer.com/genre/0/artists");
    const artistIds =
      response?.data?.data?.map((artistData) => artistData.id) || [];
    const firstTenArtistIds = artistIds.slice(0, 10);

    const artistTopSongs = firstTenArtistIds.map(async (artistId) => {
      try {
        const response2 = await axios.get(
          `https://api.deezer.com/artist/${artistId}/top?limit=10`
        );
        return response2.data;
      } catch (error) {
        // Instead of handling error here, propagate it
        throw new Error(
          `Error fetching albums for artist ${artistId}: ${error.message}`
        );
      }
    });

    const resolvedArtistTopSongs = await Promise.allSettled(artistTopSongs);
    const validSongs = resolvedArtistTopSongs
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);

    res.json(validSongs);
  } catch (error) {
    // Use next(error) to pass to global error handler
    next({
      error,
      status: 500,
      message: "Error fetching top artists: " + error.message,
    });
  }
};

const getArtists = async (req, res, next) => {
  try {
    const response = await axios.get("https://api.deezer.com/genre/2/artists");
    res.json(response.data?.data.slice(0, 10));
  } catch (error) {
    // Use next(error) to pass to global error handler
    next({
      error,
      status: 500,
      message: "Error fetching all artists: " + error.message,
    });
  }
};

const getTracks = async (req, res, next) => {
  try {
    const topArtistsResponse = await getTopArtists(req, res, next);

    // Safely access the artist data and handle potential undefined values
    const artistsData = topArtistsResponse?.data?.filter(
      (artist) => artist?.data?.[1]?.artist?.tracklist
    );

    if (!artistsData?.length) {
      throw new Error("No valid artist data found");
    }

    const trackListPromises = artistsData.map(async (artist) => {
      const tracklistUrl = artist.data[1].artist.tracklist;
      if (!tracklistUrl) {
        return null;
      }

      try {
        const response = await axios.get(tracklistUrl);
        return response.data;
      } catch (error) {
        console.error(`Error fetching tracklist: ${error.message}`);
        return null;
      }
    });

    const resolvedTrackList = await Promise.all(trackListPromises);
    const validTrackList = resolvedTrackList
      .filter((tracklist) => tracklist?.data)
      .map((tracklist) => ({
        data: tracklist.data.slice(0, 10),
      }));

    res.json(validTrackList);
  } catch (error) {
    console.error("Error in getTracks:", error);
    next({
      error,
      status: 500,
      message: "Error in getTracks: " + error.message,
    });
  }
};

export { getTopArtists, getArtists, getTracks };
