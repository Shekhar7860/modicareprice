// Change YOUR_API_KEY_HERE to your apiKey
const url =
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=7832d2101fad49fd88e91a239c1f72bc";

export async function getNews() {
  let result = await fetch(url).then(response => response.json());
  return result.articles;
}
