import React, { useEffect, useState } from 'react';
import { BookOpen, Clock, Globe, Mountain, Waves, Ghost, Cat } from 'lucide-react';

const LearnAboutYokai: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <div className="min-h-screen bg-gray-900 text-white pt-16">

      {/* Hero Header */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-red-950 to-gray-900 opacity-80" />
        
        <div 
          className="relative z-20 max-w-4xl mx-auto text-center"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <div className="slide-in-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-4xl md:text-5xl">妖怪</span>
              <span className="block text-2xl md:text-3xl bg-gradient-to-r from-red-400 to-amber-400 bg-clip-text text-transparent mt-2">
                Japonské Nadprirodzené Bytosti
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Kompletný sprievodca tajomným svetom yōkai
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Introduction */}
        <section className="mb-16 mt-10 slide-in-up">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
            <div className="flex items-center mb-6">
              <BookOpen className="h-8 w-8 text-red-400 mr-3" />
              <h2 className="text-3xl font-bold text-white">Čo sú Yōkai?</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              Yōkai (妖怪) sú nadprirodzené bytosti z japonského folklóru, ktoré zahŕňajú duchov, 
              démonov, príšery a rôzne mystické stvorenia. Slovo "yōkai" sa skladá z dvoch znakov: 
              "yō" (妖) znamenajúci "podivný" alebo "tajomný" a "kai" (怪) znamenajúci "divný" či 
              "neobvyklý". Tieto bytosti sú neoddeliteľnou súčasťou japonskej kultúry už viac ako tisíc rokov.
            </p>
          </div>
        </section>

        {/* Origins and History */}
        <section className="mb-16 slide-in-up">
          <div className="bg-gradient-to-r from-amber-900/20 to-red-900/20 rounded-xl p-8 border border-amber-700/30">
            <div className="flex items-center mb-6">
              <Clock className="h-8 w-8 text-amber-400 mr-3" />
              <h2 className="text-3xl font-bold text-white">Pôvod a História</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Yōkai majú svoje korene v období Heian (794-1185), keď sa začali objavovať 
                  v literárnych dielach a buddhistických textoch. Ich popularita výrazne 
                  vzrástla počas obdobia Edo (1603-1868).
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Najstarším systematickým záznamom o yōkai je "Nihon Ryōiki" z 9. storočia.
                </p>
              </div>
              <div className="space-y-4">
                <div className="border-l-4 border-amber-400 pl-4">
                  <h4 className="font-semibold text-amber-300">9. storočie</h4>
                  <p className="text-gray-400">Najstarší záznam v "Nihon Ryōiki"</p>
                </div>
                <div className="border-l-4 border-amber-400 pl-4">
                  <h4 className="font-semibold text-amber-300">Obdobie Heian (794-1185)</h4>
                  <p className="text-gray-400">Prvé systematické zmienky v literatúre</p>
                </div>
                <div className="border-l-4 border-amber-400 pl-4">
                  <h4 className="font-semibold text-amber-300">Obdobie Edo (1603-1868)</h4>
                  <p className="text-gray-400">Popularizácia cez ukiyo-e tlače</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Numbers and Diversity */}
        <section className="mb-16 slide-in-up">
          <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-xl p-8 border border-green-700/30">
            <div className="flex items-center mb-6">
              <Globe className="h-8 w-8 text-green-400 mr-3" />
              <h2 className="text-3xl font-bold text-white">Počet a Rozmanitosť</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-6 bg-gray-800/50 rounded-lg">
                <div className="text-3xl font-bold text-green-400 mb-2">3000+</div>
                <div className="text-gray-300">Dokumentovaných typov</div>
              </div>
              <div className="text-center p-6 bg-gray-800/50 rounded-lg">
                <div className="text-3xl font-bold text-green-400 mb-2">47</div>
                <div className="text-gray-300">Prefektúr s vlastnými yōkai</div>
              </div>
              <div className="text-center p-6 bg-gray-800/50 rounded-lg">
                <div className="text-3xl font-bold text-green-400 mb-2">20+</div>
                <div className="text-gray-300">Hlavných kategórií</div>
              </div>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              Presný počet yōkai je nemožné určiť, keďže folklór sa neustále vyvíja. 
              Odhaduje sa, že existuje viac ako 3000 rôznych typov yōkai dokumentovaných 
              v japonskej tradícii. Každá prefektúra má svoje charakteristické yōkai.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="mb-16 slide-in-up">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Klasifikácia Yōkai</h2>
            <p className="text-gray-400 text-center text-lg">Preskúmajte rôzne typy nadprirodzených bytostí</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group bg-gradient-to-br from-blue-900/30 to-cyan-900/30 p-6 rounded-xl border border-blue-700/30 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center mb-4">
                <Waves className="h-8 w-8 text-blue-400 mr-3" />
                <h3 className="text-xl font-semibold text-blue-300">Vodné Yōkai</h3>
              </div>
              <p className="text-gray-300 mb-3">Bytosti žijúce v riekach, jazerách a moriach</p>
              <p className="text-sm text-blue-200">Kappa • Ningyo • Mizuchi</p>
            </div>
            
            <div className="group bg-gradient-to-br from-green-900/30 to-emerald-900/30 p-6 rounded-xl border border-green-700/30 hover:border-green-500/50 transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center mb-4">
                <Mountain className="h-8 w-8 text-green-400 mr-3" />
                <h3 className="text-xl font-semibold text-green-300">Horské Yōkai</h3>
              </div>
              <p className="text-gray-300 mb-3">Stvorenia obývajúce hory a lesy</p>
              <p className="text-sm text-green-200">Tengu • Yamabiko • Satori</p>
            </div>
            
            <div className="group bg-gradient-to-br from-purple-900/30 to-indigo-900/30 p-6 rounded-xl border border-purple-700/30 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center mb-4">
                <Ghost className="h-8 w-8 text-purple-400 mr-3" />
                <h3 className="text-xl font-semibold text-purple-300">Duchovia (Yūrei)</h3>
              </div>
              <p className="text-gray-300 mb-3">Duše mŕtvych, ktoré sa nevedia nájsť pokoj</p>
              <p className="text-sm text-purple-200">Onryō • Goryō • Ubume</p>
            </div>
            
            <div className="group bg-gradient-to-br from-amber-900/30 to-orange-900/30 p-6 rounded-xl border border-amber-700/30 hover:border-amber-500/50 transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center mb-4">
                <Cat className="h-8 w-8 text-amber-400 mr-3" />
                <h3 className="text-xl font-semibold text-amber-300">Zvieracie Yōkai</h3>
              </div>
              <p className="text-gray-300 mb-3">Zvieratá s nadprirodzenými schopnosťami</p>
              <p className="text-sm text-amber-200">Kitsune • Tanuki • Bakeneko</p>
            </div>
          </div>
        </section>

        {/* Modern Influence */}
        <section className="slide-in-up">
          <div className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 rounded-xl p-8 border border-indigo-700/30">
            <h2 className="text-3xl font-bold text-white mb-6">Moderný Vplyv</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Yōkai si zachovali svoju popularitu aj v modernom Japonsku. Objavujú sa v anime, 
                  mange, videohrách a filmoch. Štúdio Ghibli často čerpá z yōkai tradícií.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  V súčasnosti yōkai predstavujú nielen súčasť tradičnej kultúry, ale aj zdroj 
                  inšpirácie pre kreatívne priemysly a turistický ruch v Japonsku.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-indigo-300 mb-3">Populárne médiá:</h4>
                <div className="flex flex-wrap gap-2">
                  {["GeGeGe no Kitarō", "Yo-kai Watch", "Studio Ghibli", "Pokémon", "Naruto", "InuYasha"].map((media) => (
                    <span key={media} className="px-3 py-1 bg-indigo-800/50 text-indigo-200 rounded-full text-sm">
                      {media}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LearnAboutYokai;