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
        res
          .status(500)
          .json({ error, error: `Error fetching albums for artist` + error });
      }
    });

    const resolvedArtistTopSongs = await Promise.allSettled(artistTopSongs);
    const validSongs = resolvedArtistTopSongs
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);

    res.json(validSongs);
  } catch (error) {
    res
      .status(500)
      .json({ error, error: `Error fetching artist data` + error });
  }
};

const getArtists = async (req, res, next) => {
  try {
    const response = await axios.get("https://api.deezer.com/genre/2/artists");
    res.json(response.data?.data.slice(0, 10));
  } catch (error) {
    res
      .status(500)
      .json({ error, error: `Error fetching all artists` + error });
  }
};

const getTracks = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const response = await axios.get(
      "https://sonic-server.vercel.app/api/topArtists",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    const artistsData = response.data?.map((artist, index) => artist.data[1]);

    const trackListPromises = artistsData.map(async (artist) => {
      try {
        const response2 = await axios.get(artist?.artist?.tracklist);
        return response2.data;
      } catch (error) {
        res
          .status(500)
          .json({ error, error: `Error fetching albums for artist` + error });
      }
    });

    const resolvedTrackList = await Promise.all(trackListPromises);
    const validTrackList = resolvedTrackList.filter(
      (albums) => albums !== null
    );

    const slicedTrackList = validTrackList.map((tracklist) => ({
      data: tracklist.data.slice(0, 10),
    }));
    res.json(slicedTrackList);
  } catch (error) {
    next({ error, error: `Error fetching tracks` + error });
  }
};

export { getTopArtists, getArtists, getTracks };
