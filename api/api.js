const getPokemonsFromApi = async (url) => {
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    };
};

export default getPokemonsFromApi;