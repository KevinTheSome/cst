import type { CSSProperties } from 'react';

type BioChipLoaderProps = {
    visible: boolean;
    message?: string;
};

const GRID_SEGMENT_DELAYS = [0, 180, 360, 540, 720, 900];

export default function BioChipLoader({ visible, message = 'Synchronizing interface...' }: BioChipLoaderProps) {
    return (
        <div
            aria-hidden={!visible}
            className={`bio-chip-overlay ${visible ? 'bio-chip-overlay--visible' : ''}`}
            role="status"
        >
            <div className="bio-chip">
                <div className="bio-chip__ring" />
                <div className="bio-chip__ring bio-chip__ring--delayed" />

                <div className="bio-chip__core">
                    <div className="bio-chip__halo" />

                    <div className="bio-chip__grid">
                        {GRID_SEGMENT_DELAYS.map((delay) => (
                            <span
                                key={delay}
                                className="bio-chip__grid-segment"
                                style={{ '--delay': `${delay}ms` } as CSSProperties}
                            />
                        ))}
                    </div>

                    <span className="bio-chip__scan-line" />
                    <span className="bio-chip__scan-line bio-chip__scan-line--reverse" />

                    <div className="bio-chip__nodes">
                        <span className="bio-chip__node bio-chip__node--tl" />
                        <span className="bio-chip__node bio-chip__node--tr" />
                        <span className="bio-chip__node bio-chip__node--bl" />
                        <span className="bio-chip__node bio-chip__node--br" />
                    </div>
                </div>

                <p className="bio-chip__label">{message}</p>
            </div>
        </div>
    );
}
