type BioChipLoaderProps = {
  visible: boolean;
};

export default function BioChipLoader({ visible }: BioChipLoaderProps) {
  return (
    <div
      aria-hidden={!visible}
      className={`bio-chip-overlay ${visible ? 'bio-chip-overlay--visible' : ''}`}
      role="status"
    >
      <div className="bio-chip-logo" aria-label="Lapas ielāde">
        <img
          alt="Biočipu laboratorijas emblēma"
          className="bio-chip-logo__image"
          src="/bzl-site-icon-01.png"   /* Prefer an SVG or transparent PNG */
          decoding="async"
          loading="eager"
        />
      </div>
    </div>
  );
}