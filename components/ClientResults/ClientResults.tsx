import styles from './ClientResults.module.css';
import Image from 'next/image';

const results = [
  { src: '/results/5ZFBfCDx1EXAgDqlWZQgIoyyoXQ.jpeg', alt: 'Client smile result 1' },
  { src: '/results/0YKTYvkRwu9nkKrr8j4WUMHQ2j0.jpeg', alt: 'Client smile result 2' },
  { src: '/results/XbwhvgmdcvOKt1DOzdo78RI.jpeg', alt: 'Client smile result 3' },
  { src: '/results/CmDzB6j3qtpy2MP9YMKk6XBcU.jpeg', alt: 'Client smile result 4' },
  { src: '/results/0vdEccpA84gSRRwsrtwJW90PA.jpeg', alt: 'Client smile result 5' },
  { src: '/results/1312Jp3Lbw6RNIpkFQ4ZtuO90A.jpeg', alt: 'Client smile result 6' },
  { src: '/results/SMFG8pNIS5nK8bIVpYQ1uASlWro.jpeg', alt: 'Client smile result 7' },
  { src: '/results/k6H9fushrQXdVR6A34KreOfj4.jpeg', alt: 'Client smile result 8' },
  { src: '/results/arzL6rw9sC9SsFPAeDxFgM1U.jpeg', alt: 'Client smile result 9' },
  { src: '/results/Fcd0jiQxPlciCaHDqLnmAS8Lnd8.jpeg', alt: 'Client smile result 10' },
  { src: '/results/77HaKm2BzCNtdF3iI0u11KjWQ.jpeg', alt: 'Client smile result 11' },
  { src: '/results/T73FAZfOCKRF3ULejykVL3VDYvc.jpeg', alt: 'Client smile result 12' },
  { src: '/results/tnWmATfu7cK8vdjoVhfmSlseo.jpeg', alt: 'Client smile result 13' },
  { src: '/results/AGjJAgiPo6l2xFdYmMC9ckyTFcM.jpeg', alt: 'Client smile result 14' },
  { src: '/results/O1emD0DMg4cEmESXKmzrlXvKrPQ.jpeg', alt: 'Client smile result 15' },
  { src: '/results/9IJTJd96j6i2hUg9WiUpqi2Y.jpeg', alt: 'Client smile result 16' },
  { src: '/results/lpmyy3W3IRgyUOBEN2H5VqfSQnw.jpeg', alt: 'Client smile result 17' },
  { src: '/results/xzNdi9A32RD9k1JIJ40G7141s.jpeg', alt: 'Client smile result 18' },
];

export default function ClientResults() {
  return (
    <section className={styles.clientResults} id="client">
      <h2 className={styles.heading}>Client Results</h2>
      <div className={styles.line} />
      <div className={styles.galleryWrapper}>
        <div className={styles.galleryTrack}>
          {[...results, ...results].map((result, i) => (
            <div key={i} className={styles.imageWrapper}>
              <Image
                src={result.src}
                alt={result.alt}
                fill
                className={styles.resultImage}
                sizes="(max-width: 768px) 280px, 350px"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
      <p className={styles.disclaimer}>*Results may vary</p>
      <a href="/results" className={styles.seeMoreLink}>
        See more results
      </a>
    </section>
  );
}
