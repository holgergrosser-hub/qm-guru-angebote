import React, { useState } from 'react';
import { Mail, FileText, CheckCircle, Loader, AlertCircle } from 'lucide-react';

// Google Apps Script URL - PASTE DEINE NEUE URL HIER!
const SCRIPT_URL = 'https://script.google.com/a/macros/iso9001.info/s/AKfycbwYHfgEzP0JCfZLNoZ8tfC1uKkTDMRaIf6eP2g5Kt-ms5XK60qak4PvWekcc6WKxgHC/exec';

export default function App() {
  const [formData, setFormData] = useState({
    unternehmensname: '',
    ansprechpartner: '',
    email: '',
    telefon: '',
    nachricht: ''
  });

  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validierung
    if (!formData.unternehmensname || !formData.email || !formData.ansprechpartner) {
      setErrorMsg('Bitte füllen Sie Unternehmensname, Ansprechpartner und Email aus');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      console.log('Sende Daten an:', SCRIPT_URL);
      console.log('Daten:', formData);

      // Sende Daten zu Google Apps Script
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // WICHTIG für CORS!
        headers: {
          'Content-Type': 'text/plain', // Google Apps Script mag text/plain besser
        },
        body: JSON.stringify({
          unternehmensname: formData.unternehmensname,
          ansprechpartner: formData.ansprechpartner,
          email: formData.email,
          telefon: formData.telefon || 'nicht angegeben',
          nachricht: formData.nachricht || 'keine'
        })
      });

      console.log('Response erhalten');

      // Bei no-cors können wir Response nicht lesen, daher setzen wir direkt success
      setStatus('success');
      
      // Reset Form nach 4 Sekunden
      setTimeout(() => {
        setFormData({
          unternehmensname: '',
          ansprechpartner: '',
          email: '',
          telefon: '',
          nachricht: ''
        });
        setStatus('idle');
      }, 4000);

    } catch (err) {
      console.error('Fehler:', err);
      setStatus('error');
      setErrorMsg('Es gab einen Fehler beim Versenden. Bitte überprüfen Sie die Konsole (F12) für Details.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Angebot anfordern</h1>
          </div>
          <p className="text-gray-600">
            Füllen Sie das Formular aus und erhalten Sie Ihr individuelles Angebot sofort per Email als PDF.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          
          {/* Unternehmensname */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Unternehmensname *
            </label>
            <input
              type="text"
              name="unternehmensname"
              value={formData.unternehmensname}
              onChange={handleChange}
              placeholder="z.B. ABC Consulting GmbH"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
              required
            />
          </div>

          {/* Ansprechpartner */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ansprechpartner *
            </label>
            <input
              type="text"
              name="ansprechpartner"
              value={formData.ansprechpartner}
              onChange={handleChange}
              placeholder="z.B. Max Mustermann"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              E-Mail-Adresse *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="max.mustermann@example.com"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Hier wird Ihnen das Angebot als PDF zugesendet</p>
          </div>

          {/* Telefon */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Telefon (optional)
            </label>
            <input
              type="tel"
              name="telefon"
              value={formData.telefon}
              onChange={handleChange}
              placeholder="z.B. 0911-49522541"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* Nachricht */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nachricht / Fragen (optional)
            </label>
            <textarea
              name="nachricht"
              value={formData.nachricht}
              onChange={handleChange}
              placeholder="z.B. Benötigen Sie zusätzliche Leistungen oder haben Fragen zum Angebot?"
              rows="4"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition resize-none"
            />
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-300 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{errorMsg}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition flex items-center justify-center gap-2 ${
              status === 'loading'
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : status === 'success'
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {status === 'loading' && <Loader className="w-5 h-5 animate-spin" />}
            {status === 'loading' && 'Wird verarbeitet...'}
            {status === 'success' && <CheckCircle className="w-5 h-5" />}
            {status === 'success' && 'Erfolgreich! Email unterwegs...'}
            {status === 'idle' && status !== 'success' && (
              <>
                <Mail className="w-5 h-5" />
                Angebot anfordern (per Email + PDF)
              </>
            )}
          </button>

          {/* Success Message */}
          {status === 'success' && (
            <div className="mt-6 p-4 bg-green-50 border-2 border-green-300 rounded-lg">
              <p className="text-green-800 font-semibold mb-3">✅ Ihr Angebot wurde erfolgreich erstellt!</p>
              <div className="space-y-2">
                <p className="text-sm text-green-700">📧 Eine Email mit dem PDF wird in Kürze zugestellt (überprüfen Sie auch den Spam-Ordner)</p>
                <p className="text-sm text-green-700">💡 Die Email kommt von: Holger.Grosser@QM-Guru.de</p>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
            <p className="text-sm text-blue-800">
              <strong>💡 Hinweis:</strong> Ihr Angebot wird in Echtzeit generiert und sofort an Ihre Email versendet. Bitte überprüfen Sie auch Ihren Spam-Ordner falls die Email nicht ankommt.
            </p>
          </div>
        </form>

        {/* Footer Info */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-800">Sofortiges PDF</p>
            <p className="text-xs text-gray-600">Generiert in Echtzeit</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <Mail className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-800">Automatische Email</p>
            <p className="text-xs text-gray-600">Mit Anhang an Sie versendet</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <CheckCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-800">100% Transparent</p>
            <p className="text-xs text-gray-600">Keine versteckten Kosten</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600 text-sm">
          <p>QM-Guru | Holger Großer | Simonstr. 14, 90763 Fürth</p>
          <p>Tel. 0911-49522541 | Holger.Grosser@iso9001.info</p>
        </div>
      </div>
    </div>
  );
}
