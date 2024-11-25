export async function fetchExchangeRate(apiKey) {
  const url = `/exchangeJSON?authkey=${apiKey}&data=AP01`;

  try {
    const response = await fetch(url);
    const data = response.json();
    return data;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    throw error; // 필요에 따라 호출자에게 에러를 다시 던질 수도 있음
  }
}