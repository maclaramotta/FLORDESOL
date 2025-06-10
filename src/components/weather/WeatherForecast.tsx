
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useWeatherForecast } from '@/hooks/useWeatherForecast';
import { Calendar, CloudRain, Sun } from 'lucide-react';

const WeatherForecast = () => {
  const { weatherData, loading, error } = useWeatherForecast();

  if (loading) {
    return (
      <Card className="mt-4">
        <CardContent className="pt-6">
          <div className="text-center text-gray-500">
            Carregando previsão do tempo...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mt-4">
        <CardContent className="pt-6">
          <div className="text-center text-gray-500">
            {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  const sunnyDays = weatherData.filter(day => day.isSunny);
  const rainyDays = weatherData.filter(day => !day.isSunny);

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calendar className="h-5 w-5" />
          Previsão do Tempo - Melhores Dias para Bronzear
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sunnyDays.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
              <Sun className="h-4 w-4" />
              Dias ideais para bronzeamento
            </h4>
            <div className="space-y-2">
              {sunnyDays.map((day) => (
                <div key={day.date} className="flex items-center justify-between">
                  <span className="text-yellow-700">
                    {new Date(day.date).toLocaleDateString('pt-BR', {
                      weekday: 'long',
                      day: '2-digit',
                      month: '2-digit'
                    })}
                  </span>
                  <span className="text-sm text-yellow-600">{day.message}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {rainyDays.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
              <CloudRain className="h-4 w-4" />
              Dias com clima não ideal
            </h4>
            <div className="space-y-2">
              {rainyDays.map((day) => (
                <div key={day.date} className="flex items-center justify-between">
                  <span className="text-blue-700">
                    {new Date(day.date).toLocaleDateString('pt-BR', {
                      weekday: 'long',
                      day: '2-digit',
                      month: '2-digit'
                    })}
                  </span>
                  <span className="text-sm text-blue-600">{day.message}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500 text-center mt-4">
          Previsão baseada no clima de Itumbiara/GO
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherForecast;
