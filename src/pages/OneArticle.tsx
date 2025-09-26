import { useParams } from 'react-router-dom';

const OneArticle = () => {
  const { slug } = useParams();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-red-950 to-gray-900 mt-10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Article Detail
          </h1>
          <p className="text-xl text-gray-300">Slug: {slug}</p>
        </div>

        {/* Content */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">
            Článok pre slug: {slug}
          </h2>
          <p className="text-gray-300">
            Tu bude obsah článku. Slug z URL je: <span className="text-red-400">{slug}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OneArticle;
