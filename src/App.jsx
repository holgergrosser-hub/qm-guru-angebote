import React, { useState } from 'react';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzBSfNlX9LyZD0SshbY1P0395UDdiSvKeytvl3ZtFUgD_JTG4btk-Yow3WpUeyL9Q9ZYQ/exec';

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%)',
    padding: '40px 20px',
    fontFamily: 'Arial, sans-serif',
  },
  wrapper: {
    maxWidth: '700px',
    margin: '0 auto',
  },
  headerBox: {
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    padding: '32px',
    marginBottom: '24px',
  },
  headerTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1a202c',
    margin: '0 0 16px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  headerIcon: {
    fontSize: '32px',
  },
  headerDesc: {
    fontSize: '16px',
    color: '#4a5568',
    margin: '0',
    lineHeight: '1.6',
  },
  formBox: {
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    padding: '32px',
  },
  formGroup: {
    marginBottom: '24px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: '8px',
  },
  required: {
    color: '#e53e3e',
    marginLeft: '2px',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '14px',
    border: '2px solid #cbd5e0',
    borderRadius: '8px',
    boxSizing: 'border-box',
    fontFamily: 'Arial, sans-serif',
    transition: 'border-color 0.2s',
  },
  inputFocus: {
    borderColor: '#3182ce',
  },
  textarea: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '14px',
    border: '2px solid #cbd5e0',
    borderRadius: '8px',
    boxSizing: 'border-box',
    fontFamily: 'Arial, sans-serif',
    resize: 'vertical',
    minHeight: '120px',
    transition: 'border-color 0.2s',
  },
  helperText: {
    fontSize: '12px',
    color: '#718096',
    marginTop: '4px',
  },
  button: {
    width: '100%',
    padding: '14px 24px',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  buttonIdle: {
    background: '#3182ce',
    color: 'white',
  },
  buttonLoading: {
    background: '#a0aec0',
    color: 'white',
    cursor: 'not-allowed',
  },
  buttonSuccess: {
    background: '#38a169',
    color: 'white',
  },
  buttonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
  },
  errorBox: {
    background: '#fff5f5',
    border: '2px solid #fc8181',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '20px',
    display: 'flex',
    gap: '12px',
  },
  errorText: {
    color: '#c53030',
    fontSize: '14px',
  },
  successBox: {
    background: '#f0fff4',
    border: '2px solid #9ae6b4',
    borderRadius: '8px',
    padding: '20px',
    marginTop: '24px',
  },
  successTitle: {
    color: '#22543d',
    fontWeight: 'bold',
    marginBottom: '12px',
    fontSize: '16px',
  },
  successList: {
    color: '#22543d',
    fontSize: '13px',
    lineHeight: '1.8',
  },
  infoBox: {
    background: '#eff6ff',
    borderLeft: '4px solid #3b82f6',
    borderRadius: '4px',
    padding: '16px',
    marginTop: '24px',
    fontSize: '13px',
    color: '#1e40af',
    lineHeight: '1.6',
  },
  footer: {
    marginTop: '32px',
    textAlign: 'center',
    fontSize: '12px',
    color: '#718096',
    lineHeight: '1.8',
  },
  footerGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginTop: '32px',
  },
  footerCard: {
    background: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    padding: '20px',
    textAlign: 'center',
  },
  footerCardIcon: {
    fontSize: '24px',
    marginBottom: '8px',
  },
  footerCardTitle: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: '4px',
  },
  footerCardDesc: {
    fontSize: '11px',
    color: '#718096',
  },
};

export default function App() {
  const [formData, setFormData] = useState({
    unternehmensname: '',
    ansprechpartner: '',
    email: '',
    telefon: '',
    nachricht: ''
  });

  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.unternehmensname || !formData.email || !formData.ansprechpartner) {
      setErrorMsg('Bitte füllen Sie Unternehmensname, Ansprechpartner und Email aus');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      console.log('Sende Daten an:', SCRIPT_URL);
      
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify({
          unternehmensname: formData.unternehmensname,
          ansprechpartner: formData.ansprechpartner,
          email: formData.email,
          telefon: formData.telefon || 'nicht angegeben',
          nachricht: formData.nachricht || 'keine'
        })
      });

      setStatus('success');

      setTimeout(() => {
        setFormData({
          unternehmensname: '',
          ansprechpartner: '',
          email: '',
          telefon: '',
          nachricht: ''
        });
        setStatus('idle');
      }, 5000);

    } catch (err) {
      console.error('Fehler:', err);
      setStatus('error');
      setErrorMsg('Es gab einen Fehler beim Versenden. Bitte später erneut versuchen.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        
        {/* Header */}
        <div style={styles.headerBox}>
          <div style={styles.headerTitle}>
            <span style={styles.headerIcon}>📋</span>
            Angebot anfordern
          </div>
          <p style={styles.headerDesc}>
            Füllen Sie das Formular aus und erhalten Sie Ihr individuelles Angebot sofort per Email als PDF.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.formBox}>
          
          {/* Unternehmensname */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Unternehmensname
              <span style={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="unternehmensname"
              value={formData.unternehmensname}
              onChange={handleChange}
              onFocus={() => setFocusedField('unternehmensname')}
              onBlur={() => setFocusedField(null)}
              placeholder="z.B. ABC Consulting GmbH"
              style={{
                ...styles.input,
                ...(focusedField === 'unternehmensname' ? styles.inputFocus : {})
              }}
              required
            />
          </div>

          {/* Ansprechpartner */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Ansprechpartner
              <span style={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="ansprechpartner"
              value={formData.ansprechpartner}
              onChange={handleChange}
              onFocus={() => setFocusedField('ansprechpartner')}
              onBlur={() => setFocusedField(null)}
              placeholder="z.B. Max Mustermann"
              style={{
                ...styles.input,
                ...(focusedField === 'ansprechpartner' ? styles.inputFocus : {})
              }}
              required
            />
          </div>

          {/* Email */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              E-Mail-Adresse
              <span style={styles.required}>*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              placeholder="max.mustermann@example.com"
              style={{
                ...styles.input,
                ...(focusedField === 'email' ? styles.inputFocus : {})
              }}
              required
            />
            <div style={styles.helperText}>
              Hier wird Ihnen das Angebot als PDF zugesendet
            </div>
          </div>

          {/* Telefon */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Telefon (optional)
            </label>
            <input
              type="tel"
              name="telefon"
              value={formData.telefon}
              onChange={handleChange}
              onFocus={() => setFocusedField('telefon')}
              onBlur={() => setFocusedField(null)}
              placeholder="z.B. 0911-49522541"
              style={{
                ...styles.input,
                ...(focusedField === 'telefon' ? styles.inputFocus : {})
              }}
            />
          </div>

          {/* Nachricht */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Nachricht / Fragen (optional)
            </label>
            <textarea
              name="nachricht"
              value={formData.nachricht}
              onChange={handleChange}
              onFocus={() => setFocusedField('nachricht')}
              onBlur={() => setFocusedField(null)}
              placeholder="z.B. Benötigen Sie zusätzliche Leistungen oder haben Fragen zum Angebot?"
              style={{
                ...styles.textarea,
                ...(focusedField === 'nachricht' ? styles.inputFocus : {})
              }}
            />
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div style={styles.errorBox}>
              <span>⚠️</span>
              <div style={styles.errorText}>{errorMsg}</div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              ...styles.button,
              ...(status === 'loading' ? styles.buttonLoading : styles.buttonIdle),
              ...(status === 'success' ? styles.buttonSuccess : {}),
              ...(status !== 'loading' && status !== 'error' ? styles.buttonHover : {})
            }}
            onMouseEnter={(e) => {
              if (status !== 'loading' && status !== 'error') {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 16px rgba(0,0,0,0.12)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'none';
              e.target.style.boxShadow = 'none';
            }}
          >
            {status === 'loading' && '⏳ Wird verarbeitet...'}
            {status === 'success' && '✅ Erfolgreich! Email unterwegs...'}
            {status === 'idle' && '📧 Angebot anfordern (per Email + PDF)'}
            {status === 'error' && '❌ Fehler beim Versenden'}
          </button>

          {/* Success Message */}
          {status === 'success' && (
            <div style={styles.successBox}>
              <div style={styles.successTitle}>✅ Ihr Angebot wurde erfolgreich erstellt!</div>
              <div style={styles.successList}>
                📧 Eine Email mit dem PDF wird in Kürze zugestellt (überprüfen Sie auch den Spam-Ordner)<br/>
                💡 Die Email kommt von: Holger.Grosser@QM-Guru.de
              </div>
            </div>
          )}

          {/* Info Box */}
          <div style={styles.infoBox}>
            <strong>💡 Hinweis:</strong> Ihr Angebot wird in Echtzeit generiert und sofort an Ihre Email versendet. Bitte überprüfen Sie auch Ihren Spam-Ordner falls die Email nicht ankommt.
          </div>
        </form>

        {/* Footer Grid */}
        <div style={styles.footerGrid}>
          <div style={styles.footerCard}>
            <div style={styles.footerCardIcon}>📄</div>
            <div style={styles.footerCardTitle}>Sofortiges PDF</div>
            <div style={styles.footerCardDesc}>Generiert in Echtzeit</div>
          </div>
          <div style={styles.footerCard}>
            <div style={styles.footerCardIcon}>📧</div>
            <div style={styles.footerCardTitle}>Automatische Email</div>
            <div style={styles.footerCardDesc}>Mit Anhang an Sie versendet</div>
          </div>
          <div style={styles.footerCard}>
            <div style={styles.footerCardIcon}>✅</div>
            <div style={styles.footerCardTitle}>100% Transparent</div>
            <div style={styles.footerCardDesc}>Keine versteckten Kosten</div>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p style={{ margin: '0' }}>QM-Guru | Holger Großer | Simonstr. 14, 90763 Fürth</p>
          <p style={{ margin: '8px 0 0 0' }}>Tel. 0911-49522541 | Holger.Grosser@iso9001.info</p>
        </div>

      </div>
    </div>
  );
}
