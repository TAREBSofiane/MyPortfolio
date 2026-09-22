import { useState } from 'react';
import { useData } from '../context/DataContext.jsx';
import { usePageMeta } from '../hooks/usePageMeta.js';
import EducationCard from '../components/cards/EducationCard.jsx';
import DetailModal from '../components/DetailModal.jsx';
import { EducationModalContent } from '../components/ModalContents.jsx';

export default function EducationPage() {
  const { profile, education, status } = useData();
  const [selected, setSelected] = useState(null);
  const pageMeta = profile?.pages?.education;

  usePageMeta(
    `${pageMeta?.title || 'Mon Education'} | ${profile?.identity?.name || ''}`,
    pageMeta?.subtitle
  );

  return (
    <>
      <section className="bg-gradient-to-b from-gray-300 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{pageMeta?.title || ''}</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">{pageMeta?.subtitle || ''}</p>
          </div>
        </div>
      </section>

      <section
        className="py-8 bg-white dark:bg-gray-800 transition-colors duration-300"
        data-aos="fade-in"
        data-aos-delay="200"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {status === 'loading'
              ? [0, 1].map((n) => (
                  <div
                    key={n}
                    className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden h-96 skeleton"
                  ></div>
                ))
              : education.map((edu, index) => (
                  <EducationCard key={edu.title} edu={edu} index={index} onOpen={setSelected} />
                ))}
          </div>
        </div>
      </section>

      {selected && (
        <DetailModal title={selected.title} onClose={() => setSelected(null)}>
          <EducationModalContent edu={selected} />
        </DetailModal>
      )}
    </>
  );
}
