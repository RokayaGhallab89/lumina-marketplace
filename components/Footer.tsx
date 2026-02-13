import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#333] text-gray-300 pt-10 pb-6 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="text-white font-bold text-lg mb-4 uppercase tracking-wide">{t('about')}</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{t('careers')}</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{t('privacy')}</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{t('terms')}</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-white font-bold text-lg mb-4 uppercase tracking-wide">{t('payment')}</h3>
          <div className="flex gap-4 text-3xl mb-2 items-center">
             <i className="fa-brands fa-cc-visa hover:text-white transition-colors cursor-pointer text-gray-400"></i>
             <i className="fa-brands fa-cc-mastercard hover:text-white transition-colors cursor-pointer text-gray-400"></i>
             <i className="fa-brands fa-cc-paypal hover:text-white transition-colors cursor-pointer text-gray-400"></i>
          </div>
          <div className="flex items-center gap-2 text-green-500 text-xs font-bold uppercase mt-2">
             <i className="fa-solid fa-lock"></i> {t('securePayment')}
          </div>
        </div>

        <div>
          <h3 className="text-white font-bold text-lg mb-4 uppercase tracking-wide">{t('buyingOn')}</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">{t('safety')}</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{t('faqs')}</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{t('delivery')}</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{t('returnPolicy')}</a></li>
          </ul>
        </div>

        <div>
           <h3 className="text-white font-bold text-lg mb-4 uppercase tracking-wide">{t('newsletter')}</h3>
           <p className="text-sm mb-3">{t('subscribe')}</p>
           <div className="flex">
             <input type="email" placeholder={t('enterEmail')} className="w-full px-3 py-2 rounded-s-md text-gray-800 focus:outline-none" />
             <button className="bg-primary text-white font-bold px-4 py-2 rounded-e-md hover:bg-accent uppercase text-sm">{t('male')}</button>
           </div>
        </div>
      </div>
      
      <div className="border-t border-gray-600 pt-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} {t('rights')}</p>
      </div>
    </footer>
  );
};

export default Footer;