export default function PageHeader({ title, subtitle }) {
  return (
    <section className="bg-gradient-to-b from-gray-300 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title || ''}</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">{subtitle || ''}</p>
        </div>
      </div>
    </section>
  );
}
