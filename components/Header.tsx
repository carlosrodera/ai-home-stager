/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full p-4 text-center">
      <div className="flex items-center justify-center mb-2">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-blue-800">
            🏠 AI Home Stager
          </h1>
      </div>
      <div className="text-lg text-zinc-600 mb-4">
        <p>Transform any space with professional interior design styles</p>
        <p className="text-sm mt-2 text-zinc-500">
          Made with ☕ by <span className="font-semibold text-blue-700">Carlos Rodera</span>
        </p>
      </div>
      <p className="text-base text-zinc-600 max-w-3xl mx-auto leading-relaxed">
        Perfect for real estate professionals, interior designers, and home renovators. 
        Upload a room photo and get five stunning design variations to showcase a property's potential.
      </p>
    </header>
  );
};

export default Header;