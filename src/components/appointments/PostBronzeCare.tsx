
import React from "react";

const PostBronzeCare: React.FC = () => {
  return (
    <div className="mt-12 bg-bronze-50 rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-center">Cuidados Pós-Bronzeamento</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-medium mb-2 text-bronze-700">Primeiras 24 horas</h4>
          <ul className="text-gray-700 space-y-1">
            <li>• Evite banhos quentes e prolongados</li>
            <li>• Não use produtos esfoliantes</li>
            <li>• Mantenha-se hidratado</li>
            <li>• Evite atividades que causem transpiração intensa</li>
          </ul>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-medium mb-2 text-bronze-700">Manutenção do Bronze</h4>
          <ul className="text-gray-700 space-y-1">
            <li>• Hidrate a pele diariamente</li>
            <li>• Use produtos específicos para bronzeamento</li>
            <li>• Evite exposição excessiva ao sol</li>
            <li>• Agende suas sessões respeitando o intervalo recomendado</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostBronzeCare;
