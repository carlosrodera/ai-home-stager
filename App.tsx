/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useCallback, useEffect } from 'react';
import { transformImageWithStyle } from './services/geminiService';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import Spinner from './components/Spinner';

interface StyleDefinition {
  id: string;
  name: string;
  prompt: string;
}

const STAGING_STYLES: StyleDefinition[] = [
  {
    id: 'modern',
    name: 'Modern Contemporary',
    prompt: `USANDO EXCLUSIVAMENTE la imagen proporcionada como base: transforma este mismo espacio al ESTILO MODERNO CONTEMPORÁNEO para HOME STAGING, fotorrealista.

PRESERVA ABSOLUTAMENTE: punto de vista y encuadre original, relación de aspecto exacta, geometría y proporciones del espacio, posición de muros/puertas/ventanas/columnas, líneas de fuga y profundidad; vistas por la(s) ventana(s); arquitectura y distribución original. NO recortes, NO cambies la cámara, NO deformes ni muevas elementos arquitectónicos.

PERMITIDO CAMBIAR (de forma coherente con la perspectiva y escala): mobiliario, textiles, luminarias, arte, accesorios, plantas, paleta de materiales y acabados superficiales (sin alterar la obra). Integra nuevos elementos con sombras y reflejos acordes a la iluminación ya existente.

DIRECTRICES DE ESTILO: diseño contemporáneo que apela a compradores modernos y maximiza el valor de venta.
- Paleta: neutros sofisticados (blanco cálido, gris perla, beige arena) con 1-2 acentos elegantes (navy, sage green, terracota suave).
- Materiales: madera natural con veta fina, mármol o cuarzo, metal brushed (gold/black), vidrio templado, textiles de alta calidad.
- Mobiliario: líneas limpias, proporciones equilibradas, sofás seccionales neutros, mesa de comedor rectangular, sillas statement modernas.
- Decoración: arte abstracto grande, plantas verdes arquitectónicas, almohadas texturizadas, objetos decorativos minimalistas pero impactantes.
- Iluminación: combinación de luz natural maximizada, pendant lights elegantes, floor lamps sculptural; 3000K para calidez sin ser amarillento.

CALIDAD: photorealistic, ultra-detailed, professional quality, perfect lighting, 8K render look. Debe transmitir sofisticación, amplitud y move-in ready.`,
  },
  {
    id: 'scandinavian',
    name: 'Scandinavian',
    prompt: `USANDO EXCLUSIVAMENTE la imagen proporcionada como base: transforma este mismo espacio al ESTILO ESCANDINAVO/NORDIC para HOME STAGING, fotorrealista.

PRESERVA ABSOLUTAMENTE: punto de vista/encuadre, relación de aspecto, arquitectura, posiciones de muros/puertas/ventanas, líneas de fuga, altura de techos y proporciones. NO reencuadres, NO cambies la cámara, NO alteres la estructura.

PERMITIDO CAMBIAR: mobiliario minimalista, acabados claros, textiles hygge, luminarias simples. Todo nuevo elemento debe respetar perspectiva, escala, y dirección de luz existente.

DIRECTRICES DE ESTILO: funcionalidad elegante con máximo appeal para compradores que valoran la simplicidad.
- Paleta: blancos puros, grises claros, beiges naturales, con toques muy sutiles de blush pink o sage green.
- Materiales: madera clara (roble, abedul), lino natural, lana merino, cerámica mate, metal negro delgado.
- Mobiliario: diseño funcional con líneas simples, almacenamiento integrado, mesas de madera clara, sillas de diseño icónico.
- Decoración: textiles en capas (throws, cushions), plantas verdes simples, arte minimalista, velas y objetos de cerámica.
- Iluminación: maximizar luz natural, pendant lamps de papel o metal mate, table lamps cálidas; crear ambiente acogedor pero limpio.

CALIDAD: photorealistic, ultra-detailed, professional quality, perfect lighting, 8K. Debe evocar calm, comfort y sophisticated simplicity.`,
  },
  {
    id: 'transitional',
    name: 'Transitional',
    prompt: `USANDO EXCLUSIVAMENTE la imagen proporcionada como base: transforma este mismo espacio al ESTILO TRANSICIONAL para HOME STAGING, fotorrealista.

PRESERVA ABSOLUTAMENTE: encuadre y perspectiva originales, relación de aspecto, arquitectura (muros/puertas/ventanas), proporciones y líneas de fuga. NO recortes ni cambios de cámara, NO muevas elementos constructivos.

PERMITIDO CAMBIAR: mobiliario versátil, textiles equilibrados, arte clásico-moderno, accesorios atemporales y acabados neutros coherentes con la estructura existente.

DIRECTRICES DE ESTILO: balance perfecto entre clásico y contemporáneo que apela al mayor número de compradores.
- Paleta: neutros cálidos universales (cream, warm gray, soft beige) con acentos sutiles en blue navy o forest green.
- Materiales: mezcla balanceada de madera natural, telas clásicas (lino, algodón), metal tradicional (brass, iron), piedra natural.
- Mobiliario: líneas suaves pero definidas, sofás con brazos clásicos pero silueta limpia, mesas de madera con detalles sutiles.
- Decoración: mix de arte clásico y contemporáneo, plantas tradicionales, libros, objetos decorativos equilibrados entre vintage y moderno.
- Iluminación: combinación de chandeliers tradicionales con toques modernos y table/floor lamps elegantes; 2900K para calidez acogedora.

CALIDAD: photorealistic, ultra-detailed, professional quality, perfect lighting, 8K. Debe transmitir timeless elegance y broad market appeal.`,
  },
  {
    id: 'coastal',
    name: 'Coastal',
    prompt: `USANDO EXCLUSIVAMENTE la imagen proporcionada como base: transforma este mismo espacio al ESTILO COASTAL/HAMPTONS para HOME STAGING, fotorrealista.

PRESERVA ABSOLUTAMENTE: punto de vista y encuadre, relación de aspecto, arquitectura y proporciones; NO cambies la cámara ni la estructura. Mantén la dirección de luz y sombras originales.

PERMITIDO CAMBIAR: mobiliario coastal-chic, textiles marinos, accesorios náuticos elegantes, plantas tropicales, acabados superficiales beach-inspired; todo integrado con perspectiva y escala precisas.

DIRECTRICES DE ESTILO: elegancia costera relajada que evoca vacaciones permanentes y lifestyle aspiracional.
- Paleta: whites crisp, soft blues (powder, sky, navy), sandy beiges, sea glass greens, con acentos en coral suave.
- Materiales: madera blanqueada/weathered, rattan natural, lino crudo, algodón stripe, sisal, vidrio sea glass, rope details.
- Mobiliario: sofás slipcovered en white/cream, mesas de reclaimed wood, sillas wicker/rattan, ottomans navy, coastal casual pero refined.
- Decoración: arte marino abstracto, plants tropicales, sea shells elegantes, lanterns, books sobre travel, textiles en nautical patterns.
- Iluminación: maximizar luz natural, lantern-style pendants, table lamps con rope o ceramic bases; luz limpia y brillante 3500K.

CALIDAD: photorealistic, ultra-detailed, professional quality, perfect lighting, 8K. Debe evocar relaxed luxury y coastal living dream.`,
  },
  {
    id: 'industrial',
    name: 'Industrial Chic',
    prompt: `USANDO EXCLUSIVAMENTE la imagen proporcionada como base: transforma este mismo espacio al ESTILO INDUSTRIAL CHIC para HOME STAGING, fotorrealista.

PRESERVA ABSOLUTAMENTE: encuadre y perspectiva originales, relación de aspecto, arquitectura (muros, huecos, estructura visible), proporciones y líneas de fuga. NO cambies la cámara ni la estructura; no inventes elementos constructivos imposibles.

PERMITIDO CAMBIAR: mobiliario industrial-luxury, luminarias statement, accesorios urbanos sofisticados y REVESTIMIENTOS (exposed brick, metal panels) sin alterar la geometría real; integra todo con escala y sombras coherentes.

DIRECTRICES DE ESTILO: urban sophistication que apela a compradores jóvenes profesionales y art lovers.
- Paleta: charcoal grays, warm blacks, raw concrete, con acentos en brass, copper, y warm wood tones.
- Materiales: exposed brick (como revestimiento), steel black, reclaimed wood, leather cognac, concrete polished, glass industrial.
- Mobiliario: sofás leather dark, mesas steel and wood, stools industrial, shelving metal pipe, lighting statement pieces.
- Decoración: arte large scale abstracto/photography, plants en metal planters, books de art/design, objetos sculptural.
- Iluminación: pendant lights industriales con Edison bulbs, floor lamps metal articulado, track lighting; contraste dramático 2800K.

CALIDAD: photorealistic, ultra-detailed, professional quality, perfect lighting, 8K. Debe transmitir urban edge y sophisticated loft living.`,
  },
];

interface GeneratedStyle {
  id: string;
  name: string;
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);


const App: React.FC = () => {
  const [roomImageFile, setRoomImageFile] = useState<File | null>(null);
  const [generatedStyles, setGeneratedStyles] = useState<GeneratedStyle[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  
  const roomImageUrl = roomImageFile ? URL.createObjectURL(roomImageFile) : null;

  const handleImageUpload = useCallback((file: File) => {
    setRoomImageFile(file);
    setGeneratedStyles([]);
    setGlobalError(null);
  }, []);

  const handleGenerateStyles = useCallback(async () => {
    if (!roomImageFile) return;

    setIsGenerating(true);
    setGlobalError(null);
    setGeneratedStyles(STAGING_STYLES.map(style => ({
      id: style.id,
      name: style.name,
      imageUrl: null,
      isLoading: true,
      error: null,
    })));

    // Fix: Add `as const` to create a discriminated union, allowing TypeScript to correctly narrow types.
    const promises = STAGING_STYLES.map(style =>
      transformImageWithStyle(roomImageFile, style.prompt)
        .then(imageUrl => ({ status: 'fulfilled' as const, value: { id: style.id, imageUrl } }))
        .catch(error => ({ status: 'rejected' as const, reason: { id: style.id, error: error instanceof Error ? error.message : 'An unknown error occurred' } }))
    );

    for (const promise of promises) {
        const result = await promise;
        setGeneratedStyles(prevStyles =>
            prevStyles.map(style => {
                if (result.status === 'fulfilled' && style.id === result.value.id) {
                    return { ...style, imageUrl: result.value.imageUrl, isLoading: false };
                } else if (result.status === 'rejected' && style.id === result.reason.id) {
                    return { ...style, error: result.reason.error, isLoading: false };
                }
                return style;
            })
        );
    }

    setIsGenerating(false);
  }, [roomImageFile]);
  
  const handleDownload = (imageUrl: string, fileName: string) => {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `${fileName.replace(/\s+/g, '-')}-style.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  const handleReset = useCallback(() => {
    setRoomImageFile(null);
    setGeneratedStyles([]);
    setIsGenerating(false);
    setGlobalError(null);
  }, []);

  useEffect(() => {
    return () => {
        if (roomImageUrl) URL.revokeObjectURL(roomImageUrl);
    };
  }, [roomImageUrl]);

  const renderContent = () => {
    if (globalError) {
       return (
           <div className="text-center animate-fade-in bg-red-50 border border-red-200 p-8 rounded-lg max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold mb-4 text-red-800">An Error Occurred</h2>
            <p className="text-lg text-red-700 mb-6">{globalError}</p>
            <button
                onClick={handleReset}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
              >
                Try Again
            </button>
          </div>
        );
    }
    
    if (!roomImageFile) {
      return (
        <div className="w-full max-w-2xl mx-auto animate-fade-in">
          <h2 className="text-2xl font-extrabold text-center mb-5 text-zinc-800">Upload Your Property Photo</h2>
          <ImageUploader 
            id="room-uploader"
            onFileSelect={handleImageUpload}
            imageUrl={null}
          />
        </div>
      );
    }

    return (
      <div className="w-full max-w-7xl mx-auto animate-fade-in">
        <div className="text-center mb-12">
            <div className="max-w-xl mx-auto mb-6">
                <h2 className="text-2xl font-extrabold text-center mb-5 text-zinc-800">Your Property</h2>
                <div className="relative">
                    <img src={roomImageUrl!} alt="Uploaded property" className="rounded-lg shadow-md w-full" />
                    <button
                        onClick={handleReset}
                        className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-opacity-80 transition-all z-20 shadow-lg"
                    >
                        Change Photo
                    </button>
                </div>
            </div>
            <p className="text-lg text-zinc-600 mb-6">Ready to transform this space? Generate 5 professional staging concepts to maximize appeal.</p>
            <button
                onClick={handleGenerateStyles}
                disabled={isGenerating}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-lg text-xl transition-all duration-300 disabled:bg-zinc-400 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100"
            >
                {isGenerating ? 'Staging...' : 'Generate Staging Designs'}
            </button>
        </div>
        
        {generatedStyles.length > 0 && (
            <div>
                <h2 className="text-3xl font-extrabold text-center mb-6 text-zinc-800">Staging Concepts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {generatedStyles.map(style => (
                        <div key={style.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col animate-fade-in">
                           <div className="aspect-video bg-zinc-100 flex items-center justify-center relative">
                               {style.isLoading && <Spinner />}
                               {style.error && <div className="p-4 text-center text-red-600"><p className="font-bold">Generation Failed</p><p className="text-sm">{style.error}</p></div>}
                               {style.imageUrl && <img src={style.imageUrl} alt={`${style.name} staging`} className="w-full h-full object-cover" />}
                           </div>
                           <div className="p-4 flex-grow flex flex-col justify-between">
                                <h3 className="text-xl font-bold text-zinc-800 mb-2">{style.name}</h3>
                                <button
                                    onClick={() => handleDownload(style.imageUrl!, style.name)}
                                    disabled={!style.imageUrl}
                                    className="w-full bg-zinc-800 hover:bg-black text-white font-semibold py-2 px-4 rounded-md transition-colors disabled:bg-zinc-300 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    <DownloadIcon />
                                    Download
                                </button>
                           </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-slate-50 text-zinc-800 flex flex-col items-center p-4 md:p-8">
      <div className="flex flex-col items-center gap-8 w-full">
        <Header />
        <main className="w-full">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;