
import { useState, useEffect } from 'react';

interface WeatherDay {
  date: string;
  weatherCode: number;
  isSunny: boolean;
  message: string;
}

export const useWeatherForecast = () => {
  const [weatherData, setWeatherData] = useState<WeatherDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        // Coordenadas de Itumbiara/GO
        const latitude = -18.4132;
        const longitude = -49.2158;
        
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode&timezone=America/Sao_Paulo&forecast_days=7`
        );
        
        if (!response.ok) {
          throw new Error('Erro ao buscar dados do clima');
        }
        
        const data = await response.json();
        
        const processedData: WeatherDay[] = data.daily.time.map((date: string, index: number) => {
          const weatherCode = data.daily.weathercode[index];
          const isSunny = weatherCode === 0 || weatherCode === 1; // Céu limpo ou pouco nublado
          
          return {
            date,
            weatherCode,
            isSunny,
            message: isSunny ? '☀️ Melhor dia para bronzeamento!' : '🌧️ Clima não ideal para bronze'
          };
        });
        
        setWeatherData(processedData);
        setError(null);
      } catch (err) {
        console.error('Erro ao buscar clima:', err);
        setError('Não foi possível carregar os dados do clima');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  return { weatherData, loading, error };
};
