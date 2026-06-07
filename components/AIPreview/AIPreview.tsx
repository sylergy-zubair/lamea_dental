import styles from './AIPreview.module.css';
import Image from 'next/image';

export default function AIPreview() {
  return (
    <section className={styles.section} id="preview">
      <div className={styles.overlay} />
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <p className={styles.sectionLabel}>AI Smile Preview</p>
          <h2 className={styles.title}>See Your New Smile Before You Commit</h2>
          <p className={styles.text}>
            Upload a photo of your current smile. Our AI analyzes your facial structure
            and generates a preview of your potential results. No commitment, no pressure.
            Just a glimpse of what&apos;s possible.
          </p>
          <div className={styles.uploadArea}>
            <div className={styles.uploadIcon}>
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="24" cy="24" r="20" />
                <path d="M24 14v20M14 24h20" strokeLinecap="round" />
              </svg>
            </div>
            <p className={styles.uploadTitle}>Upload Your Smile</p>
            <p className={styles.uploadText}>JPG or PNG, max 10MB</p>
          </div>
        </div>
        <div className={styles.visual}>
          <div className={styles.visualContent}>
            <Image
              src="/images/ai-placeholder.jpg"
              alt="AI Smile Preview Placeholder"
              fill
              className={styles.visualImage}
              sizes="(max-width: 900px) 500px, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
