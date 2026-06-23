'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import styles from './ConsultationForm.module.css';

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ConsultationForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [photoUploadFailed, setPhotoUploadFailed] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || '';

  // Load Calendly widget script when modal opens
  useEffect(() => {
    if (!showCalendly) return;

    const existing = document.querySelector(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]'
    );
    if (existing) return;

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Don't remove — the script may be needed if they open/close/reopen
    };
  }, [showCalendly]);

  const calendlyPrefill = showCalendly
    ? `?name=${encodeURIComponent(name.trim())}&email=${encodeURIComponent(email.trim())}`
    : '';

  const validate = useCallback((): FieldErrors => {
    const errors: FieldErrors = {};
    if (!name.trim()) errors.name = 'Name is required';
    if (!email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = 'Enter a valid email address';
    if (!phone.trim()) errors.phone = 'Phone number is required';
    return errors;
  }, [name, email, phone]);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        return;
      }

      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
      setPhotoUploadFailed(false);
    },
    []
  );

  const handleRemovePhoto = useCallback(() => {
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoFile(null);
    setPhotoPreview(null);
    setPhotoUploadFailed(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [photoPreview]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const errors = validate();
      setFieldErrors(errors);
      if (Object.keys(errors).length > 0) return;

      setStatus('submitting');
      setErrorMessage('');

      try {
        let photoUrl: string | undefined;

        // Upload photo if selected and hasn't already failed
        if (photoFile && !photoUploadFailed) {
          try {
            const photoForm = new FormData();
            photoForm.append('file', photoFile);
            const uploadRes = await fetch('/api/upload', {
              method: 'POST',
              body: photoForm,
            });
            if (uploadRes.ok) {
              const uploadData = await uploadRes.json();
              photoUrl = uploadData.url;
            } else {
              // Upload failed — allow continuation
              setPhotoUploadFailed(true);
            }
          } catch {
            setPhotoUploadFailed(true);
          }
        }

        // Submit lead
        const leadForm = new FormData();
        leadForm.append('name', name.trim());
        leadForm.append('email', email.trim());
        leadForm.append('phone', phone.trim());
        if (photoUrl) leadForm.append('photoUrl', photoUrl);

        const leadRes = await fetch('/api/consultation', {
          method: 'POST',
          body: leadForm,
        });

        if (!leadRes.ok) {
          const errData = await leadRes.json();
          throw new Error(errData.error || 'Submission failed');
        }

        setStatus('success');

        // Open Calendly inline modal
        if (calendlyUrl) {
          setShowCalendly(true);
        }
      } catch (err) {
        setStatus('error');
        setErrorMessage(
          err instanceof Error
            ? err.message
            : 'Something went wrong. Please try again.'
        );
      }
    },
    [name, email, phone, photoFile, photoUploadFailed, calendlyUrl, validate]
  );

  const handleRetry = useCallback(() => {
    setStatus('idle');
    setErrorMessage('');
    setPhotoUploadFailed(false);
  }, []);

  const handleCloseCalendly = useCallback(() => {
    setShowCalendly(false);
    setName('');
    setEmail('');
    setPhone('');
    setPhotoFile(null);
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoPreview(null);
    setFieldErrors({});
    setStatus('idle');
    setErrorMessage('');
    setPhotoUploadFailed(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [photoPreview]);

  return (
    <main className={styles.page}>
      <div className={styles.wrap}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>Online Consultation</p>
          <h1 className={styles.h1}>Book Your Evening Slot</h1>
          <p className={styles.lede}>
            Share your details and a quick photo, then choose an evening slot.
          </p>
        </header>

        <div className={styles.panel}>
          {status === 'error' && (
            <div className={styles.errorBanner} role="alert">
              <p className={styles.errorBannerText}>{errorMessage}</p>
              <button
                type="button"
                className={styles.retryBtn}
                onClick={handleRetry}
              >
                Try Again
              </button>
            </div>
          )}

          {photoUploadFailed && status === 'submitting' && (
            <div className={styles.warningBanner} role="status">
              <p className={styles.warningText}>
                Photo couldn&apos;t be uploaded. You can continue without it.
              </p>
            </div>
          )}

          {!calendlyUrl && (
            <div className={styles.fallbackBanner} role="status">
              <p className={styles.fallbackText}>
                Booking is currently unavailable. Please contact us at{' '}
                <strong>info@lameadental.co.uk</strong> or call us to schedule
                your consultation.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className={`${styles.input} ${fieldErrors.name ? styles.inputError : ''}`}
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={status === 'submitting'}
                required
                autoComplete="name"
              />
              {fieldErrors.name && (
                <p className={styles.fieldError} role="alert">
                  {fieldErrors.name}
                </p>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className={`${styles.input} ${fieldErrors.email ? styles.inputError : ''}`}
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'submitting'}
                required
                autoComplete="email"
              />
              {fieldErrors.email && (
                <p className={styles.fieldError} role="alert">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="phone">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                className={`${styles.input} ${fieldErrors.phone ? styles.inputError : ''}`}
                placeholder="+44 7XXX XXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={status === 'submitting'}
                required
                autoComplete="tel"
              />
              {fieldErrors.phone && (
                <p className={styles.fieldError} role="alert">
                  {fieldErrors.phone}
                </p>
              )}
            </div>

            {/* Photo upload */}
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Teeth Photo</label>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                disabled={status === 'submitting'}
                hidden
                aria-hidden="true"
              />

              {!photoPreview ? (
                <button
                  type="button"
                  className={`${styles.uploadArea} ${status === 'submitting' ? styles.disabled : ''}`}
                  onClick={() => fileInputRef.current?.click()}
                  disabled={status === 'submitting'}
                  aria-label="Add a photo of your teeth"
                >
                  <svg
                    className={styles.uploadIcon}
                    viewBox="0 0 48 48"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <rect x="6" y="12" width="36" height="30" rx="4" />
                    <circle cx="18" cy="22" r="4" />
                    <path d="M6 36l10-10 8 8 6-6 12 12" />
                    <path d="M30 12V6h-4M34 12V6h-4" />
                    <circle cx="33" cy="9" r="3" fill="currentColor" />
                  </svg>
                  <p className={styles.uploadTitle}>
                    Add a photo of your teeth
                  </p>
                  <p className={styles.uploadHint}>
                    Helps us prepare for your visit
                  </p>
                  <p className={styles.uploadNote}>JPEG, PNG, or WebP</p>
                </button>
              ) : (
                <div className={styles.previewArea}>
                  <img
                    src={photoPreview}
                    alt="Preview of your uploaded photo"
                    className={styles.previewImage}
                  />
                  <div className={styles.previewControls}>
                    <button
                      type="button"
                      className={styles.controlBtn}
                      onClick={() => fileInputRef.current?.click()}
                      disabled={status === 'submitting'}
                    >
                      Replace
                    </button>
                    <button
                      type="button"
                      className={`${styles.controlBtn} ${styles.controlBtnRemove}`}
                      onClick={handleRemovePhoto}
                      disabled={status === 'submitting'}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className={styles.cta}
              disabled={status === 'submitting'}
            >
              {status === 'submitting'
                ? 'Submitting…'
                : 'Continue to Booking'}
            </button>
          </form>
        </div>

        {/* Calendly modal overlay */}
        {showCalendly && (
          <div
            className={styles.modalBackdrop}
            onClick={(e) => {
              if (e.target === e.currentTarget) handleCloseCalendly();
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Book your evening consultation"
          >
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>Book Your Slot</h2>
                <button
                  type="button"
                  className={styles.modalClose}
                  onClick={handleCloseCalendly}
                  aria-label="Close booking and return to site"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div
                className={`calendly-inline-widget ${styles.calendlyWidget}`}
                data-url={`${calendlyUrl}${calendlyPrefill}`}
              />
              <p className={styles.modalFooter}>
                <button
                  type="button"
                  className={styles.backLink}
                  onClick={handleCloseCalendly}
                >
                  &larr; Back to Lamea Dental
                </button>
              </p>
            </div>
          </div>
        )}

        <p className={styles.disclaimer}>
          Your information is kept confidential and will only be used to prepare
          for your consultation.
        </p>
      </div>
    </main>
  );
}
