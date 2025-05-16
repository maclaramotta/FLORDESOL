
import React from "react";
import { Link } from "react-router-dom";

const FooterSection = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">FLOR DE SOL</h3>
            <p className="text-gray-400">
              Sistema completo para gestão de salões de bronzeamento
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Úteis</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-white">
                  Registro
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-400 hover:text-white">
                  Funcionalidades
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/lgpd" className="text-gray-400 hover:text-white">
                  LGPD
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <address className="text-gray-400 not-italic">
              <p>contato@flordesol.com.br</p>
              <p>+55 (64) 9 9617-0209</p>
              <p>Itumbiara - Goiás</p>
            </address>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Flor de Sol. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
