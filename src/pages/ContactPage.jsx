import { useData } from '../context/DataContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { usePageMeta } from '../hooks/usePageMeta.js';
import PageHeader from '../components/PageHeader.jsx';
import ContactForm from '../components/ContactForm.jsx';
import ContactInfo from '../components/ContactInfo.jsx';

export default function ContactPage() {
  const { profile } = useData();
  const { t } = useLanguage();
  const pageMeta = profile?.pages?.contact;

  usePageMeta(`${t('pages.contact.docTitle')} | ${profile?.identity?.name || ''}`, pageMeta?.subtitle);

  return (
    <>
      <PageHeader title={pageMeta?.title} subtitle={pageMeta?.subtitle} />

      <section
        className="py-8 bg-white dark:bg-gray-800 transition-colors duration-300"
        data-aos="fade-in"
        data-aos-delay="200"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12" data-aos="fade-in" data-aos-delay="200">
            <div className="md:w-7/12">
              <div className="bg-gradient-to-br from-gray-200 to-gray-50 dark:from-gray-800 dark:to-gray-700 py-8 transition-colors duration-300 rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">{profile?.contact?.formTitle || ''}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">{profile?.contact?.formText || ''}</p>

                <ContactForm />
              </div>
            </div>

            <ContactInfo />
          </div>
        </div>
      </section>
    </>
  );
}
